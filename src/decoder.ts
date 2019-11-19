namespace codec {

  /**
   * Decoder class.
   *
   * Main class for decoding purposes.
   * Contains declaration of all required parsers and decode() method (API entry point).
   *
   * See below for explanations on parsers.
   */
  export class Decoder {

    /**
     * Parsers declaration.
     *
     * Array of parser implementations that can be used by the library.
     *
     * Parsers are specific handlers for parsing frame of a device type and a frame code.
     */
    protected parsers: FrameParser[] = [
      // 1. Generic parsers not used for REPEATER
      // 2. GenericStatusByteParser() must be allocated only by custom parser.
      // => Default status byte parser must be GenericStatusByteExtParser()
      // new GenericStatusByteParser(),
      new GenericStatusByteExtParser(),
      new Generic0x1fParser(),
      new Generic0x20Parser(),
      new Generic0x2fParser(),
      new Generic0x30Parser(),
      new Generic0x33Parser(),
      new Generic0x51Parser(),
      new Generic0x52Parser(),

      // DC product
      new DcStatusByteParser(),
      new Dc0x10Parser(),
      new Dc0x40Parser(),

      // PULSE product
      new PulseStatusByteParser(),
      new Pulse0x10Parser(),
      new Pulse0x11Parser(),
      new Pulse0x12Parser(),
      new Pulse0x30Parser(),
      new Pulse0x46Parser(),
      new Pulse0x47Parser(),
      new Pulse0x48Parser(),

      // Pulse 3 product
      new PulseV30x10Parser(),
      new PulseV30x11Parser(),
      new PulseV30x12Parser(),
      new PulseV30x30Parser(),
      new PulseV30x46Parser(),
      new PulseV30x47Parser(),
      new PulseV30x5aParser(),
      new PulseV30x5bParser(),

      // TEMP product
      new TempStatusByteParser(),
      new Temp0x10Parser(),
      new Temp0x11Parser(),
      new Temp0x12Parser(),
      new Temp0x30Parser(),
      new Temp0x43Parser(),

      // Temp 3 product
      new TempV3StatusByteParser(),
      new TempV30x10Parser(),
      new TempV30x30Parser(),
      new TempV30x57Parser(),
      new TempV30x58Parser(),

      // COMFORT product
      new Comfort0x10Parser(),
      new Comfort0x4cParser(),
      new Comfort0x4dParser(),

      // MOTION product
      new Motion0x10Parser(),
      new Motion0x4eParser(),
      new Motion0x4fParser(),
      new Motion0x50Parser(),
      new Motion0x5cParser(),
      new Motion0x5dParser(),

      // REPEATER product
      new RepeaterStatusByteParser(),
      new Repeater0x01Parser(),
      new Repeater0x02Parser(),
      new Repeater0x03Parser(),
      new Repeater0x04Parser(),

      // DELTAP product
      new Deltap0x10Parser(),
      new Deltap0x11Parser(),
      new Deltap0x2fParser(),
      new Deltap0x53Parser(),
      new Deltap0x54Parser(),
      new Deltap0x55Parser(),
      new Deltap0x56Parser(),

      // Analog product
      new AnalogStatusByteParser(),
      new Analog0x10Parser(),
      new Analog0x11Parser(),
      new Analog0x12Parser(),
      new Analog0x13Parser(),
      new Analog0x14Parser(),
      new Analog0x30Parser(),
      new Analog0x42Parser(),

      // TIC product
      new TicStatusByteParser(),
      new Tic0x10Parser(),
      new Tic0x49Parser(),
      new Tic0x4aParser(),
    ];

    /**
     * Codec storage
     */
    private codecStorage: CodecStorage;

    /**
     * Constructor
     * @param options option object
     *   option.codecStorage: implementation of CodecStorage to use for external storage, leave blank if unknown
     */
    constructor(options?: { codecStorage?: CodecStorage }) {
      if (options && options.codecStorage) {
        // External storage: Node-RED...
        this.codecStorage = options.codecStorage;
      } else if (typeof localStorage !== 'undefined') {
        // Local storage: browser
        this.codecStorage = localStorage;
      } else {
        // Default (JS object)
        this.codecStorage = new InternalCodecStorage();
      }

      // TODO: check parsers uniqueness
    }

    /**
     * Get supported device types and frame codes.
     *
     * The returned pairs are available for decoding.
     */
    public getSupported() {
      const list: any = [];
      this.parsers
        .map(p => (p.deviceType.split('|').map( q => list.push({
          deviceType: q,
          frameCode: p.frameCode
        }))));

      return list;
    }

    /**
     * Find device types
     * @param payloadString payload as hexadecimal string
     */
    public findDeviceTypes(payloadString: string) {
      // Check arguments
      if (!/^(?:[0-9a-f]{2}){2,}$/gi.test(payloadString)) {
        return [];
      }

      // Get buffer and frame code
      const payload = Buffer.from(payloadString, 'hex');
      const frameCode = payload[0];

      const deviceTypesFull = this.parsers
        .filter(p => p.frameCode === frameCode)
        .map(p => p.deviceType);
      return Array.from(new Set(deviceTypesFull));
    }

    /**
     * Decode given payload.
     * @param payloadString payload as hexadecimal string
     * @param devId device ID: LoRa device EUI or Sigfox ID, leave blank if unknown
     * @param network network: lora868 or sigfox
     * @returns decoded data as JSON object
     */
    public decode(payloadString: string, devId: string = 'tmpDevId', network: Network = 'unknown') {
      // Check arguments
      if (!/^(?:[0-9a-f]{2}){2,}$/gi.test(payloadString)) {
        return { type: 'Invalid' } as Content;
      }

      // Get buffer and frame code
      const payload = Buffer.from(payloadString, 'hex');
      const frameCode = payload[0];

      // Handle device type
      const deviceType: string = this.fetchDeviceType(devId);

      // Handle configuration
      let configuration: Buffer;
      if (frameCode === 0x10) {
        configuration = payload;
        this.storeConfiguration(configuration, devId);
      } else {
        configuration = this.fetchConfiguration(devId);
      }

      // Handle specific parsing
      const activeParsers = this.getActiveParsers(deviceType, frameCode);
      const partialContents = activeParsers.map(p => {
        let partialContent: Content;
        try {
          partialContent = p.parseFrame(payload, configuration, network, deviceType);
        } catch (error) {
          partialContent = { 'error': error.toString() };
        }
        return partialContent;
      });

      // Handle unsupported
      if (activeParsers.every(p => p.frameCode < 0)) {
        partialContents.push({ type: 'Unsupported' });
      }

      // Merge partial contents
      let content = Object.assign({}, ...partialContents);

      // Put 'type' at first position
      const typestr = content['type'];
      delete content['type'];
      content = Object.assign({type: typestr}, content);

      return content as Content;
    }

    /**
     * Set device type for given device ID.
     *
     * Gives additional information to the library to provide better decoding.
     * The library can also guess device type from passed frames in decode() method. Use this method when the frame
     * to decode does not refer to a single device type (example: 0x10 frames).
     *
     * @param deviceType device type, must be a value from getSupported() method
     * @param devId device ID: LoRa device EUI or Sigfox ID
     */
    public setDeviceType(deviceType: string, devId: string = 'tmpDevId') {
      this.codecStorage.setItem(`${devId}.deviceType`, deviceType);
    }

    /**
     * Clear stored data for a device ID:
     *   - Device type
     *   - Configuration
     * @param devId device ID: LoRa device EUI or Sigfox ID, leave blank if unknown
     */
    public clearStoredData(devId?: string) {
      if (!devId) {
        devId = 'tmpDevId';
      }

      ['deviceType', 'configuration']
        .map(suffix => `${devId}.${suffix}`)
        .forEach(key => this.codecStorage.removeItem(key));
    }

    /**
     * Fetch configuration frame
     * @param devId device ID
     */
    private fetchConfiguration(devId?: string) {
      if (!devId) {
        return Buffer.from('');
      }
      const value = this.codecStorage.getItem(`${devId}.configuration`);
      return Buffer.from(value || '', 'hex');
    }

    /**
     * Store configuration frame
     * @param payload payload
     * @param devId device ID
     */
    private storeConfiguration(payload: Buffer, devId?: string) {
      if (!devId) {
        return payload;
      }
      this.codecStorage.setItem(`${devId}.configuration`, payload.toString('hex'));
      return payload;
    }

    /**
     * Fetch device type
     * @param devId device ID
     */
    private fetchDeviceType(devId?: string) {
      if (!devId) {
        return '';
      }
      return this.codecStorage.getItem(`${devId}.deviceType`) || '';
    }

    /**
     * Store device type
     * @param frameCode frame code
     * @param devId device ID
     */
    private storeDeviceType(frameCode: number, devId?: string) {
      let deviceType = '';
      if (!devId) {
        return deviceType;
      }
      const matchingParsers = this.parsers.filter(p => p.deviceType !== 'any' && p.frameCode === frameCode);
      if (matchingParsers.length === 1) {
        deviceType = matchingParsers[0].deviceType;
        this.codecStorage.setItem(`${devId}.deviceType`, deviceType);
      }
      return deviceType;
    }

    /**
     * Analyze deviceType string of the specified parser and check if it's compatible
     * @param parser parser to check
     * @param deviceType deviceType to check
     */
    private isCompatibleDeviceType(parser: FrameParser, deviceType: string) {
      // A parser may supported a list of devices (string split with '|'). Do not include 'any' parsers (managed later)
      const list = parser.deviceType.split('|').filter( q => q === deviceType);
      return (list.length > 0) ? true : false;
    }

    /**
     * Get active parsers
     * @param deviceType device type
     * @param frameCode frame code
     */
    private getActiveParsers(deviceType: string, frameCode: number) {
      let activeParsers: FrameParser[] = [];

      // Behavior: find if a specific parser exists for this deviceType
      //           otherwise try to find a ganeric parser
      //           if at least one parser has been found, add a status byte parser (specific or generic)

      // Device type is known, get parsers for given device type AND frame code
      let dataParser = this.parsers.filter(p => this.isCompatibleDeviceType(p, deviceType) &&
                                           (p.frameCode < 0 || p.frameCode === frameCode));

      // If not custom decoder found, use a generic one
      // Repeater has only specific parsers. Do not add generic ones
      if (dataParser.length === 0 && deviceType !== 'repeater') {
        const genericParsers = this.parsers.filter(p => p.deviceType === 'any' &&
                                                    (p.frameCode < 0 || p.frameCode === frameCode));
        dataParser = activeParsers.concat(genericParsers);
      }

      // Find the status byte parser: only if the frame is managed
      if (dataParser.length > 0) {
        const statusByteParsers = this.parsers.filter(p => this.isCompatibleDeviceType(p, deviceType)
                                                                    && p.frameCode === 0 );
        activeParsers = activeParsers.concat(statusByteParsers);
        if (statusByteParsers.length === 0) {
          const genericStatusByteParsers = this.parsers.filter(p => p.deviceType === 'any' && p.frameCode === 0 );
          activeParsers = activeParsers.concat(genericStatusByteParsers);
        }
      }

      // Status parser must be first in list for a better display
      activeParsers = activeParsers.concat(dataParser);

      // Return active parser
      return activeParsers;
    }
  }
}
