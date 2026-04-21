import { notFound } from "next/navigation";
import { getProspect } from "../../lib/storage.js";
import { matchCaseStudies, getHighlightedServices, buildHeroSubheading } from "../../lib/match.js";

export async function generateMetadata({ params }) {
  const prospect = await getProspect(params.slug);
  if (!prospect) return { title: "AdVenture Media" };
  return { title: `AdVenture Media — Built for ${prospect.company}` };
}

export default async function ProspectPage({ params }) {
  const prospect = await getProspect(params.slug);
  if (!prospect) notFound();

  const caseStudies = matchCaseStudies(prospect, 6);
  const highlightedServices = getHighlightedServices(prospect.priorities);
  const heroSub = buildHeroSubheading(prospect);

  return (
    <>
      <style>{CSS}</style>
      <Nav />
      {prospect.callNotes && <ProspectBanner prospect={prospect} />}
      <Hero prospect={prospect} heroSub={heroSub} />
      <About />
      <Services highlighted={highlightedServices} />
      <Creative />
      <AiTransformation />
      <WhyUs />
      <CaseStudies studies={caseStudies} />
      <Clients />
      <Testimonials />
      <Awards />
      <Cta prospect={prospect} />
      <Footer />
    </>
  );
}

/* =============================================
   LOGO SVG (shared)
============================================= */
function LogoMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <rect width="17" height="17" fill="#5D30D9"/>
      <rect y="17" width="17" height="17" fill="#000000"/>
      <rect x="17" width="17" height="17" fill="#E0423E"/>
    </svg>
  );
}

function LogoFull({ dark = true }) {
  const textColor = dark ? "#000C5D" : "rgba(255,255,255,0.6)";
  return (
    <svg width="178" height="34" viewBox="0 0 178 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="17" height="17" fill="#5D30D9"/>
      <rect y="17" width="17" height="17" fill={dark ? "#000000" : "#ffffff"}/>
      <rect x="17" width="17" height="17" fill="#E0423E"/>
      <path d="M44.756 26H48.256L49.824 21.044H57.468L59.064 26H62.928L56.32 5.98H51.448L44.756 26ZM53.66 9.032L56.6 18.328H50.692L53.66 9.032ZM69.7981 26.28C71.9541 26.28 73.8301 24.992 74.6141 23.536V26H78.0021V4.58H74.6141V13.596C73.8021 12.14 72.3181 11.048 69.9381 11.048C66.1301 11.048 63.3581 14.016 63.3581 18.692V18.916C63.3581 23.676 66.1301 26.28 69.7981 26.28ZM70.6381 23.592C68.4541 23.592 66.8301 22.052 66.8301 18.832V18.608C66.8301 15.444 68.2861 13.708 70.7781 13.708C73.2421 13.708 74.7261 15.304 74.7261 18.524V18.748C74.7261 22.024 72.9901 23.592 70.6381 23.592ZM86.2848 26H90.5968L97.3728 5.98H93.8728L88.6368 22.22L83.4288 5.98H79.5368L86.2848 26ZM103.51 26.28C107.262 26.28 109.754 24.6 110.23 21.52H106.954C106.702 22.948 105.638 23.76 103.594 23.76C101.074 23.76 99.6741 22.192 99.5621 19.42H110.286V18.44C110.286 13.204 107.01 11.048 103.37 11.048C99.1981 11.048 96.0901 14.072 96.0901 18.608V18.832C96.0901 23.452 99.1981 26.28 103.51 26.28ZM99.6181 17.152C99.9541 14.884 101.326 13.512 103.37 13.512C105.47 13.512 106.758 14.632 106.926 17.152H99.6181ZM112.192 26H115.58V17.376C115.58 15.052 117.12 13.876 119.024 13.876C121.04 13.876 121.936 14.884 121.936 17.096V26H125.324V16.788C125.324 12.756 123.252 11.048 120.312 11.048C117.904 11.048 116.28 12.252 115.58 13.68V11.356H112.192V26ZM133.091 26.252C134.127 26.252 134.855 26.084 135.387 25.888V23.2C134.911 23.396 134.407 23.48 133.735 23.48C132.671 23.48 132.055 22.892 132.055 21.604V13.904H135.275V11.356H132.055V8.136H128.667V11.356H126.707V13.904H128.667V21.912C128.667 24.684 130.179 26.252 133.091 26.252ZM142.223 26.28C144.603 26.28 146.143 25.132 146.871 23.704V26H150.259V11.356H146.871V20.064C146.871 22.388 145.275 23.564 143.455 23.564C141.495 23.564 140.571 22.556 140.571 20.344V11.356H137.183V20.736C137.183 24.628 139.339 26.28 142.223 26.28ZM153.156 26H156.544V18.384C156.544 15.276 158.336 14.324 161.304 14.296V11.132C158.84 11.16 157.468 12.252 156.544 14.1V11.356H153.156V26ZM169.332 26.28C173.084 26.28 175.576 24.6 176.052 21.52H172.776C172.524 22.948 171.46 23.76 169.416 23.76C166.896 23.76 165.496 22.192 165.384 19.42H176.108V18.44C176.108 13.204 172.832 11.048 169.192 11.048C165.02 11.048 161.912 14.072 161.912 18.608V18.832C161.912 23.452 165.02 26.28 169.332 26.28ZM165.44 17.152C165.776 14.884 167.148 13.512 169.192 13.512C171.292 13.512 172.58 14.632 172.748 17.152H165.44Z" fill={textColor}/>
    </svg>
  );
}

/* =============================================
   PROSPECT BANNER
============================================= */
function ProspectBanner({ prospect }) {
  return (
    <div className="prospect-banner">
      <div className="prospect-banner-inner">
        <div className="prospect-banner-label">Prepared for {prospect.name} — {prospect.company}</div>
        {prospect.callNotes && (
          <div className="prospect-banner-notes">{prospect.callNotes}</div>
        )}
      </div>
    </div>
  );
}

/* =============================================
   NAV
============================================= */
function Nav() {
  return (
    <nav className="nav">
      <div className="nav-logo"><LogoFull dark={true} /></div>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#creative">Creative</a>
        <a href="#ai-transformation">AI</a>
        <a href="#case-studies">Case Studies</a>
        <a href="#clients">Clients</a>
        <a href="#cta" className="nav-cta">Get Started</a>
      </div>
    </nav>
  );
}

