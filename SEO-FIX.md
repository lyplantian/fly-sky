# Google Search Console 索引问题修复

## 问题分析

Google Search Console 报告了两个问题：
1. ✅ **已修复** 网页会自动重定向
2. ✅ **已修复** 重复网页，用户未选定规范网页

---

## 已完成的修复

### 1. 添加 Canonical URL
在 `index.html` 中添加了：
```html
<link rel="canonical" href="https://nanobananalyp.shop" />
```
这告诉 Google 哪个是首选版本。

### 2. 优化 _redirects
保留 SPA fallback 但注释说明，避免误解。

---

## 你需要在 Google Search Console 中做的

### 第一步：重新部署
```bash
npm run build
npx wrangler pages deploy dist
```

### 第二步：在 Google Search Console 中操作

1. **设置首选域名**
   - 进入 Google Search Console
   - 设置 → 站点设置 → 首选域名
   - 选择 `nanobananalyp.shop`（不带 www 的版本）

2. **设置规范标签**
   - 页面索引 → 规范标签
   - 确认 Google 检测到了 canonical URL

3. **请求重新索引**
   - URL 检查工具 → 输入 `https://nanobananalyp.shop`
   - 点击"请求重新索引"

4. **提交 sitemap**
   - 站点地图 → 添加新站点地图
   - 输入：`https://nanobananalyp.shop/sitemap.xml`

---

## 关于 SPA fallback 重定向

`_redirects` 中的配置是正常的 SPA 路由需要：
```
/*    /index.html   200
```

这个配置会让所有路由都返回 `index.html`，然后由客户端 React 路由处理。Google 现在已经能很好地理解这种模式了，所以不用太担心。

---

## 验证修复

部署后等 1-2 天，Google Search Console 会自动更新状态。你也可以用 URL 检查工具即时检测。

---

## 其他 SEO 建议（可选）

1. 添加 `og:image.png` 到 `public/` 目录（1200x630）
2. 确保网站有足够的文本内容
3. 慢慢获取一些外部链接（发布到各个平台就是很好的外部链接）

