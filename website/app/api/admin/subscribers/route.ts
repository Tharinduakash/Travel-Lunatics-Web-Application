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
      SELECT * FROM newsletter_subscribers
      WHERE ${search} = '' OR email ILIKE ${'%' + search + '%'} OR name ILIKE ${'%' + search + '%'}
      ORDER BY subscribed_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    const [{ total }] = await sql`
      SELECT COUNT(*)::int AS total FROM newsletter_subscribers
      WHERE ${search} = '' OR email ILIKE ${'%' + search + '%'} OR name ILIKE ${'%' + search + '%'}
    `
    return NextResponse.json({ subscribers: rows, total, page, limit })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
