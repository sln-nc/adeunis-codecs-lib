namespace codec {

  /**
   * Generic 0x33 (Response to Set Register downlink) frame parser
   */
  export class Generic0x33Parser implements FrameParser {

    readonly deviceType = 'dc|pulse3|temp3|comfort|motion||deltap';
    readonly frameCode = 0x33;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x33 Set register status' };

      appContent['requestStatus'] = this.getRequestStatusText(payload[2]);
      appContent['registerId'] = payload.readUInt16BE(3);

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
          return 'successNoUpdate';
        case 3:
          return 'errorCoherency';
        case 4:
          return 'errorInvalidRegister';
        case 5:
          return 'errorInvalidValue';
        case 6:
          return 'errorTruncatedValue';
        case 7:
          return 'errorAccesNotAllowed';
        default:
          return 'errorOtherReason';
      }
    }
  }
}

