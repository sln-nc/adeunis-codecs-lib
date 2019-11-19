namespace codec {

  /**
   * Pulse 0x10 (configuration) frame parser
   */
  export class Pulse0x10Parser implements FrameParser {

    readonly deviceType = 'pulse';
    readonly frameCode = 0x10;

    private pulse0x11Parser = new Pulse0x11Parser();
    private pulse0x12Parser = new Pulse0x12Parser();

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x10 Pulse configuration' };
      const chA: Content = { 'name': 'channel A' };
      const chB: Content = { 'name': 'channel B' };

      // Product mode
      appContent['productMode'] = PlateformCommonUtils.getProductModeText(payload[2]);

      // Resolve known network
      const knownNetwork = this.inferNetwork(payload.byteLength);

      // Transmission period
      let offset = 0;
      if (payload[8] === 2) {
        // TEST mode => period = value * 20sec
        if (knownNetwork === 'sigfox') {
          appContent['transmissionPeriod'] = { 'unit': 's', 'value': payload[3] * 20};
          offset = -1; // value is on 1 byte for Sigfox, shift further payload reading
        } else {
          appContent['transmissionPeriod'] = { 'unit': 's', 'value': payload.readUInt16BE(3) * 20};
        }
      } else {
        // PRODUCTION mode
        if (knownNetwork === 'sigfox') {
          // Sigfox: period = value * 10min
          appContent['transmissionPeriod'] = { 'unit': 'm', 'value': payload[3] * 10 };
          offset = -1; // value is on 1 byte for Sigfox, shift further payload reading
        } else {
          // LoRa 868: period = value * 1min
          appContent['transmissionPeriod'] = { 'unit': 'm', 'value': payload.readUInt16BE(3) };
        }
      }

      // Flow calculation period
      if (payload[2] === 2) {
        // TEST mode => period = value * 20sec
        appContent['flowCalculationPeriod'] = { 'unit': 's', 'value': payload.readUInt16BE(offset + 8) * 20 };
      } else {
        // PRODUCTION mode => period = value * 1min
        appContent['flowCalculationPeriod'] = { 'unit': 'm', 'value': payload.readUInt16BE(offset + 8)};
      }

      // Historic mode
      appContent['historicMode'] = this.getHistoricModeText(payload[offset + 6]);

      // Channels A configuration
      chA['state'] = this.getStateText(Boolean(payload[offset + 5] & 0x01));
      chA['type'] = this.getTypeText(Boolean(payload[offset + 5] & 0x02));
      chA['tamperActivated'] = Boolean(payload [offset + 5] & 0x08);
      chA['debouncingPeriod'] = {
        'unit': 'ms', 'value':
            this.getDebouncingPeriod(payload[offset + 7] & 0x0f)
      };

      if (knownNetwork === 'lora868') {
        chA['leakageDetection'] = {
          'overflowAlarmTriggerThreshold': payload.readUInt16BE(10),
          'threshold': payload.readUInt16BE(14),
          'dailyPeriodsBelowWhichLeakageAlarmTriggered': payload.readUInt16BE(18)
        };
      }

      // Channels B configuration
      chB['state'] = this.getStateText(Boolean(payload[offset + 5] & 0x10));
      chB['type'] = this.getTypeText(Boolean(payload[offset + 5] & 0x20));
      chB['tamperActivated'] = Boolean(payload [offset + 5] & 0x80);

      chB['debouncingPeriod'] = {
        'unit': 'ms', 'value':
            this.getDebouncingPeriod((payload[offset + 7] & 0xf0) >> 4)
      };

      if (knownNetwork === 'lora868') {
        chB['leakageDetection'] = {
          'overflowAlarmTriggerThreshold': payload.readUInt16BE(12),
          'threshold': payload.readUInt16BE(16),
          'dailyPeriodsBelowWhichLeakageAlarmTriggered': payload.readUInt16BE(20)
        };
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
        case 22:
          return 'lora868' as Network;
        case 9:
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
     * Get historic mode text
     * @param value value
     */
    private getHistoricModeText(value: number) {
      switch (value) {
        case 0:
          return 'noHistoric';
        case 1:
          return 'historicLogEvery10min';
        case 2:
          return 'historicLogEvery1h';
        default:
          return '';
      }
    }

    /**
     * Get debouncing period text
     * @param value value
     */
    private getDebouncingPeriod(value: number) {
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
