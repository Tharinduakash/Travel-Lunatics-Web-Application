import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { hashPassword } from '@/lib/auth'

// One-time setup endpoint – only works if no admins exist
export async function POST(req: NextRequest) {
  try {
    const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM admins`
    if (count > 0) {
      return NextResponse.json({ error: 'Admin already exists. Use login instead.' }, { status: 403 })
    }

    const { username, email, password } = await req.json()
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'username, email, and password are required' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const password_hash = await hashPassword(password)
    const [admin] = await sql`
      INSERT INTO admins (username, email, password_hash, role)
      VALUES (${username}, ${email}, ${password_hash}, 'super_admin')
      RETURNING id, username, email, role, created_at
    `
    return NextResponse.json({ success: true, admin }, { status: 201 })
  } catch (err: any) {
    console.error('Setup error:', err)
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
