import React, { useState, useEffect } from 'react';
import initialDisanData from './data/disan.json';
import { DiSanRecord } from './types/disan';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { ArchiveScreen } from './components/ArchiveScreen';
import { RecordDetailScreen } from './components/RecordDetailScreen';
import { GeminiChatScreen } from './components/GeminiChatScreen';
import { SourcesAndCommunityScreen } from './components/SourcesAndCommunityScreen';
import { ProjectAboutScreen } from './components/ProjectAboutScreen';

export default function App() {
  const [records, setRecords] = useState<DiSanRecord[]>(initialDisanData as DiSanRecord[]);
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [archiveCategory, setArchiveCategory] = useState<string>('ALL');
  const [archiveSearch, setArchiveSearch] = useState<string>('');
  const [geminiPrompt, setGeminiPrompt] = useState<string>('');

  // Fetch from server API with local fallback
  useEffect(() => {
    fetch('/api/disan')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setRecords(data);
        }
      })
      .catch(err => {
        console.warn('Using bundled disan.json data:', err);
      });
  }, []);

  // Handle URL hash on initial load or back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('detail/')) {
        const id = hash.replace('detail/', '');
        setSelectedRecordId(id);
        setCurrentScreen('detail');
      } else if (['home', 'archive', 'gemini', 'sources', 'about'].includes(hash)) {
        setCurrentScreen(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation handler
  const handleNavigate = (screen: string, recordId?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (screen === 'detail' && recordId) {
      setSelectedRecordId(recordId);
      setCurrentScreen('detail');
      window.location.hash = `detail/${recordId}`;
    } else {
      if (screen !== 'archive') {
        // preserve archive category unless intentionally reset
      }
      setCurrentScreen(screen);
      window.location.hash = screen;
    }
  };

  const handleQuickSearch = (query: string) => {
    setArchiveSearch(query);
    setArchiveCategory('ALL');
    handleNavigate('archive');
  };

  const handleFilterByCategory = (category: string) => {
    setArchiveCategory(category);
    setArchiveSearch('');
    handleNavigate('archive');
  };

  const handleAskGemini = (prompt: string) => {
    setGeminiPrompt(prompt);
    handleNavigate('gemini');
  };

  const selectedRecord = records.find(
    r => r.id === selectedRecordId || r.ma_tu_lieu.toLowerCase() === (selectedRecordId || '').toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-sky-200 selection:text-sky-900">
      {/* Top Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onQuickSearch={handleQuickSearch}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentScreen === 'home' && (
          <HomeScreen
            records={records}
            onNavigate={handleNavigate}
            onFilterByCategory={handleFilterByCategory}
            onSearch={handleQuickSearch}
          />
        )}

        {currentScreen === 'archive' && (
          <ArchiveScreen
            records={records}
            onSelectRecord={(id) => handleNavigate('detail', id)}
            initialCategory={archiveCategory}
            initialSearch={archiveSearch}
          />
        )}

        {currentScreen === 'detail' && (
          selectedRecord ? (
            <RecordDetailScreen
              record={selectedRecord}
              onBack={() => handleNavigate('archive')}
              onAskGemini={handleAskGemini}
              onNavigateToRecord={(id) => handleNavigate('detail', id)}
            />
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto p-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-800">Không tìm thấy bản ghi</h3>
              <p className="text-xs text-slate-500">Mã tư liệu "{selectedRecordId}" không tồn tại trong kho dữ liệu.</p>
              <button
                onClick={() => handleNavigate('archive')}
                className="px-5 py-2 bg-sky-700 text-white rounded-xl text-xs font-bold hover:bg-sky-800 transition-colors"
              >
                Quay lại kho tư liệu
              </button>
            </div>
          )
        )}

        {currentScreen === 'gemini' && (
          <GeminiChatScreen
            onNavigateToRecord={(id) => handleNavigate('detail', id)}
            initialPrompt={geminiPrompt}
          />
        )}

        {currentScreen === 'sources' && (
          <SourcesAndCommunityScreen
            onNavigateToRecord={(id) => handleNavigate('detail', id)}
          />
        )}

        {currentScreen === 'about' && (
          <ProjectAboutScreen />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
