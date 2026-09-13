import { extractReadableText, looksLikeHtml } from './readableText';
import { parsePublicHttpUrl, SourceFetchError } from './sourceUrl';

export { SourceFetchError } from './sourceUrl';
export type { SourceFetchErrorCode } from './sourceUrl';

export interface FetchedSourcePage {
  title: string;
  text: string;
  sourceUrl: string;
}

async function readApiPayload(res: Response): Promise<FetchedSourcePage> {
  const data = (await res.json()) as Partial<FetchedSourcePage> & { error?: string };
  if (!res.ok) {
    if (data.error === 'invalid' || data.error === 'blocked' || data.error === 'empty') {
      throw new SourceFetchError(data.error);
    }
    throw new SourceFetchError('failed');
  }
  if (!data.text?.trim()) {
    throw new SourceFetchError('empty');
  }
  return {
    title: data.title ?? '',
    text: data.text,
    sourceUrl: data.sourceUrl ?? '',
  };
}

async function extractFromResponse(res: Response, sourceUrl: string): Promise<FetchedSourcePage> {
  if (!res.ok) {
    throw new SourceFetchError('failed');
  }
  const raw = (await res.text()).trim();
  if (!raw) {
    throw new SourceFetchError('empty');
  }
  const extracted = looksLikeHtml(raw) ? extractReadableText(raw) : { title: '', text: raw };
  const text = extracted.text.trim();
  if (!text) {
    throw new SourceFetchError('empty');
  }
  return {
    title: extracted.title,
    text,
    sourceUrl,
  };
}

export async function fetchSourcePage(rawUrl: string): Promise<FetchedSourcePage> {
  const parsed = parsePublicHttpUrl(rawUrl);
  const href = parsed.href;
  const apiUrl = `/api/fetch-page?url=${encodeURIComponent(href)}`;

  try {
    const apiRes = await fetch(apiUrl);
    if (apiRes.status !== 404) {
      return await readApiPayload(apiRes);
    }
  } catch {
    // Static hosts have no proxy — fall through to browser fetch.
  }

  try {
    const direct = await fetch(href);
    return await extractFromResponse(direct, href);
  } catch {
    const reader = await fetch(`https://r.jina.ai/${href}`);
    return await extractFromResponse(reader, href);
  }
}
