import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const blossoms = [
  [16, 21, 1], [25, 30, 0.75], [34, 17, 0.9], [43, 25, 0.65], [53, 12, 0.8], [61, 27, 0.72], [70, 18, 0.88], [78, 32, 0.62], [87, 23, 0.82],
  [21, 42, 0.58], [38, 38, 0.6], [58, 43, 0.55], [76, 45, 0.56],
];

const interactiveBlossoms = [
  [13, 45, 0.7, 1], [19, 57, 0.5, 0.7], [27, 49, 0.8, 1.2], [34, 39, 0.55, 0.8],
  [43, 31, 0.72, 1.4], [53, 38, 0.5, 0.8], [63, 29, 0.8, 1.1], [72, 41, 0.55, 0.9],
  [81, 34, 0.7, 1.25], [89, 49, 0.48, 0.7], [30, 64, 0.45, 1], [58, 56, 0.6, 0.9],
];

function InteractiveBlossom({ left, top, size, depth, pointerX, pointerY }: { left: number; top: number; size: number; depth: number; pointerX: ReturnType<typeof useMotionValue<number>>; pointerY: ReturnType<typeof useMotionValue<number>> }) {
  const x = useTransform(pointerX, [-1, 1], [-14 * depth, 14 * depth]);
  const y = useTransform(pointerY, [-1, 1], [-10 * depth, 10 * depth]);
  const rotate = useTransform(pointerX, [-1, 1], [-10 * depth, 10 * depth]);
  const scale = useTransform(pointerY, [-1, 1], [0.92, 1.08]);
  return <motion.span className="interactive-blossom" style={{ left: `${left}%`, top: `${top}%`, width: `${34 * size}px`, height: `${34 * size}px`, x, y, rotate, scale }}><i /><i /><i /><i /><i /><b /></motion.span>;
}

export function CinematicBackdrop({ activeScene }: { activeScene: string }) {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const pointerX = useSpring(useMotionValue(0), { stiffness: 80, damping: 22, mass: 0.7 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 80, damping: 22, mass: 0.7 });
  const zoom = useTransform(scrollYProgress, [0, 0.16, 0.35, 0.56, 0.76, 1], [1, 1.06, 1.14, 1.28, 1.46, 1.7]);
  const moonX = useTransform(scrollYProgress, [0, 0.5, 1], [0, -42, -92]);
  const treeX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 22, 55]);
  const hazeOpacity = useTransform(scrollYProgress, [0, 0.25, 0.62, 1], [0.45, 0.8, 0.66, 0.38]);
  const roadY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const roadScale = useTransform(scrollYProgress, [0, 0.45, 1], [1, 1.12, 1.32]);

  useEffect(() => {
    if (reduced) return;
    const move = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };
    const settle = () => { pointerX.set(0); pointerY.set(0); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", settle, { passive: true });
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", settle); };
  }, [pointerX, pointerY, reduced]);

  return (
    <div className={`cinematic-backdrop cinematic-backdrop--${activeScene}`} aria-hidden="true">
      <motion.div className="backdrop-zoom" style={{ scale: zoom }}>
        <motion.div className="travel-world" style={{ y: roadY, scale: roadScale }}>
          <div className="travel-horizon" />
          <div className="travel-road"><span /><span /><span /><span /><span /></div>
          <div className="travel-roadside travel-roadside--left"><i /><i /><i /></div>
          <div className="travel-roadside travel-roadside--right"><i /><i /><i /></div>
        </motion.div>
        <motion.div className="moon-world" style={{ x: moonX }}>
          <div className="moon-glow" />
          <div className="moon-disc"><span className="moon-crater moon-crater--one" /><span className="moon-crater moon-crater--two" /><span className="moon-crater moon-crater--three" /></div>
          <div className="moon-ring" />
        </motion.div>
        <motion.svg className="blossom-tree" style={{ x: treeX }} viewBox="0 0 900 900" preserveAspectRatio="xMidYMax meet">
          <defs><linearGradient id="branchGradient" x1="0" x2="1"><stop offset="0" stopColor="#090b12" /><stop offset=".7" stopColor="#17162b" /><stop offset="1" stopColor="#3a2c48" /></linearGradient></defs>
          <path d="M-60 910 C40 760 75 655 112 480 C133 378 187 269 319 222 C407 190 481 143 540 45" fill="none" stroke="url(#branchGradient)" strokeWidth="32" strokeLinecap="round" />
          <path d="M83 665 C167 600 238 567 339 551 C440 535 526 466 587 371" fill="none" stroke="url(#branchGradient)" strokeWidth="18" strokeLinecap="round" />
          <path d="M125 489 C233 440 306 379 375 282" fill="none" stroke="url(#branchGradient)" strokeWidth="14" strokeLinecap="round" />
          <path d="M226 577 C283 492 323 442 416 410" fill="none" stroke="url(#branchGradient)" strokeWidth="10" strokeLinecap="round" />
          <path d="M320 551 C411 579 515 586 647 527" fill="none" stroke="url(#branchGradient)" strokeWidth="12" strokeLinecap="round" />
          <path d="M376 283 C440 276 511 293 604 341" fill="none" stroke="url(#branchGradient)" strokeWidth="9" strokeLinecap="round" />
          <path d="M485 170 C578 175 664 214 746 285" fill="none" stroke="url(#branchGradient)" strokeWidth="13" strokeLinecap="round" />
          <path d="M540 45 C623 67 696 122 783 209" fill="none" stroke="url(#branchGradient)" strokeWidth="10" strokeLinecap="round" />
          {blossoms.map(([cx, cy, scale], index) => <g key={index} transform={`translate(${cx * 8.8} ${cy * 8.8}) scale(${scale})`}><circle r="11" fill="#d7969e" opacity=".82" /><circle cx="13" cy="-5" r="9" fill="#e5b0a7" opacity=".78" /><circle cx="7" cy="12" r="8" fill="#c98999" opacity=".72" /><circle cx="-9" cy="9" r="7" fill="#efc1ae" opacity=".6" /><circle r="3.5" fill="#f3d595" /></g>)}
        </motion.svg>
        <div className="interactive-blossom-layer">
          {interactiveBlossoms.map(([left, top, size, depth], index) => <InteractiveBlossom key={index} left={left} top={top} size={size} depth={depth} pointerX={pointerX} pointerY={pointerY} />)}
        </div>
      </motion.div>
      <motion.div className="backdrop-haze" style={{ opacity: hazeOpacity }} />
      <div className="explore-badge"><span className="explore-line" />Scroll to explore<span className="explore-line" /></div>
    </div>
  );
}
