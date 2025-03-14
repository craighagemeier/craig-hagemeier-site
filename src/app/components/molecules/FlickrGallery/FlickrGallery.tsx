"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "../../atoms/Button/Button";
import ButtonGroup from "../../atoms/ButtonGroup/ButtonGroup";
import Spinner from "../../atoms/Spinner/Spinner";
import "./flickr-gallery.scss";

interface FlickrPhoto {
  id: string;
  title: string;
  url: string;
  urls?: {
    small: string;
    medium: string;
    large: string;
    original: string;
  };
  width?: number;
  height?: number;
  description?: string;
}

// Define sort options
type SortOption = {
  id: string;
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { id: "recent", label: "Recent", value: "date-taken-desc" },
  { id: "interesting", label: "Interesting", value: "interestingness-desc" },
  { id: "oldest", label: "Oldest", value: "date-taken-asc" },
];

export default function FlickrGallery({ photos: initialPhotos }: { photos: FlickrPhoto[] }) {
  const [sortOption, setSortOption] = useState<string>("date-taken-desc");
  const [photos, setPhotos] = useState<FlickrPhoto[]>(initialPhotos);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageElements, setImageElements] = useState<{[key: string]: HTMLImageElement | null}>({});
  const [layoutReady, setLayoutReady] = useState<boolean>(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Function to fetch photos with the selected sort option
  const fetchSortedPhotos = async (sort: string) => {
    setIsLoading(true);
    setLayoutReady(false);
    setImageElements({});

    try {
      const response = await fetch(`/api/flickr?sort=${sort}`);
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }
      const newPhotos = await response.json();
      setPhotos(newPhotos);
      // Reset image elements when we get new photos
    } catch (error) {
      console.error("Error fetching sorted photos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sort option change
  const handleSortChange = (option: SortOption) => {
    if (sortOption !== option.value) {
      setSortOption(option.value);
      fetchSortedPhotos(option.value);
    }
  };

  // Function to determine column span class - with fewer large items
  const getItemSizeClass = (photo: FlickrPhoto, index: number) => {
    let baseClass = 'flickr-gallery__item';

    // Use a larger prime number to make the pattern less predictable
    // and reduce the frequency of larger items
    const patternIndex = index % 23;

    if (photo.width && photo.height) {
      const aspectRatio = photo.width / photo.height;

      // Make sure very tall images are small in column span
      if (aspectRatio < 0.6) {
        return `${baseClass} ${baseClass}--small`;
      }

      // Only make truly panoramic photos span wider
      if (aspectRatio > 2.5) {
        return `${baseClass} ${baseClass}--wide`;
      }
    }

    // Assign size classes based on pattern - with much fewer large items
    if (patternIndex === 0) {
      return `${baseClass} ${baseClass}--wide`;  // Only one wide item every 23 photos
    } else if (patternIndex === 7 || patternIndex === 14 || patternIndex === 21) {
      return `${baseClass} ${baseClass}--medium`; // A few medium items
    } else {
      return `${baseClass} ${baseClass}--small`; // Most items are small
    }
  };

  // Handle image load to calculate and set the grid row span
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>, photoId: string) => {
    const img = e.target as HTMLImageElement;
    setImageElements(prev => ({
      ...prev,
      [photoId]: img
    }));
  };

  // Update grid layout once all images are loaded
  useEffect(() => {
    if (!isLoading && photos.length > 0 && Object.keys(imageElements).length > 0 && gridRef.current) {
      // Check if we have at least some images loaded (may not be all due to network issues)
      const loadedImagesRatio = Object.keys(imageElements).length / photos.length;

      if (loadedImagesRatio > 0.5 || Object.keys(imageElements).length > 5) {
        // Get grid row height from CSS
        const gridRowHeight = 10; // This should match the grid-auto-rows value in CSS
        const gridGap = 16; // This should match the grid-gap value in CSS
        const maxRowSpan = 50; // Corresponds to max-height: 500px (50 * 10px)

        // Apply the span calculation to each image
        Object.entries(imageElements).forEach(([photoId, img]) => {
          if (img) {
            const item = img.closest('.flickr-gallery__item') as HTMLElement;
            if (item) {
              // Calculate row span based on image height, but cap it at maxRowSpan
              const imageHeight = img.getBoundingClientRect().height;
              const rowSpan = Math.min(
                Math.ceil((imageHeight + gridGap) / (gridRowHeight + gridGap)),
                maxRowSpan
              );
              item.style.gridRowEnd = `span ${rowSpan}`;
            }
          }
        });

        setLayoutReady(true);
      }
    }
  }, [imageElements, isLoading, photos.length]);

  return (
    <div className="flickr-gallery">
      <div className="ch-container">
        <div className="ch-row">
          <div className="flickr-gallery__sort-buttons ch-col">
            <ButtonGroup>
              {sortOptions.map((option) => (
                <Button
                  key={option.id}
                  onClick={() => handleSortChange(option)}
                  isActive={sortOption === option.value}
                  disabled={isLoading}
                >
                  {option.label}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>
      </div>

      {isLoading && <Spinner text="Loading photos..." size="medium" />}

      <div
        ref={gridRef}
        className={`flickr-gallery__masonry-grid ${isLoading ? 'flickr-gallery__masonry-grid--fade-out' : 'flickr-gallery__masonry-grid--fade-in'}`}
        style={{ opacity: (layoutReady || photos.length === 0) ? 1 : 0.3, transition: 'opacity 0.3s ease' }}
      >
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={getItemSizeClass(photo, index)}
          >
            {photo.urls ? (
              <img
                src={photo.url}
                srcSet={`${photo.urls.small} 320w, ${photo.urls.medium} 800w, ${photo.urls.large} 1024w, ${photo.urls.original} 2048w`}
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                alt={photo.title || 'Flickr photo'}
                className="flickr-gallery__image"
                loading="lazy"
                onLoad={(e) => handleImageLoad(e, photo.id)}
                onError={(e) => console.error(`Image failed to load: ${photo.url}`)}
              />
            ) : (
              <img
                src={photo.url}
                alt={photo.title || 'Flickr photo'}
                className="flickr-gallery__image"
                loading="lazy"
                onLoad={(e) => handleImageLoad(e, photo.id)}
                onError={(e) => console.error(`Image failed to load: ${photo.url}`)}
              />
            )}
            {photo.title && (
              <div className="flickr-gallery__info">
                <p>{photo.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}