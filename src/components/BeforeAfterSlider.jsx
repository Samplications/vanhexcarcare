// src/components/BeforeAfterSlider.js
import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const SliderContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    height: 600px;
    overflow: hidden;
    margin: auto;
`;

const Image = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const BeforeImage = styled(Image)`
    z-index: 1;
`;

// Keyframe animation for a slight left-right movement
const slideAnimation = keyframes`
    0%, 100% { clip-path: inset(0 0 0 70%); }
    50% { clip-path: inset(0 0 0 75%); }
`;

// Animate `AfterImage` only when `isAnimated` prop is true
const AfterImage = styled(Image)`
    z-index: 2;
    clip-path: ${({ widthPercent }) => `inset(0 0 0 ${widthPercent}%)`};
    transition: clip-path 0.05s ease-in-out;
    ${({ isAnimated }) =>
        isAnimated &&
        css`
            animation: ${slideAnimation} 1.5s ease-in-out infinite;
        `}
`;

// Slider animation for slight thumb movement
const thumbAnimation = keyframes`
    0%, 100% { transform: translateX(-50%) scale(1); }
    50% { transform: translateX(-50%) scale(1.1); }
`;

// Animate the slider thumb when `isAnimated` is true
const Slider = styled.input`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    cursor: pointer;
    z-index: 3;
    appearance: none;
    height: 8px;
    background: #ddd;
    outline: none;
    border-radius: 4px;

    &::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--c-secondary);
        cursor: pointer;
        ${({ isAnimated }) =>
            isAnimated &&
            css`
                animation: ${thumbAnimation} 1.5s ease-in-out infinite;
            `}
    }

    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--c-secondary);
        cursor: pointer;
        ${({ isAnimated }) =>
            isAnimated &&
            css`
                animation: ${thumbAnimation} 1.5s ease-in-out infinite;
            `}
    }
`;

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
    const [isTouched, setIsTouched] = useState(false);
    const [sliderValue, setSliderValue] = useState(75);

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
        if (!isTouched) {
            setIsTouched(true);  // Stop animation after first interaction
        }
    };

    return (
        <SliderContainer>
            <BeforeImage src={beforeImage} alt="Before" />
            <AfterImage
                src={afterImage}
                alt="After"
                widthPercent={sliderValue}
                isAnimated={!isTouched}
            />
            <Slider
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={handleSliderChange}
                isAnimated={!isTouched}
            />
        </SliderContainer>
    );
};

export default BeforeAfterSlider;
