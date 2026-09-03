import { Link } from "@tanstack/react-router";

import logo from "@/assets/nonch-logo-nobg.png.asset.json";

export function Wordmark({ className = "h-9" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="nonchtech"
      className={`${className} w-auto object-contain object-left`}
      width={440}
      height={128}
    />
  );
}

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" aria-label="nonchtech home" className="-ml-1 shrink-0 overflow-hidden">
          <Wordmark className="h-12" />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:px-2.5"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="demo"
            className="ml-2 hidden border border-ink px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-ink-foreground sm:inline-block"
          >
            See it work
          </Link>
        </nav>

      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h2 className="max-w-md text-3xl leading-[1.05] sm:text-4xl">
              Tell us what's broken. We'll tell you what it takes.
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:info@nonchtech.com"
                className="bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                info@nonchtech.com
              </a>
              <Link
                to="/contact"
                className="border border-ink-foreground/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-ink-foreground hover:text-ink"
              >
                Book 30 minutes
              </Link>
            </div>
          </div>

          <div className="text-sm">
            <p className="eyebrow text-ink-foreground/50">Pages</p>
            <ul className="mt-3 space-y-2 text-ink-foreground/80">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-ink-foreground">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <p className="eyebrow text-ink-foreground/50">Direct</p>
            <ul className="mt-3 space-y-2 text-ink-foreground/80">
              <li>
                <a href="mailto:info@nonchtech.com" className="hover:text-ink-foreground">
                  info@nonchtech.com
                </a>
              </li>
              <li>
                <a href="tel:+923185445125" className="hover:text-ink-foreground">
                  +92-318-5445125
                </a>
              </li>
              <li className="text-ink-foreground/60">Fully remote. No office to visit.</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ink-foreground/15 pt-6 text-xs text-ink-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} nonchtech. Written by hand.</p>
          <p>Remote-first, working across PKT, CET and ET.</p>
        </div>
      </div>
    </footer>
  );
}
