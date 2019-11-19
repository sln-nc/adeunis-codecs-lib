/// <reference path='0x10.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('PulseV30x10Parser', () => {
  let parser: codec.PulseV30x10Parser;

  beforeEach(() => {
    parser = new codec.PulseV30x10Parser();
  });

  it('should parse 10000100021B070822003c0001000200030004000500060203020301', () => {
    const payloadString = '10000100021B070822003c0001000200030004000500060203020301';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 Pulse 3 configuration');
    expect(content['productMode']).to.equal('PRODUCTION');
    expect(content['numberOfHistorizationBeforeSending']).to.equal(2);
    expect(content['samplingPeriod'].value).to.equal(3600);
    expect(content['calculatedSendingPeriod'].value).to.equal(7200);
    expect(content['flowCalculationPeriod'].value).to.equal(60);
    expect(content['redundantSamples']).to.equal(1);
    expect(content['channels'][0].name).to.equal('channel A');
    expect(content['channels'][0].state).to.equal('enabled');
    expect(content['channels'][0].type).to.equal('gasPullUpOn');
    expect(content['channels'][0].debouncingPeriod.value).to.equal(10);
    expect(content['channels'][0].leakageDetection.overflowAlarmTriggerThreshold).to.equal(1);
    expect(content['channels'][0].leakageDetection.threshold).to.equal(3);
    expect(content['channels'][0].leakageDetection.dailyPeriodsBelowWhichLeakageAlarmTriggered).to.equal(5);
    expect(content['channels'][0].tamper.activated).to.equal(true);
    expect(content['channels'][0].tamper.samplePeriodForDetection.value).to.equal(20);
    expect(content['channels'][0].tamper.threshold).to.equal(3);
    expect(content['channels'][1].name).to.equal('channel B');
    expect(content['channels'][1].state).to.equal('enabled');
    expect(content['channels'][1].type).to.equal('otherPullUpOff');
    expect(content['channels'][1].debouncingPeriod.value).to.equal(10);
    expect(content['channels'][1].leakageDetection.overflowAlarmTriggerThreshold).to.equal(2);
    expect(content['channels'][1].leakageDetection.threshold).to.equal(4);
    expect(content['channels'][1].leakageDetection.dailyPeriodsBelowWhichLeakageAlarmTriggered).to.equal(6);
    expect(content['channels'][1].tamper.activated).to.equal(false);
    expect(content['channels'][1].tamper.samplePeriodForDetection.value).to.equal(20);
    expect(content['channels'][1].tamper.threshold).to.equal(3);
  });

  it('should parse 10000100021B070822003c', () => {
    const payloadString = '10000100021B070822003c';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 Pulse 3 configuration');
    expect(content['productMode']).to.equal('PRODUCTION');
    expect(content['numberOfHistorizationBeforeSending']).to.equal(2);
    expect(content['samplingPeriod'].value).to.equal(3600);
    expect(content['calculatedSendingPeriod'].value).to.equal(7200);
    expect(content['flowCalculationPeriod'].value).to.equal(60);
    expect(content['channels'][0].name).to.equal('channel A');
    expect(content['channels'][0].state).to.equal('enabled');
    expect(content['channels'][0].type).to.equal('gasPullUpOn');
    expect(content['channels'][0].debouncingPeriod.value).to.equal(10);
    expect(content['channels'][0].tamper.activated).to.equal(true);
    expect(content['channels'][1].name).to.equal('channel B');
    expect(content['channels'][1].state).to.equal('enabled');
    expect(content['channels'][1].type).to.equal('otherPullUpOff');
    expect(content['channels'][1].debouncingPeriod.value).to.equal(10);
    expect(content['channels'][1].tamper.activated).to.equal(false);
  });
});

