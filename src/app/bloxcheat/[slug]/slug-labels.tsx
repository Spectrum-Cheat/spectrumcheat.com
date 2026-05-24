"use client";

import { useLang } from "../../_i18n/context";

export function LikesCount({ count }: { count: number }) {
  const { t } = useLang();
  return <>{count} {t("detailLikes")}</>;
}

export function DescriptionHeading() {
  const { t } = useLang();
  return <h2 className="sdetail-section-title">{t("detailDesc")}</h2>;
}

export function BadgeLabel({ type }: { type: "key" | "patched" | "universal" | "verified" | "free" }) {
  const { t } = useLang();
  const map = {
    key:       "badgeKeySystem",
    patched:   "badgePatched",
    universal: "badgeUniversal",
    verified:  "badgeVerified",
    free:      "badgeFree",
  } as const;
  return <>{t(map[type])}</>;
}
