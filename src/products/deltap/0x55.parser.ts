namespace codec {

  /**
   * Delta P 0x55 (periodic 0-10 V) frame parser
   */
  export class Deltap0x55Parser implements FrameParser {

    readonly deviceType = 'deltap';
    readonly frameCode = 0x55;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = {type: '0x55 Delta P - periodic 0-10 V'};

      const voltages = [];

      // Loop through historic data [t=0, t-1, t-2,...]
      for (let offset = 2; offset < payload.byteLength; offset += 2) {
        voltages.push(payload.readInt16BE(offset));
      }

      appContent['decodingInfo'] = 'values: [t=0, t-1, t-2, ...]';
      appContent['voltage'] = {'unit': 'mV', 'values': voltages};
      return appContent;
    }
  }
}

