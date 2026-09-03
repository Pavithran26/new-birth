# ✦ new-birth

> A cinematic, scroll-driven birthday gift — built with intention.

**A private little universe created for someone special.**  
September 9 • Made by Pavithran S

---

## ✨ Experience

This is not a regular website.  
It is an 8-scene emotional journey:

1. **Secret Entry** — A private invitation
2. **Special Date** — Live countdown to September 9
3. **Celebrate You** — Reasons worth wishing for
4. **Created For You** — Something built from scratch
5. **Digital Letter** — A personal note
6. **Pre-Celebration** — The moment before
7. **Birthday Celebration** — Interactive cake + make a wish + confetti
8. **Quiet Ending** — One last secret message

**Features**
- Smooth sticky-scroll storytelling
- Cinematic backdrop (travel world, moon & blossom tree)
- Interactive cake with flame animation
- Particle field + confetti burst on wish
- Live countdown timer
- Soft ambient music (optional)
- Reduced-motion support
- Fully responsive + accessible
- Beautiful Open Graph tags for sharing

---

## 🛠️ Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Frontend       | React 19 + TypeScript + Vite 7      |
| Styling        | Tailwind CSS v4 + custom cinematic CSS |
| Animation      | Framer Motion                       |
| UI Primitives  | shadcn/ui + Radix UI                |
| Routing        | Wouter                              |
| Server         | Express (static production server)  |
| Package Manager| pnpm                                |

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/Pavithran26/new-birth.git
cd new-birth

# Install
pnpm install

# Develop
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:5173](http://localhost:5173) (dev) or the production port.

---

## 🎨 Customize (Very Easy)

Edit only **one file**:

```ts
// client/src/config/birthdayConfig.ts

export const birthdayConfig = {
  recipientName: "Someone🦜",          // Who is this for?
  birthday: {
    day: 9,
    month: 9,
  },
  senderName: "Pavithran S",           // Your name
  finalMessage: "Made especially for you",
  hiddenMessage: "You make ordinary days feel a little more beautiful.",
  musicEnabled: false,                 // Set true to auto-start ambient music
  musicSrc: "/manus-storage/birthday-ambient_35111a54.mp3",
};
```

That’s it. The entire experience updates automatically.

---

## 🌐 Deploy

### Vercel (Recommended)

1. Push this repo to GitHub (already done)
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import this repository
4. Framework Preset: **Vite**
5. Deploy

Or use the CLI:

```bash
pnpm build
npx vercel --prod
```

### Other platforms
Any static host works after `pnpm build` (the `dist` folder + Express server if needed).

---

## 📁 Project Structure

```
new-birth/
├── client/
│   ├── src/
│   │   ├── components/     # Cake, Scenes, Particles, CinematicBackdrop...
│   │   ├── config/         # birthdayConfig.ts ← edit this
│   │   ├── hooks/          # useCountdown, useSound, useReducedMotion...
│   │   ├── pages/          # Home (main experience)
│   │   └── index.css       # Full cinematic styling
│   └── public/
├── server/                 # Production Express server
├── shared/
├── LICENSE
└── package.json
```

---

## 💡 Design Philosophy

- **No recycled wishes** — every line is original
- **No photos required** — pure emotion through motion & words
- **Scroll at your own pace** — sticky scenes, never forced
- **Made with intention** — every detail serves the feeling

---

## 📜 License

MIT © Pavithran S

---

**Made with intention · 09 / 09**

> Some people receive gifts.  
> You became the reason someone created one.
