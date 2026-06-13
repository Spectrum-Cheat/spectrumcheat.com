/**
 * ─── RECOMMEND SCRIPTS CONFIG ────────────────────────────────────────────────
 *
 * เพิ่ม slug ของสคริปต์ที่อยากแนะนำที่นี่
 * slug คือส่วนท้ายของ URL เช่น /bloxcheat/MY-SLUG → slug = "MY-SLUG"
 *
 * youtubeUrl (optional) — ใส่ link YouTube ที่แนะนำสคริปต์นี้
 * note       (optional) — โน้ตส่วนตัวไว้ดูเอง (ไม่แสดงบนเว็บ)
 *
 * ตัวอย่าง:
 *   { slug: "infinite-yield-v5", youtubeUrl: "https://youtu.be/xxxxx" },
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface RecommendEntry {
  slug: string;
  youtubeUrl?: string;
  note?: string;
}

export const RECOMMEND_SCRIPTS: RecommendEntry[] = [
  // เพิ่มสคริปต์ที่อยากแนะนำด้านล่างนี้ได้เลย
  // { slug: "example-slug", youtubeUrl: "https://youtu.be/xxxxx" },
];

/**
 * ─── CUSTOM RECOMMEND SCRIPTS ────────────────────────────────────────────────
 *
 * สำหรับสคริปต์ที่ "ไม่ได้อยู่บน ScriptBlox" (เช่น loadstring ของเราเอง)
 * ใส่ข้อมูลครบเองที่นี่ แล้วมันจะโผล่ในหน้า Recommend + มีหน้า detail ของตัวเอง
 * พร้อม Unlock Gate และปุ่ม copy เหมือนสคริปต์ปกติ
 *
 *  id      — ใช้ทำ URL: /bloxcheat/custom/<id>  (ใช้ a-z, 0-9, ขีด - เท่านั้น)
 *  title   — ชื่อสคริปต์
 *  game    — ชื่อเกม
 *  image   — ลิงก์รูปภาพ
 *  script  — โค้ด loadstring เต็มๆ
 *  youtubeUrl / key / universal — optional
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface CustomScript {
  id: string;
  title: string;
  game: string;
  image: string;
  script: string;
  features?: string;
  provider?: string;
  youtubeUrl?: string;
  key?: boolean;
  universal?: boolean;
  verified?: boolean;
  views?: number;
  likeCount?: number;
}

export const CUSTOM_RECOMMEND: CustomScript[] = [
  {
    id: "axon-hub-grow-a-garden-2",
    title: "Axon Hub | Grow A Garden 2 Script - Auto Farm & Sell",
    game: "Grow A Garden 2",
    image: "https://tr.rbxcdn.com/180DAY-09c20dc34b4eb6117c895edfaf142596/768/432/Image/Webp/noFilter",
    provider: "AxonHub",
    verified: true,
    key: true,
    views: 31874,
    likeCount: 198,
    script: `loadstring(game:HttpGet("https://api.luarmor.net/files/v3/loaders/97c3f6db55a2cf72141537a85458e5a7.lua"))()`,
    features: `⚡ Axon Hub — Grow A Garden 2 Script (Smart Auto Plant, Auto Harvest, Auto Sell, Pet & Egg Opener, Auto Steal & Garden Expansion)

Build the richest garden on the server and rake in Sheckles completely AFK with the most advanced Grow A Garden 2 script on the market. Powered by Axon Hub and beautifully laid out using a clean Fluent UI (Glass Theme) with full config saving, this script automates your entire gameplay loop so your garden keeps earning while you're away.

🛠 Smooth, lightweight, and mobile-friendly — set your seeds and let the script plant, grow, harvest, and cash out on a perfectly timed loop.

🚀 Grow A Garden 2 Features:

Smart Auto Farm: Auto-plants your selected seeds across your plot, auto-harvests fully grown fruit, and loops the full grow cycle hands-free.

Auto Sell: Auto-sells all fruit or filtered fruit types, with sell-preview and the Daily Deal bonus built in to maximize Sheckles per run.

Auto Shop Buyer: Auto-purchases seeds, gear, and crates on a configurable loop.

Pets & Eggs Opener: Auto-opens eggs, crates, and seed packs, then auto-equips your best pets and buys extra pet slots.

Progression Automation: Auto-spends skill points, claims mailbox rewards, redeems codes, and auto-expands your garden the moment you can afford it.

Auto Steal: Runs the full steal loop to swipe rewards from other players' gardens.

Player Utilities: Custom WalkSpeed, JumpPower, Infinite Jump, Noclip, Fly, and Anti-AFK.

Quick Teleports: Fast-travel to shops, the sell point, and key garden zones.

Server & Info Tools: Live stats readout (Sheckles, Tokens, Inventory) plus server hop utilities.

📌 How to Use:
1. Copy the script from the Script tab.
2. Open your favorite Roblox executor.
3. Launch Grow A Garden 2.
4. Paste and execute the script.
5. Press Right Shift to open the control dashboard.`,
  },
  {
    id: "airflow-hub-grow-a-garden-2",
    title: "AirFlow Hub | Grow a Garden 2 - Keyless Fast Autofarm & Webhook System (60+ Features)",
    game: "Grow a Garden 2",
    image: "https://scriptblox.com/images/script/97598239454123-1781296333679.png",
    provider: "AirFlow",
    verified: true,
    key: false,
    views: 24560,
    likeCount: 141,
    script: `loadstring(game:HttpGet("https://airflowscript.com/loader"))()`,
    features: `🌬️ AirFlow Hub — Grow a Garden 2 (Keyless · Fast Autofarm · Webhook System · 60+ Features)

A fully keyless, lightning-fast Grow a Garden 2 script packed with over 60 features. No key system, no waiting — just inject, execute, and let your garden farm itself completely AFK.

🚀 Highlights:

Fast Auto Farm: High-speed auto-plant, auto-harvest, and auto-sell loop tuned for maximum Sheckles per minute.

Auto Sell & Auto Shop: Sells your harvest automatically and re-buys seeds, gear, and crates on a configurable loop.

Pets & Eggs: Auto-opens eggs and packs, then auto-equips your strongest pets.

Webhook System: Live Discord webhook reports — get notified of your earnings, rare drops, and farm progress in real time.

Progression Automation: Auto-claims rewards, redeems codes, and auto-expands your garden when affordable.

Player Utilities: WalkSpeed, JumpPower, Infinite Jump, Noclip, Fly, and Anti-AFK.

Quick Teleports: Jump straight to shops, sell points, and key garden zones.

📌 How to Use:
1. Copy the script from the Script tab.
2. Open your favorite Roblox executor.
3. Launch Grow a Garden 2.
4. Paste and execute the script — no key required.`,
  },
  {
    id: "vertex-hub-mm2",
    title: "Vertex Hub - Murder Mystery 2",
    game: "Murder Mystery 2",
    image: "https://rscripts.net/_next/image?url=%2Fassets%2Fscripts%2F68667ed994a9fb8c81caaab2_1751547610017_AQTDF069mJ.webp&w=640&q=75",
    provider: "Vertex",
    verified: true,
    key: false,
    views: 58213,
    likeCount: 312,
    script: `loadstring(game:HttpGet('https://raw.smokingscripts.org/vertex.lua'))()`,
    features: `🔥 Vertex Hub - Ultimate MM2 Script (Enhanced) 🔥
The most powerful, optimized, and feature-packed script for Murder Mystery 2! Dominate the game with autofarming, combat hacks, ESP, and premium exploits—all in one smooth, reliable hub.

🚀 Enhanced Features

⚔️ Combat & Gameplay
✅ AutoFarm – Fast coin grinding (configurable routes)
✅ Kill Aura – Auto-kill nearby players (adjustable range)
✅ Silent Aim – Always hit your shots (bypass detection)
✅ Auto Shoot Murderer – Instantly fire when murderer is near
✅ Fling & Anti-Fling – Toss players or stay unflingable
✅ Kill All – Eliminate everyone in the server (OP mode)
✅ Invisible (PREMIUM) – True invisibility (undetectable)
✅ Kill Murder (PREMIUM)

👀 ESP & Visuals
🔍 Player Chams – See players through walls
🔍 Gun ESP – Locate weapons easily
🔍 Name ESP – Display player names & roles
💰 Coin Tracker – Shows coin spawns & counts

⚡ Movement & Utility
🏃 Walk Speed – Adjustable speed (no lagback)
🦘 Jump Power – Super jumps or low gravity
🔄 Auto Re-Execute – Script reloads if it breaks
💾 Auto Save Settings – Your config stays after rejoin

🛡️ Safety & Optimization
⚡ CPU Usage – No lag, smooth performance
🔄 Auto-Updates – Always the latest version

📌 Why Choose Vertex Hub?
✔ Most reliable script for MM2
✔ Undetected
✔ Simple UI, easy controls

🎯 How to Use?
1. Inject your executor
2. Execute the script
3. Customize settings in the GUI
4. DOMINATE the server!`,
  },
  {
    id: "merqury-hub-driving-empire",
    title: "Merqury Hub — Instant Auto Arrest, Auto Rob, Auto Drive & more!",
    game: "[LAND ROVER] Driving Empire",
    image: "https://tr.rbxcdn.com/180DAY-3fd9af34a6e61185a030eb8d936e91ac/768/432/Image/Webp/noFilter",
    provider: "Merqury",
    verified: true,
    key: true,
    views: 40363,
    likeCount: 4,
    script: `loadstring(game:HttpGet("https://raw.githubusercontent.com/3x3x3x3x3/rt/refs/heads/main/Merqury"))()`,
    features: `Merqury Hub — Driving Empire (Auto Arrest, Auto Rob, Auto Drive & more)

🚓 Auto Farm Tab:
- Auto Arrest (instantly arrest anyone on the map)
- Auto Rob
- Auto Drive
- Auto Helicopter Drive
- Auto Delivery

🧩 Misc Tab:
- Join Team button
- Anti AFK toggle
- Buy 10 tuning crates button
- Menu keybind change

…and there's more stuff inside too!

📌 How to Use:
1. Copy the script above.
2. Open your Roblox executor.
3. Launch Driving Empire.
4. Paste and execute the script.

⚠️ Note: This script uses a key system — tap "Get Key" in the menu to unlock.`,
  },
  {
    id: "speed-keyboard-escape-axon-hub",
    title: "Keyboard Escape Auto Win & XP Farm Script - Axon Hub",
    game: "[⚡] +1 Speed Keyboard Escape | Candy & Chocolate",
    image: "https://scriptblox.com/images/script/95082159892680-1780644985188.png",
    provider: "AxonHub",
    verified: true,
    key: true,
    views: 1532,
    likeCount: 0,
    script: `loadstring(game:HttpGet("https://api.luarmor.net/files/v3/loaders/97c3f6db55a2cf72141537a85458e5a7.lua"))()`,
    features: `Axon Hub — [+1 Speed] Keyboard Escape Script (Auto Win, Speed Farm & Rebirth)

Axon Hub for Keyboard Escape is the ultimate high-performance script built to dominate the speed and wins leaderboards. Powered by a beautiful Fluent UI interface, this script features an intelligent path-walking engine that carefully respects the server's anti-cheat speed cap (clamped at 250 studs/s) and automatically dodges all physical map traps. Secure thousands of wins and reach infinite speed completely hands-free!

🛠️ Main Features:

🏆 Smart Auto Win (World 1 Support):
- Precise Path Walker (1 to 25,000 Win Tiers): Tweens your character safely through exact path coordinates to claim your wins.
- Synchronized Obstacle Avoidance: Monitors the workspace in real-time and pauses to wait for obstacles (tsunamis, rolling kill balls, lava towers, keycaps bridge timer, corridor traps) before advancing.
- Legitimate Registration: Snaps directly onto the final WinBlock and fires touch signals to secure your wins legitimately.
- WalkSpeed Watcher: Warns you if your current WalkSpeed is too slow to register the win, protecting you from anti-cheat flags.

🏃‍♂️ Treadmill Speed Farm:
- Automated Treadmill Farming: Teleports and anchors your character directly on your chosen treadmill (Normal, Gold, Diamond, Candy, Admin).
- No-Drift Farming: Keeps your character perfectly positioned so the game's downward raycasts constantly credit speed without any manual walking or drift.
- Gamepass Checking: Automatically detects and lets you farm premium treadmills unlocked by gamepasses.

👑 Auto Rebirth & Progression:
- Auto Rebirth: Monitors your level and automatically triggers a rebirth the split-second you become eligible, multiplying your speed gains.

🎒 Cosmetics & Step Awards Automation:
- Auto Step Awards: Instantly touches and equips the best step awards (Award 1 to Award 8) at spawn based on your current wins.
- Auto Shop Trails & Auras: Automatically buys and equips the highest-multiplier trails and auras.

🛡️ Player Hacks & Comfort:
- Movement Customization: Adjustable WalkSpeed and JumpPower, customizable WASD Fly, Noclip, Infinite Jump, and Anti-AFK.

📌 How to Use:
1. Copy the script above.
2. Open your Roblox executor.
3. Launch [+1 Speed] Keyboard Escape.
4. Paste and execute the script.
5. Press Right Shift to toggle the Axon Hub menu.
6. Open the Auto Win or Speed Farm tab and enable your toggles!

⚠️ Note: The path-walker is strictly clamped at the server's 250 studs/s safety limit to protect your account. Path coordinates are optimized for World 1.`,
  },
];
