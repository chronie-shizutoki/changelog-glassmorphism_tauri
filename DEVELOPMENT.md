# 开发指南

本文档提供了开发 Changelog Glassmorphism 应用的详细指南。

## 开发环境设置

### 系统要求

- Node.js 18.0 或更高版本
- pnpm 10.0 或更高版本
- Rust 1.77.2 或更高版本（用于桌面应用开发）
- Git

### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/chronie-shizutoki/changelog-glassmorphism.git
cd changelog-glassmorphism
```

2. **安装依赖**

```bash
pnpm install
```

3. **配置环境变量**

```bash
cp .env.example .env
# 编辑 .env 文件，设置你的 GitHub 配置
```

## 项目架构

### 前端架构

```
React App
├── App.jsx (主应用组件)
├── components/
│   ├── Header.jsx (头部)
│   ├── changelog/
│   │   ├── EnhancedChangelogList.jsx (主列表)
│   │   ├── ChangelogEntry.jsx (单条条目)
│   │   └── ChangelogList.jsx (基础列表)
│   ├── SearchFilter.jsx (搜索和过滤)
│   ├── ChangelogStats.jsx (统计信息)
│   └── ...
├── hooks/
│   ├── useChangelog.js (主 Hook，调用 useGitHubChangelog)
│   ├── useGitHubChangelog.js (GitHub API 集成)
│   ├── useTheme.js (主题管理)
│   └── ...
├── config/
│   └── github.js (GitHub 配置)
├── utils/
│   ├── dateUtils.js (日期工具)
│   └── ...
└── i18n/
    └── locales/ (多语言文件)
```

### 数据流

```
useChangelog Hook
    ↓
useGitHubChangelog Hook
    ↓
GitHub API (GET /repos/{owner}/{repo}/releases)
    ↓
数据转换 (parseReleaseBody, determineVersionType)
    ↓
React State (setChangelog)
    ↓
EnhancedChangelogList Component
    ↓
ChangelogEntry Component
    ↓
UI 渲染
```

## 核心功能开发

### 1. GitHub 数据获取

**文件**：`src/hooks/useGitHubChangelog.js`

**关键函数**：

- `parseReleaseBody(body)`：解析 GitHub Release 的 body 字段，提取不同类型的变更
- `determineVersionType(version)`：根据版本号判断版本类型（major/minor/patch）
- `fetchChangelog()`：向 GitHub API 发送请求并转换数据

**示例**：

```javascript
const { changelog, loading, error, refetch } = useGitHubChangelog(
  'owner',
  'repo',
  'optional-token'
);
```

### 2. 数据转换

GitHub Release 数据被转换为以下格式：

```javascript
{
  version: "1.0.0",           // 版本号
  date: "2025-10-21",         // 发布日期
  type: "major",              // 版本类型
  title: {                    // 多语言标题
    en: "Version 1.0.0",
    zh: "版本 1.0.0"
  },
  description: {              // 多语言描述
    en: "Release",
    zh: "发布"
  },
  changes: [                  // 变更列表
    {
      type: "feature",        // 变更类型
      content: {
        en: "New feature description",
        zh: "新功能描述"
      }
    }
  ],
  url: "https://...",         // GitHub Release URL
  isDraft: false,             // 是否为草稿
  isPrerelease: false         // 是否为预发布
}
```

### 3. 组件开发

#### EnhancedChangelogList.jsx

主要列表组件，负责：
- 获取更新日志数据
- 搜索和过滤功能
- 显示统计信息
- 错误处理和加载状态

#### ChangelogEntry.jsx

单条条目组件，负责：
- 显示版本信息
- 展开/折叠详情
- Markdown 渲染
- 多语言支持

## 常见开发任务

### 添加新的变更类型

1. **在 `useGitHubChangelog.js` 中更新 `parseReleaseBody` 函数**

```javascript
if (header.includes('new-type')) {
  currentType = 'new-type';
}
```

2. **在 `ChangelogEntry.jsx` 中添加样式**

```javascript
const getChangeTypeClass = (type) => {
  // 添加新类型的样式
};
```

3. **在国际化文件中添加翻译**

```json
{
  "changeType": {
    "new-type": "New Type"
  }
}
```

### 修改数据获取逻辑

1. 编辑 `src/hooks/useGitHubChangelog.js`
2. 修改 `parseReleaseBody()` 或 `fetchChangelog()` 函数
3. 运行 `pnpm dev` 测试
4. 提交代码

### 添加新的配置选项

1. 在 `src/config/github.js` 中添加配置项
2. 在 `.env.example` 中添加说明
3. 在 `getGitHubConfig()` 函数中处理环境变量

### 更新 UI 样式

1. 修改相应组件的 CSS 类或 Tailwind 类
2. 在 `src/App.css` 中添加全局样式
3. 运行 `pnpm dev` 预览效果

## 测试

### 运行 Lint

```bash
pnpm lint
```

### 本地测试

```bash
# Web 版本
pnpm dev

