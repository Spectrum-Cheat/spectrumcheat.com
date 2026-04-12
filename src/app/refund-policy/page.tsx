import type { Metadata } from "next";
import { SubpageShell } from "../_components/subpage-shell";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Review the Spectrum Cheat Refund Policy to understand purchase expectations, refund eligibility, dispute handling, and what users should know after completing checkout for Spectrum access.",
};

const sections = [
  {
    title: "1. Digital Product Policy",
    body: [
      "Spectrum Cheat sells digital access, plans, keys, and related service routes. Because these are digital goods and are typically delivered quickly after purchase, all sales are generally treated as final once delivery or activation has started.",
    ],
  },
  {
    title: "2. Cases Where a Refund May Be Considered",
    body: [
      "Refunds are not guaranteed, but Spectrum may review refund requests in limited situations where a purchase clearly failed in a way that could not reasonably be corrected.",
    ],
    bullets: [
      "Duplicate charges for the same purchase.",
      "A successful payment with no delivered access and no workable replacement route.",
      "A billing error clearly caused by the service or checkout flow.",
    ],
  },
  {
    title: "3. Cases That Normally Do Not Qualify",
    body: [
      "The following situations normally do not qualify for a refund once access has been delivered, activated, or made available:",
    ],
    bullets: [
      "You changed your mind after purchase.",
      "You failed to use the service during the active access period.",
      "A game later moved into Waiting for Update or Discontinued status after your purchase.",
      "Your executor, device, Discord account, or local environment prevented proper use.",
      "You were removed or limited due to abuse, redistribution, fraud, or a violation of the Terms of Service.",
      "You did not read the plan description, duration, or listed requirements before checkout.",
    ],
  },
  {
    title: "4. Subscription and Time-Based Access",
    body: [
      "Weekly, monthly, quarterly, and other time-based plans begin when access is delivered or activated. Unused time is not refundable simply because the service was not used during that period.",
      "Temporary maintenance, short downtime, patch work, or route changes do not automatically qualify a purchase for refund treatment.",
    ],
  },
  {
    title: "5. Third-Party Providers",
    body: [
      "Some purchases, unlock routes, or billing actions may involve third-party systems. Those services may apply their own payment, dispute, or review rules in addition to this policy.",
      "Spectrum Cheat is not responsible for delays or limitations created by external providers once a transaction has left the website and entered a third-party system.",
    ],
  },
  {
    title: "6. Chargebacks and Payment Disputes",
    body: [
      "Filing a false or abusive chargeback after successful delivery may result in permanent loss of access, denial of future purchases, and removal from related service channels.",
      "If there is a real issue with a purchase, contact support first and allow a reasonable review period before opening a formal dispute.",
    ],
  },
  {
    title: "7. How to Request Review",
    body: [
      "If you believe your purchase qualifies for review, contact Spectrum through the official Discord or official website routes and include enough information to identify the order and issue.",
    ],
    bullets: [
      "Purchase date and plan name.",
      "Transaction reference or payment proof when available.",
      "A short explanation of what happened.",
      "Any relevant screenshots showing the failed delivery or billing problem.",
    ],
  },
  {
    title: "8. Policy Changes",
    body: [
      "This Refund Policy may be updated from time to time. The version published on this page will control future review requests unless stated otherwise.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <SubpageShell
      badge="Spectrum Cheat // Legal"
      title="Refund Policy"
      subtitle="This policy explains how Spectrum handles refund requests, which cases may be reviewed, and why most delivered digital access purchases are treated as final."
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
