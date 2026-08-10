# Editable Content Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move every page's content out of hand-written HTML into `content/*.yml` files the owner can edit, rendered client-side with no build step.

**Architecture:** Each `*.html` file keeps only its `<head>` and empty mount points. `js/codex.js` provides a shared runtime (YAML load, inline/block markdown, DOM builders, schema validation, error banner, sidebar chrome). One `js/page-<name>.js` per page maps content to the existing markup. A red banner naming file/entry/field replaces the blank page a bad edit would otherwise cause.

**Tech Stack:** Vanilla ES2020 browser JS, no framework, no build step. `vendor/js-yaml.min.js` (4.1.0, MIT, already committed) exposes global `jsyaml`. Tests: `node --test` (zero dependencies) for pure functions; a scratchpad jsdom harness for render-diff regression.

## Global Constraints

- **No build step.** Content is fetched and parsed at page load. Never add a compile/generate step to the publish path.
- **No CDN / no network at runtime.** Every asset except Google Fonts (already present) is served from the repo.
- **Preserve existing CSS class names exactly.** `css/style.css` is not modified by this work. Renderers must emit the same classes the hand-written HTML used (`.card`, `.activity`, `.settlement`, `.callout.danger`, `.badge.skill`, `.tier-table`, `tr.t-poor`, `.def-row.mild`, `.zone-grid`, `.timeline > li.main`, …).
- **Preserve existing behaviour.** Biome continent/severity filters, zone search, 1d6 weather roller; timeline period/type filters, search, era jump chips; `prefers-reduced-motion` handling in the roller.
- **Preserve existing ids and anchors.** `#motivate`, `#pioneer`, `#scout-den`, per-holiday ids, `#<era-id>` — other pages link to them.
- **Content is escaped before rendering.** `md()` HTML-escapes input, then substitutes markup. No `innerHTML` of raw content anywhere.
- **Every page sets `document.title` from content**, keeping the static `<title>` as the pre-JS fallback.
- **Fail loud, never blank.** Any load/parse/validation problem renders the banner and stops that page's render.

---

## File Structure

| File | Responsibility |
| --- | --- |
| `content/site.yml` | brand, sidebar nav groups, footer, tag line |
| `content/travel-rules.yml` | index page: head, intro, phase loop, pace rows, hazards, GM checklist, gateways |
| `content/activities.yml` | head, daily loop steps, stacking callout, 8 activities |
| `content/settlements.yml` | head, downtime rule cards, 6 locations |
| `content/biomes.yml` | head, primer cards, 61 zones |
| `content/holidays.yml` | head, festival-year table, 13 festivals |
| `content/timeline.yml` | head, month names, era baselines, 13 eras with events |
| `content/calendar.yml` | head, epoch cards, months, weekdays, 2 moons, syzygy, module reference |
| `js/codex.js` | shared runtime; defines `globalThis.Codex`; no DOM access at load |
| `js/schemas.js` | one declarative schema per content file; defines `globalThis.SCHEMAS` |
| `js/page-travel-rules.js` … `js/page-timeline.js` | 7 page renderers |
| `check.html` | loads all 8 content files, validates, prints one report |
| `docs/editing.md` | how to edit, field reference per file, preview, publish |
| deleted | `js/zones-data.js`, `js/timeline-data.js`, `js/biomes.js`, `js/timeline.js`, `tools/parse_biomes.py` |

---

### Task 1: Shared runtime, schemas, site chrome, and the regression harness

**Files:**
- Create: `js/codex.js`, `js/schemas.js`, `content/site.yml`, `tests/codex.test.mjs`
- Create (scratchpad, not committed): `render_snapshot.mjs`

**Interfaces:**
- Consumes: `vendor/js-yaml.min.js` global `jsyaml`
- Produces: `globalThis.Codex` = `{ load, md, rich, el, badge, callout, card, table, defRows, tierTable, validate, fail, renderChrome, boot }` and `globalThis.SCHEMAS` (per-file schema objects). Every later task uses `Codex.boot(name, render)`.

- [ ] **Step 1: Capture baseline render snapshots of all 7 pages BEFORE any change**

In the scratchpad, write `render_snapshot.mjs`. It loads a page with jsdom (`runScripts: 'dangerously'`, `resources: 'usable'`), injects a `fetch` polyfill in `beforeParse` that reads `content/*.yml` off disk (needed because jsdom has no `fetch`), waits for render, then prints normalized visible text (collapse whitespace, one line per block element).

