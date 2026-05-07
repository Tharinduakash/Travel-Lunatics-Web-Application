import { NextRequest, NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await sql`
      INSERT INTO inquiries (name, email, phone, subject, message, status)
      VALUES (${name}, ${email}, ${phone || null}, ${subject}, ${message}, 'unread')
    `

    return NextResponse.json({ success: true, message: 'Thank you for contacting us!' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to process contact form' }, { status: 500 })
  }
}
