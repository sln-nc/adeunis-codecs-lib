/// <reference path='0x12.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Temp0x12Parser', () => {
  let temp0x12Parser: codec.Temp0x12Parser;

  beforeEach(() => {
    temp0x12Parser = new codec.Temp0x12Parser();
  });

  it('should parse 1280012c0a00320a', () => {
    const payloadString = '1280012c0a003214';
    const content = temp0x12Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x12 Temperature configuration');
    expect(content['threshold'].name).to.equal('probe 2');
    expect(content['threshold'].high.value).to.equal(30);
    expect(content['threshold'].high.hysteresis).to.equal(1);
    expect(content['threshold'].low.value).to.equal(5);
    expect(content['threshold'].low.hysteresis).to.equal(2);
  });
});
