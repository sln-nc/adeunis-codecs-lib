/// <reference path='0x5a.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Comfort0x4cParser', () => {
  let PulseV30x5aParser: codec.PulseV30x5aParser;

  beforeEach(() => {
    PulseV30x5aParser = new codec.PulseV30x5aParser();
  });

  it('should parse 5a20000001270001000200030004', () => {
    const payloadString = '5a20000001270001000200030004';
    const content = PulseV30x5aParser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x5a Pulse 3 data - channel A');
    expect(content['counterValues'][0]).to.equal(295);
    expect(content['counterValues'][1]).to.equal(294);
    expect(content['counterValues'][2]).to.equal(292);
    expect(content['counterValues'][3]).to.equal(289);
    expect(content['counterValues'][4]).to.equal(285);
  });
});
