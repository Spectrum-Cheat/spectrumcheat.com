import type { Metadata } from "next";
import { SubpageShell } from "../_components/subpage-shell";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Read the Spectrum Cheat Security page for platform safety notes, access-flow protections, payment handling guidance, and other security-related details relevant to Spectrum users and account holders.",
};

export default function SecurityPage() {
  return (
    <SubpageShell
      badge="Spectrum Cheat // Legal"
      title="Security"
      subtitle="Use this page to explain your account protection, payment handling, delivery flow, and any security-related notes you want users to see."
    >
      <div className="subpage-card">
        <div className="subpage-card-header">
          <h2>Security Placeholder</h2>
          <span className="subpage-chip">Draft</span>
        </div>
        <p>
          Add your final security notes here later. For now, this route exists so the legal section
          is fully wired up.
        </p>
      </div>
    </SubpageShell>
  );
}
