import { useMemo } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ParticleField({ density = "normal", gold = false }: { density?: "low" | "normal" | "high"; gold?: boolean }) {
  const reduced = useReducedMotion();
  const count = reduced ? 12 : density === "high" ? 44 : density === "low" ? 18 : 28;
  const particles = useMemo(() => Array.from({ length: count }, (_, index) => ({
    id: index,
    left: `${(index * 37 + 11) % 100}%`,
    top: `${(index * 61 + 7) % 100}%`,
    size: `${index % 5 === 0 ? 3 : index % 3 === 0 ? 2 : 1}px`,
    delay: `${(index % 9) * 0.55}s`,
    duration: `${4 + (index % 7)}s`,
  })), [count]);

  return (
    <div className={`particle-field ${gold ? "particle-field--gold" : ""}`} aria-hidden="true">
      {particles.map((particle) => (
        <span key={particle.id} className="particle" style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size, animationDelay: particle.delay, animationDuration: particle.duration }} />
      ))}
    </div>
  );
}
