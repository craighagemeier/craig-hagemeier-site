// lib/flickrUtils.ts
export function buildFlickrApiUrl(apiKey: string, userId: string, sort: string) {
  return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1&extras=url_sq,url_t,url_s,url_m,url_l,url_o,description&per_page=100&sort=${sort}`;
}

export function processFlickrPhoto(photo: any) {
  return {
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
  };
}