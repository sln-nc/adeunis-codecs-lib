namespace codec {

  /**
   * Dry Contacts 0x10 (configuration) frame parser
   */
  export class Dc0x10Parser implements FrameParser {

    readonly deviceType = 'dc';
    readonly frameCode = 0x10;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x10 Dry Contacts configuration' };

      // Product mode
      appContent['productMode'] = PlateformCommonUtils.getProductModeText(payload[8]);

      if (payload[8] === 1) {
        appContent['keepAlivePeriod'] = {'unit': 'm', 'value': payload.readUInt8(2) * 10};
        appContent['transmitPeriod'] = {'unit': 'm', 'value': payload.readUInt8(3) * 10};
      } else {
        appContent['keepAlivePeriod'] = {'unit': 's', 'value': payload.readUInt8(2) * 20};
        appContent['transmitPeriod'] = {'unit': 's', 'value': payload.readUInt8(3) * 20};
      }

      // Channel x configuration
      // payload[y]<3:0> => type
      // payload[y]<7:4> => waiting period duration

      // Channel A configuration
      let debounce = this.getDebounceText(payload[4] >> 4);
      let type = this.getTypeText(payload[4] & 0x0f);
      if ( type[0] === 'disabled' ) {
        appContent['channelA'] = { 'type': type[0] };
      } else {
        appContent['channelA'] = { 'type': type[0], 'edge': type[1],
          'debounceDuration': {'unit': debounce[1], 'value': debounce[0]} };
      }

      // Channel B configuration
      debounce = this.getDebounceText(payload[5] >> 4);
      type = this.getTypeText(payload[5] & 0x0f);
      if ( type[0] === 'disabled' ) {
        appContent['channelB'] = { 'type': type[0] };
      } else {
        appContent['channelB'] = { 'type': type[0], 'edge': type[1],
          'debounceDuration': {'unit': debounce[1], 'value': debounce[0]} };
      }

      // Channel C configuration
      debounce = this.getDebounceText(payload[6] >> 4);
      type = this.getTypeText(payload[6] & 0x0f);
      if ( type[0] === 'disabled' ) {
        appContent['channelC'] = { 'type': type[0] };
      } else {
        appContent['channelC'] = { 'type': type[0], 'edge': type[1],
          'debounceDuration': {'unit': debounce[1], 'value': debounce[0]} };
      }

      // Channel D configuration
      debounce = this.getDebounceText(payload[7] >> 4);
      type = this.getTypeText(payload[7] & 0x0f);
      if ( type[0] === 'disabled' ) {
        appContent['channelD'] = { 'type': type[0] };
      } else {
        appContent['channelD'] = { 'type': type[0], 'edge': type[1],
          'debounceDuration': {'unit': debounce[1], 'value': debounce[0]} };
      }


      return appContent;
    }

    /**
     * Get Type text
     * @param value value
     */
    private getTypeText(value: number) {
      switch (value) {
        case 0:
          return ['disabled', ''];
        case 1:
          return ['inputPeriodic', 'high'];
        case 2:
          return ['inputPeriodic', 'low'];
        case 3:
          return ['inputPeriodic', 'both'];
        case 4:
          return ['inputEvent', 'high'];
        case 5:
          return ['inputEvent', 'low'];
        case 6:
          return ['inputEvent', 'both'];
        case 7:
          return ['output', 'high'];
        case 8:
          return ['output', 'low'];
        default:
          return ['disabled', ''];
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
        case 15:
          return [10, 'm'];
        default:
          return [0, 's'];
      }
    }

  }
}
