/* Calendar & Moons — renders content/calendar.yml */
Codex.boot("calendar", (d) => {
  const { el, md, card, callout, table, defRows, pageHead, sectionHead } = Codex;

  pageHead(d.head);

  // Epoch
  const epoch = document.getElementById("epoch");
  sectionHead(epoch, d.epoch.heading, d.epoch.note, "epoch-title");
  epoch.appendChild(
    el(
      "div",
      { class: "primer-grid" },
      d.epoch.cards.map((c) =>
        card([el("h3", { html: md(c.heading) }), el("p", { html: md(c.text) })])
      )
    )
  );

  // Months
  const months = document.getElementById("months");
  sectionHead(months, d.months.heading, null, "months-title");
  months.appendChild(
    table({
      cls: "month-table",
      columns: d.months.columns,
      rows: d.months.rows.map((m) => [
        { text: String(m.index), class: "month-idx" },
        { text: m.name, class: "key" },
        { text: String(m.days), class: "days" },
        { text: m.range, class: "range" },
        m.season,
      ]),
    })
  );

  // Week
  const week = document.getElementById("week");
  sectionHead(week, d.week.heading, d.week.note, "week-title");
  week.appendChild(
    table({
      cls: "week-table",
      columns: d.week.columns,
      rows: d.week.rows.map((w) => [
        { text: String(w.index), class: "day-idx" },
        { text: w.name, class: "key" },
        { text: w.assoc, class: "assoc" },
      ]),
    })
  );

  // Moons
  const moons = document.getElementById("moons");
  sectionHead(moons, d.moons.heading, d.moons.note, "moons-title");
  moons.appendChild(
    el(
      "div",
      { class: "moon-grid" },
      d.moons.list.map((moon) => {
        const rows = moon.phases.map((p) => {
          const desc = el("td", null, [
            el("span", { class: "phase-name", html: md(p.name) }),
            el("span", { html: md(p.text) }),
          ]);
          if (p.peak) {
            desc.appendChild(document.createTextNode(" "));
            desc.appendChild(
              el("span", { class: "badge" + (moon.peak_badge ? " " + moon.peak_badge : ""), html: md(p.peak) })
            );
          }
          return el("tr", null, [
            el("td", { class: "glyph", html: moonGlyphSVG(p.glyph, moon.lit) }),
            el("td", { class: "days", html: md(p.days) }),
            desc,
          ]);
        });
        return card(
          [
            el("header", null, [
              el("h3", { html: md(moon.name) }),
              el("span", { class: "period", html: md(moon.cycle) }),
            ]),
            el("p", { class: "tagline", html: md(moon.tagline) }),
            el("table", { class: "phase-table" }, el("tbody", null, rows)),
          ],
          "moon-card" + (moon.blue ? " blue" : "")
        );
      })
    )
  );

  // Syzygy
  const syzygy = document.getElementById("syzygy");
  sectionHead(syzygy, d.syzygy.heading, d.syzygy.note, "syzygy-title");
  syzygy.appendChild(
    el(
      "div",
      { class: "syzygy-row" },
      d.syzygy.days.map((day) =>
        card(
          [
            el("span", { class: "day-num", html: md(day.number) }),
            el("span", { class: "day-where", html: md(day.where) }),
            el("span", { class: "day-note", html: md(day.note) }),
          ],
          "syzygy-day"
        )
      )
    )
  );
  d.syzygy.callouts.forEach((c) => syzygy.appendChild(callout(c)));

  // Module reference
  const mod = document.getElementById("module");
  sectionHead(mod, d.module.heading, d.module.note, "module-title");
  mod.appendChild(
    table({
      columns: d.module.columns,
      rows: d.module.rows.map((r) => [
        { text: r.moon, class: "key" },
        { text: r.cycle, class: "dc-stat" },
        r.lengths,
        r.peak,
        r.anchor,
      ]),
    })
  );

  // At a glance
  const glance = document.getElementById("glance");
  sectionHead(glance, d.at_a_glance.heading, null, "glance-title");
  glance.appendChild(
    el(
      "div",
      { class: "primer-grid" },
      d.at_a_glance.cards.map((c) => {
        const parts = [el("h3", { html: md(c.heading) })];
        if (c.def_rows) parts.push(defRows(c.def_rows));
        if (c.paragraphs) c.paragraphs.forEach((p) => parts.push(el("p", { html: md(p) })));
        return card(parts);
      })
    )
  );
});
