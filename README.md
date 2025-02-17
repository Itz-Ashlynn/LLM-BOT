
# 🚀 Deploy Telegram AI Bot on Cloudflare Workers

This guide provides step-by-step instructions to deploy a Telegram AI chatbot on Cloudflare Workers using AR's API.

---

## 📌 Prerequisites
Before proceeding, ensure you have the following:
- **Telegram Bot Token** from [@BotFather](https://t.me/BotFather)
- **Cloudflare Account** with Workers enabled
- **Cloudflare KV Namespace** for storing messages

---

## 📌 Step 1: Create a Cloudflare Worker
1. Go to [Cloudflare Workers](https://workers.cloudflare.com/)
2. Click **Create Application** → **Create a Worker**
3. Replace the default code with Worker.js JavaScript code

---

## 📌 Step 2: Set Up KV Namespace
1. In the Cloudflare dashboard, navigate to **Workers & Pages** → **KV**
2. Click **Create a Namespace** and name it `MESSAGES`
3. Copy the binding name and add it to your Worker under **Variables**

---

## 📌 Step 3: Configure Environment Variables
Set up the required environment variables in your Worker:
```env
TELEGRAM_TOKEN=your-bot-token
TELEGRAM_SECRET=ashlynn-repo
OPENAI_API_URL=https://api-y5s2.onrender.com/v1/chat/api
OPENAI_MODEL=llama-3.3-70b
```

---

## 📌 Step 4: Deploy Your Worker
1. Click **Save and Deploy**
2. Copy the deployed worker URL (e.g., `https://your-worker-name.workers.dev`)

---

## 📌 Step 5: Register the Webhook
Run the following command to register the webhook:
```sh
curl -X POST "https://your-worker-name.workers.dev/registerWebhook"
```
To unregister the webhook, run:
```sh
curl -X POST "https://your-worker-name.workers.dev/unRegisterWebhook"
```

---

## 📌 Step 6: Test Your Bot
1. Open Telegram and send `/start` to your bot
2. Ensure it responds correctly
3. If the bot does not respond, check the logs

---

## ✅ Troubleshooting
If you encounter issues, check:
- Ensure your **Cloudflare Worker** is deployed and accessible
- Verify your **KV Namespace binding**
- Use Cloudflare logs for debugging:

---

## 🎉 Created By
This bot was created for the **Ashlynn Repository**. Join for more updates: [Ashlynn Repository](https://t.me/Ashlynn_Repository)

Happy Coding! 🚀
```

