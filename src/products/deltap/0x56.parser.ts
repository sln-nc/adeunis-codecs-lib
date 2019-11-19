namespace codec {

    /**
     * Delta P 0x56 (alarm 0-10 V) frame parser
     */
    export class Deltap0x56Parser implements FrameParser {

        readonly deviceType = 'deltap';
        readonly frameCode = 0x56;

        public parseFrame(payload: Buffer, configuration: Buffer, network: Network) {
            const appContent: Content = { type: '0x56 Delta P - alarm 0-10 V'};

            // Bit 0: alarm state (0: inactive, 1:active)
            appContent['alarmStatus'] = payload.readUInt8(2) ? 'active' : 'inactive';

            // Voltage value (in mV)
            appContent['voltage'] = { 'unit': 'mV', 'value': payload.readInt16BE(3)};

            return appContent;
        }

    }

}

