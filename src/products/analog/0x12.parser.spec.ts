/// <reference path='0x12.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Analog0x12Parser', () => {
  let parser: codec.Analog0x12Parser;

  beforeEach(() => {
    parser = new codec.Analog0x12Parser();
  });

  it('should parse 12800B0000000020', () => {
    const payloadString = '12800B0000000020';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x12 Analog configuration');
    expect(content['threshold'].name).to.equal('channel A');
    expect(content['threshold'].low.value).to.equal(720896);
    expect(content['threshold'].low.hysteresis).to.equal(32);
  });
});
