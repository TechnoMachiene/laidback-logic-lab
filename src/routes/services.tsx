import { createFileRoute } from "@tanstack/react-router";

import { serviceMarks } from "@/components/site/marks";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Agentic AI, ML, data, web, e-commerce | nonchtech" },
      {
        name: "description",
        content:
          "What nonchtech builds: agentic AI with guardrails, ML and forecasting, data pipelines and dashboards, product web engineering, and e-commerce operations.",
      },
      { property: "og:title", content: "Services — nonchtech" },
      {
        property: "og:description",
        content:
          "Five practices with real examples, real stacks and a proof point each: agentic AI, ML/data science, data analysis, web development, e-commerce.",
      },
    ],
  }),
  component: Services,
});

const sections = [
  {
    id: "agentic-ai",
    n: "01",
    name: "Agentic AI",
    mark: serviceMarks.agentic,
    lede: "Agents that hold a tool belt, know when to stop, and can be audited afterwards.",
    build: [
      "Multi-tool agents wired to your real systems: CRM, ledger, ticketing, warehouse.",
      "Orchestration across steps — planning, retries, human approval gates on anything irreversible.",
      "Retrieval over your own corpus with citations, not a general chatbot with a company name on it.",
      "Guardrails: allow-lists, spend caps, refusal policies, and an eval suite that runs on every prompt change.",
    ],
    example:
      "An accounts-payable agent for a distribution group. It reads the invoice PDF, extracts line items, matches them to the purchase order, applies the variance policy, posts the journal entry, and pings finance only when something disagrees.",
    stack: [
      "TypeScript",
      "Vercel AI SDK",
      "Gemini / GPT",
      "pgvector",
      "Temporal",
      "Postgres",
      "OpenTelemetry",
    ],
    proof: "2,400 invoices/month · 91% straight-through · 4 min average human touch on the rest.",
  },
  {
    id: "ml-data-science",
    n: "02",
    name: "ML / Data Science",
    mark: serviceMarks.ml,
    lede: "Models trained on your history, evaluated against the decision they actually inform.",
    build: [
      "Demand and revenue forecasting with backtests you can read.",
      "Propensity, churn and risk scoring wired into the tools your team already opens.",
      "Custom model training and fine-tuning where an off-the-shelf API genuinely isn't enough.",
      "Monitoring for drift, plus a retrain schedule that someone owns.",
    ],
    example:
      "Weekly demand forecast for a 4,100-SKU catalogue with seasonal and promo effects. Output lands as a reorder list, not a notebook, with stock-out alerts pushed into Slack.",
    stack: ["Python", "PyTorch", "scikit-learn", "LightGBM", "MLflow", "Airflow", "DuckDB"],
    proof: "Forecast error cut from 31% to 12.4% MAPE. Stock-outs down 44% in two quarters.",
  },
  {
    id: "data-analysis",
    n: "03",
    name: "Data Analysis",
    mark: serviceMarks.data,
    lede: "One number, one definition, one place to find it.",
    build: [
      "Warehouse modelling: raw sources to tested, documented marts.",
      "Pipelines with alerting, so a silent failure isn't discovered at a board meeting.",
      "Dashboards built around the four decisions a team actually makes each week.",
      "Ad-hoc analysis when the question is one-off — we won't sell you a platform for it.",
    ],
    example:
      "A margin-by-channel model for a multi-brand retailer, reconciling Shopify, Amazon and wholesale into a single revenue definition that finance and growth both signed off on.",
    stack: ["dbt", "BigQuery", "Postgres", "Dagster", "Metabase", "Evidence", "SQL"],
    proof: "Month-end close shortened by 6 days. Three competing revenue reports retired.",
  },
  {
    id: "web-development",
    n: "04",
    name: "Web Development",
    mark: serviceMarks.web,
    lede: "Product engineering. Type-safe, tested, and fast on a bad connection.",
    build: [
      "Customer-facing products and internal tools, from first commit to production.",
      "API and integration work: webhooks, auth, third-party systems that document themselves badly.",
      "Performance and accessibility as build criteria, not a cleanup ticket.",
      "CI, preview environments, and infrastructure you can hand to another team.",
    ],
    example:
      "A claims portal for an insurance broker: document upload, status tracking, role-based access for 40 staff and 900 clients, replacing a shared mailbox and a spreadsheet.",
    stack: ["React", "TypeScript", "TanStack Start", "Tailwind", "Postgres", "Cloudflare", "Vitest"],
    proof: "LCP 0.9s on 4G. WCAG 2.2 AA audit passed with no critical findings.",
  },
  {
    id: "ecommerce",
    n: "05",
    name: "E-commerce",
    mark: serviceMarks.ecommerce,
    lede: "The storefront is the easy half. We do the other half too.",
    build: [
      "Headless storefronts and custom checkout flows where the default one costs you money.",
      "Catalogue, pricing and inventory sync across marketplaces and the warehouse.",
      "Post-purchase automation: delivery notifications, returns, review requests, fraud rules.",
      "Analytics that tie spend to contribution margin rather than last-click revenue.",
    ],
    example:
      "A bundle-and-subscription checkout for a supplements brand, plus an order-status SMS flow that cut 'where is my parcel' tickets by more than half.",
    stack: ["Shopify Hydrogen", "Medusa", "Stripe", "Twilio", "Klaviyo", "Postgres", "Next.js"],
    proof: "Checkout completion up 9.1 points. WISMO tickets down 57% within six weeks.",
  },
];

function Services() {
  return (
    <>
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <p className="eyebrow">Services</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.0] sm:text-6xl">
            Five practices. Each one has shipped.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            We take on work in these five areas. Most engagements touch two or three of them,
            because problems rarely respect the categories.
          </p>
          <nav className="mt-10 flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="border border-hairline px-3 py-1.5 text-sm transition-colors hover:border-ink hover:bg-paper"
              >
                {s.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {sections.map((s, i) => {
        const Mark = s.mark;
        const alt = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            className={`scroll-mt-16 border-b border-hairline ${alt ? "bg-paper" : ""}`}
          >
            <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
                <div>
                  <p className="font-mono text-xs text-accent">{s.n}</p>
                  <Mark className="mt-4 h-12 w-12 stroke-current" />
                  <h2 className="mt-5 text-3xl sm:text-4xl">{s.name}</h2>
                  <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
                    {s.lede}
                  </p>
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="eyebrow">What we build</p>
                    <ul className="mt-3 space-y-2">
                      {s.build.map((b) => (
                        <li key={b} className="flex gap-3 text-sm leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <p className="eyebrow">An example</p>
                      <p className="mt-3 text-sm leading-relaxed">{s.example}</p>
                    </div>
                    <div>
                      <p className="eyebrow">Stack</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {s.stack.map((t) => (
                          <li
                            key={t}
                            className="border border-hairline px-2 py-1 font-mono text-[11px] text-muted-foreground"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-l-2 border-accent pl-4">
                    <p className="eyebrow">Proof point</p>
                    <p className="mt-2 text-sm font-medium leading-relaxed">{s.proof}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
