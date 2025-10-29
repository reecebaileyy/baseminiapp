import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateJwt } from "@coinbase/cdp-sdk/auth";
import "dotenv/config";

// Helper: get real client IP
function getClientIp(req: VercelRequest): string {
  if (process.env.NODE_ENV !== "production") {
    return "8.8.8.8"; // use public IP for dev
  }
  return (
    req.headers["x-real-ip"]?.toString() ||
    req.socket.remoteAddress ||
    "127.0.0.1"
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // 🔹 Parse JSON body explicitly (important for vercel dev)
    const rawBody =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});
    const body = JSON.parse(rawBody || "{}");

    // 🔹 Validate addresses
    if (!body.addresses || !Array.isArray(body.addresses) || body.addresses.length === 0) {
      return res.status(400).json({ error: "Addresses parameter is required" });
    }

    // 1️⃣ Generate JWT for the Onramp Session Token API
    const token = await generateJwt({
      apiKeyId: process.env.KEY_NAME!,
      apiKeySecret: process.env.KEY_SECRET!,
      requestMethod: "POST",
      requestHost: "api.developer.coinbase.com",
      requestPath: "/onramp/v1/token",
    });

    console.log("✅ JWT generated successfully");

    // 2️⃣ Call Coinbase Onramp Session Token API
    const clientIp = getClientIp(req);

    const response = await fetch("https://api.developer.coinbase.com/onramp/v1/token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addresses: body.addresses,
        assets: body.assets || ["ETH", "USDC"],
        clientIp,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Coinbase Session Token API error:", errorText);
      return res.status(response.status).json({
        error: "Failed to generate session token",
        details: errorText,
      });
    }

    const data = await response.json();

    console.log("✅ Session token generated successfully");
    return res.status(200).json({ token: data.token });
  } catch (error) {
    console.error("❌ Error generating session token:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
