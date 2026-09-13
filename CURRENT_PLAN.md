# CURRENT_PLAN.md

## Goal

Turn Token Speed Simulator into a watchable, comparable LLM token-speed demo grounded in Artificial Analysis output-speed rankings, with a fullscreen adaptive layout and a single zh/en i18n source.

## Tasks

- [x] Curate a typed AA median output-speed snapshot (`src/data/modelSpeedRankings.ts`) and cite source + date.
- [x] Drive simulator TPS from ranking selection; support optional A/B race compare.
- [x] Collapse the page into a 100dvh adaptive stage + ranking/controls layout.
- [x] Consolidate zh/en strings, persist the language switcher, and update `html lang`.
- [x] Raise TPS headroom for the fastest AA models.
- [x] Run `python3 tools/verify.py`.

## Out Of Scope

- Live Artificial Analysis API fetch (requires a key).
- Locales beyond zh/en.
- Screenshot-based visual regression.

## Verification

- Run `python3 tools/verify.py`
- Exercise Play, ranking click, A/B compare, and language switch in the browser.

## Next Candidates

- Add scripted demo scenarios.
- Document performance expectations at different TPS values.
- Add screenshot-based regression checks.
