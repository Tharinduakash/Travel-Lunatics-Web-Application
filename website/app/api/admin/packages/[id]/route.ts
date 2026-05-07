import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const [pkg] = await sql`SELECT * FROM tour_packages WHERE id = ${id}`
    if (!pkg) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ package: pkg })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const {
      title, slug, category, short_description, description, price, duration, location,
      included, excluded, itinerary, images, cover_image, tags, featured, active
    } = body

    const [pkg] = await sql`
      UPDATE tour_packages SET
        title = ${title}, slug = ${slug}, category = ${category || null},
        short_description = ${short_description},
        description = ${description}, price = ${price}, duration = ${duration},
        location = ${location}, included = ${included || []}, excluded = ${excluded || []},
        itinerary = ${JSON.stringify(itinerary || [])}, images = ${images || []},
        cover_image = ${cover_image}, tags = ${tags || []},
        featured = ${featured || false}, active = ${active !== false}, updated_at = NOW()
      WHERE id = ${id} RETURNING *
    `
    if (!pkg) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ package: pkg })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await sql`DELETE FROM tour_packages WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
