export type RecordType = 'tu_lieu_cong_dong' | 'nguon_co_san';

export type UsageScope =
  | 'Được phép sử dụng trong sản phẩm học tập phi lợi nhuận'
  | 'Được phép sử dụng có ghi tên'
  | 'Chỉ được lưu trữ, không công khai'
  | 'Chưa xác định quyền sử dụng';

export type VerificationStatus = 'Đã xác minh' | 'Chưa xác minh' | 'Đang đối chiếu';

export interface DiSanRecord {
  id: string;
  ma_tu_lieu: string;
  ten_tu_lieu: string;
  loai_ban_ghi: RecordType;
  loai_tu_lieu: string;
  thuc_hanh_di_san: string | null;
  ten_goi_ban_dia: string | null;
  chu_giai: string | null;
  vung_van_hoa: string | null;
  cong_dong: string | null;
  dan_toc: string | null;
  dia_danh_hien_nay: string;
  dia_danh_tai_thoi_diem_tu_lieu: string | null;
  mo_ta: string;
  thoi_diem_thu_thap: string | null;
  nguoi_thu_thap: string | null;
  nguoi_cung_cap: string | null;
  boi_canh_thu_thap: string | null;
  da_xin_phep: boolean | string | null;
  pham_vi_su_dung: UsageScope | string;
  phan_khong_duoc_cong_bo: string | null;
  yeu_cau_giau_ten: boolean;
  ten_nguon: string | null;
  tac_gia_hoac_co_quan: string | null;
  loai_nguon: 'Chính thống' | 'Tham khảo thêm' | string | null;
  noi_dung_da_lay: string | null;
  url_nguon: string | null;
  ngay_truy_cap: string | null;
  da_doi_chieu_nguon_thu_hai: boolean | string | null;
  nguon_thu_hai: string | null;
  url_hinh_anh: string | null;
  url_am_thanh: string | null;
  url_video: string | null;
  trang_thai_xac_minh: VerificationStatus;
}

export interface RitualStep {
  thu_tu: number;
  ten_hoat_dong: string;
  thoi_gian_du_kien: string;
  dia_diem: string;
  mo_ta: string;
  y_nghia: string;
  hinh_anh: string;
  nguon_tham_khao: string;
  ma_tu_lieu_lien_quan?: string;
}

export interface OfficialSource {
  id: string;
  ten_nguon: string;
  co_quan: string;
  loai_nguon: 'Chính thống' | 'Tham khảo thêm';
  cong_dong_va_dia_ban: string;
  url: string;
  ngay_truy_cap: string;
  trang_thai_doi_chieu: string;
  ghi_chu: string;
}

export interface CommunityContributor {
  id: string;
  ten_hien_thi: string;
  vai_tro: string;
  tu_lieu_cung_cap: string;
  ma_tu_lieu: string;
  thoi_diem: string;
  pham_vi_su_dung: string;
  yeu_cau_giau_ten: boolean;
}
