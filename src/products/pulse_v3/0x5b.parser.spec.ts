/// <reference path='0x5b.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Comfort0x4cParser', () => {
  let PulseV30x5bParser: codec.PulseV30x5bParser;

  beforeEach(() => {
    PulseV30x5bParser = new codec.PulseV30x5bParser();
  });

  it('should parse 5b20000001270001000200030004', () => {
    const payloadString = '5b20000001270001000200030004';
    const content = PulseV30x5bParser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x5b Pulse 3 data - channel B');
    expect(content['counterValues'][0]).to.equal(295);
    expect(content['counterValues'][1]).to.equal(294);
    expect(content['counterValues'][2]).to.equal(292);
    expect(content['counterValues'][3]).to.equal(289);
    expect(content['counterValues'][4]).to.equal(285);
  });
});
