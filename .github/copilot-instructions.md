<!--
This file is written for AI coding agents (Copilot-style) to quickly become
productive in this repository. Keep entries concise and only describe
discoverable, actionable patterns.
-->

# WhatIsAurora — AI helper instructions

Quick orientation
- This is a small single-page Vue 3 app scaffolded with Vite. The entry is
  `index.html` -> `src/main.js` -> `src/App.vue` with routes defined in
  `src/router/index.js`.
- Major views live in `src/views/` (Introduction, Aurora, Activity, About).
- Reusable UI pieces are in `src/components/` and icons under
  `src/components/icons/`.

Build / dev / preview
- Use the package.json scripts:
  - `npm install` to install deps
  - `npm run dev` (starts Vite dev server, hot-reload)
  - `npm run build` (bundle for production)
  - `npm run preview` (serve the production build locally)
- Vite config is in `vite.config.js`; the project uses `@vitejs/plugin-vue`
  and `vite-plugin-vue-devtools`.

Project conventions and patterns (concrete)
- Router-first SPA: Routes map 1:1 to files in `src/views/`. When adding a
  new page, create a new view and register it in `src/router/index.js`.
- CSS: Global tokens in `src/assets/base.css`; `src/assets/main.css` imports
  base and contains app-level layout overrides. Components frequently use
  scoped styles (single-file Vue components).
- Public assets: static files referenced from templates use paths under
  `public/` (e.g., `public/vocabulary1.jpg`). Use absolute `/` paths when
  referencing them from components/templates.
- Small state: The app does not include a global store (Pinia) yet. Local
  component state (refs/computed) is preferred for the current scale.

Files to inspect for typical edits
- Layout and navigation: `src/App.vue` (header, RouterView wrapper)
- App entry: `src/main.js` (app bootstrapping and router registration)
- Router: `src/router/index.js` (routes and history mode)
- Styles: `src/assets/base.css`, `src/assets/main.css`
- Example components: `src/components/TheWelcome.vue` and
  `src/components/WelcomeItem.vue` (slot-based components and icon usage)

Common change patterns (examples)
- Add a new page:
  1. Create `src/views/MyNewView.vue`.
  2. Add route in `src/router/index.js` with `component: () => import('../views/MyNewView.vue')` for code-splitting.
  3. Add a `RouterLink` in `src/App.vue` navigation.
- Add an image asset to the public folder and reference it as `/my.png` in templates.
- Replace the YouTube embed in `src/views/AuroraView.vue` by swapping the
  `iframe` src or switching to a local `<video>` with `<source src="/aurora-animation.mp4">`.

Testing, debugging, and recommended tools
- No test harness is present by default. The README mentions Vitest,
  Cypress/Playwright as recommendations; if you add tests, follow Vite+
  Vue Test Utils patterns (keep tests beside components or in `tests/`).
- Recommended devtools: Vue Devtools extension and VS Code + Volar (see
  `.vscode/extensions.json`).

Integration points / external deps
- Production build only depends on Vite + Vue + Vue Router (see
  `package.json`). There are no external APIs wired into the codebase.

Style and code expectations
- Follow the existing single-file component (SFC) style: <script setup>,
  <template>, and <style scoped> blocks.
- Prefer local state (Composition API) in views/components; components
  currently use `ref` and small helper functions instead of Vuex/Pinia.
- Keep icons as self-contained small SFCs under
  `src/components/icons/` using inline SVG (same pattern as existing icons).

When editing for the user
- Make minimal, single-purpose commits. Preserve component public APIs and
  slot usage when refactoring (e.g., `WelcomeItem` exposes named slots
  `icon` and `heading`).
- For visual changes, update CSS under `src/assets/*` or component
  scoped styles; avoid global resets unless needed.

Search targets for future automation
- Routing and pages: `src/router/**`, `src/views/**`
- Global styling: `src/assets/*`
- Entry and boot: `src/main.js`, `src/App.vue`

If you edit this file
- Merge any existing human-written guidance here instead of replacing it.
- Keep this file concise (20–50 lines) and only document discoverable
  behaviour.

Questions / uncertainties for the maintainer
- Are tests or a CI pipeline planned? If yes, mention the chosen runner
  and any repository conventions for test placement.
