import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  FileText, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  UserCheck, 
  Calendar, 
  Building2, 
  Share2, 
  Compass,
  EyeOff
} from 'lucide-react';
import { DiSanRecord } from '../types/disan';

interface RecordDetailScreenProps {
  record: DiSanRecord;
  onBack: () => void;
  onAskGemini: (prompt: string) => void;
  onNavigateToRecord: (recordId: string) => void;
}

export const RecordDetailScreen: React.FC<RecordDetailScreenProps> = ({
  record,
  onBack,
  onAskGemini,
}) => {
  const isCommunityRecord = record.loai_ban_ghi === 'tu_lieu_cong_dong';
  const isMissingProvider = isCommunityRecord && (!record.nguoi_cung_cap || record.nguoi_cung_cap === 'Chưa cập nhật');
  const isMissingSource = !isCommunityRecord && (!record.ten_nguon || record.ten_nguon === 'Chưa cập nhật' || !record.url_nguon);

  const renderField = (value: any, isCode = false) => {
    if (value === null || value === undefined || value === '' || value === 'Chưa cập nhật') {
      return <span className="text-slate-400 italic font-normal">Chưa cập nhật</span>;
    }
    if (typeof value === 'boolean') {
      return value ? (
        <span className="text-emerald-700 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Đã xác nhận</span>
        </span>
      ) : (
        <span className="text-amber-700 font-semibold flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>Chưa xác nhận</span>
        </span>
      );
    }
    return isCode ? <span className="font-mono text-slate-800">{String(value)}</span> : String(value);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-sky-800 hover:text-sky-950 transition-colors cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-50 group-hover:bg-sky-100 flex items-center justify-center border border-sky-200">
            <ArrowLeft className="w-4 h-4 text-sky-700" />
          </div>
          <span>Quay lại kho tư liệu</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onAskGemini(`Hãy phân tích và giải thích chi tiết về tư liệu "${record.ten_tu_lieu}" (${record.ma_tu_lieu}) trong Lễ hội Nghinh Ông Cần Giờ.`)}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2 cursor-pointer transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Hỏi Trợ lý Gemini về bản ghi này</span>
          </button>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        {/* Banner with Title and Metadata */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-sky-950 to-teal-950 text-white relative">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-teal-400 text-slate-950 font-mono font-bold text-xs px-2.5 py-1 rounded-md shadow-xs">
              {record.ma_tu_lieu}
            </span>
            <span className="bg-sky-800/80 text-sky-200 border border-sky-600/60 text-xs font-semibold px-2.5 py-1 rounded-md">
              {record.loai_tu_lieu}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
              record.trang_thai_xac_minh === 'Đã xác minh' 
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' 
                : 'bg-amber-950/80 text-amber-300 border-amber-700'
            }`}>
              {record.trang_thai_xac_minh}
            </span>
            <span className="text-xs bg-white/10 text-slate-200 px-2.5 py-1 rounded-md border border-white/20">
              {isCommunityRecord ? 'Phiếu A: Tư liệu cộng đồng' : 'Phiếu B: Nguồn có sẵn'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white leading-tight">
            {record.ten_tu_lieu}
          </h1>

          {record.ten_goi_ban_dia && (
            <p className="text-sm sm:text-base text-teal-300 italic mt-2">
              Tên gọi bản địa: "{record.ten_goi_ban_dia}"
            </p>
          )}

          {/* Location row */}
          <div className="mt-4 pt-4 border-t border-sky-800/60 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-sky-100">
            <div className="flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-sky-300 block text-[10px] uppercase font-bold">Địa danh hiện nay:</span>
                <span className="font-semibold text-white">{record.dia_danh_hien_nay}</span>
              </div>
            </div>
            {record.dia_danh_tai_thoi_diem_tu_lieu && (
              <div className="flex items-start gap-1.5">
                <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-sky-300 block text-[10px] uppercase font-bold">Địa danh tại thời điểm tư liệu:</span>
                  <span className="italic text-slate-300">{record.dia_danh_tai_thoi_diem_tu_lieu}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Warning messages if incomplete */}
        {(isMissingProvider || isMissingSource) && (
          <div className="bg-amber-50 border-b border-amber-200 p-4 px-6 sm:px-8 flex items-center gap-3 text-amber-900 text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <strong>Lưu ý kiểm soát chất lượng dữ liệu:</strong> Bản ghi này hiện còn thiếu{' '}
              {isMissingProvider ? 'thông tin người cung cấp tư liệu cộng đồng' : 'nguồn tư liệu kiểm chứng hoặc liên kết nguồn'}. Cần tiến hành điền dã bổ sung trước khi nghiệm thu.
            </div>
          </div>
        )}

        {/* Unpublishable Restriction Notice (Mandatory) */}
        {record.phan_khong_duoc_cong_bo && (
          <div className="bg-rose-50 border-b border-rose-200 p-4 px-6 sm:px-8 flex items-start gap-3 text-rose-950 text-xs sm:text-sm">
            <Lock className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-rose-900 block font-bold">Phần không được công bố (Bảo mật theo thỏa thuận cộng đồng):</strong>
              <span className="text-rose-800">{record.phan_khong_duoc_cong_bo}</span>
              <p className="text-[11px] text-rose-700 mt-1 italic">
                * Tuân thủ quy định đạo đức nghiên cứu di sản: nội dung trên chỉ được lưu trữ hồ sơ khoa học nội bộ, không phổ biến công khai.
              </p>
            </div>
          </div>
        )}

        {/* Media section */}
        {record.url_hinh_anh ? (
          <div className="p-6 sm:p-8 border-b border-slate-200">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Tư liệu hình ảnh minh họa
            </h2>
            <div className="rounded-2xl overflow-hidden bg-slate-100 max-h-96">
              <img
                src={record.url_hinh_anh}
                alt={record.ten_tu_lieu}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2 text-right">
              Phạm vi sử dụng: {record.pham_vi_su_dung}
            </p>
          </div>
        ) : (
          <div className="p-4 px-6 sm:px-8 bg-slate-50 border-b border-slate-200 text-xs text-slate-500 flex items-center justify-between">
            <span>Bản ghi chưa có tệp ảnh/nghe nhìn công khai được phép sử dụng.</span>
            <span className="text-[11px] font-semibold text-slate-400">Không sử dụng ảnh AI giả lập</span>
          </div>
        )}

        {/* Description section */}
        <div className="p-6 sm:p-8 border-b border-slate-200 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-800">
            Nội dung miêu tả tư liệu
          </h2>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
            {record.mo_ta}
          </p>
          {record.chu_giai && (
            <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-xs text-sky-900">
              <strong>Chú giải tên gọi / thuật ngữ bản địa:</strong> {record.chu_giai}
            </div>
          )}
        </div>

        {/* PHỤ LỤC 03 FORM */}
        <div className="p-6 sm:p-8 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                Phiếu dữ liệu khoa học (Phụ lục 03)
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {isCommunityRecord
                  ? 'A. Phiếu cho tư liệu tự thu thập tại cộng đồng'
                  : 'B. Phiếu cho tư liệu lấy từ nguồn có sẵn'}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Mẫu kiểm kê</span>
              <span className="block text-xs font-mono font-bold text-slate-800">{record.ma_tu_lieu}</span>
            </div>
          </div>

          {isCommunityRecord ? (
            /* FORM A: 18 Fields for Community Collected Records */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs sm:text-sm">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">1. Mã tư liệu:</span>
                <span className="font-bold text-slate-900 font-mono">{record.ma_tu_lieu}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">2. Tên tư liệu:</span>
                <span className="font-semibold text-slate-900">{record.ten_tu_lieu}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">3. Loại tư liệu:</span>
                <span className="text-slate-800">{renderField(record.loai_tu_lieu)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">4. Thực hành di sản liên quan:</span>
                <span className="text-slate-800">{renderField(record.thuc_hanh_di_san)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">5. Tên gọi bản địa & Chú giải:</span>
                <span className="text-slate-800">
                  {record.ten_goi_ban_dia ? `${record.ten_goi_ban_dia} (${record.chu_giai || 'Không chú giải'})` : renderField(null)}
                </span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">6. Vùng văn hóa:</span>
                <span className="text-slate-800">{renderField(record.vung_van_hoa)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">7. Cộng đồng & Dân tộc:</span>
                <span className="text-slate-800">
                  {renderField(record.cong_dong)} • Dân tộc: {renderField(record.dan_toc)}
                </span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">8. Địa danh hiện nay:</span>
                <span className="font-semibold text-slate-900">{record.dia_danh_hien_nay}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">9. Địa danh tại thời điểm tư liệu:</span>
                <span className="text-slate-700 italic">{renderField(record.dia_danh_tai_thoi_diem_tu_lieu)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">10. Thời điểm thu thập:</span>
                <span className="text-slate-800">{renderField(record.thoi_diem_thu_thap)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">11. Người thu thập:</span>
                <span className="font-medium text-slate-900">{renderField(record.nguoi_thu_thap)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">12. Người cung cấp:</span>
                {record.yeu_cau_giau_ten ? (
                  <span className="text-amber-700 font-semibold flex items-center gap-1.5">
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Người cung cấp tư liệu ẩn danh (Đã bảo vệ danh tính)</span>
                  </span>
                ) : (
                  <span className="font-medium text-slate-900">{renderField(record.nguoi_cung_cap)}</span>
                )}
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">13. Bối cảnh thu thập:</span>
                <span className="text-slate-800">{renderField(record.boi_canh_thu_thap)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">14. Đã xin phép chưa:</span>
                <span className="text-slate-800">{renderField(record.da_xin_phep)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">15. Phạm vi được phép sử dụng:</span>
                <span className="font-semibold text-sky-800">{record.pham_vi_su_dung}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">16. Phần không được công bố:</span>
                <span className="text-slate-800">{renderField(record.phan_khong_duoc_cong_bo)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">17. Có yêu cầu giấu tên không:</span>
                <span className="text-slate-800">
                  {record.yeu_cau_giau_ten ? 'Có (Tuyệt đối giấu tên danh tính)' : 'Không'}
                </span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">18. Ghi chú & Trạng thái:</span>
                <span className="text-slate-800">
                  Trạng thái: <strong>{record.trang_thai_xac_minh}</strong>
                </span>
              </div>
            </div>
          ) : (
            /* FORM B: 10 Fields for Existing Sourced Records */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs sm:text-sm">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">1. Mã tư liệu:</span>
                <span className="font-bold text-slate-900 font-mono">{record.ma_tu_lieu}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">2. Nội dung đã lấy:</span>
                <span className="text-slate-800 font-medium">{renderField(record.noi_dung_da_lay)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">3. Tên nguồn:</span>
                <span className="font-semibold text-slate-900">{renderField(record.ten_nguon)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">4. Tác giả hoặc cơ quan ban hành:</span>
                <span className="text-slate-800">{renderField(record.tac_gia_hoac_co_quan)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">5. Loại nguồn:</span>
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                  record.loai_nguon === 'Chính thống'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-800'
                }`}>
                  {renderField(record.loai_nguon)}
                </span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">6. Nguồn nói về cộng đồng nào, địa bàn nào:</span>
                <span className="text-slate-800">
                  Cộng đồng: {renderField(record.cong_dong)} • Địa bàn: {renderField(record.dia_danh_hien_nay)}
                </span>
              </div>

              <div className="pb-3 border-b border-slate-100 md:col-span-2">
                <span className="text-slate-500 block text-xs font-medium">7. Đường dẫn nguồn đầy đủ:</span>
                {record.url_nguon ? (
                  <a
                    href={record.url_nguon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:text-sky-800 font-mono text-xs break-all inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>{record.url_nguon}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                ) : (
                  renderField(null)
                )}
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">8. Ngày truy cập:</span>
                <span className="text-slate-800">{renderField(record.ngay_truy_cap)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-slate-500 block text-xs font-medium">9. Đã đối chiếu với nguồn thứ hai chưa:</span>
                <span className="text-slate-800">{renderField(record.da_doi_chieu_nguon_thu_hai)}</span>
              </div>

              <div className="pb-3 border-b border-slate-100 md:col-span-2">
                <span className="text-slate-500 block text-xs font-medium">10. Tên nguồn thứ hai dùng để đối chiếu:</span>
                <span className="text-slate-800">{renderField(record.nguon_thu_hai)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
