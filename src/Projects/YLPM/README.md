# YLPM 多頁式網站線框圖

一個專業工程解決方案公司的多頁式網站線框圖，採用 Pug 模板引擎和 Stylus 樣式預處理器開發。

## 專案概述

YLPM 是一個提供專業工程解決方案的公司網站，包含以下核心業務：

- 優電整合工程
- 設備建置整合工程
- 系統整合工程

## 網站結構

### 頁面架構

```
📁 YLPM 網站
├── 🏠 首頁 (index.html)
│   ├── 品牌主標語
│   ├── 公司簡介摘要
│   ├── 三大整合工程分類 (圖示條列)
│   ├── 工業4.0/建築4.0 專區摘要
│   ├── 客戶實績 Logo 滾動帶
│   └── CTA 區域
│
├── 🔧 服務項目 (services.html)
│   ├── 優電整合工程
│   ├── 設備建置整合工程
│   └── 系統整合工程
│
├── 🏗️ 工程實績 (projects.html)
│   ├── 實績統計
│   ├── 專案分類篩選
│   ├── 專案展示網格
│   └── 客戶見證
│
├── 🤝 生態伙伴 (partners.html)
│   ├── 合作夥伴介紹
│   ├── 夥伴分類 (技術/供應商/顧問/客戶)
│   ├── 合作優勢
│   └── 成為合作夥伴
│
└── 📰 最新消息 (news.html)
    ├── 精選文章
    ├── 消息分類篩選
    ├── 消息列表
    └── 電子報訂閱
```

## 技術架構

- **模板引擎**: Pug
- **樣式預處理器**: Stylus
- **字體**: Noto Sans TC (Google Fonts)
- **響應式設計**: CSS Grid & Flexbox
- **編譯系統**: Node.js

## 設計特色

- **現代化設計**: 乾淨簡潔的視覺風格
- **專業色彩方案**: 藍色主色調 (#2563EB)
- **響應式佈局**: 支援各種設備尺寸
- **豐富內容**: 完整的企業網站內容架構
- **互動元素**: 篩選功能、滾動效果

## 開發指令

### 安裝依賴

```bash
npm install
```

### 編譯專案

```bash
npm run build
```

### 個別編譯

```bash
# 編譯 Pug 模板
npm run compile

# 編譯 Stylus 樣式
npm run stylus
```

### 開發模式 (監聽檔案變化)

```bash
npm run dev
```

## 檔案結構

```
YLPM/
├── dist/                    # 編譯輸出目錄
│   ├── css/
│   │   └── main.css        # 編譯後的 CSS
│   ├── index.html          # 首頁
│   ├── services.html       # 服務項目
│   ├── projects.html       # 工程實績
│   ├── partners.html       # 生態伙伴
│   └── news.html          # 最新消息
│
├── src/                    # 原始檔案
│   ├── templates/          # Pug 模板
│   │   ├── index.pug
│   │   ├── services.pug
│   │   ├── projects.pug
│   │   ├── partners.pug
│   │   └── news.pug
│   └── styles/            # Stylus 樣式
│       └── main.styl
│
├── compile.js             # 編譯腳本
├── package.json          # 專案配置
└── README.md            # 專案說明
```

## 色彩方案

- **主色調**: #2563EB (藍色)
- **次要色調**: #64748B (灰色)
- **強調色**: #DC2626 (紅色)
- **背景色**: #F8FAFC (淺灰)
- **文字色**: #1E293B (深灰)

## 瀏覽器支援

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 授權

MIT License

## 聯絡資訊

- **公司**: YLPM
- **地址**: 台北市信義區信義路五段 7 號
- **電話**: (02) 2345-6789
- **信箱**: info@ylpm.com.tw
