import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, Calendar, Send, Zap, Star } from "lucide-react";
import { useState } from "react";
import { SectionLabel } from "@/components/shared/PagePrimitives";
import Head from "next/head";
import { blogPosts, getPostBySlug, categoryTone, type BlogPost } from "@/data/blog-posts";
import {
  BlogCover0,
  BlogCover1,
  BlogCover2,
  BlogCover3,
  BlogCover4,
  BlogCover5,
  BlogCover6,
} from "@/components/blog/BlogCovers";

/* ─── Cover map ─────────────────────────────────────────────── */

const COVERS: Record<string, React.ComponentType> = {
  "creator-commerce":   BlogCover0,
  "brand-brief":        BlogCover1,
  "influencer-campaign":BlogCover2,
  glowbeauty:           BlogCover3,
  negotiate:            BlogCover4,
  algorithm:            BlogCover5,
  roster:               BlogCover6,
};

/* ─── Article body content ──────────────────────────────────── */

type Section = { heading: string; body: string[] };

const CONTENT: Record<string, Section[]> = {
  "creator-commerce": [
    {
      heading: "The Trust Economy Has Arrived",
      body: [
        "For years, brands treated influencer marketing as a media buy — reach multiplied by CPM, nothing more. That era is over. Audiences have developed sophisticated filters for sponsored content, and the only thing that still cuts through is genuine enthusiasm from people they actually follow.",
        "Creator commerce isn't just product placement with a discount code. It's an entirely new channel where the creator is the storefront, the recommendation engine, and the customer service desk rolled into one. Brands that understand this are restructuring their entire go-to-market strategy around it.",
      ],
    },
    {
      heading: "Native Shopping Is the Default Now",
      body: [
        "TikTok Shop passed $1B in US GMV faster than any e-commerce platform in history. YouTube's affiliate programme now covers every major creator niche. Instagram Checkout quietly became the checkout layer for an entire generation of impulse buyers. The infrastructure is here.",
        "What this means practically: the gap between content and purchase has collapsed to a single tap. Brands that haven't built creator-native product pages, affiliate flows, and post-purchase content loops are leaving massive conversion on the table — not to a competitor, but to the void.",
      ],
    },
    {
      heading: "Long-Term Partnerships Outperform One-Off Posts",
      body: [
        "The data is unambiguous: creators who promote a brand three or more times in 90 days drive 4× the conversion of one-off posts. Audiences need repetition to trust a recommendation, and trust is what converts at scale.",
        "The shift this requires from brands is significant. Instead of a campaign mindset — brief, post, done — it demands a roster mindset: ongoing relationships with a curated group of creators who genuinely use the product. That's exactly what Icons was built to facilitate.",
      ],
    },
  ],
  "brand-brief": [
    {
      heading: "Why Most Pitches Fail Before They're Opened",
      body: [
        "Brand managers receive hundreds of creator pitches every week. The ones that get read share one trait: they make the brand's job easier. They answer every question before it's asked, and they do it in under 60 seconds of reading time.",
        "Most pitches fail because creators lead with themselves — their niche, their aesthetic, their engagement rate. Brands don't care about any of that until they know why you're the right fit for their specific product and audience. Flip the order and you immediately stand out.",
      ],
    },
    {
      heading: "The Three Things Brands Need to Know",
      body: [
        "Every successful brief answers three questions: Who exactly is your audience (not 'everyone aged 18-34', but a specific person with specific habits)? What does a branded post actually look like in your content style? And what outcome can you credibly promise based on your track record?",
        "The third point is where most creators undersell themselves. If you've driven clicks, conversions, or brand awareness lifts before — even for small brands — those numbers belong in your brief. One specific data point beats three paragraphs of self-description every time.",
      ],
    },
    {
      heading: "One Page, Maximum Impact",
      body: [
        "The format matters as much as the content. A one-page PDF with your audience demographics, three content examples, one case study metric, and your rate card will outperform a five-page deck. Brand managers read briefs on their phones between meetings.",
        "Use bold headers, visuals over prose, and a clear CTA at the bottom: 'I'd love to talk through a collaboration — here's my calendar link.' Remove every word that doesn't earn its place. Then remove half the words that remain.",
      ],
    },
  ],
  "influencer-campaign": [
    {
      heading: "The Vanity Metric Trap",
      body: [
        "A campaign with 5 million impressions and 0.2% click-through is not a success. It's an expensive lesson. Yet most post-campaign reports still lead with reach and impressions because those numbers look good in a slide deck and nobody gets fired for a big reach number.",
        "The shift required is uncomfortable: agree on conversion metrics before the campaign launches, not after. If you can't define what success looks like in measurable terms before briefing creators, you're not ready to run the campaign.",
      ],
    },
    {
      heading: "The Metrics That Actually Matter",
      body: [
        "For awareness campaigns: brand search lift, direct traffic uplift, and aided recall. For conversion campaigns: attributed purchases, cost per acquisition, and return on ad spend against creator fee. For community campaigns: new follower quality, engagement rate from new followers, and content saves.",
        "None of these are difficult to measure. They just require setting up tracking before the campaign, not retrofitting attribution after. Tools like UTM parameters, pixel events, and post-purchase surveys give you accurate data without requiring an enterprise analytics stack.",
      ],
    },
    {
      heading: "Fix the Brief, Fix the Results",
      body: [
        "Most influencer campaigns underperform because the brief is either too prescriptive (killing authenticity) or too vague (producing off-brand content). The sweet spot is creative direction, not creative control — give creators the outcome you need, the talking points that matter, and the guardrails that protect the brand, then get out of the way.",
        "The brands generating the best creator content right now share one practice: they brief creators like partners, not vendors. They share actual business context, explain why this product matters, and ask for the creator's honest take. The result is content that sounds real because it is.",
      ],
    },
  ],
  glowbeauty: [
    {
      heading: "The Problem: Awareness Without Trust",
      body: [
        "GlowBeauty had awareness. Their ads ran across every major platform, and their brand recognition among the 25–35 demographic was solid. What they didn't have was trust. Their purchase conversion rate sat at 1.4% — half the category average — because potential customers had seen plenty of ads but no authentic recommendations.",
        "The brief was precise: don't drive awareness, drive belief. Find creators whose audiences would naturally use a skincare routine product, and let them tell the real story of incorporating GlowBeauty into their daily life.",
      ],
    },
    {
      heading: "The Strategy: Micro-Creator Saturation",
      body: [
        "Instead of spending the budget on two macro-creators with millions of followers, we built a roster of 28 micro-creators across skincare, wellness, and lifestyle niches — each with between 15K and 120K highly engaged followers. Every creator received the product 6 weeks before posting, with no posting requirements during that period.",
        "The content brief had one rule: only post if you genuinely like it. This created a natural filter. 24 of the 28 creators posted. Their content was unambiguously authentic because the permission to not post removed all pressure to perform. The 4 who didn't post saved GlowBeauty from potentially negative reviews.",
      ],
    },
    {
      heading: "The Numbers: What 3M Impressions Actually Meant",
      body: [
        "Total impressions across the 24 creator posts reached 3.1M over 6 weeks. Click-through rate averaged 4.2% — seven times GlowBeauty's paid ad CTR. Attributed purchases in the 30-day window: 1,847. Average order value from creator traffic: $94, versus $71 from paid channels. The campaign paid for itself in week 3.",
        "But the number that mattered most to GlowBeauty's CMO: brand search volume increased 340% during the campaign window and maintained a 180% increase 60 days after the final post. Authentic creator content had done what a year of advertising couldn't — made the brand mean something.",
      ],
    },
  ],
  negotiate: [
    {
      heading: "You're Almost Certainly Undercharging",
      body: [
        "A senior brand manager at a major consumer goods company told us she regularly receives creator rate cards that she immediately doubles before presenting to her team. Not because she's generous, but because she knows her internal benchmarks and she knows that creators who underprice themselves are a liability — they burn out, they rush content, and they eventually resent the partnership.",
        "The first step to getting paid what you're worth is understanding what brands are actually willing to pay. Spoiler: it's more than you think, and it's based on outcomes, not follower count.",
      ],
    },
    {
      heading: "The Anchoring Play",
      body: [
        "Negotiation research consistently shows that whoever sets the first number in a negotiation has a disproportionate advantage — the conversation anchors around that figure. Experienced creators know this. They quote high and leave room to come down if needed, rather than quoting their 'real' number and having nowhere to go.",
        "Your anchor rate should be calculated from the value you deliver, not the rate you think a brand will accept. Take your average post's engagement, multiply by the brand's likely customer value, apply a reasonable conversion estimate, and work backwards to a fee. Then add 30%. That's your opening number.",
      ],
    },
    {
      heading: "Knowing When to Walk Away",
      body: [
        "The most powerful position in any negotiation is genuine willingness to walk away. Brands can tell when a creator needs the deal, and that desperation erodes your leverage instantly. The solution isn't pretending to have other offers — it's actually having them.",
        "Build your pipeline before you need it. Approach brands proactively between campaigns, not when you need revenue. The creators who consistently get paid well are the ones who treat outreach like a part-time job — 5 hours a week, whether they need the money or not. When an offer comes in below your rate, declining is easy when the next conversation is already scheduled.",
      ],
    },
  ],
  algorithm: [
    {
      heading: "What Actually Changed",
      body: [
        "The v5.0 updates across TikTok, Instagram, and YouTube all share a common thread: the platforms are rewarding content that keeps people watching, not just content that gets clicked. Watch time past the 3-second mark now carries 2.4× the signal weight it did in the previous ranking model.",
        "This sounds simple, but its implications are significant. Short-form hooks matter more than ever — but so does the middle and end of the video. A 30-second video that holds 80% of viewers to completion will outperform a 15-second video with 40% completion, even though the shorter video requires less attention. The algorithm is measuring engagement quality, not just quantity.",
      ],
    },
    {
      heading: "Who Wins in the New Landscape",
      body: [
        "The creators benefiting most from the v5.0 changes are niche-focused, consistent posters with tight feedback loops between content and audience response. The feed is becoming a topic graph, not a follower graph — your content surfaces to people interested in the subject, not just to your existing audience.",
        "This is actually good news for smaller creators. If your content genuinely serves a specific interest area, you now compete directly with anyone in that niche regardless of follower count. The days of follower count as the primary discovery signal are over.",
      ],
    },
    {
      heading: "Your Adaptation Playbook",
      body: [
        "Three concrete changes to implement before your next post cycle: First, recut your hooks — your first 2 seconds need to answer 'why should I watch this' without being clickbait. Test three different hooks per video and use the one with the highest 3-second retention. Second, optimize for saves over likes — saves signal strong interest to the algorithm and are 0.9× weighted in the new model. Third, post on a consistent weekly cadence — creators posting fewer than 4 times per week now face a 30% reach penalty in the new model.",
        "The creators who adapt fastest will gain significant ground on the ones who keep doing what worked 6 months ago. The algorithm is a moving target, but the underlying principle never changes: make content so good that people want to finish it.",
      ],
    },
  ],
  roster: [
    {
      heading: "Why Micro-Creators Consistently Outperform",
      body: [
        "The data on this is settled: creators with 10K–100K followers drive an average engagement rate of 3.7% versus 1.1% for creators with over 1M followers. But engagement rate is just the headline — the conversion story is even more compelling. Micro-creator audiences buy at 2–3× the rate of mega-influencer audiences, because they perceive the recommendation as coming from someone they personally know rather than a celebrity they follow.",
        "This means your influencer budget goes further than you think. A brand spending $50K on a single macro-creator post is often getting worse results than a brand spending $50K across 15 micro-creators — and the micro-creator strategy builds a real relationship network for future campaigns.",
      ],
    },
    {
      heading: "Planning Your Year in Quarters",
      body: [
        "A year-long creator roster works best when structured around quarterly themes that align with your product calendar and seasonal moments. Q1: new year relevance — education, self-improvement, routines. Q2: aspirational content — experiences, upgrades, outdoors. Q3: back-to-reality — productivity, systems, back-to-school. Q4: gift season — gifting angles, holiday relevance, year-in-review.",
        "For each quarter, define which 3–5 creators will anchor the content, which 5–8 will produce supporting posts, and what the one measurable outcome looks like. Keep the quarterly creator roster stable — consistency of relationship produces better content than constantly rotating new faces.",
      ],
    },
    {
      heading: "Budget Allocation That Actually Works",
      body: [
        "A workable allocation for a $100K annual creator budget: 40% to anchor creators (3–5 creators on quarterly retainers), 35% to campaign-specific posts from your wider roster, 15% to gifting and relationship-building with potential future partners, 10% to creator content amplification through paid distribution.",
        "The retainer model for anchor creators is underused and undervalued. A monthly retainer of $1,500–$3,000 buys you two posts per month, ongoing brand mentions in stories, and first-right-of-refusal for product launches. That's 24 brand touchpoints per creator per year — far more efficient than 24 separate negotiation cycles.",
      ],
    },
  ],
};

