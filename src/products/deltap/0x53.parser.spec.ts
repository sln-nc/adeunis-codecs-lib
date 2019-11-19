/// <reference path='0x53.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Deltap0x53Parser', () => {
  let deltap0x53Parser: codec.Deltap0x53Parser;

  beforeEach(() => {
    deltap0x53Parser = new codec.Deltap0x53Parser();
  });

  it('should parse data frame with historic, WITHOUT known configuration', () => {
    const payloadString = '5320FE0CFF06000000FA01F4';
    const content = deltap0x53Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x53 Delta P periodic data');
    expect(content['deltaPressure'].values[0]).to.equal(-500);
    expect(content['deltaPressure'].values[1]).to.equal(-250);
    expect(content['deltaPressure'].values[2]).to.equal(0);
    expect(content['deltaPressure'].values[3]).to.equal(250);
    expect(content['deltaPressure'].values[4]).to.equal(500);
  });



});
