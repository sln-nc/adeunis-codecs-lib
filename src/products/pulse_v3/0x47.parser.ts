namespace codec {

  /**
   * Pulse 3 0x47 (alarm) frame parser
   */
  export class PulseV30x47Parser implements FrameParser {

    readonly deviceType = 'pulse3';
    readonly frameCode = 0x47;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x47 Pulse 3 alarm' };

      appContent['decodingInfo'] = 'flowValues: [Channel A, Channel B]';
      // Flows when overflow occured [Channel A, Channel B]
      appContent['flowValues'] = [ payload.readUInt16BE(2), payload.readUInt16BE(4) ];

      return appContent;
    }

  }

}
