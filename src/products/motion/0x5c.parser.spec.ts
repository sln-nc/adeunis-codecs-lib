/// <reference path='0x5c.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Motion0x5cParser', () => {
  let parser: codec.Motion0x5cParser;

  beforeEach(() => {
    parser = new codec.Motion0x5cParser();
  });

  it('should parse 5c80011e320020', () => {
    const content = parser.parseFrame(Buffer.from('5c80011e320020', 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x5c Motion data');
    expect(content['presenceDetectedWhenSending']).to.equal(true);
    expect(content['presence'].values[0]).to.equal(30);
    expect(content['luminosity'].values[0]).to.equal(50);
    expect(content['presence'].values[1]).to.equal(0);
    expect(content['luminosity'].values[1]).to.equal(32);
  });
});
