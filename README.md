# uuidv7-utilities

A lightweight TypeScript utility library for handling UUIDv7 strings and Buffers.

## Features

- **Extract date from UUIDv7** - `dateFromUUIDv7(uuid: string | Buffer): DateFromUUIDv7Result`
  - Supports both string and Buffer inputs
  - Returns JSON object `{ dateToIsoString: string, dateUnixEpoch: number, dateToUTCString: string } | undefined`

- **Find version number from UUID** - `uuidVersionValidation(uuid: string | Buffer): UUIDVersionTuple`
  - Supports both string and Buffer inputs  
  - Returns string `'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7' | 'v8' | 'NilUUID' | 'MaxUUID' | undefined`
  - Conforms to [RFC 9562 Universally Unique Identifiers (UUIDs)](https://www.rfc-editor.org/rfc/rfc9562.html)

- **Convert UUIDv7 to binary** - `UUIDv7toBinary(uuid: string | Buffer): string | undefined` _(New in v2.4.0)_
  - Converts UUIDv7 to 128-bit binary representation
  - Supports both string and Buffer inputs
  - Returns 128-character binary string or `undefined` for invalid/non-v7 UUIDs

- **Comprehensive Buffer Support** - All functions accept both string and Buffer inputs seamlessly

## Installation

```bash
npm install uuidv7-utilities
```

## Requirements

- Node.js >= 18.0.0
- Testing on Node versions 18, 20 and 22

## Why you should use UUIDv7

When using a UUID for the primary key of a SQL database tables, for performance reasons, you should use UUIDv7 instead of UUIDv4. UUIDv7 embeds a timestamp in the first 48 bits (6 bytes) representing milliseconds since Unix epoch. 

However, beware - node `crypto.randomUUID()` and the PostgresQL `gen_random_uuid()` return a UUIDv4.

From PostgreSQL 18, use the `uuidv7()` function instead of `gen_random_uuid()` to generate a UUID for a primary key, ex: `user_id       UUID PRIMARY KEY     DEFAULT uuidv7()`

A UUID v7 creation NPM library is [uuidv7](https://www.npmjs.com/package/uuidv7) by [LiosK](https://github.com/LiosK).

Using the `dateFromUUIDv7` function, you can extract the timestamp from the UUIDv7. It will return `undefined` if the UUID is not a valid UUID string. The `uuidVersionValidation` function will return the UUID version from 1 to 8, or the string `'NilUUID'` or `'MaxUUID'`, and `undefined` if the UUID is not a valid UUID string. The `UUIDv7toBinary` function converts a UUIDv7 to its 128-bit binary representation, useful for bit-level analysis or cryptographic applications.

## Usage

### Binary Conversion (New in v2.4.0)

```typescript
import { UUIDv7toBinary } from 'uuidv7-utilities';

const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const binary = UUIDv7toBinary(uuidString);

if (binary) {
    console.log(binary);  // '0000000110001111110110001111100110001100000000000111101001001100100010100100011100011010110101001011000011110011101000011010011100011011010100101111100100001111001110100001'
    console.log(binary.length);  // 128 (bits)
    
    // Extract version bits (bits 48-51)
    console.log(binary.substring(48, 52));  // '0111' (version 7)
    
    // Extract variant bits (bits 64-65)
    console.log(binary.substring(64, 66));  // '10' (RFC 4122 variant)
}

// Also works with Buffer input
const uuidBuffer = Buffer.from([
  0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c,
  0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1
]);
const binaryFromBuffer = UUIDv7toBinary(uuidBuffer);
console.log(binary === binaryFromBuffer);  // true

// Returns undefined for non-UUIDv7
UUIDv7toBinary('550e8400-e29b-41d4-a716-446655440000');  // undefined (UUIDv4)
```

### String UUIDs

```typescript
import { dateFromUUIDv7, uuidVersionValidation } from 'uuidv7-utilities';

const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const uuid = uuidVersionValidation(uuidString);
if (uuid === 'v7') {
    const result = dateFromUUIDv7(uuidString);
    if (result) {
        console.log(result.dateToIsoString);     // '2024-06-02T12:43:04.064Z'
        console.log(result.dateUnixEpoch);       // 1717332184064
        console.log(result.dateToUTCString);     // 'Sun, 02 Jun 2024 12:43:04 GMT'
    }
}
```

### Buffer UUIDs

```typescript
import { dateFromUUIDv7, uuidVersionValidation } from 'uuidv7-utilities';

// UUID as Buffer (16 bytes)
const uuidBuffer = Buffer.from([
  0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 
  0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1
]);

const uuid = uuidVersionValidation(uuidBuffer);
if (uuid === 'v7') {
    const result = dateFromUUIDv7(uuidBuffer);
    if (result) {
        console.log(result.dateToIsoString);     // '2024-06-02T12:43:04.064Z'
        console.log(result.dateUnixEpoch);       // 1717332184064
        console.log(result.dateToUTCString);     // 'Sun, 02 Jun 2024 12:43:04 GMT'
    }
}
```

### Mixed Usage

```typescript
import { dateFromUUIDv7, uuidVersionValidation } from 'uuidv7-utilities';

// Both string and Buffer produce identical results
const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const uuidBuffer = Buffer.from([
  0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c,
  0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1
]);

const stringResult = dateFromUUIDv7(uuidString);
const bufferResult = dateFromUUIDv7(uuidBuffer);

// Results are identical
console.log(stringResult?.dateUnixEpoch === bufferResult?.dateUnixEpoch); // true
```

or

```typescript
import { dateFromUUIDv7, uuidVersionValidation } from 'uuidv7-utilities';

const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const uuid = uuidVersionValidation(uuidString);
console.log(uuid);  // 'v7'
const result = dateFromUUIDv7(uuidString);
if (result) {
    console.log(result.dateToIsoString);     // '2024-06-02T12:43:04.064Z'
    console.log(result.dateUnixEpoch);       // 1717332184064
    console.log(result.dateToUTCString);     // 'Sun, 02 Jun 2024 12:43:04 GMT'
}
```

### CommonJS

**⚠️ DEPRECATED** - CommonJS support is deprecated and will be removed in a future version. Please migrate to ES modules.

```javascript
const { dateFromUUIDv7, uuidVersionValidation, UUIDv7toBinary } = require('uuidv7-utilities');

const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const uuid = uuidVersionValidation(uuidString);
if (uuid === 'v7') {
    const result = dateFromUUIDv7(uuidString);
    if (result) {
        console.log(result.dateToIsoString);     // '2024-06-02T12:43:04.064Z'
        console.log(result.dateUnixEpoch);       // 1717332184064
        console.log(result.dateToUTCString);     // 'Sun, 02 Jun 2024 12:43:04 GMT'
    }
    
    const binary = UUIDv7toBinary(uuidString);
    console.log(binary?.length);  // 128
}
```

**Migration to ES Modules:**
```typescript
// Before (CommonJS - deprecated)
const { dateFromUUIDv7 } = require('uuidv7-utilities');

// After (ES Modules - recommended)
import { dateFromUUIDv7 } from 'uuidv7-utilities';
```

## API

### `UUIDv7toBinary(uuid: string | Buffer): string | undefined` _(New in v2.4.0)_

Converts a UUIDv7 to its 128-bit binary representation. This function returns a string of 128 characters containing only '0' and '1', representing the complete binary form of the UUID.

**Parameters:**
- `uuid` (string | Buffer): The UUIDv7 to convert
  - **string**: Must be a valid UUIDv7 string format (e.g., '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')
  - **Buffer**: Must be exactly 16 bytes representing a UUIDv7

**Returns:**
- `string`: 128-character binary string (e.g., '00000001100011111101100011111001...')
  - Contains only '0' and '1' characters
  - Always exactly 128 characters long for valid UUIDv7
  - Each hexadecimal character is converted to 4 binary digits
- `undefined`: If the UUID is not a valid UUIDv7, malformed, or a different UUID version

**Use Cases:**
- Bit-level UUID analysis and manipulation
- Cryptographic applications requiring binary representation
- Direct bit field extraction (version, variant, timestamp, etc.)
- Binary format storage or transmission
- Educational/debugging purposes to visualize UUID structure

**Examples:**
```typescript
// String input
const binary = UUIDv7toBinary('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
console.log(binary?.length);  // 128

// Buffer input  
const buffer = Buffer.from([0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1]);
UUIDv7toBinary(buffer);  // Same 128-bit binary string

// Extract specific bit fields
const binaryStr = UUIDv7toBinary('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1');
if (binaryStr) {
    const versionBits = binaryStr.substring(48, 52);  // '0111' = version 7
    const variantBits = binaryStr.substring(64, 66);  // '10' = RFC 4122
}

// Non-UUIDv7 returns undefined
UUIDv7toBinary('550e8400-e29b-41d4-a716-446655440000');  // undefined (UUIDv4)
UUIDv7toBinary('invalid-uuid');  // undefined
```

### `dateFromUUIDv7(uuid: string | Buffer): DateFromUUIDv7Result`

Extracts date information from a UUIDv7 string or Buffer. UUIDv7 embeds a timestamp in the first 48 bits (6 bytes) representing milliseconds since Unix epoch.

**Parameters:**
- `uuid` (string | Buffer): The UUID to convert
  - **string**: Must be a valid UUIDv7 string format (e.g., '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')
  - **Buffer**: Must be exactly 16 bytes representing a UUID

**Returns:**
- `DateFromUUIDv7Result`: Object with extracted date information
    - `dateToIsoString`: ISO 8601 formatted date string (e.g., '2024-06-02T12:43:04.064Z')
    - `dateUnixEpoch`: Unix timestamp in milliseconds (e.g., 1717332184064)
    - `dateToUTCString`: UTC date string (e.g., 'Sun, 02 Jun 2024 12:43:04 GMT')
- `undefined`: If the UUID is not a valid UUIDv7 or malformed

### `uuidVersionValidation(uuid: string | Buffer): UUIDVersionTuple`

Returns the UUID version, from 1 to 8, or the string `'NilUUID'` or `'MaxUUID'`, and `undefined` if the UUID is not a valid UUID format.

**Parameters:**
- `uuid` (string | Buffer): The UUID to validate
  - **string**: UUID string in standard format (e.g., '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1')
  - **Buffer**: 16-byte Buffer representing a UUID

**Returns:**
- `UUIDVersionTuple`: The UUID version identifier
  - `'v1'` through `'v8'`: Standard UUID versions
  - `'NilUUID'`: For the all-zeros UUID (00000000-0000-0000-0000-000000000000)
  - `'MaxUUID'`: For the all-ones UUID (ffffffff-ffff-ffff-ffff-ffffffffffff)
- `undefined`: If the UUID is not a valid UUID format

**Examples:**
```typescript
// String input
uuidVersionValidation('018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1'); // 'v7'

// Buffer input  
const buffer = Buffer.from([0x01, 0x8f, 0xd8, 0xf9, /* ... */]);
uuidVersionValidation(buffer); // 'v7'

// Invalid input
uuidVersionValidation('invalid-uuid'); // undefined
```

## Buffer Support

**As of version 2.3.0**, all functions support both string and Buffer inputs.
**As of version 2.4.0**, the new `UUIDv7toBinary` function also supports both input types.

### Why Buffer Support?
- **Database Compatibility**: Many databases store UUIDs as binary data (16 bytes)
- **Performance**: Avoids string conversion overhead when working with binary UUID data
- **Memory Efficiency**: Buffers use less memory than string representations
- **API Compatibility**: Seamless integration with existing Buffer-based UUID workflows

### Buffer Requirements
- Must be exactly **16 bytes** long
- Contains the raw UUID bytes in standard network byte order
- Invalid or malformed Buffers return `undefined` gracefully

### Buffer Conversion
The library automatically converts Buffers to string format internally:
- Converts 16-byte Buffer to standard UUID string format
- Handles all UUID versions and special cases (Nil, Max UUIDs)
- Maintains identical results for equivalent string and Buffer inputs

```typescript
// These produce identical results
const uuidString = '018fd8f9-8c00-7a4c-8a47-1a6d4b90f3a1';
const uuidBuffer = Buffer.from([0x01, 0x8f, 0xd8, 0xf9, 0x8c, 0x00, 0x7a, 0x4c, 0x8a, 0x47, 0x1a, 0x6d, 0x4b, 0x90, 0xf3, 0xa1]);

dateFromUUIDv7(uuidString);  // Same result
dateFromUUIDv7(uuidBuffer);  // Same result
```

## About UUIDv7

You can read more about UUIDv7 here: [UUIDv7: The Fast, Unique, Ordered Identifier Every Scalable System Needs](https://medium.com/@zahrazolfaghari00/uuidv7-the-fast-unique-ordered-identifier-every-scalable-system-needs-999e57eb0104).

## Development

This project uses:
- **TypeScript** for type-safe code
- **Biome** for linting and formatting
- **Node.js test runner** for testing

### Scripts

```bash
# Build the project
npm run build

# Run tests
npm test

# Format and lint code
npm run check

# Format code only
npm run format

# Lint code only
npm run lint
```

## License

MIT
