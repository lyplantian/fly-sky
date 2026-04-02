#!/usr/bin/env python3
import os
import json
from datetime import datetime

class PublishHelper:
    def __init__(self):
        self.status_file = "PUBLISH-PROGRESS.json"
        self.load_progress()
    
    def load_progress(self):
        if os.path.exists(self.status_file):
            with open(self.status_file, 'r', encoding='utf-8') as f:
                self.progress = json.load(f)
        else:
            self.progress = {
                "last_updated": datetime.now().isoformat(),
                "deployment": {"built": True, "deployed": False},
                "materials": {"screenshots": False, "video": False, "og_image": False},
                "platforms": {
                    "product_hunt": False,
                    "hacker_news": False,
                    "reddit": False,
                    "v2ex": False,
                    "juejin": False,
                    "twitter": False,
                    "zhihu": False
                }
            }
    
    def save_progress(self):
        self.progress["last_updated"] = datetime.now().isoformat()
        with open(self.status_file, 'w', encoding='utf-8') as f:
            json.dump(self.progress, f, ensure_ascii=False, indent=2)
    
    def show_status(self):
        print("=" * 60)
        print("🚀 Starbuddy 发布状态")
        print("=" * 60)
        
        print("\n📦 部署状态:")
        print(f"   ✓ 项目构建: {'是' if self.progress['deployment']['built'] else '否'}")
        print(f"   ✓ 已部署: {'是' if self.progress['deployment']['deployed'] else '否'}")
        
        print("\n📸 素材准备:")
        print(f"   ✓ 截图: {'是' if self.progress['materials']['screenshots'] else '否'}")
        print(f"   ✓ Demo 视频: {'是' if self.progress['materials']['video'] else '否'}")
        print(f"   ✓ OG 图片: {'是' if self.progress['materials']['og_image'] else '否'}")
        
        print("\n🌐 平台发布:")
        platforms = [
            ("Product Hunt", "product_hunt"),
            ("Hacker News", "hacker_news"),
            ("Reddit", "reddit"),
            ("V2EX", "v2ex"),
            ("掘金", "juejin"),
            ("Twitter/X", "twitter"),
            ("知乎", "zhihu")
        ]
        for name, key in platforms:
            status = "✓" if self.progress['platforms'][key] else "○"
            print(f"   {status} {name}")
        
        print("\n" + "=" * 60)
        print(f"最后更新: {self.progress['last_updated']}")
        print("=" * 60)
    
    def show_next_steps(self):
        print("\n📋 下一步操作建议:")
        
        if not self.progress['deployment']['deployed']:
            print("\n1. 先部署到 Cloudflare Pages:")
            print("   $ cd fly-sky")
            print("   $ npx wrangler login  # 先登录")
            print("   $ npm run deploy")
        
        if not self.progress['materials']['screenshots']:
            print("\n2. 准备产品截图（5张）:")
            print("   - 首页情绪打卡")
            print("   - AI 聊天界面")
            print("   - 应对工具包")
            print("   - 个人档案")
            print("   - 深色模式")
        
        pending = [k for k, v in self.progress['platforms'].items() if not v]
        if pending:
            print("\n3. 发布到平台（按顺序）:")
            order = ['product_hunt', 'hacker_news', 'reddit', 'v2ex', 'juejin', 'twitter', 'zhihu']
            names = {
                'product_hunt': 'Product Hunt',
                'hacker_news': 'Hacker News',
                'reddit': 'Reddit',
                'v2ex': 'V2EX',
                'juejin': '掘金',
                'twitter': 'Twitter/X',
                'zhihu': '知乎'
            }
            for i, platform in enumerate([p for p in order if p in pending], 1):
                print(f"   {i}. {names[platform]}")
        
        print("\n💡 提示: 所有文案都在 LAUNCH.md 中")

def main():
    helper = PublishHelper()
    helper.show_status()
    helper.show_next_steps()

if __name__ == "__main__":
    main()
