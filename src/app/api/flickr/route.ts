import { NextRequest, NextResponse } from 'next/server';

const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const FLICKR_USER_ID = process.env.FLICKR_USER_ID;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sort = searchParams.get('sort') || 'date-taken-desc';

  if (!FLICKR_API_KEY || !FLICKR_USER_ID) {
    return NextResponse.json({ error: "Flickr API Key or User ID is missing" }, { status: 500 });
  }

  try {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&user_id=${FLICKR_USER_ID}&format=json&nojsoncallback=1&extras=url_sq,url_t,url_s,url_m,url_l,url_o,description&per_page=100&sort=${sort}`;

    const res = await fetch(url);
    const data = await res.json();

    const photos = data.photos.photo.map((photo: any) => ({
      id: photo.id,
      title: photo.title,
      url: photo.url_o || photo.url_l || photo.url_m || `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
      urls: {
        small: photo.url_s || `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`,
        medium: photo.url_m || `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
        large: photo.url_l || `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
        original: photo.url_o || `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
      },
      width: photo.width_o || photo.width_l || photo.width_m,
      height: photo.height_o || photo.height_l || photo.height_m,
      description: photo.description?._content,
    }));

    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error fetching Flickr photos:', error);
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}