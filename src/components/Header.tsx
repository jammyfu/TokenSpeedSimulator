import React from 'react';
import { Zap } from 'lucide-react';
import { Language, Translation } from '../types';

const languageOptions: { id: Language; label: string }[] = [
  { id: 'zh', label: '🇨🇳 简体中文' },
  { id: 'zh-Hant', label: '🇭🇰 繁體中文' },
  { id: 'en', label: '🇺🇸 English' },
  { id: 'ja', label: '🇯🇵 日本語' },
  { id: 'ko', label: '🇰🇷 한국어' },
];

interface HeaderProps {
  t: Translation;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ t, lang, onLanguageChange }) => {
  return (
    <header className="shrink-0 flex items-center justify-between gap-3 px-3 py-2 md:px-4 md:py-2.5 border-b border-white/10">
      <div className="min-w-0 flex items-center gap-2.5">
        <a
          href={`https://bubufu.com/${lang}`}
          className="shrink-0 text-[11px] text-zinc-400 hover:text-white"
        >
          ← {t.back}
        </a>
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
      <label className="shrink-0 text-[11px] text-zinc-500">
        <span className="sr-only">{t.language}</span>
        <select
          aria-label={t.language}
          value={lang}
          onChange={(event) => onLanguageChange(event.target.value as Language)}
          className="max-w-[9.5rem] rounded-lg border border-white/10 bg-zinc-900 px-2 py-1 text-[11px] font-medium text-zinc-200"
        >
          {languageOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </header>
  );
};
