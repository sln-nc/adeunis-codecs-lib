namespace codec {

  /**
   * Pulse 3 0x12 (configuration) frame parser
   */
  export class PulseV30x12Parser implements FrameParser {

    readonly deviceType = 'pulse3';
    readonly frameCode = 0x12;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x12 Pulse 3 configuration' };

      const chA: Content = { 'name': 'channel A' };
      const chB: Content = { 'name': 'channel B' };

      chA['leakageDetection'] = {
        'dailyPeriodsBelowWhichLeakageAlarmTriggered': payload.readUInt16BE(2),
      };
      chA['tamper'] = {
        'samplePeriodForDetection': { 'unit': 's', 'value': payload.readUInt8(6) * 10},
        'threshold': payload.readUInt8(7)};

      chB['leakageDetection'] = {
        'dailyPeriodsBelowWhichLeakageAlarmTriggered': payload.readUInt16BE(4),
      };
      chB['tamper'] = {
        'samplePeriodForDetection': { 'unit': 's', 'value': payload.readUInt8(8) * 10},
        'threshold': payload.readUInt8(9)};
      appContent['channels'] = [chA, chB];

      return appContent;
    }

  }

}
