'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { fetchAvailableSpecialNeeds, fetchWizardResults, type WizardResults } from './actions';
import ProgressHero from './ProgressHero';
import OptionCard from './OptionCard';
import ResultCard from './ResultCard';
import {
  SPECIAL_NEEDS,
  type BreedSize,
  type LifeStage,
  type Species,
  type SpecialNeed,
  type WizardAnswers,
  type WizardStep,
} from './types';

const LIFE_STAGES: LifeStage[] = ['cachorro', 'adulto', 'senior'];
const BREED_SIZES: BreedSize[] = ['mini', 'pequena', 'mediana', 'grande', 'todas'];

const ALL_STEPS: WizardStep[] = ['species', 'lifeStage', 'breedSize', 'specialNeed', 'result'];

function DogGlyph() {
  return (
    <svg width={40} height={40} viewBox="0 0 80 80" fill="none" stroke="#0085CA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 38c0-9 8-16 18-16s18 7 18 16v8c0 8-8 14-18 14s-18-6-18-14v-8z" />
      <path d="M22 36c-3-6-7-8-10-6s-2 10 4 14" />
      <path d="M58 36c3-6 7-8 10-6s2 10-4 14" />
      <circle cx="32" cy="42" r="1.6" fill="#0085CA" stroke="none" />
      <circle cx="48" cy="42" r="1.6" fill="#0085CA" stroke="none" />
      <path d="M40 50c-2 0-3 1-3 2.5 0 1.2 1.2 2 3 2s3-.8 3-2c0-1.5-1-2.5-3-2.5z" fill="#0085CA" stroke="none" />
    </svg>
  );
}

function CatGlyph() {
  return (
    <svg width={40} height={40} viewBox="0 0 80 80" fill="none" stroke="#3F8C5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 36c0-9 8-14 18-14s18 5 18 14v10c0 8-8 14-18 14s-18-6-18-14v-10z" />
      <path d="M22 32l-4-12 12 6z" />
      <path d="M58 32l4-12-12 6z" />
      <circle cx="32.5" cy="41.5" r="1.4" fill="#3F8C5E" stroke="none" />
      <circle cx="47" cy="41.5" r="1.4" fill="#3F8C5E" stroke="none" />
      <path d="M40 49l-2-2h4z" fill="#3F8C5E" stroke="none" />
    </svg>
  );
}

