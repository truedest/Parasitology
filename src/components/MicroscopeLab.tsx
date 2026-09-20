import React, { useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Sliders, 
  Eye, 
  Ruler, 
  RotateCcw, 
  Info, 
  Sparkles,
  Layers
} from 'lucide-react';
import { Language } from '../types';

import femaleMacroImg from '../assets/images/anopheles_female_macro_1789861827124.jpg';
import maleMacroImg from '../assets/images/anopheles_male_macro_1789861843806.jpg';
import wingMacroImg from '../assets/images/anopheles_wing_macro_1789861856420.jpg';

interface MicroscopeLabProps {
  lang: Language;
}

export const MicroscopeLab: React.FC<MicroscopeLabProps> = ({ lang }) => {
  const [activeSlide, setActiveSlide] = useState<'female_head' | 'male_head' | 'wing'>('female_head');
  const [magnification, setMagnification] = useState<'4x' | '10x' | '40x'>('10x');
  const [focusOffset, setFocusOffset] = useState<number>(0); // 0 is sharp
  const [showReticle, setShowReticle] = useState<boolean>(true);
  const [showAnatomicalPins, setShowAnatomicalPins] = useState<boolean>(true);
  const [lightIntensity, setLightIntensity] = useState<number>(85);

  const getZoomScale = () => {
    switch (magnification) {
      case '4x': return 1.0;
      case '10x': return 1.45;
      case '40x': return 2.1;
      default: return 1.45;
    }
  };

  const getBlurPx = () => {
    return Math.abs(focusOffset) * 0.4;
  };

  const getImageForSlide = () => {
    switch (activeSlide) {
      case 'female_head': return femaleMacroImg;
      case 'male_head': return maleMacroImg;
      case 'wing': return wingMacroImg;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
            {lang === 'en' ? 'Virtual Parasitology Microscope' : 'Mikroskop Virtual Laboratorium Parasitologi'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mt-1">
            {lang === 'en' ? 'Interactive Slide Bench & Micrometer Reticle' : 'Meja Preparat Mikroskopis & Penggaris Retikel'}
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-0.5">
            {lang === 'en'
              ? 'Examine permanent slide mounts under calibrated optics. Use the focus knob, reticle scale, and toggle pins.'
              : 'Periksa sediaan preparat permanen di bawah lensa optik terkalibrasi. Atur fokus, penggaris retikel, dan penanda pin.'}
          </p>
        </div>

        {/* Slide Selection Tray */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveSlide('female_head')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSlide === 'female_head'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ♀ {lang === 'en' ? 'Female Head Mount' : 'Preparat Kepala Betina'}
          </button>
          <button
            onClick={() => setActiveSlide('male_head')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSlide === 'male_head'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ♂ {lang === 'en' ? 'Male Head Mount' : 'Preparat Kepala Jantan'}
          </button>
          <button
            onClick={() => setActiveSlide('wing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeSlide === 'wing'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ★ {lang === 'en' ? 'Wing Scale Mount' : 'Preparat Sayap'}
          </button>
        </div>
      </div>

      {/* Main Microscope Viewport & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Optical Eyepiece Viewport (3 Cols) */}
        <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-8 flex flex-col items-center justify-center relative shadow-2xl overflow-hidden min-h-[500px]">
          {/* Microscope circular field of view diaphragm */}
          <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[480px] md:h-[480px] rounded-full overflow-hidden border-8 border-slate-900 shadow-[0_0_80px_rgba(0,0,0,0.9)_inset,0_0_50px_rgba(16,185,129,0.1)] bg-black">
            
            {/* Specimen Slide Image with Pan/Zoom & Blur */}
            <div
              className="w-full h-full relative transition-all duration-300 flex items-center justify-center"
              style={{
                filter: `blur(${getBlurPx()}px) brightness(${lightIntensity}%)`,
                transform: `scale(${getZoomScale()})`
              }}
            >
              <img
                src={getImageForSlide()}
                alt="Microscopic Slide Preparation"
                className="w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />

              {/* Anatomical Pins Overlay */}
              {showAnatomicalPins && focusOffset === 0 && (
                <div className="absolute inset-0 pointer-events-none">
                  {activeSlide === 'female_head' && (
                    <>
                      {/* Pin for Pilose Antenna */}
                      <div className="absolute top-[28%] left-[28%] flex items-center gap-1.5 animate-bounce">
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center shadow-lg">1</span>
                        <span className="bg-slate-950/90 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/50 shadow">
                          Pilose Antenna (Sparse)
                        </span>
                      </div>
                      {/* Pin for Slender Palpi */}
                      <div className="absolute top-[42%] left-[22%] flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center shadow-lg">2</span>
                        <span className="bg-slate-950/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/50 shadow">
                          Palpi (Equal & Slender)
                        </span>
                      </div>
                      {/* Pin for Piercing Proboscis */}
                      <div className="absolute top-[55%] left-[25%] flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg">3</span>
                        <span className="bg-slate-950/90 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-500/50 shadow">
                          Piercing Proboscis
                        </span>
                      </div>
                    </>
                  )}

                  {activeSlide === 'male_head' && (
                    <>
                      {/* Pin for Plumose Antenna */}
                      <div className="absolute top-[25%] left-[30%] flex items-center gap-1.5 animate-bounce">
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center shadow-lg">1</span>
                        <span className="bg-slate-950/90 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/50 shadow">
                          Plumose Antenna (Bushy)
                        </span>
                      </div>
                      {/* Pin for Clubbed Palpi */}
                      <div className="absolute top-[50%] left-[20%] flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center shadow-lg">2</span>
                        <span className="bg-slate-950/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/50 shadow">
                          Clubbed / Swollen Palp Tip
                        </span>
                      </div>
                    </>
                  )}

                  {activeSlide === 'wing' && (
                    <>
                      {/* Pin for Costal Spotted Scales */}
                      <div className="absolute top-[32%] left-[45%] flex items-center gap-1.5 animate-pulse">
                        <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold flex items-center justify-center shadow-lg">★</span>
                        <span className="bg-slate-950/90 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-400/50 shadow">
                          Costal Spotted Scale Blocks
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Ocular Reticle Micrometer Overlay */}
            {showReticle && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center select-none">
                <svg viewBox="0 0 400 400" className="w-full h-full opacity-60">
                  {/* Crosshairs */}
                  <line x1="20" y1="200" x2="380" y2="200" stroke="#10b981" strokeWidth="0.75" />
                  <line x1="200" y1="20" x2="200" y2="380" stroke="#10b981" strokeWidth="0.75" />
                  <circle cx="200" cy="200" r="180" fill="none" stroke="#10b981" strokeWidth="0.5" />
                  <circle cx="200" cy="200" r="90" fill="none" stroke="#10b981" strokeWidth="0.5" strokeDasharray="3,3" />

                  {/* Horizontal Micrometer Divisions */}
                  {Array.from({ length: 41 }).map((_, i) => {
                    const x = 50 + i * 7.5;
                    const isMajor = i % 10 === 0;
                    const isMid = i % 5 === 0 && !isMajor;
                    const h = isMajor ? 14 : isMid ? 8 : 4;
                    return (
                      <g key={i}>
                        <line x1={x} y1={200 - h} x2={x} y2={200 + h} stroke="#10b981" strokeWidth={isMajor ? 1.5 : 0.8} />
                        {isMajor && (
                          <text x={x} y={180} fill="#34d399" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">
                            {(i / 10)}mm
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}

            {/* Field of View Vignette & Dirt Spec Artifacts for Realism */}
            <div className="absolute inset-0 pointer-events-none rounded-full shadow-[inset_0_0_70px_rgba(0,0,0,0.85)]"></div>
          </div>

          {/* Current Slide Status & Calibration Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 w-full max-w-xl text-xs font-mono text-slate-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-slate-200 font-bold">
                {activeSlide === 'female_head' ? '♀ Anopheles stephensi (Head)' : activeSlide === 'male_head' ? '♂ Anopheles (Male Head)' : 'Anopheles (Spotted Wing)'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>Objective: <strong className="text-emerald-400">{magnification}</strong></span>
              <span>Focus: <strong className={focusOffset === 0 ? 'text-emerald-400' : 'text-amber-400'}>{focusOffset === 0 ? 'Optimal' : `${focusOffset > 0 ? '+' : ''}${focusOffset}`}</strong></span>
            </div>
          </div>
        </div>

        {/* Microscope Adjustment Station (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800 pb-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'en' ? 'Optics & Controls' : 'Kendali & Lensa Optik'}</span>
            </h3>

            {/* Magnification Turret Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                {lang === 'en' ? 'Revolving Nosepiece (Objective):' : 'Lensa Objektif (Revolving):'}
              </label>
              <div className="grid grid-cols-3 gap-2 font-mono">
                {(['4x', '10x', '40x'] as const).map(mag => (
                  <button
                    key={mag}
                    onClick={() => setMagnification(mag)}
                    className={`py-2 rounded-lg text-xs font-bold transition flex flex-col items-center ${
                      magnification === mag
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span>{mag}</span>
                    <span className="text-[9px] opacity-80">{mag === '4x' ? 'Scan' : mag === '10x' ? 'Low' : 'High Dry'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fine Focus Knob Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300">{lang === 'en' ? 'Fine Focus Knob:' : 'Mikrometer Fokus:'}</span>
                <button
                  onClick={() => setFocusOffset(0)}
                  className="text-[10px] text-emerald-400 hover:underline font-mono"
                >
                  {lang === 'en' ? 'Auto-Focus' : 'Auto-Fokus'}
                </button>
              </div>
              <input
                type="range"
                min="-6"
                max="6"
                step="1"
                value={focusOffset}
                onChange={e => setFocusOffset(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>- Defocus</span>
                <span className={focusOffset === 0 ? 'text-emerald-400 font-bold' : ''}>Sharp</span>
                <span>+ Defocus</span>
              </div>
            </div>

            {/* Illumination Condenser Brightness */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-300">{lang === 'en' ? 'Substage Lamp Intensity:' : 'Intensitas Lampu:'}</span>
                <span className="text-xs font-mono text-slate-400">{lightIntensity}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="120"
                step="5"
                value={lightIntensity}
                onChange={e => setLightIntensity(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Overlays Toggle */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs cursor-pointer">
                <span className="text-slate-300 flex items-center gap-2">
                  <Ruler className="w-3.5 h-3.5 text-emerald-400" />
                  {lang === 'en' ? 'Micrometer Reticle' : 'Penggaris Retikel'}
                </span>
                <input
                  type="checkbox"
                  checked={showReticle}
                  onChange={e => setShowReticle(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-400 bg-slate-800 border-slate-700"
                />
              </label>

              <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs cursor-pointer">
                <span className="text-slate-300 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  {lang === 'en' ? 'Anatomical Callout Pins' : 'Pin Penanda Anatomi'}
                </span>
                <input
                  type="checkbox"
                  checked={showAnatomicalPins}
                  onChange={e => setShowAnatomicalPins(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-emerald-400 bg-slate-800 border-slate-700"
                />
              </label>
            </div>
          </div>

          {/* Clinical Practical Takeaway Card */}
          <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Info className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Laboratory OSPE Guide' : 'Panduan OSPE Praktikum'}</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {activeSlide === 'female_head' && (
                lang === 'en'
                  ? 'Key recognition: Palpi are straight, non-clubbed, and exactly equal to proboscis length. Antennae have sparse whorls (pilose).'
                  : 'Ciri pengenal: Palpus lurus, tidak menggada, dan sama panjang dengan probosis. Antena berambut jarang (pilosa).'
              )}
              {activeSlide === 'male_head' && (
                lang === 'en'
                  ? 'Key recognition: Look for swollen, spoon-like clubbed tips at the end of the long palps, plus bushy bottlebrush antennae (plumose).'
                  : 'Ciri pengenal: Perhatikan ujung palpus yang membesar menggada (clubbed) dan antena lebat menyerupai sikat botol (plumosa).'
              )}
              {activeSlide === 'wing' && (
                lang === 'en'
                  ? 'Key recognition: Spotted scale tufts on Costa and veins. Differentiates Anopheles from Culex under 10x objective.'
                  : 'Ciri pengenal: Kelompok sisik gelap dan terang pada kosta dan vena. Membedakan Anopheles dari Culex pada perbesaran 10x.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
