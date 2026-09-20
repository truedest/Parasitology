import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, FastForward, CheckCircle2, BookmarkCheck, Sparkles, BookOpen } from 'lucide-react';
import { Language, VideoChapter } from '../types';
import { VIDEO_CHAPTERS } from '../data/morphologyData';
import { HeadComparisonSvg, WingVenationSvg, RestingPostureSvg } from './AnatomicalDiagrams';

// Image assets generated
import femaleMacroImg from '../assets/images/anopheles_female_macro_1789861827124.jpg';
import maleMacroImg from '../assets/images/anopheles_male_macro_1789861843806.jpg';
import wingMacroImg from '../assets/images/anopheles_wing_macro_1789861856420.jpg';

interface VideoLectureProps {
  lang: Language;
}

export const VideoLectureView: React.FC<VideoLectureProps> = ({ lang }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentChapterIdx, setCurrentChapterIdx] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [voiceAvailable, setVoiceAvailable] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'interactive' | 'slides'>('interactive');

  const timerRef = useRef<number | null>(null);
  const currentChapter = VIDEO_CHAPTERS[currentChapterIdx];
  const totalDuration = VIDEO_CHAPTERS.reduce((acc, c) => acc + c.duration, 0);

  // Web Speech API Voice Narration
  const speakCurrentChapter = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setVoiceAvailable(false);
      return;
    }

    window.speechSynthesis.cancel();
    if (isMuted) return;

    const textToSpeak = lang === 'en' ? currentChapter.narrationEn : currentChapter.narrationId;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = playbackSpeed;
    utterance.lang = lang === 'en' ? 'en-US' : 'id-ID';

    // Try finding good quality system voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      lang === 'en' 
        ? (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Alex')))
        : (v.lang.startsWith('id') || v.name.includes('Indonesian'))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Playback loop
  useEffect(() => {
    if (isPlaying) {
      speakCurrentChapter();
      timerRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          const nextTime = prev + 1 * playbackSpeed;
          
          // Check chapter boundary
          const currentChapterEnd = currentChapter.timeStart + currentChapter.duration;
          if (nextTime >= currentChapterEnd) {
            if (currentChapterIdx < VIDEO_CHAPTERS.length - 1) {
              setCurrentChapterIdx(prevIdx => prevIdx + 1);
            } else {
              setIsPlaying(false);
              window.speechSynthesis?.cancel();
              return 0;
            }
          }
          return nextTime;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, currentChapterIdx, playbackSpeed, isMuted, lang]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const jumpToChapter = (idx: number) => {
    setCurrentChapterIdx(idx);
    setCurrentTime(VIDEO_CHAPTERS[idx].timeStart);
    if (isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setTimeout(() => speakCurrentChapter(), 100);
    }
  };

  const restartVideo = () => {
    jumpToChapter(0);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Video Container Shell */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Top Video Header Bar */}
        <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
              {lang === 'en' ? 'Parasitology Masterclass Video' : 'Video Kuliah Masterclass Parasitologi'}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-emerald-400 font-mono">
              {currentChapter.titleEn.split(':')[0]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'interactive' ? 'slides' : 'interactive')}
              className="text-xs px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>{viewMode === 'interactive' ? (lang === 'en' ? 'Slide Deck Mode' : 'Mode Slide') : (lang === 'en' ? 'Interactive Stage' : 'Panggung Interaktif')}</span>
            </button>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </span>
          </div>
        </div>

        {/* Video Visual Screen / Dynamic Stage */}
        <div className="relative min-h-[420px] md:min-h-[500px] bg-slate-950 flex flex-col justify-between p-4 md:p-6 overflow-hidden">
          {/* Active Graphic Stage based on Chapter */}
          <div className="w-full flex-1 flex flex-col justify-center items-center relative z-10">
            {currentChapter.id === 1 && (
              <div className="w-full max-w-4xl animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="space-y-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block">
                      {lang === 'en' ? 'CHAPTER 1 • FOUNDATIONS' : 'BAB 1 • DASAR ENTOMOLOGI'}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                      {lang === 'en' ? 'Anopheles Sexual Dimorphism & Morphology' : 'Dimorfisme Seksual & Morfologi Anopheles'}
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {lang === 'en'
                        ? 'Accurate sex identification is vital in clinical medicine and malariology. Only female Anopheles mosquitoes possess the anatomical stylets required to pierce human capillaries and inoculate Plasmodium sporozoites.'
                        : 'Identifikasi jenis kelamin sangat penting dalam parasitologi klinis. Hanya nyamuk Anopheles betina yang memiliki stilet penusuk untuk menghisap darah dan menularkan sporozoit Plasmodium.'}
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="px-3 py-2 bg-slate-900/90 rounded-lg border border-slate-800 text-xs">
                        <span className="text-slate-400 block">{lang === 'en' ? 'Vector Sex' : 'Jenis Vektor'}</span>
                        <strong className="text-rose-400">♀ {lang === 'en' ? 'Female Only' : 'Hanya Betina'}</strong>
                      </div>
                      <div className="px-3 py-2 bg-slate-900/90 rounded-lg border border-slate-800 text-xs">
                        <span className="text-slate-400 block">{lang === 'en' ? 'Male Role' : 'Peran Jantan'}</span>
                        <strong className="text-blue-400">♂ {lang === 'en' ? 'Nectar & Swarming' : 'Nektar & Kawin'}</strong>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-2xl group">
                    <img
                      src={femaleMacroImg}
                      alt="Anopheles female feeding on skin"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="font-mono bg-slate-950/80 px-2 py-1 rounded text-emerald-300 border border-emerald-800/40">
                        Anopheles stephensi (♀)
                      </span>
                      <span className="bg-rose-500/90 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                        {lang === 'en' ? 'Active Blood Meal' : 'Menghisap Darah'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentChapter.id === 2 && (
              <div className="w-full max-w-5xl animate-fadeIn">
                <div className="text-center mb-3">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                    {lang === 'en' ? 'CRUCIAL MICROSCOPIC DISCRIMINATOR' : 'PEMBEDA MIKROSKOPIS UTAMA'}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {lang === 'en' ? 'Antennal Dimorphism: Plumose (Male) vs Pilose (Female)' : 'Dimorfisme Antena: Plumosa (Jantan) vs Pilosa (Betina)'}
                  </h3>
                </div>
                <HeadComparisonSvg lang={lang} activeFeature="antenna" showLabels={true} />
              </div>
            )}

            {currentChapter.id === 3 && (
              <div className="w-full max-w-5xl animate-fadeIn">
                <div className="text-center mb-3">
                  <span className="text-xs font-mono text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                    {lang === 'en' ? 'THE ANOPHELINE HALLMARK RULE' : 'ATURAN EMAS SUBFAMILI ANOPHELINAE'}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {lang === 'en' ? 'Maxillary Palpi: Both Long, But Male Has Swollen Clubbed Apices' : 'Palpus Maksilaris: Keduanya Panjang, Namun Jantan Ujungnya Menggada'}
                  </h3>
                </div>
                <HeadComparisonSvg lang={lang} activeFeature="palpi" showLabels={true} />
              </div>
            )}

            {currentChapter.id === 4 && (
              <div className="w-full max-w-5xl animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                  <div className="lg:col-span-2">
                    <WingVenationSvg lang={lang} showLabels={true} />
                  </div>
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="rounded-lg overflow-hidden border border-slate-800 shadow-md">
                      <img
                        src={wingMacroImg}
                        alt="Microscopic preparation of Anopheles wing"
                        className="w-full h-36 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-amber-300">
                      {lang === 'en' ? 'Clinical Spotter Rules:' : 'Kaidah Ujian Praktikum:'}
                    </h4>
                    <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                      <li>
                        <strong className="text-slate-100">Genus Anopheles:</strong> {lang === 'en' ? 'Spotted wings with alternating dark and pale scale clusters.' : 'Sayap berbercak dengan kelompok sisik gelap dan terang.'}
                      </li>
                      <li>
                        <strong className="text-slate-100">Genus Culex:</strong> {lang === 'en' ? 'Completely unspotted wings with uniform scales.' : 'Sayap polos tanpa bercak sisik.'}
                      </li>
                      <li>
                        <strong className="text-slate-100">{lang === 'en' ? 'Both Sexes:' : 'Kedua Jenis Kelamin:'}</strong> {lang === 'en' ? 'Both male and female Anopheles exhibit spotted wings.' : 'Baik jantan maupun betina memiliki sayap berbercak.'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {currentChapter.id === 5 && (
              <div className="w-full max-w-4xl animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="rounded-xl overflow-hidden border border-rose-900/50 shadow-2xl relative">
                    <img
                      src={femaleMacroImg}
                      alt="Anopheles female piercing skin"
                      className="w-full h-72 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-rose-900/90 text-rose-100 font-mono text-xs px-2 py-1 rounded border border-rose-600">
                      {lang === 'en' ? 'Vector Inoculation Stage' : 'Penularan Sporozoit Malaria'}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-mono text-rose-400 bg-rose-950 px-3 py-1 rounded-full border border-rose-800">
                      {lang === 'en' ? 'CLINICAL PARASITOLOGY SIGNIFICANCE' : 'SIGNIFIKANSI PARASITOLOGI KLINIS'}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {lang === 'en' ? 'Why Only Females Transmit Malaria' : 'Mengapa Hanya Betina yang Menularkan Malaria'}
                    </h3>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                        <strong className="text-rose-400 block mb-1">
                          1. {lang === 'en' ? 'Obligate Blood Meal (Anautogeny)' : 'Kebutuhan Darah Wajib (Anautogeni)'}
                        </strong>
                        {lang === 'en'
                          ? 'Female mosquitoes require human/mammalian blood proteins to synthesize egg yolk (vitellogenesis).'
                          : 'Nyamuk betina membutuhkan protein darah manusia/mamalia untuk sintesis kuning telur (vitellogenesis).'}
                      </div>
                      <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800">
                        <strong className="text-amber-400 block mb-1">
                          2. {lang === 'en' ? 'Piercing Stylet Fascicle' : 'Stilet Penusuk Khusus'}
                        </strong>
                        {lang === 'en'
                          ? 'Female mouthparts feature 6 sharp piercing stylets (2 mandibles, 2 serrated maxillae, hypopharynx, labrum). Males lack mandibles completely!'
                          : 'Alat mulut betina memiliki 6 stilet penusuk tajam. Pada jantan, mandibula tidak ada/rudimenter sehingga mustahil menembus kulit.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentChapter.id === 6 && (
              <div className="w-full max-w-5xl animate-fadeIn">
                <RestingPostureSvg lang={lang} />
              </div>
            )}
          </div>

          {/* Video Subtitles / Closed Captions Overlay */}
          <div className="mt-4 w-full bg-slate-900/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-800/80 shadow-lg">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {lang === 'en' ? 'NARRATION AUDIO & CAPTIONS' : 'AUDIO & SUBTITLE KULIAH'}
                </span>
                {isPlaying && (
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3 bg-emerald-400 animate-pulse"></span>
                    <span className="w-1 h-4 bg-emerald-300 animate-pulse delay-75"></span>
                    <span className="w-1 h-2 bg-emerald-500 animate-pulse delay-150"></span>
                  </div>
                )}
              </div>
              <span className="text-xs font-mono text-slate-400">
                {lang === 'en' ? currentChapter.titleEn : currentChapter.titleId}
              </span>
            </div>
            <p className="text-slate-100 text-sm md:text-base leading-relaxed font-sans">
              {lang === 'en' ? currentChapter.narrationEn : currentChapter.narrationId}
            </p>
          </div>
        </div>

        {/* Video Scrubber & Playback Controls */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 space-y-3">
          {/* Progress Bar & Chapter Markers */}
          <div className="relative">
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-linear-to-r from-emerald-500 via-teal-400 to-sky-400 transition-all duration-200"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              ></div>
            </div>
            {/* Chapter tick marks */}
            <div className="flex justify-between w-full mt-1.5 px-0.5">
              {VIDEO_CHAPTERS.map((ch, idx) => {
                const isCurrent = currentChapterIdx === idx;
                const isPassed = currentChapterIdx > idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => jumpToChapter(idx)}
                    className={`text-[10px] font-mono transition-colors text-left flex items-center gap-1 ${
                      isCurrent
                        ? 'text-emerald-400 font-bold'
                        : isPassed
                        ? 'text-slate-400'
                        : 'text-slate-600 hover:text-slate-400'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-emerald-400' : isPassed ? 'bg-slate-400' : 'bg-slate-700'}`}></span>
                    <span className="hidden sm:inline">{ch.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Controls Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* Play/Pause & Skip buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20 transition"
                title={isPlaying ? 'Pause' : 'Play Lecture'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
              </button>

              <button
                onClick={restartVideo}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Restart Lecture"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="h-5 w-px bg-slate-800"></div>

              {/* Volume/Audio toggle */}
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (!isMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                className={`p-2 rounded-lg transition flex items-center gap-1.5 text-xs ${
                  isMuted ? 'bg-rose-950/60 text-rose-300 border border-rose-800' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
                title={isMuted ? 'Unmute Audio Narration' : 'Mute Audio Narration'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                <span className="hidden md:inline">{isMuted ? (lang === 'en' ? 'Audio Muted' : 'Audio Mati') : (lang === 'en' ? 'Voice Narration' : 'Suara Narasi')}</span>
              </button>

              {/* Playback speed toggle */}
              <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700/60 text-xs font-mono">
                {[0.75, 1, 1.25, 1.5].map(speed => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-1 rounded transition ${
                      playbackSpeed === speed ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            {/* Current Chapter Takeaway Badge */}
            <div className="hidden lg:flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <BookmarkCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300">
                <strong className="text-slate-100">{lang === 'en' ? 'Key Takeaway' : 'Poin Utama'}:</strong>{' '}
                {lang === 'en' ? currentChapter.keyTakeawayEn : currentChapter.keyTakeawayId}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Selection Cards Grid */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          {lang === 'en' ? 'Lecture Chapters & Core Competencies' : 'Daftar Bab Kuliah & Kompetensi'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {VIDEO_CHAPTERS.map((ch, idx) => {
            const isActive = currentChapterIdx === idx;
            return (
              <button
                key={ch.id}
                onClick={() => jumpToChapter(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900 border-emerald-500/80 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isActive ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {formatTime(ch.timeStart)}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        {lang === 'en' ? 'CURRENT' : 'AKTIF'}
                      </span>
                    )}
                  </div>
                  <h5 className={`text-sm font-bold leading-snug ${isActive ? 'text-emerald-300' : 'text-slate-100'}`}>
                    {lang === 'en' ? ch.titleEn : ch.titleId}
                  </h5>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {lang === 'en' ? ch.subtitleEn : ch.subtitleId}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{ch.duration}s</span>
                  <span className="text-emerald-400 font-mono">
                    {ch.highlightPart.toUpperCase()}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
