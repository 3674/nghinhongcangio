import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  Database, 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpDown,
  Tag,
  MapPin,
  Users
} from 'lucide-react';
import { DiSanRecord } from '../types/disan';
import { RecordCard } from './RecordCard';

interface ArchiveScreenProps {
  records: DiSanRecord[];
  onSelectRecord: (recordId: string) => void;
  initialCategory?: string;
  initialSearch?: string;
}

export const ArchiveScreen: React.FC<ArchiveScreenProps> = ({
  records,
  onSelectRecord,
  initialCategory = 'ALL',
  initialSearch = '',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState<string>(initialCategory);
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedCommunity, setSelectedCommunity] = useState<string>('ALL');
  const [selectedEthnicity, setSelectedEthnicity] = useState<string>('ALL');
  const [selectedVerification, setSelectedVerification] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('code_asc');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract distinct filter values safely
  const recordTypes = useMemo(() => {
    const types = new Set<string>();
    records.forEach(r => {
      if (r.loai_tu_lieu) types.add(r.loai_tu_lieu);
    });
    return Array.from(types);
  }, [records]);

  const regions = useMemo(() => {
    const reg = new Set<string>();
    records.forEach(r => {
      if (r.vung_van_hoa) reg.add(r.vung_van_hoa);
    });
    return Array.from(reg);
  }, [records]);

  const communities = useMemo(() => {
    const comm = new Set<string>();
    records.forEach(r => {
      if (r.cong_dong) comm.add(r.cong_dong);
    });
    return Array.from(comm);
  }, [records]);

  const ethnicities = useMemo(() => {
    const eth = new Set<string>();
    records.forEach(r => {
      if (r.dan_toc) eth.add(r.dan_toc);
    });
    return Array.from(eth);
  }, [records]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedType('ALL');
    setSelectedRegion('ALL');
    setSelectedCommunity('ALL');
    setSelectedEthnicity('ALL');
    setSelectedVerification('ALL');
    setSortBy('code_asc');
  };

  const isFilterActive = 
    searchTerm !== '' ||
    selectedType !== 'ALL' ||
    selectedRegion !== 'ALL' ||
    selectedCommunity !== 'ALL' ||
    selectedEthnicity !== 'ALL' ||
    selectedVerification !== 'ALL' ||
    sortBy !== 'code_asc';

  // Filter & sort logic
  const filteredRecords = useMemo(() => {
    return records
      .filter((r) => {
        // Search
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchCode = r.ma_tu_lieu.toLowerCase().includes(q);
          const matchTitle = r.ten_tu_lieu.toLowerCase().includes(q);
          const matchDesc = r.mo_ta && r.mo_ta.toLowerCase().includes(q);
          const matchNative = r.ten_goi_ban_dia && r.ten_goi_ban_dia.toLowerCase().includes(q);
          const matchLocation = r.dia_danh_hien_nay.toLowerCase().includes(q);
          if (!matchCode && !matchTitle && !matchDesc && !matchNative && !matchLocation) {
            return false;
          }
        }

        // Type filter
        if (selectedType !== 'ALL' && r.loai_tu_lieu !== selectedType) {
          return false;
        }

        // Region filter
        if (selectedRegion !== 'ALL' && r.vung_van_hoa !== selectedRegion) {
          return false;
        }

        // Community filter
        if (selectedCommunity !== 'ALL' && r.cong_dong !== selectedCommunity) {
          return false;
        }

        // Ethnicity filter
        if (selectedEthnicity !== 'ALL' && r.dan_toc !== selectedEthnicity) {
          return false;
        }

        // Verification filter
        if (selectedVerification !== 'ALL' && r.trang_thai_xac_minh !== selectedVerification) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name_asc') {
          return a.ten_tu_lieu.localeCompare(b.ten_tu_lieu, 'vi');
        }
        if (sortBy === 'name_desc') {
          return b.ten_tu_lieu.localeCompare(a.ten_tu_lieu, 'vi');
        }
        if (sortBy === 'date_desc') {
          return (b.thoi_diem_thu_thap || '').localeCompare(a.thoi_diem_thu_thap || '');
        }
        if (sortBy === 'date_asc') {
          return (a.thoi_diem_thu_thap || '').localeCompare(b.thoi_diem_thu_thap || '');
        }
        // default code_asc
        return a.ma_tu_lieu.localeCompare(b.ma_tu_lieu);
      });
  }, [
    records,
    searchTerm,
    selectedType,
    selectedRegion,
    selectedCommunity,
    selectedEthnicity,
    selectedVerification,
    sortBy,
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            <Database className="w-4 h-4" />
            <span>Kho tư liệu di sản (NG-001 - NG-015)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-1">
            Danh Mục Hồ Sơ & Tư Liệu
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tổng hợp các bản ghi tư liệu đã kiểm chứng và tư liệu điền dã cộng đồng ngư dân Cần Giờ.
          </p>
        </div>

        {/* Counter badge */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-xl">
            Hiển thị: <strong>{filteredRecords.length}</strong> / {records.length} bản ghi
          </span>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Bộ lọc</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search Row */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Tìm theo tên tư liệu, nội dung, địa danh, tên gọi bản địa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900 placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 font-medium cursor-pointer"
            >
              <option value="code_asc">Mã tư liệu (NG-001 → NG-015)</option>
              <option value="name_asc">Tên tư liệu (A → Z)</option>
              <option value="name_desc">Tên tư liệu (Z → A)</option>
              <option value="date_desc">Thời gian thu thập (Mới nhất)</option>
              <option value="date_asc">Thời gian thu thập (Cũ nhất)</option>
            </select>

            {isFilterActive && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                title="Xóa toàn bộ bộ lọc"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Xóa bộ lọc</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters Grid (Desktop & expandable on mobile) */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-slate-100 ${mobileFilterOpen ? 'block' : 'hidden md:grid'}`}>
          {/* Filter 1: Loại tư liệu */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Loại tư liệu
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
            >
              <option value="ALL">Tất cả loại tư liệu</option>
              {recordTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Filter 2: Vùng văn hóa */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Vùng văn hóa
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
            >
              <option value="ALL">Tất cả vùng văn hóa</option>
              {regions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Filter 3: Cộng đồng */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Cộng đồng
            </label>
            <select
              value={selectedCommunity}
              onChange={(e) => setSelectedCommunity(e.target.value)}
              className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
            >
              <option value="ALL">Tất cả cộng đồng</option>
              {communities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Filter 4: Dân tộc */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Dân tộc
            </label>
            <select
              value={selectedEthnicity}
              onChange={(e) => setSelectedEthnicity(e.target.value)}
              className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
            >
              <option value="ALL">Tất cả dân tộc</option>
              {ethnicities.map((eth) => (
                <option key={eth} value={eth}>{eth}</option>
              ))}
            </select>
          </div>

          {/* Filter 5: Trạng thái xác minh */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Trạng thái xác minh
            </label>
            <select
              value={selectedVerification}
              onChange={(e) => setSelectedVerification(e.target.value)}
              className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="Đã xác minh">Đã xác minh</option>
              <option value="Chưa xác minh">Chưa xác minh</option>
            </select>
          </div>
        </div>

        {/* Active Filters Badges */}
        {isFilterActive && (
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-slate-500 font-medium">Bộ lọc đang áp dụng:</span>
            {selectedType !== 'ALL' && (
              <span className="bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full font-semibold">
                Loại: {selectedType}
              </span>
            )}
            {selectedRegion !== 'ALL' && (
              <span className="bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full font-semibold">
                Vùng: {selectedRegion}
              </span>
            )}
            {selectedCommunity !== 'ALL' && (
              <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-semibold">
                Cộng đồng: {selectedCommunity}
              </span>
            )}
            {selectedVerification !== 'ALL' && (
              <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-semibold">
                {selectedVerification}
              </span>
            )}
            {searchTerm && (
              <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-full font-semibold">
                "{searchTerm}"
              </span>
            )}
          </div>
        )}
      </div>

      {/* Records Grid */}
      {filteredRecords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <RecordCard
              key={record.id}
              record={record}
              onSelect={onSelectRecord}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            Không tìm thấy tư liệu phù hợp
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Không có bản ghi nào khớp với điều kiện tìm kiếm và bộ lọc hiện tại. Hãy thử thay đổi từ khóa hoặc đặt lại bộ lọc.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Xóa bộ lọc và xem toàn bộ 15 bản ghi
          </button>
        </div>
      )}
    </div>
  );
};
