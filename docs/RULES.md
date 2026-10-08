# influencer-awards — Rules (coding standards)

> **LEGACY DEMO.** Changes here are design-reference only; the live
> product is `profluencer-awards`.

## Standards observed in this repo

- Owner stack rules still apply where relevant: Apple system font stack
  (`--font` in `assets/css/style-v3.css`), no emojis in UI, no webfont
  downloads.
- Logo `assets/img/logo-clean.png` rendered raw — the "logo black-box
  fix" (ed66342) stripped all blend/shadow/radius effects; brand-new
  filename so cached copies can't render the old logo. Logos never on
  cards/boxes.
- Cache-bust naming for user-facing assets (`app-v2.js`, `style-v3.css`,
  `logo-clean.png`) — cache staleness was a repeated issue in this repo.
- Sample data must be labeled DEMO; never presented as real stats,
  nominees, votes, or results.

## What AI must do

- Pull latest before any work; never force-push; never `git reset --hard`.
- Keep page/URL surface consistent between `main` and `gh-pages`
  (Pages builds from `gh-pages`; `sitemap.xml`/`robots.txt`/`404.html`
  live there).
- After any push, poll the Pages build until status `built` before
  reporting done (GitHub Pages rule).

## What AI must NOT do

- Do not wire real backends into this repo — it is the demo reference.
- Do not copy this repo's sample localStorage data into the production
  repo as if it were real.
- Do not claim the demo's votes/results/counts are real — in PRD copy,
  docs, or conversation.
- No emojis in UI; icons = Heroicons inline SVG only if icons are added.
