import React from 'react';
import { Zap, Languages } from 'lucide-react';
import { Language, Translation } from '../types';

interface HeaderProps {
  t: Translation;
  lang: Language;
  onLanguageToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ t, lang, onLanguageToggle }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Zap className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{t.title}</h1>
        </div>
        <p className="text-zinc-400 max-w-2xl">
          {t.description}
        </p>
      </div>
      <button 
        onClick={onLanguageToggle}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-xl text-sm font-medium transition-colors"
      >
        <Languages className="w-4 h-4" />
        {lang === 'en' ? '中文' : 'English'}
      </button>
    </header>
  );
};
