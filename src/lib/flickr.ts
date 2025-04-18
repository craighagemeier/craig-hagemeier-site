import { buildFlickrApiUrl, processFlickrPhoto } from "./flickrUtils";

const FLICKR_API_KEY = process.env.FLICKR_API_KEY;
const FLICKR_USER_ID = process.env.FLICKR_USER_ID;

export async function fetchFlickrPhotos(sort = "date-taken-desc") {
  if (!FLICKR_API_KEY || !FLICKR_USER_ID) {
    console.error("Flickr API Key or User ID is missing");
    throw new Error("Flickr API Key or User ID is missing");
  }

  const url = buildFlickrApiUrl(FLICKR_API_KEY, FLICKR_USER_ID, sort);
  console.log("Fetching Flickr photos with URL:", url);

  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    console.error("Network error while fetching from Flickr:", err);
    throw new Error("Network error while fetching from Flickr");
  }

  if (!res.ok) {
    console.error(`Failed to fetch Flickr photos: ${res.status} ${res.statusText}`);
    throw new Error(`Failed to fetch Flickr photos: ${res.status} ${res.statusText}`);
  }

  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.error("Failed to parse Flickr response JSON:", err);
    throw new Error("Invalid JSON in Flickr API response");
  }

  if (!data.photos || !Array.isArray(data.photos.photo)) {
    console.warn("Unexpected Flickr API response structure", data);
    throw new Error("Unexpected Flickr API response structure");
  }

  console.log(`Fetched ${data.photos.photo.length} photos from Flickr`);

  return data.photos.photo.map(processFlickrPhoto);
}
