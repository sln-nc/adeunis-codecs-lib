/// <reference path='0x12.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('PulseV30x12Parser', () => {
  let parser: codec.PulseV30x12Parser;

  beforeEach(() => {
    parser = new codec.PulseV30x12Parser();
  });

  it('should parse 1280000500060203020301', () => {
    const payloadString = '1280000500060203020301';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'sigfox');
    expect(content.type).to.equal('0x12 Pulse 3 configuration');
    expect(content['channels'][0].name).to.equal('channel A');
    expect(content['channels'][0].leakageDetection.dailyPeriodsBelowWhichLeakageAlarmTriggered).to.equal(5);
    expect(content['channels'][0].tamper.samplePeriodForDetection.value).to.equal(20);
    expect(content['channels'][0].tamper.threshold).to.equal(3);
    expect(content['channels'][1].name).to.equal('channel B');
    expect(content['channels'][1].leakageDetection.dailyPeriodsBelowWhichLeakageAlarmTriggered).to.equal(6);
    expect(content['channels'][1].tamper.samplePeriodForDetection.value).to.equal(20);
    expect(content['channels'][1].tamper.threshold).to.equal(3);
  });
});

