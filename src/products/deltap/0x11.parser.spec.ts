/// <reference path='0x11.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Deltap0x11Parser', () => {
  let parser: codec.Deltap0x11Parser;

  beforeEach(() => {
    parser = new codec.Deltap0x11Parser();
  });

  it('should parse 11400003012c0002', () => {
    const payloadString = '11400003012c0002';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x11 Delta P 0-10V configuration');
    expect(content['numberOfSamplingBeforeHistorization']).to.equal(3);
    expect(content['samplingPeriod'].value).to.equal(600);
    expect(content['numberOfHistorizationBeforeSending']).to.equal(2);
    expect(content['calculatedPeriodRecording'].value).to.equal(1800);
    expect(content['calculatedSendingPeriod'].value).to.equal(3600);
  });
});

