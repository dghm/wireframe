# TailorMed 網站 Global Style 設定

## 變數設定 (variables.styl)

### 色彩系統
- **Primary Color**: `#143463` (深藍色)
- **Primary Light**: `#20539f`
- **Primary Dark**: `#0f2647`
- **Secondary Color**: `#97d3df` (淺藍色)
- **Secondary Light**: `#d8eef3`
- **Secondary Dark**: `#638d95`
- **Accent Color**: `#bb2749` (紅色)
- **Accent Light**: `#e0758c`
- **Accent Dark**: `#8e3b4d`
- **Text Color**: `#333333`
- **Background Color**: `#ffffff`

### 間距系統
- **spacing-xs**: `8px`
- **spacing-sm**: `16px`
- **spacing-md**: `24px`
- **spacing-lg**: `32px`
- **spacing-xl**: `48px`

### 容器設定
- **container-max-width**: `1200px`
- **container-padding**: `20px`

### 圓角設定
- **border-radius-button**: `10px`

### 響應式斷點
- **breakpoint-mobile**: `768px`
- **breakpoint-tablet**: `1024px`
- **breakpoint-desktop**: `1200px`

## 基礎樣式 (main.styl)

### 重置樣式
```stylus
*
  margin: 0
  padding: 0
  box-sizing: border-box
```

### HTML/Body
- **字型**: 使用 `font-family-primary` (目前未定義，應為 Noto Sans)
- **基礎字型大小**: `font-size-base` (目前未定義)
- **行高**: `1.6`
- **背景色**: `#ffffff`
- **文字顏色**: `#333333`

### 容器
- **最大寬度**: `1200px`
- **水平置中**: `margin: 0 auto`
- **左右內距**: `20px`

## Header 樣式

### 固定 Header
- **位置**: `fixed` (top: 0)
- **高度**: `78px`
- **背景**: `rgba(255, 255, 255, 0.8)` + `backdrop-filter: blur(10px)`
- **邊框**: 底部 `1px solid rgba(233, 236, 239, 0.5)`
- **陰影**: `0 2px 8px rgba(0, 0, 0, 0.05)`
- **z-index**: `1000`

### 導航連結
- **顏色**: Primary Color (`#143463`)
- **字重**: `500`
- **字型大小**: `0.9rem`
- **Hover**: 顏色加深 10%

## Hero Section 樣式

### 基礎設定
- **背景色**: Primary Color (`#143463`)
- **文字對齊**: `center`
- **最小高度**: `50vw`
- **內距**: `spacing-xl` (48px) 上下

### Hero 標題
- **字型大小**: `2.5rem`
- **字重**: `700`
- **顏色**: `#fff`
- **下邊距**: `spacing-md` (24px)

### Hero 副標題
- **字型大小**: `font-size-large` (目前未定義)
- **字重**: `300`
- **顏色**: `rgba(255, 255, 255, 0.9)`
- **下邊距**: `spacing-lg` (32px)

## Section 基礎樣式

### Section
- **內距**: `spacing-xl` (48px) 上下
- **背景色**: `#ffffff`

### Section Header
- **文字對齊**: `center`
- **下邊距**: `spacing-xl` (48px)

### Section Title
- **字型大小**: `2rem`
- **字重**: `700`
- **顏色**: Primary Color (`#143463`)
- **下邊距**: `spacing-sm` (16px)

### Section Subtitle
- **字型大小**: `font-size-large` (目前未定義)
- **字重**: `300`
- **顏色**: Text Color (`#333333`)

## Footer 樣式

### Footer 基礎
- **背景色**: Primary Color (`#143463`)
- **文字顏色**: `#fff`
- **內距**: `spacing-xl` 上下, `spacing-lg` 下
- **邊框**: 頂部 `1px solid rgba(255, 255, 255, 0.1)`

### Footer 內容
- **Grid 佈局**: `2fr repeat(4, 1fr)` (Desktop)
- **間距**: `spacing-lg` (32px)

### Footer 連結
- **顏色**: `rgba(255, 255, 255, 0.8)`
- **字型大小**: `font-size-small` (目前未定義)
- **字重**: `300`
- **Hover**: 顏色變為 `#fff` + 底線

## 按鈕樣式

### Primary Button
- **背景色**: Primary Color (`#143463`)
- **文字顏色**: `#fff`
- **圓角**: `10px`
- **字重**: `500`
- **Hover**: 背景色加深 10%

### Secondary Button
- **背景色**: `transparent`
- **文字顏色**: Primary Color
- **邊框**: `2px solid` Primary Color
- **Hover**: 背景色變為 `rgba(20, 52, 99, 0.1)`

## 響應式設計

### Mobile (≤768px)
- Header 導航隱藏，顯示漢堡選單
- Grid 佈局改為單列
- Footer 改為單列或 2 列

### Tablet (769px - 1023px)
- Grid 佈局改為 2 列
- Footer 改為 2 列

### Desktop (≥1024px)
- 完整 Grid 佈局
- Footer 5 列佈局

## 字型設定 (需要補充)

目前變數檔案中缺少以下字型相關變數：
- `font-family-primary` (應設為 "Noto Sans", sans-serif)
- `font-size-base` (建議 `16px` 或 `1rem`)
- `font-size-large` (建議 `1.25rem` 或 `20px`)
- `font-size-small` (建議 `0.875rem` 或 `14px`)

## 字型載入

所有頁面都載入了 Google Fonts 的 Noto Sans：
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;500;700&display=swap">
```

字重選項：300 (Light), 500 (Medium), 700 (Bold)

