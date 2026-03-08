<div align="center">
<img width="1200" height="475" alt="TokenSpeedSimulator Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Token 输出速度演示 (Token Speed Simulator)

一个旨在可视化大语言模型 (LLM) 流式输出速度的工具。通过调整每秒 Token 数 (TPS)，用户可以直观地感受到不同 AI 模型的响应流畅度。

[在 AI Studio 中查看](https://ai.studio/apps/9cc63345-5fd9-4b7b-a0ad-07de1965423b)

## 🚀 核心特性

- **实时速度控制**: 支持从 1 到 1500 TPS 的精准调节，感受从“慢读”到“极速”的差异。
- **动态渲染**: 内置 Markdown 渲染支持，模拟真实 AI 交互中的格式展示。
- **监控大屏**: 自动实时统计生成用时、总 Token 数以及瞬时 TPS。
- **高级渲染策略**: 针对高速输出进行了性能优化，自动管理长文本滚动。
- **极简设计**: 响应式深色模式界面，基于现代交互美学设计。

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
