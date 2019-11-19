namespace codec {

  /**
   * Temp 3 0x57 (data) frame parser
   */
  export class TempV30x57Parser implements FrameParser {

    readonly deviceType = 'temp3';
    readonly frameCode = 0x57;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x57 Temp 3 periodic data' };
      const nbSensors  = (payload[1] & 0x10) ? 2 : 1;
      let rawValue;
      const temperatures: Content = [];
      const ch1Temp = [], ch2Temp = [];

      // Loop through historic data [t=0, t-1, t-2,...]
      // value@-3276.8 must be considered as an invalid measure (probe disconnected for instance)
      for (let offset = 2; offset < payload.byteLength; offset += 2 * nbSensors) {
        rawValue = payload.readInt16BE(offset);
        ch1Temp.push(rawValue / 10);

        if (nbSensors === 2) {
          rawValue = payload.readInt16BE(offset + 2);
          ch2Temp.push(rawValue / 10);
        }
      }
      appContent['decodingInfo'] = 'values: [t=0, t-1, t-2, ...]';
      // value@-3276.8 must be considered as an invalid measure (probe disconnected for instance)
      temperatures.push({'name': 'temperature 1', 'unit': '\u00B0' + 'C', 'values': ch1Temp});
      if (nbSensors === 2) {
        temperatures.push({'name': 'temperature 2', 'unit': '\u00B0' + 'C', 'values': ch2Temp});
      }
      appContent['temperatures'] = temperatures;

      return appContent;
    }
  }
}
