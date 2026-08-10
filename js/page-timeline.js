/* Historical Timeline — renders content/timeline.yml, plus era rendering,
   search, and event-type filtering. */
Codex.boot("timeline", (d) => {
  const { el, md, callout, table, pageHead, sectionHead } = Codex;

  const KIND_LABEL = { main: "Main event", pre: "Pre-event" };
  const monthName = (m) => d.months[m - 1];
  const dateLabel = (e) => `${monthName(e.month)} ${e.day}`;

  pageHead(d.head);
  document.querySelector("header.page-head").after(callout(d.campaign_note));

  /* ---------- era start dates ---------- */

  const baselines = document.getElementById("baselines");
  sectionHead(baselines, d.baselines.heading, d.baselines.note, "baselines-title");
  baselines.appendChild(
    table({
      cls: "era-start-table",
      columns: d.baselines.columns,
      rows: d.era_baselines.map((b) => [
        { text: b.name, class: "era-name" },
        { text: b.year + " ADP", class: "era-year" },
        {
          class: "era-date",
          html: `${md(monthName(b.month))} ${b.day} <span style="color:var(--ink-dim)">(month ${b.month})</span>`,
        },
      ]),
    })
  );

  /* ---------- chronology ---------- */

  const section = document.getElementById("chronology");
  sectionHead(section, d.chronology.heading, d.chronology.note, "events-title");

  const search = el("input", {
    type: "search",
    id: "event-search",
    placeholder: "Search events, people, places…",
    "aria-label": "Search timeline events",
  });
  const chapterChips = [
    el("button", { class: "chip", "data-chapter": "all", "aria-pressed": "true", text: "All" }),
    el("button", { class: "chip", "data-chapter": "history", "aria-pressed": "false", text: "0 – 26 ADP" }),
    el("button", { class: "chip", "data-chapter": "modern", "aria-pressed": "false", text: "27 ADP onward" }),
  ];
  const kindChips = [
    el("button", { class: "chip", "data-kind": "main", "aria-pressed": "false", text: "Main events" }),
    el("button", { class: "chip", "data-kind": "pre", "aria-pressed": "false", text: "Pre-events" }),
  ];

  section.appendChild(
    el("div", { class: "filter-bar", role: "search" }, [
      search,
      el("div", { class: "chip-row", id: "chapter-chips", role: "group", "aria-label": "Filter by period" }, chapterChips),
      el("div", { class: "chip-row", id: "kind-chips", role: "group", "aria-label": "Filter by event type" }, kindChips),
    ])
  );

  const resultCount = el("p", { class: "result-count", id: "result-count", "aria-live": "polite" });
  section.appendChild(resultCount);

  const jump = el("nav", { class: "chip-row", id: "era-jump", "aria-label": "Jump to era" });
  d.eras.forEach((era) =>
    jump.appendChild(el("a", { class: "chip", href: "#" + era.id, text: `${era.name} · ${era.span}` }))
  );
  section.appendChild(jump);

  const wrap = el("div", { id: "timeline-eras" });
  section.appendChild(wrap);

  const nodes = [];
  const eraSections = [];

  d.eras.forEach((era) => {
    const total = era.events.length;
    const mains = era.events.filter((e) => e.kind === "main").length;

    const list = el("ol", { class: "timeline" });
    era.events.forEach((event) => {
      const li = el("li", { class: event.kind }, [
        el("div", { class: "tl-when" }, [
          el("span", { class: "tl-year", text: event.year + " ADP" }),
          el("span", { class: "tl-date", text: dateLabel(event) }),
        ]),
        el("div", { class: "tl-body" }, [
          el("span", { class: "tl-kind", text: KIND_LABEL[event.kind] }),
          el("h3", { html: md(event.title) }),
          el("p", { html: md(event.desc) }),
        ]),
      ]);
      list.appendChild(li);
      nodes.push({
        el: li,
        era: era,
        event: event,
        haystack: [event.title, event.desc, era.name, `${event.year} adp`, dateLabel(event)]
          .join(" ")
          .toLowerCase(),
      });
    });

    const section = el("section", { class: "era", id: era.id, "aria-labelledby": era.id + "-title" }, [
      el("header", null, [
        el("h2", { id: era.id + "-title", html: md(era.name) }),
        el("span", { class: "era-span", html: md(era.span) }),
      ]),
      el("p", {
        class: "section-note",
        html:
          (era.note ? md(era.note) + " · " : "") +
          `${total} recorded events — ${mains} main, ${total - mains} pre-event.`,
      }),
      list,
    ]);
    wrap.appendChild(section);
    eraSections.push(section);
  });

  /* ---------- filtering ---------- */

  const state = { chapter: "all", kinds: new Set(), query: "" };

  function applyFilters() {
    let shown = 0;
    const perEra = new Map();
    nodes.forEach((n) => {
      const show =
        (state.chapter === "all" || n.era.chapter === state.chapter) &&
        (state.kinds.size === 0 || state.kinds.has(n.event.kind)) &&
        (!state.query || n.haystack.includes(state.query));
      n.el.style.display = show ? "" : "none";
      if (show) {
        shown++;
        perEra.set(n.era.id, (perEra.get(n.era.id) || 0) + 1);
      }
    });
    eraSections.forEach((s) => {
      s.style.display = perEra.get(s.id) ? "" : "none";
    });
    const parts = [`Showing ${shown} of ${nodes.length} events`];
    if (state.kinds.size) parts.push([...state.kinds].map((k) => KIND_LABEL[k] + "s").join(", "));
    resultCount.textContent = parts.join(" — ");
  }

  chapterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chapterChips.forEach((c) => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", "true");
      state.chapter = chip.dataset.chapter;
      applyFilters();
    });
  });

  kindChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const kind = chip.dataset.kind;
      if (state.kinds.has(kind)) {
        state.kinds.delete(kind);
        chip.setAttribute("aria-pressed", "false");
      } else {
        state.kinds.add(kind);
        chip.setAttribute("aria-pressed", "true");
      }
      applyFilters();
    });
  });

  search.addEventListener("input", () => {
    state.query = search.value.trim().toLowerCase();
    applyFilters();
  });

  applyFilters();
});
