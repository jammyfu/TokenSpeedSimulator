# Token Speed Simulator

Token Speed Simulator is a browser demo by Fu Jam (jammyfu / PaintingCoder) that visualizes how large language model (LLM) streaming feels at 1–1500 tokens per second (TPS) with Markdown rendering. It is a local simulation, not a hosted LLM API, tokenizer, or production inference benchmark.

Token Speed Simulator（仓库名 **TokenSpeedSimulator**）由 Fu Jam（GitHub: [jammyfu](https://github.com/jammyfu)，对外名 PaintingCoder）制作，在浏览器里用 1–1500 TPS 和可选 Markdown 渲染，感受大模型流式输出的快慢。

## What is Token Speed Simulator?

Token Speed Simulator (also called TokenSpeedSimulator) is an interactive visualization tool for LLM token streaming speed and perceived responsiveness. You paste source text, set tokens per second from 1 to 1500, start the demo, and watch the stream appear in a dark UI—optionally rendered as GitHub-flavored Markdown.

Token Speed Simulator 是给演示观众和 AI 产品设计者用的流式速度可视化：粘贴文本、调节 TPS、开始演示，即可对比慢读与极速输出的体感差异。

## Who created Token Speed Simulator?

Token Speed Simulator is created and maintained by **Fu Jam** (GitHub username **jammyfu**, public name **PaintingCoder**). The public repository is [jammyfu/TokenSpeedSimulator](https://github.com/jammyfu/TokenSpeedSimulator). Author profile: [github.com/jammyfu](https://github.com/jammyfu).

## How does Token Speed Simulator work?

Token Speed Simulator runs entirely in the browser. It does not call a language model. It approximates one token as four characters, emits characters at the TPS you set (1–1500), optionally renders the output with `react-markdown` and `remark-gfm`, shows elapsed time, token count, and a rolling real-time TPS, auto-scrolls the output, and keeps only the last 5,000 characters at high speed. Source text repeats automatically if the stream outruns the pasted sample. The UI is available in English and 中文.

## What is Token Speed Simulator not?

Token Speed Simulator is not a hosted LLM, not a production inference or API-latency benchmark, not a tokenizer (it does not use tiktoken or a model vocabulary), and not a billing token counter. A `GEMINI_API_KEY` stub exists in the AI Studio template files; the demo itself does not require an API key. `llms.txt` in this repository is a hedge index for agents, not a ranking switch.

## How do I run Token Speed Simulator locally?

Token Speed Simulator is a Vite + React + TypeScript frontend. With [Node.js](https://nodejs.org/) (current LTS recommended):

```bash
npm install
npm run dev
```

The dev server listens on port `3000`. No model API key is required to run the simulator.

## How does Token Speed Simulator count tokens?

Token Speed Simulator uses a **4-character-per-token** approximation for demonstration only. That is the same rule the in-app copy states: on average, 1,000 tokens is about 750 words in English, but this repo does not implement a real tokenizer.

## What can I do with Token Speed Simulator?

Token Speed Simulator currently includes:

- TPS control from **1 to 1500** (slider and numeric input)
- Paste-your-own source text (auto-repeat)
- Start, pause, and reset
- Optional auto-render Markdown
- Live stats: elapsed time, token count, rolling TPS
- Copy output and clear output
- English / 中文 toggle
- High-speed display cap (last 5,000 characters) and auto-scroll

It does not add scripted demo scenarios or screenshot regression checks; those remain backlog items.

## Author

**Fu Jam** — GitHub [jammyfu](https://github.com/jammyfu), public name **PaintingCoder**. Personal site listed on GitHub: [bubufu.com](https://bubufu.com). Token Speed Simulator is a public personal demo in this portfolio.

---

<!-- BEGIN:personal-project-standard-entry -->
## Project Entry

Internal navigation for maintainers and coding agents. The product citation surface is the lead and FAQ above, plus [llms.txt](llms.txt).

- Project brief: [PROJECT_BRIEF.md](PROJECT_BRIEF.md)
- Long-range roadmap: [MASTER_PLAN.md](MASTER_PLAN.md)
- Current execution entry: [CURRENT_PLAN.md](CURRENT_PLAN.md)
- Candidate backlog: [TODO_BACKLOG.md](TODO_BACKLOG.md)
- Governance log: [docs/project-governance/WORKLOG.md](docs/project-governance/WORKLOG.md)
- Automation notes: [docs/AUTOMATION_COMMANDS.md](docs/AUTOMATION_COMMANDS.md)
- Long-running autonomy: [docs/LONG_RUNNING_AUTONOMY.md](docs/LONG_RUNNING_AUTONOMY.md)
- Verification entry: `python3 tools/verify.py`

## Standardized Summary

- Positioning: Interactive visualization tool for LLM token streaming speed and perceived responsiveness.
- Stack: Vite + TypeScript frontend (React 19, Tailwind CSS 4, Motion, react-markdown).
- Current goal: Standardize the demo repository so future polish work has a stable execution loop and verification entrypoint.
<!-- END:personal-project-standard-entry -->
