import type { VercelRequest, VercelResponse } from '@vercel/node';
import { SignJWT } from 'jose';
import crypto from 'crypto';


interface CreateSessionRequest {
    addresses: Array<{
        address: string;
        blockchains: string[];
    }>;
    assets?: string[];
    clientIp?: string;
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get environment variables
        const API_KEY_ID = process.env.COINBASE_API_KEY_ID;
        const API_KEY_SECRET = process.env.COINBASE_API_KEY_SECRET;



        if (!API_KEY_ID || !API_KEY_SECRET) {
            console.error('Missing Coinbase API credentials');
            return res.status(500).json({
                error: 'Server configuration error',
                message: 'Missing COINBASE_API_KEY_ID or COINBASE_API_KEY_SECRET environment variables'
            });
        }

        // Parse request body
        const { addresses, assets = ['ETH', 'USDC'], clientIp }: CreateSessionRequest = req.body;

        if (!addresses || !Array.isArray(addresses) || addresses.length === 0) {
            return res.status(400).json({ error: 'At least one address is required' });
        }

        // Get client IP from the request (skip private IPs for local dev)
        let clientIpAddress: string | undefined;
        if (clientIp) {
            clientIpAddress = clientIp;
        } else if (req.headers['x-forwarded-for']) {
            const ips = req.headers['x-forwarded-for'].toString().split(',');
            clientIpAddress = ips[0].trim();
        }

        // Don't send clientIp if it's a private/local IP address
        if (clientIpAddress && (
            clientIpAddress.startsWith('127.') ||
            clientIpAddress.startsWith('192.168.') ||
            clientIpAddress.startsWith('10.') ||
            clientIpAddress.startsWith('172.') ||
            clientIpAddress === '::1' ||
            clientIpAddress === 'localhost'
        )) {
            clientIpAddress = undefined;
        }

        // Generate JWT Bearer Token manually
        let bearerToken: string;
        try {
            // Convert base64 DER key to EC private key
            const ecKey = crypto.createPrivateKey({
                key: API_KEY_SECRET,
                format: 'der',
                type: 'pkcs8',
                encoding: 'base64',
            });

            // Create JWT payload for Bearer Token
            const now = Math.floor(Date.now() / 1000);
            const uri = `POST api.developer.coinbase.com/onramp/v1/token`;
            
            const payload = {
                iss: 'cdp',
                sub: API_KEY_ID,
                aud: 'https://api.developer.coinbase.com',
                iat: now,
                nbf: now,
                exp: now + 120, // 2 minutes
                jti: crypto.randomBytes(16).toString('hex'),
                uris: [uri],
            };

            // Sign JWT using jose library
            bearerToken = await new SignJWT(payload)
                .setProtectedHeader({ alg: 'ES256', typ: 'JWT' })
                .sign(ecKey);
        } catch (signError) {
            console.error('JWT generation error:', signError);
            return res.status(500).json({
                error: 'JWT generation failed',
                message: 'Unable to generate JWT with provided API key',
                details: signError instanceof Error ? signError.message : 'Unknown signing error'
            });
        }

        // Prepare request body for session token
        const requestBody: any = {
            addresses: addresses,
            assets: assets,
        };

        // Only include clientIp if it's a valid public IP
        if (clientIpAddress) {
            requestBody.clientIp = clientIpAddress;
        }

        // Exchange JWT for session token
        const response = await fetch('https://api.developer.coinbase.com/onramp/v1/token', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Coinbase API error:', data);
            return res.status(response.status).json({
                error: 'Failed to generate session token',
                details: data
            });
        }

        // Return session token to frontend
        return res.status(200).json({
            token: data.token,
            channel_id: data.channel_id || ''
        });

    } catch (error) {
        console.error('Error generating session token:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}

