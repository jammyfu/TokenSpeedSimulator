import React from 'react';
import { Zap } from 'lucide-react';
import { Language, Translation } from '../types';

interface HeaderProps {
  t: Translation;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ t, lang, onLanguageChange }) => {
  return (
    <header className="shrink-0 flex items-center justify-between gap-3 px-3 py-2 md:px-4 md:py-2.5 border-b border-white/10">
      <div className="min-w-0 flex items-center gap-2.5">
        <div className="p-1.5 bg-emerald-500/10 rounded-lg shrink-0">
          <Zap className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm md:text-base font-semibold tracking-tight text-white truncate">
            {t.title}
          </h1>
          <p className="hidden sm:block text-[11px] text-zinc-500 truncate">{t.description}</p>
        </div>
      </div>
      <div
        className="shrink-0 inline-flex rounded-lg border border-white/10 overflow-hidden"
        role="group"
        aria-label={t.language}
      >
        <button
          type="button"
          onClick={() => onLanguageChange('zh')}
          className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
            lang === 'zh' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
          }`}
        >
          中文
        </button>
        <button
          type="button"
          onClick={() => onLanguageChange('en')}
          className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
            lang === 'en' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
          }`}
        >
          EN
        </button>
      </div>
    </header>
  );
};
