// Custom line marks drawn in the spirit of the nonchtech reclining figure:
// one relaxed body, a few confident strokes. No icon-pack robots.

type MarkProps = { className?: string };

const base = "h-8 w-8 stroke-current";
const common = {
  fill: "none",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MarkAgent({ className }: MarkProps) {
  // A reclining figure with three tool-arms reaching out.
  return (
    <svg viewBox="0 0 48 48" className={className ?? base} aria-hidden="true">
      <g {...common}>
        <circle cx="13" cy="26" r="4" />
        <path d="M17 29c4 3 8 3 12 1" />
        <path d="M29 30l7-4M29 30l8 2M29 30l4 8" />
        <circle cx="37" cy="25" r="2.2" />
        <circle cx="38" cy="33" r="2.2" />
        <circle cx="34" cy="39" r="2.2" />
        <path d="M9 34h10" />
      </g>
    </svg>
  );
}

export function MarkModel({ className }: MarkProps) {
  // A lounging curve over a forecast horizon.
  return (
    <svg viewBox="0 0 48 48" className={className ?? base} aria-hidden="true">
      <g {...common}>
        <path d="M6 34c6 0 8-14 15-14s9 9 15 9" />
        <path d="M36 29l6-6" />
        <circle cx="21" cy="20" r="2.4" />
        <path d="M6 40h36" />
        <path d="M42 23v6h-6" />
      </g>
    </svg>
  );
}

export function MarkData({ className }: MarkProps) {
  // Bars at rest, one leaning back.
  return (
    <svg viewBox="0 0 48 48" className={className ?? base} aria-hidden="true">
      <g {...common}>
        <path d="M8 40h32" />
        <path d="M13 40V27" />
        <path d="M22 40V19" />
        <path d="M31 40V31" />
        <path d="M38 40l4-16" />
        <circle cx="42" cy="20" r="2.4" />
      </g>
    </svg>
  );
}

export function MarkWeb({ className }: MarkProps) {
  // A browser frame with a figure kicking back inside it.
  return (
    <svg viewBox="0 0 48 48" className={className ?? base} aria-hidden="true">
      <g {...common}>
        <rect x="7" y="11" width="34" height="26" rx="2" />
        <path d="M7 18h34" />
        <circle cx="19" cy="27" r="3" />
        <path d="M22 29c3 2 6 2 9-1" />
        <path d="M14 33h18" />
      </g>
    </svg>
  );
}

export function MarkCommerce({ className }: MarkProps) {
  // A cart tipped into a relaxed lean.
  return (
    <svg viewBox="0 0 48 48" className={className ?? base} aria-hidden="true">
      <g {...common}>
        <path d="M7 12h5l5 18h18l4-13H15" />
        <circle cx="20" cy="37" r="2.4" />
        <circle cx="33" cy="37" r="2.4" />
        <path d="M27 17v7M23.5 20.5h7" />
      </g>
    </svg>
  );
}

export function MarkRecline({ className }: MarkProps) {
  // The house mark, minimal: the figure itself.
  return (
    <svg viewBox="0 0 48 48" className={className ?? base} aria-hidden="true">
      <g {...common}>
        <circle cx="17" cy="18" r="4.5" />
        <path d="M10 24c5-3 10-2 13 2l6-2 8 6" />
        <path d="M29 24l1 9" />
        <path d="M8 33h14" />
      </g>
    </svg>
  );
}

export const serviceMarks = {
  agentic: MarkAgent,
  ml: MarkModel,
  data: MarkData,
  web: MarkWeb,
  ecommerce: MarkCommerce,
};
