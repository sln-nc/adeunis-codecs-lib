namespace codec {

  /**
   * Frame parser interface
   */
  export interface FrameParser {

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
    parseFrame(payload: Buffer, configuration: Buffer, network: Network,  deviceType: string): Content;

  }

}
