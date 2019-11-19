namespace codec {

  /**
   * Motion 0x10 (configuration) frame parser
   */
  export class Motion0x10Parser implements FrameParser {

    readonly deviceType = 'motion';
    readonly frameCode = 0x10;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {

      // register 300: Emission period of the life frame X 10s
      // register 301: Issue period, value betwenn 0 and 65535, 0: disabling periodic transmission
      // register 320: value between 1 and 65535
      // register 321: value between 0 and 65535, 0: no scanning, X2s
      // register 322: presence inhibition period X 10s
      // reading_frequency = S321 * S320
      // sending_frequency = S321 * S320 * S301
      const appContent: Content = {  type: '0x10 Motion configuration' };

      appContent['transmissionPeriodKeepAlive'] = { 'unit': 's', 'value': payload.readUInt16BE(2) * 10},
      appContent['numberOfHistorizationBeforeSending'] = payload.readUInt16BE(4),
      appContent['numberOfSamplingBeforeHistorization'] = payload.readUInt16BE(6),
      appContent['samplingPeriod'] = { 'unit': 's', 'value': payload.readUInt16BE(8) * 2},
      appContent['presenceDetectorInhibition'] = { 'unit': 's', 'value': payload.readUInt16BE(10) * 10},
      appContent['calculatedPeriodRecording'] = { 'unit': 's',
        'value': payload.readUInt16BE(8) * payload.readUInt16BE(6) * 2},
      appContent['calculatedSendingPeriod'] = { 'unit': 's',
        'value': payload.readUInt16BE(8) * payload.readUInt16BE(6) * payload.readUInt16BE(4) * 2};


      return appContent;
    }

  }

}
