/// <reference path='0x50.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Motion0x50Parser', () => {
  let motion0x50Parser: codec.Motion0x50Parser;

  beforeEach(() => {
    motion0x50Parser = new codec.Motion0x50Parser();
  });

  it('should parse 50000121', () => {
    const payloadString = '50000121';
    const content = motion0x50Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x50 Motion luminosity alarm');
    expect(content['alarmLuminosity'].alarmStatus).to.equal('active');
    expect(content['alarmLuminosity'].luminosity.value).to.equal(33);
  });
});
