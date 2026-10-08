# influencer-awards — PRD

> **LEGACY DEMO — SUPERSEDED.** This repo is the old static demo with
> localStorage DEMO data. The live product is the `profluencer-awards`
> repo (React + Laravel API + MySQL). Do not present anything in this
> repo's sample data as real.

## What this is

A static, client-side demo build of the ProFluencer Awards 2026 site
(ProFluencer Awards: 10 industry categories, 50 awards). It was the
reference build the full-stack rebuild was ported from ("same gold/dark
luxury design, same content, same demo behaviour").

## Users (demo personas)

- Public voters — browse nominees, vote (demo OTP, no real email).
- Influencers — demo login + profile picker, dashboard (momentum,
  milestones, campaign toolkit).
- Admins — demo CRM (`admin / profluencer2026` demo gate) with
  nominations review, voters, votes, results, RSVP, enquiries,
  settings, audit log.

## Features (demo behaviour)

- 19 static HTML pages: home, categories, nominees, nominee detail,
  vote/voting (rules), nominate, winners/results, event + RSVP, sponsors,
  contact, news (4 articles), about/FAQ/terms/privacy, login, dashboard,
  admin.
- All data lives in `localStorage` (`pfa_db_v2`, `pfa_session_v2`,
  `pfa_admin_v2`, `pfa_voter_v2`, `pfa_otp_v2`) — sample nominees, votes
  and admin actions never leave the browser.
- Comment in `assets/js/data.js`: "Production swaps the PFA.store
  internals with the PHP/MySQL API; page code keeps calling the same
  PFA.* functions."

## Non-goals

- No backend, no real authentication, no real email, no database.
- Demo votes/OTP do not send mail; votes count instantly in demo mode.
- Sample nominee/vote data is fabricated for demonstration — never real.

## Dates (same event, informational only)

Voting Oct 15 – Nov 30, 2026; ceremony Dec 11, 2026 afternoon, Dubai
(venue/time UNCONFIRMED — never present as confirmed).
