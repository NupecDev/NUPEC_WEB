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
    <svg width={40} height={40} viewBox="0 0 512 512" fill="#0085CA">
      <path d="M393.3,161.33,334.532,76.438a48.09,48.09,0,0,0-38.775-20.673l-111.527-1.6-.23,0c-57.579,0-101.757,9.631-130.21,56.634C27.3,154.551,16,229.08,16,360v16H52.557L29.024,496h32.61L85.167,376H96a99.521,99.521,0,0,0,70.088-27.992c16.979-16.246,29.226-38.472,35.419-64.274l.056-.232L229.006,152h-32.69L170.337,276.488C162.425,309.168,138.766,344,96,344H48.06c.869-113.266,11.182-180.419,33.105-216.634,18.4-30.4,45.295-41.191,102.724-41.206l111.408,1.6a16.026,16.026,0,0,1,12.925,6.891L374.7,190.67,464,205.554v16.959l-14.892,79.421c-4.395,23.441-11.908,35.249-42.718,38.95L280.084,362.493,279.249,496h32l.667-106.493,98.7-16.9c22.36-2.749,38.857-9.955,50.426-22.023,9.89-10.318,15.909-23.5,19.519-42.752L496,225.487V178.446Z" />
    </svg>
  );
}

function CatGlyph() {
  return (
    <svg width={40} height={40} viewBox="0 0 512 512" fill="#0085CA">
      <path d="M374.762,186.866h0a54.1,54.1,0,0,0-51.305-36.706H280V21.552l-18.263,2.609c-41.429,5.918-73.7,26.912-95.907,62.4-16.011,25.581-23.454,53.8-26.908,74.906-23.847,18.348-44.593,43.611-61.738,75.2-14.449,26.618-26.41,57.816-35.552,92.729-15.447,58.99-17.538,107.921-17.619,109.975L24.005,496H56V440.364c.4-8.231,10.476-188.35,107.032-256.936l5.66-4.021.93-6.881C174.437,136.9,191.077,78.058,248,59.971V182.16h75.457a22.12,22.12,0,0,1,21,14.974h0c12.757,37.656,34.677,84.777,68.839,106.921l-10.274,38.528a62.688,62.688,0,0,1-62.54,46.87c-28.668-.86-58.506,2.88-88.689,11.111L240,403.779V496h32V428.468a265.353,265.353,0,0,1,67.52-7.03,94.97,94.97,0,0,0,94.418-70.61l17.088-64.081L438.3,281.293C414.5,271.093,391.936,237.558,374.762,186.866Z" />
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
                        accent="#0085CA"
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
