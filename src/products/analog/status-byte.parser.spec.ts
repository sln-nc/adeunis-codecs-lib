/// <reference path='status-byte.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('AnalogStatusByteParser', () => {
  let parser: codec.AnalogStatusByteParser;

  beforeEach(() => {
    parser = new codec.AnalogStatusByteParser();
  });

  it('should parse 20520501', () => {
    const payloadString = '20520501';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content['status'].frameCounter).to.equal(2);
    expect(content['status'].lowBattery).to.equal(true);
    expect(content['status'].alarmChannelA).to.equal(false);
    expect(content['status'].alarmChannelB).to.equal(true);
  });

  it('should parse 20890501', () => {
    const payloadString = '20890501';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content['status'].frameCounter).to.equal(4);
    expect(content['status'].configurationDone).to.equal(true);
    expect(content['status'].alarmChannelA).to.equal(true);
    expect(content['status'].alarmChannelB).to.equal(false);
  });
});

