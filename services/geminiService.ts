import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

export const generateServiceDescription = async (title: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing via process.env.API_KEY");
    return "Vui lòng cấu hình API Key để sử dụng tính năng tạo nội dung tự động.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Viết một đoạn mô tả ngắn (khoảng 2-3 câu), hấp dẫn, chuyên nghiệp và mang tính thuyết phục cao cho dịch vụ "${title}" của công ty Digital Marketing DUHAVA. Giọng văn mạnh mẽ, đẳng cấp. Tiếng Việt.`,
    });

    return response.text || "Không thể tạo nội dung.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi gọi AI. Vui lòng thử lại.";
  }
};