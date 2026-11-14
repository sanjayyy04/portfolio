# Sanjay Chauhan — React Portfolio

A React + Vite portfolio with Hero, About, Skills, Selected Work, project detail pages, a Contact section, and a shared cursor/swarm engine.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ (required by current Vite), and a configured MongoDB Atlas API as described in the root [README](../README.md).

Install dependencies once from the repository root. Start the API and client in separate terminals, both from the repository root:

```bash
npm run dev:server
```

```bash
npm run dev:client
```

The API listens on port `3001` by default; Vite proxies `/api` requests to it. Set `PORT` to change the API port. The API allows requests from `http://localhost:5173` by default; set `FRONTEND_ORIGIN` to your deployed frontend origin (or a comma-separated list) in production.

## Build for production

```bash
npm run build --workspace client
npm run preview --workspace client
```

The GitHub Pages workflow builds this repository site with the `/portfolio/` base path. The build also publishes a `404.html` fallback so client-side pages such as `/projects`, `/contact`, and `/project/<slug>` continue to work when opened directly or refreshed.

## Sections

- **Hero:** portfolio introduction and visual orbital motif.
- **About:** profile, selected builds, and experience.
- **Skills:** dark technical panel with a continuously scrolling skill ticker. Hover or keyboard focus pauses the ticker; reduced-motion preferences disable automatic motion.
- **Shared swarm:** one engine shared by the Hero and About sections.

The Skills ticker uses text-based marks rather than remote icon downloads, so the layout does not depend on third-party icon CDNs.

## Shared swarm: Hero → About → Skills → Selected Work → Contact

The portfolio uses one persistent canvas and one cursor-agent array for the full home page. Hero starts with 10 cursors; when About becomes active, five more join (15 total). The same 15 agents continue through Skills, Selected Work, and Contact. Contact adds targets to the existing engine and does not create a second canvas or cursor loop. The Skills ticker keeps its own continuous marquee motion. Reduced-motion preferences and coarse-pointer devices reveal content without the cursor animation.

For best testing, run `npm install` and `npm run dev`, let the Hero build finish, then scroll slowly through About, Skills, Selected Work, and Contact. Scroll back upward to confirm the marquee, form, and page remain usable.

## Selected Work / Project detail pages

The Selected Work section is a pinned, scroll-controlled stack. Scroll through the section to advance between project cards; choose a card to open its dedicated detail page at `/project/<slug>`.

Included detail routes: `chatme`, `genz-ai`, `ai-website-analyzer`, and `my-tasks`. The detail page uses the same dark/lime design language and a cursor overlay that draws around visible case-study sections. Replace the demo link placeholders in `src/components/ProjectDetail.jsx` with the actual live demo and GitHub repository URLs before publishing. The showcase is a designed placeholder, not a real screenshot; replace it with genuine screenshots when available.

### Project-detail technology logos

The `03 / TECHNOLOGY — Built with.` area uses a responsive technology-logo grid instead of particle animation. Hover or keyboard-focus a logo to reveal its technology name; on small touch screens, names are shown directly. Logos are loaded from Devicon/Simple Icons CDNs, with compact text fallbacks if an icon fails to load. The text labels remain accessible to assistive technology.

## Contact section

The home page ends with a responsive Contact section. The form validates name, email, and message in the browser and submits them to `POST /api/contact`. The API validates input again, rate-limits submissions, and stores them in MongoDB. Configure `MONGODB_URI` and `FRONTEND_ORIGIN` in the API environment before running it. In production, deploy the API and frontend behind the same origin or configure a reverse proxy for `/api`.

Before publishing, set `CONTACT_EMAIL` in `src/components/Contact.jsx` and configure `GITHUB_URL` to your real profile. LinkedIn points to the profile URL already provided for this portfolio. The contact section is part of the existing shared swarm engine, so the same 15 cursor agents continue from Selected Work into Contact.

## Signature footer

The footer keeps the Hero’s former animated orbital geometry as its closing visual signature. It is decorative, behind the footer copy, and remains a target of the existing shared multi-cursor engine. The footer does not render the LaserFlow canvas.

Before publishing, configure `GITHUB_URL` and `CONTACT_EMAIL` in `src/components/Footer.jsx` (and configure the contact email in `src/components/Contact.jsx`). GitHub/email entries remain placeholders until real values are supplied.

## Hero / Footer animation handoff

- The original React Bits LaserFlow canvas runs as a full-bleed atmospheric layer in the Hero section.
- The Hero’s former animated orbital geometry has moved to the footer as its closing visual signature; the Hero no longer renders that orbital graphic.
- The existing shared multi-cursor engine remains a single engine and continues to target the header/Hero and footer elements; the LaserFlow canvas is pointer-transparent and sits behind foreground content.
- Reduced-motion behavior remains governed by the LaserFlow component and existing global reduced-motion styles.
