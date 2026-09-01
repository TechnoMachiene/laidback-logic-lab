import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

type Panel = "chat" | "voice" | "sms" | "flow";

const panels: { id: Panel; label: string; note: string }[] = [
  { id: "chat", label: "Chat agent", note: "Live model, streaming" },
  { id: "voice", label: "Phone call", note: "Simulated transcript" },
  { id: "sms", label: "SMS trigger", note: "Simulated delivery" },
  { id: "flow", label: "Automation run", note: "Simulated pipeline" },
];

export function LiveDemo() {
  const [panel, setPanel] = useState<Panel>("chat");

  return (
    <section id="demo" className="scroll-mt-16 border-y border-hairline bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Live demo</p>
            <h2 className="mt-3 max-w-xl text-3xl leading-[1.05] sm:text-5xl">
              Four things we build. Running right here.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            The chat agent is a real model call from this page. The call, SMS and pipeline panels
            are labelled simulations with real timing — we don't dial strangers for a demo.
          </p>
        </div>

        <div className="mt-10 border border-ink bg-background">
          <div className="flex flex-wrap border-b border-hairline">
            {panels.map((p) => {
              const active = panel === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPanel(p.id)}
                  aria-pressed={active}
                  className={`flex-1 border-r border-hairline px-4 py-3 text-left transition-colors last:border-r-0 ${
                    active ? "bg-ink text-ink-foreground" : "hover:bg-secondary"
                  }`}
                >
                  <span className="block text-sm font-medium">{p.label}</span>
                  <span
                    className={`mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] ${
                      active ? "text-ink-foreground/60" : "text-muted-foreground"
                    }`}
                  >
                    {p.note}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-4 sm:p-6">
            {panel === "chat" && <ChatPanel />}
            {panel === "voice" && <VoicePanel />}
            {panel === "sms" && <SmsPanel />}
            {panel === "flow" && <FlowPanel />}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- chat --- */

const starters = [
  "What would you build for a 3-person startup?",
  "How do you keep an agent from going off the rails?",
  "What does an engagement cost and how long does it take?",
];

function ChatPanel() {
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (!busy) inputRef.current?.focus();
  }, [busy]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    void sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_15rem]">
      <div className="flex h-[26rem] flex-col border border-hairline bg-paper">
        <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="max-w-md text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Nonch is listening.</p>
              <p className="mt-1">
                Ask about scope, stack, timelines or how we run agents in production. Answers come
                from a live model with our brief attached — not a canned script.
              </p>
            </div>
          )}

          {messages.map((m) => {
            const text = m.parts
              .map((part) => (part.type === "text" ? part.text : ""))
              .join("")
              .trim();
            if (!text) return null;
            const mine = m.role === "user";
            return (
              <div key={m.id} className={mine ? "flex justify-end" : ""}>
                <div className={mine ? "max-w-[80%]" : "max-w-[92%]"}>
                  <p className="eyebrow mb-1">{mine ? "You" : "Nonch"}</p>
                  <p
                    className={`whitespace-pre-wrap text-sm leading-relaxed ${
                      mine
                        ? "bg-ink px-3 py-2 text-ink-foreground"
                        : "border-l-2 border-accent pl-3 text-foreground"
                    }`}
                  >
                    {text}
                  </p>
                </div>
              </div>
            );
          })}

          {status === "submitted" && (
            <p className="border-l-2 border-accent pl-3 font-mono text-xs text-muted-foreground">
              thinking<span className="animate-pulse">…</span>
            </p>
          )}
          {error && (
            <p className="border-l-2 border-destructive pl-3 text-sm text-destructive">
              The agent couldn't answer that one. Try again, or email info@nonchtech.com.
            </p>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex border-t border-hairline"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the agent something specific…"
            aria-label="Message the demo agent"
            className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="bg-ink px-5 text-sm font-medium text-ink-foreground transition-opacity disabled:opacity-35"
          >
            {busy ? "…" : "Send"}
          </button>
        </form>
      </div>

      <div className="space-y-2">
        <p className="eyebrow">Try one</p>
        {starters.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => send(s)}
            disabled={busy}
            className="block w-full border border-hairline px-3 py-2 text-left text-xs leading-relaxed transition-colors hover:border-ink disabled:opacity-40"
          >
            {s}
          </button>
        ))}
        <p className="pt-2 font-mono text-[10px] leading-relaxed text-muted-foreground">
          Model: gemini-3.7-flash · streamed over a server route · no chat history stored.
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- timing --- */

