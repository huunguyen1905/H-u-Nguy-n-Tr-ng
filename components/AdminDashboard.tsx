
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Service, Lead, Project, NewsItem, AdminView, LeadStatus } from '../types';
import { getServices, saveServices, getProjects, saveProjects, getNews, saveNews, getLeads, updateLead } from '../services/storage';
import { updateCloudServices, updateCloudProjects, updateCloudNews } from '../services/googleSheetService';
import { generateServiceDescription } from '../services/geminiService';
import { Trash2, Edit, Plus, X, Sparkles, LogOut, Loader2, Home, CheckCircle, Clock, XCircle, AlertCircle, Users, TrendingUp, BarChart3, Briefcase, FileText, Calendar, Image as ImageIcon, RefreshCw, Cloud } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const SkeletonRow = () => (
  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-pulse h-full flex flex-col mb-4">
    <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
  </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [view, setView] = useState<AdminView>(AdminView.LEADS);
  
  // Data States
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  
  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false); // New state for cloud sync status
  
  // Edit Form States (Generic)
  const [editingType, setEditingType] = useState<'SERVICE' | 'PROJECT' | 'NEWS' | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Load local data immediately
      setServices(getServices());
      setProjects(getProjects());
      setNews(getNews());
      setLeads(getLeads());
      setIsLoading(false);
    };
    loadData();
  }, []);

  // --- Handlers ---

  // Delete Handlers
  const handleDelete = async (type: 'SERVICE' | 'PROJECT' | 'NEWS', id: string) => {
    if (!confirm('Bạn có chắc muốn xóa mục này? Hành động này sẽ đồng bộ lên Cloud.')) return;
    
    setIsSyncing(true);

    if (type === 'SERVICE') {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      saveServices(updated);
      await updateCloudServices(updated);
    } else if (type === 'PROJECT') {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveProjects(updated);
      await updateCloudProjects(updated);
    } else if (type === 'NEWS') {
      const updated = news.filter(n => n.id !== id);
      setNews(updated);
      saveNews(updated);
      await updateCloudNews(updated);
    }

    setIsSyncing(false);
  };

  // Open Edit Modal
  const openModal = (type: 'SERVICE' | 'PROJECT' | 'NEWS', item?: any) => {
    setEditingType(type);
    setFormData(item || {}); // Empty object for new item
    setIsEditing(true);
  };

  // Save Handler
  const handleSave = async () => {
    setIsEditing(false); // Close modal immediately for better UX
    setIsSyncing(true);  // Start syncing indicator

    try {
        if (editingType === 'SERVICE') {
            const newService: Service = {
                id: formData.id || Date.now().toString(),
                title: formData.title,
                description: formData.description,
                icon: 'Star',
                imageUrl: formData.imageUrl || `https://picsum.photos/800/600?random=${Date.now()}`
            };
            const updated = formData.id 
                ? services.map(s => s.id === formData.id ? newService : s)
                : [...services, newService];
            setServices(updated);
            saveServices(updated);
            await updateCloudServices(updated); // Sync to Cloud

        } else if (editingType === 'PROJECT') {
            const newProject: Project = {
                id: formData.id || Date.now().toString(),
                title: formData.title,
                client: formData.client,
                category: formData.category,
                result: formData.result,
                description: formData.description,
                imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800`
            };
            const updated = formData.id
                ? projects.map(p => p.id === formData.id ? newProject : p)
                : [...projects, newProject];
            setProjects(updated);
            saveProjects(updated);
            await updateCloudProjects(updated); // Sync to Cloud

        } else if (editingType === 'NEWS') {
            const newNews: NewsItem = {
                id: formData.id || Date.now().toString(),
                title: formData.title,
                category: formData.category,
                summary: formData.summary,
                date: formData.date || new Date().toISOString().split('T')[0],
                imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800`
            };
            const updated = formData.id
                ? news.map(n => n.id === formData.id ? newNews : n)
                : [newNews, ...news]; // Add new news to top
            setNews(updated);
            saveNews(updated);
            await updateCloudNews(updated); // Sync to Cloud
        }
    } catch (error) {
        console.error("Error saving/syncing:", error);
        alert("Lỗi đồng bộ Cloud. Dữ liệu đã được lưu cục bộ.");
    } finally {
        setIsSyncing(false);
        setFormData({});
        setEditingType(null);
    }
  };

  // Gemini AI Helper
  const handleGenerateAI = async () => {
    if (!formData.title) {
      alert("Vui lòng nhập tiêu đề trước.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateServiceDescription(formData.title);
    setFormData((prev: any) => ({ ...prev, description: desc, summary: desc })); // Apply to description or summary depending on type
    setIsGenerating(false);
  };

  // Lead Status
  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
      const lead = leads.find(l => l.id === leadId);
      if (lead) {
          const updatedLead = { ...lead, status: newStatus };
          updateLead(updatedLead);
          setLeads(prev => prev.map(l => l.id === leadId ? updatedLead : l));
      }
  };

  // --- Stats ---
  const newLeadsCount = leads.filter(l => l.status === LeadStatus.NEW).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans cursor-default">
      {/* Global Sync Indicator */}
      {isSyncing && (
          <div className="fixed bottom-4 right-4 bg-brand-yellow text-black px-4 py-2 rounded shadow-lg z-50 flex items-center gap-2 font-bold animate-in slide-in-from-bottom-5">
              <RefreshCw className="animate-spin" size={16} /> Đang đồng bộ Cloud...
          </div>
      )}

      {/* Sidebar */}
      <div className="flex h-screen flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-black border-r border-gray-800 flex flex-col shrink-0 z-20">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-2xl font-black text-brand-yellow flex items-center gap-2">
               DUHAVA <span className="text-xs bg-gray-800 text-gray-400 px-1 rounded">ADMIN</span>
            </h2>
          </div>
          <nav className="flex-1 p-4 space-y-2 overflow-x-auto md:overflow-visible flex md:flex-col gap-2">
            <button onClick={() => navigate('/')} className="w-full text-left px-4 py-3 rounded font-bold text-white hover:bg-gray-800 flex items-center gap-3 mb-4 border border-gray-700 shrink-0">
              <Home size={20} className="text-brand-yellow" /> <span className="hidden md:inline">Về Trang Chủ</span>
            </button>

            <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:block">Quản Lý</div>

            {/* Leads Tab */}
            <button onClick={() => setView(AdminView.LEADS)} className={`w-full text-left px-4 py-3 rounded font-bold shrink-0 flex justify-between items-center ${view === AdminView.LEADS ? 'bg-brand-yellow text-black shadow-glow' : 'text-gray-400 hover:bg-gray-800'}`}>
              <div className="flex items-center gap-3"><Users size={18} /> <span>Leads</span></div>
              {newLeadsCount > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full animate-pulse">{newLeadsCount}</span>}
            </button>
            
            {/* Services Tab */}
            <button onClick={() => setView(AdminView.SERVICES)} className={`w-full text-left px-4 py-3 rounded font-bold shrink-0 flex items-center gap-3 ${view === AdminView.SERVICES ? 'bg-brand-yellow text-black' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Sparkles size={18} /> Dịch Vụ
            </button>

            {/* Projects Tab */}
            <button onClick={() => setView(AdminView.PROJECTS)} className={`w-full text-left px-4 py-3 rounded font-bold shrink-0 flex items-center gap-3 ${view === AdminView.PROJECTS ? 'bg-brand-yellow text-black' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Briefcase size={18} /> Dự Án
            </button>

            {/* News Tab */}
            <button onClick={() => setView(AdminView.NEWS)} className={`w-full text-left px-4 py-3 rounded font-bold shrink-0 flex items-center gap-3 ${view === AdminView.NEWS ? 'bg-brand-yellow text-black' : 'text-gray-400 hover:bg-gray-800'}`}>
              <FileText size={18} /> Tin Tức
            </button>
          </nav>
          <div className="p-4 border-t border-gray-800 hidden md:block">
            <button onClick={onLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400 font-bold w-full px-4 py-2 bg-red-500/5 hover:bg-red-500/10 rounded transition-colors">
              <LogOut size={18} /> Đăng Xuất
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative bg-gradient-to-br from-gray-900 to-black">
          {/* Mobile Header Actions */}
          <div className="md:hidden flex justify-end mb-4">
               <button onClick={onLogout} className="text-red-500 flex items-center gap-1 font-bold border border-red-900 p-2 rounded bg-red-900/20"><LogOut size={16} /> Logout</button>
          </div>

          {/* --- SERVICES VIEW --- */}
          {view === AdminView.SERVICES && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-white">Quản Lý Dịch Vụ</h1>
                <button onClick={() => openModal('SERVICE')} className="bg-brand-yellow text-black px-4 py-2 rounded font-bold flex items-center gap-2"><Plus size={18}/> Thêm Mới</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isLoading ? Array(3).fill(0).map((_,i) => <SkeletonRow key={i}/>) : services.map(s => (
                    <div key={s.id} className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-brand-yellow/50 transition-all">
                        <div className="h-32 rounded-lg bg-gray-700 mb-4 overflow-hidden"><img src={s.imageUrl} className="w-full h-full object-cover"/></div>
                        <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{s.description}</p>
                        <div className="flex gap-2">
                            <button onClick={() => openModal('SERVICE', s)} className="flex-1 bg-gray-700 hover:bg-blue-600 py-2 rounded text-xs font-bold">Sửa</button>
                            <button onClick={() => handleDelete('SERVICE', s.id)} className="flex-1 bg-gray-700 hover:bg-red-600 py-2 rounded text-xs font-bold">Xóa</button>
                        </div>
                    </div>
                ))}
              </div>
            </div>
          )}

          {/* --- PROJECTS VIEW --- */}
          {view === AdminView.PROJECTS && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-white">Quản Lý Dự Án</h1>
                <button onClick={() => openModal('PROJECT')} className="bg-brand-yellow text-black px-4 py-2 rounded font-bold flex items-center gap-2"><Plus size={18}/> Thêm Dự Án</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? Array(3).fill(0).map((_,i) => <SkeletonRow key={i}/>) : projects.map(p => (
                    <div key={p.id} className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-brand-yellow/50 transition-all">
                        <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                            <img src={p.imageUrl} className="w-full h-full object-cover"/>
                            <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">{p.category}</div>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{p.title}</h3>
                        <p className="text-brand-yellow text-sm font-bold mb-2">{p.client}</p>
                        <p className="text-green-400 text-xs font-bold mb-4 bg-green-400/10 inline-block px-2 py-1 rounded">Kết quả: {p.result}</p>
                        <div className="flex gap-2 mt-auto">
                            <button onClick={() => openModal('PROJECT', p)} className="flex-1 bg-gray-700 hover:bg-blue-600 py-2 rounded text-xs font-bold">Sửa</button>
                            <button onClick={() => handleDelete('PROJECT', p.id)} className="flex-1 bg-gray-700 hover:bg-red-600 py-2 rounded text-xs font-bold">Xóa</button>
                        </div>
                    </div>
                ))}
              </div>
            </div>
          )}

          {/* --- NEWS VIEW --- */}
          {view === AdminView.NEWS && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-white">Quản Lý Tin Tức</h1>
                <button onClick={() => openModal('NEWS')} className="bg-brand-yellow text-black px-4 py-2 rounded font-bold flex items-center gap-2"><Plus size={18}/> Viết Bài Mới</button>
              </div>
              <div className="space-y-4">
                {isLoading ? Array(3).fill(0).map((_,i) => <SkeletonRow key={i}/>) : news.map(n => (
                    <div key={n.id} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 flex flex-col md:flex-row gap-4 hover:bg-gray-800 transition-colors">
                        <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                            <img src={n.imageUrl} className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-brand-yellow/20 text-brand-yellow text-xs font-bold px-2 py-0.5 rounded uppercase">{n.category}</span>
                                <span className="text-gray-500 text-xs">{new Date(n.date).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">{n.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-4">{n.summary}</p>
                            <div className="flex gap-3">
                                <button onClick={() => openModal('NEWS', n)} className="text-blue-400 hover:text-blue-300 text-sm font-bold flex items-center gap-1"><Edit size={14}/> Sửa</button>
                                <button onClick={() => handleDelete('NEWS', n.id)} className="text-red-400 hover:text-red-300 text-sm font-bold flex items-center gap-1"><Trash2 size={14}/> Xóa</button>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
            </div>
          )}

          {/* --- LEADS VIEW --- */}
          {view === AdminView.LEADS && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl font-black text-white mb-6">CRM Dashboard</h1>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                      <div className="text-gray-400 text-xs uppercase font-bold">Leads Mới</div>
                      <div className="text-2xl font-black text-blue-400">{newLeadsCount}</div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                      <div className="text-gray-400 text-xs uppercase font-bold">Tổng Leads</div>
                      <div className="text-2xl font-black text-white">{leads.length}</div>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
                      <div className="text-gray-400 text-xs uppercase font-bold">Tỷ lệ chuyển đổi</div>
                      <div className="text-2xl font-black text-green-400">{leads.length > 0 ? Math.round((leads.filter(l=>l.status===LeadStatus.CLOSED).length/leads.length)*100) : 0}%</div>
                  </div>
              </div>

              <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-black/40 text-gray-400 uppercase text-xs font-bold border-b border-gray-700">
                      <tr>
                        <th className="p-4">Trạng Thái</th>
                        <th className="p-4">Tên & ID</th>
                        <th className="p-4">Liên Hệ</th>
                        <th className="p-4">Nhu Cầu</th>
                        <th className="p-4">Ngày</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                       {leads.map(lead => (
                           <tr key={lead.id} className="hover:bg-white/5">
                               <td className="p-4">
                                   <select 
                                      value={lead.status || LeadStatus.NEW} 
                                      onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                      className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs font-bold text-white focus:border-brand-yellow outline-none"
                                   >
                                       {Object.values(LeadStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                   </select>
                               </td>
                               <td className="p-4">
                                   <div className="font-bold text-white">{lead.name}</div>
                                   <div className="text-xs text-gray-500">#{lead.id.slice(-4)}</div>
                               </td>
                               <td className="p-4 text-sm text-gray-300">
                                   <div>{lead.phone}</div>
                                   <div className="text-gray-500">{lead.email}</div>
                               </td>
                               <td className="p-4 text-sm text-gray-400 max-w-xs truncate" title={lead.details}>{lead.details}</td>
                               <td className="p-4 text-xs text-gray-500 font-mono">{new Date(lead.createdAt).toLocaleDateString('vi-VN')}</td>
                           </tr>
                       ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- MODAL --- */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-2xl p-8 border border-gray-700 animate-in zoom-in-95 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
              <h3 className="text-2xl font-black text-white">
                {editingType === 'SERVICE' ? 'Dịch Vụ' : editingType === 'PROJECT' ? 'Dự Án' : 'Tin Tức'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
            </div>
            
            <div className="space-y-4">
               {/* Common: Title */}
               <div>
                  <label className="block text-xs font-bold text-brand-yellow uppercase mb-1">Tiêu Đề / Tên</label>
                  <input 
                    value={formData.title || ''} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-brand-yellow outline-none"
                    placeholder="Nhập tiêu đề..."
                  />
               </div>

               {/* Specific Fields */}
               {editingType === 'PROJECT' && (
                   <div className="grid grid-cols-2 gap-4">
                       <div>
                           <label className="block text-xs font-bold text-brand-yellow uppercase mb-1">Khách Hàng (Client)</label>
                           <input value={formData.client || ''} onChange={e => setFormData({...formData, client: e.target.value})} className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-brand-yellow outline-none"/>
                       </div>
                       <div>
                           <label className="block text-xs font-bold text-brand-yellow uppercase mb-1">Kết Quả (Result)</label>
                           <input value={formData.result || ''} onChange={e => setFormData({...formData, result: e.target.value})} className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-brand-yellow outline-none" placeholder="VD: +200% Leads"/>
                       </div>
                   </div>
               )}

               {(editingType === 'PROJECT' || editingType === 'NEWS') && (
                   <div>
                      <label className="block text-xs font-bold text-brand-yellow uppercase mb-1">Danh Mục (Category)</label>
                      <input value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-brand-yellow outline-none"/>
                   </div>
               )}

               {/* Content / Description */}
               <div>
                  <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-bold text-brand-yellow uppercase">
                          {editingType === 'NEWS' ? 'Tóm Tắt Nội Dung' : 'Mô Tả Chi Tiết'}
                      </label>
                      <button onClick={handleGenerateAI} className="text-[10px] flex items-center gap-1 text-brand-yellow border border-brand-yellow px-2 py-0.5 rounded hover:bg-brand-yellow hover:text-black transition-colors">
                          {isGenerating ? <Loader2 className="animate-spin w-3 h-3"/> : <Sparkles size={12}/>} AI Writer
                      </button>
                  </div>
                  <textarea 
                    rows={5}
                    value={(editingType === 'NEWS' ? formData.summary : formData.description) || ''} 
                    onChange={e => editingType === 'NEWS' ? setFormData({...formData, summary: e.target.value}) : setFormData({...formData, description: e.target.value})}
                    className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-brand-yellow outline-none"
                  ></textarea>
               </div>

               {/* Image URL */}
               <div>
                  <label className="block text-xs font-bold text-brand-yellow uppercase mb-1">Link Ảnh (URL)</label>
                  <div className="flex gap-2">
                      <div className="flex-1">
                        <input value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-black border border-gray-700 p-3 rounded text-white focus:border-brand-yellow outline-none font-mono text-xs"/>
                      </div>
                      {formData.imageUrl && <img src={formData.imageUrl} className="w-12 h-12 object-cover rounded border border-gray-700"/>}
                  </div>
               </div>
            </div>

            <div className="mt-8 flex justify-end gap-4 pt-4 border-t border-gray-800">
              <button onClick={() => setIsEditing(false)} className="px-6 py-3 rounded text-gray-400 hover:text-white font-bold hover:bg-gray-800">Hủy</button>
              <button onClick={handleSave} className="bg-brand-yellow text-black px-8 py-3 rounded font-bold hover:bg-white hover:scale-105 transition-all">
                  {isSyncing ? 'Đang Lưu...' : 'Lưu & Đồng Bộ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
