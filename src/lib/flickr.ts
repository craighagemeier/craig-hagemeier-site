import { buildFlickrApiUrl, processFlickrPhoto } from "./flickrUtils";

const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const FLICKR_USER_ID = process.env.FLICKR_USER_ID;

export async function fetchFlickrPhotos(sort = "date-taken-desc") {
  if (!FLICKR_API_KEY || !FLICKR_USER_ID) {
    throw new Error("Flickr API Key or User ID is missing");
  }

  // Use the shared function to build the URL
  const url = buildFlickrApiUrl(FLICKR_API_KEY, FLICKR_USER_ID, sort);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch Flickr photos: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  // Use the shared function to process photos
  return data.photos.photo.map(processFlickrPhoto);
}