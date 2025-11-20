import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particleCount = width < 768 ? 400 : 1000; 
    const connectionDistance = 100;
    const mouseDistance = 200;
    
    const noise = (x: number, y: number, t: number) => {
        return Math.sin(x * 0.002 + t) * Math.cos(y * 0.002 + t);
    };

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number;
      baseX: number; baseY: number; density: number; color: string; alpha: number;

      constructor() {
        this.x = Math.random() * width; this.y = Math.random() * height;
        this.baseX = this.x; this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 1; this.vy = (Math.random() - 0.5) * 1;
        this.size = Math.random() * 2 + 0.5; this.density = (Math.random() * 30) + 1;
        const colors = ['#FACC15', '#FDE047', '#EAB308', '#FFFFFF'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update(mouse: { x: number, y: number }, time: number) {
        const angle = noise(this.x, this.y, time * 0.0005) * Math.PI * 4;
        const force = 0.2;
        this.vx += Math.cos(angle) * force * 0.1;
        this.vy += Math.sin(angle) * force * 0.1;

        let dx = mouse.x - this.x; let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = mouseDistance;
        let forceMouse = (maxDistance - distance) / maxDistance;
        
        if (distance < maxDistance) {
          this.vx -= (dx / distance) * forceMouse * this.density * 0.8;
          this.vy -= (dy / distance) * forceMouse * this.density * 0.8;
        }
        this.vx *= 0.96; this.vy *= 0.96;
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0) this.x = width; if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height; if (this.y > height) this.y = 0;
      }
      draw(context: CanvasRenderingContext2D) {
        context.beginPath(); context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color; context.globalAlpha = this.alpha;
        context.fill(); context.globalAlpha = 1;
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) { particles.push(new Particle()); }

    const mouse = { x: -1000, y: -1000 };
    let time = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    };
    const handleTouchMove = (e: TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        if(e.touches.length > 0) {
            mouse.x = e.touches[0].clientX - rect.left;
            mouse.y = e.touches[0].clientY - rect.top;
        }
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    const animate = () => {
      time++;
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)'; 
      ctx.fillRect(0, 0, width, height);
      particles.forEach(p => { p.update(mouse, time); p.draw(ctx); });
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.15)'; ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        const dxMouse = mouse.x - p1.x; const dyMouse = mouse.y - p1.y;
        if (Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse) > 300) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x; const dy = p1.y - p2.y;
          const dist = dx * dx + dy * dy;
          if (dist < connectionDistance * connectionDistance) {
             ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => {
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width; canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div id="about" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/40 to-brand-black z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_120%)] z-10 pointer-events-none"></div>

      <div className="relative z-20 text-center px-4 max-w-7xl mx-auto pt-32 md:pt-38 pb-20 flex flex-col justify-center h-full">
        
        <div className="inline-block mb-8 md:mb-10 animate-in fade-in slide-in-from-top-8 duration-1000">
            <span className="py-3 px-8 rounded-full border border-brand-yellow/30 bg-brand-yellow/10 text-brand-yellow font-bold tracking-widest text-xs md:text-sm uppercase backdrop-blur-md shadow-[0_0_20px_rgba(250,204,21,0.1)]">
                Đối Tác Chiến Lược Cấp Cao
            </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white uppercase leading-normal tracking-tight mb-10 md:mb-16 drop-shadow-2xl animate-in zoom-in-90 duration-1000">
          Định Hình <br className="hidden md:block" />
          <span className="relative inline-block mt-2">
            <span className="absolute -inset-4 bg-brand-yellow/20 blur-2xl rounded-full"></span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-yellow-200 to-yellow-600 pb-2">
              Tương Lai Số
            </span>
          </span>
        </h1>
        
        <p className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto mb-14 font-light leading-relaxed animate-in slide-in-from-bottom-8 duration-1000 delay-200 px-4">
          DUHAVA biến dữ liệu thành lợi nhuận. Chúng tôi kiến tạo những trải nghiệm kỹ thuật số 
          <span className="text-white font-semibold border-b border-brand-yellow"> độc bản</span>, giúp thương hiệu của bạn thống trị thị trường.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center animate-in slide-in-from-bottom-8 duration-1000 delay-300 pb-10">
          <MagneticButton>
            <button 
                onClick={onCtaClick}
                className="group relative bg-brand-yellow text-brand-black text-lg md:text-xl font-black py-5 px-12 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(250,204,21,0.5)]"
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
                <span className="relative flex items-center gap-2">
                    NHẬN TƯ VẤN CHIẾN LƯỢC <ArrowRight className="w-5 h-5" />
                </span>
            </button>
          </MagneticButton>
          
          <MagneticButton>
            <button 
                onClick={() => {
                const el = document.getElementById('services');
                if (el) {
                    window.scrollTo({
                        top: el.offsetTop,
                        behavior: 'smooth'
                    });
                }
                }}
                className="group text-white text-lg md:text-xl font-bold py-5 px-10 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
            >
                Khám Phá Dịch Vụ
            </button>
          </MagneticButton>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60 hidden md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-yellow animate-pulse">Cuộn xuống</span>
        <div className="w-[2px] h-16.5 bg-gradient-to-b from-brand-yellow to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;