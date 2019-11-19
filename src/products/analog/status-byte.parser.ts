namespace codec {

  /**
   * Analog status byte parser
   */
  export class AnalogStatusByteParser implements FrameParser {

    readonly deviceType = 'analog';
    readonly frameCode = 0;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      let statusContent: Content = {};

      const parser = new GenericStatusByteParser();
      statusContent = parser.parseFrame(payload, configuration);

      // Status byte, applicative flags
      statusContent['alarmChannelA'] = Boolean((payload[1] & 0x08) );
      statusContent['alarmChannelB'] = Boolean((payload[1] & 0x10) );

      return {'status': statusContent};
    }

  }

}
