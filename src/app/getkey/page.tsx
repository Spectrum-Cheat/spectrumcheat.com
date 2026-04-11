import { SubpageShell } from "../_components/subpage-shell";

const keyProviders = [
  {
    label: "Recommended",
    title: "Linkvertise",
    description: "Run through the main unlock route and pull your active Spectrum key right away.",
    cta: "Click Here",
    href: "https://ads.luarmor.net/get_key?for=Spectrum_x_Authentication-RRiWedvutwzg",
    active: true,
    accent: "primary",
    logo: "https://s3-eu-west-1.amazonaws.com/tpd/logos/5fada0839a033e00010810e6/0x0.png",
  },
  {
    label: "Coming Soon",
    title: "Loot Labs",
    description: "A second unlock route is planned here once the extra provider is ready to ship.",
    cta: "Coming Soon",
    href: "",
    active: false,
    accent: "secondary",
    logo: "https://img2.pic.in.th/lootlabs-removebg-preview.png",
  },
  {
    label: "Coming Soon",
    title: "Work.ink",
    description: "A backup key route will open here later as the Spectrum access system expands.",
    cta: "Coming Soon",
    href: "",
    active: false,
    accent: "secondary",
    logo: "https://s3-eu-west-1.amazonaws.com/tpd/logos/60f32c3fa0f0500001ab7c87/0x0.png",
  },
];

export default function GetKeyPage() {
  return (
    <SubpageShell
      badge="Spectrum Cheat // Access Key"
      title="Get Key"
      subtitle="Pick your unlock route below. Linkvertise is live now, while the extra providers stay on standby for the next expansion."
    >
      <div className="key-provider-grid">
        {keyProviders.map((provider) => (
          <article
            key={provider.title}
            className={provider.active ? "key-provider-card active" : "key-provider-card"}
          >
            <span className={provider.active ? "key-provider-badge active" : "key-provider-badge"}>
              {provider.label}
            </span>
            <div className="key-provider-logo" aria-hidden="true">
              <img src={provider.logo} alt="" loading="lazy" />
            </div>
            <h2>{provider.title}</h2>
            <p>{provider.description}</p>
            {provider.active ? (
              <a
                href={provider.href}
                target="_blank"
                rel="noreferrer"
                className="btn-primary btn-large key-provider-cta"
              >
                {provider.cta}
              </a>
            ) : (
              <span className="key-provider-coming">{provider.cta}</span>
            )}
          </article>
        ))}
      </div>
    </SubpageShell>
  );
}
