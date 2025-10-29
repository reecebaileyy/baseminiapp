import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateJwt } from "@coinbase/cdp-sdk/auth";
import 'dotenv/config';

function getClientIp(req: VercelRequest): string {
    const forwardedFor = req.headers['x-forwarded-for'];
    if (typeof forwardedFor === 'string') {
      return forwardedFor.split(',')[0].trim();
    }
    // Fallbacks
    return (
      req.headers['x-real-ip']?.toString() ||
      req.socket.remoteAddress ||
      '127.0.0.1'
    );
  }

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        const token = await generateJwt({
            apiKeyId: process.env.KEY_NAME!,
            apiKeySecret: process.env.KEY_SECRET!,
            requestMethod: process.env.REQUEST_METHOD!,
            requestHost: process.env.REQUEST_HOST!,
            requestPath: process.env.REQUEST_PATH!,
        });

        console.log("✅ JWT generated successfully");
        const clientIp = getClientIp(req);
        const body = req.body || {};

        const response = await fetch('https://api.developer.coinbase.com/onramp/v1/token', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                addresses: body.addresses || [],
                assets: body.assets || ['ETH', 'USDC'],
                clientIp,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Coinbase Session Token API error:', errorText);
            return res.status(response.status).json({
                error: 'Failed to generate session token',
                details: errorText,
            });
        }

        const data = await response.json();

        console.log('✅ Session token generated successfully');
        return res.status(200).json({ token: data.token });

    } catch (error) {
        console.error("❌ Error generating session token:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
