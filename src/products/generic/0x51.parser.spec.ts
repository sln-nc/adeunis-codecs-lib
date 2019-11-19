/// <reference path='0x51.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Generic0x51Parser', () => {
  let sb0x51Parser: codec.Generic0x51Parser;

  beforeEach(() => {
    sb0x51Parser = new codec.Generic0x51Parser();
  });

  it('should parse 51a0010000017E0001', () => {
    const payloadString = '51a0010000017E0001';
    const content = sb0x51Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x51 digital input 2 alarm');
    expect(content['state'].previousFrame).to.equal(false);
    expect(content['state'].current).to.equal(true);
    expect(content['counter'].global).to.equal(382);
    expect(content['counter'].instantaneous).to.equal(1);
  });
});
