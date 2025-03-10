const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const FLICKR_USER_ID = process.env.FLICKR_USER_ID;

export async function fetchFlickrPhotos(sort = "date-taken-desc") {
  if (!FLICKR_API_KEY || !FLICKR_USER_ID) {
    throw new Error("Flickr API Key or User ID is missing");
  }

  // Update the API call to use the provided sort parameter
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&user_id=${FLICKR_USER_ID}&format=json&nojsoncallback=1&extras=url_sq,url_t,url_s,url_m,url_l,url_o,description&per_page=100&sort=${sort}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.photos.photo.map((photo: any) => ({
    id: photo.id,
    title: photo.title,
    // Use the highest quality available, falling back to smaller sizes
    url: photo.url_o || photo.url_l || photo.url_m || `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
    // Store all available URLs for responsive loading
    urls: {
      small: photo.url_s || `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`,
      medium: photo.url_m || `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
      large: photo.url_l || `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
      original: photo.url_o || `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
    },
    // Store image dimensions if available
    width: photo.width_o || photo.width_l || photo.width_m,
    height: photo.height_o || photo.height_l || photo.height_m,
    description: photo.description?._content,
  }));
}