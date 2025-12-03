import { handleBuffer } from './handleBuffer.js';
import { uuidRegex } from './uuidRegex.js';

type DateFromUUIDv7 =
  | {
      dateToIsoString: string;
      dateUnixEpoch: number;
      dateToUTCString: string;
    }
  | undefined;

/**
 * @function dateFromUUIDv7
 * @description Extracts the timestamp from a UUIDv7 string or Buffer and converts it to multiple date formats.
 *
 * Validates the input as a UUID, checks that it is version 7, and then
 * extracts the 48-bit timestamp from the first 12 hex digits. Returns an object containing
 * the timestamp in ISO string format, Unix epoch milliseconds, and UTC string format.
 * If the input is not a valid UUIDv7, returns `undefined`.
 *
 * @param {string | Buffer} uuid - The UUIDv7 as a string or Buffer.
 * @returns {DateFromUUIDv7} An object with `dateToIsoString`, `dateUnixEpoch`, and `dateToUTCString` properties, or `undefined` if invalid.
 *
 * @example
 * // Returns date object with multiple formats
 * dateFromUUIDv7('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
 * // {
 * //   dateToIsoString: '2024-11-21T10:30:45.000Z',
 * //   dateUnixEpoch: 1732186245000,
 * //   dateToUTCString: 'Thu, 21 Nov 2024 10:30:45 GMT'
 * // }
 *
 * @example
 * // Returns undefined for invalid UUID
 * dateFromUUIDv7('not-a-uuid');
 */
const dateFromUUIDv7 = (uuid: string | Buffer): DateFromUUIDv7 => {
  const uuidString = handleBuffer(uuid);
  // Validate UUID format using uuidRegex
  const match: RegExpMatchArray | null = uuidRegex(uuidString);

  if (match) {
    // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
    const version = uuidString.charAt(14);

    // If it's a valid UUIDv7, process it
    if (version === '7') {
      try {
        // First 12 hex digits = 48 bits of timestamp (milliseconds since epoch)
        const hex = uuidString.replace(/-/g, '');
        const timestampHex = hex.slice(0, 12);
        const timestampMs = parseInt(timestampHex, 16);

        // Convert to Date
        const date = new Date(timestampMs);
        return {
          dateToIsoString: date.toISOString(),
          dateUnixEpoch: date.getTime(),
          dateToUTCString: date.toUTCString(),
        };
      } catch (_error) {
        return undefined;
      }
    }
  }
  return undefined;
};

export { dateFromUUIDv7, type DateFromUUIDv7 };
