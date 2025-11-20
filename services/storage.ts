import { Service, Lead, Project, NewsItem } from '../types';

const SERVICES_KEY = 'duhava_services';
const PROJECTS_KEY = 'duhava_projects';
const LEADS_KEY = 'duhava_leads';
const NEWS_KEY = 'duhava_news';

const DEFAULT_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Tối Ưu Hóa SEO',
    description: 'Đưa website của bạn lên top 1 Google. Chúng tôi không chỉ mang lại lưu lượng truy cập, chúng tôi mang lại doanh thu thực sự.',
    icon: 'ChartBarIcon',
    imageUrl: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: '2',
    title: 'Quảng Cáo Đa Kênh',
    description: 'Chiến lược Facebook & Google Ads nhắm đúng mục tiêu, tối ưu chi phí chuyển đổi với ROI khủng.',
    icon: 'CurrencyDollarIcon',
    imageUrl: 'https://picsum.photos/800/600?random=2'
  },
  {
    id: '3',
    title: 'Thiết Kế Web Đẳng Cấp',
    description: 'Giao diện website chuẩn UX/UI, tốc độ tải trang siêu tốc, tối ưu hóa tỷ lệ chuyển đổi khách hàng.',
    icon: 'DesktopComputerIcon',
    imageUrl: 'https://picsum.photos/800/600?random=3'
  },
  {
    id: '4',
    title: 'Xây Dựng Thương Hiệu',
    description: 'Kể câu chuyện thương hiệu của bạn theo cách độc đáo nhất. Logo, nhận diện thương hiệu và chiến lược định vị.',
    icon: 'SparklesIcon',
    imageUrl: 'https://picsum.photos/800/600?random=4'
  }
];

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    category: 'Rebranding & Website',
    client: 'LUXURY ESTATE VN',
    title: 'Tái định vị thương hiệu Bất Động Sản Hạng Sang',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    result: '+150% Leads',
    description: 'Chúng tôi đã thực hiện một cuộc cách mạng về hình ảnh cho Luxury Estate VN, từ logo, bộ nhận diện thương hiệu đến website trải nghiệm 3D. Kết quả là lượng khách hàng tiềm năng tăng vọt nhờ sự tin tưởng vào hình ảnh chuyên nghiệp.'
  },
  {
    id: '2',
    category: 'Performance Marketing',
    client: 'TECH MASTER',
    title: 'Chiến dịch ra mắt sản phẩm công nghệ AI',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    result: 'ROI 400%',
    description: 'Sử dụng chiến lược đa kênh (Facebook, Google, TikTok), chúng tôi đã tiếp cận đúng đối tượng yêu thích công nghệ. Tối ưu hóa CPA hàng ngày giúp khách hàng đạt mức lợi nhuận trên chi phí quảng cáo (ROAS) kỷ lục.'
  },
  {
    id: '3',
    category: 'Social Media Growth',
    client: 'FASHION WEEK',
    title: 'Phủ sóng thương hiệu thời trang GenZ',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    result: '2M+ Reach',
    description: 'Xây dựng tuyến nội dung viral video và hợp tác với 50+ KOCs. Thương hiệu đã trở thành xu hướng trên TikTok chỉ sau 2 tuần triển khai chiến dịch.'
  }
];

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Xu hướng Marketing 2024: AI lên ngôi',
    category: 'Insight',
    summary: 'Trí tuệ nhân tạo đang thay đổi cách chúng ta làm nội dung và quảng cáo như thế nào? Cùng DUHAVA phân tích.',
    date: '2024-03-15',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'DUHAVA trở thành đối tác chiến lược của Google',
    category: 'Company News',
    summary: 'Một cột mốc quan trọng khẳng định vị thế và năng lực triển khai các chiến dịch quy mô lớn của chúng tôi.',
    date: '2024-03-10',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: '5 Cách tăng tỷ lệ chuyển đổi cho Website Bán Hàng',
    category: 'Tips & Tricks',
    summary: 'Tối ưu UX/UI, tốc độ tải trang và CTA là những yếu tố then chốt bạn không thể bỏ qua.',
    date: '2024-03-01',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  }
];

// Services
export const getServices = (): Service[] => {
  const stored = localStorage.getItem(SERVICES_KEY);
  if (!stored) {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(DEFAULT_SERVICES));
    return DEFAULT_SERVICES;
  }
  return JSON.parse(stored);
};

export const saveServices = (services: Service[]) => {
  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
};

// Projects
export const getProjects = (): Project[] => {
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (!stored) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(DEFAULT_PROJECTS));
    return DEFAULT_PROJECTS;
  }
  return JSON.parse(stored);
};

export const saveProjects = (projects: Project[]) => {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

// News
export const getNews = (): NewsItem[] => {
  const stored = localStorage.getItem(NEWS_KEY);
  if (!stored) {
    localStorage.setItem(NEWS_KEY, JSON.stringify(DEFAULT_NEWS));
    return DEFAULT_NEWS;
  }
  return JSON.parse(stored);
};

export const saveNews = (news: NewsItem[]) => {
  localStorage.setItem(NEWS_KEY, JSON.stringify(news));
};

// Leads
export const getLeads = (): Lead[] => {
  const stored = localStorage.getItem(LEADS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveLead = (lead: Lead) => {
  const leads = getLeads();
  const newLeads = [lead, ...leads];
  localStorage.setItem(LEADS_KEY, JSON.stringify(newLeads));
};

export const updateLead = (updatedLead: Lead) => {
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === updatedLead.id);
  if (index !== -1) {
    leads[index] = updatedLead;
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  }
};