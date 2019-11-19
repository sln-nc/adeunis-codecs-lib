/// <reference path='0x13.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Analog0x13Parser', () => {
  let parser: codec.Analog0x13Parser;

  beforeEach(() => {
    parser = new codec.Analog0x13Parser();
  });

  it('should parse 13A00C0000000030', () => {
    const payloadString = '13A00C0000000030';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x13 Analog configuration');
    expect(content['threshold'].name).to.equal('channel B');
    expect(content['threshold'].high.value).to.equal(786432);
    expect(content['threshold'].high.hysteresis).to.equal(48);
  });
});