```js
import { JSDOM } from "jsdom";
import fs from "node:fs/promises";
import path from "node:path";
const ROOT = "/mnt/games-2/projects/azeroth-travel-guide";
export async function snapshot(page) {
  const dom = await JSDOM.fromFile(path.join(ROOT, page), {
    runScripts: "dangerously", resources: "usable",
    beforeParse(w) {
      w.fetch = async (url) => {
        const p = path.join(ROOT, String(url).replace(/^.*\/(?=content\/)/, ""));
        try { const body = await fs.readFile(p, "utf8");
              return { ok: true, status: 200, text: async () => body }; }
        catch { return { ok: false, status: 404, text: async () => "" }; }
      };
    },
  });
  await new Promise((r) => setTimeout(r, 600));
  const text = dom.window.document.querySelector("main.content").textContent;
  dom.window.close();
  return text.replace(/\s+/g, " ").trim();
}
```

Run it for all 7 pages, write each to `baseline/<page>.txt`.

Run: `node render_snapshot.mjs --all --out baseline`
Expected: 7 non-empty files; `index.txt` contains "Travel Rules" and "30 miles (5 hexes)".

- [ ] **Step 2: Write failing tests for `md`, `rich`, and `validate`**

`tests/codex.test.mjs` — loads `js/codex.js` by eval (it assigns `globalThis.Codex` and touches no DOM at load):

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
eval(fs.readFileSync(new URL("../js/codex.js", import.meta.url), "utf8"));
const { md, rich, validate } = globalThis.Codex;

test("md escapes before substituting", () => {
  assert.equal(md("a < b & **c**"), "a &lt; b &amp; <strong>c</strong>");
  assert.equal(md("<script>x</script>"), "&lt;script&gt;x&lt;/script&gt;");
});
test("md handles bold, italic, code, links", () => {
  assert.equal(md("**b**"), "<strong>b</strong>");
  assert.equal(md("_i_"), "<em>i</em>");
  assert.equal(md("`c`"), "<code>c</code>");
  assert.equal(md("[Biomes](biomes.html)"), '<a href="biomes.html">Biomes</a>');
});
test("rich splits paragraphs and bullet lists", () => {
  assert.equal(rich("one\n\ntwo"), "<p>one</p><p>two</p>");
  assert.equal(rich("lead\n\n- a\n- b"), "<p>lead</p><ul><li>a</li><li>b</li></ul>");
});
test("validate reports missing required fields with a path", () => {
  const schema = { type: "list", item: { fields: { name: { required: true },
                                                  impact: { required: true } } } };
  const problems = validate([{ name: "Brewfest" }], schema, "holidays.yml");
  assert.deepEqual(problems, ["holidays.yml → entry 1 (Brewfest): missing required field 'impact'"]);
});
test("validate reports unknown fields and bad enums", () => {
  const schema = { type: "list", item: { fields: { severity: { enum: ["mild", "harsh"] } } } };
  assert.deepEqual(validate([{ severity: "lethal" }], schema, "biomes.yml"),
    ["biomes.yml → entry 1: 'severity' must be one of mild, harsh (got 'lethal')"]);
  assert.deepEqual(validate([{ sevrity: "mild" }], schema, "biomes.yml"),
    ["biomes.yml → entry 1: unknown field 'sevrity' (did you mean 'severity'?)"]);
});
test("validate accepts valid data", () => {
  const schema = { type: "list", item: { fields: { name: { required: true } } } };
  assert.deepEqual(validate([{ name: "ok" }], schema, "x.yml"), []);
});
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `node --test tests/`
Expected: FAIL — `js/codex.js` does not exist.

- [ ] **Step 4: Implement `js/codex.js`**

Single IIFE assigning `globalThis.Codex`. No DOM access at load time (so node can eval it).

Required behaviour per function:

