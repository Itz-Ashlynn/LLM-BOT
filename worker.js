const TELEGRAM = {
  TOKEN: '', // Get it from @BotFather https://core.telegram.org/bots#6-botfather
  SECRET: 'ashlynn-repo', // Secure the webhook endpoint
  WEBHOOK: '/endpoint', // webhook endpoint
};

const OPENAI = {
  API_URL: 'https://api-y5s2.onrender.com/v2/chat/api',
  MODEL: 'llama',
};

addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname === TELEGRAM.WEBHOOK) {
    event.respondWith(handleWebhook(event));
  } else if (url.pathname === '/registerWebhook') {
    event.respondWith(registerWebhook(event, url));
  } else if (url.pathname === '/unRegisterWebhook') {
    event.respondWith(unRegisterWebhook(event));
  } else {
    event.respondWith(new Response('No handler for this request'));
  }
});

async function handleWebhook(event) {
  if (event.request.headers.get('X-Telegram-Bot-Api-Secret-Token') !== TELEGRAM.SECRET) {
    return new Response('Unauthorized', { status: 403 });
  }

  try {
    const update = await event.request.json();
    await onUpdate(update);
  } catch (error) {
    console.error('Error handling webhook:', error);
    return new Response('Error processing request', { status: 500 });
  }

  return new Response('Ok');
}

async function onUpdate(update) {
  if ('message' in update) {
    await onMessage(update.message);
  }
}

async function onMessage(message) {
  if (!message.text || message.text.trim() === '') {
    return sendMarkdownText(message.chat.id, "*I'm a text-based AI bot.*\nPlease send a text message to begin.");
  }

  if (message.text.startsWith('/start')) {
    return sendMarkdownText(message.chat.id, "Hello, I'm *your AI assistant* 🤖\nAsk me anything!");
  }

  if (message.text.startsWith('/clear')) {
    await MESSAGES.delete(message.from.id);
    return sendMarkdownText(message.chat.id, "I've reset the conversation. Let's start fresh!");
  }

  const processingMessage = await sendMarkdownText(message.chat.id, "⏳ *Processing your request...*");
  const messageId = processingMessage.result.message_id;

  let lastMessages = await MESSAGES.get(message.from.id, { type: 'json' }) || [];
  lastMessages.push({ role: 'user', content: message.text });

  let aiResponse = await callChatGPT(lastMessages);
  lastMessages.push({ role: 'assistant', content: aiResponse });
  await MESSAGES.put(message.from.id, JSON.stringify(lastMessages));

  return editMarkdownText(message.chat.id, messageId, aiResponse);
}

async function callChatGPT(messages) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OPENAI.MODEL,  // Add the model here
      messages: messages    // Include the messages
    }),
  };

  try {
    const response = await fetch(OPENAI.API_URL, requestOptions);
    const data = await response.json();
    if (!data || !data.response) {
      throw new Error('Invalid response from AI');
    }
    return data.response;
  } catch (error) {
    console.error('Error calling AI:', error);
    return "⚠️ *Error:* Unable to process your request right now.";
  }
}

async function sendMarkdownText(chatId, text) {
  return (await fetch(apiUrl('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'Markdown'
  }))).json();
}

async function editMarkdownText(chatId, messageId, text) {
  return (await fetch(apiUrl('editMessageText', {
    chat_id: chatId,
    message_id: messageId,
    text,
    parse_mode: 'Markdown'
  }))).json();
}

async function registerWebhook(event, requestUrl) {
  const webhookUrl = `${requestUrl.protocol}//${requestUrl.hostname}${TELEGRAM.WEBHOOK}`;
  const response = await fetch(apiUrl('setWebhook', { url: webhookUrl, secret_token: TELEGRAM.SECRET }));
  const data = await response.json();
  if (!data.ok) {
    console.error('Error registering webhook:', data);
    return new Response(JSON.stringify(data, null, 2), { status: 500 });
  }
  return new Response('Webhook registered successfully');
}

async function unRegisterWebhook(event) {
  const response = await fetch(apiUrl('setWebhook', { url: '' }));
  const data = await response.json();
  if (!data.ok) {
    console.error('Error unregistering webhook:', data);
    return new Response(JSON.stringify(data, null, 2), { status: 500 });
  }
  return new Response('Webhook unregistered successfully');
}

function apiUrl(methodName, params = null) {
  let query = params ? '?' + new URLSearchParams(params).toString() : '';
  return `https://api.telegram.org/bot${TELEGRAM.TOKEN}/${methodName}${query}`;
}

if (typeof MESSAGES === 'undefined') {
  console.error('Please bind KV as MESSAGES');
}
