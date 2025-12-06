import { uuidRegex } from './uuidRegex.js';

type IsValidUUID = boolean;

/**
 * @function isValidUUID
 * @description Validates whether a string is a properly formatted UUID.
 *
 * Checks if the input string matches the standard UUID format (8-4-4-4-12 hexadecimal pattern)
 * and validates the structure according to RFC 4122. Returns `true` for valid UUIDs of any version
 * (v1-v8), as well as Nil and Max UUIDs. Returns `false` for malformed or invalid strings.
 *
 * @param {string} uuid - The string to validate as a UUID.
 * @returns {boolean} `true` if the string is a valid UUID, `false` otherwise.
 *
 * @example
 * // Returns true for valid UUID
 * isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
 * // true
 *
 * @example
 * // Returns true for any UUID version
 * isValidUUID('550e8400-e29b-41d4-a716-446655440000');
 * // true
 *
 * @example
 * // Returns false for invalid UUID
 * isValidUUID('not-a-uuid');
 * // false
 *
 * @example
 * // Returns false for malformed UUID
 * isValidUUID('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a');
 * // false
 */
const isValidUUID = (uuid: string): IsValidUUID => {
  const isNilUUID = uuid === '00000000-0000-0000-0000-000000000000';
  // Max UUID comparison is case-insensitive to handle both upper and lower case formats
  const isMaxUUID = uuid.toLowerCase() === 'ffffffff-ffff-ffff-ffff-ffffffffffff';

  if (isNilUUID) {
    return true;
  }

  if (isMaxUUID) {
    return true;
  }

  return !!uuidRegex(uuid);
};

export { type IsValidUUID, isValidUUID };
