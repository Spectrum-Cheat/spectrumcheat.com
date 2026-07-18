"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "../../_i18n/context";
import type { TranslationKey } from "../../_i18n/translations";
import { SiteFooter } from "../../_components/site-footer";

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
  location: "Chiang Mai, Thailand",
  timezone: "Asia/Bangkok",

  socials: [
    { label: "YouTube", handle: "@xZPUHigh", href: "https://www.youtube.com/@xZPUHigh", color: "#FF0000", platform: "youtube" as const },
    { label: "Discord", handle: "Join server", href: "https://discord.gg/C3MpUNwsDU", color: "#5865F2", platform: "discord" as const },
    { label: "Instagram", handle: "@zpu.mnn2", href: "https://www.instagram.com/zpu.mnn2", color: "#E4405F", platform: "instagram" as const },
    { label: "Facebook", handle: "zpu.mnn2", href: "https://www.facebook.com/zpu.mnn2", color: "#1877F2", platform: "facebook" as const },
    { label: "Spectrum Cheat", handle: "spectrumcheat.com", href: "/", color: "#8b5cf6", platform: "spectrum" as const },
    { label: "TikTok [Main]", handle: "@xzpuhigh", href: "https://www.tiktok.com/@xzpuhigh", color: "#ffffff", platform: "tiktok" as const },
    { label: "Steam", handle: "zpureal", href: "https://steamcommunity.com/id/zpureal/", color: "#66C0F4", platform: "steam" as const },
    { label: "GitHub", handle: "xZPUHigh", href: "https://github.com/xZPUHigh", color: "#ffffff", platform: "github" as const },
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
    { name: "Roblox", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Roblox_Logo_2022.jpg/500px-Roblox_Logo_2022.jpg" },
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
    { name: "GTA San Andreas", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/GTASABOX.jpg/500px-GTASABOX.jpg" },
    { name: "Fortnite", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Fortnite_F_lettermark_logo.png/500px-Fortnite_F_lettermark_logo.png" },
    { name: "AC Shadows", image: "https://static.wikia.nocookie.net/assassinscreed/images/2/29/AC_Shadows_Cover.png" },
    { name: "Far Cry Primal", image: "https://image.api.playstation.com/cdn/EP0001/CUSA03311_00/qyx9NKTl6kgnvh3NPmtPu47aWM8IlS2Z.png" },
    { name: "PUBG: BATTLEGROUNDS", image: "https://sm.ign.com/ign_nordic/cover/p/pubg-battl/pubg-battlegrounds_xfyj.jpg" },
    { name: "CoD: Black Ops 6", image: "https://store-images.s-microsoft.com/image/apps.10491.14346543607136639.d932bf87-6edc-4da6-bbd5-c944ad33bc0d.f78757c0-6542-410f-a0cc-52fc592d79f1" },
    { name: "Black Myth: Wukong", image: "https://assets-prd.ignimgs.com/2024/08/18/blackmyth-1723969364570.jpg" },
    { name: "Red Dead Redemption 2", image: "https://static.wikia.nocookie.net/reddeadredemption/images/0/0a/Reddeadcover.jpg" },
    { name: "Resident Evil 2", image: "https://image.api.playstation.com/vulcan/ap/rnd/202206/0204/QcehVQAjUKA9oU24PNmzTaCy.png" },
    { name: "Forza Horizon 6", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Forza_Horizon_6_key_art.jpeg/250px-Forza_Horizon_6_key_art.jpeg" },
    { name: "Resident Evil Requiem", image: "https://cdn1.epicgames.com/spt-assets/b2e589fac93746fc8d20b4177f5b3a60/resident-evil-requiem-g8jiq.jpg" },
    { name: "Slam Dunk Mobile", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxohkiNHWKfgWQcarrGOK1xY_2WuRfAcqs9dv3EdunOHIT77-5LYtLXh1E&s=10" },
    { name: "Kuroko's Basketball: Street Rivals", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8JjA-IPAJxFqC6tbrcoRVTY5QyqTs1qXlP329fgtP67jvZ-qUobLUJ8Eh&s=10" },
    { name: "Arena of Valor (ROV)", image: "https://downloadr2.apkmirror.com/wp-content/uploads/2019/06/5d163debc57e5.png" },
    { name: "Cookie Run: Classic", image: "https://play-lh.googleusercontent.com/tqhrRxdTKQIFKKXVNIU0xVeMJG6oFNvwexB_N1mZC181-x_KmJBP3FNgWqsPU7OwGKwr3Dkvld9-7FDzkAjhnrM" },
    { name: "EA SPORTS FC", image: "https://image.api.playstation.com/vulcan/ap/rnd/202408/0817/4248a0d1a669210e5caf5174eda176c7883be2c9089fa106.png" },
    { name: "Far Cry 4", image: "https://store.ubisoft.com/on/demandware.static/-/Sites-masterCatalog/default/dw50af203c/images/large/56c4947a88a7e300458b45e2.jpg" },
    { name: "Ghost of Tsushima", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Ghost_of_Tsushima.jpg/500px-Ghost_of_Tsushima.jpg" },
    { name: "F1 25", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/F1_25_cover_art.jpg/500px-F1_25_cover_art.jpg" },
    { name: "Sleeping Dogs", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Sleeping_Dogs_-_Square_Enix_video_game_cover.jpg/500px-Sleeping_Dogs_-_Square_Enix_video_game_cover.jpg" },
    { name: "Silent Hill f", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/Silent_Hill_f_cover_art.png/500px-Silent_Hill_f_cover_art.png" },
    { name: "Ready or Not", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Ready_or_Not_Console_Release.jpg/500px-Ready_or_Not_Console_Release.jpg" },
    { name: "Uncharted 4", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Uncharted_4_box_artwork.jpg/500px-Uncharted_4_box_artwork.jpg" },
    { name: "The Last of Us", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/46/Video_Game_Cover_-_The_Last_of_Us.jpg/500px-Video_Game_Cover_-_The_Last_of_Us.jpg" },
  ] as { name: string; image?: string; banner?: string }[],

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
    { sport: "Muay Thai", player: "Tawanchai", image: "https://cdn.onefc.com/wp-content/uploads/2021/05/Tawanchai-Hero-1200x1165-1-600x583.jpg" },
    { sport: "Skydiving", player: "Felix Baumgartner", image: "https://compote.slate.com/images/1ae5efaf-35e8-4e9b-ab0c-f258ffcd2da4.jpg?width=1560" },
    { sport: "Snowboarding", player: "Chloe Kim", image: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1369741695-68828fd6b8e36.jpg" },
    { sport: "Esports", player: "Faker", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Faker_2020_interview.jpg/500px-Faker_2020_interview.jpg" },
    { sport: "Rally", player: "Sébastien Ogier", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/2023_Central_European_Rally_-_Ogier_01_%28cropped%29.jpg/500px-2023_Central_European_Rally_-_Ogier_01_%28cropped%29.jpg" },
    { sport: "Freestyle Skiing", player: "Eileen Gu", image: "https://cdn.britannica.com/79/284579-050-04FDCF92/Eileen-Gu-2026-Olympics.jpg" },
    { sport: "Hockey", player: "Cale Makar", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cale_Makar_playing_with_the_Avalanche_in_2020_%28Quintin_Soloviev%29_%28cropped%29.jpg/500px-Cale_Makar_playing_with_the_Avalanche_in_2020_%28Quintin_Soloviev%29_%28cropped%29.jpg" },
    { sport: "Boxing", player: "Oleksandr Usyk", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/2022_-_Centre_Stage_EN1_4500_%2852471602047%29_%28cropped%29.jpg/500px-2022_-_Centre_Stage_EN1_4500_%2852471602047%29_%28cropped%29.jpg" },
    { sport: "American Football", player: "Patrick Mahomes", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Patrick_Mahomes_%2851615475056%29.jpg/500px-Patrick_Mahomes_%2851615475056%29.jpg" },
    { sport: "Taekwondo", player: "Lee Dae-hoon", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Lee_Dae-Hoon_London2012.jpg/500px-Lee_Dae-Hoon_London2012.jpg" },
    { sport: "Athletics", player: "Usain Bolt", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Usain_Bolt_smiling_Berlin_2009.JPG/500px-Usain_Bolt_smiling_Berlin_2009.JPG" },
    { sport: "Parkour", player: "Jason Paul", image: "https://img.redbull.com/images/c_limit,w_1500,h_1000/f_auto,q_auto/redbullcom/2023/7/4/mc9ltqse54tzpdiipvk9/jason-paul-profile" },
    { sport: "Archery", player: "Kim Woo-jin", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Kim_Woo-jin%2C_2025.jpg/500px-Kim_Woo-jin%2C_2025.jpg" },
    { sport: "Wingsuit Flying", player: "Jeb Corliss", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtezk7PwjEsizHCNuDXH7YV_bkzCtpC-RaZ_YxZKZBMphHVm0iUO6qEPI&s=10" },
    { sport: "Motocross", player: "Jett Lawrence", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Washougal_MX_2021_P1277967_%2851336729026%29.jpg/500px-Washougal_MX_2021_P1277967_%2851336729026%29.jpg" },
    { sport: "Skiing", player: "Lindsey Vonn", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Lindsey_Vonn_-_240422_181204_%28cropped%29.jpg/500px-25th_Laureus_World_Sports_Awards_-_Red_Carpet_-_Lindsey_Vonn_-_240422_181204_%28cropped%29.jpg" },
    { sport: "Cycling", player: "Tadej Pogačar", image: "https://sportklub.n1info.si/wp-content/uploads/2025/06/14/1749911610-profimedia-1010947434-750x500.jpg" },
    { sport: "MMA (UFC)", player: "Alex Pereira", image: "https://platform.mmamania.com/wp-content/uploads/sites/110/chorus/uploads/chorus_asset/file/24961012/1579885817.jpg?quality=90&strip=all&crop=16.663393558523,0,66.673212882954,100" },
    { sport: "Badminton", player: "Viktor Axelsen", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Viktor_Axelsen_-_Indonesia_Masters_2018.jpg/500px-Viktor_Axelsen_-_Indonesia_Masters_2018.jpg" },
    { sport: "Snooker", player: "Ronnie O'Sullivan", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Ronnie_O%E2%80%99Sullivan_at_Snooker_German_Masters_%28DerHexer%29_2015-02-06_07.jpg/500px-Ronnie_O%E2%80%99Sullivan_at_Snooker_German_Masters_%28DerHexer%29_2015-02-06_07.jpg" },
    { sport: "Chess", player: "Magnus Carlsen", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Magnus_Carlsen_in_2025.jpg/500px-Magnus_Carlsen_in_2025.jpg" },
    { sport: "Horse Racing", player: "Frankie Dettori", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Frankie_Dettori.jpg/500px-Frankie_Dettori.jpg" },
    { sport: "Mountain Biking", player: "Nino Schurter", image: "https://asset.scott-sports.com/fit-in/1200x630/sco/sco-bike-nino-schurter-athlete-profile-1000x1000_2073192.jpg?signature=e0143303fb6dafe37c41572e4641143a99f3e370e58fdf1e18d1614371ee1e6f" },
    { sport: "Baseball", player: "Mookie Betts", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Dodgers_at_Nationals_%2853676957188%29_%28cropped%29.jpg/500px-Dodgers_at_Nationals_%2853676957188%29_%28cropped%29.jpg" },
  ] as { sport: string; player: string; image?: string }[],
  favCars: [
    { name: "Ferrari F80", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/FerrariF80_%28resized%29_%28cropped%29.jpg/500px-FerrariF80_%28resized%29_%28cropped%29.jpg", priceUsd: 3900000 },
    { name: "Ferrari LaFerrari", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/LaFerrari_in_Beverly_Hills_%2814563979888%29.jpg/500px-LaFerrari_in_Beverly_Hills_%2814563979888%29.jpg", priceUsd: 1400000 },
    { name: "Ferrari SF90 XX Stradale", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Red_2019_Ferrari_SF90_Stradale_%2848264238897%29_%28cropped%29.jpg/500px-Red_2019_Ferrari_SF90_Stradale_%2848264238897%29_%28cropped%29.jpg", priceUsd: 770000 },
    { name: "Porsche 918 Spyder", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Porsche_918_Spyder_IAA_2013.jpg/500px-Porsche_918_Spyder_IAA_2013.jpg", priceUsd: 845000 },
    { name: "Porsche Carrera GT", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Porsche_Carrera_GT_-_Goodwood_Breakfast_Club_%28July_2008%29.jpg/500px-Porsche_Carrera_GT_-_Goodwood_Breakfast_Club_%28July_2008%29.jpg", priceUsd: 450000 },
    { name: "Porsche 911 GT3 RS (992)", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Porsche_992_GT3_1X7A0323.jpg/500px-Porsche_992_GT3_1X7A0323.jpg", priceUsd: 241000 },
    { name: "Porsche 911 GT2 RS (991)", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Porsche_991_GT2_RS_%2841654760692%29.jpg/500px-Porsche_991_GT2_RS_%2841654760692%29.jpg", priceUsd: 293000 },
    { name: "McLaren W1", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/2025_McLaren_W1_FOS25.jpg/500px-2025_McLaren_W1_FOS25.jpg", priceUsd: 2100000 },
    { name: "McLaren F1", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/1996_McLaren_F1_Chassis_No_63_6.1_Front.jpg/500px-1996_McLaren_F1_Chassis_No_63_6.1_Front.jpg", priceUsd: 20000000 },
    { name: "McLaren P1", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/McLaren_P1.jpg/500px-McLaren_P1.jpg", priceUsd: 1150000 },
    { name: "McLaren Senna", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/McLaren_Senna_IMG_3279.jpg/500px-McLaren_Senna_IMG_3279.jpg", priceUsd: 1000000 },
    { name: "Bugatti Tourbillon", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Bugatti_Tourbillon.jpg/500px-Bugatti_Tourbillon.jpg", priceUsd: 4000000 },
    { name: "Bugatti Chiron Super Sport 300+", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_1.jpg/500px-Bugatti_Chiron_1.jpg", priceUsd: 3900000 },
    { name: "Bugatti Bolide", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2024_Bugatti_Bolide_4.jpg/500px-2024_Bugatti_Bolide_4.jpg", priceUsd: 4700000 },
    { name: "Koenigsegg Jesko Absolut", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0833%29.jpg/500px-GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0833%29.jpg", priceUsd: 3400000 },
    { name: "Koenigsegg Jesko Attack", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0833%29.jpg/500px-GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0833%29.jpg", priceUsd: 3000000 },
    { name: "Koenigsegg Agera RS", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/2015_Koenigsegg_Agera_N_%2819886243212%29.jpg/500px-2015_Koenigsegg_Agera_N_%2819886243212%29.jpg", priceUsd: 2500000 },
    { name: "Pagani Utopia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Pagani_Utopia.jpg/500px-Pagani_Utopia.jpg", priceUsd: 2500000 },
    { name: "Pagani Huayra R", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Pagani%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0023%29.jpg/500px-Pagani%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0023%29.jpg", priceUsd: 3100000 },
    { name: "Pagani Zonda Cinque", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Pagani_Zonda_C12_%27chassis_001%27_Genf_2019_1Y7A5539.jpg/500px-Pagani_Zonda_C12_%27chassis_001%27_Genf_2019_1Y7A5539.jpg", priceUsd: 1800000 },
    { name: "Pagani Zonda R", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Pagani_Zonda_C12_%27chassis_001%27_Genf_2019_1Y7A5539.jpg/500px-Pagani_Zonda_C12_%27chassis_001%27_Genf_2019_1Y7A5539.jpg", priceUsd: 1850000 },
    { name: "Aston Martin Valkyrie", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Aston_Martin_Valkyrie_Verification_Prototype_001_Genf_2019_1Y7A5569.jpg/500px-Aston_Martin_Valkyrie_Verification_Prototype_001_Genf_2019_1Y7A5569.jpg", priceUsd: 3000000 },
    { name: "Aston Martin Valhalla", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/2022_Aston_Martin_Valhalla.jpg/500px-2022_Aston_Martin_Valhalla.jpg", priceUsd: 800000 },
    { name: "Mercedes-AMG ONE", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Mercedes-AMG_One_at_the_2022_Goodwood_Festival_of_Speed.jpg/500px-Mercedes-AMG_One_at_the_2022_Goodwood_Festival_of_Speed.jpg", priceUsd: 2700000 },
    { name: "Mercedes-Benz S-Class 2026", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Mercedes-Benz_W223_IMG_3951.jpg/500px-Mercedes-Benz_W223_IMG_3951.jpg", priceUsd: 118000 },
    { name: "BMW M5 CS", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2021_BMW_M5_CS_F90.jpg/500px-2021_BMW_M5_CS_F90.jpg", priceUsd: 143000 },
    { name: "BMW M4", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/2021_BMW_M4_Competition_Automatic_3.0_Front.jpg/500px-2021_BMW_M4_Competition_Automatic_3.0_Front.jpg", priceUsd: 80000 },
    { name: "Lotus Evija", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/2020_Lotus_Evija.jpg/500px-2020_Lotus_Evija.jpg", priceUsd: 2300000 },
    { name: "Lotus 3-Eleven", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Lotus_3-Eleven_1Y7A6172.jpg/500px-Lotus_3-Eleven_1Y7A6172.jpg", priceUsd: 130000 },
    { name: "Hennessey Venom F5 Evolution", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/2022_Hennessey_Venom_F5_Roadster_6.6_Front.jpg/500px-2022_Hennessey_Venom_F5_Roadster_6.6_Front.jpg", priceUsd: 2500000 },
  ] as { name: string; image?: string; priceUsd?: number }[],
  favMovies: [
    { name: "The Shawshank Redemption", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/81/ShawshankRedemptionMoviePoster.jpg/500px-ShawshankRedemptionMoviePoster.jpg" },
    { name: "Obsession", image: "https://image.tmdb.org/t/p/w500/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg" },
    { name: "Baby Driver", image: "https://image.tmdb.org/t/p/w500/tYzFuYXmT8LOYASlFCkaPiAFAl0.jpg" },
    { name: "Superman", image: "https://image.tmdb.org/t/p/w500/ldyfo0BKmz5rWtJJKCvwaNS4cJT.jpg" },
    { name: "The Odyssey", image: "https://image.tmdb.org/t/p/w500/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg" },
    { name: "Catch Me If You Can", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Catch_Me_If_You_Can_2002_movie.jpg/500px-Catch_Me_If_You_Can_2002_movie.jpg" },
    { name: "Interstellar", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Interstellar_film_poster.jpg/500px-Interstellar_film_poster.jpg" },
    { name: "Back to the Future", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Back_to_the_Future.jpg/500px-Back_to_the_Future.jpg" },
    { name: "Back to the Future Part II", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Back_to_the_Future_Part_II.jpg/500px-Back_to_the_Future_Part_II.jpg" },
    { name: "Back to the Future Part III", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Back_to_the_Future_Part_III.jpg/500px-Back_to_the_Future_Part_III.jpg" },
    { name: "The Wolf of Wall Street", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/The_Wolf_of_Wall_Street_%282013%29.png/500px-The_Wolf_of_Wall_Street_%282013%29.png" },
    { name: "Parasite", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Parasite_%282019_film%29.png/500px-Parasite_%282019_film%29.png" },
    { name: "Fight Club", image: "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { name: "Predator", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Predator_Movie.jpg/500px-Predator_Movie.jpg" },
    { name: "Predator 2", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Predator_two.jpg/500px-Predator_two.jpg" },
    { name: "Predators", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Predators_54632_glg.jpg/500px-Predators_54632_glg.jpg" },
    { name: "The Predator", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/The_Predator_official_poster.jpg/500px-The_Predator_official_poster.jpg" },
    { name: "Prey", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Prey_2022_poster.png/500px-Prey_2022_poster.png" },
    { name: "Predator: Badlands", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Predator_Badlands_Poster.jpg/500px-Predator_Badlands_Poster.jpg" },
    { name: "Black Panther", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Black_Panther_%28film%29_poster.jpg/500px-Black_Panther_%28film%29_poster.jpg" },
    { name: "Black Panther: Wakanda Forever", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Black_Panther_Wakanda_Forever_poster.jpg/500px-Black_Panther_Wakanda_Forever_poster.jpg" },
    { name: "Forrest Gump", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Forrest_Gump_poster.jpg/500px-Forrest_Gump_poster.jpg" },
    { name: "Kingsman: The Secret Service", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/Kingsman_The_Secret_Service_poster.jpg/500px-Kingsman_The_Secret_Service_poster.jpg" },
    { name: "Kingsman: The Golden Circle", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Kingsman_The_Golden_Circle.png/500px-Kingsman_The_Golden_Circle.png" },
    { name: "The King's Man", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/The_King%27s_Man.jpg/500px-The_King%27s_Man.jpg" },
    { name: "War Dogs", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/War_Dogs_2016_poster.jpg/500px-War_Dogs_2016_poster.jpg" },
    { name: "The Lord of the Rings: The Fellowship of the Ring", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Lord_Rings_Fellowship_Ring.jpg/500px-Lord_Rings_Fellowship_Ring.jpg" },
    { name: "The Lord of the Rings: The Two Towers", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Lord_Rings_Two_Towers.jpg/500px-Lord_Rings_Two_Towers.jpg" },
    { name: "The Lord of the Rings: The Return of the King", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/48/Lord_Rings_Return_King.jpg/500px-Lord_Rings_Return_King.jpg" },
    { name: "The Martian", image: "https://m.media-amazon.com/images/M/MV5BYmI2ODZkODgtZTlkMC00ZDk3LWFjOWItZWZlYTE0MjcyYmJmXkEyXkFqcGc@._V1_.jpg" },
    { name: "Dune", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Dune_%282021_film%29.jpg/500px-Dune_%282021_film%29.jpg" },
    { name: "Dune: Part Two", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Dune_Part_Two_poster.jpeg/500px-Dune_Part_Two_poster.jpeg" },
    { name: "Dune: Part Three", image: "https://cdn.kinocheck.com/i/ad3cls7zcg.jpg" },
    { name: "Harry Potter and the Philosopher's Stone", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Harry_Potter_and_the_Philosopher%27s_Stone_banner.jpg/500px-Harry_Potter_and_the_Philosopher%27s_Stone_banner.jpg" },
    { name: "Harry Potter and the Chamber of Secrets", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Harry_Potter_and_the_Chamber_of_Secrets_movie.jpg/500px-Harry_Potter_and_the_Chamber_of_Secrets_movie.jpg" },
    { name: "Harry Potter and the Prisoner of Azkaban", image: "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_FMjpg_UX1000_.jpg" },
    { name: "Harry Potter and the Goblet of Fire", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Harry_Potter_and_the_Goblet_of_Fire_Poster.jpg/500px-Harry_Potter_and_the_Goblet_of_Fire_Poster.jpg" },
    { name: "Harry Potter and the Order of the Phoenix", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Harry_Potter_and_the_Order_of_the_Phoenix_poster.jpg/500px-Harry_Potter_and_the_Order_of_the_Phoenix_poster.jpg" },
    { name: "Harry Potter and the Half-Blood Prince", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Harry_Potter_and_the_Half-Blood_Prince_poster.jpg/500px-Harry_Potter_and_the_Half-Blood_Prince_poster.jpg" },
    { name: "Harry Potter and the Deathly Hallows – Part 1", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Harry_Potter_and_the_Deathly_Hallows_%E2%80%93_Part_1.jpg/500px-Harry_Potter_and_the_Deathly_Hallows_%E2%80%93_Part_1.jpg" },
    { name: "Harry Potter and the Deathly Hallows – Part 2", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Harry_Potter_and_the_Deathly_Hallows_%E2%80%93_Part_2.jpg/500px-Harry_Potter_and_the_Deathly_Hallows_%E2%80%93_Part_2.jpg" },
    { name: "Spider-Man: Brand New Day", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Spider-Man_Brand_New_Day_poster.jpg/500px-Spider-Man_Brand_New_Day_poster.jpg" },
    { name: "Spider-Man: No Way Home", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Spider-Man_No_Way_Home_poster.jpg/500px-Spider-Man_No_Way_Home_poster.jpg" },
    { name: "Spider-Man: Homecoming", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Spider-Man_Homecoming_poster.jpg/500px-Spider-Man_Homecoming_poster.jpg" },
    { name: "Spider-Man: Far From Home", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Spider-Man_Far_From_Home_poster.jpg/500px-Spider-Man_Far_From_Home_poster.jpg" },
    { name: "The Amazing Spider-Man 2", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/The_Amazing_Spider-Man_2_poster.jpg/500px-The_Amazing_Spider-Man_2_poster.jpg" },
    { name: "The Amazing Spider-Man", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/The_Amazing_Spider-Man_%28film%29_poster.jpg/500px-The_Amazing_Spider-Man_%28film%29_poster.jpg" },
    { name: "Spider-Man (2002)", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Spider-Man_%282002_film%29_poster.jpg/500px-Spider-Man_%282002_film%29_poster.jpg" },
    { name: "Spider-Man 2", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Spider-Man_2_USA_poster.jpg/500px-Spider-Man_2_USA_poster.jpg" },
    { name: "Spider-Man 3", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Spider-Man_3%2C_International_Poster.jpg/500px-Spider-Man_3%2C_International_Poster.jpg" },
    { name: "The Founder", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/The_Founder_poster.png/500px-The_Founder_poster.png" },
    { name: "The Fast and the Furious", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Fast_and_the_furious_poster.jpg/500px-Fast_and_the_furious_poster.jpg" },
    { name: "2 Fast 2 Furious", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9d/Two_fast_two_furious_ver5.jpg/500px-Two_fast_two_furious_ver5.jpg" },
    { name: "The Fast and the Furious: Tokyo Drift", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Poster_-_Fast_and_Furious_Tokyo_Drift.jpg/500px-Poster_-_Fast_and_Furious_Tokyo_Drift.jpg" },
    { name: "Fast & Furious", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Fast_and_Furious_Poster.jpg/500px-Fast_and_Furious_Poster.jpg" },
    { name: "Fast Five", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Fast_Five_poster.jpg/500px-Fast_Five_poster.jpg" },
    { name: "Fast & Furious 6", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Fast_%26_Furious_6_film_poster.jpg/500px-Fast_%26_Furious_6_film_poster.jpg" },
    { name: "Furious 7", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b8/Furious_7_poster.jpg/500px-Furious_7_poster.jpg" },
    { name: "The Fate of the Furious", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/The_Fate_of_The_Furious_Theatrical_Poster.jpg/500px-The_Fate_of_The_Furious_Theatrical_Poster.jpg" },
    { name: "F9", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/F9_film_poster.jpg/500px-F9_film_poster.jpg" },
    { name: "Fast X", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Fast_X_poster.jpg/500px-Fast_X_poster.jpg" },
    { name: "In Time", image: "https://image.tmdb.org/t/p/w500/qNVdN4nY1Byf0VfgFSzofcEGWyt.jpg" },
    { name: "Pirates of the Caribbean: The Curse of the Black Pearl", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/89/Pirates_of_the_Caribbean_-_The_Curse_of_the_Black_Pearl.png/500px-Pirates_of_the_Caribbean_-_The_Curse_of_the_Black_Pearl.png" },
    { name: "Pirates of the Caribbean: Dead Man's Chest", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Pirates_of_the_caribbean_2_poster_b.jpg/500px-Pirates_of_the_caribbean_2_poster_b.jpg" },
    { name: "Pirates of the Caribbean: At World's End", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Pirates_AWE_Poster.jpg/500px-Pirates_AWE_Poster.jpg" },
    { name: "Pirates of the Caribbean: On Stranger Tides", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Pirates_of_the_Caribbean_-_On_Stranger_Tides.png/500px-Pirates_of_the_Caribbean_-_On_Stranger_Tides.png" },
    { name: "Pirates of the Caribbean: Dead Men Tell No Tales", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Pirates_of_the_Caribbean%2C_Dead_Men_Tell_No_Tales.jpg/500px-Pirates_of_the_Caribbean%2C_Dead_Men_Tell_No_Tales.jpg" },
    { name: "Final Destination", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Final_Destination_movie.jpg/500px-Final_Destination_movie.jpg" },
    { name: "Final Destination 2", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Final_destination_two.jpg/500px-Final_destination_two.jpg" },
    { name: "Final Destination 3", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Final_Destination_3.jpg/500px-Final_Destination_3.jpg" },
    { name: "The Final Destination", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Final_destination_09.jpg/500px-Final_destination_09.jpg" },
    { name: "Final Destination 5", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/FD5_poster.jpg/500px-FD5_poster.jpg" },
    { name: "Final Destination Bloodlines", image: "https://preview.redd.it/new-poster-for-final-destination-bloodlines-v0-y8hbs87nu0ve1.jpeg?width=640&crop=smart&auto=webp&s=42bb6c6a5283c40bcf98118b5990c9f1fc423ee7" },
    { name: "Peaky Blinders: The Immortal Man", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/Peaky_Blinders_-_The_Immortal_Man_poster.jpg/500px-Peaky_Blinders_-_The_Immortal_Man_poster.jpg" },
    { name: "John Wick", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/John_Wick_TeaserPoster.jpg/500px-John_Wick_TeaserPoster.jpg" },
    { name: "John Wick: Chapter 2", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/31/John_Wick_Chapter_Two.png/500px-John_Wick_Chapter_Two.png" },
    { name: "John Wick: Chapter 3", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/John_Wick_Chapter_3_Parabellum.png/500px-John_Wick_Chapter_3_Parabellum.png" },
    { name: "John Wick: Chapter 4", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d0/John_Wick_-_Chapter_4_promotional_poster.jpg/500px-John_Wick_-_Chapter_4_promotional_poster.jpg" },
    { name: "Lucy", image: "https://m.media-amazon.com/images/I/81qlPSElf7L.jpg" },
    { name: "The Secret Life of Walter Mitty", image: "https://www.sjsreview.com/wp-content/uploads/2014/06/secret-life-of-walter-mitty-small.jpg" },
    { name: "Iron Man", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Iron_Man_%282008_film%29_poster.jpg/500px-Iron_Man_%282008_film%29_poster.jpg" },
    { name: "Iron Man 2", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Iron_Man_2_poster.jpg/500px-Iron_Man_2_poster.jpg" },
    { name: "Iron Man 3", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Iron_Man_3_poster.jpg/500px-Iron_Man_3_poster.jpg" },
    { name: "F1: The Movie", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/38/F1_%282025_film%29.png/500px-F1_%282025_film%29.png" },
    { name: "The Avengers", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/The_Avengers_%282012_film%29_poster.jpg/500px-The_Avengers_%282012_film%29_poster.jpg" },
    { name: "Avengers: Age of Ultron", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Avengers_Age_of_Ultron_poster.jpg/500px-Avengers_Age_of_Ultron_poster.jpg" },
    { name: "Avengers: Infinity War", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Avengers_Infinity_War_poster.jpg/500px-Avengers_Infinity_War_poster.jpg" },
    { name: "Avengers: Endgame", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Avengers_Endgame_poster.jpg/500px-Avengers_Endgame_poster.jpg" },
    { name: "Captain America: The First Avenger", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Captain_America_The_First_Avenger_poster.jpg/500px-Captain_America_The_First_Avenger_poster.jpg" },
    { name: "Captain America: The Winter Soldier", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Captain_America_The_Winter_Soldier_poster.jpg/500px-Captain_America_The_Winter_Soldier_poster.jpg" },
    { name: "Captain America: Civil War", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Captain_America_Civil_War_poster.jpg/500px-Captain_America_Civil_War_poster.jpg" },
    { name: "Captain America: Brave New World", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Captain_America_Brave_New_World_poster.jpg/500px-Captain_America_Brave_New_World_poster.jpg" },
    { name: "Doctor Strange", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Doctor_Strange_%282016_film%29_poster.jpg/500px-Doctor_Strange_%282016_film%29_poster.jpg" },
    { name: "Doctor Strange in the Multiverse of Madness", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg/500px-Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg" },
    { name: "X-Men Origins: Wolverine", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/X-Men_Origins_Wolverine_theatrical_poster.jpg/500px-X-Men_Origins_Wolverine_theatrical_poster.jpg" },
    { name: "The Wolverine", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/74/The_Wolverine_posterUS.jpg/500px-The_Wolverine_posterUS.jpg" },
    { name: "Logan", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Logan_2017_poster.jpg/500px-Logan_2017_poster.jpg" },
    { name: "Inception", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Inception_%282010%29_theatrical_poster.jpg/500px-Inception_%282010%29_theatrical_poster.jpg" },
    { name: "Limitless", image: "https://m.media-amazon.com/images/M/MV5BMWQ4OTQ4YzYtODlmMi00ZjA0LTg5M2QtZWUzNjA5N2NmODE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { name: "The Dark Knight", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/The_Dark_Knight_%282008_film%29.jpg/500px-The_Dark_Knight_%282008_film%29.jpg" },
    { name: "The Dark Knight Rises", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Dark_knight_rises_poster.jpg/500px-Dark_knight_rises_poster.jpg" },
    { name: "Green Book", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Green_Book_%282018_poster%29.png/500px-Green_Book_%282018_poster%29.png" },
    { name: "Zack Snyder's Justice League", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Zack_Snyder%27s_Justice_League.png/500px-Zack_Snyder%27s_Justice_League.png" },
    { name: "Man of Steel", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Man_of_Steel_%28film%29_poster.jpg/500px-Man_of_Steel_%28film%29_poster.jpg" },
    { name: "Aquaman", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Aquaman_%28film%29_poster.jpg/500px-Aquaman_%28film%29_poster.jpg" },
    { name: "The Godfather", image: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg" },
    { name: "The Godfather Part II", image: "https://m.media-amazon.com/images/M/MV5BMDIxMzBlZDktZjMxNy00ZGI4LTgxNDEtYWRlNzRjMjJmOGQ1XkEyXkFqcGc@._V1_.jpg" },
    { name: "The Godfather Part III", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/55/GodfatherIII2.jpg/500px-GodfatherIII2.jpg" },
    { name: "Top Gun: Maverick", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Top_Gun_Maverick_Poster.jpg/500px-Top_Gun_Maverick_Poster.jpg" },
    { name: "No Country for Old Men", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/No_Country_for_Old_Men_poster.jpg/500px-No_Country_for_Old_Men_poster.jpg" },
    { name: "The Truman Show", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Trumanshow.jpg/500px-Trumanshow.jpg" },
    { name: "Jurassic Park", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Jurassic_Park_poster.jpg/500px-Jurassic_Park_poster.jpg" },
    { name: "The Lost World: Jurassic Park", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg/500px-The_Lost_World_%E2%80%93_Jurassic_Park_poster.jpg" },
    { name: "Jurassic Park III", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Jurassic_Park_III_poster.jpg/500px-Jurassic_Park_III_poster.jpg" },
    { name: "Jurassic World", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Jurassic_World_poster.jpg/500px-Jurassic_World_poster.jpg" },
    { name: "Jurassic World: Fallen Kingdom", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Jurassic_World_Fallen_Kingdom.png/500px-Jurassic_World_Fallen_Kingdom.png" },
    { name: "Jurassic World Dominion", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/JurassicWorldDominion_Poster.jpeg/500px-JurassicWorldDominion_Poster.jpeg" },
    { name: "The Terminator", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/The_Terminator.png/500px-The_Terminator.png" },
    { name: "Terminator 2: Judgment Day", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Terminator_2-Judgment_Day.png/500px-Terminator_2-Judgment_Day.png" },
    { name: "Terminator 3: Rise of the Machines", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Terminator_3_Rise_of_the_Machines_movie.jpg/500px-Terminator_3_Rise_of_the_Machines_movie.jpg" },
    { name: "Terminator Salvation", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Terminator-salvation-poster.jpg/500px-Terminator-salvation-poster.jpg" },
    { name: "Terminator Genisys", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Terminator_Genisys.JPG/500px-Terminator_Genisys.JPG" },
    { name: "Terminator: Dark Fate", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Terminator_Dark_Fate_poster.jpg/500px-Terminator_Dark_Fate_poster.jpg" },
    { name: "Rocky", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Rocky_poster.jpg/500px-Rocky_poster.jpg" },
    { name: "Rocky II", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Rocky_ii_poster.jpg/500px-Rocky_ii_poster.jpg" },
    { name: "Rocky III", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Rocky_iii_poster.jpg/500px-Rocky_iii_poster.jpg" },
    { name: "Rocky IV", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Rocky_IV.jpg/500px-Rocky_IV.jpg" },
    { name: "Rocky V", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Rocky_v_poster.jpg/500px-Rocky_v_poster.jpg" },
    { name: "Rocky Balboa", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Rocky_Balboa_%282006%29_theatrical_poster.jpg/500px-Rocky_Balboa_%282006%29_theatrical_poster.jpg" },
    { name: "Creed", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Creed_poster.jpg/500px-Creed_poster.jpg" },
    { name: "Creed II", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Creed_II_poster.png/500px-Creed_II_poster.png" },
    { name: "Creed III", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Creed_III_poster.png/500px-Creed_III_poster.png" },
    { name: "Alien", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Alien_movie_poster.jpg/500px-Alien_movie_poster.jpg" },
    { name: "Aliens", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Aliens_poster.jpg/500px-Aliens_poster.jpg" },
    { name: "Alien 3", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Alien3_poster.jpg/500px-Alien3_poster.jpg" },
    { name: "Alien Resurrection", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Alien_Resurrection_poster.jpg/500px-Alien_Resurrection_poster.jpg" },
    { name: "Prometheus", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Prometheusposterfixed.jpg/500px-Prometheusposterfixed.jpg" },
    { name: "Alien: Covenant", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Alien_Covenant_Teaser_Poster.jpg/500px-Alien_Covenant_Teaser_Poster.jpg" },
    { name: "Alien: Romulus", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Alien_Romulus_2024_%28poster%29.jpg/500px-Alien_Romulus_2024_%28poster%29.jpg" },
    { name: "Star Wars: Episode I – The Phantom Menace", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Star_Wars_Phantom_Menace_poster.jpg/500px-Star_Wars_Phantom_Menace_poster.jpg" },
    { name: "Star Wars: Episode II – Attack of the Clones", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg/500px-Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg" },
    { name: "Star Wars: Episode III – Revenge of the Sith", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg/500px-Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg" },
    { name: "Star Wars: Episode IV – A New Hope", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/StarWarsMoviePoster1977.jpg/500px-StarWarsMoviePoster1977.jpg" },
    { name: "Star Wars: Episode V – The Empire Strikes Back", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg/500px-The_Empire_Strikes_Back_%281980_film%29.jpg" },
    { name: "Star Wars: Episode VI – Return of the Jedi", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/ReturnOfTheJediPoster1983.jpg/500px-ReturnOfTheJediPoster1983.jpg" },
    { name: "Star Wars: The Force Awakens", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg/500px-Star_Wars_The_Force_Awakens_Theatrical_Poster.jpg" },
    { name: "Star Wars: The Last Jedi", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Star_Wars_The_Last_Jedi.jpg/500px-Star_Wars_The_Last_Jedi.jpg" },
    { name: "Star Wars: The Rise of Skywalker", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Star_Wars_The_Rise_of_Skywalker_poster.jpg/500px-Star_Wars_The_Rise_of_Skywalker_poster.jpg" },
    { name: "Casino Royale", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Casino_Royale_%282006_film_poster%29.jpg/500px-Casino_Royale_%282006_film_poster%29.jpg" },
    { name: "Quantum of Solace", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2d/Quantum_of_Solace_-_UK_cinema_poster.jpg/500px-Quantum_of_Solace_-_UK_cinema_poster.jpg" },
    { name: "Skyfall", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Skyfall_poster.jpg/500px-Skyfall_poster.jpg" },
    { name: "Spectre", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Spectre_2015_poster.jpg/500px-Spectre_2015_poster.jpg" },
    { name: "No Time to Die", image: "https://m.media-amazon.com/images/M/MV5BZGZiOGZhZDQtZmRkNy00ZmUzLTliMGEtZGU0NjExOGMxZDVkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { name: "Raiders of the Lost Ark", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Raiders_of_the_Lost_Ark.jpg/500px-Raiders_of_the_Lost_Ark.jpg" },
    { name: "Indiana Jones and the Temple of Doom", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Indiana_Jones_and_the_Temple_of_Doom_PosterB.jpg/500px-Indiana_Jones_and_the_Temple_of_Doom_PosterB.jpg" },
    { name: "Indiana Jones and the Last Crusade", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Indiana_Jones_and_the_Last_Crusade.png/500px-Indiana_Jones_and_the_Last_Crusade.png" },
    { name: "Indiana Jones and the Kingdom of the Crystal Skull", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Kingdomofthecrystalskull.jpg/500px-Kingdomofthecrystalskull.jpg" },
    { name: "Indiana Jones and the Dial of Destiny", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Indiana_Jones_and_the_Dial_of_Destiny_theatrical_poster.jpg/500px-Indiana_Jones_and_the_Dial_of_Destiny_theatrical_poster.jpg" },
    { name: "The Mummy", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/The_mummy.jpg/500px-The_mummy.jpg" },
    { name: "The Mummy Returns", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/The_Mummy_Returns_poster.jpg/500px-The_Mummy_Returns_poster.jpg" },
    { name: "The Mummy: Tomb of the Dragon Emperor", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/The_Mummy_-_Tomb_of_the_Dragon_Emperor.jpg/500px-The_Mummy_-_Tomb_of_the_Dragon_Emperor.jpg" },
    { name: "Batman Begins", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Batman_Begins_Poster.jpg/500px-Batman_Begins_Poster.jpg" },
    { name: "Wonder Woman", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Wonder_Woman_%282017_film%29_poster.jpg/500px-Wonder_Woman_%282017_film%29_poster.jpg" },
    { name: "Wonder Woman 1984", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4f/Wonder_Woman_1984_poster.png/500px-Wonder_Woman_1984_poster.png" },
    { name: "Batman v Superman: Dawn of Justice", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/31/Batman_v_Superman_Dawn_of_Justice_poster.jpg/500px-Batman_v_Superman_Dawn_of_Justice_poster.jpg" },
    { name: "Aquaman and the Lost Kingdom", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Aquaman_and_the_Lost_Kingdom_poster.jpg/500px-Aquaman_and_the_Lost_Kingdom_poster.jpg" },
    { name: "Thor", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Thor_%28film%29_poster.jpg/500px-Thor_%28film%29_poster.jpg" },
    { name: "Thor: The Dark World", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/Thor_The_Dark_World_poster.jpg/500px-Thor_The_Dark_World_poster.jpg" },
    { name: "Thor: Ragnarok", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7d/Thor_Ragnarok_poster.jpg/500px-Thor_Ragnarok_poster.jpg" },
    { name: "Thor: Love and Thunder", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Thor_Love_and_Thunder_poster.jpeg/500px-Thor_Love_and_Thunder_poster.jpeg" },
    { name: "Ant-Man", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Ant-Man_%28film%29_poster.jpg/500px-Ant-Man_%28film%29_poster.jpg" },
    { name: "Ant-Man and the Wasp", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Ant-Man_and_the_Wasp_poster.jpg/500px-Ant-Man_and_the_Wasp_poster.jpg" },
    { name: "Ant-Man and the Wasp: Quantumania", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Ant-Man_and_the_Wasp_Quantumania_poster.jpg/500px-Ant-Man_and_the_Wasp_Quantumania_poster.jpg" },
    { name: "Captain Marvel", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Captain_Marvel_%28film%29_poster.jpg/500px-Captain_Marvel_%28film%29_poster.jpg" },
    { name: "Terrifier", image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Terrifier-final-poster.jpg/500px-Terrifier-final-poster.jpg" },
    { name: "Terrifier 2", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Terrifier_2_Poster.jpg/500px-Terrifier_2_Poster.jpg" },
    { name: "Terrifier 3", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Terrifier_3_poster.jpg/500px-Terrifier_3_poster.jpg" },
    { name: "The Conjuring", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/The_Conjuring_poster.jpg/500px-The_Conjuring_poster.jpg" },
    { name: "The Conjuring 2", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/27/The_Conjuring_2.jpg/500px-The_Conjuring_2.jpg" },
    { name: "The Conjuring: The Devil Made Me Do It", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/The_Conjuring_-_The_Devil_Made_Me_Do_It.png/500px-The_Conjuring_-_The_Devil_Made_Me_Do_It.png" },
    { name: "The Conjuring: Last Rites", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/The_Conjuring_%E2%80%93_Last_Rites.jpg/500px-The_Conjuring_%E2%80%93_Last_Rites.jpg" },
    { name: "The Texas Chain Saw Massacre", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/The_Texas_Chain_Saw_Massacre_%281974%29_theatrical_poster.jpg/500px-The_Texas_Chain_Saw_Massacre_%281974%29_theatrical_poster.jpg" },
    { name: "The Texas Chainsaw Massacre 2", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Texas_chainsaw_massacre_2_poster.jpg/500px-Texas_chainsaw_massacre_2_poster.jpg" },
    { name: "Leatherface: The Texas Chainsaw Massacre III", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/TCM3.jpg/500px-TCM3.jpg" },
    { name: "Texas Chainsaw Massacre: The Next Generation", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Texas_Chainsaw_Massacre_-_The_Next_Generation_%281995%29_poster.jpg/500px-Texas_Chainsaw_Massacre_-_The_Next_Generation_%281995%29_poster.jpg" },
    { name: "The Texas Chainsaw Massacre (2003)", image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/20/Texas_chainsaw_massacre.jpg/500px-Texas_chainsaw_massacre.jpg" },
    { name: "The Texas Chainsaw Massacre: The Beginning", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Texas_chainsaw_massacre_the_beginning.jpg/500px-Texas_chainsaw_massacre_the_beginning.jpg" },
    { name: "Texas Chainsaw 3D", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/TheTexasChainsawMassacre3DPoster.jpg/500px-TheTexasChainsawMassacre3DPoster.jpg" },
    { name: "Leatherface", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fc/Leatherface_final_one-sheet_poster.jpg/500px-Leatherface_final_one-sheet_poster.jpg" },
    { name: "Texas Chainsaw Massacre (2022)", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/NetflixTCMPoster.jpg/500px-NetflixTCMPoster.jpg" },
    { name: "Saw", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Saw_official_poster.jpg/500px-Saw_official_poster.jpg" },
    { name: "Saw II", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Saw_II_poster.jpg/500px-Saw_II_poster.jpg" },
    { name: "Saw III", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Saw3_cape10.jpg/500px-Saw3_cape10.jpg" },
    { name: "Saw IV", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Saw4final.jpg/500px-Saw4final.jpg" },
    { name: "Saw V", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ec/Saw_V_New_Poster.jpg/500px-Saw_V_New_Poster.jpg" },
    { name: "Saw VI", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Saw_VI_Poster.jpg/500px-Saw_VI_Poster.jpg" },
    { name: "Saw 3D", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f3/Saw_3D_Final.jpg/500px-Saw_3D_Final.jpg" },
    { name: "Jigsaw", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Jigsaw_2017_poster.jpg/500px-Jigsaw_2017_poster.jpg" },
    { name: "Spiral", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Spiral_Official_Poster.jpg/500px-Spiral_Official_Poster.jpg" },
    { name: "Saw X", image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Saw_X_poster.png/500px-Saw_X_poster.png" },
    { name: "Wanted", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Wanted_film_poster.jpg/500px-Wanted_film_poster.jpg" },
    { name: "The Equalizer", image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/81/The_Equalizer_poster.jpg/500px-The_Equalizer_poster.jpg" },
    { name: "The Equalizer 2", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/73/The_Equalizer_2_poster.jpg/500px-The_Equalizer_2_poster.jpg" },
    { name: "The Equalizer 3", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/The_Equalizer_3_poster.jpg/500px-The_Equalizer_3_poster.jpg" },
  ] as { name: string; image?: string }[],
  // Favorite TV series — shown in their own section.
  favSeries: [
    { name: "Breaking Bad", image: "https://image.tmdb.org/t/p/w500/piGpakRtB2J30kyAuAnuMqgMsgH.jpg" },
    { name: "WandaVision", image: "https://image.tmdb.org/t/p/w500/ijWWwINc8h71NQ8j1LTJMFSj5wr.jpg" },
    { name: "Loki", image: "https://image.tmdb.org/t/p/w500/rX1wQMTKFqF0gvZyS0DDQqgnQPB.jpg" },
    { name: "Peaky Blinders", image: "https://i.ebayimg.com/images/g/t94AAOSweNFj454I/s-l1200.jpg" },
    { name: "Prison Break", image: "https://i.ebayimg.com/00/s/MTYwMFgxMDY2/z/G0EAAOSwqsZnAU5y/$_57.JPG" },
    { name: "Narcos", image: "https://m.media-amazon.com/images/M/MV5BNzQwOTcwMzIwN15BMl5BanBnXkFtZTgwMjYxMTA0NjE@._V1_.jpg" },
    { name: "Narcos: Mexico", image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p15917262_b_v12_aa.jpg" },
    { name: "Money Heist", image: "https://image.tmdb.org/t/p/w500/4ONETpYh6QvDZODtkfLXBTXHR3s.jpg" },
    { name: "Lupin", image: "https://image.tmdb.org/t/p/w500/vlEclUk0MpCRhLMOxRpTnlAJ7sf.jpg" },
    { name: "Dexter", image: "https://image.tmdb.org/t/p/w500/q8dWfc4JwQuv3HayIZeO84jAXED.jpg" },
    { name: "Bloodhounds", image: "https://image.tmdb.org/t/p/w500/uSQzD7TXsL96J5ggDrJFdUs8uXU.jpg" },
    { name: "Black Mirror", image: "https://image.tmdb.org/t/p/w500/9GAOEqGBqjt7L2fOYhgdgzud0MF.jpg" },
    { name: "Squid Game", image: "https://image.tmdb.org/t/p/w500/9kBk09zXiXxOKp0TThIJa8SkxXZ.jpg" },
    { name: "Alice in Borderland", image: "https://image.tmdb.org/t/p/w500/70NLqnYpNoLJdCRzs7FjtcQgVbW.jpg" },
    { name: "Weak Hero", image: "https://image.tmdb.org/t/p/w500/hbjWwUTUQ7eaUxApPs9FHIRuThc.jpg" },
    { name: "My Name", image: "https://image.tmdb.org/t/p/w500/pnL2rZZHD3Npnaz7qmtv5JS9bq9.jpg" },
    { name: "The Glory", image: "https://image.tmdb.org/t/p/w500/qWMxHBEuE81zqptA0RkHH1CDCtj.jpg" },
    { name: "The Art of Sarah", image: "https://image.tmdb.org/t/p/w500/8hZqZB4DAC1Ebzbk80zc0H80SNa.jpg" },
    { name: "Game of Thrones", image: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg" },
    { name: "Dune: Prophecy", image: "https://image.tmdb.org/t/p/w500/hnjOpLhSnXs1mEIRvlZyr3bkFRW.jpg" },
    { name: "Formula 1: Drive to Survive", image: "https://image.tmdb.org/t/p/w500/xGOGjJFYYeRSoOpnhN9IHZTXIxj.jpg" },
    { name: "The Queen's Gambit", image: "https://image.tmdb.org/t/p/w500/ekhcKufLTI7X2YqH60U1AUkmni4.jpg" },
    { name: "The Witcher", image: "https://image.tmdb.org/t/p/w500/4OoIDkjamtMIXZhSXFjpii1PQlV.jpg" },
    { name: "Dark", image: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg" },
    { name: "Big Mouth", image: "https://image.tmdb.org/t/p/w500/gJDvYUJcPEDJzB3SnQokifPUtRF.jpg" },
    { name: "The Walking Dead", image: "https://image.tmdb.org/t/p/w500/aN29llVoCFtBTwDZFtqdD9d8dHb.jpg" },
    { name: "Shōgun", image: "https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg" },
    { name: "Reacher", image: "https://image.tmdb.org/t/p/w500/bch4kJ0O4RKR1eOvF5c61rDNjUY.jpg" },
    { name: "Stranger Things", image: "https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg" },
    { name: "The Boys", image: "https://m.media-amazon.com/images/M/MV5BZjU4OWNiYzQtMzc1NS00NjZlLTgyYTctZWY4ZmEzMTkxYjA4XkEyXkFqcGc@._V1_.jpg" },
    { name: "Gen V", image: "https://image.tmdb.org/t/p/w500/gKpVbSkGGMNx2gO3aJQaS4vQo9A.jpg" },
    { name: "Kingdom", image: "https://m.media-amazon.com/images/M/MV5BYWQyMDQyYzItYWFhNi00YmViLTkwZTctY2M2NjEyNDJmNGQ5XkEyXkFqcGc@._V1_.jpg" },
    { name: "Better Call Saul", image: "https://image.tmdb.org/t/p/w500/zjg4jpK1Wp2kiRvtt5ND0kznako.jpg" },
    { name: "Vincenzo", image: "https://image.tmdb.org/t/p/w500/pa93VmA5idYYdWDzzZWejAbTmXX.jpg" },
    { name: "All of Us Are Dead", image: "https://image.tmdb.org/t/p/w500/fErl41SRdm08ZDTX4EJorAsXVYB.jpg" },
    { name: "Sweet Home", image: "https://image.tmdb.org/t/p/w500/vW2tOVseUlMbK8mFzx6kR6yyEDh.jpg" },
    { name: "Hellbound", image: "https://image.tmdb.org/t/p/w500/bqiu0meQi71RjjCkFzPEd15SSzl.jpg" },
    { name: "Vikings", image: "https://image.tmdb.org/t/p/w500/bQLrHIRNEkE3PdIWQrZHynQZazu.jpg" },
    { name: "The Last of Us", image: "https://image.tmdb.org/t/p/w500/1XxpJ09agmvSeyJUyiuhJwetwWf.jpg" },
    { name: "Undercover High School", image: "https://image.tmdb.org/t/p/w500/8wbO5xxThlhPn6fz0L2sAP77tq1.jpg" },
    { name: "Teach You a Lesson", image: "https://image.tmdb.org/t/p/w500/fMECSPrTmRClSViMsXFYmiYIcWP.jpg" },
    { name: "Descendants of the Sun", image: "https://image.tmdb.org/t/p/w500/xxGomfml0x9iyPBS4StBjbRRu65.jpg" },
  ] as { name: string; image?: string }[],
  favBooks: [
    { name: "Sapiens: A Brief History of Humankind", image: "https://covers.openlibrary.org/b/id/8634250-M.jpg" },
    { name: "The Origin of Species", image: "https://covers.openlibrary.org/b/id/7153600-L.jpg" },
    { name: "The Brothers Karamazov", image: "https://covers.openlibrary.org/b/id/14889143-L.jpg" },
    { name: "The Great Gatsby", image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1650033243i/41733839.jpg" },
    { name: "Moby-Dick", image: "https://covers.openlibrary.org/b/id/10544254-M.jpg" },
    { name: "Half of a Yellow Sun", image: "https://covers.openlibrary.org/b/id/8472660-M.jpg" },
    { name: "The Alchemist", image: "https://covers.openlibrary.org/b/id/11556106-M.jpg" },
    { name: "Pride and Prejudice", image: "https://m.media-amazon.com/images/I/712P0p5cXIL._AC_UF400,400_QL80_.jpg" },
    { name: "Things Fall Apart", image: "https://cdn.kobo.com/book-images/d4c01680-2500-4a25-a3e7-86aab01e567d/353/569/90/False/things-fall-apart-11.jpg" },
    { name: "1984", image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1327144697i/3744438.jpg" },
    { name: "To Kill a Mockingbird", image: "https://covers.openlibrary.org/b/id/14351077-M.jpg" },
    { name: "Romance of the Three Kingdoms", image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1519909801i/158770.jpg" },
    { name: "Arsène Lupin, gentleman-cambrioleur", image: "https://warblerpress.com/wp-content/uploads/2023/06/LeBlanc-cover-half-scaled.jpg" },
    { name: "Arsène Lupin contre Herlock Sholmès", image: "https://m.media-amazon.com/images/I/71hrgnS9G2L._AC_UF400,400_QL80_.jpg" },
    { name: "L'Aiguille creuse", image: "https://m.media-amazon.com/images/I/91j7kIdUrLL.jpg" },
    { name: "Arsène Lupin (1909)", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Cover-Arsene_Lupin_%28Doubleday%2C_1909%29.jpg/500px-Cover-Arsene_Lupin_%28Doubleday%2C_1909%29.jpg" },
    { name: "813", image: "https://m.media-amazon.com/images/I/715SS-JjXCL._AC_UF400,400_QL80_.jpg" },
    { name: "Le Bouchon de cristal", image: "https://covers.openlibrary.org/b/id/3081677-M.jpg" },
    { name: "Les Confidences d'Arsène Lupin", image: "https://m.media-amazon.com/images/I/71xjScJxoSL._AC_UF400,400_QL80_.jpg" },
    { name: "Les Dents du tigre", image: "https://covers.openlibrary.org/b/id/976592-M.jpg" },
    { name: "Le Triangle d'or", image: "https://m.media-amazon.com/images/I/815iVvP4A4L._AC_UF400,400_QL80_.jpg" },
    { name: "L'Île aux trente cercueils", image: "https://m.media-amazon.com/images/I/719OIeijDcL._AC_UF400,400_QL80_.jpg" },
    { name: "Les Huit Coups de l'horloge", image: "https://m.media-amazon.com/images/I/61HdtI6PCBL._AC_UF400,400_QL80_.jpg" },
    { name: "La Comtesse de Cagliostro", image: "https://m.media-amazon.com/images/I/81YZHwpEPpL.jpg" },
    { name: "L'Homme à la peau de bique", image: "https://m.media-amazon.com/images/I/81H6PKaUUhL._UF400,400_QL80_.jpg" },
    { name: "La Demoiselle aux yeux verts", image: "https://m.media-amazon.com/images/I/81xz0h80i9L.jpg" },
    { name: "L'Agence Barnett et Cie", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgptnrg5DVDKl-sGnFUxte_a7s1m-xpZyRXJOFh904YqyZpO4FHZSxH1c&s=10" },
    { name: "La Demeure mystérieuse", image: "https://m.media-amazon.com/images/I/81TDShYG05L._UF400,400_QL80_.jpg" },
    { name: "La Barre-y-va", image: "https://covers.openlibrary.org/b/id/14872634-M.jpg" },
    { name: "La Femme aux deux sourires", image: "https://m.media-amazon.com/images/I/51Md84BJu5L._AC_UF400,400_QL80_.jpg" },
    { name: "Victor, de la brigade mondaine", image: "https://media.hachette.fr/fit-in/500x500/imgArticle/LGFLIVREDEPOCHE/2007/9782253003892-T.jpg?source=web&v=b63248fdd0ae797debe0c1aa07dc4631" },
    { name: "Les Milliards d'Arsène Lupin", image: "https://pictures.abebooks.com/inventory/30981093339.jpg" },
    { name: "Le Dernier Amour d'Arsène Lupin", image: "https://covers.openlibrary.org/b/id/10441023-M.jpg" },
    { name: "The Republic", image: "https://cdn.kobo.com/book-images/c45c48f6-d943-4016-9af6-81e3fcc3d99b/1200/1200/False/the-republic-64.jpg" },
    { name: "Nicomachean Ethics", image: "https://m.media-amazon.com/images/I/61eDW9S7bQL._AC_UF350,350_QL50_.jpg" },
    { name: "Discourses", image: "https://m.media-amazon.com/images/I/81K9F20ol0L._AC_UF400,400_QL80_.jpg" },
    { name: "Letters from a Stoic", image: "https://covers.openlibrary.org/b/id/103759-M.jpg" },
    { name: "Tao Te Ching", image: "https://m.media-amazon.com/images/I/71fvMahxHFL._AC_UF400,400_QL80_.jpg" },
    { name: "The Analects", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBn1DOvQ3vsuojltYUa_M4AZVa3KJSz0v1n-AGNQHeO5FLPYFB03Rz9GF9&s=10" },
    { name: "I Ching", image: "https://m.media-amazon.com/images/I/81RS+Stc8qL._AC_UF400,400_QL80_.jpg" },
    { name: "The Art of War", image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1630683326i/10534.jpg" },
    { name: "Journey to the West", image: "https://thailand.kinokuniya.com/products/9780226971322/image_isbn" },
    { name: "Water Margin", image: "https://bci.kinokuniya.com/jsp/images/book-img/97808/97808048/9780804840958.JPG" },
    { name: "Dream of the Red Chamber", image: "https://covers.openlibrary.org/b/id/6655966-M.jpg" },
    { name: "The Book of Five Rings", image: "https://covers.openlibrary.org/b/id/6621293-M.jpg" },
    { name: "Hagakure", image: "https://m.media-amazon.com/images/I/71CtaBhZXyL._AC_UF400,400_QL80_.jpg" },
    { name: "Bhagavad Gita", image: "https://m.media-amazon.com/images/I/810NcWuwmSL._AC_UF400,400_QL80_.jpg" },
    { name: "The Iliad", image: "https://covers.openlibrary.org/b/id/7083790-M.jpg" },
    { name: "The Odyssey", image: "https://covers.openlibrary.org/b/id/9045853-M.jpg" },
    { name: "Don Quixote", image: "https://covers.openlibrary.org/b/id/14428305-M.jpg" },
    { name: "The Road to Serfdom", image: "https://m.media-amazon.com/images/I/61QemkTttrL._AC_UF400,400_QL80_.jpg" },
    { name: "Capitalism and Freedom", image: "https://covers.openlibrary.org/b/id/140808-M.jpg" },
    { name: "The Lessons of History", image: "https://covers.openlibrary.org/b/id/7240225-M.jpg" },
    { name: "Guns, Germs, and Steel", image: "https://m.media-amazon.com/images/I/91F+DgxWBpL._UF400,400_QL80_.jpg" },
    { name: "SPQR", image: "https://covers.openlibrary.org/b/id/7390155-M.jpg" },
    { name: "Rubicon", image: "https://covers.openlibrary.org/b/id/2380298-M.jpg" },
    { name: "Postwar", image: "https://covers.openlibrary.org/b/id/111385-M.jpg" },
    { name: "The Silk Roads", image: "https://covers.openlibrary.org/b/id/8963642-M.jpg" },
    { name: "Homo Deus", image: "https://covers.openlibrary.org/b/id/7914168-M.jpg" },
    { name: "Factfulness", image: "https://covers.openlibrary.org/b/id/8186237-M.jpg" },
    { name: "Cosmos", image: "https://covers.openlibrary.org/b/id/8283901-M.jpg" },
    { name: "A Short History of Nearly Everything", image: "https://covers.openlibrary.org/b/id/12725620-M.jpg" },
    { name: "The Selfish Gene", image: "https://covers.openlibrary.org/b/id/133936-M.jpg" },
    { name: "The Gene", image: "https://covers.openlibrary.org/b/id/11320163-M.jpg" },
    { name: "Gödel, Escher, Bach", image: "https://covers.openlibrary.org/b/id/14368453-M.jpg" },
    { name: "The Structure of Scientific Revolutions", image: "https://covers.openlibrary.org/b/id/6566386-M.jpg" },
    { name: "The Beginning of Infinity", image: "https://covers.openlibrary.org/b/id/8622269-M.jpg" },
    { name: "Thinking, Fast and Slow", image: "https://covers.openlibrary.org/b/id/13290711-M.jpg" },
    { name: "Superforecasting", image: "https://covers.openlibrary.org/b/id/9142114-M.jpg" },
    { name: "Seeking Wisdom", image: "https://covers.openlibrary.org/b/id/9671797-M.jpg" },
    { name: "Antifragile", image: "https://covers.openlibrary.org/b/id/9180157-M.jpg" },
    { name: "The Black Swan", image: "https://covers.openlibrary.org/b/id/5721840-M.jpg" },
    { name: "Fooled by Randomness", image: "https://covers.openlibrary.org/b/id/855791-M.jpg" },
    { name: "The Scout Mindset", image: "https://covers.openlibrary.org/b/id/10690900-M.jpg" },
    { name: "Behave", image: "https://covers.openlibrary.org/b/id/8814831-M.jpg" },
    { name: "The Righteous Mind", image: "https://covers.openlibrary.org/b/id/7256782-M.jpg" },
    { name: "Mistakes Were Made (But Not by Me)", image: "https://covers.openlibrary.org/b/id/1119860-M.jpg" },
    { name: "The Elephant in the Brain", image: "https://m.media-amazon.com/images/I/61kAVabsLYL._AC_UF400,400_QL80_.jpg" },
    { name: "The Lucifer Effect", image: "https://covers.openlibrary.org/b/id/1538373-M.jpg" },
    { name: "The Blank Slate", image: "https://covers.openlibrary.org/b/id/100207-M.jpg" },
    { name: "Ordinary Men", image: "https://covers.openlibrary.org/b/id/14829665-M.jpg" },
    { name: "The Moral Animal", image: "https://covers.openlibrary.org/b/id/421271-M.jpg" },
    { name: "Civilization and Its Discontents", image: "https://covers.openlibrary.org/b/id/6458773-M.jpg" },
    { name: "Man's Search for Meaning", image: "https://covers.openlibrary.org/b/id/8516506-M.jpg" },
    { name: "The Myth of Sisyphus", image: "https://covers.openlibrary.org/b/id/12726570-M.jpg" },
    { name: "Beyond Good and Evil", image: "https://m.media-amazon.com/images/I/61e4sD41Z4L._AC_UF894,1000_QL80_.jpg" },
    { name: "Thus Spoke Zarathustra", image: "https://covers.openlibrary.org/b/id/1017466-M.jpg" },
    { name: "Fear and Trembling", image: "https://covers.openlibrary.org/b/id/104000-M.jpg" },
    { name: "The World as Will and Representation", image: "https://assets.cambridge.org/97811074/14778/large_cover/9781107414778i.jpg" },
    { name: "Critique of Pure Reason", image: "https://covers.openlibrary.org/b/id/1994279-M.jpg" },
    { name: "Crime and Punishment", image: "https://covers.openlibrary.org/b/id/9411873-M.jpg" },
    { name: "Notes from Underground", image: "https://covers.openlibrary.org/b/id/10445973-M.jpg" },
    { name: "The Idiot", image: "https://m.media-amazon.com/images/I/41itlopIAqL._AC_UF400,400_QL80_.jpg" },
    { name: "War and Peace", image: "https://covers.openlibrary.org/b/id/12621906-M.jpg" },
    { name: "The Count of Monte Cristo", image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1724863997i/7126.jpg" },
    { name: "Les Misérables", image: "https://m.media-amazon.com/images/I/81e1NPAQJmL._AC_UF400,400_QL80_.jpg" },
    { name: "East of Eden", image: "https://covers.openlibrary.org/b/id/11386937-M.jpg" },
    { name: "One Hundred Years of Solitude", image: "https://covers.openlibrary.org/b/id/12627383-M.jpg" },
    { name: "The Stranger", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7D0fasDlDjNoTajD5TCrnZ_AjemlDjvw2IFY8pqsLeyfonsZf2-V2taC2&s=10" },
    { name: "No Longer Human", image: "https://m.media-amazon.com/images/I/61vBJ41AO5L.jpg" },
    { name: "Blood Meridian", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Blood_Meridian_Cormac_McCarthy_book_cover.png/500px-Blood_Meridian_Cormac_McCarthy_book_cover.png" },
    { name: "In Search of Lost Time", image: "https://covers.openlibrary.org/b/id/12332709-M.jpg" },
  ] as { name: string; image?: string }[],
  favAnime: [
    { name: "Attack on Titan", image: "https://image.tmdb.org/t/p/w500/xf9MK6DaCaY5iIxoWqc635Vw4EB.jpg" },
    { name: "Vinland Saga", image: "https://image.tmdb.org/t/p/w500/vUHlpA5c1NXkds59reY3HMb4Abs.jpg" },
    { name: "Cyberpunk: Edgerunners", image: "https://image.tmdb.org/t/p/w500/bWA4fRYBXv6QtjU71UOgE9ADyZf.jpg" },
    { name: "Pokémon: The First Movie", image: "https://image.tmdb.org/t/p/w500/6YPzBcMH0aPNTvdXNCDLY0zdE1g.jpg" },
    { name: "Pokémon the Movie 2000", image: "https://image.tmdb.org/t/p/w500/6u65C8aG4krAVyHsTjAMF7ucTDH.jpg" },
    { name: "Pokémon: Lucario and the Mystery of Mew", image: "https://image.tmdb.org/t/p/w500/3A3WiPXPmWVhXC7bGSiqtsYY9z6.jpg" },
    { name: "Pokémon: The Rise of Darkrai", image: "https://image.tmdb.org/t/p/w500/yElGG6lxLtQXcgBVzF7Xxq7YRa2.jpg" },
    { name: "Pokémon: Arceus and the Jewel of Life", image: "https://image.tmdb.org/t/p/w500/tpqguVMKyPbINe0GYmMwduoaUar.jpg" },
    { name: "Katekyo Hitman Reborn!", image: "https://image.tmdb.org/t/p/w500/ewYjHmmyxIaM3heRO0eZaOA6xo2.jpg" },
    { name: "Gintama", image: "https://image.tmdb.org/t/p/w500/f7vK8pzZIqhyA8sYmBpWmp9Ae7.jpg" },
    { name: "Hunter × Hunter", image: "https://image.tmdb.org/t/p/w500/eobAuhCJA8oRp814V67WhezVXtQ.jpg" },
    { name: "Bleach", image: "https://image.tmdb.org/t/p/w500/5iVUUnE2tgBPypACYNobCKHagfV.jpg" },
    { name: "Shokugeki no Souma", image: "https://image.tmdb.org/t/p/w500/eAQHqcJXP0FBzXvQkIV5g5ZueZb.jpg" },
    { name: "Initial D", image: "https://image.tmdb.org/t/p/w500/2TRN7AXN4rRJNIf1TLgIGRVlQZB.jpg" },
    { name: "Great Teacher Onizuka (GTO)", image: "https://image.tmdb.org/t/p/w500/cgcvNzLUQUjkur8zfhHwcadwzVz.jpg" },
    { name: "Dr. Stone", image: "https://image.tmdb.org/t/p/w500/xbZQ3fDl0y5mt0ARwfeyrgQ4JTw.jpg" },
    { name: "The Last: Naruto the Movie", image: "https://image.tmdb.org/t/p/w500/bAQ8O5Uw6FedtlCbJTutenzPVKd.jpg" },
    { name: "Road to Ninja: Naruto the Movie", image: "https://image.tmdb.org/t/p/w500/xLal6fXNtiJN6Zw6qk21xAtdOeN.jpg" },
    { name: "Boruto: Naruto the Movie", image: "https://image.tmdb.org/t/p/w500/1k6iwC4KaPvTBt1JuaqXy3noZRY.jpg" },
    { name: "Lupin III", image: "https://image.tmdb.org/t/p/w500/bavzsyxPRaR8zOXQiF1aRVNuw5k.jpg" },
    { name: "Lupin III: The Castle of Cagliostro", image: "https://image.tmdb.org/t/p/w500/p7xL3WYeclgtGCLrWfBrXKdBV7d.jpg" },
    { name: "Magic Kaito 1412", image: "https://image.tmdb.org/t/p/w500/yFAqxNPOK5JkWKLSSB65gK59W8Q.jpg" },
    { name: "Detective Conan", image: "https://image.tmdb.org/t/p/w500/rRIEFvHRy01OYzmXQBbGeW0Qilc.jpg" },
    { name: "Detective Conan: The Phantom of Baker Street", image: "https://image.tmdb.org/t/p/w500/AbgADjLIYoLAc3mayVWGBWSbjT.jpg" },
    { name: "Detective Conan: Countdown to Heaven", image: "https://image.tmdb.org/t/p/w500/1giFCODG6Bnik84NsyjHwvuX9Da.jpg" },
    { name: "Detective Conan: The Raven Chaser", image: "https://image.tmdb.org/t/p/w500/1rqrypnOq4cuwzobGW9gQgarkSr.jpg" },
    { name: "Lupin III vs. Detective Conan: The Movie", image: "https://image.tmdb.org/t/p/w500/hyLW346kEV7E8GgibUGeG7pNSFO.jpg" },
    { name: "Attack on Titan: The Last Attack", image: "https://image.tmdb.org/t/p/w500/3FS3CW5cKNakgUc0eKgHgGjZx0K.jpg" },
    { name: "Death Note", image: "https://image.tmdb.org/t/p/w500/tCZFfYTIwrR7n94J6G14Y4hAFU6.jpg" },
    { name: "Jujutsu Kaisen", image: "https://image.tmdb.org/t/p/w500/mYaVAk9fD44mgvB0ABxBiPe1VNo.jpg" },
    { name: "Jujutsu Kaisen 0", image: "https://image.tmdb.org/t/p/w500/kE1LYG3RrEeg83TzOH3AnT8n487.jpg" },
    { name: "Demon Slayer", image: "https://www.panicposters.com/cdn/shop/files/GBYDCO292-Demon-slayer-poster.jpg" },
    { name: "Demon Slayer: Mugen Train", image: "https://image.tmdb.org/t/p/w500/kaGzdYdSOSUdd0QE57xeVsxRXPG.jpg" },
    { name: "Demon Slayer: Infinity Castle", image: "https://image.tmdb.org/t/p/w500/fWVSwgjpT2D78VUh6X8UBd2rorW.jpg" },
    { name: "One Punch Man", image: "https://image.tmdb.org/t/p/w500/w3tV5IVOAAd3XZb7BcBleW2fSgd.jpg" },
    { name: "One Piece", image: "https://i.redd.it/lucius-vs-one-piece-verse-v0-makfkjnau7pg1.jpg?width=1000&format=pjpg&auto=webp&s=28beaf772c381a1bc43ca6580fd4fd484769144f" },
    { name: "One Piece Film: Red", image: "https://image.tmdb.org/t/p/w500/eqxQcZuxA3PYLQGSoUtsTpNmrSp.jpg" },
    { name: "One Piece: Stampede", image: "https://image.tmdb.org/t/p/w500/4E2lyUGLEr3yH4q6kJxPkQUhX7n.jpg" },
    { name: "One Piece Film: Gold", image: "https://image.tmdb.org/t/p/w500/9PgiOFTLZXP7emlwcIt0yRasJ9h.jpg" },
    { name: "One Piece Film: Z", image: "https://image.tmdb.org/t/p/w500/dd0HwfxstffjRgbBcQvtw3uqS6O.jpg" },
    { name: "One Piece: Strong World", image: "https://image.tmdb.org/t/p/w500/z9S39hH4IOX9Hmtn3zho3Wdqem8.jpg" },
    { name: "My Hero Academia", image: "https://image.tmdb.org/t/p/w500/6qsTWSSB0S7wjYboiCc1nEVpG0m.jpg" },
    { name: "My Hero Academia: Two Heroes", image: "https://image.tmdb.org/t/p/w500/tFlwA0Hz3ukmXLWJpcTW0ulkVg2.jpg" },
    { name: "My Hero Academia: Heroes Rising", image: "https://image.tmdb.org/t/p/w500/jLoY2I0hxAZMOt0kCBPXTDyAS93.jpg" },
    { name: "My Hero Academia: World Heroes' Mission", image: "https://image.tmdb.org/t/p/w500/zISTJKDN5fT1tnV31CoxKUXpBgq.jpg" },
    { name: "My Hero Academia: You're Next", image: "https://image.tmdb.org/t/p/w500/tTrI6PwqzxkgO3dvQ7BEKXM7SYR.jpg" },
    { name: "Tokyo Ghoul", image: "https://image.tmdb.org/t/p/w500/1m4RlC9BTCbyY549TOdVQ5NRPcR.jpg" },
    { name: "Solo Leveling", image: "https://image.tmdb.org/t/p/w500/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg" },
    { name: "Blue Lock", image: "https://image.tmdb.org/t/p/w500/fcKH1NQzoTXiYO1OrhaFFwTKhBp.jpg" },
    { name: "Naruto", image: "https://image.tmdb.org/t/p/w500/1GVfX7kqIbQBp38Riiy1QLQkhJQ.jpg" },
    { name: "Naruto Shippuden", image: "https://image.tmdb.org/t/p/w500/kV27j3Nz4d5z8u6mN3EJw9RiLg2.jpg" },
    { name: "Boruto: Naruto Next Generations", image: "https://image.tmdb.org/t/p/w500/e0B6i48kxdRkMcK4tR4YNfXGWOc.jpg" },
    { name: "Dragon Ball Z", image: "https://m.media-amazon.com/images/M/MV5BNmFiM2FkYTYtY2FiOS00ZWJkLTkyOTgtNmFmODI4NjcwNDgzXkEyXkFqcGc@._V1_.jpg" },
    { name: "Dragon Ball Super: Broly", image: "https://image.tmdb.org/t/p/w500/hMzSrJX356r5mvoiTRt8sFa3tb.jpg" },
    { name: "Dragon Ball Super: Super Hero", image: "https://image.tmdb.org/t/p/w500/j6gZYYZsxJsh7mXtUDWtoq9wtyc.jpg" },
    { name: "Sword Art Online", image: "https://image.tmdb.org/t/p/w500/9m8bFIXPg26taNrFSXGwEORVACD.jpg" },
    { name: "JoJo's Bizarre Adventure", image: "https://image.tmdb.org/t/p/w500/ogAWwbh3frWtiTyyXrZaVFtqCgp.jpg" },
    { name: "Black Clover", image: "https://image.tmdb.org/t/p/w500/kaMisKeOoTBPxPkbC3OW7Wgt6ON.jpg" },
    { name: "Black Clover: Sword of the Wizard King", image: "https://image.tmdb.org/t/p/w500/888EDYi6OSqYndDACdiZ9ZWKFVD.jpg" },
    { name: "Wind Breaker", image: "https://image.tmdb.org/t/p/w500/qIz7VwbeTei1ReLBf0xKDWKLPpe.jpg" },
    { name: "Baki", image: "https://image.tmdb.org/t/p/w500/z72ubWebHmMrqpi5cHSzRJqp6H7.jpg" },
    { name: "Kuroko no Basket", image: "https://image.tmdb.org/t/p/w500/qi8dlAgQEeahpEn1AOb5BJEOcVB.jpg" },
    { name: "Kuroko no Basket: Last Game", image: "https://image.tmdb.org/t/p/w500/mXJQbwxA0joNv9rGy25rFrm5N1r.jpg" },
    { name: "Slam Dunk", image: "https://image.tmdb.org/t/p/w500/nmmOKeydeeO4TKucpvyMA2o6gdD.jpg" },
    { name: "The First Slam Dunk", image: "https://image.tmdb.org/t/p/w500/5EZFLjpPWQGpXqwxNMRj6viE9UM.jpg" },
    { name: "Nippon Sangoku", image: "https://image.tmdb.org/t/p/w500/mkbUtQU8wUh4PPkZnesBd170763.jpg" },
  ] as { name: string; image?: string }[],
  favManga: [
    { name: "One Piece", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg/500px-One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg" },
    { name: "Jujutsu Kaisen", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/46/Jujutsu_kaisen.jpg/500px-Jujutsu_kaisen.jpg" },
    { name: "Demon Slayer", image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Demon_Slayer_-_Kimetsu_no_Yaiba%2C_volume_1.jpg/500px-Demon_Slayer_-_Kimetsu_no_Yaiba%2C_volume_1.jpg" },
    { name: "Naruto", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/NarutoCoverTankobon1.jpg/500px-NarutoCoverTankobon1.jpg" },
    { name: "My Hero Academia", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Boku_no_Hero_Academia_Volume_1.png/500px-Boku_no_Hero_Academia_Volume_1.png" },
    { name: "Attack on Titan", image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d6/Shingeki_no_Kyojin_manga_volume_1.jpg/500px-Shingeki_no_Kyojin_manga_volume_1.jpg" },
    { name: "Death Note", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Death_Note_Vol_1.jpg/500px-Death_Note_Vol_1.jpg" },
    { name: "One Punch Man", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/OnePunchMan_manga_cover.png/500px-OnePunchMan_manga_cover.png" },
    { name: "Tokyo Ghoul", image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Tokyo_Ghoul_volume_1_cover.jpg/500px-Tokyo_Ghoul_volume_1_cover.jpg" },
    { name: "Black Clover", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/Black_Clover%2C_volume_1.jpg/500px-Black_Clover%2C_volume_1.jpg" },
    { name: "Blue Lock", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Blue_Lock_manga_volume_1.png/500px-Blue_Lock_manga_volume_1.png" },
    { name: "Solo Leveling", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Solo_Leveling_Volume_1_Cover.jpg/500px-Solo_Leveling_Volume_1_Cover.jpg" },
    { name: "JoJo's Bizarre Adventure", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/JoJo_no_Kimyou_na_Bouken_cover_-_vol1.jpg/500px-JoJo_no_Kimyou_na_Bouken_cover_-_vol1.jpg" },
    { name: "Dragon Ball", image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/DB_Tank%C5%8Dbon.png/500px-DB_Tank%C5%8Dbon.png" },
    { name: "Slam Dunk", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Slam_Dunk_%28manga%29_1.png/500px-Slam_Dunk_%28manga%29_1.png" },
    { name: "Kuroko no Basket", image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Kuroko_no_Basuke_Cover.jpg/500px-Kuroko_no_Basuke_Cover.jpg" },
    { name: "Wind Breaker", image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Wind_Breaker_1.png/500px-Wind_Breaker_1.png" },
    { name: "Wind Breaker (Manhwa)", image: "https://uploads.mangadex.org/covers/c1c408f6-3dec-4d62-b6b3-b57e615d933c/8b279428-fa32-49b2-bd51-4f8d4db7d420.jpg" },
    { name: "Baki", image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Baki_the_Grappler_vol._1.png/500px-Baki_the_Grappler_vol._1.png" },
    { name: "The End Has Come", image: "https://uploads.mangadex.org/covers/f33a4ea9-8afa-464c-9c36-b836d724d6e6/111e8075-a8cc-4f00-8121-c9f3097bac4f.jpg" },
    { name: "Lookism", image: "https://uploads.mangadex.org/covers/596191eb-69ee-4401-983e-cc07e277fa17/6df15145-f15b-43f0-b87b-22fd3694eaca.jpg" },
    { name: "Killer Peter", image: "https://uploads.mangadex.org/covers/a3db9212-7e87-44ea-8264-23f914671444/fde4fbe2-0a2f-47ad-b389-0d2af2ace201.jpg" },
    { name: "Bad Guy", image: "https://uploads.mangadex.org/covers/c016374f-4670-4d80-9299-46cea9a567ae/66169461-26ca-47d8-ba27-93fdf51abc4e.png" },
    { name: "Weak Hero", image: "https://uploads.mangadex.org/covers/94a87fd5-250d-4058-9d33-88b6885ebfc2/9bdfad9a-53b7-46a7-9d8d-4b68aa9a212f.jpg" },
    { name: "Sakamoto Days", image: "https://uploads.mangadex.org/covers/9d9b04ad-9a83-49f4-8ae4-a9a3780fe9c0/da432656-08d7-434d-89ca-0d90c9d573d9.jpg" },
    { name: "Viral Hit", image: "https://uploads.mangadex.org/covers/d2df017b-c003-4de6-9625-4f1fba7aef97/4602ab68-0eb7-42a3-bfba-5d90ec19ca40.jpg" },
    { name: "Chainsaw Man", image: "https://uploads.mangadex.org/covers/a77742b1-befd-49a4-bff5-1ad4e6b0ef7b/6e518bd1-5f60-446b-8832-bfe6bf74834b.jpg" },
    { name: "Tower of God", image: "https://uploads.mangadex.org/covers/c0ee660b-f9f2-45c3-8068-5123ff53f84a/311cf373-290a-47f6-a3f1-5d7c4085c5b2.jpg" },
    { name: "Study Group", image: "https://uploads.mangadex.org/covers/24c8e2f3-f515-4e58-bfdd-c423ab00499a/133f7d99-a535-43a3-b125-1783166766e6.jpg" },
    { name: "Omniscient Reader's Viewpoint", image: "https://uploads.mangadex.org/covers/9a414441-bbad-43f1-a3a7-dc262ca790a3/be18dc9a-7f1c-4ca5-b318-ffff2d7d58c3.jpg" },
  ] as { name: string; image?: string }[],
  // Artists — each with their top 10 songs.
  favArtists: [
    { name: "Drake", image: "https://pbs.twimg.com/media/HIcfr1WXMAI3VH9.jpg", songs: ["Teenage Fever", "Passionfruit", "Rich Baby Daddy", "Die Trying", "Make Them Pay", "Hold On We're Going Home", "CN Tower", "Tried Our Best", "Greedy", "Fortworth"] },
    { name: "PARTYNEXTDOOR", image: "https://i.scdn.co/image/ab6761610000e5eb957320981e31e862bc2fb844", songs: ["TBH", "Break from Toronto", "Make It To The Morning", "Belong to the City", "Some of Your Love", "Grown Women", "FWU", "Resentment", "Her Way", "Come and See Me"] },
    { name: "The Weeknd", image: "https://upload.wikimedia.org/wikipedia/th/thumb/c/c1/The_Weeknd_-_After_Hours.png/500px-The_Weeknd_-_After_Hours.png", songs: ["After Hours", "Reminder", "Out Of Time", "Save Your Tears", "Popular", "Blinding Lights", "Creepin'", "Earned It", "The Party & The After Party", "In Your Eyes"] },
    { name: "Future", image: "https://static.wikia.nocookie.net/rappers/images/b/b6/Fn.webp", songs: ["WAIT FOR U", "Comin Out Strong", "All To Myself", "Like That", "Solo", "Life Is Good", "Mask Off", "Low Life", "Everyday Hustle", "We Still Don't Trust You"] },
    { name: "21 Savage", image: "https://m.media-amazon.com/images/M/MV5BMzcyOTM2NDA5OF5BMl5BanBnXkFtZTgwMTYzMTQzNzM@._V1_.jpg", songs: ["A Lot", "Redrum", "Prove It", "Runnin", "Glock in My Lap", "Rich Flex", "Atlanta Tears", "Dark Days", "Ball w/o You", "All of Me"] },
    { name: "Bruno Mars", image: "https://storage.googleapis.com/pr-newsroom-wp/1/2025/01/Bruno_Backyard_IG_Posted_SQUARE-1440x1440.jpeg", songs: ["Why You Wanna Fight?", "Too Good to Say Goodbye", "Risk It All", "Just the Way You Are", "Die With a Smile", "When I Was Your Man", "It Will Rain", "Dance With Me", "After Last Night", "Leave the Door Open"] },
    { name: "Sade", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Sade_Adu_1_%28cropped%29.jpg/500px-Sade_Adu_1_%28cropped%29.jpg", songs: ["Smooth Operator", "No Ordinary Love", "By Your Side", "The Sweetest Taboo", "Your Love Is King", "Cherish the Day", "Is It a Crime", "Kiss of Life", "Pearls", "King of Sorrow"] },
    { name: "SZA", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/KendrickSZASPurs230725-19_-_54683179509_%28cropped%29_%28cropped%29.jpg/500px-KendrickSZASPurs230725-19_-_54683179509_%28cropped%29_%28cropped%29.jpg", songs: ["Snooze", "Good Days", "Saturn", "Crybaby", "Nobody Gets Me", "Love Galore (feat. Travis Scott)", "Broken Clocks", "The Weekend", "I Hate U", "Open Arms (feat. Travis Scott)"] },
    { name: "Playboi Carti", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Playboi_Carti%2C_Clout_Festival_2024_05_%28cropped%29.jpg/500px-Playboi_Carti%2C_Clout_Festival_2024_05_%28cropped%29.jpg", songs: ["RATHER LIE", "TOXIC", "Shoota", "Location", "Magnolia", "ILoveUIHateU", "Sky", "ALL RED", "Let It Go", "Yah Mean"] },
    { name: "Travis Scott", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/2025-0120_Cole_Gahagan_Michael_Rubin_Travis_Scott_%28cropped%29.jpg/500px-2025-0120_Cole_Gahagan_Michael_Rubin_Travis_Scott_%28cropped%29.jpg", songs: ["MY EYES", "SKELETONS", "ASTROTHUNDER", "FE!N (feat. Playboi Carti)", "90210", "RIP SCREW", "TELEKINESIS (feat. Future & SZA)", "goosebumps", "I KNOW ?", "MELTDOWN"] },
    { name: "Justin Bieber", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Justin_Bieber_in_2015.jpg/500px-Justin_Bieber_in_2015.jpg", songs: ["Right Here", "Heartbreaker", "Trust", "Confident", "Flatline", "DAISIES", "Love Yourself", "All That Matters", "Hold Tight", "Recovery"] },
    { name: "Pimmie", image: "https://i.scdn.co/image/ab6761610000e5eb758738053bedb013fae42cea", songs: ["PIMMIE'S DILEMMA", "Call Me When You Can", "Wish I Never", "One Deep", "Slauson", "Bless Up", "Bet", "Changes", "D.N.D", "3 am things"] },
    { name: "Roy Woods", image: "https://i.scdn.co/image/ab6761610000e5ebdc9e4a93c54b2e477060aa29", songs: ["Drama", "Gwan Big Up Urself", "Get You Good", "Balance", "How I Feel", "Snow White", "What Are You On?", "Jealousy", "Say Less", "Monday to Monday"] },
    { name: "Chris Brown", image: "https://i.scdn.co/image/ab6761610000e5eb913ab85302df0ddfb77131e9", songs: ["Under the Influence", "No Guidance", "Go Crazy", "Loyal", "With You", "Forever", "Run It!", "Kiss Kiss", "Sensational", "Fine China"] },
    { name: "The Toys", image: "https://i.scdn.co/image/ab6761610000e5eb3edf0563fc7413d0c62fd9a7", songs: ["หน้าหนาวที่แล้ว", "จดหมาย", "ให้เธอให้อภัย", "Stars", "04:00", "ขอโทษที่เป็นแบบนี้", "พูดไม่ออก", "TOY", "ไวน์ลดา", "ของขวัญ - Cover Version"] },
    { name: "YOUNGOHM", image: "https://i.scdn.co/image/ab6761610000e5ebae5e02b462ee6517e378a502", songs: ["I JUST WANNA BE FREE", "HOW I LIKE, Pt. 2", "Bottom", "SMOKING ON THE ROOFTOP", "Mom I'm Sorry 2559", "จูบลา", "นครดารา", "เจิดจรัส", "หัวใจสีดำ", "11 เดือน"] },
    { name: "Musketeers", image: "https://i.scdn.co/image/ab6761610000e5eb9ce1effcd929f5776754ffd8", songs: ["ของขวัญ", "แค่คุณ", "ไกล", "พิจารณา", "ความทรงจำ", "ใจความสำคัญ", "นิทาน", "งานเต้นรำ", "อยากให้เธอลอง", "แค่บางคำ"] },
    { name: "Diamond MQT", image: "https://i.scdn.co/image/ab6761610000e5eb5378fc9a53720ff91c1a1e99", songs: ["Victoria's Secret", "W.R.U", "ทางชัน", "ธรรมดา", "ร่วงหล่น", "เด็กธรรมดา", "Panda", "บอกตัวเอง", "เพชร", "imfellinlovewithmyself"] },
    { name: "Timethai", image: "https://i.scdn.co/image/ab6761610000e5eb7f7f0b908b35408ab43797e1", songs: ["พูดเหมือนจำ ทำเหมือนเดิม (SAME AGAIN)", "ไม่อยากให้เป็นเขา", "ไม่มีใคร", "ยังไม่ชิน (NOT USED TO)", "รักได้รักไปแล้ว (TIMETHAI Cover)", "มีอะไรอีกมั้ยที่ลืมบอก", "รักควรมีสองคน (TIMETHAI Cover)", "ONE KISS (TIMETHAI Cover)", "ฉากเรียกน้ำตา", "พูดอะไรก็เชิญ"] },
    { name: "Saran", image: "https://i.scdn.co/image/ab6761610000e5ebc4ad328ec19e61cafddb0f04", songs: ["เติบโต (โดยไม่มีเธอ)", "มากกว่ารัก", "21", "CURSE (รักใครไม่เป็น)", "อะไรฉันก็ยอม", "ชีวิตคือการเดินทาง", "เหรียญริมทาง", "สรัล", "Family", "แหลมบาลีฮาย"] },
    { name: "D Gerrard", image: "https://i.scdn.co/image/ab6761610000e5eb4c0ae621a5d9335104363c9d", songs: ["Galaxy (feat. Kob The X Factor)", "รถไฟบนฟ้า", "โลกคู่ขนาน", "Luxury", "นักวิทยาศาสตร์", "รักรักรักรักรักรักรัก (Talk Less)", "ไม่เหมือนใคร", "รู้อยู่", "Galaxy Express", "แมงเม่า"] },
    { name: "Atom Chanakan", image: "https://i.scdn.co/image/ab6761610000e5ebb235bc9418aa6ed743d87ee1", songs: ["PLEASE", "ทางของฝุ่น (Dust)", "แผลเป็น (SCAR)", "ปล่อยปาก", "อ้าว", "อย่าบอก", "พอ", "รถคันเก่า", "ไหล่อ่อน (Soft Shoulder)", "Good Morning Teacher"] },
    { name: "MEYOU", image: "https://i.scdn.co/image/ab6761610000e5eb52dee609c17e86bd732dc1e6", songs: ["กอดหมอน", "อีกแล้ว", "สับสน (NO ONE)", "สร่าง (SOBER)", "December", "DAY 1 (feat. VALENTINA PLOY)", "ก่อนลา", "กำลังเหงา", "ถาม", "พูดจริง"] },
    { name: "1MILL", image: "https://i.scdn.co/image/ab6761610000e5ebd478825d6533bd8cc64fa5e8", songs: ["What I Been On", "Better Day", "Testimony", "One Call", "เปลี่ยนไป (Changed)", "SINCE I WAS YOUNG FREESTYLE", "สู้ชีวิต", "ยอมไม่ได้ (Never Give Up)", "Lifestyle", "B5"] },
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
    { catKey: "zpuStackSpoken", items: [
      { name: "Thai (Main)", icon: "https://flagcdn.com/w80/th.png" },
      { name: "English (Main)", icon: "https://flagcdn.com/w80/us.png" },
      { name: "Chinese Mandarin (Basic)", icon: "https://flagcdn.com/w80/cn.png" },
      { name: "Vietnamese (Basic)", icon: "https://flagcdn.com/w80/vn.png" },
      { name: "French (Basic)", icon: "https://flagcdn.com/w80/fr.png" },
      { name: "Spanish (Basic)", icon: "https://flagcdn.com/w80/es.png" },
      { name: "Japanese (Basic)", icon: "https://flagcdn.com/w80/jp.png" },
    ] },
  ] as { catKey: TranslationKey; items: { name: string; icon?: string }[] }[],

  // Everyday carry — Apple gear, current daily drivers + previously owned.
  everyday: [
    { cat: "Phone", name: "iPhone 17 Pro Max", detail: "Silver · 512GB", status: "current", priceThb: 54900, icon: "/images/everyday/iphone17promax.png", url: "https://www.apple.com/th/shop/buy-iphone/iphone-17-pro" },
    { cat: "Tablet", name: "iPad Air M4", detail: "13 Inch · Space Gray · 256GB", status: "current", priceThb: 32670, icon: "/images/everyday/ipadair.png", url: "https://www.apple.com/th/shop/buy-ipad/ipad-air" },
    { cat: "Earbuds", name: "AirPods 4", detail: "Active Noise Cancellation", status: "current", priceThb: 7490, icon: "/images/everyday/airpods4.png", url: "https://www.apple.com/th/airpods-4/" },
    { cat: "Accessory", name: "Apple Pencil Pro", detail: "Bluetooth", status: "current", priceThb: 4590, icon: "/images/everyday/applepencilpro.png", url: "https://www.apple.com/th/apple-pencil/" },
    { cat: "Card Holder", name: "Goyard Saint Sulpice", detail: "Green", status: "current", priceThb: 24000, icon: "/images/everyday/goyard.png" },
    { cat: "Wallet", name: "LV Slender Wallet", detail: "Monogram Eclipse", status: "current", priceThb: 16900, icon: "/images/everyday/lvmarco.png" },
    { cat: "Phone", name: "iPhone 15 Pro", detail: "Black Titanium · 512GB", status: "previous", priceThb: 51900, icon: "/images/everyday/iphone15pro.png" },
    { cat: "Phone", name: "iPhone 13", detail: "Midnight · 256GB", status: "previous", priceThb: 17800, icon: "/images/everyday/iphone13.png" },
    { cat: "Phone", name: "iPhone X", detail: "Space Gray · 64GB", status: "previous", priceThb: 10000, icon: "/images/everyday/iphonex.png" },
    { cat: "Earbuds", name: "AirPods Pro 2", detail: "USB‑C · ANC", status: "previous", priceThb: 8990, icon: "/images/everyday/airpodspro2.png" },
    { cat: "Earbuds", name: "AirPods (3rd gen)", detail: "MagSafe Case", status: "previous", priceThb: 6490, icon: "/images/everyday/airpods3.png" },
  ] as { cat: string; name: string; detail: string; status: "current" | "previous"; priceThb: number; icon?: string; url?: string }[],

  // PC build — real JIB Thailand prices (THB) with product image + link.
  setup: [
    { part: "CPU", name: "Intel Core i5-14400F", priceThb: 5990, icon: "/images/setup/cpu.png", url: "https://www.jib.co.th/web/product/readProduct/64702" },
    { part: "GPU", name: "MSI GeForce RTX 5060 Ti 16G Ventus 2X OC Plus", priceThb: 20800, icon: "/images/setup/gpu.png", url: "https://www.jib.co.th/web/product/readProduct/76008" },
    { part: "Mainboard", name: "MSI PRO B760M-A WIFI DDR5", priceThb: 3790, icon: "/images/setup/mainboard.png", url: "https://www.jib.co.th/web/product/readProduct/60465" },
    { part: "RAM", name: "Kingston FURY Beast DDR5 32GB", priceThb: 16600, icon: "/images/setup/ram32.png", url: "https://www.jib.co.th/web/product/readProduct/82590" },
    { part: "RAM", name: "Kingston FURY Beast DDR5 8GB", priceThb: 5190, icon: "/images/setup/ram8.png", url: "https://www.jib.co.th/web/product/readProduct/68213" },
    { part: "SSD", name: "Kingston NV2 500GB PCIe 4.0 NVMe M.2", priceThb: 1290, icon: "/images/setup/ssd.png", url: "https://www.jib.co.th/web/product/readProduct/55282" },
    { part: "HDD", name: "WD Blue 1TB 7200RPM SATA III (3.5\")", priceThb: 3490, icon: "/images/setup/hdd.png", url: "https://www.jib.co.th/web/product/readProduct/12280" },
    { part: "PSU", name: "Thermaltake Toughpower GF 750W 80+ Gold", priceThb: 3490, icon: "/images/setup/psu.png", url: "https://www.jib.co.th/web/product/readProduct/47447" },
  ] as { part: string; name: string; priceThb: number; icon?: string; url?: string }[],

  // Peripherals / gaming gear on the desk — real prices (THB) + product links.
  gear: [
    { part: "Monitor · Main", name: "ASUS TUF VG259QMR5A · 24.5″ FHD 310Hz", priceThb: 5900, icon: "/images/gear/monitor-tuf.png", url: "https://www.jib.co.th/web/product/readProduct/81912" },
    { part: "Monitor", name: "ASUS ROG Strix XG27ACMES · 27″ 2K 255Hz", priceThb: 7950, icon: "/images/gear/monitor-rog.png", url: "https://www.jib.co.th/web/product/readProduct/81850" },
    { part: "Mouse · Main", name: "Hitscan Hyperlight Wireless · Black", priceThb: 3100, icon: "/images/gear/mouse-hitscan.png", url: "https://hitscan.com/products/hyperlight" },
    { part: "Mouse", name: "Logitech G Pro X Superlight 2 · Pink", priceThb: 3990, icon: "/images/gear/mouse-superlight.png", url: "https://www.jib.co.th/web/product/readProduct/61793" },
    { part: "Headset", name: "HyperX Cloud III", priceThb: 2590, icon: "/images/gear/headset-cloud3.png", url: "https://www.jib.co.th/web/product/readProduct/60060" },
    { part: "Microphone", name: "HyperX QuadCast", priceThb: 4390, icon: "/images/gear/mic-quadcast.png", url: "https://www.jib.co.th/web/product/readProduct/35557" },
  ] as { part: string; name: string; priceThb: number; icon?: string; url?: string }[],
};
/* ═══════════════════════════════════════════════════════════════ */

// Localised price from a THB base amount (rates approximate).
const CURRENCY: Record<string, { sym: string; factor: number; step: number; suffix?: boolean }> = {
  th: { sym: "฿", factor: 1, step: 1 },
  en: { sym: "$", factor: 1 / 34.5, step: 1 },
  zh: { sym: "¥", factor: 1 / 4.8, step: 1 },
  vi: { sym: "₫", factor: 725, step: 1000, suffix: true },
  pt: { sym: "R$", factor: 1 / 6.4, step: 1 },
};
function fmtPrice(thb: number, lang: string): string {
  const c = CURRENCY[lang] ?? CURRENCY.en;
  const v = Math.round((thb * c.factor) / c.step) * c.step;
  const num = v.toLocaleString("en-US");
  return `${num}${c.sym}`;
}

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

function LiveDate({ timezone }: { timezone: string }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        weekday: "short",
        day: "numeric",
        month: "short",
      }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
      setDate(`${get("weekday")}, ${get("day")} ${get("month")}`);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [timezone]);
  return <>{date}</>;
}

// A live "status" that picks a random thing ZPU is into — reshuffled every refresh.
function RandomFact() {
  const [fact, setFact] = useState<{ icon: string; label: string; value: string } | null>(null);
  useEffect(() => {
    const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
    const pools: { icon: string; label: string; get: () => string }[] = [
      { icon: "📖", label: "Currently reading", get: () => pick(ZPU.favBooks).name },
      { icon: "🎧", label: "Listening to", get: () => { const a = pick(ZPU.favArtists); return `${pick(a.songs)} · ${a.name}`; } },
      { icon: "🎮", label: "Playing", get: () => pick(ZPU.favGames).name },
      { icon: "🎬", label: "Watching", get: () => pick([...ZPU.favMovies, ...ZPU.favAnime, ...ZPU.favSeries]).name },
      { icon: "📕", label: "Reading", get: () => pick(ZPU.favManga).name },
    ];
    const p = pick(pools);
    setFact({ icon: p.icon, label: p.label, value: p.get() });
  }, []);
  if (!fact) return null;
  return (
    <div className="zpu-bn-fact">
      <span className="zpu-bn-fact-ico" aria-hidden="true">{fact.icon}</span>
      <span className="zpu-bn-fact-body">
        <span className="zpu-bn-fact-label">{fact.label}</span>
        <span className="zpu-bn-fact-value">{fact.value}</span>
      </span>
    </div>
  );
}

const SI_PLATFORM: Record<string, string> = {
  youtube: si("youtube", "FF0000"),
  tiktok: si("tiktok", "white"),
  discord: si("discord", "5865F2"),
  facebook: si("facebook", "1877F2"),
  instagram: si("instagram", "E4405F"),
  steam: si("steam", "66C0F4"),
  github: si("github", "white"),
};

function PlatformIcon({ platform }: { platform: "spectrum" | "youtube" | "tiktok" | "discord" | "facebook" | "instagram" | "steam" | "github" }) {
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

function GameTile({ name, image, price }: { name: string; image?: string; price?: string }) {
  const [failed, setFailed] = useState(false);
  const showImg = image && !failed;
  return (
    <div className="zpu-game" title={price ? `${name} · ${price}` : name}>
      <div className="zpu-game-icon">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <span className="zpu-game-initial">{gameInitials(name)}</span>
        )}
      </div>
      <span className="zpu-game-name">{name}</span>
      {price && <span className="zpu-game-price">{price}</span>}
    </div>
  );
}

const CAR_BRANDS = [
  "Mercedes-AMG", "Mercedes-Benz", "Aston Martin", "Ferrari", "Porsche",
  "McLaren", "Bugatti", "Koenigsegg", "Pagani", "BMW", "Lotus", "Hennessey",
];
const CAR_LOGOS: Record<string, string> = {
  "Ferrari": si("ferrari"),
  "Porsche": si("porsche"),
  "McLaren": si("mclaren"),
  "BMW": si("bmw"),
  "Bugatti": si("bugatti"),
  "Aston Martin": si("astonmartin"),
  "Koenigsegg": si("koenigsegg"),
  "Mercedes-AMG": "/images/carlogos/mercedes.png",
  "Mercedes-Benz": "/images/carlogos/mercedes.png",
  "Pagani": "/images/carlogos/pagani.png",
  "Lotus": "/images/carlogos/lotus.png",
  "Hennessey": "/images/carlogos/hennessey.png",
};
function CarCard({ name, image, price }: { name: string; image?: string; price?: string }) {
  const [failed, setFailed] = useState(false);
  const brand = CAR_BRANDS.find((b) => name.startsWith(b)) ?? "";
  const model = brand ? name.slice(brand.length).trim() : name;
  const logo = brand ? CAR_LOGOS[brand] : undefined;
  const showImg = image && !failed;
  return (
    <div className="zpu-car-card" title={price ? `${name} · ${price}` : name}>
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="zpu-car-photo" src={image} alt={name} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span className="zpu-car-fallback">{gameInitials(name)}</span>
      )}
      {brand && <span className="zpu-car-brand">{brand}</span>}
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="zpu-car-logo" src={logo} alt={`${brand} logo`} loading="lazy" />
      )}
      <div className="zpu-car-overlay">
        <span className="zpu-car-model">{model || name}</span>
        {price && <span className="zpu-car-price">{price}</span>}
      </div>
    </div>
  );
}

// Bento grid placement for the "Facts About Me" cards.
// Per-fact icon shown in the coloured left tab of each fact card.
function FactIcon({ k }: { k: string }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (k) {
    case "zpuTinyNickname":
      return <svg {...p}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>;
    case "zpuTinyStatus":
      return <svg {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9z" /></svg>;
    case "zpuFactsPassions":
      return <svg {...p}><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /></svg>;
    case "zpuFactsChasing":
      return <svg {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>;
    case "zpuFactsLiving":
      return <svg {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
    case "zpuFactsTimezone":
      return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /><path d="M2 12h3M19 12h3" /></svg>;
    case "zpuFactsStyle":
      return <svg {...p}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" /></svg>;
    case "zpuFactsKnown":
      return <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" /></svg>;
    case "zpuFactsAge":
      return <svg {...p}><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" /><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" /><path d="M2 21h20" /><path d="M7 8v2M12 8v2M17 8v2M7 4h.01M12 4h.01M17 4h.01" /></svg>;
    default:
      return <svg {...p}><circle cx="12" cy="12" r="10" /></svg>;
  }
}

// Facts that get a full-width card (long, listy values).
const FACT_WIDE = new Set(["zpuFactsPassions"]);

// Section header — pulls the trailing emoji off the title to use as a left icon,
// with the title + a short subtitle stacked beside it.
function SectionHead({ title, sub }: { title: string; sub?: string }) {
  const parts = title.trim().split(/\s+/);
  const last = parts[parts.length - 1];
  const hasIcon = parts.length > 1 && /\p{Extended_Pictographic}/u.test(last);
  const icon = hasIcon ? last : "";
  const text = hasIcon ? parts.slice(0, -1).join(" ") : title.trim();
  return (
    <div className="zpu-sechead">
      {icon && <span className="zpu-sechead-ico" aria-hidden="true">{icon}</span>}
      <div className="zpu-sechead-body">
        <h2 className="zpu-works-title">{text}</h2>
        {sub && <p className="zpu-works-sub">{sub}</p>}
      </div>
    </div>
  );
}

// Games — compact icon (OG); on hover the tile expands to reveal banner + logo.
function GameCard({ name, image, banner }: { name: string; image?: string; banner?: string }) {
  const [failed, setFailed] = useState(false);
  const showIcon = image && !failed;
  return (
    <div className="zpu-gcard" title={name}>
      <div className="zpu-gcard-inner">
        {showIcon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="zpu-gcard-icon" src={image} alt={name} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <span className="zpu-gcard-fallback">{gameInitials(name)}</span>
        )}
        {banner && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="zpu-gcard-banner" src={banner} alt="" loading="lazy" />
        )}
        {banner && showIcon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="zpu-gcard-logo" src={image} alt="" loading="lazy" />
        )}
      </div>
      <span className="zpu-gcard-name">{name}</span>
    </div>
  );
}

const MANHWA_TITLES = new Set([
  "Solo Leveling", "Wind Breaker (Manhwa)", "The End Has Come", "Lookism",
  "Killer Peter", "Bad Guy", "Weak Hero", "Viral Hit", "Tower of God",
  "Study Group", "Omniscient Reader's Viewpoint",
]);
function MangaTile({ name, image }: { name: string; image?: string }) {
  const [failed, setFailed] = useState(false);
  const showImg = image && !failed;
  const isManhwa = MANHWA_TITLES.has(name);
  const display = name.replace(/\s*\((?:Manhwa|Manga)\)$/i, "");
  return (
    <div className="zpu-manga" title={name}>
      <div className="zpu-manga-inner">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="zpu-manga-cover" src={image} alt={name} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <span className="zpu-manga-fallback">{gameInitials(name)}</span>
        )}
        <span className={`zpu-manga-badge${isManhwa ? " zpu-manga-badge--manhwa" : ""}`}>
          {isManhwa ? "MANHWA" : "MANGA"}
        </span>
        <div className="zpu-manga-overlay">
          <span className="zpu-manga-name">{display}</span>
        </div>
      </div>
    </div>
  );
}

// Books — hover opens the cover (hinged on the spine) to reveal the title page.
function BookTile({ name, image }: { name: string; image?: string }) {
  const [failed, setFailed] = useState(false);
  const showImg = image && !failed;
  return (
    <div className="zpu-book" title={name}>
      <div className="zpu-book-3d">
        <div className="zpu-book-page">
          <span className="zpu-book-page-label">Title</span>
          <span className="zpu-book-page-title">{name}</span>
          <span className="zpu-book-page-rule" aria-hidden="true" />
        </div>
        <div className="zpu-book-cover">
          {showImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} loading="lazy" onError={() => setFailed(true)} />
          ) : (
            <span className="zpu-book-fallback">{gameInitials(name)}</span>
          )}
          <span className="zpu-book-binding" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

// Series — Netflix-style cover: play button + title appear on hover.
function SeriesTile({ name, image }: { name: string; image?: string }) {
  const [failed, setFailed] = useState(false);
  const showImg = image && !failed;
  const tmdb = `https://www.themoviedb.org/search?query=${encodeURIComponent(name)}`;
  return (
    <div className="zpu-series" title={name}>
      <div className="zpu-series-inner">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="zpu-series-cover" src={image} alt={name} loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <span className="zpu-series-fallback">{gameInitials(name)}</span>
        )}
        <div className="zpu-series-info">
          <a className="zpu-series-play" href={tmdb} target="_blank" rel="noreferrer" aria-label={`Find ${name} on TMDB`}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </a>
          <span className="zpu-series-name">{name}</span>
        </div>
      </div>
    </div>
  );
}

function SportCard({ sport, player, image }: { sport: string; player: string; image?: string }) {
  const [failed, setFailed] = useState(false);
  const showImg = image && !failed;
  return (
    <div className="zpu-sport" title={`${sport} · ${player}`}>
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="zpu-sport-photo" src={image} alt={player} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span className="zpu-sport-fallback">{gameInitials(player)}</span>
      )}
      <span className={`zpu-sport-tag${["Parkour", "Cycling", "Skydiving"].includes(sport) ? " zpu-sport-tag--dark" : ""}`}>{sport}</span>
      <div className="zpu-sport-overlay">
        <span className="zpu-sport-name">{player}</span>
      </div>
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
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    <span className="zpu-age-badge">
      {d} {t("zpuCdDay")} {pad(h)}:{pad(m)}:{pad(s)} → 18
    </span>
  );
}

function ArtistCard({ name, image, songs }: { name: string; image?: string; songs: string[] }) {
  const { t } = useLang();
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
        <div className="zpu-artist-meta">
          <span className="zpu-artist-name">{name}</span>
          <span className="zpu-artist-label">
            <span className="zpu-eq" aria-hidden="true"><i /><i /><i /></span>
            {t("zpuArtistsTracks")}
          </span>
        </div>
      </div>
      <ol className="zpu-artist-songs">
        {songs.map((s, i) => (
          <li key={s} className="zpu-artist-track">
            <span className="zpu-artist-rank"><span className="zpu-artist-num">{i + 1}</span></span>
            <span className="zpu-artist-title">{s}</span>
          </li>
        ))}
      </ol>
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
    <>
      <div className="zpu-bn-cell zpu-bn-stat zpu-bn-s1">
        <span className="zpu-bn-stat-ico">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M23 12s0-3.9-.5-5.8a3 3 0 0 0-2.1-2.1C18.5 3.5 12 3.5 12 3.5s-6.5 0-8.4.6A3 3 0 0 0 1.5 6.2C1 8.1 1 12 1 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 8.4.6 8.4.6s6.5 0 8.4-.6a3 3 0 0 0 2.1-2.1C23 15.9 23 12 23 12ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
          </svg>
        </span>
        <strong><LiveTicker target={yt} fallback="75K+" /></strong>
        <span className="zpu-bn-stat-label">{t("zpuStatSubs")}</span>
      </div>
      <div className="zpu-bn-cell zpu-bn-stat zpu-bn-s2">
        <span className="zpu-bn-stat-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </span>
        <strong><LiveTicker target={dc} fallback="110K+" /></strong>
        <span className="zpu-bn-stat-label">{t("zpuStatCommunity")}</span>
      </div>
      <div className="zpu-bn-cell zpu-bn-stat zpu-bn-s3">
        <span className="zpu-bn-stat-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        </span>
        <strong>9+</strong>
        <span className="zpu-bn-stat-label">{t("zpuStatYears")}</span>
      </div>
    </>
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
  const [popupClosing, setPopupClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openPopup = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPopupClosing(false);
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupClosing(true);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setPopupOpen(false);
      setPopupClosing(false);
    }, 300);
  };

  // Spin the floating note icon only while music is actually playing.
  useEffect(() => {
    document.documentElement.classList.toggle("music-playing", playing);
    return () => document.documentElement.classList.remove("music-playing");
  }, [playing]);

  // Restore saved preferences only — NO autoplay.
  // Music stays silent until the user presses play themselves.
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    let vol = 0.3;
    let mute = false;
    try {
      const sv = parseFloat(localStorage.getItem("spectrum-zpu-volume") ?? "");
      if (Number.isFinite(sv)) vol = Math.min(1, Math.max(0, sv));
      mute = localStorage.getItem("spectrum-zpu-muted") === "1";
    } catch { /* ignore */ }

    a.volume = vol;
    a.muted = mute;
    setVolume(vol);
    setMuted(mute);
    setPlaying(false);
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
    const handler = () => { if (popupOpen && !popupClosing) closePopup(); else openPopup(); };
    window.addEventListener("spectrum:show-music", handler);
    return () => window.removeEventListener("spectrum:show-music", handler);
  }, [popupOpen, popupClosing]);

  return (
    <div className={`zpu-music-wrap${popupOpen ? " open" : ""}${popupClosing ? " closing" : ""}`}>
      <div className="zpu-music-backdrop" onClick={closePopup} />
    <div className="zpu-player">
      <button className="zpu-player-close" aria-label="Close" onClick={closePopup}>✕</button>
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
  const [showAllGames, setShowAllGames] = useState(false);
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [showAllSeries, setShowAllSeries] = useState(false);
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [showAllSports, setShowAllSports] = useState(false);
  const [showAllCars, setShowAllCars] = useState(false);
  const [showAllAnime, setShowAllAnime] = useState(false);
  const [showAllManga, setShowAllManga] = useState(false);
  const [showAllArtists, setShowAllArtists] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("zpu-top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = ["zpu-top", "zpu-facts", "zpu-interests", "zpu-skills", "zpu-items", "zpu-works", "zpu-connect"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Scroll-reveal: sections fade + rise as they enter the viewport.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const secs = Array.from(
      document.querySelectorAll<HTMLElement>(".zpu-wrap > section:not(.zpu-home)")
    );
    secs.forEach((s) => s.classList.add("zpu-reveal"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("zpu-reveal-in");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    secs.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const navItems = [
    { id: "zpu-top", label: t("zpuNavHome") },
    { id: "zpu-facts", label: t("zpuNavAbout") },
    { id: "zpu-interests", label: t("zpuNavInterests") },
    { id: "zpu-skills", label: t("zpuNavSkills") },
    { id: "zpu-items", label: t("zpuNavItems") },
    { id: "zpu-works", label: t("zpuNavProjects") },
    { id: "zpu-connect", label: t("zpuNavContact") },
  ];

  // Randomize movies on the client after mount, but SPREAD each franchise
  // (Spider-Man, John Wick, Iron Man, ...) so no two films from the same
  // series ever land next to each other (keeps SSR order first to avoid
  // hydration mismatch).
  const [moviesOrder, setMoviesOrder] = useState(ZPU.favMovies);
  useEffect(() => {
    type Movie = { name: string; image?: string };
    const shuffle = <T,>(arr: T[]) => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
    // Some franchises share no common word, so match those titles explicitly.
    const fastFurious = new Set([
      "The Fast and the Furious", "2 Fast 2 Furious",
      "The Fast and the Furious: Tokyo Drift", "Fast & Furious",
      "Fast Five", "Fast & Furious 6", "Furious 7",
      "The Fate of the Furious", "F9", "Fast X",
    ]);
    const jamesBond = new Set([
      "Casino Royale", "Quantum of Solace", "Skyfall",
      "Spectre", "No Time to Die",
    ]);
    // group by franchise (falls back to the film's own name for standalones)
    const franchise = (name: string) => {
      if (name === "Prey") return "Predator"; // Predator film without the word
      if (name === "The King's Man") return "Kingsman"; // Kingsman prequel
      if (name === "Logan") return "Wolverine"; // Wolverine film without the word
      if (name === "Prometheus") return "Alien"; // Alien prequel without the word
      if (name === "Raiders of the Lost Ark") return "Indiana Jones";
      if (name === "Batman Begins") return "The Dark Knight"; // Nolan trilogy
      if (name === "Leatherface") return "Texas Chain"; // 2017 TCM film
      if (name === "Jigsaw" || name === "Spiral") return "Saw"; // Saw films without the word
      if (fastFurious.has(name)) return "Fast & Furious";
      if (jamesBond.has(name)) return "James Bond";
      for (const key of [
        "Spider-Man", "John Wick", "Iron Man", "Harry Potter",
        "The Lord of the Rings", "Final Destination", "Predator",
        "Pirates of the Caribbean", "Captain America", "Black Panther",
        "Back to the Future", "Peaky Blinders", "Kingsman", "Narcos",
        "Doctor Strange", "Avengers", "Wolverine", "The Dark Knight",
        "The Godfather", "Top Gun", "Jurassic", "Terminator", "Rocky",
        "Creed", "Alien", "Star Wars", "Indiana Jones", "The Mummy",
        "Wonder Woman", "Aquaman", "Thor", "Ant-Man",
        "Terrifier", "The Conjuring", "Texas Chain", "Saw",
        "The Equalizer", "Dune",
      ]) {
        if (name.includes(key)) return key;
      }
      return name;
    };
    const groups = new Map<string, Movie[]>();
    for (const m of shuffle(ZPU.favMovies)) {
      const k = franchise(m.name);
      (groups.get(k) ?? groups.set(k, []).get(k)!).push(m);
    }
    // largest groups first, then place into even indices, then odd — this
    // guarantees no two same-group items are adjacent.
    const flat = [...groups.values()].sort((a, b) => b.length - a.length).flat();
    const n = flat.length;
    const result = new Array<Movie>(n);
    let idx = 0;
    for (let i = 0; i < n; i += 2) result[i] = flat[idx++];
    for (let i = 1; i < n; i += 2) result[i] = flat[idx++];
    setMoviesOrder(result);
  }, []);

  // Shuffle books / anime / manga on mount (SSR keeps source order to avoid
  // hydration mismatch).
  const shuffleArr = <T,>(src: T[]) => {
    const arr = [...src];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const [booksOrder, setBooksOrder] = useState(ZPU.favBooks);
  const [animeOrder, setAnimeOrder] = useState(ZPU.favAnime);
  const [mangaOrder, setMangaOrder] = useState(ZPU.favManga);
  const [carsOrder, setCarsOrder] = useState(ZPU.favCars);
  const [seriesOrder, setSeriesOrder] = useState(ZPU.favSeries);
  useEffect(() => {
    setBooksOrder(shuffleArr(ZPU.favBooks));
    setAnimeOrder(shuffleArr(ZPU.favAnime));
    setMangaOrder(shuffleArr(ZPU.favManga));
    setCarsOrder(shuffleArr(ZPU.favCars));
    setSeriesOrder(shuffleArr(ZPU.favSeries));
  }, []);

  const currently = [
    { labelKey: "zpuRoleFounder" as const, strong: "Spectrum Cheat", href: "https://spectrumcheat.com", sinceKey: "zpuSinceFounder" as const, platform: "spectrum" as const },
    { labelKey: "zpuRoleOwner" as const, strong: "ZPU Community", href: "https://discord.gg/C3MpUNwsDU", sinceKey: "zpuSinceOwner" as const, platform: "discord" as const },
    { labelKey: "zpuRoleYoutube" as const, strong: "@xZPUHigh", href: "https://www.youtube.com/channel/UCgMktyw9e816q0GzhBL2dnQ", sinceKey: "zpuSinceYoutube" as const, platform: "youtube" as const },
    { labelKey: "zpuRoleTiktok" as const, strong: "@xZPUHighReal", href: "https://www.tiktok.com/@xzpuhighreal", sinceKey: "zpuSinceTiktok" as const, platform: "tiktok" as const },
  ];

  const facts = [
    { labelKey: "zpuFactsPassions" as const, value: t("zpuFactsPassionsV"), color: "#8b5cf6" },
    { labelKey: "zpuFactsLiving" as const, value: t("zpuFactsLivingV"), color: "#3b82f6" },
    { labelKey: "zpuFactsTimezone" as const, value: (
      <span className="zpu-fact-tz">
        <span>ICT (Indochina Time)</span>
        <span>Asia/Bangkok</span>
        <span>UTC+7</span>
      </span>
    ), color: "#6366f1" },
    { labelKey: "zpuFactsChasing" as const, value: (<><span className="zpu-only-desktop">{t("zpuFactsChasingV")}</span><span className="zpu-only-mobile">{t("zpuFactsChasingV").replace(/\n/g, "\n\n")}</span></>), color: "#f43f5e" },
    { labelKey: "zpuFactsKnown" as const, value: (<><span className="zpu-only-desktop">ZPU / xZPUHigh<br />Non / Chanon</span><span className="zpu-only-mobile">ZPU<br />xZPUHigh<br />&<br />Non<br />Chanon</span></>), color: "#14b8a6" },
    { labelKey: "zpuFactsAge" as const, value: t("zpuFactsAgeV"), color: "#a855f7" },
    { labelKey: "zpuFactsStyle" as const, value: t("zpuFactsStyleV"), color: "#94a3b8" },
  ];

  const tinyFacts = [
    { labelKey: "zpuTinyNickname" as const, value: "ZPU / NON 😴", color: "#22c55e" },
    { labelKey: "zpuTinyStatus" as const, value: "WORK HARD 🔥", color: "#ff6f00" },
  ];

  return (
    <main className="zpu-page">
      <div className="zpu-dots" />

      {/* Floating personal header — full-width at top, collapses into a pill on scroll */}
      <header className={`zpu-topbar${scrolled ? " scrolled" : ""}`}>
        <div className="zpu-topbar-inner">
          <a href="/about/zpu" className="zpu-topbar-brand" aria-label="Spectrum Cheat">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Spectrum Icon.png" alt="Spectrum Cheat logo" className="zpu-topbar-logo" />
          </a>

          <nav className="zpu-topbar-nav">
            {navItems.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={activeSection === n.id ? "active" : ""}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="zpu-topbar-actions">
            <a href="/" className="zpu-tb-btn" aria-label="Home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 11l9-8 9 8" />
                <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
                <path d="M9 21v-8h6v8" />
              </svg>
            </a>
            <button
              className="zpu-tb-btn"
              aria-label="Change language"
              onClick={() => window.dispatchEvent(new CustomEvent("spectrum:show-lang"))}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </button>
            <button
              className="zpu-tb-btn zpu-tb-music"
              aria-label="Music"
              onClick={() => window.dispatchEvent(new CustomEvent("spectrum:show-music"))}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Music player — mounted outside .zpu-wrap so its popup can layer above the header */}
      <MusicPlayer />

      <div className="zpu-wrap">
        {/* Home / hero */}
        <section className="zpu-home" id="zpu-top">
          <div className="zpu-home-left">
            <p className="zpu-home-eyebrow">{t("zpuHello")}</p>
            <h1 className="zpu-home-name">{ZPU.brand}</h1>
            <p className="zpu-home-tag">
              {t("zpuHomeTag1")}
              <br />
              <span className="zpu-home-tag-accent">{t("zpuHomeTag2")}</span>
            </p>
            <p className="zpu-home-desc" lang={lang}>{t("zpuHomeDesc")}</p>
            <div className="zpu-home-cta">
              <a href="#zpu-facts" className="zpu-home-btn zpu-home-btn--primary">
                {t("zpuHomeCtaWork")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="#zpu-connect" className="zpu-home-btn">{t("zpuHomeCtaConnect")}</a>
            </div>
            <div className="zpu-home-stats">
              <div className="zpu-home-stat">
                <strong>9+</strong>
                <span>{t("zpuHomeStatProjects")}</span>
              </div>
              <div className="zpu-home-stat">
                <strong>80K+</strong>
                <span>{t("zpuStatSubs")}</span>
              </div>
              <div className="zpu-home-stat">
                <strong>100K+</strong>
                <span>{t("zpuStatCommunity")}</span>
              </div>
            </div>
          </div>

          <div className="zpu-home-visual" aria-hidden="true">
            <span className="zpu-home-accent" />
            <a
              href={ZPU.works[0].href}
              className="zpu-home-shot"
              target={ZPU.works[0].href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ZPU.works[0].image} alt={ZPU.works[0].name} loading="lazy" />
            </a>
          </div>

          <div className="zpu-home-line" aria-hidden="true">
            <span className="zpu-home-chev">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>
        </section>

        {/* About — bold bento grid */}
        <section className="zpu-about-bento">
          <div className="zpu-bn-cell zpu-bn-bio">
            <p className="zpu-current-label">{t("zpuBioLabel")}</p>
            <p className="zpu-bio" lang={lang} dangerouslySetInnerHTML={{ __html: t("zpuBio") }} />
          </div>

          <div className="zpu-bn-cell zpu-bn-photo">
            <div className="zpu-bn-status">
              <span className="zpu-bn-status-dot" aria-hidden="true" />
              Online
            </div>
            <div className="zpu-photo-frame">
              <div className="zpu-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ZPU.photo} alt={ZPU.brand} />
              </div>
              <div className="zpu-photo-sticker">💻 ☕ 🌟</div>
            </div>

            <RandomFact />

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
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                GMT+7
              </span>
              <span className="zpu-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <LiveDate timezone={ZPU.timezone} />
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

            <div className="zpu-bn-socials">
              {ZPU.socials
                .filter((s) => ["youtube", "discord", "instagram", "tiktok", "github"].includes(s.platform))
                .map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="zpu-bn-social"
                    aria-label={s.label}
                  >
                    <PlatformIcon platform={s.platform} />
                  </a>
                ))}
            </div>
          </div>

          <div className="zpu-bn-cell zpu-bn-roles">
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

          <LiveStats ytSubs={ytSubs} discordMembers={discordMembers} />
        </section>

        {/* Facts About Me */}
        <section className="zpu-facts-sec" id="zpu-facts">
          <h2 className="zpu-works-title zpu-facts-bigtitle">{t("zpuFactsTitle")}</h2>

          <div className="zpu-facts-grid">
            {tinyFacts.map((f) => (
              <div key={f.labelKey} className="zpu-fact zpu-fact--half" style={{ ["--c" as string]: f.color }}>
                <span className="zpu-fact-ico"><FactIcon k={f.labelKey} /></span>
                <div className="zpu-fact-body">
                  <span className="zpu-fact-value">{f.value}</span>
                  <span className="zpu-fact-label">{t(f.labelKey)}</span>
                </div>
              </div>
            ))}
            {facts.map((f) => (
              <div
                key={f.labelKey}
                className={`zpu-fact${FACT_WIDE.has(f.labelKey) ? " zpu-fact--wide" : ""}`}
                style={{ ["--c" as string]: f.color }}
              >
                <span className="zpu-fact-ico"><FactIcon k={f.labelKey} /></span>
                <div className="zpu-fact-body">
                  {f.labelKey === "zpuFactsPassions" ? (
                    <div className="zpu-fact-chips">
                      {t("zpuFactsPassionsV").split(/\s*[,、]\s*/).map((x) => x.trim()).filter(Boolean).map((x) => (
                        <span key={x} className="zpu-fact-chip">{x}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="zpu-fact-value">{f.value}</span>
                  )}
                  <span className="zpu-fact-label">{t(f.labelKey)}</span>
                  {f.labelKey === "zpuFactsLiving" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="zpu-fact-flag" src="https://flagcdn.com/w320/th.png" alt="Thailand flag" loading="lazy" />
                  )}
                  {f.labelKey === "zpuFactsAge" && <AgeCountdown target={BIRTHDAY_18} />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Favorite games */}
        <section className="zpu-games-sec" id="zpu-interests">
          <SectionHead title={t("zpuFavGamesTitle")} sub={t("zpuFavGamesSub")} />
          <div className="zpu-gcard-grid">
            {(showAllGames ? ZPU.favGames : ZPU.favGames.slice(0, 20)).map((g) => (
              <GameCard key={g.name} name={g.name} image={g.image} banner={g.banner} />
            ))}
          </div>
          {ZPU.favGames.length > 18 && (
            <button className="zpu-works-more" onClick={() => setShowAllGames((v) => !v)}>
              {t(showAllGames ? "zpuShowLess" : "zpuExploreAll")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: showAllGames ? "rotate(180deg)" : undefined, transition: "transform .2s" }}>
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          )}
        </section>

        {/* Favorite food */}
        {ZPU.favFood.length > 0 && (
          <section className="zpu-games-sec">
            <SectionHead title={t("zpuFoodTitle")} sub={t("zpuFoodSub")} />
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
            <SectionHead title={t("zpuMoviesTitle")} sub={t("zpuMoviesSub")} />
            <div className="zpu-series-grid">
              {(showAllMovies ? moviesOrder : moviesOrder.slice(0, 12)).map((g) => (
                <SeriesTile key={g.name} name={g.name} image={g.image} />
              ))}
            </div>
            {ZPU.favMovies.length > 12 && (
              <button className="zpu-works-more" onClick={() => setShowAllMovies((v) => !v)}>
                {t(showAllMovies ? "zpuShowLess" : "zpuExploreAll")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showAllMovies ? "rotate(180deg)" : undefined, transition: "transform .2s" }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            )}
          </section>
        )}

        {/* Favorite series */}
        {ZPU.favSeries.length > 0 && (
          <section className="zpu-games-sec">
            <SectionHead title={t("zpuSeriesTitle")} sub={t("zpuSeriesSub")} />
            <div className="zpu-series-grid">
              {(showAllSeries ? seriesOrder : seriesOrder.slice(0, 12)).map((g) => (
                <SeriesTile key={g.name} name={g.name} image={g.image} />
              ))}
            </div>
            {ZPU.favSeries.length > 12 && (
              <button className="zpu-works-more" onClick={() => setShowAllSeries((v) => !v)}>
                {t(showAllSeries ? "zpuShowLess" : "zpuExploreAll")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showAllSeries ? "rotate(180deg)" : undefined, transition: "transform .2s" }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            )}
          </section>
        )}

        {/* Favorite books */}
        {ZPU.favBooks.length > 0 && (
          <section className="zpu-games-sec">
            <SectionHead title={t("zpuBooksTitle")} sub={t("zpuBooksSub")} />
            <div className="zpu-books-grid">
              {(showAllBooks ? booksOrder : booksOrder.slice(0, 12)).map((g) => (
                <BookTile key={g.name} name={g.name} image={g.image} />
              ))}
            </div>
            {ZPU.favBooks.length > 12 && (
              <button className="zpu-works-more" onClick={() => setShowAllBooks((v) => !v)}>
                {t(showAllBooks ? "zpuShowLess" : "zpuExploreAll")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showAllBooks ? "rotate(180deg)" : undefined, transition: "transform .2s" }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            )}
          </section>
        )}

        {/* Favorite anime */}
        {ZPU.favAnime.length > 0 && (
          <section className="zpu-games-sec">
            <SectionHead title={t("zpuAnimeTitle")} sub={t("zpuAnimeSub")} />
            <div className="zpu-series-grid">
              {(showAllAnime ? animeOrder : animeOrder.slice(0, 12)).map((g) => (
                <SeriesTile key={g.name} name={g.name} image={g.image} />
              ))}
            </div>
            {ZPU.favAnime.length > 12 && (
              <button className="zpu-works-more" onClick={() => setShowAllAnime((v) => !v)}>
                {t(showAllAnime ? "zpuShowLess" : "zpuExploreAll")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showAllAnime ? "rotate(180deg)" : undefined, transition: "transform .2s" }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            )}
          </section>
        )}

        {/* Favorite manga */}
        {ZPU.favManga.length > 0 && (
          <section className="zpu-games-sec">
            <SectionHead title={t("zpuMangaTitle")} sub={t("zpuMangaSub")} />
            <div className="zpu-manga-grid">
              {(showAllManga ? mangaOrder : mangaOrder.slice(0, 12)).map((g) => (
                <MangaTile key={g.name} name={g.name} image={g.image} />
              ))}
            </div>
            {ZPU.favManga.length > 12 && (
              <button className="zpu-works-more" onClick={() => setShowAllManga((v) => !v)}>
                {t(showAllManga ? "zpuShowLess" : "zpuExploreAll")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showAllManga ? "rotate(180deg)" : undefined, transition: "transform .2s" }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            )}
          </section>
        )}

        {/* Favorite sport & players */}
        {ZPU.favSports.length > 0 && (
          <section className="zpu-games-sec">
            <SectionHead title={t("zpuSportsTitle")} sub={t("zpuSportsSub")} />
            <div className="zpu-sports-grid">
              {(showAllSports ? ZPU.favSports : ZPU.favSports.slice(0, 12)).map((s) => (
                <SportCard key={s.player} sport={s.sport} player={s.player} image={s.image} />
              ))}
            </div>
            {ZPU.favSports.length > 12 && (
              <button className="zpu-works-more" onClick={() => setShowAllSports((v) => !v)}>
                {t(showAllSports ? "zpuShowLess" : "zpuExploreAll")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showAllSports ? "rotate(180deg)" : undefined, transition: "transform .2s" }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            )}
          </section>
        )}

        {/* Favorite cars */}
        {ZPU.favCars.length > 0 && (
          <section className="zpu-games-sec">
            <SectionHead title={t("zpuCarsTitle")} sub={t("zpuCarsSub")} />
            <div className="zpu-cars-grid">
              {(showAllCars ? carsOrder : carsOrder.slice(0, 6)).map((g) => (
                <CarCard key={g.name} name={g.name} image={g.image}
                  price={g.priceUsd ? fmtPrice(g.priceUsd * 34.5, lang) : undefined} />
              ))}
            </div>
            {ZPU.favCars.length > 6 && (
              <button className="zpu-works-more" onClick={() => setShowAllCars((v) => !v)}>
                {t(showAllCars ? "zpuShowLess" : "zpuExploreAll")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showAllCars ? "rotate(180deg)" : undefined, transition: "transform .2s" }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            )}
          </section>
        )}

        {/* Favorite artists */}
        {ZPU.favArtists.length > 0 && (
          <section className="zpu-games-sec">
            <SectionHead title={t("zpuArtistsTitle")} sub={t("zpuArtistsSub")} />
            <div className="zpu-artists-grid">
              {(showAllArtists ? ZPU.favArtists : ZPU.favArtists.slice(0, 4)).map((a) => (
                <ArtistCard key={a.name} name={a.name} image={a.image} songs={a.songs} />
              ))}
            </div>
            {ZPU.favArtists.length > 4 && (
              <button className="zpu-works-more" onClick={() => setShowAllArtists((v) => !v)}>
                {t(showAllArtists ? "zpuShowLess" : "zpuExploreAll")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: showAllArtists ? "rotate(180deg)" : undefined, transition: "transform .2s" }}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            )}
          </section>
        )}

        {/* Tech stack */}
        <section className="zpu-stack-sec" id="zpu-skills">
          <SectionHead title={t("zpuStackTitle")} sub={t("zpuStackSub")} />
          <div className="zpu-stack-grid">
            {ZPU.stack.map((row) => (
              <div key={row.catKey} className="zpu-stack-panel">
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

        {/* Everyday items */}
        {ZPU.everyday.length > 0 && (
          <section className="zpu-stack-sec" id="zpu-items">
            <SectionHead title={t("zpuEdcTitle")} sub={t("zpuEdcSub")} />
            {(["current", "previous"] as const).map((st) => {
              const items = ZPU.everyday.filter((e) => e.status === st);
              if (!items.length) return null;
              return (
                <div key={st} className="zpu-edc-group">
                  <span className={`zpu-edc-gl zpu-edc-gl-${st}`}>
                    {t(st === "current" ? "zpuEdcCurrent" : "zpuEdcPrevious")}
                  </span>
                  <div className="zpu-edc-grid">
                    {items.map((e) => (
                      <div key={e.name} className={`zpu-edc-card zpu-edc-card-${st}`}>
                        <div className="zpu-edc-img">
                          {e.icon && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={e.icon} alt={e.name} loading="lazy" />
                          )}
                        </div>
                        <span className="zpu-edc-cat">{e.cat}</span>
                        <span className="zpu-edc-name">{e.name}</span>
                        <span className="zpu-edc-detail">{e.detail}</span>
                        <span className="zpu-edc-price">{fmtPrice(e.priceThb, lang)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* PC setup */}
        {ZPU.setup.length > 0 && (
          <section className="zpu-stack-sec">
            <SectionHead title={t("zpuSetupTitle")} sub={t("zpuSetupSub")} />
            <div className="zpu-setup-marquee">
              <div className="zpu-setup-track">
                {[...ZPU.setup, ...ZPU.setup].map((c, i) => (
                  <div key={`${c.name}-${i}`} className="zpu-setup-card" aria-hidden={i >= ZPU.setup.length}>
                    <div className="zpu-setup-img">
                      {c.icon && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.icon} alt={c.name} loading="lazy" />
                      )}
                    </div>
                    <span className="zpu-setup-cat">{c.part}</span>
                    <span className="zpu-setup-model">{c.name}</span>
                    <div className="zpu-setup-prices">
                      <span className="zpu-price-thb">{fmtPrice(c.priceThb, lang)}</span>
                      {c.url && (
                        <a className="zpu-price-view" href={c.url} target="_blank" rel="noreferrer">
                          {t("zpuSetupView")}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="zpu-setup-total">
              <span className="zpu-setup-total-label">{t("zpuSetupTotal")}</span>
              <span className="zpu-setup-total-value">
                {fmtPrice(ZPU.setup.reduce((s, c) => s + c.priceThb, 0), lang)}
              </span>
            </div>
          </section>
        )}

        {/* Gaming gear / peripherals */}
        {ZPU.gear.length > 0 && (
          <section className="zpu-stack-sec">
            <SectionHead title={t("zpuGearTitle")} sub={t("zpuGearSub")} />
            <div className="zpu-setup-marquee">
              <div className="zpu-setup-track">
                {[...ZPU.gear, ...ZPU.gear].map((c, i) => (
                  <div key={`${c.name}-${i}`} className="zpu-setup-card" aria-hidden={i >= ZPU.gear.length}>
                    <div className="zpu-setup-img">
                      {c.icon && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.icon} alt={c.name} loading="lazy" />
                      )}
                    </div>
                    <span className="zpu-setup-cat">{c.part}</span>
                    <span className="zpu-setup-model">{c.name}</span>
                    <div className="zpu-setup-prices">
                      <span className="zpu-price-thb">{fmtPrice(c.priceThb, lang)}</span>
                      {c.url && (
                        <a className="zpu-price-view" href={c.url} target="_blank" rel="noreferrer">
                          {t("zpuSetupView")}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="zpu-setup-total">
              <span className="zpu-setup-total-label">{t("zpuSetupTotal")}</span>
              <span className="zpu-setup-total-value">
                {fmtPrice(ZPU.gear.reduce((s, c) => s + c.priceThb, 0), lang)}
              </span>
            </div>
          </section>
        )}

        {/* Works */}
        <section className="zpu-works" id="zpu-works">
          <SectionHead title={t("zpuWorksTitle")} sub={t("zpuWorksSub")} />
          <div className="zpu-works-grid">
            {(showAllWorks ? ZPU.works : ZPU.works.slice(0, 6)).map((w) => (
              <a key={w.image} href={w.href} className="zpu-work-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="zpu-work-img" src={w.image} alt={w.name} />
                <span className="zpu-work-tag zpu-work-year">{w.year}</span>
                <span className="zpu-work-tag zpu-work-cat">{w.tag}</span>
                <div className="zpu-work-overlay">
                  <span className="zpu-work-name">{w.name}</span>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
        <section className="zpu-connect" id="zpu-connect">
          <SectionHead title={t("zpuConnectTitle")} sub={t("zpuConnectSub")} />
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
                <span className="zpu-social-ico"><PlatformIcon platform={s.platform} /></span>
                <span className="zpu-social-body">
                  <span className="zpu-social-label">{s.label}</span>
                  <span className="zpu-social-handle">{s.handle}</span>
                </span>
                <svg className="zpu-social-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
            ))}
          </div>
        </section>

      </div>
      <SiteFooter />
    </main>
  );
}
