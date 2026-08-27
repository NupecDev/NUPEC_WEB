export type Species = 'canino' | 'felino';
export type LifeStage = 'cachorro' | 'adulto' | 'senior';
export type BreedSize = 'mini' | 'pequena' | 'mediana' | 'grande' | 'todas';
export type SpecialNeed =
  | 'peso'
  | 'digestion'
  | 'renal'
  | 'urinario'
  | 'piel'
  | 'indoor'
  | 'hairball'
  | 'articular'
  | 'cardiaco'
  | 'hepatico'
  | 'alergias'
  | 'dental'
  | 'ansiedad'
  | 'cognitivo'
  | 'vitalidad';

export const SPECIAL_NEEDS: SpecialNeed[] = [
  'peso',
  'digestion',
  'renal',
  'urinario',
  'piel',
  'indoor',
  'hairball',
  'articular',
  'cardiaco',
  'hepatico',
  'alergias',
  'dental',
  'ansiedad',
  'cognitivo',
  'vitalidad',
];

export type WizardAnswers = {
  species: Species | null;
  lifeStage: LifeStage | null;
  breedSize: BreedSize | null;
  specialNeed: SpecialNeed | null;
};

export type WizardStep = 'species' | 'lifeStage' | 'breedSize' | 'specialNeed' | 'result';

export type WizardProductResult = {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  color?: string;
  image?: { asset: { _ref: string }; alt: string };
  species: Species;
  specialNeeds?: SpecialNeed[];
  categoria: string;
  presentations?: string[];
};
