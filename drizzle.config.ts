import { defineConfig } from 'drizzle-kit'
import { loadEnvConfig } from '@next/env'
import { cwd } from 'process'

loadEnvConfig(cwd())

const dev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

export default defineConfig({
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'mysql',
  dbCredentials: {
    url: dev ? process.env.DEV_DATABASE_URL! : process.env.DATABASE_URL!,
  },
  verbose: true,
  breakpoints: dev && true,
})
