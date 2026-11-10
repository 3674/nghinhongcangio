import React, { useState } from 'react';
import { 
  Waves, 
  Search, 
  ArrowRight, 
  Compass, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Building2, 
  ImageIcon, 
  Mic, 
  Video, 
  FileText,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { DiSanRecord } from '../types/disan';
import { RITUAL_TIMELINE, PROJECT_INFO } from '../data/metadata_extra';
import { RecordCard } from './RecordCard';

interface HomeScreenProps {
  records: DiSanRecord[];
  onNavigate: (screen: string, recordId?: string) => void;
  onFilterByCategory: (category: string) => void;
  onSearch: (query: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  records,
  onNavigate,
  onFilterByCategory,
  onSearch,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      onNavigate('archive');
    }
  };

  const categories = [
    { name: 'Tư liệu bài viết và văn bản', icon: FileText, count: records.filter(r => r.loai_tu_lieu === 'Tư liệu bài viết và văn bản').length, color: 'sky' },
    { name: 'Tư liệu nghi lễ và hoạt động', icon: Compass, count: records.filter(r => r.loai_tu_lieu === 'Tư liệu nghi lễ và hoạt động').length, color: 'amber' },
    { name: 'Tư liệu địa điểm văn hóa', icon: Building2, count: records.filter(r => r.loai_tu_lieu === 'Tư liệu địa điểm văn hóa').length, color: 'teal' },
    { name: 'Tư liệu hình ảnh', icon: ImageIcon, count: records.filter(r => r.loai_tu_lieu === 'Tư liệu hình ảnh').length, color: 'indigo' },
    { name: 'Tư liệu ghi âm', icon: Mic, count: 0, color: 'purple', note: 'Đang điền dã' },
    { name: 'Tư liệu ghi hình', icon: Video, count: 0, color: 'rose', note: 'Đang xử lý' },
  ];

  const featuredRecords = records.slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-950 via-sky-900 to-teal-950 text-white shadow-2xl border border-sky-800/40">
        {/* Background decorative ocean wave patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -top-24 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-16 sm:py-20 lg:py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-sky-800/60 backdrop-blur-md border border-sky-600/50 text-teal-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Waves className="w-4 h-4 text-teal-300 animate-pulse" />
            <span>Hồ Sơ Di Sản Văn Hóa Phi Vật Thể Quốc Gia</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight text-white mb-6">
            Lễ Hội Nghinh Ông Cần Giờ
          </h1>

          {/* Subtitle / Belief Description */}
          <p className="text-base sm:text-lg lg:text-xl text-sky-100/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Hồ sơ số hóa và lan tỏa tín ngưỡng thờ cúng Cá Ông (Nam Hải Tướng Quân) – nét đẹp tâm linh gắn liền với khát vọng ngàn đời của bà con ngư dân Cần Giờ về những chuyến biển bình an, sóng yên biển lặng và tôm cá đầy khoang.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Tìm kiếm theo mã tư liệu (NG-001...), tên nghi thức, địa danh..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-32 py-4 text-sm sm:text-base bg-white/95 text-slate-900 rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-400 placeholder-slate-400 font-medium"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
              >
                Tra cứu
              </button>
            </form>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('archive')}
              className="px-6 py-3.5 bg-white text-sky-950 hover:bg-sky-50 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Database className="w-4 h-4 text-sky-700" />
              <span>Khám phá 15 bản ghi tư liệu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('gemini')}
              className="px-6 py-3.5 bg-sky-800/80 hover:bg-sky-700/80 border border-sky-600/70 text-white font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Hỏi đáp Trợ lý văn hóa</span>
            </button>
          </div>
        </div>

        {/* Quick Facts Footer inside banner */}
        <div className="border-t border-sky-800/60 bg-sky-950/70 px-6 py-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="block text-xl font-bold text-teal-300">2013</span>
              <span className="text-xs text-sky-200">Ghi danh Di sản Quốc gia</span>
            </div>
            <div>
              <span className="block text-xl font-bold text-teal-300">14 - 17/8 ÂL</span>
              <span className="text-xs text-sky-200">Thời gian chính lễ hàng năm</span>
            </div>
            <div>
              <span className="block text-xl font-bold text-teal-300">Cần Thạnh</span>
              <span className="text-xs text-sky-200">Lăng Ông Thủy Tướng</span>
            </div>
            <div>
              <span className="block text-xl font-bold text-teal-300">15 Bản ghi</span>
              <span className="text-xs text-sky-200">Hồ sơ số đợt 1 (NG-001 - 015)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Community & Research Area Overview */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Box 1: Cộng đồng ngư dân Cần Giờ */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-sky-200 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-6">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading mb-3">
            Cộng Đồng Ngư Dân Cần Giờ
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Cộng đồng ngư dân Cần Giờ là chủ thể sáng tạo, thực hành và truyền thừa di sản Lễ hội Nghinh Ông qua nhiều thế hệ vạn chài. Gắn bó với biển cả từ thời khai hoang mở cõi Nam Bộ, các bạn chèo, bạn ghe và các bô lão trong Ban Quản trị Vạn Lăng giữ vai trò nòng cốt trong việc phụng tự Thần Nam Hải và trao truyền nghệ thuật diễn xướng Bả Trạo độc đáo.
          </p>
          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 text-xs text-sky-900 space-y-1">
            <p><strong>Chủ thể văn hóa:</strong> Ngư dân vạn chài thị trấn Cần Thạnh & các xã ven biển.</p>
            <p><strong>Người nắm giữ tri thức:</strong> Ban Trị sự Lăng Ông Thủy Tướng & các nghệ nhân đội bả trạo.</p>
          </div>
        </div>

        {/* Box 2: Địa bàn nghiên cứu */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-teal-200 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-6">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading mb-3">
            Địa Bàn Nghiên Cứu
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Đề tài tập trung nghiên cứu tại <strong>Thị trấn Cần Thạnh</strong> và vùng ven biển huyện Cần Giờ, Thành phố Hồ Chí Minh. Nơi đây sở hữu vị trí cửa sông - giáp biển đặc thù thuộc vùng duyên hải Đông Nam Bộ, bao bọc bởi Khu dự trữ sinh quyển thế giới Rừng Sác. Không gian di sản kết nối từ Lăng Ông, Đền thờ Liệt sĩ, Nghĩa trang Rừng Sác ra đến hải phận vịnh Gành Rái.
          </p>
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-teal-900 space-y-1">
            <p><strong>Địa danh hiện nay:</strong> Thị trấn Cần Thạnh, huyện Cần Giờ, TP. Hồ Chí Minh.</p>
            <p><strong>Địa danh lịch sử:</strong> Làng Cần Thạnh, tổng An Thới Hạ, hạt Cần Giờ (thời Nguyễn).</p>
          </div>
        </div>
      </section>

      {/* 6 Category Highlights */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Phân loại kho lưu trữ</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-1">
              Các Nhóm Tư Liệu Lễ Hội
            </h2>
          </div>
          <button
            onClick={() => onNavigate('archive')}
            className="text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Xem tất cả danh mục</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  onFilterByCategory(cat.name);
                  onNavigate('archive');
                }}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-sky-50 text-sky-700 flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2 h-8">
                  {cat.name}
                </h3>
                <span className="mt-2 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {cat.note ? cat.note : `${cat.count} bản ghi`}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section V.5: Quy trình và nghi lễ đã xác thực (Timeline 6 bước chuẩn) */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-xl space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/60 border border-teal-800 px-3 py-1 rounded-full mb-3">
            <Compass className="w-3.5 h-3.5 text-teal-300" />
            <span>Nghi thức cổ truyền đã kiểm chứng</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Quy Trình & Nghi Lễ Lễ Hội Nghinh Ông
          </h2>
          <p className="text-sm text-slate-400 max-w-3xl mt-2 leading-relaxed">
            Hệ thống trình tự các nghi thức trong kỳ lễ hội chính (14 - 17 tháng 8 Âm lịch) được trích lục và đối chiếu từ Hồ sơ khoa học của Cục Di sản văn hóa, Sở VHTT TP.HCM và thực địa tại Lăng Ông Thủy Tướng Cần Thạnh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RITUAL_TIMELINE.map((step) => (
            <div
              key={step.thu_tu}
              className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-teal-500/60 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 font-bold text-sm flex items-center justify-center border border-teal-500/30">
                    0{step.thu_tu}
                  </span>
                  <span className="text-[11px] text-amber-300 font-semibold bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded-md">
                    {step.thoi_gian_du_kien}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100 leading-snug">
                  {step.ten_hoat_dong}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span className="line-clamp-1">{step.dia_diem}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {step.mo_ta}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
                  <strong className="text-teal-300 block mb-0.5">Ý nghĩa biểu tượng:</strong>
                  <span>{step.y_nghia}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Nguồn: {step.nguon_tham_khao}</span>
                {step.ma_tu_lieu_lien_quan && (
                  <button
                    onClick={() => onNavigate('archive', step.ma_tu_lieu_lien_quan)}
                    className="text-teal-300 font-bold hover:underline cursor-pointer"
                  >
                    Xem {step.ma_tu_lieu_lien_quan}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured / Recent Records */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Tư liệu tiêu biểu</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-1">
              Bản Ghi Hồ Sơ Nổi Bật
            </h2>
          </div>
          <button
            onClick={() => onNavigate('archive')}
            className="text-xs sm:text-sm font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Xem toàn bộ 15 tư liệu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecords.map((record) => (
            <RecordCard
              key={record.id}
              record={record}
              onSelect={(id) => onNavigate('detail', id)}
            />
          ))}
        </div>
      </section>

      {/* Main Features of Application */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-sky-50 to-teal-50/50 border border-sky-100 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-800">Chức năng ứng dụng</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-1">
            Hệ Thống Số Hóa & Tra Cứu Toàn Diện
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Ứng dụng được thiết kế tối ưu cho thiết bị di động, phục vụ nhu cầu học tập, nghiên cứu và lan tỏa giá trị di sản văn hóa Việt Nam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Kho Tư Liệu Phụ Lục 03</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hai mẫu phiếu riêng biệt cho tư liệu tự thu thập tại cộng đồng và tư liệu trích lục nguồn có sẵn với 34 trường dữ liệu chuẩn hóa.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Trợ Lý Hỏi Đáp Gemini</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trợ lý chuyên môn chỉ trả lời từ dữ liệu đã kiểm chứng, luôn trích dẫn mã tư liệu và không suy đoán hay bịa đặt.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Bảo Vệ Quyền Cộng Đồng</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tuân thủ đạo đức nghiên cứu nhân học: ẩn danh người cung cấp khi có yêu cầu, cảnh báo rõ dữ liệu thiếu và phạm vi sử dụng.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Đối Chiếu Nguồn Độc Lập</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mỗi bản ghi và thông tin đều được kiểm tra với cơ quan quản lý nhà nước (Bộ VHTTDL, Sở VHTT TP.HCM, Báo Chính phủ).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
