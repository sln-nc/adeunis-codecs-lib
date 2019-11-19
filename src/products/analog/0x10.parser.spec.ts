/// <reference path='0x10.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Analog0x10Parser', () => {
  let parser: codec.Analog0x10Parser;

  beforeEach(() => {
    parser = new codec.Analog0x10Parser();
  });

  it('should parse 102090061100224101', () => {
    const payloadString = '102090061100224101';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 Analog configuration');
    expect(content['transmissionPeriodKeepAlive'].value).to.equal(1440);
    expect(content['transmissionPeriodData'].value).to.equal(60);
    expect(content['channels'][0].name).to.equal('channel A');
    expect(content['channels'][0].id).to.equal(1);
    expect(content['channels'][0].type).to.equal('0-10V');
    expect(content['channels'][0].threshold).to.equal('none');
    expect(content['channels'][0].externalTrigger.type).to.equal('none');
    expect(content['channels'][0].externalTrigger.debounceDuration.value).to.equal(0);
    expect(content['channels'][1].name).to.equal('channel B');
    expect(content['channels'][1].id).to.equal(2);
    expect(content['channels'][1].type).to.equal('4-20mA');
    expect(content['channels'][1].threshold).to.equal('low');
    expect(content['channels'][1].externalTrigger.type).to.equal('none');
    expect(content['channels'][1].externalTrigger.debounceDuration.value).to.equal(100);
    expect(content['productMode']).to.equal('PRODUCTION');
  });

  it('should parse 10409006117F00AA02', () => {
    const payloadString = '10409006117F00AA02';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 Analog configuration');
    expect(content['transmissionPeriodKeepAlive'].value).to.equal(2880);
    expect(content['transmissionPeriodData'].value).to.equal(120);
    expect(content['channels'][0].name).to.equal('channel A');
    expect(content['channels'][0].id).to.equal(1);
    expect(content['channels'][0].type).to.equal('0-10V');
    expect(content['channels'][0].threshold).to.equal('both');
    expect(content['channels'][0].externalTrigger.type).to.equal('both');
    expect(content['channels'][0].externalTrigger.debounceDuration.value).to.equal(1);
    expect(content['channels'][1].name).to.equal('channel B');
    expect(content['channels'][1].id).to.equal(0);
    expect(content['channels'][1].type).to.equal('deactivated');
    expect(content['productMode']).to.equal('TEST');
  });
});
