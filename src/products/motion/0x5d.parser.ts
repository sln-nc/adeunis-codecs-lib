namespace codec {

    /**
     * Motion 0x4f (presence alarm) frame parser
     */
    export class Motion0x5dParser implements FrameParser {

        readonly deviceType = 'motion';
        readonly frameCode = 0x5d;

        public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
            const appContent: Content = {
                type: '0x5d Motion presence alarm'};

            appContent['alarmPresence'] = {
                'alarmStatus': payload.readUInt16BE(2) ? 'active' : 'inactive',
                'luminosity': {'unit': '\u0025', 'value': payload[3]}
            };

            return appContent;
        }

    }

}

