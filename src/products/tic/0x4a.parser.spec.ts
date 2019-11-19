/// <reference path='0x4a.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Tic0x4aParser', () => {
  let parser: codec.Tic0x4aParser;

  beforeEach(() => {
    parser = new codec.Tic0x4aParser();
  });

  it('should parse 4aa04144434f00000000000000303231373238303331383139', () => {
    const payloadString = '4aa04144434f00000000000000303231373238303331383139';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x4a TIC alarm');
    expect(content['label']).to.equal('ADCO');
    expect(content['alarmType']).to.equal('manualTrigger');
    expect(content['value']).to.equal('021728031819');
  });
});
