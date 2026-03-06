// Re-export the standardized DB client from db/index.ts
// This ensures all code uses the same connection pool
export { db, type DbClient } from 'db'
