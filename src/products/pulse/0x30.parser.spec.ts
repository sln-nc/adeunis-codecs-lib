/// <reference path='0x30.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Pulse0x30Parser', () => {
  let parser: codec.Pulse0x30Parser;

  beforeEach(() => {
    parser = new codec.Pulse0x30Parser();
  });

  it('should parse 30e0150400030002000100', () => {
    const payloadString = '30e0150400030002000100';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x30 Pulse keep alive');
    expect(content['channels'][0].name).to.equal('channel A');
    expect(content['channels'][0].flow.alarm).to.equal(true);
    expect(content['channels'][0].flow.last24hMin).to.equal(512);
    expect(content['channels'][0].flow.last24hMax).to.equal(1024);
    expect(content['channels'][0].tamperAlarm).to.equal(true);
    expect(content['channels'][0].leakageAlarm).to.equal(true);
    expect(content['channels'][1].name).to.equal('channel B');
    expect(content['channels'][1].flow.alarm).to.equal(false);
    expect(content['channels'][1].flow.last24hMin).to.equal(256);
    expect(content['channels'][1].flow.last24hMax).to.equal(768);
    expect(content['channels'][1].tamperAlarm).to.equal(false);
    expect(content['channels'][1].leakageAlarm).to.equal(false);
  });
});
