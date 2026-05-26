"use client";

import { SubpageShell } from "../_components/subpage-shell";
import { useLang } from "../_i18n/context";
import type { TranslationKey } from "../_i18n/translations";

const keyProviders: { labelKey: TranslationKey; title: string; descKey: TranslationKey; ctaKey: TranslationKey; href: string; active: boolean; logo: string }[] = [
  {
    labelKey: "getkeyRecommended",
    title: "Linkvertise",
    descKey: "getkeyDesc1",
    ctaKey: "getkeyClickHere",
    href: "https://ads.luarmor.net/get_key?for=Spectrum_x_Authentication-RRiWedvutwzg",
    active: true,
    logo: "/images/linkvertise-logo.png",
  },
  {
    labelKey: "getkeyComingSoon",
    title: "Loot Labs",
    descKey: "getkeyDesc2",
    ctaKey: "getkeyComingSoon",
    href: "",
    active: false,
    logo: "/images/lootlabs-logo.png",
  },
  {
    labelKey: "getkeyComingSoon",
    title: "Work.ink",
    descKey: "getkeyDesc3",
    ctaKey: "getkeyComingSoon",
    href: "",
    active: false,
    logo: "/images/workink-logo.png",
  },
];

export default function GetKeyClient() {
  const { t } = useLang();

  return (
    <SubpageShell
      badge={t("getkeyBadge")}
      title={t("getkeyPageTitle")}
      subtitle={t("getkeyPageSub")}
    >
      <div className="key-provider-grid">
        {keyProviders.map((provider) => (
          <article key={provider.title} className={provider.active ? "key-provider-card active" : "key-provider-card"}>
            <span className={provider.active ? "key-provider-badge active" : "key-provider-badge"}>
              {t(provider.labelKey)}
            </span>
            <div className="key-provider-logo" aria-hidden="true">
              <img src={provider.logo} alt="" loading="lazy" />
            </div>
            <h2>{provider.title}</h2>
            <p>{t(provider.descKey)}</p>
            {provider.active ? (
              <a href={provider.href} target="_blank" rel="noreferrer" className="btn-primary btn-large key-provider-cta">
                {t(provider.ctaKey)}
              </a>
            ) : (
              <span className="key-provider-coming">{t(provider.ctaKey)}</span>
            )}
          </article>
        ))}
      </div>
    </SubpageShell>
  );
}