- `esc(s)` — `&`, `<`, `>`, `"` → entities.
- `md(text)` — `esc` first, then in order: `` `code` `` → `<code>`, `**b**` → `<strong>`, `[l](h)` → `<a href="h">` (href passed through `esc`), `_i_` → `<em>`. Underscore rule must not fire inside words (`Kosh_harg` stays literal): require a non-word char or string boundary on each side.
- `rich(text)` — split on `\n\s*\n`; a block whose every line starts with `- ` becomes `<ul><li>` items (each through `md`); otherwise `<p>` with single newlines collapsed to spaces.
- `el(tag, attrs, children)` — create element; `attrs.html` sets `innerHTML` (already-escaped strings from `md`/`rich` only), `attrs.class`, `attrs.text` sets `textContent`; children array of nodes/strings.
- `badge(text, kind)` → `<span class="badge kind">`; kind optional (`skill`, `gold`, `mild`, `harsh`, `deadly`).
- `callout({kind, title, text, items})` → `<div class="callout kind"><h4>…</h4>` + `rich(text)` + optional `<ul>`.
- `card(children, cls)` → `<div class="card cls">`.
- `table({columns, rows, cls})` → `.table-scroll > table.codex` with `<th scope="col">`; a row cell may be `{text, class}` or a string; first cell gets `class="key"` when `rows[i].key` is true.
- `defRows(rows)` → `.def-rows` of `.def-row.<tone>` with `.def-key` + text.
- `tierTable(tiers)` → `table.tier-table` with `<tr class="t-<tier>"><td class="range">…</td><td>…</td>`.
- `validate(data, schema, file)` — recursive walk returning an array of human-readable problems. Node shape: `{type: 'string'|'number'|'list'|'map', required, fields, item, enum}`. For list items, label the path as `entry N (name)` using the item's `name`/`title` field when present. Unknown-field messages include the nearest valid field name by Levenshtein distance ≤ 3.
- `load(name)` — `fetch("content/" + name + ".yml")`; on `!ok` throw `Error("content/<name>.yml could not be loaded (<status>)")`; parse with `jsyaml.load`, wrapping parse errors as `content/<name>.yml — <mark.line+1>: <reason>`.
- `fail(problems)` — prepend `<div class="content-error">` to `main.content` listing each problem in a `<ul>`; also `console.error` each.
- `renderChrome(site, current)` — build `.sidebar` brand, nav groups (`.nav-label` + links, `aria-current="page"` on `current`), and `.sidebar-foot`; build `footer.site-footer` text.
- `boot(name, render)` — `DOMContentLoaded` → `Promise.all([load('site'), load(name)])` → `validate` both against `SCHEMAS.site` / `SCHEMAS[name]` → problems ? `fail` : (`renderChrome`, `render(data)`, set `document.title`). Catch all throws into `fail([err.message])`.

- [ ] **Step 5: Run tests to verify they pass**

Run: `node --test tests/`
Expected: PASS, 5/5.

- [ ] **Step 6: Write `content/site.yml` and `js/schemas.js`**

```yaml
# content/site.yml — chrome shared by every page
brand:
  name: "Wayfarer's\nCodex"
  sub: Azeroth hexcrawl rules
nav:
  - label: Rules
    links:
      - { text: Travel Rules, href: index.html }
      - { text: Travel Activities, href: activities.html }
      - { text: Settlement Downtime, href: settlements.html }
  - label: Reference
    links:
      - { text: Biome Compendium, href: biomes.html }
      - { text: Calendar & Moons, href: calendar.html }
      - { text: Festivals & Holidays, href: holidays.html }
      - { text: Historical Timeline, href: timeline.html }
footer:
  tag: D&D 5e · WotLK era
  note: Fan-made framework for use at your own table.
  legal: >
    The Wayfarer's Codex — a fan-made D&D 5e framework set in the World of Warcraft.
    World of Warcraft and related names are trademarks of Blizzard Entertainment.
```

`js/schemas.js` defines `globalThis.SCHEMAS` with one entry per content file. Each page task adds its own schema entry in that task.

- [ ] **Step 7: Commit**

```bash
git add js/codex.js js/schemas.js content/site.yml tests/codex.test.mjs
git commit -m "Add shared YAML content runtime, schemas, and site chrome"
```

---

### Task 2: Holidays page (proves the pattern end to end)

**Files:**
- Create: `content/holidays.yml`, `js/page-holidays.js`
- Modify: `holidays.html` (strip content to shell), `js/schemas.js` (add `holidays`)

**Interfaces:**
- Consumes: `Codex.boot`, `Codex.md`, `Codex.rich`, `Codex.badge`, `Codex.table`, `Codex.el`
- Produces: nothing consumed by later tasks; establishes the shell + renderer pattern all later page tasks copy.

- [ ] **Step 1: Write `content/holidays.yml`**

Transcribe all 13 festivals verbatim from the current `holidays.html`, plus the page head and the festival-year table. Shape:

```yaml
head:
  kicker: Reference
  title: Festivals & Holidays
  summary: >
    Annual celebrations across Azeroth trigger substantial political, economic,
    and magical shifts — dictating diplomatic trade windows, troop mobilization
    drives, and spiritual convergences.
  stats:
    - { value: "13", label: celebrations }
    - { value: "7–16", label: days each }
    - { value: "137", label: festival days per year }

year_table:
  heading: The Festival Year
  note: >
    Dates are given as month and day on the [Azerothian calendar](calendar.html).
    Only Highspring, Harvestide, and Amberfall carry no major celebration.

festivals:
  - id: lunar-festival
    name: Lunar Festival
    month: 1 · First Dawn
    days: 15 – 28
    when: Month 1 · First Dawn, Days 15 – 28
    duration: 14 days
    factions: [Alliance, Horde, Night Elves, Tauren]
    impact: >
      Ancestral spirit activity spikes worldwide; Elders award **Lunar Coins**;
      Elune blessings grant temporary stamina and spell resistance; minor faction
      **ceasefires** enforced at ancestral grounds.
```

