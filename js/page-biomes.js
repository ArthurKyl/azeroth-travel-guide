/* Biome Compendium — renders content/biomes.yml, plus filtering, search,
   and the daily weather roller. */
Codex.boot("biomes", (d) => {
  const { el, md, card, callout, defRows, pageHead, sectionHead } = Codex;

  const SEVERITIES = ["mild", "harsh", "deadly"];
  const SEVERITY_LABEL = { mild: "Mild", harsh: "Harsh", deadly: "Deadly" };
  const zones = d.zones;

  pageHead(d.head);

  /* ---------- primer ---------- */

  const primer = document.getElementById("primer");
  sectionHead(primer, d.primer.heading, null, "primer-title");
  primer.appendChild(
    el(
      "div",
      { class: "primer-grid" },
      d.primer.cards.map((c) => {
        const parts = [el("h3", { html: md(c.heading) })];
        if (c.text) parts.push(el("p", { html: md(c.text) }));
        if (c.def_rows) parts.push(defRows(c.def_rows));
        if (c.ordered) {
          parts.push(el("ol", null, c.ordered.map((i) => el("li", { html: md(i) }))));
        }
        return card(parts);
      })
    )
  );

  /* ---------- filter bar ---------- */

  const section = document.getElementById("zones");
  sectionHead(section, d.zones_section.heading, d.zones_section.note, "zones-title");

  const search = el("input", {
    type: "search",
    id: "zone-search",
    placeholder: "Search zones, features, hazards…",
    "aria-label": "Search zones",
  });

  // Continents come from the data, so a new one needs no code change.
  const continents = [...new Set(zones.map((z) => z.continent))];
  const continentChips = [
    el("button", { class: "chip", "data-continent": "all", "aria-pressed": "true", text: "All" }),
    ...continents.map((c) =>
      el("button", { class: "chip", "data-continent": c, "aria-pressed": "false", text: c })
    ),
  ];
  const severityChips = SEVERITIES.map((s) =>
    el("button", {
      class: "chip " + s,
      "data-severity": s,
      "aria-pressed": "false",
      text: SEVERITY_LABEL[s],
    })
  );

  section.appendChild(
    el("div", { class: "filter-bar", role: "search" }, [
      search,
      el("div", { class: "chip-row", id: "continent-chips", role: "group", "aria-label": "Filter by continent" }, continentChips),
      el("div", { class: "chip-row", id: "severity-chips", role: "group", "aria-label": "Filter by severity" }, severityChips),
    ])
  );

  const resultCount = el("p", { class: "result-count", id: "result-count", "aria-live": "polite" });
  section.appendChild(resultCount);

  /* ---------- zone cards ---------- */

  const parseRange = (roll) => {
    const parts = String(roll).split("–").map((n) => parseInt(n, 10));
    return [parts[0], parts.length > 1 ? parts[1] : parts[0]];
  };

  function zoneCard(zone) {
    const details = el("details", { class: "zone " + zone.severity });

    const weatherRows = zone.weather.map((w) => {
      const [min, max] = parseRange(w.roll);
      return el("tr", { "data-min": min, "data-max": max }, [
        el("td", { html: md(w.roll) }),
        el("td", null, [
          el("span", { class: "w-name", html: md(w.name) }),
          el("br"),
          el("span", { html: md(w.effect) }),
        ]),
        el("td", { class: "w-mod", html: md(w.mod) }),
      ]);
    });

    const body = el("div", { class: "zone-body" }, [
      ...(zone.callouts || []).map(callout),
      el("h4", { text: "Local Sub-Features" }),
      el(
        "ul",
        { class: "subfeatures" },
        zone.subfeatures.map((s) =>
          el("li", null, [
            el("span", { class: "sub-name", html: md(s.name) + ":" }),
            " ",
            el("span", { html: md(s.text) }),
          ])
        )
      ),
      el("h4", { text: "Daily Weather (1d6)" }),
      el("div", { class: "table-scroll" }, [
        el("table", { class: "codex weather-table" }, [
          el(
            "thead",
            null,
            el("tr", null, [
              el("th", { scope: "col", text: "Roll" }),
              el("th", { scope: "col", text: "Condition" }),
              el("th", { scope: "col", text: "DC" }),
            ])
          ),
          el("tbody", null, weatherRows),
        ]),
      ]),
      el("div", { class: "roll-row" }, [
        el("button", { type: "button", class: "btn-wow roll-btn", text: "Roll daily weather" }),
        el("span", { class: "die", "aria-hidden": "true" }),
        el("span", { class: "roll-result", role: "status", "aria-live": "polite" }),
      ]),
    ]);

    details.appendChild(
      el("summary", null, [
        el("div", { class: "zone-head-row" }, [
          el("h3", { html: md(zone.name) }),
          el("span", { class: "dc-plaque", text: "DC " + zone.dc }),
        ]),
        el("p", { class: "tagline", html: md(zone.tagline) }),
        el("div", { class: "meta-row" }, [
          el("span", { class: "badge " + zone.severity, html: md(zone.biome) }),
          el("span", { class: "continent", html: md(zone.continent) }),
        ]),
      ])
    );
    details.appendChild(body);

    details.querySelector(".roll-btn").addEventListener("click", () => rollWeather(details, zone));
    return details;
  }

  const grid = el("div", { class: "zone-grid", id: "zone-grid" });
  const cards = zones.map(zoneCard);
  cards.forEach((c) => grid.appendChild(c));
  section.appendChild(grid);

  /* ---------- filtering ---------- */

  const haystacks = zones.map((z) =>
    [
      z.name,
      z.tagline,
      z.biome,
      z.continent,
      z.subfeatures.map((s) => s.name + " " + s.text).join(" "),
      (z.callouts || []).map((c) => c.title + " " + c.text).join(" "),
      z.weather.map((w) => w.name + " " + w.effect).join(" "),
    ]
      .join(" ")
      .toLowerCase()
  );

  const state = { continent: "all", severities: new Set(), query: "" };

  function applyFilters() {
    let shown = 0;
    zones.forEach((zone, i) => {
      const show =
        (state.continent === "all" || zone.continent === state.continent) &&
        (state.severities.size === 0 || state.severities.has(zone.severity)) &&
        (!state.query || haystacks[i].includes(state.query));
      cards[i].style.display = show ? "" : "none";
      if (show) shown++;
    });
    const parts = [`Showing ${shown} of ${zones.length} zones`];
    if (state.continent !== "all") parts.push(state.continent);
    if (state.severities.size) {
      parts.push([...state.severities].map((s) => SEVERITY_LABEL[s]).join(", "));
    }
    resultCount.textContent = parts.join(" — ");
  }

  continentChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      continentChips.forEach((c) => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", "true");
      state.continent = chip.dataset.continent;
      applyFilters();
    });
  });

  severityChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const sev = chip.dataset.severity;
      if (state.severities.has(sev)) {
        state.severities.delete(sev);
        chip.setAttribute("aria-pressed", "false");
      } else {
        state.severities.add(sev);
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

  /* ---------- weather roller ---------- */

  function rollWeather(cardEl, zone) {
    const die = cardEl.querySelector(".die");
    const result = cardEl.querySelector(".roll-result");
    const rows = cardEl.querySelectorAll(".weather-table tbody tr");
    const btn = cardEl.querySelector(".roll-btn");
    // Guarded: a browser without matchMedia should still roll, just without the spin.
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    rows.forEach((r) => r.classList.remove("rolled"));
    result.textContent = "";
    die.classList.add("visible");
    btn.disabled = true;

    const roll = 1 + Math.floor(Math.random() * 6);

    const settle = () => {
      die.classList.remove("rolling");
      die.textContent = roll;
      btn.disabled = false;

      let mod = 0;
      let name = "";
      rows.forEach((r) => {
        const min = +r.dataset.min;
        const max = +r.dataset.max;
        if (roll >= min && roll <= max) {
          r.classList.add("rolled");
          const w = zone.weather.find((x) => parseRange(x.roll)[0] === min);
          name = w.name;
          const modMatch = w.mod.match(/[+-]?\d+/);
          mod = modMatch ? parseInt(modMatch[0], 10) : 0;
        }
      });

      const total = zone.dc + mod;
      result.replaceChildren(
        el("strong", { html: md(name) }),
        document.createTextNode(" — today's Exhaustion save is "),
        el("span", { class: "dc-final", text: "DC " + total }),
        mod
          ? el("span", {
              style: "color:var(--ink-dim)",
              text: ` (${zone.dc} base ${mod > 0 ? "+" : "−"} ${Math.abs(mod)} weather)`,
            })
          : null
      );
    };

    if (reduceMotion) {
      settle();
      return;
    }

    die.classList.add("rolling");
    let ticks = 0;
    const spin = setInterval(() => {
      die.textContent = 1 + Math.floor(Math.random() * 6);
      if (++ticks >= 10) {
        clearInterval(spin);
        settle();
      }
    }, 65);
  }
});
