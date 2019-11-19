namespace codec {

  /**
   * Analog 0x12 (configuration) frame parser
   */
  export class Analog0x12Parser implements FrameParser {

    readonly deviceType = 'analog';
    readonly frameCode = 0x12;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x12 Analog configuration' };

      // channel A high threshold configuration
      appContent['threshold'] = {
        'name': 'channel A',
        'unit': '\u00B5' + 'V or 10 nA',
        'low': {
          'value': payload.readUInt32BE(1) & 0x00ffffff,
          'hysteresis' : payload.readUInt32BE(4) & 0x00ffffff,
        }
      };

      return appContent;
    }

  }

}
