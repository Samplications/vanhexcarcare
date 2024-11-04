import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SlideshowContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px; /* Adjust as needed */
  overflow: hidden;
`;

const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;

  &.active {
    opacity: 1;
  }
`;

const Slideshow = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const cycleImages = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(cycleImages);
  }, [images.length, interval]);

  return (
    <SlideshowContainer>
      {images.map((image, index) => (
        <Slide
          key={index}
          className={index === currentIndex ? 'active' : ''}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </SlideshowContainer>
  );
};

export default Slideshow;
