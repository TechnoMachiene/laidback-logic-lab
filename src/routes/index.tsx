import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";

import { LiveDemo } from "@/components/demo/LiveDemo";
import { MarkRecline, serviceMarks } from "@/components/site/marks";
import { Odometer } from "@/components/site/Odometer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "nonchtech — Nonchalant engineers, curated software" },
      {
        name: "description",
        content:
          "A group of nonchalant software engineers delivering curated solutions: agentic AI, ML, data, web and e-commerce. Try the live agent demo.",
      },
      { property: "og:title", content: "nonchtech — Nonchalant engineers, curated software" },
      {
        property: "og:description",
        content:
          "Agentic AI, ML, data, web and e-commerce, built by a small remote studio. Chat with our live agent on the homepage.",
      },
    ],
  }),
  component: Home,
});

const services = [
  {
    id: "agentic-ai",
    name: "Agentic AI",
    mark: serviceMarks.agentic,
    line: "Multi-tool agents that do the work, with evals and guardrails around them.",
  },
  {
    id: "ml-data-science",
    name: "ML / Data Science",
    mark: serviceMarks.ml,
    line: "Forecasting, propensity, risk. Models trained on your data, not a demo set.",
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    mark: serviceMarks.data,
    line: "Pipelines and dashboards that survive a Monday morning question.",
  },
  {
    id: "web-development",
    name: "Web Development",
    mark: serviceMarks.web,
    line: "Product engineering in TypeScript and Postgres. No template builds.",
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    mark: serviceMarks.ecommerce,
    line: "Storefronts, checkout and the unglamorous ops automation behind them.",
  },
];

const proof = [
  {
    metric: "91%",
    label: "invoices straight-through",
    body: "AP pipeline for a distribution group: 2,400 invoices a month, humans only touch variances over 5%.",
    slug: "ap-automation",
  },
  {
    metric: "-38%",
    label: "support handle time",
    body: "Retrieval agent over 11 years of ticket history and product docs, with a hard refusal policy.",
    slug: "support-agent",
  },
  {
    metric: "12.4%",
    label: "forecast error, down from 31%",
    body: "Demand model for a 4,100-SKU catalogue. Weekly retrain, stock-out alerts into Slack.",
    slug: "demand-forecast",
  },
];

const process = [
  {
    n: "01",
    title: "One call, no deck",
    body: "Thirty minutes. You describe the problem, we ask the awkward questions and say whether it's worth building.",
  },
  {
    n: "02",
    title: "Two-week shape",
    body: "A working slice, not a spec document. Real data, real constraints, a fixed price for the build that follows.",
  },
  {
    n: "03",
    title: "Build in the open",
    body: "Weekly deploys to your environment. You have the repo from day one. No black boxes, no seat licences.",
  },
  {
    n: "04",
    title: "Hand over or stay on",
    body: "Docs, runbooks and a walkthrough with your team. Retainers exist, but nothing is designed to trap you.",
  },
];

function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-14 sm:pt-20">
          <h1 className="rise max-w-4xl text-[2.5rem] leading-[0.98] sm:text-6xl lg:text-7xl">
            A group of <span className="text-accent">NONCHALANT</span> software engineers delivering
            curated solutions to elevate your entrepreneurial journey.
          </h1>
          <div className="mt-10 flex flex-col gap-6 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-base text-muted-foreground">
              Small team. Fully remote. We ship agents, models and products that hold up in
              production — then get out of your way.
            </p>
          </div>
        </div>
      </section>

      <LiveDemo />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 text-3xl leading-[1.05] sm:text-5xl">Five practices, one team.</h2>
          </div>
          <Link
            to="/services"
            className="border-b border-ink pb-0.5 text-sm font-medium hover:border-accent hover:text-accent"
          >
            Read the detail →
          </Link>
        </div>

        <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Mark = s.mark;
            return (
              <Link
                key={s.id}
                to="/services"
                hash={s.id}
                className="group bg-background p-6 transition-colors hover:bg-paper"
              >
                <Mark className="h-10 w-10 stroke-current text-accent" />
                <h3 className="mt-5 text-xl">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.line}</p>
                <span className="mt-4 inline-block text-xs font-medium text-muted-foreground transition-colors group-hover:text-accent">
                  Details →
                </span>
              </Link>
            );
          })}
          <div className="flex flex-col justify-between bg-ink p-6 text-ink-foreground">
            <MarkRecline className="h-10 w-10 stroke-current text-accent" />
            <p className="mt-5 text-sm leading-relaxed text-ink-foreground/80">
              Not sure which of these you need? That's usually the first thing we work out on the
              call.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-hairline bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow">Proof</p>
          <h2 className="mt-3 max-w-2xl text-3xl leading-[1.05] sm:text-5xl">
            Numbers from live systems, not a logo wall.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {proof.map((p) => (
              <div key={p.slug} className="border-t-2 border-ink pt-5">
                <Odometer
                  value={p.metric}
                  className="font-display text-5xl font-extrabold tracking-tight"
                />
                <p className="mt-1 text-sm font-medium text-accent">{p.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
          <Link
            to="/work"
            className="mt-10 inline-block border-b border-ink pb-0.5 text-sm font-medium hover:border-accent hover:text-accent"
          >
            All case studies →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">How it runs</p>
        <h2 className="mt-3 max-w-2xl text-3xl leading-[1.05] sm:text-5xl">
          Four steps. No discovery theatre.
        </h2>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <div key={step.n}>
              <p className="font-mono text-xs text-accent">{step.n}</p>
              <h3 className="mt-3 text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
