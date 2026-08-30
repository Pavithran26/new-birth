import { useCallback, useEffect, useRef, useState } from "react";

export function useSound(initialEnabled = false, source?: string) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);

  const start = useCallback(async () => {
    if (!source) return;
    const audio = audioRef.current ?? new Audio(source);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0;
    await audio.play();
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    const startedAt = performance.now();
    fadeRef.current = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - startedAt) / 1800);
      audio.volume = Number((progress * 0.16).toFixed(3));
      if (progress >= 1 && fadeRef.current) { window.clearInterval(fadeRef.current); fadeRef.current = null; }
    }, 40);
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    const startedAt = performance.now();
    const initialVolume = audio.volume;
    fadeRef.current = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - startedAt) / 900);
      audio.volume = Number((initialVolume * (1 - progress)).toFixed(3));
      if (progress >= 1) { audio.pause(); if (fadeRef.current) window.clearInterval(fadeRef.current); fadeRef.current = null; }
    }, 40);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((current) => {
      const next = !current;
      if (next) void start();
      else stop();
      return next;
    });
  }, [start, stop]);

  useEffect(() => () => {
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    audioRef.current?.pause();
    audioRef.current = null;
  }, []);

  return { enabled, toggle };
}