export default function FoodFinder() {
  const t = useTranslations('foodFinder');
  const params = useParams();
  const lang = params.lang as string;

  const [answers, setAnswers] = useState<WizardAnswers>({
    species: null,
    lifeStage: null,
    breedSize: null,
    specialNeed: null,
  });
  const [stepIndex, setStepIndex] = useState(0);
  const [results, setResults] = useState<WizardResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [availableNeeds, setAvailableNeeds] = useState<SpecialNeed[]>(SPECIAL_NEEDS);

  const steps = useMemo<WizardStep[]>(() => {
    if (answers.species === 'felino') {
      return ['species', 'lifeStage', 'specialNeed', 'result'];
    }
    return ALL_STEPS;
  }, [answers.species]);

  const currentStep = steps[stepIndex];

  useEffect(() => {
    if (!answers.species) return;
    let cancelled = false;
    fetchAvailableSpecialNeeds(answers.species).then((needs) => {
      if (!cancelled) setAvailableNeeds(needs);
    });
    return () => {
      cancelled = true;
    };
  }, [answers.species]);

  async function fetchResults(finalAnswers: WizardAnswers) {
    setLoading(true);
    try {
      const data = await fetchWizardResults(finalAnswers, lang);
      setResults(data);
    } finally {
      setLoading(false);
    }
  }

  function goNext() {
    const isLastQuestion = stepIndex === steps.length - 2;
    if (isLastQuestion) {
      fetchResults(answers);
      setStepIndex(stepIndex + 1);
      return;
    }
    setStepIndex(stepIndex + 1);
  }

  function goBack() {
    setStepIndex(Math.max(0, stepIndex - 1));
  }

  function resetWizard() {
    setAnswers({ species: null, lifeStage: null, breedSize: null, specialNeed: null });
    setStepIndex(0);
    setResults(null);
    setAvailableNeeds(SPECIAL_NEEDS);
  }

  const canContinue =
    (currentStep === 'species' && answers.species !== null) ||
    (currentStep === 'lifeStage' && answers.lifeStage !== null) ||
    (currentStep === 'breedSize' && answers.breedSize !== null) ||
    currentStep === 'specialNeed';

  return (
    <>
      <ProgressHero steps={steps} currentIndex={stepIndex} />

      <section className="sec-pad" style={{ background: '#fff' }}>
        <div className="auto-container">
          {currentStep !== 'result' ? (
            <div
              style={{
                maxWidth: 1100,
                margin: '0 auto',
                background: '#fff',
                border: '1px solid #e6e9ee',
                borderRadius: 12,
                boxShadow: '0 14px 40px rgba(27,54,93,0.07)',
                padding: '40px 40px 32px',
              }}
            >
              {currentStep === 'species' && (
                <StepQuestion title={t('species.title')} description={t('species.description')}>
                  <div className="row clearfix">
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 20 }}>
                      <OptionCard
                        label={t('species.dog')}
                        sub={t('species.dogSub')}
                        blurb={t('species.dogBlurb')}
                        icon={<DogGlyph />}
                        accent="#0085CA"
                        selected={answers.species === 'canino'}
                        onSelect={() =>
                          setAnswers((a) => ({ ...a, species: 'canino' as Species, breedSize: null }))
                        }
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginBottom: 20 }}>
                      <OptionCard
                        label={t('species.cat')}
                        sub={t('species.catSub')}
                        blurb={t('species.catBlurb')}
                        icon={<CatGlyph />}
                        accent="#3F8C5E"
                        selected={answers.species === 'felino'}
                        onSelect={() =>
                          setAnswers((a) => ({ ...a, species: 'felino' as Species, breedSize: null }))
                        }
                      />
                    </div>
                  </div>
                </StepQuestion>
              )}

              {currentStep === 'lifeStage' && (
                <StepQuestion title={t('lifeStage.title')} description={t('lifeStage.description')}>
                  <div className="row clearfix">
                    {LIFE_STAGES.map((stage) => (
                      <div key={stage} className="col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: 20 }}>
                        <OptionCard
                          label={t(`lifeStage.${stage}`)}
                          selected={answers.lifeStage === stage}
                          onSelect={() => setAnswers((a) => ({ ...a, lifeStage: stage }))}
                        />
                      </div>
                    ))}
                  </div>
                </StepQuestion>
              )}

              {currentStep === 'breedSize' && (
                <StepQuestion title={t('breedSize.title')} description={t('breedSize.description')}>
                  <div className="row clearfix">
                    {BREED_SIZES.map((size) => (
                      <div key={size} className="col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: 20 }}>
                        <OptionCard
                          label={t(`breedSize.${size}`)}
                          sub={t(`breedSize.${size}Sub`)}
                          selected={answers.breedSize === size}
                          onSelect={() => setAnswers((a) => ({ ...a, breedSize: size }))}
                        />
                      </div>
                    ))}
                  </div>
                </StepQuestion>
              )}

              {currentStep === 'specialNeed' && (
                <StepQuestion title={t('specialNeed.title')} description={t('specialNeed.description')}>
                  <div className="row clearfix">
                    <div className="col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: 20 }}>
                      <OptionCard
                        label={t('specialNeed.none')}
                        sub={t('specialNeed.noneSub')}
                        selected={answers.specialNeed === null}
                        onSelect={() => setAnswers((a) => ({ ...a, specialNeed: null }))}
                      />
                    </div>
                    {availableNeeds.map((need) => (
                      <div key={need} className="col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: 20 }}>
                        <OptionCard
                          label={t(`specialNeed.options.${need}`)}
                          selected={answers.specialNeed === need}
                          onSelect={() => setAnswers((a) => ({ ...a, specialNeed: need as SpecialNeed }))}
                        />
                      </div>
                    ))}
                  </div>
                </StepQuestion>
              )}

              <div
                style={{
                  marginTop: 32,
                  paddingTop: 24,
                  borderTop: '1px solid #e6e9ee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 16,
                }}
              >
                <button
                  type="button"
                  onClick={goBack}
                  disabled={stepIndex === 0}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: stepIndex === 0 ? 'not-allowed' : 'pointer',
                    color: stepIndex === 0 ? '#c7ccd3' : '#1B365D',
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: 0,
                  }}
                >
                  ← {t('back')}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 12, color: '#8a909a' }}>
                    {canContinue ? `✓ ${t('readyToContinue')}` : t('selectToContinue')}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canContinue}
                    className="theme-btn btn-one"
                    style={{
                      opacity: canContinue ? 1 : 0.5,
                      cursor: canContinue ? 'pointer' : 'not-allowed',
                    }}
                  >
                    <span>
                      {stepIndex === steps.length - 2 ? t('seeResults') : t('continue')} →
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <FoodFinderResults
              lang={lang}
              loading={loading}
              results={results}
              onReset={resetWizard}
            />
          )}
        </div>
      </section>
    </>
  );
}

function StepQuestion({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="sec-title mb_30">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}

function FoodFinderResults({
  lang,
  loading,
  results,
  onReset,
}: {
  lang: string;
  loading: boolean;
  results: WizardResults | null;
  onReset: () => void;
}) {
  const t = useTranslations('foodFinder.result');

  if (loading) {
    return <p style={{ textAlign: 'center' }}>...</p>;
  }

  const exactMatches = results?.exactMatches ?? [];
  const complementary = results?.complementary ?? [];

  if (exactMatches.length === 0 && complementary.length === 0) {
    return (
      <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <p>{t('noResults')}</p>
        <button type="button" onClick={onReset} className="theme-btn btn-two" style={{ marginTop: 20 }}>
          <span>↻ {t('newSearch')}</span>
        </button>
      </div>
    );
  }

  const [bestMatch, ...alternatives] = exactMatches;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div className="sec-title mb_30" style={{ textAlign: 'center' }}>
        <h2>{t('title')}</h2>
        <p>{t('subtitle')}</p>
      </div>

      {exactMatches.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: alternatives.length > 0 ? '1fr 1fr' : '1fr', gap: 24 }}>
          <ResultCard lang={lang} product={bestMatch} best />
          {alternatives.map((product) => (
            <ResultCard key={product._id} lang={lang} product={product} />
          ))}
        </div>
      )}

      {complementary.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <div
            style={{
              fontWeight: 800,
              fontSize: 12,
              color: '#0085CA',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {t('complementaryTitle')}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {complementary.map((product) => (
              <ResultCard key={product._id} lang={lang} product={product} />
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <button type="button" onClick={onReset} className="theme-btn btn-two">
          <span>↻ {t('newSearch')}</span>
        </button>
      </div>
    </div>
  );
}
