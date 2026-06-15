#!/usr/bin/env python3
"""Inline styles.css + data.js + app.js back into a single portable file.

Develop with the split files (index.html / styles.css / data.js / app.js).
Run `python3 build.py` to (re)generate maxcape-tracker.html — one self-contained
file anyone can download and open offline (no web server needed).

Host the split files (index.html + the rest) on a static host like GitHub Pages
or Cloudflare Pages; offer maxcape-tracker.html as the "download" version.
"""
import pathlib

here = pathlib.Path(__file__).parent
html = (here / "index.html").read_text(encoding="utf-8")
css  = (here / "styles.css").read_text(encoding="utf-8")
data = (here / "data.js").read_text(encoding="utf-8")
app  = (here / "app.js").read_text(encoding="utf-8")

LINK = '<link rel="stylesheet" href="styles.css">'
SCRIPTS = '<script src="data.js"></script>\n<script src="app.js"></script>'

assert html.count(LINK) == 1, "stylesheet <link> not found exactly once in index.html"
assert html.count(SCRIPTS) == 1, "script tags not found exactly once in index.html"

html = html.replace(LINK, "<style>\n" + css.strip("\n") + "\n</style>")
html = html.replace(SCRIPTS, "<script>\n" + data.strip("\n") + "\n" + app.strip("\n") + "\n</script>")

out = here / "maxcape-tracker.html"
out.write_text(html, encoding="utf-8")
print("Built", out.name, "(", out.stat().st_size, "bytes )")
