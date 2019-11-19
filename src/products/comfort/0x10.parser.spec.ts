/// <reference path='0x10.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Comfort0x10Parser', () => {
  let comfort0x10Parser: codec.Comfort0x10Parser;

  beforeEach(() => {
    comfort0x10Parser = new codec.Comfort0x10Parser();
  });

  it('should parse frame and return correct config', () => {
    const payloadString = '100021c000030002012c';
    const content = comfort0x10Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 Comfort configuration');
    expect(content['transmissionPeriodKeepAlive'].value).to.equal(86400);
    expect(content['numberOfHistorizationBeforeSending']).to.equal(3);
    expect(content['numberOfSamplingBeforeHistorization']).to.equal(2);
    expect(content['samplingPeriod'].value).to.equal(600);
    expect(content['calculatedPeriodRecording'].value).to.equal(1200);
    expect(content['calculatedSendingPeriod'].value).to.equal(3600);
  });
});
