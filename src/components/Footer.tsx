import React from 'react';
import { Translation } from '../types';

interface FooterProps {
  t: Translation;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="shrink-0 px-3 pb-2 pt-1.5 border-t border-white/5 space-y-1">
      <p className="text-[10px] text-zinc-500 leading-snug line-clamp-2 lg:line-clamp-none">{t.rankingDisclaimer}</p>
      <details className="text-[10px] text-zinc-600">
        <summary className="cursor-pointer text-zinc-500 hover:text-zinc-300">{t.whatIsToken}</summary>
        <p className="mt-1 leading-relaxed">{t.whatIsTokenDesc}</p>
        <p className="mt-1 leading-relaxed">{t.whySpeedMattersDesc}</p>
      </details>
    </footer>
  );
};
