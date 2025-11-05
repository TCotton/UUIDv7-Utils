import { uuidRegex } from './uuidRegex.js';
type UUIDVersionTuple =
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

const uuidVersionValidation = (uuid: string): UUIDVersionTuple => {
  const match: RegExpMatchArray | null = uuidRegex(uuid);
  const isNilUUID = uuid === '00000000-0000-0000-0000-000000000000';
  // Max UUID comparison is case-insensitive to handle both upper and lower case formats
  const isMaxUUID = uuid.toLowerCase() === 'ffffffff-ffff-ffff-ffff-ffffffffffff';

  if (match) {
    // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
    const version = uuid.charAt(14);

    // Return the appropriate version string based on the extracted version
    switch (version) {
      case '1':
        return 'v1';
      case '2':
        return 'v2';
      case '3':
        return 'v3';
      case '4':
        return 'v4';
      case '5':
        return 'v5';
      case '6':
        return 'v6';
      case '7':
        return 'v7';
      case '8':
        return 'v8';
      default:
        return undefined;
    }
  }

  if (isNilUUID) {
    return 'NilUUID';
  }

  if (isMaxUUID) {
    return 'MaxUUID';
  }

  return undefined;
};

export { uuidVersionValidation, type UUIDVersionTuple };
