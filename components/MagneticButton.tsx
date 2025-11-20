import React, { useRef, useState } from 'react';

const MagneticButton: React.FC<{ children: React.ReactElement; strength?: number }> = ({ children, strength = 30 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    // Move element towards cursor
    setPosition({ x: x * 0.5, y: y * 0.5 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Extract onClick from child to apply to the wrapper since pointer-events is set to none on child
  const child = children as React.ReactElement<any>;
  const childOnClick = child.props.onClick;

  return (
    <div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={childOnClick}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        className="transition-transform duration-200 ease-out inline-block cursor-pointer"
    >
      {/* Clone child to disable pointer events so the parent handles the hover logic */}
      {React.cloneElement(child, {
        style: { 
            ...(child.props.style || {}),
            pointerEvents: 'none' 
        }
      })}
    </div>
  );
};

export default MagneticButton;