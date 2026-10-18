"use client";

import { useEffect, useState } from "react";

/*
 * Live local time for Asia/Kolkata (Pune, India).
 *
 * Renders a stable placeholder on the server and first client paint to
 * avoid a hydration mismatch, then fills in the real time after mount.
 * Updates on the minute (aligned to the next minute boundary) rather
 * than every second, and clears its timers on unmount.
 */

function formatKolkata(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatKolkata(new Date()));

    update();

    // Align the first tick to the next minute, then step once a minute.
    const now = new Date();
    const msToNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      update();
      interval = setInterval(update, 60_000);
    }, msToNextMinute);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <time
      dateTime={time ?? undefined}
      aria-label="Current local time in Pune, India"
    >
      {time ?? "--:--"}
    </time>
  );
}
