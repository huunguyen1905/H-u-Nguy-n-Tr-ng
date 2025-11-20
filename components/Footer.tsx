import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, ArrowRight, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 border-t border-gray-800 relative overflow-hidden">
      {/* Giant Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[15vw] font-black text-white opacity-[0.03] tracking-tighter leading-none">
          DUHAVA
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-brand-yellow rounded flex items-center justify-center font-black text-brand-black text-2xl">D</div>
                <span className="text-4xl font-black tracking-tighter">DUHAVA</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Chúng tôi không chỉ làm marketing. Chúng tôi kiến tạo vị thế dẫn đầu cho thương hiệu của bạn trong kỷ nguyên số.
            </p>
            <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:bg-brand-yellow hover:text-brand-black hover:border-brand-yellow transition-all duration-300">
                        <Icon size={18} />
                    </a>
                ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-2 md:col-span-4">
             <h4 className="text-xl font-bold uppercase mb-8 text-brand-yellow">Khám Phá</h4>
             <ul className="space-y-4 text-gray-400">
                {['Về Chúng Tôi', 'Dự Án', 'Dịch Vụ', 'Tuyển Dụng', 'Tin Tức'].map((item) => (
                    <li key={item}><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-0.5 bg-brand-yellow transition-all duration-300"></span>{item}</a></li>
                ))}
             </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2 md:col-span-4">
             <h4 className="text-xl font-bold uppercase mb-8 text-brand-yellow">Dịch Vụ</h4>
             <ul className="space-y-4 text-gray-400">
                {['SEO Ranking', 'Google Ads', 'Social Media', 'Branding', 'Web Design'].map((item) => (
                    <li key={item}><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-0.5 bg-brand-yellow transition-all duration-300"></span>{item}</a></li>
                ))}
             </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 md:col-span-4">
            <h4 className="text-xl font-bold uppercase mb-8 text-brand-yellow">Bản Tin Số</h4>
            <p className="text-gray-500 mb-6 text-sm">Nhận chiến lược marketing mới nhất hàng tuần.</p>
            <div className="relative">
                <input 
                    type="email" 
                    placeholder="Email của bạn..." 
                    className="w-full bg-black border border-gray-800 text-white py-4 px-6 rounded focus:border-brand-yellow focus:outline-none pr-12"
                />
                <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-brand-yellow text-brand-black rounded flex items-center justify-center hover:bg-white transition-colors">
                    <ArrowRight size={20} />
                </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm font-medium">
          <div>© {new Date().getFullYear()} DUHAVA Digital Agency. All rights reserved.</div>
          <div className="flex gap-8 items-center select-none">
            <a href="#" className="hover:text-white">Điều khoản</a>
            <a href="#" className="hover:text-white">Bảo mật</a>
            <a href="#" className="hover:text-white">Sitemap</a>
            {/* Admin Lock Button - Improved Visibility */}
            <button 
                onClick={onOpenAdmin} 
                className="text-gray-600 hover:text-brand-yellow transition-colors p-2 hover:bg-gray-800 rounded-full group" 
                title="Truy cập quản trị"
                aria-label="Admin Access"
            >
               <Lock size={16} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;