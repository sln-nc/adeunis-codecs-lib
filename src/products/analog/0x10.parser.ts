namespace codec {

  /**
   * Analog 0x10 (configuration) frame parser
   */
  export class Analog0x10Parser implements FrameParser {

    readonly deviceType = 'analog';
    readonly frameCode = 0x10;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x10 Analog configuration' };
      const ch1: Content = { 'name': 'channel A' };
      const ch2: Content = { 'name': 'channel B' };

      if (payload[8] === 2) {
        // TEST mode => period = value * 20sec
        appContent['transmissionPeriodKeepAlive']  = { 'unit': 's', 'value': payload[2] * 20 };
        appContent['transmissionPeriodData'] = { 'unit': 's', 'value': payload[3] * 20 };
      } else {
        // PRODUCTION mode => period = value * 10min
        appContent['transmissionPeriodKeepAlive'] = { 'unit': 'm', 'value': payload[2] * 10 };
        appContent['transmissionPeriodData'] = { 'unit': 'm', 'value': payload[3] * 10 };
      }

      let debounce = this.getDebounceText(payload[5] >> 4);
      ch1['id'] = (payload[4] & 0xf0) >> 4;
      ch1['type'] = this.getSensorTypeText(payload[4] & 0x0f);
      if (payload[4] & 0x0f) {
        ch1['threshold'] = this.getThresholdTriggeringText(payload[5] & 0x03);
        ch1['externalTrigger'] = {
          'type': this.getThresholdTriggeringText((payload[5] >> 2) & 0x03),
          'debounceDuration': {'unit': debounce[1], 'value': debounce[0]}
        };
      }

      debounce = this.getDebounceText(payload[7] >> 4);
      ch2['id'] = (payload[6] & 0xf0) >> 4;
      ch2['type'] = this.getSensorTypeText(payload[6] & 0x0f);
      if (payload[6] & 0x0f) {
        ch2['threshold'] = this.getThresholdTriggeringText(payload[7] & 0x03);
        ch2['externalTrigger'] = {
          'type': this.getThresholdTriggeringText((payload[7] >> 2) & 0x03),
          'debounceDuration': {'unit': debounce[1], 'value': debounce[0]}
        };
      }

      appContent['channels'] = [ ch1, ch2 ];

      // Product mode
      appContent['productMode'] = PlateformCommonUtils.getProductModeText(payload[8]);

      return appContent;
    }

    /**
     * Get Sensor type text
     * @param value value
     */
    private getSensorTypeText(value: number) {
      switch (value) {
        case 0:
          return 'deactivated';
        case 1:
          return '0-10V';
        case 2:
          return '4-20mA';
        default:
          return '';
      }
    }

    /**
     * Get Threshold Triggering text
     * @param value value
     */
    private getThresholdTriggeringText(value: number) {
      switch (value) {
        case 0:
          return 'none';
        case 1:
          return 'low';
        case 2:
          return 'high';
        case 3:
          return 'both';
        default:
          return '';
      }
    }

    /**
     * Get Waiting Period Duration text
     * @param value value
     */
    private getDebounceText(value: number) {
        switch (value) {
          case 0:
            return [0, 's'];
          case 1:
            return [10, 'ms'];
          case 2:
            return [20, 'ms'];
          case 3:
            return [50, 'ms'];
          case 4:
            return [100, 'ms'];
          case 5:
            return [200, 'ms'];
          case 6:
            return [500, 'ms'];
          case 7:
            return [1, 's'];
          case 8:
            return [2, 's'];
          case 9:
            return [5, 's'];
          case 10:
            return [10, 's'];
          case 11:
            return [20, 's'];
          case 12:
            return [40, 's'];
          case 13:
            return [60, 's'];
          case 14:
            return [5, 'm'];
          default:
            return [0, 's'];
        }
      }
  }
}
