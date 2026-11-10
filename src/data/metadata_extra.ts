import { RitualStep, OfficialSource, CommunityContributor } from '../types/disan';

export const OFFICIAL_SOURCES: OfficialSource[] = [
  {
    id: 'src-1',
    ten_nguon: 'Quyết định số 3822/QĐ-BVHTTDL đưa Lễ hội Nghinh Ông Cần Giờ vào Danh mục Di sản văn hóa phi vật thể quốc gia',
    co_quan: 'Cục Di sản văn hóa - Bộ Văn hóa, Thể thao và Du lịch',
    loai_nguon: 'Chính thống',
    cong_dong_va_dia_ban: 'Cộng đồng ngư dân huyện Cần Giờ, Thành phố Hồ Chí Minh',
    url: 'https://dsvh.gov.vn/danh-muc-di-san-van-hoa-phi-vat-the-quoc-gia-1789',
    ngay_truy_cap: '2026-10-20',
    trang_thai_doi_chieu: 'Đã đối chiếu với Cổng thông tin Sở VHTT TP.HCM',
    ghi_chu: 'Nguồn văn bản pháp lý quốc gia công nhận di sản năm 2013.'
  },
  {
    id: 'src-2',
    ten_nguon: 'Đề nghị đưa Lễ hội Nghinh Ông huyện Cần Giờ vào danh mục di sản quốc gia',
    co_quan: 'Sở Văn hóa và Thể thao Thành phố Hồ Chí Minh',
    loai_nguon: 'Chính thống',
    cong_dong_va_dia_ban: 'Cộng đồng ngư dân Cần Giờ - Thị trấn Cần Thạnh',
    url: 'https://svhtt.hochiminhcity.gov.vn/tin-chi-tiet/-/chi-tiet/%C4%91e-nghi-%C4%91ua-le-hoi-nghinh-ong-huyen-can-gio-vao-danh-muc-di-san-quoc-gia-19487-1953.html',
    ngay_truy_cap: '2026-10-21',
    trang_thai_doi_chieu: 'Đã đối chiếu với Hồ sơ khoa học di tích Lăng Ông Thủy Tướng',
    ghi_chu: 'Hồ sơ chuyên ngành văn hóa của cơ quan chủ quản TP.HCM.'
  },
  {
    id: 'src-3',
    ten_nguon: 'Phát huy giá trị văn hóa truyền thống của Lễ hội Nghinh Ông',
    co_quan: 'Báo điện tử Chính phủ (Cổng Thông tin điện tử Chính phủ)',
    loai_nguon: 'Chính thống',
    cong_dong_va_dia_ban: 'Cộng đồng cư dân duyên hải Cần Giờ và Nam Bộ',
    url: 'https://tphcm.baochinhphu.vn/phat-huy-gia-tri-van-hoa-truyen-thong-cua-le-hoi-nghinh-ong-101260921122610999.htm',
    ngay_truy_cap: '2026-10-22',
    trang_thai_doi_chieu: 'Đã đối chiếu với Báo Nhân Dân và Báo SGGP',
    ghi_chu: 'Bài viết phân tích giá trị lịch sử và bảo tồn bền vững di sản biển.'
  },
  {
    id: 'src-4',
    ten_nguon: 'Khai mạc Lễ hội Nghinh Ông Cần Giờ năm 2026',
    co_quan: 'Sở Văn hóa và Thể thao Thành phố Hồ Chí Minh',
    loai_nguon: 'Chính thống',
    cong_dong_va_dia_ban: 'Huyện Cần Giờ, Thành phố Hồ Chí Minh',
    url: 'https://svhtt.hochiminhcity.gov.vn/vi_VN/web/guest/tin-chi-tiet/-/chi-tiet/khai-mac-le-hoi-nghinh-ong-can-gio-nam-2026-25812-1953.html',
    ngay_truy_cap: '2026-10-22',
    trang_thai_doi_chieu: 'Đã đối chiếu với Thông cáo UBND huyện Cần Giờ',
    ghi_chu: 'Chương trình chi tiết và phân công ban tổ chức mùa lễ hội năm 2026.'
  },
  {
    id: 'src-5',
    ten_nguon: 'Khai mạc Lễ hội Nghinh Ông Thành phố Hồ Chí Minh năm 2026 tại Cần Giờ',
    co_quan: 'Báo Nhân Dân',
    loai_nguon: 'Chính thống',
    cong_dong_va_dia_ban: 'Thị trấn Cần Thạnh và các xã biển Cần Giờ',
    url: 'https://nhandan.vn/khai-mac-le-hoi-nghinh-ong-thanh-pho-ho-chi-minh-nam-2026-tai-xa-can-gio-post990891.html',
    ngay_truy_cap: '2026-10-23',
    trang_thai_doi_chieu: 'Đã đối chiếu với Đài Truyền hình Việt Nam (VTV)',
    ghi_chu: 'Báo Đảng Trung ương phản ánh sự kiện chính trị - văn hóa cộng đồng.'
  },
  {
    id: 'src-6',
    ten_nguon: 'Lễ hội Nghinh Ông Cần Giờ: Ước vọng về những chuyến biển bình an',
    co_quan: 'Báo Sài Gòn Giải Phóng (SGGP)',
    loai_nguon: 'Chính thống',
    cong_dong_va_dia_ban: 'Cộng đồng ngư dân vạn chài Cần Thạnh, Cần Giờ',
    url: 'https://www.sggp.org.vn/le-hoi-nghinh-ong-can-gio-uoc-vong-ve-nhung-chuyen-bien-binh-an-post873579.html',
    ngay_truy_cap: '2026-10-25',
    trang_thai_doi_chieu: 'Đã đối chiếu với khảo sát thực địa tại Lăng Ông',
    ghi_chu: 'Phản ánh tiếng nói tâm tư và ước vọng mùa biển êm gió lặng của ngư dân.'
  },
  {
    id: 'src-7',
    ten_nguon: 'Nhiều hoạt động đặc sắc tại Lễ hội Nghinh Ông Cần Giờ',
    co_quan: 'VTV - Đài Truyền hình Việt Nam',
    loai_nguon: 'Chính thống',
    cong_dong_va_dia_ban: 'Huyện Cần Giờ, Thành phố Hồ Chí Minh',
    url: 'https://vtv.vn/nhieu-hoat-dong-dac-sac-tai-le-hoi-nghinh-ong-can-gio-2025-100250925035544898.htm',
    ngay_truy_cap: '2026-10-26',
    trang_thai_doi_chieu: 'Đã đối chiếu với Sở VHTT TP.HCM',
    ghi_chu: 'Phóng sự truyền hình ghi hình trực tiếp các nghi lễ trên biển và hội chèo bả trạo.'
  }
];

