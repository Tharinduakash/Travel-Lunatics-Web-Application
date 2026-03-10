import { sql } from '@neondatabase/serverless'

export async function GET() {
  try {
    const testimonials = await sql`
      SELECT 
        id,
        name,
        destination_id,
        rating,
        review,
        image_url,
        created_at
      FROM testimonials
      ORDER BY created_at DESC
      LIMIT 20
    `

    return Response.json(testimonials.rows)
  } catch (error) {
    console.error('Database error:', error)
    return Response.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}
