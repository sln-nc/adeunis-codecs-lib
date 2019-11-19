/// <reference path='0x42.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Analog0x42Parser', () => {
  let parser: codec.Analog0x42Parser;

  beforeEach(() => {
    parser = new codec.Analog0x42Parser();
  });

  it('should parse 42400100000000000000', () => {
    const payloadString = '42400100000000000000';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x42 Analog data');
    expect(content['channels'][0].name).to.equal('channel A');
    expect(content['channels'][0].unit).to.equal('V');
    expect(content['channels'][0].value).to.equal(0);
    expect(content['channels'][1].name).to.equal('channel B');
    expect(content['channels'][1].state).to.equal('deactivated');
  });
});
