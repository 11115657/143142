# GitHub Pages 部署

1. 创建 GitHub 仓库。
2. 将本项目所有文件放到仓库 root 目录。
3. 推送到 `main` 分支。
4. 到 Settings → Pages。
5. Source 选择 GitHub Actions。
6. 等待 `Deploy Game to GitHub Pages` 工作流完成。

`vite.config.ts` 使用 `base: './'`，一般不需要修改。
