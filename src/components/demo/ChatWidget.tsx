import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

/**
 * Floating chat widget, fixed bottom-right on every page.
 * Talks to the same live agent (/api/chat) as the homepage demo.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, status, open]);

  useEffect(() => {
    if (open && !busy) inputRef.current?.focus();
  }, [open, busy]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    void sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with the nonchtech agent"
          className="flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col border border-ink bg-background shadow-[0_18px_50px_-12px_rgba(0,0,0,0.35)]"
        >
          <div className="flex items-center justify-between border-b border-hairline bg-ink px-4 py-3 text-ink-foreground">
            <div>
              <p className="text-sm font-medium">Nonch — live agent</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-foreground/60">
                Real model · streamed
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="px-2 py-1 text-lg leading-none transition-opacity hover:opacity-70"
            >
              ×
            </button>
          </div>

          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto bg-paper p-3">
            {messages.length === 0 && (
              <p className="max-w-[85%] text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Nonch is listening.</span> Ask about
                scope, stack, timelines — or what we'd build for you.
              </p>
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
                  <p
                    className={`whitespace-pre-wrap text-sm leading-relaxed ${
                      mine
                        ? "max-w-[80%] bg-ink px-3 py-2 text-ink-foreground"
                        : "max-w-[92%] border-l-2 border-accent pl-3 text-foreground"
                    }`}
                  >
                    {text}
                  </p>
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
              placeholder="Ask something specific…"
              aria-label="Message the agent"
              className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="bg-ink px-4 text-sm font-medium text-ink-foreground transition-opacity disabled:opacity-35"
            >
              {busy ? "…" : "Send"}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat with the nonchtech agent"}
        aria-expanded={open}
        className="flex h-12 items-center gap-2 border border-ink bg-ink px-4 text-sm font-medium text-ink-foreground shadow-[0_10px_30px_-8px_rgba(0,0,0,0.4)] transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6Z" />
          <path d="M8.5 10h.01M12 10h.01M15.5 10h.01" strokeLinecap="round" strokeWidth="2.5" />
        </svg>
        {open ? "Close" : "Chat with us"}
      </button>
    </div>
  );
}
