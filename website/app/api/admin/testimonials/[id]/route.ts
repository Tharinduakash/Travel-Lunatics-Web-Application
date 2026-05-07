import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { name, destination_id, rating, review, image_url, status } = body
    const [t] = await sql`
      UPDATE testimonials SET
        name = ${name}, destination_id = ${destination_id || null},
        rating = ${rating}, review = ${review},
        image_url = ${image_url || null}, status = ${status || 'approved'}
      WHERE id = ${params.id} RETURNING *
    `
    if (!t) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ testimonial: t })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await sql`DELETE FROM testimonials WHERE id = ${params.id}`
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
