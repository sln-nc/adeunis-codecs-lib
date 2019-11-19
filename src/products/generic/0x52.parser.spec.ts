/// <reference path='0x52.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Generic0x52Parser', () => {
  let sb0x52Parser: codec.Generic0x52Parser;

  beforeEach(() => {
    sb0x52Parser = new codec.Generic0x52Parser();
  });

  it('should parse 52a202000001000003', () => {
    const payloadString = '52a202000001000003';
    const content = sb0x52Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x52 digital input 2 alarm');
    expect(content['state'].previousFrame).to.equal(true);
    expect(content['state'].current).to.equal(false);
    expect(content['counter'].global).to.equal(256);
    expect(content['counter'].instantaneous).to.equal(3);
  });
});
