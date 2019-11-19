/// <reference path='0x4c.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Comfort0x4cParser', () => {
  let comfort0x4cParser: codec.Comfort0x4cParser;

  beforeEach(() => {
    comfort0x4cParser = new codec.Comfort0x4cParser();
  });

  it('should parse data frame 4c2000c51f00c72000c82100ca2200cc2300cd24', () => {
    const payloadString = '4c2000c51f00c72000c82100ca2200cc2300cd24';
    const content = comfort0x4cParser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x4c Comfort data');

    expect(content['temperature'].values[0]).to.equal(19.7);
    expect(content['temperature'].values[1]).to.equal(19.9);
    expect(content['temperature'].values[2]).to.equal(20);
    expect(content['temperature'].values[3]).to.equal(20.2);
    expect(content['temperature'].values[4]).to.equal(20.4);
    expect(content['temperature'].values[5]).to.equal(20.5);

    expect(content['humidity'].values[0]).to.equal(31);
    expect(content['humidity'].values[1]).to.equal(32);
    expect(content['humidity'].values[2]).to.equal(33);
    expect(content['humidity'].values[3]).to.equal(34);
    expect(content['humidity'].values[4]).to.equal(35);
    expect(content['humidity'].values[5]).to.equal(36);
  });
});