`month` and `days` feed the year table; `when` and `duration` feed the card. The year table is generated from the same `festivals` list — no second copy of the data.

- [ ] **Step 2: Add the `holidays` schema to `js/schemas.js`**

```js
SCHEMAS.holidays = {
  type: "map",
  fields: {
    head: { type: "map", required: true, fields: {
      kicker: { required: true }, title: { required: true }, summary: { required: true },
      stats: { type: "list", item: { fields: { value: { required: true }, label: { required: true } } } } } },
    year_table: { type: "map", required: true, fields: {
      heading: { required: true }, note: { required: true } } },
    festivals: { type: "list", required: true, item: { fields: {
      id: { required: true }, name: { required: true }, month: { required: true },
      days: { required: true }, when: { required: true }, duration: { required: true },
      factions: { type: "list", required: true }, impact: { required: true } } } },
  },
};
```

- [ ] **Step 3: Strip `holidays.html` to a shell**

Keep `<head>` (title/description/fonts/css/favicon) and:

```html
<body>
<div class="app">
  <aside class="sidebar"></aside>
  <main class="content">
    <header class="page-head"></header>
    <section class="rule-section" id="year-table" aria-labelledby="year-title"></section>
    <section class="rule-section" id="detail" aria-labelledby="detail-title"></section>
    <footer class="site-footer"></footer>
  </main>
</div>
<script src="vendor/js-yaml.min.js"></script>
<script src="js/codex.js"></script>
<script src="js/schemas.js"></script>
<script src="js/page-holidays.js"></script>
</body>
```

- [ ] **Step 4: Implement `js/page-holidays.js`**

```js
Codex.boot("holidays", (d) => {
  const { el, md, rich, badge, table } = Codex;
  Codex.pageHead(d.head);                                   // shared: kicker/h1/summary/meta-stats
  // year table — rows built from d.festivals
  const rows = d.festivals.map((f) => ({ key: true, cells: [
    f.month, `<a href="#${f.id}">${md(f.name)}</a>`, f.days, f.duration ] }));
  // detail cards — .holiday-grid of article.card.holiday
});
```

`Codex.pageHead(head)` is a small shared helper added in this task to `js/codex.js` (kicker, `<h1>`, summary, `.meta-stats`) since all 7 pages need it; add it to the `Codex` export list and to Task 1's interface.

- [ ] **Step 5: Verify the render is unchanged**

Run: `node render_snapshot.mjs holidays.html > after.txt && diff baseline/holidays.txt after.txt`
Expected: no output (identical visible text).

- [ ] **Step 6: Verify failure behaviour**

Temporarily delete the `impact:` line of one festival, reload the page in the snapshot harness.
Expected: page shows the banner text `holidays.yml → entry 10 (Brewfest): missing required field 'impact'`, and no festival cards. Restore the line afterwards.

- [ ] **Step 7: Commit**

```bash
git add content/holidays.yml js/page-holidays.js js/schemas.js js/codex.js holidays.html
git commit -m "Move holidays content into content/holidays.yml"
```

---

### Task 3: Activities page

**Files:**
- Create: `content/activities.yml`, `js/page-activities.js`
- Modify: `activities.html`, `js/schemas.js`

**Interfaces:**
- Consumes: `Codex.boot`, `pageHead`, `steps`, `callout`, `badge`, `tierTable`
- Produces: `Codex.steps(items)` → `ol.steps` (added here, reused by Task 5)

- [ ] **Step 1: Write `content/activities.yml`**

Transcribe from current `activities.html`: head, `daily_loop` (3 steps), `stacking` callout (info, with 2 bullet items), and 8 activities. Activity shape — each has `checks` plus **either** `outcomes` **or** `tiers`:

```yaml
activities:
  - id: scouting
    name: Scouting
    goal: Keep eyes on the horizon to spot threats, ambushes, or points of interest early.
    checks: [Wisdom (Perception), Dexterity (Stealth)]     # rendered as skill badges joined by "or"
    outcomes:
      - { result: success, label: "Success:", text: "the party cannot be surprised…" }
      - { result: failure, label: "Failure:", text: "standard passive Perception applies." }
  - id: pray
    name: Pray / Commune
    goal: …
    checks: [Intelligence (Religion), Charisma (Persuasion)]
    tiers:
      - { tier: poor, range: 1–9, text: No response. }
      - { tier: uncommon, range: 10–14, text: "**Light Blessing** — gain temporary HP…" }
```

`result` maps to the label class: `success` → `.label-success`, `failure` → `.label-failure`, `nat` → `.label-nat`. `tier` maps to `tr.t-<tier>`.

- [ ] **Step 2: Add the `activities` schema**

Required per activity: `id`, `name`, `goal`, `checks`. `outcomes` and `tiers` both optional, but the renderer must report `"activities.yml → entry N (Name): needs either 'outcomes' or 'tiers'"` when both are absent — add this as a custom check in the page renderer before building cards.

