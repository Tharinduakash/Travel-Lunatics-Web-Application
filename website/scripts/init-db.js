import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'
import { join } from 'path'

config()

const databaseUrl = 'postgresql://neondb_owner:npg_SqIY7TalX3tc@ep-blue-leaf-adlmndop-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
const sql = neon(databaseUrl)

async function initDatabase() {
  try {
    console.log('Database URL:', databaseUrl)
    const sqlFile = join(process.cwd(), 'scripts', 'init-db.sql')
    const sqlContent = readFileSync(sqlFile, 'utf-8')

    console.log('Initializing database...')
    // Split SQL into statements
    const statements = sqlContent.split(';').map(s => s.trim()).filter(s => s.length > 0)

    for (const statement of statements) {
      if (statement) {
        await sql(statement)
      }
    }
    console.log('Database initialized successfully!')
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  }
}

initDatabase()