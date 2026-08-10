/* Historical Timeline — era rendering, search, and event-type filtering. */
(function () {
  "use strict";

  const wrap = document.getElementById("timeline-eras");
  const searchInput = document.getElementById("event-search");
  const chapterChips = document.querySelectorAll("#chapter-chips .chip");
  const kindChips = document.querySelectorAll("#kind-chips .chip");
  const resultCount = document.getElementById("result-count");
  const jumpNav = document.getElementById("era-jump");
  const baselineBody = document.getElementById("era-baselines");

  const state = { chapter: "all", kinds: new Set(), query: "" };

  const KIND_LABEL = { main: "Main event", pre: "Pre-event" };

  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const monthName = (m) => MONTH_NAMES[m - 1];
  const dateLabel = (e) => `${monthName(e.month)} ${e.day}`;

  /* ---------- Render ---------- */

  const nodes = []; // { el, era, event, haystack }
  const eraSections = [];

  ERAS.forEach((era) => {
    const section = document.createElement("section");
    section.className = "era";
    section.id = era.id;
    section.setAttribute("aria-labelledby", `${era.id}-title`);

    const total = era.events.length;
    const mains = era.events.filter((e) => e.kind === "main").length;
    section.innerHTML = `
      <header>
        <h2 id="${era.id}-title">${esc(era.name)}</h2>
        <span class="era-span">${esc(era.span)}</span>
      </header>
      <p class="section-note">${era.note ? esc(era.note) + " · " : ""}${total} recorded events — ${mains} main, ${total - mains} pre-event.</p>
      <ol class="timeline"></ol>`;

    const list = section.querySelector(".timeline");
    era.events.forEach((event) => {
      const li = document.createElement("li");
      li.className = event.kind;
      li.innerHTML = `
        <div class="tl-when">
          <span class="tl-year">${event.year} ADP</span>
          <span class="tl-date">${esc(dateLabel(event))}</span>
        </div>
        <div class="tl-body">
          <span class="tl-kind">${KIND_LABEL[event.kind]}</span>
          <h3>${esc(event.title)}</h3>
          <p>${esc(event.desc)}</p>
        </div>`;
      list.appendChild(li);
      nodes.push({
        el: li,
        era: era,
        event: event,
        haystack: [
          event.title,
          event.desc,
          era.name,
          `${event.year} adp`,
          dateLabel(event),
        ]
          .join(" ")
          .toLowerCase(),
      });
    });

    wrap.appendChild(section);
    eraSections.push(section);
  });

  /* ---------- Era jump links ---------- */

  ERAS.forEach((era) => {
    const a = document.createElement("a");
    a.className = "chip";
    a.href = `#${era.id}`;
    a.textContent = `${era.name} · ${era.span}`;
    jumpNav.appendChild(a);
  });

  /* ---------- Era start dates ---------- */

  baselineBody.innerHTML = ERA_BASELINES.map(
    (b) => `<tr>
      <td class="era-name">${esc(b.name)}</td>
      <td class="era-year">${b.year} ADP</td>
      <td class="era-date">${esc(monthName(b.month))} ${b.day} <span style="color:var(--ink-dim)">(month ${b.month})</span></td>
    </tr>`
  ).join("");

  /* ---------- Filtering ---------- */

  function applyFilters() {
    let shown = 0;
    const perEra = new Map();
    nodes.forEach((n) => {
      const matchChapter = state.chapter === "all" || n.era.chapter === state.chapter;
      const matchKind = state.kinds.size === 0 || state.kinds.has(n.event.kind);
      const matchQuery = !state.query || n.haystack.includes(state.query);
      const show = matchChapter && matchKind && matchQuery;
      n.el.style.display = show ? "" : "none";
      if (show) {
        shown++;
        perEra.set(n.era.id, (perEra.get(n.era.id) || 0) + 1);
      }
    });

    eraSections.forEach((section) => {
      section.style.display = perEra.get(section.id) ? "" : "none";
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

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  applyFilters();
})();
