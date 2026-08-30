import { Sparkles } from "lucide-react";

export function Cake({ wished, onWish }: { wished: boolean; onWish: () => void }) {
  return (
    <div className={`cake-stage ${wished ? "cake-stage--wished" : ""}`}>
      <div className="cake-halo" />
      <div className="cake-shadow" />
      <div className="cake">
        <div className="cake-candle cake-candle--left"><span className="flame" /></div>
        <div className="cake-candle cake-candle--center"><span className="flame" /></div>
        <div className="cake-candle cake-candle--right"><span className="flame" /></div>
        <div className="cake-top"><span className="cake-line cake-line--one" /><span className="cake-line cake-line--two" /></div>
        <div className="cake-middle"><span className="cake-drip cake-drip--one" /><span className="cake-drip cake-drip--two" /><span className="cake-drip cake-drip--three" /></div>
        <div className="cake-base"><span className="cake-ribbon" /></div>
      </div>
      <button className="wish-button" type="button" onClick={onWish} aria-label={wished ? "Wish made" : "Make a wish"}>
        <Sparkles size={16} />
        {wished ? "Wish made" : "Make a wish"}
      </button>
    </div>
  );
}
