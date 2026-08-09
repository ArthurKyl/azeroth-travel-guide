#!/usr/bin/env python3
"""Parse Biomes.md into a JS data file of zones."""
import json
import re

SRC = "/mnt/games-2/projects/Obsidian/D&D-Warcraft/Biomes.md"
OUT = "/mnt/games-2/projects/azeroth-travel-guide/js/zones-data.js"

text = open(SRC, encoding="utf-8").read()


def clean(s: str) -> str:
    s = re.sub(r"\[cite:[^\]]*\]", "", s)
    # LaTeX-isms: $-5$, $1\text{d}4$, $+2\text{d}6$, $50\%$, $1/3$, $1\text{d}4 \times 10$
    def unmath(m):
        inner = m.group(1)
        inner = inner.replace(r"\text{d}", "d")
        inner = inner.replace(r"\%", "%")
        inner = inner.replace(r"\times", "×")
        inner = re.sub(r"\s+", " ", inner)
        return inner
    s = re.sub(r"\$([^$]+)\$", unmath, s)
    s = s.replace("**", "").replace("_", " ")
    s = re.sub(r"\s+", " ", s).strip()
    return s


# Split into continent sections
continents = []
for m in re.finditer(r"^## (.+?) Regional Compendium$", text, re.M):
    continents.append((m.group(1).strip(), m.start()))
# The final "## Campaign Design Synthesis" ends the last continent
end_m = re.search(r"^## Campaign Design Synthesis", text, re.M)
end_pos = end_m.start() if end_m else len(text)

zones = []
for ci, (cname, cstart) in enumerate(continents):
    cend = continents[ci + 1][1] if ci + 1 < len(continents) else end_pos
    chunk = text[cstart:cend]
    zone_heads = list(re.finditer(r"^### 🗺️ (.+)$", chunk, re.M))
    for zi, zm in enumerate(zone_heads):
        zstart = zm.end()
        zend = zone_heads[zi + 1].start() if zi + 1 < len(zone_heads) else len(chunk)
        body = chunk[zstart:zend]
        name = clean(zm.group(1))

        tagline_m = re.search(r"^_(.+?)_\s*$", body, re.M)
        tagline = clean(tagline_m.group(1)) if tagline_m else ""

        biome_m = re.search(r"\*\*Major Biome\*\*:\s*(.+)$", body, re.M)
        biome_raw = clean(biome_m.group(1)) if biome_m else ""

        # severity: pick the worst class mentioned for card coloring; keep raw string too
        sev = "mild"
        if "Deadly" in biome_raw:
            sev = "deadly"
        elif "Harsh" in biome_raw:
            sev = "harsh"
        # House rule: source notes use Harsh DC 14 / Deadly DC 18; the campaign
        # runs them at 13 / 16. Remap baselines (and the display string) here.
        BASELINE_REMAP = {14: 13, 18: 16}
        biome_raw = re.sub(
            r"DC (\d+)",
            lambda m: f"DC {BASELINE_REMAP.get(int(m.group(1)), int(m.group(1)))}",
            biome_raw,
        )
        # baseline DC = worst class DC mentioned
        dcs = [int(d) for d in re.findall(r"DC (\d+)", biome_raw)]
        baseline = max(dcs) if dcs else {"mild": 10, "harsh": 13, "deadly": 16}[sev]

        # sub-features: lines like "    - _Name_: desc"
        subs = []
        for sm in re.finditer(r"^\s+- _(.+?)_:\s*(.+)$", body, re.M):
            subs.append({"name": clean(sm.group(1)), "desc": clean(sm.group(2))})

        # callouts: > [!DANGER] / [!WARNING] blocks
        callouts = []
        for cm in re.finditer(
            r"^> \[!(\w+)\]([^\n]*)\n((?:^>.*\n?)*)", body, re.M
        ):
            kind = cm.group(1).upper()
            raw = cm.group(2) + "\n" + cm.group(3)
            lines = [re.sub(r"^>\s?", "", l) for l in raw.splitlines()]
            content = clean(" ".join(l for l in lines if l.strip()))
            # first bold segment is often a title
            title_m = re.search(r"\*\*(.+?)\*\*", raw)
            title = clean(title_m.group(1)) if title_m else kind.title()
            body_txt = content.replace(title, "", 1).strip() if title in content else content
            callouts.append({"kind": kind, "title": title, "text": body_txt})

        # weather table rows
        weather = []
        for wm in re.finditer(
            r"^\|\s*\*\*(\d(?:–\d)?)\*\*\s*\|([^|]+)\|([^|]+)\|([^|]+)\|", body, re.M
        ):
            roll = wm.group(1)
            weather.append(
                {
                    "roll": roll,
                    "name": clean(wm.group(2)),
                    "mod": clean(wm.group(3)),
                    "effect": clean(wm.group(4)),
                }
            )

        zones.append(
            {
                "name": name,
                "continent": cname,
                "tagline": tagline,
                "biome": biome_raw,
                "severity": sev,
                "baselineDC": baseline,
                "subfeatures": subs,
                "callouts": callouts,
                "weather": weather,
            }
        )

# sanity report
print(f"zones: {len(zones)}")
for z in zones:
    problems = []
    if len(z["weather"]) != 3:
        problems.append(f"weather rows={len(z['weather'])}")
    if len(z["subfeatures"]) < 3:
        problems.append(f"subs={len(z['subfeatures'])}")
    if not z["tagline"]:
        problems.append("no tagline")
    if problems:
        print(f"  !! {z['name']} ({z['continent']}): {', '.join(problems)}")

from collections import Counter
print(Counter(z["continent"] for z in zones))
print(Counter(z["severity"] for z in zones))

with open(OUT, "w", encoding="utf-8") as f:
    f.write("// Auto-generated from Biomes.md — zone compendium data\n")
    f.write("const ZONES = ")
    f.write(json.dumps(zones, ensure_ascii=False, indent=2))
    f.write(";\n")
print("written", OUT)
