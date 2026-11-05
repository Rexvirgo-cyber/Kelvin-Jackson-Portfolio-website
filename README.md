# Kelvin Jackson Chezieuche — Professional Portfolio

A premium, cinematic personal portfolio and professional profile website for **Kelvin Jackson Chezieuche**, Customer Service & Administrative Professional based in Lagos, Nigeria.

---

## 🎨 Creative & Technical Architecture

- **Visual Tone:** Sophisticated dark editorial aesthetics meeting cinematic personal branding.
- **Brand Palette:**
  - **Obsidian:** `#080B10`
  - **Midnight Navy:** `#101B2B`
  - **Espresso Brown:** `#35231F`
  - **Champagne Gold:** `#C6A77B`
  - **Silver Mist:** `#A7B2C1`
  - **Ivory:** `#E9E4DC`
- **Storytelling Canvas Engine:** High-performance HTML5 Canvas with 120 sequential frames (`/sequence/frame_000` to `frame_119`) scrubbing across a pinned `500vh` scroll viewport with cover-style aspect ratio scaling and zero flicker.
- **Single Source of Truth:** Every qualification, employer, duty, and metric strictly adheres to the official CV.

---

## 🚀 How to View Locally

### Instant Live Browser Preview
You can directly double-click or open `index.html` in your web browser (Chrome, Edge, Firefox, Brave), or with VS Code's **Live Server** extension.

### Using Python Built-in Server
Open your terminal in this directory and run:
```bash
python -m http.server 3000
```
Then visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Directory Structure

```text
Kelvin Jackson Portfolio website/
├── index.html                 # Complete standalone production website
├── styles.css                 # Editorial styling, glassmorphism, responsive canvas
├── main.js                    # Canvas preloader, scroll scrubber, clipboard helpers
├── sequence/                  # 120 cinematic image frames (frame_000 to frame_119)
├── images/
│   └── portrait.jpg           # Cinematic portrait of Kelvin Jackson
├── docs/
│   └── Kelvin_Jackson_CV.pdf  # Downloadable verified resume PDF
├── media/
│   └── portrait_video.mp4     # Portrait MP4 video asset
└── nextjs-components/         # Next.js 14 App Router React component implementation
    ├── ScrollyCanvas.tsx      # Framer Motion + HTML5 Canvas reusable component
    └── page.tsx               # Next.js 14 page template
```
