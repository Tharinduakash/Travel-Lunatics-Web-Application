import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const rows = await sql`
      SELECT * FROM destinations
      WHERE
        (${search} = '' OR name ILIKE ${'%' + search + '%'})
        AND (${category} = '' OR category = ${category})
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    const [{ total }] = await sql`
      SELECT COUNT(*)::int AS total FROM destinations
      WHERE
        (${search} = '' OR name ILIKE ${'%' + search + '%'})
        AND (${category} = '' OR category = ${category})
    `
    return NextResponse.json({ destinations: rows, total, page, limit })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, description, image_url, category, price_from, duration_days,
      rating, reviews_count, highlights, latitude, longitude, featured, active
    } = body

    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

    const [dest] = await sql`
      INSERT INTO destinations
        (name, description, image_url, category, price_from, duration_days, rating, reviews_count,
         highlights, latitude, longitude, featured, active)
      VALUES
        (${name}, ${description}, ${image_url}, ${category}, ${price_from}, ${duration_days},
         ${rating || 0}, ${reviews_count || 0}, ${highlights || []}, ${latitude}, ${longitude},
         ${featured || false}, ${active !== false})
      RETURNING *
    `
    return NextResponse.json({ destination: dest }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
