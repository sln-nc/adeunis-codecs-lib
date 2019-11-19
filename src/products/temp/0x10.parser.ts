namespace codec {

  /**
   * Temperature 0x10 (configuration) frame parser
   */
  export class Temp0x10Parser implements FrameParser {

    readonly deviceType = 'temp';
    readonly frameCode = 0x10;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x10 Temperature configuration' };
      const temp1: Content = { 'name': 'probe 1' };
      const temp2: Content = { 'name': 'probe 2' };

      if (payload[8] === 2) {
        // TEST mode => period = value * 20sec
        appContent['transmissionPeriodKeepAlive']  = { 'unit': 's', 'value': payload[2] * 20 };
        appContent['transmissionPeriodData'] = { 'unit': 's', 'value': payload[3] * 20 };
        appContent['samplingPeriod'] = { 'unit': 's', 'value': payload[10] * 10 };
      } else {
        // PRODUCTION mode => period = value * 10min
        appContent['transmissionPeriodKeepAlive'] = { 'unit': 'm', 'value': payload[2] * 10 };
        appContent['transmissionPeriodData'] = { 'unit': 'm', 'value': payload[3] * 10 };
        appContent['samplingPeriod'] = { 'unit': 'm', 'value': payload[10] };
      }

      // Internal sensor input states
      temp1['id'] = (payload[4] & 0xf0) >> 4;
      temp1['threshold'] = this.getThresholdTriggeringText(payload[5] & 0x03);
      // Concerns only FW >= 1.3.8
      temp1['state'] = (payload[9] & 0x01) ? 'activated' : 'deactivated';

      // External sensor input states
      temp2['id'] = (payload[6] & 0xf0) >> 4;
      temp2['threshold'] = this.getThresholdTriggeringText(payload[7] & 0x03);
      // Concerns only FW >= 1.3.8
      temp2['state'] = (payload[9] & 0x02) ? 'activated' : 'deactivated';

      appContent['probes'] = [ temp1, temp2 ];

      // Product mode
      appContent['productMode'] = PlateformCommonUtils.getProductModeText(payload[8]);

      return appContent;
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
  }

}
