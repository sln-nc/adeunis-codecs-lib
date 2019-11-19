namespace codec {

  /**
   * Tic 0x10 (configuration) frame parser
   */
  export class Tic0x10Parser implements FrameParser {

    readonly deviceType = 'ticPmePmi|ticCbeLinkyMono|ticCbeLinkyTri';
    readonly frameCode = 0x10;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x10 TIC configuration' };

      if (payload[5] === 2) {
        // TEST mode => period = value * 20sec
        appContent['transmissionPeriodKeepAlive']  = { 'unit': 's', 'value': payload[2] * 20 };
        appContent['samplingPeriod'] = { 'unit': 's', 'value':  payload.readUInt16BE(6) * 20 };
      } else {
        // PRODUCTION mode => period = value * 10min
        appContent['transmissionPeriodKeepAlive'] = { 'unit': 'm', 'value': payload[2] * 10 };
        appContent['samplingPeriod'] = { 'unit': 'm', 'value':  payload.readUInt16BE(6) };
      }
      appContent['transmissionPeriodData'] = payload.readUInt16BE(3);

      // Product mode
      appContent['productMode'] = PlateformCommonUtils.getProductModeText(payload[5]);

      return appContent;
    }
  }
}
