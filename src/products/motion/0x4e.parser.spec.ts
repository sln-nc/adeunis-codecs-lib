/// <reference path='0x4e.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Motion0x4eParser', () => {
  let motion0x4eParser: codec.Motion0x4eParser;

  beforeEach(() => {
    motion0x4eParser = new codec.Motion0x4eParser();
  });

  it('should parse 4e284a9a001542000148', () => {
    const content = motion0x4eParser.parseFrame(Buffer.from('4e284a9a001542000148', 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x4e Motion data');
    expect(content['globalCounterValue']).to.equal(19098);
    expect(content['counterValues'][0]).to.equal(21);
    expect(content['luminosity'].values[0]).to.equal(66);
    expect(content['counterValues'][1]).to.equal(1);
    expect(content['luminosity'].values[1]).to.equal(72);
  });

});
