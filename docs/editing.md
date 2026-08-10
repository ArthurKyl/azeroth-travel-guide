# Editing the Codex

All the words, numbers and entries on this site live in `content/*.yml`. You never need to touch
HTML or JavaScript to change them.

| File | Page | What's in it |
| --- | --- | --- |
| `content/site.yml` | every page | Sidebar brand, nav links, footer |
| `content/travel-rules.yml` | `index.html` | Intro, phase loop, pace table, hazards, GM checklist, reference cards |
| `content/activities.yml` | `activities.html` | Daily loop, stacking rules, the 8 activities |
| `content/settlements.yml` | `settlements.html` | Downtime rules, the 6 locations |
| `content/biomes.yml` | `biomes.html` | Weather primer, all 61 zones |
| `content/calendar.yml` | `calendar.html` | Months, weekdays, both moons, syzygy, module reference |
| `content/holidays.yml` | `holidays.html` | The 13 festivals |
| `content/timeline.yml` | `timeline.html` | Era start dates, 13 eras, 96 events |

## The loop

1. Edit a file in `content/`.
2. Preview: `python3 -m http.server 8000`, then open <http://localhost:8000>.
   **Double-clicking `index.html` will not work** — the pages read the content files over HTTP.
3. Check: open <http://localhost:8000/check.html>. It validates all eight files and prints one
   report. "8 files · all clean" means you're good.
4. Publish: `git add -A && git commit -m "…" && git push`. The live site updates in under a minute.

You can also edit straight on github.com — press `e` on any file, commit, done. No local setup, but
you lose the preview and the check page until it's live.

## Formatting inside text

Any text field takes these:

| Write | Get |
| --- | --- |
| `**bold**` | **bold** |
| `_italic_` | _italic_ |
| `` `code` `` | `code` |
| `[Biome Compendium](biomes.html)` | a link to another page |
| `++text++` | green text, for successes and bonuses |
| `--text--` | red text, for failures and penalties |
| `!!text!!` | amber text, for natural 20s and notable results |

Longer text uses `>` and an indented block. Blank lines make new paragraphs, and a run of `- `
lines becomes a bullet list:

```yaml
text: |
  During syzygy, Azeroth experiences arcano-lunar tides:

  - **Ley-line throughput surges by 300%.**
  - Doubled mana recovery for Druids and Priests of Elune.

  Only the coinciding peak days count.
```

`>` folds your line breaks into one paragraph (use it for ordinary prose). `|` keeps them (use it
when you need paragraphs or lists, as above).

## Worked examples

### Add a festival

Copy any block under `festivals:` in `content/holidays.yml`. It appears in both the year-overview
table and the detail cards — the table is built from this same list, so there's only one place to
edit.

```yaml
  - id: pilgrims-bounty          # used for the #anchor link; keep it unique
    name: Pilgrim's Bounty
    month: 8 · Amberfall          # the overview table's Month column
    days: 3 – 9                   # the overview table's Days column
    when: Month 8 · Amberfall, Days 3 – 9    # the date line on the card
    duration: 7 days
    factions: [Alliance, Horde]
    impact: >
      Caravans haul turkey and squash to every capital; **+1 Reputation** for any party that
      escorts one intact.
```

### Add a zone

Copy a block under `zones:` in `content/biomes.yml`. Each zone needs three weather rows covering
rolls 1–6, and the roller adds the row's `mod` to the zone's `dc`.

```yaml
  - name: Gilneas
    continent: Eastern Kingdoms   # a new continent here adds its own filter chip automatically
    tagline: Storm-lashed cliffs and shuttered manors
    biome: Harsh (Baseline DC 13)
    severity: harsh               # mild | harsh | deadly — colours the card
    dc: 13
    subfeatures:
      - name: Duskhaven Sinkholes
        text: Collapsing ground; DC 13 Dexterity save or fall 10 feet.
    callouts:                     # optional
      - kind: warning             # danger | warning | info | important
        title: Worgen curse
        text: Nights outside the wall carry a **DC 14 Wisdom save** against the curse.
    weather:
      - { roll: 1–3, name: Overcast, mod: +0 DC, effect: Grey but calm. }
      - { roll: 4–5, name: Coastal squall, mod: +2 DC, effect: Lightly obscured; ranged range halved. }
      - { roll: "6", name: Full gale, mod: +4 DC, effect: Heavily obscured; disadvantage on Perception. }
```

### Add a timeline event

Find the era in `content/timeline.yml` and add to its `events:` list, in date order.

```yaml
      - year: 27
        month: 7
        day: 4
        kind: main            # main = filled dot; pre = hollow dot (a lead-up event)
        title: Siege of the Nexus
        desc: >
          Malygos draws the ley-lines into Coldarra; the Kirin Tor commit their vanguard.
```

### Change a DC or a number

Search the file for the number and change it. Nothing else needs updating — the biome cards, the
weather roller and the exhaustion maths all read the same `dc:` field.

### Add a page to the nav

Add a link under the right group in `content/site.yml` and it appears in the sidebar of every page
at once. (The page itself still needs an `.html` shell and a renderer — ask Claude for that part.)

## When a page shows a red "Content problem" box

That's the safety net, not a crash. It names the file, the entry and the field, for example:

```
holidays.yml → festivals entry 10 (Brewfest): missing required field 'impact'
biomes.yml → zones entry 1 (Durotar): 'severity' must be one of mild, harsh, deadly (got 'lethal')
holidays.yml → festivals entry 3 (Noblegarden): unknown field 'factons' (did you mean 'factions'?)
```

Fix the named field and reload. `check.html` shows all of them at once.

## The four YAML traps

These are the ones that actually bite. All four produce a clear error or a visibly wrong value, so
nothing breaks silently.

1. **A value ending in a colon** is read as a nested block. Quote it:
   `text: "Two or more players can perform the same activity:"`
2. **A value starting with `+`** is read as a number, and the plus disappears. Quote it:
   `key: "+5"` — otherwise it renders as `5`.
3. **Commas inside `{ }`** separate entries, so a value containing a comma must be quoted:
   `{ index: 5, name: Forge's Day, assoc: "Metal, Industrial Craft, Fire" }`
4. **Indentation must be spaces, never tabs**, and every entry in a list needs the same depth.

## Adding a new kind of section

The layout of each page is fixed in its `.html` file and renderer (`js/page-*.js`). Adding a field
to an existing kind of block, or a whole new section type, is a code change — ask Claude, pointing
at `docs/superpowers/specs/2026-08-10-editable-content-design.md` for how the pieces fit.

If you add a field to a content file without adding it to `js/schemas.js`, the loader reports it as
an unknown field. That's deliberate: it catches typos.

## For the curious: how it works

`vendor/js-yaml.min.js` parses the content, `js/schemas.js` says what each file may contain,
`js/codex.js` validates it and provides the shared rendering pieces, and each `js/page-*.js` maps
content to markup. `tests/codex.test.mjs` covers the text and validation logic
(`node --test tests/*.test.mjs`).
