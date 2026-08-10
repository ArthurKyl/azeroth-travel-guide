/* Moon phase glyphs — SVG path data keyed by phase shape.
   Content names a shape (glyph: waxing-crescent); the renderer draws it.

   Geometry: an 18×18 box, disc centred (9,9) r=8. Each path is the lit
   region: the outer limb arc, then the terminator ellipse (rx 4) bulging
   toward the lit side for a crescent, away for a gibbous.
   "full" is a special case — the whole disc in the lit colour. */
globalThis.MOON_GLYPHS = {
  "new": null,
  "waxing-crescent": "M9,1 A8,8 0 0 1 9,17 A4,8 0 0 0 9,1 Z",
  "first-quarter": "M9,1 A8,8 0 0 1 9,17 Z",
  "waxing-gibbous": "M9,1 A8,8 0 0 1 9,17 A4,8 0 0 1 9,1 Z",
  "full": "FULL",
  "waning-gibbous": "M9,1 A8,8 0 0 0 9,17 A4,8 0 0 0 9,1 Z",
  "last-quarter": "M9,1 A8,8 0 0 0 9,17 Z",
  "waning-crescent": "M9,1 A8,8 0 0 0 9,17 A4,8 0 0 1 9,1 Z",
};

globalThis.moonGlyphSVG = function (glyph, lit) {
  const path = globalThis.MOON_GLYPHS[glyph];
  const open = '<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">';
  if (path === "FULL") return `${open}<circle cx="9" cy="9" r="8" fill="${lit}"/></svg>`;
  const disc = '<circle cx="9" cy="9" r="8" fill="#24262b" stroke="#3c3f47"/>';
  const lump = path ? `<path d="${path}" fill="${lit}"/>` : "";
  return `${open}${disc}${lump}</svg>`;
};
