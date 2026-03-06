import { test as setup } from '@playwright/test'
import path from 'path'
import fs from 'fs'
import mysql from 'mysql2/promise'

const authFile = path.join(__dirname, '../.auth/user.json')

function loadEnvFile(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) return {}
  const content = fs.readFileSync(filePath, 'utf-8')
  const vars: Record<string, string> = {}
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    let val = trimmed.slice(eqIdx + 1).trim()
    if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
      val = val.slice(1, -1)
    }
    vars[key] = val
  }
  return vars
}

setup('seed test session', async () => {
  const authDir = path.dirname(authFile)
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true })
  }

  const projectRoot = path.join(__dirname, '../..')
  const envVars = {
    ...loadEnvFile(path.join(projectRoot, '.env')),
    ...loadEnvFile(path.join(projectRoot, '.env.local')),
  }

  const dbUrl = envVars.DEV_DATABASE_URL || envVars.DATABASE_URL
  if (!dbUrl) {
    throw new Error('No DATABASE_URL or DEV_DATABASE_URL found in .env')
  }

  const connection = await mysql.createConnection(dbUrl)

  const TEST_USER_ID = 'e2e-test-user'
  const TEST_SESSION_TOKEN = 'e2e-test-session-token-' + Date.now()
  const SESSION_EXPIRY = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  const [existingUsers] = await connection.execute<mysql.RowDataPacket[]>(
    'SELECT id FROM user WHERE id = ?',
    [TEST_USER_ID],
  )

  if (existingUsers.length === 0) {
    await connection.execute(
      'INSERT INTO user (id, name, email, is_admin) VALUES (?, ?, ?, ?)',
      [TEST_USER_ID, 'E2E Test User', 'e2e-test@example.com', false],
    )
  }

  await connection.execute('DELETE FROM session WHERE userId = ?', [
    TEST_USER_ID,
  ])

  await connection.execute(
    'INSERT INTO session (sessionToken, userId, expires) VALUES (?, ?, ?)',
    [TEST_SESSION_TOKEN, TEST_USER_ID, SESSION_EXPIRY],
  )

  await connection.end()

  const storageState = {
    cookies: [
      {
        name: 'authjs.session-token',
        value: TEST_SESSION_TOKEN,
        domain: 'localhost',
        path: '/',
        expires: SESSION_EXPIRY.getTime() / 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'Lax' as const,
      },
    ],
    origins: [],
  }

  fs.writeFileSync(authFile, JSON.stringify(storageState, null, 2))
})
