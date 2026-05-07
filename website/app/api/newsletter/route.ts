import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    await sql`
      INSERT INTO newsletter_subscribers (email, name, subscribed_at)
      VALUES (${email.toLowerCase().trim()}, ${name || null}, NOW())
      ON CONFLICT (email) DO NOTHING
    `
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
