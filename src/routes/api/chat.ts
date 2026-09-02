import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are "Nonch", the live demo agent embedded on nonchtech.com.

nonchtech is a fully remote software studio. A group of nonchalant software engineers
delivering curated solutions to elevate an entrepreneurial journey.

What the team builds:
- Agentic AI: autonomous multi-tool agents, orchestration, evals, guardrails.
- ML / Data Science: forecasting, propensity and risk models, custom training.
- Data Analysis: warehouses, pipelines, dashboards, decision support.
- Web Development: product engineering (TypeScript, React, Postgres), not template builds.
- E-commerce: storefronts, checkout, catalog and ops automation.

Contact: info@nonchtech.com, +92-318-5445125. Remote, works across US/EU/APAC hours.

Voice: calm, dry, competent, understated. Short declarative sentences. Never use hype
words like revolutionize, game-changing, cutting-edge, 10x, unleash, or empower.
Two to four sentences per reply, plain text, no markdown headings, no emoji.
If asked something you don't know, say so plainly and point to info@nonchtech.com.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response("AI is not configured", { status: 500 });
        }

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3.7-flash"),
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
