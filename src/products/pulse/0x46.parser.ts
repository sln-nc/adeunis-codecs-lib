namespace codec {

  /**
   * Pulse 0x46 (data) frame parser
   */
  export class Pulse0x46Parser implements FrameParser {

    readonly deviceType = 'pulse';
    readonly frameCode = 0x46;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x46 Pulse data' };

      appContent['decodingInfo'] = 'counterValues: [Channel A, Channel B]';
      // Current indexes [Channel A, Channel B]
      appContent['counterValues'] = [ payload.readUInt32BE(2), payload.readUInt32BE(6) ];

      return appContent;
    }

  }

}
