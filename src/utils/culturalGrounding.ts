import { disanData } from '../data/disanData';

export const disanRecords = disanData;

// High-precision keyword dictionary for cultural grounding
export function searchDisanArchive(question: string) {
  const q = question.toLowerCase();

  // Stop-words and generic words that should not trigger false positive matches
  const stopWords = new Set(['lễ', 'hội', 'ở', 'đâu', 'là', 'gì', 'thế', 'nào', 'có', 'và', 'của', 'như', 'diễn', 'ra', 'khi', 'ai', 'cho', 'về', 'trong']);

  // Check if query is about the Cần Giờ Nghinh Ông heritage scope
  const hasDomainKeyword = 
    q.includes('nghinh ông') ||
    q.includes('cần giờ') ||
    q.includes('cần thạnh') ||
    q.includes('cá ông') ||
    q.includes('nam hải') ||
    q.includes('thủy tướng') ||
    q.includes('lăng ông') ||
    q.includes('bả trạo') ||
    q.includes('rừng sác') ||
    q.includes('tiền hiền') ||
    q.includes('hậu hiền') ||
    q.includes('hoa đăng') ||
    q.includes('đoàn thuyền') ||
    q.includes('thượng cờ') ||
    q.includes('đại kỳ') ||
    q.includes('khởi vượng tinh hoa') ||
    q.includes('ngư dân') ||
    q.includes('vạn chài') ||
    /ng-0(0[1-9]|1[0-5])/i.test(q);

  if (!hasDomainKeyword) {
    return [];
  }

  // Keyword mappings for common cultural concepts in Cần Giờ
  const scoredRecords = disanRecords.map(r => {
    let score = 0;
    const title = (r.ten_tu_lieu || '').toLowerCase();
    const code = (r.ma_tu_lieu || '').toLowerCase();
    const desc = (r.mo_ta || '').toLowerCase();
    const native = (r.ten_goi_ban_dia || '').toLowerCase();

    // Exact code match
    if (q.includes(code)) score += 60;

    // Direct title phrase matches
    if (q.includes(title)) score += 40;

    // Core concepts matching
    if ((q.includes('nguồn gốc') || q.includes('lịch sử') || q.includes('tổng quan')) && r.ma_tu_lieu === 'NG-001') {
      score += 35;
    }
    if ((q.includes('2026') || q.includes('mùa lễ 2026') || q.includes('năm 2026')) && r.ma_tu_lieu === 'NG-002') {
      score += 40;
    }
    if ((q.includes('tín ngưỡng') || q.includes('cá ông') || q.includes('nam hải') || q.includes('thờ cúng') || q.includes('ngư ông') || q.includes('cá voi')) && (r.ma_tu_lieu === 'NG-003' || r.ma_tu_lieu === 'NG-004')) {
      score += 30;
    }
    if ((q.includes('lăng ông') || q.includes('thủy tướng') || q.includes('cốt ông') || q.includes('bộ xương') || q.includes('1971') || q.includes('12m')) && r.ma_tu_lieu === 'NG-004') {
      score += 45;
    }
    if ((q.includes('trên biển') || q.includes('rước kiệu') || q.includes('ra khơi') || q.includes('xin keo') || q.includes('xuất hải')) && r.ma_tu_lieu === 'NG-005') {
      score += 40;
    }
    if ((q.includes('đoàn thuyền') || q.includes('ghe') || q.includes('tàu cá') || q.includes('kết đoàn')) && r.ma_tu_lieu === 'NG-006') {
      score += 40;
    }
    if ((q.includes('thượng cờ') || q.includes('đại kỳ') || q.includes('treo cờ')) && r.ma_tu_lieu === 'NG-007') {
      score += 40;
    }
    if ((q.includes('hoạt động của ngư dân') || q.includes('đời sống') || q.includes('bạn chài') || q.includes('bạn ghe')) && r.ma_tu_lieu === 'NG-008') {
      score += 40;
    }
    if ((q.includes('tiền hiền') || q.includes('hậu hiền') || q.includes('khai hoang') || q.includes('khai khẩn')) && r.ma_tu_lieu === 'NG-009') {
      score += 40;
    }
    if ((q.includes('nghĩa trang') || q.includes('đoàn 10') || q.includes('đặc công') || q.includes('liệt sĩ')) && (r.ma_tu_lieu === 'NG-010' || r.ma_tu_lieu === 'NG-011')) {
      score += 40;
    }
    if ((q.includes('hoa đăng') || q.includes('thả đèn')) && r.ma_tu_lieu === 'NG-012') {
      score += 40;
    }
    if ((q.includes('bả trạo') || q.includes('chèo cạn') || q.includes('tổng khoang') || q.includes('mái chèo')) && r.ma_tu_lieu === 'NG-013') {
      score += 45;
    }
    if ((q.includes('khởi vượng tinh hoa') || q.includes('sân khấu')) && r.ma_tu_lieu === 'NG-014') {
      score += 40;
    }
    if ((q.includes('cộng đồng tham gia') || q.includes('trò chơi dân gian')) && r.ma_tu_lieu === 'NG-015') {
      score += 35;
    }

    // Meaningful word overlaps
    const words = q.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
    for (const w of words) {
      if (title.includes(w)) score += 3;
      if (desc.includes(w)) score += 2;
      if (native.includes(w)) score += 3;
    }

    return { record: r, score };
  });

  scoredRecords.sort((a, b) => b.score - a.score);
  const best = scoredRecords.filter(item => item.score >= 25);
  return best.map(item => item.record);
}