export const RITUAL_TIMELINE: RitualStep[] = [
  {
    thu_tu: 1,
    ten_hoat_dong: 'Lễ viếng Nghĩa trang Liệt sĩ Rừng Sác và Đền thờ Liệt sĩ',
    thoi_gian_du_kien: 'Sáng 14 tháng 8 Âm lịch (Khai màn)',
    dia_diem: 'Nghĩa trang Liệt sĩ Rừng Sác và Đền thờ Liệt sĩ Cần Giờ',
    mo_ta: 'Đoàn đại biểu lãnh đạo Thành phố, Huyện ủy, UBND Huyện cùng Ban Quý tế Vạn Lăng Ông dâng hoa, dâng hương tri ân các anh hùng liệt sĩ Đặc công Rừng Sác (Đoàn 10) đã hy sinh vì nền độc lập tự do của Tổ quốc.',
    y_nghia: 'Đạo lý uống nước nhớ nguồn, kết hợp hài hòa giữa tín ngưỡng truyền thống dân gian với truyền thống cách mạng anh hùng của quê hương Cần Giờ.',
    hinh_anh: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    nguon_tham_khao: 'Sở VHTT TPHCM & Báo Nhân Dân',
    ma_tu_lieu_lien_quan: 'NG-010'
  },
  {
    thu_tu: 2,
    ten_hoat_dong: 'Lễ Thượng Đại kỳ & Khai mạc Lễ hội',
    thoi_gian_du_kien: 'Sáng ngày 14 tháng 8 Âm lịch',
    dia_diem: 'Cột cờ trước sân Lăng Ông Thủy Tướng Cần Thạnh',
    mo_ta: 'Ban Quý tế Lăng Ông thực hiện nghi thức kéo cờ đại ngũ sắc lên đỉnh cột cờ Lăng giữa tiếng chiêng, tiếng trống rền vang báo hiệu hội lớn chính thức bắt đầu.',
    y_nghia: 'Thông báo ngày hội lớn cho toàn thể bạn chài trong và ngoài vùng; cầu trời đất, thần linh chứng giám cho lòng thành của ngư dân.',
    hinh_anh: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    nguon_tham_khao: 'Hồ sơ di tích Lăng Ông Thủy Tướng Cần Thạnh & VTV',
    ma_tu_lieu_lien_quan: 'NG-007'
  },
  {
    thu_tu: 3,
    ten_hoat_dong: 'Lễ Cúng Tiền hiền khai khẩn, Hậu hiền khai cơ',
    thoi_gian_du_kien: 'Chiều 14 và sáng 15 tháng 8 Âm lịch',
    dia_diem: 'Tiền đường Lăng Ông Thủy Tướng Cần Thạnh',
    mo_ta: 'Nghi thức dâng hương tế bái các bậc tiền nhân đã có công khai hoang mở cõi vùng ven biển ngập mặn Cần Giờ và lập nên làng chài Cần Thạnh cổ xưa.',
    y_nghia: 'Tôn vinh công lao khai phá dựng nghiệp của tổ tiên, nhắc nhở thế hệ con cháu giữ gìn bản sắc nghề biển truyền thống.',
    hinh_anh: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    nguon_tham_khao: 'Cục Di sản văn hóa - Bộ VHTTDL',
    ma_tu_lieu_lien_quan: 'NG-009'
  },
  {
    thu_tu: 4,
    ten_hoat_dong: 'Nghi thức Thả hoa đăng cầu bình an trên biển',
    thoi_gian_du_kien: 'Đêm 15 tháng 8 Âm lịch (Đêm rằm Trung thu)',
    dia_diem: 'Công viên bãi biển Cần Thạnh',
    mo_ta: 'Hàng ngàn chiếc đèn hoa đăng mang tâm nguyện cầu mong quốc thái dân an, biển êm sóng lặng, ngư dân ra khơi thuận buồm xuôi gió được thả lung linh xuôi dòng triều.',
    y_nghia: 'Tưởng niệm những linh hồn tử nạn trên biển và gửi gắm khát vọng bình an, hòa hợp giữa con người với thiên nhiên đại dương.',
    hinh_anh: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
    nguon_tham_khao: 'Báo Sài Gòn Giải Phóng & UBND Huyện Cần Giờ',
    ma_tu_lieu_lien_quan: 'NG-012'
  },
  {
    thu_tu: 5,
    ten_hoat_dong: 'Nghi thức Nghinh Ông trên biển (Chính lễ)',
    thoi_gian_du_kien: 'Sáng ngày 16 tháng 8 Âm lịch',
    dia_diem: 'Từ Lăng Ông Thủy Tướng xuất hải ra vùng biển Cần Giờ',
    mo_ta: 'Đoàn kiệu rước linh vị Nam Hải Tướng Quân khởi hành từ Lăng xuống ghe chủ. Hàng trăm ghe tàu của bạn chài hộ giá dàn hàng ngang rẽ sóng ra biển khơi. Tại vùng nước linh thiêng, ban tế lễ gieo quẻ xin keo nghinh đón hồn Ông và rước trở về Lăng an vị.',
    y_nghia: 'Trọng tâm tâm linh thiêng liêng nhất của lễ hội: đón rước vị thần hộ mệnh của biển cả về che chở cho toàn thể vạn chài.',
    hinh_anh: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    nguon_tham_khao: 'Hồ sơ Di sản văn hóa phi vật thể quốc gia & Sở VHTT TPHCM',
    ma_tu_lieu_lien_quan: 'NG-005'
  },
  {
    thu_tu: 6,
    ten_hoat_dong: 'Hát Bả Trạo và Hội vui của cộng đồng',
    thoi_gian_du_kien: 'Trưa và chiều 16 đến ngày 17 tháng 8 Âm lịch',
    dia_diem: 'Sân Lăng Ông Thủy Tướng và trung tâm Cần Thạnh',
    mo_ta: 'Đội nghệ nhân bả trạo thực hiện điệu múa chèo cạn nhịp nhàng tái hiện cảnh vượt sóng gió đại dương; tiếp nối là hội đua thuyền, bắt vịt trên biển, liên hoan ẩm thực cá tôm biển Cần Giờ phục vụ cộng đồng.',
    y_nghia: 'Tôn vinh tinh thần đồng tâm hiệp lực trong lao động biển, gắn kết tình làng nghĩa xóm và lan tỏa tinh hoa văn hóa dân gian.',
    hinh_anh: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    nguon_tham_khao: 'Cục Di sản văn hóa & Đài Truyền hình Việt Nam',
    ma_tu_lieu_lien_quan: 'NG-013'
  }
];

