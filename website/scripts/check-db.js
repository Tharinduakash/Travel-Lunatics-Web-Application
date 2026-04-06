import { config } from 'dotenv'
import { neon } from '@neondatabase/serverless'

config()

const databaseUrl = 'postgresql://neondb_owner:npg_SqIY7TalX3tc@ep-blue-leaf-adlmndop-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
const sql = neon(databaseUrl)

async function checkDestinations() {
  try {
    const destinations = await sql`SELECT id, name, rating, reviews_count FROM destinations ORDER BY rating DESC, reviews_count DESC`
    console.log('Destinations:', destinations)
  } catch (error) {
    console.error('Error:', error)
  }
}

checkDestinations()