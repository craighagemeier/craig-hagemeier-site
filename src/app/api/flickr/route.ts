import { NextRequest, NextResponse } from 'next/server';
import { buildFlickrApiUrl, processFlickrPhoto } from '../../../lib/flickrUtils';

const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const FLICKR_USER_ID = process.env.FLICKR_USER_ID;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sort = searchParams.get('sort') || 'date-taken-desc';

  console.log(`API route called with sort parameter: ${sort}`);

  if (!FLICKR_API_KEY || !FLICKR_USER_ID) {
    return NextResponse.json({ error: "Flickr API Key or User ID is missing" }, { status: 500 });
  }

  try {
    // Use the shared function to build the URL
    const url = buildFlickrApiUrl(FLICKR_API_KEY, FLICKR_USER_ID, sort);

    const res = await fetch(url, {
      cache: 'no-store',  // Prevent fetch from caching
      next: { revalidate: 0 } // For Next.js 13+ fetch
    });

    if (!res.ok) {
      throw new Error(`Flickr API returned status ${res.status}`);
    }

    const data = await res.json();

    // Use the shared function to process photos
    const photos = data.photos.photo.map(processFlickrPhoto);

    const response = NextResponse.json(photos);

    // Set headers to prevent caching
    response.headers.set('Cache-Control', 'no-store, max-age=0');

    return response;
  } catch (error) {
    console.error('Error fetching Flickr photos:', error);
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}