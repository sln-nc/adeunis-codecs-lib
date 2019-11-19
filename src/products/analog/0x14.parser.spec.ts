/// <reference path='0x14.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Analog0x14Parser', () => {
  let parser: codec.Analog0x14Parser;

  beforeEach(() => {
    parser = new codec.Analog0x14Parser();
  });

  it('should parse 14C00E0000000040', () => {
    const payloadString = '14C00E0000000040';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x14 Analog configuration');
    expect(content['threshold'].name).to.equal('channel B');
    expect(content['threshold'].low.value).to.equal(917504);
    expect(content['threshold'].low.hysteresis).to.equal(64);
  });
});
