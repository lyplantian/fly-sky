
// 简单的 og:image 生成脚本
// 可以在浏览器中运行，或者用 puppeteer 等工具生成

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建一个简单的 SVG 作为 og:image
const svgContent = `
&lt;svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"&gt;
  &lt;defs&gt;
    &lt;linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%"&gt;
      &lt;stop offset="0%" style="stop-color:#667eea;stop-opacity:1" /&gt;
      &lt;stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" /&gt;
    &lt;/linearGradient&gt;
  &lt;/defs&gt;
  
  &lt;!-- 背景 --&gt;
  &lt;rect width="1200" height="630" fill="url(#bgGradient)"/&gt;
  
  &lt;!-- 标题 --&gt;
  &lt;text x="600" y="250" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle"&gt;
    Starbuddy
  &lt;/text&gt;
  
  &lt;!-- 副标题 --&gt;
  &lt;text x="600" y="330" font-family="Arial, sans-serif" font-size="32" fill="rgba(255,255,255,0.9)" text-anchor="middle"&gt;
    Your low-pressure vibe check
  &lt;/text&gt;
  
  &lt;!-- 功能点 --&gt;
  &lt;text x="600" y="420" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.8)" text-anchor="middle"&gt;
    🎯 30s Mood Check • 💬 AI Chat • 🛠️ Coping Tools
  &lt;/text&gt;
  
  &lt;!-- URL --&gt;
  &lt;text x="600" y="520" font-family="Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.7)" text-anchor="middle"&gt;
    nanobananalyp.shop
  &lt;/text&gt;
&lt;/svg&gt;
`;

// 保存 SVG
const ogImagePath = path.join(__dirname, '../assets/og-image.svg');
fs.writeFileSync(ogImagePath, svgContent);
console.log('✅ OG Image SVG 已生成:', ogImagePath);

// 创建一个简单的说明文件
const readmeContent = `
# OG Image 生成说明

由于当前环境无法使用浏览器截图，我们创建了一个 SVG 版本的 og:image。

## 使用方法

1. 在浏览器中打开 og-image.svg
2. 截图保存为 og-image.png (1200x630)
3. 或者使用在线 SVG 转 PNG 工具

## 在线工具推荐

- https://cloudconvert.com/svg-to-png
- https://convertio.co/zh/svg-png/

## 截图指南

同时也需要截取以下页面：
1. 首页情绪打卡 - 01-homepage.png
2. AI 聊天界面 - 02-chat.png
3. 应对工具包 - 03-cope-toolkit.png
4. 个人档案 - 04-profile.png
5. 深色模式 - 05-dark-mode.png

保存到 assets/screenshots/ 目录
`;

fs.writeFileSync(path.join(__dirname, '../assets/OG-IMAGE-README.md'), readmeContent);
console.log('✅ 说明文件已生成');

// 更新发布进度
const progressPath = path.join(__dirname, '../PUBLISH-PROGRESS.json');
const progress = JSON.parse(fs.readFileSync(progressPath, 'utf-8'));
progress.materials.og_image = true;
progress.last_updated = new Date().toISOString();
fs.writeFileSync(progressPath, JSON.stringify(progress, null, 2));
console.log('✅ 发布进度已更新');

console.log('\n📋 下一步：');
console.log('1. 在本地浏览器中打开 https://nanobananalyp.shop');
console.log('2. 截取 5 张核心页面截图');
console.log('3. 将截图保存到 fly-sky/assets/screenshots/');
console.log('4. 然后我们就可以开始发布了！');
