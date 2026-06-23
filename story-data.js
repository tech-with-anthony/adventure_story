/* story-data.js — The Curse of Valdrath's Keep: complete scene graph */
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
        "A green light pulses faintly from somewhere above — the keep's upper floors. It flickers in a rhythm that might be breathing, if light could breathe."
      ],
      choices: [
        { text: "Go left — toward the sound of movement. Face whatever waits.", next: "keep_hall_combat" },
        { text: "Go straight — the library. Knowledge of what you're fighting.", next: { wizard: "keep_library_wizard", default: "keep_library" } },
        { text: "Go right — the armory. Better equipped, better odds.", next: { fighter: "keep_armory_fighter", default: "keep_armory" } }
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
        "You raise your holy symbol and speak the words of turning. The skeletons hesitate — a visible shudder passes through them, like wind through paper.",
        "Three of the six crumble where they stand, their animating force burned out by your faith. The remaining three advance, but they're slower now, fighting something they can't understand.",
        "You finish them with blade and prayer. The room settles into silence."
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
        "There are also scattered notes in a more modern hand — someone else's research."
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
        "The ghost watches you the whole time. It doesn't move or speak."
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
        "You try to address the ghost — name yourself, explain why you've come. It stares through you. Not hostile. Simply unreachable, locked in whatever moment it's trapped in.",
        "After a few minutes, you give up. The ghost has nothing for you today.",
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
        "The wight doesn't speak. But it doesn't advance, either. It tilts its head — listening to something you can't hear.",
        "Then it steps aside.",
        "Not all the way. Not permanently. But enough: a clear path to the throne's flagstone, and a window of seconds to use it."
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
        "You pause on the landing. The door is ahead. You will not be able to come back this way once you push through."
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
        "Finally you find the edges, wedge your fingers into a gap in the stone, and haul. Something gives — not the seal, but the floor plate beneath it. You've forced a mechanical bypass.",
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
        }
      ],
      choices: [
        { text: "Attack immediately — drive him back before he can act.", next: { fighter: "boss_fighter", default: "boss_direct" } },
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
        "Eventually, through sheer refusal to stop, you drive him back. He does not fall — but he retreats, pulling his power inward.",
        function (s) {
          if (s.flags.has_phylactery) return "The phylactery explodes in your pocket. The binding shatters. Malachar screams and comes apart at the seams.";
          return "Without destroying the phylactery, you cannot kill him. He sinks into the throne and goes still — dormant, beaten back, but not ended.";
        }
      ],
      choices: [
        { text: "See how it ends.", next: function (s) {
          return s.flags.has_phylactery ? "end_heroic" : "end_partial";
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
          return "The city of Thornwall will tell this story for a generation. The name of " + s.name + " the " + s.charClass + " will be spoken in the same breath as the name of Malachar — the thing undone by the thing that was not afraid of it.";
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
          return "It cost something to come here. " + s.name + " knows that. But the balance sheet, on reflection, lands in the right direction.";
        }
      ]
    },

    "end_partial": {
      chapter: "The End",
      title: "The Lich Retreats",
      location: "Valdrath's Keep — Before Dawn",
      isEnding: true,
      paragraphs: [
        function (s) { return s.name + " made it out. That counts for something."; },
        "Malachar is weakened — driven back into the deep stone of his crypt, his power diminished, his undead scattered. He is not destroyed. He will return, someday, if no one goes back to finish what was started.",
        "But not this year. Not next year. And Thornwall can breathe for now.",
        "Lord Harwick pays a portion of the promised gold, his expression unreadable. You get the sense he understands, at least, what you walked into.",
        "The road south is cold and long. But you are on it, which is not nothing."
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
        "That almost matters. But almost is the word the dead know best.",
        "The green light burns on in Valdrath's Keep, visible from the road on clear nights. Thornwall closes its shutters and does not look north after dark.",
        "The story is not over. It is only waiting for someone else to try."
      ]
    }

  }
};
