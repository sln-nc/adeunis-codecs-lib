namespace codec {

  /**
   * Motion 0x4e (historic data) frame parser
   */
  export class Motion0x4eParser implements FrameParser {

    readonly deviceType = 'motion';
    readonly frameCode = 0x4e;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x4e Motion data'};

      const counters = [], luminosities = [];

      appContent['globalCounterValue'] =  payload.readUInt16BE(2);

      // Loop through historic data [t=0, t-1, t-2,...]
      for (let offset = 4; offset < payload.byteLength; offset += 3) {
        counters.push(payload.readInt16BE(offset));
        luminosities.push(payload.readUInt8(offset + 2));
      }

      appContent['decodingInfo'] = 'counterValues/values: [t=0, t-1, t-2, ...]';
      appContent['counterValues'] =  counters;
      appContent['luminosity'] = {'unit': '\u0025', 'values': luminosities};

      return appContent;
    }
  }
}
