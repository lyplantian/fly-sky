import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const screenshotsDir = path.join(process.cwd(), 'assets', 'screenshots');

async function takeScreenshots() {
  console.log('🚀 启动浏览器...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  try {
    // 1. 首页截图
    console.log('📸 截取首页...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(screenshotsDir, '01-homepage.png') });
    console.log('✅ 首页截图完成');

    // 2. 聊天界面截图（需要先点击进入）
    console.log('📸 截取聊天界面...');
    // 尝试找到进入聊天的按钮
    const chatButton = await page.locator('text=聊天,text=Chat,a[href*="chat"]').first();
    if (await chatButton.isVisible()) {
      await chatButton.click();
      await page.waitForTimeout(2000);
    }
    await page.screenshot({ path: path.join(screenshotsDir, '02-chat.png') });
    console.log('✅ 聊天界面截图完成');

    // 3. 应对工具包
    console.log('📸 截取应对工具包...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    const toolkitButton = await page.locator('text=工具,text=Toolkit,text=应对').first();
    if (await toolkitButton.isVisible()) {
      await toolkitButton.click();
      await page.waitForTimeout(2000);
    }
    await page.screenshot({ path: path.join(screenshotsDir, '03-cope-toolkit.png') });
    console.log('✅ 应对工具包截图完成');

    // 4. 个人档案
    console.log('📸 截取个人档案...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    const profileButton = await page.locator('text=档案,text=Profile,text=我的').first();
    if (await profileButton.isVisible()) {
      await profileButton.click();
      await page.waitForTimeout(2000);
    }
    await page.screenshot({ path: path.join(screenshotsDir, '04-profile.png') });
    console.log('✅ 个人档案截图完成');

    // 5. 深色模式
    console.log('📸 截取深色模式...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    const darkButton = await page.locator('text=深色,text=Dark,text=🌙').first();
    if (await darkButton.isVisible()) {
      await darkButton.click();
      await page.waitForTimeout(2000);
    }
    await page.screenshot({ path: path.join(screenshotsDir, '05-dark-mode.png') });
    console.log('✅ 深色模式截图完成');

    console.log('\n🎉 所有截图完成！');
    console.log(`📁 截图保存在: ${screenshotsDir}`);

  } catch (error) {
    console.error('❌ 截图过程出错:', error);
  } finally {
    await browser.close();
  }
}

takeScreenshots();
