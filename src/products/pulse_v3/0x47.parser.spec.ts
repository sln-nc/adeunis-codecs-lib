/// <reference path='0x47.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('PulseV30x47Parser', () => {
  let pulse0x47Parser: codec.PulseV30x47Parser;

  beforeEach(() => {
    pulse0x47Parser = new codec.PulseV30x47Parser();
  });

  it('should parse 47a00f780000', () => {
    const payloadString = '47a00f780000';
    const content = pulse0x47Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x47 Pulse 3 alarm');
    expect(content['flowValues'][0]).to.equal(3960);
    expect(content['flowValues'][1]).to.equal(0);
  });
});
