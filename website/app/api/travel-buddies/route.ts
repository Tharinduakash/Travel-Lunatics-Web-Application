import { neon } from '@neondatabase/serverless'
import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

const sql = neon(process.env.DATABASE_URL!)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:    process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

async function uploadToCloudinary(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'travel-buddies', resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error)
        resolve(result.secure_url)
      }
    ).end(buffer)
  })
}

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, name, country, rating, travel_type,
             places, travel_date, review,
             image_url, approved, created_at
      FROM travel_buddies
      WHERE approved = true
      ORDER BY created_at DESC
      LIMIT 50
    `
    // Ensure places is always a parsed array, never a raw string
    const reviews = rows.map(row => ({
      ...row,
      places: Array.isArray(row.places)
        ? row.places
        : JSON.parse(row.places || '[]'),
    }))
    return NextResponse.json({ reviews })
  } catch (err) {
    console.error('GET error:', err)
    return NextResponse.json({ reviews: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData()

    const name        = body.get('name')        as string
    const email       = body.get('email')       as string
    const country     = body.get('country')     as string
    const travel_type = body.get('travel_type') as string
    const places      = JSON.parse(body.get('places') as string || '[]')
    const travel_date = body.get('travel_date') as string
    const rating      = parseInt(body.get('rating') as string, 10)
    const review      = body.get('review')      as string

    // Upload user's image to Cloudinary → get back a permanent URL
    let image_url: string | null = null
    const imageFile = body.get('image_0') as File | null
    if (imageFile && imageFile.size > 0) {
      image_url = await uploadToCloudinary(imageFile)
    }

    const [row] = await sql`
      INSERT INTO travel_buddies
        (name, email, country, travel_type, places, travel_date, rating, review, image_url, approved)
      VALUES
        (${name}, ${email}, ${country}, ${travel_type}, ${JSON.stringify(places)},
         ${travel_date}, ${rating}, ${review}, ${image_url}, false)
      RETURNING id, name, country, rating, travel_type, places, travel_date, review, image_url, approved, created_at
    `

    // Ensure places is array in the returned row too
    const returnedRow = {
      ...row,
      places: Array.isArray(row.places)
        ? row.places
        : JSON.parse(row.places || '[]'),
    }

    return NextResponse.json({ success: true, review: returnedRow }, { status: 201 })
  } catch (err: any) {
    console.error('POST error:', err?.message)
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}