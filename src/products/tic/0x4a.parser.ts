namespace codec {

  /**
   * Tic 0x4a (alarm) frame parser
   */
  export class Tic0x4aParser implements FrameParser {

    readonly deviceType = 'ticPmePmi|ticCbeLinkyMono|ticCbeLinkyTri';
    readonly frameCode = 0x4a;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x4a TIC alarm' };

      appContent['label'] = this.payloadToString(payload, 2, 12);
      appContent['alarmType'] = this.getAlarmTypeText(payload[12]);
      appContent['value'] = this.payloadToString(payload, 13, payload.length);

      return appContent;
    }

    /**
     * Get Threshold Triggering text
     * @param value value
     */
    private getAlarmTypeText(value: number) {
      switch (value) {
        case 0:
          return 'manualTrigger';
        case 1:
          return 'labelAppearance';
        case 2:
          return 'labelDisappearance';
        case 3:
          return 'highTreshold';
        case 4:
          return 'lowTreshold';
        case 5:
          return 'endThresholdAlarm';
        case 6:
          return 'deltaPositive';
        case 7:
          return 'deltaNegative';
        default:
          return '';
      }
    }

    private payloadToString(payload: Buffer, start: number, end: number) {
      const charCode: number[] = [];
      for (let i = start; i < end; i++) {
        if (payload[i] !== 0x00) {
          charCode.push(payload[i]);
        }
      }
      const str = String.fromCharCode(...charCode);
      return (str.length > 0) ? str : 'notFound';
    }
  }
}
