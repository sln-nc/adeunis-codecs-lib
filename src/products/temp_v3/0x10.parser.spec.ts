/// <reference path='0x10.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('TempV30x10Parser', () => {
  let temp0x10Parser: codec.TempV30x10Parser;

  beforeEach(() => {
    temp0x10Parser = new codec.TempV30x10Parser();
  });

  it('should parse 101021C000030002070800', () => {
    const payloadString = '101021C000030002070800';
    const content = temp0x10Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 Temp 3 configuration');
    expect(content['transmissionPeriodKeepAlive'].value).to.equal(86400);
    expect(content['numberOfHistorizationBeforeSending']).to.equal(3);
    expect(content['numberOfSamplingBeforeHistorization']).to.equal(2);
    expect(content['samplingPeriod'].value).to.equal(3600);
    expect(content['redundantSamples']).to.equal(0);
    expect(content['calculatedPeriodRecording'].value).to.equal(7200);
    expect(content['calculatedSendingPeriod'].value).to.equal(21600);
  });
});
