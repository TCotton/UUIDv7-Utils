
const dateFromUUIDv7=<T>(uuid: T): Date | null => {
    // Use both TypeScript and native JavaScript to check the type of the input
    const objectType = Object.prototype.toString.call(uuid).slice(8, -1)
    if (objectType !== 'String' || typeof uuid !== 'string') return null;

    // Returns null if not a HEX string
    if (!/^[0-9a-fA-F]+$/.test(uuid)) return null

    const hex = uuid.replace(/-/g, '');
    if (hex.length !== 32) return null;

    try {
        // First 12 hex digits = 48 bits of timestamp (milliseconds since epoch)
        const timestampHex = hex.slice(0, 12);
        const timestampMs = parseInt(timestampHex, 16);

        // Convert to Date
        return new Date(timestampMs);
    } catch {
        return null;
    }
}

export { dateFromUUIDv7 };
