namespace codec {

  /**
   * Analog 0x42 (data) frame parser
   */
  export class Analog0x42Parser implements FrameParser {

    readonly deviceType = 'analog';
    readonly frameCode = 0x42;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x42 Analog data' };

      const ch1: Content = { 'name': 'channel A' };
      const ch2: Content = { 'name': 'channel B' };

      // channel A
      let type = payload[2] & 0x0f;
      let rawValue = payload.readUInt32BE(2) & 0x00ffffff;
      if (type === 1) {
        ch1['unit'] = 'V';
        // convert µV into V (with 3 fraction digits)
        ch1['value'] = parseFloat((rawValue / (1000 * 1000)).toFixed(3));
      } else if (type === 2) {
        ch1['unit'] = 'mA';
        // convert 10nA into mA (with 3 fraction digits)
        ch1['value'] = parseFloat((rawValue / (100 * 1000)).toFixed(3));
      } else {
        ch1['state'] = 'deactivated';
      }

      // channel A
      type = payload[6] & 0x0f;
      rawValue = payload.readUInt32BE(6) & 0x00ffffff;
      if (type === 1) {
        ch2['unit'] = 'V';
        // convert µV into V (with 3 fraction digits)
        ch2['value'] = parseFloat((rawValue / (1000 * 1000)).toFixed(3));
      } else if (type === 2) {
        ch2['unit'] = 'mA';
        // convert 10nA into mA (with 3 fraction digits)
        ch2['value'] = parseFloat((rawValue / (100 * 1000)).toFixed(3));
      } else {
        ch2['state'] = 'deactivated';
      }


      appContent['channels'] = [ ch1, ch2 ];

      return appContent;
    }

  }

}
