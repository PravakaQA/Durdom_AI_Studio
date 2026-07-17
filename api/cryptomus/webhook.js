import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { sign, ...data } = body;
    const apiKey = (process.env.CRYPTOMUS_API_KEY || '').trim();

    if (!sign || !apiKey) {
      return res.status(400).json({ ok: false, message: 'Missing signature or API key.' });
    }

    const json = JSON.stringify(data);
    const base64 = Buffer.from(json, 'utf8').toString('base64');
    const expected = crypto.createHash('md5').update(base64 + apiKey).digest('hex');

    if (sign !== expected) {
      console.error('[Cryptomus webhook] Invalid sign');
      return res.status(401).json({ ok: false, message: 'Invalid signature.' });
    }

    if (data.status === 'paid' || data.status === 'paid_over') {
      const token = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (token && chatId) {
        const msg = [
          '💸 Оплата Cryptomus прошла',
          `Order: ${data.order_id}`,
          `Amount: ${data.amount || data.payer_amount || ''} ${data.currency || ''}`,
          `Status: ${data.status}`
        ].join('\n');
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: msg })
        }).catch(() => null);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[Cryptomus webhook] Error:', error);
    return res.status(500).json({ ok: false, message: 'Server error.' });
  }
}
