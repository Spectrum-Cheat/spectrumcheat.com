import { SubpageShell } from "../_components/subpage-shell";

export default function RefundPolicyPage() {
  return (
    <SubpageShell
      badge="Spectrum Cheat // Legal"
      title="Refund Policy"
      subtitle="Use this page to explain whether purchases are refundable, how disputes are handled, and what users should expect after checkout."
    >
      <div className="subpage-card">
        <div className="subpage-card-header">
          <h2>Refund Policy Placeholder</h2>
          <span className="subpage-chip">Draft</span>
        </div>
        <p>
          Add your refund terms here when you are ready. This keeps the footer complete without
          leaving dead links behind.
        </p>
      </div>
    </SubpageShell>
  );
}
