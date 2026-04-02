import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const svgPath = path.join(process.cwd(), 'assets', 'og-image.svg');
const pngPath = path.join(process.cwd(), 'assets', 'og-image.png');

async function convertSvgToPng() {
  console.log('🎨 启动浏览器转换 SVG...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  try {
    const svgContent = fs.readFileSync(svgPath, 'utf-8');
    
    // 创建一个临时 HTML 页面来渲染 SVG
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: white; }
          svg { width: 1200px; height: 630px; }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
      </html>
    `;
    
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    await page.screenshot({ path: pngPath });
    console.log('✅ og-image.png 转换完成！');
    console.log(`📁 保存到: ${pngPath}`);

  } catch (error) {
    console.error('❌ 转换过程出错:', error);
  } finally {
    await browser.close();
  }
}

convertSvgToPng();
