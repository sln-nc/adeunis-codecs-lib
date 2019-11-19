namespace codec {

  /**
   * Analog 0x30 (keep alive) frame parser
   */
  export class Analog0x30Parser implements FrameParser {

    readonly deviceType = 'analog';
    readonly frameCode = 0x30;

    private parser = new Analog0x42Parser();

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent = this.parser.parseFrame(payload, configuration, network);

      appContent['type'] = '0x30 Analog keep alive';

      return appContent;
    }

  }

}
