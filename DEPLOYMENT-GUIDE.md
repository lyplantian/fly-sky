# Starbuddy 部署指南

## 快速部署（推荐）

由于我们在非交互式环境中，你需要手动完成以下步骤：

### 方法一：使用 wrangler login（推荐）

在你的本地机器上运行：

```bash
cd fly-sky
npx wrangler login
```

这会打开浏览器让你授权，然后自动保存凭据。

### 方法二：使用 API Token

1. 访问 https://dash.cloudflare.com/profile/api-tokens
2. 创建 Token，选择 "Edit Cloudflare Workers" 模板
3. 复制你的 Token 和 Account ID
4. 运行：

```bash
export CLOUDFLARE_API_TOKEN="你的token"
export CLOUDFLARE_ACCOUNT_ID="你的account-id"
npm run deploy
```

## 已经部署过了？

项目之前可能已经部署过了！检查一下：

🌐 **线上地址：** https://nanobananalyp.shop

如果这个地址可以访问，说明已经部署成功了！

## 部署后的验证

部署完成后，检查：

1. ✅ 网站可以正常访问
2. ✅ SEO 标签正常（Open Graph / Twitter Cards）
3. ✅ sitemap.xml 可访问
4. ✅ robots.txt 可访问

## 下一步

部署完成后：

1. 准备 5 张产品截图
2. 按顺序发布到各平台（LAUNCH.md 有完整文案）
3. 及时回复评论收集反馈

## 快速命令备忘

```bash
# 构建项目
npm run build

# 部署（需要先登录）
npm run deploy

# 查看发布状态
python3 scripts/publish-helper.py
```
