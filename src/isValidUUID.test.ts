import { describe, it, expect } from 'vitest';
import { isValidUUID } from './index.js';

describe('isValidUUID', () => {
  it('returns true for valid UUIDv1', () => {
    const v1Uuids = [
      'cc863758-b714-11f0-b576-c586e8619134',
      'cc863b72-b714-11f0-b576-c586e8619134',
      'cc863e74-b714-11f0-b576-c586e8619134',
      'cc863f64-b714-11f0-b576-c586e8619134',
      'cc864036-b714-11f0-b576-c586e8619134',
    ];

    for (const uuid of v1Uuids) {
      expect(isValidUUID(uuid)).toBe(true);
    }
  });

  it('returns true for valid UUIDv2', () => {
    const v2Uuids = [
      'e2a1f3c4-1d23-21f2-8f56-abcdef123456',
      'f1b2d4e5-2e34-21a3-9c78-123456abcdef',
      'a3c4b5d6-3f45-21b4-8a12-789abc456def',
      'b4d5e6f7-4a56-21c5-8b34-456def123abc',
      'c5e6f7a8-5b67-21d6-9d56-abcdef789123',
    ];

    for (const uuid of v2Uuids) {
      expect(isValidUUID(uuid)).toBe(true);
    }
  });

  it('returns true for valid UUIDv3', () => {
    const v3Uuids = [
      '4384b27d-2698-3cad-8ecd-2b804a6dc803',
      '4b5e4949-1838-35cd-97f8-1cea76b9c9e0',
      'ff202ab9-4510-3381-b982-8e3f20311b59',
      '6387c277-391f-3c16-8b52-3cd7847aa443',
      '375c7f49-7604-34e6-bf90-42a8d83affa8',
    ];

    for (const uuid of v3Uuids) {
      expect(isValidUUID(uuid)).toBe(true);
    }
  });

  it('returns true for valid UUIDv4', () => {
    const v4Uuids = [
      '8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b',
      'ad2f0b7c-5c76-4f48-8f5a-9f2bba3a5f3a',
      '1f3e4b8b-6a12-4f0d-b6b9-29879dbd63f1',
      'be17d42a-2e5e-4c44-a6ef-12b1b01931a7',
      'c34b1ed2-90df-45e2-95c3-6c293de72dbe',
    ];

    for (const uuid of v4Uuids) {
      expect(isValidUUID(uuid)).toBe(true);
    }
  });

  it('returns true for valid UUIDv5', () => {
    const v5Uuids = [
      'a4b10451-0bda-5091-84d4-4eccefb8bc64',
      '2fc64824-7f44-57aa-8e5e-51e39c5d4ff8',
      'b4f1f73c-87a4-5715-8357-261a89d26005',
      '2d36c929-9466-52aa-9588-16f4515b6a92',
      '15215d4a-dfdb-5361-a44a-b1d97db0a8b1',
    ];

    for (const uuid of v5Uuids) {
      expect(isValidUUID(uuid)).toBe(true);
    }
  });

  it('returns true for valid UUIDv6', () => {
    const v6Uuids = [
      '1e2f3a4b-5c6d-6f78-90ab-cdef12345678',
      '2a3b4c5d-6e7f-6a8b-91cd-0123456789ab',
      '3c4d5e6f-7a8b-6b9c-92de-abcdef012345',
      '4d5e6f7a-8b9c-6c0d-93ef-1234567890ab',
      '5e6f7a8b-9c0d-6d1e-94f0-abcdef123456',
    ];

    for (const uuid of v6Uuids) {
      expect(isValidUUID(uuid)).toBe(true);
    }
  });

  it('returns true for valid UUIDv7', () => {
    const v7Uuids = [
      '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1',
      '018fd8fa-0b50-7a6d-8f25-5b12ce7a9032',
      '018fd8fb-1122-7a9e-92d8-0cfe134ae487',
      '018fd8fc-22d1-7ace-b321-4c92d7bb5fa6',
      '018fd8fd-33e0-7af0-a054-d8e8bcf76e9c',
    ];

    for (const uuid of v7Uuids) {
      expect(isValidUUID(uuid)).toBe(true);
    }
  });

  it('returns true for valid UUIDv8', () => {
    const v8Uuids = [
      '01234567-89ab-8cde-8012-3456789abcde',
      '11111111-2222-8333-8444-555555555555',
      'aaaaaaaa-bbbb-8ccc-8ddd-eeeeeeeeeeee',
      'fedcba98-7654-8321-8fed-cba987654321',
      '00000000-0000-8000-8000-000000000000',
    ];

    for (const uuid of v8Uuids) {
      expect(isValidUUID(uuid)).toBe(true);
    }
  });

  it('returns true for Nil UUID (special case)', () => {
    // The Nil UUID (all zeros) is now explicitly handled as valid
    expect(isValidUUID('00000000-0000-0000-0000-000000000000')).toBe(true);
  });

  it('returns true for Max UUID in lowercase (special case)', () => {
    // The Max UUID (all ones) is now explicitly handled as valid
    expect(isValidUUID('ffffffff-ffff-ffff-ffff-ffffffffffff')).toBe(true);
  });

  it('returns true for Max UUID in uppercase (case-insensitive)', () => {
    // Max UUID comparison is case-insensitive
    expect(isValidUUID('FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF')).toBe(true);
  });

  it('returns true for Max UUID in mixed case (case-insensitive)', () => {
    // Max UUID comparison handles mixed case
    expect(isValidUUID('FfFfFfFf-FfFf-FfFf-FfFf-FfFfFfFfFfFf')).toBe(true);
  });

  it('returns true for UUIDs with mixed case', () => {
    expect(isValidUUID('018FD8F9-8C00-7A4C-8A47-1A6D4B90F3A1')).toBe(true);
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')).toBe(true);
    expect(isValidUUID('018Fd8F9-8C00-7a4c-8A47-1a6D4b90F3a1')).toBe(true);
  });

  it('returns false for invalid UUID format - wrong length', () => {
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a')).toBe(false);
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a11')).toBe(false);
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47')).toBe(false);
  });

  it('returns false for invalid UUID format - missing hyphens', () => {
    expect(isValidUUID('018fd8f98c007a4c8a471a6d4b90f3a1')).toBe(false);
    expect(isValidUUID('018fd8f9-8c007a4c-8a47-1a6d4b90f3a1')).toBe(false);
    expect(isValidUUID('018fd8f9-8c00-7a4c8a47-1a6d4b90f3a1')).toBe(false);
  });

  it('returns false for invalid UUID format - wrong hyphen positions', () => {
    expect(isValidUUID('018fd8f9-8c0-07a4c-8a47-1a6d4b90f3a1')).toBe(false);
    expect(isValidUUID('018fd8f9-8c00-7a4-c8a47-1a6d4b90f3a1')).toBe(false);
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a4-71a6d4b90f3a1')).toBe(false);
  });

  it('returns false for invalid UUID format - non-hex characters', () => {
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3ag')).toBe(false);
    expect(isValidUUID('g18fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')).toBe(false);
    expect(isValidUUID('018fd8f9-8c00-7z4c-8a47-1a6d4b90f3a1')).toBe(false);
  });

  it('returns false for strings with special characters', () => {
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a!')).toBe(false);
    expect(isValidUUID('!@#$%^&*()-()()-()()-()')).toBe(false);
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3@1')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isValidUUID('')).toBe(false);
  });

  it('returns false for strings with only spaces', () => {
    expect(isValidUUID('   ')).toBe(false);
    expect(isValidUUID('     ')).toBe(false);
  });

  it('returns false for strings with whitespace characters', () => {
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a\n')).toBe(false);
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a\t')).toBe(false);
    expect(isValidUUID('\n018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')).toBe(false);
  });

  it('returns false for random strings', () => {
    expect(isValidUUID('not-a-uuid')).toBe(false);
    expect(isValidUUID('hello-world-test-here-012345678901')).toBe(false);
    expect(isValidUUID('random-string')).toBe(false);
  });

  it('returns false for numbers', () => {
    expect(isValidUUID('12345678-1234-1234-1234-12345678901g')).toBe(false);
    expect(isValidUUID('123')).toBe(false);
  });

  it('returns false for strings with underscores', () => {
    expect(isValidUUID('018fd8f9_8c00_7a4c_8a47_1a6d4b90f3a1')).toBe(false);
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3_1')).toBe(false);
  });

  it('returns false for strings with unicode characters', () => {
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3α1')).toBe(false);
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4β90f3a1')).toBe(false);
  });

  it('returns false for strings with emojis', () => {
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3🚀1')).toBe(false);
    expect(isValidUUID('🎉18fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')).toBe(false);
  });

  it('returns false for UUIDs with extra characters at start or end', () => {
    expect(isValidUUID('x018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')).toBe(false);
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1x')).toBe(false);
    expect(isValidUUID(' 018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')).toBe(false);
    expect(isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1 ')).toBe(false);
  });

  it('returns false for UUIDs with periods instead of hyphens', () => {
    expect(isValidUUID('018fd8f9.8c00.7a4c.8a47.1a6d4b90f3a1')).toBe(false);
  });

  it('returns false for UUIDs with colons instead of hyphens', () => {
    expect(isValidUUID('018fd8f9:8c00:7a4c:8a47:1a6d4b90f3a1')).toBe(false);
  });

  it('handles edge cases correctly', () => {
    // All zeros except version bits
    expect(isValidUUID('00000000-0000-7000-8000-000000000000')).toBe(true);

    // All F's except version bits
    expect(isValidUUID('ffffffff-ffff-7fff-bfff-ffffffffffff')).toBe(true);

    // Valid but unusual UUIDs
    expect(isValidUUID('00000000-0000-4000-8000-000000000000')).toBe(true);
  });

  // Buffer Input Tests
  it('returns true for valid UUIDv7 Buffer', () => {
    const v7Buffers = [
      Buffer.from([
        0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
        0xa1,
      ]),
      Buffer.from([
        0x01, 0x8f, 0xd8, 0xfa, 0x0b, 0x50, 0x7a, 0x6d, 0x8f, 0x25, 0x5b, 0x12, 0xce, 0x7a, 0x90,
        0x32,
      ]),
      Buffer.from([
        0x01, 0x8f, 0xd8, 0xfb, 0x11, 0x22, 0x7a, 0x9e, 0x92, 0xd8, 0x0c, 0xfe, 0x13, 0x4a, 0xe4,
        0x87,
      ]),
    ];

    for (const buffer of v7Buffers) {
      expect(isValidUUID(buffer)).toBe(true);
    }
  });

  it('returns true for valid UUIDv4 Buffer', () => {
    const v4Buffers = [
      Buffer.from([
        0x8d, 0x5d, 0x59, 0xa0, 0xb6, 0x0b, 0x4e, 0x2b, 0x9d, 0x67, 0x7c, 0x5a, 0xb5, 0x3f, 0x9e,
        0x5b,
      ]),
      Buffer.from([
        0xad, 0x2f, 0x0b, 0x7c, 0x5c, 0x76, 0x4f, 0x48, 0x8f, 0x5a, 0x9f, 0x2b, 0xba, 0x3a, 0x5f,
        0x3a,
      ]),
      Buffer.from([
        0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0xa7, 0x16, 0x44, 0x66, 0x55, 0x44, 0x00,
        0x00,
      ]),
    ];

    for (const buffer of v4Buffers) {
      expect(isValidUUID(buffer)).toBe(true);
    }
  });

  it('returns true for valid UUIDv1 Buffer', () => {
    const v1Buffer = Buffer.from([
      0xcc, 0x86, 0x37, 0x58, 0xb7, 0x14, 0x11, 0xf0, 0xb5, 0x76, 0xc5, 0x86, 0xe8, 0x61, 0x91,
      0x34,
    ]);
    expect(isValidUUID(v1Buffer)).toBe(true);
  });

  it('returns true for Nil UUID Buffer', () => {
    const nilBuffer = Buffer.from([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);
    expect(isValidUUID(nilBuffer)).toBe(true);
  });

  it('returns true for Max UUID Buffer', () => {
    const maxBuffer = Buffer.from([
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff,
    ]);
    expect(isValidUUID(maxBuffer)).toBe(true);
  });

  it('returns false for invalid Buffer - too short', () => {
    const shortBuffer = Buffer.from([0x01, 0x02, 0x03]);
    expect(isValidUUID(shortBuffer)).toBe(false);

    const bufferWith15Bytes = Buffer.from([
      0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
    ]);
    expect(isValidUUID(bufferWith15Bytes)).toBe(false);
  });

  it('handles Buffer longer than 16 bytes (uses first 16 bytes)', () => {
    // A buffer with 17 bytes - the first 16 bytes form a valid UUIDv7
    // The conversion ignores bytes beyond the 16th
    const longBuffer = Buffer.from([
      0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
      0xa1, 0xff,
    ]);
    expect(isValidUUID(longBuffer)).toBe(true);
  });

  it('returns false for empty Buffer', () => {
    const emptyBuffer = Buffer.alloc(0);
    expect(isValidUUID(emptyBuffer)).toBe(false);
  });

  it('handles string vs Buffer equivalence', () => {
    // UUIDv7 equivalence
    const v7String = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
    const v7Buffer = Buffer.from([
      0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
      0xa1,
    ]);
    expect(isValidUUID(v7String)).toBe(isValidUUID(v7Buffer));
    expect(isValidUUID(v7String)).toBe(true);

    // UUIDv4 equivalence
    const v4String = '550e8400-e29b-41d4-a716-446655440000';
    const v4Buffer = Buffer.from([
      0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0xa7, 0x16, 0x44, 0x66, 0x55, 0x44, 0x00,
      0x00,
    ]);
    expect(isValidUUID(v4String)).toBe(isValidUUID(v4Buffer));
    expect(isValidUUID(v4String)).toBe(true);

    // Nil UUID equivalence
    const nilString = '00000000-0000-0000-0000-000000000000';
    const nilBuffer = Buffer.from([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);
    expect(isValidUUID(nilString)).toBe(isValidUUID(nilBuffer));
    expect(isValidUUID(nilString)).toBe(true);

    // Max UUID equivalence
    const maxString = 'ffffffff-ffff-ffff-ffff-ffffffffffff';
    const maxBuffer = Buffer.from([
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff,
    ]);
    expect(isValidUUID(maxString)).toBe(isValidUUID(maxBuffer));
    expect(isValidUUID(maxString)).toBe(true);
  });

  it('returns true for valid UUIDv3 Buffer', () => {
    const v3Buffer = Buffer.from([
      0x43, 0x84, 0xb2, 0x7d, 0x26, 0x98, 0x3c, 0xad, 0x8e, 0xcd, 0x2b, 0x80, 0x4a, 0x6d, 0xc8,
      0x03,
    ]);
    expect(isValidUUID(v3Buffer)).toBe(true);
  });

  it('returns true for valid UUIDv5 Buffer', () => {
    const v5Buffer = Buffer.from([
      0xa4, 0xb1, 0x04, 0x51, 0x0b, 0xda, 0x50, 0x91, 0x84, 0xd4, 0x4e, 0xcc, 0xef, 0xb8, 0xbc,
      0x64,
    ]);
    expect(isValidUUID(v5Buffer)).toBe(true);
  });

  it('handles Buffer with all different UUID versions', () => {
    const testCases = [
      {
        version: 'v1',
        buffer: Buffer.from([
          0xcc, 0x86, 0x37, 0x58, 0xb7, 0x14, 0x11, 0xf0, 0xb5, 0x76, 0xc5, 0x86, 0xe8, 0x61, 0x91,
          0x34,
        ]),
      },
      {
        version: 'v3',
        buffer: Buffer.from([
          0x43, 0x84, 0xb2, 0x7d, 0x26, 0x98, 0x3c, 0xad, 0x8e, 0xcd, 0x2b, 0x80, 0x4a, 0x6d, 0xc8,
          0x03,
        ]),
      },
      {
        version: 'v4',
        buffer: Buffer.from([
          0x8d, 0x5d, 0x59, 0xa0, 0xb6, 0x0b, 0x4e, 0x2b, 0x9d, 0x67, 0x7c, 0x5a, 0xb5, 0x3f, 0x9e,
          0x5b,
        ]),
      },
      {
        version: 'v5',
        buffer: Buffer.from([
          0xa4, 0xb1, 0x04, 0x51, 0x0b, 0xda, 0x50, 0x91, 0x84, 0xd4, 0x4e, 0xcc, 0xef, 0xb8, 0xbc,
          0x64,
        ]),
      },
      {
        version: 'v7',
        buffer: Buffer.from([
          0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
          0xa1,
        ]),
      },
    ];

    for (const testCase of testCases) {
      expect(isValidUUID(testCase.buffer)).toBe(true);
    }
  });
});
