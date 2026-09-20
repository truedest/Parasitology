export type Language = 'en' | 'id';

export type MainTab = 'infographic' | 'video' | 'microscope' | 'ospe-quiz';

export interface MorphologicalFeature {
  id: string;
  nameEn: string;
  nameId: string;
  maleDescEn: string;
  maleDescId: string;
  femaleDescEn: string;
  femaleDescId: string;
  medicalRelevanceEn: string;
  medicalRelevanceId: string;
  keyDiagnosticTermEn: string;
  keyDiagnosticTermId: string;
  examTipEn: string;
  examTipId: string;
}

export interface VideoChapter {
  id: number;
  timeStart: number; // in seconds
  duration: number;  // in seconds
  titleEn: string;
  titleId: string;
  subtitleEn: string;
  subtitleId: string;
  narrationEn: string;
  narrationId: string;
  highlightPart: 'all' | 'antenna' | 'palpi' | 'wing' | 'mouthparts' | 'posture';
  focusSex: 'both' | 'male' | 'female';
  keyTakeawayEn: string;
  keyTakeawayId: string;
}

export interface OspeQuestion {
  id: number;
  specimenType: 'head_male' | 'head_female' | 'wing' | 'resting_angle' | 'differential';
  questionEn: string;
  questionId: string;
  imagePrompt?: string;
  pointerTarget?: string;
  options: {
    id: string;
    textEn: string;
    textId: string;
    isCorrect: boolean;
  }[];
  explanationEn: string;
  explanationId: string;
  clinicalSignificanceEn: string;
  clinicalSignificanceId: string;
}

export interface DifferentialItem {
  featureEn: string;
  featureId: string;
  anophelesMaleEn: string;
  anophelesMaleId: string;
  anophelesFemaleEn: string;
  anophelesFemaleId: string;
  culexFemaleEn: string;
  culexFemaleId: string;
  aedesFemaleEn: string;
  aedesFemaleId: string;
}
