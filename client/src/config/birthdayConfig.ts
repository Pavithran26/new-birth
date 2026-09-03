/**
 * 🎂 Birthday Experience Configuration
 *
 * Edit only this file to fully personalize the gift.
 * Everything else (scenes, animations, letter, cake) updates automatically.
 */
export const birthdayConfig = {
  /** Who is this gift for? */
  recipientName: "Someone🦜",

  /** Birthday date (used for live countdown) */
  birthday: {
    day: 9,
    month: 9, // September
  },

  /** Your name (shown in the letter & ending) */
  senderName: "Pavithran S",

  /** Final message shown in the quiet ending */
  finalMessage: "Made especially for you",

  /** Hidden secret message (revealed by button) */
  hiddenMessage: "You make ordinary days feel a little more beautiful.",

  /** Set to true if you want ambient music to start enabled */
  musicEnabled: false,

  /** Path to ambient audio file (place file in client/public or use CDN) */
  musicSrc: "/manus-storage/birthday-ambient_35111a54.mp3",
};

export type BirthdayConfig = typeof birthdayConfig;
