import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const [dest] = await sql`SELECT * FROM destinations WHERE id = ${id}`
    if (!dest) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ destination: dest })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const {
      name, description, image_url, category, price_from, duration_days,
      rating, reviews_count, highlights, latitude, longitude, featured, active
    } = body

    const [dest] = await sql`
      UPDATE destinations SET
        name = ${name}, description = ${description}, image_url = ${image_url},
        category = ${category}, price_from = ${price_from}, duration_days = ${duration_days},
        rating = ${rating}, reviews_count = ${reviews_count}, highlights = ${highlights || []},
        latitude = ${latitude}, longitude = ${longitude},
        featured = ${featured || false}, active = ${active !== false},
        updated_at = NOW()
      WHERE id = ${id} RETURNING *
    `
    if (!dest) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ destination: dest })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await sql`DELETE FROM destinations WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