function useSequence<T>(steps: { delay: number; value: T }[]) {
  const [emitted, setEmitted] = useState<T[]>([]);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  function start() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setEmitted([]);
    setRunning(true);
    let t = 0;
    steps.forEach((step, i) => {
      t += step.delay;
      timers.current.push(
        setTimeout(() => {
          setEmitted((prev) => [...prev, step.value]);
          if (i === steps.length - 1) setRunning(false);
        }, t),
      );
    });
  }

  return { emitted, running, start };
}

function DemoBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- voice --- */

const callTurns = [
  { delay: 900, value: { who: "system", text: "Dialing +92-318-5445125…" } },
  { delay: 1600, value: { who: "system", text: "Connected · 00:01" } },
  {
    delay: 900,
    value: {
      who: "agent",
      text: "Hi, this is the nonchtech scheduling agent. I'm calling about the integration review you requested. Is now still a good time?",
    },
  },
  { delay: 2200, value: { who: "caller", text: "Yes, go ahead." } },
  {
    delay: 1400,
    value: {
      who: "agent",
      text: "Thanks. I have Thursday 3pm or Friday 10am, both your local time. Which works?",
    },
  },
  { delay: 2000, value: { who: "caller", text: "Thursday." } },
  {
    delay: 1300,
    value: {
      who: "agent",
      text: "Booked for Thursday 3pm. I've sent the invite and a one-page brief to your inbox. Anything else before I hang up?",
    },
  },
  { delay: 1800, value: { who: "caller", text: "No, that's it." } },
  { delay: 1200, value: { who: "system", text: "Call ended · 00:41 · transcript stored" } },
];

function VoicePanel() {
  const { emitted, running, start } = useSequence(callTurns);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_15rem]">
      <div className="h-[26rem] overflow-y-auto border border-hairline bg-paper p-4">
        {emitted.length === 0 && !running && (
          <p className="max-w-md text-sm text-muted-foreground">
            An outbound voice agent that books a slot and hangs up. Press start to watch the
            transcript arrive at real speaking pace.
          </p>
        )}
        <ul className="space-y-3">
          {emitted.map((turn, i) => (
            <li key={i} className="rise text-sm leading-relaxed">
              {turn.who === "system" ? (
                <p className="font-mono text-xs text-muted-foreground">— {turn.text}</p>
              ) : (
                <p
                  className={
                    turn.who === "agent"
                      ? "border-l-2 border-accent pl-3"
                      : "border-l-2 border-hairline pl-3 text-muted-foreground"
                  }
                >
                  <span className="eyebrow mr-2">{turn.who === "agent" ? "Agent" : "Caller"}</span>
                  {turn.text}
                </p>
              )}
            </li>
          ))}
        </ul>
        {running && (
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            listening<span className="animate-pulse">…</span>
          </p>
        )}
      </div>

      <div className="space-y-3">
        <DemoBadge>Simulated</DemoBadge>
        <button
          type="button"
          onClick={start}
          disabled={running}
          className="w-full bg-ink px-4 py-2.5 text-sm font-medium text-ink-foreground transition-opacity disabled:opacity-35"
        >
          {running ? "Call in progress…" : "Place demo call"}
        </button>
        <p className="font-mono text-[10px] leading-relaxed text-muted-foreground">
          Production build: Twilio Voice · streaming STT · tool-calling agent · calendar write-back
          · transcript to CRM. We don't dial real numbers from a public page.
        </p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- sms --- */

const smsSteps = [
  { delay: 500, value: { label: "Webhook received", detail: "order.created · #4417" } },
  { delay: 700, value: { label: "Template rendered", detail: "delivery_eta · en-GB" } },
  { delay: 900, value: { label: "Queued to carrier", detail: "msg_01JQ8T…" } },
  { delay: 1200, value: { label: "Delivered", detail: "carrier receipt · 2.1s end-to-end" } },
];

