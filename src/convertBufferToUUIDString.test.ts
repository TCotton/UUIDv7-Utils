import { describe, it, expect } from 'vitest';
import { convertBufferToUUIDString } from './convertBufferToUUIDString.js';

describe('convertBufferToUUIDString', () => {
  it('should convert a valid UUID buffer to UUID string format', () => {
    // UUID v4: 550e8400-e29b-41d4-a716-446655440000
    const uuidBuffer = Buffer.from([
      0x55, 0x0e, 0x84, 0x00, 0xe2, 0x9b, 0x41, 0xd4, 0xa7, 0x16, 0x44, 0x66, 0x55, 0x44, 0x00,
      0x00,
    ]);

    const result = convertBufferToUUIDString(uuidBuffer);
    expect(result).toBe('550e8400-e29b-41d4-a716-446655440000');
  });

  it('should convert a UUIDv7 buffer to UUID string format', () => {
    // Example UUIDv7 buffer
    const uuidv7Buffer = Buffer.from([
      0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
      0xa1,
    ]);

    const result = convertBufferToUUIDString(uuidv7Buffer);
    expect(result).toBe('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
  });

  it('should convert different UUID versions correctly', () => {
    // UUIDv1 buffer
    const uuidv1Buffer = Buffer.from([
      0xcc, 0x86, 0x37, 0x58, 0xb7, 0x14, 0x11, 0xf0, 0xb5, 0x76, 0xc5, 0x86, 0xe8, 0x61, 0x91,
      0x34,
    ]);

    const result = convertBufferToUUIDString(uuidv1Buffer);
    expect(result).toBe('cc863758-b714-11f0-b576-c586e8619134');
  });

  it('should handle nil UUID (all zeros)', () => {
    const nilUuidBuffer = Buffer.from([
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x00,
    ]);

    const result = convertBufferToUUIDString(nilUuidBuffer);
    expect(result).toBe('00000000-0000-0000-0000-000000000000');
  });

  it('should handle max UUID (all 0xFF)', () => {
    const maxUuidBuffer = Buffer.from([
      0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      0xff,
    ]);

    const result = convertBufferToUUIDString(maxUuidBuffer);
    expect(result).toBe('ffffffff-ffff-ffff-ffff-ffffffffffff');
  });

  it('should handle buffers with mixed case hex values', () => {
    // Buffer with various hex values
    const mixedBuffer = Buffer.from([
      0xab, 0xcd, 0xef, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78,
      0x9a,
    ]);

    const result = convertBufferToUUIDString(mixedBuffer);
    expect(result).toBe('abcdef12-3456-789a-bcde-f0123456789a');
  });

  it('should return the same result as manual hex formatting for valid UUIDs', () => {
    // Use a proper UUID v4 buffer that has correct version and variant bits
    const buffer = Buffer.from([
      0x01,
      0x23,
      0x45,
      0x67,
      0x89,
      0xab,
      0x4d,
      0xef, // version 4 in position 12
      0x81,
      0x23,
      0x45,
      0x67,
      0x89,
      0xab,
      0xcd,
      0xef, // variant 10 in position 16
    ]);

    const result = convertBufferToUUIDString(buffer);

    // Manual formatting for comparison
    const hex = buffer.toString('hex');
    const expectedUuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;

    expect(result).toBe(expectedUuid);
    expect(result).toBe('01234567-89ab-4def-8123-456789abcdef');
  });

  it('should handle buffers created from existing UUID strings', () => {
    const originalUuid = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

    // Convert UUID string to buffer and back
    const hex = originalUuid.replace(/-/g, '');
    const buffer = Buffer.from(hex, 'hex');
    const result = convertBufferToUUIDString(buffer);

    expect(result).toBe(originalUuid);
  });

  it('should return malformed string for buffers that are not 16 bytes', () => {
    const shortBuffer = Buffer.from([0x01, 0x02, 0x03]);

    const result = convertBufferToUUIDString(shortBuffer);

    // The stringify function doesn't validate length, so it returns malformed output
    expect(result).toBe(
      '010203undefined-undefinedundefined-undefinedundefined-undefinedundefined-undefinedundefinedundefinedundefinedundefinedundefined'
    );

    // Verify it doesn't match valid UUID format
    expect(result).not.toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it('should return malformed string for empty buffer', () => {
    const emptyBuffer = Buffer.alloc(0);

    const result = convertBufferToUUIDString(emptyBuffer);

    // The stringify function doesn't validate length, so it returns malformed output with undefined values
    expect(result).toBe(
      'nan-undefinedundefined-undefinedundefined-undefinedundefined-undefinedundefinedundefinedundefinedundefinedundefined'
    );

    // Verify it doesn't match valid UUID format
    expect(result).not.toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it('should demonstrate the difference from uuid library behavior', () => {
    // Note: This test documents the behavioral change from uuid.stringify()
    // The new stringify() function doesn't throw errors for invalid input,
    // instead it returns malformed strings that can be detected by format validation

    const invalidBuffers = [
      Buffer.from([0x01]), // Too short (1 byte)
      Buffer.from([0x01, 0x02, 0x03, 0x04]), // Too short (4 bytes)
      Buffer.alloc(0), // Empty buffer
    ];

    for (const buffer of invalidBuffers) {
      const result = convertBufferToUUIDString(buffer);

      // All invalid buffers should produce non-UUID-formatted strings
      expect(result).not.toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);

      // Results should contain 'undefined' or 'nan' for invalid input
      expect(result.includes('undefined') || result.includes('nan')).toBeTruthy();
    }
  });

  it('should preserve exact byte values in conversion for valid UUIDs', () => {
    // Test with valid UUID buffers that have proper version and variant bits
    const testCases = [
      // UUIDv4 with proper version (4) and variant (10) bits
      Buffer.from([
        0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x46, 0x77, 0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee,
        0xff,
      ]),
      // UUIDv4 with all same nibbles but proper version/variant
      Buffer.from([
        0x42, 0x42, 0x42, 0x42, 0x42, 0x42, 0x44, 0x42, 0x84, 0x42, 0x42, 0x42, 0x42, 0x42, 0x42,
        0x42,
      ]),
    ];

    for (const buffer of testCases) {
      const result = convertBufferToUUIDString(buffer);

      // Verify the result is a valid UUID format
      expect(result).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);

      // Verify we can reconstruct the original buffer
      const hexString = result.replace(/-/g, '');
      const reconstructedBuffer = Buffer.from(hexString, 'hex');
      expect(reconstructedBuffer).toEqual(buffer);
    }
  });

  describe('UUID Version Support', () => {
    it('should convert UUIDv1 buffers correctly', () => {
      // UUIDv1: cc863758-b714-11f0-b576-c586e8619134 (version 1, variant 10)
      const uuidv1Buffer = Buffer.from([
        0xcc, 0x86, 0x37, 0x58, 0xb7, 0x14, 0x11, 0xf0, 0xb5, 0x76, 0xc5, 0x86, 0xe8, 0x61, 0x91,
        0x34,
      ]);

      const result = convertBufferToUUIDString(uuidv1Buffer);
      expect(result).toBe('cc863758-b714-11f0-b576-c586e8619134');

      // Verify version bit is 1
      expect(result.charAt(14)).toBe('1');
    });

    it('should convert UUIDv2 buffers correctly', () => {
      // UUIDv2: e2a1f3c4-1d23-21f2-8f56-abcdef123456 (version 2, variant 10)
      const uuidv2Buffer = Buffer.from([
        0xe2, 0xa1, 0xf3, 0xc4, 0x1d, 0x23, 0x21, 0xf2, 0x8f, 0x56, 0xab, 0xcd, 0xef, 0x12, 0x34,
        0x56,
      ]);

      const result = convertBufferToUUIDString(uuidv2Buffer);
      expect(result).toBe('e2a1f3c4-1d23-21f2-8f56-abcdef123456');

      // Verify version bit is 2
      expect(result.charAt(14)).toBe('2');
    });

    it('should convert UUIDv3 buffers correctly', () => {
      // UUIDv3: 4384b27d-2698-3cad-8ecd-2b804a6dc803 (version 3, variant 10)
      const uuidv3Buffer = Buffer.from([
        0x43, 0x84, 0xb2, 0x7d, 0x26, 0x98, 0x3c, 0xad, 0x8e, 0xcd, 0x2b, 0x80, 0x4a, 0x6d, 0xc8,
        0x03,
      ]);

      const result = convertBufferToUUIDString(uuidv3Buffer);
      expect(result).toBe('4384b27d-2698-3cad-8ecd-2b804a6dc803');

      // Verify version bit is 3
      expect(result.charAt(14)).toBe('3');
    });

    it('should convert UUIDv4 buffers correctly', () => {
      // UUIDv4: 8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b (version 4, variant 10)
      const uuidv4Buffer = Buffer.from([
        0x8d, 0x5d, 0x59, 0xa0, 0xb6, 0x0b, 0x4e, 0x2b, 0x9d, 0x67, 0x7c, 0x5a, 0xb5, 0x3f, 0x9e,
        0x5b,
      ]);

      const result = convertBufferToUUIDString(uuidv4Buffer);
      expect(result).toBe('8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b');

      // Verify version bit is 4
      expect(result.charAt(14)).toBe('4');
    });

    it('should convert UUIDv5 buffers correctly', () => {
      // UUIDv5: a4b10451-0bda-5091-84d4-4eccefb8bc64 (version 5, variant 10)
      const uuidv5Buffer = Buffer.from([
        0xa4, 0xb1, 0x04, 0x51, 0x0b, 0xda, 0x50, 0x91, 0x84, 0xd4, 0x4e, 0xcc, 0xef, 0xb8, 0xbc,
        0x64,
      ]);

      const result = convertBufferToUUIDString(uuidv5Buffer);
      expect(result).toBe('a4b10451-0bda-5091-84d4-4eccefb8bc64');

      // Verify version bit is 5
      expect(result.charAt(14)).toBe('5');
    });

    it('should convert UUIDv6 buffers correctly', () => {
      // UUIDv6: 1e2f3a4b-5c6d-6f78-90ab-cdef12345678 (version 6, variant 10)
      const uuidv6Buffer = Buffer.from([
        0x1e, 0x2f, 0x3a, 0x4b, 0x5c, 0x6d, 0x6f, 0x78, 0x90, 0xab, 0xcd, 0xef, 0x12, 0x34, 0x56,
        0x78,
      ]);

      const result = convertBufferToUUIDString(uuidv6Buffer);
      expect(result).toBe('1e2f3a4b-5c6d-6f78-90ab-cdef12345678');

      // Verify version bit is 6
      expect(result.charAt(14)).toBe('6');
    });

    it('should convert UUIDv7 buffers correctly', () => {
      // UUIDv7: 018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1 (version 7, variant 10)
      const uuidv7Buffer = Buffer.from([
        0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3,
        0xa1,
      ]);

      const result = convertBufferToUUIDString(uuidv7Buffer);
      expect(result).toBe('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');

      // Verify version bit is 7
      expect(result.charAt(14)).toBe('7');
    });

    it('should convert UUIDv8 buffers correctly', () => {
      // UUIDv8: d8a1c4e2-12f3-8a4b-91de-5f63bc7a249e (version 8, variant 10)
      const uuidv8Buffer = Buffer.from([
        0xd8, 0xa1, 0xc4, 0xe2, 0x12, 0xf3, 0x8a, 0x4b, 0x91, 0xde, 0x5f, 0x63, 0xbc, 0x7a, 0x24,
        0x9e,
      ]);

      const result = convertBufferToUUIDString(uuidv8Buffer);
      expect(result).toBe('d8a1c4e2-12f3-8a4b-91de-5f63bc7a249e');

      // Verify version bit is 8
      expect(result.charAt(14)).toBe('8');
    });

    it('should handle all UUID versions in a batch test', () => {
      const versionTestCases = [
        {
          version: 1,
          buffer: Buffer.from([
            0xcc, 0x86, 0x37, 0x58, 0xb7, 0x14, 0x11, 0xf0, 0xb5, 0x76, 0xc5, 0x86, 0xe8, 0x61,
            0x91, 0x34,
          ]),
          expected: 'cc863758-b714-11f0-b576-c586e8619134',
        },
        {
          version: 2,
          buffer: Buffer.from([
            0xe2, 0xa1, 0xf3, 0xc4, 0x1d, 0x23, 0x21, 0xf2, 0x8f, 0x56, 0xab, 0xcd, 0xef, 0x12,
            0x34, 0x56,
          ]),
          expected: 'e2a1f3c4-1d23-21f2-8f56-abcdef123456',
        },
        {
          version: 3,
          buffer: Buffer.from([
            0x43, 0x84, 0xb2, 0x7d, 0x26, 0x98, 0x3c, 0xad, 0x8e, 0xcd, 0x2b, 0x80, 0x4a, 0x6d,
            0xc8, 0x03,
          ]),
          expected: '4384b27d-2698-3cad-8ecd-2b804a6dc803',
        },
        {
          version: 4,
          buffer: Buffer.from([
            0x8d, 0x5d, 0x59, 0xa0, 0xb6, 0x0b, 0x4e, 0x2b, 0x9d, 0x67, 0x7c, 0x5a, 0xb5, 0x3f,
            0x9e, 0x5b,
          ]),
          expected: '8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b',
        },
        {
          version: 5,
          buffer: Buffer.from([
            0xa4, 0xb1, 0x04, 0x51, 0x0b, 0xda, 0x50, 0x91, 0x84, 0xd4, 0x4e, 0xcc, 0xef, 0xb8,
            0xbc, 0x64,
          ]),
          expected: 'a4b10451-0bda-5091-84d4-4eccefb8bc64',
        },
        {
          version: 6,
          buffer: Buffer.from([
            0x1e, 0x2f, 0x3a, 0x4b, 0x5c, 0x6d, 0x6f, 0x78, 0x90, 0xab, 0xcd, 0xef, 0x12, 0x34,
            0x56, 0x78,
          ]),
          expected: '1e2f3a4b-5c6d-6f78-90ab-cdef12345678',
        },
        {
          version: 7,
          buffer: Buffer.from([
            0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90,
            0xf3, 0xa1,
          ]),
          expected: '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1',
        },
        {
          version: 8,
          buffer: Buffer.from([
            0xd8, 0xa1, 0xc4, 0xe2, 0x12, 0xf3, 0x8a, 0x4b, 0x91, 0xde, 0x5f, 0x63, 0xbc, 0x7a,
            0x24, 0x9e,
          ]),
          expected: 'd8a1c4e2-12f3-8a4b-91de-5f63bc7a249e',
        },
      ];

      for (const testCase of versionTestCases) {
        const result = convertBufferToUUIDString(testCase.buffer);

        expect(result).toBe(testCase.expected);

        // Verify version bit matches expected version
        expect(result.charAt(14)).toBe(testCase.version.toString());

        // Verify the result follows UUID format
        expect(result).toMatch(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        );

        // Verify round-trip conversion
        const hexString = result.replace(/-/g, '');
        const reconstructedBuffer = Buffer.from(hexString, 'hex');
        expect(reconstructedBuffer).toEqual(testCase.buffer);
      }
    });

    it('should maintain proper variant bits for all versions', () => {
      const versionTestCases = [
        { version: 1, uuid: 'cc863758-b714-11f0-b576-c586e8619134' },
        { version: 2, uuid: 'e2a1f3c4-1d23-21f2-8f56-abcdef123456' },
        { version: 3, uuid: '4384b27d-2698-3cad-8ecd-2b804a6dc803' },
        { version: 4, uuid: '8d5d59a0-b60b-4e2b-9d67-7c5ab53f9e5b' },
        { version: 5, uuid: 'a4b10451-0bda-5091-84d4-4eccefb8bc64' },
        { version: 6, uuid: '1e2f3a4b-5c6d-6f78-90ab-cdef12345678' },
        { version: 7, uuid: '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1' },
        { version: 8, uuid: 'd8a1c4e2-12f3-8a4b-91de-5f63bc7a249e' },
      ];

      for (const testCase of versionTestCases) {
        // Create buffer from UUID and convert back
        const hexString = testCase.uuid.replace(/-/g, '');
        const buffer = Buffer.from(hexString, 'hex');
        const result = convertBufferToUUIDString(buffer);

        expect(result).toBe(testCase.uuid);

        // Check variant bits (bits 6-7 of byte 8, should be '10' for RFC 4122 UUIDs)
        const variantChar = result.charAt(19); // First character of 4th group
        const variantByte = parseInt(variantChar, 16);
        expect((variantByte & 0x8) !== 0 && (variantByte & 0x4)).toEqual(0)
      }
    });
  });
});
