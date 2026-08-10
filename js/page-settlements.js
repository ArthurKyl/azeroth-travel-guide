/* Settlement Downtime — renders content/settlements.yml */
Codex.boot("settlements", (d) => {
  const { el, md, rich, badge, badgeList, card, defRows, tierTable, pageHead, sectionHead, fail } = Codex;

  const missing = d.locations
    .filter((l) => !l.options && !l.tiers)
    .map((l) => `settlements.yml → ${l.name}: needs either 'options' or 'tiers'`);
  if (missing.length) return fail(missing);

  pageHead(d.head);

  // Downtime rule cards
  const rules = document.getElementById("rules");
  sectionHead(rules, d.rules.heading, null, "rules-title");
  rules.appendChild(
    el(
      "div",
      { class: "primer-grid" },
      d.rules.cards.map((c) => {
        const parts = [el("h3", { html: md(c.heading) })];
        if (c.text) parts.push(...Array.from(el("div", { html: rich(c.text) }).childNodes));
        if (c.def_rows) parts.push(defRows(c.def_rows));
        return card(parts);
      })
    )
  );

  // The six locations
  const grid = document.getElementById("grid");
  sectionHead(grid, d.grid.heading, d.grid.note, "grid-title");
  grid.appendChild(
    el(
      "div",
      { class: "settlement-grid" },
      d.locations.map((loc) => {
        const parts = [
          el("header", null, [
            el("span", { class: "loc-dot", "aria-hidden": "true" }),
            el("h3", { html: md(loc.name) }),
          ]),
          el("p", { class: "tagline", html: md(loc.tagline) }),
        ];

        if (loc.mechanic_line) {
          parts.push(el("p", { class: "mechanic-line", html: md(loc.mechanic_line) }));
        }
        if (loc.tiers) parts.push(tierTable(loc.tiers));
        if (loc.options) {
          for (const opt of loc.options) {
            const check = opt.check.skills
              ? badgeList(opt.check.skills, "skill")
              : [badge(opt.check.note)];
            const title = el("h4", { class: "option-title", html: md(opt.title) + " " });
            title.appendChild(el("span", { class: "cost", html: md(opt.cost) }));
            parts.push(
              el("div", { class: "option" }, [
                title,
                el("p", { class: "check" }, check),
                el("p", { class: "outcome" }, [
                  el("span", { class: "label-" + opt.outcome.result, html: md(opt.outcome.label) }),
                  " ",
                  el("span", { html: md(opt.outcome.text) }),
                ]),
              ])
            );
          }
        }
        if (loc.stack_note) {
          parts.push(el("p", { class: "stack-note", html: md(loc.stack_note) }));
        }

        return el(
          "article",
          { class: "settlement card", id: loc.id, style: `--accent:${loc.accent}` },
          parts
        );
      })
    )
  );
});