- [ ] **Step 3: Strip `activities.html` to a shell** (same pattern as Task 2; sections: `#loop`, `#acts`)

- [ ] **Step 4: Implement `js/page-activities.js`** — `.activity-grid` of `article.activity.card` with `h3`, `p.goal`, `p.checks` (badges joined by the literal text " or "), then `ul.mech` from `outcomes` or `tierTable(tiers)`.

- [ ] **Step 5: Verify**

Run: `node render_snapshot.mjs activities.html > after.txt && diff baseline/activities.txt after.txt`
Expected: no output. Also confirm `#motivate` and `#pioneer` anchors still resolve (other pages link to them).

- [ ] **Step 6: Commit**

```bash
git add content/activities.yml js/page-activities.js js/schemas.js js/codex.js activities.html
git commit -m "Move activities content into content/activities.yml"
```

---

### Task 4: Settlements page

**Files:**
- Create: `content/settlements.yml`, `js/page-settlements.js`
- Modify: `settlements.html`, `js/schemas.js`

**Interfaces:**
- Consumes: `Codex.boot`, `pageHead`, `card`, `defRows`, `tierTable`, `badge`
- Produces: nothing new

- [ ] **Step 1: Write `content/settlements.yml`**

Transcribe: head, `rules` (3 cards — Safe Spot prose; disposition DC ladder; Reputation ladder), and 6 locations. Locations carry an `accent` colour (currently a `style="--accent:…"` attribute) and have **either** `options` **or** `mechanic_line` + `tiers` (+ optional `stack_note`):

```yaml
rules:
  - heading: Safe Spot
    text: >
      Every settlement is a **Safe Spot**: a night's rest here clears
      [Exhaustion](index.html) gained on the road…
  - heading: Check DCs by disposition
    def_rows:
      - { key: DC 12, tone: mild, text: "**Friendly** — the party is welcome…" }

locations:
  - id: tavern
    name: The Tavern
    accent: "#d9973b"
    tagline: Information, social lubrication & local rumors
    options:
      - title: Drink & Gossip
        cost: Free
        check: { skills: [Charisma (Persuasion), Intelligence (Investigation)] }
        outcome: { result: success, label: "Success:", text: "discover a regional rumor…" }
      - title: Buy a Round
        cost: 5–20 gold · by settlement size
        check: { note: No check — automatic }
        outcome: { result: success, label: "Effect:", text: "loosen local tongues…" }
  - id: underbelly
    name: The Underbelly
    accent: "#a887d9"
    tagline: High-risk secrets, black markets & illicit opportunities
    mechanic_line: "Single check: **Dexterity (Stealth)**, **Charisma (Deception)**, or **Intelligence (Investigation)**"
    tiers:
      - { tier: poor, range: 1–9, text: "**You stand out.** Nobody talks to you…" }
```

`check.skills` renders skill badges joined by " or "; `check.note` renders one plain badge.

- [ ] **Step 2: Add the `settlements` schema** — required per location: `id`, `name`, `accent`, `tagline`; renderer reports `"needs either 'options' or 'tiers'"` when both absent.

- [ ] **Step 3: Strip `settlements.html` to a shell** (sections `#rules`, `#grid`)

- [ ] **Step 4: Implement `js/page-settlements.js`** — `.settlement-grid` of `article.settlement.card` with `style="--accent:…"`, `header > .loc-dot + h3`, `p.tagline`, then `.option` blocks (`h4.option-title` + `span.cost`, `p.check`, `p.outcome`) or `p.mechanic-line` + `tierTable` + `p.stack-note`.

- [ ] **Step 5: Verify**

Run: `node render_snapshot.mjs settlements.html > after.txt && diff baseline/settlements.txt after.txt`
Expected: no output. Also confirm the 6 accent colours still appear as inline `--accent` custom properties.

- [ ] **Step 6: Commit**

```bash
git add content/settlements.yml js/page-settlements.js js/schemas.js settlements.html
git commit -m "Move settlement downtime content into content/settlements.yml"
```

---

### Task 5: Travel rules page (index)

**Files:**
- Create: `content/travel-rules.yml`, `js/page-travel-rules.js`
- Modify: `index.html`, `js/schemas.js`

**Interfaces:**
- Consumes: `Codex.boot`, `pageHead`, `steps`, `table`, `callout`, `card`
- Produces: `Codex.checklist(items)` → `ul.checklist` with working checkboxes and unique ids

- [ ] **Step 1: Write `content/travel-rules.yml`**

Transcribe: head; `intro` (the `blockquote.read-aloud`); `phase_loop` (4 steps); `pace` (3 rows — note the third column header is **Effect**, renamed this session); `hazards` (3 callouts: danger/warning/info); `gm_checklist` (3 items); `gateways` (6 cards).