# 桌面版本
pnpm tauri:dev
```

### 测试不同的仓库

修改 `.env` 文件：

```bash
VITE_GITHUB_OWNER=test-owner
VITE_GITHUB_REPO=test-repo
```

## 构建和部署

### 构建 Web 应用

```bash
pnpm build
```

输出在 `dist/` 目录。

### 构建桌面应用

```bash
pnpm tauri:build
```

输出在 `src-tauri/target/release/bundle/` 目录。

### 部署 Web 应用

可部署到以下平台：
- GitHub Pages
- Netlify
- Vercel
- 任何静态文件服务器

## 跨平台构建工作流

本项目使用 GitHub Actions 工作流来自动化构建跨平台应用包。工作流配置位于 `.github/workflows/build-tauri.yml`。

### 工作流触发条件

工作流在以下情况下触发：

1. **标签推送**：当推送到带有 `*` 格式的标签时
2. **Pull Request**：当有 PR 提交到 `main` 分支时
3. **手动触发**：通过 GitHub 界面手动触发

### 支持的平台

工作流将为以下平台构建应用：

- **Windows**：生成 `.msi` 和 `.exe`（NSIS）安装程序
- **macOS**：生成 `.dmg` 安装程序
- **Linux**：生成 `.deb` 包和 `.AppImage` 文件

### 构建产物

构建完成后，工作流将：

1. 上传构建产物作为 GitHub Actions 工作流的产物（artifacts）
2. 如果是标签推送，还会将构建产物作为 GitHub Release 的资产上传

### 自定义依赖安装

工作流使用自定义的依赖安装操作（`.github/actions/install-deps`）来确保在所有平台上都正确安装了必要的系统依赖。

## 发布应用

要发布新版本的应用：

1. 更新 `package.json` 和 `src-tauri/tauri.conf.json` 中的版本号
2. 创建一个新的标签并推送到 GitHub：

```bash
git tag vX.Y.Z
git push origin vX.Y.Z
```

3. GitHub Actions 将自动构建应用并创建一个新的 Release
4. 前往 GitHub 仓库的 Releases 页面，编辑发布说明并发布

## 环境变量

应用支持以下环境变量（可在 `.env` 文件中设置）：

- `VITE_GITHUB_TOKEN`：GitHub API 令牌，用于提高 API 速率限制
- `VITE_GITHUB_OWNER`：GitHub 仓库所有者
- `VITE_GITHUB_REPO`：GitHub 仓库名称

请参考 `.env.example` 文件了解如何设置这些变量。

## 故障排除

### 构建失败

如果工作流构建失败，请检查以下几点：

1. 确保所有依赖项都在 `package.json` 中正确列出
2. 检查 `src-tauri/tauri.conf.json` 中的配置是否正确
3. 查看 GitHub Actions 工作流日志以获取详细的错误信息

### 权限问题

确保工作流有足够的权限来创建发布和上传资产。工作流配置中已经包含了必要的权限设置：

```yaml
permissions:
  contents: write
```

## 调试

### 浏览器开发者工具

在 Web 应用中，按 F12 打开开发者工具。

### Tauri 调试

在桌面应用中，按 Ctrl+Shift+I（Windows/Linux）或 Cmd+Option+I（macOS）打开开发者工具。

### 控制台日志

```javascript
console.log('Debug message:', data);
```

## 代码风格

### ESLint 配置

项目使用 ESLint 进行代码检查。运行以下命令检查代码：

```bash
pnpm lint
```

### 命名规范

- **组件**：PascalCase（如 `ChangelogEntry.jsx`）
- **函数**：camelCase（如 `parseReleaseBody`）
- **常量**：UPPER_SNAKE_CASE（如 `GITHUB_CONFIG`）
- **CSS 类**：kebab-case（如 `glass-card`）

### 注释

```javascript
/**
 * 函数描述
 * @param {type} param - 参数描述
 * @returns {type} 返回值描述
 */
function myFunction(param) {
  // 实现细节注释
}
```

## Git 工作流

### 提交消息格式

遵循 Conventional Commits 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型**：
- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码风格调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建、依赖等杂项

**示例**：

```
feat(github): add support for custom GitHub token

Allow users to provide a GitHub API token via environment variable
to increase API rate limits.

Closes #123
```

### 分支管理

- `main`：主分支，包含稳定版本
- `develop`：开发分支
- `feature/*`：功能分支
- `fix/*`：修复分支

## 常见问题

### Q: 如何调试 GitHub API 请求？

A: 在 `useGitHubChangelog.js` 中添加 `console.log` 语句，或在浏览器开发者工具的 Network 标签中查看请求。

### Q: 如何测试不同的 GitHub 仓库？

A: 修改 `.env` 文件中的 `VITE_GITHUB_OWNER` 和 `VITE_GITHUB_REPO`。

### Q: 如何添加新的国际化语言？

A: 在 `src/i18n/locales/` 中创建新的语言文件，然后在 `src/i18n/index.js` 中注册。

### Q: 如何自定义应用图标？

A: 替换 `src-tauri/icons/` 目录中的图标文件。

## 资源链接

- [GitHub API 文档](https://docs.github.com/rest)
- [React 文档](https://react.dev/)
- [Tauri 文档](https://tauri.app/)
- [Vite 文档](https://vitejs.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [i18next 文档](https://www.i18next.com/)

## 获取帮助

如有问题，请：
1. 查看项目的 GitHub Issues
2. 提交新的 Issue
3. 提交 Pull Request 贡献代码

