# Spectrum Cheat — Website

Official website for **Spectrum Cheat**, a Roblox script hub.
Live at **[spectrumcheat.com](https://spectrumcheat.com)**.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **UI:** React 19 + Tailwind CSS 4
- **Language:** TypeScript
- **Auth:** NextAuth v5 (Discord OAuth)
- **Hosting:** Vercel

## Features

- Multi-language UI (EN / TH / ZH / VI / PT) via cookie-based SSR i18n
- Multi-currency pricing (USD / THB / CNY / VND / BRL)
- Script hub with live status tracking (Working / Waiting / Retired)
- Key system with unlock gate (Linkvertise + social steps)
- Bloxcheat recommend pages per game
- ZPU creator "about" page

## Project Structure

```
src/app/
├── _components/     Shared UI (header, footer, ...)
├── _i18n/           Translations + language hook
├── bloxcheat/       Recommend pages + unlock gate
├── getkey/          Key generation flow
├── scripts/         Script catalog
├── status/          Script status board
└── zpu/             Creator about page
public/
├── loader.lua       Loader served via api.spectrumcheat.com
└── shop/            Product images
```

## Environment Variables

Set in the Vercel dashboard (never commit `.env.local`):

- `AUTH_SECRET` — NextAuth session secret
- `AUTH_DISCORD_ID` — Discord OAuth client ID
- `AUTH_DISCORD_SECRET` — Discord OAuth client secret
- `DISCORD_GUILD_ID` — server ID for auto-join
- `DISCORD_BOT_TOKEN` — bot token for auto-join

## Deployment

Auto-deployed on Vercel — every push to `main` triggers a new deployment.

---

© Spectrum Cheat. All rights reserved.
