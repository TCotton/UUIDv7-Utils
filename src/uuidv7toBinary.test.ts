import { describe, test, expect } from 'vitest';
import { uuidv7toBinary } from './index.js';

describe('uuidv7toBinary', () => {
  test('should convert a valid UUIDv7 string to binary', () => {
    const uuidv7 = '01932820-4b90-7000-8000-000000000000';
    const result = uuidv7toBinary(uuidv7);

    expect(typeof result).toBe('string');
    expect(result?.length).toBe(128); // 128 bits for UUID
    expect(/^[01]+$/.test(result || '')).toBe(true); // Only contains 0s and 1s
  });

  test('should convert a valid UUIDv7 buffer to binary', () => {
    // UUIDv7 example: 01932820-4b90-7000-8000-000000000000
    const uuidBuffer = Buffer.from([
      0x01,
      0x93,
      0x28,
      0x20, // time_hi
      0x4b,
      0x90, // time_mid
      0x70,
      0x00, // time_low and version
      0x80,
      0x00, // variant and clock_seq
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00, // node
    ]);

    const result = uuidv7toBinary(uuidBuffer);

    expect(typeof result).toBe('string');
    expect(result?.length).toBe(128);
    expect(/^[01]+$/.test(result || '')).toBe(true);
  });

  test('should produce correct binary representation for known UUIDv7', () => {
    // Test with a simple UUIDv7: all zeros except version and variant
    const uuidv7 = '00000000-0000-7000-8000-000000000000';
    const result = uuidv7toBinary(uuidv7);

    // Expected binary (128 bits):
    // 00000000-0000-7000-8000-000000000000
    // Hex string without dashes: 00000000000070008000000000000000
    // Each hex char to binary: 0=0000, 7=0111, 8=1000
    const expected =
      '0000000000000000000000000000000000000000000000000111000000000000' + // first 64 bits
      '1000000000000000000000000000000000000000000000000000000000000000'; // last 64 bits

    expect(result).toBe(expected);
    expect(result?.length).toBe(128);
  });

  test('should handle UUIDv7 with all hex characters (0-9, a-f)', () => {
    const uuidv7 = '01234567-89ab-7cde-8f01-23456789abcd';
    const result = uuidv7toBinary(uuidv7);

    // Should convert each hex digit to 4 binary digits
    expect(result?.length).toBe(128);
    expect(/^[01]+$/.test(result || '')).toBe(true);
  });

  test('should handle UUIDv7 with uppercase hex characters', () => {
    const uuidv7 = '01932820-4B90-7000-8000-000000000000';
    const result = uuidv7toBinary(uuidv7);

    expect(typeof result).toBe('string');
    expect(result?.length).toBe(128);
    expect(/^[01]+$/.test(result || '')).toBe(true);
  });

  test('should handle UUIDv7 with mixed case hex characters', () => {
    const uuidv7 = '01932820-4b90-7AbC-8DeF-0123456789Aa';
    const result = uuidv7toBinary(uuidv7);

    expect(typeof result).toBe('string');
    expect(result?.length).toBe(128);
    expect(/^[01]+$/.test(result || '')).toBe(true);
  });

  test('should return undefined for invalid UUID format', () => {
    const invalidUuid = 'not-a-valid-uuid';
    const result = uuidv7toBinary(invalidUuid);

    expect(result).toBe(undefined);
  });

  test('should return undefined for non-UUIDv7 (wrong version)', () => {
    // UUIDv4
    const uuidv4 = '550e8400-e29b-41d4-a716-446655440000';
    const result = uuidv7toBinary(uuidv4);

    expect(result).toBe(undefined);
  });

  test('should return undefined for UUIDv1', () => {
    const uuidv1 = '550e8400-e29b-11d4-a716-446655440000';
    const result = uuidv7toBinary(uuidv1);

    expect(result).toBe(undefined);
  });

  test('should return undefined for UUIDv3', () => {
    const uuidv3 = '550e8400-e29b-31d4-a716-446655440000';
    const result = uuidv7toBinary(uuidv3);

    expect(result).toBe(undefined);
  });

  test('should return undefined for UUIDv4', () => {
    const uuidv4 = '550e8400-e29b-41d4-a716-446655440000';
    const result = uuidv7toBinary(uuidv4);

    expect(result).toBe(undefined);
  });

  test('should return undefined for UUIDv5', () => {
    const uuidv5 = '550e8400-e29b-51d4-a716-446655440000';
    const result = uuidv7toBinary(uuidv5);

    expect(result).toBe(undefined);
  });

  test('should return undefined for UUIDv6', () => {
    const uuidv6 = '550e8400-e29b-61d4-a716-446655440000';
    const result = uuidv7toBinary(uuidv6);

    expect(result).toBe(undefined);
  });

  test('should return undefined for UUIDv8', () => {
    const uuidv8 = '550e8400-e29b-81d4-a716-446655440000';
    const result = uuidv7toBinary(uuidv8);

    expect(result).toBe(undefined);
  });

  test('should return undefined for empty string', () => {
    const result = uuidv7toBinary('');

    expect(result).toBe(undefined);
  });

  test('should return undefined for malformed UUID string', () => {
    const malformed = '01932820-4b90-7000-8000';
    const result = uuidv7toBinary(malformed);

    expect(result).toBe(undefined);
  });

  test('should return undefined for UUID with invalid characters', () => {
    const invalidChars = '0193282g-4b90-7000-8000-000000000000';
    const result = uuidv7toBinary(invalidChars);

    expect(result).toBe(undefined);
  });

  test('should return undefined for UUID with wrong hyphen positions', () => {
    const wrongHyphens = '019328204-b907-0008-0000-00000000000';
    const result = uuidv7toBinary(wrongHyphens);

    expect(result).toBe(undefined);
  });

  test('should return undefined for non-16-byte buffer', () => {
    const shortBuffer = Buffer.from([0x01, 0x93, 0x28, 0x20]);
    const result = uuidv7toBinary(shortBuffer);

    expect(result).toBe(undefined);
  });

  test('should return undefined for empty buffer', () => {
    const emptyBuffer = Buffer.from([]);
    const result = uuidv7toBinary(emptyBuffer);

    expect(result).toBe(undefined);
  });

  test('should return undefined for non-UUIDv7 buffer (version 4)', () => {
    // UUIDv4 buffer with version 4 at correct position
    const uuidv4Buffer = Buffer.from([
      0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0xa7, 0x16, 0x44, 0x66, 0x55, 0x44, 0x00,
      0x00,
    ]);
    const result = uuidv7toBinary(uuidv4Buffer);

    expect(result).toBe(undefined);
  });

  test('should be consistent with multiple calls for the same UUIDv7', () => {
    const uuidv7 = '01932820-4b90-7000-8000-000000000000';

    const result1 = uuidv7toBinary(uuidv7);
    const result2 = uuidv7toBinary(uuidv7);
    const result3 = uuidv7toBinary(uuidv7);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
  });

  test('should handle string vs buffer equivalence for UUIDv7', () => {
    const uuidString = '01932820-4b90-7000-8000-000000000000';
    const uuidBuffer = Buffer.from([
      0x01, 0x93, 0x28, 0x20, 0x4b, 0x90, 0x70, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);

    const resultString = uuidv7toBinary(uuidString);
    const resultBuffer = uuidv7toBinary(uuidBuffer);

    expect(resultString).toBe(resultBuffer);
  });

  test('should verify binary has correct structure for UUIDv7', () => {
    const uuidv7 = '01932820-4b90-7def-8123-456789abcdef';
    const result = uuidv7toBinary(uuidv7);

    expect(result).not.toBe(undefined);
    expect(result?.length).toBe(128);

    // Version 7 should have version bits set correctly
    // In the UUID format, the version is at position 14 (with hyphens)
    // After removing hyphens: 019328204b907def8123456789abcdef
    // Position 12-15 contains '7def', where 7 is the version
    // 7 in hex = 0111 in binary
    // This appears at bits 48-51 (positions 12*4 to 13*4-1)
    const versionBits = result?.substring(48, 52);
    expect(versionBits).toBe('0111');
  });

  test('should verify variant bits for UUIDv7', () => {
    const uuidv7 = '01932820-4b90-7def-8123-456789abcdef';
    const result = uuidv7toBinary(uuidv7);

    expect(result).not.toBe(undefined);

    // Variant bits are in the first 2 bits of the 9th byte
    // After removing hyphens: 019328204b907def8123456789abcdef
    // The 9th byte is at hex position 16-17, which is '81'
    // 8 in hex = 1000 in binary
    // Bits 64-65 should be '10' for RFC 4122 variant
    const variantBits = result?.substring(64, 66);
    expect(variantBits).toBe('10');
  });

  test('should handle real-world UUIDv7 examples', () => {
    // Some realistic UUIDv7 examples
    const examples = [
      '018b6e6c-7d7e-7000-8000-000000000000',
      '018b6e6c-7d7e-7abc-9def-0123456789ab',
      '01932820-ffff-7fff-bfff-ffffffffffff',
    ];

    for (const uuid of examples) {
      const result = uuidv7toBinary(uuid);

      expect(result).not.toBe(undefined);
      expect(result?.length).toBe(128);
      expect(/^[01]+$/.test(result || '')).toBe(true);

      // Verify version bits
      const versionBits = result?.substring(48, 52);
      expect(versionBits).toBe('0111');
    }
  });

  test('should return undefined for string with special characters', () => {
    const specialChars = '!@#$%^&*()';
    const result = uuidv7toBinary(specialChars);

    expect(result).toBe(undefined);
  });

  test('should return undefined for string with spaces', () => {
    const withSpaces = '01932820 4b90 7000 8000 000000000000';
    const result = uuidv7toBinary(withSpaces);

    expect(result).toBe(undefined);
  });

  test('should verify binary output length is always 128 bits for valid UUIDv7', () => {
    const validUUIDs = [
      '01932820-4b90-7000-8000-000000000000',
      '00000000-0000-7000-8000-000000000000',
      'ffffffff-ffff-7fff-bfff-ffffffffffff',
      '018b6e6c-7d7e-7abc-9def-0123456789ab',
    ];

    for (const uuid of validUUIDs) {
      const result = uuidv7toBinary(uuid);
      expect(result?.length).toBe(128);
    }
  });

  test('should handle conversion accuracy for specific hex values', () => {
    // Test specific hex to binary conversions
    // a=1010, b=1011, c=1100, d=1101, e=1110, f=1111
    const uuidv7 = 'abcdef01-2345-7678-9abc-def012345678';
    const result = uuidv7toBinary(uuidv7);

    expect(result).not.toBe(undefined);

    // Verify 'a' at position 0 converts to '1010'
    expect(result?.substring(0, 4)).toBe('1010');

    // Verify 'b' at position 1 converts to '1011'
    expect(result?.substring(4, 8)).toBe('1011');

    // Verify 'f' at position 5 converts to '1111'
    expect(result?.substring(20, 24)).toBe('1111');
  });

  test('should handle buffer with version 7 correctly', () => {
    // Create a buffer that represents a valid UUIDv7
    // Format: xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx where y is 8, 9, a, or b
    const buffer = Buffer.from([
      0xab,
      0xcd,
      0xef,
      0x01, // timestamp high
      0x23,
      0x45, // timestamp mid
      0x76,
      0x78, // version (7) + timestamp low
      0x9a,
      0xbc, // variant (10xx) + clock sequence
      0xde,
      0xf0,
      0x12,
      0x34,
      0x56,
      0x78, // node
    ]);

    const result = uuidv7toBinary(buffer);

    expect(result).not.toBe(undefined);
    expect(result?.length).toBe(128);

    // Verify it matches the string conversion
    const stringUuid = 'abcdef01-2345-7678-9abc-def012345678';
    const stringResult = uuidv7toBinary(stringUuid);
    expect(result).toBe(stringResult);
  });

  test('should handle buffer longer than 16 bytes by using first 16 bytes', () => {
    // Buffer that's 17 bytes - stringify will only use first 16 bytes
    const longBuffer = Buffer.from([
      0x01,
      0x93,
      0x28,
      0x20,
      0x4b,
      0x90,
      0x70,
      0x00,
      0x80,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0xff, // This extra byte is ignored by stringify
    ]);

    const result = uuidv7toBinary(longBuffer);
    // Should process the first 16 bytes as a valid UUIDv7
    expect(result).not.toBe(undefined);
    expect(result?.length).toBe(128);

    // Should match the result from a proper 16-byte buffer
    const properBuffer = Buffer.from([
      0x01, 0x93, 0x28, 0x20, 0x4b, 0x90, 0x70, 0x00, 0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);
    const expectedResult = uuidv7toBinary(properBuffer);
    expect(result).toBe(expectedResult);
  });

  test('should handle UUIDv7 with different valid variant bits', () => {
    // Valid variant bits for RFC 4122 are: 10xx (8, 9, a, b in hex)
    const variants = [
      '01932820-4b90-7000-8000-000000000000', // variant 8 (1000)
      '01932820-4b90-7000-9000-000000000000', // variant 9 (1001)
      '01932820-4b90-7000-a000-000000000000', // variant a (1010)
      '01932820-4b90-7000-b000-000000000000', // variant b (1011)
    ];

    for (const uuid of variants) {
      const result = uuidv7toBinary(uuid);
      expect(result).not.toBe(undefined);
      expect(result?.length).toBe(128);

      // All should start with '10' for variant
      const variantBits = result?.substring(64, 66);
      expect(variantBits).toBe('10');
    }
  });
});
