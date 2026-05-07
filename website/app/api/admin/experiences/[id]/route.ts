import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const [exp] = await sql`SELECT * FROM experiences WHERE id = ${params.id}`
    if (!exp) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ experience: exp })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { title, description, images, activity_type, duration, price, location, difficulty, featured, active } = body
    const [exp] = await sql`
      UPDATE experiences SET
        title = ${title}, description = ${description}, images = ${images || []},
        activity_type = ${activity_type}, duration = ${duration}, price = ${price},
        location = ${location}, difficulty = ${difficulty},
        featured = ${featured || false}, active = ${active !== false}, updated_at = NOW()
      WHERE id = ${params.id} RETURNING *
    `
    if (!exp) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ experience: exp })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await sql`DELETE FROM experiences WHERE id = ${params.id}`
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
