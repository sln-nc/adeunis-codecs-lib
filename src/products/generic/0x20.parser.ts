namespace codec {

  /**
   * Generic 0x20 (configuration) frame parser
   */
  export class Generic0x20Parser implements FrameParser {

    readonly deviceType = 'any';
    readonly frameCode = 0x20;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network, deviceType: string) {
      const appContent: Content = {type: '0x20 Configuration'};

      // Content depends on network
      switch (payload.byteLength) {
        case 4:
          appContent['loraAdr'] = Boolean(payload[2] & 0x01);
          appContent['loraProvisioningMode'] = (payload[3] === 0) ? 'ABP' : 'OTAA';
          if (payload[2] & 0x04) {
            appContent['loraDutycyle'] = 'activated';
          } else if (deviceType === 'temp3' || deviceType === 'pulse3') {
            // TEMP3 and PULSE3 use FW 2.0.0 . In that case byte 2 contains the entire S220 register
            appContent['loraDutycyle'] = 'deactivated';
          }
          appContent['loraClassMode'] = (payload[2] & 0x20) ? 'CLASS C' : 'CLASS A';
          break;
        case 3:
          appContent['sigfoxRetry'] = (payload[2] & 0x03);
          break;
        default:
          appContent.partialDecoding = PartialDecodingReason.MISSING_NETWORK;
          break;
      }

      return appContent;
    }
  }
}
