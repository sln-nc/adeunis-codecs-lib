namespace codec {

  /**
   * Delta P 0x53 (Delta P periodic) frame parser
   */
  export class Deltap0x53Parser implements FrameParser {

    readonly deviceType = 'deltap';
    readonly frameCode = 0x53;


    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = {type: '0x53 Delta P periodic data'};

      const pressures = [];

      // Loop through historic data [t=0, t-1, t-2,...]
      for (let offset = 2; offset < payload.byteLength; offset += 2) {
        pressures.push(payload.readInt16BE(offset));
      }

      appContent['decodingInfo'] = 'values: [t=0, t-1, t-2, ...]';
      appContent['deltaPressure'] = {'unit': 'pa', 'values': pressures};

      return appContent;
    }
  }
}
