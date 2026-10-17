import { formatMedianTps, MODEL_SPEED_RANKINGS, RANKING_SOURCE } from '../data/modelSpeedRankings';
import { translations } from '../i18n/translations';
import { Language } from '../types';
import { fill, metaDescription, seoCopy, titleTag } from './copy';
import {
  APP_PATH,
  HREFLANG,
  PAGE_UPDATED,
  SHARE_IMAGE,
  SITE_ORIGIN,
  SOURCE_URL,
  htmlLang,
  pageUrl,
} from './site';

export interface SeoFacts {
  date: string;
  updated: string;
  a: string;
  aTps: string;
  b: string;
  bTps: string;
  c: string;
  cTps: string;
}

export function rankingFacts(): SeoFacts {
  const [first, second, third] = MODEL_SPEED_RANKINGS.filter(
    (row) => !row.speedBasis || row.speedBasis === 'aa-median'
  );
  const speed = (value: number | undefined) => (value == null ? '' : formatMedianTps(value));
  return {
    date: RANKING_SOURCE.fetchedAt,
    updated: PAGE_UPDATED,
    a: first?.displayName ?? '',
    aTps: speed(first?.medianTps),
    b: second?.displayName ?? '',
    bTps: speed(second?.medianTps),
    c: third?.displayName ?? '',
    cTps: speed(third?.medianTps),
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function extras(): SeoFacts {
  return rankingFacts();
}

export function renderMetaBlock(lang: Language): string {
  const copy = seoCopy[lang];
  const facts = extras();
  const title = titleTag(lang);
  const description = metaDescription(lang, facts);
  const url = pageUrl(lang);
  const alternates = HREFLANG.map(
    (item) =>
      `    <link rel="alternate" hreflang="${item.code}" href="${pageUrl(item.lang)}" />`,
  ).join('\n');
  const ogAlternates = HREFLANG.filter((item) => item.lang !== lang)
    .map((item) => `    <meta property="og:locale:alternate" content="${seoCopy[item.lang].ogLocale}" />`)
    .join('\n');
  return `    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="author" content="Bubufu" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />
${alternates}
    <link rel="alternate" hreflang="x-default" href="${pageUrl('zh')}" />
    <link rel="alternate" type="text/plain" href="${SITE_ORIGIN}${APP_PATH}llms.txt" title="LLM description" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(copy.siteName)}" />
    <meta property="og:locale" content="${copy.ogLocale}" />
${ogAlternates}
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${SHARE_IMAGE}" />
    <meta property="og:image:alt" content="${escapeHtml(copy.imageAlt)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${SHARE_IMAGE}" />
    <script type="application/ld+json" id="seo-jsonld">${jsonLd(lang)}</script>`;
}

export function renderGuide(lang: Language): string {
  const copy = seoCopy[lang];
  const product = translations[lang];
  const facts = extras();
  const lead = `${product.summary} ${fill(copy.leadExtra, facts)}`;
  const fastest = fill(copy.fastest, facts);
  const steps = copy.steps.map((step) => `          <li>${escapeHtml(step)}</li>`).join('\n');
  const faqs = copy.faqs
    .map((item) => {
      const answer = fill(item.a, facts);
      return `        <section>
          <h3>${escapeHtml(item.q)}</h3>
          <p>${escapeHtml(answer)}</p>
        </section>`;
    })
    .join('\n');
  const languages = HREFLANG.map((item) => {
    const name = translations[item.lang].title;
    const current = item.lang === lang ? ' aria-current="page"' : '';
    return `          <a href="${pageUrl(item.lang)}" hreflang="${item.code}"${current}>${escapeHtml(name)}</a>`;
  }).join('\n');
  return `    <article id="guide" lang="${htmlLang(lang)}">
      <div class="guide-wrap">
        <noscript><h1>${escapeHtml(product.title)}</h1></noscript>
        <p id="guide-lead">${escapeHtml(lead)}</p>
        <p id="guide-facts">${escapeHtml(fill(copy.facts, facts))}</p>
        <p id="guide-fastest">${escapeHtml(fastest)}</p>
        <h2>${escapeHtml(copy.howTitle)}</h2>
        <ol>
${steps}
        </ol>
        <h2>${escapeHtml(copy.faqTitle)}</h2>
${faqs}
        <h2>${escapeHtml(copy.languagesLabel)}</h2>
        <nav class="guide-langs" aria-label="${escapeHtml(copy.languagesLabel)}">
${languages}
        </nav>
        <p class="guide-source">${escapeHtml(copy.sourceLabel)}: <a href="${SOURCE_URL}">Artificial Analysis</a> · ${escapeHtml(facts.date)}. ${escapeHtml(copy.updatedLabel)} ${escapeHtml(facts.updated)}.</p>
      </div>
    </article>`;
}

function jsonLd(lang: Language): string {
  const copy = seoCopy[lang];
  const product = translations[lang];
  const facts = extras();
  const url = pageUrl(lang);
  const home = `${SITE_ORIGIN}/${lang}`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${url}#app`,
        name: product.title,
        alternateName: HREFLANG.map((item) => translations[item.lang].title),
        description: product.summary,
        url,
        inLanguage: htmlLang(lang),
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        browserRequirements: 'Requires JavaScript',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        provider: { '@id': `${SITE_ORIGIN}/#organization` },
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        citation: {
          '@type': 'CreativeWork',
          name: 'Artificial Analysis LLM Leaderboard',
          url: SOURCE_URL,
          datePublished: facts.date,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: titleTag(lang),
        description: metaDescription(lang, facts),
        inLanguage: htmlLang(lang),
        dateModified: PAGE_UPDATED,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        about: { '@id': `${url}#app` },
        primaryImageOfPage: SHARE_IMAGE,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#guide-lead', '#guide-facts', '#guide-fastest'],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: copy.siteName, item: home },
          { '@type': 'ListItem', position: 2, name: product.title, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: htmlLang(lang),
        url,
        mainEntity: copy.faqs.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: fill(item.a, facts) },
        })),
      },
    ],
  };
  return JSON.stringify(graph).replaceAll('<', '\\u003c');
}

