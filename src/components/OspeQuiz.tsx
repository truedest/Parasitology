import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Clock, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Language, OspeQuestion } from '../types';
import { OSPE_QUESTIONS } from '../data/morphologyData';

import femaleMacroImg from '../assets/images/anopheles_female_macro_1789861827124.jpg';
import maleMacroImg from '../assets/images/anopheles_male_macro_1789861843806.jpg';
import wingMacroImg from '../assets/images/anopheles_wing_macro_1789861856420.jpg';

interface OspeQuizProps {
  lang: Language;
}

export const OspeQuiz: React.FC<OspeQuizProps> = ({ lang }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = OSPE_QUESTIONS[currentIdx];

  const handleSelectOption = (optId: string) => {
    if (hasAnswered) return;
    setSelectedOptionId(optId);
    setHasAnswered(true);
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optId }));
  };

  const handleNext = () => {
    if (currentIdx < OSPE_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setHasAnswered(false);
    setUserAnswers({});
    setIsCompleted(false);
  };

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    OSPE_QUESTIONS.forEach(q => {
      const selected = userAnswers[q.id];
      const correctOpt = q.options.find(o => o.isCorrect);
      if (selected && correctOpt && selected === correctOpt.id) {
        score += 1;
      }
    });
    return score;
  };

  const getSpecimenThumbnail = (type: OspeQuestion['specimenType']) => {
    switch (type) {
      case 'head_male': return maleMacroImg;
      case 'head_female': return femaleMacroImg;
      case 'wing': return wingMacroImg;
      default: return femaleMacroImg;
    }
  };

  const score = calculateScore();
  const percentage = Math.round((score / OSPE_QUESTIONS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Station Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded-full">
            {lang === 'en' ? 'OSPE Practical Examination' : 'Stasiun Ujian Praktikum OSPE'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mt-1">
            {lang === 'en' ? 'Parasitology Spotter Stations (Anopheles)' : 'Spotter Laboratorium Parasitologi (Anopheles)'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'en' 
              ? 'Evaluate microscope slides, identify sex dimorphisms, and interpret clinical vector relevance.' 
              : 'Evaluasi preparat mikroskop, identifikasi dimorfisme seksual, dan simpulkan relevansi klinis vektor.'}
          </p>
        </div>

        {/* Question Counter */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            {lang === 'en' ? 'Station' : 'Stasiun'} <strong className="text-emerald-400">{currentIdx + 1}</strong> / {OSPE_QUESTIONS.length}
          </span>
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-8 shadow-2xl space-y-6">
          {/* Question & Specimen Visual */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Specimen Slide Thumbnail */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-md">
              <img
                src={getSpecimenThumbnail(currentQ.specimenType)}
                alt="OSPE Station Specimen"
                className="w-full aspect-4/3 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-slate-950/90 text-emerald-300 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700">
                {lang === 'en' ? 'STATION SLIDE' : 'SLIDE PREPARAT'}
              </div>
            </div>

            {/* Question Text */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>{lang === 'en' ? 'Clinical Spotter Prompt' : 'Skenario Soal Praktikum'}</span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-100 leading-snug">
                {lang === 'en' ? currentQ.questionEn : currentQ.questionId}
              </h3>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map(opt => {
              const isSelected = selectedOptionId === opt.id;
              const showSuccess = hasAnswered && opt.isCorrect;
              const showError = hasAnswered && isSelected && !opt.isCorrect;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                    showSuccess
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-1 ring-emerald-400'
                      : showError
                      ? 'bg-rose-950/80 border-rose-500 text-rose-100 ring-1 ring-rose-400'
                      : isSelected
                      ? 'bg-slate-800 border-slate-600 text-slate-100'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold uppercase ${
                      showSuccess
                        ? 'bg-emerald-500 text-slate-950'
                        : showError
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {opt.id}
                    </span>
                    <span>{lang === 'en' ? opt.textEn : opt.textId}</span>
                  </div>

                  {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {showError && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box (Revealed after answering) */}
          {hasAnswered && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase font-mono">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{lang === 'en' ? 'Parasitology Examiner Rationale' : 'Pembahasan Dosen Parasitologi'}</span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {lang === 'en' ? currentQ.explanationEn : currentQ.explanationId}
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-xs text-rose-300/90 font-mono">
                <strong>{lang === 'en' ? 'Clinical Point' : 'Poin Klinis'}:</strong>{' '}
                {lang === 'en' ? currentQ.clinicalSignificanceEn : currentQ.clinicalSignificanceId}
              </div>

              {/* Next Station Button */}
              <div className="pt-3 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
                >
                  <span>{currentIdx < OSPE_QUESTIONS.length - 1 ? (lang === 'en' ? 'Proceed to Next Station' : 'Menuju Stasiun Berikutnya') : (lang === 'en' ? 'View Final Results' : 'Lihat Hasil Akhir')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Card */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              {lang === 'en' ? 'Practical Evaluation Completed' : 'Evaluasi Praktikum Selesai'}
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-100">
              {percentage >= 80 
                ? (lang === 'en' ? 'Distinction in Medical Parasitology' : 'Kelulusan Sangat Memuaskan (Cum Laude)') 
                : (lang === 'en' ? 'Competency Acquired' : 'Kompetensi Tercapai')}
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {lang === 'en'
                ? `You scored ${score} out of ${OSPE_QUESTIONS.length} (${percentage}%). You have demonstrated solid morphological differentiation skills.`
                : `Anda memperoleh nilai ${score} dari ${OSPE_QUESTIONS.length} (${percentage}%). Anda telah menunjukkan pemahaman diferensiasi morfologi yang baik.`}
            </p>
          </div>

          {/* Quick Summary Badges */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-lg mx-auto text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block">{lang === 'en' ? 'Stations Tested' : 'Jumlah Soal'}</span>
              <strong className="text-slate-100 text-base">{OSPE_QUESTIONS.length}</strong>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block">{lang === 'en' ? 'Correct Spotters' : 'Jawaban Benar'}</span>
              <strong className="text-emerald-400 text-base">{score}</strong>
            </div>
            <div className="col-span-2 md:col-span-1 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block">{lang === 'en' ? 'Passing Grade' : 'Batas Lulus'}</span>
              <strong className={percentage >= 70 ? 'text-emerald-400 text-base' : 'text-amber-400 text-base'}>
                {percentage}%
              </strong>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'en' ? 'Retake Spotter Exam' : 'Ulangi Ujian Spotter'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
