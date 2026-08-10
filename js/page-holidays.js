/* Festivals & Holidays — renders content/holidays.yml */
Codex.boot("holidays", (d) => {
  const { el, md, rich, badge, table, pageHead, sectionHead } = Codex;

  pageHead(d.head);

  // Year overview — rows derived from the same festival list as the cards below.
  const yearSection = document.getElementById("year-table");
  sectionHead(yearSection, d.year_table.heading, d.year_table.note, "year-title");
  yearSection.appendChild(
    table({
      columns: ["Month", "Celebration", "Days", "Duration"],
      rows: d.festivals.map((f) => ({
        key: true,
        cells: [
          f.month,
          { html: `<a href="#${f.id}">${md(f.name)}</a>` },
          f.days,
          f.duration,
        ],
      })),
    })
  );

  // Detail cards
  const detail = document.getElementById("detail");
  sectionHead(detail, d.detail.heading, null, "detail-title");
  detail.appendChild(
    el(
      "div",
      { class: "holiday-grid" },
      d.festivals.map((f) =>
        el("article", { class: "card holiday", id: f.id }, [
          el("h3", { html: md(f.name) }),
          el("p", {
            class: "when",
            html: `${md(f.when)} <span class="dur">${md(f.duration)}</span>`,
          }),
          el("div", { class: "who" }, f.factions.map((name) => badge(name))),
          el("p", { class: "impact", html: rich(f.impact).replace(/^<p>|<\/p>$/g, "") }),
        ])
      )
    )
  );
});
