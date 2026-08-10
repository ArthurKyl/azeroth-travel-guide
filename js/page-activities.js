/* Travel Activities — renders content/activities.yml */
Codex.boot("activities", (d) => {
  const { el, md, badgeList, callout, tierTable, steps, pageHead, sectionHead, fail } = Codex;

  // Each activity needs one of the two result shapes; say so plainly if not.
  const missing = d.activities
    .filter((a) => !a.outcomes && !a.tiers)
    .map((a) => `activities.yml → ${a.name}: needs either 'outcomes' or 'tiers'`);
  if (missing.length) return fail(missing);

  pageHead(d.head);

  const loop = document.getElementById("loop");
  sectionHead(loop, d.daily_loop.heading, null, "loop-title");
  loop.appendChild(steps(d.daily_loop.steps));
  loop.appendChild(callout(d.daily_loop.stacking));

  const acts = document.getElementById("acts");
  sectionHead(acts, d.activities_section.heading, null, "acts-title");
  acts.appendChild(
    el(
      "div",
      { class: "activity-grid" },
      d.activities.map((a) => {
        const parts = [
          el("h3", { html: md(a.name) }),
          el("p", { class: "goal", html: md(a.goal) }),
          el("p", { class: "checks" }, badgeList(a.checks, "skill")),
        ];
        if (a.outcomes) {
          parts.push(
            el(
              "ul",
              { class: "mech" },
              a.outcomes.map((o) =>
                el("li", null, [
                  el("span", { class: "label-" + o.result, html: md(o.label) }),
                  " " + "",
                  el("span", { html: md(o.text) }),
                ])
              )
            )
          );
        }
        if (a.tiers) parts.push(tierTable(a.tiers));
        return el("article", { class: "activity card", id: a.id }, parts);
      })
    )
  );
});
