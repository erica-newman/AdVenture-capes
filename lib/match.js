import { CASE_STUDIES, INDUSTRY_TAG_MAP } from "./case-studies.js";

/**
 * Returns the top N case studies for a given prospect config.
 * Scoring: tag overlap between prospect's industry+priorities and each case study's tags.
 */
export function matchCaseStudies(prospect, count = 6) {
  const industryTags = INDUSTRY_TAG_MAP[prospect.industry] || [];
  const priorityTags = prospect.priorities || [];
  const allTags = [...new Set([...industryTags, ...priorityTags])];

  const scored = CASE_STUDIES.map((cs) => {
    const overlap = cs.tags.filter((t) => allTags.includes(t)).length;
    // Bonus: exact industry cluster match
    const bonus = industryTags.some((t) => cs.tags.includes(t)) ? 2 : 0;
    return { ...cs, score: overlap + bonus };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

/**
 * Returns service sections to highlight based on prospect priorities.
 */
export function getHighlightedServices(priorities = []) {
  const map = {
    "paid-search":   "Paid Search",
    "paid-social":   "Paid Social",
    "ecommerce":     "Ecommerce & Shopping",
    "lead-gen":      "Lead Generation & B2B",
    "youtube":       "Programmatic & YouTube",
    "cro":           "Conversion Rate Optimization",
    "creative":      "Creative Services",
    "ai-transform":  "AI Transformation",
    "seo":           "SEO & AEO",
    "training":      "Training & Consulting",
  };
  return priorities.map((p) => map[p]).filter(Boolean);
}

/**
 * Generates a personalized hero subheading based on prospect data.
 */
export function buildHeroSubheading(prospect) {
  if (prospect.heroCustom) return prospect.heroCustom;

  const industryLines = {
    "saas-b2b":             "We specialize in turning complex B2B buying cycles into predictable pipeline — SQL-focused strategy, CRM integration, and account-based targeting.",
    "saas-enterprise":      "We build enterprise demand generation that fills your pipeline with buyers who are actually ready to evaluate — not just download a PDF.",
    "ecommerce-general":    "We run ecommerce campaigns built around true profitability — LTV, margin, and ROAS that makes sense for your business, not just vanity metrics.",
    "ecommerce-fashion":    "We scale fashion and DTC brands with data-driven creative, audience-first Meta strategy, and Google Shopping architecture built for profitability.",
    "ecommerce-luxury":     "We build luxury brand campaigns that convert without compromising brand equity — paid media precision at the standard your customers expect.",
    "media-publishing":     "We drive subscriber and audience growth for media brands where every incremental gain requires precision strategy and tight creative.",
    "services-home":        "We fill the calendar for home services businesses — more bookings, lower cost per job, and campaign architecture built for multi-location growth.",
    "services-pe-backed":   "We apply a PE-grade growth playbook across paid channels — scalable campaign architecture, clear attribution, and reporting built for investors.",
    "healthcare":           "We specialize in compliant, performance-driven campaigns for healthcare organizations — patient acquisition, provider outreach, and brand awareness.",
    "agency-naming":        "We help professional service firms reach the right decision-makers at exactly the right moment — before the RFP goes out, not after.",
    "services-professional":"We build B2B lead generation strategies that fill your pipeline with high-value prospects — not just clicks from people who will never buy.",
    "fintech":              "We run fintech advertising that navigates platform restrictions and compliance requirements while still driving qualified pipeline.",
    "real-estate":          "We drive qualified buyer and seller leads for real estate businesses — hyperlocal targeting, strong creative, and campaigns built for your market.",
    "consumer-brand":       "We build consumer brand campaigns that grow revenue through AI-native creative, precise audience targeting, and ROAS-focused media buying.",
  };

  return (
    industryLines[prospect.industry] ||
    "AdVenture Media is a full-service paid media, creative production, and AI transformation agency built around one obsession: making every dollar you spend work harder."
  );
}
