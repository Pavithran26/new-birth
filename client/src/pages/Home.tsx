import { useEffect, useMemo, useState } from "react";
import { ChevronUp, Menu, X } from "lucide-react";
import { birthdayConfig } from "@/config/birthdayConfig";
import { ParticleField } from "@/components/ParticleField";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { MusicToggle } from "@/components/MusicToggle";
import { BirthdayCelebration, CelebrateYou, CreatedForYou, DigitalLetter, PreCelebration, QuietEnding, SecretEntry, SpecialDate } from "@/components/Scenes";
import { useCountdown } from "@/hooks/useCountdown";
import { useSound } from "@/hooks/useSound";

const scenes = [
  ["entry", "Open"],
  ["date", "September 9"],
  ["reasons", "Wishes"],
  ["built", "Made for you"],
  ["letter", "A note"],
  ["pre", "Almost"],
  ["celebration", "Celebrate"],
  ["ending", "One last thing"],
] as const;

function scrollToScene(id: string) {
  window.dispatchEvent(new CustomEvent("birthday:navigate", { detail: id }));
}

function ConfettiBurst() {
  const pieces = useMemo(() => Array.from({ length: 34 }, (_, index) => ({
    id: index,
    left: `${(index * 29) % 100}%`,
    delay: `${(index % 8) * 0.08}s`,
    duration: `${1.5 + (index % 5) * 0.22}s`,
    color: ["#d6b56a", "#f2d89a", "#e8a8a3", "#9e9ad3", "#fff3d2"][index % 5],
    rotate: `${(index * 41) % 180 - 90}deg`,
  })), []);
  return <div className="confetti-burst" aria-hidden="true">{pieces.map((piece) => <i key={piece.id} style={{ left: piece.left, animationDelay: piece.delay, animationDuration: piece.duration, background: piece.color, transform: `rotate(${piece.rotate})` }} />)}</div>;
}

function StoryNav({ activeScene, open, setOpen, soundEnabled, onSoundToggle }: { activeScene: string; open: boolean; setOpen: (open: boolean) => void; soundEnabled: boolean; onSoundToggle: () => void }) {
  return <>
    <header className="topbar">
      <button className="brand" onClick={() => scrollToScene("entry")} type="button" aria-label="Return to the beginning"><span className="brand-mark">✦</span><span>A little light</span></button>
      <div className="topbar-right"><span className="topbar-date">09 <i>/</i> 09</span><MusicToggle enabled={soundEnabled} onToggle={onSoundToggle} /></div>
      <button className="menu-button" type="button" aria-label={open ? "Close story menu" : "Open story menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
    </header>
    <div className={`story-menu ${open ? "story-menu--open" : ""}`} aria-hidden={!open}>
      <p className="story-menu-title">The journey</p>
      <nav aria-label="Story sections">{scenes.map(([id, label], index) => <button key={id} className={activeScene === id ? "is-active" : ""} onClick={() => { scrollToScene(id); setOpen(false); }} type="button"><span>0{index + 1}</span>{label}</button>)}</nav>
    </div>
  </>;
}

export default function Home() {
  const countdown = useCountdown(birthdayConfig.birthday.day, birthdayConfig.birthday.month);
  const sound = useSound(birthdayConfig.musicEnabled, birthdayConfig.musicSrc);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeScene, setActiveScene] = useState("entry");
  const [wished, setWished] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [traveling, setTraveling] = useState(false);

  useEffect(() => {
    const navigate = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (!scenes.some(([sceneId]) => sceneId === id) || id === activeScene) return;
      setTraveling(true);
      window.setTimeout(() => { setActiveScene(id); setTraveling(false); window.scrollTo({ top: 0, behavior: "auto" }); }, 420);
    };
    window.addEventListener("birthday:navigate", navigate);
    return () => window.removeEventListener("birthday:navigate", navigate);
  }, [activeScene]);

  const openStory = () => { setUnlocked(true); window.setTimeout(() => scrollToScene("date"), 120); };
  const openCelebration = () => scrollToScene("celebration");
  const reset = () => { setWished(false); setUnlocked(false); setMenuOpen(false); setTraveling(false); setActiveScene("entry"); };

  const sceneIndex = scenes.findIndex(([id]) => id === activeScene);
  const nextScene = scenes[sceneIndex + 1];

  return <main className={`experience-shell ${traveling ? "is-traveling" : ""}`}>
    <div className="branch-travel" aria-hidden="true"><span className="branch-travel-line" /><span className="branch-travel-twig branch-travel-twig--one" /><span className="branch-travel-twig branch-travel-twig--two" /><span className="branch-travel-twig branch-travel-twig--three" /><i className="branch-travel-leaf branch-travel-leaf--one" /><i className="branch-travel-leaf branch-travel-leaf--two" /><b className="branch-travel-bloom" /></div>
    <CinematicBackdrop activeScene={activeScene} isTraveling={traveling} />
    <ParticleField density="high" />
    <StoryNav activeScene={activeScene} open={menuOpen} setOpen={setMenuOpen} soundEnabled={sound.enabled} onSoundToggle={sound.toggle} />
    <div className="progress-rail" aria-label="Story progress">{scenes.map(([id]) => <button key={id} className={activeScene === id ? "is-active" : ""} onClick={() => scrollToScene(id)} type="button" aria-label={`Go to ${id} section`} />)}</div>
    <div className={`journey journey--${activeScene} ${unlocked ? "journey--unlocked" : ""}`}>
      <div id="entry"><SecretEntry onOpen={openStory} /></div>
      <div id="date"><SpecialDate countdown={countdown} onNext={() => scrollToScene("reasons")} /></div>
      <div id="reasons"><CelebrateYou onNext={() => scrollToScene("built")} /></div>
      <div id="built"><CreatedForYou onNext={() => scrollToScene("letter")} /></div>
      <div id="letter"><DigitalLetter onNext={() => scrollToScene("pre")} /></div>
      <div id="pre"><PreCelebration onOpen={openCelebration} /></div>
      <div id="celebration"><BirthdayCelebration wished={wished} onWish={() => setWished(true)} onNext={() => scrollToScene("ending")} />{wished && <ConfettiBurst />}</div>
      <div id="ending"><QuietEnding onAgain={reset} /></div>
    </div>
    {nextScene && (activeScene !== "entry" || unlocked) && <button className="leaf-next" type="button" onClick={() => scrollToScene(nextScene[0])} aria-label={`Follow the branch to ${nextScene[1]}`}><span className="leaf-next-art"><i /><i /><i /><b /></span><span className="leaf-next-copy"><small>Follow the branch</small><strong>{nextScene[1]}</strong></span><ChevronUp size={15} /></button>}
    <div className="bottom-sound"><MusicToggle enabled={sound.enabled} onToggle={sound.toggle} /></div>
    <button className="back-to-top" onClick={() => scrollToScene("entry")} type="button" aria-label="Back to the beginning"><ChevronUp size={16} /></button>
  </main>;
}
