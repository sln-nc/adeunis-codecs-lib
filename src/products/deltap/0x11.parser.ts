namespace codec {

  /**
   * Delta P 0x11 (0-10V configuration) frame parser
   */
  export class Deltap0x11Parser implements FrameParser {

    readonly deviceType = 'deltap';
    readonly frameCode = 0x11;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      // register 322: value between 1 and 65535
      // register 323: value between 0 and 65535, 0: no scanning, X2s
      // register 324: Issue period, value between 0 and 65535, 0: disabling periodic transmission
      // reading_frequency = S322 * S323
      // sending_frequency = S322 * S323 * S324
      const appContent: Content = { type: '0x11 Delta P 0-10V configuration'};

      appContent['numberOfHistorizationBeforeSending'] = payload.readUInt16BE(6);
      appContent['numberOfSamplingBeforeHistorization'] = payload.readUInt16BE(2);
      appContent['samplingPeriod'] = { 'unit': 's', 'value': payload.readUInt16BE(4) * 2};
      appContent['calculatedPeriodRecording'] = { 'unit': 's',
        'value':  payload.readUInt16BE(2) * payload.readUInt16BE(4) * 2};
      appContent['calculatedSendingPeriod'] = { 'unit': 's',
        'value': payload.readUInt16BE(2) * payload.readUInt16BE(4) * payload.readUInt16BE(6) * 2};

      return appContent;
    }

  }

}
