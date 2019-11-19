namespace codec {

  /**
   * Analog 0x11 (configuration) frame parser
   */
  export class Analog0x11Parser implements FrameParser {

    readonly deviceType = 'analog';
    readonly frameCode = 0x11;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x11 Analog configuration' };

      // channel A high threshold configuration
      appContent['threshold'] = {
        'name': 'channel A',
        'unit': '\u00B5' + 'V or 10 nA',
        'high': {
          'value': payload.readUInt32BE(1) & 0x00ffffff,
          'hysteresis' : payload.readUInt32BE(4) & 0x00ffffff,
        }
      };

      return appContent;
    }

  }

}
