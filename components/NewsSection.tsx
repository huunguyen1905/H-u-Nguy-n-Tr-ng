import React from 'react';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { NewsItem } from '../types';
import FadeIn from './FadeIn';

interface NewsSectionProps {
  news: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ news }) => {
  // Only show latest 3 items
  const displayNews = news.slice(0, 3);

  return (
    <section id="news" className="bg-brand-black py-24 border-t border-gray-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Tin Tức & Sự Kiện</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    Góc Nhìn <span className="text-gray-600">Chuyên Gia</span>
                    </h3>
                </div>
                <button className="text-white border-b border-brand-yellow pb-1 hover:text-brand-yellow transition-colors flex items-center gap-2 uppercase text-sm font-bold tracking-wider">
                    Xem Tất Cả Bài Viết <ArrowRight size={16} />
                </button>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayNews.map((item, index) => (
            <FadeIn key={item.id} delay={index * 150}>
                <article className="group cursor-pointer h-full flex flex-col bg-gray-900/30 border border-gray-800 rounded-xl overflow-hidden hover:border-brand-yellow/50 transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-48 overflow-hidden">
                        <div className="absolute top-4 left-4 bg-brand-yellow text-brand-black text-xs font-bold px-3 py-1 rounded z-10 uppercase tracking-wider">
                            {item.category}
                        </div>
                        <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                            <Calendar size={12} />
                            <span>{new Date(item.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors line-clamp-2">
                            {item.title}
                        </h4>
                        <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                            {item.summary}
                        </p>
                        <div className="flex items-center gap-2 text-brand-yellow text-sm font-bold uppercase tracking-wider mt-auto group/btn">
                            Đọc Thêm <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;