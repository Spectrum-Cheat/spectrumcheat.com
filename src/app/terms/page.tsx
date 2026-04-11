import { SubpageShell } from "../_components/subpage-shell";

export default function TermsPage() {
  return (
    <SubpageShell
      badge="Spectrum Cheat // Legal"
      title="Terms of Service"
      subtitle="This page is ready for your final terms. Use it to define access rules, service boundaries, payment behavior, and user responsibilities."
    >
      <div className="subpage-card">
        <div className="subpage-card-header">
          <h2>Terms Placeholder</h2>
          <span className="subpage-chip">Draft</span>
        </div>
        <p>
          Add your official terms here when you are ready. This page is live as a placeholder so
          the footer links already work cleanly.
        </p>
      </div>
    </SubpageShell>
  );
}
