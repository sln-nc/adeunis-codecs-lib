namespace codec {

  /**
   * Dry Contacts 0x40 (data) frame parser
   */
  export class Dc0x40Parser implements FrameParser {

    readonly deviceType = 'dc';
    readonly frameCode = 0x40;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x40 Dry Contacts data' };

      appContent['decodingInfo'] = 'true: ON/CLOSED, false: OFF/OPEN';
      appContent['channelA'] = { 'value': payload.readUInt16BE(2), 'currentState': Boolean(payload[10] & 0x01),
        'previousFrameState': Boolean(payload[10] & 0x02)};
      appContent['channelB'] = { 'value': payload.readUInt16BE(4), 'currentState': Boolean(payload[10] & 0x04),
        'previousFrameState': Boolean(payload[10] & 0x08)};
      appContent['channelC'] = { 'value': payload.readUInt16BE(6), 'currentState': Boolean(payload[10] & 0x10),
        'previousFrameState': Boolean(payload[10] & 0x20)};
      appContent['channelD'] = { 'value': payload.readUInt16BE(8), 'currentState': Boolean(payload[10] & 0x40),
        'previousFrameState': Boolean(payload[10] & 0x80)};

      return appContent;
    }

  }

}
