/// <reference path='0x33.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Generic0x33Parser', () => {
  let parser: codec.Generic0x33Parser;

  beforeEach(() => {
    parser = new codec.Generic0x33Parser();
  });

  it('should parse 3380040140', () => {
    const payloadString = '3380040140';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x33 Set register status');
    expect(content['requestStatus']).to.equal('errorInvalidRegister');
    expect(content['registerId']).to.equal(320);
  });

  it('should parse 3380010000', () => {
    const payloadString = '3380010000';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x33 Set register status');
    expect(content['requestStatus']).to.equal('success');
    expect(content['registerId']).to.equal(0);
  });


});
