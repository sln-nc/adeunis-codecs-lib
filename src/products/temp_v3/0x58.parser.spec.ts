/// <reference path='0x58.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('TempV30x58Parser', () => {
  let parser: codec.TempV30x58Parser;

  beforeEach(() => {
    parser = new codec.TempV30x58Parser();
  });

  it('should parse 5880010032', () => {
    const payloadString = '5880010032';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x58 Temp 3 alarm');
    expect(content['alarms'][0].alarmStatus).to.equal('highThreshold');
    expect(content['alarms'][0].temperature.value).to.equal(5);
  });

  it('should parse 5890000032020032', () => {
    const payloadString = '5890000028020032';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x58 Temp 3 alarm');
    expect(content['alarms'][0].alarmStatus).to.equal('none');
    expect(content['alarms'][0].temperature.value).to.equal(4);
    expect(content['alarms'][1].alarmStatus).to.equal('lowThreshold');
    expect(content['alarms'][1].temperature.value).to.equal(5);
  });
});
