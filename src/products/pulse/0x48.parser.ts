namespace codec {

  /**
   * Pulse 0x48 (historic data) frame parser
   */
  export class Pulse0x48Parser implements FrameParser {

    readonly deviceType = 'pulse';
    readonly frameCode = 0x48;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = {type: '0x48 Pulse historic data'};

      const deltasA = [];
      const deltasB = [];
      const chA: Content = {'name': 'channel A'};
      const chB: Content = {'name': 'channel B'};

      // Frame index
      const frameIndex = payload[2];
      appContent['frameIndex'] = frameIndex;

      if (frameIndex === 0) {
        // Index values
        chA['index'] = payload.readUInt32BE(3);
        chB['index'] = payload.readUInt32BE(7);
      }

      // Delta values
      const start = frameIndex === 0 ? 11 : 3;
      const base = this.getBase(frameIndex, payload.byteLength);

      for (let offset = start; offset < payload.byteLength; offset += 4) {
        deltasA.push(payload.readUInt16BE(offset));
        deltasB.push(payload.readUInt16BE(offset + 2));
      }
      if (deltasA.length > 0) {
        appContent['baseTime'] = base;
        appContent['decodingInfo'] = `deltaValues: [t=${base} to t=${base + 1}, t=${base + 1} to t=${base + 2}, ...]`;
        chA['deltaValues'] = deltasA;
        chB['deltaValues'] = deltasB;
      }

      appContent['channels'] = [chA, chB];

      return appContent;
    }

    /**
     * Based on frameIndex and payload length this routine determines the basetime (different in lora and SFX)
     * @param payload payload
     * @param configuration configuration
     */
    private getBase(frameIndex: number, byteLength: number) {
      if ((byteLength === 31) || (byteLength === 51)) {
        return [1, 11][frameIndex];
      } else if ((frameIndex === 2 && byteLength === 7) || (frameIndex === 12 && byteLength === 7)) {
        return 23;
      } else if (frameIndex === 3 && byteLength === 7) {
        return 5;
      } else if (byteLength === 11) {
        return [1, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23][frameIndex];
      } else {
        // Unknown
        return 0;
      }
    }
  }
}
