namespace codec {

  /**
   * Pulse 0x12 (configuration) frame parser
   */
  export class Pulse0x12Parser implements FrameParser {

    readonly deviceType = 'pulse';
    readonly frameCode = 0x12;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x12 Pulse configuration' };

      const chA: Content = { 'name': 'channel A' };
      const chB: Content = { 'name': 'channel B' };

      chA['leakageDetection'] = {
        'dailyPeriodsBelowWhichLeakageAlarmTriggered': payload.readUInt16BE(2),
      };

      chB['leakageDetection'] = {
        'dailyPeriodsBelowWhichLeakageAlarmTriggered': payload.readUInt16BE(4),
      };

      appContent['channels'] = [chA, chB];

      return appContent;
    }

  }

}
