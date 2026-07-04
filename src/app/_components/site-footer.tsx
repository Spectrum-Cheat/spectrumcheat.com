"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "../_i18n/context";

const team = [
  { name: "xZPUHigh", role: "Owner / Founder / Developer (CEO)", avatar: "/images/ZPU.jpg" },
  { name: "Sentity", role: "Co-Founder", avatar: "/images/sentity.jpg" },
  { name: "Mods HD", role: "Manager", avatar: "/images/modshd.png" },
  { name: "zWraith", role: "Moderator", avatar: "/images/zwraith.png" },
];

export function SiteFooter() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-mark">
              <Image
                src="/images/Spectrum Icon.png"
                alt="Spectrum Cheat logo"
                width={100}
                height={100}
                className="logo-image"
              />
            </div>
            <span className="brand-name">Spectrum Cheat</span>
            <p className="footer-tagline">{t("footerTagline")}</p>
            <div className="team-badge">
              <div className="team-badge-avatars">
                {team.map((m) => (
                  <span key={m.name} className="team-av-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.avatar} alt={m.name} className="team-av" loading="lazy" />
                    <span className="team-tip">
                      <strong>{m.name}</strong>
                      <span className="team-tip-role">{m.role}</span>
                    </span>
                  </span>
                ))}
              </div>
              <span className="team-label">{t("heroSocialProof")}</span>
            </div>
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
            <div className="link-col">
              <h4>{t("footerFaq")}</h4>
              <ul>
                <li><Link href="/#faq">{t("footerFaqPage")}</Link></li>
                <li><Link href="/zpu">{t("footerWhoIsZpu")}</Link></li>
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
                <path fill="currentColor" d="M22 12C22 6.47714 17.5229 1.99999 12 1.99999C6.47715 1.99999 2 6.47714 2 12C2 16.9913 5.65686 21.1283 10.4375 21.8785V14.8906H7.89844V12H10.4375V9.79687C10.4375 7.29062 11.9304 5.90624 14.2146 5.90624C15.3087 5.90624 16.4531 6.10155 16.4531 6.10155V8.56249H15.1921C13.9499 8.56249 13.5625 9.33333 13.5625 10.1242V12H16.3359L15.8926 14.8906H13.5625V21.8785C18.3431 21.1283 22 16.9913 22 12Z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/zpu.mnn2" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm10.6 1.7a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
              </svg>
            </a>
            <a href="https://github.com/Spectrum-Cheat" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2.1 1-2.8-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.5 9.5 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.8 1 1.7 1 2.8 0 3.9-2.3 4.7-4.5 5 .4.3.8 1 .8 2v3c0 .3.2.7.7.5A10.2 10.2 0 0 0 22 12.3C22 6.6 17.5 2 12 2Z" />
              </svg>
            </a>
            <a href="https://discord.gg/hackerclub" target="_blank" rel="noreferrer" aria-label="Discord">
              <svg viewBox="0 -28.5 256 256" aria-hidden="true">
                <path fill="currentColor" d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
