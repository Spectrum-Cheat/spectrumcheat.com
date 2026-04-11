import type { Metadata } from "next";
import { SubpageShell } from "../_components/subpage-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Review the Spectrum Cheat Privacy Policy to understand what information may be collected, how it is stored, how it is used, and how users can contact Spectrum regarding privacy-related questions or requests.",
};

export default function PrivacyPage() {
  return (
    <SubpageShell
      badge="Spectrum Cheat // Legal"
      title="Privacy Policy"
      subtitle="This page is ready for your privacy policy. Use it to explain what data you collect, how it is stored, and how users can contact you about privacy requests."
    >
      <div className="subpage-card">
        <div className="subpage-card-header">
          <h2>Privacy Placeholder</h2>
          <span className="subpage-chip">Draft</span>
        </div>
        <p>
          Add your privacy policy here when you are ready. The route exists now so the footer stays
          complete and professional.
        </p>
      </div>
    </SubpageShell>
  );
}
