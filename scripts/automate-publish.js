#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const LAUNCH_CONTENT = fs.readFileSync(path.join(process.cwd(), 'LAUNCH.md'), 'utf8');
const TODO_CONTENT = fs.readFileSync(path.join(process.cwd(), 'TODO.md'), 'utf8');

console.log('🚀 Starbuddy 自动化发布助手\n');
console.log('=' .repeat(50));

const steps = [
  {
    name: '部署新版本',
    task: async () => {
      console.log('\n📦 正在部署到 Cloudflare Pages...');
      try {
        execSync('npx wrangler pages deploy dist', { stdio: 'inherit' });
        console.log('✅ 部署成功！');
        return true;
      } catch (error) {
        console.log('❌ 部署失败:', error.message);
        return false;
      }
    }
  },
  {
    name: '准备素材指南',
    task: async () => {
      console.log('\n📸 素材准备指南：');
      console.log('1. 需要5张产品截图（1200x800）：');
      console.log('   - 首页情绪打卡');
      console.log('   - AI 聊天界面');
      console.log('   - 应对工具包');
      console.log('   - 个人档案');
      console.log('   - 深色模式');
      console.log('\n2. 可选：15秒 demo 视频');
      console.log('3. 可选：og:image (1200x630)');
      return true;
    }
  },
  {
    name: '各平台发布文案',
    task: async () => {
      console.log('\n📝 各平台发布文案已准备好！');
      console.log('查看 LAUNCH.md 获取完整文案');
      console.log('\n发布顺序：');
      console.log('1. Product Hunt');
      console.log('2. Hacker News (Show HN)');
      console.log('3. Reddit');
      console.log('4. V2EX');
      console.log('5. 掘金');
      console.log('6. Twitter/X');
      console.log('7. 知乎');
      return true;
    }
  }
];

async function run() {
  for (let i = 0; i < steps.length; i++) {
    console.log(`\n[${i + 1}/${steps.length}] ${steps[i].name}`);
    console.log('-'.repeat(40));
    const success = await steps[i].task();
    if (!success) {
      console.log('\n⚠️  发布流程中断，请检查上述错误');
      process.exit(1);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ 自动化准备工作完成！');
  console.log('\n📋 下一步：');
  console.log('1. 手动准备截图和素材');
  console.log('2. 按顺序发布到各平台');
  console.log('3. 及时回复评论和收集反馈');
  console.log('\n💡 提示：Product Hunt 最佳发布时间是 UTC 00:00（北京时间 08:00）');
}

run().catch(console.error);
