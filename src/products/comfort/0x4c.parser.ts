namespace codec {

  /**
   * Comfort 0x4c (historic data) frame parser
   */
  export class Comfort0x4cParser implements FrameParser {

    readonly deviceType = 'comfort';
    readonly frameCode = 0x4c;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x4c Comfort data'};

      let rawValue;
      const temp = [], humidity = [];

      // Loop through historic data [t=0, t-1, t-2,...]
      for (let offset = 2; offset < payload.byteLength; offset += 3) {
        rawValue = payload.readInt16BE(offset);
        temp.push(rawValue / 10);

        rawValue = payload.readUInt8(offset + 2);
        humidity.push(rawValue);
      }

      appContent['decodingInfo'] = 'values: [t=0, t-1, t-2, ...]';
      appContent['temperature'] = {'unit': '\u00B0' + 'C', 'values': temp};
      appContent['humidity'] = {'unit': '\u0025', 'values': humidity};

      return appContent;
    }
  }
}
