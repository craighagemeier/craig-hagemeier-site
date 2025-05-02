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

type SortOption = {
  id: string;
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { id: "recent", label: "Recent", value: "date-taken-desc" },
  { id: "interesting", label: "Popular", value: "interestingness-desc" },
  { id: "oldest", label: "Oldest", value: "date-taken-asc" },
];

export default function FlickrGallery({ photos: initialPhotos }: { photos: FlickrPhoto[] }) {
  // Get the initial sort option from URL or use default
  const [sortOption, setSortOption] = useState<string>(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Try to get sort from URL search params
      const urlParams = new URLSearchParams(window.location.search);
      const urlSort = urlParams.get('sort');
      // Return URL sort if it's valid, otherwise use default
      if (urlSort && sortOptions.some(option => option.value === urlSort)) {
        return urlSort;
      }
    }
    return "date-taken-desc"; // Default sort if not in URL
  });
  const [photos, setPhotos] = useState<FlickrPhoto[]>(initialPhotos);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageElements, setImageElements] = useState<{ [key: string]: HTMLImageElement | null }>({});
  const [layoutReady, setLayoutReady] = useState<boolean>(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const layoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSortedPhotos = async (sort: string) => {
    setIsLoading(true);
    setLayoutReady(false);
    setImageElements({});

    try {
      // Add cache-busting timestamp to prevent cached responses
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/flickr?sort=${sort}&_t=${timestamp}`, {
        // Force a new request (no caching)
        cache: 'no-store'
      });
      if (!response.ok) throw new Error(`API returned status ${response.status}`);

      const newPhotos = await response.json();
      if (!Array.isArray(newPhotos)) throw new Error('Invalid photo data received');

      setPhotos(newPhotos);
    } catch (error: any) {
      console.error('Error fetching sorted photos:', error);
    } finally {
      // Not setting isLoading to false here — we now wait for layout readiness
    }
  };

  const handleSortChange = (option: SortOption) => {
    if (sortOption !== option.value) {
      setSortOption(option.value);
      // Update URL with the new sort parameter
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('sort', option.value);
        window.history.pushState({}, '', url.toString());
      }
      fetchSortedPhotos(option.value);
    }
  };

  // Effect to respond to URL changes (like when user hits back button)
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlSort = urlParams.get('sort');

        if (urlSort && sortOptions.some(option => option.value === urlSort) && urlSort !== sortOption) {
          setSortOption(urlSort);
          fetchSortedPhotos(urlSort);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [sortOption]);

  // This effect runs on initial mount to sync the state with URL if needed
  useEffect(() => {
    // Check if the current URL sort param doesn't match our initial photos sort
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlSort = urlParams.get('sort');

      // If URL has a sort param and it's different from what we have in state
      if (urlSort && sortOptions.some(option => option.value === urlSort) && urlSort !== sortOption) {
        setSortOption(urlSort);
        fetchSortedPhotos(urlSort);
      }

      // If no sort in URL but we have a non-default sort, update URL
      else if (!urlSort && sortOption !== "date-taken-desc") {
        const url = new URL(window.location.href);
        url.searchParams.set('sort', sortOption);
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, []);

  const getItemSizeClass = (photo: FlickrPhoto, index: number) => {
    let baseClass = 'flickr-gallery__item';
    const patternIndex = index % 23;

    if (photo.width && photo.height) {
      const aspectRatio = photo.width / photo.height;
      if (aspectRatio < 0.6) return `${baseClass} ${baseClass}--small`;
      if (aspectRatio > 2.5) return `${baseClass} ${baseClass}--wide`;
    }

    if (patternIndex === 0) return `${baseClass} ${baseClass}--wide`;
    if ([7, 14, 21].includes(patternIndex)) return `${baseClass} ${baseClass}--medium`;

    return `${baseClass} ${baseClass}--small`;
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>, photoId: string) => {
    const img = e.target as HTMLImageElement;
    setImageElements((prev) => ({
      ...prev,
      [photoId]: img
    }));
  };

  useEffect(() => {
    if (photos.length === 0) {
      setLayoutReady(true);
      setIsLoading(false);
      return;
    }

    const loadedCount = Object.keys(imageElements).length;
    const loadedRatio = loadedCount / photos.length;

    if ((loadedRatio > 0.5 || loadedCount > 5) && gridRef.current) {
      const gridRowHeight = 10;
      const gridGap = 16;
      const maxRowSpan = 50;

      Object.entries(imageElements).forEach(([photoId, img]) => {
        if (img) {
          const item = img.closest('.flickr-gallery__item') as HTMLElement;
          if (item) {
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
      setIsLoading(false);
    }

    // Fallback timeout to prevent spinner from hanging
    if (!layoutTimeoutRef.current && photos.length > 0) {
      layoutTimeoutRef.current = setTimeout(() => {
        setLayoutReady(true);
        setIsLoading(false);
      }, 2500);
    }

    return () => {
      if (layoutTimeoutRef.current) {
        clearTimeout(layoutTimeoutRef.current);
        layoutTimeoutRef.current = null;
      }
    };
  }, [imageElements, photos]);

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

      {isLoading && <Spinner text="Loading photos..." />}

      <div
        ref={gridRef}
        className={`flickr-gallery__masonry-grid ${isLoading ? 'flickr-gallery__masonry-grid--fade-out' : 'flickr-gallery__masonry-grid--fade-in'}`}
        style={{
          opacity: layoutReady ? 1 : 0.2,
          transition: 'opacity 0.4s ease',
          pointerEvents: layoutReady ? 'auto' : 'none',
        }}
      >
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={getItemSizeClass(photo, index)}
          >
            <img
              src={photo.url}
              srcSet={
                photo.urls
                  ? `${photo.urls.small} 320w, ${photo.urls.medium} 800w, ${photo.urls.large} 1024w, ${photo.urls.original} 2048w`
                  : undefined
              }
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
              alt={photo.title || 'Flickr photo'}
              className="flickr-gallery__image"
              loading="lazy"
              onLoad={(e) => handleImageLoad(e, photo.id)}
              onError={() => console.error(`Image failed to load: ${photo.url}`)}
            />
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
