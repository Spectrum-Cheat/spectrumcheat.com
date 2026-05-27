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
