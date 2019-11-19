/// <reference path='0x11.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Temp0x11Parser', () => {
  let temp0x11Parser: codec.Temp0x11Parser;

  beforeEach(() => {
    temp0x11Parser = new codec.Temp0x11Parser();
  });

  it('should parse 1160012c0a00321404', () => {
    const payloadString = '1160012c0a00321404';
    const content = temp0x11Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x11 Temperature configuration');
    expect(content['threshold'].name).to.equal('probe 1');
    expect(content['threshold'].high.value).to.equal(30);
    expect(content['threshold'].high.hysteresis).to.equal(1);
    expect(content['threshold'].low.value).to.equal(5);
    expect(content['threshold'].low.hysteresis).to.equal(2);
    expect(content['superSamplingFactor']).to.equal(4);
  });
});
