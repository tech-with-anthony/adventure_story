/* story-data.js — stub for engine verification. Full story added next. */
window.STORY = {
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
        "The messenger's hands tremble as he slides the coin purse across the table."
      ],
      choices: [
        { text: "Accept without question — fifty gold crowns is fifty gold crowns.", next: "road_bold" },
        { text: "Ask the messenger what he knows about the dangers inside.", next: "road_wise" },
        { text: "Slide the purse back. You'll do it — for double the price.", next: "road_equipped" }
      ]
    },

    "test_engine_ok": {
      chapter: "Engine Test",
      title: "All Systems Go",
      location: "Stub Story",
      isEnding: true,
      paragraphs: [
        function (s) { return "Welcome, " + s.name + " the " + s.charClass + ". The engine works."; },
        "Class gates, flags, branching next — all functional.",
        "The real story will replace this stub in the next commit."
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
        "By the time Valdrath's Keep appears ahead, your boots are soaked and your nerves are frayed. Not the arrival you imagined."
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
        "The messenger also mentions that the keep's east postern gate has a hidden latch — only the household staff knew about it."
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
        "Ewen presses a cold iron key into your hand. 'Postern gate. East wall. Don't use the front — they'll hear you coming.' He won't say who 'they' are. He doesn't have to."
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
        "You've heard enough. More information means more time, and time is something the dead don't waste.",
        "The road to Valdrath is quiet — unnaturally so. No birds. No insects. Just fog and the crunch of gravel under your boots.",
        "By evening, the keep's silhouette breaks the treeline. Stone walls. A collapsed tower. And silence."
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
        "You study the gatehouse. The main door is heavy oak, barred from the inside. A narrow window sits above the portcullis — reachable if you climbed. The east wall, just visible around the corner, might have other options."
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
        "You step into a stone passage that smells of rot and cold earth. Somewhere ahead, a faint green light flickers."
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
    }

  }
};
