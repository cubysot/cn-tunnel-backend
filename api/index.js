import crypto from 'crypto';
import { getClientIP } from './utils';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Maneja solicitudes de verificación de CORS (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const clientIP = getClientIP(req);
  const timestamp = Date.now();
  const token = crypto.createHash('sha256')
                      .update(`${clientIP}-${timestamp}`)
                      .digest('hex')
                      .slice(0, 8);

  const tunnelURL = `https://tunnel.cubysoft.uk/${token}`;

  res.json({
    success: true,
    tunnelURL,
    token,
  });
}
