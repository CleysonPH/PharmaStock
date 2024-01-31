import tsconfigpaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigpaths()],
  test: {
    include: ['src/**/*.spec.ts'],
    coverage: {
      exclude: [
        'build',
        'src/server.ts'
      ]
    }
  }
});
