import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET() {
  try {
    const rows = await sql`SELECT key, value FROM site_settings ORDER BY key`
    const settings: Record<string, string> = {}
    rows.forEach((r: any) => { settings[r.key] = r.value })
    return NextResponse.json({ settings })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const entries = Object.entries(body) as [string, string][]
    for (const [key, value] of entries) {
      await sql`
        INSERT INTO site_settings (key, value, updated_at) VALUES (${key}, ${value}, NOW())
        ON CONFLICT (key) DO UPDATE SET value = ${value}, updated_at = NOW()
      `
    }
    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
