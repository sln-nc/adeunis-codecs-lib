namespace codec {

  /**
   * TIC 0x49 (data) frame parser
   */
  export class Tic0x49Parser implements FrameParser {

    readonly deviceType = 'ticPmePmi|ticCbeLinkyMono|ticCbeLinkyTri';
    readonly frameCode = 0x49;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network, deviceType: string) {
      const appContent: Content = { type: '0x49 TIC data' };

      if (deviceType === 'ticCbeLinkyMono') {
        appContent['ADCO'] = this.payloadToString(payload, 2, 2 + 12);
        appContent['OPTARIF'] = this.payloadToString(payload, 14, 14 + 4);
        appContent['BASE'] = this.payloadToValue(payload, 18, 'Wh');
        appContent['ISOUSC'] = this.payloadToValue(payload, 22, 'A');
        appContent['IINST'] = this.payloadToValue(payload, 26, 'A');
        appContent['IMAX'] = this.payloadToValue(payload, 30, 'A');
        appContent['PAPP'] = this.payloadToValue(payload, 34, 'VA');
        appContent['HCHC'] = this.payloadToValue(payload, 38, 'Wh');
        appContent['HCHP'] = this.payloadToValue(payload, 42, 'Wh');
        appContent['PTEC'] = this.payloadToString(payload, 46, 46 + 4);
      } if (deviceType === 'ticCbeLinkyTri') {
        appContent['ADCO'] = this.payloadToString(payload, 2, 2 + 12);
        appContent['BASE'] = this.payloadToValue(payload, 14, 'Wh');
        appContent['IINST1'] = this.payloadToValue(payload, 18, 'A');
        appContent['IINST2'] = this.payloadToValue(payload, 22, 'A');
        appContent['IINST3'] = this.payloadToValue(payload, 26, 'A');
        appContent['IMAX1'] = this.payloadToValue(payload, 30, 'A');
        appContent['IMAX2'] = this.payloadToValue(payload, 34, 'A');
        appContent['IMAX3'] = this.payloadToValue(payload, 38, 'A');
        appContent['PMAX'] = this.payloadToValue(payload, 42, 'W');
        appContent['PAPP'] = this.payloadToValue(payload, 46, 'VA');
      }

      return appContent;
    }

    private payloadToString(payload: Buffer, start: number, end: number) {
      const charCode: number[] = [];
      for (let i = start; i < end; i++) {
        if (payload[i] !== 0x00) {
          charCode.push(payload[i]);
        }
      }
      const str = String.fromCharCode(...charCode);
      return (str.length > 0) ? str : 'notFound';
    }

    private payloadToValue(payload: Buffer, start: number, unit: String) {
      const res: Content = { 'unit': unit };
      const val = payload.readUInt32BE(start);
      if (val !== 0x80000000) {
        return { 'unit': unit, 'value': val};
      } else {
        return 'notFound';
      }
    }

  }

}
