import React from 'react';
import { Zap } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { ThemePreference } from '../theme/theme';
import { Language, LanguagePreference, Translation } from '../types';

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
  preference: LanguagePreference;
  onLanguageChange: (preference: LanguagePreference) => void;
}

const selectClass =
  'rounded-[5px] border border-line bg-surface px-1.5 py-[7px] text-xs font-medium text-ink';

export const Header: React.FC<HeaderProps> = ({ t, lang, preference, onLanguageChange }) => {
  const { preference: theme, setTheme } = useTheme();

  return (
    <header className="shrink-0 flex items-center justify-between gap-3 px-3 py-2 md:px-4 md:py-2.5 border-b border-line bg-paper">
      <div className="min-w-0 flex items-center gap-2.5">
        <a
          href={`https://bubufu.com/${lang}`}
          className="shrink-0 text-[11px] text-muted hover:text-ink"
        >
          ← {t.back}
        </a>
        <div className="p-1.5 bg-selected rounded-lg shrink-0">
          <Zap className="w-4 h-4 text-accent" />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm md:text-base font-semibold tracking-tight text-ink truncate">
            {t.title}
          </h1>
          <p className="hidden sm:block text-[11px] text-muted truncate">{t.description}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <label className="text-[11px] text-muted">
          <span className="sr-only">{t.theme}</span>
          <select
            aria-label={t.theme}
            value={theme}
            onChange={(event) => setTheme(event.target.value as ThemePreference)}
            className={`max-w-[6.5rem] ${selectClass}`}
          >
            <option value="auto">{t.themeSystem}</option>
            <option value="light">{t.themeLight}</option>
            <option value="dark">{t.themeDark}</option>
          </select>
        </label>
        <label className="text-[11px] text-muted">
          <span className="sr-only">{t.language}</span>
          <select
            aria-label={t.language}
            value={preference}
            onChange={(event) => onLanguageChange(event.target.value as LanguagePreference)}
            className={`max-w-[11rem] ${selectClass}`}
          >
            <option value="auto">{t.auto}</option>
            {languageOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
};
