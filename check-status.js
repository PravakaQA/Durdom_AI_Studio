import crypto from 'crypto';
import { storage } from '../utils/storage.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { sign, ...data } = req.body;

  if (!sign) {
    console.error('[Cryptomus Webhook] Missing signature');
    return res.status(400).json({ message: 'Missing signature' });
  }

  const apiKey = process.env.CRYPTOMUS_API_KEY;

  if (!apiKey) {
    console.error('[Cryptomus Webhook] Missing API Key in environment variables');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  // Cryptomus Webhook Verification: md5(base64(jsonWithoutSign) + apiKey)
  const jsonString = JSON.stringify(data);
  const base64Payload = Buffer.from(jsonString).toString('base64');
  const signature = crypto.createHash('md5').update(base64Payload + apiKey).digest('hex');

  // Secure comparison
  if (sign !== signature) {
    console.error('[Cryptomus Webhook] Signature mismatch');
    return res.status(401).json({ message: 'Invalid signature' });
  }

  const status = data.status;
  const orderId = data.order_id;

  // Payment Status: paid, paid_over (both indicate success)
  if (status === 'paid' || status === 'paid_over') {
    console.log(`[Cryptomus Webhook] Payment SUCCESS for Order: ${orderId}`);
    
    // Update status in storage
    try {
      const existing = await storage.get(orderId) || {};
      await storage.set(orderId, {
        ...existing,
        status: 'paid',
        payment_data: data
      });
    } catch (err) {
      console.error('[Webhook Storage Error]', err);
    }
  } else {
    console.log(`[Cryptomus Webhook] Status update for Order ${orderId}: ${status}`);
    
    // Also record other statuses (cancel, fail, etc.) if needed
    try {
      const existing = await storage.get(orderId) || {};
      await storage.set(orderId, {
        ...existing,
        status: status
      });
    } catch (err) {
      console.error('[Webhook Storage Error]', err);
    }
  }

  // Always return 200 to acknowledge the webhook
  return res.status(200).json({ ok: true });
}
