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
      SELECT * FROM tour_packages
      WHERE ${search} = '' OR title ILIKE ${'%' + search + '%'} OR location ILIKE ${'%' + search + '%'}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    const [{ total }] = await sql`
      SELECT COUNT(*)::int AS total FROM tour_packages
      WHERE ${search} = '' OR title ILIKE ${'%' + search + '%'} OR location ILIKE ${'%' + search + '%'}
    `
    return NextResponse.json({ packages: rows, total, page, limit })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      title, slug, category, short_description, description, price, duration, location,
      included, excluded, itinerary, images, cover_image, tags, featured, active
    } = body

    if (!title || !slug) return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })

    const [pkg] = await sql`
      INSERT INTO tour_packages
        (title, slug, category, short_description, description, price, duration, location,
         included, excluded, itinerary, images, cover_image, tags, featured, active)
      VALUES
        (${title}, ${slug}, ${category || null}, ${short_description}, ${description}, ${price}, ${duration}, ${location},
         ${included || []}, ${excluded || []}, ${JSON.stringify(itinerary || [])},
         ${images || []}, ${cover_image}, ${tags || []}, ${featured || false}, ${active !== false})
      RETURNING *
    `
    return NextResponse.json({ package: pkg }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
