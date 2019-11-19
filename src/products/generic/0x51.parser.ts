namespace codec {

    /**
     * Smart digital input 1 alarm frame parser
     */
    export class Generic0x51Parser implements FrameParser {

        readonly deviceType = 'motion|comfort|deltap';
        readonly frameCode = 0x51;

        public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
            const appContent: Content = {type: '0x51 digital input 2 alarm'};

            appContent['state'] = {
                'previousFrame': Boolean(payload.readUInt8(2) >> 1 & 1),
                'current': Boolean(payload.readUInt8(2) >> 0 & 1)
            };

            appContent['counter'] = {
                'global': payload.readUInt32BE(3),
                'instantaneous': payload.readUInt16BE(7)
            };

            return appContent;
        }
    }
}

