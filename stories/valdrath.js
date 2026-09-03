/* story-data.js — The Curse of Valdrath's Keep */
window.STORIES = window.STORIES || [];
window.STORIES.push({
  id: "valdrath",
  title: "The Curse of Valdrath’s Keep",
  blurb: "Dark clouds hang over the city of Thornwall. An ancient evil stirs within Valdrath’s Keep, and the dead walk once more. A desperate lord needs a hero — and that hero is you.",
  classes: [
    { id: "fighter", name: "Fighter", tag: "Strength & Steel",  desc: "Master of arms and armor. Your combat prowess gives you an edge in direct confrontations." },
    { id: "wizard",  name: "Wizard",  tag: "Arcane Mastery",    desc: "Scholar of the arcane arts. Your knowledge opens doors — and minds — closed to others." },
    { id: "rogue",   name: "Rogue",   tag: "Shadow & Cunning",  desc: "A creature of shadow. Locks, traps, and going unnoticed are your greatest weapons." },
    { id: "cleric",  name: "Cleric",  tag: "Divine Favor",      desc: "Bearer of holy power. Your faith grants healing, light, and dominion over the undead." }
  ],
  story: {
    start: "tavern",
    scenes: {

    "tavern": {
      chapter: "Prologue",
      title: "The Rusty Flagon",
      location: "Thornwall — The Merchant Quarter",
      choicePrompt: "How do you respond to the messenger?",
      paragraphs: [
        function (s) {
          return "Rain hammers the cobblestones of Thornwall as " + s.name + " nurses a warm ale by the fire.";
        },
        "A breathless messenger bursts through the door bearing the seal of Lord Harwick. The keep of Valdrath — his ancestral home to the north — has been overrun. The dead walk its halls, and something ancient commands them.",
        "The lord offers a handsome reward: fifty gold crowns to whoever enters the keep and ends the curse.",
        "The messenger's hands tremble as he slides the coin purse across the table.",
        function(s) {
          if (s.charClass === "fighter") return "You've taken worse odds for less gold. Your hand finds your weapon hilt before you realize you've decided.";
          if (s.charClass === "wizard") return "Fifty gold. A cursed keep with an active lich is a research opportunity most scholars would kill for — and you are not most scholars.";
          if (s.charClass === "rogue") return "A desperate lord, a haunted keep, and a guaranteed payday. You've played worse hands. You push back from the table.";
          return "You bow your head — not in prayer, not yet, but in acknowledgment. Something about this has the shape of a calling.";
        }
      ],
      choices: [
        { text: "Accept without question — fifty gold crowns is fifty gold crowns.", next: "road_bold" },
        { text: "Ask the messenger what he knows about the dangers inside.", next: "road_wise" },
        { text: "Slide the purse back. You'll do it — for double the price.", next: "road_equipped" }
      ]
    },

    "road_bold": {
      chapter: "Act I — The Call",
      title: "Setting Out at Dawn",
      location: "The Northern Road",
      choicePrompt: "What do you do?",
      paragraphs: [
        "You pocket the coin purse and set out before sunrise. No sense waiting — the dead don't sleep, and neither will your gold.",
        "The road to Valdrath's Keep winds through the Thornwood. By midday the trees press close on both sides, and fog clings to the undergrowth.",
        function(s) {
          if (s.charClass === "fighter") return "The quiet doesn't unsettle you. You've marched through worse. Your hand rests on your weapon hilt without thought.";
          if (s.charClass === "wizard") return "The Thornwood's silence troubles you more than it should. Not natural quiet — something has been consuming the ambient magic, drinking it out of the air.";
          if (s.charClass === "rogue") return "You've been watching the tree line for the past mile. Something has been watching back. You haven't seen it move yet. That's the part that bothers you.";
          return "You murmur a wayfarer's prayer out of old habit and feel it go unanswered. The Thornwood has something wrong at the root.";
        },
        "Three figures step from the tree line ahead, blades drawn. Bandits — and they've been watching the road."
      ],
      choices: [
        { text: "Draw your weapon and stand your ground.", next: { fighter: "road_bold_fight_easy", default: "road_bold_fight_hard" } },
        { text: "Turn and run — the mission is more important than your pride.", next: "road_bold_flee" }
      ]
    },

    "road_bold_fight_easy": {
      chapter: "Act I — The Call",
      title: "The Bandit Ambush",
      location: "The Northern Road",
      paragraphs: [
        "Your training takes over before fear has a chance to. The first bandit lunges — you sidestep, redirect his momentum, and put him on the ground in under two seconds.",
        "The other two exchange a glance. They did not sign up to fight someone like you. They back into the tree line and vanish.",
        "You sheathe your weapon and keep walking. You reach Valdrath's Keep by nightfall, road-weary but unscathed."
      ],
      choices: [
        { text: "Approach the keep's main gate.", next: "keep_gate" }
      ]
    },

    "road_bold_fight_hard": {
      chapter: "Act I — The Call",
      title: "The Bandit Ambush",
      location: "The Northern Road",
      paragraphs: [
        "You hold your ground. The bandits circle — three against one, and they know how to work together. You take a knife across the ribs before you drive them off with a shout and a wild swing.",
        "They scatter back into the Thornwood. You won, but not cleanly.",
        "You press on with a hand pressed to your side. By nightfall, Valdrath's Keep rises against the grey sky ahead."
      ],
      choices: [
        { text: "Approach the keep's main gate.", next: "keep_gate_wounded" }
      ]
    },

    "road_bold_flee": {
      chapter: "Act I — The Call",
      title: "Into the Thornwood",
      location: "The Northern Road",
      paragraphs: [
        "You bolt off the road and into the trees. The bandits give chase for a hundred yards before giving up — not worth it for one traveler.",
        "You've lost the road, though. It takes an hour of stumbling through fog and briars before you find it again.",
        "By the time Valdrath's Keep appears ahead, your boots are soaked and your nerves are frayed. Not the arrival you imagined.",
        function (s) {
          switch (s.charClass) {
            case "fighter": return "You lost your sight lines two hundred yards back; whatever is in this wood, you will not see it until it is already on you.";
            case "wizard":  return "The fog does not move the way fog moves — it pools against the air like a held thing, displaced by nothing, sustained by intention.";
            case "rogue":   return "The silence has weight; even your own footsteps are absorbed before they reach you, and something in the stillness is distinctly listening.";
            case "cleric":  return "Every creature fled this forest before whatever came to fill it arrived — you can feel the replacement pressing outward from between the trees.";
            default:        return "";
          }
        }
      ],
      choices: [
        { text: "Approach the keep's main gate.", next: "keep_gate_wounded" }
      ]
    },

    "road_wise": {
      chapter: "Act I — The Call",
      title: "A Cautious Departure",
      location: "The Northern Road",
      choicePrompt: "What do you do?",
      paragraphs: [
        "The messenger knows more than he's letting on — you can tell from the way he flinches at the word 'keep.' You press him over another round of ales.",
        "He describes a survivor: a guard named Ewen who escaped the keep three nights ago and is now holed up in the mill at the edge of Thornwall. Ewen saw what is commanding the dead.",
        "The messenger also mentions that the keep's east postern gate has a hidden latch — only the household staff knew about it.",
        function(s) {
          if (s.charClass === "fighter") return "A survivor with direct intelligence and a second entry point. That's the margin between a clean mission and a bad one. You're going to find Ewen.";
          if (s.charClass === "wizard") return "A survivor who saw what commands the dead — primary source material you cannot pass up. The postern is useful. What Ewen knows may be essential.";
          if (s.charClass === "rogue") return "A hidden entrance and someone who's been inside recently. Better intelligence than most jobs begin with. You're already ahead.";
          return "A soul in distress, a safe route in, and a name for what waits inside. You feel the shape of this settle into something purposeful.";
        }
      ],
      choices: [
        { text: "Find Ewen at the mill before you leave. Knowledge is survival.", next: "road_wise_help" },
        { text: "You have enough. Head for the keep now.", next: "road_wise_ignore" }
      ]
    },

    "road_wise_help": {
      chapter: "Act I — The Call",
      title: "The Survivor's Tale",
      location: "The Old Mill, Thornwall",
      paragraphs: [
        "Ewen is a broken man — hollow-eyed, wrapped in a blanket despite the summer heat. But he talks.",
        "He tells you about the Lich: an ancient court wizard named Malachar who served Valdrath's lords centuries ago. His soul was bound to the keep rather than allowed to pass. He's been waiting, growing stronger, for a hundred years.",
        "Ewen presses a cold iron key into your hand. 'Postern gate. East wall. Don't use the front — they'll hear you coming.' He won't say who 'they' are. He doesn't have to.",
        function (s) {
          switch (s.charClass) {
            case "fighter":
              return "Ewen looks at you the way a drowning man looks at a thrown rope — not with hope, exactly, but with the first recognition that the problem has a shape that can be struck. He doesn't believe you'll make it. But you are the first thing he has seen in days that looks like it could.";
            case "wizard":
              return "His eyes move to your hands once — to whatever you carry that marks you as what you are — and something closes behind them. He gives you the key. But there is a moment before he does where he looks at you the way he looked at the keep.";
            case "rogue":
              return "He has been watching you watch him since you sat down — the mill door, the shadows in the corner, the exits he never named. He holds the key out but doesn't release it immediately. Old survival, wired deep: he needs another beat to decide whether giving you this makes him safer or less safe.";
            case "cleric":
              return "He has been praying since he crawled out of the keep — small, wordless prayers to anyone still listening. When he looks at you, something behind his eyes simply gives way. He presses the key into your hand harder than he needs to, both hands wrapped around yours, and cannot speak.";
            default:
              return "";
          }
        }
      ],
      choices: [
        { text: "Thank Ewen and head for the keep.", next: "keep_gate_informed", setsFlag: "has_postern_key" }
      ]
    },

    "road_wise_ignore": {
      chapter: "Act I — The Call",
      title: "The Road North",
      location: "The Northern Road",
      paragraphs: [
        "You've heard enough. More information means more time, and the dead are already using every hour you're not moving.",
        "The road north is wrong in a way that's hard to name. No birdsong. No insects. The fog off the Thornwood sits too low and moves against the wind. The road itself is dry despite the morning rain — as if nothing living has crossed it in days.",
        "By evening, the keep's silhouette breaks the treeline. Stone walls. A collapsed tower. Every window dark. The silence presses on your ears like water pressure, and you understand for the first time why the messenger's hands were trembling.",
        function (s) {
          switch (s.charClass) {
            case "fighter": return "You count the towers, estimate the approach angles, and note that a frontal assault on walls that height would cost more than you have to spend.";
            case "wizard":  return "The light in the upper windows is consistent in wavelength with sustained necromantic workings — not firelight, not torchlight, but something feeding on itself indefinitely.";
            case "rogue":   return "No sentries on the walls, no lantern movement, no patrol pattern — either the keep is empty or it does not need guards, and you distrust both answers equally.";
            case "cleric":  return "The wrongness reaches you before the smell does — a visible rupture in the consecrated order of things, radiating outward from those green-lit windows like heat from a wound.";
            default:        return "";
          }
        }
      ],
      choices: [
        { text: "Approach the keep's main gate.", next: "keep_gate" }
      ]
    },

    "road_equipped": {
      chapter: "Act I — The Call",
      title: "A Better Deal",
      location: "Thornwall — The Merchant Quarter",
      choicePrompt: "What do you do next?",
      paragraphs: [
        "Lord Harwick's steward sputters — but he pays. One hundred gold crowns, plus a provisioner's chit for the market. The lord must be more desperate than he's letting on.",
        "You spend the next morning well. Silver-tipped bolts for the undead. Holy water from the temple district. A decent map of Valdrath's Keep purchased from an old cartographer who asks no questions.",
        function(s) {
          if (s.charClass === "fighter") return "At the smithy you add a whetstone and a spare buckle. Your blade will be sharp. Your armor will hold. That's all a fight ever needs.";
          if (s.charClass === "wizard") return "You spend longer with the cartographer than the transaction requires, memorizing the map's notation. When you leave, the route is in your head as well as your pocket.";
          if (s.charClass === "rogue") return "Holy water and silver bolts go in separate pouches. The bolts rattle, so you trade them for a lockpick set instead. The crowbar stays. You have priorities.";
          return "At the temple district, the priest spends more time with you than the purchase warrants. What you leave with settles into your chest like a second heartbeat.";
        },
        "The map shows two entrances: the main gate, and a postern door on the east wall that the cartographer has marked with the note 'staff only.'"
      ],
      choices: [
        { text: "Take the main road and approach the front gate directly.", next: "keep_gate" },
        { text: "Circle the keep and find the postern door on the east wall.", next: "keep_side", setsFlag: "has_postern_key" }
      ]
    },

    "keep_gate": {
      chapter: "Act I — The Keep",
      title: "The Gates of Valdrath",
      location: "Valdrath's Keep — Main Approach",
      choicePrompt: "How do you get inside?",
      paragraphs: [
        "The keep squats against the hillside like something wounded. Its stone walls are ancient — older than the Harwick family, older than the city behind you. The portcullis is up, but the courtyard beyond is dark.",
        "Two skeletal guards flank the gate. They're not moving. They may not have noticed you yet.",
        "You study the gatehouse. The main door is heavy oak, barred from the inside. A narrow window sits above the portcullis — reachable if you climbed. The east wall, just visible around the corner, might have other options.",
        function (s) {
          switch (s.charClass) {
            case "fighter": return "The gate stands half-open, which means either no one remained to close it or someone wanted you to walk through — you have learned to distrust both explanations equally.";
            case "wizard":  return "Beneath the smell of old rot there is a secondary signature, chemical and specific — the byproduct of preservation workings sustained past the point of natural decay.";
            case "rogue":   return "A gate left open is an invitation, and you have yet to encounter an invitation issued by the dead that was ever in your favor.";
            case "cleric":  return "The smell is not only death — it is desecration, the particular corruption of ground that was once consecrated and was then deliberately turned.";
            default:        return "";
          }
        }
      ],
      choices: [
        { text: "Rush the gate. Take out the skeleton guards before they raise an alarm.", next: { fighter: "gate_rush_clean", default: "gate_rush_hard" } },
        { text: "Climb to the window above the portcullis and slip inside unseen.", next: { rogue: "gate_climb_clean", default: "gate_climb_hard" } },
        { text: "Use the postern key on the east wall door.", requiresFlag: "has_postern_key", next: "keep_side_entry" },
        { text: "Study the gatehouse for a hidden mechanism or alternate entry.", onlyFor: ["wizard"], next: "gate_wizard_study" }
      ]
    },

    "keep_gate_wounded": {
      chapter: "Act I — The Keep",
      title: "The Gates of Valdrath",
      location: "Valdrath's Keep — Main Approach",
      choicePrompt: "How do you get inside?",
      paragraphs: [
        "You arrive at the keep's gate in worse shape than you'd like. Your wound has stiffened, and exhaustion pulls at you. The portcullis gapes open above a dark courtyard.",
        "Two skeletal guards stand at the gate. They haven't moved — yet.",
        "You're in no condition for a frontal fight. You need a smarter way in."
      ],
      choices: [
        { text: "Climb to the window above the portcullis — quietly.", next: { rogue: "gate_climb_clean", default: "gate_climb_hard" } },
        { text: "Use the postern key on the east wall door.", requiresFlag: "has_postern_key", next: "keep_side_entry" },
        { text: "Force your way through — pain be damned.", onlyFor: ["fighter"], next: "gate_rush_clean" }
      ]
    },

    "keep_gate_informed": {
      chapter: "Act I — The Keep",
      title: "The Gates of Valdrath",
      location: "Valdrath's Keep — Main Approach",
      choicePrompt: "How do you enter?",
      paragraphs: [
        "Ewen's map is accurate. The keep rises exactly as he described — main gate open, two skeletal sentries, east postern hidden in shadow.",
        "You know more than most who've come here. You know the Lich's name: Malachar. And you have his old servant's key.",
        "The choice is yours: use the key and slip in quietly, or find another way in."
      ],
      choices: [
        { text: "Use the postern key — Ewen said it was the safe way in.", next: "keep_side_entry", setsFlag: "entered_quietly" },
        { text: "Study the gate approach before committing to anything.", next: { wizard: "gate_wizard_study", default: "keep_gate" } }
      ]
    },

    "gate_rush_clean": {
      chapter: "Act I — The Keep",
      title: "Steel at the Gate",
      location: "Valdrath's Keep — Courtyard",
      paragraphs: [
        "You charge before the skeletons can react. The first goes down in two blows — brittle bone and rusted armor. The second turns just in time to catch your follow-through.",
        "The courtyard is clear. No alarm was raised. You stand in the dark, catching your breath, listening.",
        "Inside, somewhere, something stirs."
      ],
      choices: [
        { text: "Move into the keep's main hall.", next: "keep_hall" }
      ]
    },

    "gate_rush_hard": {
      chapter: "Act I — The Keep",
      title: "Steel at the Gate",
      location: "Valdrath's Keep — Courtyard",
      paragraphs: [
        "The skeleton guards turn as you charge. These aren't the slow, shambling dead of stories — they move with horrible, jerky efficiency. You trade blows in the dark, taking a hit for every one you land.",
        "By the time both crumble to dust, you're bruised and breathing hard. Somewhere in the keep's upper floors, a hollow moan answers the sound of the fight.",
        "You've been heard. You move fast."
      ],
      choices: [
        { text: "Push into the keep's main hall before more come.", next: "keep_hall", setsFlag: "alerted_keep" }
      ]
    },

    "gate_climb_clean": {
      chapter: "Act I — The Keep",
      title: "Over the Wall",
      location: "Valdrath's Keep — Gatehouse",
      paragraphs: [
        "The gatehouse wall is rough old stone — plenty of handholds. You move with practiced silence, testing each grip before committing your weight.",
        "You ease through the window and drop into a storeroom. Barrels. Dust. A rack of rusted pikes. And one very still skeleton guard with its back to you.",
        "You slip past it into the corridor beyond."
      ],
      choices: [
        { text: "Follow the corridor toward the main hall.", next: "keep_hall", setsFlag: "entered_quietly" }
      ]
    },

    "gate_climb_hard": {
      chapter: "Act I — The Keep",
      title: "Over the Wall",
      location: "Valdrath's Keep — Gatehouse",
      paragraphs: [
        "The climb is harder than it looks. Halfway up, your grip slips — you catch yourself, but your boot scrapes loudly against the stone.",
        "Below, one of the skeleton guards turns its hollow gaze upward. It raises a corroded horn to its teeth.",
        "You scramble the rest of the way and drop into the storeroom on the other side as the horn's wail echoes through the keep."
      ],
      choices: [
        { text: "Run — get into the keep's interior before they find you.", next: "keep_hall", setsFlag: "alerted_keep" }
      ]
    },

    "gate_wizard_study": {
      chapter: "Act I — The Keep",
      title: "Ancient Sigils",
      location: "Valdrath's Keep — Main Gate",
      paragraphs: [
        "You hold back and observe. The skeleton guards move in a fixed patrol — a pattern, not instinct. They're being controlled by something.",
        "More usefully: carved above the main door are runes you recognize from your studies. Warding glyphs, old enough to predate the Harwick family. The wards are cracked — weakened — but still active enough to suppress magic within a thirty-foot radius of the gate.",
        "You also spot a drain grate near the east wall, large enough to fit through if you wanted to avoid the gate entirely."
      ],
      choices: [
        { text: "Time the patrol and slip past the guards through the main door.", next: "keep_hall", setsFlag: "entered_quietly" },
        { text: "Pry open the drain grate and descend beneath the keep.", next: "keep_side_entry", setsFlag: "knows_wards" }
      ]
    },

    "keep_side_entry": {
      chapter: "Act I — The Keep",
      title: "The Postern Door",
      location: "Valdrath's Keep — East Wall",
      paragraphs: [
        "The postern door is set deep into the east wall, half-hidden behind a growth of dead ivy. The iron lock is old but functional.",
        "The key turns smoothly. The door swings inward without a sound — the hinges were oiled recently, which is unsettling.",
        "You step into a stone passage that smells of rot and cold earth. Somewhere ahead, a faint green light flickers.",
        function (s) {
          switch (s.charClass) {
            case "fighter": return "You keep one hand on the wall and count your paces — if you have to leave quickly, you will not have time to think, and thinking will already have cost you.";
            case "wizard":  return "The stones hold a faint warmth that has nothing to do with temperature; something has been worked in this corridor recently enough that the residue has not fully dissipated.";
            case "rogue":   return "You note two branch-points and file them against the possibility of running — the exit map you are building in your head already matters more than the destination.";
            case "cleric":  return "The darkness here is not absence of light; it has texture and density, the weight of things that have forgotten what they were and are no longer certain they are nothing.";
            default:        return "";
          }
        }
      ],
      choices: [
        { text: "Follow the passage toward the light.", next: "keep_hall" }
      ]
    },

    "keep_side": {
      chapter: "Act I — The Keep",
      title: "The East Approach",
      location: "Valdrath's Keep — East Wall",
      paragraphs: [
        "You circle wide around the keep, giving the main gate a wide berth. The east wall is older than the rest — crumbling in places, the stone dark with damp.",
        "The postern door is exactly where the cartographer marked it: iron-bound oak, barely visible behind years of dead ivy.",
        "Your key fits the lock perfectly."
      ],
      choices: [
        { text: "Unlock the door and slip inside.", next: "keep_side_entry" }
      ]
    },

    /* ================================================================
       ACT II — INSIDE VALDRATH'S KEEP
       All paths converge at keep_hall after entering via any route.
    ================================================================ */

    "keep_hall": {
      chapter: "Act II — The Keep",
      title: "The Grand Hall",
      location: "Valdrath's Keep — Main Hall",
      choicePrompt: "Where do you go?",
      paragraphs: [
        function (s) {
          var prefix = s.flags.entered_quietly
            ? "You emerge into the grand hall unseen."
            : "You push into the grand hall, your heart pounding.";
          return prefix + " Whatever this place was in life, it is ruin now. Tapestries hang in rot. Overturned furniture lies in patterns that suggest something dragged it aside, looking for something.";
        },
        "Three passages lead deeper into the keep. To the left, a set of double doors hangs open — beyond them, the scrape and clatter of bone on stone. Straight ahead, a narrower corridor leads toward the old library wing, its entrance carved with a scholar's sigil. To the right, a heavy door bears the crossed-swords crest of Valdrath's house guard.",
        "A green light pulses faintly from somewhere above — the keep's upper floors. It flickers in a rhythm that might be breathing, if light could breathe.",
        function (s) {
          switch (s.charClass) {
            case "fighter":
              return "You read the room the way you read every room that might kill you. The furniture wasn't overturned at random — something drove people back against the far wall, and they didn't leave standing. The doorways are choke points, three of them, and whoever held this hall last made the wrong call on all three.";
            case "wizard":
              return "The green light above isn't ambient — it's structured, layered, a binding lattice stretched across the upper floors like a net drawn tight over the whole building. You can see the magical scarring on the stone where discharges hit the walls: not a battle, an execution, performed at range. Whatever happened here, the magic remembers it in the grain of the rock.";
            case "rogue":
              return "Three exits, two of them defensible, none of them watched right now. The dust along the left passage has been disturbed in a line — something moves through there often enough to leave a track. The valuables were stripped methodically, not in a hurry; whoever took them knew where to look and didn't waste time on the rest.";
            case "cleric":
              return "The wrongness hits you before anything else — a pressure behind your eyes, a room with no air in it. These people weren't just killed; they were denied. No rites spoken, no mercy passage, no final word said over them. The hall is a wound in the sacred order, and it has been left open for a very long time.";
            default:
              return "";
          }
        }
      ],
      choices: [
        { text: function (s) {
            switch (s.charClass) {
              case "fighter": return "I was already heading that way.";
              case "wizard":  return "Clear the hall. I need room to work.";
              case "rogue":   return "Draw them here. Buy myself room elsewhere.";
              case "cleric":  return "The dead deserve release, not servitude.";
              default:        return "Go left — toward the sound of movement. Face whatever waits.";
            }
          }, next: "keep_hall_combat" },
        { text: function (s) {
            switch (s.charClass) {
              case "fighter": return "I need to know what I'm killing.";
              case "wizard":  return "The archive is mine to search.";
              case "rogue":   return "Maps, weaknesses — the library has both.";
              case "cleric":  return "The lich's original ritual will be recorded there.";
              default:        return "Go straight — the library. Knowledge of what you're fighting.";
            }
          }, next: { wizard: "keep_library_wizard", default: "keep_library" } },
        { text: function (s) {
            switch (s.charClass) {
              case "fighter": return "I know how to read an armory.";
              case "wizard":  return "Better tools serve any wielder.";
              case "rogue":   return "A good blade is a good blade.";
              case "cleric":  return "Consecrated steel can harm what prayers alone cannot.";
              default:        return "Go right — the armory. Better equipped, better odds.";
            }
          }, next: { fighter: "keep_armory_fighter", default: "keep_armory" } }
      ]
    },

    "keep_hall_combat": {
      chapter: "Act II — The Keep",
      title: "The Hall of Bones",
      location: "Valdrath's Keep — West Wing",
      choicePrompt: "What is your approach?",
      paragraphs: [
        "The double doors open into what was once a dining hall. Six skeleton warriors stand at irregular intervals, each wearing the corroded livery of Valdrath's house guard. They turn as one when you enter.",
        "They're well-made undead — not shambling, not confused. Something is directing them. But you notice they hold their positions, moving to intercept rather than pursuing. Whatever controls them may not want them out of this room."
      ],
      choices: [
        { text: "Charge straight through — fast and aggressive.", next: { fighter: "hall_combat_fighter", cleric: "hall_combat_cleric", default: "hall_combat_default" } },
        { text: "Draw them toward the doorway and fight them one at a time.", next: "hall_combat_tactical" },
        { text: "Hold your ground and call out. Something might be watching.", next: "hall_combat_call" }
      ]
    },

    "hall_combat_fighter": {
      chapter: "Act II — The Keep",
      title: "Through the Line",
      location: "Valdrath's Keep — West Wing",
      paragraphs: [
        "Years of fighting instinct take over. You read the spacing, identify the weakest flank, and commit. The first skeleton shatters on the second swing. The second loses its sword arm. By the time the third engages, you've already shifted your weight for the follow-through.",
        "Six become none in under two minutes. The room is littered with bones and rust. You're barely winded.",
        "A doorway beyond leads to a small chapel — and something else: a staircase descending."
      ],
      choices: [
        { text: "Investigate the chapel before descending.", next: "keep_altar" },
        { text: "Take the stairs down — the crypt must be below.", next: "crypt_entrance" }
      ]
    },

    "hall_combat_cleric": {
      chapter: "Act II — The Keep",
      title: "The Light of Faith",
      location: "Valdrath's Keep — West Wing",
      paragraphs: [
        "You raise your holy symbol and speak the words of turning. The effect is immediate — not the gentle flicker you might produce in a small consecrated space, but a wave of divine force that hits the room like a thrown stone hitting water.",
        "Three of the six collapse mid-step, their animating force extinguished. The remaining three stagger, fighting the compulsion, burning what is left of the power that holds them together just to keep moving toward you.",
        "By the time they reach you, they are already coming apart. A prayer and two blows is all it takes. The room settles into something almost like peace."
      ],
      choices: [
        { text: "Investigate the chapel beyond.", next: "keep_altar" },
        { text: "Take the stairs down.", next: "crypt_entrance" }
      ]
    },

    "hall_combat_default": {
      chapter: "Act II — The Keep",
      title: "The Grinding Fight",
      location: "Valdrath's Keep — West Wing",
      paragraphs: [
        "You charge into the middle of them and immediately regret it. Six against one is six against one, no matter how determined you are. You fight desperately — breaking bones, ducking blows, using the furniture as cover.",
        "You destroy four before the remaining two back off, retreating to opposite corners. You've won, but you're cut and exhausted, and the keep still has more to offer.",
        "A doorway leads to a small chapel and a staircase down."
      ],
      choices: [
        { text: "Rest briefly in the chapel before going further.", next: "keep_altar", setsFlag: "combat_worn" },
        { text: "Push through to the stairs — no time to rest.", next: "crypt_entrance", setsFlag: "combat_worn" }
      ]
    },

    "hall_combat_tactical": {
      chapter: "Act II — The Keep",
      title: "The Doorway Defense",
      location: "Valdrath's Keep — West Wing",
      paragraphs: [
        "Smart. You back into the doorway, forcing them to come at you one at a time through a bottleneck they weren't built to navigate efficiently.",
        "It takes longer — fifteen minutes of careful work — but you take the skeletons apart methodically. A bruise on your shoulder, a scrape on your cheek. Acceptable.",
        "The hall beyond holds a small chapel and a staircase leading down."
      ],
      choices: [
        { text: "Check the chapel.", next: "keep_altar" },
        { text: "Head straight for the stairs.", next: "crypt_entrance" }
      ]
    },

    "hall_combat_call": {
      chapter: "Act II — The Keep",
      title: "Silence in Return",
      location: "Valdrath's Keep — West Wing",
      paragraphs: [
        "You raise a hand and speak. 'I've not come to destroy what's here. I want to speak with whoever commands this place.'",
        "The skeletons stop. Hold. For ten full seconds, nothing moves. Then, all at once, they resume their advance — and hit harder than before, as if whatever is watching decided you were an annoyance rather than a threat.",
        "You fight your way through at cost, finally collapsing the last one in a corner.",
        function (s) {
          return "But you've learned something: " + (s.flags.knows_wards ? "it can hear you, and it's intelligent. Combined with what you know about the wards, this tells you something about its range of control." : "whatever controls them is present, intelligent, and monitoring you. It can hear you. It didn't want to talk.");
        }
      ],
      choices: [
        { text: "Continue into the chapel beyond.", next: "keep_altar", setsFlag: "lich_knows_you" },
        { text: "Take the stairs down.", next: "crypt_entrance", setsFlag: "lich_knows_you" }
      ]
    },

    "keep_library": {
      chapter: "Act II — The Keep",
      title: "The Cursed Library",
      location: "Valdrath's Keep — East Wing",
      choicePrompt: "What do you investigate?",
      paragraphs: [
        "The library is intact — almost deliberately so. Shelves of books and scrolls, undisturbed by whatever ransacked the rest of the keep. Candles burn with a cold blue flame that cast no warmth.",
        "Someone has been using this room recently. A reading stand near the window holds an open volume, pages covered in a cramped script you don't immediately recognize.",
        "There are also scattered notes in a more modern hand — someone else's research.",
        function(s) {
          if (s.charClass === "fighter") return "Books aren't your territory. But soldiers who ignore intelligence die before the fights they'd have won. You start with what looks most useful.";
          if (s.charClass === "wizard") return "You read the room before you read a page. The shelving pattern, the annotation density, the reading stand's position — all of it is information.";
          if (s.charClass === "rogue") return "Valuable things are rarely where they're supposed to be. You start with the obvious and work toward what's hidden, looking for anything moved recently.";
          return "The cold blue light bothers you below the level of thought — not what it reveals, but what it sustains. Something here is being held against its nature.";
        }
      ],
      choices: [
        { text: "Try to read the ancient volume on the stand.", next: "library_ancient" },
        { text: "Read the modern notes — easier and possibly more relevant.", next: "library_notes" }
      ]
    },

    "keep_library_wizard": {
      chapter: "Act II — The Keep",
      title: "The Cursed Library",
      location: "Valdrath's Keep — East Wing",
      choicePrompt: "What do you focus on?",
      paragraphs: [
        "The library calls to you like an old friend. Cold blue candles, shelves of undisturbed books, and in the center — an open volume on a reading stand, written in High Arcane script.",
        "You can read it. Others couldn't. The volume is Malachar's own research notes — compiled over decades of binding studies, detailing how a soul can be anchored to a physical object to prevent passing.",
        "The key passage is marked: a soul thus bound can only be fully destroyed if its phylactery — the object containing the binding — is first located and shattered. The phylactery is described as 'small, black, made of lodestone, bearing the old sigil.'"
      ],
      choices: [
        { text: "Search the library shelves for the phylactery.", next: "library_search_phylactery", setsFlag: "knows_phylactery" },
        { text: "Memorize what you need and move on — the throne room next.", next: "keep_throne", setsFlag: "knows_phylactery" }
      ]
    },

    "library_ancient": {
      chapter: "Act II — The Keep",
      title: "The Ancient Text",
      location: "Valdrath's Keep — Library",
      paragraphs: [
        "The script is an archaic form of scholarly notation — you can parse it, slowly, with effort. The book is a treatise on soul-binding magic.",
        "You piece together enough to understand the broad concept: the author believed a soul could be anchored to an object — a phylactery — to prevent death. The soul would endure, maintaining control over the surrounding area, as long as the phylactery remained intact.",
        "More practically: destroying the phylactery destroys the bound soul."
      ],
      choices: [
        { text: "Search the shelves for any sign of this phylactery.", next: "library_search_phylactery", setsFlag: "knows_phylactery" },
        { text: "Continue deeper into the keep with this knowledge.", next: "keep_throne", setsFlag: "knows_phylactery" }
      ]
    },

    "library_notes": {
      chapter: "Act II — The Keep",
      title: "Someone Else's Research",
      location: "Valdrath's Keep — Library",
      paragraphs: [
        "The modern notes are written in a hurried, frightened hand. They describe a researcher — possibly Lord Harwick's own scholar — who came here months ago to investigate the curse.",
        "The notes are incomplete. But one line stands out, underlined twice: 'Malachar's power source. Not in the keep. Not in the crypt. In the throne room — where the old lord's chair stands. Under the stone.'"
      ],
      choices: [
        { text: "Head to the throne room immediately.", next: "keep_throne", setsFlag: "knows_throne_secret" },
        { text: "Look around the library for anything else useful before moving on.", next: "library_search_phylactery" }
      ]
    },

    "library_search_phylactery": {
      chapter: "Act II — The Keep",
      title: "Searching the Shelves",
      location: "Valdrath's Keep — Library",
      paragraphs: [
        "You work methodically through the shelves — pulling books, checking spaces, looking for a small black stone marked with a sigil.",
        "It's not here. But tucked behind a loose brick in the far wall, you find something else: a leather satchel containing a vial of sanctified oil and a page torn from a larger text, describing a ritual to temporarily weaken an anchored spirit.",
        "The ritual requires anointing a surface connected to the spirit's binding with the oil, then speaking a single word of unmaking. The word is written at the bottom of the page."
      ],
      choices: [
        { text: "Take the satchel and move on to the throne room.", next: "keep_throne", setsFlag: "has_ritual_oil" }
      ]
    },

    "keep_armory": {
      chapter: "Act II — The Keep",
      title: "The Broken Armory",
      location: "Valdrath's Keep — Guard Wing",
      choicePrompt: "What do you take?",
      paragraphs: [
        "The armory has been picked over — weapon racks empty, most of the good material stripped by time or scavengers. What remains is a mixed haul: some useful, some ruined.",
        "A ghost lingers here. It doesn't attack — it stands in the corner by an empty rack, staring at where its weapons used to hang. You get the sense that if you could communicate with it, it might tell you something worth knowing."
      ],
      choices: [
        { text: "Search the racks and crates for anything serviceable.", next: "armory_search" },
        { text: "Attempt to communicate with the ghost.", next: { cleric: "keep_ghost_cleric", default: "keep_ghost_default" } }
      ]
    },

    "keep_armory_fighter": {
      chapter: "Act II — The Keep",
      title: "The Broken Armory",
      location: "Valdrath's Keep — Guard Wing",
      choicePrompt: "What do you take?",
      paragraphs: [
        "Your eye goes immediately to the weapon racks. Mostly empty — but not entirely. Tucked in the back you find a hand-and-a-half sword with a grip worn smooth by years of use. The balance is perfect. Better than what you came in with.",
        "A ghost stands in the corner, motionless. It wears guard's livery and stares at nothing. You've seen battle-shock in living soldiers. This is something similar.",
        "The sword goes on your belt without a second thought. The question is what to do about the ghost."
      ],
      choices: [
        { text: "Take the sword and move on — ghosts are not your problem.", next: "keep_throne", setsFlag: "has_sword_upgrade" },
        { text: "Try to communicate with the ghost before leaving.", next: { cleric: "keep_ghost_cleric", default: "keep_ghost_default" } }
      ]
    },

    "armory_search": {
      chapter: "Act II — The Keep",
      title: "Salvage",
      location: "Valdrath's Keep — Armory",
      paragraphs: [
        "You find a serviceable short blade still wrapped in oiled cloth, a round shield with only one cracked boss, and a coil of rope that doesn't appear rotten.",
        function(s) {
          if (s.charClass === "fighter") return "You assess the salvage with a trained eye — balance, edge retention, condition of the fittings. The short blade is the only thing here worth carrying.";
          if (s.charClass === "wizard") return "None of this is what you'd have packed. But you've learned to adapt — the rope is useful, the blade is serviceable, and practicality outranks preference.";
          if (s.charClass === "rogue") return "Good rope and a blade that won't catch. Someone in this armory had the same priorities you do. You work fast and take only what you'll actually use.";
          return "You handle each piece before deciding — not testing the edge so much as testing the weight of it in your hands. The short blade passes. You've worked with worse.";
        },
        "The ghost watches you the whole time. Not the way a sentry watches — it doesn't track your movement, doesn't react when you look back. It watches the way the dead do: fixed on something overlaid on the present, something only it can see. You are furniture to it. You take what you need and go."
      ],
      choices: [
        { text: "Take what you can carry and head for the throne room.", next: "keep_throne", setsFlag: "has_rope" }
      ]
    },

    "keep_ghost_cleric": {
      chapter: "Act II — The Keep",
      title: "The Soldier's Ghost",
      location: "Valdrath's Keep — Armory",
      paragraphs: [
        "You extend your awareness toward the spirit — opening a channel the way your training taught you. The ghost's head turns. It can feel you.",
        "It speaks in the language of the dead: images, not words. You see Malachar as a living man — tall, cold-eyed — conducting a ritual in the throne room. You see him place something under the flagstone beneath the lord's chair. A small black object.",
        "The ghost's gaze holds yours for a long moment. Then it fades."
      ],
      choices: [
        { text: "Head to the throne room — you know where the phylactery is.", next: "keep_throne", setsFlag: "knows_phylactery" }
      ]
    },

    "keep_ghost_default": {
      chapter: "Act II — The Keep",
      title: "The Soldier's Ghost",
      location: "Valdrath's Keep — Armory",
      paragraphs: [
        "You try to address the ghost — name yourself, explain why you've come. It stares through you. Not hostile. Simply unreachable, locked in whatever moment claimed it, replaying something you'll never see.",
        function (s) {
          switch (s.charClass) {
            case "fighter":
              return "Then, for just a moment, the ghost's gaze drops — not to your face, but to your weapon arm. A soldier's reflex, worn into the body over years until it outlasted the body itself. The almost-recognition dissolves before it can become anything.";
            case "wizard":
              return "As you speak, the ghost flinches — not toward you, but away, a small involuntary recoil you nearly miss. Malachar's craft has been in these walls for a century; whatever you carry that resembles it earns a different kind of nothing. Not absence. Aversion.";
            case "rogue":
              return "You wait for the almost-recognition you half-expected — the attention that doesn't quite land, the soldier's reflex outlasting its owner. It doesn't come. The ghost simply does not register you at all, and somehow that is worse than being stared through.";
            default:
              return "";
          }
        },
        "After a while you stop trying. Some of the dead are too far gone for words. The ghost goes on staring at the empty rack, standing its last post.",
        "The armory's only other door leads back toward the main hall — or you could press on toward the throne room via the guard corridor."
      ],
      choices: [
        { text: "Head through the guard corridor to the throne room.", next: "keep_throne" }
      ]
    },

    "keep_altar": {
      chapter: "Act II — The Keep",
      title: "The Defiled Altar",
      location: "Valdrath's Keep — Chapel",
      paragraphs: [
        "The chapel is small, its altar toppled and the devotional carvings scored by something sharp. Whatever faith this room once held has been deliberately erased.",
        "You can feel it — the lingering absence of something sacred, and the aggressive presence of something that wanted it gone.",
        function (s) {
          if (s.charClass === "cleric") {
            return "To you, the desecration is almost physically painful. But it also means there's work to be done here — and the work is yours to do.";
          }
          return "The staircase down is visible at the far end of the chapel. The altar is a detour, but something about it draws your attention.";
        }
      ],
      choices: [
        { text: "Attempt to reconsecrate the altar.", onlyFor: ["cleric"], next: "altar_reconsecrate" },
        { text: "Study the defiled carvings — they might tell you something.", next: "altar_study" },
        { text: "Leave the altar and take the stairs down.", next: "crypt_entrance" }
      ]
    },

    "altar_reconsecrate": {
      chapter: "Act II — The Keep",
      title: "Restoration",
      location: "Valdrath's Keep — Chapel",
      paragraphs: [
        "You work for nearly an hour. Your hands bleed where you cut yourself on a broken stone. The prayers come in waves — some whispered, some barely formed in your mind.",
        "It holds. The altar doesn't glow, doesn't transform — but the cold wrongness of the room lessens. Something sacred has been restored, small as it is.",
        "You feel stronger for it. Whatever you're walking toward, you walk with something at your back."
      ],
      choices: [
        { text: "Take the stairs to the crypt.", next: "crypt_entrance", setsFlag: "altar_restored" }
      ]
    },

    "altar_study": {
      chapter: "Act II — The Keep",
      title: "The Defaced Carvings",
      location: "Valdrath's Keep — Chapel",
      paragraphs: [
        "The carvings were scenes of the divine — the standard iconography of the old faith. What's been scored through most deliberately is a specific image: a figure holding a glowing stone in two hands, surrounded by flames.",
        "You've seen that image before. It's the iconographic representation of destroying a soul-vessel.",
        "Malachar erased it deliberately. He knew someone might come here and understand it."
      ],
      choices: [
        { text: "Take the stairs to the crypt.", next: "crypt_entrance", setsFlag: "knows_phylactery" }
      ]
    },

    "keep_throne": {
      chapter: "Act II — The Keep",
      title: "The Throne Room",
      location: "Valdrath's Keep — Great Hall",
      choicePrompt: "How do you deal with the lieutenant?",
      paragraphs: [
        "The throne room is the largest space in the keep — vaulted ceiling, cracked stone floor, and at the far end, the lord's chair: high-backed, black with age, carved with the Valdrath house crest.",
        "Standing before it is something that was once human. Tall, wearing armor that no longer fits its form correctly, its eyes burning with the same cold green light as the keep's upper windows. A wight — a former warrior bound to serve even after death.",
        function (s) {
          var prefix = s.flags.knows_phylactery
            ? "You know that somewhere beneath the throne's flagstone is the phylactery. You need to get past this thing to reach it."
            : "Whatever is commanding this place, this wight is guarding the room with clear purpose.";
          return prefix + " The wight turns to face you.";
        }
      ],
      choices: [
        { text: "Attack immediately — fight your way to the throne.", next: { fighter: "throne_battle_fighter", cleric: "throne_battle_cleric", default: "throne_battle_default" } },
        { text: "Hold your ground and try to communicate with it.", next: { rogue: "throne_parley_rogue", wizard: "throne_parley_wizard", default: "throne_parley_default" } },
        { text: "Move to flank it and get to the throne before it can stop you.", onlyFor: ["rogue"], next: "throne_rogue_flank" }
      ]
    },

    "throne_battle_fighter": {
      chapter: "Act II — The Keep",
      title: "The Lieutenant Falls",
      location: "Valdrath's Keep — Throne Room",
      paragraphs: [
        "The wight is strong — stronger than the skeletons downstairs by an order of magnitude. It lands two blows that would have put a lesser fighter through the wall. But you've fought worse, and you know how to make strength work against itself.",
        "You take it apart systematically: hamstring it, pin its weapon arm, finish it at the joints. It collapses in a smoking heap.",
        "The room is yours. The throne waits."
      ],
      choices: [
        { text: "Search beneath the throne's flagstone.", next: "throne_flagstone" }
      ]
    },

    "throne_battle_cleric": {
      chapter: "Act II — The Keep",
      title: "The Lieutenant Falls",
      location: "Valdrath's Keep — Throne Room",
      paragraphs: [
        "The wight advances and so do you — but your weapon is your voice. The words of binding, the prayer of unmade chains — the wight staggers with every syllable.",
        "By the time it reaches you, it has lost half its cohesion. Two blows finish what your prayer started. It dissolves into silence.",
        "The altar's restoration pulses through you like a second wind.",
        function (s) {
          return s.flags.altar_restored
            ? "The reconsecrated chapel's blessing holds here too. You feel its clarity at the edge of your senses."
            : "The throne waits at the far end of the room.";
        }
      ],
      choices: [
        { text: "Search beneath the throne's flagstone.", next: "throne_flagstone" }
      ]
    },

    "throne_battle_default": {
      chapter: "Act II — The Keep",
      title: "A Hard Fight",
      location: "Valdrath's Keep — Throne Room",
      paragraphs: [
        "The wight is faster than it looks. You get in good hits, but it returns most of them with interest — your arms, your sides, your shoulder. This is the hardest fight the keep has offered.",
        "You prevail through stubbornness more than skill, finally driving your blade into a gap in its armor and twisting until the green light in its eyes goes out.",
        "You're battered. You lean against the wall for a long moment before pushing toward the throne."
      ],
      choices: [
        { text: "Search beneath the throne's flagstone.", next: "throne_flagstone", setsFlag: "wight_fight_worn" }
      ]
    },

    "throne_parley_rogue": {
      chapter: "Act II — The Keep",
      title: "Words with the Dead",
      location: "Valdrath's Keep — Throne Room",
      paragraphs: [
        "You keep your hands in view and your voice measured. 'I'm not here to destroy the keep. I'm here to end what's wrong with it. Tell me what you know.'",
        "The wight doesn't speak. But it doesn't advance, either. It tilts its head — listening to something you can't hear, some signal passing between it and whatever presses down from above. A negotiation you're not party to.",
        "Ten seconds. Twenty. The green light in its eyes dims slightly, then steadies.",
        "It steps aside.",
        "Not all the way. Not permanently. But enough: a clear path to the throne's flagstone, and a window of seconds to use it before whatever just happened changes its mind."
      ],
      choices: [
        { text: "Move fast — straight to the throne before it changes its mind.", next: "throne_flagstone", setsFlag: "know_weakness" }
      ]
    },

    "throne_parley_wizard": {
      chapter: "Act II — The Keep",
      title: "Words with the Dead",
      location: "Valdrath's Keep — Throne Room",
      paragraphs: [
        "You address the wight in the formal language of arcane contract — the old words that even the dead respond to, if they were once part of the scholarly tradition.",
        "The wight stills completely. Then, in a voice like scraping stone: 'The master's stone. The binding. If you destroy it — he dies, and we go with him. That is what you want. That is the truth of what is here.'",
        "It steps back from the throne and watches you."
      ],
      choices: [
        { text: "Approach the throne and lift the flagstone.", next: "throne_flagstone", setsFlag: "know_weakness" }
      ]
    },

    "throne_parley_default": {
      chapter: "Act II — The Keep",
      title: "No Answer",
      location: "Valdrath's Keep — Throne Room",
      paragraphs: [
        "You try. The wight listens with those burning green eyes and does not respond. After a moment, it begins to advance.",
        "You fight. It's difficult but you manage — taking cuts and bruises before the wight finally loses coherence and collapses.",
        "The throne waits. The flagstone beneath it looks different from the rest of the floor — newer, replaced at some point."
      ],
      choices: [
        { text: "Lift the flagstone.", next: "throne_flagstone", setsFlag: "wight_fight_worn" }
      ]
    },

    "throne_rogue_flank": {
      chapter: "Act II — The Keep",
      title: "The Quick Way",
      location: "Valdrath's Keep — Throne Room",
      paragraphs: [
        "You don't fight it. You feint left, dodge right, and sprint for the throne while the wight recovers from a lunge that hit air. A wight is not built for speed.",
        "You're at the flagstone with three seconds to spare. You pry it up one-handed while the wight bellows behind you.",
        "Beneath it: a small black lodestone, stamped with a sigil that makes your eyes water to look at directly."
      ],
      choices: [
        { text: "Grab the phylactery and run.", next: "crypt_entrance_phylactery", setsFlag: "has_phylactery" }
      ]
    },

    "throne_flagstone": {
      chapter: "Act II — The Keep",
      title: "Beneath the Throne",
      location: "Valdrath's Keep — Throne Room",
      paragraphs: [
        "The flagstone is heavier than it looks. You pry it up and set it aside.",
        "Beneath it, in a hollow carved into the foundation stone: a small black lodestone, no larger than your fist, stamped with a sigil that throbs with cold green light. The phylactery.",
        "The moment you touch it, the keep shudders. Somewhere below — deep below — something screams in rage."
      ],
      choices: [
        { text: "Pocket the phylactery and head for the crypt stairs.", next: "crypt_entrance", setsFlag: "has_phylactery" }
      ]
    },

    "crypt_entrance_phylactery": {
      chapter: "Act II — The Keep",
      title: "Point of No Return",
      location: "Valdrath's Keep — Crypt Stairs",
      paragraphs: [
        "The stairs descend steeply into dark stone. Cold air rises from below — colder than any natural cellar, colder than the keep's upper rooms.",
        "The phylactery in your pocket pulses. Whatever is below knows you have it.",
        "There will be no leaving this place until this is finished."
      ],
      choices: [
        { text: "Descend into the crypt.", next: "crypt_descent" }
      ]
    },

    "crypt_entrance": {
      chapter: "Act II — The Keep",
      title: "Point of No Return",
      location: "Valdrath's Keep — Crypt Stairs",
      choicePrompt: "How do you approach the descent?",
      paragraphs: [
        "The stairs go down a long way. The cold intensifies with every step, and the green light — source unknown — grows stronger as you descend.",
        "At the base, a stone door stands ajar. Beyond it: the sound of something moving in deliberate circles, like a mind pacing.",
        "You pause on the landing. The door is ahead. You will not be able to come back this way once you push through.",
        function (s) {
          switch (s.charClass) {
            case "fighter": return "The stairs are narrow enough that you cannot swing freely — whatever waits below has already calculated that, and has been waiting for someone who hasn't.";
            case "wizard":  return "The light below does not flicker; a lich-fire sustained for decades finds nothing alive nearby to disturb the air, and that stillness is a kind of answer about what you will find.";
            case "rogue":   return "Stairs descending are always the worst geometry — one exit, and whoever holds the top of them when you want to leave holds everything that comes after.";
            case "cleric":  return "The cold deepens with each step and it is not the cold of stone — it is the cold that accumulates where the dead have displaced the living for long enough that warmth has stopped trying.";
            default:        return "";
          }
        }
      ],
      choices: [
        { text: "Check the door for traps before entering.", next: { rogue: "crypt_check_rogue", default: "crypt_check_default" } },
        { text: "Push through immediately — speed is a weapon.", next: "crypt_descent", setsFlag: "rushed_crypt" }
      ]
    },

    "crypt_check_rogue": {
      chapter: "Act II — The Keep",
      title: "The Landing",
      location: "Valdrath's Keep — Crypt Stairs",
      paragraphs: [
        "You study the door frame carefully. A tripwire, knee-height, attached to a bell somewhere in the passage beyond. You disable it in thirty seconds.",
        "There's also a glyph carved into the door's lintel — a ward that would have announced your presence to whatever waits inside the moment you touched the door. You carefully scratch it out with your knife.",
        "When you push through, you will arrive unannounced."
      ],
      choices: [
        { text: "Push through quietly.", next: "crypt_descent", setsFlag: "crypt_safe_entry" }
      ]
    },

    "crypt_check_default": {
      chapter: "Act II — The Keep",
      title: "The Landing",
      location: "Valdrath's Keep — Crypt Stairs",
      paragraphs: [
        "You study the door carefully. Stone, iron fittings, no visible lock. You lean in close to look at the frame.",
        "There — a tripwire. You spot it just before your shin hits it. Carefully, you step over it and ease the door open.",
        "Whatever is below, you've bought yourself a moment."
      ],
      choices: [
        { text: "Step through into the crypt.", next: "crypt_descent" }
      ]
    },

    /* ================================================================
       ACT III — THE CRYPT & MALACHAR'S SANCTUM
    ================================================================ */

    "crypt_descent": {
      chapter: "Act III — The Crypt",
      title: "Into the Dark Below",
      location: "Valdrath's Keep — The Crypt",
      paragraphs: [
        function (s) {
          switch (s.charClass) {
            case "fighter":
              return "The smell doesn't touch you — you've been in siege tunnels, in barrow fields after bad winters, in places where the dead outnumbered the living by a factor you stopped counting. But the silence here is the wrong kind. It is not the silence of emptiness. It is the silence of something that already knows you are there.";
            case "wizard":
              return "The stonework is pre-Imperial — third century at the latest, possibly older, the alcove seals cut in a burial symbology that predates the unified calendar by at least two hundred years. You are cataloging this automatically, the academic reflex stronger than the fear. Whoever built this crypt built it to last forever, which means they expected what they were containing to last just as long.";
            case "rogue":
              return "Your hand drops to wire-check position before you've consciously decided to look, fingers sweeping at knee height across the threshold, then ankle height. Nothing. You straighten slowly, and then the realization settles in: there are no tripwires because there was never anything here to protect from the living. The defenses face the other direction. This place was built to contain, not to exclude.";
            case "cleric":
              return "This place was consecrated, once. You can feel it the way you feel a scar — not what it was, but the shape of what it left behind. Beneath the cold, beneath the green light, beneath everything Malachar has made of this, there is an older thing: a blessing laid down by hands long since turned to dust. It is still here. It has not given up.";
            default:
              return "";
          }
        },
        "The crypt is older than the keep above it. The stone here was cut before Valdrath's family ever claimed this land — older work, from builders whose names are not recorded.",
        "Alcoves line the walls, each sealed with an iron plaque. The dead here are old enough that they don't move. Whatever Malachar commands, he spares the oldest resting here — or perhaps he simply can't reach that far back.",
        "At the far end of the crypt, a passage opens into a lit chamber. The green light is constant now — not flickering. Waiting.",
        function (s) {
          var items = [];
          if (s.flags.has_phylactery) items.push("the phylactery in your pocket pulses like a heartbeat");
          if (s.flags.altar_restored) items.push("the warmth of the reconsecrated altar still lingers at your back");
          if (s.flags.knows_phylactery) items.push("you know what needs to be done");
          if (items.length === 0) return "You walk toward the light with everything you have.";
          return "As you walk: " + items.join(", ") + ".";
        }
      ],
      choices: [
        { text: "Enter the sanctum.", next: "crypt_puzzle" }
      ]
    },

    "crypt_puzzle": {
      chapter: "Act III — The Crypt",
      title: "The Trial of the Ancients",
      location: "Valdrath's Keep — The Seal Chamber",
      choicePrompt: "How do you proceed?",
      paragraphs: [
        "The passage opens into a circular chamber. At its center, a raised dais with a stone seal — eight feet across, covered in interlocking runes that shift slowly as you watch. The passage beyond is blocked by it.",
        "This is old magic. Not Malachar's work — predating him by centuries. Whoever built this crypt built in a test of worthiness.",
        "Four pillars surround the dais, each carved with a different symbol: a sword, a flame, a shadow, and a sunburst."
      ],
      choices: [
        { text: "Approach the sword pillar and test it with force.", onlyFor: ["fighter"], next: "puzzle_fighter" },
        { text: "Study the rune patterns and work out the sequence.", onlyFor: ["wizard"], next: "puzzle_wizard" },
        { text: "Look for a mechanism hidden within the pillar bases.", onlyFor: ["rogue"], next: "puzzle_rogue" },
        { text: "Approach the sunburst pillar and channel your divine connection.", onlyFor: ["cleric"], next: "puzzle_cleric" },
        { text: "Press forward through the seal by force — there's no time for puzzles.", next: "puzzle_force" }
      ]
    },

    "puzzle_fighter": {
      chapter: "Act III — The Crypt",
      title: "The Trial of Steel",
      location: "Valdrath's Keep — The Seal Chamber",
      paragraphs: [
        "The sword pillar responds to your touch — it was built for someone like you. You place your palm against the carved blade and feel it pull, assessing you. It tests your intent, not your strength.",
        "You think of why you came here. Not gold — you stopped thinking about gold three rooms ago. You think of the dead in the hall above who were soldiers once, and deserved better than this.",
        "The pillar glows. The seal retracts with a sound like a held breath releasing."
      ],
      choices: [
        { text: "Step through to the sanctum.", next: "boss_approach", setsFlag: "seal_solved" }
      ]
    },

    "puzzle_wizard": {
      chapter: "Act III — The Crypt",
      title: "The Trial of Lore",
      location: "Valdrath's Keep — The Seal Chamber",
      paragraphs: [
        "The rune sequence is complex — a cascading cipher where each symbol's meaning depends on its neighbor. You trace the pattern with your finger, not touching, reading.",
        "Twenty minutes of work. The solution is elegant: a mathematical relationship built into the original inscription that resolves to a single activation sequence. You speak the seven words in order.",
        "The seal retracts smoothly. It was built to respond to exactly this kind of patient, systematic thinking."
      ],
      choices: [
        { text: "Step through to the sanctum.", next: "boss_approach", setsFlag: "seal_solved" }
      ]
    },

    "puzzle_rogue": {
      chapter: "Act III — The Crypt",
      title: "The Trial of Cunning",
      location: "Valdrath's Keep — The Seal Chamber",
      paragraphs: [
        "The runes are impressive. The mechanism beneath them is simpler — you find it almost immediately, hidden in the floor beneath the shadow pillar's base: four pressure plates, disguised as worn stone.",
        "The sequence matters: shadow, flame, sword, sunburst. You work it out by elimination, pressing each plate and watching which runes dim in response.",
        "The seal drops with a satisfying click. The builders respected a different kind of intelligence."
      ],
      choices: [
        { text: "Step through to the sanctum.", next: "boss_approach", setsFlag: "seal_solved" }
      ]
    },

    "puzzle_cleric": {
      chapter: "Act III — The Crypt",
      title: "The Trial of Faith",
      location: "Valdrath's Keep — The Seal Chamber",
      paragraphs: [
        "The sunburst pillar was carved for you. You place both hands against it and feel the connection immediately — an old consecration, laid down by a priest centuries before your order existed, but recognizable in the way a familiar language is recognizable even in an unfamiliar accent.",
        "You offer what you have: the reconsecration of the altar above, the binding of the wight, the honest reckoning of what you came here to do.",
        "The seal recognizes the gift. It withdraws."
      ],
      choices: [
        { text: "Step through to the sanctum.", next: "boss_approach", setsFlag: "seal_solved" }
      ]
    },

    "puzzle_force": {
      chapter: "Act III — The Crypt",
      title: "Through by Will Alone",
      location: "Valdrath's Keep — The Seal Chamber",
      paragraphs: [
        "The seal doesn't move when you push at it. You attack it with everything you have — blade, shoulder, a running charge — and each time it simply refuses.",
        "Finally you find the edges, wedge your fingers into a gap in the stone, and haul. Something gives — not the seal itself, but a hidden floor plate beneath it, ground down by a century of disuse until it barely holds. Brute insistence has found what patience might have missed.",
        "The seal rises just enough. You squeeze through sideways, scraping both shoulders, and emerge on the other side bruised and breathing hard."
      ],
      choices: [
        { text: "Press on to the sanctum.", next: "boss_approach", setsFlag: "seal_forced" }
      ]
    },

    "boss_approach": {
      chapter: "Act III — The Sanctum",
      title: "The Lich's Sanctum",
      location: "Valdrath's Keep — Malachar's Chamber",
      choicePrompt: "How do you face Malachar?",
      paragraphs: [
        "The chamber beyond is vast — carved from the bedrock below the keep's foundation, lit by green flames that cast no shadows. At its center, on a throne of fused bones and dark iron, sits Malachar.",
        "He was tall, once. He is taller now — stretched by a century of slow transformation, his robes replaced by something that looks like darkness solidified into cloth. His eyes are twin green flames.",
        "'Another one,' he says. His voice has the quality of stone grinding on stone. 'Lord Harwick sends mice to kill lions.'",
        function (s) {
          var lines = [];
          if (s.flags.has_phylactery) lines.push("The phylactery in your pocket screams. Malachar's gaze snaps to you — he can feel it.");
          if (s.flags.seal_solved) lines.push("You came through the trial intact. Whatever the old builders placed in that test, it recognized you as worthy.");
          if (s.flags.altar_restored) lines.push("Malachar's gaze flickers with something almost like unease when it passes over you — the chapel's restoration has weakened his reach into this place.");
          return lines.length > 0 ? lines.join(" ") : "You face him across the chamber.";
        },
        function (s) {
          switch (s.charClass) {
            case "fighter":
              return "His gaze settles on you with the weight of absolute disinterest. 'A soldier,' he says. 'Harwick always sends soldiers first. They come through the gate, they make noise in the hall, they find the stairs.' He tilts his head, the motion a fraction too slow for a living neck. 'Tell me — did he explain to you what a sword accomplishes here? I am genuinely curious whether he told you that, or whether he simply hoped you wouldn't think to ask.'";
            case "wizard":
              return "He leans forward. Something moves in his expression — not warmth, but attention, which in him amounts to the same danger. 'A scholar,' he says, and his eyes narrow as if reading text too small to see. 'Which college. Speak.' He studies you for a long moment and the attention recedes back into cold. 'No. I can see it in how you stand. They sent a student. Harwick could not afford a master, so he sent a student, and hoped the gap wouldn't matter.' He says it the way someone states a proof.";
            case "rogue":
              return "The green light in his eyes shifts — something almost like amusement in a creature that has mostly forgotten the purpose of it. 'A thief,' he says, and does not make it a question. 'Harwick sent a thief to end a lich. I have considered many approaches this century, and that one did not occur to me.' His head tilts. 'Tell me — are you here because he convinced you there was something heroic in it, or are you here for the gold? Be precise. I have had a hundred years to lose patience for inexact answers.'";
            case "cleric":
              return "Something changes. It is small — the green flames in his eyes flare once, and his hands tighten on the arms of the throne — and he corrects it in less than a second, but you saw it. 'You will not speak that name in this place,' he says, and the precision in his voice has an edge in it now that was not there before. 'That power has no reach here. I have spent a century ensuring it.' He says it with the flatness of a man who has checked the same lock every morning for a hundred years, and has never once stopped checking.";
            default:
              return "";
          }
        }
      ],
      choices: [
        { text: function (s) {
            switch (s.charClass) {
              case "fighter": return "He doesn't get to speak first.";
              case "wizard":  return "Force it now. Don't let him cast.";
              case "rogue":   return "Hit first. Ask nothing.";
              case "cleric":  return "Close the distance. The rite needs proximity.";
              default:        return "Attack immediately — drive him back before he can act.";
            }
          }, next: { fighter: "boss_fighter", default: "boss_direct" } },
        { text: "Raise your holy symbol and invoke the rite of unmaking.", onlyFor: ["cleric"], next: { default: "boss_cleric" } },
        { text: "Use the ritual oil from the library to anoint the throne.", requiresFlag: "has_ritual_oil", next: "boss_ritual" },
        { text: "Destroy the phylactery — now, before he can stop you.", requiresFlag: "has_phylactery", next: "boss_phylactery" },
        { text: "Exploit the weakness you learned — strike where he is unbound.", requiresFlag: "know_weakness", next: "boss_cunning" }
      ]
    },

    "boss_fighter": {
      chapter: "Act III — The Sanctum",
      title: "Steel Against the Undying",
      location: "Valdrath's Keep — Malachar's Chamber",
      paragraphs: [
        "Malachar laughs — and then stops laughing as you cover the distance between you faster than he expected. He raises a hand and black lightning pours from his fingers. You drop under it, come up inside his reach, and hit him with everything you have.",
        "He is not made of bone and void alone. There is something still physical about him — and physical things can be broken. You discover this by breaking several of them in quick succession.",
        "He falls. Slowly. Still fighting until the last second, green fire fading from his eyes.",
        function (s) {
          switch (s.charClass) {
            case "fighter": return "You have stood over men who fell in battle before. This is different. The fear does not leave all at once — it drains out slowly, like water from a wound, and you realize only now how much of it you were carrying.";
            case "wizard":  return "There is something in the way his power dissipates — not at once but in cascading intervals, each subsystem of his binding collapsing in sequence — that your mind, even now, cannot help but catalog.";
            case "rogue":   return "You note the angle of his fall, the position of his hands, the silence that has replaced the lightning. You are already thinking about the exit. Force of habit. It has kept you alive.";
            case "cleric":  return "You have ended things before — undead reduced to dust by the word of your god. This is not the same. There is a difference between destruction and release, and you felt it in the last moment of the green light.";
            default:        return "";
          }
        },
        function (s) {
          return s.flags.has_phylactery
            ? "The phylactery in your pocket shatters on its own as the binding breaks."
            : s.flags.seal_solved
            ? "The seal you passed weighs on the air above you — you came here worthy of this."
            : "The binding holds — he is weakened but not destroyed. He will return, diminished, in years or decades.";
        }
      ],
      choices: [
        { text: "See the end of this.", next: function (s) {
          if (s.flags.has_phylactery || s.flags.seal_solved) return "end_heroic";
          return "end_costly";
        }}
      ]
    },

    "boss_direct": {
      chapter: "Act III — The Sanctum",
      title: "The Final Battle",
      location: "Valdrath's Keep — Malachar's Chamber",
      paragraphs: [
        "You charge and Malachar rises to meet you. He is stronger than anything you have faced — black lightning, cold hands that drain warmth on contact, a body that shrugs off blows that would kill a living man.",
        "You fight for a long time. Longer than you thought you could. You take damage that will take weeks to heal.",
        function (s) {
          switch (s.charClass) {
            case "fighter": return "A trained soldier knows the difference between a fight they can win and one they are simply refusing to lose. This is the second kind. You made your peace with it somewhere around the fourth time he knocked you down.";
            case "wizard":  return "You have calculated — despite everything — that he is expending more energy than you are to produce each attack. The calculus will not save you. You keep fighting anyway, because the alternative has already been ruled out.";
            case "rogue":   return "The smart move would have been to run ten minutes ago. You are aware of this. You are also aware that running was never actually on the table, which is an annoying thing to discover about yourself.";
            case "cleric":  return "You stopped asking your god for strength after the second time it didn't come. You keep fighting on your own, which is all that's left, which turns out to be enough to matter.";
            default:        return "";
          }
        },
        "Eventually, through sheer refusal to stop, you drive him back. He does not fall — but he retreats, pulling his power inward.",
        function (s) {
          if (s.flags.has_phylactery) return "The phylactery explodes in your pocket. The binding shatters. Malachar screams and comes apart at the seams.";
          if (s.flags.seal_solved) return "Without destroying the phylactery, you cannot kill him. He sinks into the throne and goes still — dormant, beaten back, but not ended.";
          return "Malachar does not fall. You cannot make him fall. When you can no longer lift your arm, he stops — not out of mercy, but because you have ceased to be interesting. You are allowed to leave.";
        }
      ],
      choices: [
        { text: "See how it ends.", next: function (s) {
          if (s.flags.has_phylactery) return "end_heroic";
          if (s.flags.seal_solved) return "end_partial";
          return "end_defeat";
        }}
      ]
    },

    "boss_cleric": {
      chapter: "Act III — The Sanctum",
      title: "The Light of Dawn",
      location: "Valdrath's Keep — Malachar's Chamber",
      paragraphs: [
        "You raise your holy symbol and speak the rite — the full version, not the shortened battlefield prayer. The words are old and they cost something to say correctly.",
        "Malachar raises his hands and the green flames surge. But the rite is not aimed at the fire — it is aimed at the binding itself. At the hundred-year-old chain that holds his soul to this place.",
        function (s) {
          if (s.flags.altar_restored) {
            return "The chapel above answers. The reconsecrated altar amplifies the rite across the keep's foundations. Malachar screams — a sound that has been waiting a century to happen.";
          }
          return "The rite lands and holds. Malachar convulses, green light fragmenting at the edges of him.";
        },
        function (s) {
          if (s.flags.has_phylactery || s.flags.altar_restored) {
            return "The binding breaks. The phylactery dissolves. Malachar comes apart into cold green sparks and is gone.";
          }
          return "He is weakened — badly. The binding frays but holds. He withdraws into the throne, dormant.";
        }
      ],
      choices: [
        { text: "Witness the end.", next: function (s) {
          return (s.flags.has_phylactery || s.flags.altar_restored) ? "end_heroic" : "end_partial";
        }}
      ]
    },

    "boss_ritual": {
      chapter: "Act III — The Sanctum",
      title: "The Rite of Unmaking",
      location: "Valdrath's Keep — Malachar's Chamber",
      paragraphs: [
        "You uncork the ritual oil and cross the chamber in a dead run, sliding the last ten feet and slamming your shoulder against the throne. Malachar's lightning misses by a hand's width.",
        function (s) {
          switch (s.charClass) {
            case "fighter": return "Lightning hits the stone beside your hand and you do not move. You have been under fire before. The hand that uncorks the vial is steady — not because you are not afraid, but because fear has never been a reason to stop.";
            case "wizard":  return "You recite the preparation clause from memory — you read it three times in the library and once is usually enough for you. The throne hums under your palm as if it recognizes what is coming.";
            case "rogue":   return "You have exactly one chance and no margin. You are comfortable with this. Most of your best work has happened in exactly these conditions.";
            case "cleric":  return "You press your palm to the cracked stone and feel the wrongness of it — a century of corruption, a soul held in bondage, the weight of every year Malachar should not have had. You hold onto that. You speak the word with that weight behind it.";
            default:        return "";
          }
        },
        "You anoint the throne with the oil and speak the word from the torn page.",
        "Malachar howls. The throne cracks from base to top, green light hemorrhaging through the fractures. 'What — how did you — '",
        "He never finishes the sentence. The binding unravels. The soul he trapped in this place is finally free — free to pass, free to end. The green flames go out all at once."
      ],
      choices: [
        { text: "Stand in the sudden dark.", next: "end_heroic" }
      ]
    },

    "boss_phylactery": {
      chapter: "Act III — The Sanctum",
      title: "Breaking the Stone",
      location: "Valdrath's Keep — Malachar's Chamber",
      paragraphs: [
        "You pull the phylactery from your pocket. Malachar's reaction is immediate and total — he lunges from the throne with a speed his frame shouldn't be capable of, all composure gone.",
        "He crashes into you before you can act. You go down hard, stone floor, his hands at your throat, cold burning through your skin.",
        "You close your fist and squeeze.",
        function (s) {
          switch (s.charClass) {
            case "fighter": return "You have broken things under pressure before — locks, shackles, a man's grip at a critical moment. The body knows what to do with resistance. You give it everything.";
            case "wizard":  return "You feel the containment matrix inside the stone give way — layers of protection carved into the mineral structure, unraveling in the correct sequence. You understand, in this instant, what it cost him to make it. It is the last thought that will ever be directly about him.";
            case "rogue":   return "You've carried it since the throne room. The whole way through the crypt. An ugly little stone that wanted to be somewhere else. You think: not anymore.";
            case "cleric":  return "Somewhere in there, under a hundred years of his shaping, is the man he was before he made the choice that brought him here. You say his name — his real name, the one carved on the altar stone before he defaced it — and then you close your hand.";
            default:        return "";
          }
        },
        "The phylactery shatters. Black light pours through your fingers. Malachar's grip vanishes. He flies backward — pulled apart from the inside — and the green flames guttering in every brazier go out as he comes undone."
      ],
      choices: [
        { text: "Get up. It's over.", next: "end_heroic" }
      ]
    },

    "boss_cunning": {
      chapter: "Act III — The Sanctum",
      title: "Finding the Weakness",
      location: "Valdrath's Keep — Malachar's Chamber",
      paragraphs: [
        "You know what the wight told you: where the binding is anchored. Not the throne, not the phylactery — the line of power that runs between them, visible to the right kind of attention.",
        "You don't fight Malachar. You move around him, forcing him to turn, keeping him reactive while you trace that line of power to its narrowest point — a place where the binding is thinnest, where the chain linking his soul to the phylactery is exposed.",
        function (s) {
          switch (s.charClass) {
            case "fighter": return "There — an overextension in his guard, the same gap you'd exploit in a sparring match, except it runs through the air itself and tastes of iron filings. You've read that gap a thousand times. You close on it.";
            case "wizard":  return "The lattice of his binding has a flaw in the fourth anchoring layer — not a mistake, exactly, but a compromise made under duress when he laid the original working. A knot tied too tight in one direction, which means it is too loose in another. You mark it.";
            case "rogue":   return "Every lock has a shear point — the place where the mechanism is thinnest, where one precise force in the right direction makes the whole thing give. You found it in the wight's instructions. You find it again now with your eyes.";
            case "cleric":  return "The sacred order does not break cleanly, but it reasserts. Here — a place where the corruption has thinned, where Malachar's will has grown old and brittle, where the light that was here before him has started, without any help, to come back. You put your hand on it.";
            default:        return "";
          }
        },
        "You hit it. Hard. With everything you have.",
        "The line snaps. Malachar staggers, looks at his hands as the green fades from them, and speaks one word in a language you don't understand. It might have been the word for home.",
        "Then he is gone."
      ],
      choices: [
        { text: "Stand in the silence.", next: "end_heroic" }
      ]
    },

    /* ================================================================
       ENDINGS
    ================================================================ */

    "end_heroic": {
      chapter: "The End",
      title: "The Curse Broken",
      location: "Valdrath's Keep — Dawn",
      isEnding: true,
      paragraphs: [
        function (s) { return "The keep is silent for the first time in a century. " + s.name + " stands in the dark of the sanctum and listens to nothing at all."; },
        "Then: sound. Wind, from somewhere above. A distant bird call — the first one you've heard since crossing into the Thornwood. The world remembering how to be alive.",
        "When you climb back through the keep, the undead are gone — not fled, not hiding, but simply ended, their animating force released. Bones lie in scattered piles. The green light is gone from every window.",
        "Lord Harwick meets you at the gate at sunrise. He pays without hesitation and adds a third more. You get the sense he expected to be paying someone else — or paying no one.",
        function (s) {
          switch (s.charClass) {
            case "fighter":
              return "You think of the three Harwick mentioned in passing, the ones who came before you and didn't come out. They found the same hall, the same stairs, the same green light. " + s.name + " found all of it too, and came back through it, just barely, at a price that only makes sense because the alternative was worse. That's how these things balance. It's enough. It usually has to be.";
            case "wizard":
              return "You go back for the library before you leave. The binding's collapse has brought down sections of shelving, but there are texts in the rubble that Malachar kept nowhere else in the world, and " + s.name + " is not going to walk away from that. You spend three hours with a satchel before the light gets too low. The work of understanding what he did — and why it failed — hasn't started yet. It will take years. You find you don't mind that.";
            case "rogue":
              return "You count the coin on the gatehouse steps in the first good light, the way you always do, because that is the whole point. The number is right. The number is more than right. " + s.name + " sits with the number and notices, after a moment, that the number isn't what you're thinking about — you're thinking about the bones in the hall, and the way they went still. You hadn't come here to feel anything about that. Apparently that didn't hold.";
            case "cleric":
              return s.name + " does not leave with the others. You go back down to the crypt — the oldest part, where the blessing still breathes beneath the stone — and you kneel, and you speak the burial rites for every name carved on every sealed alcove, and for the nameless ones in the hall above who received nothing. It takes the better part of an hour. Lord Harwick sends someone to find you when you don't appear at the gate. You are not finished. You finish when you are finished.";
            default:
              return "The city of Thornwall will tell this story for a generation. The name of " + s.name + " the " + s.charClass + " will be spoken in the same breath as the name of Malachar — the thing undone by the thing that was not afraid of it.";
          }
        }
      ]
    },

    "end_costly": {
      chapter: "The End",
      title: "Victory's Price",
      location: "Valdrath's Keep — The Morning After",
      isEnding: true,
      paragraphs: [
        function (s) { return s.name + " emerges from the keep at dawn, moving slowly. The curse is broken — Malachar driven back so deeply into dormancy that he may not surface again for decades, perhaps longer."; },
        "It is not the clean victory the songs would tell. But the dead are still and the green light is gone and Thornwall will sleep without nightmares for a while.",
        "Lord Harwick pays. He offers a healer without asking. You accept both.",
        "The Thornwood is already quieter as you ride south — birds returning, the fog thinning in the morning light.",
        function (s) {
          if (s.charClass === "fighter") return "You count the bruises on the ride south, the way you always do. Less than you deserved, given what you walked into. That lands in the right column.";
          if (s.charClass === "wizard") return "You fill three pages of notes before Thornwall is out of sight. The cost was real. The knowledge earned may be worth more — someday, to someone.";
          if (s.charClass === "rogue") return s.name + " came for gold and leaves with gold, scars, and a story that'll never be sold. The story is worth more. It always ends up that way.";
          return "The road south is a long prayer — not for the wounds, but for the dead still held in Malachar's grip. Someone will come back and finish this. " + s.name + " knows that, and carries it.";
        }
      ]
    },

    "end_partial": {
      chapter: "The End",
      title: "The Lich Retreats",
      location: "Valdrath's Keep — Before Dawn",
      isEnding: true,
      paragraphs: [
        function (s) { return s.name + " climbs back through the keep alone. The green light has dimmed — not gone, but banked, like coals after the fire is kicked apart."; },
        "Malachar is weakened. Driven back into the bedrock of his crypt, his undead scattered to dust without his will to hold them. He is not destroyed. He will return, in years or decades, when his power has knit itself back together. Someone will have to come back and finish this.",
        "But not tonight. Not this season. Thornwall will sleep without nightmares for a while.",
        "Lord Harwick pays a portion of the promised gold without argument. His expression is unreadable, but he does not insult you by calling it a failure. You get the sense he understands, at least, what you walked into.",
        function(s) {
          if (s.charClass === "fighter") return "A soldier's result: you drove the enemy back. That it wasn't permanent sits poorly — but it sits the way all unfinished battles do, heavy, until you're ready to set it down.";
          if (s.charClass === "wizard") return "You understand exactly what happened and exactly where you fell short. That clarity is its own burden. You begin, already, planning the correction.";
          if (s.charClass === "rogue") return "You walked into the lion's mouth and walked out again. The lion is still there. " + s.name + " is already thinking about the second trip — what to bring, what to do differently.";
          return "The road south is a long prayer. Not for the wounds — those will mend. For the dead still held in Malachar's grip. Someone will come back for them. " + s.name + " carries that weight all the way home.";
        }
      ]
    },

    "end_defeat": {
      chapter: "The End",
      title: "Darkness Eternal",
      location: "Valdrath's Keep",
      isEnding: true,
      paragraphs: [
        "Malachar is patient. He has been patient for a century. He will be patient for another.",
        function (s) { return s.name + " came further than most — deeper into the keep, closer to the truth of what lives here than any of Lord Harwick's previous attempts."; },
        function(s) {
          if (s.charClass === "fighter") return "You gave everything you had. No soldier can do more. The defeat won't shame you — but it will haunt you, the way all lost fights do.";
          if (s.charClass === "wizard") return "You know more about Malachar now than when you arrived. Knowledge without application is catalogued failure — unless you carry it out and put it to use.";
          if (s.charClass === "rogue") return "Cut losses. Survive. Come back smarter. These are the rules that keep you breathing, and you are still breathing. That is not nothing.";
          return "You were not enough — not this time. Your faith didn't fail you; the situation demanded more than one pair of hands. That's not a judgment. It's an accounting.";
        },
        "That almost matters. But almost is the word the dead know best.",
        "The green light burns on in Valdrath's Keep, visible from the road on clear nights. Thornwall closes its shutters and does not look north after dark.",
        "The story is not over. It is only waiting for someone else to try."
      ]
    }

    }
  }
});
