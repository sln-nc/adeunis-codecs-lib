namespace codec {

  /**
   * Temperature 0x43 (data) frame parser
   */
  export class Temp0x43Parser implements FrameParser {

    readonly deviceType = 'temp';
    readonly frameCode = 0x43;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x43 Temperature data' };

      const temp1: Content = { 'name': 'probe 1' };
      const temp2: Content = { 'name': 'probe 2' };

      // Internal sensor input states
      temp1['id'] = (payload[2] & 0xf0) >> 4;
      temp1['unit'] = '\u00B0' + 'C';
      // value@-3276.8 must be considered as an invalid measure (probe disconnected for instance)
      temp1['value'] = payload.readInt16BE(3) / 10;

      // External sensor input states
      temp2['id'] = (payload[5] & 0xf0) >> 4;
      temp2['unit'] = '\u00B0' + 'C';
      // value@-3276.8 must be considered as an invalid measure (probe disconnected for instance)
      temp2['value'] = payload.readInt16BE(6) / 10;

      // With FW > 1.3.8 we are able to activate or not a probe : detect these FW thanks to a specific value
      // sent by old FW
      if ( (payload[5] & 0x0F) !== 2) {
        temp1['state'] = (payload[2] & 0x01) ? 'activated' : 'deactivated';
        temp2['state'] = (payload[5] & 0x01) ? 'activated' : 'deactivated';
      }

      appContent['temperatures'] = [ temp1, temp2 ];

      return appContent;
    }

  }

}
