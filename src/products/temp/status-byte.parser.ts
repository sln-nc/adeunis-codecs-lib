namespace codec {

  /**
   * Temperature status byte parser
   */
  export class TempStatusByteParser implements FrameParser {

    readonly deviceType = 'temp';
    readonly frameCode = 0;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      let statusContent: Content = {};

      const parser = new GenericStatusByteParser();
      statusContent = parser.parseFrame(payload, configuration);

      // Status byte, applicative flags
      statusContent['probe1Alarm'] = Boolean((payload[1] & 0x08) );
      statusContent['probe2Alarm'] = Boolean((payload[1] & 0x10) );

      return {'status': statusContent};
    }

  }

}
