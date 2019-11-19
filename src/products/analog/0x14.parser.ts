namespace codec {

  /**
   * Analog 0x14 (configuration) frame parser
   */
  export class Analog0x14Parser implements FrameParser {

    readonly deviceType = 'analog';
    readonly frameCode = 0x14;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x14 Analog configuration' };

      // channel B high threshold configuration
      appContent['threshold'] = {
        'name': 'channel B',
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
