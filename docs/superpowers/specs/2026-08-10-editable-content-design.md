# Editable content layer — design

**Date:** 2026-08-10
**Status:** approved
**Branch:** `editable-content`

## Problem

Every page's content is baked into hand-written HTML. The owner wants to reword, renumber and
reorder anything on the site — travel rules, activities, settlement downtime, biomes, festivals,
the historical timeline — without editing markup. The site is shared with a group who may propose
changes verbally; only the owner edits. No contributor flow, auth, or CMS is needed.

Today only two pages are data-driven (`js/zones-data.js`, `js/timeline-data.js`) and both are JS
object literals. The other five pages hold their content inline in HTML.

## Decisions

Settled with the owner before design:

1. **No build step.** Pages fetch and render content at load time. Editing is: change a file,
   commit, push.
2. **YAML content files.** Least punctuation of the candidates; a vendored parser is acceptable.
3. **Every word editable, page layout fixed.** Each YAML file mirrors what its page shows. Adding a
   new *kind* of section still requires a code change; that is rare enough to accept.

## Architecture

```
content/                  the only files the owner edits
  site.yml                brand, sidebar nav, footer — shared by every page
  travel-rules.yml        intro, phase loop, pace rows, hazard callouts, GM checklist, gateways
  activities.yml          8 activities: goal, checks, mechanics, roll tiers
  settlements.yml         downtime rules + 6 locations with their options
  biomes.yml              61 zones (migrated from js/zones-data.js)
  holidays.yml            13 festivals
  timeline.yml            13 eras + 96 events + era start dates + month names
  calendar.yml            months, weekdays, both moons, syzygy, module reference

vendor/js-yaml.min.js     YAML parser, 4.1.0, MIT, committed (no CDN)
vendor/js-yaml.LICENSE

js/codex.js               shared runtime (see below)
js/page-<name>.js         one renderer per page
check.html                validation report across all content files
docs/editing.md           how to edit, field reference, preview, publish
```

Each `*.html` file keeps its `<head>`, a `<div class="app">` skeleton, and empty mount points. All
prose, numbers, table rows and records live in `content/`. Page kicker, `<h1>`, summary and the
`meta-stats` row are content, not markup.

### js/codex.js — shared runtime

One file, five responsibilities, each independently testable:

| Unit | Does | Depends on |
| --- | --- | --- |
| `loadContent(name)` | fetch `content/<name>.yml`, parse via `jsyaml.load`, reject with file+line on failure | `jsyaml` |
| `md(text)` | inline markdown — `**bold**`, `_italic_`, `` `code` ``, `[label](href)` — HTML-escaped first | — |
| `rich(text)` | block level: blank lines split paragraphs, `- ` lines become a `<ul>`; each line through `md` | `md` |
| builders | `el`, `card`, `callout`, `badge`, `table`, `defRows` returning DOM nodes with existing classes | `md` |
| `validate(data, schema)` | walk a declarative schema, collect every problem as a path + message | — |
| `fail(problems)` | render the red banner listing file, entry and problem | — |
| `renderChrome(site, current)` | build sidebar brand/nav/footer from `site.yml`, mark current page | `md` |

`md()` escapes before it substitutes, so content can never inject markup. Content is trusted (owner
authored, committed to git), but escaping keeps a stray `<` from silently breaking a page.

Any field holding more than a sentence goes through `rich()`, so a callout can carry paragraphs and
a bullet list — several existing callouts do (the syzygy effects, the GM checklist notes) and an
inline-only renderer would silently flatten them.

### Rendering flow

```
DOMContentLoaded
  → loadContent("site") and loadContent("<page>") in parallel
  → validate both against the page's schema
      → problems? fail(problems) and stop — banner names file, entry, field
  → renderChrome(site) then render<Page>(data)
  → set document.title from content (static <title> stays as pre-JS fallback)
```

Interactive behaviour is preserved and moves to the page renderers: biome continent/severity
filters, search, and the 1d6 weather roller; timeline period/type filters, search, and era jump
chips.

### Failure behaviour

The point of the validation layer is that a casual edit cannot produce a blank page.

| Failure | Result |
| --- | --- |
| File missing / 404 | Banner: "content/holidays.yml could not be loaded (404)" |
| YAML syntax error | Banner with js-yaml's message and line number |
| Missing required field | Banner: "holidays.yml → entry 4 (Brewfest): missing 'impact'" |
| Unknown field | Banner listing it, with the closest valid field name |
| Bad enum value | Banner: "severity must be one of mild, harsh, deadly (got 'lethal')" |

`check.html` runs every content file through the same schemas and prints one combined report, so all
eight files can be confirmed clean in one place before or after a push.

## Migration

Content moves mechanically, page by page, in this order — simplest first so the pattern is proven
before the two big data files:

1. `holidays` — 13 flat records
2. `activities` — repeated cards with tier tables
3. `settlements` — nested options per location
4. `travel-rules` — prose-heaviest page
5. `calendar` — moon phases keyed by glyph name; the 13 inline SVGs become a lookup in the renderer
6. `biomes` — convert `js/zones-data.js` (delete after)
7. `timeline` — convert `js/timeline-data.js` (delete after)

**Verification per page:** a scratchpad jsdom harness renders each page before and after conversion,
extracts normalized visible text, and diffs. A page is done when the diff is empty (or every
difference is intentional and named). This catches silently dropped fields, which is the main risk
of a bulk content move.

## Accepted trade-offs

- **Local preview needs a server.** `file://` cannot fetch; `python3 -m http.server` is required.
  README updated to say so.
- **Content is not in view-source.** Pages are empty shells until JS runs. Acceptable for a private
  group tool; it does mean crawlers and link previews see nothing.
- **First runtime dependency.** js-yaml, 39KB minified, vendored rather than CDN-loaded so the site
  stays self-contained.
- **YAML indentation is the sharp edge.** Mitigated by the error banner and `check.html`, not
  removed.

## Out of scope

Multi-user editing, auth, a CMS, an in-browser editor, PR/proposal flows, and regenerating the site
from the Obsidian notes. `tools/parse_biomes.py` becomes obsolete once `biomes.yml` is the source of
truth and is removed with a note in `docs/editing.md` about where zone data now lives.
