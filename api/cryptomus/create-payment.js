import crypto from 'crypto';

const PRICES = {
  animator21: 200,
  animator1: 40,
  xmode: 200,
  community: 200,
  higgsfield: 35,
  creatorpack: 150
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const merchantId = (process.env.CRYPTOMUS_MERCHANT_ID || '').trim();
    const apiKey = (process.env.CRYPTOMUS_API_KEY || '').trim();
    const siteUrl = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://durdomofm.work').trim().replace(/\/$/, '');

    if (!merchantId || !apiKey) {
      return res.status(500).json({ success: false, message: 'Payment keys are not configured.' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const productId = String(body.productId || '').trim();
    const product = String(body.product || productId || 'DURDOM OFM product').trim();
    const currency = String(body.currency || 'USD').toUpperCase();

    const expectedAmount = PRICES[productId];
    const amountNumber = expectedAmount || Number(body.amount || 0);
    if (!amountNumber || amountNumber <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid product or amount.' });
    }

    const orderId = `DURDOM_${productId || 'ORDER'}_${Date.now()}`;
    const payload = {
      amount: amountNumber.toFixed(2),
      currency,
      order_id: orderId,
      url_return: siteUrl,
      url_success: `${siteUrl}/success.html?order_id=${encodeURIComponent(orderId)}`,
      url_callback: `${siteUrl}/api/cryptomus/webhook`,
      additional_data: JSON.stringify({ productId, product })
    };

    const jsonBody = JSON.stringify(payload);
    const base64Body = Buffer.from(jsonBody, 'utf8').toString('base64');
    const sign = crypto.createHash('md5').update(base64Body + apiKey).digest('hex');

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
      console.error('[Cryptomus] Error:', data || responseText);
      return res.status(response.status || 500).json({ success: false, message: data.message || 'Payment provider rejected request.' });
    }

    return res.status(200).json({ success: true, url: data.result.url, order_id: orderId });
  } catch (error) {
    console.error('[Cryptomus] Critical error:', error);
    return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
}
