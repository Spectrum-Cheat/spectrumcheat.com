"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "../_i18n/context";

export function SiteFooter() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-mark">
              <Image
                src="/images/Spectrum Cheat Logo.png"
                alt="Spectrum Cheat logo"
                width={100}
                height={100}
                className="logo-image"
              />
            </div>
            <span className="brand-name">Spectrum Cheat</span>
            <p className="footer-tagline">{t("footerTagline")}</p>
          </div>

          <div className="footer-links">
            <div className="link-col">
              <h4>{t("footerPlatform")}</h4>
              <ul>
                <li><Link href="/bloxcheat">{t("navBloxCheat")}</Link></li>
                <li><Link href="/scripts">{t("navScripts")}</Link></li>
                <li><Link href="/status">{t("navStatus")}</Link></li>
                <li><Link href="/getkey">{t("navGetKey")}</Link></li>
                <li><Link href="/#executor">{t("navExecutors")}</Link></li>
              </ul>
            </div>
            <div className="link-col">
              <h4>{t("footerLegal")}</h4>
              <ul>
                <li><Link href="/terms">{t("footerTerms")}</Link></li>
                <li><Link href="/privacy">{t("footerPrivacy")}</Link></li>
                <li><Link href="/security">{t("footerSecurity")}</Link></li>
                <li><Link href="/refund-policy">{t("footerRefund")}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t("footerCopyright")}</span>
          <div className="footer-socials">
            <a href="https://www.youtube.com/@xZPUHigh" target="_blank" rel="noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.7V8.3l6.3 3.7-6.3 3.7Z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/zpu.mnn2" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.4c0-.8.2-1.4 1.4-1.4h1.5V5.5c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.6v2.1H8.6V14H11v7h2.5Z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/zpu.mnn2" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.6 1.7a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
              </svg>
            </a>
            <a href="https://github.com/Spectrum-Trash" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2.1 1-2.8-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.8 1 1.7 1 2.8 0 3.9-2.3 4.7-4.5 5 .4.3.8 1 .8 2v3c0 .3.2.7.7.5A10.2 10.2 0 0 0 22 12.3C22 6.6 17.5 2 12 2Z" />
              </svg>
            </a>
            <a href="https://discord.gg/hackerclub" target="_blank" rel="noreferrer" aria-label="Discord">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M20.3 4.4A16.7 16.7 0 0 0 16.2 3l-.2.5c1.5.4 2.2 1 2.2 1a13.4 13.4 0 0 0-8.4 0s.8-.7 2.5-1.1L12 3a16.6 16.6 0 0 0-4.1 1.4C5.3 8.2 4.7 11.9 5 15.6a16.9 16.9 0 0 0 5 2.5l1.2-1.9c-.7-.3-1.3-.6-1.9-1 .2.2 1.6 1.4 5.4 1.4s5.2-1.2 5.4-1.4c-.6.4-1.2.7-1.9 1l1.2 1.9a16.9 16.9 0 0 0 5-2.5c.4-4.3-.7-8-2.1-11.2ZM9.8 13.4c-.8 0-1.5-.8-1.5-1.8s.6-1.8 1.5-1.8c.8 0 1.5.8 1.5 1.8s-.7 1.8-1.5 1.8Zm4.4 0c-.8 0-1.5-.8-1.5-1.8s.6-1.8 1.5-1.8c.8 0 1.5.8 1.5 1.8s-.7 1.8-1.5 1.8Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
