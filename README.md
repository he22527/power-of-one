# 【一的力量】讀書會整合專案

本專案是為緯華化梅小區【一的力量】讀書會所建置的整合性數位平台。包含現代化網頁閱讀器/播放器、LINE 互動 Bot、資料處理腳本及書籍/信息文件。

## 專案目錄結構

```text
一的力量/
├── assets/             # 原始媒體與音訊儲存區
├── docs/               # 書籍 PDF、牧師信息 Markdown 與提取出的文字檔
│   ├── 第一章.pdf
│   ├── 第一章_text.txt  # 由 Python 腳本提取的文字
│   ├── 牧師信息一.md
│   └── 牧師信息二.md
├── scripts/            # AI 與資料處理輔助腳本
│   ├── requirements.txt
│   └── extract_pdf.py  # PDF 內文自動提取腳本
├── line-bot/           # LINE 機器人伺服器端
│   ├── index.js
│   ├── package.json
│   └── README.md       # LINE Bot 開發與部署指南
└── web/                # 現代化網頁應用程式 (Web App)
    ├── public/         # 靜態資源 (包含音檔與章節文字檔)
    │   ├── audio.mp3
    │   └── chapter1.txt
    ├── src/            # 前端 React 原始碼
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css   # 全域 CSS 設計系統
    │   └── main.jsx
    ├── index.html
    └── package.json
```

---

## 各模組說明與啟動指南

### 1. 網頁應用程式 (`web/`)
採用 Vite + React + Vanilla CSS 建立的極致美感單頁應用。
* **特色功能**：
  * **線上閱讀器**：字體縮放、分頁瀏覽，完美適配小組朗讀進度。
  * **客製化音訊播放器**：支援 `audio.mp3` 的播放、暫停、前後快轉、10段播放速度調整。
  * **進度記憶與書籤**：自動保存上一次播放時間與閱讀頁碼，可針對特定錄音時間點加上「命名書籤」。
  * **時程倒數計時器**：實時計算距離下一次讀書會（每週三、六晚上 8:00）的剩餘時間。
  * **心得隨記**：隨手紀錄心得，並可一鍵複製心得文字以方便張貼至 LINE 群組中分享。
* **啟動方式**：
  ```bash
  cd web
  npm install
  npm run dev
  ```
  啟動後在瀏覽器開啟 `http://localhost:5173`。

### 2. LINE 機器人 (`line-bot/`)
使用 Express + `@line/bot-sdk` 建置的 LINE 互動機器人骨架。
* **特色功能**：
  * 可加入 LINE 群組作為讀書會小助手。
  * 支援指令回覆：輸入 `/help`、`/schedule` (查詢時程)、`/chapter` (進度)、`/notes` (牧師信息)。
* **啟動方式**：
  請參閱 [line-bot/README.md](file:///c:/Users/vivian/antigravity/一的力量/line-bot/README.md) 設定環境變數並啟動服務。

### 3. 資料處理腳本 (`scripts/`)
使用 Python 編寫的工具，用於自動化解析 PDF 內容與未來之音訊轉譯。
* **PDF 文字提取**：
  ```bash
  # 安裝依賴
  pip install -r scripts/requirements.txt
  
  # 執行提取 (預設提取 docs/第一章.pdf 並輸出至 docs/第一章_text.txt)
  python scripts/extract_pdf.py
  ```

---

## 讀書會固定時程資訊
* **時間**：每週三、每週六 晚上 8:00 ~ 8:45
* **進行平台**：緯華化梅小區祭壇 LINE 群組
* **流程**：
  * `20:00 - 20:30`：輪流朗讀書籍章節。
  * `20:30 - 20:45`：焦點討論與分享（若當天有小組，可提早退回各自小組討論）。