export const COMMUNITY_CONTRIBUTORS: CommunityContributor[] = [
  {
    id: 'cnt-1',
    ten_hien_thi: 'Đại diện Ban Quản trị Vạn Lăng Ông Thủy Tướng Cần Thạnh',
    vai_tro: 'Người nắm giữ tri thức và chủ tế nghi lễ thờ phụng Cá Ông tại Lăng',
    tu_lieu_cung_cap: 'Lăng Ông Thủy Tướng, Lịch sử bộ cốt cá voi 1971, Quy chuẩn nghi lễ cổ truyền',
    ma_tu_lieu: 'NG-004',
    thoi_diem: 'Tháng 10/2026',
    pham_vi_su_dung: 'Được phép sử dụng trong sản phẩm học tập phi lợi nhuận',
    yeu_cau_giau_ten: false
  },
  {
    id: 'cnt-2',
    ten_hien_thi: 'Đại diện Đội hát Bả Trạo Lăng Ông Cần Thạnh',
    vai_tro: 'Nghệ nhân phụ trách truyền dạy các làn điệu chèo bả trạo dân gian',
    tu_lieu_cung_cap: 'Nghệ thuật trình diễn Hát Bả Trạo, bài bản múa chèo và nghi thức tạ thần',
    ma_tu_lieu: 'NG-013',
    thoi_diem: 'Tháng 11/2026',
    pham_vi_su_dung: 'Được phép sử dụng có ghi tên',
    yeu_cau_giau_ten: false
  },
  {
    id: 'cnt-3',
    ten_hien_thi: 'Người cung cấp tư liệu ẩn danh',
    vai_tro: 'Chủ phương tiện ghe tàu đánh bắt xa bờ tại vạn chài Cần Thạnh',
    tu_lieu_cung_cap: 'Kinh nghiệm trang trí đoàn thuyền, tập tục kiêng cữ trước ngày ra khơi rước Ông',
    ma_tu_lieu: 'NG-006',
    thoi_diem: 'Tháng 10/2026',
    pham_vi_su_dung: 'Được phép sử dụng có ghi tên tác giả thu thập (giấu tên chủ tàu)',
    yeu_cau_giau_ten: true
  },
  {
    id: 'cnt-4',
    ten_hien_thi: 'Người cung cấp tư liệu ẩn danh',
    vai_tro: 'Ngư dân cao niên cư ngụ tại khu phố Hưng Thạnh, thị trấn Cần Thạnh',
    tu_lieu_cung_cap: 'Ký ức đêm hoa đăng biển Cần Thạnh qua các thời kỳ và truyền thuyết Ông cứu nạn',
    ma_tu_lieu: 'NG-012',
    thoi_diem: 'Tháng 11/2026',
    pham_vi_su_dung: 'Được phép sử dụng trong sản phẩm học tập phi lợi nhuận',
    yeu_cau_giau_ten: true
  }
];

export const PROJECT_INFO = {
  ten_du_an: 'SỐ HÓA VÀ LAN TỎA DI SẢN VĂN HÓA LỄ HỘI NGHINH ÔNG CẦN GIỜ',
  sinh_vien: 'Trần Quang Đức',
  ma_sinh_vien: 'PH58855',
  nhom: '1',
  ma_de_tai: 'G02',
  de_tai: 'Lễ hội Nghinh Ông ven biển Đông Nam Bộ',
  cong_dong_nghien_cuu: 'Cộng đồng ngư dân Cần Giờ',
  dia_ban_nghien_cuu: 'Thị trấn Cần Thạnh và huyện Cần Giờ, Thành phố Hồ Chí Minh',
  chuong_trinh: 'Thực tập sinh Đợt 15 – FPT Polytechnic x IMTA TECH',
  muc_dich: 'Dự án xã hội phi lợi nhuận, phục vụ học tập, lưu trữ và lan tỏa giá trị di sản văn hóa Việt Nam.',
  tuan_thuc_tap: 'Tuần 3 - Hoàn thiện hồ sơ số hóa di sản và trợ lý tra cứu tư liệu'
};
