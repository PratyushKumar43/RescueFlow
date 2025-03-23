import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  
  if (!query || !lat || !lon) {
    console.error('Missing search parameters:', { query, lat, lon });
    return NextResponse.json(
      { error: 'Missing required parameters (q, lat, lon)' },
      { status: 400 }
    );
  }

  try {
    // Default to localhost for the backend if not specified in env
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    const apiUrl = `${backendUrl}/search?q=${encodeURIComponent(query)}&lat=${lat}&lon=${lon}`;
    
    console.log(`Calling backend API: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Backend error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      
      return NextResponse.json(
        { error: `Backend error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error connecting to backend:', error);
    return NextResponse.json(
      { error: 'Failed to connect to search service. Is the backend running?' },
      { status: 500 }
    );
  }
}
