/// <reference path='0x10.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Motion0x10Parser', () => {
  let parser: codec.Motion0x10Parser;

  beforeEach(() => {
    parser = new codec.Motion0x10Parser();
  });

  it('should parse frame and return correct config', () => {
    const payloadString = '100021c000030002012c0001';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 Motion configuration');
    expect(content['transmissionPeriodKeepAlive'].value).to.equal(86400);
    expect(content['numberOfHistorizationBeforeSending']).to.equal(3);
    expect(content['numberOfSamplingBeforeHistorization']).to.equal(2);
    expect(content['samplingPeriod'].value).to.equal(600);
    expect(content['presenceDetectorInhibition'].value).to.equal(10);
    expect(content['calculatedPeriodRecording'].value).to.equal(1200);
    expect(content['calculatedSendingPeriod'].value).to.equal(3600);
  });
});
