namespace codec {

  /**
   * Temperature 0x12 (configuration) frame parser
   */
  export class Temp0x12Parser implements FrameParser {

    readonly deviceType = 'temp';
    readonly frameCode = 0x12;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x12 Temperature configuration' };

      appContent['threshold'] = {
        'name': 'probe 2',
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

      return appContent;
    }

  }

}
