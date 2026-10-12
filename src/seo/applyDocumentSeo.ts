import { Language, LanguagePreference } from '../types';
import { renderGuide, renderMetaBlock } from './render';
import { htmlLang, localeFromRequestPath, pageUrl } from './site';
import { LOCALE_SLUG } from './site';

function basePath(): string {
  const base = (import.meta as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '/tools/token-speed-simulator/';
  return base.endsWith('/') ? base : `${base}/`;
}

export function languageFromPath(pathname = typeof window === 'undefined' ? '' : window.location.pathname): Language | null {
  return localeFromRequestPath(pathname);
}

export function pathForPreference(preference: LanguagePreference): string {
  if (preference === 'auto' || preference === 'zh') return basePath();
  return `${basePath()}${LOCALE_SLUG[preference]}/`;
}

function currentAppPath(): string {
  const path = window.location.pathname;
  return path.endsWith('/') ? path : `${path}/`;
}

export function navigateToPreference(preference: LanguagePreference) {
  const target = pathForPreference(preference);
  if (currentAppPath() === target) return false;
  window.location.assign(target);
  return true;
}

export function applyDocumentSeo(lang: Language) {
  const fromPath = languageFromPath();
  const canonical = pageUrl(fromPath ?? 'zh');
  document.documentElement.lang = htmlLang(lang);
  document.documentElement.dataset.locale = lang;

  const holder = document.createElement('div');
  holder.innerHTML = renderMetaBlock(lang);
  const title = holder.querySelector('title')?.textContent;
  if (title) document.title = title;
  const description = holder.querySelector('meta[name="description"]')?.getAttribute('content');
  document.querySelector('meta[name="description"]')?.setAttribute('content', description ?? '');
  for (const name of ['og:title', 'og:description', 'og:locale', 'og:image:alt']) {
    const value = holder.querySelector(`meta[property="${name}"]`)?.getAttribute('content');
    if (value) document.querySelector(`meta[property="${name}"]`)?.setAttribute('content', value);
  }
  for (const name of ['twitter:title', 'twitter:description']) {
    const value = holder.querySelector(`meta[name="${name}"]`)?.getAttribute('content');
    if (value) document.querySelector(`meta[name="${name}"]`)?.setAttribute('content', value);
  }
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
  const json = holder.querySelector('#seo-jsonld')?.textContent;
  const existing = document.getElementById('seo-jsonld');
  if (json && existing) existing.textContent = json;

  const guide = renderGuide(lang);
  const current = document.getElementById('guide');
  if (current) current.outerHTML = guide.trim();
}
