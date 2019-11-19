namespace codec {

  /**
   * Pulse status byte parser
   */
  export class PulseStatusByteParser implements FrameParser {

    readonly deviceType = 'pulse';
    readonly frameCode = 0;

    public parseFrame(payload: Buffer, configuration: Buffer) {
      let statusContent: Content = {};

      const parser = new GenericStatusByteParser();
      statusContent = parser.parseFrame(payload, configuration);

      return {'status': statusContent};
    }

  }

}
