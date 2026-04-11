import { SubpageShell } from "../_components/subpage-shell";

const statusHighlights = [
  {
    title: "Driving Empire",
    state: "Working",
    note: "Live now with active script access.",
    image: "https://tr.rbxcdn.com/180DAY-3fd9af34a6e61185a030eb8d936e91ac/256/256/Image/Webp/noFilter",
    href: "https://www.roblox.com/games/3351674303/Driving-Empire-Car-Racing",
  },
  {
    title: "Sailor Piece",
    state: "Working",
    note: "Stable build ready for use.",
    image: "https://tr.rbxcdn.com/180DAY-af4eed326351cb513869c431e3d88787/256/256/Image/Webp/noFilter",
    href: "https://www.roblox.com/games/77747658251236/Sailor-Piece",
  },
  {
    title: "Blox Fruits",
    state: "Waiting for Update",
    note: "Queued for the next refresh cycle.",
    image: "https://tr.rbxcdn.com/180DAY-90afa57850c8c8d1518b398b6c119ee9/256/256/Image/Webp/noFilter",
    href: "https://www.roblox.com/games/2753915549/Blox-Fruits",
  },
  {
    title: "Fisch",
    state: "Waiting for Update",
    note: "Patch support is being rebuilt.",
    image: "https://tr.rbxcdn.com/180DAY-911933467f0dc8e467cf3e305ea78882/256/256/Image/Webp/noFilter",
    href: "https://www.roblox.com/games/16732694052/Fisch",
  },
  {
    title: "Rivals",
    state: "Waiting for Update",
    note: "Compatibility update in progress.",
    image: "https://tr.rbxcdn.com/180DAY-3df3c12313ef02c6656f378f110d72cd/256/256/Image/Webp/noFilter",
    href: "https://www.roblox.com/games/17625359962/RIVALS",
  },
  {
    title: "Bite By Night",
    state: "Waiting for Update",
    note: "Queued for the next compatibility rebuild.",
    image: "https://tr.rbxcdn.com/180DAY-2b392211182b7171397e09caa3be62de/256/256/Image/Webp/noFilter",
    href: "https://www.roblox.com/games/70845479499574/Bite-By-Night",
  },
];

const retiredGames = [
  "99 Nights in the Forest",
  "Adopt Me",
  "All Star Tower Defense",
  "All Star Tower Defense X",
  "Anime Adventures",
  "Anime Champions",
  "Anime Dimensions",
  "Anime Rangers X",
  "Anime Reborns",
  "Anime Vanguards",
  "Arise Crossover",
  "Arsenal",
  "Attack on Titan Revolution",
  "Basketball: Zero",
  "Be a Lucky Block",
  "BedWars",
  "Bee Swarm Simulator",
  "Bizarre Lineage",
  "Blade Ball",
  "Block Spin",
  "Blue Lock: Rivals",
  "Brookhaven RP",
  "Build A Boat For Treasure",
  "Build a Zoo",
  "Dead Rails",
  "Deepwoken",
  "Demon Fall",
  "Doors",
  "Escape Tsunami for Brainrots",
  "Evade",
  "Fish It",
  "Ghoul://RE",
  "Grand Piece Online",
  "Grow a garden",
  "Hunters",
  "Hypershot",
  "JAILBREAK",
  "Jujutsu Shenanigans",
  "King Legacy",
  "Mad City: Chapter 1",
  "Mad City: Chapter 2",
  "Murderer mystery 2",
  "My Restaurant",
  "Natural Disaster Survival",
  "Ninja Legends",
  "Pet Simulator 99",
  "Pet Simulator X",
  "Pets Go",
  "Phantom Forces",
  "Plants VS Brainrots",
  "PLS DONATE",
  "Project Mugetsu",
  "Project Slayers",
  "Shinobi Life",
  "Sol's RNG",
  "Stand Upright: Rebooted",
  "Steal A Brainrot",
  "The Forge",
  "The Mimic",
  "The Strongest Battlegrounds",
  "Toilet Tower Defense",
  "Untitled Boxing Game",
  "Volleyball Legends",
];

export default function StatusPage() {
  return (
    <SubpageShell
      badge="Spectrum Cheat // Live Status"
      title="Status"
      subtitle="A cleaner board for checking what is live now, what is waiting on the next patch, and what has already left the active Spectrum rotation."
    >
      <div className="subpage-grid-cards status-summary-grid">
        <div className="subpage-card status-summary-card working">
          <div className="subpage-card-header">
            <h2>Working</h2>
            <span className="subpage-chip">2</span>
          </div>
          <p>Current live builds that users can launch right now.</p>
        </div>
        <div className="subpage-card status-summary-card waiting">
          <div className="subpage-card-header">
            <h2>Waiting for Update</h2>
            <span className="subpage-chip">4</span>
          </div>
          <p>Games queued for the next compatibility pass and patch cycle.</p>
        </div>
        <div className="subpage-card status-summary-card offline">
          <div className="subpage-card-header">
            <h2>Discontinued</h2>
            <span className="subpage-chip">62</span>
          </div>
          <p>Older catalog entries that no longer sit inside the active Spectrum lineup.</p>
        </div>
      </div>

      <div className="status-highlight-grid">
        {statusHighlights.map((item) => (
          <article key={item.title} className="status-highlight-card">
            <a href={item.href} target="_blank" rel="noreferrer" className="status-highlight-media">
              <img src={item.image} alt={item.title} loading="lazy" />
            </a>
            <div className="status-highlight-body">
              <div className="status-highlight-top">
                <a href={item.href} target="_blank" rel="noreferrer" className="status-highlight-title">
                  {item.title}
                </a>
                <span
                  className={
                    item.state === "Working" ? "status-pill working" : "status-pill waiting"
                  }
                >
                  {item.state}
                </span>
              </div>
              <p>{item.note}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="subpage-card retired-card">
        <div className="subpage-card-header">
          <h2>Discontinued</h2>
          <span className="subpage-chip">62 Games</span>
        </div>
        <div className="retired-list">
          {retiredGames.map((game) => (
            <span key={game} className="retired-pill">
              {game}
            </span>
          ))}
        </div>
      </div>
    </SubpageShell>
  );
}
