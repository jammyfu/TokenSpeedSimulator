import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import type { IncomingMessage, ServerResponse } from 'node:http';
import path from 'path';
import type { Plugin, ViteDevServer } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import { localizeDocument, renderLlmsTxt, renderSitemapXml } from './src/seo/render';
import { LOCALE_SLUG, localeFromRequestPath } from './src/seo/site';
import type { Language } from './src/types';
import { extractReadableText, looksLikeHtml } from './src/lib/readableText';
import { parsePublicHttpUrl, SourceFetchError } from './src/lib/sourceUrl';

const FETCH_TIMEOUT_MS = 10_000;
const FETCH_MAX_BYTES = 1_500_000;

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function pageFetchPlugin(): Plugin {
  const handler = async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const url = req.url ?? '';
    const path = url.split('?')[0] ?? '';
    if (path !== '/api/fetch-page' && !path.endsWith('/api/fetch-page')) {
      next();
      return;
    }
    if (req.method !== 'GET') {
      sendJson(res, 405, { error: 'failed' });
      return;
    }

    try {
      const requestUrl = new URL(url, 'http://127.0.0.1');
      const raw = requestUrl.searchParams.get('url') ?? '';
      const target = parsePublicHttpUrl(raw);
      const upstream = await fetch(target.href, {
        redirect: 'follow',
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        headers: {
          Accept: 'text/html,text/plain,text/markdown;q=0.9,*/*;q=0.1',
          'User-Agent': 'TokenSpeedSimulator/1.0 (+https://github.com/jammyfu/TokenSpeedSimulator)',
        },
      });

      if (!upstream.ok) {
        sendJson(res, 502, { error: 'failed' });
        return;
      }

      const reader = upstream.body?.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            received += value.byteLength;
            if (received > FETCH_MAX_BYTES) {
              await reader.cancel();
              break;
            }
            chunks.push(value);
          }
        }
      }

      const rawText = new TextDecoder('utf-8').decode(
        chunks.reduce((acc, chunk) => {
          const next = new Uint8Array(acc.length + chunk.length);
          next.set(acc, 0);
          next.set(chunk, acc.length);
          return next;
        }, new Uint8Array())
      );

      const extracted = looksLikeHtml(rawText)
        ? extractReadableText(rawText)
        : { title: '', text: rawText.trim() };
      const text = extracted.text.trim();
      if (!text) {
        sendJson(res, 422, { error: 'empty' });
        return;
      }

      sendJson(res, 200, {
        title: extracted.title,
        text,
        sourceUrl: target.href,
      });
    } catch (error) {
      if (error instanceof SourceFetchError) {
        sendJson(res, error.code === 'invalid' || error.code === 'blocked' ? 400 : 422, {
          error: error.code,
        });
        return;
      }
      sendJson(res, 502, { error: 'failed' });
    }
  };

  return {
    name: 'page-fetch-proxy',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

function seoPagesPlugin(): Plugin {
  const indexPath = path.resolve(__dirname, 'index.html');
  const extraLocales: Language[] = ['zh-Hant', 'en', 'ja', 'ko', 'es', 'pt', 'ro', 'fr', 'de'];

  const serveLocale = async (
    req: IncomingMessage,
    res: ServerResponse,
    next: (error?: unknown) => void,
    server: ViteDevServer,
  ) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      next();
      return;
    }
    const url = req.url ?? '';
    const pathname = url.split('?')[0] ?? '';
    if (pathname.endsWith('/llms.txt')) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end(renderLlmsTxt());
      return;
    }
    if (pathname.endsWith('/sitemap.xml')) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.end(renderSitemapXml());
      return;
    }
    const lang = localeFromRequestPath(pathname);
    if (!lang) {
      next();
      return;
    }
    if (!pathname.endsWith('/')) {
      const query = url.includes('?') ? `?${url.split('?')[1]}` : '';
      res.statusCode = 308;
      res.setHeader('Location', `${pathname}/${query}`);
      res.end();
      return;
    }
    try {
      const raw = fs.readFileSync(indexPath, 'utf8');
      const html = await server.transformIndexHtml(url, localizeDocument(raw, lang));
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(req.method === 'HEAD' ? undefined : html);
    } catch (error) {
      next(error);
    }
  };

  return {
    name: 'seo-locale-pages',
    enforce: 'post',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const requested = localeFromRequestPath(ctx.originalUrl ?? '');
        if (requested) return localizeDocument(html, requested);
        if (html.includes('id="guide"')) return html;
        return localizeDocument(html, 'zh');
      },
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        void serveLocale(req, res, next, server);
      });
    },
    generateBundle(_options, bundle) {
      const entry = bundle['index.html'];
      if (!entry || entry.type !== 'asset') return;
      const source = entry.source.toString();
      entry.source = localizeDocument(source, 'zh');
      for (const lang of extraLocales) {
        this.emitFile({
          type: 'asset',
          fileName: `${LOCALE_SLUG[lang]}/index.html`,
          source: localizeDocument(source, lang),
        });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/tools/token-speed-simulator/',
    plugins: [react(), tailwindcss(), pageFetchPlugin(), seoPagesPlugin()],
    build: { sourcemap: false },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
