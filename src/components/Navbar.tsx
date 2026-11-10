import React, { useState } from 'react';
import { 
  Compass, 
  Database, 
  Sparkles, 
  BookmarkCheck, 
  Info, 
  Menu, 
  X, 
  Waves,
  Search
} from 'lucide-react';

interface NavbarProps {
  currentScreen: string;
  onNavigate: (screen: string, recordId?: string) => void;
  onQuickSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate, onQuickSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Compass },
    { id: 'archive', label: 'Kho tư liệu', icon: Database, badge: '15 bản ghi' },
    { id: 'gemini', label: 'Trợ lý Gemini', icon: Sparkles, highlight: true },
    { id: 'sources', label: 'Nguồn & Cộng đồng', icon: BookmarkCheck },
    { id: 'about', label: 'Giới thiệu dự án', icon: Info },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      if (onQuickSearch) {
        onQuickSearch(navSearch.trim());
      }
      onNavigate('archive');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-teal-800 text-sky-100 px-4 py-1.5 text-xs text-center font-medium flex items-center justify-center gap-2">
        <Waves className="w-3.5 h-3.5 text-teal-300 animate-pulse" />
        <span>Dự án xã hội phi lợi nhuận: Số hóa & Lan tỏa Di sản Lễ hội Nghinh Ông Cần Giờ • FPT Polytechnic x IMTA TECH</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Branding */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-700 via-sky-800 to-teal-700 flex items-center justify-center text-white shadow-md shadow-sky-900/10 group-hover:scale-105 transition-transform duration-200">
              <Waves className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  Di sản quốc gia
                </span>
                <span className="text-xs text-slate-600 font-medium hidden sm:inline">Mã đề tài G02</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight group-hover:text-sky-700 transition-colors">
                Lễ Hội Nghinh Ông Cần Giờ
              </h1>
            </div>
          </div>

          {/* Desktop Search & Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id || (item.id === 'archive' && currentScreen === 'detail');
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-sky-800 bg-sky-50 shadow-xs border border-sky-200/60'
                      : 'text-slate-600 hover:text-sky-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : item.highlight ? 'text-amber-500' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute top-2 right-2" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Search on Desktop */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Tìm mã tư liệu, tên gọi..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                className="w-48 xl:w-56 pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onNavigate('gemini')}
              className="p-2 text-amber-600 bg-amber-50 border border-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              aria-label="Hỏi đáp AI"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Hỏi đáp AI</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="relative mb-2">
            <input
              type="text"
              placeholder="Tìm kiếm tư liệu lễ hội..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </form>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id || (item.id === 'archive' && currentScreen === 'detail');
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive 
                      ? 'bg-sky-50 text-sky-800 border border-sky-200 font-bold' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 text-center">
            Sinh viên: Trần Quang Đức • Mã SV: PH58855 • Nhóm 1
          </div>
        </div>
      )}
    </header>
  );
};
