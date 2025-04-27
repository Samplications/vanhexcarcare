import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

const CarouselContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  padding: 2% 0;
  position: relative;
`;

const SlidesWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentSlide, totalSlides }) => {
    const offset = 100 / 3; // Each slide is 33.333%
    const base = (currentSlide - 2) * offset;
    const maxOffset = (totalSlides - 3) * offset;
    const clampedBase = Math.max(Math.min(base, maxOffset), 0); // Don't allow over-scroll
    return `translateX(-${clampedBase}%)`;
  }};
`;


const Slide = styled.div`
  flex: 0 0 33.333%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out;
`;

const SlideImage = styled.img`
  max-width: 80%;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  
  ${({ isCurrent }) => isCurrent && `
    transform: scale(1.1);
    opacity: 1;
  `}

  ${({ isSide }) => isSide && `
    transform: scale(0.8);
    opacity: 0.6;
  `}
`;

const Controls = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
`;

const Button = styled.button`
  background-color: var(--c-secondary);
  border: none;
  color: white;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.3s;

  &:hover {
    background-color: var(--c-primary);
    color: white;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Dot = styled.div`
  height: 10px;
  width: 10px;
  margin: 0 5px;
   background-color: ${({ active }) => (active ? "#ffa029" : "#ccc")};
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.3s ease;
`;

const Carousel_3piece = ({ images, interval_conf = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(2);
  // Ref to store the interval ID
const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 > images.length ? 1 : prev + 1));
    resetAutoScroll();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 < 1 ? images.length : prev - 1));
    resetAutoScroll();
  };

  // Function to reset the auto-scroll timer
  const resetAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the existing interval
    }
    intervalRef.current = setInterval(nextSlide, interval_conf); // Start a new interval
  };

  useEffect(() => {
      intervalRef.current = setInterval(nextSlide, interval_conf); // Start the initial interval
      return () => clearInterval(intervalRef.current); // Clear the interval on unmount
    }, [interval_conf]);

  return (
    <>
      <CarouselContainer>
        <SlidesWrapper currentSlide={currentSlide} totalSlides={images.length}>
          {images.map((img, index) => {
            const slideIndex = index + 1;
            return (
              <Slide key={index}>
                <SlideImage 
                  src={img} 
                  alt={`Slide ${index}`} 
                  isCurrent={slideIndex === currentSlide}
                  isSide={slideIndex !== currentSlide}
                />
              </Slide>
            );
          })}
        </SlidesWrapper>

        <Controls>
          <Button onClick={prevSlide}>‹</Button>
          <Button onClick={nextSlide}>›</Button>
        </Controls>
      </CarouselContainer>

      <DotsContainer>
        {images.map((_, index) => (
          <Dot key={index} active={currentSlide === index + 1} onClick={() => setCurrentSlide(index + 1)}/>
        ))}
      </DotsContainer>
    </>
  );
};

export default Carousel_3piece;
