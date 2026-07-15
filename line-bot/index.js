const express = require('express');
const { middleware, messagingApi } = require('@line/bot-sdk');
require('dotenv').config();

const app = express();

// LINE Bot Configuration
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

// Check if credentials are set
if (!config.channelAccessToken || !config.channelSecret) {
  console.warn('WARNING: LINE_CHANNEL_ACCESS_TOKEN or LINE_CHANNEL_SECRET is not set in environment variables!');
}

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: config.channelAccessToken
});

// Webhook endpoint
app.post('/webhook', middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error('Error handling events:', err);
      res.status(500).end();
    });
});

// Event handler
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  const userText = event.message.text.trim();
  const replyToken = event.replyToken;
  
  let replyMessage = '';

  if (userText === '/help' || userText === '幫助' || userText === '選單') {
    replyMessage = 
      `歡迎加入【一的力量】讀書會小助手！\n\n` +
      `您可以輸入以下關鍵字來獲取資訊：\n` +
      `1. 【/schedule】或【時程】 - 查詢讀書會時間與平台\n` +
      `2. 【/chapter】或【進度】 - 查詢讀書會進行章節\n` +
      `3. 【/notes】或【牧師信息】 - 查詢牧師的鼓勵信息與提醒\n` +
      `4. 【/help】 - 再次顯示此選單\n\n` +
      `期待與您一同在理性和靈裡被開啟，承接宣教使命！`;
  } else if (userText === '/schedule' || userText === '時程' || userText === '讀書會時間') {
    replyMessage = 
      `📅 【一的力量】讀書會時程：\n\n` +
      `• 時間：每週三、每週六 晚上 8:00 ~ 8:45\n` +
      `• 流程：\n` +
      `  - 8:00~8:30 朗讀本書\n` +
      `  - 8:30~8:45 討論與分享\n` +
      `• 進行平台：緯華化梅小區祭壇群組 (Line)\n\n` +
      `提醒您，前半小時朗讀完後，若當天有小組聚會可回到各自小組中進行討論！`;
  } else if (userText === '/chapter' || userText === '進度' || userText === '第一章') {
    replyMessage = 
      `📖 目前讀書會進度：\n\n` +
      `• 書籍：《一的力量》\n` +
      `• 進度：每週進行一章，共六次。\n\n` +
      `您可以存取本機 docs/第一章.pdf 預習第一章的內容！\n` +
      `期待您的參與，讓小組在聖靈的差遣中去實踐！`;
  } else if (userText === '/notes' || userText === '牧師信息' || userText === '信息') {
    replyMessage = 
      `✉️ 牧師信息摘要：\n\n` +
      `「祝小組家人下半年更多蒙恩、更多豐收！一的力量是全球性異象，需要我們同心合力明白、一起為主奔跑，藉著讀書會鼓勵大家為主預備邀請傳福音的對象，求主先在對方身上工作。」\n\n` +
      `詳細信息請參閱 docs/牧師信息一.md 及 牧師信息二.md。`;
  } else {
    // Echo back or help prompt
    replyMessage = `您說了：「${userText}」\n\n輸入【/help】可以查看功能選單喔！`;
  }

  // Reply back to user
  return client.replyMessage({
    replyToken: replyToken,
    messages: [{
      type: 'text',
      text: replyMessage
    }]
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LINE Bot Webhook server listening on port ${PORT}`);
});
