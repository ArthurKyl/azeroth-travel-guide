// Auto-generated from Biomes.md — zone compendium data
const ZONES = [
  {
    "name": "Durotar",
    "continent": "Kalimdor",
    "tagline": "Arid Red Canyons and Sun-Baked Badlands",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Razor Hill Clay Flats",
        "desc": "Open red clay plains. Standard travel pace applies."
      },
      {
        "name": "Echo Isles Coastal Shoals",
        "desc": "Shallow tropical waters requiring watercraft or DC 12 Athletics swimming checks."
      },
      {
        "name": "Thunder Ridge Lightning Fissures",
        "desc": "Volcanic rift generating elemental air sparks; wearing heavy metal armor incurs disadvantage on Stealth checks."
      },
      {
        "name": "Drygulch Ravine",
        "desc": "Narrow canyon walls providing total cover against gale winds, but creating vulnerability to flash floods."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Sun-Baked Heatwave",
        "mod": "+0 DC",
        "effect": "Clear conditions. Bright sunlight throughout the day."
      },
      {
        "roll": "4–5",
        "name": "Blistering Dust Storm",
        "mod": "+2 DC",
        "effect": "Lightly obscured. Disadvantage on Wisdom (Perception) checks relying on sight."
      },
      {
        "roll": "6",
        "name": "Scorching Solar Gale",
        "mod": "+4 DC",
        "effect": "Double daily water requirements. DC 14 Constitution save or gain 1 level of Exhaustion upon finishing travel."
      }
    ]
  },
  {
    "name": "The Barrens",
    "continent": "Kalimdor",
    "tagline": "Expansive Savanna and Oasis Sinkholes",
    "biome": "Mild (Baseline DC 10 Savanna) / Harsh (DC 14 Oasis Bogs)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Forgotten Pools Oases",
        "desc": "Freshwater oases wrapped in lush flora; advantage on daily Foraging checks."
      },
      {
        "name": "Wailing Caverns Sinkhole",
        "desc": "Corrupted natural caverns emitting nightmare mists; Wisdom checks incur a -2 penalty."
      },
      {
        "name": "Camp Taurajo Scrublands",
        "desc": "Dry brushwood terrain; open line of sight extends up to 3 hexes."
      },
      {
        "name": "Thorn Hill Quillboar Maze",
        "desc": "Dense briar patches acting as difficult terrain; dealing 1d4 piercing damage per hex traversed off-road."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Golden Savanna Breeze",
        "mod": "+0 DC",
        "effect": "Mild temperature. Standard travel speeds apply."
      },
      {
        "roll": "4–5",
        "name": "Dry Scrub Haze",
        "mod": "+2 DC",
        "effect": "Line of sight reduced to 2 hexes. Ranged attack rolls beyond 30 feet suffer -2."
      },
      {
        "roll": "6",
        "name": "Savannah Thunderstrike",
        "mod": "+4 DC",
        "effect": "Heavy rain turns dirt roads into difficult terrain. On a roll of 1 on 1d20, a random player is struck by lightning for 4d10 lightning damage."
      }
    ]
  },
  {
    "name": "Mulgore",
    "continent": "Kalimdor",
    "tagline": "Pastoral Windswept Grasslands and High Mesas",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Redcloud Mesa Highlands",
        "desc": "High-altitude plains granting double sight range across adjacent hexes."
      },
      {
        "name": "Golden Plains",
        "desc": "Rolling grass fields offering abundant game; double food yield on successful Survival checks."
      },
      {
        "name": "Bael'dun Digsite Fissures",
        "desc": "Dwarven excavations causing ground instability; wheeled vehicles move at half speed."
      },
      {
        "name": "Venture Co. Deforested Slags",
        "desc": "Muddy logging sites with contaminated water; drinking requires a DC 12 Poison save."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Peaceful Prairie Wind",
        "mod": "+0 DC",
        "effect": "Ideal traveling weather. Passive Perception increased by +2."
      },
      {
        "roll": "4–5",
        "name": "Mesa Fog",
        "mod": "+2 DC",
        "effect": "Vision restricted to 1 hex. Navigation checks made with disadvantage."
      },
      {
        "roll": "6",
        "name": "Highland Gale Storm",
        "mod": "+4 DC",
        "effect": "High winds disrupt flying mounts and ranged weapon fire. Ranged attacks suffer disadvantage."
      }
    ]
  },
  {
    "name": "Teldrassil",
    "continent": "Kalimdor",
    "tagline": "Enchanted Canopy Forest and World Tree Branches",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Shadowglen Emerald Nooks",
        "desc": "Blessed forest groves; resting here removes 1 additional level of Exhaustion."
      },
      {
        "name": "Lake Al'Ameth Glades",
        "desc": "Serene woodland waters; magical ingredients yield +2 on Herbalism checks."
      },
      {
        "name": "Ban'ethil Barrow Dens",
        "desc": "Subterranean roots housing sleeping druids; necrotic magic is suppressed."
      },
      {
        "name": "Rut'theran Coastal Bluffs",
        "desc": "Sea-level mist zones connecting to flight paths."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Arcane Canopy Glow",
        "mod": "+0 DC",
        "effect": "Constant twilight illumination. Night vision penalties negated."
      },
      {
        "roll": "4–5",
        "name": "Mist of Elune",
        "mod": "+2 DC",
        "effect": "Lightly obscured. Dexterity (Stealth) checks made with advantage."
      },
      {
        "roll": "6",
        "name": "Nightmare Spore Drizzle",
        "mod": "+4 DC",
        "effect": "Wisps of corruption fall from upper branches. Failing the daily save causes violent hallucinations (disadvantage on Wisdom checks for 24 hours)."
      }
    ]
  },
  {
    "name": "Darkshore",
    "continent": "Kalimdor",
    "tagline": "Fog-Shrouded Ancient Coastal Shoreline",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Master's Glaive Titan Fossils",
        "desc": "Ancient petrified remains; aberrant magic causes wild magic surges on spellcasts."
      },
      {
        "name": "Auberdine Sunken Ruins",
        "desc": "Submerged coastal piers; requires swimming or watercraft."
      },
      {
        "name": "Amalth'aran Cursed Ruins",
        "desc": "Highborne specters haunt stone arches; long rests trigger random encounter checks on 1–3 on 1d6."
      },
      {
        "name": "Mist'edge Bogs",
        "desc": "Coastal tidelands resulting in difficult terrain across all sea-level hexes."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Overcast Coastal Drizzle",
        "mod": "+0 DC",
        "effect": "Standard movement. Light rain continuously dampens campfire checks."
      },
      {
        "roll": "4–5",
        "name": "Dense Sea Fog",
        "mod": "+2 DC",
        "effect": "Heavily obscured beyond 30 feet. Ranged weapons limited to 30 feet maximum range."
      },
      {
        "roll": "6",
        "name": "Tidal Squall",
        "mod": "+4 DC",
        "effect": "Coastal hexes flood. Travel speed halved. Ships must succeed on DC 16 Water Vehicles check or capsize."
      }
    ]
  },
  {
    "name": "Ashenvale",
    "continent": "Kalimdor",
    "tagline": "Ancient Temperate Rainforest and Contested Canopy",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Iris Lake Ley-Founts",
        "desc": "Arcane-infused waters; casters recover one 1st-level spell slot on long rest."
      },
      {
        "name": "Demon Fall Canyon Fel-Fissures",
        "desc": "Red scorched earth; fire damage spells deal +2 additional damage."
      },
      {
        "name": "Warsong Lumber Camp Slags",
        "desc": "Clearcut logging paths; siege engines move at full speed, but forest cover is negated."
      },
      {
        "name": "Lake Falathim Nooks",
        "desc": "Tranquil elven sanctuaries offering safe resting spots."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Emerald Sunlight",
        "mod": "+0 DC",
        "effect": "Clear canopy lighting. Perfect tracking conditions."
      },
      {
        "roll": "4–5",
        "name": "Rainforest Downpour",
        "mod": "+2 DC",
        "effect": "Campfire creation requires DC 14 Survival check. Lightly obscured."
      },
      {
        "roll": "6",
        "name": "Fel-Ash Rain",
        "mod": "+4 DC",
        "effect": "Rain tainted by demon blood. Plants wither. Unsheltered creatures take 1d6 necrotic damage per 4 hours traveled."
      }
    ]
  },
  {
    "name": "Stonetalon Mountains",
    "continent": "Kalimdor",
    "tagline": "Alpine Crags, Windy Passes, and Charred Ravines",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Sun Rock Glade Highlands",
        "desc": "High-altitude haven; clean water springs available."
      },
      {
        "name": "Webwinder Ravine Arachnid Caves",
        "desc": "Webs cover terrain; movement reduced by half without cutting gear."
      },
      {
        "name": "Charred Vale Ash Fissures",
        "desc": "Scorched land devoid of plant life; daily foraging is impossible."
      },
      {
        "name": "Windshear Crag Deforestation Pit",
        "desc": "Goblin mechanical works; heavy noise negates passive hearing perception."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Mountain Winds",
        "mod": "+0 DC",
        "effect": "Crisp mountain air. Flying mounts travel +1 hex per day."
      },
      {
        "roll": "4–5",
        "name": "Crag Gale",
        "mod": "+2 DC",
        "effect": "Ranged weapon attacks suffer -2. Flying requires DC 14 Acrobatics check."
      },
      {
        "roll": "6",
        "name": "Avalanche & Ash Fall",
        "mod": "+4 DC",
        "effect": "Mountain passes blocked. Traversal through narrow passes requires DC 15 Dexterity save or take 3d10 bludgeoning damage."
      }
    ]
  },
  {
    "name": "Desolace",
    "continent": "Kalimdor",
    "tagline": "Barren Salt Flats and Grey Desolation",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Maraudon Centaur Burial Grounds",
        "desc": "Sacred burial grounds; undead encounters trigger on 1–2 on 1d6."
      },
      {
        "name": "Mannoroc Coven Fel-Scars",
        "desc": "Demonic energy pits; non-evil creatures suffer -1 to saving throws."
      },
      {
        "name": "Kormek's Hut Bone Fields",
        "desc": "Fields of dry bones; stealth checks suffer disadvantage due to clattering bones."
      },
      {
        "name": "Gelkis Village Salt Basins",
        "desc": "Evaporated salt beds; total absence of drinkable water."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Bleak Starlight/Sun",
        "mod": "+0 DC",
        "effect": "Barren visibility. Unshaded heat increases water loss by 50%."
      },
      {
        "roll": "4–5",
        "name": "Dust Gale",
        "mod": "+2 DC",
        "effect": "Fine grey dust coats gear. Unprotected eyes suffer disadvantage on Perception checks."
      },
      {
        "roll": "6",
        "name": "Salt Squall",
        "mod": "+4 DC",
        "effect": "Corrosive salt winds. Open wounds inflict 1d4 acid damage per hour of travel without wrapped armor."
      }
    ]
  },
  {
    "name": "Feralas",
    "continent": "Kalimdor",
    "tagline": "Dense Tropical Rainforest and Ancient Highborne Ruins",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Eldre'Thalas (Dire Maul) Elven Ruins",
        "desc": "Stone corridors radiating residual Highborne arcane magic."
      },
      {
        "name": "Isildien Sunken Vaults",
        "desc": "Overgrown ruins containing ancient mechanical and magical traps."
      },
      {
        "name": "High Wilderness Canopy",
        "desc": "Triple-tiered jungle canopy blocking direct sunlight; permanent dim light."
      },
      {
        "name": "Feathermoon Coastal Shoals",
        "desc": "Island chain navigable only by waterborne vessels."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Humid Jungle Mist",
        "mod": "+0 DC",
        "effect": "Heavy humidity. Rations spoil twice as fast without magical preservation."
      },
      {
        "roll": "4–5",
        "name": "Monsoon Deluge",
        "mod": "+2 DC",
        "effect": "Rivers overflow. Crossing non-bridged rivers requires DC 15 Athletics check."
      },
      {
        "roll": "6",
        "name": "Tropical Hurricane",
        "mod": "+4 DC",
        "effect": "Fallen trees block jungle paths. Travel speed halved. Ranged attacks impossible."
      }
    ]
  },
  {
    "name": "Thousand Needles",
    "continent": "Kalimdor",
    "tagline": "Canyon Pillars and Caked Salt Flats",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Freewind Post Mesa Needle Passes",
        "desc": "Narrow rope bridges connecting needle peaks; Acrobatics DC 12 required in high wind."
      },
      {
        "name": "The Shimmering Flats Salt Desert",
        "desc": "Vast dry basin ideal for speed trials; mounted land speed increased by +10 feet."
      },
      {
        "name": "Highperch Wyvern Crags",
        "desc": "Vertical cliffs hosting aggressive fauna."
      },
      {
        "name": "Razorfen Clefts",
        "desc": "Dense bramble tunnels leading into southern barrens."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Sun-Blasted Canyon",
        "mod": "+0 DC",
        "effect": "Blinding glare off white salt. Vision checks without tinted glass suffer -2."
      },
      {
        "roll": "4–5",
        "name": "Canyon Wind Shear",
        "mod": "+2 DC",
        "effect": "Strong gusts through narrow needle gorges; flying mounts cannot operate."
      },
      {
        "roll": "6",
        "name": "Flash Mudslide",
        "mod": "+4 DC",
        "effect": "Flatlands flood with fast mud. Land mounts move at 1/3 speed. DC 14 Strength save to avoid stuck vehicles."
      }
    ]
  },
  {
    "name": "Tanaris",
    "continent": "Kalimdor",
    "tagline": "Endless Arid Desert Dunes",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Gadgetzan Steamwheedle Outpost",
        "desc": "Neutral goblin hub; full trade and repair facilities available."
      },
      {
        "name": "Caverns of Time Sands",
        "desc": "Temporal anomalies; long rests may randomly advance or rewind time by 1d6 hours."
      },
      {
        "name": "Zalashji Tidepools",
        "desc": "Coastal shoreline populated by dangerous sea life."
      },
      {
        "name": "Southmoon Ruins Sunken Vaults",
        "desc": "Buried Highborne buildings beneath shifting sands."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Scorching Clear Dunes",
        "mod": "+0 DC",
        "effect": "Extreme daytime heat. Double daily water consumption required."
      },
      {
        "roll": "4–5",
        "name": "Shifting Sandstorm",
        "mod": "+2 DC",
        "effect": "Tracks erased in 1 hour. Survival checks to avoid getting lost made with disadvantage."
      },
      {
        "roll": "6",
        "name": "Sirocco Sand Cyclone",
        "mod": "+4 DC",
        "effect": "Heavily obscured. Takes 1d6 slashing damage per hour from flying sand particles unless fully covered."
      }
    ]
  },
  {
    "name": "Un'Goro Crater",
    "continent": "Kalimdor",
    "tagline": "Primeval Jungle Basin and Volcanic Fissures",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Fire Plume Ridge Lava Fissures",
        "desc": "Active central volcano; fire damage spells deal +1d6 extra fire damage."
      },
      {
        "name": "Lakkari Tar Pits",
        "desc": "Viscous black pools; creatures stepping into tar are restrained (DC 16 Escape)."
      },
      {
        "name": "Golakka Hot Springs",
        "desc": "Thermal waters; short rests taken here restore maximum hit points per hit die expended."
      },
      {
        "name": "Marshal's Refuge Titan Pylons",
        "desc": "Ancient Titan structures emitting defensive energy fields."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Muggy Primeval Heat",
        "mod": "+0 DC",
        "effect": "Heavy thermal humidity. Heavy armor users suffer -1 to AC due to heat exhaustion."
      },
      {
        "roll": "4–5",
        "name": "Volcanic Ash Haze",
        "mod": "+2 DC",
        "effect": "Lightly obscured. Breathing without cloth masks requires DC 12 Con save against coughing fits."
      },
      {
        "roll": "6",
        "name": "Sulphur Deluge",
        "mod": "+4 DC",
        "effect": "Acidic rain from volcanic cloud. Armor AC reduced by 1 temporarily until cleaned at camp."
      }
    ]
  },
  {
    "name": "Silithus",
    "continent": "Kalimdor",
    "tagline": "Arid Insectoid Hive Wastes",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Hive'Ashi Insectoid Clefts",
        "desc": "Vast underground Qiraji tunnels; ground collapses trigger on 1–2 on 1d20."
      },
      {
        "name": "Twilight Post Cultist Compounds",
        "desc": "Fortified dark cult encampments; aggressive patrols across adjacent hexes."
      },
      {
        "name": "The Scarred Vale Ahn'Qiraj Gates",
        "desc": "Massive Titan-built wall blocking the far south."
      },
      {
        "name": "Crystal Vale Elemental Fissures",
        "desc": "Resonance crystals triggering unpredictable earth elementals."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Unnatural Dust Haze",
        "mod": "+0 DC",
        "effect": "Arid, silent winds. Sensation of dread grants -1 to Morale/Wisdom saves."
      },
      {
        "roll": "4–5",
        "name": "Chitinous Sandstorm",
        "mod": "+2 DC",
        "effect": "Flying insect swarms mixed with sand. Concentration checks for spells suffer disadvantage."
      },
      {
        "roll": "6",
        "name": "Hive Seismic Tremor",
        "mod": "+4 DC",
        "effect": "Earthquake event. Structures crumble. DC 15 Dexterity save or knocked prone and take 2d10 bludgeoning damage."
      }
    ]
  },
  {
    "name": "Azshara",
    "continent": "Kalimdor",
    "tagline": "Autumnal Cliffs and Sunken Highborne Ruins",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Bitter Reaches Autumnal Bluffs",
        "desc": "Red-leafed forest cliffs overlooking ocean gulfs; high vantage points."
      },
      {
        "name": "Shattered Strand Sunken Ruins",
        "desc": "Naga-infested coastline dotted with submerged Highborne marble."
      },
      {
        "name": "Tower of Eldara Nooks",
        "desc": "Arcane ruins radiating residual power."
      },
      {
        "name": "Tempest Bay Coral Reefs",
        "desc": "Dangerous coastal reefs wrecking deep-draft ships."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Golden Autumn Breeze",
        "mod": "+0 DC",
        "effect": "Crisp, cool weather. Clear skies across all cliffs."
      },
      {
        "roll": "4–5",
        "name": "Sea Cliff Fog",
        "mod": "+2 DC",
        "effect": "Lightly obscured. High cliffs become extreme hazard (fall checks made with disadvantage)."
      },
      {
        "roll": "6",
        "name": "Arcane Tempest",
        "mod": "+4 DC",
        "effect": "Wild magical storm. Spells roll on the Wild Magic Surge table on every cast."
      }
    ]
  },
  {
    "name": "Winterspring",
    "continent": "Kalimdor",
    "tagline": "Subarctic Alpine Glades and Snowbound Slopes",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Frostsaber Rock Snowy Glades",
        "desc": "Den of apex predators; tracking checks suffer -2 due to falling powder."
      },
      {
        "name": "Starfall Village Nooks",
        "desc": "Furbolg settlement offering warm shelter and basic goods."
      },
      {
        "name": "Lake Kel'Theril Frozen Ruins",
        "desc": "Ice sheet covering ancient ruins; ice thickness varies (risk of falling through)."
      },
      {
        "name": "Mazthoril Ice Caverns",
        "desc": "Blue dragonflight flight tunnels; cold damage increased by +2."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Crisp Frost Light",
        "mod": "+0 DC",
        "effect": "Sub-zero clear weather. Cold weather gear mandatory to avoid baseline Exhaustion."
      },
      {
        "roll": "4–5",
        "name": "Freezing Snow Squall",
        "mod": "+2 DC",
        "effect": "Difficult terrain across all unpaved hexes. Movement rate reduced by 25%."
      },
      {
        "roll": "6",
        "name": "Arctic Blizzard",
        "mod": "+4 DC",
        "effect": "Visiblity zero (heavily obscured). Creatures without shelter take 1d6 cold damage per hour."
      }
    ]
  },
  {
    "name": "Moonglade",
    "continent": "Kalimdor",
    "tagline": "Sacred Druidic Haven and Peaceful Lakes",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Lake Elune'ara Shoreline",
        "desc": "Sacred waters; drinking grants the effects of a Lesser Restoration spell once per day."
      },
      {
        "name": "Stormrage Barrow Dens",
        "desc": "Subterranean druidic chambers; total immunity to nightmare corruption."
      },
      {
        "name": "Nighthaven Sacred Glades",
        "desc": "Peaceful sanctuary town; open hostilities strictly forbidden by Cenarion Circle."
      },
      {
        "name": "Shrine of Remulos",
        "desc": "Holy shrine granting +2 to Nature and Animal Handling checks."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Eternal Spring Breeze",
        "mod": "+0 DC",
        "effect": "Perfect clear weather. All living creatures regain +2 additional HP per Hit Die spent."
      },
      {
        "roll": "4–5",
        "name": "Silvery Moonlight Mist",
        "mod": "+2 DC",
        "effect": "Gentle mist glowing under moonlight. Stealth checks made with advantage."
      },
      {
        "roll": "6",
        "name": "Emerald Dream Rain",
        "mod": "+4 DC",
        "effect": "Magical rain refreshes nature. Spellcasters regain one spent spell slot of 3rd level or lower."
      }
    ]
  },
  {
    "name": "Azuremyst Isle",
    "continent": "Kalimdor",
    "tagline": "Crystal-Infused Temperate Woodlands",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Exodar Impact Crater",
        "desc": "Arcane wreckage site; power cores hum with dimensional energy."
      },
      {
        "name": "Silverline Shore Tidepools",
        "desc": "Tranquil beaches with purple-tinted flora."
      },
      {
        "name": "Ammen Vale Crystal Fountains",
        "desc": "Glowing red/purple crystal clusters emitting light in a 30-foot radius."
      },
      {
        "name": "Stillpine Timberlands",
        "desc": "Dense forested hills inhabited by friendly furbolg tribes."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Shimmering Coastal Sun",
        "mod": "+0 DC",
        "effect": "Mild temperature with iridescent purple sky hues."
      },
      {
        "roll": "4–5",
        "name": "Crystal Fog",
        "mod": "+2 DC",
        "effect": "Lightly obscured. Arcane radiation glimmers in the fog, granting advantage on Arcana checks."
      },
      {
        "roll": "6",
        "name": "Dimensional Storm",
        "mod": "+4 DC",
        "effect": "Space distorts slightly. Teleportation magic operates at double range, but triggers wild magic rolls."
      }
    ]
  },
  {
    "name": "Bloodmyst Isle",
    "continent": "Kalimdor",
    "tagline": "Red Radiation-Warped Marshes and Irradiated Crags",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Bloodcurse Reef Sunken Shoals",
        "desc": "Cursed waters where blood-red algae blooms; swimming inflicts nausea."
      },
      {
        "name": "Vector Isle Fel-Wreckage",
        "desc": "Irradiated ship wreckage; construct and demon encounter rate doubled."
      },
      {
        "name": "Cryo-Core Irradiated Bogs",
        "desc": "Red mutating waters; failing survival check causes 1d6 poison/radiation damage."
      },
      {
        "name": "Axxarien Shadow Nooks",
        "desc": "Satyr encampments utilizing dark curser magic."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Red Crimson Haze",
        "mod": "+0 DC",
        "effect": "Constant red tint in the sky. Living creatures feel constant mild irritation."
      },
      {
        "roll": "4–5",
        "name": "Toxic Miasma",
        "mod": "+2 DC",
        "effect": "Lightly obscured. Non-native fauna become hostile and aggressive."
      },
      {
        "roll": "6",
        "name": "Mutagenic Fallout",
        "mod": "+4 DC",
        "effect": "Irradiated ash falls from the sky. DC 14 Constitution save or gain 1 level of Exhaustion and mutated skin rash for 24 hours."
      }
    ]
  },
  {
    "name": "Elwynn Forest",
    "continent": "Eastern Kingdoms",
    "tagline": "Temperate Deciduous Woodlands and Peaceful Valleys",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Northshire Valley Glades",
        "desc": "Protected monastic valley; full healing resources and training available."
      },
      {
        "name": "Crystal Lake Waters",
        "desc": "Freshwater lake offering plentiful fishing."
      },
      {
        "name": "Fargodeep Mine Clefts",
        "desc": "Kobold-infested gold mines; subterranean narrow corridors."
      },
      {
        "name": "Eastvale Timberlands",
        "desc": "Managed logging forests with established roads granting +1 movement speed."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Mild Forest Canopy Sun",
        "mod": "+0 DC",
        "effect": "Perfect weather. Standard travel pace across all hexes."
      },
      {
        "roll": "4–5",
        "name": "Woodland Rain",
        "mod": "+2 DC",
        "effect": "Dirt paths become slippery. Unmounted speed reduced by 5 feet."
      },
      {
        "roll": "6",
        "name": "Heavy Thunderstorm",
        "mod": "+4 DC",
        "effect": "Heavily obscured lighting. DC 12 Survival check to keep camp fires burning through the night."
      }
    ]
  },
  {
    "name": "Westfall",
    "continent": "Eastern Kingdoms",
    "tagline": "Arid Farmlands and Dust Plains",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Moonbrook Abandoned Digs",
        "desc": "Ruined mining town; Defias rogue ambush rate increased."
      },
      {
        "name": "Sentinel Hill Outpost",
        "desc": "Fortified militia tower offering commanding view over 2 adjacent hexes."
      },
      {
        "name": "Deadmines Ravine Clefts",
        "desc": "Jagged red canyon entrance concealing deep subterranean network."
      },
      {
        "name": "Longshore Coastal Dunes",
        "desc": "Sandy shorelines strewn with shipwrecks and crab colonies."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Dry Sun",
        "mod": "+0 DC",
        "effect": "Warm dry climate. Clear vision across all open plains."
      },
      {
        "roll": "4–5",
        "name": "Dust Bowl Wind",
        "mod": "+2 DC",
        "effect": "Wind kicks up dry topsoil. Ranged attacks beyond 60 feet suffer -2."
      },
      {
        "roll": "6",
        "name": "Gale Force Dust Storm",
        "mod": "+4 DC",
        "effect": "Lightly obscured conditions. Wisdom (Perception) checks relying on sight made with disadvantage."
      }
    ]
  },
  {
    "name": "Duskwood",
    "continent": "Eastern Kingdoms",
    "tagline": "Cursed Shadowed Forest and Haunted Graveyards",
    "biome": "Mild (Baseline DC 10 Baseline) / Harsh (DC 14 Shadow Nooks)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Darkshire Shadowed Glades",
        "desc": "Gloomy township encircled by magical street lanterns."
      },
      {
        "name": "Raven Hill Cemeteries",
        "desc": "Vast unholy burial grounds; undead rise on 1–3 on 1d6 night checks."
      },
      {
        "name": "Twilight Grove Emerald Fissures",
        "desc": "Peaceful green crater in center; undead cannot cross the threshold."
      },
      {
        "name": "Rotting Orchard",
        "desc": "Blighted plant life; food foraging is completely impossible."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Perpetual Night Gloom",
        "mod": "+0 DC",
        "effect": "Sun never pierces canopy. Permanent dim light conditions across all hexes."
      },
      {
        "roll": "4–5",
        "name": "Chilling Black Mist",
        "mod": "+2 DC",
        "effect": "Vision reduced to 30 feet. Undead gain +10 feet movement speed."
      },
      {
        "roll": "6",
        "name": "Necrotic Howl",
        "mod": "+4 DC",
        "effect": "Cursed wind echoes through trees. Creatures resting must make DC 14 Wisdom save or gain no benefit from Long Rest."
      }
    ]
  },
  {
    "name": "Redridge Mountains",
    "continent": "Eastern Kingdoms",
    "tagline": "Alpine Lakes and High Crags",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Lake Everstill Waters",
        "desc": "Vast alpine lake; water transport reduces travel time across central hexes."
      },
      {
        "name": "Stonewatch Keep Crags",
        "desc": "Ruined fortress occupied by Orcish warbands; elevated defensive bonus +2 AC."
      },
      {
        "name": "Render's Valley Gnoll Passes",
        "desc": "Narrow canyon passes heavily fortified with primitive wooden barricades."
      },
      {
        "name": "Galardell Valley Slopes",
        "desc": "Steep mountain trails requiring pack mules or climbing gear."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Crisp Alpine Sun",
        "mod": "+0 DC",
        "effect": "Bright clear mountain air. Double vision distance from high peaks."
      },
      {
        "roll": "4–5",
        "name": "Mountain Fog",
        "mod": "+2 DC",
        "effect": "Flanks of the mountains covered in fog. Navigational checks DC +2."
      },
      {
        "roll": "6",
        "name": "Ridge Torrential Rain",
        "mod": "+4 DC",
        "effect": "Rockfalls trigger along mountain paths. DC 14 Dexterity save or take 2d10 bludgeoning damage."
      }
    ]
  },
  {
    "name": "Stranglethorn Vale",
    "continent": "Eastern Kingdoms",
    "tagline": "Dense Tropical Jungle and Sunken Ruins",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Booty Bay Sea Caves",
        "desc": "Pirate harbor carved into coastal cliffs; complete market and maritime access."
      },
      {
        "name": "Gurubashi Sunken Ruins",
        "desc": "Massive ancient troll arenas and ziggurats; rife with shadow magic traps."
      },
      {
        "name": "Nesingwary Safari Camps",
        "desc": "Hunters' enclave offering bounties on exotic jungle beasts."
      },
      {
        "name": "Mistvale Swamps",
        "desc": "Miasmatic coastal marsh; difficult terrain and disease risks."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Oppressive Jungle Heat",
        "mod": "+0 DC",
        "effect": "Sweltering humidity. Armor wearers require double daily water."
      },
      {
        "roll": "4–5",
        "name": "Tropical Monsoons",
        "mod": "+2 DC",
        "effect": "Heavy rain reduces sight to 60 feet. Fire-based spells deal -2 damage."
      },
      {
        "roll": "6",
        "name": "Jungle Deluge Surge",
        "mod": "+4 DC",
        "effect": "Flash floods sweep through valleys. Traversing paths requires DC 15 Athletics check or washed downriver."
      }
    ]
  },
  {
    "name": "Arathi Highlands",
    "continent": "Eastern Kingdoms",
    "tagline": "Pastoral Plateaus and Ruined Castles",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Stromgarde Ruined Fortress",
        "desc": "Decayed stone city divided between urban warfare factions."
      },
      {
        "name": "Circle of East Binding Elemental Stones",
        "desc": "Ancient magical monoliths trapping powerful elemental lords."
      },
      {
        "name": "Go'Shek Farm Hills",
        "desc": "Rolling agricultural fields overrun by Horde forces."
      },
      {
        "name": "Boulderfist Ogre Clefts",
        "desc": "Natural cave networks carved into highland bluffs."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Highland Winds",
        "mod": "+0 DC",
        "effect": "Open clear plains. Ideal conditions for mounted cavalry charges (+10 ft movement)."
      },
      {
        "roll": "4–5",
        "name": "Chilling Highland Drizzle",
        "mod": "+2 DC",
        "effect": "Cold rain dampens clothing. Perception checks suffer -2."
      },
      {
        "roll": "6",
        "name": "Thunderous Gale",
        "mod": "+4 DC",
        "effect": "Flying mounts cannot land or take off safely. Open fires extinguished instantly."
      }
    ]
  },
  {
    "name": "Wetlands",
    "continent": "Eastern Kingdoms",
    "tagline": "Waterlogged Bogs and Sunken Shoreline",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Menethil Harbor Sunken Shoreline",
        "desc": "Flooded port city; water deep enough in streets to require canoes or wading."
      },
      {
        "name": "Sundown Marsh Bogs",
        "desc": "Deep mud pits; land travel speed halved across all non-road hexes."
      },
      {
        "name": "Greenwarden's Grove",
        "desc": "Druidic haven offering dry land and healing supplies."
      },
      {
        "name": "Ironbeard's Tomb Crags",
        "desc": "Highland tombs filled with ancestral dwarven specters."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Murky Swamp Haze",
        "mod": "+0 DC",
        "effect": "Damp, insect-filled air. Foraging yields edible bog roots and clean rainwater."
      },
      {
        "roll": "4–5",
        "name": "Bog Rain & Swarms",
        "mod": "+2 DC",
        "effect": "Biting flies swarm travelers. Concentration checks suffer disadvantage."
      },
      {
        "roll": "6",
        "name": "Tidal Marsh Flood",
        "mod": "+4 DC",
        "effect": "Water levels rise by 3 feet across the zone. All land travel becomes difficult terrain. DC 14 Con save against Swamp Fever."
      }
    ]
  },
  {
    "name": "Hillsbrad Foothills",
    "continent": "Eastern Kingdoms",
    "tagline": "Temperate Rolling Hills and Coastal Pastures",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Durnholde Keep Ruins",
        "desc": "Massive ruined internment castle; ideal fortress base."
      },
      {
        "name": "Azurelode Mine Clefts",
        "desc": "Rich mineral mines contested between human and forsaken miners."
      },
      {
        "name": "Southshore Coastal Strands",
        "desc": "Maritime beachhead with docks and defensive trenches."
      },
      {
        "name": "Tarren Mill Pastures",
        "desc": "Fortified Forsaken apothecary outpost emitting noxious alchemy fumes."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Temperate Coastal Sun",
        "mod": "+0 DC",
        "effect": "Pleasant coastal breeze. Standard resource and travel mechanics."
      },
      {
        "roll": "4–5",
        "name": "Foothill Fog",
        "mod": "+2 DC",
        "effect": "Low clouds obscure mountain slopes. Range of sight reduced to 1 hex."
      },
      {
        "roll": "6",
        "name": "Freezing Rain",
        "mod": "+4 DC",
        "effect": "Wet cold conditions. Disadvantage on Dexterity checks using fine motor skills (e.g., Lockpicking)."
      }
    ]
  },
  {
    "name": "Silverpine Forest",
    "continent": "Eastern Kingdoms",
    "tagline": "Mist-Shrouded Pine Woods and Jagged Coastlines",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Fenris Isle Sunken Ruins",
        "desc": "Lake fortress inhabited by aggressive feral worgen packs."
      },
      {
        "name": "Shadowfang Keep Cliffs",
        "desc": "Imposing dark castle towering over southern mountain pass."
      },
      {
        "name": "Pyrewood Village Shadow Nooks",
        "desc": "Cursed town where citizens transform into worgen at sunset."
      },
      {
        "name": "The Sepulcher Glades",
        "desc": "Crypt-side Forsaken base nestled in evergreen woods."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Grey Pine Mist",
        "mod": "+0 DC",
        "effect": "Dim twilight piercing dense pine branches. Ambient gloom."
      },
      {
        "roll": "4–5",
        "name": "Chilling Lake Fog",
        "mod": "+2 DC",
        "effect": "Heavy mist rolling off Lordamere Lake. Stealth checks gain +2."
      },
      {
        "roll": "6",
        "name": "Worgen Howl Storm",
        "mod": "+4 DC",
        "effect": "High winds carrying eerie curses. DC 14 Wisdom save or frightened during nocturnal random encounters."
      }
    ]
  },
  {
    "name": "Tirisfal Glades",
    "continent": "Eastern Kingdoms",
    "tagline": "Blighted Temperate Woods and Ruins of Lordaeron",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Deathknell Shadow Glades",
        "desc": "Crypt-strewn starting valley for newly raised Forsaken."
      },
      {
        "name": "Brill Pastures",
        "desc": "Pumpkin farms grown in blighted, ash-grey soil."
      },
      {
        "name": "Agamand Mills Farmsteads",
        "desc": "Windmill complexes infested with ancestral haunts and Scourge."
      },
      {
        "name": "Whispering Gardens Nooks",
        "desc": "Arcane glades west of Undercity radiating ancient fey energies."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Pale Blighted Sunlight",
        "mod": "+0 DC",
        "effect": "Sickly yellow sky. Vegetation stunted but navigable."
      },
      {
        "roll": "4–5",
        "name": "Autumnal Miasma",
        "mod": "+2 DC",
        "effect": "Stagnant chilly air. Odor of decay imposes -2 on passive Perception."
      },
      {
        "roll": "6",
        "name": "Scourge Pestilence Drizzle",
        "mod": "+4 DC",
        "effect": "Rain carrying fungal blight. Living creatures must make DC 14 Con save or contract minor illness (cannot heal via Short Rest)."
      }
    ]
  },
  {
    "name": "Western Plaguelands",
    "continent": "Eastern Kingdoms",
    "tagline": "Plagued Wastes and Ruined Farmlands",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Caer Darrow Sunken Isle",
        "desc": "Island fortress housing the Necromantic Academy of Scholomance."
      },
      {
        "name": "Andorhal Ruined Crossroads",
        "desc": "Massive destroyed agricultural hub contested by Scourge, Alliance, and Horde."
      },
      {
        "name": "Felstone Field Blighted Soils",
        "desc": "Cauldron sites boiling plague brews into the atmosphere."
      },
      {
        "name": "Hearthglen Timberlands",
        "desc": "Fortified Crusade bastion nestled in northern pine valleys."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Ash Cloud Sky",
        "mod": "+0 DC",
        "effect": "Heavy grey smog. Plants dead; foraging yields only poisonous matter."
      },
      {
        "roll": "4–5",
        "name": "Plague Cauldron Smoke",
        "mod": "+2 DC",
        "effect": "Cauldron fumes drift across hexes. DC 14 Con save or take 1d8 necrotic damage."
      },
      {
        "roll": "6",
        "name": "Scourge Blight Storm",
        "mod": "+4 DC",
        "effect": "Corrosive necro-ash rain. Unholy energy empowers Undead (+2 to attack rolls and damage)."
      }
    ]
  },
  {
    "name": "Eastern Plaguelands",
    "continent": "Eastern Kingdoms",
    "tagline": "Blighted Corrupted Scourgelands and Plagued Forests",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Stratholme Burning Slag",
        "desc": "Massive ruined metropolis continually burning with holy and unholy fire."
      },
      {
        "name": "Corin's Crossing Toxic Basins",
        "desc": "Flooded central valley filled with infected slime."
      },
      {
        "name": "Tyr's Hand Fortified Heights",
        "desc": "High stone bastion holding out against surrounding Scourge forces."
      },
      {
        "name": "Plaguelands: The Scarlet Enclave",
        "desc": "Eastern sector dominated by Acherus: The Ebon Hold floating overhead."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Crimson Plague Cloud",
        "mod": "+0 DC",
        "effect": "Blood-red skies. Undead sight range doubled."
      },
      {
        "roll": "4–5",
        "name": "Necrotic Gale",
        "mod": "+2 DC",
        "effect": "Freezing deathly winds. Radiance and Holy magic healing reduced by 25%."
      },
      {
        "roll": "6",
        "name": "Death Gate Storm",
        "mod": "+4 DC",
        "effect": "Unholy atmospheric rupture. Random Scourge patrol spawns instantly on a roll of 1–4 on 1d6 every hour."
      }
    ]
  },
  {
    "name": "Badlands",
    "continent": "Eastern Kingdoms",
    "tagline": "Arid Badlands and Canyons",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Dustbowl Salt Flats",
        "desc": "Flat parched earth; line of sight extends up to 4 hexes."
      },
      {
        "name": "Uldaman Titan Digsites",
        "desc": "Ancient Titan vault buried beneath red clay canyons."
      },
      {
        "name": "Lethlor Ravine Dragon Roosts",
        "desc": "Black dragonflight nesting grounds carved into high cliff walls."
      },
      {
        "name": "Kargath Clefts",
        "desc": "Horde outpost built atop narrow sandstone ridges."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Sun-Baking Canyon Heat",
        "mod": "+0 DC",
        "effect": "Extreme arid heat. Daily water consumption doubled."
      },
      {
        "roll": "4–5",
        "name": "Red Clay Dust Storm",
        "mod": "+2 DC",
        "effect": "Red dust coats optics and armor. Perception checks made with disadvantage."
      },
      {
        "roll": "6",
        "name": "Ridge Flash Flood",
        "mod": "+4 DC",
        "effect": "Torrential rain sweeps red mud down canyons. Halves all land movement. DC 15 Dex save to avoid gear loss."
      }
    ]
  },
  {
    "name": "Searing Gorge",
    "continent": "Eastern Kingdoms",
    "tagline": "Volcanic Ash Basins and Slag Pits",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Slag Pit Molten Fissures",
        "desc": "Vast dark iron mining pit filled with molten lava channels."
      },
      {
        "name": "Thorium Point Iron Ridges",
        "desc": "High basalt overlook occupied by Thorium Brotherhood armorers."
      },
      {
        "name": "The Cauldron Lava Lakes",
        "desc": "Central crater radiating continuous severe heat."
      },
      {
        "name": "Firewatch Ridge",
        "desc": "Elevated ridge monitored by fire elemental lords."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Choking Volcanic Ash",
        "mod": "+0 DC",
        "effect": "Permanent smoke haze. Breathing requires cloth wrappings or DC 12 Con save."
      },
      {
        "roll": "4–5",
        "name": "Sulfur Gale",
        "mod": "+2 DC",
        "effect": "Acidic sulfur fumes. Eyes burn; disadvantage on ranged attacks beyond 30 feet."
      },
      {
        "roll": "6",
        "name": "Magma Eruption Fallout",
        "mod": "+4 DC",
        "effect": "Molten rocks rain down from Blackrock Mountain. Random fiery impact deals 3d10 fire damage to party (DC 15 Dex save for half)."
      }
    ]
  },
  {
    "name": "Burning Steppes",
    "continent": "Eastern Kingdoms",
    "tagline": "Scorched Volcanic Wastes and Dragon Roosts",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Blackrock Mountain Slag Gates",
        "desc": "Massive mountain portal connecting to Blackrock Spire and Depths."
      },
      {
        "name": "Morgan's Vigil Heights",
        "desc": "High Alliance outpost overlooking the scorched plains."
      },
      {
        "name": "Dreadmaul Rock Clefts",
        "desc": "High volcanic monolith occupied by firegut ogres."
      },
      {
        "name": "Altar of Storms Fel Fissures",
        "desc": "Volcanic rift leaking dark ley energy."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Scorched Ash Winds",
        "mod": "+0 DC",
        "effect": "Intense ground heat. Bare skin contact with ground causes 1 fire damage per minute."
      },
      {
        "roll": "4–5",
        "name": "Ash Blizzard",
        "mod": "+2 DC",
        "effect": "Dense black ash falls like snow. Vision reduced to 30 feet."
      },
      {
        "roll": "6",
        "name": "Fiery Heatwave Shockwave",
        "mod": "+4 DC",
        "effect": "Extreme volcanic shockwave. DC 16 Con save or gain 2 levels of Exhaustion from heat prostration."
      }
    ]
  },
  {
    "name": "Swamp of Sorrows",
    "continent": "Eastern Kingdoms",
    "tagline": "Murky Swamps and Stagnant Bogs",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Sunken Temple (Atal'Hakkar) Bogs",
        "desc": "Submerged troll temple surrounded by poisonous waters."
      },
      {
        "name": "Sorrowmurk Marshes",
        "desc": "Coastal marshlands crawling with green dragonkin and mud crawlers."
      },
      {
        "name": "Stonard Outpost",
        "desc": "Orcish outpost built with heavy timber stockades."
      },
      {
        "name": "Misty Reed Coast",
        "desc": "Foggy beach line littered with flotsam and aquatic predators."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Heavy Stagnant Humidity",
        "mod": "+0 DC",
        "effect": "Thick damp air. Food spoils in 24 hours unless magically preserved."
      },
      {
        "roll": "4–5",
        "name": "Swamp Gas Fog",
        "mod": "+2 DC",
        "effect": "Flammable gas clouds drift across hexes. Open flames trigger 2d6 fire explosions in 10-foot radius."
      },
      {
        "roll": "6",
        "name": "Torrential Downpour",
        "mod": "+4 DC",
        "effect": "Water levels surge. Trail navigation impossible without a guide (DC 18 Survival)."
      }
    ]
  },
  {
    "name": "Blasted Lands",
    "continent": "Eastern Kingdoms",
    "tagline": "Ley-Warped Red Desert Wastes",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "The Dark Portal Fel Fissures",
        "desc": "Massive interdimensional gateway radiating demonic magic."
      },
      {
        "name": "Serpent's Coil Clefts",
        "desc": "Deep red sandstone ravines infested with fel-corrupted beasts."
      },
      {
        "name": "Tainted Scar Demon Basins",
        "desc": "Crater inhabited by high-level pit lords and doomguard commanders."
      },
      {
        "name": "Nethergarde Crags",
        "desc": "High stone fortress overlooking the portal pass."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Red Fel Sky Glow",
        "mod": "+0 DC",
        "effect": "Arid, blood-tinted desert. Water sources completely absent."
      },
      {
        "roll": "4–5",
        "name": "Ley-Warp Dust Gale",
        "mod": "+2 DC",
        "effect": "Arcane static distorts senses. Disadvantage on Arcana and Perception checks."
      },
      {
        "roll": "6",
        "name": "Fel Electrical Tempest",
        "mod": "+4 DC",
        "effect": "Green lightning strikes terrain. Spells casting fire or lightning deal maximum damage, but caster takes 1d10 force damage."
      }
    ]
  },
  {
    "name": "Eversong Woods",
    "continent": "Eastern Kingdoms",
    "tagline": "Arcane-Infused Golden Forests",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Sunstrider Isle Founts",
        "desc": "Golden forest sanctuary containing arcane training academies."
      },
      {
        "name": "Tor'Watha Troll Ruins",
        "desc": "Amani troll camps encroaching on southern elven borders."
      },
      {
        "name": "Falconwing Square Glades",
        "desc": "Tranquil blood elven village offering full hospitality."
      },
      {
        "name": "The Dead Scar Corrupted Soil",
        "desc": "Unholy scorched trench bisecting the zone; dead land grants zero foraging."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Eternal Autumn Sun",
        "mod": "+0 DC",
        "effect": "Magical eternal spring/autumn. Bright sunlight constantly."
      },
      {
        "roll": "4–5",
        "name": "Arcane Pollen Mist",
        "mod": "+2 DC",
        "effect": "Golden leaves fall heavily. Passive Perception checks suffer -2."
      },
      {
        "roll": "6",
        "name": "Ley Shield Surge",
        "mod": "+4 DC",
        "effect": "Arcane shields fluctuate. Spellcasters gain +1 to spell save DCs for 24 hours."
      }
    ]
  },
  {
    "name": "Ghostlands",
    "continent": "Eastern Kingdoms",
    "tagline": "Blighted Forest and Scourge Corridors",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Tranquillien Shadow Nooks",
        "desc": "Fortified joint Forsaken/Blood Elf refuge town."
      },
      {
        "name": "Deatholme Scourge Stronghold",
        "desc": "Massive southern fortress hosting Scourge lords."
      },
      {
        "name": "Amani Pass Troll Ruins",
        "desc": "Mountain paths leading toward Zul'Aman."
      },
      {
        "name": "Windrunner Spire Glades",
        "desc": "Ghostly ancestral estate haunted by banshees."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Gloomy Twilight Rain",
        "mod": "+0 DC",
        "effect": "Constant overcast gloom. Light rain creates damp gear."
      },
      {
        "roll": "4–5",
        "name": "Blighted Mist",
        "mod": "+2 DC",
        "effect": "Vision restricted to 60 feet. Undead stealth checks gain +4."
      },
      {
        "roll": "6",
        "name": "Wail of the Banshee Wind",
        "mod": "+4 DC",
        "effect": "Supernaturally cold gale. Non-evil creatures take 1d6 psychic damage every 4 hours of travel."
      }
    ]
  },
  {
    "name": "Dun Morogh",
    "continent": "Eastern Kingdoms",
    "tagline": "Snowy Subarctic Hills and Mountain Crags",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Kharanos Snowy Passes",
        "desc": "Central valley hub housing breweries and dwarven inns."
      },
      {
        "name": "Ironforge Mountain Slopes",
        "desc": "Imposing stone gates carved directly into high mountain peaks."
      },
      {
        "name": "Brewnall Village Lakes",
        "desc": "Frozen alpine lakes supporting ice fishing."
      },
      {
        "name": "Gol'Bolar Quarry Digsites",
        "desc": "Deep stone quarry infested with trogg excavations."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Crisp Snowfall",
        "mod": "+0 DC",
        "effect": "Fresh snow blanket. Tracking checks gain advantage."
      },
      {
        "roll": "4–5",
        "name": "Alpine Squall",
        "mod": "+2 DC",
        "effect": "High winds create drift banks. Halves unmounted travel speed."
      },
      {
        "roll": "6",
        "name": "Ironforge Mountain Blizzard",
        "mod": "+4 DC",
        "effect": "Extreme cold blizzard. Cold gear mandatory; DC 14 Con save to prevent frostbite."
      }
    ]
  },
  {
    "name": "Loch Modan",
    "continent": "Eastern Kingdoms",
    "tagline": "Pastoral Alpine Lake Basins",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "The Loch Waters",
        "desc": "Massive freshwater body ideal for boat transport across the zone."
      },
      {
        "name": "Stonewrought Dam Crags",
        "desc": "Monumental dwarven dam engineering feat connecting to Wetlands."
      },
      {
        "name": "Mo'grosh Stronghold Clefts",
        "desc": "Dense forested hills occupied by aggressive ogre clans."
      },
      {
        "name": "Valley of Kings Sculpted Cliffs",
        "desc": "Monumental dwarven statues flanking southern mountain pass."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Clear Mountain Sun",
        "mod": "+0 DC",
        "effect": "Gentle mountain breezes. Advantage on daily foraging checks."
      },
      {
        "roll": "4–5",
        "name": "Lake Fog",
        "mod": "+2 DC",
        "effect": "Mist rolls off the Loch. Visibility limited to 2 hexes."
      },
      {
        "roll": "6",
        "name": "Alpine Thunderstorm",
        "mod": "+4 DC",
        "effect": "Torrential rain and high winds. Boat travel across the Loch requires DC 15 Water Vehicles check."
      }
    ]
  },
  {
    "name": "The Hinterlands",
    "continent": "Eastern Kingdoms",
    "tagline": "High Temperate Highlands and Ancient Forests",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Seradane Emerald Portal Glades",
        "desc": "Great tree housing an Emerald Dream portal guarded by green dragons."
      },
      {
        "name": "Jintha'Alor Troll Temple Terraces",
        "desc": "Massive multi-tiered forest troll city."
      },
      {
        "name": "Aerie Peak Gryphon Heights",
        "desc": "Dwarven wildhammer roost tower providing aerial transport."
      },
      {
        "name": "Wildhammer Highlands",
        "desc": "High forest plateaus teeming with wild game."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "High Highland Sun",
        "mod": "+0 DC",
        "effect": "Crisp elevated mountain air. Ideal flight conditions for wild gryphons."
      },
      {
        "roll": "4–5",
        "name": "Forest Canopy Rain",
        "mod": "+2 DC",
        "effect": "Dense leaf dripping creates wet terrain. Fire starting DC +2."
      },
      {
        "roll": "6",
        "name": "Gale Force Mountain Storm",
        "mod": "+4 DC",
        "effect": "High winds blow off cliffsides. Ranged weapon fire impossible."
      }
    ]
  },
  {
    "name": "Deadwind Pass",
    "continent": "Eastern Kingdoms",
    "tagline": "Cursed Shadow Ravines and Ley-Rifts",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Karazhan Tower Spire",
        "desc": "Medivh's ancient arcane tower radiating chaotic magical energy."
      },
      {
        "name": "Vicewind Canyon Clefts",
        "desc": "Deep sterile stone ravines devoid of all life and sound."
      },
      {
        "name": "Deadman's Crossing Shadow Nooks",
        "desc": "Haunted ruined village populated by specters."
      },
      {
        "name": "The Ravaged Square",
        "desc": "Ley-line rift nexus where gravity occasionally wavers."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Unnatural Dead Silence",
        "mod": "+0 DC",
        "effect": "No wind or animal noise. Unsettling quiet causes -2 on Morale checks."
      },
      {
        "roll": "4–5",
        "name": "Ley Static Fog",
        "mod": "+2 DC",
        "effect": "Purple mist distorts vision. Spells cast trigger wild magic surge on roll of 1 on 1d20."
      },
      {
        "roll": "6",
        "name": "Gravitational Distortion Storm",
        "mod": "+4 DC",
        "effect": "Gravity shifts randomly. Fall damage doubled. Movement speed randomized (1d4 × 10 feet)."
      }
    ]
  },
  {
    "name": "Isle of Quel'Danas",
    "continent": "Eastern Kingdoms",
    "tagline": "Arcane Coastal Isle and Fel Warzones",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Sunwell Plateau Arcane Basin",
        "desc": "Holy/arcane fountain crater at center of the island."
      },
      {
        "name": "Dawnstar Village Sunken Ruins",
        "desc": "Ruined elven coastal settlement occupied by fel-elves."
      },
      {
        "name": "Shattered Sun Staging Area",
        "desc": "Fortified joint expeditionary base."
      },
      {
        "name": "Greengill Coast Tidepools",
        "desc": "Murloc infested beaches along northern reefs."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Arcane Glowing Skies",
        "mod": "+0 DC",
        "effect": "Constant shimmering twilight. Arcana checks gain +2."
      },
      {
        "roll": "4–5",
        "name": "Coastal Ash Rain",
        "mod": "+2 DC",
        "effect": "Demonic naval bombardment debris falls. Lightly obscured."
      },
      {
        "roll": "6",
        "name": "Fel Bombardment Gale",
        "mod": "+4 DC",
        "effect": "Active siege conditions. Random artillery impact checks every 2 hours (4d10 fire/force damage, DC 15 Dex save for half)."
      }
    ]
  },
  {
    "name": "Hellfire Peninsula",
    "continent": "Outland",
    "tagline": "Shattered Red Fel-Wastes",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Hellfire Citadel Iron Scars",
        "desc": "Massive iron fortress straddling the main central thoroughfare."
      },
      {
        "name": "Path of Glory Bone Paves",
        "desc": "Road paved entirely with draenei bones; necrotic energy lingers."
      },
      {
        "name": "Expedition Armory Clefts",
        "desc": "Ruined defensive fortifications occupied by unholy spirits."
      },
      {
        "name": "Pools of Aggonar Acid Basins",
        "desc": "Green acid pools created by decaying demon lord remains; touching acid inflicts 4d10 acid damage."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Scorching Fel Wind",
        "mod": "+0 DC",
        "effect": "Red sky with floating nether debris. Unprotected water evaporates 50% faster."
      },
      {
        "roll": "4–5",
        "name": "Red Sandstorm",
        "mod": "+2 DC",
        "effect": "Abrasive red dust storm. Vision limited to 30 feet. Ranged attacks suffer disadvantage."
      },
      {
        "roll": "6",
        "name": "Nether Shockwave",
        "mod": "+4 DC",
        "effect": "Planetary tears discharge nether energy. Non-demons take 1d8 force damage per hour traveled outdoors."
      }
    ]
  },
  {
    "name": "Zangarmarsh",
    "continent": "Outland",
    "tagline": "Bioluminescent Fungal Swamps",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Coilfang Reservoir Sunken Drain",
        "desc": "Deep lake trench housing Naga pumping facilities."
      },
      {
        "name": "Marshlight Lake Fungal Spores",
        "desc": "Giant glowing mushroom forests granting dim illumination across all hexes."
      },
      {
        "name": "Sporeggar Spore Glades",
        "desc": "Peaceful sporeling village nestled inside giant mushroom stalks."
      },
      {
        "name": "Ango'rosh Ogre Bogs",
        "desc": "Heavy marsh camps populated by blue ogres."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Bioluminescent Drizzle",
        "mod": "+0 DC",
        "effect": "Soft glowing rain. High humidity negates dry campfire creation without oil."
      },
      {
        "roll": "4–5",
        "name": "Spore Cloud Fog",
        "mod": "+2 DC",
        "effect": "Dense fungal spores fill the air. DC 12 Con save or poisoned for 4 hours."
      },
      {
        "roll": "6",
        "name": "Fungal Spore Burst",
        "mod": "+4 DC",
        "effect": "Explosive spore burst across zone. Visibility heavily obscured. Poison damage spells deal +1d6 damage."
      }
    ]
  },
  {
    "name": "Terokkar Forest",
    "continent": "Outland",
    "tagline": "Ancient Boreal Woods and Bone Wastes",
    "biome": "Mild (DC 10 Forest) / Harsh (DC 14 Bone Wastes)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Auchindoun Ossuary Ruins",
        "desc": "Massive exploded mausoleum crater at the center of the desert ring."
      },
      {
        "name": "Skettis High Tree Canopy",
        "desc": "Elevated avian civilization built into upper branches of giant trees."
      },
      {
        "name": "Allerian Stronghold Glades",
        "desc": "Alliance timber fortress situated in leafy northern woods."
      },
      {
        "name": "Tuurem Sunken Ruins",
        "desc": "Broken draenei river town occupied by broken and shadow council cultists."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Canopy Twilight",
        "mod": "+0 DC",
        "effect": "Gentle breeze through high purple-leafed trees."
      },
      {
        "roll": "4–5",
        "name": "Bone Dust Wind",
        "mod": "+2 DC",
        "effect": "White ash wind inside the Bone Wastes. Eyes sting; Perception checks suffer -2."
      },
      {
        "roll": "6",
        "name": "Void Echo Storm",
        "mod": "+4 DC",
        "effect": "Shadow energy leaks from Auchindoun. Radiance and Healing magic reduced by half. Undead gain advantage on saves."
      }
    ]
  },
  {
    "name": "Nagrand",
    "continent": "Outland",
    "tagline": "Floating Islands and Verdant Savanna",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Elemental Plateau Ley-Founts",
        "desc": "Elevated mountain plateau teeming with primal fire, earth, air, and water elementals."
      },
      {
        "name": "Oshu'gun Diamond Monolith",
        "desc": "Enormous white crystal mountain radiating pure holy light."
      },
      {
        "name": "Garadar Savanna Hills",
        "desc": "Fortified Orcish village built on grassy knolls."
      },
      {
        "name": "Sunspring Post River Basins",
        "desc": "Clear freshwater rivers supporting abundant hunting and fishing."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Pristine Prairie Sunlight",
        "mod": "+0 DC",
        "effect": "Perfect clear weather. Mounted speed increased by +10 feet."
      },
      {
        "roll": "4–5",
        "name": "Highland Breeze",
        "mod": "+2 DC",
        "effect": "Light gusts gently rock floating islands. Perception checks relying on hearing gain +2."
      },
      {
        "roll": "6",
        "name": "Elemental Convergence Storm",
        "mod": "+4 DC",
        "effect": "Primal elemental energy storms. Spellcasters roll 1d4: 1-Fire, 2-Water, 3-Earth, 4-Air; corresponding spell types deal +2d6 damage today."
      }
    ]
  },
  {
    "name": "Blade's Edge Mountains",
    "continent": "Outland",
    "tagline": "Jagged Canyon Spikes and Wind-Swept Ravines",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Circle of Blood Clefts",
        "desc": "Natural stone amphitheater used for gladiatorial combat."
      },
      {
        "name": "Ogri'la Crystal Plateaus",
        "desc": "High mountain plateau inhabited by enlightened apexis crystal ogres."
      },
      {
        "name": "Vortex Pinnacle Winds",
        "desc": "High-altitude cliff tops subject to violent upward wind shears."
      },
      {
        "name": "Ruuan Weald Canopy",
        "desc": "Dense green pocket jungle nestled deep within jagged granite peaks."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Jagged Shadow Light",
        "mod": "+0 DC",
        "effect": "Sharp canyon shadows. Flying mounts travel at half speed due to spike obstacles."
      },
      {
        "roll": "4–5",
        "name": "Canyon Drag Winds",
        "mod": "+2 DC",
        "effect": "Sudden gusts push travelers near edges. DC 12 Athletics check to avoid falling off narrow trails."
      },
      {
        "roll": "6",
        "name": "Rockfall Gale",
        "mod": "+4 DC",
        "effect": "Stone spikes collapse down canyons. DC 15 Dexterity save or take 3d10 bludgeoning damage."
      }
    ]
  },
  {
    "name": "Netherstorm",
    "continent": "Outland",
    "tagline": "Shattered Arcane Ley-Wastes and Mana-Forges",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Mana-Forge Ara Ley-Spires",
        "desc": "Siphoning towers drawing raw magic directly from the twisted nether."
      },
      {
        "name": "Tempest Keep Floating Bio-Domes",
        "desc": "Sealed environmental spheres containing verdant plant life amidst floating purple rock shards."
      },
      {
        "name": "Kirin'Var Sunken Village",
        "desc": "Ghost-infested Kirin Tor town suspended over the void."
      },
      {
        "name": "Eco-Dome Farfield Havens",
        "desc": "Protected magical domes where normal mild weather mechanics apply."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Shimmering Purple Void",
        "mod": "+0 DC",
        "effect": "Constant purple glow from nether storms. No natural darkness."
      },
      {
        "roll": "4–5",
        "name": "Mana Discharge",
        "mod": "+2 DC",
        "effect": "Ambient magic causes spellcasters to lose one 1st-level spell slot during long rest unless inside an Eco-Dome."
      },
      {
        "roll": "6",
        "name": "Ley-Line Rupture Storm",
        "mod": "+4 DC",
        "effect": "Raw arcane lightning sweeps across land. Unprotected creatures take 2d6 force damage per hour. Wild magic surges occur on all spellcasts."
      }
    ]
  },
  {
    "name": "Shadowmoon Valley",
    "continent": "Outland",
    "tagline": "Fel Volcanic Wastes and Nether-Scarred Plains",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Black Temple Fel Citadel",
        "desc": "Massive ancient draenei temple converted into Illidan's central seat of power."
      },
      {
        "name": "Hand of Gul'dan Lava Fissures",
        "desc": "Volcanic rift leaking green fel-fire across central plain."
      },
      {
        "name": "Netherwing Ledge Crystal Slags",
        "desc": "Floating dragon-breeding island rich in rare nether-crystals."
      },
      {
        "name": "Warden's Cage Shadow Nooks",
        "desc": "Underground holding vaults carved into subterranean stone."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Fel Volcano Smog",
        "mod": "+0 DC",
        "effect": "Constant green ash sky. Natural water nonexistent."
      },
      {
        "roll": "4–5",
        "name": "Green Fel-Fire Rain",
        "mod": "+2 DC",
        "effect": "Falling droplets burn skin. Uncovered travelers take 1d6 fire damage per 2 hours traveled."
      },
      {
        "roll": "6",
        "name": "Shadowmoon Eruption",
        "mod": "+4 DC",
        "effect": "Severe volcanicquake. Fel-lava erupts in random hexes. Land navigation checks made with disadvantage."
      }
    ]
  },
  {
    "name": "Borean Tundra",
    "continent": "Northrend",
    "tagline": "Subarctic Tundra, Tundra Steppes, and Ice Floes",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Coldarra Arcane Spires",
        "desc": "Isolated frozen island surrounded by floating arcane rings and blue dragonflight magic."
      },
      {
        "name": "Warsong Hold Iron Basins",
        "desc": "Massive Horde iron fortress providing full blacksmithing and military logistics."
      },
      {
        "name": "Fizzcrank Pumping Station Oil Sinks",
        "desc": "Gnome mechanicalworks leaking hot machine oil over tundra pools."
      },
      {
        "name": "Riplash Strand Tidal Ice",
        "desc": "Coastal ice floes inhabited by aggressive Kvaldir sea-vrykul."
      }
    ],
    "callouts": [
      {
        "kind": "DANGER",
        "title": "Freezing Coastal Waters",
        "text": "Submerging in the waters of the Riplash Strand or Coldarra chasm causes 2d10 cold damage per round. A creature spending more than 3 rounds in these waters automatically incurs 1 level of Exhaustion."
      }
    ],
    "weather": [
      {
        "roll": "1–3",
        "name": "Freezing Clear Light",
        "mod": "+0 DC",
        "effect": "Cold, crisp conditions. Vision extends to 3 hexes across open tundra plains."
      },
      {
        "roll": "4–5",
        "name": "Tundra Sleet Squall",
        "mod": "+2 DC",
        "effect": "Freezing sleet coats ground in ice. Unpaved ground becomes difficult terrain."
      },
      {
        "roll": "6",
        "name": "Arctic Gale Blizzard",
        "mod": "+4 DC",
        "effect": "Visiblity heavily obscured. Disadvantage on Perception checks and ranged attacks. Daily DC 18 Con save against frostbite (1d8 cold damage per hour)."
      }
    ]
  },
  {
    "name": "Howling Fjord",
    "continent": "Northrend",
    "tagline": "Coastal Fjords, Boreal Redwood Forests, and Vrykul Cliffs",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Utgarde Keep Vrykul Cliffs",
        "desc": "Monumental stone fortress towering over central fjord cliffs."
      },
      {
        "name": "Kamagua Tuskarr Beaches",
        "desc": "Peaceful walrus-person coastal village offering turtle-boat transit."
      },
      {
        "name": "Whispering Gulch Echo Clefts",
        "desc": "Deep canyon filled with Old God insanity whispers; DC 12 Wis save or short-term madness."
      },
      {
        "name": "Gjalerbron Vrykul Tombs",
        "desc": "Ancient slumber chambers where iron and frost vrykul awaken."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Crisp Fjord Sunlight",
        "mod": "+0 DC",
        "effect": "Clear skies across coastal bluffs. Advantage on Navigation from high peaks."
      },
      {
        "roll": "4–5",
        "name": "Sea Fog & Drizzle",
        "mod": "+2 DC",
        "effect": "Dense fog rolls down from cliffs. Flying mounts travel at half speed."
      },
      {
        "roll": "6",
        "name": "Fjord Gale Storm",
        "mod": "+4 DC",
        "effect": "Coastal storm surges. Ships must dock or face capsize checks (DC 16 Water Vehicles). Ranged attacks suffer disadvantage."
      }
    ]
  },
  {
    "name": "Dragonblight",
    "continent": "Northrend",
    "tagline": "Glacial Dragon Graveyards and Frozen Waste",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Wyrmrest Temple Titan Spire",
        "desc": "Massive central titan tower serving as neutral dragonflight headquarters."
      },
      {
        "name": "Wrathgate Scarred Trench",
        "desc": "Blighted canyon trench lingering from plague and dragonfire bombardment."
      },
      {
        "name": "Emerald Dragonshrine Nooks",
        "desc": "Verdant forested oasis amid snowfields granting rapid natural healing."
      },
      {
        "name": "Azjol-Nerub Sinkholes",
        "desc": "Massive subterranean openings revealing underground nerubian kingdom."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Overcast Frost Light",
        "mod": "+0 DC",
        "effect": "Cold sub-zero temperatures. Tracking dragonkin/undead gains +2."
      },
      {
        "roll": "4–5",
        "name": "Dragonblight Powder Squall",
        "mod": "+2 DC",
        "effect": "High winds blow loose bone ash and snow. Lightly obscured."
      },
      {
        "roll": "6",
        "name": "Blighted Froststorm",
        "mod": "+4 DC",
        "effect": "Unnatural cold infused with necrotic remnants. Short rests grant no healing unless inside Wyrmrest Temple."
      }
    ]
  },
  {
    "name": "Grizzly Hills",
    "continent": "Northrend",
    "tagline": "Boreal Redwood Forests and Mountain Rivers",
    "biome": "Mild (Baseline DC 10)",
    "severity": "mild",
    "baselineDC": 10,
    "subfeatures": [
      {
        "name": "Grizzlemaw Hollowed Tree Ruins",
        "desc": "Fallen ancient world tree trunk turned into furbolg stronghold city."
      },
      {
        "name": "Thor Modan Titan Iron Digs",
        "desc": "Ruined titan city excavated by iron dwarves along northern river gorge."
      },
      {
        "name": "Blue Sky Logging Pits",
        "desc": "Venture Co. logging camp filled with sawmills and flume rides."
      },
      {
        "name": "Drak'Tharon Keep Overlook",
        "desc": "Imposing troll fortress guarding northern pass into Zul'Drak."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Crisp Boreal Sunlight",
        "mod": "+0 DC",
        "effect": "Ideal traveling weather through redwood canopy. Advantage on daily Survival foraging."
      },
      {
        "roll": "4–5",
        "name": "Pine Forest Rain",
        "mod": "+2 DC",
        "effect": "Heavy rain dampens brush. Unmounted travel pace reduced by 5 feet."
      },
      {
        "roll": "6",
        "name": "Mountain Timber Squall",
        "mod": "+4 DC",
        "effect": "High winds cause falling branches. DC 14 Dexterity save or take 2d8 bludgeoning damage while traveling forest hexes."
      }
    ]
  },
  {
    "name": "Zul'Drak",
    "continent": "Northrend",
    "tagline": "Plagued Troll Ziggurats and Frozen Necropolises",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Gundrak Temple Terraces",
        "desc": "Massive capital fortress of the Drakkari ice trolls."
      },
      {
        "name": "Amphitheater of Anguish Pits",
        "desc": "Gladiatorial pit where champions fight legendary beasts."
      },
      {
        "name": "Voltaris Necropolis Spires",
        "desc": "Floating Scourge citadel raining unholy magic onto surrounding steps."
      },
      {
        "name": "Altar of Har'koa Glades",
        "desc": "Shrine of the snow leopard loa offering holy protection."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Sickly Frozen Gloom",
        "mod": "+0 DC",
        "effect": "Freezing temperatures with black ash clouds. Dead soil; foraging impossible."
      },
      {
        "roll": "4–5",
        "name": "Sleet & Necrotic Fog",
        "mod": "+2 DC",
        "effect": "Ice fog covers stone steps. Walking speed halved on ziggurat stairs."
      },
      {
        "roll": "6",
        "name": "Blood-Frost Blizzard",
        "mod": "+4 DC",
        "effect": "Frozen blood rain falls. Non-undead take 1d6 cold and 1d6 necrotic damage per 4 hours traveled outdoors."
      }
    ]
  },
  {
    "name": "Sholazar Basin",
    "continent": "Northrend",
    "tagline": "Primeval Tropical Crater Basin",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "River-Makers Titan Waygate",
        "desc": "Ancient Titan archway connecting directly to Un'Goro Crater waygate."
      },
      {
        "name": "Wildgrowth Canopy",
        "desc": "Lush tropical jungle inhabited by Wolvar and Oracles tribes."
      },
      {
        "name": "Avalanche Ravine Slag",
        "desc": "Scorched gap where Scourge undead broke through the crater wall."
      },
      {
        "name": "Maker's Perch Titan Pylons",
        "desc": "Glowing Titan crystals maintaining tropical climate amid arctic Northrend."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Steamy Tropical Heat",
        "mod": "+0 DC",
        "effect": "High humidity completely contrasting surrounded arctic zones. Double water loss."
      },
      {
        "roll": "4–5",
        "name": "Basin Downpour",
        "mod": "+2 DC",
        "effect": "Torrential rain fills riverbed paths. Swim checks required at river crossings (DC 14 Athletics)."
      },
      {
        "roll": "6",
        "name": "Titan Shield Fluctuation",
        "mod": "+4 DC",
        "effect": "Pylon energy wavers. Random atmospheric electrical arcs deal 2d10 lightning damage to highest party member (DC 15 Dex save for half)."
      }
    ]
  },
  {
    "name": "Storm Peaks",
    "continent": "Northrend",
    "tagline": "Alpine Glacial Titan Peaks and Precipices",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Ulduar Titan Precipices",
        "desc": "Monumental Titan city-raid complex carved into northernmost peaks."
      },
      {
        "name": "Dun Nifflem Frost Giant Basins",
        "desc": "Frozen canyon home of the Sons of Hodir giant faction."
      },
      {
        "name": "Temple of Storms Heights",
        "desc": "Highest mountain peak on Azeroth where Thorim resides."
      },
      {
        "name": "Brunnhildar Village Ice Clefts",
        "desc": "Vrykul warrior women village carved into sheer glacier walls."
      }
    ],
    "callouts": [
      {
        "kind": "WARNING",
        "title": "Extreme Verticality and Flight Hazards",
        "text": "Traversing the Storm Peaks requires flying mounts or specialized climbing gear across 80% of its hexes. Land mounts without climbing support move at 1/4 standard speed."
      }
    ],
    "weather": [
      {
        "roll": "1–3",
        "name": "Glacial Starlight",
        "mod": "+0 DC",
        "effect": "Sub-zero arctic air. Clear vision up to 5 hexes from elevated peaks."
      },
      {
        "roll": "4–5",
        "name": "Mountain Sheer Winds",
        "mod": "+2 DC",
        "effect": "Powerful updrafts. Flying mounts suffer -10 feet speed and -2 to Dexterity saves."
      },
      {
        "roll": "6",
        "name": "Screaming Titan Blizzard",
        "mod": "+4 DC",
        "effect": "Visiblity zero. Flying mounts grounded. Unprotected exposure inflicts 2d6 cold damage per hour and 1 level of Exhaustion every 4 hours."
      }
    ]
  },
  {
    "name": "Icecrown",
    "continent": "Northrend",
    "tagline": "Glacial Scourge Citadel and Frozen Wastes",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Icecrown Citadel Citadel Gates",
        "desc": "Imposing saronite fortress housing the Frozen Throne at its pinnacle."
      },
      {
        "name": "Argent Tournament Grounds",
        "desc": "Fortified neutral tournament staging ground in northeast corner."
      },
      {
        "name": "Corprethar Breach",
        "desc": "Massive saronite rampart wall dividing southern approach."
      },
      {
        "name": "Aldur'thar Scourge Forges",
        "desc": "Saronite mining pits refining dark mineral for Scourge warmachines."
      }
    ],
    "callouts": [
      {
        "kind": "DANGER",
        "title": "Saronite Radiation",
        "text": "Prolonged exposure to raw saronite mineral veins in Icecrown causes psychological deterioration. Spending more than 24 hours near open saronite mines requires a DC 16 Wisdom save or suffer short-term madness."
      }
    ],
    "weather": [
      {
        "roll": "1–3",
        "name": "Desolate Arctic Night",
        "mod": "+0 DC",
        "effect": "Sun never pierces black clouds. Ambient darkness across all hexes."
      },
      {
        "roll": "4–5",
        "name": "Saronite Dust Wind",
        "mod": "+2 DC",
        "effect": "Black mineral dust blows in wind. Concentration checks on magic suffer disadvantage."
      },
      {
        "roll": "6",
        "name": "Scourge Lich-King Blizzard",
        "mod": "+4 DC",
        "effect": "Unholy glacial tempest. Vision zero. Non-undead suffer disadvantage on all attack rolls and saving throws. Radiant damage suppressed by half."
      }
    ]
  },
  {
    "name": "Crystalsong Forest",
    "continent": "Northrend",
    "tagline": "Crystalline Enchanted Woods and Sunken Elven Ruins",
    "biome": "Mild (DC 10 Crystalline Forest) / Deadly (DC 18 Great Conflagration Ruins)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Dalaran Crater Overlook",
        "desc": "Position directly beneath the floating mage sanctuary city of Dalaran."
      },
      {
        "name": "Violet Stand Ley-Glades",
        "desc": "Kirin Tor outpost monitoring regional ley-line flows."
      },
      {
        "name": "Sunreaver Command Spires",
        "desc": "Horde staging encampment built amidst glowing glass trees."
      },
      {
        "name": "Ruins of Shandaral Crystalline Vaults",
        "desc": "Ancient Highborne city transformed into solid crystal during dragon war."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Prism Sunlight Glow",
        "mod": "+0 DC",
        "effect": "Sunlight refracts through glass trees. Illumination bright across all hours."
      },
      {
        "roll": "4–5",
        "name": "Crystalline Dust Mist",
        "mod": "+2 DC",
        "effect": "Fine glass powder falls from leaves. Stealth checks gain +2 due to light refraction."
      },
      {
        "roll": "6",
        "name": "Arcane Resonance Surge",
        "mod": "+4 DC",
        "effect": "Crystals sing with magic. All spells cast gain +1 level upcast effect, but trigger wild magic roll on 1–3 on 1d6."
      }
    ]
  },
  {
    "name": "Wintergrasp",
    "continent": "Northrend",
    "tagline": "Alpine Battleground and Glacial Siege Wastes",
    "biome": "Harsh (DC 14 Alpine) / Deadly (DC 18 Siege Wastes)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Wintergrasp Fortress Titan Vault",
        "desc": "Massive central keep housing Vault of Archavon."
      },
      {
        "name": "Sunken Ring Siege Workshop",
        "desc": "Goblin/Gnome vehicle workshops controlling siege machinery."
      },
      {
        "name": "Glacial Falls Ice Caverns",
        "desc": "Subterranean ice tunnels linking southern battlefields."
      },
      {
        "name": "Shadowsight Tower",
        "desc": "High watchtower granting tactical view over eastern bridge."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Subarctic Battle Skies",
        "mod": "+0 DC",
        "effect": "Cold crisp mountain air. Siege engines move at full speed."
      },
      {
        "roll": "4–5",
        "name": "Freezing Sleet",
        "mod": "+2 DC",
        "effect": "Ice coats siege tracks. Vehicle movement speed reduced by 25%."
      },
      {
        "roll": "6",
        "name": "Siege Blizzard",
        "mod": "+4 DC",
        "effect": "Heavy snow conceals forces. Siege weapon targeting range halved. Con save DC 18 against Exhaustion."
      }
    ]
  },
  {
    "name": "Hrothgar's Landing",
    "continent": "Northrend",
    "tagline": "Subarctic Coastal Mist Isles and Kvaldir Camps",
    "biome": "Harsh (Baseline DC 14)",
    "severity": "harsh",
    "baselineDC": 14,
    "subfeatures": [
      {
        "name": "Kvaldir Mist Shorelines",
        "desc": "Fog-drenched island camps inhabited by fog-vrykul raiders."
      },
      {
        "name": "Driftwood Cove Shipwrecks",
        "desc": "Graveyard of tuskarr and Alliance ships crushed by sea ice."
      },
      {
        "name": "Sea Elephant Island Rock Pillars",
        "desc": "Coastal rock monoliths populated by sea fauna."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Chilling Sea Light",
        "mod": "+0 DC",
        "effect": "Cold sea air. Salt fog hovers at water level."
      },
      {
        "roll": "4–5",
        "name": "Kvaldir Fog Surge",
        "mod": "+2 DC",
        "effect": "Unnatural fog hides shorelines completely. Sight limited to 15 feet."
      },
      {
        "roll": "6",
        "name": "Arctic Oceanic Squall",
        "mod": "+4 DC",
        "effect": "Violent freezing waves crash over shores. Walking near coast requires DC 15 Dex save or swept into freezing sea water."
      }
    ]
  },
  {
    "name": "Acherus & The Scarlet Enclave",
    "continent": "Northrend",
    "tagline": "Scourge Necropolis and Scorched Haven",
    "biome": "Deadly (Baseline DC 18)",
    "severity": "deadly",
    "baselineDC": 18,
    "subfeatures": [
      {
        "name": "Acherus: The Ebon Hold",
        "desc": "Floating necropolis serving as death knight headquarters; accessible by death gate or flying mounts."
      },
      {
        "name": "Havenshire Agricultural Lands",
        "desc": "Scorched farmland overrun by ghoul harvests and plague cauldrons."
      },
      {
        "name": "New Hearthglen Fortified Harbor",
        "desc": "Scarlet Crusade port city under siege by death knight legions."
      },
      {
        "name": "Avalanche Canyon Ruined Crypts",
        "desc": "Deep stone tombs carved into eastern coastal cliffs."
      }
    ],
    "callouts": [],
    "weather": [
      {
        "roll": "1–3",
        "name": "Unholy Eclipse",
        "mod": "+0 DC",
        "effect": "Sun blocked by necropolis shadow. Dim light continuously across all hexes."
      },
      {
        "roll": "4–5",
        "name": "Death Frost Fog",
        "mod": "+2 DC",
        "effect": "Cold unholy fog rolls in off the ocean. Stealth checks for undead gain +2."
      },
      {
        "roll": "6",
        "name": "Scourge Pestilence Ash Storm",
        "mod": "+4 DC",
        "effect": "Heavy ash and plague rain falls. Living non-evil creatures must make DC 16 Con save or gain 1 level of Exhaustion and lose 1 Hit Die."
      }
    ]
  }
];
