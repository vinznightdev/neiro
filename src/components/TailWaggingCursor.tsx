/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PawTrail {
  id: string;
  x: number;
  y: number;
  rotation: number;
}

export default function TailWaggingCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [trails, setTrails] = useState<PawTrail[]>([]);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    // Only enable custom cursor if the device has a fine pointer (mouse/stylus)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Throttle paw trail creation (e.g., max one every 120ms)
      const now = Date.now();
      if (now - lastTrailTime.current > 120) {
        const randomRotation = Math.random() * 40 - 20; // -20deg to 20deg
        const newTrail: PawTrail = {
          id: `${now}-${Math.random()}`,
          x: e.clientX,
          y: e.clientY,
          rotation: randomRotation,
        };
        setTrails((prev) => [...prev.slice(-8), newTrail]); // Limit to last 8 trails
        lastTrailTime.current = now;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('clickable')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Filter out expired trails over time
  useEffect(() => {
    if (trails.length === 0) return;
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(1));
    }, 1500);
    return () => clearInterval(interval);
  }, [trails]);

  if (!isFinePointer) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 1. Paw trails */}
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 0, scale: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              left: trail.x,
              top: trail.y,
              transform: `translate(-50%, -50%) rotate(${trail.rotation}deg)`,
            }}
            className="absolute text-orange-400/25 dark:text-violet-400/20"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 14c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-4.5-2c-.83 0-1.5-.67-1.5-1.5S6.67 9 7.5 9s1.5.67 1.5 1.5S8.33 12 7.5 12zm9 0c-.83 0-1.5-.67-1.5-1.5S15.67 9 16.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-5.5-3.5C10.17 6.5 9.5 5.83 9.5 5S10.17 3.5 11 3.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm2 0c-.83 0-1.5-.67-1.5-1.5S12.17 3.5 13 3.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 2. Main Tail-Wagging Cursor */}
      <div
        className="absolute transition-transform duration-75 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-12px, -12px) scale(${isHovering ? 1.25 : 1})`,
        }}
      >
        {/* A tiny custom dog paw and animated wagging tail */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* Paw icon */}
          <div className="text-orange-500 dark:text-violet-400 drop-shadow-sm">
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-3.5-2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-4-3.5c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zm1.5 0c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1z" />
            </svg>
          </div>

          {/* Tail wagging off the side! */}
          <motion.div
            className="absolute bottom-1 -right-1 w-4 h-2 bg-amber-600 dark:bg-indigo-500 origin-left rounded-full"
            animate={{
              rotate: isHovering ? [-35, 35, -35] : [-15, 15, -15],
            }}
            transition={{
              repeat: Infinity,
              duration: isHovering ? 0.15 : 0.4,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  );
}
