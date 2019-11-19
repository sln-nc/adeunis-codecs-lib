namespace codec {

  /**
   * Tic status byte parser
   */
  export class TicStatusByteParser implements FrameParser {

    readonly deviceType = 'ticPmePmi|ticCbeLinkyMono|ticCbeLinkyTri';
    readonly frameCode = 0;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      let statusContent: Content;

      const parser = new GenericStatusByteParser();
      statusContent = parser.parseFrame(payload, configuration);

      // Status byte, applicative flags
      statusContent['configurationInconsistency'] = Boolean((payload[1] & 0x08) );
      statusContent['readError'] = Boolean((payload[1] & 0x10) );

      return {'status': statusContent};
    }

  }

}
