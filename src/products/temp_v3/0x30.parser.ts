namespace codec {

  /**
   * Temp 3 0x30 (keep alive) frame parser
   */
  export class TempV30x30Parser implements FrameParser {

    readonly deviceType = 'temp3';
    readonly frameCode = 0x30;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x30 Temp 3 keep alive' };
      const nbSensors  = (payload[1] & 0x10) ? 2 : 1;
      const temperatures: Content = [];
      // value@-3276.8 must be considered as an invalid measure (probe disconnected for instance)
      temperatures.push({'name': 'temperature 1', 'unit': '\u00B0' + 'C', 'value': payload.readInt16BE(2) / 10});
      if (nbSensors === 2) {
        temperatures.push({'name': 'temperature 2', 'unit': '\u00B0' + 'C', 'value': payload.readInt16BE(4) / 10});
      }
      appContent['temperatures'] = temperatures;
      return appContent;
    }
  }
}
