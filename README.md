# Emma DaSilva — Portfolio

One-page bilingual (FR/EN) portfolio. Next.js 16, React 19, TypeScript, CSS Modules — no UI framework.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Under WSL, builds go to `.next-wsl` so they never collide with a Windows `.next` (see `next.config.ts`).

## Direction

- Editorial, near-black palette: background `#0c0c0b`, ink `#e9e4da`, warm grays, one accent `#e9762b`.
- Geist (display/body), Geist Mono (labels), Instrument Serif italic (sparing accents).
- Sections: Accueil `#accueil`, À propos `#apropos`, Projets `#projets`, Compétences `#competences`, Contact `#contact`.
- Footer: interactive halftone `emma.` wordmark (canvas, spring physics, click shockwave); phones get a touch-to-replay CSS halftone version.

## Where things live

- `src/content/` — all copy, project data and skills. Project descriptions come from each repository's README; only verified links are listed, private repositories have none.
- `src/components/` — one component + CSS module per section.
- `src/lib/hooks.ts` — language store, reveals, active section, Cotonou clock.
