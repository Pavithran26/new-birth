import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowDown, ArrowRight, CalendarDays, ChevronDown, Code2, Gift, Heart, Moon, Sparkles, Sun, WandSparkles } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";
import { Cake } from "@/components/Cake";
import type { CountdownState } from "@/hooks/useCountdown";

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const } },
} as const;

export function SceneLabel({ number, label }: { number: string; label: string }) {
  return <div className="scene-label"><span>{number}</span><i />{label}</div>;
}

export function SecretEntry({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="scene scene-entry" aria-labelledby="entry-title">
      <div className="entry-orbit entry-orbit--one" /><div className="entry-orbit entry-orbit--two" />
      <div className="entry-grid" aria-hidden="true" />
      <div className="entry-copy">
        <motion.div initial="hidden" animate="visible" variants={reveal} className="eyebrow"><span className="eyebrow-dot" />A private little universe</motion.div>
        <motion.p initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.35 }} className="entry-kicker">For {birthdayConfig.recipientName}</motion.p>
        <motion.h1 id="entry-title" initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.55 }}>Hey<span className="soft-dot">…</span></motion.h1>
        <motion.p initial="hidden" animate="visible" variants={reveal} transition={{ delay: 0.85 }} className="entry-subtitle">I made something small<br className="mobile-only" /> and special for you.</motion.p>
        <motion.button initial="hidden" animate="visible" variants={reveal} transition={{ delay: 1.08 }} className="primary-button" type="button" onClick={onOpen}>
          <span className="button-glow" /><Sparkles size={16} />Open your surprise<ArrowRight size={16} />
        </motion.button>
      </div>
      <div className="entry-footer"><span>Follow the branch</span><ArrowRight size={16} /></div>
    </section>
  );
}

export function SpecialDate({ countdown, onNext }: { countdown: CountdownState; onNext: () => void }) {
  const monthName = "September";
  return (
    <section className="scene scene-date" aria-labelledby="date-title">
      <div className="date-stamp"><CalendarDays size={14} />A date worth keeping</div>
      <div className="date-content">
        <motion.p className="chapter-number" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={reveal}>01 / 08</motion.p>
        <motion.h2 id="date-title" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={reveal}>{monthName} <em>{birthdayConfig.birthday.day}</em></motion.h2>
        <motion.div className="date-rule" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} />
        <motion.p className="scene-lede" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={reveal}>September 9 is not just another date.<br /><strong>It is the day someone special arrived.</strong></motion.p>
      </div>
      <div className="countdown-wrap">
        <div className="countdown-message">{countdown.phase === "before" ? "Something special is waiting…" : countdown.phase === "today" ? "Today is your day." : "The celebration continues…"}</div>
        {countdown.phase === "before" ? <div className="countdown" aria-label="Countdown to September 9">
          {[[countdown.days, "days"], [countdown.hours, "hours"], [countdown.minutes, "minutes"], [countdown.seconds, "seconds"]].map(([value, label]) => <div className="countdown-unit" key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}
        </div> : <div className="today-mark"><Sparkles size={15} /> {countdown.phase === "today" ? "TODAY IS YOUR DAY" : "KEEP CELEBRATING"} <Sparkles size={15} /></div>}
      </div>
      <button className="text-button scene-continue" onClick={onNext} type="button">Keep going <ArrowDown size={15} /></button>
    </section>
  );
}

const reasons = [
  { icon: Sun, title: "Your happiness", body: "deserves celebration." },
  { icon: WandSparkles, title: "Your dreams", body: "deserve room to find their way." },
  { icon: Moon, title: "Your next chapter", body: "can bring something beautiful." },
  { icon: Sparkles, title: "Your everyday", body: "deserves more reasons to smile." },
];

export function CelebrateYou({ onNext }: { onNext: () => void }) {
  return (
    <section className="scene scene-reasons" aria-labelledby="reasons-title">
      <div className="reasons-heading"><SceneLabel number="02" label="Reasons to celebrate you" /><h2 id="reasons-title">A few things<br /><em>worth wishing for.</em></h2></div>
      <div className="reason-orbit" aria-hidden="true" />
      <div className="reasons-cloud">
        {reasons.map(({ icon: Icon, title, body }, index) => <motion.article key={title} className={`reason-object reason-object--${index + 1}`} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={reveal} transition={{ delay: index * 0.12 }} tabIndex={0}>
          <div className="reason-icon"><Icon size={19} strokeWidth={1.4} /></div><div><h3>{title}</h3><p>{body}</p></div><span className="reason-index">0{index + 1}</span>
        </motion.article>)}
      </div>
      <p className="section-note">No photos. No recycled wishes.<br />Just a few thoughts that felt true.</p>
      <button className="text-button scene-continue" onClick={onNext} type="button">There’s more <ArrowDown size={15} /></button>
    </section>
  );
}

