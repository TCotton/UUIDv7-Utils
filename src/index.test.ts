import assert from 'node:assert';
import { describe, it } from 'node:test';
import { dateFromUUIDv7 } from './index.js';

describe('dateFromUUIDv7', () => {

    it('returns null if not a string', () => {
        // Test number
        const number = 1234567890;
        assert.strictEqual(dateFromUUIDv7(number), null);

        // Test boolean (true)
        const booleanTrue = true;
        assert.strictEqual(dateFromUUIDv7(booleanTrue), null);

        // Test boolean (false)
        const booleanFalse = false;
        assert.strictEqual(dateFromUUIDv7(booleanFalse), null);

        // Test null
        const nullValue = null;
        assert.strictEqual(dateFromUUIDv7(nullValue), null);

        // Test undefined
        const undefinedValue = undefined;
        assert.strictEqual(dateFromUUIDv7(undefinedValue), null);

        // Test object
        const object = { key: 'value' };
        assert.strictEqual(dateFromUUIDv7(object), null);

        // Test array
        const array = [1, 2, 3];
        assert.strictEqual(dateFromUUIDv7(array), null);

        // Test function
        const func = () => 'test';
        assert.strictEqual(dateFromUUIDv7(func), null);

        // Test Date object
        const date = new Date();
        assert.strictEqual(dateFromUUIDv7(date), null);

        // Test RegExp
        const regex = /test/;
        assert.strictEqual(dateFromUUIDv7(regex), null);

        // Test Symbol
        const symbol = Symbol('test');
        assert.strictEqual(dateFromUUIDv7(symbol), null);

        // Test BigInt
        const bigint = BigInt(123);
        assert.strictEqual(dateFromUUIDv7(bigint), null);

        // Test empty array
        const emptyArray: unknown[] = [];
        assert.strictEqual(dateFromUUIDv7(emptyArray), null);

        // Test empty object
        const emptyObject = {};
        assert.strictEqual(dateFromUUIDv7(emptyObject), null);
    })

    it('returns null if not a HEX string', () => {
        // Test string with non-hex characters
        const notAHex = 'not-a-hex';
        assert.strictEqual(dateFromUUIDv7(notAHex), null);

        // Test string with special characters
        const specialChars = '!@#$%^&*()';
        assert.strictEqual(dateFromUUIDv7(specialChars), null);

        // Test string with spaces
        const withSpaces = '123 456 789';
        assert.strictEqual(dateFromUUIDv7(withSpaces), null);

        // Test string with letters outside hex range (g-z)
        const nonHexLetters = 'ghijklmnopqrstuvwxyz';
        assert.strictEqual(dateFromUUIDv7(nonHexLetters), null);

        // Test string with mixed valid hex and invalid characters
        const mixedChars = '123abc-xyz-789';
        assert.strictEqual(dateFromUUIDv7(mixedChars), null);

        // Test empty string
        const emptyString = '';
        assert.strictEqual(dateFromUUIDv7(emptyString), null);

        // Test string with only spaces
        const onlySpaces = '   ';
        assert.strictEqual(dateFromUUIDv7(onlySpaces), null);

        // Test string with newlines and tabs
        const whitespace = 'abc\n123\t456';
        assert.strictEqual(dateFromUUIDv7(whitespace), null);

        // Test string with unicode characters
        const unicode = '123αβγ456';
        assert.strictEqual(dateFromUUIDv7(unicode), null);

        // Test string with emojis
        const emojis = '123🚀456🎉';
        assert.strictEqual(dateFromUUIDv7(emojis), null);

        // Test string with numbers and punctuation
        const numbersAndPunctuation = '123.456,789';
        assert.strictEqual(dateFromUUIDv7(numbersAndPunctuation), null);

        // Test string with uppercase and lowercase mixed with invalid chars
        const mixedCase = 'AbC123XyZ';
        assert.strictEqual(dateFromUUIDv7(mixedCase), null);

        // Test string that looks like UUID but has invalid characters
        const fakeUuid = '018cc251-f400-7000-8000-00000000000g';
        assert.strictEqual(dateFromUUIDv7(fakeUuid), null);

        // Test string with underscores
        const withUnderscores = '123_abc_def';
        assert.strictEqual(dateFromUUIDv7(withUnderscores), null);

        // Test string with plus and minus signs
        const withSigns = '+123-abc';
        assert.strictEqual(dateFromUUIDv7(withSigns), null);
    });


        /*   it.skip('dateFromUUIDv7 - extracts date from valid UUIDv7', () => {
               // UUIDv7 with timestamp for 2024-01-01T00:00:00.000Z
               // Timestamp: 1704067200000 (0x018cc251f400)
               const uuid = '018cc251-f400-7000-8000-000000000000';
               const date = dateFromUUIDv7(uuid);

               assert.strictEqual(date.getTime(), 1704067200000);
           });

           it('dateFromUUIDv7 - throws error for invalid UUID format', () => {
               const invalidUuid = 'not-a-uuid';

               assert.throws(() => dateFromUUIDv7(invalidUuid), {
                   name: 'Error',
                   message: 'Invalid UUIDv7 format',
               });
           });

           it('dateFromUUIDv7 - throws error for non-UUIDv7 (wrong version)', () => {
               // UUID with version 4 instead of 7
               const uuidv4 = '018cfdf8-8000-4000-8000-000000000000';

               assert.throws(() => dateFromUUIDv7(uuidv4), {
                   name: 'Error',
                   message: 'Invalid UUIDv7 format',
               });
           });

           it.skip('dateFromUUIDv7 - handles different timestamps correctly', () => {
               // Timestamp: 1700000000000 (0x018bcfe56800)
               const uuid = '018bcfe5-6800-7000-8000-000000000000';
               const date = dateFromUUIDv7(uuid);

               assert.strictEqual(date.getTime(), 1700000000000);
           });*/

})