```yaml
pace:
  heading: Travel Pace
  columns: [Pace, Distance / day, Effect, Restrictions]
  rows:
    - pace: Fast
      distance: 30 miles (5 hexes)
      effect: "−5 passive Perception"
      effect_tone: failure          # → span.label-failure
      restrictions: Cannot stealth, forage, or map.
gateways:
  - { title: Travel Activities, href: activities.html, text: "Player roles for the march…", count: 8 activities · stacking rules }
```

- [ ] **Step 2: Add the `travel_rules` schema** (key name `travel-rules` to match the filename)

- [ ] **Step 3: Strip `index.html` to a shell** (sections `#loop`, `#pace`, `#danger`, `#gm`, `#gateway`)

- [ ] **Step 4: Implement `js/page-travel-rules.js`**

- [ ] **Step 5: Verify**

Run: `node render_snapshot.mjs index.html > after.txt && diff baseline/index.txt after.txt`
Expected: no output. Confirm the GM checklist checkboxes are still clickable and each `<input>` has a unique id paired with its label.

- [ ] **Step 6: Commit**

```bash
git add content/travel-rules.yml js/page-travel-rules.js js/schemas.js js/codex.js index.html
git commit -m "Move travel rules content into content/travel-rules.yml"
```

---

### Task 6: Calendar page

**Files:**
- Create: `content/calendar.yml`, `js/page-calendar.js`, `js/moon-glyphs.js`
- Modify: `calendar.html`, `js/schemas.js`

**Interfaces:**
- Consumes: `Codex.boot`, `pageHead`, `table`, `card`, `callout`, `defRows`
- Produces: `globalThis.MOON_GLYPHS` — a map from glyph name to SVG path data

- [ ] **Step 1: Create `js/moon-glyphs.js`**

The 13 inline SVGs become a lookup so content only names a phase shape. Path data, verified this session against a rasterized strip:

```js
globalThis.MOON_GLYPHS = {
  new:            null,                                     // dark disc only
  "waxing-crescent": "M9,1 A8,8 0 0 1 9,17 A4,8 0 0 0 9,1 Z",
  "first-quarter":   "M9,1 A8,8 0 0 1 9,17 Z",
  "waxing-gibbous":  "M9,1 A8,8 0 0 1 9,17 A4,8 0 0 1 9,1 Z",
  full:              "FULL",                                // whole disc in the lit colour
  "waning-gibbous":  "M9,1 A8,8 0 0 0 9,17 A4,8 0 0 0 9,1 Z",
  "last-quarter":    "M9,1 A8,8 0 0 0 9,17 Z",
  "waning-crescent": "M9,1 A8,8 0 0 0 9,17 A4,8 0 0 1 9,1 Z",
};
```

Renderer builds `<svg viewBox="0 0 18 18">` with a `#24262b` disc and `#3c3f47` stroke, plus the lit path in the moon's `lit` colour (`#e9e7e2` White Lady, `#5b9fd6` Blue Child).

- [ ] **Step 2: Write `content/calendar.yml`**

Transcribe: head; `epoch` (3 cards); `months` (12 rows); `weekdays` (7 rows); `moons` (2, each with `name`, `cycle`, `tagline`, `lit`, `blue: true` for the Blue Child, and `phases[{glyph, days, name, text, peak}]`); `syzygy` (note, 2 day cards, the slip warning callout, the effects info callout); `module_reference` (2 rows); `at_a_glance` (3 cards).

- [ ] **Step 3: Add the `calendar` schema** — `phases[].glyph` uses `enum` listing the 8 `MOON_GLYPHS` keys, so a typo'd glyph name is a validation error rather than a missing moon.

- [ ] **Step 4: Strip `calendar.html` to a shell** (sections `#epoch`, `#months`, `#week`, `#moons`, `#syzygy`, `#module`, `#glance`)

- [ ] **Step 5: Implement `js/page-calendar.js`**

- [ ] **Step 6: Verify**

Run: `node render_snapshot.mjs calendar.html > after.txt && diff baseline/calendar.txt after.txt`
Expected: no output. Additionally assert 13 `<svg>` glyphs are present and the full-moon rows use the lit-disc form:
`node -e "…querySelectorAll('.phase-table svg').length === 13"`

- [ ] **Step 7: Commit**

```bash
git add content/calendar.yml js/page-calendar.js js/moon-glyphs.js js/schemas.js calendar.html
git commit -m "Move calendar content into content/calendar.yml"
```

---

### Task 7: Biome compendium (61 zones, filters, weather roller)

**Files:**
- Create: `content/biomes.yml`, `js/page-biomes.js`
- Modify: `biomes.html`, `js/schemas.js`
- Delete: `js/zones-data.js`, `js/biomes.js`, `tools/parse_biomes.py`

