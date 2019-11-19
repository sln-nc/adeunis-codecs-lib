/// <reference path='0x10.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Pulse0x10Parser', () => {
  let parser: codec.Pulse0x10Parser;

  beforeEach(() => {
    parser = new codec.Pulse0x10Parser();
  });

  it('should parse 1020010003920125003c000100020003000400050006', () => {
    const payloadString = '1020010003920125003c000100020003000400050006';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 Pulse configuration');
    expect(content['productMode']).to.equal('PRODUCTION');
    expect(content['transmissionPeriod'].value).to.equal(3);
    expect(content['flowCalculationPeriod'].value).to.equal(60);
    expect(content['channels'][0].name).to.equal('channel A');
    expect(content['channels'][0].state).to.equal('disabled');
    expect(content['channels'][0].type).to.equal('gasPullUpOn');
    expect(content['channels'][0].debouncingPeriod.value).to.equal(100);
    expect(content['channels'][0].leakageDetection.overflowAlarmTriggerThreshold).to.equal(1);
    expect(content['channels'][0].leakageDetection.threshold).to.equal(3);
    expect(content['channels'][0].leakageDetection.dailyPeriodsBelowWhichLeakageAlarmTriggered).to.equal(5);
    expect(content['channels'][0].tamperActivated).to.equal(false);
    expect(content['channels'][1].name).to.equal('channel B');
    expect(content['channels'][1].state).to.equal('enabled');
    expect(content['channels'][1].type).to.equal('otherPullUpOff');
    expect(content['channels'][1].debouncingPeriod.value).to.equal(10);
    expect(content['channels'][1].leakageDetection.overflowAlarmTriggerThreshold).to.equal(2);
    expect(content['channels'][1].leakageDetection.threshold).to.equal(4);
    expect(content['channels'][1].leakageDetection.dailyPeriodsBelowWhichLeakageAlarmTriggered).to.equal(6);
    expect(content['channels'][1].tamperActivated).to.equal(true);
  });

  it('should parse 102001039a0125003c', () => {
    const payloadString = '102001039a0125003c';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 Pulse configuration');
    expect(content['productMode']).to.equal('PRODUCTION');
    expect(content['transmissionPeriod'].value).to.equal(30);
    expect(content['flowCalculationPeriod'].value).to.equal(60);
    expect(content['channels'][0].name).to.equal('channel A');
    expect(content['channels'][0].state).to.equal('disabled');
    expect(content['channels'][0].type).to.equal('gasPullUpOn');
    expect(content['channels'][0].debouncingPeriod.value).to.equal(100);
    expect(content['channels'][0].tamperActivated).to.equal(true);
    expect(content['channels'][1].name).to.equal('channel B');
    expect(content['channels'][1].state).to.equal('enabled');
    expect(content['channels'][1].type).to.equal('otherPullUpOff');
    expect(content['channels'][1].debouncingPeriod.value).to.equal(10);
    expect(content['channels'][1].tamperActivated).to.equal(true);
  });


});
