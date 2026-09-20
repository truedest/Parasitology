import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InfographicView } from './components/InfographicView';
import { VideoLectureView } from './components/VideoLectureView';
import { MicroscopeLab } from './components/MicroscopeLab';
import { OspeQuiz } from './components/OspeQuiz';
import { Language, MainTab } from './types';
import { BookOpen, ShieldCheck, Heart, ExternalLink, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<MainTab>('infographic');
  const [lang, setLang] = useState<Language>('en');

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'id' : 'en'));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        lang={lang}
        onToggleLang={toggleLanguage}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentTab === 'infographic' && <InfographicView lang={lang} />}
        {currentTab === 'video' && <VideoLectureView lang={lang} />}
        {currentTab === 'microscope' && <MicroscopeLab lang={lang} />}
        {currentTab === 'ospe-quiz' && <OspeQuiz lang={lang} />}
      </main>

      {/* Academic Parasitology Footer */}
      <footer className="mt-12 bg-slate-950 border-t border-slate-800/80 px-4 py-8 text-xs text-slate-400 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-semibold text-slate-300">
              {lang === 'en' 
                ? 'Medical Parasitology & Vector Biology Teaching Module' 
                : 'Modul Pengajaran Parasitologi & Biologi Vektor Kedokteran'}
            </p>
            <p className="text-slate-500 text-[11px]">
              {lang === 'en'
                ? 'Designed for medical students, clinical parasitologists, and infectious disease fellows.'
                : 'Dirancang untuk mahasiswa kedokteran, analis parasitologi klinis, dan entomolog kesehatan.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>WHO Global Malaria Programme Guidelines</span>
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>CDC DPDx Entomology Keys</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
