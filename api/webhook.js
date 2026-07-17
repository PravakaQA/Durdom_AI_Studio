import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { sign, ...data } = body;
    const paymentApiKey = (process.env.CRYPTOMUS_PAYMENT_API_KEY || '').trim();

    if (!sign || !paymentApiKey) {
      console.error('[Webhook] Missing sign or Cryptomus API key.');
      return res.status(400).json({ ok: false, message: 'Missing signature or API key.' });
    }

    // Verify signature
    const json = JSON.stringify(data);
    const base64 = Buffer.from(json, 'utf8').toString('base64');
    const expected = crypto.createHash('md5').update(base64 + paymentApiKey).digest('hex');

    if (sign !== expected) {
      console.error('[Webhook] Invalid signature. Expected:', expected, 'Received:', sign);
      return res.status(403).json({ ok: false, message: 'Invalid signature.' });
    }

    // Log payment status
    console.log('[Webhook] Cryptomus payment update received:', {
      order_id: data.order_id,
      status: data.status,
      amount: data.amount,
      currency: data.currency
    });

    // Notify Telegram if token is set
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId && (data.status === 'paid' || data.status === 'paid_over')) {
      const msg = [
        '💸 Оплата Cryptomus прошла успешно!',
        `Заказ: ${data.order_id}`,
        `Сумма: ${data.amount || data.payer_amount || ''} ${data.currency || ''}`,
        `Статус: ${data.status}`
      ].join('\n');

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: msg, disable_web_page_preview: true })
      }).catch(err => {
        console.error('[Webhook] Telegram notify error:', err);
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[Webhook] Error parsing callback:', error);
    return res.status(500).json({ ok: false, message: 'Server error.' });
  }
}
