namespace codec {

    /**
     * Motion 0x50 (luminosity alarm) frame parser
     */
    export class Motion0x50Parser implements FrameParser {

        readonly deviceType = 'motion';
        readonly frameCode = 0x50;

        public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {

            const appContent: Content = { type: '0x50 Motion luminosity alarm' };

            appContent['alarmLuminosity'] = {
                'alarmStatus': payload[2] ? 'active' : 'inactive',
                'luminosity': {'unit': '\u0025', 'value': payload[3]}};
            return appContent;
        }

    }

}