**Interfaces:**
- Consumes: `Codex.boot`, `pageHead`, `card`, `defRows`, `callout`, `badge`
- Produces: nothing new

- [ ] **Step 1: Generate `content/biomes.yml` from `js/zones-data.js`**

Do not hand-transcribe 61 zones. Convert programmatically so fidelity is guaranteed:

```bash
cd /tmp/.../scratchpad && node -e '
const fs=require("fs"); const yaml=require("js-yaml");
const src=fs.readFileSync("/mnt/games-2/projects/azeroth-travel-guide/js/zones-data.js","utf8");
const {ZONES}=eval(src+"; ({ZONES})");
const zones=ZONES.map(z=>({name:z.name,continent:z.continent,tagline:z.tagline,biome:z.biome,
  severity:z.severity,dc:z.baselineDC,
  subfeatures:z.subfeatures.map(s=>({name:s.name,text:s.desc})),
  callouts:z.callouts.map(c=>({kind:c.kind.toLowerCase(),title:c.title,text:c.text})),
  weather:z.weather.map(w=>({roll:w.roll,name:w.name,mod:w.mod,effect:w.effect}))}));
fs.writeFileSync("/mnt/games-2/projects/azeroth-travel-guide/content/biomes.yml",
  yaml.dump({zones}, {lineWidth:100, quotingType:"\"", forceQuotes:false}));'
```

Then prepend the `head` and `primer` blocks (3 primer cards: biome classes, daily weather 1d6, hex navigation sequence) transcribed from the current `biomes.html`.

Assert the round trip: 61 zones, and every zone has exactly 3 weather rows.

- [ ] **Step 2: Add the `biomes` schema** — per zone: `name`, `continent`, `tagline`, `biome`, `severity` (enum mild/harsh/deadly), `dc` (number), `subfeatures`, `weather` required; `callouts` optional with `kind` enum `danger|warning|info|important`.

- [ ] **Step 3: Strip `biomes.html` to a shell**, keeping the filter bar markup (search input, continent chips, severity chips, result count, `#zone-grid`) — those are controls, not content. Continent chip labels come from `content/biomes.yml` zone data (unique continents in first-seen order), so adding a zone on a new continent needs no HTML edit.

- [ ] **Step 4: Port `js/biomes.js` into `js/page-biomes.js`**

Keep the existing filter/search/roller logic verbatim except: read zones from the YAML data, use `dc` instead of `baselineDC`, `subfeatures[].text` instead of `.desc`, and build cards with `Codex` builders. The roller must keep `parseRange`, the `prefers-reduced-motion` branch, the `.rolled` row highlight, and the "base + weather" DC breakdown.

- [ ] **Step 5: Verify**

Run: `node render_snapshot.mjs biomes.html > after.txt && diff baseline/biomes.txt after.txt`
Expected: no output.

Then exercise the interactions in the harness: assert 61 zone cards; click `[data-continent="Northrend"]` and assert the result count text updates and only Northrend cards remain visible; type "fel" in the search and assert the count drops; click a zone's roll button and assert a `.rolled` row appears and the result text contains "DC".

- [ ] **Step 6: Delete the superseded files and commit**

```bash
git rm js/zones-data.js js/biomes.js tools/parse_biomes.py
git add content/biomes.yml js/page-biomes.js js/schemas.js biomes.html
git commit -m "Move 61 zones into content/biomes.yml; retire the Biomes.md parser"
```

---

### Task 8: Historical timeline (96 events, filters, jump chips)

**Files:**
- Create: `content/timeline.yml`, `js/page-timeline.js`
- Modify: `timeline.html`, `js/schemas.js`
- Delete: `js/timeline-data.js`, `js/timeline.js`

**Interfaces:**
- Consumes: `Codex.boot`, `pageHead`, `table`
- Produces: nothing new

- [ ] **Step 1: Generate `content/timeline.yml` from `js/timeline-data.js`** (same programmatic approach as Task 7: eval the file, `yaml.dump({months, era_baselines, eras})`), then prepend the `head` block and the campaign-present callout.

Assert: 13 eras, 96 events, 14 baselines, 12 month names.

- [ ] **Step 2: Add the `timeline` schema** — per event: `year` (number), `month` (number), `day` (number), `kind` (enum `main|pre`), `title`, `desc` all required; per era: `id`, `name`, `span`, `chapter` (enum `history|modern`), `events`; `note` optional.

- [ ] **Step 3: Strip `timeline.html` to a shell**, keeping the filter bar controls, `#result-count`, `#era-jump`, `#era-baselines`, `#timeline-eras`.

- [ ] **Step 4: Port `js/timeline.js` into `js/page-timeline.js`** — same rendering, filtering, era-hiding, and jump chips; read `months` and `era_baselines` from content instead of the JS globals.

