namespace codec {

    /**
     * Motion 0x4f (presence alarm) frame parser
     */
    export class Motion0x4fParser implements FrameParser {

        readonly deviceType = 'motion';
        readonly frameCode = 0x4f;

        public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
            const appContent: Content = { type: '0x4f Motion presence alarm' };
            appContent['alarmPresence'] = {
                'globalCounterValue': payload.readUInt16BE(2),
                'counterValue': payload.readUInt16BE(4),
            };

            return appContent;
        }

    }

}

