import crypto from 'crypto';
import { getClientIP } from './utils';

export default function handler(req, res) {
    const clientIP = getClientIP(req);  // Obtener IP del cliente
    const timestamp = Date.now();       // Marcar el tiempo de solicitud

    // Crear un token basado en IP y timestamp
    const token = crypto.createHash('sha256')
        .update(`${clientIP}-${timestamp}`)
        .digest('hex')
        .slice(0, 8);  // Usamos 8 caracteres para el token

    const tunnelURL = `https://tunnel.cubysoft.uk/${token}`;

    // Devolver la URL del túnel y el token
    res.json({
        success: true,
        tunnelURL,
        token,
    });
}
