namespace codec {

  /**
   * Extended status byte parser
   */
  export class GenericStatusByteExtParser implements FrameParser {

    readonly deviceType = 'any';
    readonly frameCode = 0;

    public parseFrame(payload: Buffer, configuration: Buffer) {
      let statusContent: Content = {};

      const parser = new GenericStatusByteParser();
      statusContent = parser.parseFrame(payload, configuration);

      // Status byte, applicative flags
      statusContent['configurationInconsistency'] = Boolean(payload[1] & 0x08);

      return {'status': statusContent};
    }

  }

}
