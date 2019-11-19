namespace codec {

  /**
   * Temp 3 status byte parser
   */
  export class TempV3StatusByteParser implements FrameParser {

    readonly deviceType = 'temp3';
    readonly frameCode = 0;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      let statusContent: Content = {};

      const parser = new GenericStatusByteParser();
      statusContent = parser.parseFrame(payload, configuration);

      // Status byte, applicative flags
      statusContent['configurationInconsistency'] = Boolean(payload[1] & 0x08);
      statusContent['configuration2ChannelsActivated'] = Boolean(payload[1] & 0x10);

      return {'status': statusContent};
    }
  }
}