function SmsPanel() {
  const { emitted, running, start } = useSequence(smsSteps);
  const done = emitted.length === smsSteps.length;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_15rem]">
      <div className="flex h-[26rem] flex-col gap-4 border border-hairline bg-paper p-4">
        <div className="mx-auto w-full max-w-xs border border-ink bg-background">
          <p className="border-b border-hairline px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            nonchtech · SMS
          </p>
          <div className="min-h-28 p-3">
            {done ? (
              <p className="rise bg-secondary px-3 py-2 text-sm leading-relaxed">
                Order #4417 is packed and leaves the warehouse today. ETA Thu 12 Sep. Reply STOP to
                opt out.
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                {running ? "sending…" : "No messages yet."}
              </p>
            )}
          </div>
        </div>

        <ul className="space-y-2 font-mono text-xs">
          {emitted.map((s, i) => (
            <li key={i} className="rise flex items-baseline gap-2">
              <span className="text-accent">✓</span>
              <span className="text-foreground">{s.label}</span>
              <span className="text-muted-foreground">{s.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <DemoBadge>Simulated</DemoBadge>
        <button
          type="button"
          onClick={start}
          disabled={running}
          className="w-full bg-ink px-4 py-2.5 text-sm font-medium text-ink-foreground transition-opacity disabled:opacity-35"
        >
          {running ? "Sending…" : "Trigger demo SMS"}
        </button>
        <p className="font-mono text-[10px] leading-relaxed text-muted-foreground">
          Production build: signed webhook → template service → Twilio Messaging → delivery receipts
          written back to the order record.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- flow --- */

const flowSteps = [
  { key: "ingest", label: "Ingest invoice PDF", detail: "3 pages · 412 KB" },
  { key: "extract", label: "Extract line items", detail: "vision model · 18 rows" },
  { key: "match", label: "Match against PO", detail: "17 exact · 1 variance" },
  { key: "check", label: "Policy check", detail: "variance 4.2% · under 5% threshold" },
  { key: "post", label: "Post to ledger", detail: "journal #JE-2291" },
  { key: "notify", label: "Notify finance", detail: "Slack #ap-inbox" },
];

function FlowPanel() {
  const { emitted, running, start } = useSequence(
    flowSteps.map((s, i) => ({ delay: i === 0 ? 400 : 700 + i * 180, value: s })),
  );
  const doneKeys = new Set(emitted.map((s) => s.key));

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_15rem]">
      <div className="h-[26rem] overflow-y-auto border border-hairline bg-paper p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="eyebrow">Run · accounts-payable-v3</p>
          <p className="font-mono text-xs text-muted-foreground">
            {emitted.length}/{flowSteps.length} steps
          </p>
        </div>
        <ol className="space-y-0">
          {flowSteps.map((step, i) => {
            const complete = doneKeys.has(step.key);
            const active = running && !complete && emitted.length === i;
            return (
              <li key={step.key} className="flex gap-4 pb-6 last:pb-0">
                <div className="flex flex-col items-center">
                  <span
                    className={`mt-1 h-3 w-3 shrink-0 border ${
                      complete
                        ? "border-accent bg-accent"
                        : active
                          ? "animate-pulse border-ink bg-background"
                          : "border-hairline bg-background"
                    }`}
                  />
                  {i < flowSteps.length - 1 && (
                    <span
                      className={`w-px flex-1 ${complete ? "bg-accent" : "bg-hairline"}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className={complete || active ? "" : "opacity-40"}>
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {complete ? step.detail : active ? "running…" : "queued"}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="space-y-3">
        <DemoBadge>Simulated</DemoBadge>
        <button
          type="button"
          onClick={start}
          disabled={running}
          className="w-full bg-ink px-4 py-2.5 text-sm font-medium text-ink-foreground transition-opacity disabled:opacity-35"
        >
          {running ? "Running…" : "Run automation"}
        </button>
        <p className="font-mono text-[10px] leading-relaxed text-muted-foreground">
          Mirrors a live AP pipeline we run for a distribution client: 2,400 invoices a month, 91%
          straight-through, humans only see the variances.
        </p>
      </div>
    </div>
  );
}
