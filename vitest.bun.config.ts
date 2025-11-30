import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'bun',
    environment: 'node',
    include: ['src/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    globals: true,
    testTimeout: 10000,
    // Bun-specific optimizations
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },
  },
});
