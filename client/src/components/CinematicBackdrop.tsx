import { motion, useScroll, useTransform } from "framer-motion";

const blossoms = [
  [16, 21, 1], [25, 30, 0.75], [34, 17, 0.9], [43, 25, 0.65], [53, 12, 0.8], [61, 27, 0.72], [70, 18, 0.88], [78, 32, 0.62], [87, 23, 0.82],
  [21, 42, 0.58], [38, 38, 0.6], [58, 43, 0.55], [76, 45, 0.56],
];

export function CinematicBackdrop() {
  const { scrollYProgress } = useScroll();
  const zoom = useTransform(scrollYProgress, [0, 0.16, 0.35, 0.56, 0.76, 1], [1, 1.06, 1.14, 1.28, 1.46, 1.7]);
  const moonX = useTransform(scrollYProgress, [0, 0.5, 1], [0, -42, -92]);
  const treeX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 22, 55]);
  const hazeOpacity = useTransform(scrollYProgress, [0, 0.25, 0.62, 1], [0.45, 0.8, 0.66, 0.38]);

  return (
    <div className="cinematic-backdrop" aria-hidden="true">
      <motion.div className="backdrop-zoom" style={{ scale: zoom }}>
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
      </motion.div>
      <motion.div className="backdrop-haze" style={{ opacity: hazeOpacity }} />
      <div className="explore-badge"><span className="explore-line" />Scroll to explore<span className="explore-line" /></div>
    </div>
  );
}
