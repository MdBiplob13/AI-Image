import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensure this is a dynamic route

export async function POST(request) {
  try {
    // Parse form data
    const formData = await request.formData();
    const prompt = formData.get('prompt');
    const imageFile = formData.get('image');

    // Validate inputs
    if (!prompt || !imageFile) {
      return NextResponse.json(
        { error: 'Both image and prompt are required' },
        { status: 400 }
      );
    }

    // Convert image to base64
    const buffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const imageDataUri = `data:${imageFile.type};base64,${base64Image}`;

    // Call Hugging Face API
    const hfResponse = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        options: {
          wait_for_model: true,
        },
      }),
    });

    // Handle API errors
    if (!hfResponse.ok) {
      const errorData = await hfResponse.json();
      console.error('Hugging Face API Error:', errorData);
      throw new Error(errorData.error || 'Failed to process image');
    }

    // Return the generated image directly
    return new Response(await hfResponse.blob(), {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'no-store', // Prevent caching of generated images
      },
    });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

