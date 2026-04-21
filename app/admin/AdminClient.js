"use client";
import { useState } from "react";

const INDUSTRIES = [
  { value: "ecommerce-general",    label: "Ecommerce — General" },
  { value: "ecommerce-fashion",    label: "Ecommerce — Fashion / Apparel" },
  { value: "ecommerce-luxury",     label: "Ecommerce — Luxury / Jewelry" },
  { value: "ecommerce-sports",     label: "Ecommerce — Sports / Outdoor" },
  { value: "saas-b2b",             label: "SaaS — B2B / Mid-Market" },
  { value: "saas-enterprise",      label: "SaaS — Enterprise" },
  { value: "media-publishing",     label: "Media / Publishing" },
  { value: "media-entertainment",  label: "Media / Entertainment / Streaming" },
  { value: "services-home",        label: "Home Services / Contractor" },
  { value: "services-professional",label: "Professional Services / Agency" },
  { value: "services-pe-backed",   label: "PE-Backed Services" },
  { value: "agency-naming",        label: "Agency — Naming / Branding" },
  { value: "agency-marketing",     label: "Agency — Marketing / Creative" },
  { value: "healthcare",           label: "Healthcare / Medical" },
  { value: "pharma",               label: "Pharma / Life Sciences" },
  { value: "fintech",              label: "Fintech / Financial Services" },
  { value: "legal",                label: "Legal / Law Firm" },
  { value: "real-estate",          label: "Real Estate" },
  { value: "automotive",           label: "Automotive" },
  { value: "manufacturing",        label: "Manufacturing / Industrial" },
  { value: "consumer-brand",       label: "Consumer Brand" },
  { value: "nonprofit",            label: "Nonprofit" },
  { value: "education",            label: "Education / EdTech" },
];

const PRIORITIES = [
  { value: "paid-search",  label: "Paid Search (Google/Microsoft)" },
  { value: "paid-social",  label: "Paid Social (Meta/LinkedIn)" },
  { value: "ecommerce",    label: "Ecommerce / Shopping" },
  { value: "lead-gen",     label: "Lead Generation / B2B" },
  { value: "youtube",      label: "YouTube / Programmatic" },
  { value: "cro",          label: "Conversion Rate Optimization" },
  { value: "creative",     label: "Creative Services (AI Video/Statics)" },
  { value: "ai-transform", label: "AI Transformation / Enterprise AI" },
  { value: "seo",          label: "SEO / Answer Engine Optimization" },
  { value: "training",     label: "Training & Consulting" },
];

const CONTENT_FLAGS = [
  { value: "hideStrategyPhase", label: "Hide '6–8 week strategy phase' language — replace with neutral roadmap copy" },
  { value: "emphasizeSpeed",    label: "Emphasize fast onboarding — swap card 04 to 'We Move Fast / Week One' messaging" },
  { value: "appCampaigns",      label: "Highlight iOS/Android app campaign expertise + AppsFlyer & Firebase attribution" },
  { value: "complianceReady",   label: "Show compliance note — for crypto, fintech, or other regulated advertisers" },
];

