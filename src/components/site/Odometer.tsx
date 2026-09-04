import { useEffect, useRef, useState } from "react";

const DIGITS = "0123456789";

/**
 * Odometer-style rolling number. Each digit column spins vertically like a
 * slot machine reel, then settles on the final digit. Non-numeric characters
 * (%, -, ., letters) render statically. Starts when scrolled into view.
 */
export function Odometer({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [rolled, setRolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRolled(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRolled(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={className} aria-label={value} role="text">
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <DigitReel key={i} digit={Number(ch)} rolled={rolled} index={i} />
        ) : (
          <span key={i} aria-hidden="true">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

function DigitReel({
  digit,
  rolled,
  index,
}: {
  digit: number;
  rolled: boolean;
  index: number;
}) {
  // Reel shows a full 0-9 cycle plus the final digit, so it always spins at
  // least one full turn before landing.
  const reel = DIGITS + digit;
  return (
    <span
      aria-hidden="true"
      className="inline-block h-[1em] overflow-hidden align-baseline leading-none"
    >
      <span
        className="flex flex-col tabular-nums"
        style={{
          transform: rolled ? `translateY(-${DIGITS.length + digit}em)` : "translateY(0)",
          transitionProperty: "transform",
          transitionDuration: "1.4s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${index * 120}ms`,
        }}
      >
        {reel.split("").map((d, j) => (
          <span key={j} className="flex h-[1em] items-center justify-center leading-none">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}
