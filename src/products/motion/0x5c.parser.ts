namespace codec {

  /**
   * Motion 0x5c (historic data) frame parser
   */
  export class Motion0x5cParser implements FrameParser {

    readonly deviceType = 'motion';
    readonly frameCode = 0x5c;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x5c Motion data'};

      const presences = [], luminosities = [];

      appContent['presenceDetectedWhenSending'] =  Boolean(payload.readUInt16BE(2));

      // Loop through historic data [t=0, t-1, t-2,...]
      for (let offset = 3; offset < payload.byteLength; offset += 2) {
        presences.push(payload[offset]);
        luminosities.push(payload[offset + 1]);
      }

      appContent['decodingInfo'] = 'values: [t=0, t-1, t-2, ...]';
      appContent['presence'] =  {'unit': '\u0025', 'values': presences};
      appContent['luminosity'] = {'unit': '\u0025', 'values': luminosities};

      return appContent;
    }

  }
}
