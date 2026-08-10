// Tests for the pure functions in js/codex.js — no DOM, no dependencies.
// Run: node --test tests/
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

test("md leaves underscores inside words alone", () => {
  assert.equal(md("Kosh'harg and snake_case_word"), "Kosh'harg and snake_case_word");
});

test("md handles empty and missing input", () => {
  assert.equal(md(null), "");
  assert.equal(md(""), "");
});

test("rich splits paragraphs and bullet lists", () => {
  assert.equal(rich("one\n\ntwo"), "<p>one</p><p>two</p>");
  assert.equal(rich("lead\n\n- a\n- b"), "<p>lead</p><ul><li>a</li><li>b</li></ul>");
});

test("rich collapses soft-wrapped lines into one paragraph", () => {
  assert.equal(rich("one\ntwo"), "<p>one two</p>");
});

test("validate reports missing required fields with a path", () => {
  const schema = {
    type: "list",
    item: { fields: { name: { required: true }, impact: { required: true } } },
  };
  assert.deepEqual(validate([{ name: "Brewfest" }], schema, "holidays.yml"), [
    "holidays.yml → entry 1 (Brewfest): missing required field 'impact'",
  ]);
});

test("validate reports unknown fields and bad enums", () => {
  const schema = { type: "list", item: { fields: { severity: { enum: ["mild", "harsh"] } } } };
  assert.deepEqual(validate([{ severity: "lethal" }], schema, "biomes.yml"), [
    "biomes.yml → entry 1: 'severity' must be one of mild, harsh (got 'lethal')",
  ]);
  assert.deepEqual(validate([{ sevrity: "mild" }], schema, "biomes.yml"), [
    "biomes.yml → entry 1: unknown field 'sevrity' (did you mean 'severity'?)",
  ]);
});

test("validate checks numbers and nested lists", () => {
  const schema = {
    type: "map",
    fields: {
      eras: {
        type: "list",
        required: true,
        item: {
          fields: {
            name: { required: true },
            events: { type: "list", item: { fields: { year: { type: "number", required: true } } } },
          },
        },
      },
    },
  };
  const problems = validate({ eras: [{ name: "First War", events: [{ year: "nope" }] }] }, schema, "timeline.yml");
  assert.deepEqual(problems, [
    "timeline.yml → eras entry 1 (First War) → events entry 1: 'year' must be a number (got 'nope')",
  ]);
});

test("validate accepts valid data", () => {
  const schema = { type: "list", item: { fields: { name: { required: true } } } };
  assert.deepEqual(validate([{ name: "ok" }], schema, "x.yml"), []);
});