export default function AdminClient({ prospects, upsertProspect, removeProspect, editSlug }) {
  const [editing, setEditing] = useState(editSlug || null);
  const [showForm, setShowForm] = useState(!!editSlug);

  const editingData = editing ? prospects[editing] : null;
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  function toSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  const [companyVal, setCompanyVal] = useState(editSlug ? (prospects[editSlug]?.company || "") : "");
  const [slugVal, setSlugVal] = useState(editSlug || "");

  function handleCompanyChange(e) {
    setCompanyVal(e.target.value);
    if (!editing) setSlugVal(toSlug(e.target.value));
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fc", fontFamily: "system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#000C5D", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Logo mark */}
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <rect width="17" height="17" fill="#5D30D9"/>
            <rect y="17" width="17" height="17" fill="#ffffff" fillOpacity="0.3"/>
            <rect x="17" width="17" height="17" fill="#E0423E"/>
          </svg>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>AdVenture Media — Prospect Pages</span>
        </div>
        <button
          onClick={() => { setEditing(null); setCompanyVal(""); setSlugVal(""); setShowForm(true); }}
          style={{ background: "#5D30D9", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 100, fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}
        >
          + New Prospect Page
        </button>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>

        {/* Prospect list */}
        {!showForm && (
          <>
            <h2 style={{ color: "#000C5D", fontWeight: 800, fontSize: "1.3rem", marginBottom: 6 }}>Active Prospect Pages</h2>
            <p style={{ color: "#6b7494", marginBottom: 28, fontSize: "0.9rem" }}>
              Each page is auto-customized based on the prospect's industry and what you discussed on the call.
            </p>

            {Object.keys(prospects).length === 0 && (
              <div style={{ background: "#fff", border: "1px solid #dde0f0", borderRadius: 10, padding: "32px", textAlign: "center", color: "#6b7494" }}>
                No prospect pages yet. Click "New Prospect Page" to create your first one.
              </div>
            )}

            {Object.values(prospects).map((p) => (
              <div key={p.slug} style={{ background: "#fff", border: "1px solid #dde0f0", borderRadius: 10, padding: "20px 24px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 800, color: "#000C5D", fontSize: "1rem" }}>{p.name} — {p.company}</div>
                  <div style={{ color: "#6b7494", fontSize: "0.82rem", marginTop: 3 }}>{p.role} &nbsp;·&nbsp; {INDUSTRIES.find(i => i.value === p.industry)?.label || p.industry}</div>
                  {p.callNotes && (
                    <div style={{ color: "#6b7494", fontSize: "0.8rem", marginTop: 6, maxWidth: 500, lineHeight: 1.5, fontStyle: "italic" }}>
                      "{p.callNotes.slice(0, 120)}{p.callNotes.length > 120 ? "..." : ""}"
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                  <a
                    href={`/${p.slug}`}
                    target="_blank"
                    style={{ background: "#000C5D", color: "#fff", textDecoration: "none", padding: "8px 16px", borderRadius: 100, fontWeight: 700, fontSize: "0.8rem" }}
                  >
                    View Page
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${baseUrl}/${p.slug}`);
                      alert(`Copied: ${baseUrl}/${p.slug}`);
                    }}
                    style={{ background: "#eef0f8", color: "#000C5D", border: "1px solid #dde0f0", padding: "8px 14px", borderRadius: 100, fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={() => { setEditing(p.slug); setCompanyVal(p.company); setSlugVal(p.slug); setShowForm(true); }}
                    style={{ background: "#fff", color: "#6b7494", border: "1px solid #dde0f0", padding: "8px 14px", borderRadius: 100, fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Form */}
        {showForm && (
          <div style={{ background: "#fff", border: "1px solid #dde0f0", borderRadius: 12, padding: "36px 40px", maxWidth: 700 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <h2 style={{ color: "#000C5D", fontWeight: 800, fontSize: "1.2rem" }}>
                {editing ? `Edit: ${editingData?.company}` : "New Prospect Page"}
              </h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: "#6b7494", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
            </div>

            <form action={upsertProspect}>
              {/* Hidden password — in production you'd use a session cookie instead */}
              <label style={labelStyle}>Admin Password</label>
              <input name="password" type="password" required placeholder="Your admin password" style={inputStyle} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Prospect Name *</label>
                  <input name="name" type="text" required defaultValue={editingData?.name} placeholder="Bill Smith" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Their Role / Title</label>
                  <input name="role" type="text" defaultValue={editingData?.role} placeholder="CEO" style={inputStyle} />
                </div>
              </div>

              <label style={labelStyle}>Company Name *</label>
              <input
                name="company" type="text" required
                defaultValue={editingData?.company}
                value={companyVal || editingData?.company || ""}
                onChange={handleCompanyChange}
                placeholder="Brand Acumen Studios"
                style={inputStyle}
              />

              <label style={labelStyle}>URL Slug (auto-generated, editable)</label>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span style={{ color: "#6b7494", fontSize: "0.84rem", flexShrink: 0 }}>yourapp.vercel.app/</span>
                <input
                  name="slug" type="text"
                  value={slugVal || editingData?.slug || ""}
                  onChange={(e) => setSlugVal(e.target.value)}
                  placeholder="brand-acumen"
                  style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
                />
              </div>

              <label style={labelStyle}>Industry *</label>
              <select name="industry" required defaultValue={editingData?.industry || ""} style={inputStyle}>
                <option value="" disabled>Select industry...</option>
                {INDUSTRIES.map((i) => (
                  <option key={i.value} value={i.value}>{i.label}</option>
                ))}
              </select>

              <label style={labelStyle}>What they care about (select all that apply)</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                {PRIORITIES.map((p) => (
                  <label key={p.value} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.875rem", color: "#000C5D", cursor: "pointer", padding: "8px 12px", background: "#f7f8fc", border: "1px solid #dde0f0", borderRadius: 8 }}>
                    <input
                      type="checkbox" name="priorities" value={p.value}
                      defaultChecked={editingData?.priorities?.includes(p.value)}
                    />
                    {p.label}
                  </label>
                ))}
              </div>

              <label style={labelStyle}>Call Notes — what you discussed, their goals, pain points</label>
              <textarea
                name="callNotes"
                rows={4}
                defaultValue={editingData?.callNotes}
                placeholder="e.g. Bill wants to target Fortune 1000 companies during naming decisions. Currently relies entirely on referrals. Interested in AI-powered outreach that gets them in the room before the RFP goes out. Budget around $5–10K/month to start."
                style={{ ...inputStyle, resize: "vertical" }}
              />

              <label style={labelStyle}>Content Flags — adjust what appears on the page</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {CONTENT_FLAGS.map((f) => (
                  <label key={f.value} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.875rem", color: "#000C5D", cursor: "pointer", padding: "10px 14px", background: "#f7f8fc", border: "1px solid #dde0f0", borderRadius: 8, lineHeight: 1.5 }}>
                    <input
                      type="checkbox" name="contentFlags" value={f.value}
                      defaultChecked={editingData?.contentFlags?.includes(f.value)}
                      style={{ marginTop: 3, flexShrink: 0 }}
                    />
                    {f.label}
                  </label>
                ))}
              </div>

              <label style={labelStyle}>Custom Hero Message (optional — leave blank for auto-generated)</label>
              <input
                name="heroCustom" type="text"
                defaultValue={editingData?.heroCustom}
                placeholder="e.g. How to get Brand Acumen in front of Fortune 1000 naming decisions at exactly the right moment."
                style={inputStyle}
              />

              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button type="submit" style={{ background: "#5D30D9", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 100, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", flex: 1 }}>
                  {editing ? "Update Page" : "Create Page & Open"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{ background: "#f7f8fc", color: "#6b7494", border: "1px solid #dde0f0", padding: "13px 20px", borderRadius: 100, fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "0.78rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "#6b7494",
  marginBottom: 6,
  marginTop: 0,
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #dde0f0",
  borderRadius: 8,
  fontSize: "0.9rem",
  color: "#000C5D",
  background: "#fff",
  marginBottom: 18,
  outline: "none",
  boxSizing: "border-box",
};
