namespace codec {

  /**
   * Pulse 3 0x46 (data) frame parser
   */
  export class PulseV30x46Parser implements FrameParser {

    readonly deviceType = 'pulse3';
    readonly frameCode = 0x46;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x46 Pulse 3 data' };

      appContent['decodingInfo'] = 'counterValues: [Channel A, Channel B]';
      // Current indexes [Channel A, Channel B]
      appContent['counterValues'] = [ payload.readUInt32BE(2), payload.readUInt32BE(6) ];

      return appContent;
    }

  }

}
