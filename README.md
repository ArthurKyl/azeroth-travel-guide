# The Wayfarer's Codex of Azeroth

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

## Structure

```
index.html
activities.html
settlements.html
biomes.html
css/style.css        # WoW-themed design system
js/zones-data.js     # zone data (generated from the campaign's Biomes.md)
js/biomes.js         # filtering, search, weather roller
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

## Updating the zone data

Zone content lives in `js/zones-data.js`, generated from the campaign's Obsidian
`Biomes.md`. Edit it directly, or regenerate it from an updated markdown file with
a parser that produces the same shape:

```js
{ name, continent, tagline, biome, severity, baselineDC,
  subfeatures: [{name, desc}], callouts: [{kind, title, text}],
  weather: [{roll, name, mod, effect}] }
```

---

*A fan-made, non-commercial tabletop aid. World of Warcraft and all related names are
trademarks of Blizzard Entertainment.*
