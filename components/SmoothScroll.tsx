import React, { useEffect, useRef } from 'react';

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElem = scrollRef.current;
    if (!scrollElem) return;

    let current = 0;
    let target = 0;
    let ease = 0.075; // Lower = smoother/slower

    // Update virtual height for the native scrollbar
    const updateHeight = () => {
        if (heightRef.current && scrollElem) {
            heightRef.current.style.height = `${scrollElem.getBoundingClientRect().height}px`;
        }
    };
    
    const observer = new ResizeObserver(updateHeight);
    observer.observe(scrollElem);
    updateHeight();

    // Animation Loop
    const animate = () => {
      target = window.scrollY;
      // Linear interpolation
      current = current * (1 - ease) + target * ease;
      
      // Apply transform
      if (scrollElem) {
          // Using translate3d for hardware acceleration
          scrollElem.style.transform = `translate3d(0, -${current}px, 0)`;
      }
      
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    window.addEventListener('resize', updateHeight);
    
    return () => {
        window.removeEventListener('resize', updateHeight);
        cancelAnimationFrame(animationId);
        observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Ghost div to create scrollable height */}
      <div ref={heightRef} style={{ width: '100%' }} />
      
      {/* Fixed container that moves via transform */}
      <div 
        ref={scrollRef} 
        style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            overflow: 'hidden',
            willChange: 'transform',
            zIndex: 1
        }}
      >
        {children}
      </div>
    </>
  );
};

export default SmoothScroll;