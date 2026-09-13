<!-- BEGIN:personal-project-standard-entry -->
## Project Entry

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
- Stack: Vite + TypeScript frontend.
- Current goal: Watchable, comparable LLM token-speed demo grounded in Artificial Analysis rankings, with fullscreen adaptive layout and zh/en switching.
<!-- END:personal-project-standard-entry -->

# Token 输出速度演示 (Token Speed Simulator)

一个旨在可视化大语言模型 (LLM) 流式输出速度的工具。通过调整每秒 Token 数 (TPS)，用户可以直观地感受到不同 AI 模型的响应流畅度。

## 🚀 核心特性

- **权威排行定速**: 内置 [Artificial Analysis](https://artificialanalysis.ai/leaderboards/models) 中位输出 tokens/s 快照（2026-09-13），点选模型即可按该速度播放。
- **可看、可对比**: 主舞台是流式输出；可选 A/B 并排竞速，一个「播放」按钮。
- **全屏自适应**: 铺满视口（100dvh），手机到桌面切换为上下/左右布局。
- **中英切换**: zh/en 文案单一来源，语言选择会记住并更新 `html lang`。
- **实时速度控制**: 支持 1–2000 TPS，覆盖当前 AA 最快模型并留出余量。
- **动态渲染**: 内置 Markdown 渲染，模拟真实流式格式。

## 🛠️ 快速开始

### 前提条件

- [Node.js](https://nodejs.org/) (建议最新 LTS 版本)

### 本地运行

1. **安装依赖**:
   ```bash
   npm install
   ```

2. **配置环境变量**:
   复制 `.env.example` 为 `.env.local` 并配置您的 API 密钥（如需）：
   ```bash
   cp .env.example .env.local
   ```

3. **启动开发服务器**:
   ```bash
   npm run dev
   ```
   默认端口为 `3000`。

## 🧪 技术栈

- **前端框架**: [React 19](https://react.dev/)
- **构建工具**: [Vite 6](https://vitejs.dev/)
- **样式方案**: [Tailwind CSS 4](https://tailwindcss.com/)
- **动画引擎**: [Motion (Framer Motion)](https://motion.dev/)
- **图标库**: [Lucide React](https://lucide.dev/)

---
由 [Antigravity](https://github.com/google-deepmind/antigravity) 辅助开发。
