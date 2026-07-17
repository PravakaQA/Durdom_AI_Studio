import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // 1. Get raw credentials
    // Note: Vercel normally provides process.env without outer quotes. 
    // We add trim() to eliminate accidental whitespaces. No regex replace to prevent modifying valid keys.
    const merchantId = (process.env.CRYPTOMUS_MERCHANT_ID || '').trim();
    const apiKey = (process.env.CRYPTOMUS_API_KEY || '').trim();
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://durdomofm.com').trim();

    if (!merchantId || !apiKey) {
      console.error('[Cryptomus] Missing API Key or Merchant ID in Environment Variables!');
      return res.status(500).json({ success: false, message: 'Ошибка конфигурации сервера: отсутствуют платежные ключи.' });
    }

    // 2. Parse request body robustly
    const reqBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    
    // Safely extract payload parameters
    const amountStr = (reqBody.amount || "150").toString();
    const currencyStr = (reqBody.currency || "USD").toUpperCase();
    const orderId = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // 3. Build the exact payload for Cryptomus
    const payload = {
      amount: amountStr,
      currency: currencyStr,
      order_id: orderId,
      url_return: siteUrl, 
      url_success: `${siteUrl}/success.html` 
    };

    // 4. GENERATING THE SIGNATURE EXACTLY ACCORDING TO CRYPTOMUS DOCS
    // formula: sign = md5(base64(payload) + API_KEY)
    
    // Step A: Convert to JSON string exactly once
    const jsonBody = JSON.stringify(payload);

    // Step B: Convert to Base64 (using utf8 encoding to safely encode any characters)
    const base64Body = Buffer.from(jsonBody, 'utf8').toString('base64');

    // Step C: Generate MD5 of Base64 + API_KEY in lowercase hex
    const sign = crypto.createHash('md5').update(base64Body + apiKey).digest('hex');

    // 5. EXTENSIVE SERVER LOGGING (Masking Secrets)
    console.log('--- [CRYPTOMUS DIAGNOSTICS START] ---');
    console.log('Merchant ID:', merchantId);
    console.log('Order ID:', orderId);
    console.log('Raw JSON Body:', jsonBody);
    console.log('Base64 Body:', base64Body);
    console.log('Generated Sign:', sign);
    console.log('API Key First 4 Chars:', apiKey.substring(0, 4) + '...');
    console.log('-------------------------------------');

    // 6. Make request to Cryptomus API
    const endpoint = 'https://api.cryptomus.com/v1/payment';
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'merchant': merchantId,
        'sign': sign,
        'Content-Type': 'application/json'
      },
      body: jsonBody 
    });

    const status = response.status;
    const responseText = await response.text();
    let data = {};
    
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('[Cryptomus] Response is not valid JSON:', responseText);
    }

    // 7. Verify response and handle errors
    console.log(`[Cryptomus Response] Status: ${status}`);
    
    if (!response.ok || !data.result) {
       console.error('[Cryptomus Processing Error]:', data);
       
       // Don't send full trace to FE, but specify clear message
       return res.status(status || 500).json({ 
         success: false, 
         message: data.message || 'Payment provider rejected request', 
         debugCode: status
       });
    }

    console.log(`[Cryptomus Success] Invoice URL: ${data.result.url}`);
    
    return res.status(200).json({ 
      success: true,
      url: data.result.url,
      order_id: orderId 
    });

  } catch (error) {
    console.error('[Cryptomus Critical Error]:', error);
    return res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера.', error: error.message });
  }
}
