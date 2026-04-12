import type { Metadata } from "next";
import { SubpageShell } from "../_components/subpage-shell";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Read the Spectrum Cheat Security page for platform safety notes, access-flow protections, payment handling guidance, and other security-related details relevant to Spectrum users and account holders.",
};

const sections = [
  {
    title: "1. Security Approach",
    body: [
      "Spectrum Cheat is designed around practical service protection. We work to keep the website, access routes, and connected delivery flows stable, monitored, and resistant to common abuse patterns.",
      "Security is treated as an ongoing process rather than a one-time setup, which means protection measures may evolve over time without separate notice.",
    ],
  },
  {
    title: "2. Access and Delivery Protection",
    body: [
      "We use controlled access routes, active status tracking, and monitored delivery steps to help keep Spectrum distribution cleaner and more reliable.",
    ],
    bullets: [
      "Key routes may be adjusted, rotated, limited, or replaced when needed.",
      "Some access paths may require third-party verification or checkpoint steps before activation.",
      "Suspicious behavior, repeated abuse, or unusual traffic may result in rate limits, blocks, or additional checks.",
    ],
  },
  {
    title: "3. Payment and Checkout Safety",
    body: [
      "Spectrum Cheat may rely on third-party stores, payment processors, or checkout systems to handle billing. Those providers are responsible for their own payment infrastructure and transaction handling.",
      "We do not publish or intentionally store more payment information than is needed to confirm delivery and support service-related issues.",
    ],
  },
  {
    title: "4. Website and Infrastructure Controls",
    body: [
      "Reasonable security measures may include DNS protection, HTTPS, route isolation, provider-level abuse filtering, platform monitoring, and routine configuration updates when necessary.",
      "Not every protection measure is publicly documented, and some may be changed or tightened without prior notice for security reasons.",
    ],
  },
  {
    title: "5. Account, Device, and User Responsibility",
    body: [
      "Users are responsible for protecting their own Discord account, purchase details, executor environment, browser session, and any device used to access Spectrum services.",
    ],
    bullets: [
      "Do not share keys, access routes, or protected delivery content.",
      "Do not use unofficial mirrors or copied service pages claiming to represent Spectrum.",
      "Report suspicious links, impersonation, or unexpected checkout behavior through official support channels.",
    ],
  },
  {
    title: "6. Incident Response",
    body: [
      "If a delivery path, route, or service layer becomes unstable, Spectrum may temporarily pause or modify access while the issue is investigated.",
      "Where appropriate, status updates may be reflected on the website, through Discord, or through other official communication routes.",
    ],
  },
  {
    title: "7. No Absolute Guarantee",
    body: [
      "Although we work to keep the service protected, no website, network, provider, or digital delivery system can guarantee complete immunity from outages, attacks, misuse, or platform-level changes.",
      "Users should understand that reasonable safeguards reduce risk but do not eliminate it completely.",
    ],
  },
  {
    title: "8. Reporting Security Concerns",
    body: [
      "If you discover a security issue affecting the website, access routes, or purchase flow, report it through the official Spectrum Discord or any official contact route linked on spectrumcheat.com. Please do not publicly disclose active security issues before giving the service a chance to review them.",
    ],
  },
];

export default function SecurityPage() {
  return (
    <SubpageShell
      badge="Spectrum Cheat // Legal"
      title="Security"
      subtitle="This page outlines how Spectrum approaches service protection, access-flow safety, delivery controls, and the shared responsibilities that help keep the platform stable and secure."
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
