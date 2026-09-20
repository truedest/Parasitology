import React from 'react';
import { Language } from '../types';

interface DiagramProps {
  lang: Language;
  activeFeature?: string;
  showLabels?: boolean;
}

export const HeadComparisonSvg: React.FC<DiagramProps> = ({
  lang,
  activeFeature = 'all',
  showLabels = true
}) => {
  const isAntennaActive = activeFeature === 'all' || activeFeature === 'antenna';
  const isPalpiActive = activeFeature === 'all' || activeFeature === 'palpi';
  const isMouthActive = activeFeature === 'all' || activeFeature === 'mouthparts';

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 md:p-6 overflow-hidden shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
            {lang === 'en' ? 'Microscopic Head Anatomy' : 'Anatomi Kepala Mikroskopis'}
          </span>
          <h3 className="text-lg font-bold text-slate-100 mt-1">
            {lang === 'en' ? 'Male vs Female Anopheles Head & Mouthparts' : 'Kepala & Alat Mulut: Anopheles Jantan vs Betina'}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-400"></span>
          <span>{lang === 'en' ? 'Palpi (Maxillary)' : 'Palpus Maksilaris'}</span>
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-400 ml-2"></span>
          <span>{lang === 'en' ? 'Antennae' : 'Antena'}</span>
          <span className="inline-block w-3 h-3 rounded-full bg-rose-400 ml-2"></span>
          <span>{lang === 'en' ? 'Proboscis' : 'Probosis'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MALE HEAD */}
        <div className={`p-4 rounded-xl border transition-all ${
          activeFeature === 'antenna' || activeFeature === 'palpi'
            ? 'bg-slate-900/90 border-blue-500/50 shadow-lg shadow-blue-500/10'
            : 'bg-slate-950/70 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/40">
                ♂ {lang === 'en' ? 'MALE ANOPHELES' : 'ANOPHELES JANTAN'}
              </span>
              <span className="text-xs font-mono text-slate-400">{lang === 'en' ? 'Non-Biting / Nectarivore' : 'Tidak Menggigit'}</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-200 border border-blue-800/50">
              {lang === 'en' ? 'Key: MPC' : 'Kunci: MPC'}
            </span>
          </div>

          {/* SVG Diagram Male */}
          <div className="relative aspect-4/3 w-full bg-slate-950 rounded-lg p-2 flex items-center justify-center border border-slate-800/60">
            <svg viewBox="0 0 500 360" className="w-full h-full select-none">
              <defs>
                <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="maleEye" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#064e3b" />
                </linearGradient>
              </defs>

              {/* Grid backdrop */}
              <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" opacity="0.4" />

              {/* Head capsule */}
              <ellipse cx="140" cy="180" rx="35" ry="30" fill="#334155" stroke="#475569" strokeWidth="2" />
              
              {/* Compound Eye */}
              <ellipse cx="145" cy="172" rx="20" ry="18" fill="url(#maleEye)" stroke="#34d399" strokeWidth="1.5" />
              {/* Eye facet texture lines */}
              <path d="M 130 172 Q 145 160 160 172" stroke="#059669" strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M 132 178 Q 145 168 158 178" stroke="#059669" strokeWidth="1" fill="none" opacity="0.6" />
              <text x="145" y="145" fill="#6ee7b7" fontSize="11" textAnchor="middle" fontWeight="600">
                {lang === 'en' ? 'Compound Eye' : 'Mata Majemuk'}
              </text>
              <line x1="145" y1="148" x2="145" y2="160" stroke="#34d399" strokeWidth="1" strokeDasharray="2,2" />

              {/* Central Proboscis (non-piercing) */}
              <g className={`transition-opacity duration-300 ${isMouthActive ? 'opacity-100' : 'opacity-30'}`}>
                <path d="M 170 180 L 440 180" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
                {/* Stylet canal indicator */}
                <path d="M 170 180 L 440 180" stroke="#fda4af" strokeWidth="1.5" strokeDasharray="4,4" />
                <circle cx="440" cy="180" r="3" fill="#f43f5e" />
              </g>

              {/* MALE PLUMOSE ANTENNAE (Bushy dense hairs!) */}
              <g className={`transition-all duration-300 ${isAntennaActive ? 'opacity-100' : 'opacity-25'}`} filter={activeFeature === 'antenna' ? 'url(#glow-blue)' : undefined}>
                {/* Upper antenna shaft */}
                <path d="M 155 165 C 190 130, 240 100, 350 80" fill="none" stroke="#10b981" strokeWidth="3" />
                {/* Whorls of bushy fibrillae (Plumose hairs) */}
                {[
                  { x: 175, y: 147, len: 45, ang: -45 },
                  { x: 195, y: 133, len: 52, ang: -40 },
                  { x: 218, y: 120, len: 58, ang: -35 },
                  { x: 242, y: 108, len: 55, ang: -30 },
                  { x: 268, y: 98, len: 50, ang: -25 },
                  { x: 295, y: 90, len: 46, ang: -20 },
                  { x: 320, y: 84, len: 38, ang: -15 },
                  { x: 345, y: 80, len: 26, ang: -10 }
                ].map((pt, i) => (
                  <g key={`whorl-upper-${i}`}>
                    {/* Upper tufts */}
                    <line x1={pt.x} y1={pt.y} x2={pt.x + Math.cos((pt.ang - 60) * Math.PI / 180) * pt.len} y2={pt.y + Math.sin((pt.ang - 60) * Math.PI / 180) * pt.len} stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1={pt.x} y1={pt.y} x2={pt.x + Math.cos((pt.ang - 35) * Math.PI / 180) * (pt.len * 0.9)} y2={pt.y + Math.sin((pt.ang - 35) * Math.PI / 180) * (pt.len * 0.9)} stroke="#6ee7b7" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1={pt.x} y1={pt.y} x2={pt.x + Math.cos((pt.ang - 85) * Math.PI / 180) * (pt.len * 0.8)} y2={pt.y + Math.sin((pt.ang - 85) * Math.PI / 180) * (pt.len * 0.8)} stroke="#a7f3d0" strokeWidth="1.2" strokeLinecap="round" />
                    {/* Lower tufts */}
                    <line x1={pt.x} y1={pt.y} x2={pt.x + Math.cos((pt.ang + 50) * Math.PI / 180) * (pt.len * 0.85)} y2={pt.y + Math.sin((pt.ang + 50) * Math.PI / 180) * (pt.len * 0.85)} stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1={pt.x} y1={pt.y} x2={pt.x + Math.cos((pt.ang + 80) * Math.PI / 180) * (pt.len * 0.75)} y2={pt.y + Math.sin((pt.ang + 80) * Math.PI / 180) * (pt.len * 0.75)} stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
                  </g>
                ))}

                {/* Base Johnston's Organ */}
                <circle cx="155" cy="165" r="7" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
              </g>

              {/* MALE MAXILLARY PALPI (EQUAL TO PROBOSCIS + DISTINCTLY CLUBBED / SPATULATE TIPS) */}
              <g className={`transition-all duration-300 ${isPalpiActive ? 'opacity-100' : 'opacity-25'}`}>
                {/* Upper Palp Shaft */}
                <path d="M 165 174 L 375 160" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                {/* Apical swollen club (segments 4 & 5 spatulate) */}
                <path d="M 375 160 C 400 152, 425 152, 442 162 C 435 172, 405 172, 375 160 Z" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2" />
                {/* Segment joints */}
                <line x1="230" y1="168" x2="230" y2="173" stroke="#b45309" strokeWidth="2" />
                <line x1="300" y1="164" x2="300" y2="169" stroke="#b45309" strokeWidth="2" />
                <line x1="375" y1="158" x2="375" y2="164" stroke="#78350f" strokeWidth="2.5" />

                {/* Lower Palp (symmetrical projection) */}
                <path d="M 165 186 L 375 200" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                <path d="M 375 200 C 405 188, 435 188, 442 198 C 425 208, 400 208, 375 200 Z" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2" />
                <line x1="230" y1="187" x2="230" y2="192" stroke="#b45309" strokeWidth="2" />
                <line x1="300" y1="191" x2="300" y2="196" stroke="#b45309" strokeWidth="2" />
                <line x1="375" y1="196" x2="375" y2="202" stroke="#78350f" strokeWidth="2.5" />
              </g>

              {/* LENGTH MEASUREMENT BRACKET */}
              <g opacity="0.8">
                {/* Vertical alignment lines */}
                <line x1="440" y1="150" x2="440" y2="225" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
                <line x1="442" y1="150" x2="442" y2="225" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
                {/* Bracket showing Palpi = Proboscis */}
                <path d="M 165 220 L 440 220" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="165" y1="215" x2="165" y2="225" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="440" y1="215" x2="440" y2="225" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="302" y="238" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontWeight="bold">
                  {lang === 'en' ? 'Palpi Length = Proboscis Length' : 'Panjang Palpus = Panjang Probosis'}
                </text>
              </g>

              {/* LABELS & CALLOUTS */}
              {showLabels && (
                <>
                  {/* Plumose label */}
                  <g>
                    <rect x="230" y="25" width="160" height="24" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="310" y="41" fill="#ecfdf5" fontSize="11" fontWeight="bold" textAnchor="middle">
                      {lang === 'en' ? 'PLUMOSE (Dense/Feathery)' : 'PLUMOSA (Lebat/Bulu Unggas)'}
                    </text>
                    <path d="M 280 49 L 260 75" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow)" />
                  </g>

                  {/* Clubbed tip label */}
                  <g>
                    <rect x="340" y="270" width="150" height="36" rx="4" fill="#78350f" stroke="#fbbf24" strokeWidth="1" />
                    <text x="415" y="286" fill="#fef3c7" fontSize="11" fontWeight="bold" textAnchor="middle">
                      {lang === 'en' ? 'CLUBBED / SPATULATE TIP' : 'UJUNG MENGGADA'}
                    </text>
                    <text x="415" y="300" fill="#fde68a" fontSize="9" textAnchor="middle">
                      {lang === 'en' ? '(Apical segments swollen)' : '(Segmen 4-5 membesar)'}
                    </text>
                    <path d="M 415 270 L 415 210" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2,2" />
                  </g>
                </>
              )}
            </svg>
          </div>

          <div className="mt-3 space-y-2 text-xs">
            <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="font-bold text-emerald-400 shrink-0">1. {lang === 'en' ? 'Antenna' : 'Antena'}:</span>
              <span className="text-slate-300">
                <strong className="text-emerald-300">Plumose</strong> — {lang === 'en' ? 'Dense whorls of long hairs. High auditory sensitivity to female flight hum.' : 'Berbulu lebat seperti sikat botol/bulu unggas untuk menangkap dengung sayap betina.'}
              </span>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="font-bold text-amber-400 shrink-0">2. {lang === 'en' ? 'Palpi' : 'Palpus'}:</span>
              <span className="text-slate-300">
                <strong className="text-amber-300">{lang === 'en' ? 'Equal & Clubbed' : 'Sama Panjang & Menggada'}</strong> — {lang === 'en' ? 'Matches proboscis length, with apical 2 segments distinctly spatulate.' : 'Sama panjang dengan probosis, dengan 2 ruas ujung membesar seperti gada.'}
              </span>
            </div>
          </div>
        </div>

        {/* FEMALE HEAD */}
        <div className={`p-4 rounded-xl border transition-all ${
          activeFeature === 'antenna' || activeFeature === 'palpi'
            ? 'bg-slate-900/90 border-rose-500/50 shadow-lg shadow-rose-500/10'
            : 'bg-slate-950/70 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40">
                ♀ {lang === 'en' ? 'FEMALE ANOPHELES' : 'ANOPHELES BETINA'}
              </span>
              <span className="text-xs font-mono text-rose-400 font-semibold">{lang === 'en' ? 'Hematophagous Vector' : 'Vektor Malaria'}</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-200 border border-rose-800/50">
              {lang === 'en' ? 'Key: FPS' : 'Kunci: FPS'}
            </span>
          </div>

          {/* SVG Diagram Female */}
          <div className="relative aspect-4/3 w-full bg-slate-950 rounded-lg p-2 flex items-center justify-center border border-slate-800/60">
            <svg viewBox="0 0 500 360" className="w-full h-full select-none">
              <defs>
                <filter id="glow-rose" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="femaleEye" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#022c22" />
                </linearGradient>
              </defs>

              <rect width="100%" height="100%" fill="url(#grid-pattern)" opacity="0.4" />

              {/* Head capsule */}
              <ellipse cx="140" cy="180" rx="35" ry="30" fill="#334155" stroke="#475569" strokeWidth="2" />
              
              {/* Compound Eye */}
              <ellipse cx="145" cy="172" rx="20" ry="18" fill="url(#femaleEye)" stroke="#10b981" strokeWidth="1.5" />
              <path d="M 130 172 Q 145 160 160 172" stroke="#059669" strokeWidth="1" fill="none" opacity="0.6" />
              <path d="M 132 178 Q 145 168 158 178" stroke="#059669" strokeWidth="1" fill="none" opacity="0.6" />
              <text x="145" y="145" fill="#6ee7b7" fontSize="11" textAnchor="middle" fontWeight="600">
                {lang === 'en' ? 'Compound Eye' : 'Mata Majemuk'}
              </text>
              <line x1="145" y1="148" x2="145" y2="160" stroke="#34d399" strokeWidth="1" strokeDasharray="2,2" />

              {/* Central Piercing Proboscis (sharp stylets inside labium) */}
              <g className={`transition-opacity duration-300 ${isMouthActive ? 'opacity-100' : 'opacity-30'}`}>
                {/* Labium */}
                <path d="M 170 180 L 440 180" stroke="#e11d48" strokeWidth="4.5" strokeLinecap="round" />
                {/* Labella at tip */}
                <polygon points="440,177 448,180 440,183" fill="#be123c" />
                {/* Piercing needle stylets indicator */}
                <line x1="175" y1="180" x2="445" y2="180" stroke="#fecdd3" strokeWidth="1.2" strokeDasharray="3,3" />
                <text x="310" y="174" fill="#fda4af" fontSize="9" fontWeight="bold">
                  {lang === 'en' ? 'Piercing Stylets (Blood-feeding)' : 'Stilet Penusuk (Hisap Darah)'}
                </text>
              </g>

              {/* FEMALE PILOSE ANTENNAE (Sparse, thin, short whorls!) */}
              <g className={`transition-all duration-300 ${isAntennaActive ? 'opacity-100' : 'opacity-25'}`} filter={activeFeature === 'antenna' ? 'url(#glow-rose)' : undefined}>
                {/* Antenna shaft */}
                <path d="M 155 165 C 190 130, 240 100, 350 80" fill="none" stroke="#10b981" strokeWidth="2.5" />
                {/* Sparse short whorls (Pilose!) */}
                {[
                  { x: 175, y: 147, len: 14, ang: -45 },
                  { x: 195, y: 133, len: 15, ang: -40 },
                  { x: 218, y: 120, len: 15, ang: -35 },
                  { x: 242, y: 108, len: 14, ang: -30 },
                  { x: 268, y: 98, len: 14, ang: -25 },
                  { x: 295, y: 90, len: 12, ang: -20 },
                  { x: 320, y: 84, len: 11, ang: -15 },
                  { x: 345, y: 80, len: 9, ang: -10 }
                ].map((pt, i) => (
                  <g key={`whorl-fem-${i}`}>
                    {/* Short sparse hairs */}
                    <line x1={pt.x} y1={pt.y} x2={pt.x + Math.cos((pt.ang - 70) * Math.PI / 180) * pt.len} y2={pt.y + Math.sin((pt.ang - 70) * Math.PI / 180) * pt.len} stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" />
                    <line x1={pt.x} y1={pt.y} x2={pt.x + Math.cos((pt.ang + 60) * Math.PI / 180) * pt.len} y2={pt.y + Math.sin((pt.ang + 60) * Math.PI / 180) * pt.len} stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" />
                  </g>
                ))}
                {/* Base Scape */}
                <circle cx="155" cy="165" r="5" fill="#047857" stroke="#34d399" strokeWidth="1" />
              </g>

              {/* FEMALE MAXILLARY PALPI (EQUAL TO PROBOSCIS + SLENDER, NON-CLUBBED UNIFORM WIDTH) */}
              <g className={`transition-all duration-300 ${isPalpiActive ? 'opacity-100' : 'opacity-25'}`}>
                {/* Upper Palp - Uniform slender diameter */}
                <path d="M 165 174 L 440 174" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
                {/* Segment nodes */}
                <line x1="230" y1="172" x2="230" y2="176" stroke="#b45309" strokeWidth="2" />
                <line x1="300" y1="172" x2="300" y2="176" stroke="#b45309" strokeWidth="2" />
                <line x1="375" y1="172" x2="375" y2="176" stroke="#b45309" strokeWidth="2" />
                {/* Slender tip circle */}
                <circle cx="440" cy="174" r="2" fill="#fbbf24" />

                {/* Lower Palp - Uniform slender diameter */}
                <path d="M 165 186 L 440 186" fill="none" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="230" y1="184" x2="230" y2="188" stroke="#b45309" strokeWidth="2" />
                <line x1="300" y1="184" x2="300" y2="188" stroke="#b45309" strokeWidth="2" />
                <line x1="375" y1="184" x2="375" y2="188" stroke="#b45309" strokeWidth="2" />
                <circle cx="440" cy="186" r="2" fill="#fbbf24" />
              </g>

              {/* LENGTH MEASUREMENT BRACKET */}
              <g opacity="0.8">
                <line x1="440" y1="150" x2="440" y2="225" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,3" />
                <path d="M 165 220 L 440 220" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="165" y1="215" x2="165" y2="225" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="440" y1="215" x2="440" y2="225" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="302" y="238" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontWeight="bold">
                  {lang === 'en' ? 'Palpi Length = Proboscis Length' : 'Panjang Palpus = Panjang Probosis'}
                </text>
              </g>

              {/* LABELS & CALLOUTS */}
              {showLabels && (
                <>
                  {/* Pilose label */}
                  <g>
                    <rect x="230" y="25" width="160" height="24" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="310" y="41" fill="#ecfdf5" fontSize="11" fontWeight="bold" textAnchor="middle">
                      {lang === 'en' ? 'PILOSE (Sparse / Slender)' : 'PILOSA (Jarang / Halus)'}
                    </text>
                    <path d="M 280 49 L 260 75" stroke="#10b981" strokeWidth="1.5" />
                  </g>

                  {/* Slender tip label */}
                  <g>
                    <rect x="330" y="270" width="160" height="36" rx="4" fill="#881337" stroke="#f43f5e" strokeWidth="1" />
                    <text x="410" y="286" fill="#ffe4e6" fontSize="11" fontWeight="bold" textAnchor="middle">
                      {lang === 'en' ? 'SLENDER / STRAIGHT TIP' : 'UJUNG RAMPING LURUS'}
                    </text>
                    <text x="410" y="300" fill="#fecdd3" fontSize="9" textAnchor="middle">
                      {lang === 'en' ? '(Non-clubbed, uniform width)' : '(Tidak membesar, lebar rata)'}
                    </text>
                    <path d="M 410 270 L 440 195" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2,2" />
                  </g>
                </>
              )}
            </svg>
          </div>

          <div className="mt-3 space-y-2 text-xs">
            <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="font-bold text-emerald-400 shrink-0">1. {lang === 'en' ? 'Antenna' : 'Antena'}:</span>
              <span className="text-slate-300">
                <strong className="text-emerald-300">Pilose</strong> — {lang === 'en' ? 'Sparse short hairs. High olfactory density for locating human hosts.' : 'Rambut pendek dan jarang. Padat reseptor bau untuk melacak inang manusia.'}
              </span>
            </div>
            <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <span className="font-bold text-amber-400 shrink-0">2. {lang === 'en' ? 'Palpi' : 'Palpus'}:</span>
              <span className="text-slate-300">
                <strong className="text-amber-300">{lang === 'en' ? 'Equal & Slender' : 'Sama Panjang & Ramping'}</strong> — {lang === 'en' ? 'Matches proboscis length, completely straight without swollen clubs.' : 'Sama panjang dengan probosis, berbentuk silinder ramping lurus tanpa pembesaran.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WingVenationSvg: React.FC<DiagramProps> = ({ lang, showLabels = true }) => {
  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 md:p-6 overflow-hidden shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded-full">
            {lang === 'en' ? 'Wing Diagnostic Micrograph' : 'Diagnostik Sayap Mikroskopis'}
          </span>
          <h3 className="text-lg font-bold text-slate-100 mt-1">
            {lang === 'en' ? 'Anopheline Spotted Wing Venation & Scale Pattern' : 'Venasi & Pola Bercak Sisik Sayap Anopheles'}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-200 border border-amber-400"></span>
            <span>{lang === 'en' ? 'Pale scale cluster' : 'Sisik pucat/terang'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-slate-900 border border-slate-600"></span>
            <span>{lang === 'en' ? 'Dark scale cluster' : 'Sisik gelap'}</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-16/7 w-full bg-slate-950 rounded-xl p-3 border border-slate-800/80 overflow-hidden">
        <svg viewBox="0 0 900 380" className="w-full h-full select-none">
          <defs>
            <linearGradient id="wingMembrane" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#334155" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
            </linearGradient>
            <filter id="spotGlow">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#fef08a" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Wing Membrane Contour */}
          <path
            d="M 60 170 
               C 100 130, 200 90, 400 80 
               C 600 70, 750 90, 830 140 
               C 850 155, 855 175, 840 200 
               C 810 240, 720 270, 580 280 
               C 440 290, 300 270, 200 240 
               C 130 220, 80 195, 60 170 Z"
            fill="url(#wingMembrane)"
            stroke="#64748b"
            strokeWidth="2"
          />

          {/* Wing Fringe Hairs along posterior margin */}
          <path
            d="M 200 240 Q 300 275 440 292 Q 580 283 720 272 Q 810 242 840 200"
            fill="none"
            stroke="#475569"
            strokeWidth="3"
            strokeDasharray="2,3"
          />

          {/* LONGITUDINAL VEINS */}
          {/* Costa (C) - Anterior margin */}
          <path d="M 60 170 C 100 130, 200 90, 400 80 C 600 70, 750 90, 830 140" fill="none" stroke="#94a3b8" strokeWidth="4" />
          
          {/* Subcosta (Sc) */}
          <path d="M 80 165 C 180 115, 340 100, 520 108" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
          
          {/* Radius 1 (R1 / Vein 1) */}
          <path d="M 80 168 C 220 125, 480 115, 780 142" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
          
          {/* Radial Sector (Rs) fork into R2 and R3 (Vein 2) */}
          <path d="M 280 140 C 440 142, 600 148, 835 165" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 520 146 C 650 162, 750 180, 825 188" fill="none" stroke="#94a3b8" strokeWidth="2" />
          
          {/* R4+5 (Vein 3) */}
          <path d="M 320 158 C 480 170, 660 185, 805 210" fill="none" stroke="#94a3b8" strokeWidth="2" />

          {/* Media (M1+2, M3+4 / Vein 4) */}
          <path d="M 150 180 C 350 190, 520 200, 765 235" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 480 198 C 600 215, 700 240, 735 250" fill="none" stroke="#94a3b8" strokeWidth="2" />

          {/* Cubitus (Cu1, Cu2 / Vein 5) */}
          <path d="M 130 190 C 280 205, 450 225, 670 268" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <path d="M 360 215 C 460 238, 540 262, 570 274" fill="none" stroke="#94a3b8" strokeWidth="2" />

          {/* Anal Vein (1A / Vein 6) */}
          <path d="M 110 200 C 220 220, 320 240, 380 255" fill="none" stroke="#94a3b8" strokeWidth="2" />

          {/* SPOTTED SCALE TUFTS (Clusters of alternating dark and pale scales) */}
          {/* Costa dark and pale blocks (diagnostic blocks) */}
          <g filter="url(#spotGlow)">
            {/* Humeral pale spot */}
            <rect x="180" y="98" width="28" height="7" rx="2" fill="#fef08a" transform="rotate(-15, 180, 98)" />
            {/* Pre-sector dark spot */}
            <rect x="220" y="88" width="45" height="7" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1" transform="rotate(-10, 220, 88)" />
            {/* Pre-sector pale spot */}
            <rect x="275" y="78" width="30" height="7" rx="2" fill="#fef08a" transform="rotate(-6, 275, 78)" />
            {/* Sector dark spot */}
            <rect x="315" y="74" width="65" height="7" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1" transform="rotate(-2, 315, 74)" />
            {/* Subcostal pale spot */}
            <rect x="390" y="72" width="35" height="7" rx="2" fill="#fef08a" />
            {/* Preapical dark spot */}
            <rect x="435" y="72" width="75" height="7" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1" transform="rotate(3, 435, 72)" />
            {/* Preapical pale spot */}
            <rect x="520" y="76" width="35" height="7" rx="2" fill="#fef08a" transform="rotate(7, 520, 76)" />
            {/* Apical dark & pale spot */}
            <rect x="565" y="82" width="80" height="7" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1" transform="rotate(12, 565, 82)" />
            <rect x="655" y="102" width="30" height="7" rx="2" fill="#fef08a" transform="rotate(18, 655, 102)" />
            <rect x="695" y="115" width="55" height="7" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1" transform="rotate(25, 695, 115)" />
            <rect x="760" y="145" width="30" height="7" rx="2" fill="#fef08a" transform="rotate(30, 760, 145)" />

            {/* Spots on R1, R2, R3, M, Cu */}
            <rect x="390" y="112" width="30" height="5" rx="1.5" fill="#fef08a" />
            <rect x="525" y="120" width="30" height="5" rx="1.5" fill="#fef08a" />
            <rect x="650" y="132" width="25" height="5" rx="1.5" fill="#fef08a" />
            <rect x="670" y="152" width="25" height="5" rx="1.5" fill="#fef08a" />
            <rect x="730" y="158" width="25" height="5" rx="1.5" fill="#fef08a" />
            <rect x="590" y="170" width="25" height="5" rx="1.5" fill="#fef08a" />
            <rect x="680" y="195" width="30" height="5" rx="1.5" fill="#fef08a" />
            <rect x="420" y="192" width="25" height="5" rx="1.5" fill="#fef08a" />
            <rect x="620" y="222" width="28" height="5" rx="1.5" fill="#fef08a" />
            <rect x="460" y="228" width="25" height="5" rx="1.5" fill="#fef08a" />
            <rect x="260" y="225" width="25" height="5" rx="1.5" fill="#fef08a" />
          </g>

          {/* VEIN LABELS */}
          {showLabels && (
            <g fontSize="10" fontFamily="JetBrains Mono, monospace" fill="#94a3b8">
              <text x="430" y="62" fill="#38bdf8" fontWeight="bold">Costa (C)</text>
              <text x="510" y="100" fill="#cbd5e1">Subcosta (Sc)</text>
              <text x="795" y="135" fill="#cbd5e1">R1 (Vein 1)</text>
              <text x="845" y="165" fill="#cbd5e1">R2</text>
              <text x="835" y="192" fill="#cbd5e1">R3</text>
              <text x="815" y="215" fill="#cbd5e1">R4+5</text>
              <text x="775" y="240" fill="#cbd5e1">M1+2</text>
              <text x="745" y="258" fill="#cbd5e1">M3+4</text>
              <text x="680" y="278" fill="#cbd5e1">Cu1</text>
              <text x="580" y="285" fill="#cbd5e1">Cu2</text>
              <text x="390" y="265" fill="#cbd5e1">1A (Anal)</text>

              {/* Callout box for Costa spotted scales */}
              <rect x="360" y="15" width="220" height="28" rx="5" fill="#0f172a" stroke="#eab308" strokeWidth="1.5" />
              <text x="470" y="33" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">
                {lang === 'en' ? '★ Diagnostic Costal Spotted Scale Blocks' : '★ Blok Bercak Sisik Diagnostik pada Kosta'}
              </text>
              <path d="M 470 43 L 470 68" stroke="#eab308" strokeWidth="1.5" strokeDasharray="2,2" />
            </g>
          )}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
          <span className="font-bold text-amber-400 block mb-1">
            {lang === 'en' ? '1. Genus Hallmark' : '1. Ciri Khas Genus'}
          </span>
          <p className="text-slate-300">
            {lang === 'en'
              ? 'Spotted wings (dark and pale scales clustered in discrete patches) distinguish Anopheles from Culex (unspotted wings) and Aedes.'
              : 'Sayap berbercak (sisik gelap dan pucat yang mengelompok) membedakan Anopheles dari Culex (sayap polos tidak berbercak) dan Aedes.'}
          </p>
        </div>
        <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
          <span className="font-bold text-sky-400 block mb-1">
            {lang === 'en' ? '2. Costa & Vein 1 Keys' : '2. Kunci Costa & Vena 1'}
          </span>
          <p className="text-slate-300">
            {lang === 'en'
              ? 'Specific positions of pale spots on the Costa (humeral, subcostal, preapical) differentiate malaria vector species (e.g. An. stephensi vs An. sundaicus).'
              : 'Posisi bercak pucat spesifik pada kosta (humeral, subkosta, preapikal) digunakan untuk mendiferensiasi spesies vektor malaria.'}
          </p>
        </div>
        <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
          <span className="font-bold text-emerald-400 block mb-1">
            {lang === 'en' ? '3. Sex Distribution' : '3. Distribusi pada Jenis Kelamin'}
          </span>
          <p className="text-slate-300">
            {lang === 'en'
              ? 'Both male and female Anopheles possess spotted wings, although females typically have slightly wider wing membranes.'
              : 'Baik Anopheles jantan maupun betina memiliki sayap berbercak, namun sayap betina umumnya sedikit lebih lebar.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const RestingPostureSvg: React.FC<DiagramProps> = ({ lang }) => {
  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-4 md:p-6 shadow-2xl">
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded-full">
            {lang === 'en' ? 'Clinical Field Entomology' : 'Entomologi Lapangan Klinis'}
          </span>
          <h3 className="text-lg font-bold text-slate-100 mt-1">
            {lang === 'en' ? 'Resting Posture & Body Angle: Anopheles vs Culex' : 'Sikap Bertengger & Sudut Tubuh: Anopheles vs Culex'}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ANOPHELES 45 DEGREE ANGLE */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-500/30 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-700">
              {lang === 'en' ? 'ANOPHELES (Straight 45°–90° Angle)' : 'ANOPHELES (Sudut Miring 45°–90°)'}
            </span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              {lang === 'en' ? 'Straight Body Axis' : 'Sumbu Tubuh Segaris'}
            </span>
          </div>

          <div className="aspect-16/10 w-full bg-slate-900 rounded-lg p-2 border border-slate-800 flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 400 240" className="w-full h-full">
              {/* Resting surface (Wall/Skin) */}
              <line x1="20" y1="200" x2="380" y2="200" stroke="#64748b" strokeWidth="4" />
              <text x="40" y="222" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono, monospace">
                {lang === 'en' ? 'Resting Surface (Wall / Human Skin)' : 'Permukaan Hinggap (Dinding / Kulit)'}
              </text>

              {/* Angle arc indicator */}
              <path d="M 120 200 A 70 70 0 0 0 170 150" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />
              <text x="140" y="175" fill="#34d399" fontSize="14" fontWeight="bold">~45°</text>

              {/* Mosquito straight axis guide line */}
              <line x1="80" y1="200" x2="330" y2="60" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />

              {/* Mosquito body (Straight Line!) */}
              {/* Proboscis touching surface */}
              <line x1="90" y1="195" x2="140" y2="167" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" />
              {/* Head */}
              <circle cx="145" cy="164" r="8" fill="#334155" stroke="#475569" strokeWidth="1.5" />
              {/* Thorax */}
              <ellipse cx="175" cy="147" rx="22" ry="14" fill="#475569" stroke="#64748b" strokeWidth="1.5" transform="rotate(-30, 175, 147)" />
              {/* Abdomen pointed upward in straight axis */}
              <ellipse cx="245" cy="107" rx="45" ry="10" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" transform="rotate(-30, 245, 107)" />
              
              {/* Legs anchored */}
              <path d="M 170 150 L 150 180 L 130 200" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 180 145 L 200 175 L 220 200" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 190 140 L 250 160 L 290 200" fill="none" stroke="#94a3b8" strokeWidth="2" />

              {/* Wings folded over back */}
              <ellipse cx="225" cy="115" rx="42" ry="7" fill="#cbd5e1" fillOpacity="0.4" stroke="#94a3b8" strokeWidth="1.5" transform="rotate(-28, 225, 115)" />
            </svg>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            {lang === 'en'
              ? '★ The proboscis, head, thorax, and abdomen form one unbroken straight line, elevating the abdomen away from the surface at a 45°–90° angle.'
              : '★ Probosis, kepala, dada, dan perut membentuk satu garis lurus tanpa lengkungan, menungging menjauhi dinding sebesar 45°–90°.'}
          </p>
        </div>

        {/* CULEX HUMP-BACKED / PARALLEL */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              {lang === 'en' ? 'CULEX (Parallel / Hump-Backed)' : 'CULEX (Sejajar / Bungkuk)'}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {lang === 'en' ? 'Bent Angular Axis' : 'Sumbu Tubuh Melengkung'}
            </span>
          </div>

          <div className="aspect-16/10 w-full bg-slate-900 rounded-lg p-2 border border-slate-800 flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 400 240" className="w-full h-full">
              {/* Resting surface */}
              <line x1="20" y1="200" x2="380" y2="200" stroke="#64748b" strokeWidth="4" />
              <text x="40" y="222" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono, monospace">
                {lang === 'en' ? 'Resting Surface (Wall / Ceiling)' : 'Permukaan Hinggap (Dinding / Plafon)'}
              </text>

              {/* Parallel guide line */}
              <line x1="80" y1="150" x2="340" y2="150" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />

              {/* Culex body - Bent at angle (Humpbacked!) */}
              {/* Proboscis pointing downward */}
              <line x1="120" y1="195" x2="140" y2="165" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
              {/* Head bent downward */}
              <circle cx="145" cy="162" r="8" fill="#334155" stroke="#475569" strokeWidth="1.5" />
              {/* Humpbacked thorax */}
              <ellipse cx="178" cy="145" rx="20" ry="16" fill="#475569" stroke="#64748b" strokeWidth="1.5" />
              {/* Abdomen parallel to surface! */}
              <ellipse cx="260" cy="150" rx="48" ry="10" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Legs */}
              <path d="M 170 155 L 140 180 L 120 200" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 180 155 L 195 180 L 210 200" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 190 155 L 240 175 L 280 200" fill="none" stroke="#94a3b8" strokeWidth="2" />

              {/* Humpback annotation */}
              <path d="M 178 120 L 178 135" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="178" y="112" fill="#fcd34d" fontSize="11" textAnchor="middle" fontWeight="bold">
                {lang === 'en' ? 'Humpback curve' : 'Punggung bungkuk'}
              </text>
            </svg>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            {lang === 'en'
              ? '★ Culex body axis is bent: the thorax is elevated into a "hunchback" profile, while the abdomen lies parallel to the substrate.'
              : '★ Sumbu tubuh Culex melengkung bungkuk: dada menonjol ke atas, sedangkan perut sejajar dengan permukaan.'}
          </p>
        </div>
      </div>
    </div>
  );
};
