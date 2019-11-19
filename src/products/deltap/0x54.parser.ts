namespace codec {

    /**
     * Delta P 0x54 (pressure alarm) frame parser
     */
    export class Deltap0x54Parser implements FrameParser {

        readonly deviceType = 'deltap';
        readonly frameCode = 0x54;

        public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
            const appContent: Content = { type: '0x54 Delta P alarm'};

            // Bit 0: alarm pressure state (0: inactive, 1: active)
            appContent['alarmStatus'] = payload.readUInt8(2) ? 'active' : 'inactive';

            // Pressure value
            appContent['deltaPressure'] = { 'unit': 'pa', 'value': payload.readInt16BE(3)};

            return appContent;
        }
    }

}

