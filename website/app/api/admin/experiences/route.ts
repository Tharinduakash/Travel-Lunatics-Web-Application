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
      SELECT * FROM experiences
      WHERE ${search} = '' OR title ILIKE ${'%' + search + '%'} OR location ILIKE ${'%' + search + '%'}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    const [{ total }] = await sql`
      SELECT COUNT(*)::int AS total FROM experiences
      WHERE ${search} = '' OR title ILIKE ${'%' + search + '%'} OR location ILIKE ${'%' + search + '%'}
    `
    return NextResponse.json({ experiences: rows, total, page, limit })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description, images, activity_type, duration, price, location, difficulty, featured, active } = body
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 })

    const [exp] = await sql`
      INSERT INTO experiences (title, description, images, activity_type, duration, price, location, difficulty, featured, active)
      VALUES (${title}, ${description}, ${images || []}, ${activity_type}, ${duration}, ${price}, ${location}, ${difficulty}, ${featured || false}, ${active !== false})
      RETURNING *
    `
    return NextResponse.json({ experience: exp }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
