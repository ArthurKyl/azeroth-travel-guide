# The Wayfarer's Codex of Azeroth

## ▶ [**arthurkyl.github.io/azeroth-travel-guide**](https://arthurkyl.github.io/azeroth-travel-guide/) — use the site here

A World of Warcraft–themed reference website for D&D 5e hexcrawl travel rules —
survival, navigation, and environmental hazards across Azeroth, Outland, and Northrend.

Built as a plain static site with no build step. Every word on it lives in `content/*.yml` —
see **[docs/editing.md](docs/editing.md)** to change anything.

Serve the folder to view it (`python3 -m http.server 8000`); opening `index.html` directly
will not work, because the pages read their content files over HTTP.

## Pages

| Page | Contents |
| --- | --- |
| `index.html` | Travel hub — the daily travel phase loop, travel pace, wilderness dangers, GM checklist |
| `activities.html` | The 8 daily travel activities with skill checks, roll tiers, and stacking rules |
| `settlements.html` | Downtime activity grid — 6 locations available in every village and city, plus disposition DCs and the Reputation ladder |
| `biomes.html` | Interactive compendium of 61 zones — filter by continent/severity, search, and roll each zone's daily weather (1d6) with the exhaustion DC computed for you |
| `calendar.html` | The Azerothian calendar — ADP epoch, the 12 months, the 7-day week, the phases of both moons, the 182-day syzygy, and a whole-day module reference |
| `holidays.html` | The 13 annual festivals in calendar order, with dates, durations, participating factions, and world effects |
| `timeline.html` | Chronology from 0 ADP to 41 ADP — 96 dated main events and pre-event phases, filterable by period, type, and search |

## Structure

```
*.html                 page shells — <head> plus empty mount points
check.html             validates every content file, one report

content/site.yml       sidebar, nav, footer — shared by every page
content/*.yml          one file per page: all prose, numbers, tables, entries

css/style.css          WoW-themed design system
vendor/js-yaml.min.js  YAML parser (4.1.0, MIT), committed — no CDN
js/codex.js            shared runtime: load, validate, markdown, DOM builders
js/schemas.js          what each content file may contain (drives error messages)
js/moon-glyphs.js      moon phase SVG shapes, keyed by name
js/page-*.js           one renderer per page
tests/codex.test.mjs   unit tests: node --test tests/*.test.mjs
docs/editing.md        how to edit the content files
```

## Run locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Host on GitHub Pages (free)

```sh
gh repo create azeroth-travel-guide --public --source . --push
gh api repos/{owner}/azeroth-travel-guide/pages -X POST \
  -f "source[branch]=main" -f "source[path]=/"
```

Or in the GitHub UI: push this folder to a repo, then **Settings → Pages →
Deploy from a branch → main / (root)**. The site will be live at
`https://<user>.github.io/azeroth-travel-guide/`.

## Editing the content

Everything editable is in `content/`. Change a file, commit, push — no build step.

```sh
python3 -m http.server 8000     # preview at localhost:8000
# then open localhost:8000/check.html to validate all 8 content files
```

Full guide with worked examples (add a festival, add a zone, add a timeline event) and the YAML
traps to avoid: **[docs/editing.md](docs/editing.md)**.

A bad edit never produces a blank page — the affected page shows a red box naming the file, the
entry and the field, and `check.html` lists every problem at once.

---

*A fan-made, non-commercial tabletop aid. World of Warcraft and all related names are
trademarks of Blizzard Entertainment.*
