export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate input
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Here you can add email sending logic or database storage
    // For now, we'll just log it and return success
    console.log('Contact form submission:', { name, email, phone, subject, message })

    return Response.json(
      { success: true, message: 'Thank you for contacting us!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}
