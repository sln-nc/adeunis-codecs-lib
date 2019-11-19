/// <reference path='0x4d.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Comfort0x4dParser', () => {
  let parser: codec.Comfort0x4dParser;

  beforeEach(() => {
    parser = new codec.Comfort0x4dParser();
  });

  it('should parse 4dc010010832', () => {
    const content = parser.parseFrame(Buffer.from('4dc010010832', 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x4d Comfort alarm');
    expect(content['alarmTemperature'].alarmStatus).to.equal('active');
    expect(content['alarmTemperature'].temperature.value).to.equal(26.4);
    expect(content['alarmHumidity'].alarmStatus).to.equal('inactive');
    expect(content['alarmHumidity'].humidity.value).to.equal(50);
  });
});
