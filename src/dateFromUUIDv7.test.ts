import { describe, it, expect } from 'vitest';
import { dateFromUUIDv7 } from './index.js';

describe('dateFromUUIDv7', () => {
  it('returns undefined for invalid UUID format', () => {
    // Test string with non-hex characters
    const notAHex = 'not-a-hex';
    expect(dateFromUUIDv7(notAHex)).toBe(undefined);

    // Test string with special characters
    const specialChars = '!@#$%^&*()';
    expect(dateFromUUIDv7(specialChars)).toBe(undefined);

    // Test string with spaces
    const withSpaces = '123 456 789';
    expect(dateFromUUIDv7(withSpaces)).toBe(undefined);

    // Test string with letters outside hex range (g-z)
    const nonHexLetters = 'ghijklmnopqrstuvwxyz';
    expect(dateFromUUIDv7(nonHexLetters)).toBe(undefined);

    // Test string with mixed valid hex and invalid characters
    const mixedChars = '123abc-xyz-789';
    expect(dateFromUUIDv7(mixedChars)).toBe(undefined);

    // Test empty string
    const emptyString = '';
    expect(dateFromUUIDv7(emptyString)).toBe(undefined);

    // Test string with only spaces
    const onlySpaces = '   ';
    expect(dateFromUUIDv7(onlySpaces)).toBe(undefined);

    // Test string with newlines and tabs
    const whitespace = 'abc\n123\t456';
    expect(dateFromUUIDv7(whitespace)).toBe(undefined);

    // Test string with unicode characters
    const unicode = '123αβγ456';
    expect(dateFromUUIDv7(unicode)).toBe(undefined);

    // Test string with emojis
    const emojis = '123🚀456🎉';
    expect(dateFromUUIDv7(emojis)).toBe(undefined);

    // Test string with numbers and punctuation
    const numbersAndPunctuation = '123.456,789';
    expect(dateFromUUIDv7(numbersAndPunctuation)).toBe(undefined);

    // Test string with uppercase and lowercase mixed with invalid chars
    const mixedCase = 'AbC123XyZ';
    expect(dateFromUUIDv7(mixedCase)).toBe(undefined);

    // Test string that looks like UUID but has invalid characters
    const fakeUuid = '018cc251-f400-7000-8000-00000000000g';
    expect(dateFromUUIDv7(fakeUuid)).toBe(undefined);

    // Test string with underscores
    const withUnderscores = '123_abc_def';
    expect(dateFromUUIDv7(withUnderscores)).toBe(undefined);

    // Test string with plus and minus signs
    const withSigns = '+123-abc';
    expect(dateFromUUIDv7(withSigns)).toBe(undefined);
  });

  it('returns undefined for UUIDs that are not version 7', () => {
    const v1UuidArray = [
      'cc863758-b714-11f0-b576-c586e8619134',
      'cc863b72-b714-11f0-b576-c586e8619134',
      'cc863e74-b714-11f0-b576-c586e8619134',
      'cc863f64-b714-11f0-b576-c586e8619134',
      'cc864036-b714-11f0-b576-c586e8619134',
    ];

    // Test each UUID v1 in the array
    for (const v1Uuid of v1UuidArray) {
      expect(dateFromUUIDv7(v1Uuid)).toBe(undefined);
    }

    const v2UuidArray = [
      'e2a1f3c4-1d23-21f2-8f56-abcdef123456',
      'f1b2d4e5-2e34-21a3-9c78-123456abcdef',
      'a3c4b5d6-3f45-21b4-8a12-789abc456def',
      'b4d5e6f7-4a56-21c5-8b34-456def123abc',
      'c5e6f7a8-5b67-21d6-9d56-abcdef789123',
    ];

    // Test each UUID v2 in the array
    for (const v2Uuid of v2UuidArray) {
      expect(dateFromUUIDv7(v2Uuid)).toBe(undefined);
    }

    const v3UuidArray = [
      '4384b27d-2698-3cad-8ecd-2b804a6dc803',
      '4b5e4949-1838-35cd-97f8-1cea76b9c9e0',
      'ff202ab9-4510-3381-b982-8e3f20311b59',
      '6387c277-391f-3c16-8b52-3cd7847aa443',
      '375c7f49-7604-34e6-bf90-42a8d83affa8',
    ];

    // Test each UUID v3 in the array
    for (const v3Uuid of v3UuidArray) {
      expect(dateFromUUIDv7(v3Uuid)).toBe(undefined);
    }

    const v4UuidArray = [
      '8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b',
      'ad2f0b7c-5c76-4f48-8f5a-9f2bba3a5f3a',
      '1f3e4b8b-6a12-4f0d-b6b9-29879dbd63f1',
      'be17d42a-2e5e-4c44-a6ef-12b1b01931a7',
      'c34b1ed2-90df-45e2-95c3-6c293de72dbe',
    ];

    // Test each UUID v4 in the array
    for (const v4Uuid of v4UuidArray) {
      expect(dateFromUUIDv7(v4Uuid)).toBe(undefined);
    }

    const v5UuidArray = [
      'a4b10451-0bda-5091-84d4-4eccefb8bc64',
      '2fc64824-7f44-57aa-8e5e-51e39c5d4ff8',
      'b4f1f73c-87a4-5715-8357-261a89d26005',
      '2d36c929-9466-52aa-9588-16f4515b6a92',
      '15215d4a-dfdb-5361-a44a-b1d97db0a8b1',
    ];

    // Test each UUID v5 in the array
    for (const v5Uuid of v5UuidArray) {
      expect(dateFromUUIDv7(v5Uuid)).toBe(undefined);
    }

    const v6UuidArray = [
      '1e2f3a4b-5c6d-6f78-90ab-cdef12345678',
      '2a3b4c5d-6e7f-6a8b-91cd-0123456789ab',
      '3c4d5e6f-7a8b-6b9c-92de-abcdef012345',
      '4d5e6f7a-8b9c-6c0d-93ef-1234567890ab',
      '5e6f7a8b-9c0d-6d1e-94f0-abcdef123456',
    ];

    // Test each UUID v6 in the array
    for (const v6Uuid of v6UuidArray) {
      expect(dateFromUUIDv7(v6Uuid)).toBe(undefined);
    }
  });

  it('returns a date object for valid UUIDv7', () => {
    const uuidv7 = '018fd8fa-02d5-7c9a-8fb9-45d938b8f091';
    const result = dateFromUUIDv7(uuidv7);

    expect(result !== undefined).toBeTruthy();
    expect(typeof result === 'object').toBeTruthy();
    expect('dateToIsoString' in result).toBeTruthy();
    expect('dateUnixEpoch' in result).toBeTruthy();
    expect('dateToUTCString' in result).toBeTruthy();
  });

  it('returns a date object for valid UUIDv7 buffers', () => {
    // Test Buffer with a known UUIDv7
    const uuidv7Buffer = Buffer.from([
      0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
      0xa1,
    ]);
    const result = dateFromUUIDv7(uuidv7Buffer);

    expect(result !== undefined).toBeTruthy();
    expect(typeof result === 'object').toBeTruthy();
    expect('dateToIsoString' in result).toBeTruthy();
    expect('dateUnixEpoch' in result).toBeTruthy();
    expect('dateToUTCString' in result).toBeTruthy();

    // Verify the timestamp matches expected value
    expect(result.dateUnixEpoch).toBe(1717332184064);
    expect(result.dateToIsoString).toBe('2024-06-02T12:43:04.064Z');
    expect(result.dateToUTCString).toBe('Sun, 02 Jun 2024 12:43:04 GMT');
  });

  it('returns undefined for non-UUIDv7 buffers', () => {
    // UUIDv4 buffer
    const v4Buffer = Buffer.from([
      0x8d, 0x5d, 0x59, 0xa0, 0xb6, 0x0b, 0x4e, 0x2b, 0x9d, 0x67, 0x7c, 0x5a, 0xb5, 0x3f, 0x9e,
      0x5b,
    ]);
    expect(dateFromUUIDv7(v4Buffer)).toBe(undefined);

    // UUIDv1 buffer
    const v1Buffer = Buffer.from([
      0xcc, 0x86, 0x37, 0x58, 0xb7, 0x14, 0x11, 0xf0, 0xb5, 0x76, 0xc5, 0x86, 0xe8, 0x61, 0x91,
      0x34,
    ]);
    expect(dateFromUUIDv7(v1Buffer)).toBe(undefined);
  });

  it('returns undefined for malformed buffers', () => {
    // Short buffer
    const shortBuffer = Buffer.from([0x01, 0x02, 0x03]);
    expect(dateFromUUIDv7(shortBuffer)).toBe(undefined);

    // Empty buffer
    const emptyBuffer = Buffer.alloc(0);
    expect(dateFromUUIDv7(emptyBuffer)).toBe(undefined);

    // Buffer with invalid content that won't form valid UUID
    const invalidBuffer = Buffer.from([
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
    ]);
    expect(dateFromUUIDv7(invalidBuffer)).toBe(undefined);
  });

  it('should handle string vs buffer equivalence for UUIDv7', () => {
    const testCases = [
      {
        buffer: Buffer.from([
          0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
          0xa1,
        ]),
        string: '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1',
        expectedTimestamp: 1717332184064,
      },
      {
        buffer: Buffer.from([
          0x01, 0x8f, 0xd8, 0xfa, 0x0b, 0x50, 0x7a, 0x6d, 0x8f, 0x25, 0x5b, 0x12, 0xce, 0x7a, 0x90,
          0x32,
        ]),
        string: '018fd8fa-0b50-7a6d-8f25-5b12ce7a9032',
        expectedTimestamp: 1717332216656,
      },
      {
        buffer: Buffer.from([
          0x01, 0x8f, 0xd8, 0xfb, 0x11, 0x22, 0x7a, 0x9e, 0x92, 0xd8, 0x0c, 0xfe, 0x13, 0x4a, 0xe4,
          0x87,
        ]),
        string: '018fd8fb-1122-7a9e-92d8-0cfe134ae487',
        expectedTimestamp: 1717332283682,
      },
    ];

    for (const testCase of testCases) {
      const bufferResult = dateFromUUIDv7(testCase.buffer);
      const stringResult = dateFromUUIDv7(testCase.string);

      // Both should return valid results
      expect(bufferResult !== undefined).toBeTruthy();
      expect(stringResult !== undefined).toBeTruthy();

      // Results should be identical
      expect(bufferResult.dateUnixEpoch).toBe(stringResult.dateUnixEpoch);
      expect(bufferResult.dateToIsoString).toBe(stringResult.dateToIsoString);
      expect(bufferResult.dateToUTCString).toBe(stringResult.dateToUTCString);
      expect(bufferResult.dateUnixEpoch).toBe(testCase.expectedTimestamp);
    }
  });

  it('returns a date object for valid UUIDv7 and correct timestamp extraction', () => {
    const uuidv7 = '018fd8fa-02d5-7c9a-8fb9-45d938b8f091';
    const result = dateFromUUIDv7(uuidv7);

    // Test that it returns the correct object structure
    expect(result !== undefined).toBeTruthy();
    expect(typeof result === 'object').toBeTruthy();

    // Test the timestamp value
    expect(result?.dateUnixEpoch).toBe(1717332214485);

    // Test the ISO string representation
    expect(result?.dateToIsoString).toBe('2024-06-02T12:43:34.485Z');

    // Test the UTC string representation
    expect(result?.dateToUTCString).toBe('Sun, 02 Jun 2024 12:43:34 GMT');
  });

  it('returns a Date object for valid UUIDv7 in an array and correct timestamp extraction', () => {
    const v7UuidTestCases = [
      {
        uuid: '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1',
        expectedTimestamp: 1717332184064,
        expectedISO: '2024-06-02T12:43:04.064Z',
        expectedUTC: 'Sun, 02 Jun 2024 12:43:04 GMT',
      },
      {
        uuid: '018fd8fa-0b50-7a6d-8f25-5b12ce7a9032',
        expectedTimestamp: 1717332216656,
        expectedISO: '2024-06-02T12:43:36.656Z',
        expectedUTC: 'Sun, 02 Jun 2024 12:43:36 GMT',
      },
      {
        uuid: '018fd8fb-1122-7a9e-92d8-0cfe134ae487',
        expectedTimestamp: 1717332283682,
        expectedISO: '2024-06-02T12:44:43.682Z',
        expectedUTC: 'Sun, 02 Jun 2024 12:44:43 GMT',
      },
      {
        uuid: '018fd8fc-22d1-7ace-b321-4c92d7bb5fa6',
        expectedTimestamp: 1717332353745,
        expectedISO: '2024-06-02T12:45:53.745Z',
        expectedUTC: 'Sun, 02 Jun 2024 12:45:53 GMT',
      },
      {
        uuid: '018fd8fd-33e0-7af0-a054-d8e8bcf76e9c',
        expectedTimestamp: 1717332423648,
        expectedISO: '2024-06-02T12:47:03.648Z',
        expectedUTC: 'Sun, 02 Jun 2024 12:47:03 GMT',
      },
    ];

    // Test each UUID v7 in the array
    for (const testCase of v7UuidTestCases) {
      const result = dateFromUUIDv7(testCase.uuid);

      // Test that it returns the correct object structure
      expect(result !== undefined).toBeTruthy();
      expect(typeof result === 'object').toBeTruthy();

      // Test that the timestamp is extracted correctly
      expect(result?.dateUnixEpoch).toBe(testCase.expectedTimestamp);

      // Test the ISO string representation
      expect(result?.dateToIsoString).toBe(testCase.expectedISO);

      // Test the UTC string representation
      expect(result?.dateToUTCString).toBe(testCase.expectedUTC);
    }
  });
});
