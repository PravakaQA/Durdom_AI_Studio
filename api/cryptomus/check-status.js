export default async function handler(req, res) {
  return res.status(200).json({ ok: true, message: 'Status check is not connected to database yet. Use Cryptomus webhook notifications in Telegram.' });
}
