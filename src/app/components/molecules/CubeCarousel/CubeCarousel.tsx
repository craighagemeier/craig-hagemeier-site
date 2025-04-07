"use client";

import React, { useState, useEffect } from 'react';
import Button from "../../atoms/Button/Button";
import ButtonGroup from "../../atoms/ButtonGroup/ButtonGroup";
import './cube-carousel.scss';

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

interface CubeCarouselProps {
  photos: Photo[];
}

const CubeCarousel: React.FC<CubeCarouselProps> = ({ photos }) => {
  const [currentFace, setCurrentFace] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isManualControl, setIsManualControl] = useState(false);
  const [translateZ, setTranslateZ] = useState("448px"); // Adjust when changing the number of photos
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const cubeElement = document.querySelector(".cube-carousel");

    if (cubeElement) {
      const computedTranslateZ = getComputedStyle(cubeElement)
        .getPropertyValue("--translateZ")
        .trim();

      if (computedTranslateZ) {
        setTranslateZ(computedTranslateZ);
      }
    }
  }, []);

  const totalFaces = photos.length;

  // Preload all images before rendering
  useEffect(() => {
    let isMounted = true;

    const preloadImages = async () => {
      const promises = photos.map((photo) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = photo.src;
          img.onload = () => resolve();
          img.onerror = () => {
            console.error(`Failed to load image: ${photo.src}`);
            resolve(); // resolve anyway to continue
          };
        });
      });

      await Promise.all(promises);
      if (isMounted) {
        setImagesLoaded(true);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [photos]);

  useEffect(() => {
    let rotationInterval: NodeJS.Timeout;

    if (isAutoRotating && !isManualControl && imagesLoaded) {
      rotationInterval = setInterval(() => {
        setCurrentFace((prevFace) => (prevFace + 1) % totalFaces);
      }, 4000);
    }

    return () => clearInterval(rotationInterval);
  }, [isAutoRotating, isManualControl, totalFaces, imagesLoaded]);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    if (isManualControl) {
      idleTimer = setTimeout(() => {
        setIsManualControl(false);
      }, 10000);
    }

    return () => clearTimeout(idleTimer);
  }, [isManualControl, currentFace]);

  const handleNext = () => {
    setIsManualControl(true);
    setCurrentFace((prevFace) => (prevFace + 1) % totalFaces);
  };

  const handlePrev = () => {
    setIsManualControl(true);
    setCurrentFace((prevFace) => (prevFace - 1 + totalFaces) % totalFaces);
  };

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  const getTransform = (index: number) => {
    const angle = 360 / totalFaces;
    return `rotateY(${index * angle}deg) translateZ(${translateZ})`;
  };

  // Show loading state until images are ready
  if (!imagesLoaded) {
    return (
      <div className="cube-carousel__loading">
        Loading photos...
      </div>
    );
  }

  return (
    <div className="cube-carousel">
      <div className="cube-carousel__container">
        <div
          className="cube-carousel__cube"
          style={{
            transform: `rotateY(-${(currentFace * (360 / totalFaces))}deg)`
          }}
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              className="cube-carousel__face"
              style={{
                transform: getTransform(index)
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="cube-carousel__face-img"
              />
              <div className="cube-carousel__face-caption">
                {photo.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cube-carousel__controls">
        <ButtonGroup>
          <Button onClick={handlePrev}>
            &lt; Back
          </Button>
          <Button
            onClick={toggleAutoRotate}
            isActive={isAutoRotating}
          >
            {isAutoRotating ? 'Auto: On' : 'Auto: Off'}
          </Button>
          <Button onClick={handleNext}>
            Next &gt;
          </Button>
        </ButtonGroup>
      </div>

      <small className="cube-carousel__counter">
        {currentFace + 1} / {totalFaces}
      </small>
    </div>
  );
};

export default CubeCarousel;
