/// <reference path='0x40.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Dc0x40Parser', () => {
  let parser: codec.Dc0x40Parser;

  beforeEach(() => {
    parser = new codec.Dc0x40Parser();
  });

  it('should parse 4040000100000005000201', () => {
    const payloadString = '4040000100000005000201';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x40 Dry Contacts data');
    expect(content['channelA'].value).to.equal(1);
    expect(content['channelA'].currentState).to.equal(true);
    expect(content['channelA'].previousFrameState).to.equal(false);
    expect(content['channelB'].value).to.equal(0);
    expect(content['channelB'].currentState).to.equal(false);
    expect(content['channelB'].previousFrameState).to.equal(false);
    expect(content['channelC'].value).to.equal(5);
    expect(content['channelC'].currentState).to.equal(false);
    expect(content['channelC'].previousFrameState).to.equal(false);
    expect(content['channelD'].value).to.equal(2);
    expect(content['channelD'].currentState).to.equal(false);
    expect(content['channelD'].previousFrameState).to.equal(false);
  });

});
