import { handleBuffer } from './handleBuffer.js';
import { uuidRegex } from './uuidRegex.js';

type UUIDVersionValidation =
  | 'v1'
  | 'v2'
  | 'v3'
  | 'v4'
  | 'v5'
  | 'v6'
  | 'v7'
  | 'v8'
  | 'NilUUID'
  | 'MaxUUID'
  | undefined;

/**
 * @function uuidVersionValidation
 * @description Validates a UUID string or Buffer and returns its version identifier.
 *
 * Validates the input as a UUID and extracts the version from the appropriate position.
 * Returns a string indicating the UUID version ('v1' through 'v8'), or special identifiers
 * for Nil UUID (all zeros) and Max UUID (all ones). If the input is not a valid UUID,
 * returns `undefined`.
 *
 * @param {string | Buffer} uuid - The UUID as a string or Buffer.
 * @returns {UUIDVersionValidation} A version string ('v1'-'v8'), 'NilUUID', 'MaxUUID', or `undefined` if invalid.
 *
 * @example
 * // Returns version identifier for UUIDv7
 * uuidVersionValidation('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
 * // 'v7'
 *
 * @example
 * // Returns version identifier for UUIDv4
 * uuidVersionValidation('550e8400-e29b-41d4-a716-446655440000');
 * // 'v4'
 *
 * @example
 * // Returns special identifier for Nil UUID
 * uuidVersionValidation('00000000-0000-0000-0000-000000000000');
 * // 'NilUUID'
 *
 * @example
 * // Returns undefined for invalid UUID
 * uuidVersionValidation('not-a-uuid');
 */
const uuidVersionValidation = (uuid: string | Buffer): UUIDVersionValidation => {
  const uuidString = handleBuffer(uuid);
  const match: RegExpMatchArray | null = uuidRegex(uuidString);
  const isNilUUID = uuidString === '00000000-0000-0000-0000-000000000000';
  // Max UUID comparison is case-insensitive to handle both upper and lower case formats
  const isMaxUUID = uuidString.toLowerCase() === 'ffffffff-ffff-ffff-ffff-ffffffffffff';

  if (match) {
    // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
    const version = uuidString.charAt(14);

    // Object literal mapping for version characters to version strings
    const versionMap = {
      '1': 'v1',
      '2': 'v2',
      '3': 'v3',
      '4': 'v4',
      '5': 'v5',
      '6': 'v6',
      '7': 'v7',
      '8': 'v8',
    } as const;

    // Return the appropriate version string or undefined if not found
    return versionMap[version as keyof typeof versionMap] || undefined;
  }

  if (isNilUUID) {
    return 'NilUUID';
  }

  if (isMaxUUID) {
    return 'MaxUUID';
  }

  return undefined;
};

export { uuidVersionValidation, type UUIDVersionValidation };
