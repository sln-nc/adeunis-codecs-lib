/// <reference path='0x56.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Deltap0x56Parser', () => {
  let parser: codec.Deltap0x56Parser;

  beforeEach(() => {
    parser = new codec.Deltap0x56Parser();
  });

  it('should parse frame and return correct values', () => {
    const payloadString = '56C00101F4';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x56 Delta P - alarm 0-10 V');
    expect(content['alarmStatus']).to.equal('active');
    expect(content['voltage'].value).to.equal(500);
  });
});