/* ─── In-article conversion CTA ────────────────────────────── */

function ConversionCTA() {
  return (
    <div
      className="mt-16 md:mt-20 rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--color-border)" }}
    >
      {/* Header strip */}
      <div
        className="px-8 md:px-10 py-6 border-b"
        style={{ background: "var(--color-panel)", borderColor: "var(--color-border)" }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-1" style={{ color: "var(--color-muted-fg)" }}>
          What&apos;s your next move?
        </p>
        <h3 className="font-display text-2xl md:text-3xl leading-tight" style={{ color: "var(--color-fg)" }}>
          Put it into practice.
        </h3>
      </div>

      {/* Dual-path cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ background: "var(--color-bg)" }}>
        {/* Brand path */}
        <Link
          href="/brief-builder"
          className="group flex flex-col gap-4 p-8 md:p-10 border-b sm:border-b-0 sm:border-r transition-colors duration-200"
          style={{
            borderColor: "var(--color-border)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-panel)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "")}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "var(--color-accent)", color: "#000" }}
          >
            <Zap className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: "var(--color-muted-fg)" }}>
              For brands
            </p>
            <h4 className="font-display text-xl md:text-2xl leading-tight mb-2" style={{ color: "var(--color-fg)" }}>
              Build a campaign brief
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted-fg)" }}>
              Describe your product and goals. We match you with vetted creators — campaigns live in 48 hours.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "var(--color-accent)" }}>
            Start your brief
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>

        {/* Creator path */}
        <Link
          href="/talents"
          className="group flex flex-col gap-4 p-8 md:p-10 transition-colors duration-200"
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-panel)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "")}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: "var(--color-fg)", color: "var(--color-bg)" }}
          >
            <Star className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-1" style={{ color: "var(--color-muted-fg)" }}>
              For creators
            </p>
            <h4 className="font-display text-xl md:text-2xl leading-tight mb-2" style={{ color: "var(--color-fg)" }}>
              Join the roster
            </h4>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted-fg)" }}>
              10,000+ vetted creators. No agency cut. Browse the network or apply to get your profile listed.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "var(--color-fg)" }}>
            Explore creators
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}

