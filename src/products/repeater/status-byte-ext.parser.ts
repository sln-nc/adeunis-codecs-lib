namespace codec {

  /**
   * Extended status byte parser
   */
  export class RepeaterStatusByteParser implements FrameParser {

    readonly deviceType = 'repeater';
    readonly frameCode = 0;

    public parseFrame(payload: Buffer, configuration: Buffer) {

      // Skip generic status byte parser
      return {};
    }

  }

}
