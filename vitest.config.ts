import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    root: '.',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,js}'], // only unit and integration tests
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.astro', 'src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'cypress/**'],
    },
  },
});
