"use client";

import { useEffect, useState } from "react";

/*
 * Visitor count.
 *
 * Metric: one distinct visit per browser session (a full page load that
 * hasn't been counted yet this session). The increment is guarded at two
 * levels so React Strict Mode, re-renders, or internal navigation can
 * never double-count:
 *   1. a module-level promise ensures a single request per page load;
 *   2. a sessionStorage flag prevents re-counting across reloads.
 *
 * Talks to the /api/visitor-count route (a thin proxy over CounterAPI
 * that keeps the API token server-side). Override with
 * NEXT_PUBLIC_VISITOR_COUNT_ENDPOINT if you want a different backend.
 */

const ENDPOINT =
  process.env.NEXT_PUBLIC_VISITOR_COUNT_ENDPOINT ?? "/api/visitor-count";
const SESSION_KEY = "visitor-counted";

let cached: number | null = null;
let inflight: Promise<number | null> | null = null;

async function requestCount(endpoint: string): Promise<number | null> {
  let alreadyCounted = false;
  try {
    alreadyCounted = sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    /* storage unavailable — fall through and just read */
  }

  try {
    const url = `${endpoint}?action=${alreadyCounted ? "get" : "hit"}`;
    const res = await fetch(url, {
      method: alreadyCounted ? "GET" : "POST",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { count?: unknown };
    if (typeof data.count !== "number") return null;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    return data.count;
  } catch {
    return null;
  }
}

function loadCount(endpoint: string): Promise<number | null> {
  if (cached !== null) return Promise.resolve(cached);
  if (!inflight) {
    inflight = requestCount(endpoint).then((value) => {
      if (value !== null) cached = value;
      return value;
    });
  }
  return inflight;
}

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  const isPlaceholder = count === null;

  useEffect(() => {
    if (!ENDPOINT) return;
    let active = true;
    loadCount(ENDPOINT).then((value) => {
      if (active && value !== null) setCount(value);
    });
    return () => {
      active = false;
    };
  }, []);

  const display = count ?? 0;

  return (
    <span
      className="site-footer-views"
      title={isPlaceholder ? "No visitor counter connected yet" : undefined}
    >
      <span className="site-footer-count">
        {display.toLocaleString("en-US")}
      </span>{" "}
      visitors
    </span>
  );
}
