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
    id: "speed-keyboard-escape-axon-hub",
    title: "Keyboard Escape Auto Win & XP Farm Script - Axon Hub",
    game: "[⚡] +1 Speed Keyboard Escape | Candy & Chocolate",
    image: "https://scriptblox.com/images/script/95082159892680-1780644985188.png",
    provider: "AxonHub",
    verified: true,
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
