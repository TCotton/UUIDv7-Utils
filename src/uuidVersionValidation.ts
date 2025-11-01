type UUIDVersionTuple = 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7' | undefined;

const uuidVersionValidation = (uuid: string): UUIDVersionTuple => {
  // Check if the string matches UUID format (with hyphens) first
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-([1-7])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const match = uuid.match(uuidRegex);

  if (match) {
    if (match) {
      // Extract the version from the UUID (13th character, or index 14 in the string with hyphens)
      const version = uuid.charAt(14);

      if (version === '1') {
        return 'v1';
      }

      if (version === '2') {
        return 'v2';
      }

      if (version === '3') {
        return 'v3';
      }

      if (version === '4') {
        return 'v4';
      }

      if (version === '5') {
        return 'v5';
      }

      if (version === '6') {
        return 'v6';
      }

      if (version === '7') {
        return 'v7';
      }
    }
  }
};

export { uuidVersionValidation, type UUIDVersionTuple };
