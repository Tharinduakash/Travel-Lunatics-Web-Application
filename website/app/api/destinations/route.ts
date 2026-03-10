import { sql } from '@neondatabase/serverless'

export async function GET() {
  try {
    const destinations = await sql`
      SELECT 
        id,
        name,
        description,
        image_url,
        category,
        price_from,
        duration_days,
        rating,
        reviews_count,
        highlights,
        latitude,
        longitude,
        created_at,
        updated_at
      FROM destinations
      ORDER BY rating DESC, reviews_count DESC
      LIMIT 50
    `

    return Response.json(destinations.rows)
  } catch (error) {
    console.error('Database error:', error)
    return Response.json({ error: 'Failed to fetch destinations' }, { status: 500 })
  }
}
