/* Biome Compendium — filtering, search, and the daily weather roller. */
(function () {
  "use strict";

  const grid = document.getElementById("zone-grid");
  const searchInput = document.getElementById("zone-search");
  const continentChips = document.querySelectorAll("#continent-chips .chip");
  const severityChips = document.querySelectorAll("#severity-chips .chip");
  const resultCount = document.getElementById("result-count");

  const state = {
    continent: "all",
    severities: new Set(), // empty = all
    query: "",
  };

  const SEVERITY_LABEL = { mild: "Mild", harsh: "Harsh", deadly: "Deadly" };
  const CALLOUT_CLASS = { DANGER: "danger", WARNING: "warning", INFO: "info", IMPORTANT: "info" };

  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  /* ---------- Render ---------- */

  function zoneCard(zone, idx) {
    const details = document.createElement("details");
    details.className = `zone ${zone.severity}`;
    details.dataset.index = idx;

    const subs = zone.subfeatures
      .map(
        (s) =>
          `<li><span class="sub-name">${esc(s.name)}:</span> ${esc(s.desc)}</li>`
      )
      .join("");

    const callouts = zone.callouts
      .map(
        (c) =>
          `<div class="callout ${CALLOUT_CLASS[c.kind] || "info"}">
             <h4>${esc(c.title)}</h4><p>${esc(c.text)}</p>
           </div>`
      )
      .join("");

    const weatherRows = zone.weather
      .map((w) => {
        const [min, max] = parseRange(w.roll);
        return `<tr data-min="${min}" data-max="${max}">
          <td>${esc(w.roll)}</td>
          <td><span class="w-name">${esc(w.name)}</span><br>${esc(w.effect)}</td>
          <td class="w-mod">${esc(w.mod)}</td>
        </tr>`;
      })
      .join("");

    details.innerHTML = `
      <summary>
        <div class="zone-head-row">
          <h3>${esc(zone.name)}</h3>
          <span class="dc-plaque">DC ${zone.baselineDC}</span>
        </div>
        <p class="tagline">${esc(zone.tagline)}</p>
        <div class="meta-row">
          <span class="badge ${zone.severity}">${esc(zone.biome)}</span>
          <span class="continent">${esc(zone.continent)}</span>
        </div>
      </summary>
      <div class="zone-body">
        ${callouts}
        <h4>Local Sub-Features</h4>
        <ul class="subfeatures">${subs}</ul>
        <h4>Daily Weather (1d6)</h4>
        <div class="table-scroll">
          <table class="codex weather-table">
            <thead><tr><th scope="col">Roll</th><th scope="col">Condition</th><th scope="col">DC</th></tr></thead>
            <tbody>${weatherRows}</tbody>
          </table>
        </div>
        <div class="roll-row">
          <button type="button" class="btn-wow roll-btn">Roll daily weather</button>
          <span class="die" aria-hidden="true"></span>
          <span class="roll-result" role="status" aria-live="polite"></span>
        </div>
      </div>`;

    details
      .querySelector(".roll-btn")
      .addEventListener("click", () => rollWeather(details, zone));
    return details;
  }

  function parseRange(roll) {
    const parts = roll.split("–").map((n) => parseInt(n, 10));
    return [parts[0], parts.length > 1 ? parts[1] : parts[0]];
  }

  const cards = ZONES.map(zoneCard);
  cards.forEach((c) => grid.appendChild(c));

  // Pre-compute searchable text per zone.
  const haystacks = ZONES.map((z) =>
    [
      z.name,
      z.tagline,
      z.biome,
      z.continent,
      z.subfeatures.map((s) => s.name + " " + s.desc).join(" "),
      z.weather.map((w) => w.name + " " + w.effect).join(" "),
    ]
      .join(" ")
      .toLowerCase()
  );

  /* ---------- Filtering ---------- */

  function applyFilters() {
    let shown = 0;
    ZONES.forEach((zone, i) => {
      const matchContinent =
        state.continent === "all" || zone.continent === state.continent;
      const matchSeverity =
        state.severities.size === 0 || state.severities.has(zone.severity);
      const matchQuery = !state.query || haystacks[i].includes(state.query);
      const show = matchContinent && matchSeverity && matchQuery;
      cards[i].style.display = show ? "" : "none";
      if (show) shown++;
    });
    const parts = [`Showing ${shown} of ${ZONES.length} zones`];
    if (state.continent !== "all") parts.push(state.continent);
    if (state.severities.size)
      parts.push([...state.severities].map((s) => SEVERITY_LABEL[s]).join(", "));
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

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value.trim().toLowerCase();
    applyFilters();
  });

  applyFilters();

  /* ---------- Weather roller ---------- */

  function rollWeather(card, zone) {
    const die = card.querySelector(".die");
    const result = card.querySelector(".roll-result");
    const rows = card.querySelectorAll(".weather-table tbody tr");
    const btn = card.querySelector(".roll-btn");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
          const w = zone.weather.find(
            (x) => parseRange(x.roll)[0] === min
          );
          name = w.name;
          const modMatch = w.mod.match(/[+-]?\d+/);
          mod = modMatch ? parseInt(modMatch[0], 10) : 0;
        }
      });

      const total = zone.baselineDC + mod;
      result.innerHTML =
        `<strong>${esc(name)}</strong> — today's Exhaustion save is ` +
        `<span class="dc-final">DC ${total}</span>` +
        (mod ? ` <span style="color:var(--ink-dim)">(${zone.baselineDC} base ${mod > 0 ? "+" : "−"} ${Math.abs(mod)} weather)</span>` : ``);
    };

    if (reduceMotion) {
      settle();
      return;
    }

    die.classList.add("rolling");
    let ticks = 0;
    const spin = setInterval(() => {
      die.textContent = 1 + Math.floor(Math.random() * 6);
      ticks++;
      if (ticks >= 10) {
        clearInterval(spin);
        settle();
      }
    }, 65);
  }
})();
