namespace codec {

  /**
   * Generic status byte parser
   */
  export class GenericStatusByteParser implements FrameParser {

    readonly deviceType = 'any';
    readonly frameCode = 0;

    public parseFrame(payload: Buffer, configuration: Buffer) {
      const statusContent: Content = {};

      statusContent['frameCounter'] = (payload[1] & 0xe0) >> 5;
      statusContent['hardwareError'] = Boolean(payload[1] & 0x04) ;
      statusContent['lowBattery'] = Boolean(payload[1] & 0x02);
      statusContent['configurationDone'] = Boolean(payload[1] & 0x01);

      return statusContent;
    }

  }

}
