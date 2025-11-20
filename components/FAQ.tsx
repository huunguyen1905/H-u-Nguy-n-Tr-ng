import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import FadeIn from './FadeIn';

const faqs = [
  {
    question: "DUHAVA có cam kết KPI doanh số không?",
    answer: "Có. Chúng tôi làm việc dựa trên số liệu thực tế. Trước khi bắt đầu dự án, DUHAVA sẽ ký hợp đồng cam kết các chỉ số KPI rõ ràng (Traffic, Leads, Conversion Rate) và chịu trách nhiệm nếu không đạt được mục tiêu."
  },
  {
    question: "Chi phí dịch vụ được tính như thế nào?",
    answer: "Chúng tôi không có bảng giá cố định vì mỗi doanh nghiệp có vấn đề khác nhau. Sau khi tư vấn và audit hệ thống của bạn, chúng tôi sẽ đề xuất gói giải pháp tối ưu nhất với ngân sách của bạn."
  },
  {
    question: "Thời gian để thấy hiệu quả của chiến dịch SEO?",
    answer: "Thông thường, các chiến dịch SEO tổng thể cần từ 3-6 tháng để thấy sự tăng trưởng rõ rệt và bền vững. Tuy nhiên, với quảng cáo trả phí (Ads), bạn có thể thấy kết quả ngay lập tức."
  },
  {
    question: "Tôi có được xem báo cáo hàng ngày không?",
    answer: "Chắc chắn. DUHAVA cung cấp hệ thống báo cáo Real-time (thời gian thực). Bạn có thể truy cập vào Dashboard để xem chi tiêu và hiệu quả bất cứ lúc nào."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-brand-dark py-24 border-t border-gray-800">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn>
            <div className="text-center mb-16">
                <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Câu Hỏi Thường Gặp</h2>
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                    Giải Đáp <span className="text-gray-500">Thắc Mắc</span>
                </h3>
            </div>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 100} direction="up">
                <div 
                    className={`border rounded-lg transition-all duration-300 ${openIndex === index ? 'border-brand-yellow bg-gray-900' : 'border-gray-700 bg-transparent hover:border-gray-500'}`}
                >
                    <button 
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex justify-between items-center p-6 text-left focus:outline-none group"
                    >
                        <span className={`font-bold text-lg transition-colors ${openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                            {faq.question}
                        </span>
                        {openIndex === index ? 
                            <Minus className="text-brand-yellow flex-shrink-0" /> : 
                            <Plus className="text-gray-500 group-hover:text-brand-yellow flex-shrink-0 transition-colors" />
                        }
                    </button>
                    
                    <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <p className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-gray-800/50 mt-2">
                            {faq.answer}
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

export default FAQ;