/* =============================================
   HERO
============================================= */
function Hero({ prospect, heroSub }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <div className="hero-badge"><span className="badge-dot"></span>Google Premier Partner &nbsp;·&nbsp; Award-Winning Agency</div>
        <h1>Where bleeding-edge AI meets the world's best <em>performance advertising</em> minds.</h1>
        <p className="hero-sub">{heroSub}</p>
        <a href="#case-studies" className="btn btn-primary">See Our Results</a>
        <a href="#services" className="btn btn-outline">Our Services</a>
        <div className="hero-stats">
          <div className="stat-item"><span className="stat-num">500<sup>+</sup></span><span className="stat-label">Clients Served</span></div>
          <div className="stat-item"><span className="stat-num">$0 → $200M</span><span className="stat-label">Revenue Built in 18 Months</span></div>
          <div className="stat-item"><span className="stat-num">87–92%</span><span className="stat-label">Creative Cost Reduction</span></div>
          <div className="stat-item"><span className="stat-num">300K<sup>+</sup></span><span className="stat-label">Academy Students</span></div>
        </div>
      </div>
    </section>
  );
}

/* =============================================
   ABOUT
============================================= */
function About() {
  return (
    <section id="about" className="section bg-offwhite">
      <div className="section-inner">
        <div className="two-col">
          <div className="about-text">
            <p className="section-label">Who We Are</p>
            <h2>We're not a vendor. We're your growth partner.</h2>
            <p>AdVenture Media was founded in 2012 by Isaac Rudansky with a simple belief: that businesses of every size deserve the same caliber of strategy as the world's largest brands. Twelve years later, we manage campaigns for Fortune 500 companies, PE-backed portfolio brands, funded startups, and boutique DTC businesses alike.</p>
            <p>Headquartered in New York (Woodmere, NY), with offices in Philadelphia and Fort Lauderdale, our team of ~57 specialists brings deep expertise across paid media, AI-native creative production, and enterprise AI implementation.</p>
            <p>What sets us apart is what you feel on the first call: we show up having done our homework. Every recommendation is tied to your margins, your seasonality, your competitive landscape. We don't run generic playbooks. We build strategy around your business.</p>
            <p><strong>Our approach to strategy:</strong> Most engagements begin with a dedicated strategy phase — typically 6–8 weeks — before any management begins. We audit your current state, map your competitive landscape, define your unit economics, and deliver a custom roadmap. You own it whether you work with us long-term or not.</p>
            <p><strong>Our approach to AI:</strong> We've built proprietary AI systems on top of the ad platforms. Our Trigger Intelligence System identifies high-intent prospects at the exact moment they're ready to act. Our AI creative pipeline generates, tests, and iterates ads at a speed no traditional agency can match. AI handles the volume; our strategists handle the judgment.</p>
            <h3 className="values-heading">Our Five Core Values</h3>
            <div className="values-grid">
              {["Curiosity","Positive Energy","Intellectual Honesty","Optimistic Thinking"].map(v => (
                <div key={v} className="value-pill">{v}</div>
              ))}
              <div className="value-pill" style={{gridColumn:"1/-1"}}>Humor — We mean it.</div>
            </div>
          </div>
          <div className="about-right">
            {[
              { name:"Isaac Rudansky — Founder", title:"Founder & Chief Strategist", bio:"Master's Degree in Industrial & Organizational Psychology, Hofstra University. Founded AdVenture in 2012 and drove 100%+ YoY growth in its first four years. Author of the #1 bestselling book on digital advertising. Has trained over 200,000 students globally." },
              { name:"Patrick Gilbert — CEO", title:"Chief Executive Officer", bio:"B.S. Marketing, Penn State. Recognized as the world's foremost expert on Google Ads machine learning — his published articles went viral inside Google and led to an invitation to lecture in Dublin, London, New York, and Brazil. Author of Join or Die." },
              { name:"Erica Newman — Senior Account Executive", title:"Sales & Strategy", bio:"Previously climbed the ranks at Omnicom before joining AdVenture. Specializes in translating complex business goals into paid media strategy, with a particular focus on AI-first campaigns for competitive industries." },
            ].map(t => (
              <div key={t.name} className="team-card">
                <div className="team-name">{t.name}</div>
                <div className="team-title">{t.title}</div>
                <div className="team-bio">{t.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================
   SERVICES
============================================= */
function Services({ highlighted }) {
  const groups = [
    {
      label: "Paid Media",
      cards: [
        { color:"purple", title:"Paid Search — Google & Microsoft", desc:"High-intent capture via smart bidding, keyword architecture, and quality score optimization.", tags:["Google Ads","Microsoft/Bing","GLSA","Shopping"] },
        { color:"red",    title:"Paid Social — Meta & LinkedIn",    desc:"Audience-first social advertising. Creative strategy, owned data activation, and ROAS-driven campaigns.", tags:["Meta Ads","LinkedIn","Retargeting","Lookalikes"] },
        { color:"navy",   title:"Ecommerce & Shopping",             desc:"Campaigns designed around LTV, margin, and BFCM spikes. PMax, Dynamic Ads, product feed optimization.", tags:["Google Shopping","PMax","Dynamic Ads","LTV Strategy"] },
        { color:"purple", title:"Lead Generation & B2B",            desc:"SQL-focused campaigns with CRM integration and intent-based bidding. Pipeline, not just volume.", tags:["SQL Optimization","CRM Integration","Account-Based"] },
        { color:"red",    title:"Programmatic & YouTube",           desc:"Full-funnel video and display. YouTube campaigns that drive both awareness and direct response.", tags:["YouTube","Display","Programmatic"] },
        { color:"navy",   title:"Conversion Rate Optimization",     desc:"We build and A/B test landing pages that can 10x conversion rates — turning ad spend into pipeline.", tags:["Landing Pages","A/B Testing","UX"] },
      ],
    },
    {
      label: "Creative & Content",
      cards: [
        { color:"purple", title:"AI-Native Video Production",       desc:"Short-form spots for Meta, YouTube, and CTV — 8–15 variants per concept, produced in days not months.", tags:["Meta Video","YouTube","CTV","UGC"] },
        { color:"red",    title:"Performance Static & Display",     desc:"High-impact static ads engineered for CTR with continuous rotation every 2–4 weeks for high-spend accounts.", tags:["Social Static","Display","DOOH"] },
        { color:"navy",   title:"Custom Music & Sound Design",      desc:"Original audio built for ads — not licensed stock. Custom music and sound tailored to brand and platform.", tags:["Original Music","Voiceover","Sound Design"] },
      ],
    },
    {
      label: "Strategy & AI",
      cards: [
        { color:"purple", title:"AI Transformation & Implementation", desc:"Enterprise AI infrastructure — custom-built agents, dashboards, automations, and workflows. Real tools, real adoption, real ROI.", tags:["Custom AI Agents","Workflow Automation","Change Mgmt"] },
        { color:"red",    title:"SEO & Answer Engine Optimization",   desc:"Paid and organic working as one. SEO strategy paired with AEO to capture AI-driven search.", tags:["SEO","AEO","Content Strategy"] },
        { color:"navy",   title:"Training & Consulting",              desc:"In-house team training and AdVenture Academy — 200+ hours of training used by 300,000 students worldwide.", tags:["Consulting","Team Training","Academy"] },
      ],
    },
  ];

  return (
    <section id="services" className="section bg-white">
      <div className="section-inner">
        <p className="section-label">What We Do</p>
        <h2>Three practice areas. One integrated team.</h2>
        <p className="section-sub">Paid media, creative production, and enterprise AI — each is a standalone practice, each is stronger together.</p>
        {groups.map((g) => (
          <div key={g.label}>
            <div className="service-group-label">{g.label}</div>
            <div className="services-grid">
              {g.cards.map((c) => (
                <div key={c.title} className={`service-card${highlighted.includes(c.title) ? " service-highlighted" : ""}`}>
                  <div className={`service-bar sbar-${c.color}`}></div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="service-tags">
                    {c.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =============================================
   CREATIVE SERVICES
============================================= */
function Creative() {
  return (
    <section id="creative" className="section bg-navy">
      <div className="section-inner">
        <p className="section-label section-label-light">Creative Services</p>
        <h2 className="h2-light">AI-native creative production built for performance.</h2>
        <p className="section-sub section-sub-light">Better ads. Lower cost. Faster turnaround. Higher ROAS. Our creative practice combines a seasoned film and TV director with the most advanced AI production stack available.</p>

        <div className="creative-stats">
          {[
            { num:"87–92%", cls:"purple", label:"Reduction in production costs vs. traditional agency" },
            { num:"3.8–5.2x", cls:"", label:"ROAS increase documented across client base" },
            { num:"$15M", cls:"red", label:"Revenue generated from a $5,500, 48-hour production (Grown Brilliance)" },
          ].map(s => (
            <div key={s.num} className="creative-stat">
              <span className={`creative-stat-num cstat-${s.cls}`}>{s.num}</span>
              <div className="creative-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="creative-layout">
          <div>
            <p className="sub-label-dim">Our Creative Process</p>
            <div className="process-steps">
              {[
                { n:"01", title:"Insight",               desc:"Data analysis via SherpaOS — our proprietary AI platform. We identify creative fatigue, audience gaps, and performance opportunities before a single frame is produced." },
                { n:"02", title:"Ideation",              desc:"Hypothesis-driven creative concepts. Every idea is tied to a performance thesis. We build 8–15 variants per concept for testing." },
                { n:"03", title:"Production",            desc:"Rapid, platform-specific creative using the leading AI generation tools — video, static, audio, UGC-style content. Turnaround in days, not months." },
                { n:"04", title:"Testing & Iteration",   desc:"Real-time performance scoring via SherpaOS. Winning variants scaled, underperformers cut, new hypotheses queued. Continuous rotation every 2–4 weeks for high-spend accounts." },
              ].map(s => (
                <div key={s.n} className="process-step">
                  <div className="step-num">{s.n}</div>
                  <div className="step-content"><h4>{s.title}</h4><p>{s.desc}</p></div>
                </div>
              ))}
            </div>

            <p className="sub-label-dim" style={{marginTop:28}}>Creative Types</p>
            <div className="creative-types-grid">
              {[
                { title:"Video Ads",          sub:"Meta, YouTube, CTV, Programmatic" },
                { title:"Performance Statics",sub:"Social, Display, DOOH" },
                { title:"UGC & Creator Style",sub:"Platform-native formats" },
                { title:"Custom Music",       sub:"Original compositions & sound design" },
                { title:"Storyboarding",      sub:"Concept-to-brief documentation" },
                { title:"Landing Pages",      sub:"CRO-first design & copy" },
              ].map(ct => (
                <div key={ct.title} className="creative-type"><span>{ct.title}</span><small>{ct.sub}</small></div>
              ))}
            </div>
          </div>

          <div className="creative-right">
            <div className="director-card">
              <div className="team-name" style={{color:"#fff"}}>Dave Spector — Creative Director</div>
              <div className="team-title" style={{color:"#f07070"}}>Creative Director</div>
              <div className="team-bio" style={{color:"rgba(255,255,255,0.5)"}}>BFA Film & Television and MPS Interactive Telecommunications Program, NYU. 20+ years in film and TV. 500+ ads produced. Previously: NewYork-Presbyterian, Loeb.nyc. Teaching faculty at NYU and Istanbul Bilgi University. AI integration focus since 2022.</div>
            </div>

            <div className="sherpa-card">
              <h4 style={{color:"#fff",fontWeight:800,marginBottom:6,display:"flex",alignItems:"center",gap:10,fontSize:"0.9rem"}}>
                SherpaOS <span className="sherpa-badge">Proprietary</span>
              </h4>
              <p style={{fontSize:"0.84rem",color:"rgba(255,255,255,0.55)",lineHeight:1.65,marginBottom:14}}>Built on data from hundreds of millions in managed ad spend. Our in-house AI platform powers every stage of the creative process.</p>
              {[
                "Unified creative performance dashboard across Meta, Google, YouTube, and programmatic",
                "Ready-to-execute creative briefs generated from live account data",
                "Creative fatigue and audience gap detection",
                "A/B testing with statistical rigor — not gut feel",
              ].map(f => <div key={f} className="sherpa-feat">{f}</div>)}
            </div>

            <div className="tool-stack">
              <h4 className="tool-stack-label">AI Production Stack</h4>
              <div className="tool-tags">
                {["Gemini","Claude","VEO","Midjourney","Runway","Adobe Firefly","Kling","Pika","Ideogram","Luma AI","ElevenLabs","Suno","Artlist","Higgsfield"].map(t => (
                  <span key={t} className="tool-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================
   AI TRANSFORMATION (no pricing)
============================================= */
function AiTransformation() {
  const pillars = [
    {
      num:"Pillar 01", title:"Onboarding & Training",
      desc:"From AI readiness assessment through hands-on build sessions where participants leave with working outputs — not slide decks.",
      features:["AI readiness assessment & tool selection","Enterprise licensing & setup","Customized curriculum aligned to your workflows","Change management & internal champion development","30-day post-workshop async support"],
    },
    {
      num:"Pillar 02", title:"Custom Builds",
      desc:"We build what gets used. A dashboard nobody opens is worse than no dashboard. Every build is scoped via our Impact vs. Adoption Matrix.",
      features:["Workflow auditing & stakeholder interviews","2–4 week rapid prototyping to functional tool","Custom AI agents trained on your data, tone, & processes","Dashboards, knowledge bases, CRM modules, process automations","Governance tools & documentation"],
    },
    {
      num:"Pillar 03", title:"Ongoing Advisory",
      desc:"Continuous support as your AI infrastructure grows — monitoring, new builds, adoption tracking, and leadership alignment.",
      features:["Weekly or bi-weekly leadership calls","Team breakout sessions","Tool monitoring & maintenance","New build scoping","Adoption tracking & quarterly business reviews"],
    },
  ];

  const useCases = [
    { client:"PE Firm — 100 Employees",  title:"Full three-pillar AI infrastructure buildout",   desc:"Deal screening agents with custom investment thesis training, automated compliance tools, and cross-portfolio reporting dashboards." },
    { client:"Healthcare Network",        title:"HIPAA-compliant AI systems",                       desc:"Clinical note summarization, patient intake automation, and staff training across departments. Built to compliance standards from day one." },
    { client:"Law Firm — 80 Attorneys",  title:"Privilege-aware legal research agents",           desc:"Jurisdiction-aware citations, contract review automation, and knowledge base built on firm precedents. Deployed with full privilege protection." },
    { client:"DTC Brand — $50M Revenue", title:"Shopify + Klaviyo AI integration",               desc:"Customer service AI handling tier-1 inquiries, inventory forecasting with reorder automation, and AI-generated personalized email flows." },
  ];

  const buildSteps = ["Shadow Work","Stakeholder Interviews","Impact Scoring","Rapid Prototyping","User Feedback","Documentation","Deployment"];
  const activeSteps = ["Impact Scoring","Rapid Prototyping"];

  return (
    <section id="ai-transformation" className="section bg-offwhite">
      <div className="section-inner">
        <p className="section-label">AI Transformation Services</p>
        <h2>Enterprise AI infrastructure — real tools, real adoption, real ROI.</h2>
        <p className="section-sub">We build AI systems that actually get used. Not a pitch deck. Not a workshop that ends at theory. Custom agents, dashboards, automations, and workflows built around how your team actually works.</p>

        <div className="ai-pillars">
          {pillars.map(p => (
            <div key={p.num} className="pillar-card">
              <div className="pillar-num">{p.num}</div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
              <div className="pillar-features">
                {p.features.map(f => <div key={f} className="pillar-feat">{f}</div>)}
              </div>
            </div>
          ))}
        </div>

        <div className="two-col" style={{gap:32}}>
          <div>
            <p className="sub-label-muted">Representative Engagements</p>
            <div className="use-cases">
              {useCases.map((u,i) => (
                <div key={u.client} className={`use-case-card${i % 2 === 1 ? " use-case-alt" : ""}`}>
                  <div className="use-case-client">{u.client}</div>
                  <h4 className="use-case-title">{u.title}</h4>
                  <p className="use-case-desc">{u.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            <div className="matrix-card">
              <h3 className="matrix-title">Impact vs. Adoption Matrix</h3>
              <p className="matrix-desc">Before we build anything, every potential project is plotted on two axes: expected business impact and realistic user adoption. We only build in the high/high quadrant — the rest is waste.</p>
              <div className="matrix-grid">
                <div className="matrix-cell highlight">High Impact<br/>High Adoption<span>We build this first</span></div>
                <div className="matrix-cell dim">High Impact<br/>Low Adoption<span>De-risk before building</span></div>
                <div className="matrix-cell dim">Low Impact<br/>High Adoption<span>Nice-to-have later</span></div>
                <div className="matrix-cell dim">Low Impact<br/>Low Adoption<span>Never build this</span></div>
              </div>
              <div className="matrix-axis"><span>Low Impact</span><span>High Impact</span></div>
            </div>

            <div className="build-process">
              <h3 className="build-process-title">Build Process</h3>
              <div className="build-steps">
                {buildSteps.map(s => (
                  <span key={s} className={`build-step${activeSteps.includes(s) ? " build-step-active" : ""}`}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================
   WHY US
============================================= */
function WhyUs() {
  const diffs = [
    { n:"01", title:"AI as Infrastructure, Not a Feature",    body:"We don't just use platform AI — we've built proprietary systems on top of it. SherpaOS powers our creative decisions. Our Trigger Intelligence System identifies prospects at the exact moment they're ready to buy. Custom builds run inside client organizations. AI is in the foundation of everything we do." },
    { n:"02", title:"Profit-First Framework",                 body:"We don't optimize for vanity metrics. Every campaign is built around your actual unit economics — margin, LTV, break-even ROAS. If we can't make your advertising profitable, we'll tell you before we take your money." },
    { n:"03", title:"We Wrote the Book. Literally.",          body:"Our founder authored the #1 bestselling book on digital advertising. Our CEO was invited by Google to lecture in four countries and published Join or Die. We don't just follow best practices — we define them and publish them." },
    { n:"04", title:"Strategy Before Management",             body:"For most engagements, we start with a strategy-only phase (typically 6–8 weeks). You get a custom roadmap built on your business, not a generic onboarding checklist. Management follows strategy — not the other way around." },
    { n:"05", title:"Range Without Compromise",               body:"We work with $1,500/month boutiques and $600,000/month publicly traded companies. That range means our playbooks are tested at every scale. What worked for Grown Brilliance ($0 to $200M in 18 months) informs what we build for a founder launching their first campaign." },
    { n:"06", title:"Relationship Over Retainer",             body:"Clients who've been with us for 5+ years don't stay because of a contract — they stay because we've become part of their team. We're known for intellectual honesty: if something isn't working, we say so." },
  ];
  return (
    <section id="why" className="section bg-navy">
      <div className="section-inner">
        <p className="section-label section-label-light">Why AdVenture</p>
        <h2 className="h2-light">What makes us genuinely different.</h2>
        <p className="section-sub section-sub-light">Every agency says they're data-driven. Here's what that actually means at AdVenture — and why it translates to measurable results.</p>
        <div className="differentiators">
          {diffs.map(d => (
            <div key={d.n} className={`diff-card diff-${parseInt(d.n) % 2 === 1 ? "odd" : "even"}`}>
              <div className="diff-num">{d.n}</div>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================
   CASE STUDIES (dynamically matched)
============================================= */
function CaseStudies({ studies }) {
  return (
    <section id="case-studies" className="section bg-offwhite">
      <div className="section-inner">
        <p className="section-label">Proof of Work</p>
        <h2>Results we've built for businesses like yours.</h2>
        <p className="section-sub">Case studies selected based on your industry and what we discussed on our call.</p>
        <div className="cs-grid">
          {studies.map((cs, i) => (
            <div key={cs.id} className="cs-card">
              <div className="cs-header">
                <span className="cs-client">{cs.client}</span>
                <span className="cs-industry">{cs.industry}</span>
              </div>
              <h3 className="cs-headline">{cs.headline}</h3>
              {cs.desc && <p className="cs-desc">{cs.desc}</p>}
              {cs.quote && (
                <p className="cs-quote">"{cs.quote.text}" — {cs.quote.author}, {cs.quote.role}</p>
              )}
              <div className="cs-result-block">
                <div className={`cs-result cs-result-${i % 3 === 0 ? "purple" : i % 3 === 1 ? "red" : "navy"}`}>{cs.result}</div>
                <div className="cs-result-label">{cs.resultLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================
   CLIENTS
============================================= */
function Clients() {
  const enterprise = ["AMC Networks","Forbes","Nasdaq","Sennheiser","Hanes","AstraZeneca","Alludo","KKR","Sports Illustrated"];
  const growth = ["Grown Brilliance","Slinger Bag","Michael Aram","TurnPoint Services","AudioEye","Quantum Workplace","Lemonlight","Adrianna Papell","San Diego Hat Company","Jacquie Aiche","WoodSpoon","MyWallSt","Panoramic Doors","Battle Born Batteries","Prep Expert","TaxJar","Diggerland USA","RiverSpring Living","GlobalTranz","Luma Health","Jive Software","CanvasPrints.com","TekBrands","Shine A Light","Kars4Kids","Soundstripe","Pictureframes.com"];
  return (
    <section id="clients" className="section bg-white">
      <div className="section-inner">
        <p className="section-label">Who We've Worked With</p>
        <h2>Trusted by brands at every stage — from Series A to S&amp;P 500.</h2>
        <p className="clients-intro">Our client roster spans publicly traded companies, PE-backed portfolio brands, and high-growth startups. Our clients spend anywhere from $1,500 to $600,000 per month on paid media.</p>
        <div className="client-section-label">Enterprise &amp; Publicly Traded</div>
        <div className="client-logos">{enterprise.map(c => <div key={c} className="client-logo featured">{c}</div>)}</div>
        <div className="client-section-label">Growth &amp; Mid-Market</div>
        <div className="client-logos">{growth.map(c => <div key={c} className="client-logo">{c}</div>)}</div>
        <div className="spend-note"><strong>Ad budgets we manage:</strong> From $1,500/month boutiques to $600,000/month enterprise accounts. Our approach scales to every stage — we're not a fit for everyone, but we've been the right fit for 500+.</div>
      </div>
    </section>
  );
}

/* =============================================
   TESTIMONIALS
============================================= */
function Testimonials() {
  const quotes = [
    { q:"128% average increase in revenue within 2 months of working with AdVenture Media Group. My ads are performing way beyond my expectations.", name:"Danny Payne", role:"CEO — Orbital Computers" },
    { q:"Increased our ROAS by +70% YoY while increasing volume nearly 300%. They are quite simply the best PPC agency I've come across in 11 years in ecommerce.", name:"Eileen Dawson", role:"CMO — Vital Source" },
    { q:"Best agency I have worked with, hands down. Their SaaS expertise and solid execution set them completely apart from other agencies I've tried.", name:"Chris Frank", role:"Director of Demand Gen — TaxJar" },
    { q:"Totally turned around our PPC and conversion rates. They dove into our business, understood our customers, and then executed flawlessly.", name:"Ruth Hearn", role:"Director of Ecommerce — Charles & Colvard" },
    { q:"Dramatically improved our paid digital efforts across PPC, GLSA, and Meta. They're genuinely invested in our growth — not just managing a budget.", name:"Courtney West", role:"Growth Marketing Manager — TurnPoint Services" },
    { q:"They've been one of the best decisions we've ever made for our business. The results speak for themselves, but it's the partnership that keeps us here.", name:"Jon Brustol", role:"Owner — Norse Painting" },
  ];
  return (
    <section id="testimonials" className="section bg-offwhite">
      <div className="section-inner">
        <p className="section-label">What Clients Say</p>
        <h2>In their words.</h2>
        <p className="section-sub">These aren't cherry-picked snippets. Our Clutch profile has 93+ verified reviews.</p>
        <div className="testimonials-grid">
          {quotes.map(q => (
            <div key={q.name} className="testimonial-card">
              <div className="t-mark">"</div>
              <p className="t-quote">{q.q}</p>
              <div className="t-author"><div className="t-name">{q.name}</div><div className="t-role">{q.role}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================
   AWARDS
============================================= */
function Awards() {
  const awards = [
    { title:"Shorty Awards",           desc:"First Place — Social Activation (2021)" },
    { title:"Netty Awards",            desc:"First Place — Best Digital Campaign" },
    { title:"Clutch 1000",             desc:"Global Leader Designation · 93+ Verified Reviews" },
    { title:"Google Premier Partner",  desc:"Selected to train other Google partners globally" },
    { title:"New York Festivals",      desc:"Shortlisted — Slinger Bag Campaign" },
    { title:"Expertise.com",           desc:"Top 32 Advertising Agencies in NYC" },
    { title:"#1 Bestselling Book",     desc:"Digital Advertising — by Isaac Rudansky" },
    { title:"300K+ Academy Students",  desc:"Most popular paid media training in the world" },
  ];
  return (
    <section id="awards" className="section bg-white">
      <div className="section-inner">
        <p className="section-label">Recognition</p>
        <h2>Awards &amp; credentials that matter.</h2>
        <br />
        <div className="awards-grid">
          {awards.map((a,i) => (
            <div key={a.title} className="award-card">
              <div className={`award-accent aa-${i % 2 === 0 ? "purple" : "red"}`}></div>
              <h4>{a.title}</h4>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================
   CTA
============================================= */
function Cta({ prospect }) {
  return (
    <section id="cta" className="section bg-navy cta-section">
      <div className="cta-inner">
        <p className="section-label section-label-light" style={{textAlign:"center"}}>Let's Talk</p>
        <h2 className="h2-light" style={{textAlign:"center"}}>Ready to see what's possible{prospect ? ` for ${prospect.company}` : ""}?</h2>
        <p className="cta-sub">We start every engagement with a strategy conversation — no pitch decks, no generic proposals. Just an honest assessment of where you are today and where you could go.</p>
        <a href="mailto:erica@adventureppc.com" className="btn btn-primary">Get in Touch</a>
        <a href="https://www.adventureppc.com" className="btn btn-dark-outline" target="_blank" rel="noopener noreferrer">Visit adventureppc.com</a>
      </div>
    </section>
  );
}

/* =============================================
   FOOTER
============================================= */
function Footer() {
  return (
    <footer className="footer">
      <LogoFull dark={false} />
      <div className="footer-info">1074 Broadway, Woodmere, NY 11598 · erica@adventureppc.com</div>
      <div className="footer-links">
        <a href="https://www.adventureppc.com" target="_blank" rel="noopener noreferrer">Website</a>
        <a href="https://adventuremedia.ai" target="_blank" rel="noopener noreferrer">adventuremedia.ai</a>
        <a href="https://clutch.co/profile/adventure-media-0" target="_blank" rel="noopener noreferrer">Clutch Reviews</a>
        <a href="https://www.linkedin.com/company/adventure-media-group-llc" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </footer>
  );
}

/* =============================================
   CSS (all styles inlined for portability)
============================================= */
const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  :root {
    --navy:#000C5D; --purple:#5D30D9; --purple-lt:#7448f0;
    --red:#E0423E; --white:#fff; --off:#f7f8fc;
    --gray-lt:#eef0f8; --gray:#c4c9e2; --muted:#6b7494;
    --border:#dde0f0; --r:10px;
  }
  body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background:#fff; color:var(--navy); line-height:1.6; }

  /* prospect banner */
  .prospect-banner { background: rgba(93,48,217,0.08); border-bottom: 2px solid var(--purple); padding: 14px 48px; }
  .prospect-banner-inner { max-width: 1100px; margin: 0 auto; }
  .prospect-banner-label { font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: var(--purple); margin-bottom: 4px; }
  .prospect-banner-notes { font-size: 0.875rem; color: var(--muted); line-height: 1.6; max-width: 800px; }

  /* nav */
  .nav { position:sticky; top:0; z-index:100; background:rgba(255,255,255,0.97); backdrop-filter:blur(8px); border-bottom:1px solid var(--border); padding:0 48px; display:flex; align-items:center; justify-content:space-between; height:68px; }
  .nav-logo svg { height:28px; width:auto; }
  .nav-links { display:flex; gap:24px; align-items:center; }
  .nav-links a { color:var(--muted); text-decoration:none; font-size:0.84rem; font-weight:500; transition:color 0.15s; }
  .nav-links a:hover { color:var(--navy); }
  .nav-cta { background:var(--purple); color:#fff !important; padding:8px 20px; border-radius:100px; font-weight:600 !important; font-size:0.8rem !important; }
  .nav-cta:hover { background:var(--purple-lt) !important; }

  /* hero */
  .hero { background:var(--navy); padding:100px 48px 80px; position:relative; overflow:hidden; }
  .hero::after { content:''; position:absolute; right:-120px; top:-80px; width:600px; height:600px; border-radius:50%; background:radial-gradient(circle,rgba(93,48,217,0.25) 0%,transparent 70%); pointer-events:none; }
  .hero::before { content:''; position:absolute; left:-80px; bottom:-100px; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle,rgba(224,66,62,0.12) 0%,transparent 70%); pointer-events:none; }
  .hero-inner { max-width:1100px; margin:0 auto; position:relative; z-index:1; }
  .hero-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(93,48,217,0.18); border:1px solid rgba(93,48,217,0.35); border-radius:100px; padding:5px 16px; font-size:0.75rem; font-weight:700; color:#a98af5; letter-spacing:0.8px; text-transform:uppercase; margin-bottom:32px; }
  .badge-dot { width:6px; height:6px; border-radius:50%; background:#a98af5; display:inline-block; }
  h1 { font-size:clamp(2.4rem,4.5vw,3.8rem); font-weight:800; line-height:1.12; letter-spacing:-1.5px; color:#fff; margin-bottom:24px; max-width:780px; }
  h1 em { font-style:normal; color:#a98af5; }
  .hero-sub { font-size:1.1rem; color:rgba(255,255,255,0.62); max-width:580px; margin-bottom:44px; line-height:1.75; }
  .btn { display:inline-block; font-weight:700; font-size:0.9rem; padding:13px 30px; border-radius:100px; text-decoration:none; transition:all 0.2s; letter-spacing:0.1px; }
  .btn-primary { background:var(--purple); color:#fff; }
  .btn-primary:hover { background:var(--purple-lt); transform:translateY(-1px); }
  .btn-outline { background:transparent; border:1.5px solid rgba(255,255,255,0.25); color:rgba(255,255,255,0.85); margin-left:12px; }
  .btn-outline:hover { border-color:rgba(255,255,255,0.5); color:#fff; }
  .btn-dark-outline { background:transparent; border:1.5px solid rgba(255,255,255,0.2); color:rgba(255,255,255,0.75); margin-left:12px; }
  .btn-dark-outline:hover { border-color:rgba(255,255,255,0.4); color:#fff; }
  .hero-stats { display:flex; gap:56px; flex-wrap:wrap; margin-top:72px; padding-top:40px; border-top:1px solid rgba(255,255,255,0.1); }
  .stat-item { text-align:left; }
  .stat-num { font-size:2.1rem; font-weight:800; color:#fff; display:block; letter-spacing:-0.5px; line-height:1; }
  .stat-num sup { font-size:1rem; color:var(--purple); vertical-align:super; }
  .stat-label { font-size:0.78rem; color:rgba(255,255,255,0.45); text-transform:uppercase; letter-spacing:0.6px; font-weight:500; margin-top:5px; }

  /* shared section */
  .section { padding:96px 48px; }
  .section-inner { max-width:1100px; margin:0 auto; }
  .bg-white { background:#fff; }
  .bg-offwhite { background:var(--off); }
  .bg-navy { background:var(--navy); }
  .section-label { font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:2px; color:var(--purple); margin-bottom:10px; }
  .section-label-light { color:#a98af5; }
  h2 { font-size:clamp(1.8rem,3vw,2.5rem); font-weight:800; color:var(--navy); letter-spacing:-0.8px; line-height:1.2; margin-bottom:14px; }
  .h2-light { color:#fff; }
  .section-sub { font-size:1.05rem; color:var(--muted); max-width:600px; margin-bottom:56px; line-height:1.7; }
  .section-sub-light { color:rgba(255,255,255,0.5); }
  .two-col { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }

  /* about */
  .about-text p { color:var(--muted); line-height:1.8; margin-bottom:18px; font-size:1rem; }
  .about-text strong { color:var(--navy); }
  .values-heading { color:var(--navy); margin:28px 0 14px; font-size:0.875rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; }
  .values-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:8px; }
  .value-pill { background:#fff; border:1px solid var(--border); border-radius:var(--r); padding:11px 16px; font-size:0.85rem; font-weight:600; color:var(--navy); display:flex; align-items:center; gap:10px; }
  .value-pill::before { content:''; width:8px; height:8px; border-radius:2px; flex-shrink:0; background:var(--purple); }
  .value-pill:nth-child(2)::before { background:var(--red); }
  .value-pill:nth-child(3)::before { background:var(--navy); }
  .about-right { display:flex; flex-direction:column; gap:16px; }
  .team-card { background:#fff; border:1px solid var(--border); border-radius:var(--r); padding:24px; border-left:3px solid var(--purple); }
  .team-name { font-weight:800; color:var(--navy); font-size:0.95rem; margin-bottom:3px; }
  .team-title { font-size:0.72rem; color:var(--purple); font-weight:700; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:10px; }
  .team-bio { font-size:0.875rem; color:var(--muted); line-height:1.65; }

  /* services */
  .service-group-label { font-size:0.68rem; font-weight:800; text-transform:uppercase; letter-spacing:2px; color:var(--muted); margin:40px 0 16px; padding-bottom:10px; border-bottom:1px solid var(--border); }
  .service-group-label:first-of-type { margin-top:0; }
  .services-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  .service-card { background:var(--off); border:1px solid var(--border); border-radius:var(--r); padding:24px; transition:border-color 0.2s,box-shadow 0.2s; }
  .service-card:hover { border-color:var(--purple); box-shadow:0 4px 24px rgba(93,48,217,0.08); }
  .service-highlighted { border-color:var(--purple) !important; box-shadow:0 0 0 2px rgba(93,48,217,0.15); }
  .service-bar { width:32px; height:3px; border-radius:2px; margin-bottom:18px; }
  .sbar-purple { background:var(--purple); }
  .sbar-red    { background:var(--red); }
  .sbar-navy   { background:var(--navy); }
  .service-card h3 { font-size:0.92rem; font-weight:700; color:var(--navy); margin-bottom:8px; }
  .service-card p  { font-size:0.84rem; color:var(--muted); line-height:1.65; }
  .service-tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:14px; }
  .tag { background:var(--gray-lt); border:1px solid var(--border); border-radius:100px; padding:3px 10px; font-size:0.7rem; font-weight:600; color:var(--navy); }

  /* creative */
  .creative-stats { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:48px; }
  .creative-stat { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:var(--r); padding:20px; }
  .creative-stat-num { font-size:1.8rem; font-weight:800; color:#fff; letter-spacing:-0.5px; line-height:1; display:block; }
  .cstat-purple { color:#a98af5; }
  .cstat-red    { color:#f07070; }
  .creative-stat-label { font-size:0.75rem; color:rgba(255,255,255,0.45); margin-top:6px; line-height:1.4; }
  .creative-layout { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:start; }
  .sub-label-dim { font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:2px; color:rgba(255,255,255,0.3); margin-bottom:20px; }
  .process-steps { display:flex; flex-direction:column; }
  .process-step { display:flex; gap:20px; padding:20px 0; border-bottom:1px solid rgba(255,255,255,0.07); }
  .process-step:last-child { border-bottom:none; }
  .step-num { width:32px; height:32px; border-radius:50%; background:rgba(93,48,217,0.25); border:1px solid rgba(93,48,217,0.4); display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:800; color:#a98af5; flex-shrink:0; }
  .step-content h4 { font-size:0.92rem; font-weight:700; color:#fff; margin-bottom:4px; }
  .step-content p { font-size:0.84rem; color:rgba(255,255,255,0.5); line-height:1.6; }
  .creative-types-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .creative-type { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.09); border-radius:8px; padding:14px 16px; font-size:0.84rem; font-weight:600; color:rgba(255,255,255,0.7); }
  .creative-type small { display:block; font-size:0.72rem; color:rgba(255,255,255,0.35); font-weight:400; margin-top:3px; }
  .creative-right { display:flex; flex-direction:column; gap:20px; }
  .director-card { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:var(--r); padding:22px; border-left:3px solid var(--red); }
  .sherpa-card { background:rgba(93,48,217,0.15); border:1px solid rgba(93,48,217,0.35); border-radius:var(--r); padding:26px; }
  .sherpa-badge { background:var(--purple); color:#fff; font-size:0.62rem; font-weight:700; padding:2px 8px; border-radius:100px; text-transform:uppercase; letter-spacing:0.5px; }
  .sherpa-feat { display:flex; align-items:flex-start; gap:10px; font-size:0.82rem; color:rgba(255,255,255,0.6); line-height:1.5; margin-bottom:8px; }
  .sherpa-feat::before { content:''; width:5px; height:5px; border-radius:50%; background:#a98af5; flex-shrink:0; margin-top:7px; }
  .tool-stack { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:var(--r); padding:22px; }
  .tool-stack-label { font-size:0.78rem; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:rgba(255,255,255,0.4); margin-bottom:14px; }
  .tool-tags { display:flex; flex-wrap:wrap; gap:7px; }
  .tool-tag { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); border-radius:6px; padding:4px 10px; font-size:0.75rem; font-weight:600; color:rgba(255,255,255,0.65); }

  /* ai transformation */
  .ai-pillars { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:48px; }
  .pillar-card { background:#fff; border:1px solid var(--border); border-radius:var(--r); padding:28px; display:flex; flex-direction:column; gap:14px; }
  .pillar-num { font-size:0.68rem; font-weight:800; text-transform:uppercase; letter-spacing:1.5px; color:var(--purple); }
  .pillar-title { font-size:1rem; font-weight:800; color:var(--navy); line-height:1.3; }
  .pillar-desc { font-size:0.875rem; color:var(--muted); line-height:1.65; flex:1; }
  .pillar-features { display:flex; flex-direction:column; gap:8px; }
  .pillar-feat { display:flex; align-items:flex-start; gap:8px; font-size:0.82rem; color:var(--muted); line-height:1.5; }
  .pillar-feat::before { content:''; width:5px; height:5px; border-radius:50%; background:var(--purple); flex-shrink:0; margin-top:7px; }
  .sub-label-muted { font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:var(--muted); margin-bottom:20px; }
  .use-cases { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .use-case-card { background:#fff; border:1px solid var(--border); border-radius:var(--r); padding:24px; border-left:3px solid var(--purple); }
  .use-case-alt { border-left-color:var(--red); }
  .use-case-client { font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--navy); margin-bottom:6px; }
  .use-case-title { font-size:0.9rem; font-weight:700; color:var(--navy); margin-bottom:8px; line-height:1.4; }
  .use-case-desc { font-size:0.84rem; color:var(--muted); line-height:1.65; }
  .matrix-card { background:#fff; border:1px solid var(--border); border-radius:var(--r); padding:28px; }
  .matrix-title { font-size:0.95rem; font-weight:800; color:var(--navy); margin-bottom:10px; }
  .matrix-desc { font-size:0.875rem; color:var(--muted); line-height:1.7; margin-bottom:14px; }
  .matrix-grid { display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:8px; margin-top:16px; }
  .matrix-cell { border-radius:8px; padding:14px; font-size:0.78rem; line-height:1.4; font-weight:600; }
  .matrix-cell span { display:block; font-size:0.68rem; font-weight:400; margin-top:3px; }
  .matrix-cell.highlight { background:rgba(93,48,217,0.1); border:1.5px solid rgba(93,48,217,0.3); color:var(--navy); }
  .matrix-cell.highlight span { color:var(--purple); }
  .matrix-cell.dim { background:var(--gray-lt); border:1px solid var(--border); color:var(--muted); }
  .matrix-cell.dim span { color:var(--gray); }
  .matrix-axis { display:flex; justify-content:space-between; font-size:0.68rem; color:var(--gray); font-weight:600; text-transform:uppercase; letter-spacing:0.5px; margin-top:6px; }
  .build-process { background:var(--navy); border-radius:var(--r); padding:28px; }
  .build-process-title { font-size:0.72rem; font-weight:800; color:rgba(255,255,255,0.9); margin-bottom:20px; text-transform:uppercase; letter-spacing:1px; }
  .build-steps { display:flex; flex-wrap:wrap; gap:8px; }
  .build-step { background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.1); border-radius:6px; padding:8px 14px; font-size:0.8rem; font-weight:600; color:rgba(255,255,255,0.65); }
  .build-step-active { background:rgba(93,48,217,0.3); border-color:rgba(93,48,217,0.5); color:#fff; }

  /* why us */
  .differentiators { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; }
  .diff-card { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:var(--r); padding:30px; position:relative; }
  .diff-card::before { content:''; position:absolute; top:0; left:0; width:100%; height:2px; border-radius:var(--r) var(--r) 0 0; }
  .diff-odd::before  { background:var(--purple); }
  .diff-even::before { background:var(--red); }
  .diff-num { font-size:0.7rem; font-weight:800; color:rgba(255,255,255,0.2); letter-spacing:1px; text-transform:uppercase; margin-bottom:12px; }
  .diff-card h3 { font-size:1rem; font-weight:700; color:#fff; margin-bottom:10px; }
  .diff-card p  { font-size:0.875rem; color:rgba(255,255,255,0.55); line-height:1.7; }

  /* case studies */
  .cs-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .cs-card { background:#fff; border:1px solid var(--border); border-radius:var(--r); padding:28px; display:flex; flex-direction:column; gap:14px; transition:box-shadow 0.2s,border-color 0.2s; }
  .cs-card:hover { box-shadow:0 4px 20px rgba(0,12,93,0.07); border-color:var(--purple); }
  .cs-header { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .cs-client { font-size:0.72rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--navy); }
  .cs-industry { display:inline-block; background:var(--gray-lt); border:1px solid var(--border); border-radius:100px; padding:2px 9px; font-size:0.68rem; font-weight:600; color:var(--muted); }
  .cs-headline { font-size:0.92rem; font-weight:700; color:var(--navy); line-height:1.45; }
  .cs-desc  { font-size:0.84rem; color:var(--muted); line-height:1.65; flex:1; }
  .cs-quote { font-size:0.82rem; color:var(--muted); line-height:1.65; font-style:italic; border-left:2px solid var(--purple); padding-left:12px; }
  .cs-result-block { border-top:1px solid var(--border); padding-top:14px; }
  .cs-result { font-size:2.1rem; font-weight:800; letter-spacing:-0.5px; line-height:1; }
  .cs-result-purple { color:var(--purple); }
  .cs-result-red    { color:var(--red); }
  .cs-result-navy   { color:var(--navy); }
  .cs-result-label  { font-size:0.78rem; color:var(--muted); font-weight:500; margin-top:4px; }

  /* clients */
  .clients-intro { font-size:1rem; color:var(--muted); margin-bottom:40px; max-width:560px; line-height:1.7; }
  .client-section-label { font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:var(--gray); margin-bottom:14px; }
  .client-logos { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:28px; }
  .client-logo { background:var(--off); border:1px solid var(--border); border-radius:6px; padding:10px 16px; font-size:0.82rem; font-weight:600; color:var(--muted); white-space:nowrap; transition:color 0.15s,border-color 0.15s; }
  .client-logo:hover { color:var(--navy); border-color:var(--purple); }
  .client-logo.featured { color:var(--navy); border-color:rgba(93,48,217,0.25); background:#fff; }
  .spend-note { font-size:0.875rem; color:var(--muted); background:var(--off); border:1px solid var(--border); border-radius:var(--r); padding:16px 22px; max-width:680px; line-height:1.65; }
  .spend-note strong { color:var(--navy); }

  /* testimonials */
  .testimonials-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
  .testimonial-card { background:#fff; border:1px solid var(--border); border-radius:var(--r); padding:26px; display:flex; flex-direction:column; gap:18px; }
  .t-mark { font-size:2.5rem; line-height:1; font-family:Georgia,serif; color:var(--purple); font-weight:700; }
  .t-quote { font-size:0.9rem; color:var(--navy); line-height:1.72; flex:1; }
  .t-author { border-top:1px solid var(--border); padding-top:16px; }
  .t-name { font-weight:700; font-size:0.875rem; color:var(--navy); }
  .t-role { font-size:0.78rem; color:var(--muted); margin-top:2px; }

  /* awards */
  .awards-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
  .award-card { background:var(--off); border:1px solid var(--border); border-radius:var(--r); padding:24px 20px; }
  .award-accent { width:28px; height:3px; border-radius:2px; margin-bottom:14px; }
  .aa-purple { background:var(--purple); }
  .aa-red    { background:var(--red); }
  .award-card h4 { font-size:0.875rem; font-weight:700; color:var(--navy); margin-bottom:6px; }
  .award-card p  { font-size:0.78rem; color:var(--muted); line-height:1.5; }

  /* cta */
  .cta-section { position:relative; overflow:hidden; text-align:center; }
  .cta-section::after { content:''; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:800px; height:400px; border-radius:50%; background:radial-gradient(ellipse,rgba(93,48,217,0.2) 0%,transparent 70%); pointer-events:none; }
  .cta-inner { position:relative; z-index:1; max-width:640px; margin:0 auto; }
  .cta-sub { color:rgba(255,255,255,0.55); font-size:1.05rem; margin-bottom:40px; line-height:1.7; }

  /* footer */
  .footer { background:#000; border-top:1px solid rgba(255,255,255,0.08); padding:32px 48px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; }
  .footer svg { height:22px; width:auto; }
  .footer-info { font-size:0.8rem; color:rgba(255,255,255,0.35); }
  .footer-links { display:flex; gap:24px; }
  .footer-links a { font-size:0.8rem; color:rgba(255,255,255,0.35); text-decoration:none; }
  .footer-links a:hover { color:rgba(255,255,255,0.7); }

  @media (max-width:900px) {
    .services-grid { grid-template-columns:1fr 1fr; }
    .cs-grid { grid-template-columns:1fr 1fr; }
    .testimonials-grid { grid-template-columns:1fr 1fr; }
    .awards-grid { grid-template-columns:1fr 1fr; }
    .ai-pillars { grid-template-columns:1fr; }
    .creative-stats { grid-template-columns:1fr; }
    .creative-layout { grid-template-columns:1fr; }
  }
  @media (max-width:800px) {
    .two-col { grid-template-columns:1fr; }
    .differentiators { grid-template-columns:1fr; }
    .use-cases { grid-template-columns:1fr; }
    .nav { padding:0 20px; }
    .section { padding:64px 24px; }
    .hero { padding:72px 24px 60px; }
    .hero-stats { gap:28px; }
    .prospect-banner { padding:14px 24px; }
    .footer { padding:24px; }
  }
  @media (max-width:560px) {
    .services-grid { grid-template-columns:1fr; }
    .cs-grid { grid-template-columns:1fr; }
    .testimonials-grid { grid-template-columns:1fr; }
  }
`;
