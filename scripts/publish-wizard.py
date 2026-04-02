#!/usr/bin/env python3
import os
import json
import time
from datetime import datetime

class PublishWizard:
    def __init__(self):
        self.status_file = "PUBLISH-PROGRESS.json"
        self.platforms = [
            {
                "id": "product_hunt",
                "name": "Product Hunt",
                "url": "https://www.producthunt.com",
                "description": "最重要的发布平台！建议在 UTC 00:00（北京时间 08:00）发布"
            },
            {
                "id": "hacker_news",
                "name": "Hacker News (Show HN)",
                "url": "https://news.ycombinator.com",
                "description": "技术社区，标题必须以 'Show HN: ' 开头"
            },
            {
                "id": "reddit",
                "name": "Reddit",
                "url": "https://www.reddit.com",
                "description": "发布到 r/mentalhealth 和 r/productivity"
            },
            {
                "id": "v2ex",
                "name": "V2EX",
                "url": "https://www.v2ex.com",
                "description": "中文技术社区"
            },
            {
                "id": "juejin",
                "name": "掘金",
                "url": "https://juejin.cn",
                "description": "中文技术社区，写一篇技术文章"
            },
            {
                "id": "twitter",
                "name": "Twitter/X",
                "url": "https://twitter.com",
                "description": "发 2-3 条推文"
            },
            {
                "id": "zhihu",
                "name": "知乎",
                "url": "https://www.zhihu.com",
                "description": "找相关问题回答"
            }
        ]
        self.load_progress()
    
    def load_progress(self):
        if os.path.exists(self.status_file):
            with open(self.status_file, 'r', encoding='utf-8') as f:
                self.progress = json.load(f)
        else:
            self.progress = {
                "last_updated": datetime.now().isoformat(),
                "deployment": {"built": True, "deployed": True},
                "materials": {"screenshots": False, "video": False, "og_image": False},
                "platforms": {p["id"]: False for p in self.platforms}
            }
    
    def save_progress(self):
        self.progress["last_updated"] = datetime.now().isoformat()
        with open(self.status_file, 'w', encoding='utf-8') as f:
            json.dump(self.progress, f, ensure_ascii=False, indent=2)
    
    def show_header(self):
        print("\n" + "="*70)
        print("🚀 Starbuddy 发布向导".center(70))
        print("="*70)
    
    def show_status(self):
        print("\n📊 当前发布进度：")
        print("-"*40)
        for i, platform in enumerate(self.platforms, 1):
            status = "✅" if self.progress["platforms"][platform["id"]] else "⭕"
            print(f"  {status} {i}. {platform['name']}")
    
    def show_platform_info(self, platform):
        print(f"\n{'='*70}")
        print(f"🎯 {platform['name']}".center(70))
        print(f"{'='*70}")
        print(f"\n📝 描述：{platform['description']}")
        print(f"🔗 链接：{platform['url']}")
        print(f"\n📋 详细操作步骤请查看：STEP-BY-STEP-PUBLISH.md")
        print(f"📋 文案参考：PLATFORM-POSTS.md")
    
    def mark_complete(self, platform_id):
        self.progress["platforms"][platform_id] = True
        self.save_progress()
        print(f"\n✅ {platform_id} 已标记为完成！")
    
    def run(self):
        self.show_header()
        
        while True:
            self.show_status()
            
            print("\n" + "-"*70)
            print("请选择要进行的操作：")
            print("  数字 - 选择对应的平台开始发布")
            print("  s - 查看完整状态")
            print("  q - 退出")
            
            choice = input("\n请输入选项: ").strip().lower()
            
            if choice == 'q':
                print("\n👋 再见！继续加油！🚀")
                break
            elif choice == 's':
                continue
            elif choice.isdigit():
                idx = int(choice) - 1
                if 0 <= idx < len(self.platforms):
                    platform = self.platforms[idx]
                    if self.progress["platforms"][platform["id"]]:
                        print(f"\n⚠️  {platform['name']} 已经完成了！")
                        continue
                    
                    self.show_platform_info(platform)
                    
                    print(f"\n{'='*70}")
                    print("📌 下一步操作：")
                    print(f"   1. 打开上面的链接")
                    print(f"   2. 按照 STEP-BY-STEP-PUBLISH.md 中的步骤操作")
                    print(f"   3. 完成后回来这里标记完成")
                    
                    confirm = input(f"\n完成了吗？标记 {platform['name']} 为完成？(y/n): ").strip().lower()
                    if confirm == 'y':
                        self.mark_complete(platform["id"])
                else:
                    print("\n❌ 无效的选项，请重试")
            else:
                print("\n❌ 无效的选项，请重试")

def main():
    wizard = PublishWizard()
    wizard.run()

if __name__ == "__main__":
    main()
