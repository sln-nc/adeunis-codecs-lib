/// <reference path='status-byte.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('TicStatusByteParser', () => {
  let parser: codec.TicStatusByteParser;

  beforeEach(() => {
    parser = new codec.TicStatusByteParser();
  });

  it('should parse 20520501', () => {
    const payloadString = '20520501';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content['status'].frameCounter).to.equal(2);
    expect(content['status'].lowBattery).to.equal(true);
    expect(content['status'].configurationInconsistency).to.equal(false);
    expect(content['status'].readError).to.equal(true);
  });

  it('should parse 20890501', () => {
    const payloadString = '20890501';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content['status'].frameCounter).to.equal(4);
    expect(content['status'].configurationDone).to.equal(true);
    expect(content['status'].configurationInconsistency).to.equal(true);
    expect(content['status'].readError).to.equal(false);
  });
});

