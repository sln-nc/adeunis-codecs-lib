/// <reference path='0x11.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Pulse0x11Parser', () => {
  let parser: codec.Pulse0x11Parser;

  beforeEach(() => {
    parser = new codec.Pulse0x11Parser();
  });

  it('should parse 11400001000200030004', () => {
    const payloadString = '11400001000200030004';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x11 Pulse configuration');
    expect(content['channels'][0].name).to.equal('channel A');
    expect(content['channels'][0].leakageDetection.overflowAlarmTriggerThreshold).to.equal(1);
    expect(content['channels'][0].leakageDetection.threshold).to.equal(3);
    expect(content['channels'][1].name).to.equal('channel B');
    expect(content['channels'][1].leakageDetection.overflowAlarmTriggerThreshold).to.equal(2);
    expect(content['channels'][1].leakageDetection.threshold).to.equal(4);
  });
});
