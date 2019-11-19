/// <reference path='0x2f.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Generic0x2fParser', () => {
  let parser: codec.Generic0x2fParser;

  beforeEach(() => {
    parser = new codec.Generic0x2fParser();
  });

  it('should parse 2f206001', () => {
    const payloadString = '2f206001';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''));
    expect(content.type).to.equal('0x2f Downlink ack');
    expect(content['requestStatus']).to.equal('success');
    expect(content['downlinkFramecode']).to.equal('0x60');
  });

  it('should parse 2f206004', () => {
    const payloadString = '2f206004';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''));
    expect(content.type).to.equal('0x2f Downlink ack');
    expect(content['requestStatus']).to.equal('errorInvalidRequest');
    expect(content['downlinkFramecode']).to.equal('0x60');
  });
});
