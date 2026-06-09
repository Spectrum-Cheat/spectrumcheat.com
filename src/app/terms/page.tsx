import type { Metadata } from "next";
import { SubpageShell } from "../_components/subpage-shell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Spectrum Cheat Terms of Service to review access rules, service boundaries, payment expectations, and the responsibilities tied to using the Spectrum platform and its related services.",
  alternates: { canonical: "https://spectrumcheat.com/terms" },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing spectrumcheat.com, purchasing any Spectrum Cheat plan, using any Spectrum loader or key route, or joining any official support channel connected to the service, you agree to be bound by these Terms of Service.",
      "If you do not agree with these terms, you must stop using the website, any related download or access route, and any connected service immediately.",
    ],
  },
  {
    title: "2. Service Description",
    body: [
      "Spectrum Cheat provides digital access to scripts, loaders, status information, key routes, community resources, and related content made available through the website and official channels.",
      "All products sold through Spectrum Cheat are digital services. Access may be provided through third-party checkout systems, key services, external payment pages, Discord, or similar delivery methods connected to the Spectrum platform.",
    ],
  },
  {
    title: "3. Eligibility and Account Responsibility",
    body: [
      "You are responsible for making sure you are legally allowed to access and use the service in your location and under the rules that apply to you.",
      "You are also responsible for maintaining control over your device, executor, Discord account, purchase information, and any other credentials or tools used to access Spectrum services.",
    ],
    bullets: [
      "You may not share purchased access unless a plan explicitly allows it.",
      "You may not resell, mirror, or redistribute Spectrum files, keys, loaders, or protected materials.",
      "You may not impersonate the service, its staff, or its official community channels.",
    ],
  },
  {
    title: "4. Purchases, Billing, and Plan Access",
    body: [
      "All prices, plans, durations, and included benefits are shown at the time of checkout. Plan names, pricing, and available access periods may change at any time without prior notice.",
      "Once payment is successfully completed, access is generally delivered through the active Spectrum flow as shown on the website or through the linked purchase system.",
    ],
    bullets: [
      "Weekly, monthly, quarterly, or other access periods begin at the time the service is delivered or activated.",
      "Failure to use the service during an active access period does not pause, extend, or preserve that access period.",
      "Third-party checkout, key, and link systems may apply their own terms in addition to these terms.",
    ],
  },
  {
    title: "5. Keys, Delivery, and Third-Party Services",
    body: [
      "Spectrum Cheat may rely on third-party services for checkout, payment processing, key generation, traffic routing, link checkpoints, hosting, analytics, or community support.",
      "We are not responsible for outages, delays, platform changes, or account actions caused by third-party providers outside our direct control.",
    ],
    bullets: [
      "A key route being temporarily unavailable does not guarantee a refund if the purchased product itself remains deliverable through a working route.",
      "Third-party providers may request additional steps, checkpoints, or verification before granting access.",
      "You are responsible for following the active instructions shown on the website at the time of use.",
    ],
  },
  {
    title: "6. Status, Updates, and Availability",
    body: [
      "Spectrum Cheat regularly updates supported titles, key routes, and public status information. Some games may be marked as Working, Waiting for Update, or Discontinued at any time.",
      "A listed game, feature, or integration may change status without notice due to compatibility shifts, platform changes, security considerations, or maintenance decisions.",
    ],
    bullets: [
      "No game, feature, or route is guaranteed to remain active forever.",
      "Temporary downtime, maintenance, and patch delays are part of normal digital service operation.",
      "Public roadmap signals, status pages, and Discord announcements are informational and may change as work progresses.",
    ],
  },
  {
    title: "7. Acceptable Use",
    body: [
      "You agree not to use the website or service in any way that damages the platform, harms other users, disrupts infrastructure, abuses support, or attempts to bypass purchase and access controls.",
    ],
    bullets: [
      "Do not reverse engineer, leak, or repackage protected Spectrum materials.",
      "Do not abuse refund systems, payment disputes, or chargeback tools after successful delivery.",
      "Do not attack, flood, scrape, or intentionally degrade the website or connected services.",
      "Do not harass staff, moderators, partners, or community members through support or Discord channels.",
    ],
  },
  {
    title: "8. No Warranty",
    body: [
      "Spectrum Cheat is provided on an 'as available' and 'as is' basis. While we work to keep the service stable, updated, and accessible, we do not guarantee uninterrupted operation, permanent compatibility, or error-free availability.",
      "We do not guarantee that any specific script, route, plan, or game will remain available for any particular length of time.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    body: [
      "To the fullest extent allowed by applicable law, Spectrum Cheat and its operators are not liable for any indirect, incidental, special, or consequential damages arising from use of the website, the purchase flow, the key system, third-party providers, or the service itself.",
      "If liability is ever established, it will be limited to the amount paid by you for the specific product or service directly related to the claim.",
    ],
  },
  {
    title: "10. Suspension and Termination",
    body: [
      "We reserve the right to suspend, restrict, or terminate access to the website, any plan, any key route, or any connected service at our discretion when abuse, fraud, evasion, redistribution, or harmful behavior is detected.",
      "Serious violations may result in permanent loss of access without notice.",
    ],
  },
  {
    title: "11. Changes to These Terms",
    body: [
      "These terms may be updated from time to time. Updated terms become effective once published on this page unless stated otherwise.",
      "By continuing to use the website or service after changes are posted, you agree to the revised version.",
    ],
  },
  {
    title: "12. Contact",
    body: [
      "If you need help with service-related questions, purchase issues, or legal page clarification, contact Spectrum Cheat through the official website routes or the official Discord server linked on spectrumcheat.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <SubpageShell
      badge="Spectrum Cheat // Legal"
      title="Terms of Service"
      subtitle="These terms explain how Spectrum access works, what users can expect from the service, and the rules that apply when using the website, key routes, and related purchase flows."
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
