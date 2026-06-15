'use client';

import { useTranslations } from 'next-intl';

const ACCENT = {
  hepatic:  '#5C3317',
  acute:    '#B35A00',
  cardiac:  '#8B1A1A',
  hypo:     '#4A6741',
  blue:     '#0085CA',
  navy:     '#1B365D',
};

function TreeNode({ children, accent, kind = 'question' }: { children: React.ReactNode; accent: string; kind?: 'question' | 'result' }) {
  const isResult = kind === 'result';
  return (
    <div
      className={`clin-tree__node clin-tree__node--${kind}`}
      style={{
        background: isResult ? accent : '#fff',
        color: isResult ? '#fff' : ACCENT.navy,
        borderColor: accent,
      }}
    >
      {children}
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="clin-tree__arrow">
      {label && (
        <span className="clin-tree__arrow-label" style={{ borderColor: ACCENT.blue, color: ACCENT.blue }}>
          {label}
        </span>
      )}
      <svg width="16" height="28" viewBox="0 0 16 28" fill="none" stroke={ACCENT.blue} strokeWidth="1.8" strokeLinecap="round">
        <line x1="8" y1="2" x2="8" y2="20" />
        <polyline points="3,16 8,24 13,16" fill="none" />
      </svg>
    </div>
  );
}

export default function ClinicalDecisionTree() {
  const t = useTranslations('clinical.tree');

  return (
    <section className="clin-tree p_relative pt_80 pb_80">
      <div className="auto-container">
        {/* Title */}
        <div className="sec-title mb_50">
          <div className="clin-title-row">
            <div className="canine-hero__accent-bar" style={{ background: ACCENT.blue }} />
            <div>
              <span className="section-eyebrow">{t('title')}</span>
              <p className="section-sub mt_10">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Tree card */}
        <div className="clin-tree__card">
          {/* Root question */}
          <div className="clin-tree__root">
            <TreeNode accent={ACCENT.blue}>
              <div className="clin-tree__node-eyebrow" style={{ color: ACCENT.blue }}>{t('rootEyebrow')}</div>
              {t('rootQuestion')}
            </TreeNode>
          </div>

          <Arrow />

          {/* 3 branches */}
          <div className="clin-tree__branches">
            {/* HEPATIC BRANCH */}
            <div className="clin-tree__branch">
              <TreeNode accent={ACCENT.hepatic}>
                <div className="clin-tree__node-eyebrow" style={{ color: ACCENT.hepatic }}>{t('hepaticBranch')}</div>
                {t('hepaticQuestion')}
              </TreeNode>
              <Arrow label={t('yes')} />
              <TreeNode accent={ACCENT.hepatic}>{t('hepaticAcuteQuestion')}</TreeNode>
              <div className="clin-tree__sub-branches">
                <div className="clin-tree__sub-branch">
                  <Arrow label={t('acute')} />
                  <TreeNode accent={ACCENT.acute} kind="result">{t('productAcuteHepatic')}</TreeNode>
                </div>
                <div className="clin-tree__sub-branch">
                  <Arrow label={t('chronic')} />
                  <TreeNode accent={ACCENT.hepatic} kind="result">{t('productHepatic')}</TreeNode>
                </div>
              </div>
            </div>

            {/* CARDIAC BRANCH */}
            <div className="clin-tree__branch">
              <TreeNode accent={ACCENT.cardiac}>
                <div className="clin-tree__node-eyebrow" style={{ color: ACCENT.cardiac }}>{t('cardiacBranch')}</div>
                {t('cardiacQuestion')}
              </TreeNode>
              <Arrow label={t('yes')} />
              <TreeNode accent={ACCENT.cardiac}>{t('cardiacContext')}</TreeNode>
              <Arrow label={t('indicate')} />
              <TreeNode accent={ACCENT.cardiac} kind="result">{t('productCardiac')}</TreeNode>
            </div>

            {/* ALLERGY BRANCH */}
            <div className="clin-tree__branch">
              <TreeNode accent={ACCENT.hypo}>
                <div className="clin-tree__node-eyebrow" style={{ color: ACCENT.hypo }}>{t('allergyBranch')}</div>
                {t('allergyQuestion')}
              </TreeNode>
              <Arrow label={t('yes')} />
              <TreeNode accent={ACCENT.hypo}>{t('allergyContext')}</TreeNode>
              <Arrow label={t('indicate')} />
              <TreeNode accent={ACCENT.hypo} kind="result">{t('productHypo')}</TreeNode>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="clin-tree__disclaimer" style={{ borderLeftColor: ACCENT.blue, background: '#E6F1FB' }}>
            <strong style={{ color: ACCENT.navy }}>{t('disclaimerBold')} </strong>
            <span style={{ color: ACCENT.navy }}>{t('disclaimerText')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
