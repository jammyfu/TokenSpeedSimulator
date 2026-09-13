# CHANGELOG.md

## 2026-09-13

- Grouped the ranking UI by mainstream model lines and reserved empty Grok/Qwen families.
- Clearing the stage when the selected A/B model line changes; same-line switches keep text.
- Source text is editable again on all breakpoints; a URL can be fetched into the source box.
- Added Artificial Analysis output-speed rankings that set simulator TPS.
- Added optional side-by-side A/B speed race from a single Play control.
- Switched the app shell to a viewport-filling adaptive layout.
- Consolidated and persisted zh/en translations; `html lang` follows the switcher.
- Raised the TPS cap from 1500 to 2000.

## 2026-04-18

- Added standardized governance files and continuous loop entrypoints.
- Added a repo-level `tools/verify.py` and `tools/next_plan.py`.
- Normalized the README entry section for agent and human navigation.
