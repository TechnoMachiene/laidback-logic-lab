import { createFileRoute, Link } from "@tanstack/react-router";

import { Odometer } from "@/components/site/Odometer";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — nonchtech case studies" },
      {
        name: "description",
        content:
          "Five nonchtech builds with real outcomes: AP automation, a support retrieval agent, demand forecasting, a B2B ordering product and a checkout rebuild.",
      },
      { property: "og:title", content: "Work — nonchtech case studies" },
      {
        property: "og:description",
        content:
          "Real systems in production: invoice automation, retrieval agents, forecasting, product engineering and e-commerce ops.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Work,
});

const cases = [
  {
    slug: "ap-automation",
    metric: "91%",
    label: "invoices straight-through",
    title: "Accounts payable that stops asking for help",
    sector: "Distribution group · 6 countries",
    problem:
      "Two AP clerks keyed 2,400 supplier invoices a month out of a shared mailbox. Month-end close slipped by four days on a bad month.",
    build:
      "Document parsing over PDFs and scans, line-item matching against purchase orders and goods receipts, and a variance rule that routes anything over 5% to a human queue with the evidence attached.",
    stack: "Python, Postgres, Temporal, Azure Document Intelligence, NetSuite API",
    outcome:
      "91% of invoices post without a human touch. Close moved back to day two. Clerk headcount unchanged — both moved onto supplier terms work.",
  },
  {
    slug: "support-agent",
    metric: "-38%",
    label: "average handle time",
    title: "A support agent that reads eleven years of tickets",
    sector: "B2B SaaS · 40-person support org",
    problem:
      "Answers existed, but in 11 years of Zendesk history, three doc sites and a Confluence graveyard. New hires took five months to reach full productivity.",
    build:
      "Hybrid retrieval over tickets, docs and release notes, with citation-or-refuse enforced at the tool layer. Drafts land in the agent console; nothing sends unattended.",
    stack: "TypeScript, pgvector, Zendesk API, evals in Braintrust",
    outcome:
      "Handle time down 38%. Ramp for new hires down to nine weeks. Escalation rate flat — the refusal policy held.",
  },
  {
    slug: "demand-forecast",
    metric: "12.4%",
    label: "forecast error, down from 31%",
    title: "Weekly demand model for a 4,100-SKU catalogue",
    sector: "Consumer goods · DTC and wholesale",
    problem:
      "Planning ran on a spreadsheet with a three-month moving average. Stock-outs on the top 200 SKUs, dead stock everywhere else.",
    build:
      "Gradient-boosted model per SKU family with promotion, seasonality and lead-time features. Weekly retrain, backtested against two years of held-out weeks. Stock-out risk alerts into Slack with the reorder quantity attached.",
    stack: "Python, LightGBM, dbt, Snowflake, Dagster",
    outcome:
      "MAPE from 31% to 12.4%. Stock-outs on A-class SKUs down two thirds. Working capital freed in the first quarter paid for the build.",
  },
  {
    slug: "b2b-ordering",
    metric: "6 weeks",
    label: "from kickoff to first live customer",
    title: "A B2B ordering product, built once and properly",
    sector: "Industrial supplier · 900 trade accounts",
    problem:
      "Trade customers ordered by phone and fax against account-specific price lists. Every order was retyped into the ERP by hand.",
    build:
      "Customer portal with contract pricing, credit limits, repeat-order templates and approval chains. ERP sync both ways, with an idempotent write path so a retry never double-orders.",
    stack: "TypeScript, React, Postgres, Cloudflare Workers, SAP B1 service layer",
    outcome:
      "First account live in six weeks, 62% of order volume self-serve within five months. Order-entry errors effectively gone.",
  },
  {
    slug: "checkout-rebuild",
    metric: "+17%",
    label: "checkout completion",
    title: "Checkout rebuild and the ops work behind it",
    sector: "Multi-brand e-commerce · 3 storefronts",
    problem:
      "A four-step checkout on a heavily themed platform, 4.1s to interactive on mobile, and a returns process handled in a shared inbox.",
    build:
      "Single-page checkout with address autocomplete, wallet payments and server-side validation. Behind it: automated returns intake, label generation and refund posting to the finance ledger.",
    stack: "TypeScript, Next-generation storefront APIs, Stripe, Postgres, Shopify Admin API",
    outcome:
      "Completion up 17%, mobile time-to-interactive 1.3s. Returns handling time cut by half with the same team.",
  },
];

function Work() {
  return (
    <>
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-16">
          <p className="eyebrow">Work</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.02] sm:text-6xl">
            Five systems, still running.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            Client names stay private unless they offer them. The numbers, the stack and the
            problems are exactly as they happened.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5">
        {cases.map((c) => (
          <article
            key={c.slug}
            id={c.slug}
            className="grid scroll-mt-24 gap-8 border-b border-hairline py-14 md:grid-cols-[260px_1fr]"
          >
            <div>
              <Odometer
                value={c.metric}
                className="font-display text-5xl font-extrabold tracking-tight"
              />
              <p className="mt-1 text-sm font-medium text-accent">{c.label}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
                {c.sector}
              </p>
            </div>
            <div>
              <h2 className="text-2xl leading-tight sm:text-3xl">{c.title}</h2>
              <dl className="mt-6 space-y-5 text-sm leading-relaxed">
                <div>
                  <dt className="eyebrow">The problem</dt>
                  <dd className="mt-1.5 text-muted-foreground">{c.problem}</dd>
                </div>
                <div>
                  <dt className="eyebrow">What we built</dt>
                  <dd className="mt-1.5 text-muted-foreground">{c.build}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Stack</dt>
                  <dd className="mt-1.5 font-mono text-xs text-foreground">{c.stack}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Outcome</dt>
                  <dd className="mt-1.5 text-muted-foreground">{c.outcome}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="max-w-xl text-lg">
          If one of these looks like your problem, the fastest way to find out is thirty minutes on
          a call.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-block bg-ink px-5 py-2.5 text-sm font-medium text-ink-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Book 30 minutes
        </Link>
      </section>
    </>
  );
}
