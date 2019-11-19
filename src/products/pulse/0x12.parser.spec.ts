/// <reference path='0x12.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Pulse0x12Parser', () => {
  let parser: codec.Pulse0x12Parser;

  beforeEach(() => {
    parser = new codec.Pulse0x12Parser();
  });

  it('should parse 128000050006', () => {
    const payloadString = '128000050006';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x12 Pulse configuration');
    expect(content['channels'][0].name).to.equal('channel A');
    expect(content['channels'][0].leakageDetection.dailyPeriodsBelowWhichLeakageAlarmTriggered).to.equal(5);
    expect(content['channels'][1].name).to.equal('channel B');
    expect(content['channels'][1].leakageDetection.dailyPeriodsBelowWhichLeakageAlarmTriggered).to.equal(6);
  });
});
