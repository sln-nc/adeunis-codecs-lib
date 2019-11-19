/// <reference path='0x43.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Temp0x43Parser', () => {
  let parser: codec.Temp0x43Parser;

  beforeEach(() => {
    parser = new codec.Temp0x43Parser();
  });

  it('should parse 43401100f4200000', () => {
    const payloadString = '43401100f4200000';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x43 Temperature data');
    expect(content['temperatures'][0].name).to.equal('probe 1');
    expect(content['temperatures'][0].id).to.equal(1);
    expect(content['temperatures'][0].value).to.equal(24.4);
    expect(content['temperatures'][0].state).to.equal('activated');
    expect(content['temperatures'][1].name).to.equal('probe 2');
    expect(content['temperatures'][1].id).to.equal(2);
    expect(content['temperatures'][1].value).to.equal(0);
    expect(content['temperatures'][1].state).to.equal('deactivated');
  });

  it('should parse 43400100f4028000', () => {
    const payloadString = '43400100f4028000';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x43 Temperature data');
    expect(content['temperatures'][0].name).to.equal('probe 1');
    expect(content['temperatures'][0].id).to.equal(0);
    expect(content['temperatures'][0].value).to.equal(24.4);
    expect(content['temperatures'][1].name).to.equal('probe 2');
    expect(content['temperatures'][1].id).to.equal(0);
    expect(content['temperatures'][1].value).to.equal(-3276.8);
  });
});
