import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const rows = await sql`
      SELECT t.*, d.name AS destination_name FROM testimonials t
      LEFT JOIN destinations d ON d.id = t.destination_id
      WHERE ${search} = '' OR t.name ILIKE ${'%' + search + '%'} OR t.review ILIKE ${'%' + search + '%'}
      ORDER BY t.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    const [{ total }] = await sql`
      SELECT COUNT(*)::int AS total FROM testimonials
      WHERE ${search} = '' OR name ILIKE ${'%' + search + '%'} OR review ILIKE ${'%' + search + '%'}
    `
    return NextResponse.json({ testimonials: rows, total, page, limit })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, destination_id, rating, review, image_url } = body
    if (!name || !review) return NextResponse.json({ error: 'Name and review are required' }, { status: 400 })

    const [t] = await sql`
      INSERT INTO testimonials (name, destination_id, rating, review, image_url)
      VALUES (${name}, ${destination_id || null}, ${rating || 5}, ${review}, ${image_url || null})
      RETURNING *
    `
    return NextResponse.json({ testimonial: t }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
