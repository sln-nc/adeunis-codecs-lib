namespace codec {

  /**
   * Temp 3 0x10 (configuration) frame parser
   */
  export class TempV30x10Parser implements FrameParser {

    readonly deviceType = 'temp3';
    readonly frameCode = 0x10;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x10 Temp 3 configuration' };

      appContent['transmissionPeriodKeepAlive'] = { 'unit': 's', 'value': payload.readUInt16BE(2) * 10},
      appContent['numberOfHistorizationBeforeSending'] = payload.readUInt16BE(4),
      appContent['numberOfSamplingBeforeHistorization'] = payload.readUInt16BE(6),
      appContent['samplingPeriod'] = { 'unit': 's', 'value': payload.readUInt16BE(8) * 2},
      appContent['redundantSamples'] = payload.readUInt8(10),
      appContent['calculatedPeriodRecording'] = { 'unit': 's',
        'value': payload.readUInt16BE(8) * payload.readUInt16BE(6) * 2},
      appContent['calculatedSendingPeriod'] = { 'unit': 's',
        'value': payload.readUInt16BE(8) * payload.readUInt16BE(6) * payload.readUInt16BE(4) * 2};

      return appContent;
    }
  }

}