export function localizeDocument(html: string, lang: Language): string {
  const meta = renderMetaBlock(lang);
  const guide = renderGuide(lang);
  let next = html.replace(
    /<html lang="[^"]*"(?: data-locale="[^"]*")?>/,
    `<html lang="${htmlLang(lang)}" data-locale="${lang}">`,
  );
  next = next.replace(/<!--seo:meta-->[\s\S]*?<!--\/seo:meta-->/, `<!--seo:meta-->\n${meta}\n    <!--/seo:meta-->`);
  next = next.replace(/<!--seo:guide-->[\s\S]*?<!--\/seo:guide-->/, `<!--seo:guide-->\n${guide}\n    <!--/seo:guide-->`);
  return next;
}

export function renderLlmsTxt(): string {
  const facts = rankingFacts();
  const lines = [
    '# Token Speed Simulator',
    '',
    '> See the pace of AI. 看见人工智能的响应节奏。',
    '',
    'Browser player for AI output pacing. It does not call a model API, does not require login, and does not upload the source text. About 4 characters count as 1 token. Speeds are a curated Artificial Analysis median output tokens/s snapshot, not a live benchmark.',
    '',
    `Fastest on the ${facts.date} snapshot: ${facts.a} ${facts.aTps} t/s, then ${facts.b} ${facts.bTps} t/s and ${facts.c} ${facts.cTps} t/s. Gemini 4 Argon has no published median and is omitted. Cost is shown only when an output price is published.`,
    '',
    `Source: ${SOURCE_URL}`,
    `Snapshot: ${facts.date}`,
    `Page updated: ${facts.updated}`,
    '',
    '## Languages',
    '',
  ];
  for (const item of HREFLANG) {
    const product = translations[item.lang];
    lines.push(`- [${product.title}](${pageUrl(item.lang)}): ${product.summary}`);
  }
  lines.push(
    '',
    '## Quotes',
    '',
    ...HREFLANG.map((item) => `- ${item.code}: ${translations[item.lang].summary}`),
    '',
  );
  return lines.join('\n');
}

export function renderSitemapXml(): string {
  const links = [
    ...HREFLANG.map(
      (item) =>
        `    <xhtml:link rel="alternate" hreflang="${item.code}" href="${escapeHtml(pageUrl(item.lang))}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeHtml(pageUrl('zh'))}"/>`,
  ].join('\n');
  const urls = HREFLANG.map(
    (item) => `  <url>
    <loc>${escapeHtml(pageUrl(item.lang))}</loc>
    <lastmod>${PAGE_UPDATED}</lastmod>
${links}
  </url>`,
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}
