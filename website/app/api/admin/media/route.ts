import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error)
        resolve(result.secure_url)
      }
    ).end(buffer)
  })
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const folder = (form.get('folder') as string) || 'admin-uploads'
    const urls: string[] = []

    for (const [key, value] of form.entries()) {
      if (key.startsWith('file') && value instanceof File && value.size > 0) {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
        if (!allowed.includes(value.type)) continue
        if (value.size > 10 * 1024 * 1024) continue
        const url = await uploadToCloudinary(value, folder)
        urls.push(url)
      }
    }

    return NextResponse.json({ urls })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
