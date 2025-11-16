import { isBuffer } from './isBuffer.js';
import { stringify } from './stringify.js';

/**
 * Converts a Buffer to a UUID string format or returns the input if already a string.
 * This utility function handles both string and Buffer inputs, ensuring consistent
 * string output for UUID processing functions.
 *
 * @param {string | Buffer} value - The UUID value as either a string or Buffer
 * @returns {string} The UUID as a string in the format XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 *
 * @example
 * // With string input
 * handleBuffer('550e8400-e29b-41d4-a716-446655440000')
 * // returns '550e8400-e29b-41d4-a716-446655440000'
 *
 * @example
 * // With Buffer input
 * const buffer = Buffer.from([...]) // 16-byte Buffer
 * handleBuffer(buffer)
 * // returns '550e8400-e29b-41d4-a716-446655440000'
 */
export const handleBuffer = (value: string | Buffer) => {
  if (isBuffer(value)) {
    return stringify(value);
  }
  return value;
};
