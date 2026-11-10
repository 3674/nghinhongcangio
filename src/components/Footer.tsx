import React from 'react';
import { Waves, Shield, Heart, ExternalLink, MapPin, User, BookOpen } from 'lucide-react';
import { PROJECT_INFO } from '../data/metadata_extra';

interface FooterProps {
  onNavigate: (screen: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      {/* Upper footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Project Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                <Waves className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-teal-400 font-bold">Hồ sơ số hóa di sản</span>
                <h3 className="text-base font-bold text-white tracking-tight">Nghinh Ông Cần Giờ</h3>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dự án số hóa và lan tỏa di sản văn hóa phi vật thể quốc gia Lễ hội Nghinh Ông Cần Giờ. Nghiên cứu thực hành văn hóa và tri thức bản địa của cộng đồng ngư dân ven biển Đông Nam Bộ.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-lg">
              <Shield className="w-4 h-4 shrink-0" />
              <span>Dự án xã hội phi lợi nhuận • Không thu phí • Không quảng cáo</span>
            </div>
          </div>

          {/* Col 2: Student & Academic Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <User className="w-4 h-4 text-sky-400" />
              Thông tin nghiên cứu
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <span className="text-slate-500 block text-xs">Sinh viên thực hiện:</span>
                <span className="text-slate-200 font-medium">{PROJECT_INFO.sinh_vien}</span> (Mã SV: <span className="text-sky-300 font-mono">{PROJECT_INFO.ma_sinh_vien}</span>)
              </li>
              <li>
                <span className="text-slate-500 block text-xs">Tổ chức thực tập:</span>
                <span className="text-slate-300">Nhóm {PROJECT_INFO.nhom} • Mã đề tài: {PROJECT_INFO.ma_de_tai}</span>
              </li>
              <li>
                <span className="text-slate-500 block text-xs">Chương trình liên kết:</span>
                <span className="text-slate-300">{PROJECT_INFO.chuong_trinh}</span>
              </li>
              <li>
                <span className="text-slate-500 block text-xs">Tiến độ thực tập:</span>
                <span className="text-amber-300 font-medium">{PROJECT_INFO.tuan_thuc_tap}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Community & Geography */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-400" />
              Địa bàn & Cộng đồng
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <span className="text-slate-500 block text-xs">Cộng đồng nghiên cứu:</span>
                <span className="text-slate-200 font-medium">{PROJECT_INFO.cong_dong_nghien_cuu}</span>
              </li>
              <li>
                <span className="text-slate-500 block text-xs">Địa bàn thực địa:</span>
                <span className="text-slate-300">{PROJECT_INFO.dia_ban_nghien_cuu}</span>
              </li>
              <li>
                <span className="text-slate-500 block text-xs">Trung tâm di sản:</span>
                <span className="text-slate-300">Lăng Ông Thủy Tướng Cần Thạnh & Vùng biển Cần Giờ</span>
              </li>
              <li>
                <span className="text-slate-500 block text-xs">Thời điểm tổ chức:</span>
                <span className="text-slate-300">Rằm tháng 8 Âm lịch (14 - 17/8 ÂL hàng năm)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Legal Statement */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-400" />
              Chuyên mục ứng dụng
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="text-slate-400 hover:text-sky-300 transition-colors">
                  Trang chủ giới thiệu di sản
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('archive')} className="text-slate-400 hover:text-sky-300 transition-colors">
                  Kho tư liệu 15 bản ghi (NG-001 - NG-015)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gemini')} className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <span>Trợ lý khám phá văn hóa Nghinh Ông</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sources')} className="text-slate-400 hover:text-sky-300 transition-colors">
                  Nguồn tư liệu & Ghi nhận cộng đồng
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-slate-400 hover:text-sky-300 transition-colors">
                  Thông tin học phần & Nhóm nghiên cứu
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Ethical disclaimer banner */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200">Tôn trọng quyền tri thức văn hóa cộng đồng:</strong> Các tư liệu được thu thập, biên mục và số hóa phục vụ mục đích học tập phi lợi nhuận. Ứng dụng tuân thủ nghiêm ngặt nguyên tắc đạo đức nghiên cứu nhân học và văn hóa dân gian: không tự ý công bố tư liệu khi chưa được phép; tuyệt đối ẩn danh người cung cấp tư liệu khi có yêu cầu; phân định rạch ròi nguồn thu thập điền dã và nguồn trích lục tài liệu có sẵn.
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-slate-950 border-t border-slate-800/80 px-4 py-4 text-xs text-slate-400 text-center flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto">
        <p>© 2026 Hồ sơ Di sản Lễ hội Nghinh Ông Cần Giờ. Sinh viên Trần Quang Đức - PH58855.</p>
        <p className="mt-2 sm:mt-0 flex items-center gap-1">
          <span>Thực hiện với tinh thần bảo tồn di sản dân tộc</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        </p>
      </div>
    </footer>
  );
};
