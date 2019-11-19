/// <reference path='0x02.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('Repeater0x02Parser', () => {
    let repeater0x02Parser: codec.Repeater0x02Parser;

    beforeEach(() => {
        repeater0x02Parser = new codec.Repeater0x02Parser();
    });

    it('should parse data 02300E ', () => {
        const payloadString = '02300E ';
        const content = repeater0x02Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'sigfox');
        expect(content.type).to.equal('0x02 Repeater WL modification');
        expect(content['frameCounter']).to.equal(3);
        expect(content['lowBattery']).to.equal(false);
        expect(content['numberOfIdInWl']).to.equal(14);
    });

    it('should parse data 02A302 ', () => {
        const payloadString = '02A302 ';
        const content = repeater0x02Parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'sigfox');
        expect(content.type).to.equal('0x02 Repeater WL modification');
        expect(content['frameCounter']).to.equal(10);
        expect(content['lowBattery']).to.equal(true);
        expect(content['numberOfIdInWl']).to.equal(2);
    });

});
