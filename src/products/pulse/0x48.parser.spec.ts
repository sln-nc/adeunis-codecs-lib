/// <reference path='0x48.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Pulse0x48Parser', () => {
  let pulse0x48Parser: codec.Pulse0x48Parser;

  beforeEach(() => {
    pulse0x48Parser = new codec.Pulse0x48Parser();
  });

  it('should parse 4820000000010000000200000100020003000400050006000700080009000a', () => {
    const payloadString = '4820000000010000000200000100020003000400050006000700080009000a';
    const content = pulse0x48Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    expect(content.type).to.equal('0x48 Pulse historic data');
    expect(content['frameIndex']).to.equal(0);
    expect(content['baseTime']).to.equal(1);
    expect(content['channels'][0].index).to.equal(256);
    expect(content['channels'][0].deltaValues[0]).to.equal(1);
    expect(content['channels'][0].deltaValues[1]).to.equal(3);
    expect(content['channels'][0].deltaValues[2]).to.equal(5);
    expect(content['channels'][0].deltaValues[3]).to.equal(7);
    expect(content['channels'][0].deltaValues[4]).to.equal(9);
    expect(content['channels'][1].index).to.equal(512);
    expect(content['channels'][1].deltaValues[0]).to.equal(2);
    expect(content['channels'][1].deltaValues[1]).to.equal(4);
    expect(content['channels'][1].deltaValues[2]).to.equal(6);
    expect(content['channels'][1].deltaValues[3]).to.equal(8);
    expect(content['channels'][1].deltaValues[4]).to.equal(10);
  });

    it('should parse 4820000000010000000200', () => {
        const payloadString = '4820000000010000000200';
        const content = pulse0x48Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
        expect(content.type).to.equal('0x48 Pulse historic data');
        expect(content['frameIndex']).to.equal(0);
        expect(content['channels'][0].index).to.equal(256);
        expect(content['channels'][1].index).to.equal(512);
    });

    it('should parse 4820010001000200030004', () => {
        const payloadString = '4820010001000200030004';
        const content = pulse0x48Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
        expect(content.type).to.equal('0x48 Pulse historic data');
        expect(content['frameIndex']).to.equal(1);
        expect(content['baseTime']).to.equal(1);
        expect(content['channels'][0].deltaValues[0]).to.equal(1);
        expect(content['channels'][0].deltaValues[1]).to.equal(3);
        expect(content['channels'][1].deltaValues[0]).to.equal(2);
        expect(content['channels'][1].deltaValues[1]).to.equal(4);
    });

    it('should parse 4820000000010000000200000100020003000400050006000700080009000a000b000c000d000e000f00100011001200130014', () => {
        const payloadString = '4820000000010000000200000100020003000400050006000700080009000a000b000c000d000e000f00100011001200130014';
        const content = pulse0x48Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
        expect(content.type).to.equal('0x48 Pulse historic data');
        expect(content['frameIndex']).to.equal(0);
        expect(content['baseTime']).to.equal(1);
        expect(content['channels'][0].index).to.equal(256);
        expect(content['channels'][0].deltaValues[0]).to.equal(1);
        expect(content['channels'][0].deltaValues[1]).to.equal(3);
        expect(content['channels'][0].deltaValues[2]).to.equal(5);
        expect(content['channels'][0].deltaValues[3]).to.equal(7);
        expect(content['channels'][0].deltaValues[4]).to.equal(9);
        expect(content['channels'][0].deltaValues[9]).to.equal(19);
        expect(content['channels'][1].index).to.equal(512);
        expect(content['channels'][1].deltaValues[0]).to.equal(2);
        expect(content['channels'][1].deltaValues[1]).to.equal(4);
        expect(content['channels'][1].deltaValues[2]).to.equal(6);
        expect(content['channels'][1].deltaValues[3]).to.equal(8);
        expect(content['channels'][1].deltaValues[4]).to.equal(10);
        expect(content['channels'][1].deltaValues[9]).to.equal(20);
    });

    it('should parse 482004000d000e000f0010', () => {
        const payloadString = '482004000d000e000f0010';
        const content = pulse0x48Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
        expect(content.type).to.equal('0x48 Pulse historic data');
        expect(content['frameIndex']).to.equal(4);
        expect(content['baseTime']).to.equal(7);
        expect(content['channels'][0].deltaValues[0]).to.equal(13);
        expect(content['channels'][0].deltaValues[1]).to.equal(15);
        expect(content['channels'][1].deltaValues[0]).to.equal(14);
        expect(content['channels'][1].deltaValues[1]).to.equal(16);
    });

});
