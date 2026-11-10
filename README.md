# Portfolio

A static site built with [Eleventy](https://www.11ty.dev/). Each project is one Markdown file.

```bash
npm install      # once
npm run dev      # preview at http://localhost:8090, reloads on save
npm run build    # writes the site to _site/ and lists the placeholders still left
```

## Where things are

```
src/_data/site.json     name, intro text, email and links
src/projects/*.md       one file per project
src/assets/shots/       screenshots and short videos
src/assets/style.css    all styling
src/_includes/          page templates (base.njk, project.njk)
src/index.njk           home page
demos/                  self-contained demos, published as they are
```

## Add a project

Copy any file in `src/projects/` and edit it. The file name becomes the URL
(`src/projects/my-project.md` → `/projects/my-project/`). The home page card is
generated from the fields at the top:

```yaml
---
title: Short project name
order: 5                       # position on the home page, lowest first
headline: One plain sentence saying what it does.
summary: One or two sentences on the result.
thumb: my-project-main.png     # file in src/assets/shots/, used on the card
thumbAlt: What the image shows
stack:
  - Python
live: https://example.com/      # optional: adds an "Open the live site" button
demo: /demos/my-demo/           # optional: adds a "Try the demo" button for a demo in demos/
code: https://github.com/JacksonSearle/my-project   # "" shows a TODO instead
---
```

Below that, write Markdown under `## The problem`, `## The result` and `## How it works`.
The tech stack and code link are added at the bottom of the page from the fields above.

## The Mill Cert Checker demo

`demos/mill-cert-checker/` is a copy of the `app/` folder from the `mill-cert-checker`
project. After changing that project, refresh the copy with `npm run sync-demo` (it expects
the project in the folder next to this one).

## Projects taken off the site

`archive/` holds project pages that are not published. To bring one back, move its file
into `src/projects/` and give it an `order:` number. Its screenshots are still in
`src/assets/shots/`.

## Placeholders

Two tags mark what is still missing. Both show up highlighted in yellow on the site,
and `npm run build` prints the full list.

- `{% shot "file.png", "what to capture" %}`: a screenshot or `.mp4`/`.webm` video.
  Save the file in `src/assets/shots/` under that name and the placeholder is replaced
  by the image. The description becomes its alt text.
- `{% todo "what's needed" %}`: a fact or number to fill in. Replace the whole tag
  with the real text, or delete it.

## What to capture

Screenshots: a browser window about 1400 px wide, PNG. Videos: under a minute, MP4,
no sound needed. Check each one for personal details before saving it.

| File | What to capture |
| --- | --- |
| `puck-vision-game.jpg` | The game screen mid-round: top-down board, tracked pucks, score. |
| `puck-vision-calibrate.jpg` | The calibration screen: camera view with the four corner handles and board outline. |
| `lego-ai-build.jpg` | The Build tab with a model of stacked blocks and shapes on the arrows. |
| `lego-ai-train.jpg` | The Train tab mid-run with the live charts. |
| `lego-ai-leaderboard.jpg` | The Leaderboard with several runs, ideally one marked as reproduced. |

## Publish on GitHub Pages

1. Create a GitHub repository and push this folder to its `main` branch. Name it
   `JacksonSearle.github.io` for the address `https://jacksonsearle.github.io/`, or
   anything else (for example `portfolio`) for `https://jacksonsearle.github.io/portfolio/`.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` rebuilds and publishes the site
   (`.github/workflows/deploy.yml`). The workflow handles the address prefix for either
   repository name.
