namespace codec {

  /**
   * Temp 3 0x58 (alarm) frame parser
   */
  export class TempV30x58Parser implements FrameParser {

    readonly deviceType = 'temp3';
    readonly frameCode = 0x58;

    public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
      const appContent: Content = { type: '0x58 Temp 3 alarm' };
      const alarms: Content = [];

      const nbSensors  = (payload[1] & 0x10) ? 2 : 1;

      alarms.push( {
        'name': 'temperature 1',
        'alarmStatus': this.getAlarmStatusText(payload.readUInt8(2)),
        'temperature': {'unit': '\u00B0' + 'C', 'value': payload.readInt16BE(3) / 10}} );

      if (nbSensors === 2) {
        alarms.push( {
          'name': 'temperature 2',
          'alarmStatus': this.getAlarmStatusText(payload.readUInt8(5)),
          'temperature': {'unit': '\u00B0' + 'C', 'value': payload.readInt16BE(6) / 10}} );
      }

      appContent['alarms'] = alarms;

      return appContent;
    }

    /**
     * Get Alarm status text
     * @param value value
     */
    private getAlarmStatusText(value: number) {
      switch (value) {
        case 1:
          return 'highThreshold';
        case 2:
          return 'lowThreshold';
        default:
          return 'none';
      }
    }
  }
}
