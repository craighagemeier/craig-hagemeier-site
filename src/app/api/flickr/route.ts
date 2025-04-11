import { NextRequest, NextResponse } from 'next/server';
import { buildFlickrApiUrl, processFlickrPhoto } from '../../../lib/flickrUtils';

const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const FLICKR_USER_ID = process.env.FLICKR_USER_ID;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sort = searchParams.get('sort') || 'date-taken-desc';

  if (!FLICKR_API_KEY || !FLICKR_USER_ID) {
    return NextResponse.json({ error: "Flickr API Key or User ID is missing" }, { status: 500 });
  }

  try {
    // Use the shared function to build the URL
    const url = buildFlickrApiUrl(FLICKR_API_KEY, FLICKR_USER_ID, sort);

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Flickr API returned status ${res.status}`);
    }

    const data = await res.json();

    // Use the shared function to process photos
    const photos = data.photos.photo.map(processFlickrPhoto);

    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching Flickr photos:', error);
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}