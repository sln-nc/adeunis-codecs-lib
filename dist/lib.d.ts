/// <reference types="node" />
declare namespace codec {
    /**
     * Decoder class.
     *
     * Main class for decoding purposes.
     * Contains declaration of all required parsers and decode() method (API entry point).
     *
     * See below for explanations on parsers.
     */
    class Decoder {
        /**
         * Parsers declaration.
         *
         * Array of parser implementations that can be used by the library.
         *
         * Parsers are specific handlers for parsing frame of a device type and a frame code.
         */
        protected parsers: FrameParser[];
        /**
         * Codec storage
         */
        private codecStorage;
        /**
         * Constructor
         * @param options option object
         *   option.codecStorage: implementation of CodecStorage to use for external storage, leave blank if unknown
         */
        constructor(options?: {
            codecStorage?: CodecStorage;
        });
        /**
         * Get supported device types and frame codes.
         *
         * The returned pairs are available for decoding.
         */
        getSupported(): any;
        /**
         * Find device types
         * @param payloadString payload as hexadecimal string
         */
        findDeviceTypes(payloadString: string): string[];
        /**
         * Decode given payload.
         * @param payloadString payload as hexadecimal string
         * @param devId device ID: LoRa device EUI or Sigfox ID, leave blank if unknown
         * @param network network: lora868 or sigfox
         * @returns decoded data as JSON object
         */
        decode(payloadString: string, devId?: string, network?: Network): Content;
        /**
         * Set device type for given device ID.
         *
         * Gives additional information to the library to provide better decoding.
         * The library can also guess device type from passed frames in decode() method. Use this method when the frame
         * to decode does not refer to a single device type (example: 0x10 frames).
         *
         * @param deviceType device type, must be a value from getSupported() method
         * @param devId device ID: LoRa device EUI or Sigfox ID
         */
        setDeviceType(deviceType: string, devId?: string): void;
        /**
         * Clear stored data for a device ID:
         *   - Device type
         *   - Configuration
         * @param devId device ID: LoRa device EUI or Sigfox ID, leave blank if unknown
         */
        clearStoredData(devId?: string): void;
        /**
         * Fetch configuration frame
         * @param devId device ID
         */
        private fetchConfiguration;
        /**
         * Store configuration frame
         * @param payload payload
         * @param devId device ID
         */
        private storeConfiguration;
        /**
         * Fetch device type
         * @param devId device ID
         */
        private fetchDeviceType;
        /**
         * Store device type
         * @param frameCode frame code
         * @param devId device ID
         */
        private storeDeviceType;
        /**
         * Analyze deviceType string of the specified parser and check if it's compatible
         * @param parser parser to check
         * @param deviceType deviceType to check
         */
        private isCompatibleDeviceType;
        /**
         * Get active parsers
         * @param deviceType device type
         * @param frameCode frame code
         */
        private getActiveParsers;
    }
}
declare namespace codec {
    /**
     * Encoder class.
     *
     * Main class for encoding purposes.
     * Contains declaration of all required builders and encode() method (API entry point).
     *
     * See below for explanations on builders.
     */
    class Encoder {
        /**
         * Builders declaration.
         *
         * Array of builder implementations that can be used by the library.
         *
         * Builders are specific handlers for encoding frame of a device type and a frame code.
         */
        protected builders: FrameBuilder<any>[];
        /**
         * Get supported device types and frame codes.
         *
         * The returned pairs are available for encoding.
         */
        getSupported(): {
            deviceType: string;
            frameCode: number;
        }[];
        /**
         * Get input data types.
         * @param deviceType device type
         * @param frameCode frame code
         * @returns a map of available input data and associated types
         */
        getInputDataTypes(deviceType: string, frameCode: number): {
            [key: string]: string;
        };
        /**
         * Encode given arguments.
         *
         * Generates a string payload from given arguments. Data object members and associated types can be known using
         * getInputDataTypes() method.
         *
         * @param deviceType device type
         * @param frameCode frame code
         * @param network network: lora868 or sigfox
         * @param data data object: map of available input data and values
         * @returns encoded data as string
         */
        encode(deviceType: string, frameCode: number, network?: Network, data?: any): string;
    }
}
declare namespace codec {
    /**
     * Codec storage interface
     */
    interface CodecStorage {
        /**
         * Get item
         * @param key key
         */
        getItem(key: string): string | null;
        /**
         * Remove item
         * @param key key
         */
        removeItem(key: string): void;
        /**
         * Set item
         * @param key key
         * @param value value
         */
        setItem(key: string, value: string): void;
    }
}
declare namespace codec {
    /**
     * Internal codec storage
     */
    class InternalCodecStorage implements CodecStorage {
        private store;
        getItem(key: string): string;
        removeItem(key: string): void;
        setItem(key: string, value: string): void;
    }
}
declare namespace codec {
    /**
     * Frame builder interface
     */
    interface FrameBuilder<T> {
        /**
         * Device type
         * 'any' applies to all devices
         */
        readonly deviceType: string;
        /**
         * Frame code
         * -1 applies to all devices
         */
        readonly frameCode: number;
        /**
         * Input data class
         */
        readonly inputDataClass: {
            new (...args: any[]): T;
        };
        /**
         * Build frame
         * @param inputData input data
         */
        buildFrame(inputData: T, network: Network): Buffer;
    }
}
declare namespace codec {
    /**
     * Frame parser interface
     */
    interface FrameParser {
        /**
         * Device type
         * 'any' applies to all devices
         * it is also possible to define a list of devices split by '|'. For instance: "motion|comfort|deltap"
         */
        readonly deviceType: string;
        /**
         * Frame code
         * -1 applies to all framecodes
         * 0 indicates that parsee is dedicated to status byte parsing
         */
        readonly frameCode: number;
        /**
         * Parse frame
         * @param payload payload
         * @param configuration configuration
         * @param deviceType concerned deviceType
         */
        parseFrame(payload: Buffer, configuration: Buffer, network: Network, deviceType: string): Content;
    }
}
declare namespace codec {
    /**
     * Analog 0x10 (configuration) frame parser
     */
    class Analog0x10Parser implements FrameParser {
        readonly deviceType = "analog";
        readonly frameCode = 16;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        /**
         * Get Sensor type text
         * @param value value
         */
        private getSensorTypeText;
        /**
         * Get Threshold Triggering text
         * @param value value
         */
        private getThresholdTriggeringText;
        /**
         * Get Waiting Period Duration text
         * @param value value
         */
        private getDebounceText;
    }
}
declare namespace codec {
    /**
     * Analog 0x11 (configuration) frame parser
     */
    class Analog0x11Parser implements FrameParser {
        readonly deviceType = "analog";
        readonly frameCode = 17;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Analog 0x12 (configuration) frame parser
     */
    class Analog0x12Parser implements FrameParser {
        readonly deviceType = "analog";
        readonly frameCode = 18;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Analog 0x13 (configuration) frame parser
     */
    class Analog0x13Parser implements FrameParser {
        readonly deviceType = "analog";
        readonly frameCode = 19;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Analog 0x14 (configuration) frame parser
     */
    class Analog0x14Parser implements FrameParser {
        readonly deviceType = "analog";
        readonly frameCode = 20;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Analog 0x30 (keep alive) frame parser
     */
    class Analog0x30Parser implements FrameParser {
        readonly deviceType = "analog";
        readonly frameCode = 48;
        private parser;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Analog 0x42 (data) frame parser
     */
    class Analog0x42Parser implements FrameParser {
        readonly deviceType = "analog";
        readonly frameCode = 66;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Analog status byte parser
     */
    class AnalogStatusByteParser implements FrameParser {
        readonly deviceType = "analog";
        readonly frameCode = 0;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): {
            'status': Content;
        };
    }
}
declare namespace codec {
    /**
     * Comfort 0x10 (configuration) frame parser
     */
    class Comfort0x10Parser implements FrameParser {
        readonly deviceType = "comfort";
        readonly frameCode = 16;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Comfort 0x4c (historic data) frame parser
     */
    class Comfort0x4cParser implements FrameParser {
        readonly deviceType = "comfort";
        readonly frameCode = 76;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Comfort 0x4d (alarm) frame parser
     */
    class Comfort0x4dParser implements FrameParser {
        readonly deviceType = "comfort";
        readonly frameCode = 77;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Dry Contacts 0x10 (configuration) frame parser
     */
    class Dc0x10Parser implements FrameParser {
        readonly deviceType = "dc";
        readonly frameCode = 16;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        /**
         * Get Type text
         * @param value value
         */
        private getTypeText;
        /**
         * Get Waiting Period Duration text
         * @param value value
         */
        private getDebounceText;
    }
}
declare namespace codec {
    /**
     * Dry Contacts 0x40 (data) frame parser
     */
    class Dc0x40Parser implements FrameParser {
        readonly deviceType = "dc";
        readonly frameCode = 64;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * DRYCONTACTS status byte parser
     */
    class DcStatusByteParser implements FrameParser {
        readonly deviceType = "dc";
        readonly frameCode = 0;
        parseFrame(payload: Buffer, configuration: Buffer): {
            'status': Content;
        };
    }
}
declare namespace codec {
    /**
     * Delta P 0x10 (configuration) frame parser
     */
    class Deltap0x10Parser implements FrameParser {
        readonly deviceType = "deltap";
        readonly frameCode = 16;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Delta P 0x11 (0-10V configuration) frame parser
     */
    class Deltap0x11Parser implements FrameParser {
        readonly deviceType = "deltap";
        readonly frameCode = 17;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Generic 0x2f (downlink ACK) frame parser
     */
    class Deltap0x2fParser implements FrameParser {
        readonly deviceType = "deltap";
        readonly frameCode = 47;
        parseFrame(payload: Buffer, configuration: Buffer): Content;
        /**
         * Get Type text
         * @param value value
         */
        private getRequestStatusText;
    }
}
declare namespace codec {
    /**
     * Delta P 0x53 (Delta P periodic) frame parser
     */
    class Deltap0x53Parser implements FrameParser {
        readonly deviceType = "deltap";
        readonly frameCode = 83;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Delta P 0x54 (pressure alarm) frame parser
     */
    class Deltap0x54Parser implements FrameParser {
        readonly deviceType = "deltap";
        readonly frameCode = 84;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Delta P 0x55 (periodic 0-10 V) frame parser
     */
    class Deltap0x55Parser implements FrameParser {
        readonly deviceType = "deltap";
        readonly frameCode = 85;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Delta P 0x56 (alarm 0-10 V) frame parser
     */
    class Deltap0x56Parser implements FrameParser {
        readonly deviceType = "deltap";
        readonly frameCode = 86;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Smart Building 0x1f (TOR configuration) frame parser
     */
    class Generic0x1fParser implements FrameParser {
        readonly deviceType = "motion|comfort|deltap";
        readonly frameCode = 31;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        /**
         * Get debounce duration text
         * @param value value
         */
        private getDebouncingPeriodText;
        /**
         * Get type text
         * @param value value
         */
        private getTypeText;
    }
}
declare namespace codec {
    /**
     * Generic 0x20 (configuration) frame parser
     */
    class Generic0x20Parser implements FrameParser {
        readonly deviceType = "any";
        readonly frameCode = 32;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network, deviceType: string): Content;
    }
}
declare namespace codec {
    /**
     * Generic 0x2f (downlink ACK) frame parser
     */
    class Generic0x2fParser implements FrameParser {
        readonly deviceType = "dc";
        readonly frameCode = 47;
        parseFrame(payload: Buffer, configuration: Buffer): Content;
        /**
         * Get Type text
         * @param value value
         */
        private getRequestStatusText;
    }
}
declare namespace codec {
    /**
     * Generic 0x30 (keep alive) frame parser
     */
    class Generic0x30Parser implements FrameParser {
        readonly deviceType = "any";
        readonly frameCode = 48;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): any;
    }
}
declare namespace codec {
    /**
     * Generic 0x33 (Response to Set Register downlink) frame parser
     */
    class Generic0x33Parser implements FrameParser {
        readonly deviceType = "dc|pulse3|temp3|comfort|motion||deltap";
        readonly frameCode = 51;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        /**
         * Get Type text
         * @param value value
         */
        private getRequestStatusText;
    }
}
declare namespace codec {
    /**
     * Smart digital input 1 alarm frame parser
     */
    class Generic0x51Parser implements FrameParser {
        readonly deviceType = "motion|comfort|deltap";
        readonly frameCode = 81;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * 0x52 digital input 2 alarm frame parser
     */
    class Generic0x52Parser implements FrameParser {
        readonly deviceType = "motion|comfort|deltap";
        readonly frameCode = 82;
        private parser;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Extended status byte parser
     */
    class GenericStatusByteExtParser implements FrameParser {
        readonly deviceType = "any";
        readonly frameCode = 0;
        parseFrame(payload: Buffer, configuration: Buffer): {
            'status': Content;
        };
    }
}
declare namespace codec {
    /**
     * Generic status byte parser
     */
    class GenericStatusByteParser implements FrameParser {
        readonly deviceType = "any";
        readonly frameCode = 0;
        parseFrame(payload: Buffer, configuration: Buffer): Content;
    }
}
declare namespace codec {
    /**
     * Motion 0x10 (configuration) frame parser
     */
    class Motion0x10Parser implements FrameParser {
        readonly deviceType = "motion";
        readonly frameCode = 16;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Motion 0x4e (historic data) frame parser
     */
    class Motion0x4eParser implements FrameParser {
        readonly deviceType = "motion";
        readonly frameCode = 78;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Motion 0x4f (presence alarm) frame parser
     */
    class Motion0x4fParser implements FrameParser {
        readonly deviceType = "motion";
        readonly frameCode = 79;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Motion 0x50 (luminosity alarm) frame parser
     */
    class Motion0x50Parser implements FrameParser {
        readonly deviceType = "motion";
        readonly frameCode = 80;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Motion 0x5c (historic data) frame parser
     */
    class Motion0x5cParser implements FrameParser {
        readonly deviceType = "motion";
        readonly frameCode = 92;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Motion 0x4f (presence alarm) frame parser
     */
    class Motion0x5dParser implements FrameParser {
        readonly deviceType = "motion";
        readonly frameCode = 93;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Pulse 0x10 (configuration) frame parser
     */
    class Pulse0x10Parser implements FrameParser {
        readonly deviceType = "pulse";
        readonly frameCode = 16;
        private pulse0x11Parser;
        private pulse0x12Parser;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        /**
         * Infer network
         * @param length frame length
         */
        private inferNetwork;
        /**
         * Get state text
         * @param value value
         */
        private getStateText;
        /**
         * Get type text
         * @param value value
         */
        private getTypeText;
        /**
         * Get historic mode text
         * @param value value
         */
        private getHistoricModeText;
        /**
         * Get debouncing period text
         * @param value value
         */
        private getDebouncingPeriod;
    }
}
declare namespace codec {
    /**
     * Pulse 0x11 (configuration) frame parser
     */
    class Pulse0x11Parser implements FrameParser {
        readonly deviceType = "pulse";
        readonly frameCode = 17;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Pulse 0x12 (configuration) frame parser
     */
    class Pulse0x12Parser implements FrameParser {
        readonly deviceType = "pulse";
        readonly frameCode = 18;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Pulse 0x30 (keep alive) frame parser
     */
    class Pulse0x30Parser implements FrameParser {
        readonly deviceType = "pulse";
        readonly frameCode = 48;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Pulse 0x46 (data) frame parser
     */
    class Pulse0x46Parser implements FrameParser {
        readonly deviceType = "pulse";
        readonly frameCode = 70;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Pulse 0x47 (alarm) frame parser
     */
    class Pulse0x47Parser implements FrameParser {
        readonly deviceType = "pulse";
        readonly frameCode = 71;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Pulse 0x48 (historic data) frame parser
     */
    class Pulse0x48Parser implements FrameParser {
        readonly deviceType = "pulse";
        readonly frameCode = 72;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        /**
         * Based on frameIndex and payload length this routine determines the basetime (different in lora and SFX)
         * @param payload payload
         * @param configuration configuration
         */
        private getBase;
    }
}
declare namespace codec {
    /**
     * Pulse status byte parser
     */
    class PulseStatusByteParser implements FrameParser {
        readonly deviceType = "pulse";
        readonly frameCode = 0;
        parseFrame(payload: Buffer, configuration: Buffer): {
            'status': Content;
        };
    }
}
declare namespace codec {
    /**
     * Pulse 3 0x10 (configuration) frame parser
     */
    class PulseV30x10Parser implements FrameParser {
        readonly deviceType = "pulse3";
        readonly frameCode = 16;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        /**
         * Infer network
         * @param length frame length
         */
        private inferNetwork;
        /**
         * Get state text
         * @param value value
         */
        private getStateText;
        /**
         * Get type text
         * @param value value
         */
        private getTypeText;
        /**
         * Get debouncing period text
         * @param value value
         */
        private getDebouncingPeriodText;
    }
}
declare namespace codec {
    /**
     * Pulse 0x11 (configuration) frame parser
     */
    class PulseV30x11Parser implements FrameParser {
        readonly deviceType = "pulse3";
        readonly frameCode = 17;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Pulse 3 0x12 (configuration) frame parser
     */
    class PulseV30x12Parser implements FrameParser {
        readonly deviceType = "pulse3";
        readonly frameCode = 18;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Pulse 3 0x30 (keep alive) frame parser
     */
    class PulseV30x30Parser implements FrameParser {
        readonly deviceType = "pulse3";
        readonly frameCode = 48;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Pulse 3 0x46 (data) frame parser
     */
    class PulseV30x46Parser implements FrameParser {
        readonly deviceType = "pulse3";
        readonly frameCode = 70;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Pulse 3 0x47 (alarm) frame parser
     */
    class PulseV30x47Parser implements FrameParser {
        readonly deviceType = "pulse3";
        readonly frameCode = 71;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Pulse 3 periodic data  frame parser
     */
    class PulseV30x5aParser implements FrameParser {
        readonly deviceType = "pulse3";
        readonly frameCode = 90;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        /**
         * Get reading frequency
         * @param configuration configuration
         */
        private getReadingFrequency;
    }
}
declare namespace codec {
    /**
     * Pulse 3 periodic data frame parser
     */
    class PulseV30x5bParser implements FrameParser {
        readonly deviceType = "pulse3";
        readonly frameCode = 91;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        /**
         * Get reading frequency
         * @param configuration configuration
         */
        private getReadingFrequency;
    }
}
declare namespace codec {
    class Repeater0x01InputData {
        return_mode: number;
    }
    /**
     * Repeater 0x01 frame builder
     */
    class Repeater0x01Builder implements FrameBuilder<Repeater0x01InputData> {
        readonly deviceType = "repeater";
        readonly frameCode = 1;
        readonly inputDataClass: typeof Repeater0x01InputData;
        buildFrame(inputData: Repeater0x01InputData, network: Network): Buffer;
    }
}
declare namespace codec {
    /**
     * Repeater 0x01 frame parser
     */
    class Repeater0x01Parser implements FrameParser {
        readonly deviceType = "repeater";
        readonly frameCode = 1;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        getDataFromPayload(payload: Buffer): Content;
    }
}
declare namespace codec {
    class Repeater0x02InputData {
        wl_activation: number;
        id: number;
    }
    /**
     * Repeater 0x02 frame builder
     */
    class Repeater0x02Builder implements FrameBuilder<Repeater0x02InputData> {
        readonly deviceType = "repeater";
        readonly frameCode = 2;
        readonly inputDataClass: typeof Repeater0x02InputData;
        buildFrame(inputData: Repeater0x02InputData, network: Network): Buffer;
    }
}
declare namespace codec {
    /**
     * Repeater 0x02 frame parser
     */
    class Repeater0x02Parser implements FrameParser {
        readonly deviceType = "repeater";
        readonly frameCode = 2;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        getDataFromPayload(payload: Buffer): Content;
    }
}
declare namespace codec {
    class Repeater0x03InputData {
        wl_validation: number;
        id: number;
    }
    /**
     * Repeater 0x03 frame builder
     */
    class Repeater0x03Builder implements FrameBuilder<Repeater0x03InputData> {
        readonly deviceType = "repeater";
        readonly frameCode = 3;
        readonly inputDataClass: typeof Repeater0x03InputData;
        buildFrame(inputData: Repeater0x03InputData, network: Network): Buffer;
    }
}
declare namespace codec {
    /**
     * Repeater 0x02 frame parser
     */
    class Repeater0x03Parser implements FrameParser {
        readonly deviceType = "repeater";
        readonly frameCode = 3;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        getDataFromPayload(payload: Buffer): Content;
    }
}
declare namespace codec {
    class Repeater0x04InputData {
        S300: number;
        S303: number;
        S304: number;
        S306: number;
    }
    /**
     * Repeater 0x04 frame builder
     */
    class Repeater0x04Builder implements FrameBuilder<Repeater0x04InputData> {
        readonly deviceType = "repeater";
        readonly frameCode = 4;
        readonly inputDataClass: typeof Repeater0x04InputData;
        buildFrame(inputData: Repeater0x04InputData, network: Network): Buffer;
        getFirstIds(ids: Array<number>): number[];
        getLastIds(ids: Array<number>): number[];
        getByteFromIdsList(ids: Array<number>): number;
    }
}
declare namespace codec {
    /**
     * Repeater 0x04 frame parser
     */
    class Repeater0x04Parser implements FrameParser {
        readonly deviceType = "repeater";
        readonly frameCode = 4;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        getDataFromPayload(payload: Buffer): Content;
    }
}
declare namespace codec {
    class Repeater0x05InputData {
    }
    /**
     * Repeater 0x05 frame builder
     */
    class Repeater0x05Builder implements FrameBuilder<Repeater0x05InputData> {
        readonly deviceType = "repeater";
        readonly frameCode = 5;
        readonly inputDataClass: typeof Repeater0x05InputData;
        buildFrame(inputData: Repeater0x05InputData, network: Network): Buffer;
    }
}
declare namespace codec {
    class RepeaterHelper {
        static hex2bin(hex: string): string;
        static getUPStatusFromPayload(payload: Buffer, appContent: Content): Content;
        static getDownlinkDescriptionForCode(code: number): string | number;
        static getErrorDescriptionForCode(code: number): string | number;
    }
}
declare namespace codec {
    /**
     * Extended status byte parser
     */
    class RepeaterStatusByteParser implements FrameParser {
        readonly deviceType = "repeater";
        readonly frameCode = 0;
        parseFrame(payload: Buffer, configuration: Buffer): {};
    }
}
declare namespace codec {
    /**
     * Temperature 0x10 (configuration) frame parser
     */
    class Temp0x10Parser implements FrameParser {
        readonly deviceType = "temp";
        readonly frameCode = 16;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        /**
         * Get Threshold Triggering text
         * @param value value
         */
        private getThresholdTriggeringText;
    }
}
declare namespace codec {
    /**
     * Temperature 0x11 (configuration) frame parser
     */
    class Temp0x11Parser implements FrameParser {
        readonly deviceType = "temp";
        readonly frameCode = 17;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Temperature 0x12 (configuration) frame parser
     */
    class Temp0x12Parser implements FrameParser {
        readonly deviceType = "temp";
        readonly frameCode = 18;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Temperature 0x30 (keep alive) frame parser
     */
    class Temp0x30Parser implements FrameParser {
        readonly deviceType = "temp";
        readonly frameCode = 48;
        private temp0x43Parser;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Temperature 0x43 (data) frame parser
     */
    class Temp0x43Parser implements FrameParser {
        readonly deviceType = "temp";
        readonly frameCode = 67;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Temperature status byte parser
     */
    class TempStatusByteParser implements FrameParser {
        readonly deviceType = "temp";
        readonly frameCode = 0;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): {
            'status': Content;
        };
    }
}
declare namespace codec {
    /**
     * Temp 3 0x10 (configuration) frame parser
     */
    class TempV30x10Parser implements FrameParser {
        readonly deviceType = "temp3";
        readonly frameCode = 16;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Temp 3 0x30 (keep alive) frame parser
     */
    class TempV30x30Parser implements FrameParser {
        readonly deviceType = "temp3";
        readonly frameCode = 48;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Temp 3 0x57 (data) frame parser
     */
    class TempV30x57Parser implements FrameParser {
        readonly deviceType = "temp3";
        readonly frameCode = 87;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * Temp 3 0x58 (alarm) frame parser
     */
    class TempV30x58Parser implements FrameParser {
        readonly deviceType = "temp3";
        readonly frameCode = 88;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        /**
         * Get Alarm status text
         * @param value value
         */
        private getAlarmStatusText;
    }
}
declare namespace codec {
    /**
     * Temp 3 status byte parser
     */
    class TempV3StatusByteParser implements FrameParser {
        readonly deviceType = "temp3";
        readonly frameCode = 0;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): {
            'status': Content;
        };
    }
}
declare namespace codec {
    /**
     * Tic 0x10 (configuration) frame parser
     */
    class Tic0x10Parser implements FrameParser {
        readonly deviceType = "ticPmePmi|ticCbeLinkyMono|ticCbeLinkyTri";
        readonly frameCode = 16;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
    }
}
declare namespace codec {
    /**
     * TIC 0x49 (data) frame parser
     */
    class Tic0x49Parser implements FrameParser {
        readonly deviceType = "ticPmePmi|ticCbeLinkyMono|ticCbeLinkyTri";
        readonly frameCode = 73;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network, deviceType: string): Content;
        private payloadToString;
        private payloadToValue;
    }
}
declare namespace codec {
    /**
     * Tic 0x4a (alarm) frame parser
     */
    class Tic0x4aParser implements FrameParser {
        readonly deviceType = "ticPmePmi|ticCbeLinkyMono|ticCbeLinkyTri";
        readonly frameCode = 74;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): Content;
        /**
         * Get Threshold Triggering text
         * @param value value
         */
        private getAlarmTypeText;
        private payloadToString;
    }
}
declare namespace codec {
    /**
     * Tic status byte parser
     */
    class TicStatusByteParser implements FrameParser {
        readonly deviceType = "ticPmePmi|ticCbeLinkyMono|ticCbeLinkyTri";
        readonly frameCode = 0;
        parseFrame(payload: Buffer, configuration: Buffer, network: Network): {
            'status': Content;
        };
    }
}
declare namespace codec {
    enum PartialDecodingReason {
        NONE = 0,
        MISSING_NETWORK = 1,
        MISSING_CONFIGURATION = 2
    }
}
declare namespace codec {
    interface Content {
        [key: string]: any;
        type?: string;
        partialDecoding?: PartialDecodingReason;
    }
    class ContentImpl implements Content {
        type: string;
        [key: string]: any;
        partialDecoding: PartialDecodingReason;
        static merge(...contents: Content[]): Content | null;
        constructor(type?: string);
        merge(...contents: Content[]): Content | null;
    }
}
declare namespace codec {
    type Network = 'unknown' | 'lora868' | 'sigfox';
}
declare namespace codec {
    class PlateformCommonUtils {
        /**
         * Get Product Mode text
         * @param value value
         */
        static getProductModeText(value: number): "" | "PARK" | "PRODUCTION" | "TEST" | "DEAD";
    }
}
declare namespace codec {
    enum DecoderProducts {
        analog = "Analog",
        comfort = "Comfort",
        dc = "Dry Contacts",
        deltap = "Delta P",
        motion = "Motion",
        pulse = "Pulse",
        pulse3 = "Pulse 3",
        repeater = "Repeater",
        temp = "Temp",
        temp3 = "Temp 3",
        ticCbeLinkyMono = "TIC CBE/LINKY MONO",
        ticCbeLinkyTri = "TIC CBE/LINKY TRI"
    }
}
