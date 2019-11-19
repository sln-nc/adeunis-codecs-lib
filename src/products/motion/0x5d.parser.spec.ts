/// <reference path='0x5d.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Motion0x5dParser', () => {
  let parser: codec.Motion0x5dParser;

  beforeEach(() => {
    parser = new codec.Motion0x5dParser();
  });

  it('should parse 5d800132', () => {
    const payloadString = '5d800132';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x5d Motion presence alarm');
    expect(content['alarmPresence'].alarmStatus).to.equal('active');
    expect(content['alarmPresence'].luminosity.value).to.equal(50);
  });
});
