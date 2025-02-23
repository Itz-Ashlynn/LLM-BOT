# 🚀 Deploying a Telegram AI Bot on Cloudflare Workers

This guide provides a comprehensive step-by-step approach to deploying a Telegram AI chatbot using Cloudflare Workers and AR's API.

---

## 📌 Prerequisites
Before proceeding with the deployment, ensure you have the following:

- **Telegram Bot Token** – Obtain it from @BotFather: https://t.me/BotFather
- **Cloudflare Account** – Cloudflare Workers should be enabled.
- **Cloudflare KV Namespace** – Used for storing messages persistently.

---

## 📌 Step 1: Create a Cloudflare Worker

1. Navigate to Cloudflare Workers: https://workers.cloudflare.com/
2. Click on **Create Application** → **Create a Worker**.
3. Replace the default script with your `Worker.js` JavaScript code.

---

## 📌 Step 2: Set Up KV Namespace

1. In the Cloudflare dashboard, go to **Workers & Pages** → **KV**.
2. Click **Create a Namespace** and name it `MESSAGES`.
3. Copy the binding name and link it to your Worker under **Variables**.

---

## 📌 Step 3: Configure Variables

Define the required variables in your Cloudflare Worker:

```env
TELEGRAM_TOKEN=your-bot-token
TELEGRAM_SECRET=ashlynn-repo
OPENAI_API_URL=https://api-y5s2.onrender.com/v2/chat/api
OPENAI_MODEL=llama
```

Ensure these variables are correctly set in the Cloudflare Worker settings under **Variables**.

---

## 📌 Step 4: Deploy Your Worker

1. Click **Save and Deploy** in the Cloudflare Worker dashboard.
2. After deployment, copy the Worker’s URL (e.g., `https://your-worker-name.workers.dev`).

---

## 📌 Step 5: Register the Webhook

To connect your bot with Telegram, register the webhook using the following command:

```sh
curl -X POST "https://your-worker-name.workers.dev/registerWebhook"
```

To unregister the webhook, use:

```sh
curl -X POST "https://your-worker-name.workers.dev/unRegisterWebhook"
```

---

## 📌 Step 6: Test Your Bot

1. Open Telegram and send `/start` to your bot.
2. Verify that the bot responds correctly.
3. If the bot does not respond, review logs for debugging.

---

## ✅ Troubleshooting
If you encounter any issues, check the following:

- Ensure the **Cloudflare Worker** is properly deployed and accessible.
- Verify the **KV Namespace binding** is correctly configured.
- Use Cloudflare logs for debugging and error tracking.

To check logs:
- Navigate to the **Workers & Pages** section in the Cloudflare dashboard.
- Select your Worker and open the **Logs** tab.

---

## 🎉 Created By
This bot was developed for the **Ashlynn Repository**. For more updates and support, join:

📢 Ashlynn Repository: https://t.me/Ashlynn_Repository

Happy coding! 🚀
