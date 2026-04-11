import { SubpageShell } from "../_components/subpage-shell";

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
