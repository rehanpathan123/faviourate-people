# A Little Question for You ❤️

A responsive romantic proposal website built with React, Vite, Tailwind CSS, Framer Motion, and Lucide icons.

## Run locally

1. Install Node.js (18+ recommended).
2. Open this folder in VS Code.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite (usually http://localhost:5173).

## Customize it

Open `src/App.jsx` and personalize the text:
- Replace the hero line and subtitle with your own words.
- Rewrite the story paragraph so it sounds like you.
- Change `Will you be mine?` to your exact question.
- Edit the YES celebration message.

Change the page title and description in `index.html`.

## Build for deployment

```bash
npm run build
npm run preview
```

The production website is generated in the `dist` folder.

## Deploy

- **Vercel:** Import the GitHub repository. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
- **Netlify:** Build command: `npm run build`. Publish directory: `dist`.
- **GitHub Pages:** Configure Vite's `base` in `vite.config.js` to `"/YOUR-REPOSITORY-NAME/"`, then build and deploy the `dist` folder using GitHub Actions.

## Notes

The sound toggle is intentionally a visual preference control; no audio file is bundled. The proposal interaction is playful, but the page includes a no-pressure message and does not prevent someone from declining.
