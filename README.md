# 【「一」的力量】緯華化梅小區讀書會

> 復興不是靠一個人做一萬件事，而是每個人都動起來，去影響他身邊的「那一個」。

**網站：https://he22527.github.io/power-of-one/**

比利・威爾遜《「一」的力量—從你開始的福音運動》讀書會的公開介紹頁，包含原創導讀、討論題庫、時程與參加方式。討論題庫為本小區自行設計的教材，歡迎其他小組直接取用。

## 讀書會資訊

- **時間**：每週三、每週六 20:00 ~ 20:45，共六次，每次一章
- **流程**：20:00–20:30 輪流朗讀 ／ 20:30–20:45 討論與分享
- **平台**：緯華化梅小區祭壇群組（LINE 線上進行）
- **參加**：請聯繫你的小組長或小區牧者

## 內容範圍

網站只發布本小區擁有的內容：原創導讀、討論題庫、時程與書籍公開資訊。

**不提供**書籍內文、章節掃描檔、PDF 下載或朗讀錄音——這些是原作者與出版社的著作權。想讀這本書請支持正版：[天恩出版](https://graceph.com/product/n1002-302/)｜[異象工場](https://shop.asiaforjesus.net/products/1coblbk006)。經文引自和合本（公有領域）。

網站上的導讀是小區自行撰寫的延伸思考，不是書籍原文的摘要。

## 專案結構

三個獨立模組，各自安裝與執行（**沒有根目錄 package.json**）。

| 目錄 | 技術 | 用途 |
|---|---|---|
| `web/` | Vite + React 19 | 公開介紹站（本 repo 的主體） |
| `line-bot/` | Express + `@line/bot-sdk` | 群組內關鍵字回覆機器人 |
| `scripts/` | Python + `pypdf` | PDF 文字提取（僅供內部參考） |

### web/

```bash
cd web && npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint     # oxlint
```

全站文案集中在 `src/content.js`，改文字請改那裡，不要寫進 JSX。設計 token（Midnight & Gold 配色）定義在 `src/index.css` 的 `:root`。

推到 `main` 分支會由 `.github/workflows/deploy.yml` 自動建置並部署到 GitHub Pages。

### line-bot/

```bash
cd line-bot && npm install
cp .env.example .env    # 填入 LINE_CHANNEL_ACCESS_TOKEN 與 LINE_CHANNEL_SECRET
npm run dev             # http://localhost:3000
ngrok http 3000         # 將 /webhook 對外
```

指令：`/help`｜`/schedule`｜`/chapter`｜`/notes`（各自支援中文別名）。詳見 [line-bot/README.md](line-bot/README.md)。

### scripts/

```bash
pip install -r scripts/requirements.txt
python scripts/extract_pdf.py [input.pdf] [output.txt]
```

註：書籍 PDF 是掃描圖檔，`pypdf` 無法提取文字，需要 OCR。此腳本目前沒有被任何模組使用。

## 授權與隱私

- 書籍內容著作權屬原作者比利・威爾遜與出版社所有。
- 牧師信息為寫給小組家人／小組長的內部信，已排除於此公開 repo 之外。
- `docs/` 內的書籍 PDF 因體積與版權考量不納入版本控制，clone 後不會存在。
