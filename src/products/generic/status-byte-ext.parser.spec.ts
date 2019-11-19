/// <reference path='status-byte-ext.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('GenericStatusByteExtParser', () => {
  let parser: codec.GenericStatusByteExtParser;

  beforeEach(() => {
    parser = new codec.GenericStatusByteExtParser();
  });

  it('should parse 20920501', () => {
    const content = parser.parseFrame(Buffer.from('20920501', 'hex'), Buffer.from(''));
    expect(content['status'].frameCounter).to.equal(4);
    expect(content['status'].hardwareError).to.equal(false);
    expect(content['status'].lowBattery).to.equal(true);
    expect(content['status'].configurationDone).to.equal(false);
    expect(content['status'].configurationInconsistency).to.equal(false);
  });

  it('should parse 20480501', () => {
    const content = parser.parseFrame(Buffer.from('20480501', 'hex'), Buffer.from(''));
    expect(content['status'].frameCounter).to.equal(2);
    expect(content['status'].hardwareError).to.equal(false);
    expect(content['status'].lowBattery).to.equal(false);
    expect(content['status'].configurationDone).to.equal(false);
    expect(content['status'].configurationInconsistency).to.equal(true);
  });
});
