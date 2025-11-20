import React from 'react';
import { Search, Map, Zap, TrendingUp } from 'lucide-react';
import FadeIn from './FadeIn';

const steps = [
  {
    id: '01',
    title: 'Khám Phá',
    icon: <Search className="w-8 h-8" />,
    description: 'Nghiên cứu sâu sắc thị trường, đối thủ và insight khách hàng để tìm ra cơ hội đột phá.'
  },
  {
    id: '02',
    title: 'Chiến Lược',
    icon: <Map className="w-8 h-8" />,
    description: 'Hoạch định lộ trình tăng trưởng chi tiết, lựa chọn kênh marketing tối ưu nhất.'
  },
  {
    id: '03',
    title: 'Thực Thi',
    icon: <Zap className="w-8 h-8" />,
    description: 'Triển khai chiến dịch với đội ngũ chuyên gia, tối ưu hóa liên tục theo thời gian thực.'
  },
  {
    id: '04',
    title: 'Tăng Trưởng',
    icon: <TrendingUp className="w-8 h-8" />,
    description: 'Báo cáo minh bạch, đo lường ROI và mở rộng quy mô chiến thắng.'
  }
];

const Process: React.FC = () => {
  return (
    <section className="bg-brand-dark py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <FadeIn>
            <div className="text-center mb-20">
                <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Quy Trình Làm Việc</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Từ Tư Duy <span className="text-gray-500">Đến Kết Quả</span>
                </h3>
            </div>
        </FadeIn>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gray-800 z-0"></div>

          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 150} className="relative z-10 h-full">
                <div className="group h-full">
                <div className="flex flex-col items-center text-center h-full">
                    {/* Icon Circle */}
                    <div className="w-24 h-24 rounded-full bg-brand-black border-2 border-gray-800 flex items-center justify-center mb-8 group-hover:border-brand-yellow group-hover:shadow-[0_0_30px_rgba(250,204,21,0.3)] transition-all duration-500 relative">
                        <div className="text-white group-hover:text-brand-yellow transition-colors duration-300">
                            {step.icon}
                        </div>
                        {/* Step Number Badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-yellow text-brand-black font-bold rounded-full flex items-center justify-center text-sm">
                            {step.id}
                        </div>
                    </div>

                    <h4 className="text-xl font-bold text-white uppercase mb-4 group-hover:text-brand-yellow transition-colors">
                    {step.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed px-2">
                    {step.description}
                    </p>
                </div>
                </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;