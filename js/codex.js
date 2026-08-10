/* ============================================================
   The Wayfarer's Codex — shared content runtime.

   Loads content/<page>.yml, validates it against js/schemas.js, and
   provides the DOM builders the page renderers use. Defines no globals
   beyond `Codex` and touches no DOM at load time, so the pure functions
   (md, rich, validate) can be unit-tested under node.

   Editing content? See docs/editing.md — you never need to touch this file.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- text ---------- */

  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  // Inline markdown. Escapes first, then substitutes, so content can never
  // inject markup — only the four constructs below produce tags.
  function md(text) {
    if (text == null) return "";
    let s = esc(text);
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    // Label colours: ++good++ (green), --bad-- (red), !!notable!! (amber)
    s = s.replace(/\+\+([^+]+)\+\+/g, '<span class="label-success">$1</span>');
    s = s.replace(/--([^-]+)--/g, '<span class="label-failure">$1</span>');
    s = s.replace(/!!([^!]+)!!/g, '<span class="label-nat">$1</span>');
    // _italic_ only at word boundaries, so snake_case_words survive intact
    s = s.replace(/(^|[^\w])_([^_\n]+)_(?=$|[^\w])/g, "$1<em>$2</em>");
    return s;
  }

  // Block-level: blank lines separate paragraphs, a block of "- " lines
  // becomes a list. Each line goes through md().
  function rich(text) {
    if (text == null) return "";
    return String(text)
      .trim()
      .split(/\n\s*\n/)
      .map((block) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        if (!lines.length) return "";
        if (lines.every((l) => l.startsWith("- "))) {
          return "<ul>" + lines.map((l) => `<li>${md(l.slice(2))}</li>`).join("") + "</ul>";
        }
        return `<p>${md(lines.join(" "))}</p>`;
      })
      .join("");
  }

  /* ---------- validation ---------- */

  function distance(a, b) {
    const m = a.length, n = b.length;
    if (!m || !n) return Math.max(m, n);
    let prev = Array.from({ length: n + 1 }, (_, i) => i);
    for (let i = 1; i <= m; i++) {
      const row = [i];
      for (let j = 1; j <= n; j++) {
        row[j] = Math.min(
          prev[j] + 1,
          row[j - 1] + 1,
          prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
      prev = row;
    }
    return prev[n];
  }

  function closest(name, candidates) {
    let best = null, bestScore = Infinity;
    for (const c of candidates) {
      const d = distance(name.toLowerCase(), c.toLowerCase());
      if (d < bestScore) { bestScore = d; best = c; }
    }
    return bestScore <= 3 ? best : null;
  }

  const entryLabel = (value, index) => {
    const name = value && (value.name || value.title);
    return name ? `entry ${index + 1} (${name})` : `entry ${index + 1}`;
  };

  function walkMap(obj, schema, file, pathLabel, problems) {
    const at = `${file}${pathLabel ? " → " + pathLabel : ""}`;
    if (obj == null || typeof obj !== "object" || Array.isArray(obj)) {
      problems.push(`${at}: expected a block of fields`);
      return;
    }
    const fields = schema.fields || {};
    const names = Object.keys(fields);
    const prefix = pathLabel ? pathLabel + " → " : "";

    for (const [name, spec] of Object.entries(fields)) {
      const value = obj[name];
      if (value == null || value === "") {
        if (spec.required) problems.push(`${at}: missing required field '${name}'`);
        continue;
      }
      if (spec.enum && !spec.enum.includes(value)) {
        problems.push(`${at}: '${name}' must be one of ${spec.enum.join(", ")} (got '${value}')`);
        continue;
      }
      const type = spec.type || "string";
      if (type === "number" && typeof value !== "number") {
        problems.push(`${at}: '${name}' must be a number (got '${value}')`);
      } else if (type === "list") {
        if (!Array.isArray(value)) {
          problems.push(`${at}: '${name}' must be a list`);
        } else if (spec.item) {
          value.forEach((item, i) =>
            walkMap(item, spec.item, file, `${prefix}${name} ${entryLabel(item, i)}`, problems)
          );
        }
      } else if (type === "map") {
        walkMap(value, spec, file, `${prefix}${name}`, problems);
      }
    }

    if (names.length) {
      for (const key of Object.keys(obj)) {
        if (fields[key]) continue;
        const near = closest(key, names);
        problems.push(`${at}: unknown field '${key}'` + (near ? ` (did you mean '${near}'?)` : ""));
      }
    }
  }

  function validate(data, schema, file) {
    const problems = [];
    if (!schema) return [`${file}: no schema defined for this file`];
    if (data == null) return [`${file}: file is empty`];
    if ((schema.type || "map") === "list") {
      if (!Array.isArray(data)) return [`${file}: expected a list of entries`];
      data.forEach((item, i) => {
        if (schema.item) walkMap(item, schema.item, file, entryLabel(item, i), problems);
      });
    } else {
      walkMap(data, schema, file, "", problems);
    }
    return problems;
  }

  /* ---------- DOM builders ---------- */

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        if (value == null) continue;
        if (key === "class") node.className = value;
        else if (key === "text") node.textContent = value;
        else if (key === "html") node.innerHTML = value; // md()/rich() output only
        else node.setAttribute(key, value);
      }
    }
    for (const child of [].concat(children == null ? [] : children)) {
      if (child == null) continue;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    }
    return node;
  }

  const badge = (text, kind) =>
    el("span", { class: "badge" + (kind ? " " + kind : ""), html: md(text) });

  // Skill badges joined by the word "or", as the hand-written pages did.
  function badgeList(items, kind) {
    const out = [];
    items.forEach((item, i) => {
      if (i) out.push(" or ");
      out.push(badge(item, kind));
    });
    return out;
  }

  const card = (children, cls) => el("div", { class: "card" + (cls ? " " + cls : "") }, children);

  function callout(spec) {
    const kids = [el("h4", { html: md(spec.title) })];
    if (spec.text) {
      // rich() may yield several blocks; move them out of the holder.
      const holder = el("div", { html: rich(spec.text) });
      kids.push(...Array.from(holder.childNodes));
    }
    if (spec.items && spec.items.length) {
      kids.push(el("ul", null, spec.items.map((i) => el("li", { html: md(i) }))));
    }
    return el("div", { class: "callout " + (spec.kind || "info") }, kids);
  }

  function cell(value, extraClass) {
    if (value && typeof value === "object") {
      const cls = [extraClass, value.class].filter(Boolean).join(" ");
      return el("td", { class: cls || null, html: value.html != null ? value.html : md(value.text) });
    }
    return el("td", { class: extraClass || null, html: md(value) });
  }

  function table(spec) {
    const head = el("tr", null, spec.columns.map((c) => el("th", { scope: "col", html: md(c) })));
    const rows = spec.rows.map((row) => {
      const cells = Array.isArray(row) ? row : row.cells;
      const keyFirst = !Array.isArray(row) && row.key;
      return el("tr", null, cells.map((c, i) => cell(c, keyFirst && i === 0 ? "key" : null)));
    });
    return el("div", { class: "table-scroll" }, [
      el("table", { class: "codex" + (spec.cls ? " " + spec.cls : "") }, [
        el("thead", null, head),
        el("tbody", null, rows),
      ]),
    ]);
  }

  const defRows = (rows) =>
    el(
      "div",
      { class: "def-rows" },
      rows.map((r) =>
        el("div", { class: "def-row " + (r.tone || "neutral") }, [
          el("span", { class: "def-key", html: md(r.key) }),
          el("span", { html: md(r.text) }),
        ])
      )
    );

  const tierTable = (tiers) =>
    el(
      "table",
      { class: "tier-table" },
      el(
        "tbody",
        null,
        tiers.map((t) =>
          el("tr", { class: "t-" + t.tier }, [
            el("td", { class: "range", html: md(String(t.range)) }),
            el("td", { html: md(t.text) }),
          ])
        )
      )
    );

  const steps = (items) =>
    el(
      "ol",
      { class: "steps" },
      items.map((s) =>
        el("li", null, [
          el("div", null, [
            el("strong", { class: "step-name", html: md(s.name) }),
            el("p", { html: md(s.text) }),
          ]),
        ])
      )
    );

  function checklist(items) {
    return el(
      "ul",
      { class: "checklist" },
      items.map((item, i) => {
        const id = "check-" + (item.id || i + 1);
        return el("li", null, [
          el("input", { type: "checkbox", id: id, "aria-labelledby": id + "-label" }),
          el("span", { id: id + "-label", html: md(item.text) }),
        ]);
      })
    );
  }

  // The page header: kicker, <h1>, summary, meta-stats row.
  function pageHead(head) {
    const host = document.querySelector("header.page-head");
    if (!host) return;
    host.replaceChildren(
      el("p", { class: "kicker", html: md(head.kicker) }),
      el("h1", { html: md(head.title) }),
      el("p", { class: "summary", html: md(head.summary) })
    );
    if (head.stats && head.stats.length) {
      host.appendChild(
        el(
          "div",
          { class: "meta-stats" },
          head.stats.map((s) =>
            el("span", null, [el("strong", { html: md(String(s.value)) }), " " + s.label])
          )
        )
      );
    }
  }

  // A <h2> + optional note, for a section that owns a heading.
  function sectionHead(host, heading, note, id) {
    if (heading) host.appendChild(el("h2", { id: id || null, html: md(heading) }));
    if (note) host.appendChild(el("p", { class: "section-note", html: md(note) }));
  }

  /* ---------- chrome ---------- */

  function currentPage() {
    const file = String(location.pathname).split("/").pop();
    return file && file !== "" ? file : "index.html";
  }

  function renderChrome(site) {
    const here = currentPage();
    const sidebar = document.querySelector("aside.sidebar");
    if (sidebar) {
      const brand = el("a", { class: "brand", href: "index.html" }, [
        el("span", {
          class: "brand-name",
          html: md(site.brand.name).replace(/\n/g, "<br>"),
        }),
        el("span", { class: "brand-sub", html: md(site.brand.sub) }),
      ]);
      const nav = el("nav", { "aria-label": "Main" });
      for (const group of site.nav) {
        nav.appendChild(el("span", { class: "nav-label", html: md(group.label) }));
        for (const link of group.links) {
          nav.appendChild(
            el("a", {
              href: link.href,
              html: md(link.text),
              "aria-current": link.href === here ? "page" : null,
            })
          );
        }
      }
      const foot = el("div", { class: "sidebar-foot" }, [
        badge(site.footer.tag),
        el("br"),
        site.footer.note,
      ]);
      foot.firstChild.className = "tag";
      sidebar.replaceChildren(brand, nav, foot);
    }
    const footer = document.querySelector("footer.site-footer");
    if (footer) footer.replaceChildren(document.createTextNode(site.footer.legal.trim()));
  }

  /* ---------- loading ---------- */

  async function load(name) {
    const url = `content/${name}.yml`;
    let res;
    try {
      res = await fetch(url);
    } catch (e) {
      throw new Error(
        `${url} could not be loaded (${e.message}). ` +
          `If you opened the page as a file, serve it instead: python3 -m http.server 8000`
      );
    }
    if (!res.ok) throw new Error(`${url} could not be loaded (HTTP ${res.status})`);
    const text = await res.text();
    try {
      return jsyaml.load(text);
    } catch (e) {
      const line = e.mark && typeof e.mark.line === "number" ? ` line ${e.mark.line + 1}` : "";
      throw new Error(`${url}${line}: ${e.reason || e.message}`);
    }
  }

  // Never leave a blank page: say which file, which entry, which field.
  function fail(problems) {
    const main = document.querySelector("main.content") || document.body;
    const box = el("div", { class: "callout danger" }, [
      el("h4", { text: "Content problem" }),
      el("p", {
        text:
          `${problems.length} problem${problems.length === 1 ? "" : "s"} found — ` +
          `this page stopped rendering rather than show half of itself.`,
      }),
      el("ul", null, problems.map((p) => el("li", { text: p }))),
      el("p", { html: 'Fix the file and reload. <a href="check.html">check.html</a> lists every content file at once.' }),
    ]);
    main.insertBefore(box, main.firstChild);
    problems.forEach((p) => console.error("[content]", p));
  }

  function boot(name, render) {
    const start = async () => {
      let site = null;
      try {
        site = await load("site");
        const siteProblems = validate(site, globalThis.SCHEMAS && SCHEMAS.site, "site.yml");
        if (siteProblems.length) return fail(siteProblems);
        renderChrome(site);
      } catch (e) {
        console.error(e);
        return fail([e.message]);
      }
      try {
        const data = await load(name);
        const problems = validate(data, globalThis.SCHEMAS && SCHEMAS[name], `${name}.yml`);
        if (problems.length) return fail(problems);
        render(data, site);
        if (data.head && data.head.title) {
          document.title = `${data.head.title} — The Wayfarer's Codex`;
        }
      } catch (e) {
        console.error(e);
        fail([e.message]);
      }
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start);
    } else {
      start();
    }
  }

  globalThis.Codex = {
    esc, md, rich, validate,
    el, badge, badgeList, card, callout, table, defRows, tierTable, steps, checklist,
    pageHead, sectionHead, renderChrome, load, fail, boot,
  };
})();
