/* Travel Rules — renders content/travel-rules.yml */
Codex.boot("travel-rules", (d) => {
  const { el, md, table, callout, steps, checklist, pageHead, sectionHead } = Codex;

  pageHead(d.head);

  document
    .getElementById("intro")
    .appendChild(el("p", { html: md(d.intro) }));

  const loop = document.getElementById("loop");
  sectionHead(loop, d.phase_loop.heading, d.phase_loop.note, "loop-title");
  loop.appendChild(steps(d.phase_loop.steps));

  const pace = document.getElementById("pace");
  sectionHead(pace, d.pace.heading, null, "pace-title");
  pace.appendChild(
    table({
      columns: d.pace.columns,
      rows: d.pace.rows.map((r) => ({
        key: true,
        cells: [r.pace, r.distance, r.effect, r.restrictions],
      })),
    })
  );

  const danger = document.getElementById("danger");
  sectionHead(danger, d.hazards.heading, d.hazards.note, "danger-title");
  d.hazards.callouts.forEach((c) => danger.appendChild(callout(c)));

  const gm = document.getElementById("gm");
  sectionHead(gm, d.gm_checklist.heading, null, "gm-title");
  gm.appendChild(checklist(d.gm_checklist.items));

  const gateway = document.getElementById("gateway");
  sectionHead(gateway, d.gateways.heading, null, "gateway-title");
  gateway.appendChild(
    el(
      "div",
      { class: "gateway-grid" },
      d.gateways.cards.map((c) =>
        el("a", { class: "gateway card", href: c.href }, [
          el("h3", { html: md(c.title) }),
          el("p", { html: md(c.text) }),
          el("span", { class: "count", html: md(c.count) }),
        ])
      )
    )
  );
});
