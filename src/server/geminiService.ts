import { GoogleGenAI } from '@google/genai';
import { 
  disanRecords, 
  searchDisanArchive, 
  generateVerifiedAnswer 
} from '../utils/culturalGrounding';

export { disanRecords, searchDisanArchive, generateVerifiedAnswer };

// Build clean, privacy-compliant grounding context string
export const groundingContext = disanRecords.map(r => {
  return {
    ma_tu_lieu: r.ma_tu_lieu,
    ten_tu_lieu: r.ten_tu_lieu,
    loai_tu_lieu: r.loai_tu_lieu,
    thuc_hanh_di_san: r.thuc_hanh_di_san,
    ten_goi_ban_dia: r.ten_goi_ban_dia,
    chu_giai: r.chu_giai,
    vung_van_hoa: r.vung_van_hoa,
    cong_dong: r.cong_dong,
    dan_toc: r.dan_toc,
    dia_danh_hien_nay: r.dia_danh_hien_nay,
    dia_danh_tai_thoi_diem_tu_lieu: r.dia_danh_tai_thoi_diem_tu_lieu,
    mo_ta: r.mo_ta,
    ten_nguon: r.ten_nguon,
    tac_gia_hoac_co_quan: r.tac_gia_hoac_co_quan,
    url_nguon: r.url_nguon,
    trang_thai_xac_minh: r.trang_thai_xac_minh,
    nguoi_cung_cap: r.yeu_cau_giau_ten ? 'Người cung cấp tư liệu ẩn danh' : (r.nguoi_cung_cap || 'Chưa cập nhật'),
    pham_vi_su_dung: r.pham_vi_su_dung
  };
});

export async function processChatQuery(question: string) {
  const matchedRecords = searchDisanArchive(question);
  const ruleBasedResult = generateVerifiedAnswer(question, matchedRecords);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return ruleBasedResult;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const systemInstruction = `Bạn là "Trợ lý khám phá văn hóa Nghinh Ông", trợ lý chuyên môn hỗ trợ tra cứu hồ sơ số hóa di sản văn hóa Lễ hội Nghinh Ông Cần Giờ (Đề tài G02 - Sinh viên Trần Quang Đức, FPT Polytechnic x IMTA TECH).

RÀNG BUỘC BẮT BUỘC TUYỆT ĐỐI:
1. Bạn CHỈ ĐƯỢC PHÉP trả lời dựa trên dữ liệu có trong tệp disan.json và các nguồn đã được kiểm chứng dưới đây.
2. TUYỆT ĐỐI KHÔNG TỰ SUY ĐOÁN HOẶC BỊA THÔNG TIN.
3. KHÔNG ĐƯỢC TỰ BỔ SUNG NGHI LỄ, tên gọi bản địa, tên người cung cấp hoặc phong tục khi dữ liệu không có.
4. KHÔNG ĐƯỢC LẤY thông tin của cộng đồng hoặc vùng văn hóa khác để gán cho cộng đồng ngư dân Cần Giờ.
5. Nếu câu hỏi không tìm thấy thông tin xác thực trong dữ liệu, bạn BẮT BUỘC PHẢI TRẢ LỜI ĐÚNG NGUYÊN VĂN: "Hiện tại kho tư liệu chưa có thông tin xác thực về nội dung này."
6. TUYỆT ĐỐI KHÔNG TIẾT LỘ thông tin cá nhân của người cung cấp tư liệu nếu họ yêu cầu giấu tên (khi đó chỉ ghi: "Người cung cấp tư liệu ẩn danh").
7. KHÔNG SỬ DỤNG những phần tư liệu bị đánh dấu không được công bố.
8. MỖI CÂU TRẢ LỜI PHẢI KÈM TRÍCH DẪN THÔNG TIN BẢN GHI ĐÃ SỬ DỤNG nếu có (bao gồm mã tư liệu NG-..., tên tư liệu, cộng đồng, địa danh và nguồn tham khảo).

DỮ LIỆU KHO TƯ LIỆU DISAN.JSON:
${JSON.stringify(groundingContext, null, 2)}`;

    const userPrompt = `Người dùng hỏi: "${question}"

Hãy trả lời câu hỏi theo đúng các ràng buộc nghiêm ngặt ở trên. Nếu không tìm thấy thông tin trong dữ liệu, hãy trả lời chính xác: "Hiện tại kho tư liệu chưa có thông tin xác thực về nội dung này."`;

    const callGeminiPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
      }
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API timeout')), 4500)
    );

    const response = await Promise.race([callGeminiPromise, timeoutPromise]);

    const replyText = (response.text || '').trim();
    if (!replyText || replyText.includes('không có thông tin xác thực')) {
      if (matchedRecords.length > 0) {
        return ruleBasedResult;
      }
      return {
        answer: 'Hiện tại kho tư liệu chưa có thông tin xác thực về nội dung này.',
        citations: []
      };
    }

    // Collect citations
    const citations: any[] = [];
    for (const rec of disanRecords) {
      if (
        replyText.includes(rec.ma_tu_lieu) ||
        replyText.toLowerCase().includes(rec.ten_tu_lieu.toLowerCase()) ||
        question.toLowerCase().includes(rec.ma_tu_lieu.toLowerCase())
      ) {
        citations.push({
          ma_tu_lieu: rec.ma_tu_lieu,
          ten_tu_lieu: rec.ten_tu_lieu,
          cong_dong: rec.cong_dong || 'Cộng đồng ngư dân Cần Giờ',
          dia_danh: rec.dia_danh_hien_nay,
          ten_nguon: rec.ten_nguon || 'Hồ sơ di sản văn hóa phi vật thể'
        });
        if (citations.length >= 4) break;
      }
    }

    if (citations.length === 0 && matchedRecords.length > 0) {
      citations.push(...ruleBasedResult.citations);
    }

    return {
      answer: replyText,
      citations
    };
  } catch (err: any) {
    console.warn('Using rule-based verified grounding:', err.message || err);
    return ruleBasedResult;
  }
}
