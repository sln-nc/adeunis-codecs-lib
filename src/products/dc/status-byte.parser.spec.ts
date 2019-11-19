/// <reference path='status-byte.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('DcStatusByteParser', () => {
  let parser: codec.DcStatusByteParser;

  beforeEach(() => {
    parser = new codec.DcStatusByteParser();
  });

  it('should parse 20820501', () => {
    const payloadString = '20820501';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''));

    expect(content['status'].frameCounter).to.equal(4);
    expect(content['status'].hardwareError).to.equal(false);
    expect(content['status'].lowBattery).to.equal(true);
    expect(content['status'].configurationDone).to.equal(false);
  });

  it('should parse 20490501', () => {
    const payloadString = '20490501';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''));

    expect(content['status'].frameCounter).to.equal(2);
    expect(content['status'].hardwareError).to.equal(false);
    expect(content['status'].lowBattery).to.equal(false);
    expect(content['status'].configurationDone).to.equal(true);
  });
});
