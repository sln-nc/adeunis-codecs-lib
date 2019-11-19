/// <reference path='0x1f.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Generic0x1fParser', () => {
  let parser: codec.Generic0x1fParser;

  beforeEach(() => {
    parser = new codec.Generic0x1fParser();
  });

  it('should parse 1f20410001520002', () => {
    const content = parser.parseFrame(Buffer.from('1f20410001520002', 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x1f digital input configuration');
    expect(content['digitalInput1'].type).to.equal('highEdge');
    expect(content['digitalInput1'].debouncingPeriod.value).to.equal(100);
    expect(content['digitalInput1'].threshold).to.equal(1);
    expect(content['digitalInput2'].type).to.equal('lowEdge');
    expect(content['digitalInput2'].debouncingPeriod.value).to.equal(200);
    expect(content['digitalInput2'].threshold).to.equal(2);
  });

  it('should parse 1f20630010000001', () => {
    const content = parser.parseFrame(Buffer.from('1f20630010000001', 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x1f digital input configuration');
    expect(content['digitalInput1'].type).to.equal('bothEdges');
    expect(content['digitalInput1'].debouncingPeriod.value).to.equal(500);
    expect(content['digitalInput1'].threshold).to.equal(16);
    expect(content['digitalInput2'].type).to.equal('deactivated');
    expect(content['digitalInput2'].debouncingPeriod.value).to.equal(0);
    expect(content['digitalInput2'].threshold).to.equal(1);
  });
});
