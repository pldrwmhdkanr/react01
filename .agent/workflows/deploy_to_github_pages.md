---
description: 部署 React 应用到 GitHub Pages 的详细流程
---

# 部署到 GitHub Pages

按照以下步骤将您的应用部署到 GitHub Pages。

1. **提交代码更改 (Commit Changes)**:
   确保您所有的配置更改（如 `vite.config.js` 和 `package.json` 的修改）都已经提交到 Git。
   ```bash
   git add .
   git commit -m "配置 GitHub Pages 部署"
   ```

2. **运行部署脚本 (Run Deploy)**:
   此命令会自动执行 `npm run build` 构建项目，然后将生成的 `dist` 目录推送到远程的 `gh-pages` 分支。
   // turbo
   ```bash
   npm run deploy
   ```

3. **验证部署 (Verify)**:
   - 部署脚本完成后，访问 GitHub 仓库的 **Settings** (设置) -> **Pages**.
   - 确认 **Source** 是 `Deploy from a branch`.
   - 确认 **Branch** 是 `gh-pages` 并且文件夹是 `/(root)`.
   - 页面顶部应该会显示您的网站 URL，例如: `https://pldrwmhdkanr.github.io/react01/`
   - 点击该链接查看您的网站。

> [!NOTE]
> 首次部署可能需要几分钟时间才能生效。如果看到 404 错误，请稍等片刻刷新页面。
