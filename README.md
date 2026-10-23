# DeveLogic - Company Website

A Hebrew (RTL) landing page for DeveLogic, a software development and AI solutions studio. It is built with [Astro](https://astro.build) and based on the Figma Make design "Landing Page Design for Dvelogic".

The contact form sends submissions by email through [Resend](https://resend.com). Nothing is stored in a database.

## Tech stack

- **Astro 7**: static site generation, with the contact API as the only server route
- **@astrojs/node 11**: standalone Node server for production
- **Resend**: sends the contact form emails
- **Plain CSS**: all styles live in one file, `src/styles/global.css`
- **Fonts**: Heebo and DM Mono, from Google Fonts

## Pages

| Route | Description |
| --- | --- |
| `/` | Landing page: hero with navigation, services, engineering standards, about, contact form |
| `/privacy` | Privacy policy, in Hebrew |
| `POST /api/contact` | Validates the contact form and sends it as an email |

## Project structure

```
src/
  layouts/Layout.astro        # <html lang="he" dir="rtl">, meta tags, fonts
  components/
    Hero.astro                # Header navigation, headline, main call to action
    Services.astro            # "What we build" section
    Engineering.astro         # Engineering standards section
    About.astro               # About section
    Contact.astro             # Contact form and client-side submit logic
    Footer.astro              # Footer with privacy policy link
    Brand.astro, Icon.astro   # Logo and SVG icons
  pages/
    index.astro               # Landing page (prerendered)
    privacy.astro             # Privacy policy page (prerendered)
    api/contact.ts            # POST /api/contact (runs on the server)
  styles/global.css           # All site styles
public/favicon.svg
render.yaml                   # Render deployment config
.env.example                  # Environment variable template
```

The site builds as static HTML (`output: 'static'`). Only the contact API route opts out of prerendering (`export const prerender = false`) and runs on the Node server.

## Getting started

**Requirements:** Node.js 22.23.4 or newer (Astro 7 requires it).

```bash
npm install
cp .env.example .env          # Windows PowerShell: Copy-Item .env.example .env
# Edit .env and set RESEND_API_KEY and CONTACT_TO_EMAIL
npm run dev
```

The site runs at http://localhost:4321.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build the static pages and the Node server into `dist/` |
| `npm start` | Run the production server (`dist/server/entry.mjs`), loading `.env` if it exists |
| `npm run preview` | Preview the production build |
| `npm run check` | Type-check all Astro and TypeScript files |

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Resend API key, from https://resend.com/api-keys |
| `CONTACT_TO_EMAIL` | Yes | Address that receives contact form submissions |
| `CONTACT_FROM_EMAIL` | No | Sender address. Defaults to `DeveLogic <onboarding@resend.dev>`. For production, use an address on a domain you verified in Resend |

The variables are declared with `astro:env` in `astro.config.mjs` as server secrets. They are read from the environment at runtime and never copied into the build output.

If `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is missing, the form shows an error and the server logs `Missing RESEND_API_KEY or CONTACT_TO_EMAIL`.

## Contact form

- **Fields:** full name and email are required. Phone and project details are optional.
- **Validation:** both the browser and the server check the fields. The server returns its error messages in Hebrew.
- **Email:** each submission is sent to `CONTACT_TO_EMAIL` with the visitor's email as the reply-to address, so you can answer by replying.
- **Spam protection:** a hidden honeypot field (`website`) catches bots. Submissions that fill it in get a fake success response and are not sent.

## Deployment (Render)

`render.yaml` defines a free Render web service:

- **Build:** `npm install && npm run build`
- **Start:** `npm start`
- **Node version:** 24 (set by `NODE_VERSION`)
- **Host:** `0.0.0.0`

In the Render dashboard, set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. They are marked `sync: false`, so they are not stored in the repo. `CONTACT_FROM_EMAIL` is set in `render.yaml`; change it once you verify your own domain in Resend.
