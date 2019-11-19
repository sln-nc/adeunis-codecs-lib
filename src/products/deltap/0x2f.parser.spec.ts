/// <reference path='0x2f.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Deltap0x2fParser', () => {
  let parser: codec.Deltap0x2fParser;

  beforeEach(() => {
    parser = new codec.Deltap0x2fParser();
  });

  it('should parse 2f2001', () => {
    const payloadString = '2f2001';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''));
    expect(content.type).to.equal('0x2f Delta P Downlink ack');
    expect(content['requestStatus']).to.equal('success');
  });

  it('should parse 2f2004', () => {
    const payloadString = '2f2004';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''));
    expect(content.type).to.equal('0x2f Delta P Downlink ack');
    expect(content['requestStatus']).to.equal('errorInvalidRequest');
  });

});
