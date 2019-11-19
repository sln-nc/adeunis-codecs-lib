/// <reference path='0x30.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Analog0x30Parser', () => {
  let parser: codec.Analog0x30Parser;

  beforeEach(() => {
    parser = new codec.Analog0x30Parser();
  });

  it('should parse 30400110000002100000', () => {
    const payloadString = '30400110000002100000';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x30 Analog keep alive');
    expect(content['channels'][0].name).to.equal('channel A');
    expect(content['channels'][0].unit).to.equal('V');
    expect(content['channels'][0].value).to.equal(1.049);
    expect(content['channels'][1].name).to.equal('channel B');
    expect(content['channels'][1].unit).to.equal('mA');
    expect(content['channels'][1].value).to.equal(10.486);
  });
});
