# Starbuddy 发布状态追踪

## 📊 总体进度

- [ ] **第一步：部署新版本**
  - [x] 项目构建完成
  - [ ] 部署到 Cloudflare Pages（需要配置 API token）
  - [ ] 验证线上 SEO 标签

- [ ] **第二步：准备素材**
  - [ ] 5张产品截图
  - [ ] 15秒 demo 视频（可选）
  - [ ] og:image 设计（可选）

- [ ] **第三步：发布到各平台**
  - [ ] Product Hunt
  - [ ] Hacker News (Show HN)
  - [ ] Reddit (r/mentalhealth, r/productivity)
  - [ ] V2EX
  - [ ] 掘金
  - [ ] Twitter/X
  - [ ] 知乎

## 📝 快速命令

```bash
# 进入项目目录
cd fly-sky

# 构建项目
npm run build

# 部署（需要先配置 Cloudflare API token）
npm run deploy

# 运行自动化发布助手
npm run publish
```

## 🔑 Cloudflare 部署配置

要自动部署到 Cloudflare Pages，需要：

1. 创建 Cloudflare API Token：https://dash.cloudflare.com/profile/api-tokens
2. 选择 "Edit Cloudflare Workers" 模板
3. 运行以下命令配置：

```bash
export CLOUDFLARE_API_TOKEN="你的token"
export CLOUDFLARE_ACCOUNT_ID="你的account-id"
```

或者使用 wrangler login：

```bash
npx wrangler login
```

## 📋 详细发布指南

### 1. 部署新版本
- 确保在项目根目录
- 运行 `npm run build` 构建
- 运行 `npm run deploy` 部署到 Cloudflare Pages

### 2. 准备素材
- 打开 https://nanobananalyp.shop
- 截取5张关键页面截图
- 保存到 `assets/screenshots/` 目录

### 3. 平台发布顺序
1. **Product Hunt** - 最佳时间：UTC 00:00（北京时间 08:00）
2. **Hacker News** - Show HN 发布
3. **Reddit** - r/mentalhealth 和 r/productivity
4. **V2EX** - 分享到技术社区
5. **掘金** - 中文技术社区
6. **Twitter/X** - 发布2-3条推文
7. **知乎** - 回答相关问题

## 💡 提示

- 所有文案都在 LAUNCH.md 中
- 详细任务清单在 TODO.md 中
- 发布后要及时回复评论！
