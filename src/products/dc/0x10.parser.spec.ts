/// <reference path='0x10.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Dc0x10Parser', () => {
  let parser: codec.Dc0x10Parser;

  beforeEach(() => {
    parser = new codec.Dc0x10Parser();
  });

  it('should parse 102090014314070002', () => {
    const payloadString = '102090014314070002';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x10 Dry Contacts configuration');
    expect(content['productMode']).to.equal('TEST');
    expect(content['keepAlivePeriod'].value).to.equal(2880);
    expect(content['transmitPeriod'].value).to.equal(20);
    expect(content['channelA'].type).to.equal('inputPeriodic');
    expect(content['channelA'].edge).to.equal('both');
    expect(content['channelA'].debounceDuration.unit).to.equal('ms');
    expect(content['channelA'].debounceDuration.value).to.equal(100);
    expect(content['channelB'].type).to.equal('inputEvent');
    expect(content['channelB'].edge).to.equal('high');
    expect(content['channelB'].debounceDuration.unit).to.equal('ms');
    expect(content['channelB'].debounceDuration.value).to.equal(10);
    expect(content['channelC'].type).to.equal('output');
    expect(content['channelC'].edge).to.equal('high');
    expect(content['channelD'].type).to.equal('disabled');

  });

});
