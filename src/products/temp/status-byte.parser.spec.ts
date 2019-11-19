/// <reference path='status-byte.parser.ts' />

import { expect } from 'chai';
import 'mocha';

describe('TempStatusByteParser', () => {
  let parser: codec.TempStatusByteParser;

  beforeEach(() => {
    parser = new codec.TempStatusByteParser();
  });

  it('should parse 43400100f40200f1', () => {
    const payloadString = '43400100f40200f1';
    const content = parser.parseFrame(Buffer.from(payloadString, 'hex'), Buffer.from(''), 'unknown');
    // tslint:disable-next-line:no-unused-expression
    expect(content['status'].probe1Alarm).to.equal(false);
    // tslint:disable-next-line:no-unused-expression
    expect(content['status'].probe2Alarm).to.equal(false);
  });
});
