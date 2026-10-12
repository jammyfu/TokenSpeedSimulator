import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_LANGUAGE, LANG_STORAGE_KEY, SITE_LANGUAGE_COOKIE } from '../constants';
import { translations } from '../i18n/translations';
import { Language } from '../types';

const LANGUAGES: readonly Language[] = ['zh', 'zh-Hant', 'en', 'ja', 'ko'];

export function isLanguage(value: string | null | undefined): value is Language {
  return !!value && (LANGUAGES as readonly string[]).includes(value);
}

function htmlLang(lang: Language): string {
  return lang === 'zh' ? 'zh-CN' : lang;
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

function resolveLanguage(): Language {
  const cookie = readCookie();
  if (isLanguage(cookie)) return cookie;
  return referrerLanguage() ?? browserLanguage();
}

function writePreference(lang: Language) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Ignore blocked storage.
  }
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${SITE_LANGUAGE_COOKIE}=${lang}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}

export function useLanguage() {
  const [lang, setLangState] = useState<Language>(resolveLanguage);
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = htmlLang(lang);
    document.title = `${t.title} · ${t.description}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.summary);
  }, [lang, t]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    writePreference(next);
  }, []);

  return { lang, setLang, t };
}
