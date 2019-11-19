/// <reference path='0x46.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Pulse0x46Parser', () => {
  let pulse0x46Parser: codec.Pulse0x46Parser;

  beforeEach(() => {
    pulse0x46Parser = new codec.Pulse0x46Parser();
  });

  it('should parse 46800000009f00000002', () => {
    const payloadString = '46800000009f00000002';
    const content = pulse0x46Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x46 Pulse data');
    expect(content['counterValues'][0]).to.equal(159);
    expect(content['counterValues'][1]).to.equal(2);
  });
});
