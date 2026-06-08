import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

const SlidesWrapper = styled.div`
  display: flex;
  transition: transform 1s ease-in-out;
  transform: ${({ currentSlide }) => `translateX(-${currentSlide * 100}%)`};
`;

const Slide = styled.div`
  flex: 0 0 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
`;

const SlideImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.7rem;
  max-width: 500px;
  overflow: hidden;
  padding: 0 8px;
`;

const Dot = styled.div`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  min-width: unset;
  min-height: unset;
  flex-shrink: 0;
  box-sizing: content-box;
  margin: 0 3px;
  background-color: ${({ active }) => (active ? "#ffa029" : "#ccc")};
  border-radius: 50%;
  display: block;
  transition: background-color 0.3s ease;
  cursor: pointer;
`;

export default function ImageCarousel({ images, interval_conf = 5000 }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(null);

  // Ref to store the interval ID
  const intervalRef = useRef(null);

  // Compute dot size so all dots fit within the 500px container.
  // Each dot occupies (size + 2 * 5px margin) horizontal space. -> 10 + 2 * (margin i.e.) 3 = 12
  // We cap at 10px (the original size) and floor at 4px to stay visible.
  const dotSize = Math.min(
    20,
    Math.max(4, Math.floor(480 / (images.length * 16)))
  );

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Function to handle touch start (for swipe detection)
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  // Function to handle touch end (for swipe detection)
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide(); // Swipe left -> Next slide
      } else {
        prevSlide(); // Swipe right -> Previous slide
      }
      resetAutoScroll(); // Reset the auto-scroll timer on swipe
    }
  };

  // Function to reset the auto-scroll timer
  const resetAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(nextSlide, interval_conf);
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, interval_conf);
    return () => clearInterval(intervalRef.current);
  }, [interval_conf]);

  return (
    <>
      <CarouselContainer
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <SlidesWrapper currentSlide={currentSlide}>
          {images.map((src, index) => (
            <Slide key={index}>
              <SlideImage src={src} alt={`Slide ${index}`} />
            </Slide>
          ))}
        </SlidesWrapper>
      </CarouselContainer>

      <DotsContainer>
        {images.map((_, index) => (
          <Dot
            key={index}
            size={dotSize}
            active={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </DotsContainer>
    </>
  );
}