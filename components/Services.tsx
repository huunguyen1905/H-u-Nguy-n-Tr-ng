import React, { useEffect, useRef } from 'react';
import { Service } from '../types';
import { CheckCircle } from 'lucide-react';
import FadeIn from './FadeIn';

interface ServicesProps {
  services: Service[];
  onCtaClick: () => void;
}

const ParallaxImage = ({ src, alt }: { src: string; alt: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Only animate if in view (with some buffer)
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Calculate distance from center of viewport
        const distFromCenter = rect.top + rect.height / 2 - windowHeight / 2;
        
        // Parallax intensity (speed)
        // Positive speed moves image in same direction as scroll (slower relative movement)
        const speed = 0.15;
        const yPos = distFromCenter * speed;
        
        imgRef.current.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative overflow-hidden rounded-lg border-2 border-brand-gray transform transition-transform duration-500 group-hover:scale-[1.02] h-[400px] w-full bg-gray-900"
    >
      <div className="absolute inset-0 bg-brand-yellow/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500 pointer-events-none"></div>
      <img 
        ref={imgRef}
        src={src} 
        alt={alt} 
        className="absolute left-0 w-full h-[130%] -top-[15%] object-cover filter grayscale group-hover:grayscale-0 transition-filter duration-500 will-change-transform"
      />
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ services, onCtaClick }) => {
  return (
    <section id="services" className="bg-brand-black py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <FadeIn>
            <div className="text-center mb-20">
            <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Dịch Vụ Của Chúng Tôi</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Giải Pháp <span className="text-gray-500">Toàn Diện</span>
            </h3>
            </div>
        </FadeIn>

        <div className="flex flex-col gap-24">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 group w-full">
                <FadeIn direction={index % 2 === 0 ? 'right' : 'left'}>
                    <ParallaxImage src={service.imageUrl} alt={service.title} />
                </FadeIn>
              </div>
              
              <div className="flex-1 space-y-6">
                <FadeIn direction={index % 2 === 0 ? 'left' : 'right'} delay={200}>
                    <div className="w-16 h-1 bg-brand-yellow mb-6"></div>
                    <h4 className="text-3xl md:text-4xl font-black text-white uppercase">{service.title}</h4>
                    <p className="text-gray-400 text-lg leading-relaxed">
                    {service.description}
                    </p>
                    
                    <ul className="space-y-3 mt-4">
                    <li className="flex items-center gap-3 text-white font-semibold">
                        <CheckCircle className="text-brand-yellow w-5 h-5" />
                        <span>Cam kết KPI rõ ràng</span>
                    </li>
                    <li className="flex items-center gap-3 text-white font-semibold">
                        <CheckCircle className="text-brand-yellow w-5 h-5" />
                        <span>Báo cáo minh bạch 24/7</span>
                    </li>
                    <li className="flex items-center gap-3 text-white font-semibold">
                        <CheckCircle className="text-brand-yellow w-5 h-5" />
                        <span>Đội ngũ chuyên gia 10+ năm kinh nghiệm</span>
                    </li>
                    </ul>

                    <button 
                    onClick={onCtaClick}
                    className="mt-8 bg-transparent border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-black py-3 px-8 rounded font-bold uppercase tracking-wider transition-all duration-300"
                    >
                    Tư Vấn {service.title}
                    </button>
                </FadeIn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;