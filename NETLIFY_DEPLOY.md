# Netlify 部署指南 - Wireframe 專案

## 🎯 專案結構

本 Wireframe 專案包含多個子專案，都會一起部署到 Netlify：

- **TailorMed** - 主網站
  - `TailorMed/index.html` - 主頁
  - `TailorMed/track/` - 貨件追蹤系統
- **Permission-Matrix** - 權限矩陣系統 ⭐
- **knowledgeBase** - 知識庫
- **YAANFUHE** - YAANFUHE 專案
- **ynenergy** - 能源專案
- 其他專案...

---

## 📋 Netlify 部署步驟

### 步驟 1：登入 Netlify

前往 [Netlify](https://app.netlify.com/) 並登入您的帳號

---

### 步驟 2：建立新網站

1. 點擊 **"Add new site"** → 選擇 **"Import an existing project"**

2. 選擇 **GitHub** 作為來源

3. 授權 Netlify 訪問您的 GitHub 帳號

4. 選擇 **`dghm/TailorMed-Website-wireframe`** repository

---

### 步驟 3：配置建置設定

Netlify 會自動讀取 `netlify.toml` 配置檔，但您也可以手動確認：

| 設定項目 | 填入內容 |
|---------|---------|
| **Branch to deploy** | `main` |
| **Base directory** | ` ` (留空) |
| **Build command** | `npm install && npm run build:tailormed` |
| **Publish directory** | `dist/Projects` |

⚠️ **重要**：確保路徑正確！

---

### 步驟 4：部署

點擊 **"Deploy site"** 按鈕

Netlify 會：
1. ⬇️ 從 GitHub 下載程式碼
2. 📦 執行 `npm install` 安裝依賴
3. 🔨 執行 `npm run build:tailormed` 編譯所有專案（包含 Permission-Matrix）
4. 🚀 發布靜態網站

部署時間約 **2-5 分鐘**

---

## 🌐 訪問網址

部署成功後，Netlify 會給您一個網址，例如：
```
https://random-name-123.netlify.app
```

### 各專案的訪問路徑：

- **TailorMed 主頁**：`https://你的網站名稱.netlify.app/TailorMed/index.html`
- **Permission-Matrix**：`https://你的網站名稱.netlify.app/Permission-Matrix/index.html` ⭐
- **貨件追蹤**：`https://你的網站名稱.netlify.app/TailorMed/track/index.html`
- **知識庫**：`https://你的網站名稱.netlify.app/knowledgeBase/index.html`
- 其他專案依此類推...

---

## 🎨 自訂網域（選用）

如果您有自己的網域：

1. 在 Netlify Dashboard → **Domain settings**
2. 點擊 **"Add custom domain"**
3. 輸入您的網域名稱（例如：`wireframe.tailormed.com`）
4. 按照指示設定 DNS

Netlify 會自動提供免費的 HTTPS 憑證！

---

## 🔄 自動部署

當您推送新的程式碼到 GitHub 的 `main` 分支時，Netlify 會自動檢測並重新部署：

```bash
git add .
git commit -m "更新內容"
git push origin main
```

---

## 📁 專案結構說明

```
dist/Projects/
├── TailorMed/
│   ├── index.html                    # 主頁
│   ├── track/                        # 貨件追蹤
│   │   ├── index.html
│   │   └── ...
│   └── ...
├── Permission-Matrix/                # 權限矩陣系統 ⭐
│   ├── index.html
│   ├── css/
│   └── js/
├── knowledgeBase/
│   └── ...
└── ...
```

---

## ⚙️ 常見問題

### 1. 部署失敗：找不到 dist 資料夾

**原因**：編譯命令未正確執行

**解決**：
- 確認 Build command 正確：`npm install && npm run build:tailormed`
- 檢查 Publish directory 是否為：`dist/Projects`
- 查看 Netlify 的建置日誌確認錯誤訊息

---

### 2. Permission-Matrix 無法訪問

**原因**：路徑不正確或編譯失敗

**解決**：
1. 確認 `compile-tailormed.js` 有包含 Permission-Matrix 的編譯
2. 檢查 `dist/Projects/Permission-Matrix/` 是否存在
3. 訪問路徑應為：`/Permission-Matrix/index.html`

---

### 3. CSS 或 JS 檔案無法載入

**原因**：相對路徑問題

**解決**：
- 確認 HTML 中的資源路徑使用相對路徑（如 `./css/main.css`）
- 檢查 Netlify 的建置日誌確認檔案是否正確複製

---

## 🎉 完成！

現在您有：
- ✅ **Netlify**：提供所有 Wireframe 專案的靜態網站
- ✅ **GitHub**：程式碼版本控制
- ✅ **自動部署**：推送即部署
- ✅ **Permission-Matrix**：已整合並一起部署 ⭐

**所有專案都可以在同一個 Netlify 網站上訪問！** 🚀

