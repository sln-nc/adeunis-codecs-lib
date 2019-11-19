namespace codec {

  /**
   * Pulse 0x30 (keep alive) frame parser
   */
  export class Pulse0x30Parser implements FrameParser {

    readonly deviceType = 'pulse';
    readonly frameCode = 0x30;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x30 Pulse keep alive' };

      const chA: Content = { 'name': 'channel A' };
      const chB: Content = { 'name': 'channel B' };

      chA['flow'] = {
          'alarm': Boolean(payload[2] & 0x01),
          'last24hMin': payload.readUInt16BE(7),
          'last24hMax': payload.readUInt16BE(3)
      };
      chA['tamperAlarm'] = Boolean(payload[2] & 0x04);
      chA['leakageAlarm'] = Boolean(payload[2] & 0x10);

      chB['flow'] = {
        'alarm': Boolean(payload[2] & 0x02),
        'last24hMin': payload.readUInt16BE(9),
        'last24hMax': payload.readUInt16BE(5)
      };
      chB['tamperAlarm'] = Boolean(payload[2] & 0x08);
      chB['leakageAlarm'] = Boolean(payload[2] & 0x20);

      appContent['channels'] = [ chA, chB];

      return appContent;
    }

  }

}
