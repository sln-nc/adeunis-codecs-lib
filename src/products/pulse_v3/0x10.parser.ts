namespace codec {

  /**
   * Pulse 3 0x10 (configuration) frame parser
   */
  export class PulseV30x10Parser implements FrameParser {

    readonly deviceType = 'pulse3';
    readonly frameCode = 0x10;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x10 Pulse 3 configuration' };
      const chA: Content = { 'name': 'channel A' };
      const chB: Content = { 'name': 'channel B' };

      // Product mode
      appContent['productMode'] = PlateformCommonUtils.getProductModeText(payload[2]);

      // Resolve known network
      const knownNetwork = this.inferNetwork(payload.byteLength);

      // Transmission period
      appContent['numberOfHistorizationBeforeSending'] = payload.readUInt16BE(3);
      appContent['samplingPeriod'] = { 'unit': 's', 'value': payload.readUInt16BE(6) * 2 };
      appContent['calculatedSendingPeriod'] = { 'unit': 's',
        'value': payload.readUInt16BE(3) * payload.readUInt16BE(6) * 2 };

      // Flow calculation period
      if (payload[2] === 2) {
        // TEST mode => period = value * 20sec
        appContent['flowCalculationPeriod'] = { 'unit': 's', 'value': payload.readUInt16BE(9) * 20 };
      } else {
        // PRODUCTION mode => period = value * 1min
        appContent['flowCalculationPeriod'] = { 'unit': 'm', 'value': payload.readUInt16BE(9) };
      }

      if (knownNetwork === 'lora868') {
        appContent['redundantSamples'] = payload.readUInt8(27);
      }

      // Channels A configuration
      chA['state'] = this.getStateText(Boolean(payload[5] & 0x01));
      chA['type'] = this.getTypeText(Boolean(payload[5] & 0x02));

      chA['debouncingPeriod'] = {
        'unit': 'ms', 'value':
          this.getDebouncingPeriodText(payload[8] & 0x0f)
      };

      if (knownNetwork === 'lora868') {
        chA['leakageDetection'] = {
          'overflowAlarmTriggerThreshold': payload.readUInt16BE(11),
          'threshold': payload.readUInt16BE(15),
          'dailyPeriodsBelowWhichLeakageAlarmTriggered': payload.readUInt16BE(19)};
        chA['tamper'] = {
          'activated': Boolean(payload [5] & 0x08),
          'samplePeriodForDetection': { 'unit': 's', 'value': payload.readUInt8(23) * 10},
          'threshold': payload.readUInt8(24)};
      } else if (knownNetwork === 'sigfox') {
        chA['tamper'] = {'activated': Boolean(payload [5] & 0x08)};
      }

      // Channel B configuration
      chB['state'] = this.getStateText(Boolean(payload[5] & 0x10));
      chB['type'] = this.getTypeText(Boolean(payload[5] & 0x20));
      chB['debouncingPeriod'] = {
        'unit': 'ms', 'value':
          this.getDebouncingPeriodText((payload[8] & 0xf0) >> 4)
      };

      if (knownNetwork === 'lora868') {
        chB['leakageDetection'] = {
          'overflowAlarmTriggerThreshold': payload.readUInt16BE(13),
          'threshold': payload.readUInt16BE(17),
          'dailyPeriodsBelowWhichLeakageAlarmTriggered': payload.readUInt16BE(21)};
        chB['tamper'] = {
          'activated': Boolean(payload [5] & 0x80),
          'samplePeriodForDetection': { 'unit': 's', 'value': payload.readUInt8(25) * 10},
          'threshold': payload.readUInt8(26)};
      } else if (knownNetwork === 'sigfox') {
        chB['tamper'] = {'activated': Boolean(payload [5] & 0x80)};
      }

      appContent['channels'] = [chA, chB];

      return appContent;
    }

    /**
     * Infer network
     * @param length frame length
     */
    private inferNetwork(length: number) {
      //            +--------------+
      //            | Frame length |
      // +----------+--------------+
      // | LoRa 868 |           22 |
      // | Sigfox   |            9 |
      // +----------+--------------+
      switch (length) {
        case 28:
          return 'lora868' as Network;
        case 11:
          return 'sigfox' as Network;
        default:
          return 'unknown' as Network;
      }
    }

    /**
     * Get state text
     * @param value value
     */
    private getStateText(value: boolean) {
      return value ? 'enabled' : 'disabled';
    }

    /**
     * Get type text
     * @param value value
     */
    private getTypeText(value: boolean) {
      return value ? 'gasPullUpOn' : 'otherPullUpOff';
    }

    /**
     * Get debouncing period text
     * @param value value
     */
    private getDebouncingPeriodText(value: number) {
      switch (value) {
        case 0:
          return 0;
        case 1:
          return 1;
        case 2:
          return 10;
        case 3:
          return 20;
        case 4:
          return 50;
        case 5:
          return 100;
        case 6:
          return 200;
        case 7:
          return 500;
        case 8:
          return 1000;
        case 9:
          return 2000;
        case 10:
          return 5000;
        case 11:
          return 10000;
        default:
          return 0;
      }
    }
  }

}
