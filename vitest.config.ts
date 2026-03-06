import { defineConfig } from 'vitest/config'
import path from 'path'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

export default defineConfig({
  test: {
    include: ['tests/api/**/*.test.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
    pool: 'forks',
    poolOptions: {
      forks: { singleFork: true },
    },
    env: {
      NODE_ENV: 'development',
    },
  },
  resolve: {
    alias: {
      db: path.resolve(__dirname, 'db'),
      'db/schema': path.resolve(__dirname, 'db/schema'),
      lib: path.resolve(__dirname, 'lib'),
      'lib/api-utils': path.resolve(__dirname, 'lib/api-utils'),
      'lib/validations': path.resolve(__dirname, 'lib/validations'),
      'lib/auth': path.resolve(__dirname, 'lib/auth'),
      'lib/s3': path.resolve(__dirname, 'lib/s3'),
      'lib/stripe': path.resolve(__dirname, 'lib/stripe'),
      'lib/bigint-polyfill': path.resolve(__dirname, 'lib/bigint-polyfill'),
      src: path.resolve(__dirname, 'src'),
    },
  },
})