/* ─── Newsletter capture ────────────────────────────────────── */

function NewsletterCapture() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section className="border-t border-(--color-border) px-6 md:px-10 py-16">
      <div className="max-w-3xl mx-auto">
        <div
          className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8"
          style={{ background: "var(--color-panel)", border: "1px solid var(--color-border)" }}
        >
          {/* Copy */}
          <div className="flex-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-(--color-muted-fg) mb-2">
              Icons Journal
            </p>
            <h3 className="font-display italic text-2xl md:text-3xl leading-tight mb-2">
              The playbook, monthly.
            </h3>
            <p className="text-sm text-(--color-muted-fg) leading-relaxed">
              Creator trends, campaign breakdowns, and the moves that matter — before everyone else hears about them.
            </p>
          </div>

          {/* Form */}
          <div className="w-full md:w-auto md:min-w-[280px]">
            {submitted ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--color-accent)" }}>
                  <span className="text-base">✦</span> You&apos;re on the list.
                </div>
                <p className="font-mono text-[10px] text-(--color-muted-fg) uppercase tracking-widest">
                  First issue drops next week.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm bg-(--color-bg) outline-none transition-colors"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-fg)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-fg)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                />
                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                >
                  Subscribe free
                  <Send className="w-3.5 h-3.5" />
                </button>
                <p className="font-mono text-[9px] text-(--color-muted-fg) uppercase tracking-widest text-center">
                  No spam · Unsubscribe any time
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Props ─────────────────────────────────────────────────── */

