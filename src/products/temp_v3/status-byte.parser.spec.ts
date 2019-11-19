/// <reference path='status-byte.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('TempV3StatusByteParser', () => {
  let parser: codec.TempV3StatusByteParser;

  beforeEach(() => {
    parser = new codec.TempV3StatusByteParser();
  });

  it('should parse 20920501', () => {
    const payloadString = '20920501';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');

    expect(content['status'].frameCounter).to.equal(4);
    expect(content['status'].hardwareError).to.equal(false);
    expect(content['status'].lowBattery).to.equal(true);
    expect(content['status'].configurationDone).to.equal(false);
    expect(content['status'].configurationInconsistency).to.equal(false);
    expect(content['status'].configuration2ChannelsActivated).to.equal(true);
  });

  it('should parse 20480501', () => {
    const payloadString = '20480501';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');

    expect(content['status'].frameCounter).to.equal(2);
    expect(content['status'].hardwareError).to.equal(false);
    expect(content['status'].lowBattery).to.equal(false);
    expect(content['status'].configurationDone).to.equal(false);
    expect(content['status'].configurationInconsistency).to.equal(true);
    expect(content['status'].configuration2ChannelsActivated).to.equal(false);
  });
});
