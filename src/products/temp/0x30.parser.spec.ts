/// <reference path='0x30.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Temp0x30Parser', () => {
  let temp0x30Parser: codec.Temp0x30Parser;

  beforeEach(() => {
    temp0x30Parser = new codec.Temp0x30Parser();
  });

  it('should parse 30401100f421ffd8', () => {
    const payloadString = '30401100f421ffd8';
    const content = temp0x30Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x30 Temperature keep alive');
    expect(content['temperatures'][0].name).to.equal('probe 1');
    expect(content['temperatures'][0].id).to.equal(1);
    expect(content['temperatures'][0].value).to.equal(24.4);
    expect(content['temperatures'][0].state).to.equal('activated');
    expect(content['temperatures'][1].name).to.equal('probe 2');
    expect(content['temperatures'][1].id).to.equal(2);
    expect(content['temperatures'][1].value).to.equal(-4);
    expect(content['temperatures'][1].state).to.equal('activated');
  });
});
