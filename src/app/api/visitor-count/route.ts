import type { NextRequest } from "next/server";

/*
 * Visitor-count proxy.
 *
 * Keeps the CounterAPI token server-side (never exposed to the browser).
 * The client calls:
 *   GET  /api/visitor-count?action=get  -> { count: number }
 *   POST /api/visitor-count?action=hit  -> { count: number }
 *
 * Requires env vars (set in Vercel → Settings → Environment Variables):
 *   COUNTERAPI_TOKEN     - API token from https://counterapi.dev
 *   COUNTERAPI_WORKSPACE - workspace slug
 *   COUNTERAPI_COUNTER   - counter name (optional, defaults to "portfolio-visitors")
 */

const BASE = "https://api.counterapi.dev/v2";

const TOKEN = process.env.COUNTERAPI_TOKEN ?? "";
const WORKSPACE = process.env.COUNTERAPI_WORKSPACE ?? "";
const COUNTER = process.env.COUNTERAPI_COUNTER ?? "portfolio-visitors";

function unauthorized() {
  return Response.json({ error: "Counter not configured" }, { status: 503 });
}

async function callCounter(action: "get" | "up"): Promise<number | null> {
  const url =
    action === "up"
      ? `${BASE}/${WORKSPACE}/${COUNTER}/up`
      : `${BASE}/${WORKSPACE}/${COUNTER}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const body = (await res.json()) as {
    data?: { up_count?: unknown };
  };

  const upCount = body.data?.up_count;
  return typeof upCount === "number" ? upCount : null;
}

async function handle(request: NextRequest) {
  if (!TOKEN || !WORKSPACE) return unauthorized();

  const action = request.nextUrl.searchParams.get("action");

  try {
    const count =
      action === "hit"
        ? await callCounter("up")
        : await callCounter("get");

    if (count === null) {
      return Response.json({ error: "Upstream error" }, { status: 502 });
    }

    return Response.json({ count });
  } catch {
    return Response.json({ error: "Upstream error" }, { status: 502 });
  }
}

export async function GET(request: NextRequest) {
  return handle(request);
}

export async function POST(request: NextRequest) {
  return handle(request);
}
