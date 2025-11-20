import React from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Doanh số tăng 300% chỉ sau 3 tháng. Chiến lược SEO và Ads thực sự ở đẳng cấp khác.",
    name: "Trần Minh Tuấn",
    role: "CEO, TechViet Solutions",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    quote: "Website mới không chỉ đẹp mà còn chuyển đổi khách hàng cực tốt. Rất chuyên nghiệp.",
    name: "Nguyễn Lan Hương",
    role: "Director, Beauty Spa",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    quote: "Chưa thấy bên nào tận tâm như DUHAVA. Họ coi công việc của tôi như của chính họ.",
    name: "Lê Văn Nam",
    role: "Founder, Real Estate Gold",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg"
  },
  {
    id: 4,
    quote: "Dịch vụ xuất sắc, hỗ trợ 24/7. Mọi chỉ số đều xanh và tăng trưởng đều đặn.",
    name: "Phạm Thu Hà",
    role: "Manager, Organic Food",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 5,
    quote: "Giải pháp Branding tuyệt vời. Chúng tôi đã định vị lại hoàn toàn thương hiệu.",
    name: "Hoàng Đức",
    role: "CMO, StartUp Viet",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg"
  }
];

const TestimonialCard: React.FC<{ item: any }> = ({ item }) => (
  <div className="w-[400px] flex-shrink-0 bg-gray-900/40 backdrop-blur-sm border border-gray-800 p-8 rounded-xl mx-4 hover:border-brand-yellow/50 transition-all duration-300 group relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1 h-full bg-brand-yellow transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
    <div className="flex gap-1 mb-4 text-brand-yellow">
        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
    </div>
    <p className="text-gray-300 text-lg leading-relaxed font-light italic mb-6">"{item.quote}"</p>
    <div className="flex items-center gap-4">
        <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full border border-gray-700" />
        <div>
            <h4 className="text-white font-bold text-sm">{item.name}</h4>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{item.role}</p>
        </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="bg-brand-black py-32 relative overflow-hidden border-t border-gray-800">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 mb-20">
        <div className="text-center">
          <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Đánh Giá Khách Hàng</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Hàng Trăm Thương Hiệu <span className="text-gray-500">Tin Tưởng</span>
          </h3>
        </div>
      </div>

      {/* Infinite Scroll Row 1 (Left) */}
      <div className="relative w-full overflow-hidden mb-8 group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-10"></div>
        
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={`row1-${i}`} item={item} />
          ))}
        </div>
      </div>

      {/* Infinite Scroll Row 2 (Right - Reverse) */}
      <div className="relative w-full overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-10"></div>
        
        <div className="flex w-max animate-marquee-reverse group-hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={`row2-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;