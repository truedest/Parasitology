import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Layers, 
  AlertTriangle, 
  Printer, 
  Maximize2, 
  ZoomIn,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { MORPHOLOGICAL_FEATURES, DIFFERENTIAL_TABLE, TAXONOMIC_INFO } from '../data/morphologyData';
import { HeadComparisonSvg, WingVenationSvg, RestingPostureSvg } from './AnatomicalDiagrams';

import femaleMacroImg from '../assets/images/anopheles_female_macro_1789861827124.jpg';
import maleMacroImg from '../assets/images/anopheles_male_macro_1789861843806.jpg';
import wingMacroImg from '../assets/images/anopheles_wing_macro_1789861856420.jpg';

interface InfographicViewProps {
  lang: Language;
}

export const InfographicView: React.FC<InfographicViewProps> = ({ lang }) => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('antenna');
  const [activeSpecimenModal, setActiveSpecimenModal] = useState<string | null>(null);

  const selectedFeature = MORPHOLOGICAL_FEATURES.find(f => f.id === selectedFeatureId) || MORPHOLOGICAL_FEATURES[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:space-y-4">
      {/* INFOGRAPHIC POSTER HEADER */}
      <div className="relative bg-linear-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden print:border-slate-300 print:bg-white print:p-4">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-xs font-mono font-bold uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {lang === 'en' ? 'Medical Parasitology & Entomology' : 'Parasitologi & Entomologi Kedokteran'}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-mono rounded bg-slate-800 text-slate-300 border border-slate-700">
                Culicidae: Anophelinae
              </span>
              <span className="text-xs text-amber-400 font-mono font-semibold">
                ★ {lang === 'en' ? 'High-Yield Lecture Board' : 'Papan Materi Utama Kuliah'}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-100 tracking-tight print:text-slate-900">
              {lang === 'en' 
                ? 'Morphological Dimorphism in Anopheles Mosquitoes' 
                : 'Dimorfisme Morfologi Nyamuk Anopheles Jantan & Betina'}
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed print:text-slate-700">
              {lang === 'en'
                ? 'A comprehensive medical lecture infografis detailing key morphological discriminators—including wing scale markings, maxillary palpi length & apical swelling, and antennal feathering—for parasitology laboratory and OSPE practical examinations.'
                : 'Infografis komprehensif kuliah kedokteran yang merinci pembeda morfologi utama—meliputi pola bercak sisik sayap, panjang & bentuk ujung palpus maksilaris, serta struktur antena—untuk ujian praktikum laboratorium parasitologi.'}
            </p>
          </div>

          {/* Quick Action Button & Mnemonic Box */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0 no-print">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 shadow-lg transition"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'en' ? 'Print Infographic Handout' : 'Cetak Lembar Infografis'}</span>
            </button>

            {/* Quick Mnemonic Card */}
            <div className="p-3 bg-slate-950/90 border border-amber-500/40 rounded-xl text-xs space-y-1 shadow-inner">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold block">
                {lang === 'en' ? 'KEY EXAM MNEMONIC' : 'JEMBATAN KELEDAI UJIAN'}
              </span>
              <div className="flex items-center gap-2 text-slate-200 font-mono">
                <strong className="text-blue-400">MPC:</strong>
                <span>Male Plumose Clubbed</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200 font-mono">
                <strong className="text-rose-400">FPS:</strong>
                <span>Female Pilose Slender</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MACRO PHOTOGRAPHIC COMPARISON CARDS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>{lang === 'en' ? '1. High-Magnification Laboratory Specimen Macrographs' : '1. Makrograf Spesimen Laboratorium Pembesaran Tinggi'}</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {lang === 'en' ? 'Click image to inspect anatomical callouts' : 'Klik foto untuk melihat detail anatomi'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FEMALE SPECIMEN */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-rose-500/50 transition-all group">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
              <img
                src={femaleMacroImg}
                alt="Female Anopheles stephensi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-rose-950/90 border border-rose-600 text-rose-200 px-2.5 py-1 rounded-md text-xs font-bold font-mono">
                ♀ {lang === 'en' ? 'FEMALE ADULT' : 'BETINA DEWASA'}
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-sm p-2 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                <span className="text-rose-300 font-bold block">{lang === 'en' ? 'Hematophagous Malaria Vector' : 'Vektor Malaria Menghisap Darah'}</span>
                {lang === 'en' ? 'Engorged abdomen, piercing proboscis, pilose antennae.' : 'Abdomen membuncit berisi darah, probosis penusuk, antena pilosa.'}
              </div>
            </div>
            <div className="p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span>{lang === 'en' ? 'Antenna' : 'Antena'}:</span>
                <span className="text-emerald-400 font-bold">Pilose (Sparse / Jarang)</span>
              </div>
              <div className="flex items-center justify-between font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span>{lang === 'en' ? 'Palpi' : 'Palpus'}:</span>
                <span className="text-amber-400 font-bold">{lang === 'en' ? 'Equal, Slender, Straight' : 'Sama Panjang, Ramping'}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-slate-400">
                <span>{lang === 'en' ? 'Medical Role' : 'Peran Medis'}:</span>
                <span className="text-rose-400 font-bold">{lang === 'en' ? 'Transmits Plasmodium' : 'Menularkan Malaria'}</span>
              </div>
            </div>
          </div>

          {/* MALE SPECIMEN */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-blue-500/50 transition-all group">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
              <img
                src={maleMacroImg}
                alt="Male Anopheles mosquito"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-blue-950/90 border border-blue-600 text-blue-200 px-2.5 py-1 rounded-md text-xs font-bold font-mono">
                ♂ {lang === 'en' ? 'MALE ADULT' : 'JANTAN DEWASA'}
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-sm p-2 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                <span className="text-blue-300 font-bold block">{lang === 'en' ? 'Nectarivore / Non-Vector' : 'Pemakan Nektar / Bukan Vektor'}</span>
                {lang === 'en' ? 'Plumose feathery antennae, clubbed swollen maxillary palps.' : 'Antena lebat seperti bulu unggas, ujung palpus membesar menggada.'}
              </div>
            </div>
            <div className="p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span>{lang === 'en' ? 'Antenna' : 'Antena'}:</span>
                <span className="text-emerald-400 font-bold">Plumose (Bushy / Lebat)</span>
              </div>
              <div className="flex items-center justify-between font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span>{lang === 'en' ? 'Palpi' : 'Palpus'}:</span>
                <span className="text-amber-400 font-bold">{lang === 'en' ? 'Equal + Clubbed Tips' : 'Sama Panjang + Menggada'}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-slate-400">
                <span>{lang === 'en' ? 'Medical Role' : 'Peran Medis'}:</span>
                <span className="text-blue-400 font-bold">{lang === 'en' ? 'Harmless (No Biting)' : 'Aman (Tidak Menggigit)'}</span>
              </div>
            </div>
          </div>

          {/* WING SPECIMEN */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all group">
            <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
              <img
                src={wingMacroImg}
                alt="Microscopic preparation of Anopheles wing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-amber-950/90 border border-amber-600 text-amber-200 px-2.5 py-1 rounded-md text-xs font-bold font-mono">
                ★ {lang === 'en' ? 'SPOTTED WING' : 'SAYAP BERBERCAK'}
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-sm p-2 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                <span className="text-amber-300 font-bold block">{lang === 'en' ? 'Genus Hallmark (Both Sexes)' : 'Ciri Khas Genus (Kedua Jenis)'}</span>
                {lang === 'en' ? 'Alternating dark & pale scale clusters on Costa and veins.' : 'Kelompok sisik gelap dan terang berselang-seling pada kosta.'}
              </div>
            </div>
            <div className="p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span>{lang === 'en' ? 'Scale Tuft' : 'Sisik Sayap'}:</span>
                <span className="text-amber-400 font-bold">Dark & Pale Spotted</span>
              </div>
              <div className="flex items-center justify-between font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span>{lang === 'en' ? 'Culex Wing' : 'Sayap Culex'}:</span>
                <span className="text-slate-400 font-bold">Unspotted (Polos)</span>
              </div>
              <div className="flex items-center justify-between font-mono text-slate-400">
                <span>{lang === 'en' ? 'Taxon Value' : 'Nilai Takson'}:</span>
                <span className="text-emerald-400 font-bold">Genus Diagnostic</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORE DIAGRAM: HEAD & MOUTHPARTS COMPARISON */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">2</span>
            <span>{lang === 'en' ? 'Antennae & Maxillary Palpi Length: Step-by-Step Anatomy' : 'Antena & Panjang Palpus Maksilaris: Anatomi Bertahap'}</span>
          </h2>
          {/* Feature Highlight Selector Tabs */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs no-print">
            {[
              { id: 'all', nameEn: 'All Parts', nameId: 'Semua Bagian' },
              { id: 'antenna', nameEn: 'Antennae (Plumose vs Pilose)', nameId: 'Antena' },
              { id: 'palpi', nameEn: 'Palpi (Clubbed vs Slender)', nameId: 'Palpus' },
              { id: 'mouthparts', nameEn: 'Proboscis & Stylets', nameId: 'Probosis' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFeatureId(tab.id === 'all' ? 'antenna' : tab.id)}
                className={`px-2.5 py-1 rounded-md transition ${
                  (selectedFeatureId === tab.id || (tab.id === 'all' && selectedFeatureId === 'all'))
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'en' ? tab.nameEn : tab.nameId}
              </button>
            ))}
          </div>
        </div>

        <HeadComparisonSvg lang={lang} activeFeature={selectedFeatureId} showLabels={true} />
      </div>

      {/* DETAILED MORPHOLOGICAL FEATURE MATRIX */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono font-bold">3</span>
          <span>{lang === 'en' ? 'Comprehensive Morphological Criteria Checklist' : 'Matriks Kriteria Morfologi Lengkap'}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MORPHOLOGICAL_FEATURES.map((feature, idx) => (
            <div
              key={feature.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                selectedFeatureId === feature.id
                  ? 'bg-slate-900 border-emerald-500/80 ring-1 ring-emerald-500/50 shadow-lg'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    FEATURE 0{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {lang === 'en' ? feature.keyDiagnosticTermEn.split('|')[0] : feature.keyDiagnosticTermId.split('|')[0]}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100 mb-2">
                  {lang === 'en' ? feature.nameEn : feature.nameId}
                </h3>

                <div className="space-y-2 text-xs">
                  {/* Male Characteristic */}
                  <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/40">
                    <strong className="text-blue-300 block mb-0.5 flex items-center gap-1">
                      <span>♂ Male (Jantan):</span>
                    </strong>
                    <p className="text-slate-300">
                      {lang === 'en' ? feature.maleDescEn : feature.maleDescId}
                    </p>
                  </div>

                  {/* Female Characteristic */}
                  <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/40">
                    <strong className="text-rose-300 block mb-0.5 flex items-center gap-1">
                      <span>♀ Female (Betina):</span>
                    </strong>
                    <p className="text-slate-300">
                      {lang === 'en' ? feature.femaleDescEn : feature.femaleDescId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Exam Tip Accordion / Badge */}
              <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-amber-300/90 flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{lang === 'en' ? 'OSPE Tip' : 'Tips OSPE'}:</strong>{' '}
                  {lang === 'en' ? feature.examTipEn : feature.examTipId}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WING MARKINGS & RESTING POSTURE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono font-bold">4</span>
            <span>{lang === 'en' ? 'Wing Markings & Costal Scale Pattern' : 'Pola Sisik & Bercak Sayap (Wing Markings)'}</span>
          </h2>
          <WingVenationSvg lang={lang} showLabels={true} />
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-mono font-bold">5</span>
            <span>{lang === 'en' ? 'Field Identification: Resting Posture (45°)' : 'Identifikasi Lapangan: Sikap Istirahat (45°)'}</span>
          </h2>
          <RestingPostureSvg lang={lang} />
        </div>
      </div>

      {/* DIFFERENTIAL DIAGNOSIS TABLE (ANOPHELES vs CULEX vs AEDES) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl space-y-4 print:border-slate-300 print:bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider bg-purple-950/60 border border-purple-800/60 px-2 py-0.5 rounded-full">
              {lang === 'en' ? 'Differential Diagnosis Table' : 'Tabel Diagnosis Banding'}
            </span>
            <h3 className="text-lg font-bold text-slate-100 mt-1">
              {lang === 'en' ? 'Medical Entomology Differential: Anopheles vs Culex vs Aedes' : 'Diferensiasi Vektor: Anopheles vs Culex vs Aedes'}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {lang === 'en' ? 'Standard Parasitology Exam Reference' : 'Referensi Standar Praktikum Parasitologi'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-950/60 text-slate-300">
                <th className="p-3 font-semibold">{lang === 'en' ? 'Morphological Feature' : 'Ciri Morfologi'}</th>
                <th className="p-3 font-semibold text-blue-400 bg-blue-950/30 border-l border-r border-blue-900/40">
                  ♂ Anopheles (Male)
                </th>
                <th className="p-3 font-semibold text-emerald-400 bg-emerald-950/30 border-r border-emerald-900/40">
                  ♀ Anopheles (Female)
                </th>
                <th className="p-3 font-semibold text-amber-400">♀ Culex (Female)</th>
                <th className="p-3 font-semibold text-sky-400">♀ Aedes (Female)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {DIFFERENTIAL_TABLE.map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-3 font-bold text-slate-200">
                    {lang === 'en' ? row.featureEn : row.featureId}
                  </td>
                  <td className="p-3 bg-blue-950/20 border-l border-r border-blue-900/30 font-medium text-blue-300">
                    {lang === 'en' ? row.anophelesMaleEn : row.anophelesMaleId}
                  </td>
                  <td className="p-3 bg-emerald-950/20 border-r border-emerald-900/30 font-medium text-emerald-300">
                    {lang === 'en' ? row.anophelesFemaleEn : row.anophelesFemaleId}
                  </td>
                  <td className="p-3 text-slate-400">
                    {lang === 'en' ? row.culexFemaleEn : row.culexFemaleId}
                  </td>
                  <td className="p-3 text-slate-400">
                    {lang === 'en' ? row.aedesFemaleEn : row.aedesFemaleId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NOTABLE MALARIA VECTORS CARD */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 md:p-6">
        <h4 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'en' ? 'Primary Anopheline Malaria Vectors in Clinical Parasitology' : 'Spesies Vektor Utama Anopheles dalam Parasitologi Klinis'}</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {TAXONOMIC_INFO.notableSpecies.map((sp, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="font-serif italic font-bold text-emerald-300 block mb-1">
                {sp.name}
              </span>
              <p className="text-slate-400 leading-relaxed">
                {lang === 'en' ? sp.roleEn : sp.roleId}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
