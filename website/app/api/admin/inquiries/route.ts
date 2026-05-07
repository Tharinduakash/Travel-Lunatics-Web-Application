import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const rows = await sql`
      SELECT * FROM inquiries
      WHERE
        (${search} = '' OR name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'} OR subject ILIKE ${'%' + search + '%'})
        AND (${status} = '' OR status = ${status})
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `
    const [{ total }] = await sql`
      SELECT COUNT(*)::int AS total FROM inquiries
      WHERE
        (${search} = '' OR name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'} OR subject ILIKE ${'%' + search + '%'})
        AND (${status} = '' OR status = ${status})
    `
    return NextResponse.json({ inquiries: rows, total, page, limit })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
