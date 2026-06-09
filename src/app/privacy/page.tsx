import type { Metadata } from "next";
import { SubpageShell } from "../_components/subpage-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Review the Spectrum Cheat Privacy Policy to understand what information may be collected, how it is stored, how it is used, and how users can contact Spectrum regarding privacy-related questions or requests.",
  alternates: { canonical: "https://spectrumcheat.com/privacy" },
};

const sections = [
  {
    title: "1. Overview",
    body: [
      "This Privacy Policy explains how Spectrum Cheat may collect, use, store, and protect information when you visit spectrumcheat.com, use related purchase flows, access key routes, or interact with official service channels.",
      "By using the website or connected services, you agree to the data practices described in this policy.",
    ],
  },
  {
    title: "2. Information We May Collect",
    body: [
      "Depending on how you use the service, Spectrum Cheat may collect information directly from you or through connected third-party platforms.",
    ],
    bullets: [
      "Basic contact or support information you provide through Discord or other support channels.",
      "Purchase-related information such as plan selection, transaction references, delivery status, or access timing.",
      "Technical information such as browser type, device type, IP address, referral path, timestamps, or pages visited.",
      "Key-route and access-flow information needed to verify eligibility or reduce abuse.",
    ],
  },
  {
    title: "3. How Information Is Used",
    body: [
      "Spectrum Cheat uses collected information only for legitimate service operation, support, security, and improvement purposes.",
    ],
    bullets: [
      "To provide access to purchased plans or digital services.",
      "To respond to support questions and user requests.",
      "To detect abuse, fraud, duplicate access, chargeback misuse, or suspicious behavior.",
      "To monitor website performance, route health, and service reliability.",
      "To improve the overall user experience across the site and connected access flows.",
    ],
  },
  {
    title: "4. Third-Party Services",
    body: [
      "Spectrum Cheat may use third-party providers for hosting, checkout, payment processing, key delivery, shortlink routing, analytics, communication, and community management.",
      "Those providers may collect and process information under their own terms and privacy policies. Spectrum Cheat does not control every data practice used by third-party services.",
    ],
  },
  {
    title: "5. Cookies and Technical Signals",
    body: [
      "The website and connected services may use cookies, browser storage, referral data, and similar technical signals to keep sessions stable, improve delivery flows, measure traffic, and reduce abusive behavior.",
      "If your browser blocks some of these tools, certain areas of the service may not work as expected.",
    ],
  },
  {
    title: "6. Data Retention",
    body: [
      "Information is retained only for as long as reasonably necessary to operate the service, investigate abuse, resolve disputes, maintain logs, or comply with legal and operational requirements.",
      "Some data may remain in backups, logs, or third-party provider systems for a limited period even after active use ends.",
    ],
  },
  {
    title: "7. Data Sharing",
    body: [
      "Spectrum Cheat does not sell your personal information as a standalone business product.",
      "Information may still be shared when required to process payments, deliver service access, protect the platform, enforce terms, investigate abuse, or comply with legal obligations.",
    ],
  },
  {
    title: "8. Security",
    body: [
      "We use reasonable technical and operational steps to reduce unauthorized access, abuse, and accidental exposure. No internet-based service can guarantee absolute security, but Spectrum Cheat works to protect service-related information with practical safeguards.",
    ],
  },
  {
    title: "9. Your Choices",
    body: [
      "You may limit some browser-based tracking through your own browser settings and may stop using the site at any time.",
      "If you have questions about information connected to a purchase, support request, or access event, contact Spectrum through the official website routes or Discord server.",
    ],
  },
  {
    title: "10. Policy Updates",
    body: [
      "This Privacy Policy may be updated from time to time. The latest version published on this page will control future use of the website and related services unless stated otherwise.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <SubpageShell
      badge="Spectrum Cheat // Legal"
      title="Privacy Policy"
      subtitle="This policy explains what information Spectrum Cheat may collect, how it is used to operate the service, and the practical steps taken to protect access, support, and delivery flows."
    >
      <div className="legal-meta">
        <span className="subpage-chip">Effective April 12, 2026</span>
        <span className="subpage-chip">Spectrum Cheat</span>
      </div>
      <div className="legal-stack">
        {sections.map((section) => (
          <section key={section.title} className="subpage-card legal-card">
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.bullets ? (
              <ul className="legal-list">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </SubpageShell>
  );
}
