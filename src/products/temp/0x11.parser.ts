namespace codec {

  /**
   * Temperature 0x11 (configuration) frame parser
   */
  export class Temp0x11Parser implements FrameParser {

    readonly deviceType = 'temp';
    readonly frameCode = 0x11;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x11 Temperature configuration' };

      // Internal sensor high threshold configuration
      appContent['threshold'] = {
        'name': 'probe 1',
        'unit': '\u00B0' + 'C',
        'high': {
          'value': payload.readInt16BE(2) / 10,
          'hysteresis' : payload[4] / 10
        },
        'low': {
          'value': payload.readInt16BE(5) / 10,
          'hysteresis' : payload[7] / 10
        }
      };

      appContent['superSamplingFactor'] = payload[8];

      return appContent;
    }

  }

}
