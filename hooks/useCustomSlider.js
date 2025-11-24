// hooks/useCustomSlider.js
"use client";
import { useState, useEffect, useCallback, useRef } from "react";

// We've moved the hook logic outside the component
export const useCustomSlider = (slideCount, autoplayDelay = 10000) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayTimerRef = useRef(null);
  const touchStartXRef = useRef(0);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slideCount);
  }, [slideCount]);

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const startAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    autoplayTimerRef.current = setInterval(goNext, autoplayDelay);
  }, [goNext, autoplayDelay]);

  const handleInteraction = (action) => {
    action();
    startAutoplay(); // Restart the timer
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [startAutoplay]);

  const onTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartXRef.current;
    const swipeThreshold = 50; 

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX < 0) {
        handleInteraction(goNext);
      } else {
        handleInteraction(goPrev);
      }
    }
  };

  return {
    activeIndex,
    goNext: () => handleInteraction(goNext),
    goPrev: () => handleInteraction(goPrev),
    touchHandlers: {
      onTouchStart,
      onTouchEnd,
    },
  };
};