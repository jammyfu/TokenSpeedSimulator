# CURRENT_PLAN.md

## Goal

Polish the watchable AA ranking demo: group models by mainstream lines/families, and clear staged output when the selected line changes.

## Tasks

- [x] Add a `family` field on the AA snapshot and group helpers (`src/data/modelFamilies.ts`).
- [x] Render ranking UI by household lines (OpenAI, Anthropic, Google, DeepSeek, speed specialists / other).
- [x] Clear streamed text and reset stream state when A or B switches to a different model line.
- [x] zh/en labels for family names; keep one Play action and `100dvh` shell.
- [x] Run `python3 tools/verify.py`.
- [ ] Browser-check grouping + line-change clear (including A/B compare).

## Out Of Scope

- Live Artificial Analysis API fetch (requires a key).
- Adding Grok/Qwen rows that are not in the current snapshot.
- Locales beyond zh/en.

## Verification

- Run `python3 tools/verify.py`
- Confirm ranking sections are grouped by family, not a single flat list.
- Play a model, switch to another row in the same line — text may remain.
- Switch to a different line (and A/B across lines) — output text clears.

## Next Candidates

- Add scripted demo scenarios.
- Document performance expectations at different TPS values.
- Add screenshot-based regression checks.
