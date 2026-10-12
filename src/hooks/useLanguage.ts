import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_LANGUAGE, LANG_STORAGE_KEY, SITE_LANGUAGE_COOKIE } from '../constants';
import { translations } from '../i18n/translations';
import { applyDocumentSeo, languageFromPath, navigateToPreference, pathForPreference } from '../seo/applyDocumentSeo';
import { Language, LanguagePreference } from '../types';

const LANGUAGES: readonly Language[] = ['zh', 'zh-Hant', 'en', 'ja', 'ko'];

export function isLanguage(value: string | null | undefined): value is Language {
  return !!value && (LANGUAGES as readonly string[]).includes(value);
}

function readCookie(): Language | 'auto' | null {
  if (typeof document === 'undefined') return null;
  const raw = document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${SITE_LANGUAGE_COOKIE}=`))
    ?.split('=')[1];
  if (!raw) return null;
  try {
    const value = decodeURIComponent(raw);
    if (value === 'auto') return 'auto';
    return isLanguage(value) ? value : null;
  } catch {
    return null;
  }
}

function readPreference(): LanguagePreference {
  const cookie = readCookie();
  return isLanguage(cookie) ? cookie : 'auto';
}

function referrerLanguage(): Language | null {
  if (typeof document === 'undefined' || !document.referrer) return null;
  try {
    const url = new URL(document.referrer);
    if (!/(^|\.)bubufu\.com$/i.test(url.hostname)) return null;
    const first = url.pathname.split('/').filter(Boolean)[0];
    return isLanguage(first) ? first : null;
  } catch {
    return null;
  }
}

function browserLanguage(): Language {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of languages) {
    if (!raw) continue;
    if (/^zh-(hant|hk|tw|mo)(-|$)/i.test(raw)) return 'zh-Hant';
    const base = raw.toLowerCase().split('-')[0];
    if (base === 'zh' || base === 'en' || base === 'ja' || base === 'ko') return base;
  }
  return DEFAULT_LANGUAGE;
}

function languageFor(preference: LanguagePreference, allowReferrer: boolean): Language {
  if (preference !== 'auto') return preference;
  if (allowReferrer) return referrerLanguage() ?? browserLanguage();
  return browserLanguage();
}

function writePreference(preference: LanguagePreference) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, preference);
  } catch {
    // Ignore blocked storage.
  }
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${SITE_LANGUAGE_COOKIE}=${preference}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}

export function useLanguage() {
  const fromPath = languageFromPath();
  const [preference, setPreferenceState] = useState<LanguagePreference>(fromPath ?? readPreference);
  const [lang, setLangState] = useState<Language>(() => fromPath ?? languageFor(readPreference(), true));
  const t = translations[lang];

  useEffect(() => {
    applyDocumentSeo(lang);
  }, [lang]);

  useEffect(() => {
    if (fromPath) {
      writePreference(fromPath);
      return;
    }
    if (preference !== 'auto' && preference !== 'zh') {
      window.location.replace(pathForPreference(preference));
    }
  }, [fromPath, preference]);

  useEffect(() => {
    if (preference !== 'auto' || fromPath) return;
    const apply = () => setLangState(browserLanguage());
    window.addEventListener('languagechange', apply);
    return () => window.removeEventListener('languagechange', apply);
  }, [preference, fromPath]);

  const setPreference = useCallback((next: LanguagePreference) => {
    writePreference(next);
    if (navigateToPreference(next)) return;
    setPreferenceState(next);
    setLangState(languageFor(next, false));
  }, []);

  return { lang, preference, setPreference, t };
}
