# WORKLOG.md

## 2026-10-12

- Fast-forwarded local `main` to the latest ranking build (`family` groups, source fetch, output cost).
- Aligned visible copy, page title, and description with bubufu.com in zh, zh-Hant, en, ja, and ko.
- Language now follows the `bubufu-language` cookie and the page the visitor came from. Changing language here writes that cookie back.
- Canonical URL is `https://bubufu.com/tools/token-speed-simulator/`.

## 2026-09-13

- Grouped ranking rows by mainstream model lines (`family`) instead of one flat list; empty Grok/Qwen buckets stay reserved.
- Switching A or B to a different model line now resets that pane’s stream text; same-line TPS changes keep text.
- Restored an always-visible source editor and added URL fetch (Vite `/api/fetch-page` plus client fallbacks) that fills the source box without clearing the stage.
- Browser-checked desktop family sections, same-line keep vs cross-line clear (including compare B), URL fetch of example.com, and ~390px family pills with Play still visible.
- Added AA-sourced Qwen / GLM / Kimi / MiniMax / Grok family sections; Doubao and ERNIE omitted (no published median TPS).
- Surface output $/1M, $/s · $/min · $/h, and cumulative spend from AA list prices when available.
- After mobile verification, constrained the ranking chip row (`min-w-0` + fixed height) so Play stays on-screen at ~390px.
- Added a relative lead bar on A/B panes so the race stays readable after both streams fill.
- Curated an in-repo Artificial Analysis median output-speed snapshot (20 models, fetched 2026-09-13).
- Ranking rows now set simulator TPS; Compare races two models side by side from one Play action.
- Rebuilt the shell as a 100dvh adaptive stage with ranking/controls collapsing under or beside the stream.
- Consolidated zh/en copy into `src/i18n/translations.ts`, persisted language, and synced `html lang`.
- Raised `MAX_TPS` to 2000 so the fastest AA rows have headroom.

## 2026-09-03 · 主站工具部署

- 新增主站子路径、移除无用密钥注入、修正元信息与返回入口。已部署到 https://bubufu.com/tools/ ，保持免费可直接使用。完整验收、限制和回滚见 /Users/jammyfu/works/AI/Global/bubufu-server/deployment-reviews/20260903-tools-v1/README.md。

## 2026-04-18

- Bootstrapped the repository into the `continuous-project-loop` structure.
- Added durable planning files, governance logs, and a repo-level verification entry.
- Standardized the README entry section and automation guidance for `TokenSpeedSimulator`.
