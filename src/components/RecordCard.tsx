import React from 'react';
import { 
  MapPin, 
  Tag, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  FileText, 
  Image as ImageIcon, 
  Users, 
  Building2,
  Calendar,
  Lock,
  Compass
} from 'lucide-react';
import { DiSanRecord } from '../types/disan';

interface RecordCardProps {
  record: DiSanRecord;
  onSelect: (recordId: string) => void;
}

export const RecordCard: React.FC<RecordCardProps> = ({ record, onSelect }) => {
  // Check missing provider or source for the required orange warning
  const isCommunityRecord = record.loai_ban_ghi === 'tu_lieu_cong_dong';
  const isMissingProvider = isCommunityRecord && (!record.nguoi_cung_cap || record.nguoi_cung_cap === 'Chưa cập nhật');
  const isMissingSource = !isCommunityRecord && (!record.ten_nguon || record.ten_nguon === 'Chưa cập nhật' || !record.url_nguon);

  const getRecordTypeIcon = (type: string) => {
    switch (type) {
      case 'Tư liệu hình ảnh':
        return <ImageIcon className="w-3.5 h-3.5 text-sky-600" />;
      case 'Tư liệu địa điểm văn hóa':
        return <Building2 className="w-3.5 h-3.5 text-teal-600" />;
      case 'Tư liệu nghi lễ và hoạt động':
        return <Compass className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  const getUsageBadge = (scope: string) => {
    switch (scope) {
      case 'Được phép sử dụng trong sản phẩm học tập phi lợi nhuận':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          label: 'Học tập phi lợi nhuận'
        };
      case 'Được phép sử dụng có ghi tên':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          label: 'Sử dụng ghi tên'
        };
      case 'Chỉ được lưu trữ, không công khai':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          label: 'Lưu trữ nội bộ'
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          label: 'Chưa xác định quyền'
        };
    }
  };

  const usageBadge = getUsageBadge(record.pham_vi_su_dung);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden">
      {/* Top Media or Placeholder Preview */}
      <div className="relative h-44 bg-slate-100 overflow-hidden">
        {record.url_hinh_anh ? (
          <img
            src={record.url_hinh_anh}
            alt={record.ten_tu_lieu}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-sky-50 text-slate-400 p-4 text-center">
            <ImageIcon className="w-8 h-8 text-slate-300 mb-1" />
            <span className="text-xs font-medium text-slate-500">Chưa có hình ảnh tư liệu xác thực</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Không sử dụng ảnh mô phỏng</span>
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 items-center">
          <span className="bg-sky-950/80 backdrop-blur-md text-white text-xs font-bold px-2 py-0.5 rounded-md shadow-xs border border-sky-700/50">
            {record.ma_tu_lieu}
          </span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border backdrop-blur-md ${
            record.trang_thai_xac_minh === 'Đã xác minh'
              ? 'bg-emerald-950/80 text-emerald-200 border-emerald-700/60'
              : 'bg-amber-950/80 text-amber-200 border-amber-700/60'
          }`}>
            {record.trang_thai_xac_minh}
          </span>
        </div>

        {/* Record Type Category */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1.5 border border-slate-200">
            {getRecordTypeIcon(record.loai_tu_lieu)}
            <span>{record.loai_tu_lieu}</span>
          </span>
        </div>

        {/* Privacy icon if restricted */}
        {record.phan_khong_duoc_cong_bo && (
          <div className="absolute top-2.5 right-2.5">
            <span className="bg-rose-900/85 backdrop-blur-md text-rose-100 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs border border-rose-700">
              <Lock className="w-3 h-3" />
              <span>Có phần bảo mật</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Missing data warnings in orange (Mandatory per Section III & V.3) */}
          {isMissingProvider && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>Cảnh báo: Thiếu thông tin người cung cấp</span>
            </div>
          )}
          {isMissingSource && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>Cảnh báo: Thiếu nguồn tư liệu</span>
            </div>
          )}

          {/* Title & Native Name */}
          <div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-1">
              {record.ten_tu_lieu}
            </h3>
            {record.ten_goi_ban_dia && (
              <p className="text-xs text-sky-800 italic mt-0.5 line-clamp-1">
                Tên bản địa: {record.ten_goi_ban_dia}
              </p>
            )}
          </div>

          {/* Geography: CURRENT in primary row, HISTORICAL in secondary small row */}
          <div className="pt-2 border-t border-slate-100 space-y-1">
            <div className="flex items-start gap-1.5 text-xs text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
              <span className="font-semibold line-clamp-1">{record.dia_danh_hien_nay}</span>
            </div>
            {record.dia_danh_tai_thoi_diem_tu_lieu && (
              <div className="pl-5 text-[11px] text-slate-500 italic line-clamp-1">
                Thời điểm tư liệu: {record.dia_danh_tai_thoi_diem_tu_lieu}
              </div>
            )}
          </div>

          {/* Short summary description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {record.mo_ta}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Usage rights tag */}
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${usageBadge.bg} truncate max-w-[170px]`}>
            {usageBadge.label}
          </span>

          {/* View Details Action Button */}
          <button
            onClick={() => onSelect(record.id)}
            className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900 group-hover:translate-x-0.5 transition-all cursor-pointer"
          >
            <span>Chi tiết</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
