import React from 'react';
import { 
  Info, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Heart, 
  Award, 
  Target, 
  Users, 
  Compass, 
  FileCheck2,
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';
import { PROJECT_INFO } from '../data/metadata_extra';

export const ProjectAboutScreen: React.FC = () => {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Hero Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-sky-950 via-slate-900 to-teal-950 text-white shadow-xl border border-sky-800/40 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-4">
          <GraduationCap className="w-4 h-4 text-teal-300" />
          <span>Hồ Sơ Đề Tài Thực Tập Tốt Nghiệp / Dự Án Xã Hội Phi Lợi Nhuận</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight leading-tight mb-4">
          {PROJECT_INFO.ten_du_an}
        </h1>

        <p className="text-sm sm:text-base text-sky-100/90 max-w-3xl leading-relaxed mb-6">
          Đề tài nghiên cứu ứng dụng công nghệ thông tin trong việc lập hồ sơ số hóa, bảo tồn và lan tỏa các giá trị văn hóa phi vật thể của Lễ hội Nghinh Ông huyện Cần Giờ, Thành phố Hồ Chí Minh.
        </p>

        {/* Academic Meta Tag Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-sky-800/60 text-xs">
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Sinh viên thực hiện:</span>
            <span className="text-white font-bold">{PROJECT_INFO.sinh_vien}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Mã sinh viên:</span>
            <span className="text-teal-300 font-bold font-mono">{PROJECT_INFO.ma_sinh_vien}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Nhóm & Mã đề tài:</span>
            <span className="text-amber-300 font-bold">Nhóm {PROJECT_INFO.nhom} • {PROJECT_INFO.ma_de_tai}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Chương trình:</span>
            <span className="text-sky-200 font-medium">{PROJECT_INFO.chuong_trinh}</span>
          </div>
        </div>
      </div>

      {/* Non-Profit & Ethics Declaration */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <h3 className="text-base font-bold text-emerald-900">
              Tuyên Bố Mục Đích Xã Hội Phi Lợi Nhuận
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed max-w-3xl">
            Đây là sản phẩm thực tập phục vụ thuần túy cho mục đích học tập, nghiên cứu khoa học và cống hiến giá trị di sản cho cộng đồng xã hội. Ứng dụng hoàn toàn <strong>không thu phí</strong>, <strong>không chèn quảng cáo thương mại</strong>, và <strong>tôn trọng tuyệt đối quyền của người dân cung cấp tư liệu</strong>.
          </p>
        </div>
        <div className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 flex items-center gap-1.5">
          <Heart className="w-4 h-4 fill-white" />
          <span>Phi Lợi Nhuận 100%</span>
        </div>
      </div>

      {/* 5 Core Objectives of the Project */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Mục tiêu nghiên cứu</span>
          <h2 className="text-2xl font-bold text-slate-900 font-heading mt-1">
            Mục Tiêu Trọng Tâm Của Đề Tài
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Số hóa và lưu trữ tư liệu</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Xây dựng cấu trúc dữ liệu khoa học theo Phụ lục 03, chuẩn hóa 15 bản ghi tư liệu đầu tiên bao gồm bài viết, nghi lễ, địa điểm di tích và tri thức dân gian biển.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Giới thiệu giá trị văn hóa</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Làm nổi bật nét đẹp tín ngưỡng thờ cúng Cá Ông (Đức Ngư Ông), lễ Nghinh Ông trên biển, nghệ thuật hát Bả Trạo và truyền thống gắn bó bền chặt giữa con người với biển cả.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Tôn trọng quyền cộng đồng</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thực hiện nghiêm túc đạo đức nghiên cứu: không tự tiện công bố phần bí truyền, ẩn danh người cung cấp khi được yêu cầu, minh bạch quyền sử dụng của từng tư liệu.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">4. Tiếp cận nguồn gốc rõ ràng</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Phân định rạch ròi giữa nguồn tư liệu tự thu thập tại cộng đồng và nguồn trích lục tài liệu có sẵn từ cơ quan chức năng, luôn có cơ chế đối chiếu nguồn thứ hai.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 lg:col-span-2">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">5. Góp phần bảo tồn và lan tỏa di sản Việt Nam</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Giúp thế hệ trẻ, học sinh, sinh viên và du khách dễ dàng tìm hiểu, tra cứu thông tin chính xác về di sản văn hóa phi vật thể quốc gia duy nhất của ngư dân Thành phố Hồ Chí Minh, thúc đẩy niềm tự hào dân tộc và ý thức bảo vệ môi trường biển đảo quê hương.
            </p>
          </div>
        </div>
      </div>

      {/* Scope and Research Community Details */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 font-heading">
          Phạm Vi Nghiên Cứu & Đối Tượng Thụ Hưởng
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-2">
            <strong className="text-slate-800 block font-bold">Phạm vi không gian & thời gian:</strong>
            <p className="text-slate-600 leading-relaxed">
              Tập trung khảo sát tại thị trấn Cần Thạnh và các xã ven biển thuộc huyện Cần Giờ, Thành phố Hồ Chí Minh; trọng tâm là các mùa lễ hội Nghinh Ông truyền thống rằm tháng 8 Âm lịch và các đợt điền dã năm 2026.
            </p>
          </div>

          <div className="space-y-2">
            <strong className="text-slate-800 block font-bold">Đối tượng thụ hưởng của ứng dụng:</strong>
            <ul className="text-slate-600 space-y-1 list-disc list-inside">
              <li>Cộng đồng ngư dân và cư dân huyện Cần Giờ.</li>
              <li>Thanh thiếu niên, học sinh, sinh viên quan tâm văn hóa biển.</li>
              <li>Các nhà nghiên cứu văn hóa dân gian và nhân học văn hóa.</li>
              <li>Khách du lịch trong nước và quốc tế khi đến tham quan Cần Giờ.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical and Academic Architecture */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4">
        <h3 className="text-lg font-bold font-heading text-teal-300">
          Cấu Trúc Kỹ Thuật & Giải Pháp Công Nghệ
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Ứng dụng được xây dựng trên nền tảng React 19 + TypeScript với phong cách thiết kế hiện đại, tối ưu hoàn hảo cho các thiết bị di động thông minh. Hệ thống dữ liệu được lưu trữ độc lập tại <code className="text-teal-300 bg-slate-800 px-1.5 py-0.5 rounded">disan.json</code>, tích hợp mô hình ngôn ngữ lớn Gemini 3.8 Flash thông qua proxy phía máy chủ (Server-side API) an toàn tuyệt đối, đảm bảo dữ liệu luôn được kiểm soát chặt chẽ và không để lộ thông tin bảo mật.
        </p>
      </div>
    </div>
  );
};
