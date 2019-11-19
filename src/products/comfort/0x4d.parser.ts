namespace codec {

    /**
     * Comfort 0x4d (alarm) frame parser
     */
    export class Comfort0x4dParser implements FrameParser {

        readonly deviceType = 'comfort';
        readonly frameCode = 0x4d;

        public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
            const appContent: Content = { type: '0x4d Comfort alarm' };

            appContent['alarmTemperature'] = {
                'alarmStatus': (payload.readUInt8(2) >> 4) ? 'active' : 'inactive',
                'temperature': {'unit': '\u00B0' + 'C', 'value': payload.readInt16BE(3) / 10}};

            appContent['alarmHumidity'] = {
                'alarmStatus': (payload.readUInt8(2) & 1) ? 'active' : 'inactive',
                'humidity': {'unit': '\u0025', 'value': payload.readUInt8(5) }};

            return appContent;
        }
    }
}

