import { describe, it, expect } from 'vitest';
import { isBuffer } from './isBuffer.js';

describe('isBuffer', () => {
  it('should return true for Buffer instances', () => {
    const buffer1 = Buffer.from('hello');
    const buffer2 = Buffer.alloc(10);
    const buffer3 = Buffer.allocUnsafe(5);
    const buffer4 = Buffer.from([1, 2, 3, 4, 5]);
    const buffer5 = Buffer.from('test', 'utf8');

    expect(isBuffer(buffer1)).toEqual(true);
    expect(isBuffer(buffer2)).toEqual(true);
    expect(isBuffer(buffer3)).toEqual(true);
    expect(isBuffer(buffer4)).toEqual(true);
    expect(isBuffer(buffer5)).toEqual(true);
  });

  it('should return false for non-Buffer values', () => {
    expect(isBuffer('string')).toEqual(false);
    expect(isBuffer(123)).toEqual(false);
    expect(isBuffer(true)).toEqual(false);
    expect(isBuffer(false)).toEqual(false);
    expect(isBuffer(null)).toEqual(false);
    expect(isBuffer(undefined)).toEqual(false);
    expect(isBuffer({})).toEqual(false);
    expect(isBuffer([])).toEqual(false);
    expect(isBuffer([1, 2, 3])).toEqual(false);
    expect(isBuffer(new Date())).toEqual(false);
    expect(isBuffer(/regex/)).toEqual(false);
    expect(isBuffer(() => {})).toEqual(false);
  });

  it('should return false for Uint8Array (which is similar to Buffer but not a Buffer)', () => {
    const uint8Array = new Uint8Array([1, 2, 3, 4, 5]);
    expect(isBuffer(uint8Array)).toEqual(false);
  });

  it('should return false for ArrayBuffer', () => {
    const arrayBuffer = new ArrayBuffer(8);
    expect(isBuffer(arrayBuffer)).toEqual(false);
  });

  it('should return false for objects that look like buffers', () => {
    const fakeBuffer = {
      type: 'Buffer',
      data: [1, 2, 3],
    };
    const bufferLike = {
      length: 5,
      0: 65,
      1: 66,
      2: 67,
    };

    expect(isBuffer(fakeBuffer)).toEqual(false);
    expect(isBuffer(bufferLike)).toEqual(false);
  });

  it('should work as a type guard', () => {
    const value: unknown = Buffer.from('test');

    if (isBuffer(value)) {
      const buffer = value as Buffer;
      expect(buffer.toString()).toEqual('test');
      expect(typeof buffer.length).toEqual('number');
    } else {
      expect.fail('Expected value to be a Buffer');
    }
  });
  it('should handle edge cases', () => {
    // Empty buffer
    const emptyBuffer = Buffer.alloc(0);
    expect(isBuffer(emptyBuffer)).toEqual(true);

    // Very large buffer
    const largeBuffer = Buffer.alloc(1024 * 1024); // 1MB
    expect(isBuffer(largeBuffer)).toEqual(true);
  });
  it('should handle 16-byte UUID buffer', () => {
    const originalBuf = Buffer.from([
      149, 236, 195, 128, 175, 233, 17, 228, 155, 108, 117, 27, 102, 221, 84, 30,
    ]);

    expect(isBuffer(originalBuf)).toEqual(true);
  });
  it('should handle non-Buffer UUID-like buffers', () => {
    const buf = Buffer.from('95ecc380afe911e49b6c751b66dd541e', 'hex');
    expect(isBuffer(buf)).toEqual(true);
  });
});
