namespace codec {

    /**
     * 0x52 digital input 2 alarm frame parser
     */
    export class Generic0x52Parser implements FrameParser {

        readonly deviceType = 'motion|comfort|deltap';
        readonly frameCode = 0x52;

        private parser = new Generic0x51Parser();

        public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
            const appContent: Content = {
                ...this.parser.parseFrame(payload, configuration, network),
                type: '0x52 digital input 2 alarm'
            };

            return appContent;
        }
    }
}
