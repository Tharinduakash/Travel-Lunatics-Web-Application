export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, destination, travel_date, travelers_count, bio, interests } = body

    // Validate input
    if (!name || !email || !destination || !travel_date) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Log the submission (in production, save to database)
    console.log('Travel buddy registration:', {
      name,
      email,
      destination,
      travel_date,
      travelers_count,
      bio,
      interests,
    })

    return Response.json(
      { 
        success: true, 
        message: 'Welcome to Travel Lunatics! We will match you with compatible travel buddies.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Travel buddies form error:', error)
    return Response.json(
      { error: 'Failed to register for travel buddies' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // In production, fetch from database
  // For now, return empty array
  return Response.json([])
}
