# 【一的力量】讀書會 LINE Bot 機器人

這是一個為【一的力量】讀書會開發的 LINE Bot 服務。它能回覆關鍵字（如時程、進度、牧師信息），幫助小組成員快速掌握讀書會資訊。

## 功能介紹
- **`/help` 或 `幫助`**：顯示主功能選單。
- **`/schedule` 或 `時程`**：顯示讀書會進行的時間、平台與流程。
- **`/chapter` 或 `進度`**：查看目前讀讀進度。
- **`/notes` 或 `牧師信息`**：查看牧師的鼓勵信息與提醒。

## 本地開發與啟動步驟

### 1. 安裝套件
請確保您的電腦已安裝 Node.js，然後在 `line-bot` 資料夾下執行：
```bash
npm install
```

### 2. 設定環境變數
將 `.env.example` 複製並命名為 `.env`：
```bash
cp .env.example .env
```
編輯 `.env` 並填入您的 LINE 開發者金鑰：
- `LINE_CHANNEL_ACCESS_TOKEN` (Channel access token)
- `LINE_CHANNEL_SECRET` (Channel secret)

這些值可以在 [LINE Developers Console](https://developers.line.biz/) 中建立 Provider 與 Messaging API Channel 後取得。

### 3. 本地啟動
您可以透過以下指令啟動 Express 伺服器：
```bash
# 生產環境啟動
npm start

# 開發模式啟動（支援自動重啟）
npm run dev
```
預設會監聽 `http://localhost:3000`。

### 4. 本地測試 (使用 ngrok)
若要在本地進行 Messaging API 測試，需要將本地的 `3000` 連接埠映射到公網，推薦使用 `ngrok`：
```bash
ngrok http 3000
```
複製 ngrok 產生的 `https://<your-subdomain>.ngrok-free.app` 網址，並將其填入 LINE Developers Console 中的 Webhook URL，路徑為 `/webhook`。
- **範例 Webhook URL**: `https://xxxx-xx-xx.ngrok-free.app/webhook`
- 請確保開啟 **"Use webhook"** 設定，並點擊 "Verify" 驗證連線。
