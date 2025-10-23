# Changelog Glassmorphism

一个跨平台的更新日志查看器，采用玻璃态设计风格，支持从 GitHub 动态获取更新日志。

## 功能特性

- **动态获取更新日志**：从 GitHub Releases API 实时获取项目更新日志，无需硬编码
- **玻璃态设计**：现代化的玻璃态（Glassmorphism）UI 设计
- **跨平台支持**：使用 Tauri 框架构建，支持 Windows、macOS 和 Linux
- **多语言支持**：支持英文和中文等多种语言
- **深色/浅色主题**：内置主题切换功能
- **响应式设计**：完全响应式的用户界面，适配各种屏幕尺寸
- **搜索和过滤**：支持按关键词搜索和按更新类型过滤

## 项目结构

```
changelog-glassmorphism/
├── src/                          # React 前端代码
│   ├── components/               # React 组件
│   │   ├── changelog/           # 更新日志相关组件
│   │   ├── ui/                  # UI 组件库
│   │   └── ...
│   ├── hooks/                    # React Hooks
│   │   ├── useChangelog.js      # 更新日志 Hook（主入口）
│   │   ├── useGitHubChangelog.js # GitHub API 集成 Hook
│   │   └── ...
│   ├── config/                   # 配置文件
│   │   └── github.js            # GitHub 配置
│   ├── i18n/                     # 国际化配置
│   ├── utils/                    # 工具函数
│   └── ...
├── src-tauri/                    # Tauri 桌面应用代码
│   ├── src/                      # Rust 源代码
│   ├── Cargo.toml               # Rust 依赖配置
│   └── tauri.conf.json          # Tauri 应用配置
├── dist/                         # 构建输出目录
├── package.json                  # Node.js 依赖配置
├── vite.config.js               # Vite 构建配置
└── .env.example                 # 环境变量示例
```

## 快速开始

### 前置要求

- Node.js 18.0 或更高版本
- pnpm 包管理器
- Rust 1.77.2 或更高版本（用于构建桌面应用）

### 安装依赖

```bash
pnpm install
```

### 开发模式

#### 运行 Web 应用

```bash
pnpm dev
```

应用将在 `http://localhost:5173` 启动。

#### 运行桌面应用（Tauri）

```bash
pnpm tauri:dev
```

### 构建应用

#### 构建 Web 应用

```bash
pnpm build
```

构建输出将在 `dist/` 目录中。

#### 构建桌面应用

```bash
pnpm tauri:build
```

构建输出将在 `src-tauri/target/release/` 目录中。

## 配置

### GitHub 仓库配置

应用默认从 `chronie-shizutoki/changelog-glassmorphism` 仓库获取更新日志。

要更改仓库，请创建 `.env` 文件（参考 `.env.example`）：

```bash
# GitHub Configuration
VITE_GITHUB_OWNER=your-username
VITE_GITHUB_REPO=your-repo-name

# Optional: GitHub API token for higher rate limits
# VITE_GITHUB_TOKEN=your_github_token_here
```

### 环境变量

- `VITE_GITHUB_OWNER`：GitHub 仓库所有者（默认：`chronie-shizutoki`）
- `VITE_GITHUB_REPO`：GitHub 仓库名称（默认：`changelog-glassmorphism`）
- `VITE_GITHUB_TOKEN`：GitHub API Token（可选，用于提高 API 速率限制）

## 数据流

1. **应用启动**：`useChangelog` Hook 被调用
2. **获取数据**：`useGitHubChangelog` Hook 向 GitHub API 发送请求
3. **解析数据**：GitHub Releases 数据被转换为应用内部格式
4. **渲染界面**：React 组件渲染转换后的数据

## API 集成

### GitHub Releases API

应用使用 GitHub REST API 的 Releases 端点：

```
GET /repos/{owner}/{repo}/releases
```

**响应格式示例：**

```json
[
  {
    "tag_name": "v1.0.0",
    "name": "Version 1.0.0",
    "body": "## Features\n- Feature 1\n- Feature 2\n\n## Bug Fixes\n- Fix 1",
    "published_at": "2025-10-21T00:00:00Z",
    "draft": false,
    "prerelease": false,
    "html_url": "https://github.com/owner/repo/releases/tag/v1.0.0"
  }
]
```

## 更新日志格式

应用支持 Markdown 格式的更新日志。建议使用以下格式组织发布说明：

```markdown
## Features
- New feature 1
- New feature 2

## Bug Fixes
- Fixed issue 1
- Fixed issue 2

## Breaking Changes
- Breaking change 1

## Improvements
- Improvement 1
```

## 构建输出

### Web 应用

- **输出目录**：`dist/`
- **主文件**：`dist/index.html`
- **可部署到**：任何静态文件服务器（Netlify、Vercel、GitHub Pages 等）

### 桌面应用

- **Windows**：`src-tauri/target/release/bundle/msi/`
- **macOS**：`src-tauri/target/release/bundle/dmg/`
- **Linux**：`src-tauri/target/release/bundle/deb/`

## 开发指南

### 添加新功能

1. 在相应的组件或 Hook 中添加代码
2. 运行 `pnpm lint` 检查代码质量
3. 运行 `pnpm dev` 或 `pnpm tauri:dev` 测试功能
4. 提交代码：`git commit -m "feat: description"`

### 修复 Bug

1. 定位并修复问题
2. 运行 `pnpm lint` 检查代码
3. 测试修复
4. 提交代码：`git commit -m "fix: description"`

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 相关资源

- [Tauri 文档](https://tauri.app/)
- [React 文档](https://react.dev/)
- [GitHub API 文档](https://docs.github.com/rest)
- [Vite 文档](https://vitejs.dev/)

## 技术栈

- **前端框架**：React 19
- **构建工具**：Vite 6
- **样式**：Tailwind CSS 4
- **UI 组件**：Radix UI
- **桌面框架**：Tauri 2
- **国际化**：i18next
- **Markdown 渲染**：react-markdown
- **图标**：lucide-react

## 常见问题

### Q: 如何更改查看的仓库？

A: 修改 `.env` 文件中的 `VITE_GITHUB_OWNER` 和 `VITE_GITHUB_REPO` 环境变量。

### Q: 如何提高 API 速率限制？

A: 在 `.env` 文件中设置 `VITE_GITHUB_TOKEN`。获取 Token：https://github.com/settings/tokens

### Q: 应用支持哪些平台？

A: 支持 Windows、macOS 和 Linux。Web 版本可以在任何现代浏览器中运行。

### Q: 如何自定义应用外观？

A: 修改 `src/App.css` 和 Tailwind CSS 配置文件。

## 更新日志

详见 [GitHub Releases](https://github.com/chronie-shizutoki/changelog-glassmorphism/releases)

