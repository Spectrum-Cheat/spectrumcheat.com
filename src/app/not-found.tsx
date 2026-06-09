"use client";

import Link from "next/link";
import { MarketingHeader } from "./_components/marketing-header";
import { SiteFooter } from "./_components/site-footer";
import { useLang } from "./_i18n/context";

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
      <MarketingHeader />
      <main className="nf-wrap">
        <div className="nf-code">404</div>
        <h1 className="nf-title">{t("notFoundTitle")}</h1>
        <p className="nf-desc">{t("notFoundDesc")}</p>
        <Link href="/" className="nf-home">{t("notFoundHome")}</Link>
      </main>
      <SiteFooter />
    </>
  );
}
