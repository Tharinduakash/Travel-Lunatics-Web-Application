import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'
import { verifyPassword, createToken, COOKIE_NAME } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const [admin] = await sql`
      SELECT id, username, email, password_hash, role FROM admins WHERE email = ${email} LIMIT 1
    `
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await verifyPassword(password, admin.password_hash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    await sql`UPDATE admins SET last_login = NOW() WHERE id = ${admin.id}`

    const token = await createToken({
      id: admin.id,
      email: admin.email,
      username: admin.username,
      role: admin.role,
    })

    const res = NextResponse.json({
      success: true,
      admin: { id: admin.id, email: admin.email, username: admin.username, role: admin.role },
    })
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    })
    return res
  } catch (err: any) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
