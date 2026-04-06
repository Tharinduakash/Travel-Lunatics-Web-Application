// app/api/admin/destinations/upload-image/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
const MAX_SIZE_MB   = 10

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file  = form.get('file')          as File   | null
    const rawId = form.get('destinationId') as string | null

    // ── Validate ────────────────────────────────────────────────
    if (!file || !rawId) {
      return NextResponse.json({ error: 'Missing file or destinationId' }, { status: 400 })
    }

    const destinationId = parseInt(rawId, 10)
    if (isNaN(destinationId)) {
      return NextResponse.json({ error: 'Invalid destinationId' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not allowed. Use JPEG, PNG, WEBP, AVIF or GIF.' },
        { status: 400 }
      )
    }

    if (file.size / (1024 * 1024) > MAX_SIZE_MB) {
      return NextResponse.json(
        { error: `File too large (max ${MAX_SIZE_MB} MB)` },
        { status: 400 }
      )
    }

    // ── Save to /public/images/destinations/ ────────────────────
    const ext      = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
    const filename = `destination-${destinationId}.${ext}`
    const dir      = path.join(process.cwd(), 'public', 'images', 'destinations')
    const filepath = path.join(dir, filename)

    await mkdir(dir, { recursive: true })
    await writeFile(filepath, Buffer.from(await file.arrayBuffer()))

    const image_url = `/images/destinations/${filename}`

    // ── Update Neon DB ───────────────────────────────────────────
    await sql`
      UPDATE destinations
      SET    image_url  = ${image_url},
             updated_at = NOW()
      WHERE  id         = ${destinationId}
    `

    return NextResponse.json({ image_url }, { status: 200 })
  } catch (err) {
    console.error('[upload-image]', err)
    return NextResponse.json({ error: 'Server error during upload' }, { status: 500 })
  }
}