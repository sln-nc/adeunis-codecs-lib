namespace codec {

  /**
   * Generic 0x2f (downlink ACK) frame parser
   */
  export class Deltap0x2fParser implements FrameParser {

    readonly deviceType = 'deltap';
    readonly frameCode = 0x2f;

    public parseFrame(payload: Buffer, configuration: Buffer) {
      const appContent: Content = { type: '0x2f Delta P Downlink ack' };

      appContent['requestStatus'] = this.getRequestStatusText(payload[2]);

      return appContent;
    }

    /**
     * Get Type text
     * @param value value
     */
    private getRequestStatusText(value: number) {
      switch (value) {
        case 1:
          return 'success';
        case 2:
          return 'errorGeneric';
        case 3:
          return 'errorWrongState';
        case 4:
          return 'errorInvalidRequest';
        default:
          return 'errorOtherReason';
      }
    }
  }
}

