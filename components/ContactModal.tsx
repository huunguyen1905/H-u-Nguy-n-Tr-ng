import React, { useState } from 'react';
import { X } from 'lucide-react';
import { saveLead } from '../services/storage';
import { submitToGoogleSheet } from '../services/googleSheetService';
import { Lead } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const newLead: Lead = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    // 1. Lưu vào Local Storage (để hiện trong Admin Dashboard)
    saveLead(newLead);

    // 2. Gửi lên Google Sheet
    await submitToGoogleSheet(newLead);

    setIsSending(false);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', details: '' });
      onClose();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-brand-dark border border-brand-gray w-full max-w-lg rounded-xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X size={24} />
        </button>

        {submitted ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Thành Công!</h3>
            <p className="text-gray-400">Chuyên gia của DUHAVA sẽ liên hệ với bạn trong vòng 30 phút.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase mb-2">Nhận Tư Vấn Chiến Lược</h2>
              <p className="text-gray-400 text-sm">Điền thông tin bên dưới để nhận bản kế hoạch tăng trưởng miễn phí.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Họ và Tên</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-brand-gray border border-gray-700 rounded p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                  placeholder="Nguyễn Văn A"
                  disabled={isSending}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-brand-gray border border-gray-700 rounded p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                    placeholder="email@vidu.com"
                    disabled={isSending}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Số Điện Thoại</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-brand-gray border border-gray-700 rounded p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                    placeholder="090 xxx xxxx"
                    disabled={isSending}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nhu Cầu Của Bạn</label>
                <textarea 
                  name="details"
                  rows={3}
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full bg-brand-gray border border-gray-700 rounded p-3 text-white focus:border-brand-yellow focus:outline-none transition-colors"
                  placeholder="Tôi muốn tăng doanh số bán hàng online..."
                  disabled={isSending}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSending}
                className={`w-full bg-brand-yellow text-brand-black font-black uppercase py-4 rounded hover:bg-white transition-all shadow-lg ${isSending ? 'opacity-70 cursor-wait' : ''}`}
              >
                {isSending ? 'Đang Gửi...' : 'Gửi Thông Tin Ngay'}
              </button>
              
              <p className="text-[10px] text-center text-gray-600">
                Thông tin của bạn được bảo mật tuyệt đối. Chúng tôi ghét spam.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;