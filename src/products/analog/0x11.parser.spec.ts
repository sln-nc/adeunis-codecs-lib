/// <reference path='0x11.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Analog0x11Parser', () => {
  let parser: codec.Analog0x11Parser;

  beforeEach(() => {
    parser = new codec.Analog0x11Parser();
  });

  it('should parse 11600A0000000010', () => {
    const payloadString = '11600A0000000010';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x11 Analog configuration');
    expect(content['threshold'].name).to.equal('channel A');
    expect(content['threshold'].high.value).to.equal(655360);
    expect(content['threshold'].high.hysteresis).to.equal(16);
  });
});
