namespace codec {

  /**
   * Pulse 3 periodic data frame parser
   */
  export class PulseV30x5bParser implements FrameParser {

    readonly deviceType = 'pulse3';
    readonly frameCode = 0x5b;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      let absCounterValue = payload.readUInt32BE(2);
      const appContent: Content = { type: '0x5b Pulse 3 data - channel B' };

      const values = [absCounterValue];

      // Loop through historic data [t=0, t-1, t-2,...]
      for (let offset = 6; offset < payload.byteLength; offset += 2) {
        absCounterValue -= payload.readInt16BE(offset);
        values.push(absCounterValue);
      }

      appContent['decodingInfo'] = 'counterValues: [t=0, t-1, t-2, ...]';
      appContent['counterValues'] = values;
      return appContent;
    }

    /**
     * Get reading frequency
     * @param configuration configuration
     */
    private getReadingFrequency(configuration: Buffer) {
      return configuration.byteLength > 0 ? configuration.readUInt16BE(8) * configuration.readUInt16BE(6) * 2 : null;
    }
  }
}
