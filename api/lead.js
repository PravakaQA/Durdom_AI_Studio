export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const name = String(body.name || '').trim();
    const telegram = String(body.telegram || body.contact || '').trim();
    const product = String(body.product || body.interest || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !telegram || !product) {
      return res.status(400).json({ ok: false, message: 'Заполни имя, контакт и продукт.' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error('[Lead API] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
      return res.status(500).json({ ok: false, message: 'Telegram bot is not configured.' });
    }

    const text = [
      '🔥 Новая заявка с сайта DURDOM OFM',
      '',
      `👤 Имя: ${name}`,
      `📲 Контакт: ${telegram}`,
      `📦 Интерес: ${product}`,
      message ? `💬 Сообщение: ${message}` : null,
      '',
      `🕒 ${new Date().toLocaleString('ru-RU', { timeZone: 'UTC' })} UTC`
    ].filter(Boolean).join('\n');

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
    });

    const tgData = await tgRes.json();
    if (!tgRes.ok || !tgData.ok) {
      console.error('[Lead API] Telegram error:', tgData);
      return res.status(502).json({ ok: false, message: 'Telegram delivery failed.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[Lead API] Error:', error);
    return res.status(500).json({ ok: false, message: 'Server error.' });
  }
}
