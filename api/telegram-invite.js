export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const token = process.env.TELEGRAM_INVITE_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_INVITE_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ success: false, message: 'Telegram invite bot is not configured.' });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/createChatInviteLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        name: `DURDOM invite ${Date.now()}`,
        member_limit: 1
      })
    });
    const data = await response.json();
    if (!response.ok || !data.ok) throw new Error(data.description || 'Invite creation failed');
    return res.status(200).json({ success: true, invite_link: data.result.invite_link });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
