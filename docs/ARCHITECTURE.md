# influencer-awards — Architecture

> **LEGACY DEMO.** Static HTML/CSS/JS demo. Live product = `profluencer-awards`.

## Parts

- **19 static HTML pages** (`index.html`, `categories.html`,
  `nominees.html`, `vote.html`, `voting.html`, `nominate.html`,
  `results.html`, `event.html`, `sponsors.html`, `contact.html`,
  `news.html` + 4 `news-*.html` articles, `login.html`, `dashboard.html`,
  `admin.html`, `privacy.html`, `terms.html`). (`404.html`,
  `robots.txt`, `sitemap.xml` exist only on the `gh-pages` branch.)
- **`assets/js/data.js`** — the data layer (574 lines): localStorage
  store (`PFA.*`), sample categories/nominees, vote/nomination/RSVP/
  enquiry/admin logic. Demo admin gate `admin / profluencer2026`.
- **`assets/js/app-v3.js`** — page behaviour (152 lines); older
  `app-v2.js` kept alongside (cache-bust naming: `app-v2.js`,
  `style-v3.css`, `logo-clean.png` so no stale cached files render).
- **`assets/css/`** — `style-v3.css` (active), old `style.css`.
- **`assets/img/`** — category art, hero, trophy, ceremony, news
  images, logos (`logo-clean.png` active, old `logo.png`/`logo-v2.png`).

## Data flow

```
browser ──> static page ──> assets/js/data.js (PFA.store)
                                 │
                                 └─> localStorage keys:
                                     pfa_db_v2, pfa_session_v2,
                                     pfa_admin_v2, pfa_voter_v2, pfa_otp_v2
```

No server, no API calls. Demo admin CRM tabs mirror the production
CRM (overview, nominations, voters, votes, results, RSVP, enquiries,
settings, audit log).

## Deployment

- Served via GitHub Pages from the **`gh-pages`** branch
  (https://dawoodshah2232-svg.github.io/influencer-awards/).
- `gh-pages` periodically merges `main` (e.g. `f7e496b Merge branch
  'main' into gh-pages`). News commits land on `main` first
  (2cf93ac, 2026-10-07).

## Relationship to profluencer-awards

This repo is the design/content reference the React frontend
(`frontend/`) was ported from. Fixes and content changes here do not
flow into the live product; the live product is the source of truth.
