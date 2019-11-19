namespace codec {

  /**
   * Delta P 0x10 (configuration) frame parser
   */
  export class Deltap0x10Parser implements FrameParser {

    readonly deviceType = 'deltap';
    readonly frameCode = 0x10;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      // register 300: Emission period of the life frame
      // register 301: Issue period, value between 0 and 65535, 0: disabling periodic transmission
      // register 320: value betwenn 1 and 65535
      // register 321: value betwenn 0 and 65535, 0: no scanning, X2s
      // reading_frequency = S321 * S320
      // sending_frequency = S321 * S320 * S301
      const appContent: Content = { type: '0x10 Delta P configuration'};

      appContent['transmissionPeriodKeepAlive'] = { 'unit': 's', 'value': payload.readUInt16BE(2) * 10},
      appContent['numberOfHistorizationBeforeSending'] = payload.readUInt16BE(4),
      appContent['numberOfSamplingBeforeHistorization'] = payload.readUInt16BE(6),
      appContent['samplingPeriod'] = { 'unit': 's', 'value': payload.readUInt16BE(8) * 2},
      appContent['calculatedPeriodRecording'] = { 'unit': 's',
        'value': payload.readUInt16BE(8) * payload.readUInt16BE(6) * 2},
      appContent['calculatedSendingPeriod'] = { 'unit': 's',
        'value': payload.readUInt16BE(8) * payload.readUInt16BE(6) * payload.readUInt16BE(4) * 2};

      return appContent;
    }

  }

}
