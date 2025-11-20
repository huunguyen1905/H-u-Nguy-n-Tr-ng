
import React, { useEffect, useState } from 'react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the hovered element is interactive
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');

      setIsHovering(!!isInteractive);
    };
    
    const handleMouseOut = () => {
        setIsHovering(false);
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isVisible]);

  // Hide on touch devices
  if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) return null;

  return (
    <>
      {/* Main Dot */}
      <div 
        className="fixed top-0 left-0 w-3 h-3 bg-brand-yellow rounded-full pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300"
        style={{ 
          transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0)`,
          opacity: isVisible ? 1 : 0 
        }}
      />
      {/* Trailing Circle */}
      <div 
        className={`fixed top-0 left-0 border border-brand-yellow rounded-full pointer-events-none z-[9998] transition-all duration-150 ease-out ${isHovering ? 'w-16 h-16 bg-brand-yellow/10 border-transparent backdrop-blur-[1px]' : 'w-8 h-8'}`}
        style={{ 
          transform: `translate3d(${position.x - (isHovering ? 32 : 16)}px, ${position.y - (isHovering ? 32 : 16)}px, 0)`,
          opacity: isVisible ? 1 : 0 
        }}
      />
    </>
  );
};

export default Cursor;
