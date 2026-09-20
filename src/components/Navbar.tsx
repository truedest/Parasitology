import React from 'react';
import { 
  FileText, 
  Video, 
  Eye, 
  CheckSquare, 
  Languages, 
  Printer,
  Sparkles
} from 'lucide-react';
import { Language, MainTab } from '../types';

interface NavbarProps {
  currentTab: MainTab;
  onSelectTab: (tab: MainTab) => void;
  lang: Language;
  onToggleLang: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onToggleLang
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Module Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
            <span className="text-xl">🦟</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                /eduinfo • Medical Parasitology
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                v2.4
              </span>
            </div>
            <h1 className="text-sm md:text-base font-extrabold text-slate-100 leading-tight">
              Anopheles Sex Morphology & Differentiation
            </h1>
          </div>
        </div>

        {/* Center Tabs Navigation */}
        <nav className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs font-medium">
          <button
            onClick={() => onSelectTab('infographic')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              currentTab === 'infographic'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Infographic' : 'Infografis'}</span>
          </button>

          <button
            onClick={() => onSelectTab('video')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              currentTab === 'video'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Video Lecture' : 'Video Kuliah'}</span>
          </button>

          <button
            onClick={() => onSelectTab('microscope')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              currentTab === 'microscope'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Microscope Lab' : 'Lab Mikroskop'}</span>
          </button>

          <button
            onClick={() => onSelectTab('ospe-quiz')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              currentTab === 'ospe-quiz'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'OSPE Spotter' : 'Ujian OSPE'}</span>
          </button>
        </nav>

        {/* Right Utility Buttons */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5 transition font-mono"
            title="Toggle Language (English / Bahasa Indonesia)"
          >
            <Languages className="w-3.5 h-3.5 text-sky-400" />
            <span>{lang === 'en' ? 'EN' : 'ID'}</span>
          </button>

          {/* Quick Print Handout */}
          <button
            onClick={() => window.print()}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
            title={lang === 'en' ? 'Print / Export PDF' : 'Cetak / Ekspor PDF'}
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