export function CreatedForYou({ onNext }: { onNext: () => void }) {
  return (
    <section className="scene scene-built" aria-labelledby="built-title">
      <div className="built-circuit built-circuit--left" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="built-circuit built-circuit--right" aria-hidden="true"><span /><span /><span /><span /></div>
      <SceneLabel number="03" label="A little world created for you" />
      <div className="built-copy"><p>Some birthdays receive wishes.</p><p>Some receive gifts.</p><h2 id="built-title">And some receive<br /><em>something built from scratch.</em></h2><div className="built-divider"><Code2 size={16} /><span /><Sparkles size={16} /></div><p className="built-foot">Because making someone smile<br />is sometimes worth the effort.</p></div>
      <button className="text-button scene-continue" onClick={onNext} type="button">A letter, next <ArrowDown size={15} /></button>
    </section>
  );
}

export function DigitalLetter({ onNext }: { onNext: () => void }) {
  const lines = [
    "I don't know what place I have in your life…",
    "But I know that today is worth celebrating.",
    "So I created this little corner of the internet just for you.",
    "No expectations. No pressure.",
    "Just a small effort from someone who genuinely wishes you happiness.",
    "I hope this year brings you beautiful moments, unexpected opportunities, and countless reasons to smile.",
  ];
  return (
    <section className="scene scene-letter" aria-labelledby="letter-title">
      <div className="letter-spark" aria-hidden="true" />
      <div className="letter-paper">
        <div className="letter-top"><SceneLabel number="04" label="A note, just for you" /><span className="letter-date">09 — 09</span></div>
        <div className="letter-content"><h2 id="letter-title">Dear {birthdayConfig.recipientName},</h2><div className="letter-lines">{lines.map((line, index) => <motion.p key={line} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={reveal} transition={{ delay: index * 0.16 }}>{line}</motion.p>)}</div></div>
        <div className="letter-signoff"><span>with warmth,</span><strong>{birthdayConfig.senderName}</strong></div>
      </div>
      <button className="text-button scene-continue" onClick={onNext} type="button">One more thing <ArrowDown size={15} /></button>
    </section>
  );
}

export function PreCelebration({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="scene scene-pre" aria-labelledby="pre-title">
      <div className="pre-lens pre-lens--one" /><div className="pre-lens pre-lens--two" />
      <div className="pre-copy"><SceneLabel number="05" label="The moment before" /><p className="pre-small">Okay<span>…</span></p><h2 id="pre-title">One more thing<span>:</span></h2><p className="pre-prompt">The best part is still waiting<br />just beyond this button.</p><button className="primary-button primary-button--gold" onClick={onOpen} type="button"><Gift size={17} />Open your birthday surprise<ArrowRight size={16} /></button></div>
    </section>
  );
}

export function BirthdayCelebration({ wished, onWish, onNext }: { wished: boolean; onWish: () => void; onNext: () => void }) {
  return (
    <section className={`scene scene-celebration ${wished ? "scene-celebration--wished" : ""}`} aria-labelledby="celebration-title">
      <div className="celebration-rays" aria-hidden="true" /><div className="firework firework--one" /><div className="firework firework--two" /><div className="firework firework--three" />
      <div className="celebration-copy"><SceneLabel number="06" label="Tonight, we celebrate" /><p className="celebration-kicker">For {birthdayConfig.recipientName}</p><h2 id="celebration-title">Happy<br /><em>birthday.</em></h2><p>May this year bring you everything<br />your heart wishes for.</p></div>
      <Cake wished={wished} onWish={onWish} />
      <button className="text-button scene-continue" onClick={onNext} type="button">A quiet ending <ArrowDown size={15} /></button>
    </section>
  );
}

export function QuietEnding({ onAgain }: { onAgain: () => void }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <section className="scene scene-ending" aria-labelledby="ending-title">
      <div className="ending-constellation" aria-hidden="true"><span /><span /><span /><span /><span /><i /></div>
      <div className="ending-copy"><SceneLabel number="07" label="One last thing" /><p>Some people receive gifts.</p><h2 id="ending-title">You became the reason<br />someone created one.</h2><div className="ending-rule" /><p className="ending-final">{birthdayConfig.finalMessage}.</p><Heart className="ending-heart" size={18} strokeWidth={1.2} />{revealed && <motion.p className="hidden-message" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{birthdayConfig.hiddenMessage}</motion.p>}</div>
      <button className="again-button" type="button" onClick={onAgain}><Sparkles size={16} />Experience again</button>
      <button className="reveal-button" type="button" onClick={() => setRevealed((value) => !value)} aria-expanded={revealed}><Gift size={15} />{revealed ? "Keep this little secret" : "One last little secret"}</button>
      <p className="ending-footer">made with intention · 09 / 09</p>
    </section>
  );
}