- [ ] **Step 5: Verify**

Run: `node render_snapshot.mjs timeline.html > after.txt && diff baseline/timeline.txt after.txt`
Expected: no output.

Then exercise: assert 13 era sections and 96 `li` events; click `[data-kind="main"]` → count text reads "Showing 48 of 96 events"; then `[data-chapter="history"]` → "Showing 19 of 96 events" with 6 eras visible; search "stratholme" → 1 result, only the `third-war` era visible. (These are the figures verified when the page was built.)

- [ ] **Step 6: Delete the superseded files and commit**

```bash
git rm js/timeline-data.js js/timeline.js
git add content/timeline.yml js/page-timeline.js js/schemas.js timeline.html
git commit -m "Move timeline content into content/timeline.yml"
```

---

### Task 9: Validation report page and editing guide

**Files:**
- Create: `check.html`, `docs/editing.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: `Codex.load`, `Codex.validate`, `globalThis.SCHEMAS`
- Produces: nothing

- [ ] **Step 1: Implement `check.html`**

Loads all 8 content files, runs each through its schema, prints one report: per file a green "clean" line with entry counts, or a red list of problems. Include a total line ("8 files, 0 problems") so a glance is enough. Reuse `css/style.css`; no new CSS.

- [ ] **Step 2: Verify it reports clean, then verify it catches a real error**

Run: open `check.html` in the harness.
Expected: "8 files · 0 problems".
Then break one field (change a `severity` to `lethal`), reload.
Expected: report names `biomes.yml`, the zone, and the allowed values. Restore.

- [ ] **Step 3: Write `docs/editing.md`**

Cover, with a worked example each: adding a festival, adding a zone, adding a timeline event, changing a DC, rewording prose (and which markdown works: `**bold**`, `_italic_`, `` `code` ``, `[link](page.html)`); the YAML gotchas that actually bite (indentation must be spaces; a value containing `:` or `#` needs quoting; `>` for multi-line prose); how to preview (`python3 -m http.server 8000`); how to check (`check.html`); how to publish (commit and push); and what to do when a page shows the red banner.

- [ ] **Step 4: Update `README.md`**

Replace the "Updating the zone data" section with a pointer to `docs/editing.md` and `content/`. State that local preview now requires a server (double-clicking `index.html` no longer works). Update the structure listing and the pages table. Remove the `tools/parse_biomes.py` reference.

- [ ] **Step 5: Commit**

```bash
git add check.html docs/editing.md README.md
git commit -m "Add content validation report and editing guide"
```

---

### Task 10: Whole-site verification

**Files:** none created; fixes applied where the checks fail.

- [ ] **Step 1: Re-run every render diff**

Run: `node render_snapshot.mjs --all --out after && diff -r baseline after`
Expected: no differences across all 7 pages.

- [ ] **Step 2: Structural sweep**

Run the HTML balance + link checker used earlier in this project (tag balance per page, no broken `*.html` links, no broken in-page `#anchor` links, every `getElementById` in each page script exists in that page's shell).
Expected: all pages OK, no broken links.

- [ ] **Step 3: Confirm no stale references**

Run: `grep -rn "zones-data\|timeline-data\|js/biomes.js\|js/timeline.js\|parse_biomes" --include="*.html" --include="*.md" --include="*.js" .`
Expected: no matches outside `docs/superpowers/`.

- [ ] **Step 4: Confirm the test suite passes**

Run: `node --test tests/`
Expected: PASS.

- [ ] **Step 5: Commit any fixes and push the branch**

```bash
git push -u origin editable-content
```

Leave the branch unmerged for the owner's review.

---

## Self-Review

**Spec coverage:** `content/` layout (Tasks 2–8, `site.yml` in 1) · `js/codex.js` units incl. `rich()` (1) · rendering flow and `document.title` (1, `boot`) · preserved interactions (7, 8) · failure table (1 implements, 2 and 9 verify) · `check.html` (9) · migration order (2–8, as specced) · render-diff verification (1 captures baseline, every page task diffs, 10 re-runs) · `docs/editing.md` + README (9) · retiring `tools/parse_biomes.py` (7).

**Placeholder scan:** No TBD/TODO. Each page task names the source of its content (the current HTML file, or programmatic conversion from the named JS file) and its verification command.

**Type consistency:** `Codex` export list in Task 1 includes `pageHead`, `steps`, and `checklist`, which Tasks 2, 3 and 5 add — each addition is noted in the task that makes it. Field renames from the old JS data are stated once and used consistently: `baselineDC` → `dc`, `subfeatures[].desc` → `.text`, `callouts[].kind` lowercased. `MOON_GLYPHS` keys match the `glyph` enum in the calendar schema.
