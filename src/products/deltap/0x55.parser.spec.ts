/// <reference path='0x55.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Deltap0x55Parser', () => {
  let parser: codec.Deltap0x55Parser;

  beforeEach(() => {
    parser = new codec.Deltap0x55Parser();
  });

  it('should parse 55A0D8F0EC78000013882710', () => {
    const payloadString = '55A0D8F0EC78000013882710';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x55 Delta P - periodic 0-10 V');
    expect(content['voltage'].values[0]).to.equal(-10000);
    expect(content['voltage'].values[1]).to.equal(-5000);
    expect(content['voltage'].values[2]).to.equal(0);
    expect(content['voltage'].values[3]).to.equal(5000);
    expect(content['voltage'].values[4]).to.equal(10000);
  });
});

