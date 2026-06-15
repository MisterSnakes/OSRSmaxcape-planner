# OSRS Max Cape Planner

A single-page tool that turns your current Old School RuneScape stats into a
week-by-week plan to max, with collection-log targets and boss KC pulled from
Wise Old Man and TempleOSRS. Everything runs in the browser — no account, no
server, no data leaves your device (it saves to your browser's localStorage).

## Project layout

| File | What it is |
|------|------------|
| `index.html` | Page structure only (links the CSS + JS) |
| `styles.css` | All styling |
| `data.js` | Static lookup tables: icons, skills, training methods, XP defaults, collection-log targets |
| `app.js` | All application logic (state, planning, rendering, fetching) |
| `build.py` | Inlines the above into one portable file |
| `maxcape-tracker.html` | **Generated** single-file build (do not edit by hand) |

> Edit the split files. Never edit `maxcape-tracker.html` directly — it's
> overwritten by the build.

## Build the single-file version

```bash
python3 build.py
```

This produces `maxcape-tracker.html`: one self-contained file with the CSS and
JS inlined, which anyone can download and open offline (just double-click it —
no web server required). Offer this as the "download" option.

## Deploy the hosted version

The split files are static — host them anywhere that serves static files.

**GitHub Pages**
1. Push this folder to a GitHub repo.
2. Settings → Pages → deploy from branch (root).
3. Lives at `https://<user>.github.io/<repo>/`.

**Cloudflare Pages**
1. Connect the repo (or drag-and-drop the folder).
2. No build command needed; output directory = the folder root.
3. Lives at `https://<project>.pages.dev`.

Either supports a custom domain for free.

## Support link

The tool links to Ko-fi at `https://ko-fi.com/fanktastc` in two places: a
"Support" chip in the header and a link in the footer (both in `index.html`).
Update or remove those if it ever changes. Keep every feature free — see the
note below.

## Attribution & policy

This tool uses only factual game data and does not embed Jagex image assets
(skill icons fall back to original line-art; wiki images load by URL). The
footer carries the required Jagex Fan Content Policy notice. Under that policy
the licence is non-commercial, so this tool is free; if you ever want to charge
for it you'd need a separate commercial licence from Jagex.

Created using intellectual property belonging to Jagex Limited under the terms
of Jagex's Fan Content Policy. This content is not endorsed by or affiliated
with Jagex.
