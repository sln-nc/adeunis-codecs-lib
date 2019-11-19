/// <reference path='0x30.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('TempV30x30Parser', () => {
  let parser: codec.TempV30x30Parser;

  beforeEach(() => {
    parser = new codec.TempV30x30Parser();
  });

  it('should parse 30E201B3', () => {
    const payloadString = '30E201B3';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x30 Temp 3 keep alive');
    expect(content['temperatures'][0].value).to.equal(43.5);
  });

  it('should parse 301001B301B2', () => {
    const payloadString = '301001B301B2';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x30 Temp 3 keep alive');
    expect(content['temperatures'][0].value).to.equal(43.5);
    expect(content['temperatures'][1].value).to.equal(43.4);
  });

});
