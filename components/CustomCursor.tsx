import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only activate on Desktop (no coarse pointer)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (followerRef.current) {
        // Slight delay for the follower to create fluid motion
        setTimeout(() => {
            if(followerRef.current)
                followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }, 50);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide on mobile via CSS media query logic inside component return or keep hidden md:block
  return (
    <>
      <style>{`
        @media (pointer: fine) {
            body { cursor: none; }
            a, button, input, textarea { cursor: none; }
        }
      `}</style>
      <div 
        ref={cursorRef}
        className={`hidden md:block fixed top-0 left-0 w-3 h-3 bg-brand-yellow rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out -mt-1.5 -ml-1.5`}
      />
      <div 
        ref={followerRef}
        className={`hidden md:block fixed top-0 left-0 border border-brand-yellow rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out -mt-4 -ml-4
            ${isHovering ? 'w-12 h-12 bg-brand-yellow/20 scale-150 border-transparent' : 'w-8 h-8 scale-100'}
        `}
      />
    </>
  );
};

export default CustomCursor;