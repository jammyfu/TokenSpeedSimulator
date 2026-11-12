# Discoverability and evidence

## Suggested GitHub About

Browser-based LLM token speed simulator: compare 1–2000 TPS, A/B streaming and output-cost estimates. No model API needed for playback.

Suggested topics (proposal, not applied account settings):
`llm`, `tokens-per-second`, `token-speed`, `streaming`, `llm-visualization`, `react`, `typescript`, `vite`, `artificial-analysis`, `multilingual`.

Use **simulator**, not benchmark or live leaderboard. Avoid date-free “fastest model” claims. No SEO/GEO ranking or Star increase is guaranteed. `llms.txt` is a reading aid, not an indexing contract.

## Evidence behind the guide

| Claim | Source |
| --- | --- |
| 1–2000 TPS, 4 characters/token, 5,000-character display | `src/constants.ts`, `src/hooks/useTokenStream.ts` |
| Snapshot dates and mixed speed bases | `src/data/modelSpeedRankings.ts` |
| Ten app locales | `src/components/Header.tsx`, `src/seo/site.ts` |
| Page fetching and third-party fallback | `src/lib/fetchSourcePage.ts`, `vite.config.ts` |
| Local start and deployment base | `package.json`, `vite.config.ts` |
| License not declared | No LICENSE file at the reviewed main commit |

## Visual provenance

- Reuse `.github/social-preview.png` as the existing title image, not evidence of app behavior.
- `images/stream-comparison.png` is an unaltered screenshot of the deployed English app at https://bubufu.com/tools/token-speed-simulator/en/ captured 2026-11-12 after enabling Compare, choosing B, playing and pausing. It is not a generated mockup or a newly measured model benchmark.
- Screenshot numbers are the app's simulation state, not new performance claims. Refresh when the UI changes.
- The public deployment can differ from a future checkout. Keep code and row sources authoritative.

## Review scope

This is a documentation-only pass on current main. It does not change model rows, runtime behavior, deployment, licensing or the older open GEO PR #1. Five guides share the same use cases, facts, privacy boundaries, commands and contribution paths. Translations were AI-reviewed, not claimed as native-human review.
