/// <reference path='0x10.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Temp0x10Parser', () => {
  let temp0x10Parser: codec.Temp0x10Parser;

  beforeEach(() => {
    temp0x10Parser = new codec.Temp0x10Parser();
  });

  it('should parse 102090011003200102010a', () => {
    const payloadString = '102090011003200102010a';
    const content = temp0x10Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 Temperature configuration');
    expect(content['transmissionPeriodKeepAlive'].value).to.equal(2880);
    expect(content['transmissionPeriodData'].value).to.equal(20);
    expect(content['samplingPeriod'].value).to.equal(100);
    expect(content['probes'][0].name).to.equal('probe 1');
    expect(content['probes'][0].id).to.equal(1);
    expect(content['probes'][0].threshold).to.equal('both');
    expect(content['probes'][0].state).to.equal('activated');
    expect(content['probes'][1].name).to.equal('probe 2');
    expect(content['probes'][1].id).to.equal(2);
    expect(content['probes'][1].threshold).to.equal('low');
    expect(content['probes'][1].state).to.equal('deactivated');
    expect(content['productMode']).to.equal('TEST');
  });
});
