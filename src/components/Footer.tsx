import React from 'react';
import { RANKING_SOURCE } from '../data/modelSpeedRankings';
import { Translation } from '../types';

interface FooterProps {
  t: Translation;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="hidden lg:block shrink-0 px-3 pb-2 pt-1.5 border-t border-line space-y-1">
      <p className="text-[10px] text-muted leading-snug line-clamp-2 lg:line-clamp-none">{t.rankingDisclaimer}</p>
      <p className="text-[10px] text-secondary leading-snug">{t.costDisclaimer.replace('{date}', RANKING_SOURCE.fetchedAt)}</p>
      <details className="text-[10px] text-secondary">
        <summary className="cursor-pointer text-muted hover:text-ink">{t.whatIsToken}</summary>
        <p className="mt-1 leading-relaxed">{t.whatIsTokenDesc}</p>
        <p className="mt-1 leading-relaxed">{t.whySpeedMattersDesc}</p>
      </details>
    </footer>
  );
};
