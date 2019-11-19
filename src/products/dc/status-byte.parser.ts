namespace codec {

  /**
   * DRYCONTACTS status byte parser
   */
  export class DcStatusByteParser implements FrameParser {

    readonly deviceType = 'dc';
    readonly frameCode = 0;

    public parseFrame(payload: Buffer, configuration: Buffer) {
      let statusContent: Content = {};

      const parser = new GenericStatusByteParser();
      statusContent = parser.parseFrame(payload, configuration);

      return {'status': statusContent};
    }

  }

}
