# 部署到GitHub Pages指南

本文档提供了将红色革命旅游网站部署到GitHub Pages的详细步骤。

## 准备工作

1. 确保你有一个GitHub账号
2. 创建一个新的GitHub仓库或使用现有仓库
3. 将本项目代码推送到该仓库

## 自动部署方式（推荐）

项目已配置GitHub Actions自动部署工作流，只需按以下步骤操作：

1. 在package.json中的`homepage`字段，将`[你的GitHub用户名]`替换为你的实际GitHub用户名
   ```json
   "homepage": "https://你的GitHub用户名.github.io/red-revolution-tourism"
   ```

2. 将代码推送到GitHub仓库的main分支
   ```bash
   git add .
   git commit -m "准备部署到GitHub Pages"
   git push origin main
   ```

3. GitHub Actions将自动运行部署工作流，将网站部署到gh-pages分支

4. 在GitHub仓库设置中启用GitHub Pages
   - 进入仓库 -> Settings -> Pages
   - Source选择"Deploy from a branch"
   - Branch选择"gh-pages" -> "/(root)" -> Save

5. 几分钟后，你的网站将可通过以下地址访问：
   ```
   https://你的GitHub用户名.github.io/red-revolution-tourism
   ```

## 手动部署方式

如果你想手动部署，可以使用以下命令：

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 部署到GitHub Pages
npm run deploy
```

## 注意事项

1. 确保在package.json中正确设置了homepage字段
2. 确保vite.config.ts中的base设置为'/red-revolution-tourism/'
3. 如果你的仓库名称不是'red-revolution-tourism'，请相应修改以上两处配置
4. 首次部署可能需要几分钟才能生效

## 故障排除

如果部署后网站无法正常访问：

1. 检查GitHub仓库的Pages设置是否正确
2. 确认gh-pages分支是否存在并包含构建后的文件
3. 检查浏览器控制台是否有资源加载错误，可能需要调整vite.config.ts中的base路径
4. 确保项目中的所有资源路径都是相对路径