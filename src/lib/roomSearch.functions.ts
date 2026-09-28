import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  query: z.string().min(1).max(500),
  day: z.string(),
  time: z.string(),
});

export type ParsedNeed = {
  floor: number | null;
  ac: boolean | null;
  projector: boolean | null;
  minCapacity: number | null;
  durationMinutes: number | null;
  startTime: string | null;
  summary: string;
};

const SYSTEM = `You convert a student's plain-language room request into structured filters.
Reply with ONLY a JSON object, no prose, no markdown fences, with exactly these keys:
{"floor": number|null, "ac": true|false|null, "projector": true|false|null, "minCapacity": number|null, "durationMinutes": number|null, "startTime": "HH:MM"|null, "summary": string}
Rules:
- Ground floor = 0, first floor = 1, second floor = 2, and so on.
- "me and my team" with no number means minCapacity 4. "a group of N" means N.
- "for the next 2 hours" means durationMinutes 120 and startTime null (means now).
- Use null for anything not mentioned. Keep summary under 12 words.`;

async function askGateway(prompt: string, apiKey: string): Promise<string> {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "openai/gpt-6-astra",
      stream: true,
      store: false,
      reasoning: { effort: "low" },
      input: [
        { role: "system", content: SYSTEM },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    const err = new Error(detail || `Gateway error ${res.status}`);
    (err as Error & { status?: number }).status = res.status;
    throw err;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const evt = JSON.parse(payload);
        if (evt.type === "response.output_text.delta" && typeof evt.delta === "string") {
          text += evt.delta;
        }
      } catch {
        /* partial event, ignore */
      }
    }
  }
  return text;
}

function extractJson(raw: string): unknown {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON in model reply");
  return JSON.parse(raw.slice(start, end + 1));
}

const needSchema = z.object({
  floor: z.number().int().nullable().catch(null),
  ac: z.boolean().nullable().catch(null),
  projector: z.boolean().nullable().catch(null),
  minCapacity: z.number().int().nullable().catch(null),
  durationMinutes: z.number().int().nullable().catch(null),
  startTime: z.string().regex(/^\d{2}:\d{2}$/).nullable().catch(null),
  summary: z.string().catch(""),
});

export const parseRoomRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<{ need: ParsedNeed | null; error: string | null }> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { need: null, error: "AI search isn't configured yet." };

    try {
      const raw = await askGateway(
        `Today is ${data.day} and the current time is ${data.time}.\nRequest: ${data.query}`,
        apiKey,
      );
      const need = needSchema.parse(extractJson(raw));
      return { need, error: null };
    } catch (e) {
      const status = (e as Error & { status?: number }).status;
      if (status === 429) return { need: null, error: "Too many requests right now — try again in a moment." };
      if (status === 402) return { need: null, error: "AI credits are exhausted. Top up to keep using search." };
      console.error("parseRoomRequest failed", e);
      return { need: null, error: "Couldn't understand that request. Try rephrasing it." };
    }
  });
