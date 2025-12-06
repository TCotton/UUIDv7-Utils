import { uuidRegex } from './uuidRegex.js';
import { handleBuffer } from './handleBuffer.js';

type IsValidUUID = boolean;

/**
 * @function isValidUUID
 * @description Validates whether a string or Buffer is a properly formatted UUID.
 *
 * Checks if the input matches the standard UUID format (8-4-4-4-12 hexadecimal pattern)
 * and validates the structure according to RFC 4122. Returns `true` for valid UUIDs of any version
 * (v1-v8), as well as Nil and Max UUIDs. Returns `false` for malformed or invalid inputs.
 *
 * Supports both string and Buffer inputs seamlessly. Buffer inputs are automatically converted
 * to UUID string format before validation.
 *
 * @param {string | Buffer} uuid - The string or Buffer to validate as a UUID.
 * @returns {boolean} `true` if the input is a valid UUID, `false` otherwise.
 *
 * @example
 * // Returns true for valid UUID string
 * isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
 * // true
 *
 * @example
 * // Returns true for valid UUID Buffer
 * const buffer = Buffer.from([0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1]);
 * isValidUUID(buffer);
 * // true
 *
 * @example
 * // Returns true for any UUID version
 * isValidUUID('550e8400-e29b-41d4-a716-446655440000');
 * // true
 *
 * @example
 * // Returns true for Nil UUID
 * isValidUUID('00000000-0000-0000-0000-000000000000');
 * // true
 *
 * @example
 * // Returns true for Max UUID (case-insensitive)
 * isValidUUID('ffffffff-ffff-ffff-ffff-ffffffffffff');
 * // true
 *
 * @example
 * // Returns false for invalid UUID string
 * isValidUUID('not-a-uuid');
 * // false
 *
 * @example
 * // Returns false for malformed UUID
 * isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a');
 * // false
 *
 * @example
 * // Returns false for invalid Buffer
 * const invalidBuffer = Buffer.from([0x01, 0x02, 0x03]);
 * isValidUUID(invalidBuffer);
 * // false
 */
const isValidUUID = (uuid: string | Buffer): IsValidUUID => {
  const uuidString = handleBuffer(uuid);
  const isNilUUID = uuidString === '00000000-0000-0000-0000-000000000000';
  // Max UUID comparison is case-insensitive to handle both upper and lower case formats
  const isMaxUUID = uuidString.toLowerCase() === 'ffffffff-ffff-ffff-ffff-ffffffffffff';

  if (isNilUUID || isMaxUUID) {
    return true;
  }

  return !!uuidRegex(uuidString);
};

export { type IsValidUUID, isValidUUID };
