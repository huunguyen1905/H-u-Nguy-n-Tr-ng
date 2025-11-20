import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 
      ${isScrolled 
        ? 'bg-brand-black/70 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5 supports-[backdrop-filter]:bg-brand-black/60' 
        : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-brand-yellow rounded flex items-center justify-center font-black text-brand-black text-xl group-hover:rotate-12 transition-transform">
                D
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">DUHAVA</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-wide">
          <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:text-brand-yellow transition-colors uppercase relative group">
            Về Chúng Tôi
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-yellow transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="hover:text-brand-yellow transition-colors uppercase relative group">
            Dịch Vụ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-yellow transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#projects" onClick={(e) => handleScrollTo(e, 'projects')} className="hover:text-brand-yellow transition-colors uppercase relative group">
            Dự Án
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-yellow transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#news" onClick={(e) => handleScrollTo(e, 'news')} className="hover:text-brand-yellow transition-colors uppercase relative group">
            Tin Tức
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-yellow transition-all duration-300 group-hover:w-full"></span>
          </a>
          <button 
            onClick={onOpenContact}
            className="bg-brand-yellow text-brand-black px-6 py-3 rounded font-extrabold uppercase tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
          >
            Nhận Tư Vấn
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-black/95 backdrop-blur-xl border-b border-gray-800 p-6 md:hidden flex flex-col gap-6 text-center animate-in slide-in-from-top-5 h-screen">
          <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="text-lg font-bold hover:text-brand-yellow uppercase">Về Chúng Tôi</a>
          <a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="text-lg font-bold hover:text-brand-yellow uppercase">Dịch Vụ</a>
          <a href="#projects" onClick={(e) => handleScrollTo(e, 'projects')} className="text-lg font-bold hover:text-brand-yellow uppercase">Dự Án</a>
          <a href="#news" onClick={(e) => handleScrollTo(e, 'news')} className="text-lg font-bold hover:text-brand-yellow uppercase">Tin Tức</a>
          <button 
            onClick={() => { onOpenContact(); setIsMobileMenuOpen(false); }}
            className="bg-brand-yellow text-brand-black py-4 rounded font-extrabold uppercase"
          >
            Nhận Tư Vấn Ngay
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;