# influencer-awards — Design

> **LEGACY DEMO.** Same gold/dark luxury theme the production React
> frontend was ported from.

## Colors (`assets/css/style-v3.css`)

- Backgrounds: `--bg:#070b14` (deep navy), `--bg2:#0b1120`
- Cards: `--card:#101828`, `--card2:#0d1424`
- Gold: `--gold:#d4af37`, `--gold-lt:#f3d27a`, `--gold-dk:#9c7a1e`
- Text: `--text:#f5f1e8`, muted `#a9b1c2`
- Dividers: `--line:rgba(212,175,55,.22)`
- Light surfaces: `--light:#faf6ee`, ink `--ink:#141414`
- Radius `--r:18px`; shadow `0 18px 50px rgba(0,0,0,.45)`

## Typography

- Apple system font stack (`--font`), same as production.
- Headings line-height 1.15, letter-spacing -.02em; section titles
  `clamp(28px,5.4vw,46px)`, weight 800.
- Eyebrow labels: gold-light, .28em letter-spacing, uppercase, 11px, 700.

## Buttons / inputs

- `.btn`: pill 999px, 14×28 padding, weight 700; `:active`
  `transform:scale(.97)`.
- `.btn-gold`: gradient 135deg (gold-lt → gold 55% → gold-dk), dark
  text `#1a1405`, gold glow shadow.
- `.btn-ghost`: translucent white with 1px border.
- Fields: dark `#0a0f1d`, 14px radius, 14×16 padding, 15px font.

## Layout

- Container `max-width:1140px`, padding 0 20px; sections `padding:72px 0`.
- Fixed 72px header, blur-on-scroll; burger menu below 900px.

## Brand rules

- `logo-clean.png` used raw — no blend/shadow/radius/card effects
  (black-box fix, ed66342).
- No emojis in UI. No webfont downloads.
- Category/hero/trophy/ceremony photography in `assets/img/`.

## Content rules

- Voting window dates only (Oct 15 – Nov 30, 2026); ceremony as
  "afternoon session" — no time-of-day claims.
- News articles (4): mega-influencer era, creators' earnings call,
  audience-is-the-paycheck, brands-paying-to-prove-human.
