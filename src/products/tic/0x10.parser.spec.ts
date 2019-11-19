/// <reference path='0x10.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Tic0x10Parser', () => {
  let parser: codec.Tic0x10Parser;

  beforeEach(() => {
    parser = new codec.Tic0x10Parser();
  });

  it('should parse 1000900001020005', () => {
    const payloadString = '1000900001020005';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 TIC configuration');
    expect(content['transmissionPeriodKeepAlive'].value).to.equal(2880);
    expect(content['samplingPeriod'].value).to.equal(100);
    expect(content['transmissionPeriodData']).to.equal(1);
    expect(content['productMode']).to.equal('TEST');
  });

  it('should parse 1000900002010005', () => {
    const payloadString = '1000900002010005';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 TIC configuration');
    expect(content['transmissionPeriodKeepAlive'].value).to.equal(1440);
    expect(content['samplingPeriod'].value).to.equal(5);
    expect(content['transmissionPeriodData']).to.equal(2);
    expect(content['productMode']).to.equal('PRODUCTION');
  });
});