export function generateVerifiedAnswer(question: string, matched: any[]) {
  if (!matched || matched.length === 0) {
    return {
      answer: 'Hiện tại kho tư liệu chưa có thông tin xác thực về nội dung này.',
      citations: []
    };
  }

  const primary = matched[0];
  const citations = matched.slice(0, 3).map(m => ({
    ma_tu_lieu: m.ma_tu_lieu,
    ten_tu_lieu: m.ten_tu_lieu,
    cong_dong: m.cong_dong || 'Cộng đồng ngư dân Cần Giờ',
    dia_danh: m.dia_danh_hien_nay,
    ten_nguon: m.ten_nguon || 'Hồ sơ khoa học di sản văn hóa phi vật thể'
  }));

  let responseBody = `Dựa trên hồ sơ số hóa di sản Lễ hội Nghinh Ông Cần Giờ:\n\n`;
  responseBody += `### **${primary.ten_tu_lieu}** (${primary.ma_tu_lieu})\n\n`;
  responseBody += `${primary.mo_ta}\n\n`;

  responseBody += `* **Thực hành di sản:** ${primary.thuc_hanh_di_san || 'Chưa cập nhật'}\n`;
  if (primary.ten_goi_ban_dia) {
    responseBody += `* **Tên gọi bản địa:** ${primary.ten_goi_ban_dia}${primary.chu_giai ? ` — *${primary.chu_giai}*` : ''}\n`;
  }
  responseBody += `* **Không gian địa bàn hiện nay:** ${primary.dia_danh_hien_nay}\n`;
  if (primary.dia_danh_tai_thoi_diem_tu_lieu) {
    responseBody += `* **Địa danh tại thời điểm tư liệu:** ${primary.dia_danh_tai_thoi_diem_tu_lieu}\n`;
  }
  responseBody += `* **Cộng đồng chủ thể:** ${primary.cong_dong || 'Cộng đồng ngư dân Cần Giờ'} (Dân tộc ${primary.dan_toc || 'Kinh'})\n`;
  responseBody += `* **Trạng thái kiểm chứng:** ${primary.trang_thai_xac_minh} (Theo nguồn: ${primary.ten_nguon || 'Hồ sơ lưu trữ'})\n`;

  if (matched.length > 1) {
    responseBody += `\n**Tư liệu liên quan trong hệ thống:**\n`;
    for (let i = 1; i < Math.min(matched.length, 3); i++) {
      const rel = matched[i];
      responseBody += `* **${rel.ma_tu_lieu} - ${rel.ten_tu_lieu}**: ${rel.mo_ta.slice(0, 140)}...\n`;
    }
  }

  return {
    answer: responseBody,
    citations
  };
}
