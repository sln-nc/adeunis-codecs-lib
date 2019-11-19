/// <reference path='0x57.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('TempV30x57Parser', () => {
  let parser: codec.TempV30x57Parser;

  beforeEach(() => {
    parser = new codec.TempV30x57Parser();
  });

  it('should parse 571001B301B2', () => {
    const payloadString = '571001B301B2';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x57 Temp 3 periodic data');
    expect(content['temperatures'][0].values[0]).to.equal(43.5);
    expect(content['temperatures'][1].values[0]).to.equal(43.4);
  });

  it('should parse 570001B3800001B201B1', () => {
    const payloadString = '570001B3800001B201B1';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x57 Temp 3 periodic data');
    expect(content['temperatures'][0].values[0]).to.equal(43.5);
    expect(content['temperatures'][0].values[1]).to.equal(-3276.8);
    expect(content['temperatures'][0].values[2]).to.equal(43.4);
    expect(content['temperatures'][0].values[3]).to.equal(43.3);
  });

  it('should parse 579201B3FF9C01F4FFFF', () => {
    const payloadString = '579201B3FF9C01F4FFFF';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x57 Temp 3 periodic data');
    expect(content['temperatures'][0].values[0]).to.equal(43.5);
    expect(content['temperatures'][0].values[1]).to.equal(50);
    expect(content['temperatures'][1].values[0]).to.equal(-10);
    expect(content['temperatures'][1].values[1]).to.equal(-0.1);
  });
});
