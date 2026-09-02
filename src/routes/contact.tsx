import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact nonchtech — email, phone, 30-minute call" },
      {
        name: "description",
        content:
          "Talk to nonchtech directly: info@nonchtech.com, +92-318-5445125, or book a 30-minute call. Fully remote team working across PKT, CET and ET.",
      },
      { property: "og:title", content: "Contact nonchtech" },
      {
        property: "og:description",
        content:
          "Email, phone or a 30-minute call. No intake form, no gatekeeping. Fully remote team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const channels = [
  {
    label: "Email",
    value: "info@nonchtech.com",
    href: "mailto:info@nonchtech.com",
    note: "Answered within a working day, usually sooner.",
  },
  {
    label: "Phone",
    value: "+92-318-5445125",
    href: "tel:+923185445125",
    note: "Call or WhatsApp. PKT hours, but we pick up late.",
  },
  {
    label: "Book a call",
    value: "30 minutes, no deck",
    href: "https://cal.com/nonchtech/30min",
    note: "Pick a slot. You describe the problem, we ask the awkward questions.",
  },
];

function Contact() {
  return (
    <>
      <section className="border-b border-hairline">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-16">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-[1.02] sm:text-6xl">
            Tell us what's broken. We'll tell you what it takes.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            A group of nonchalant software engineers delivering curated solutions to elevate your
            entrepreneurial journey. Reaching us is the easy part — no form, no qualification quiz.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-px border border-hairline bg-hairline md:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noreferrer" : undefined}
              className="group bg-background p-7 transition-colors hover:bg-paper"
            >
              <p className="eyebrow">{c.label}</p>
              <p className="mt-3 text-xl leading-snug transition-colors group-hover:text-accent">
                {c.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.note}</p>
            </a>
          ))}
        </div>

        <div className="mt-14 grid gap-10 border-t border-hairline pt-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl">Fully remote. On purpose.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              There is no office to visit. The team works across PKT, CET and ET, which means
              overlap with most of Europe and the US east coast on any given day. Code lands in your
              repository, deploys go to your environment, and standups happen wherever your team
              already talks.
            </p>
          </div>
          <div>
            <h2 className="text-2xl">What the first call looks like</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>— Thirty minutes, one engineer, no salesperson.</li>
              <li>— You describe the problem and the constraints you already know about.</li>
              <li>— We say whether it's worth building, and roughly what it costs.</li>
              <li>— If it isn't a fit, we'll say that too, on the call.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
