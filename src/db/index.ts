import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from './schema'

async function createDb() {
  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
  })

  return drizzle(connection, { schema, mode: 'default' })
}

export const db = await createDb()
