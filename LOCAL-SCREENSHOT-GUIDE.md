
# FlySky 本地截图指南

由于服务器环境没有浏览器，需要在本地电脑上完成截图。

## 📸 截图步骤

### 1. 打开网站
在浏览器中访问：https://nanobananalyp.shop

### 2. 截取 5 张核心页面

#### 01-homepage.png（首页情绪打卡）
- 访问首页
- 确保能看到 emoji 情绪选择界面
- 截图尺寸：建议 1200x800
- 保存为：`fly-sky/assets/screenshots/01-homepage.png`

#### 02-chat.png（AI 聊天界面）
- 点击进入聊天页面
- 发送几条消息展示对话效果
- 截图尺寸：建议 1200x800
- 保存为：`fly-sky/assets/screenshots/02-chat.png`

#### 03-cope-toolkit.png（应对工具包）
- 进入应对工具包页面
- 展示工具列表
- 截图尺寸：建议 1200x800
- 保存为：`fly-sky/assets/screenshots/03-cope-toolkit.png`

#### 04-profile.png（个人档案）
- 进入个人档案/历史记录页面
- 展示数据统计界面
- 截图尺寸：建议 1200x800
- 保存为：`fly-sky/assets/screenshots/04-profile.png`

#### 05-dark-mode.png（深色模式）
- 切换到深色主题
- 展示首页或聊天界面
- 截图尺寸：建议 1200x800
- 保存为：`fly-sky/assets/screenshots/05-dark-mode.png`

### 3. 生成 og:image
- 打开 `fly-sky/assets/og-image.svg`
- 截图保存为 `og-image.png`（1200x630）
- 或使用在线工具转换：https://cloudconvert.com/svg-to-png

## 📤 上传截图

截图完成后，将文件上传到服务器的对应目录：

```
fly-sky/
└── assets/
    ├── og-image.svg
    ├── og-image.png (需要添加)
    └── screenshots/
        ├── 01-homepage.png
        ├── 02-chat.png
        ├── 03-cope-toolkit.png
        ├── 04-profile.png
        └── 05-dark-mode.png
```

## ✅ 完成检查

截图全部准备好后，告诉我，我们就可以开始发布到各平台了！

发布顺序：
1. Product Hunt
2. Hacker News (Show HN)
3. Reddit
4. V2EX
5. 掘金
6. Twitter/X
7. 知乎
