import { Volume2, VolumeX } from "lucide-react";

export function MusicToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button className="sound-toggle" onClick={onToggle} type="button" aria-pressed={enabled} aria-label={enabled ? "Turn ambient sound off" : "Turn ambient sound on"}>
      {enabled ? <Volume2 size={15} strokeWidth={1.7} /> : <VolumeX size={15} strokeWidth={1.7} />}
      <span>{enabled ? "Sound on" : "Sound off"}</span>
    </button>
  );
}
