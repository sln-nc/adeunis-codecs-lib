namespace codec {

  /**
   * Pulse 0x11 (configuration) frame parser
   */
  export class PulseV30x11Parser implements FrameParser {

    readonly deviceType = 'pulse3';
    readonly frameCode = 0x11;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x11 Pulse 3 configuration' };

      const chA: Content = { 'name': 'channel A' };
      const chB: Content = { 'name': 'channel B' };

      chA['leakageDetection'] = {
        'overflowAlarmTriggerThreshold': payload.readUInt16BE(2),
        'threshold': payload.readUInt16BE(6)
      };

      chB['leakageDetection'] = {
        'overflowAlarmTriggerThreshold': payload.readUInt16BE(4),
        'threshold': payload.readUInt16BE(8)
      };

      appContent['channels'] = [chA, chB];

      return appContent;
    }

  }

}
