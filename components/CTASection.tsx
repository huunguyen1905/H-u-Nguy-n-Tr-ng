import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onCtaClick: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onCtaClick }) => {
  return (
    <section className="py-32 bg-brand-yellow relative overflow-hidden flex items-center justify-center">
       {/* Background Patterns */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply"></div>
       <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-black to-transparent opacity-50"></div>
       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-dark to-transparent opacity-50"></div>

       <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-7xl font-black text-brand-black uppercase tracking-tighter mb-8 leading-tight">
                Bạn Đã Sẵn Sàng <br/>
                <span className="text-white drop-shadow-lg">Thống Trị Thị Trường?</span>
            </h2>
            <p className="text-brand-black/80 text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-12">
                Đừng để đối thủ vượt mặt. Hãy để DUHAVA xây dựng đế chế kỹ thuật số cho bạn ngay hôm nay.
            </p>
            
            <button 
                onClick={onCtaClick}
                className="bg-brand-black text-white text-xl font-bold py-6 px-16 rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
                BẮT ĐẦU DỰ ÁN NGAY <ArrowRight />
            </button>
       </div>
    </section>
  );
};

export default CTASection;