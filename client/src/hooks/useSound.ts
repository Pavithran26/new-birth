import { useCallback, useEffect, useRef, useState } from "react";

export function useSound(initialEnabled = false) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const start = useCallback(async () => {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = contextRef.current ?? new AudioContextClass();
    contextRef.current = context;
    if (context.state === "suspended") await context.resume();
    if (!gainRef.current) {
      const gain = context.createGain();
      const filter = context.createBiquadFilter();
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = 196;
      filter.type = "lowpass";
      filter.frequency.value = 500;
      gain.gain.value = 0;
      oscillator.connect(filter).connect(gain).connect(context.destination);
      oscillator.start();
      gainRef.current = gain;
      oscillatorRef.current = oscillator;
    }
    const now = context.currentTime;
    gainRef.current.gain.cancelScheduledValues(now);
    gainRef.current.gain.linearRampToValueAtTime(0.018, now + 1.8);
  }, []);

  const stop = useCallback(() => {
    const context = contextRef.current;
    const gain = gainRef.current;
    if (!context || !gain) return;
    const now = context.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.linearRampToValueAtTime(0, now + 0.9);
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
    oscillatorRef.current?.stop();
    void contextRef.current?.close();
  }, []);

  return { enabled, toggle };
}
