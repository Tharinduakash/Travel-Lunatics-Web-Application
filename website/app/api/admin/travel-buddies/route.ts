import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const approved = searchParams.get('approved')
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const rows = await sql`
      SELECT * FROM travel_buddies
      WHERE
        (${approved} IS NULL OR approved = ${approved === 'true'})
        AND (${search} = '' OR name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'})
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    const [{ total }] = await sql`
      SELECT COUNT(*)::int AS total FROM travel_buddies
      WHERE
        (${approved} IS NULL OR approved = ${approved === 'true'})
        AND (${search} = '' OR name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'})
    `
    return NextResponse.json({ reviews: rows, total, page, limit })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
