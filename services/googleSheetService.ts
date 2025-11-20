
import { Lead, Service, Project, NewsItem } from '../types';

// LƯU Ý: Thay thế URL bên dưới bằng URL Web App mới của bạn sau khi deploy Google Apps Script
export const GOOGLE_SCRIPT_URL: string = 'https://script.google.com/macros/s/AKfycbyUiDZx1JogjF_lDbUFeJN3PTsLd9x53p6kJ-xcE9UnPnz6zHv7jReCVushTEhEdwf2FA/exec';

// --- PUBLIC API (FETCH) ---

// Lấy toàn bộ dữ liệu CMS từ Google Sheet về
export const fetchCloudData = async () => {
  try {
    // Thêm timestamp để tránh cache trình duyệt
    const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=get_all&t=${Date.now()}`);
    const data = await response.json();
    return data; // { services: [], projects: [], news: [] }
  } catch (error) {
    console.error('Error fetching cloud data:', error);
    return null;
  }
};

// --- ADMIN API (SYNC UP) ---

// 1. Gửi Lead (Append)
export const submitToGoogleSheet = async (lead: Lead) => {
  return sendDataToScript({ action: 'save_lead', ...lead });
};

// 2. Đồng bộ Dịch vụ (Overwrite)
export const updateCloudServices = async (services: Service[]) => {
  return sendDataToScript({ action: 'update_services', items: services });
};

// 3. Đồng bộ Dự án (Overwrite)
export const updateCloudProjects = async (projects: Project[]) => {
  return sendDataToScript({ action: 'update_projects', items: projects });
};

// 4. Đồng bộ Tin tức (Overwrite)
export const updateCloudNews = async (news: NewsItem[]) => {
  return sendDataToScript({ action: 'update_news', items: news });
};

// Helper function để gửi POST request
const sendDataToScript = async (payload: any) => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script yêu cầu no-cors cho POST đơn giản
      headers: {
        'Content-Type': 'text/plain', // Quan trọng: tránh preflight OPTIONS request
      },
      body: JSON.stringify(payload),
    });
    console.log('Data synced to cloud successfully:', payload.action);
    return true;
  } catch (error) {
    console.error(`Error syncing ${payload.action}:`, error);
    return false;
  }
};
