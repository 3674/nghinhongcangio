import React, { useState } from 'react';
import { 
  BookmarkCheck, 
  Users, 
  ExternalLink, 
  ShieldCheck, 
  EyeOff, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  MapPin, 
  Building2,
  Heart,
  HelpCircle
} from 'lucide-react';
import { OFFICIAL_SOURCES, COMMUNITY_CONTRIBUTORS } from '../data/metadata_extra';

interface SourcesAndCommunityScreenProps {
  onNavigateToRecord: (recordId: string) => void;
}

export const SourcesAndCommunityScreen: React.FC<SourcesAndCommunityScreenProps> = ({
  onNavigateToRecord,
}) => {
  const [activeTab, setActiveTab] = useState<'sources' | 'community'>('sources');

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-950 via-sky-950 to-slate-900 text-white shadow-lg border border-teal-800/40">
        <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-3">
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>Liêm chính học thuật & Đạo đức nghiên cứu</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading">
          Nguồn Tư Liệu & Ghi Nhận Cộng Đồng
        </h1>
        <p className="text-xs sm:text-sm text-sky-200 mt-2 max-w-3xl leading-relaxed">
          Minh bạch toàn bộ cơ sở xuất xứ của dữ liệu số hóa: từ các văn bản quản lý nhà nước, hồ sơ khoa học di sản văn hóa phi vật thể quốc gia đến sự đóng góp và quyền riêng tư của bà con ngư dân vạn chài Cần Giờ.
        </p>

        {/* Tab switchers */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-sky-800/60">
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'sources'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-600" />
            <span>A. Nguồn tư liệu kiểm chứng ({OFFICIAL_SOURCES.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'community'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Users className="w-4 h-4 text-teal-600" />
            <span>B. Ghi nhận cộng đồng ({COMMUNITY_CONTRIBUTORS.length})</span>
          </button>
        </div>
      </div>

      {/* SECTION A: NGUỒN TƯ LIỆU */}
      {activeTab === 'sources' && (
        <section className="space-y-6">
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs sm:text-sm text-sky-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <strong>Quy chuẩn thẩm định nguồn:</strong> Tất cả 7 nguồn tài liệu dưới đây đều được lựa chọn từ các cơ quan quản lý nhà nước về di sản văn hóa (Bộ VHTTDL, Sở VHTT TP.HCM) và các cơ quan thông tấn chính thống (Báo Nhân Dân, Báo Chính phủ, VTV, Báo SGGP). Mỗi tài liệu đều ghi rõ cộng đồng và địa bàn đề cập, ngày truy cập và trạng thái đối chiếu chéo với nguồn thứ hai.
            </div>
          </div>

          <div className="space-y-4">
            {OFFICIAL_SOURCES.map((source, idx) => (
              <div
                key={source.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      source.loai_nguon === 'Chính thống'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {source.loai_nguon}
                    </span>
                  </div>

                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Ngày truy cập: {source.ngay_truy_cap}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {source.ten_nguon}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block font-medium">Cơ quan ban hành / Tác giả:</span>
                    <strong className="text-slate-800">{source.co_quan}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Cộng đồng và địa bàn được đề cập:</span>
                    <span className="text-slate-800">{source.cong_dong_va_dia_ban}</span>
                  </div>
                </div>

                {/* Second source cross-check status */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Đối chiếu: {source.trang_thai_doi_chieu}</span>
                  </div>
                  <span className="text-slate-500 italic text-[11px]">{source.ghi_chu}</span>
                </div>

                {/* External link button */}
                <div className="pt-2 flex justify-end">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 hover:underline"
                  >
                    <span>Truy cập văn bản / bài viết gốc</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION B: GHI NHẬN CỘNG ĐỒNG */}
      {activeTab === 'community' && (
        <section className="space-y-6">
          <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 text-xs sm:text-sm text-teal-900 flex items-start gap-3">
            <Heart className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block text-teal-950 mb-0.5">Tri ân chủ thể nắm giữ di sản văn hóa:</strong>
              Dự án xin bày tỏ lòng biết ơn sâu sắc đến Ban Quý tế Vạn Lăng Ông Thủy Tướng Cần Thạnh, các nghệ nhân đội hát Bả Trạo và bà con ngư dân huyện Cần Giờ đã nhiệt tình chia sẻ tư liệu, ký ức và bối cảnh thực hành lễ hội. 
              <span className="block mt-1 font-semibold text-teal-900">
                Tuân thủ nghiêm ngặt nguyên tắc đạo đức: Trường hợp người cung cấp yêu cầu giấu tên, hệ thống tuyệt đối ẩn danh và chỉ hiển thị "Người cung cấp tư liệu ẩn danh".
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMMUNITY_CONTRIBUTORS.map((contributor) => (
              <div
                key={contributor.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-300 shadow-xs transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                      Mã: {contributor.ma_tu_lieu}
                    </span>
                    {contributor.yeu_cau_giau_ten ? (
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <EyeOff className="w-3 h-3 text-amber-600" />
                        <span>Bảo mật danh tính</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>Đã xác nhận cung cấp</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      {contributor.ten_hien_thi}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      <strong className="text-slate-700">Vai trò:</strong> {contributor.vai_tro}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                    <div className="text-slate-700">
                      <strong className="text-slate-800 block">Tư liệu đã cung cấp:</strong>
                      <span>{contributor.tu_lieu_cung_cap}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                      Thời điểm ghi nhận: {contributor.thoi_diem}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">
                    Phạm vi: <strong className="text-slate-700">{contributor.pham_vi_su_dung}</strong>
                  </span>
                  <button
                    onClick={() => onNavigateToRecord(contributor.ma_tu_lieu.toLowerCase())}
                    className="text-teal-700 font-bold hover:underline cursor-pointer"
                  >
                    Xem phiếu {contributor.ma_tu_lieu}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
