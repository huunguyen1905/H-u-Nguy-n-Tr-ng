import React, { useEffect, useState } from 'react';

const Preloader: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Show static logo for 0.8s
    const timer1 = setTimeout(() => {
      setIsExiting(true);
    }, 800);

    // Animation duration (0.8s + slide animation time)
    const timer2 = setTimeout(() => {
      setHide(true);
      onFinish();
    }, 1600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  if (hide) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center pointer-events-none">
      
      {/* Main Black Shutter - Slides up */}
      <div 
        className={`absolute inset-0 bg-black z-20 transition-transform duration-700 ease-in-out flex items-center justify-center
            ${isExiting ? '-translate-y-full' : 'translate-y-0'}
        `}
      >
        <div className={`text-center transition-all duration-500 ${isExiting ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'}`}>
            <div className="relative inline-block">
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter relative z-10 mix-blend-difference">
                    DUHAVA
                </h1>
                <div className="absolute -inset-4 bg-brand-yellow/20 blur-2xl rounded-full animate-pulse"></div>
            </div>
            <p className="text-brand-yellow text-sm uppercase tracking-[0.5em] mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                Digital Agency
            </p>
        </div>
      </div>

      {/* Secondary Yellow Shutter - Follows slightly behind */}
      <div 
        className={`absolute inset-0 bg-brand-yellow z-10 transition-transform duration-700 ease-in-out delay-100
            ${isExiting ? '-translate-y-full' : 'translate-y-0'}
        `}
      ></div>

    </div>
  );
};

export default Preloader;