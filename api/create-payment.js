import crypto from 'crypto';

const PRICES = {
  higgsfield_course: 50,
  animator_v1: 70,
  animator_v21: 100,
  xmode_v21: 100,
  private_community: 190,
  fansly_bundle: 100,
  avatar_basic: 55,
  avatar_lora: 100,
  lipsync_15s: 30,
  video_gen_15s: 35,
  video_turnkey_15s: 50
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // 1. CORS check
  const host = req.headers.host;
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  if (origin) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }
    } catch (_) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
  } else if (referer) {
    try {
      const refererHost = new URL(referer).host;
      if (refererHost !== host) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }
    } catch (_) {}
  }

  try {
    const merchantId = (process.env.CRYPTOMUS_MERCHANT_ID || '').trim();
    const paymentApiKey = (process.env.CRYPTOMUS_PAYMENT_API_KEY || '').trim();

    if (!merchantId || !paymentApiKey) {
      console.error('[Payment API] Missing Cryptomus environment variables.');
      return res.status(500).json({ success: false, message: 'Payment gateway configuration is missing.' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const itemId = String(body.item_id || '').trim();
    const rawQty = parseInt(body.qty, 10);
    const qty = isNaN(rawQty) ? 1 : Math.max(1, Math.min(20, rawQty));

    const basePrice = PRICES[itemId];
    if (!basePrice) {
      return res.status(400).json({ success: false, message: 'Invalid item_id' });
    }

    // Calculate amount on server
    let amount = basePrice;
    if (itemId === 'lipsync_15s' || itemId === 'video_gen_15s' || itemId === 'video_turnkey_15s') {
      amount = basePrice * qty;
    }

    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const siteUrl = `${protocol}://${host}`;

    const orderId = `DURDOM_${itemId}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`.toUpperCase();

    const payload = {
      amount: amount.toFixed(2),
      currency: 'USD',
      order_id: orderId,
      url_success: `${siteUrl}/success.html`,
      url_return: `${siteUrl}/fail.html`,
      url_callback: `${siteUrl}/api/webhook`,
      additional_data: JSON.stringify({ itemId, qty })
    };

    const jsonBody = JSON.stringify(payload);
    const base64Body = Buffer.from(jsonBody, 'utf8').toString('base64');
    const sign = crypto.createHash('md5').update(base64Body + paymentApiKey).digest('hex');

    const response = await fetch('https://api.cryptomus.com/v1/payment', {
      method: 'POST',
      headers: {
        merchant: merchantId,
        sign,
        'Content-Type': 'application/json'
      },
      body: jsonBody
    });

    const responseText = await response.text();
    let data = {};
    try { data = JSON.parse(responseText); } catch (_) {}

    if (!response.ok || !data.result) {
      console.error('[Cryptomus API] Error response:', data || responseText);
      return res.status(response.status || 500).json({ success: false, message: data.message || 'Payment provider error.' });
    }

    return res.status(200).json({ success: true, url: data.result.url });
  } catch (error) {
    console.error('[Payment API] Critical error:', error);
    return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
}
