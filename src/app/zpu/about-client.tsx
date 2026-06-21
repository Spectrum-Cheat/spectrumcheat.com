"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../_i18n/context";
import type { TranslationKey } from "../_i18n/translations";

// tech logo helpers
const si = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;
const dv = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

// วันที่ครบ 18 ปี (แก้เป็นวันเกิดจริง — ปี ค.ศ. ที่อายุครบ 18)
const BIRTHDAY_18 = "2027-05-15T00:00:00+07:00";

/* ── Now-playing track (drop the files in /public and update paths) ── */
const MUSIC = {
  title: "Make Them Pay",
  artist: "Drake",
  src: "/ice-man/Make Them Pay.mp3",
  cover: "/ice-man/Iceman.jpg",
};

/* ════════════════════════════════════════════════════════════════
   EDIT YOUR PROFILE HERE  (ข้อมูล/ลิงก์ แก้ที่นี่)
   ส่วนข้อความที่แปลภาษา อยู่ในไฟล์ _i18n/translations.ts (คีย์ขึ้นต้น zpu*)
═══════════════════════════════════════════════════════════════════ */
const ZPU = {
  brand: "ZPU",
  aka: "xZPUHigh",
  photo: "/images/ZPU.jpg", // เปลี่ยนเป็นรูปตัวเองได้
  location: "Bangkok, Thailand",
  timezone: "Asia/Bangkok",

  socials: [
    { label: "YouTube", handle: "@xZPUHigh", href: "https://www.youtube.com/@xZPUHigh", color: "#FF0000", platform: "youtube" as const },
    { label: "Discord", handle: "Join server", href: "https://discord.gg/hackerclub", color: "#5865F2", platform: "discord" as const },
    { label: "Instagram", handle: "@zpu.mnn2", href: "https://www.instagram.com/zpu.mnn2", color: "#E4405F", platform: "instagram" as const },
    { label: "Facebook", handle: "zpu.mnn2", href: "https://www.facebook.com/zpu.mnn2", color: "#1877F2", platform: "facebook" as const },
    { label: "Spectrum Cheat", handle: "spectrumcheat.com", href: "/", color: "#8b5cf6", platform: "spectrum" as const },
    { label: "TikTok [Main]", handle: "@xzpuhigh", href: "https://www.tiktok.com/@xzpuhigh", color: "#ffffff", platform: "tiktok" as const },
    { label: "TikTok [Content]", handle: "@xzpuhighreal", href: "https://www.tiktok.com/@xzpuhighreal", color: "#ffffff", platform: "tiktok" as const },
    { label: "Steam", handle: "zpureal", href: "https://steamcommunity.com/id/zpureal/", color: "#66C0F4", platform: "steam" as const },
  ],

  works: [
    { year: "2025-2026", name: "Spectrum Cheat", tag: "Website Official", href: "/", image: "/project%20images/Spectrum%20Cheat%20New%20Model%20Eng.png" },
    { year: "2024-2026", name: "Spectrum Store", tag: "Website / Store", href: "https://spectrumcheat.rexzy.xyz", image: "/project%20images/Website%20Spectrum%20Cheat%20Store%202026.png" },
    { year: "2025-2026", name: "Blox Cheat", tag: "Website / Blog", href: "/bloxcheat", image: "/project%20images/Blox%20Cheat.png" },
    { year: "2022-2026", name: "Authentication Systems", tag: "Key & Security Systems", href: "https://spectrumcheat.com/getkey", image: "https://miro.medium.com/v2/resize:fit:1400/0*7VyEZgzwUhQMeBqb" },
    { year: "2021-2026", name: "Spectrum Hub // [ZPU HUB]", tag: "Platform", href: "https://spectrumcheat.com/scripts", image: "/project%20images/Script%20Library%20Preview.png" },
    { year: "2024-2025", name: "Script Bloxy", tag: "Website / Blog", href: "https://scriptbloxy.com", image: "/project%20images/Script%20Bloxy%20Website2%202024.png" },
    { year: "2022-2024", name: "CPU FARM", tag: "Website / Store", href: "https://cpufarm.net", image: "/project%20images/CPU%20FARM%202023.png" }, 
  ],

  // Favorite games — Steam titles auto-load art from Steam CDN.
  // For non-Steam games, drop a logo in /public/images/games/ and set image,
  // otherwise an initials tile is shown automatically.
  favGames: [
    { name: "Roblox", image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Roblox_Logo_2022.jpg" },
    { name: "Far Cry 5", image: "https://images.stopgame.ru/games/logos/17071/c280x280/Gz4qcCRrJ1EyiOZnDSFOhQ/far_cry_5-square.jpg" },
    { name: "Counter-Strike 2", image: "https://www.instalki.pl/wp-content/uploads/gra/icons/Counter-Strike-2.webp" },
    { name: "Resident Evil 4", image: "https://image.api.playstation.com/vulcan/ap/rnd/202207/2509/85p2Dwh5iDhUzRKe40QeNYh3.png" },
    { name: "GTA V", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg" },
    { name: "Minecraft", image: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/logos/Homepage_Gameplay-Trailer_MC-OV-logo_300x300.png" },
    { name: "CoD: Modern Warfare 2", image: "https://i.pinimg.com/736x/b4/1d/92/b41d9249e3788cd2a7f5a9dcfce2b9a9.jpg" },
    { name: "Elden Ring", image: "https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/UAnLUUMdxA9cow8TEe8IfhuC.png" },
    { name: "Far Cry 3", image: "https://store.ubisoft.com/on/demandware.static/-/Sites-masterCatalog/default/dw806502b0/images/large/575ffd98a3be1633568b4d6c.jpg" },
    { name: "Valorant", image: "https://images.steamusercontent.com/ugc/1009310639741043947/C4780FD7B53B39EFE4A536842FC1281A48A1256F/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false" },
    { name: "Stardew Valley", image: "https://static.wikia.nocookie.net/logopedia/images/8/8e/Stardew_icon.png" },
    { name: "Resident Evil Village", image: "https://image.api.playstation.com/vulcan/ap/rnd/202101/0812/FkzwjnJknkrFlozkTdeQBMub.png" },
    { name: "Apex Legends", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB9OAuwCiB3T1ar0IvZ9OkBoeGZo4IBexnbw&s" },
    { name: "Far Cry 6", image: "https://mir-s3-cdn-cf.behance.net/projects/404/ce6841121289871.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg" },
    { name: "NBA 2K26", image: "https://pbs.twimg.com/media/GvW2eiQW4AA5Gvm.jpg" },
    { name: "God of War", image: "https://sw6.elbenwald.de/media/47/3b/67/1629836234/E1051409_3.jpg" },
    { name: "GTA San Andreas", image: "https://play-lh.googleusercontent.com/Plgr-TF6CRvZSLuXeCeximGXI86YLR-oH1M9ja-yuRz40eXsOTe-HgqbD6XtHVRCcGK6CLjq8sj2p4vfZfJ6sYI=w600-h300-pc0xffffff-pd" },
    { name: "Fortnite", image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png" },
    { name: "AC Shadows", image: "https://static.wikia.nocookie.net/assassinscreed/images/2/29/AC_Shadows_Cover.png" },
    { name: "Far Cry Primal", image: "https://image.api.playstation.com/cdn/EP0001/CUSA03311_00/qyx9NKTl6kgnvh3NPmtPu47aWM8IlS2Z.png" },
    { name: "PUBG: BATTLEGROUNDS", image: "https://sm.ign.com/ign_nordic/cover/p/pubg-battl/pubg-battlegrounds_xfyj.jpg" },
    { name: "CoD: Black Ops 6", image: "https://store-images.s-microsoft.com/image/apps.10491.14346543607136639.d932bf87-6edc-4da6-bbd5-c944ad33bc0d.f78757c0-6542-410f-a0cc-52fc592d79f1" },
    { name: "Black Myth: Wukong", image: "https://assets-prd.ignimgs.com/2024/08/18/blackmyth-1723969364570.jpg" },
    { name: "Red Dead Redemption 2", image: "https://static.wikia.nocookie.net/reddeadredemption/images/0/0a/Reddeadcover.jpg" },
    { name: "Resident Evil 2", image: "https://image.api.playstation.com/vulcan/ap/rnd/202206/0204/QcehVQAjUKA9oU24PNmzTaCy.png" },
    { name: "Forza Horizon 6", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Forza_Horizon_6_key_art.jpeg/250px-Forza_Horizon_6_key_art.jpeg" },
    { name: "Resident Evil Requiem", image: "https://cdn1.epicgames.com/spt-assets/b2e589fac93746fc8d20b4177f5b3a60/resident-evil-requiem-g8jiq.jpg" },
  ] as { name: string; image?: string }[],

  // Favorite food / movies / artists — same style as games.
  // Send name + image (or just name → initials tile fallback).
  favFood: [] as { name: string; image?: string }[],
  // Favorite sport & players.
  favSports: [
    { sport: "Basketball", player: "LeBron James", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/LeBron_James_%2851959977144%29_%28cropped2%29.jpg/500px-LeBron_James_%2851959977144%29_%28cropped2%29.jpg" },
    { sport: "Formula 1", player: "Max Verstappen", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg/500px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg" },
    { sport: "Golf", player: "Rory McIlroy", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Rory_McIlroy_Ryder_Cup_2025-195_%28cropped%29.jpg/500px-Rory_McIlroy_Ryder_Cup_2025-195_%28cropped%29.jpg" },
    { sport: "Tennis", player: "Jannik Sinner", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Jannik_Sinner_2025_US_Open.jpg/500px-Jannik_Sinner_2025_US_Open.jpg" },
    { sport: "Football", player: "Cristiano Ronaldo", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/500px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg" },
    { sport: "MotoGP", player: "Marc Márquez", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Marc_Marquez_at_the_2026_Spanish_Grand_Prix_%28cropped%29.jpg/500px-Marc_Marquez_at_the_2026_Spanish_Grand_Prix_%28cropped%29.jpg" },
    { sport: "Hockey", player: "Cale Makar", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cale_Makar_playing_with_the_Avalanche_in_2020_%28Quintin_Soloviev%29_%28cropped%29.jpg/500px-Cale_Makar_playing_with_the_Avalanche_in_2020_%28Quintin_Soloviev%29_%28cropped%29.jpg" },
    { sport: "Baseball", player: "Mookie Betts", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Dodgers_at_Nationals_%2853676957188%29_%28cropped%29.jpg/500px-Dodgers_at_Nationals_%2853676957188%29_%28cropped%29.jpg" },
    { sport: "MMA (UFC)", player: "Alex Pereira", image: "https://platform.mmamania.com/wp-content/uploads/sites/110/chorus/uploads/chorus_asset/file/24961012/1579885817.jpg?quality=90&strip=all&crop=16.663393558523,0,66.673212882954,100" },
    { sport: "Cycling", player: "Tadej Pogačar", image: "https://sportklub.n1info.si/wp-content/uploads/2025/06/14/1749911610-profimedia-1010947434-750x500.jpg" },
    { sport: "Rally", player: "Sébastien Ogier", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/2023_Central_European_Rally_-_Ogier_01_%28cropped%29.jpg/500px-2023_Central_European_Rally_-_Ogier_01_%28cropped%29.jpg" },
    { sport: "Mountain Biking", player: "Nino Schurter", image: "https://asset.scott-sports.com/fit-in/1200x630/sco/sco-bike-nino-schurter-athlete-profile-1000x1000_2073192.jpg?signature=e0143303fb6dafe37c41572e4641143a99f3e370e58fdf1e18d1614371ee1e6f" },
  ] as { sport: string; player: string; image?: string }[],
  favMovies: [
    { name: "The Shawshank Redemption", image: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg" },
    { name: "Catch Me If You Can", image: "https://upload.wikimedia.org/wikipedia/en/4/4d/Catch_Me_If_You_Can_2002_movie.jpg" },
    { name: "Interstellar", image: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg" },
    { name: "Back to the Future", image: "https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg" },
    { name: "The Wolf of Wall Street", image: "https://upload.wikimedia.org/wikipedia/en/d/d8/The_Wolf_of_Wall_Street_%282013%29.png" },
    { name: "Parasite", image: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png" },
    { name: "Fight Club", image: "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { name: "Predator", image: "https://lumiere-a.akamaihd.net/v1/images/predator_feature-poster_584x800_6ec38255.jpeg" },
    { name: "Black Panther", image: "https://m.media-amazon.com/images/M/MV5BMTU4MDIwMTQ5OV5BMl5BanBnXkFtZTgwMjI4NTQxNDM@._V1_.jpg" },
    { name: "Forrest Gump", image: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg" },
    { name: "Kingsman", image: "https://upload.wikimedia.org/wikipedia/en/8/8b/Kingsman_The_Secret_Service_poster.jpg" },
    { name: "War Dogs", image: "https://upload.wikimedia.org/wikipedia/en/5/52/War_Dogs_2016_poster.jpg" },
    { name: "The Lord of the Rings", image: "https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg" },
    { name: "The Martian", image: "https://m.media-amazon.com/images/M/MV5BYmI2ODZkODgtZTlkMC00ZDk3LWFjOWItZWZlYTE0MjcyYmJmXkEyXkFqcGc@._V1_.jpg" },
    { name: "Dune", image: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg" },
    { name: "Harry Potter", image: "https://upload.wikimedia.org/wikipedia/en/d/df/Harry_Potter_and_the_Deathly_Hallows_%E2%80%93_Part_2.jpg" },
    { name: "Spider-Man", image: "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg" },
    { name: "The Founder", image: "https://upload.wikimedia.org/wikipedia/en/6/68/The_Founder_poster.png" },
    { name: "Fast & Furious", image: "https://upload.wikimedia.org/wikipedia/en/8/8f/Fast_and_Furious_Poster.jpg" },
    { name: "In Time", image: "https://image.tmdb.org/t/p/original/qNVdN4nY1Byf0VfgFSzofcEGWyt.jpg" },
    { name: "Pirates of the Caribbean", image: "https://m.media-amazon.com/images/M/MV5BMjE5MjkwODI3Nl5BMl5BanBnXkFtZTcwNjcwMDk4NA@@._V1_.jpg" },
    { name: "Final Destination", image: "https://preview.redd.it/new-poster-for-final-destination-bloodlines-v0-y8hbs87nu0ve1.jpeg?width=640&crop=smart&auto=webp&s=42bb6c6a5283c40bcf98118b5990c9f1fc423ee7" },
    { name: "Peaky Blinders", image: "https://i.ebayimg.com/images/g/t94AAOSweNFj454I/s-l1200.jpg" },
    { name: "John Wick", image: "https://posterspy.com/wp-content/uploads/2022/11/JohnWick2_Poster.jpg" },
    { name: "Lucy", image: "https://m.media-amazon.com/images/I/81qlPSElf7L.jpg" },
    { name: "The Secret Life of Walter Mitty", image: "https://www.sjsreview.com/wp-content/uploads/2014/06/secret-life-of-walter-mitty-small.jpg" },
    { name: "Iron Man", image: "https://f.ptcdn.info/655/002/000/1362028562-ironman3po-o.jpg" },
  ] as { name: string; image?: string }[],
  // Artists — each with their top 3 songs.
  favArtists: [
    { name: "Drake", image: "https://pbs.twimg.com/media/HIcfr1WXMAI3VH9.jpg", songs: ["Teenage Fever", "Passionfruit", "Rich Baby Daddy", "Die Trying", "Make Them Pay", "Hold On We're Going Home", "CN Tower", "Tried Our Best", "Greedy", "Fortworth"] },
    { name: "PARTYNEXTDOOR", image: "https://i.scdn.co/image/ab6761610000e5eb957320981e31e862bc2fb844", songs: ["TBH", "Break from Toronto", "Make It To The Morning", "Belong to the City", "Some of Your Love", "Grown Women", "FWU", "Resentment", "Her Way", "Come and See Me"] },
    { name: "The Weeknd", image: "https://upload.wikimedia.org/wikipedia/th/c/c1/The_Weeknd_-_After_Hours.png", songs: ["After Hours", "Reminder", "Out Of Time", "Save Your Tears", "Popular", "Blinding Lights", "Creepin'", "Earned It", "The Party & The After Party", "In Your Eyes"] },
    { name: "Future", image: "https://static.wikia.nocookie.net/rappers/images/b/b6/Fn.webp", songs: ["WAIT FOR U", "Comin Out Strong", "All To Myself", "Like That", "Solo", "Life Is Good", "Mask Off", "Low Life", "Everyday Hustle", "We Still Don't Trust You"] },
    { name: "21 Savage", image: "https://m.media-amazon.com/images/M/MV5BMzcyOTM2NDA5OF5BMl5BanBnXkFtZTgwMTYzMTQzNzM@._V1_.jpg", songs: ["A Lot", "Redrum", "Prove It", "Runnin", "Glock in My Lap", "Rich Flex", "Atlanta Tears", "Dark Days", "Ball w/o You", "All of Me"] },
    { name: "Bruno Mars", image: "https://storage.googleapis.com/pr-newsroom-wp/1/2025/01/Bruno_Backyard_IG_Posted_SQUARE-1440x1440.jpeg", songs: ["Why You Wanna Fight?", "Too Good to Say Goodbye", "Risk It All", "Just the Way You Are", "Die With a Smile", "When I Was Your Man", "It Will Rain", "Dance With Me", "After Last Night", "Leave the Door Open"] },
  ] as { name: string; image?: string; songs: string[] }[],

  stack: [
    { catKey: "zpuStackWeb", items: [
      { name: "React", icon: si("react") },
      { name: "Next.js", icon: si("nextdotjs", "white") },
      { name: "Svelte", icon: si("svelte") },
    ] },
    { catKey: "zpuStackLang", items: [
      { name: "TypeScript", icon: si("typescript") },
      { name: "JavaScript", icon: si("javascript") },
      { name: "HTML", icon: si("html5") },
      { name: "CSS", icon: si("css") },
      { name: "Python", icon: si("python") },
      { name: "Lua", icon: si("lua", "white") },
      { name: "Luau", icon: "https://luau.org/_astro/luau-logo.DU3ngeWd.svg" },
    ] },
    { catKey: "zpuStackDb", items: [
      { name: "PostgreSQL", icon: si("postgresql") },
      { name: "MySQL", icon: si("mysql") },
      { name: "MongoDB", icon: si("mongodb") },
      { name: "Redis", icon: si("redis") },
      { name: "Drizzle ORM", icon: si("drizzle") },
    ] },
    { catKey: "zpuStackDevops", items: [
      { name: "Docker", icon: si("docker") },
      { name: "Vercel", icon: si("vercel", "white") },
      { name: "Cloudflare", icon: si("cloudflare") },
      { name: "GitHub Actions", icon: si("githubactions") },
      { name: "Ubuntu", icon: si("ubuntu") },
      { name: "Git", icon: si("git") },
    ] },
    { catKey: "zpuStackTools", items: [
      { name: "Photoshop", icon: dv("photoshop/photoshop-original.svg") },
      { name: "Premiere Pro", icon: dv("premierepro/premierepro-original.svg") },
      { name: "DaVinci Resolve", icon: si("davinciresolve") },
      { name: "CapCut", icon: "https://i.pinimg.com/474x/0d/64/2b/0d642b674f86ef3f50cf08a522237c2e.jpg" },
      { name: "Canva", icon: "https://zortout.com/wp-content/uploads/2023/10/unnamed.png" },
    ] },
  ] as { catKey: TranslationKey; items: { name: string; icon?: string }[] }[],
};
/* ═══════════════════════════════════════════════════════════════ */

function LiveClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () => {
      const t = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timezone]);
  return <>{time}</>;
}

const SI_PLATFORM: Record<string, string> = {
  youtube: si("youtube", "FF0000"),
  tiktok: si("tiktok", "white"),
  discord: si("discord", "5865F2"),
  facebook: si("facebook", "1877F2"),
  instagram: si("instagram", "E4405F"),
  steam: si("steam", "66C0F4"),
};

function PlatformIcon({ platform }: { platform: "spectrum" | "youtube" | "tiktok" | "discord" | "facebook" | "instagram" | "steam" }) {
  if (SI_PLATFORM[platform]) {
    return (
      <span className="zpu-current-icon">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SI_PLATFORM[platform]} alt={platform} style={{ width: 16, height: 16 }} />
      </span>
    );
  }
  if (platform === "discord") {
    return (
      <span className="zpu-current-icon" style={{ color: "#5865F2" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.25.5a14.6 14.6 0 0 1 4.3 2.2 13.9 13.9 0 0 0-11 0A14.6 14.6 0 0 1 12.85 3.5L12.6 3a19.8 19.8 0 0 0-4.9 1.4C4.6 9 3.8 13.5 4.2 17.9A19.9 19.9 0 0 0 10.2 21l.6-1c-1-.3-1.9-.7-2.7-1.2.2-.2.4-.3.6-.5a14.2 14.2 0 0 0 12.2 0c.2.2.4.3.6.5-.8.5-1.7.9-2.7 1.2l.6 1a19.9 19.9 0 0 0 6-3.1c.5-5-.8-9.5-3.5-13.5zM9.5 15.3c-1 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9 1.8.9 1.7 1.9c0 1-.8 1.9-1.7 1.9zm5 0c-1 0-1.7-.9-1.7-1.9s.8-1.9 1.7-1.9 1.8.9 1.7 1.9c0 1-.8 1.9-1.7 1.9z" />
        </svg>
      </span>
    );
  }
  if (platform === "youtube") {
    return (
      <span className="zpu-current-icon" style={{ color: "#ff0033" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z" />
        </svg>
      </span>
    );
  }
  if (platform === "tiktok") {
    return (
      <span className="zpu-current-icon" style={{ color: "#fff" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      </span>
    );
  }
  return (
    <span className="zpu-current-icon zpu-current-icon--img">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/Spectrum Icon.png" alt="Spectrum" />
    </span>
  );
}

function gameInitials(name: string): string {
  const parts = name.split(/[\s:\-]+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return parts.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function GameTile({ name, image }: { name: string; image?: string }) {
  const [failed, setFailed] = useState(false);
  const showImg = image && !failed;
  return (
    <div className="zpu-game" title={name}>
      <div className="zpu-game-icon">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <span className="zpu-game-initial">{gameInitials(name)}</span>
        )}
      </div>
      <span className="zpu-game-name">{name}</span>
    </div>
  );
}

function SportCard({ sport, player, image }: { sport: string; player: string; image?: string }) {
  const [failed, setFailed] = useState(false);
  const showImg = image && !failed;
  return (
    <div className="zpu-sport" title={`${sport} — ${player}`}>
      <div className="zpu-sport-photo">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={player} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <span className="zpu-game-initial">{gameInitials(player)}</span>
        )}
        <span className="zpu-sport-tag">{sport}</span>
      </div>
      <span className="zpu-sport-name">{player}</span>
    </div>
  );
}

function TechChip({ name, icon }: { name: string; icon?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="zpu-stack-chip">
      {icon && !failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={icon} alt="" className="zpu-stack-ico" loading="lazy" onError={() => setFailed(true)} />
      )}
      {name}
    </span>
  );
}

function AgeCountdown({ target }: { target: string }) {
  const { t } = useLang();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return null;
  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return <span className="zpu-age-badge">{t("zpuCdTurned")}</span>;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;
  return (
    <span className="zpu-age-badge">
      {d} {t("zpuCdDay")} {h} {t("zpuCdHour")} {m} {t("zpuCdMin")} {s} {t("zpuCdSec")} {t("zpuCdTo18")}
    </span>
  );
}

function ArtistCard({ name, image, songs }: { name: string; image?: string; songs: string[] }) {
  const [failed, setFailed] = useState(false);
  const showImg = image && !failed;
  return (
    <div className="zpu-artist">
      <div className="zpu-artist-head">
        <div className="zpu-artist-photo">
          {showImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} loading="lazy" onError={() => setFailed(true)} />
          ) : (
            <span className="zpu-game-initial">{gameInitials(name)}</span>
          )}
        </div>
        <span className="zpu-artist-name">{name}</span>
      </div>
      <ul className="zpu-artist-songs">
        {songs.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

function fmtTime(s: number): string {
  if (!s || Number.isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

// Animated, self-ticking live number (livecounts.io style).
// - Counts up smoothly to `target` whenever it increases (e.g. after a poll).
// - Between polls, drifts up by +1 every 5–17s so it always feels alive,
//   but never runs more than LEAD ahead of the real value (self-correcting).
function LiveTicker({ target, fallback }: { target: number | null; fallback: string }) {
  const [display, setDisplay] = useState<number | null>(null);
  const [stalled, setStalled] = useState(false);
  const displayRef = useRef(0);
  const targetRef = useRef<number | null>(target);
  const rafRef = useRef<number | null>(null);
  const LEAD = 30;

  // If no real value has arrived after a while, show the text fallback
  // instead of leaving the loading shimmer forever.
  useEffect(() => {
    const id = setTimeout(() => setStalled(true), 8000);
    return () => clearTimeout(id);
  }, []);

  const animateTo = (to: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const from = displayRef.current;
    if (from === to) {
      displayRef.current = to;
      setDisplay(to);
      return;
    }
    const dur = 1000;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(from + (to - from) * eased);
      displayRef.current = v;
      setDisplay(v);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  // React to new real values from polling.
  useEffect(() => {
    targetRef.current = target;
    if (target != null && target > displayRef.current) animateTo(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  // Gentle upward drift so the number feels live between polls.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const t = targetRef.current;
      if (t != null && displayRef.current < t + LEAD) {
        const v = displayRef.current + 1;
        displayRef.current = v;
        setDisplay(v);
      }
      timer = setTimeout(tick, 5000 + Math.random() * 12000);
    };
    timer = setTimeout(tick, 5000 + Math.random() * 12000);
    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (display == null) {
    return stalled ? <>{fallback}</> : <span className="zpu-stat-skeleton" aria-label="loading" />;
  }
  return <>{display.toLocaleString("en-US")}</>;
}

const YT_CHANNEL = "UCgMktyw9e816q0GzhBL2dnQ";

// Fetch YouTube subs straight from the browser — both sources allow CORS (*),
// and the browser's network reaches them reliably even when the host can't.
async function fetchYouTubeSubsClient(): Promise<number | null> {
  // socialcounts — finer "estimation" value.
  try {
    const r = await fetch(
      `https://api.socialcounts.org/youtube-live-subscriber-count/${YT_CHANNEL}`,
      { cache: "no-store" }
    );
    if (r.ok) {
      const d = await r.json();
      const v = d?.counters?.estimation?.subscriberCount ?? d?.counters?.api?.subscriberCount;
      if (typeof v === "number") return v;
    }
  } catch {
    /* try next */
  }
  // mixerno — fallback.
  try {
    const r = await fetch(
      `https://mixerno.space/api/youtube-channel-counter/user/${YT_CHANNEL}`,
      { cache: "no-store" }
    );
    if (r.ok) {
      const d = await r.json();
      const raw = d?.counts?.find((x: { value: string; count: number | string }) => x.value === "subscribers")?.count;
      const n = typeof raw === "string" ? parseInt(raw, 10) : raw;
      if (typeof n === "number" && !Number.isNaN(n)) return n;
    }
  } catch {
    /* give up */
  }
  return null;
}

// Live stat cards — seeded by the server, then polled every 30s for realtime updates.
function LiveStats({ ytSubs, discordMembers }: { ytSubs?: number | null; discordMembers?: number | null }) {
  const { t } = useLang();
  const [yt, setYt] = useState<number | null>(ytSubs ?? null);
  const [dc, setDc] = useState<number | null>(discordMembers ?? null);

  useEffect(() => {
    let alive = true;
    const poll = async () => {
      // Discord (and a YT seed) via our server route.
      try {
        const r = await fetch("/api/zpu-stats", { cache: "no-store" });
        if (r.ok) {
          const d = await r.json();
          if (alive) {
            if (typeof d.ytSubs === "number") setYt(d.ytSubs);
            if (typeof d.discordMembers === "number") setDc(d.discordMembers);
          }
        }
      } catch {
        /* keep last known value */
      }
      // YouTube straight from the browser (most reliable).
      const ytClient = await fetchYouTubeSubsClient();
      if (alive && ytClient != null) setYt(ytClient);
    };
    poll();
    const id = setInterval(poll, 30000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <section className="zpu-stats">
      <div className="zpu-stat">
        <strong><LiveTicker target={yt} fallback="75K+" /></strong>
        <span>{t("zpuStatSubs")}</span>
      </div>
      <div className="zpu-stat">
        <strong><LiveTicker target={dc} fallback="110K+" /></strong>
        <span>{t("zpuStatCommunity")}</span>
      </div>
      <div className="zpu-stat">
        <strong>9+</strong>
        <span>{t("zpuStatYears")}</span>
      </div>
    </section>
  );
}

function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const [coverFailed, setCoverFailed] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [popupOpen, setPopupOpen] = useState(false);

  // Spin the floating note icon only while music is actually playing.
  useEffect(() => {
    document.documentElement.classList.toggle("music-playing", playing);
    return () => document.documentElement.classList.remove("music-playing");
  }, [playing]);

  // Restore saved preferences + autoplay (unless the user paused last time).
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    let vol = 0.3;
    let mute = false;
    let wantPaused = false;
    try {
      const sv = parseFloat(localStorage.getItem("spectrum-zpu-volume") ?? "");
      if (Number.isFinite(sv)) vol = Math.min(1, Math.max(0, sv));
      mute = localStorage.getItem("spectrum-zpu-muted") === "1";
      wantPaused = localStorage.getItem("spectrum-zpu-paused") === "1";
    } catch { /* ignore */ }

    a.volume = vol;
    a.muted = mute;
    setVolume(vol);
    setMuted(mute);

    // Respect a previous pause — don't force the song back on.
    if (wantPaused) { setPlaying(false); return; }

    let started = false;
    const events = ["pointerdown", "keydown", "touchstart", "scroll", "mousemove"];
    const cleanup = () => events.forEach((ev) => window.removeEventListener(ev, onInteract));
    const onInteract = () => {
      if (started) return;
      a.play().then(() => { started = true; setPlaying(true); cleanup(); }).catch(() => {});
    };

    a.play()
      .then(() => { started = true; setPlaying(true); })
      .catch(() => {
        events.forEach((ev) => window.addEventListener(ev, onInteract, { passive: true }));
      });

    return cleanup;
  }, []);

  const save = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } };

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => {});
      save("spectrum-zpu-paused", "0");
    } else {
      a.pause();
      setPlaying(false);
      save("spectrum-zpu-paused", "1");
    }
  }
  function restart() {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = 0;
    a.play().then(() => setPlaying(true)).catch(() => {});
    save("spectrum-zpu-paused", "0");
  }
  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const a = audioRef.current;
    if (!a || !dur) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * dur;
  }
  function toggleMute() {
    const a = audioRef.current;
    if (!a) return;
    const m = !a.muted;
    a.muted = m;
    setMuted(m);
    save("spectrum-zpu-muted", m ? "1" : "0");
  }
  function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseFloat(e.target.value);
    const a = audioRef.current;
    if (!a) return;
    a.volume = v;
    a.muted = v === 0;
    setVolume(v);
    setMuted(v === 0);
    save("spectrum-zpu-volume", String(v));
    save("spectrum-zpu-muted", v === 0 ? "1" : "0");
  }
  useEffect(() => {
    const handler = () => setPopupOpen((o) => !o);
    window.addEventListener("spectrum:show-music", handler);
    return () => window.removeEventListener("spectrum:show-music", handler);
  }, []);

  return (
    <div className={`zpu-music-wrap${popupOpen ? " open" : ""}`}>
      <div className="zpu-music-backdrop" onClick={() => setPopupOpen(false)} />
    <div className="zpu-player">
      <audio
        ref={audioRef}
        src={MUSIC.src}
        preload="metadata"
        onTimeUpdate={(e) => {
          setCur(e.currentTarget.currentTime);
          const d = e.currentTarget.duration;
          if (d && Number.isFinite(d)) setDur(d);
        }}
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (d && Number.isFinite(d)) setDur(d);
        }}
        onDurationChange={(e) => {
          const d = e.currentTarget.duration;
          if (d && Number.isFinite(d)) setDur(d);
        }}
        onEnded={() => setPlaying(false)}
      />

      <div className="zpu-player-cover">
        {MUSIC.cover && !coverFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={MUSIC.cover} alt={MUSIC.title} onError={() => setCoverFailed(true)} />
        ) : (
          <span className="zpu-player-cover-ph">♪</span>
        )}
      </div>

      <div className="zpu-player-main">
        <div className="zpu-player-info">
          <span className="zpu-player-title">{MUSIC.title}</span>
          <span className="zpu-player-artist">{MUSIC.artist}</span>
        </div>

        <div className="zpu-player-bar-row">
          <span className="zpu-player-time">{fmtTime(cur)}</span>
          <div className="zpu-player-bar" onClick={seek}>
            <div className="zpu-player-fill" style={{ width: dur ? `${(cur / dur) * 100}%` : "0%" }} />
          </div>
          <span className="zpu-player-time">{fmtTime(dur)}</span>
        </div>

        <div className="zpu-player-controls">
          <button className="zpu-player-btn" onClick={restart} aria-label="Restart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>
          <button className="zpu-player-play" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
            {playing ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button className="zpu-player-btn" onClick={restart} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6h2v12h-2zm-2 6L6 6v12z" />
            </svg>
          </button>

          <div className="zpu-player-volume">
            <button className="zpu-player-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
              {muted || volume === 0 ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3z" />
                  <path d="M16 9l4 4m0-4l-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3z" />
                  <path d="M16 8a5 5 0 0 1 0 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </button>
            <input
              className="zpu-player-vol-slider"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={changeVolume}
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export function AboutZpu({ ytSubs, discordMembers }: { ytSubs?: number | null; discordMembers?: number | null }) {
  const { t, lang } = useLang();
  const [showAllWorks, setShowAllWorks] = useState(false);

  const currently = [
    { labelKey: "zpuRoleFounder" as const, strong: "Spectrum Cheat", href: "https://spectrumcheat.com", sinceKey: "zpuSinceFounder" as const, platform: "spectrum" as const },
    { labelKey: "zpuRoleOwner" as const, strong: "ZPU Community", href: "https://discord.gg/hackerclub", sinceKey: "zpuSinceOwner" as const, platform: "discord" as const },
    { labelKey: "zpuRoleYoutube" as const, strong: "@xZPUHigh", href: "https://www.youtube.com/channel/UCgMktyw9e816q0GzhBL2dnQ", sinceKey: "zpuSinceYoutube" as const, platform: "youtube" as const },
    { labelKey: "zpuRoleTiktok" as const, strong: "@xZPUHighReal", href: "https://www.tiktok.com/@xzpuhighreal", sinceKey: "zpuSinceTiktok" as const, platform: "tiktok" as const },
  ];

  const facts = [
    { labelKey: "zpuFactsPassions" as const, value: t("zpuFactsPassionsV"), size: "" },
    { labelKey: "zpuFactsChasing" as const, value: (<><span className="zpu-only-desktop">{t("zpuFactsChasingV")}</span><span className="zpu-only-mobile">{t("zpuFactsChasingV").replace(/\n/g, "\n\n")}</span></>), size: "" },
    { labelKey: "zpuFactsLiving" as const, value: t("zpuFactsLivingV"), size: "country" },
    { labelKey: "zpuFactsStyle" as const, value: t("zpuFactsStyleV"), size: "" },
    { labelKey: "zpuFactsKnown" as const, value: (<><span className="zpu-only-desktop">ZPU / xZPUHigh<br />Non / Chanon</span><span className="zpu-only-mobile">ZPU<br />xZPUHigh<br />&<br />Non<br />Chanon</span></>), size: "mid" },
    { labelKey: "zpuFactsAge" as const, value: t("zpuFactsAgeV"), size: "big" },
  ];

  const tinyFacts = [
    { labelKey: "zpuTinyNickname" as const, value: lang === "th" ? "ซีพียู / นน 😴" : "ZPU / NON 😴", color: "#22c55e" },
    { labelKey: "zpuTinyStatus" as const, value: "WORK HARD 🔥", color: "#ff6f00" },
  ];

  return (
    <main className="zpu-page">
      <div className="zpu-dots" />

      <div className="zpu-wrap">
        {/* Hero name card */}
        <section className="zpu-hero">
          <a href="/" className="zpu-lang-btn zpu-home-btn" aria-label="Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 11l9-8 9 8" />
              <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
              <path d="M9 21v-8h6v8" />
            </svg>
          </a>
          <button
            className="zpu-lang-btn"
            aria-label="Change language"
            onClick={() => window.dispatchEvent(new CustomEvent("spectrum:show-lang"))}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </button>
          <button
            className="zpu-lang-btn zpu-music-note"
            aria-label="Music"
            onClick={() => window.dispatchEvent(new CustomEvent("spectrum:show-music"))}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </button>
          <MusicPlayer />
        </section>

        {/* Intro */}
        <section className="zpu-intro">
          <div className="zpu-intro-text">
            <h2 className="zpu-hello">
              {t("zpuHello")} <span className="zpu-grad">{ZPU.brand}</span>
            </h2>
            <p className="zpu-bio" lang={lang} dangerouslySetInnerHTML={{ __html: t("zpuBio") }} />

            <p className="zpu-current-label">{t("zpuCurrent")}</p>
            <div className="zpu-current-list">
              {currently.map((c) => (
                <div key={c.strong} className="zpu-current-item">
                  <PlatformIcon platform={c.platform} />
                  <span>
                    {t(c.labelKey)}{" "}
                    <a href={c.href} target="_blank" rel="noreferrer" className="zpu-current-link">{c.strong}</a>
                  </span>
                  <span className="zpu-current-since">{t(c.sinceKey)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="zpu-photo-col">
            <div className="zpu-photo-frame">
              <div className="zpu-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ZPU.photo} alt={ZPU.brand} />
              </div>
              <div className="zpu-photo-sticker">🙂‍↔️ 🍀 ✨</div>
            </div>
            <div className="zpu-pills">
              <span className="zpu-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {ZPU.location}
              </span>
              <span className="zpu-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <LiveClock timezone={ZPU.timezone} />
              </span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <LiveStats ytSubs={ytSubs} discordMembers={discordMembers} />

        {/* Facts About Me */}
        <section className="zpu-facts-sec">
          <h2 className="zpu-works-title zpu-facts-bigtitle">{t("zpuFactsTitle")}</h2>

          <div className="zpu-tiny">
            {tinyFacts.map((f) => (
              <div key={f.labelKey} className="zpu-tiny-card" style={{ ["--c" as string]: f.color }}>
                <span className="zpu-tiny-label">{t(f.labelKey)}</span>
                <span className="zpu-tiny-value">{f.value}</span>
              </div>
            ))}
          </div>

          <div className="zpu-facts">
            {facts.map((f) => (
              <div key={f.labelKey} className="zpu-fact">
                <span className="zpu-fact-label">{t(f.labelKey)}</span>
                <span className={`zpu-fact-value${f.size ? ` zpu-fact-value--${f.size}` : ""}`}>{f.value}</span>
                {f.labelKey === "zpuFactsLiving" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="zpu-fact-flag" src="https://flagcdn.com/w320/th.png" alt="Thailand flag" loading="lazy" />
                )}
                {f.labelKey === "zpuFactsAge" && <AgeCountdown target={BIRTHDAY_18} />}
              </div>
            ))}
          </div>
        </section>

        {/* Favorite games */}
        <section className="zpu-games-sec">
          <h2 className="zpu-works-title">{t("zpuFavGamesTitle")}</h2>
          <p className="zpu-works-sub">{t("zpuFavGamesSub")}</p>
          <div className="zpu-games-grid">
            {ZPU.favGames.map((g) => (
              <GameTile key={g.name} name={g.name} image={g.image} />
            ))}
          </div>
        </section>

        {/* Favorite food */}
        {ZPU.favFood.length > 0 && (
          <section className="zpu-games-sec">
            <h2 className="zpu-works-title">{t("zpuFoodTitle")}</h2>
            <p className="zpu-works-sub">{t("zpuFoodSub")}</p>
            <div className="zpu-games-grid">
              {ZPU.favFood.map((g) => (
                <GameTile key={g.name} name={g.name} image={g.image} />
              ))}
            </div>
          </section>
        )}

        {/* Favorite movies */}
        {ZPU.favMovies.length > 0 && (
          <section className="zpu-games-sec">
            <h2 className="zpu-works-title">{t("zpuMoviesTitle")}</h2>
            <p className="zpu-works-sub">{t("zpuMoviesSub")}</p>
            <div className="zpu-games-grid zpu-poster-grid">
              {ZPU.favMovies.map((g) => (
                <GameTile key={g.name} name={g.name} image={g.image} />
              ))}
            </div>
          </section>
        )}

        {/* Favorite sport & players */}
        {ZPU.favSports.length > 0 && (
          <section className="zpu-games-sec">
            <h2 className="zpu-works-title">{t("zpuSportsTitle")}</h2>
            <p className="zpu-works-sub">{t("zpuSportsSub")}</p>
            <div className="zpu-sports-grid">
              {ZPU.favSports.map((s) => (
                <SportCard key={s.player} sport={s.sport} player={s.player} image={s.image} />
              ))}
            </div>
          </section>
        )}

        {/* Favorite artists */}
        {ZPU.favArtists.length > 0 && (
          <section className="zpu-games-sec">
            <h2 className="zpu-works-title">{t("zpuArtistsTitle")}</h2>
            <p className="zpu-works-sub">{t("zpuArtistsSub")}</p>
            <div className="zpu-artists-grid">
              {ZPU.favArtists.map((a) => (
                <ArtistCard key={a.name} name={a.name} image={a.image} songs={a.songs} />
              ))}
            </div>
          </section>
        )}

        {/* Tech stack */}
        <section className="zpu-stack-sec">
          <h2 className="zpu-works-title">{t("zpuStackTitle")}</h2>
          <p className="zpu-works-sub">{t("zpuStackSub")}</p>
          <div className="zpu-stack-list">
            {ZPU.stack.map((row) => (
              <div key={row.catKey} className="zpu-stack-row">
                <span className="zpu-stack-cat">{t(row.catKey)}</span>
                <div className="zpu-stack-items">
                  {row.items.map((it) => (
                    <TechChip key={it.name} name={it.name} icon={it.icon} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Works */}
        <section className="zpu-works">
          <h2 className="zpu-works-title">{t("zpuWorksTitle")}</h2>
          <p className="zpu-works-sub">{t("zpuWorksSub")}</p>
          <div className="zpu-works-grid">
            {(showAllWorks ? ZPU.works : ZPU.works.slice(0, 6)).map((w) => (
              <a key={w.image} href={w.href} className="zpu-work-card">
                <div className="zpu-work-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.image} alt={w.name} />
                  <div className="zpu-work-tags">
                    <span className="zpu-work-tag">{w.year}</span>
                    <span className="zpu-work-tag">{w.tag}</span>
                  </div>
                </div>
                <div className="zpu-work-body">
                  <span className="zpu-work-name">{w.name}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
          {ZPU.works.length > 6 && !showAllWorks && (
            <button className="zpu-works-more" onClick={() => setShowAllWorks(true)}>
              {t("zpuExploreAll")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          )}
        </section>

        {/* Connect */}
        <section className="zpu-connect">
          <h2 className="zpu-works-title">{t("zpuConnectTitle")}</h2>
          <p className="zpu-works-sub">{t("zpuConnectSub")}</p>
          <div className="zpu-socials">
            {ZPU.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                className="zpu-social"
                style={{ ["--c" as string]: s.color }}
              >
                <PlatformIcon platform={s.platform} />
                <span className="zpu-social-label">{s.label}</span>
                <span className="zpu-social-handle">{s.handle}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
            ))}
          </div>
        </section>

        <footer className="zpu-footer">
          <span>© 2021–{new Date().getFullYear()} Spectrum Cheat. All rights reserved.</span>
        </footer>
      </div>
    </main>
  );
}
