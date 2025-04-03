import Link from "../components/atoms/Link/Link";
import FlickrGallery from "../components/molecules/FlickrGallery/FlickrGallery";
import { fetchFlickrPhotos } from "../../lib/flickr";

export default async function Photography() {
  const photos = await fetchFlickrPhotos("date-taken-desc");

  return (
    <div>
      <section className="ch-container">
        <div className="ch-row">
          <div className="ch-col">
            <h2>Photography</h2>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col">
            <p>One of my favorite toys as a kid was a Kodak Instamatic 124. It was completely broken, but I loved pretending to take photos with it. Some of the most inspiring people in my life were photographers. I guess I was paying attention, and learned a thing or two.</p>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col">
            <p>I've been taking photos for as long as I can remember. I love capturing the beauty of the world around me, and I'm always looking for the next great shot. I've been fortunate to travel to some amazing places, and I love sharing my photos with others.</p>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col">
            <p>Most of my photos are happy accidents. Whether I'm out running or riding the subway, something about the light catches my eye. Photography is a way to freeze time and capture a moment.</p>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col">
            <h3>Recent Photos</h3>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col">
            <p>Here are some of my latest captures from Flickr. Want to see more? Check out my <Link href="https://www.flickr.com/photos/craighagemeier/">Flickr page</Link> or <Link href="https://www.instagram.com/craighagemeier/">Instagram</Link>.</p>
          </div>
        </div>
        <div className="ch-row">
          <div className="ch-col">
            <p>The world is beautiful. I hope you enjoy these as much as I enjoy taking them!</p>
          </div>
        </div>
      </section>
      <div className="ch-container-full">
        <div className="ch-row">
          <div className="ch-col">
            <FlickrGallery photos={photos} />
          </div>
        </div>
      </div>
      <aside className="ch-container">
        <div className="ch-row">
          <div className="ch-col">
            <p>Want to see more? Check out my <Link href="https://www.flickr.com/photos/craighagemeier/">Flickr page</Link> or <Link href="https://www.instagram.com/craighagemeier/">Instagram</Link>.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export const revalidate = 3600;