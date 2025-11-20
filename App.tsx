
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ContactModal from './components/ContactModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import CTASection from './components/CTASection';
import FeaturedProjects from './components/FeaturedProjects';
import NewsSection from './components/NewsSection'; // Imported NewsSection
import FadeIn from './components/FadeIn';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import FAQ from './components/FAQ';
import SmoothScroll from './components/SmoothScroll';
import { getServices, getProjects, getNews, saveServices, saveProjects, saveNews } from './services/storage'; // Added News imports
import { fetchCloudData } from './services/googleSheetService';
import { Service, Project, NewsItem } from './types'; // Added NewsItem
import { ArrowLeft } from 'lucide-react';

// Admin Login Component
const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4 relative cursor-default">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-brand-yellow transition-colors font-bold uppercase tracking-wider z-50 group"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" /> 
        <span>Về Trang Chủ</span>
      </button>

      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-md text-center relative animate-in fade-in zoom-in duration-500 shadow-2xl z-10">
        <div className="w-20 h-20 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-yellow ring-1 ring-brand-yellow/30">
           <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </div>
        <h2 className="text-3xl font-black text-white mb-3 uppercase tracking-tight">Khu Vực Quản Trị</h2>
        <p className="text-gray-500 text-sm mb-8">Hệ thống dành riêng cho quản trị viên DUHAVA</p>
        <LoginForm onLogin={() => {
            onLogin();
            navigate('/admin');
        }} />
      </div>
    </div>
  );
};

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);
    const handleLogin = () => {
        if (pass === 'Huu12345@') {
            onLogin();
        } else {
            setError(true);
            setPass('');
        }
    };
    return (
        <>
            <input 
            type="password" 
            value={pass} 
            onChange={(e) => { setPass(e.target.value); setError(false); }} 
            onKeyDown={(e) => { if(e.key === 'Enter') handleLogin(); }}
            placeholder="Nhập mật khẩu truy cập..."
            className={`w-full bg-black border ${error ? 'border-red-500' : 'border-gray-700'} p-4 rounded-lg text-white mb-4 focus:border-brand-yellow outline-none transition-all focus:shadow-[0_0_20px_rgba(250,204,21,0.15)] placeholder-gray-600 text-center tracking-widest`}
            autoFocus
            />
            {error && <p className="text-red-500 text-xs mb-4">Mật khẩu không chính xác</p>}
            <button onClick={handleLogin} className="w-full bg-brand-yellow text-black font-black py-4 rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-brand-yellow/20 transform hover:scale-[1.02] uppercase tracking-wide">Đăng Nhập Hệ Thống</button>
        </>
    )
}

interface LandingPageProps {
    onUnlockAdmin: () => void;
    services: Service[];
    projects: Project[];
    news: NewsItem[];
}

const LandingPage: React.FC<LandingPageProps> = ({ onUnlockAdmin, services, projects, news }) => {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenAdmin = () => {
      onUnlockAdmin();
      navigate('/admin-login');
  };

  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black md:cursor-none">
      <CustomCursor />
      
      {/* Navbar should be OUTSIDE SmoothScroll to remain effectively fixed on top of the viewport */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      
      <SmoothScroll>
        <Hero onCtaClick={() => setIsContactOpen(true)} />
        
        <div className="bg-brand-yellow py-4 overflow-hidden whitespace-nowrap border-y-4 border-black relative z-10">
            <div className="inline-flex animate-scroll-right items-center gap-16 text-brand-black font-black text-xl uppercase tracking-widest">
                <span>Google Partner Premium</span><span>•</span><span>Meta Business Partner</span><span>•</span>
                <span>HubSpot Certified Agency</span><span>•</span><span>TikTok Marketing Partner</span><span>•</span>
                <span>Google Partner Premium</span><span>•</span><span>Meta Business Partner</span><span>•</span>
                <span>HubSpot Certified Agency</span><span>•</span><span>TikTok Marketing Partner</span>
            </div>
        </div>

        <Services services={services} onCtaClick={() => setIsContactOpen(true)} />
        
        <FeaturedProjects projects={projects} />

        <Process />
        
        <section id="results" className="py-20 bg-brand-dark border-y border-gray-800 relative z-10">
            <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <FadeIn delay={0}><div className="text-4xl md:text-6xl font-black text-white mb-2">500+</div><div className="text-brand-yellow font-bold uppercase text-sm">Dự Án Thành Công</div></FadeIn>
                <FadeIn delay={100}><div className="text-4xl md:text-6xl font-black text-white mb-2">200%</div><div className="text-brand-yellow font-bold uppercase text-sm">Tăng Trưởng TB</div></FadeIn>
                <FadeIn delay={200}><div className="text-4xl md:text-6xl font-black text-white mb-2">10+</div><div className="text-brand-yellow font-bold uppercase text-sm">Năm Kinh Nghiệm</div></FadeIn>
                <FadeIn delay={300}><div className="text-4xl md:text-6xl font-black text-white mb-2">24/7</div><div className="text-brand-yellow font-bold uppercase text-sm">Hỗ Trợ Tận Tâm</div></FadeIn>
            </div>
        </section>

        <Testimonials />
        
        <NewsSection news={news} />

        <FAQ />
        <CTASection onCtaClick={() => setIsContactOpen(true)} />
        <Footer onOpenAdmin={handleOpenAdmin} />
      </SmoothScroll>
      
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // 1. Load data immediately from LocalStorage (Instant UI)
    setServices(getServices());
    setProjects(getProjects());
    setNews(getNews());

    // 2. Fetch fresh data from Google Sheets (Background Sync)
    fetchCloudData().then(data => {
        if (data) {
            console.log("Cloud data fetched:", data);
            if (data.services && Array.isArray(data.services) && data.services.length > 0) {
                setServices(data.services);
                saveServices(data.services); // Sync back to LocalStorage
            }
            if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
                setProjects(data.projects);
                saveProjects(data.projects);
            }
            if (data.news && Array.isArray(data.news) && data.news.length > 0) {
                setNews(data.news);
                saveNews(data.news);
            }
        }
    });
  }, []);

  const handleLogin = () => {
      setIsAuthenticated(true);
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
  };

  if (loading) {
      return <Preloader onFinish={() => setLoading(false)} />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage onUnlockAdmin={() => {}} services={services} projects={projects} news={news} />} />
        <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route 
            path="/admin" 
            element={isAuthenticated ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/admin-login" />} 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
