import React from 'react';
import { Translation } from '../types';

interface FooterProps {
  t: Translation;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white">{t.whatIsToken}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed">
          {t.whatIsTokenDesc}
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white">{t.typicalSpeeds}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed">
          GPT-4o: ~80-100 TPS<br />
          Gemini 1.5 Flash: ~100+ TPS<br />
          Local Models (Llama 3 8B): ~20-50 TPS
        </p>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white">{t.whySpeedMatters}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed">
          {t.whySpeedMattersDesc}
        </p>
      </div>
    </footer>
  );
};