type Props = { post: BlogPost };

/* ─── Page ──────────────────────────────────────────────────── */

export default function BlogDetailPage({ post }: Props) {
  const Cover = COVERS[post.slug];
  const sections = CONTENT[post.slug] ?? [];
  const initials = post.author.split(" ").map((w) => w[0]).join("");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `https://icons.so/blog/${post.slug}`,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author, jobTitle: post.authorRole },
    publisher: { "@type": "Organization", name: "Icons", url: "https://icons.so", logo: "https://icons.so/logoBlack.png" },
  };

  return (
    <>
      <Head>
        <title>{post.title} — Icons Journal</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} — Icons Journal`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://icons.so/blog/${post.slug}`} />
        <meta name="twitter:title" content={`${post.title} — Icons Journal`} />
        <meta name="twitter:description" content={post.excerpt} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>
      {/* ── Cover hero ─────────────────────────────────────────── */}
      <div className="w-full overflow-hidden">
        {Cover && <Cover />}
      </div>

      {/* ── Breadcrumb bar ─────────────────────────────────────── */}
      <div className="border-b border-(--color-border) px-6 md:px-10 py-4 flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-(--color-muted-fg) hover:text-(--color-fg) transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          All articles
        </Link>
        <span className={`chip !text-[9px] !px-3 !py-1 ${categoryTone[post.category] ?? ""}`}>
          {post.category}
        </span>
      </div>

      {/* ── Article ────────────────────────────────────────────── */}
      <div className="px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <header className="mb-12 md:mb-16">
            <div className="mb-5">
              <SectionLabel>{post.category}</SectionLabel>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.0] mb-6">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-(--color-muted-fg) leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Author + meta */}
            <div className="flex items-center justify-between gap-4 pt-6 border-t border-(--color-border)">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-warm flex items-center justify-center font-display text-sm text-(--color-fg)/60 shrink-0">
                  {initials}
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-medium">{post.author}</div>
                  <div className="text-[10px] text-(--color-muted-fg) uppercase tracking-widest">{post.authorRole}</div>
                </div>
              </div>
              <div className="flex items-center gap-5 text-[11px] text-(--color-muted-fg) uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </header>

          {/* Body */}
          <div className="flex flex-col gap-12 md:gap-16">
            {sections.map((section, i) => (
              <section key={i} className="flex flex-col gap-5">
                <h2 className="font-display text-2xl md:text-3xl leading-tight text-(--color-fg)">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-4">
                  {section.body.map((para, j) => (
                    <p key={j} className="text-base md:text-lg text-(--color-muted-fg) leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Conversion CTA */}
          <ConversionCTA />

          {/* Footer */}
          <footer className="mt-16 md:mt-20 pt-10 border-t border-(--color-border) flex flex-col gap-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {[post.category, "Icons Journal", "Vol. I"].map((tag) => (
                <span key={tag} className="chip !text-[10px] !px-3 !py-1">
                  {tag}
                </span>
              ))}
            </div>

            {/* Back + More */}
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-(--color-muted-fg) hover:text-(--color-fg) transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                Back to journal
              </Link>
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="inline-flex items-center gap-2 text-sm font-medium text-(--color-accent) cursor-pointer group"
              >
                Copy link
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* ── Newsletter capture ─────────────────────────────────── */}
      <NewsletterCapture />

      {/* ── More articles ───────────────────────────────────────── */}
      <section className="border-t border-(--color-border) px-6 md:px-10 py-16">
        <style>{`
          .blog-related-grid { display: grid; grid-template-columns: 1fr; }
          @media (min-width: 768px) { .blog-related-grid { grid-template-columns: repeat(3, 1fr); } }
        `}</style>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <SectionLabel>Keep reading</SectionLabel>
          </div>
          <div className="blog-related-grid gap-px grid-divider">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 3)
              .map((related) => {
                const RelatedCover = COVERS[related.slug];
                return (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col p-6 card-hover cursor-pointer"
                  >
                    <div className="aspect-[5/3] mb-5 relative overflow-hidden rounded-sm">
                      {RelatedCover && <RelatedCover />}
                    </div>
                    <span className="chip !text-[9px] !px-2 !py-1 mb-3 self-start">
                      {related.category}
                    </span>
                    <h3 className="font-display text-xl leading-[1.15] mb-2 group-hover:text-(--color-accent) transition-colors">
                      {related.title}
                    </h3>
                    <div className="mt-auto pt-4 border-t border-(--color-border) flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-(--color-muted-fg)">
                        {related.readTime}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-(--color-muted-fg) opacity-0 group-hover:opacity-100 group-hover:text-(--color-accent) transition-all duration-300" />
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Static generation ─────────────────────────────────────── */

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: blogPosts.map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string);
  if (!post) return { notFound: true };
  return { props: { post } };
};
