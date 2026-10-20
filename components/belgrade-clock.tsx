"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("sr-RS", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Belgrade",
});

export function BelgradeClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <b className="font-medium text-paper tabular-nums" suppressHydrationWarning>
      {time || "--:--"}
    </b>
  );
}
