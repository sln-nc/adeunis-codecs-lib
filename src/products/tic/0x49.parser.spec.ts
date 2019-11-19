/// <reference path='0x49.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Tic0x49Parser', () => {
  let parser: codec.Tic0x49Parser;

  beforeEach(() => {
    parser = new codec.Tic0x49Parser();
  });

  it('should parse 494030323137323830333138313948432e2e800000000000002d' +
    '000000000000000000000000000000000000000048502e2e', () => {
    const payloadString = '494030323137323830333138313948432e2e800000000000002d' +
      '000000000000000000000000000000000000000048502e2e';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown', 'ticCbeLinkyMono');
    expect(content.type).to.equal('0x49 TIC data');
    expect(content['ADCO']).to.equal('021728031819');
    expect(content['OPTARIF']).to.equal('HC..');
    expect(content['BASE']).to.equal('notFound');
    expect(content['ISOUSC'].value).to.equal(45);
    expect(content['IINST'].value).to.equal(0);
    expect(content['IMAX'].value).to.equal(0);
    expect(content['PAPP'].value).to.equal(0);
    expect(content['HCHC'].value).to.equal(0);
    expect(content['HCHP'].value).to.equal(0);
    expect(content['PTEC']).to.equal('HP..');
  });

  it('should parse 4940303231373238303331383139000012340000002b0000002c0000002d' + '' +
    '0000001100000012000000130000002000000010', () => {
    const payloadString = '4940303231373238303331383139000012340000002b0000002c0000002d' +
      '0000001100000012000000130000002000000010';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown', 'ticCbeLinkyTri');
    expect(content.type).to.equal('0x49 TIC data');
    expect(content['ADCO']).to.equal('021728031819');
    expect(content['BASE'].value).to.equal(4660);
    expect(content['IINST1'].value).to.equal(43);
    expect(content['IINST2'].value).to.equal(44);
    expect(content['IINST3'].value).to.equal(45);
    expect(content['IMAX1'].value).to.equal(17);
    expect(content['IMAX2'].value).to.equal(18);
    expect(content['IMAX3'].value).to.equal(19);
    expect(content['PMAX'].value).to.equal(32);
    expect(content['PAPP'].value).to.equal(16);
  });
});
