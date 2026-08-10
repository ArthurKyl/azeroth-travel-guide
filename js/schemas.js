/* ============================================================
   Content schemas — what each content/*.yml file is allowed to contain.

   These drive the error messages you see when an edit goes wrong, and the
   report on check.html. Field spec options:

     required: true          the field must be present and non-empty
     type: string|number|list|map     (default: string)
     enum: [a, b, c]         value must be one of these
     item: { fields: {...} } shape of each entry, for lists of blocks

   Adding a field to a content file? Add it here too, or the loader will
   report it as an unknown field.
   ============================================================ */
(function () {
  "use strict";

  const SCHEMAS = {};

  // Reusable fragments -------------------------------------------------

  const head = {
    type: "map",
    required: true,
    fields: {
      kicker: { required: true },
      title: { required: true },
      summary: { required: true },
      stats: {
        type: "list",
        item: { fields: { value: { required: true }, label: { required: true } } },
      },
    },
  };

  const calloutFields = {
    fields: {
      kind: { enum: ["danger", "warning", "info", "important"], required: true },
      title: { required: true },
      text: { required: true },
      items: { type: "list" },
    },
  };

  const tierFields = {
    fields: {
      tier: { enum: ["poor", "uncommon", "rare", "epic", "legendary"], required: true },
      range: { required: true },
      text: { required: true },
    },
  };

  const defRowFields = {
    fields: {
      key: { required: true },
      tone: { enum: ["mild", "harsh", "deadly", "rare", "epic", "neutral"] },
      text: { required: true },
    },
  };

  // site.yml -----------------------------------------------------------

  SCHEMAS.site = {
    type: "map",
    fields: {
      brand: {
        type: "map",
        required: true,
        fields: { name: { required: true }, sub: { required: true } },
      },
      nav: {
        type: "list",
        required: true,
        item: {
          fields: {
            label: { required: true },
            links: {
              type: "list",
              required: true,
              item: { fields: { text: { required: true }, href: { required: true } } },
            },
          },
        },
      },
      footer: {
        type: "map",
        required: true,
        fields: {
          tag: { required: true },
          note: { required: true },
          legal: { required: true },
        },
      },
    },
  };

  // holidays.yml -------------------------------------------------------

  SCHEMAS.holidays = {
    type: "map",
    fields: {
      head: head,
      year_table: {
        type: "map",
        required: true,
        fields: { heading: { required: true }, note: { required: true } },
      },
      detail: {
        type: "map",
        required: true,
        fields: { heading: { required: true } },
      },
      festivals: {
        type: "list",
        required: true,
        item: {
          fields: {
            id: { required: true },
            name: { required: true },
            month: { required: true },
            days: { required: true },
            when: { required: true },
            duration: { required: true },
            factions: { type: "list", required: true },
            impact: { required: true },
          },
        },
      },
    },
  };

  // activities.yml ------------------------------------------------------

  SCHEMAS.activities = {
    type: "map",
    fields: {
      head: head,
      daily_loop: {
        type: "map",
        required: true,
        fields: {
          heading: { required: true },
          steps: {
            type: "list",
            required: true,
            item: { fields: { name: { required: true }, text: { required: true } } },
          },
          stacking: { type: "map", required: true, ...calloutFields },
        },
      },
      activities_section: {
        type: "map",
        required: true,
        fields: { heading: { required: true } },
      },
      activities: {
        type: "list",
        required: true,
        item: {
          fields: {
            id: { required: true },
            name: { required: true },
            goal: { required: true },
            checks: { type: "list", required: true },
            outcomes: {
              type: "list",
              item: {
                fields: {
                  result: { enum: ["success", "failure", "nat"], required: true },
                  label: { required: true },
                  text: { required: true },
                },
              },
            },
            tiers: { type: "list", item: tierFields },
          },
        },
      },
    },
  };

  // settlements.yml -----------------------------------------------------

  SCHEMAS.settlements = {
    type: "map",
    fields: {
      head: head,
      rules: {
        type: "map",
        required: true,
        fields: {
          heading: { required: true },
          cards: {
            type: "list",
            required: true,
            item: {
              fields: {
                heading: { required: true },
                text: {},
                def_rows: { type: "list", item: defRowFields },
              },
            },
          },
        },
      },
      grid: {
        type: "map",
        required: true,
        fields: { heading: { required: true }, note: { required: true } },
      },
      locations: {
        type: "list",
        required: true,
        item: {
          fields: {
            id: { required: true },
            name: { required: true },
            accent: { required: true },
            tagline: { required: true },
            mechanic_line: {},
            stack_note: {},
            tiers: { type: "list", item: tierFields },
            options: {
              type: "list",
              item: {
                fields: {
                  title: { required: true },
                  cost: { required: true },
                  check: {
                    type: "map",
                    required: true,
                    fields: { skills: { type: "list" }, note: {} },
                  },
                  outcome: {
                    type: "map",
                    required: true,
                    fields: {
                      result: { enum: ["success", "failure", "nat"], required: true },
                      label: { required: true },
                      text: { required: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  globalThis.SCHEMAS = SCHEMAS;
  globalThis.SCHEMA_PARTS = { head, calloutFields, tierFields, defRowFields };
})();
