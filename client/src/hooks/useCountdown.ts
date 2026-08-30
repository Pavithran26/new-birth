import { useEffect, useMemo, useState } from "react";

export type CountdownState = {
  phase: "before" | "today" | "after";
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function useCountdown(day: number, month: number): CountdownState {
  const getState = (): CountdownState => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthday = new Date(currentYear, month - 1, day, 0, 0, 0, 0);
    const startOfToday = new Date(currentYear, now.getMonth(), now.getDate());
    const endOfToday = new Date(currentYear, now.getMonth(), now.getDate() + 1);

    if (startOfToday.getTime() === birthday.getTime()) {
      return { phase: "today", days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    if (startOfToday > birthday) {
      return { phase: "after", days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const distance = Math.max(0, birthday.getTime() - now.getTime());
    return {
      phase: "before",
      days: Math.floor(distance / 86_400_000),
      hours: Math.floor((distance / 3_600_000) % 24),
      minutes: Math.floor((distance / 60_000) % 60),
      seconds: Math.floor((distance / 1_000) % 60),
    };
  };

  const [state, setState] = useState<CountdownState>(() => getState());
  useEffect(() => {
    const interval = window.setInterval(() => setState(getState()), 1000);
    return () => window.clearInterval(interval);
  }, [day, month]);
  return useMemo(() => state, [state]);
}
