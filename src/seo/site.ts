import { Language } from '../types';

export const SITE_ORIGIN = 'https://bubufu.com';
export const APP_PATH = '/tools/token-speed-simulator/';
export const PAGE_UPDATED = '2026-10-13';
export const SOURCE_URL = 'https://artificialanalysis.ai/leaderboards/models';
export const SHARE_IMAGE = 'https://bubufu.com/bubufu-seal-v1.webp';

export const LOCALE_SLUG: Record<Language, string> = {
  zh: '',
  'zh-Hant': 'zh-hant',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  es: 'es',
  pt: 'pt',
  ro: 'ro',
  fr: 'fr',
  de: 'de',
};

const SLUG_LANG: Record<string, Language> = {
  'zh-hant': 'zh-Hant',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  es: 'es',
  pt: 'pt',
  ro: 'ro',
  fr: 'fr',
  de: 'de',
};

export function htmlLang(lang: Language): string {
  return lang === 'zh' ? 'zh-CN' : lang;
}

export function pageUrl(lang: Language): string {
  const slug = LOCALE_SLUG[lang];
  return `${SITE_ORIGIN}${APP_PATH}${slug ? `${slug}/` : ''}`;
}

export function localeFromRequestPath(url: string): Language | null {
  const path = url.split('?')[0]?.split('#')[0] ?? '';
  const match = path.match(/\/(zh-hant|en|ja|ko|es|pt|ro|fr|de)\/?$/);
  return match ? SLUG_LANG[match[1]] ?? null : null;
}

export const HREFLANG: { code: string; lang: Language }[] = [
  { code: 'zh', lang: 'zh' },
  { code: 'zh-Hant', lang: 'zh-Hant' },
  { code: 'en', lang: 'en' },
  { code: 'ja', lang: 'ja' },
  { code: 'ko', lang: 'ko' },
  { code: 'es', lang: 'es' },
  { code: 'pt', lang: 'pt' },
  { code: 'ro', lang: 'ro' },
  { code: 'fr', lang: 'fr' },
  { code: 'de', lang: 'de' },
];
