# Vitest Test Configuration

This project uses Vitest with two different configurations for testing across multiple JavaScript runtimes:

## Test Configurations

### 1. Node.js (vitest.node.config.ts)
- **Runtime**: Node.js (native)
- **Environment**: node
- **Coverage**: Enabled with v8 provider
- **Run**: `npm run test:node`
- **Watch**: `npm run test:watch`
- **UI**: `npm run test:ui`
- **Coverage**: `npm run test:coverage`

### 2. Bun (vitest.bun.config.ts)
- **Runtime**: Bun
- **Environment**: node (with Bun-specific optimizations)
- **Pool**: Multi-threaded
- **Run**: `npm run test:bun`
- **Watch**: `npm run test:watch:bun`

## Running All Tests

To run tests across both runtimes:

```bash
npm test
```

This will execute tests in Node.js and Bun sequentially.

## Test Results

- **Node.js**: ✅ 199/199 tests passing
- **Bun**: ✅ 199/199 tests passing

## Coverage

Coverage is only available for Node.js tests:

```bash
npm run test:coverage
```

Coverage reports are generated in:
- Text format (console)
- JSON format (`coverage/coverage.json`)
- HTML format (`coverage/index.html`)

## Watch Mode

For development, you can use watch mode to automatically re-run tests on file changes:

```bash
# Node.js watch mode
npm run test:watch

# Bun watch mode
npm run test:watch:bun
```

## UI Mode

Vitest provides a UI for interactive test running (Node.js only):

```bash
npm run test:ui
```

This will open a browser with an interactive test runner interface.

## Configuration Files

- `vitest.node.config.ts` - Node.js configuration with coverage
- `vitest.bun.config.ts` - Bun configuration with threading optimizations

## Migration from Node Test Runner

This project was migrated from Node.js's native test runner to Vitest. The migration included:

1. Replaced `import assert from 'node:assert'` with Vitest's `expect`
2. Changed `assert.strictEqual()` to `expect().toBe()`
3. Changed `assert.deepStrictEqual()` to `expect().toEqual()`
4. Changed `assert.ok()` to `expect().toBeTruthy()`
5. Changed `assert.match()` to `expect().toMatch()`
6. Changed `assert.doesNotMatch()` to `expect().not.toMatch()`
7. Changed `assert.notStrictEqual()` to `expect().not.toBe()`
8. Changed `assert.fail()` to `expect.fail()`
