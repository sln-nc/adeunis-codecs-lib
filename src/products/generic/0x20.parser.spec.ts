/// <reference path='0x20.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Generic0x20Parser', () => {
  let parser: codec.Generic0x20Parser;

  beforeEach(() => {
    parser = new codec.Generic0x20Parser();
  });

  it('should parse 20a00501 (LoRa 868)', () => {
    const payloadString = '20a00501';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'),
                                                 Buffer.from(''), 'unknown', 'pulse3');
    expect(content.type).to.equal('0x20 Configuration');
    expect(content['loraAdr']).to.equal(true);
    expect(content['loraProvisioningMode']).to.equal('OTAA');
    expect(content['loraDutycyle']).to.equal('activated');
    expect(content['loraClassMode']).to.equal('CLASS A');
  });

  it('should parse 20a00100 (LoRa 868)', () => {
    const payloadString = '20a00100';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'),
      Buffer.from(''), 'unknown', 'pulse3');
    expect(content.type).to.equal('0x20 Configuration');
    expect(content['loraAdr']).to.equal(true);
    expect(content['loraProvisioningMode']).to.equal('ABP');
    expect(content['loraDutycyle']).to.equal('deactivated');
    expect(content['loraClassMode']).to.equal('CLASS A');
  });

  it('should parse 20a02101 (LoRa 868)', () => {
    const payloadString = '20a02101';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'),
      Buffer.from(''), 'unknown', 'dc');
    expect(content.type).to.equal('0x20 Configuration');
    expect(content['loraAdr']).to.equal(true);
    expect(content['loraProvisioningMode']).to.equal('OTAA');
    expect(content).to.not.have.property('loraDutycyle');
    expect(content['loraClassMode']).to.equal('CLASS C');
  });

  it('should parse 206002 (Sigfox)', () => {
    const payloadString = '206002';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'),
                                                 Buffer.from(''), 'unknown', 'pulse3');
    expect(content.type).to.equal('0x20 Configuration');
    expect(content['sigfoxRetry']).to.equal(2);
  });
});
