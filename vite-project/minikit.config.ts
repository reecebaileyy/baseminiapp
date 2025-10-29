/// <reference types="vite/client" />

const ROOT_URL =
  import.meta.env.VITE_VERCEL_URL ||
  (import.meta.env.VITE_VITE_VERCEL_URL && `https://${import.meta.env.VITE_VITE_VERCEL_URL}`) ||
  "http://localhost:5173";

/**
 * MiniApp configuration object. Must follow the mini app manifest specification.
 *
 * @see {@link https://docs.base.org/mini-apps/features/manifest}
 */
export const minikitConfig = {

  "accountAssociation": {
    "header": "eyJmaWQiOjEzOTkxOTAsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg2RWUwMzExYWNFNDQwYjNDYzAwMzA3MWJDY0VmMmI0ZTZDQzM2MjIzIn0",
    "payload": "eyJkb21haW4iOiJiYXNlbWluaWFwcC1udS52ZXJjZWwuYXBwIn0",
    "signature": "Vo0t91UjHnPtHVHqEF9xE5XVbeyitIZwvLSSgStzvOA3mVRqLFfJTWqZ0eFKdUEUcDZaBzWmLXiO0FvJkBBfkBs="
  },
  "baseBuilder": {
    "allowedAddresses": ["0x37058bec8B2Ab89188742765843dDDD3fD23199f"],
  },
  "miniapp": {
    "version": "1",
    "name": "BaseScout",
    "subtitle": "",
    "description": "Simple mobile tool for discovering, swapping and buying tokens on Base",
    "screenshotUrls": [],
    "iconUrl": `${ROOT_URL}/icon.png`,
    "splashImageUrl": `${ROOT_URL}/splash.png`,
    "splashBackgroundColor": "#000000",
    "homeUrl": ROOT_URL,
    "webhookUrl": `${ROOT_URL}/api/webhook`,
    "primaryCategory": "utility",
    "tags": ["example"],
    "heroImageUrl": `${ROOT_URL}/hero.png`,
    "tagline": "",
    "ogTitle": "",
    "ogDescription": "",
    "ogImageUrl": `${ROOT_URL}/hero.png`,
  },
} as const;
