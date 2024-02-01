import tsconfigpaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigpaths()],
  test: {
    include: ['src/**/*.spec.ts'],
    coverage: {
      exclude: [
        'build',
        'src/server.ts',
        'src/core/repositories',
        'src/core/domain',
        'src/config'
      ]
    }
  }
});
