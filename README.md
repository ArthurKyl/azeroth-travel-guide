# The Wayfarer's Codex of Azeroth

## ▶ [**arthurkyl.github.io/azeroth-travel-guide**](https://arthurkyl.github.io/azeroth-travel-guide/) — use the site here

A World of Warcraft–themed reference website for D&D 5e hexcrawl travel rules —
survival, navigation, and environmental hazards across Azeroth, Outland, and Northrend.

Built as a plain static site: no build step, no dependencies. Open `index.html` or serve the folder.

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
index.html
activities.html
settlements.html
biomes.html
calendar.html
holidays.html
timeline.html
css/style.css        # WoW-themed design system
js/zones-data.js     # zone data (generated from the campaign's Biomes.md)
js/biomes.js         # filtering, search, weather roller
js/timeline-data.js  # eras, events, and era start dates (from Calendar Timeline.md)
js/timeline.js       # timeline rendering, filtering, era jump links
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

## Updating the data files

Zone content lives in `js/zones-data.js`, generated from the campaign's Obsidian
`Biomes.md`. Edit it directly, or regenerate it from an updated markdown file with
a parser that produces the same shape:

```js
{ name, continent, tagline, biome, severity, baselineDC,
  subfeatures: [{name, desc}], callouts: [{kind, title, text}],
  weather: [{roll, name, mod, effect}] }
```

Timeline content lives in `js/timeline-data.js`, transcribed from the campaign's
`Calendar Timeline.md`. Events are listed in chronological order within each era:

```js
{ id, name, span, chapter: "history" | "modern", note?,
  events: [{ year, month, day, kind: "main" | "pre", title, desc }] }
```

The calendar and holiday pages are hand-written HTML — edit them directly.

---

*A fan-made, non-commercial tabletop aid. World of Warcraft and all related names are
trademarks of Blizzard Entertainment.*
