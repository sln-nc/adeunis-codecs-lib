namespace codec {

  /**
   * Smart Building 0x1f (TOR configuration) frame parser
   */
  export class Generic0x1fParser implements FrameParser {

    readonly deviceType = 'motion|comfort|deltap';
    readonly frameCode = 0x1f;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      // register 380: Configuration digital input 1
      // register 381: Alarm threshold digital input 1
      // register 382: Configuration digital input 2
      // register 383: Alarm threshold digital input 2
      const appContent: Content = { type: '0x1f digital input configuration' };
      const input1: Content = {};
      const input2: Content = {};

      input1['type'] = this.getTypeText(payload[2] & 0x0f);
      input1['debouncingPeriod'] = {
        'unit': 'ms', 'value':
            this.getDebouncingPeriodText((payload[2] & 0xf0) >> 4)
      };
      input1['threshold'] = payload.readUInt16BE(3);

      input2['type'] = this.getTypeText(payload[5] & 0x0f);
      input2['debouncingPeriod'] = {
        'unit': 'ms', 'value':
            this.getDebouncingPeriodText((payload[5] & 0xf0) >> 4)
      };
      input2['threshold'] = payload.readUInt16BE(6);

      appContent['digitalInput1'] = input1;
      appContent['digitalInput2'] = input2;

      return appContent;
    }

    /**
     * Get debounce duration text
     * @param value value
     */
    private getDebouncingPeriodText(value: number) {
      switch (value) {
        case 0:
          return 0;
        case 1:
          return 10;
        case 2:
          return 20;
        case 3:
          return 500;
        case 4:
          return 100;
        case 5:
          return 200;
        case 6:
          return 500;
        case 7:
          return 1000;
        case 8:
          return 2000;
        case 9:
          return 5000;
        case 10:
          return 10000;
        case 11:
          return 20000;
        case 12:
          return 40000;
        case 13:
          return 60000;
        case 14:
          return 300000;
        case 15:
          return 600000;
        default:
          return 0;
      }
    }

    /**
     * Get type text
     * @param value value
     */
    private getTypeText(value: number) {
      switch (value) {
        case 0x0:
          return 'deactivated';
        case 0x1:
          return 'highEdge';
        case 0x2:
          return 'lowEdge';
        case 0x3:
          return 'bothEdges';
        default:
          return '';
      }
    }

  }

}
