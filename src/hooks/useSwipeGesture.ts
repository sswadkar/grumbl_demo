import { useState, useCallback } from 'react';
import { SwipeDirection } from '../types/restaurant';

const SWIPE_THRESHOLD = 100;
const SWIPE_TIMEOUT = 300;

interface SwipeState {
  startX: number;
  startY: number;
  startTime: number;
}

interface SwipeOffset {
  x: number;
  y: number;
}

const useSwipeGesture = (onSwipe: (direction: SwipeDirection) => void) => {
  const [swipeState, setSwipeState] = useState<SwipeState | null>(null);
  const [offset, setOffset] = useState<SwipeOffset>({ x: 0, y: 0 });

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setSwipeState({
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      startTime: Date.now()
    });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!swipeState) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    
    setOffset({
      x: currentX - swipeState.startX,
      y: currentY - swipeState.startY
    });
  }, [swipeState]);

  const handleTouchEnd = useCallback(() => {
    if (!swipeState) return;

    const deltaX = offset.x;
    const deltaY = offset.y;
    const deltaTime = Date.now() - swipeState.startTime;

    // Reset offset
    setOffset({ x: 0, y: 0 });
    setSwipeState(null);

    // Ignore if the swipe was too slow
    if (deltaTime > SWIPE_TIMEOUT) return;

    if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
      onSwipe(deltaX > 0 ? 'right' : 'left');
    } else if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
      onSwipe(deltaY > 0 ? 'down' : 'up');
    }
  }, [offset, swipeState, onSwipe]);

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    offset
  };
};

export default useSwipeGesture;