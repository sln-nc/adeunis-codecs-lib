namespace codec {

  /**
   * Analog 0x13 (configuration) frame parser
   */
  export class Analog0x13Parser implements FrameParser {

    readonly deviceType = 'analog';
    readonly frameCode = 0x13;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x13 Analog configuration' };

      // channel B high threshold configuration
      appContent['threshold'] = {
        'name': 'channel B',
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
