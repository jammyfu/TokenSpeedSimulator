import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_LANGUAGE, LANG_STORAGE_KEY } from '../constants';
import { translations } from '../i18n/translations';
import { Language } from '../types';

function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'en' || stored === 'zh') return stored;
  } catch {
    // Ignore blocked storage (private mode, etc.)
  }
  return DEFAULT_LANGUAGE;
}

export function useLanguage() {
  const [lang, setLangState] = useState<Language>(readStoredLanguage);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore blocked storage
    }
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
  }, []);

  return { lang, setLang, t };
}
