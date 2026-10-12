# DECISIONS.md

## 2026-10-12

- The simulator uses the same five locales as bubufu.com: `zh`, `zh-Hant`, `en`, `ja`, `ko`.
- Product lines match the live site: 「看见人工智能的响应节奏。」 / “See the pace of AI.” and the longer catalog sentence in each language.
- Language follows the `bubufu-language` cookie, then the bubufu referrer path, then the browser. Changing it here writes the same cookie.
- The public app stays at `https://bubufu.com/tools/token-speed-simulator/`.

## 2026-09-03 · 主站工具部署

- 工具继续挂在主站子路径，免费、可直接使用，不接入收费。

## 2026-09-13

- Present rankings by household model **line/family** (OpenAI/GPT, Anthropic/Claude, Google/Gemini, SpaceXAI/Grok, DeepSeek, Alibaba/Qwen, Z AI/GLM, Kimi, MiniMax, plus speed specialists / other). Keep global AA rank numbers and median TPS. Skip Doubao/ERNIE until AA publishes a median Tokens/s.
- Clear streamed output only when the selected A or B **family** changes. Same-line SKU/TPS tweaks may keep text. Editing or URL-fetching source updates input only.
- Source fetch uses a same-origin Vite `/api/fetch-page` proxy (dev/preview), then direct fetch, then a public reader fallback. Private/localhost URLs are rejected.
- Streaming cost uses **output** USD / 1M tokens from AA model pages. Missing prices show — rather than guessed numbers. Formula: spend = tokens × $/token; rate = TPS × $/token.
- Treat Artificial Analysis public leaderboard **median output tokens/s** as the speed source of truth, stored as a curated snapshot (no API key).
- Keep a short ranked set (~20): fastest AA callouts plus well-known mid/slow frontier models for contrast.
- Ranking is the content; Play is the only primary action. A/B compare is optional and side-by-side.
- Single i18n module (`src/i18n/translations.ts`) — App.tsx no longer owns a second string table.
- Fullscreen shell uses `100dvh` + CSS grid that stacks on ~390px and places ranking beside the stage on desktop.
- Accept new product UI beyond the original governance “no new feature work” boundary because the owner requested a watchable ranking demo.

## 2026-04-18

- Adopt `CURRENT_PLAN.md` as the only current execution entry for `TokenSpeedSimulator`.
- Keep the repository-specific product or technical direction unchanged during governance bootstrap.
- Use `python3 tools/verify.py` as the canonical verification entrypoint.
