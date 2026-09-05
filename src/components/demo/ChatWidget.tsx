import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Floating chat widget, fixed bottom-right on every page.
 * Talks to the same live agent (/api/chat) as the homepage demo.
 * Optional voice: browser speech recognition for input, speech synthesis for replies.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [speak, setSpeak] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognition = useRef<any>(null);
  const spoken = useRef<Set<string>>(new Set());
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

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || busy) return;
      void sendMessage({ text: trimmed });
      setInput("");
    },
    [busy, sendMessage],
  );

  // Set up browser speech recognition once, if the browser has it.
  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition ?? null;
    if (!SR || typeof window.speechSynthesis === "undefined") return;
    setVoiceSupported(true);
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e: any) => {
      const said = e.results?.[0]?.[0]?.transcript ?? "";
      if (said) send(said);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognition.current = rec;
    return () => {
      try {
        rec.abort();
      } catch {
        /* ignore */
      }
      window.speechSynthesis.cancel();
    };
  }, [send]);

  function toggleMic() {
    const rec = recognition.current;
    if (!rec) return;
    if (listening) {
      rec.stop();
      setListening(false);
      return;
    }
    window.speechSynthesis?.cancel();
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }

  // Read finished assistant replies out loud when voice replies are on.
  useEffect(() => {
    if (!speak || busy) return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant" || spoken.current.has(last.id)) return;
    const text = last.parts
      .map((part) => (part.type === "text" ? part.text : ""))
      .join("")
      .trim();
    if (!text) return;
    spoken.current.add(last.id);
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.02;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }, [messages, speak, busy]);

  useEffect(() => {
    if (!speak) window.speechSynthesis?.cancel();
  }, [speak]);


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
            <div className="flex items-center gap-1">
              {voiceSupported && (
                <button
                  type="button"
                  onClick={() => setSpeak((v) => !v)}
                  aria-pressed={speak}
                  aria-label={speak ? "Turn off spoken replies" : "Turn on spoken replies"}
                  title={speak ? "Spoken replies on" : "Spoken replies off"}
                  className={`px-2 py-1 text-xs transition-opacity hover:opacity-70 ${
                    speak ? "text-accent" : "text-ink-foreground/60"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M4 9v6h4l5 4V5L8 9H4Z" strokeLinejoin="round" />
                    {speak && <path d="M16.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />}
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="px-2 py-1 text-lg leading-none transition-opacity hover:opacity-70"
              >
                ×
              </button>
            </div>

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
            {voiceSupported && (
              <button
                type="button"
                onClick={toggleMic}
                aria-pressed={listening}
                aria-label={listening ? "Stop voice input" : "Speak your message"}
                title={listening ? "Listening…" : "Speak your message"}
                className={`px-3 transition-colors ${
                  listening ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="9" y="3" width="6" height="11" rx="3" />
                  <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
                </svg>
              </button>
            )}
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
