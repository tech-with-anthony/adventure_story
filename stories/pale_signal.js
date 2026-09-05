window.STORIES = window.STORIES || [];
window.STORIES.push({
  id:      "pale_signal",
  title:   "The Pale Signal",
  blurb:   "1923. A lighthouse has gone dark, its keeper vanished. On the rocks below, something pulses in the deep — a pattern older than ships, older than shores. You have been sent to find out what happened. You will wish you hadn't.",
  classes: [
    {
      id:   "captain",
      name: "Captain",
      tag:  "Authority & Navigation",
      desc: "You have sailed every sea on the chart and a few that aren't. You command and are obeyed. What you know of the deep is practical — it is what lies beneath the practical that unsettles you."
    },
    {
      id:   "engineer",
      name: "Engineer",
      tag:  "Mechanics & Grit",
      desc: "Machinery is honest. It breaks for reasons. You came to fix the lighthouse mechanism, not to chase mysteries — but you have a talent for understanding how things fail."
    },
    {
      id:   "radioman",
      name: "Radioman",
      tag:  "Signals & Pattern",
      desc: "You live in the space between transmissions. You can hear structure in noise. Three nights ago you picked up something on the long-wave band that made you put the headset down and stare at the wall for a long time."
    },
    {
      id:   "naturalist",
      name: "Naturalist",
      tag:  "Observation & Record",
      desc: "You document what you observe. You resist interpretation. You have seen stranger things than most and you have never flinched from writing them down. You will write this down too."
    }
  ],
  achievements: [
    { id: "first_signal",      icon: "🚨", title: "Dark Shore",           desc: "Set foot inside Morrow Light.",                              condition: { type: "scene_visit",  scene: "lighthouse_exterior" } },
    { id: "captain_victor",    icon: "⚓", title: "Clear Harbour",        desc: "Seal the signal and get everyone out as a Captain.",         condition: { type: "class_ending", charClass: "captain",    ending: "end_sealed" } },
    { id: "engineer_victor",   icon: "⚙️", title: "Engine Room",          desc: "Destroy the source with grit and machinery as an Engineer.", condition: { type: "class_ending", charClass: "engineer",   ending: "end_sealed" } },
    { id: "radioman_victor",   icon: "📡", title: "Signal Locked",        desc: "Decode and survive the signal as a Radioman.",               condition: { type: "class_ending", charClass: "radioman",   ending: "end_sealed" } },
    { id: "naturalist_victor", icon: "🔭", title: "Field Notes",          desc: "Observe, record, and return alive as a Naturalist.",         condition: { type: "class_ending", charClass: "naturalist", ending: "end_sealed" } },
    { id: "consumed",          icon: "🌊", title: "Below the Threshold",  desc: "Be consumed by the signal.",                                condition: { type: "any_ending",   ending: "end_consumed" } },
    { id: "broadcast",         icon: "📻", title: "Open Channel",         desc: "Broadcast the signal outward.",                             condition: { type: "any_ending",   ending: "end_broadcast" } },
    { id: "keeper_found",      icon: "🕯️", title: "Keeper's Fate",        desc: "Discover what happened to Keeper Morrow.",                  condition: { type: "flag_set",     flag: "found_keeper" } },
    { id: "journal_read",      icon: "📓", title: "Descent in Ink",       desc: "Read the keeper's journal entries.",                        condition: { type: "flag_set",     flag: "has_journal" } },
    { id: "cave_reached",      icon: "🌀", title: "The Source",           desc: "Descend to the origin of the signal.",                      condition: { type: "flag_set",     flag: "cave_reached" } },
    { id: "engine_running",    icon: "⚡", title: "Turning Again",        desc: "Restore the lighthouse engine to operation.",               condition: { type: "flag_set",     flag: "engine_running" } },
    { id: "first_contact",     icon: "📶", title: "First Contact",        desc: "Find the hidden ending — answer the signal as a Radioman.",  condition: { type: "any_ending", ending: "end_contact" } },
    { id: "all_endings",       icon: "📜", title: "Full Spectrum",        desc: "Discover all four endings of The Pale Signal.",             condition: { type: "all_endings" } },
    { id: "nineteenth_element", icon: "🌑", title: "The Nineteenth Element", desc: "Return to Dursey Rock having heard the signal end every way it can end.", condition: { type: "scene_visit", scene: "epilogue_end" } }
  ],
  story: {
    start: "harbor",
    scenes: {

      /* ═══════════════════════════════════════════
         ACT I — THE VOYAGE
         ═══════════════════════════════════════════ */

      harbor: {
        chapter:  "Act I — The Voyage",
        title:    "Colder Harbour",
        location: "Dunmore Quay — dawn, October 1923",
        paragraphs: [
          "The harbour master's office smells of tar and damp paperwork. A man from the Lighthouse Authority — overcoat, watch chain, the permanent anxiety of an administrator — has been waiting since before dawn. He spreads a chart on the table without preamble.",
          "\"Morrow Light. Twelve miles offshore, Dursey Rock. Three nights dark. The coastal steamer Hibernia ran aground on the eastern shelf Wednesday last — nine dead, eleven missing. We need to know what happened and we need the light operational.\"",
          "His finger traces the approach. \"Last communication from Keeper Morrow was eight days ago. Routine. His assistant, Hale, sent a telegram nine days ago — not routine. It read: 'Keeper unwell. Behaviour concerning. Advise contact.' We sent a cutter two days later. They found the dock empty. Both men gone.\"",
          function (s) {
            if (s.charClass === "captain") return "You study the chart. The approach is straightforward in fair weather — a single navigable channel between two reefs. The question is the tender: the harbour authority is offering their cutter, but you'd rather choose your own vessel and crew.";
            if (s.charClass === "engineer") return "Your eyes go to the notation in the margin: 'Fresnel fourth-order dioptric, 1887 installation. Steam-driven rotation mechanism.' Old equipment. Well-maintained according to the last inspection, but old. You wonder if the mechanism failed first, or if the men did.";
            if (s.charClass === "radioman") return "You haven't told the harbour master what you heard three nights ago. Long-wave, somewhere below the standard maritime band — a repeating geometric pattern, almost too regular to be natural. Almost. You'd been trying to triangulate the source when you heard the lighthouse had gone silent.";
            return "You take out your notebook. You write: Keeper E. Morrow, 58, stationed Dursey Rock eleven years. Assistant T. Hale, 26, posted 14 months. Last contact 8 days ago. 2 men missing. 9 dead. The facts arrange themselves on the page. They don't yet tell you anything.";
          },
          "The authority man is still talking about liability and salvage rights. Outside, a thin rain has begun. The tide turns in an hour."
        ],
        choices: [
          {
            text: "Request the fastest vessel available and set out immediately.",
            next: "sea_crossing",
            setsFlag: "pressed_hard"
          },
          {
            text: "Ask to see Hale's original telegram and any other communications.",
            next: "harbor_records"
          },
          {
            text: "Study the approach chart before committing to anything.",
            next: "harbor_chart"
          }
        ]
      },

      harbor_records: {
        chapter: "Act I — The Voyage",
        title:   "The Paper Trail",
        location: "Dunmore Quay — harbour master's office",
        paragraphs: [
          "The harbour master produces a thin folder. Morrow's log entries, copied out. Monthly maintenance reports. Two telegrams.",
          "The first, Hale's warning: KEEPER UNWELL STOP BEHAVIOUR CONCERNING STOP ADVISE CONTACT STOP HALE. Nine words. The restraint of a young man who doesn't know how much to say.",
          "The second is older, sent six weeks ago, from Morrow himself: MODIFICATION TO SIGNAL SCHEDULE REQUIRED STOP INVESTIGATING ANOMALOUS ACOUSTIC PHENOMENON STOP REQUEST LEAVE OF ABSENCE FROM STANDARD WATCH STOP MORROW. The request was denied.",
          function (s) {
            if (s.charClass === "captain") return "Addressed. The word stops you. A signal that is addressed implies a sender that intends to be heard. Morrow was a practical man — an anomalous acoustic phenomenon. If he used that phrase, it was because nothing else fit.";
            if (s.charClass === "engineer") return "'Modification to signal schedule.' He'd been changing the light pattern. Unauthorised. That's why the coastal steamer ran aground — the Hibernia's pilot was navigating by a schedule that no longer matched what the lighthouse was actually doing.";
            if (s.charClass === "radioman") return "Anomalous acoustic phenomenon. He'd heard something too. Six weeks ago. And he'd tried to get permission to investigate it instead of doing his job. The pattern you picked up three nights ago — is that what he found?";
            return "You copy both telegrams into your notebook, word for word. The significant detail is the six-week gap: Morrow heard something, tried to report it through proper channels, was refused, and then stopped reporting anything at all.";
          }
        ],
        choices: [
          { text: "You have enough. Head for the dock.", next: "sea_crossing", setsFlag: "has_records" }
        ]
      },

      harbor_chart: {
        chapter: "Act I — The Voyage",
        title:   "The Approach",
        location: "Dunmore Quay — harbour master's office",
        paragraphs: [
          "Dursey Rock is a basalt shelf, mostly submerged, with the lighthouse built on the one flat area large enough to hold a foundation. The surrounding ocean floor drops sharply — three hundred fathoms within a quarter mile of the rock.",
          "The navigable channel runs northwest to southeast. The eastern reef is submerged at high water. A small spiral has been drawn in a different hand than the standard survey markings, just to the southwest of the rock, in very deep water. Someone added it after the chart was printed.",
          function (s) {
            if (s.charClass === "captain") return "You note two things: the channel is tight enough that you'll need to come in at reduced speed, and that added spiral sits over the deepest part of the approach — 340 fathoms. Someone was noting something at that depth, and it wasn't a navigation hazard.";
            if (s.charClass === "engineer") return "The foundation notes show the lighthouse sits directly over a fissure in the basalt. Fissures transmit sound. An acoustic anomaly in the deep water could propagate directly up through the rock to the lighthouse itself.";
            if (s.charClass === "radioman") return "You trace the depth contours. Three hundred fathoms — deep enough for a different kind of acoustic propagation. Long waves travel differently at depth; they can be channelled, amplified, reflected by the topology of the seabed. Whatever Morrow heard, the location would have been almost ideal for receiving it.";
            return "In the chart's margin, in the same unofficial hand as the spiral: a single word: Abyssal. Not a species. A depth category. Someone was noting what lives very deep near this rock, and thought it worth recording on an Admiralty chart.";
          }
        ],
        choices: [
          { text: "Set out. You've seen enough.", next: "sea_crossing", setsFlag: "studied_chart" }
        ]
      },

      sea_crossing: {
        chapter: "Act I — The Voyage",
        title:   "Open Water",
        location: "Atlantic — twelve miles offshore",
        paragraphs: [
          "The harbour authority cutter is a sound vessel — forty feet, diesel-powered, built for the coast. The crew are three: the skipper, a deckhand who barely speaks, and a boy who looks about sixteen and is probably twenty.",
          "The rain has eased. A grey sea, moderate swell, the coast falling behind. To the northwest, the cloud base is lower and darker. There's weather behind it, but they'll make the rock before it arrives.",
          function (s) {
            if (s.charClass === "captain") return "You take the helm for the first hour, not because you doubt the skipper but because it steadies you. The wheel tells you things. The Atlantic this morning has a quality you don't have a name for — not rough, not calm, but present in a way it usually isn't.";
            if (s.charClass === "engineer") return "You spend the crossing in the engine compartment. The engine note echoes strangely against the hull. You check the hull integrity. It's fine. The resonance is something else, something outside, something in the water itself.";
            if (s.charClass === "radioman") return "You've brought your portable receiver. The batteries are fresh. You tune down below the maritime band and find it within four minutes: the same geometric pattern you heard three nights ago, cleaner now, louder as you approach. You write down the pattern in your notebook. Sixteen beats. Then silence. Then sixteen beats again.";
            return "The water changes colour eleven miles out — not dramatically, but the shade shifts from slate to something deeper. You lean over the rail and look down. At the edge of visibility, a slow rhythmic pulsing, faint bioluminescence. Not unusual for deep water. But this close to the surface, at this latitude, in October — that is unusual.";
          },
          "The lighthouse appears as a white stroke against the dark rock. No light. No movement on the dock."
        ],
        choices: [
          { text: "Scan the dock as you approach.", next: "approach_lighthouse" }
        ]
      },

      approach_lighthouse: {
        chapter: "Act I — The Voyage",
        title:   "Dursey Rock",
        location: "Approaching the lighthouse — 200 yards off",
        paragraphs: [
          "Dursey Rock resolves from a stripe to a place. The lighthouse is a white tower, perhaps sixty feet, with the keeper's house attached at the base — stone walls, slate roof, a small garden plot that has gone to salt and wind.",
          "The dock is a concrete platform with iron mooring rings. A rowing boat is tied there — still here, which means neither man left by sea. The dock shows no sign of struggle. Nothing overturned. Just emptiness and a coiled rope with a frayed end.",
          function (s) {
            if (s.charClass === "captain") return "Your eye goes immediately to the light mechanism at the top of the tower. The glass is intact. The lantern room door appears shut. The air intake vent for the steam engine shows no heat shimmer. The engine has been cold for some time.";
            if (s.charClass === "engineer") return "The frayed rope end holds your attention. Not cut — frayed, as if something pulled against it hard enough and long enough that the fibres gave one by one. Something was tied there and pulled against it consistently. That is not panic. That is sustained tension.";
            if (s.charClass === "radioman") return "You look at the tower and then at the water around the base of the rock. The signal is stronger now — you can feel it more than hear it, a vibration at a frequency below conscious hearing that sits in the base of your skull.";
            return "You take out your notebook and begin recording. Lighthouse intact. No visible damage to exterior. Equipment store door open — notable. Coal shed closed. Garden plots showing normal autumn die-back. No evidence of struggle on visible surfaces. Rowing boat present.";
          }
        ],
        choices: [
          { text: "Come alongside and tie up at the dock.", next: "dock_landing" }
        ]
      },

      dock_landing: {
        chapter: "Act I — The Voyage",
        title:   "The Dock",
        location: "Dursey Rock — concrete dock",
        paragraphs: [
          "The mooring is easy. The rock is sheltered from the west swell by its own mass. You tie up and step onto the dock.",
          "The sound is the first thing: beneath the usual wind and wave, something subaudible. Not quite a hum. Not quite silence. The rock seems to vibrate faintly under your feet.",
          "A set of boot prints in a patch of algae near the dock edge — leading toward the water, not away from it. Stopping at the edge. No prints coming back.",
          function (s) {
            if (s.charClass === "captain") return "You crouch beside the boot prints. A large man's boot, size nine or ten. The depth and spacing suggest someone walking deliberately, not running. They stopped at the edge and simply ceased. There is no sign of a jump, no disturbance in the algae beneath.";
            if (s.charClass === "engineer") return "You examine the mooring ring where the frayed rope is attached. The ring itself is sound — the rope failed, not the hardware. The fraying pattern is heaviest at the ring end, as if the force was applied outward. Something was pulling away from the rock, not toward it.";
            if (s.charClass === "radioman") return "The signal is loudest here, at the dock edge. You take a directional reading with the portable set. Northwest. Into open water northwest of the rock. Nothing on the chart there — only deep water, 300 fathoms, nothing that should produce any signal at all.";
            return "You photograph the boot prints and measure the stride length — 26 inches, consistent with a man walking at normal pace. Not fleeing. Going somewhere. The algae is still slightly compressed; the prints are probably not more than a day old.";
          }
        ],
        choices: [
          { text: "Proceed to the lighthouse.", next: "lighthouse_exterior" }
        ]
      },

      lighthouse_exterior: {
        chapter: "Act I — The Voyage",
        title:   "The Lighthouse",
        location: "Dursey Rock — lighthouse base",
        choicePrompt: "How do you enter?",
        paragraphs: [
          "The lighthouse house and tower occupy the highest point of the rock. From here you can see the entire surface of Dursey — perhaps two acres, mostly bare basalt with patches of salt grass. To the north, a steep path descends to the waterline and the sea cave entrance, visible now at low tide.",
          "The main door of the keeper's house is closed but not locked — the handle turns freely. To the south side, an iron ladder gives access to the tower's external service walkway, bypassing the interior entirely."
        ],
        choices: [
          { text: "Enter through the main door.", next: "ground_floor" },
          { text: "Take the service ladder up the tower exterior.", next: "side_ladder" },
          { text: "Check the equipment store first.", next: "equipment_store" },
          { text: "Go down to the sea cave while the tide is out.", next: "rocks_path" }
        ]
      },

      /* ═══════════════════════════════════════════
         ACT II — THE LIGHTHOUSE
         ═══════════════════════════════════════════ */

      side_ladder: {
        chapter: "Act II — The Lighthouse",
        title:   "The Service Ladder",
        location: "Dursey Rock — south face, tower exterior",
        paragraphs: [
          "The iron ladder is cold and slightly slick with sea spray. The service walkway circles the tower at the forty-foot mark, giving access to the lantern room from outside.",
          "The view is worth the climb: the whole Atlantic laid out to the west, the coast a smudge to the east. And directly below, on the north side of the rock, the sea cave entrance — mouth wide at low tide, the interior dark.",
          "The lantern room door is unlocked."
        ],
        choices: [
          { text: "Go inside the lantern room.", next: "lantern_room" }
        ]
      },

      equipment_store: {
        chapter: "Act II — The Lighthouse",
        title:   "The Equipment Store",
        location: "Dursey Rock — outbuilding",
        paragraphs: [
          "The store holds fuel canisters, lamp wicks, spare glass panels for the lantern, cleaning supplies, tools. All of it in good order, well-maintained — Morrow was a careful keeper.",
          "On the workbench: a notebook, open. Not the keeper's official log — a personal notebook, smaller, the pages covered in a cramped hand. The final entry is dated four days ago.",
          "It reads: The pattern has period. I have confirmed — sixteen elements, each element either presence or absence, the complete set cycling every forty-seven seconds. It is not weather. It is not tide. It is not any natural geological phenomenon I can identify. It is addressed. I believe it is addressed to whoever is listening.",
          function (s) {
            if (s.charClass === "captain") return "Addressed. A signal that is addressed implies a sender that intends to be heard. Morrow was a practical man — if he wrote that word, he meant it precisely.";
            if (s.charClass === "engineer") return "Sixteen elements, forty-seven seconds. You work the math: roughly three seconds per element. Not random. Too slow for natural acoustic resonance. Something is modulating it deliberately.";
            if (s.charClass === "radioman") return "Sixteen elements. You open your own notebook. The pattern you transcribed on the crossing: sixteen beats. You stare at the two records side by side. Morrow was receiving the same signal you received — and he'd been receiving it for weeks.";
            return "You take the notebook. Evidence. You write in your own notebook: Store notebook, final entry 4 days ago. Keeper describes 16-element repeating acoustic pattern, period 47 seconds. Characterises it as 'addressed.' Believes it is intentional communication.";
          }
        ],
        choices: [
          {
            text: "Take the notebook and go inside the lighthouse.",
            next: "ground_floor",
            setsFlag: "has_journal_fragment"
          }
        ]
      },

      ground_floor: {
        chapter: "Act II — The Lighthouse",
        title:   "The Ground Floor",
        location: "Dursey Rock — keeper's house, ground floor",
        paragraphs: [
          "The interior is dim. One window faces east; the curtains are drawn. The smell is of coal smoke, salt, something underneath that you can't immediately name — organic, faintly sweet, like seaweed left to dry in a warm room.",
          "A kitchen to the left: stove cold, a pot of something that has been sitting for days. A table with two chairs, both used recently. The chair on the left has been pushed back hard enough to scrape the floor.",
          "To the right: a door standing open to the engine room. Straight ahead: the base of the spiral staircase.",
          function (s) {
            if (s.charClass === "captain") return "Two cups, both showing old residue. Two men sat here and had a conversation. The pushed-back chair suggests it ended badly — or urgently. That was the last thing they discussed in this room.";
            if (s.charClass === "engineer") return "The engine room door is open. You can hear — or almost hear — the absence of sound where the engine should be running. The shut-down valve is in the closed position, which requires a deliberate turn. The engine didn't fail. Someone stopped it.";
            if (s.charClass === "radioman") return "The organic smell is strongest near the base of the stairs. What you do know is that the signal is coming from below — from the rock itself. The staircase leads up. The signal is down.";
            return "The margin annotations in the marine biology book on the shelf are meticulous: species, date, depth, behaviour. The final annotation reads, in the keeper's hand: Not bioluminescent. Not acoustic. Geometric. Pattern persists across modalities. He'd found the same pattern in multiple phenomena.";
          }
        ],
        choices: [
          { text: "Search the keeper's quarters upstairs.", next: "keeper_quarters" },
          { text: "Check the engine room.", next: "engine_room" },
          { text: "Look for the radio room.", next: "radio_room" },
          { text: "Go up the spiral staircase.", next: "spiral_stair" }
        ]
      },

      keeper_quarters: {
        chapter: "Act II — The Lighthouse",
        title:   "The Keeper's Quarters",
        location: "Dursey Rock — first floor, south room",
        paragraphs: [
          "Ezekiel Morrow's room. A narrow bed, neatly made — the habit of years. A desk covered in paper.",
          "The papers are notes, sketches, transcriptions. The same sixteen-element pattern, rendered in dozens of ways: as dots and dashes, as a binary string, as a musical staff where presence and absence become notes and rests, as a geometric figure where the sequence maps onto the vertices of a polygon.",
          "He'd been trying to understand it. He'd been working on it for weeks."
        ],
        choices: [
          { text: "Read his journal.", next: "keeper_journal", setsFlag: "has_journal" },
          { text: "Study the charts and maps on the wall.", next: "keeper_maps" },
          { text: "Go back downstairs.", next: "ground_floor" }
        ]
      },

      keeper_journal: {
        chapter: "Act II — The Lighthouse",
        title:   "The Journal",
        location: "Dursey Rock — keeper's quarters",
        paragraphs: [
          "The journal goes back eleven years. The early entries are sparse — official-register entries: weather, maintenance, vessel traffic. The prose of a man who writes because he must.",
          "Six weeks ago, something changes.",
          "October 3rd: There is a sound below the rock. I have been aware of it for some weeks but attributed it to geological settling. I no longer think that. It has a period. It has structure. Whatever is producing it is not random.",
          "October 11th: I have transcribed 48 complete cycles. The pattern does not vary. Not once. Natural phenomena vary. This does not. This is made.",
          "October 19th: I have begun responding. I did not intend to. I found myself at the signal horn at 3 a.m. reproducing the pattern. I am not certain this was voluntary.",
          function (s) {
            if (s.charClass === "captain") return "You read that last entry twice. I am not certain this was voluntary. Morrow was a man who'd spent his adult life on water and rock, who'd learned that survival required you to know your own mind exactly. That sentence frightens you more than anything else in the notebook.";
            if (s.charClass === "engineer") return "He was responding with the signal horn, which is electrically powered, loud enough to carry a mile in good conditions. He was essentially transmitting back. If the source was already amplifying its signal through the rock, adding his transmission to the system — you don't finish the thought.";
            if (s.charClass === "radioman") return "Not certain it was voluntary. You know that feeling — or you know an echo of it. Three nights ago, writing down the pattern in your notebook, you had the brief, strange conviction that you weren't choosing to write it down, that your hand was simply moving. You'd told yourself it was fatigue.";
            return "The scientific content is striking: forty-eight complete cycles, no variation. Your own experience of biological and geological phenomena tells you that true invariance is either artificial or the signature of something operating at a fundamentally different level than biological processes. He wasn't wrong.";
          },
          "November 1st: Hale is suspicious. I told him the horn maintenance required testing. He doesn't believe me. He is a good assistant and I am lying to him.",
          "November 3rd: It has been responding to my responses. I had not thought that possible."
        ],
        choices: [
          { text: "Keep reading.", next: "keeper_obsession", setsFlag: "knows_signal" },
          { text: "Check the assistant's quarters.", next: "assistant_quarters", setsFlag: "knows_signal" }
        ]
      },

      keeper_obsession: {
        chapter: "Act II — The Lighthouse",
        title:   "The Later Entries",
        location: "Dursey Rock — keeper's quarters",
        paragraphs: [
          "November 5th: It is teaching me. There are secondary patterns within the primary. I have begun to understand something of their grammar, if that word applies. The base unit encodes position — coordinates, I believe, in a system I have not yet fully mapped. Something is describing its location.",
          "November 7th: The location is below us. Not far below. Under the shelf, in the basalt. The cave entrance to the north — there is a deeper passage beneath it, below the tide line. It wants me to come.",
          "November 8th: Hale found the equipment. He has disabled the signal horn and he is frightened in a way I cannot reason with. He is going to telegraph the authority. I do not have time for the authority to respond. I am going to the cave.",
          function (s) {
            if (s.charClass === "captain") return "November 8th. Nine days ago. Hale's telegram went out the following day — that's the dates. Hale was still here after Morrow left. Then Hale also disappeared. Two separate events.";
            if (s.charClass === "engineer") return "He disabled the signal horn. That explains part of the equipment damage — sabotage, and then probably counter-sabotage. Two men in the same building wanting opposite things done to the same machine.";
            if (s.charClass === "radioman") return "Secondary patterns within the primary. A grammar. He wasn't just receiving a signal — he was receiving information. Structured information. And he'd begun to decode it well enough that whatever was sending it decided direct contact was worth attempting.";
            return "You note the dates carefully. November 7th: Morrow decides to go to the cave. November 8th: Hale finds the equipment and disables it. Morrow goes anyway. November 9th: Hale sends the distress telegram. Subsequent: Hale also disappears. The question is whether Hale's disappearance is connected to Morrow's, or separate.";
          }
        ],
        choices: [
          { text: "Go to the assistant's quarters.", next: "assistant_quarters" },
          { text: "Go directly to the sea cave.", next: "rocks_path" }
        ]
      },

      keeper_maps: {
        chapter: "Act II — The Lighthouse",
        title:   "The Charts",
        location: "Dursey Rock — keeper's quarters",
        paragraphs: [
          "The Admiralty charts on the wall are standard issue, but Morrow has added his own annotations over years of use. In the area directly west of the rock, in deep water, there is a dense cluster of notations in a different, more recent hand — circled in red, connected by lines. The notations are coordinates, triangulating something.",
          "At the centre of the triangulation: a depth marking of 340 fathoms. And beside it, in small letters: Response origin. Confirmed.",
          function (s) {
            if (s.charClass === "captain") return "You plot the coordinates in your head. The origin point is roughly 800 yards west-southwest of the rock, in deep water. Not accessible from the surface. But the cave entrance...";
            if (s.charClass === "engineer") return "340 fathoms — 2,040 feet. The basalt of the rock doesn't extend that deep; below the shelf it's soft sediment all the way down. But sound can travel from that depth upward through the rock. Geology as an acoustic pipe.";
            if (s.charClass === "radioman") return "Something at 340 fathoms broadcasting upward through the rock would be received clearly on the surface. You've been hearing the rock itself vibrate. The chart just told you where the source is.";
            return "Response origin. Confirmed. He'd established a two-way communication. He'd confirmed the direction and distance. He'd been talking to something at 340 fathoms for at least two weeks before he decided to go to it directly.";
          }
        ],
        choices: [
          { text: "Go to the assistant's quarters.", next: "assistant_quarters" },
          { text: "Check the engine room.", next: "engine_room" },
          { text: "Go to the sea cave.", next: "rocks_path" }
        ]
      },

      assistant_quarters: {
        chapter: "Act II — The Lighthouse",
        title:   "Hale's Room",
        location: "Dursey Rock — first floor, north room",
        paragraphs: [
          "Thomas Hale's room is less orderly than Morrow's. Books in unstable towers, a rain jacket on the floor. A young man's room.",
          "His desk has papers — but these are notes of a different kind. Observations of Morrow rather than of the phenomenon itself.",
          function (s) {
            if (s.charClass === "captain") return "A log of Morrow's movements, kept with the diligence of a first officer watching a captain he's worried about. Times, dates, what Morrow ate, how much he slept. Hale had been tracking his keeper's deterioration with precision and growing alarm.";
            if (s.charClass === "engineer") return "Technical notes about what Morrow had done to the equipment: three separate modifications to the signal horn, adjustments to the light rotation speed — that's what caused the Hibernia disaster. Hale had noted each change and tried to reverse each one.";
            if (s.charClass === "radioman") return "Hale had been trying to understand what he couldn't hear. The notes are full of frustrated second-hand observations — 'claims he can hear it clearly,' 'says it has changed,' 'behaves as if receiving instruction.' Hale couldn't hear the signal. Morrow could. That asymmetry clearly frightened Hale deeply.";
            return "The final page, dated two days after his telegram: Keeper has not returned from the cave. I went to the entrance but could not bring myself to go in. There is a sound from inside that I cannot describe. If no one comes within 48 hours I am going in after him. The notebook ends there.";
          }
        ],
        choices: [
          { text: "Hale went in after Morrow. Go to the cave.", next: "rocks_path", setsFlag: "found_hale_notes" },
          { text: "Check the radio room first.", next: "radio_room" }
        ]
      },

      radio_room: {
        chapter: "Act II — The Lighthouse",
        title:   "The Radio Room",
        location: "Dursey Rock — ground floor, east room",
        paragraphs: [
          "The radio room is small and orderly. A Marconi long-wave set, standard coastguard issue, 1919 model. The log book open on the desk. The final logged transmission is Hale's distress telegram, sent in correct form.",
          function (s) {
            if (s.charClass === "radioman") return "You don't look at the log first. You look at the equipment. The receiver has been modified — someone with genuine technical knowledge has added a coil to the secondary antenna circuit that drops the frequency response well below the standard maritime band. Down to long-wave acoustic frequencies. Morrow was using the radio to receive the signal more clearly. The solder points are bright. This is recent work.";
            return "The log entries establish the timeline. Last entry: Hale's telegram, correctly formatted, sent at 0914 on November 9th. A gap of three days before that — no entries, corresponding to the period when Morrow was focused on his experiments.";
          }
        ],
        choices: [
          {
            text: function (s) { return s.charClass === "radioman" ? "Use the modified receiver to get a clearer picture of the signal." : "Check the logs and move on."; },
            next: function (s) { return s.charClass === "radioman" ? "radio_intercept" : "ground_floor"; },
            setsFlag: "checked_radio"
          }
        ]
      },

      radio_intercept: {
        chapter: "Act II — The Lighthouse",
        title:   "The Signal, Close",
        location: "Dursey Rock — radio room",
        paragraphs: [
          "You sit at the receiver and put on the headset. The modification is good work — you could have done it yourself, but not better. You tune down.",
          "It comes in immediately. Not heard through the air or through the rock this time, but received electronically, decoded into sound by the equipment. It is the clearest version you have encountered.",
          "Sixteen elements. Presence and absence. But at this resolution, you can hear what you couldn't before: each presence is not a single signal but a chord — multiple frequencies simultaneously, not quite harmonic. And the absence periods are not silence. They are filled with something that is the mathematical complement of the pattern. It is speaking and listening simultaneously.",
          "Then something changes. A seventeenth element appears. One that wasn't in the sequence before. It repeats twice, pauses, repeats twice again.",
          "You check the log. You check your own notes. There has never been a seventeenth element. The pattern is responding to your arrival."
        ],
        choices: [
          { text: "This is beyond the radio. Go to the source.", next: "rocks_path", setsFlag: "knows_pattern" }
        ]
      },

      engine_room: {
        chapter: "Act II — The Lighthouse",
        title:   "The Engine Room",
        location: "Dursey Rock — ground floor, west room",
        paragraphs: [
          "The steam engine that drives the light mechanism occupies most of the west room. A Chance Brothers installation, 1887, heavy and well-made. The boiler is cold. The drive shaft to the lens rotation mechanism is disengaged.",
          "Someone has attempted to damage it. The main steam valve has been struck with something heavy — the valve is deformed but not broken. The mechanism could still function if the boiler were lit and the shaft re-engaged.",
          function (s) {
            if (s.charClass === "engineer") return "You assess it in three minutes. The damage is repairable — the valve is bent, not cracked; a pipe wrench and leverage would get it workable again. The disengaged shaft needs only the locking pin, which you find on the floor in the corner. Two different sabotage attempts, or two different people, both failing to complete the job.";
            return "The damage is significant but the engine is not destroyed. The signal horn that Hale disabled is connected to this system — if the engine were running, the horn could be used again.";
          }
        ],
        choices: [
          {
            text: function (s) { return s.charClass === "engineer" ? "Repair the engine." : "Leave it. Continue searching."; },
            next: function (s) { return s.charClass === "engineer" ? "engine_repair" : "ground_floor"; }
          }
        ]
      },

      engine_repair: {
        chapter: "Act II — The Lighthouse",
        title:   "Getting It Running",
        location: "Dursey Rock — engine room",
        paragraphs: [
          "It takes two hours. The valve responds to the wrench better than expected — the metal is bent, not cracked, ductile enough to be worked back to near-round. The pin goes back in. You light the boiler. The pressure builds slowly. The drive shaft engages with a sound of machinery remembering itself.",
          "The light above begins, faintly, to turn. The lens is intact; the light is not lit, but the rotation mechanism works. The signal horn is operational.",
          "You stand in the hum of running machinery and understand something: the engine is now an instrument. Whatever Morrow used the signal horn for, you could do it too — more precisely, with more control."
        ],
        choices: [
          { text: "Go to the sea cave. You'll know what to do with this later.", next: "rocks_path", setsFlag: "engine_running" }
        ]
      },

      spiral_stair: {
        chapter: "Act II — The Lighthouse",
        title:   "The Staircase",
        location: "Dursey Rock — lighthouse tower, interior",
        paragraphs: [
          "The spiral staircase is iron, sixty steps to the lantern room. The walls of the tower are thick enough to muffle the wind to a whisper.",
          "On the twelfth step: a dark stain on the stone wall at head height. Small. Old enough to have dried brown. On the twenty-third step: a handprint in something pale and chalky — not plaster, not paint. A substance you don't recognise.",
          function (s) {
            if (s.charClass === "captain") return "You've seen blood on ships. The stain on the twelfth step could be blood. The handprint — that's something else. Your palm aches faintly just looking at it.";
            if (s.charClass === "engineer") return "You crouch and look more closely without touching. The pale substance has the texture of something that was liquid and dried — but not a water-based liquid. The residue is slightly crystalline. Whatever it is, it came from inside the rock, not from the sea.";
            if (s.charClass === "radioman") return "You count the steps between the two marks: eleven. The primary pattern has sixteen elements. The secondary — you recall from the journal — appears in eleven-element subsets. You write this down. You don't know what it means. You write it down anyway.";
            return "You photograph both marks. Then you take a sample of the pale substance on a glass slide. The substance is waxy to the touch and has a faint smell — not unpleasant, but not natural. Not anything you've catalogued.";
          }
        ],
        choices: [
          { text: "Continue up to the lantern room.", next: "lantern_room" },
          { text: "Go back down and search the interior.", next: "ground_floor" }
        ]
      },

      lantern_room: {
        chapter: "Act II — The Lighthouse",
        title:   "The Lantern Room",
        location: "Dursey Rock — lighthouse top",
        paragraphs: [
          "The great Fresnel lens at the centre of the lantern room — concentric rings of ground glass, five feet tall, brilliant engineering from a previous century. The lens is intact.",
          "But the lens has been used for something other than light. Pressed into the brass housing at regular intervals are objects: small, irregular, white. Fragments of bone. Human bone — phalanges, the small bones of fingers or toes.",
          function (s) {
            if (s.charClass === "captain") return "Eleven fragments. You count twice. Positioned with deliberateness. Someone placed these here, one by one, looking at the sea while they did it.";
            if (s.charClass === "engineer") return "The placement would affect the light pattern — each fragment would cast a small shadow, interrupting the beam in a specific rhythm as the lens rotated. The modified signal schedule wasn't just changing the timing. It was encoding a pattern in the light itself.";
            if (s.charClass === "radioman") return "Eleven fragments. The secondary pattern. He was encoding the secondary pattern in the light itself — broadcasting it in the visible spectrum across the open ocean. You understand now why the Hibernia ran aground. The light wasn't just irregular. It was a message.";
            return "You count, measure, photograph. Eleven fragments. Arranged at intervals you recognise as the secondary pattern from the journal. Human bone. Small bones. The source is either Morrow or Hale or both. Evidence of self-harm in service of signal reproduction.";
          }
        ],
        choices: [
          { text: "Go to the cave.", next: "rocks_path" }
        ]
      },

      rocks_path: {
        chapter: "Act II — The Lighthouse",
        title:   "Down to the Water",
        location: "Dursey Rock — north face path",
        paragraphs: [
          "The path down the north face is steep and wet. Someone has used it recently — the rock is scoured in places where a boot slipped and caught. The tide is low. In two hours the cave entrance will be under a foot of water.",
          "The cave entrance is wide — perhaps twelve feet across — and dark inside. The smell is stronger here than anywhere on the rock: that organic sweetness, concentrated, with a mineral undertone like struck flint.",
          function (s) {
            if (s.charClass === "captain") return "You've been in sea caves before. They are dangerous — tide comes faster than expected, exits narrow, sound behaves unexpectedly. You give yourself one hour inside and no more, regardless of what you find.";
            if (s.charClass === "engineer") return "At the cave entrance: a torch, dropped there. Batteries still good. Someone dropped this and went in without it. You pick it up. You'll need it.";
            if (s.charClass === "radioman") return "The signal is coming from inside. From deep inside. At this distance with the cave acting as an amplifier, it is loud enough that you turn the gain down on the portable receiver. The seventeenth element is here too — repeating, waiting, a question in a language you almost understand.";
            return "You photograph the entrance from multiple angles. Then you take a soil sample from just inside the threshold — the sediment is darker and finer than the surrounding basalt. Organic. High carbon content. Not soil. Something else.";
          }
        ],
        choices: [
          { text: "Enter the cave.", next: "cave_interior" }
        ]
      },

      cave_interior: {
        chapter: "Act II — The Lighthouse",
        title:   "The Sea Cave",
        location: "Dursey Rock — sea cave, interior",
        paragraphs: [
          "The cave is larger than the entrance suggests. The first twenty feet require a crouch — then the ceiling rises to thirty feet and the space opens into an irregular chamber. The walls are basalt, the strata visible in bands of black and dark green.",
          "On the walls: markings. Not graffiti, not casual. Systematic. The sixteen-element pattern, rendered over and over in a white substance — waxy, crystalline at the edges. Not paint. Not chalk. Something secreted.",
          "At the far end of the chamber: a fissure in the floor. Perhaps three feet wide, descending at an angle. The sound is coming from there."
        ],
        choices: [
          { text: "Examine the markings on the walls.", next: "cave_markings" },
          { text: "Go directly to the fissure.", next: "cave_depths" }
        ]
      },

      cave_markings: {
        chapter: "Act II — The Lighthouse",
        title:   "The Markings",
        location: "Dursey Rock — sea cave",
        paragraphs: [
          "The markings are layered — older ones beneath, newer on top. The older markings are stranger, more complex geometries, rendered with less precision. Whoever made them was trying to reproduce something they barely understood. The newer markings are the pattern exactly, reproduced to the element.",
          function (s) {
            if (s.charClass === "captain") return "Different hands. The older markings are shaky, imprecise — a man learning a language. The newer ones are steady and certain. Morrow started making the older markings weeks ago, worked toward understanding, and recently was able to reproduce the pattern with exactitude.";
            if (s.charClass === "engineer") return "The substance is not applied by hand in any ordinary sense — the consistency is too uniform. He collected it. Your torch picks out a pool of residue on the cave floor near the fissure — partially evaporated, leaving a crystalline ring. The source is down there.";
            if (s.charClass === "radioman") return "The older markings contain an error: in cycle eleven of the sixteen-element sequence, element nine is marked absent when it should be present. The newer markings correct it. Morrow worked out the error from first principles, which means he understood the grammar well enough to recognise a mistake in his own transcription.";
            return "You date the layers by weathering. The oldest: four to six weeks of exposure to the cave's damp air. The newest — the confident reproductions — no older than a week. He was here, working, after Hale's telegram. After everything had already begun to fall apart.";
          }
        ],
        choices: [
          { text: "Go to the fissure.", next: "cave_depths" }
        ]
      },

      cave_depths: {
        chapter: "Act II — The Lighthouse",
        title:   "The Fissure",
        location: "Dursey Rock — sea cave, deep end",
        paragraphs: [
          "The fissure descends at perhaps forty degrees, wide enough to fit a person if they go sideways. The sound is unmistakable here — not heard with the ears alone but felt in the chest, in the teeth, in the marrow. Forty-seven seconds. Sixteen elements. Then silence for one cycle. Then again.",
          "And in the silence: a seventeenth element. The pattern has been speaking to whoever is listening. It knows you are here.",
          "Below, in the fissure, the darkness is not complete. There is a pale luminescence — very faint, blue-white, coming from deeper than your torch can reach."
        ],
        choices: [
          { text: "Descend into the fissure.", next: "signal_source", setsFlag: "cave_reached" },
          { text: "You've seen enough. Go back and decide what to do.", next: "confrontation_hub" }
        ]
      },

      signal_source: {
        chapter: "Act II — The Lighthouse",
        title:   "The Source",
        location: "Dursey Rock — deep fissure",
        paragraphs: [
          "The descent takes fifteen minutes. The fissure narrows and widens unpredictably. The luminescence grows as you go. The sound is now everywhere — not coming from a direction but simply present, as if the rock itself has learned to speak.",
          "The fissure opens into a lower chamber. The ceiling is forty feet up. The walls are the same banded basalt, but here the white substance covers everything — walls, floor, ceiling — in geometric patterns so complex your eye can't track them. At the centre of the chamber floor: a pool of absolutely still seawater.",
          "In the pool: Ezekiel Morrow. Standing in water up to his waist, facing away from you. Thomas Hale, floating face-up at the pool's edge — breathing, chest moving — eyes open and tracking the ceiling.",
          function (s) {
            if (s.charClass === "captain") return "You call Morrow's name. He turns slowly. His face is calm — not drugged, not vacant. Calm with the specific calm of a man who has been answered. 'It's all right,' he says. 'It only wants to know.' And then, quieter: 'You should go back. It hasn't decided about you yet.'";
            if (s.charClass === "engineer") return "Hale moves when you approach. He grabs your wrist with surprising strength. 'Don't touch the water,' he says. His voice is normal but his eyes don't focus on your face — they track the ceiling. 'I touched the water. It's reading me. It doesn't know what to do with me. Don't touch the water.'";
            if (s.charClass === "radioman") return "The seventeenth element is deafening here. You pull off the headset. The pool is vibrating at a frequency the rock transmits upward. And the pool is responding to you — the luminescence brightens as you approach, and the pattern shifts, a new element added, an eighteenth, addressed directly at the frequency of your own heartbeat, which you can feel it counting.";
            return "You sit down and open your notebook. You write: Lower chamber, approximately 40m below cave floor. Two subjects located. Keeper Morrow: standing, responsive, calm. Assistant Hale: prone, conscious, unfocused. Chamber covered in geometric markings. Central pool: still seawater, bioluminescent. Source of acoustic signal located here. Subjects appear unharmed. Situation: unclear.";
          }
        ],
        choices: [
          { text: "Speak to Morrow.", next: "keeper_fate", setsFlag: "found_keeper" },
          { text: "Try to pull Hale out.", next: "keeper_fate", setsFlag: "found_keeper" },
          { text: "Back away. You need to think.", next: "confrontation_hub" }
        ]
      },

      keeper_fate: {
        chapter: "Act II — The Lighthouse",
        title:   "What Morrow Says",
        location: "Dursey Rock — deep chamber",
        paragraphs: [
          "Morrow turns to you. He looks older than his photographs but not diminished. His expression is the one you see on men who have had a religious experience — not ecstasy, but certainty.",
          "'It's a survey,' he says. 'That's all it is. It has been surveying the surface since before there were surfaces to survey. It doesn't think the way we think. It doesn't intend the way we intend. But it notices. And when something notices back —' He looks at the pool. 'It adjusts its survey to include that thing.'",
          "'It included me,' he says. 'It is including Hale now that he came in. He touched the water by accident.' He says this with sorrow. 'If you do nothing, it will include you in the survey and the survey will continue. If you do something — it will respond.'",
          function (s) {
            if (s.charClass === "captain") return "'What happened to the Hibernia?' you ask. He flinches for the first time. 'That was me. I changed the light schedule because it was encoding the wrong pattern. I wasn't thinking about ships. I stopped thinking about ships.' He looks away. 'I'm sorry.'";
            if (s.charClass === "engineer") return "'The signal horn,' you say. 'You were transmitting back to it.' 'Yes.' 'And the engine?' 'Hale tried to sabotage it. I put it back. Then Hale hit the valve.' He's matter-of-fact about it. 'We were both trying to control what neither of us understood.'";
            if (s.charClass === "radioman") return "'The seventeenth element,' you say. He nods. 'That's its address for me. It gives each survey point an element. The eighteenth —' He looks at you. 'That's yours. It made that element when you arrived on the rock.' You hear it even now, in the walls. Your address. Something at 340 fathoms has given you a name.";
            return "'How do we get Hale out?' you ask. Morrow looks at the assistant with something between guilt and tenderness. 'I don't know. It's processing him. It doesn't know yet whether he's a survey point or interference. It will decide.' 'When?' 'I don't know. It doesn't have time the way we do.'";
          }
        ],
        choices: [
          { text: "Get out of the chamber and decide what to do.", next: "confrontation_hub", setsFlag: "knows_signal" }
        ]
      },

      /* ═══════════════════════════════════════════
         ACT III — THE SIGNAL
         ═══════════════════════════════════════════ */

      confrontation_hub: {
        chapter: "Act III — The Signal",
        title:   "What to Do",
        location: "Dursey Rock",
        choicePrompt: "What is your course of action?",
        paragraphs: [
          "There is something 340 fathoms below this rock that has been surveying the surface of the Earth since before humans had a word for the deep. It has noticed that something noticed it. It is now including that something in its survey.",
          function(s) {
            return s.flags.found_keeper
              ? "Two men are in the chamber below: one willingly, one not. Nine people died because a ship ran aground on a rock whose warning light was being used to send a different message entirely."
              : "Below the rock, in the fissure, something waits. Nine people died because a ship ran aground on a rock whose warning light was being used to send a different message entirely. Whatever is down there was the reason.";
          },
          function(s) {
            if (s.charClass === "radioman" || s.flags.found_keeper) {
              return "The signal continues. Forty-seven seconds. Sixteen elements. Your element, the eighteenth, is in there now.";
            }
            return "The signal continues. Forty-seven seconds. Sixteen elements. It knows you are here now. That much is certain.";
          }
        ],
        choices: [
          { text: "Destroy the signal source. Whatever it costs.", next: "plan_destroy" },
          { text: "Redirect the signal — broadcast it outward, away from the coast.", next: "plan_broadcast" },
          { text: "Document everything and get out while you can.", next: "plan_document" },
          { text: "Go back down. You want to understand it better before you decide.", next: "signal_nature" },
          { text: "Transmit a response. Answer it in its own pattern.", onlyFor: ["radioman"], requiresFlag: "found_keeper", next: "end_contact" }
        ]
      },

      signal_nature: {
        chapter: "Act III — The Signal",
        title:   "Understanding",
        location: "Dursey Rock — deep chamber",
        paragraphs: [
          "You go back down, or you stay, and you listen.",
          "The pattern is not malevolent. You are certain of that now. It has no concept of harm because it has no concept of individual existence — it processes survey points, not people. It doesn't know you will die. It doesn't know you can die.",
          "But it is not safe. Morrow is proof. He is not harmed, but he is no longer quite himself — he is partly a survey point now, partly data. Hale is worse. Hale is being processed and that processing looks, from the outside, like drowning in slow motion.",
          function (s) {
            if (s.charClass === "captain") return "A signal without a receiver is noise. The thing below is not evil — it's a process, like weather, like tides. And processes can be worked with, redirected, or stopped. The question is which is possible from here.";
            if (s.charClass === "engineer") return "Systems can be interfered with. A signal strong enough to propagate through 340 fathoms of basalt is drawing energy from somewhere. Cut the energy source, or introduce enough interference to corrupt the pattern, and the survey is interrupted. Whether that matters to the surveyor — you don't know.";
            if (s.charClass === "radioman") return "A signal directed inward will bounce. A signal directed outward will travel. If you could change the geometry of the transmission — point it away from the coast, toward open ocean — the survey would continue, but it would survey emptiness rather than a populated shore.";
            return "You observe the effect of the signal on both men. Morrow is stable — whatever is happening to him has reached a steady state. Hale is not. If anything is to be done, it must be done before the processing of Hale reaches whatever conclusion it is building toward.";
          }
        ],
        choices: [
          { text: "Destroy it.", next: "plan_destroy" },
          { text: "Redirect it outward.", next: "plan_broadcast" },
          { text: "Get Hale out and document. That's all that can be done.", next: "plan_document" }
        ]
      },

      plan_destroy: {
        chapter: "Act III — The Signal",
        title:   "Destroy the Source",
        location: "Dursey Rock",
        choicePrompt: "How do you approach it?",
        paragraphs: [
          "The source is a pool in a deep chamber. The rock is the conductor. To destroy the source you need to disrupt the medium — collapse the fissure — or disrupt the signal at its origin."
        ],
        choices: [
          {
            text: "Use the explosive charges in the equipment store to collapse the fissure.",
            next: "destroy_captain",
            onlyFor: ["captain"]
          },
          {
            text: "Use the engine's steam pressure to drive a pressure wave down the fissure — destructive acoustic interference.",
            next: "destroy_engineer",
            onlyFor: ["engineer"],
            requiresFlag: "engine_running"
          },
          {
            text: "Construct a counter-signal from the radio equipment and broadcast it into the fissure at phase opposition.",
            next: "destroy_radioman",
            onlyFor: ["radioman"]
          },
          {
            text: "The cave structure has a resonant frequency. Use the signal horn to find it and exploit it.",
            next: "destroy_naturalist",
            onlyFor: ["naturalist"]
          },
          {
            text: "Use the explosive charges in the equipment store.",
            next: "destroy_captain",
            onlyFor: ["engineer", "radioman", "naturalist"]
          }
        ]
      },

      destroy_captain: {
        chapter: "Act III — The Signal",
        title:   "Authority",
        location: "Dursey Rock — equipment store and cave",
        paragraphs: [
          "The equipment store has what you need: six charges of gelignite, detonators, and fifty feet of safety fuse — standard coastguard issue for clearing harbour debris.",
          "You position the charges at the top of the fissure, where the cave floor meets the descent. Six charges will be enough to collapse the upper section and seal the lower chamber permanently.",
          "You give Morrow the choice. He can leave the chamber now, or stay.",
          "'It doesn't matter,' he says. 'If the chamber collapses, I'll still be a survey point. I'll still hear it. It's already in me.' He pauses. 'But it won't be able to do this to anyone else. Not from this location.'",
          "He climbs out. He helps you carry Hale up. Hale is heavy and unresponsive, but breathing. You clear the rock and light the fuse from the dock."
        ],
        choices: [
          { text: "Detonate.", next: "destroy_climax" }
        ]
      },

      destroy_engineer: {
        chapter: "Act III — The Signal",
        title:   "Pressure",
        location: "Dursey Rock — engine room and cave",
        paragraphs: [
          "The engine is running. The boiler is at operating pressure. You disconnect the drive shaft from the light rotation mechanism and route the steam outlet into the signal horn piping.",
          "It's not the intended use of the equipment. The pressure will be too high for the horn's designed operating range and will destroy it. But it will produce, for approximately thirty seconds, an acoustic output orders of magnitude above anything the horn was designed for. Directed down the fissure. Into the chamber.",
          "You get Morrow and Hale out first. This requires argument, physical effort, and two hours. Morrow comes when you explain what you're going to do. Hale has to be carried.",
          "You set the steam release to maximum."
        ],
        choices: [
          { text: "Open the valve.", next: "destroy_climax" }
        ]
      },

      destroy_radioman: {
        chapter: "Act III — The Signal",
        title:   "Counter-Signal",
        location: "Dursey Rock — radio room and cave",
        paragraphs: [
          "Destructive interference requires perfect phase opposition. You have the pattern. You have the equipment. You have Morrow's antenna modification.",
          "You reverse the coil: instead of receiving, transmitting. You tune to the exact frequency of the signal — you know it as well as your own name — and configure the transmission at 180 degrees out of phase.",
          "The signal from below is vastly more powerful than anything this equipment can produce. You will need to transmit from inside the cave, as close to the source as possible. You lower the portable transmitter down the fissure on the antenna lead, as far as it will reach.",
          "You get Morrow and Hale out. You have, you estimate, enough battery life for three minutes of transmission."
        ],
        choices: [
          { text: "Transmit.", next: "destroy_climax" }
        ]
      },

      destroy_naturalist: {
        chapter: "Act III — The Signal",
        title:   "Resonance",
        location: "Dursey Rock — cave",
        paragraphs: [
          "Every structure has a resonant frequency. Basalt is brittle under the right conditions. The fissure is already a fracture — a weakness. You need the frequency at which the cave structure will amplify, not merely transmit.",
          "You use the signal horn at low power, sweeping through frequencies systematically, listening for changes in how the cave responds. Forty minutes. You find it at the low end of the audible range — a frequency that makes the cave walls shed small particles of dust and the pool surface vibrate in visible standing waves.",
          "You position the horn at the cave entrance, angled in. You get Morrow and Hale out. Morrow is reluctant in a way that is not quite refusal. You tell him what will happen to the cave. He nods. He comes.",
          "You seal the cave entrance as best you can — enough to direct the sound inward."
        ],
        choices: [
          { text: "Activate the horn.", next: "destroy_climax" }
        ]
      },

      destroy_climax: {
        chapter: "Act III — The Signal",
        title:   "The Moment",
        location: "Dursey Rock — surface",
        paragraphs: [
          "The rock shudders.",
          "Not violently — not the shock of catastrophic collapse. A sustained vibration, as if the entire basalt mass is clearing its throat. It lasts thirty seconds, or three minutes, or longer — time has become unreliable.",
          "Then: silence. Not the absence of the signal, but absence itself. The kind of quiet that arrives when something very large and very old stops paying attention.",
          function (s) {
            if (s.charClass === "captain") return "The charges have collapsed the upper section of the fissure. The cave entrance is now partly blocked with fallen stone. The sea around the base is disturbed, small waves radiating outward, but the surface is calming.";
            if (s.charClass === "engineer") return "The signal horn is destroyed — the diaphragm failed at the pressure, as expected. You go inside and shut the engine down properly. The lighthouse is dark and silent, but structurally intact.";
            if (s.charClass === "radioman") return "You check your receiver. Nothing below the maritime band. You sweep up and down the frequency range for five minutes. The sixteen-element pattern is gone. The seventeenth, eighteenth elements — gone. You exist, for the first time in three days, in a spectrum without your address in it.";
            return "You take your samples. You have the cave wall substance, the sediment from the chamber floor, your photographs. Whatever was done today, there is a record.";
          },
          "Morrow sits on the dock with his hands on his knees. Something has left him, the way a long illness leaves a man who recovers: not healed, exactly, but altered.",
          "'Is it gone?' you ask.",
          "'No,' he says. 'It's just not here anymore.'"
        ],
        choices: [
          { text: "Get everyone off the rock.", next: "end_sealed" }
        ]
      },

      plan_broadcast: {
        chapter: "Act III — The Signal",
        title:   "Redirect the Signal",
        location: "Dursey Rock",
        choicePrompt: "How do you redirect it?",
        paragraphs: [
          "You can't stop it. The source is 340 fathoms down, in rock, in water, beyond reach. But a signal is not a destination — a signal is a direction.",
          "The lighthouse was already transmitting the pattern. The question is: what if it pointed out to sea? Not at a coastline, not at ships, but into the open Atlantic, where there is nothing to survey but water and depth."
        ],
        choices: [
          {
            text: "Direct the cutter as a relay point out to sea.",
            next: "broadcast_captain",
            onlyFor: ["captain"]
          },
          {
            text: "Redirect the engine and signal horn output westward.",
            next: "broadcast_engineer",
            onlyFor: ["engineer"]
          },
          {
            text: "Reconfigure the radio antenna for directional broadcast into open water.",
            next: "broadcast_radioman",
            onlyFor: ["radioman"]
          },
          {
            text: "Calculate the depth-contour geometry and redirect along the continental shelf slope.",
            next: "broadcast_naturalist",
            onlyFor: ["naturalist"]
          }
        ]
      },

      broadcast_captain: {
        chapter: "Act III — The Signal",
        title:   "The Relay",
        location: "Dursey Rock — dock",
        paragraphs: [
          "You radio the cutter skipper. He thinks you're insane. You outrank him. The cutter moves to a position 800 yards due west of the rock — approximately above the signal source — and drops anchor.",
          "You brief him: the lighthouse signal horn will transmit the pattern toward the cutter; the cutter will relay it further west using its own horn, pointed toward open water. A chain of transmission, directed away from land.",
          "He thinks you're insane. He does it anyway. That's what a good skipper does."
        ],
        choices: [
          { text: "Signal the cutter to begin.", next: "broadcast_climax" }
        ]
      },

      broadcast_engineer: {
        chapter: "Act III — The Signal",
        title:   "The Horn, Redirected",
        location: "Dursey Rock — engine room",
        paragraphs: [
          "The signal horn is on the west face of the lighthouse, angled at the shipping lane. You can't move the horn, but you can add a deflector: sheet metal from the equipment store, bolted at an angle to redirect the output further west and upward.",
          function(s) {
            if (s.flags.engine_running) {
              return "The engine is already running. You configure the output, redirect the horn, and set the pattern to transmit on the sixteen-element cycle, timed to the natural period of the source.";
            }
            return "The boiler is cold, pressure gauge flat at zero. Getting steam up takes twenty minutes and coal you barely have, but without pressure there is no mechanism. When the gauge finally moves, you configure the output, redirect the horn, and set the pattern.";
          },
          "When you activate it, the lighthouse is speaking to the signal source in its own language, and the conversation is being directed into open water."
        ],
        choices: [
          { text: "Let it run.", next: "broadcast_climax" }
        ]
      },

      broadcast_radioman: {
        chapter: "Act III — The Signal",
        title:   "The Directional Array",
        location: "Dursey Rock — radio room and roof",
        paragraphs: [
          "A directional antenna is a matter of geometry. You reconfigure the antenna array on the lighthouse roof — three hours, in cold wind, with inadequate tools — and test the directionality with the portable receiver from the dock.",
          "The signal now propagates primarily westward. The lobe is not perfect — there's leakage to the north and south — but the dominant direction is into open water.",
          "You configure the transmitter to echo the sixteen-element pattern back at the source, simultaneously receiving and retransmitting in a loop. The signal reinforces itself in the westward direction. It grows stronger, but it grows stronger west."
        ],
        choices: [
          { text: "Lock in the configuration.", next: "broadcast_climax" }
        ]
      },

      broadcast_naturalist: {
        chapter: "Act III — The Signal",
        title:   "The Geometry of Depth",
        location: "Dursey Rock — cave and surface",
        paragraphs: [
          "The depth contours tell you where the signal will travel most efficiently. The continental shelf drops sharply to the southwest — 300 fathoms within a mile, then 1,000 fathoms further out. If the signal can be directed along the slope of the shelf, it will propagate into the deep Atlantic basin rather than upward toward the surface.",
          "You calculate the angle. You position the signal horn and adjust the reflectors. The mathematics are not perfectly certain, but they are good enough.",
          "The signal's energy follows the path of least resistance. You have made the path west into open water slightly lower-resistance than the path east toward the coast."
        ],
        choices: [
          { text: "Set the reflectors and step back.", next: "broadcast_climax" }
        ]
      },

      broadcast_climax: {
        chapter: "Act III — The Signal",
        title:   "West",
        location: "Dursey Rock",
        paragraphs: [
          "You don't know if it works. You can't see 340 fathoms into the rock. You can't measure the propagation of something this old and this vast.",
          "What you can measure: the pattern on the shipping lane side of the rock weakens. The slight wrongness of the water fades. The rock stops vibrating in the way it was.",
          "Hale regains his focus over the following hours. Not completely — his eyes still track things that aren't there, sometimes — but he knows his name, he knows the year, he stands without help.",
          "Morrow will not leave the island. He says he needs to stay and monitor the signal. You believe he says this because he is no longer capable of believing the signal is something you can simply walk away from.",
          function (s) {
            if (s.charClass === "captain") return "You write the incident report in the cutter's log on the way back. Mechanical failure. Keeper incapacitated. Light repaired and operational. One crew member recovered, one remaining voluntarily. There is no way to write what actually happened in a document that will be read by the harbour authority, and you have learned to be specific about what matters and silent about what cannot be explained.";
            if (s.charClass === "engineer") return "The engine is running. The light is turning. The lighthouse is doing what lighthouses do, and whether it is also doing something else is a question you have made functionally irrelevant by making its secondary purpose point west, into nothing. You consider this acceptable engineering.";
            if (s.charClass === "radioman") return "On the crossing back, you tune the receiver. The sixteen-element pattern is still there — of course it is, you didn't stop it — but its amplitude on the east-facing band is much lower. And the seventeenth and eighteenth elements are gone. Something stopped tracking you when you redirected it. Whether that means it accepted the new direction or simply stopped caring about this particular survey point, you will probably never know.";
            return "Your notebook contains three days of observations that you will spend the rest of your professional life trying to find a framework to publish in. You have already decided not to lead with the conclusion. You will present the data and let the data argue for itself. If no framework exists to explain it, that is itself a significant observation.";
          }
        ],
        choices: [
          { text: "Head for the mainland.", next: "end_broadcast" }
        ]
      },

      plan_document: {
        chapter: "Act III — The Signal",
        title:   "Evidence",
        location: "Dursey Rock",
        paragraphs: [
          "There is only one thing that matters now: getting off this rock with everything you've collected.",
          "Morrow cannot be taken — he will not leave. Hale can be moved — he is unresponsive but his body is functional. You will carry Hale to the cutter, take everything you can document or physically remove, and go.",
          "The signal will continue. It was continuing before Morrow found it and it will continue after everyone on this rock is gone. What matters is that someone knows."
        ],
        choices: [
          { text: "Gather everything and get to the cutter.", next: "escape_lighthouse" }
        ]
      },

      escape_lighthouse: {
        chapter: "Act III — The Signal",
        title:   "Getting Out",
        location: "Dursey Rock",
        paragraphs: [
          "You work fast. The notebooks. The journals. The photographs. The slides with samples. Hale, carried on your back to the dock. The radio logs. Everything that fits.",
          "Morrow watches you from the lighthouse doorway. He is not hostile. He is simply present in the way that the rock is present — as something that has decided where it belongs.",
          "'Tell them what happened,' he says.",
          "'I will,' you say.",
          "'They won't believe you.'",
          "'No,' you agree.",
          function (s) {
            if (s.charClass === "captain") return "You take the cutter's wheel yourself. The crossing back is rough — the weather has arrived — and you run before the swell with Hale strapped to a bunk below. He regains consciousness somewhere around the six-mile mark. He doesn't speak. He stares at the hull. But he is there.";
            if (s.charClass === "engineer") return "You leave the engine running. The light is turning. At least ships will be warned. Whatever Morrow is doing on that rock, he won't let the shipping lane go dark again. That much you believe. That much is something.";
            if (s.charClass === "radioman") return "At the three-mile mark, you turn on the portable receiver. The pattern is still there, loud and clear at this distance. Sixteen elements. Forty-seven seconds. And the seventeenth element — your address. It is still tracking you. You turn the receiver off.";
            return "You have nine samples, forty-seven photographs, and three notebooks of observations. You have Hale. You do not have Morrow. In the final page of your notebook, balanced on your knee as the cutter rises and falls: The phenomenon persists. Its long-term effects on the surveyed subjects are unknown. The signal continues. The source is permanent. This is not a conclusion — this is where documentation ends.";
          }
        ],
        choices: [
          { text: "Make the crossing.", next: "end_recorded" }
        ]
      },

      /* ═══════════════════════════════════════════
         ENDINGS
         ═══════════════════════════════════════════ */

      end_contact: {
        chapter:  "Ending — Hidden",
        title:    "Answer",
        location: "Morrow Light — the cave, then the sea",
        isEnding: true,
        paragraphs: [
          "You go back down to the source.",
          "You carry the portable transceiver from the radio room, a full battery pack, and the transcription of the pattern you spent the last two nights decoding. Forty-seven seconds. Sixteen elements. A geometric survey of something enormous.",
          "You tap the response in Morse first, then in the signal's own pattern — the geometric sequence, extended by one element. The seventeenth. You make it an answer, not a copy: you confirm receipt, and then you add a question. Where are you from.",
          "The signal pauses.",
          "In eighteen years of radio work you have never heard silence like this — not absence of signal, but suspension of it. As if something vast has stopped mid-process to look at you.",
          "It looks at you for eleven seconds. You count.",
          "Then it answers.",
          "The response takes four minutes and twenty seconds. You transcribe it as fast as you can, hand cramping, filling two notebook pages. You understand perhaps a quarter of it. What you understand is: depth-sounding. The survey. It is mapping the geometry of the continental shelf from below. It has been doing this for — you look at the data — a very long time.",
          "You transmit the coordinates of the Mariana Trench. Deep water. Open ocean. No population centers.",
          "Another pause. Seven seconds.",
          "The signal shifts. Not off — it reorients. The pattern continues in a new direction, out toward the open Atlantic, away from the coast, away from shallow rock and the things that live on it.",
          function (s) {
            return "Hale surfaces from his trance forty minutes later, shaking and wet and alive. He does not remember anything past the second day in the cave. He asks where Morrow is. You tell him. You help him up the stairs and into the light.";
          },
          "You spend the crossing home writing and rewriting the report you will not file. The report you will not file says: contact established, communication successful, reorientation achieved, no hostile intent confirmed.",
          "The report you do file says: mechanical anomaly, personnel recovered, light operational.",
          "You keep the notebook in a locked case under your bed for the rest of your life. You don't show it to anyone. You are not certain it would be believed. You are not certain it should be.",
          "But on quiet nights, long-wave open, you sweep the Atlantic band. And sometimes — not often, not reliably, but sometimes — you hear the pattern.",
          "Forty-seven seconds. Seventeen elements now.",
          "You are the seventeenth element.",
          "You have no idea what that means. You note it. You continue."
        ]
      },

      end_sealed: {
        chapter:  "Ending — The Sealed Source",
        title:    "Silence",
        location: "The mainland — three weeks later",
        isEnding: true,
        paragraphs: [
          "Morrow returns to the mainland. He goes home to his sister in Cork. By all observable measures he is a functional person: he eats, he sleeps, he answers questions in complete sentences.",
          "He doesn't work near the sea again. The Lighthouse Authority pensions him on medical grounds. He doesn't argue.",
          "Hale recovers more completely. After two months he resumes normal employment. He tells the doctors he doesn't remember anything after descending into the cave. You don't know if that's true. You don't ask.",
          "The replacement keeper finds the lighthouse in good order, one piece of equipment missing or destroyed, the cave sealed by what appears to be geological subsidence.",
          function (s) {
            if (s.charClass === "captain") return "You write your incident report as factually as you can. Mechanical failure, personnel recovered, light operational. You add one line that is not quite a lie and not quite the truth: Acoustic anomaly attributed to geological feature, now inactive. The harbour authority files it. You never speak of it to anyone who wasn't there. The sea continues to be the sea, indifferent and enormous, and some things it keeps.";
            if (s.charClass === "engineer") return "The replacement engine is a newer model, more reliable. You write the maintenance report. One valve damaged, cause: previous operator error. You verify the light rotation schedule is correct. Everything is correct. You sign the certification. You don't feel clean, but you feel done.";
            if (s.charClass === "radioman") return "You keep sweeping the long-wave band for the next six months. The sixteen-element pattern does not recur. The frequency Morrow modified the receiver to capture is quiet. You don't know if the source is gone or simply pointing elsewhere. You learn, over time, to treat the difference as unimportant. What matters is that it is not here.";
            return "You publish a paper. Not about the signal. About the cave sediment. About the organic compound found on the walls. About the acoustic properties of the basalt fissure system. The paper is read by twelve people and cited by two. It is precise, factual, and utterly undramatic. The truth lives in it, in fragments, for whoever eventually knows where to look.";
          }
        ]
      },

      end_broadcast: {
        chapter:  "Ending — The Pale Signal, West",
        title:    "Into Open Water",
        location: "The Atlantic — open ocean",
        isEnding: true,
        paragraphs: [
          "The lighthouse of Dursey Rock is once again in service. Its keeper is a retired coastguard officer who finds the posting quiet and asks no questions about the modified antenna array on the roof, which he is instructed not to adjust.",
          "Morrow is still on the island. He will remain there, it seems, until he doesn't. The Lighthouse Authority has decided this is, on balance, preferable to the alternative. He is, after all, a good keeper.",
          "Hale is better. He has taken a position with the Post Office as a telegraph operator. He has not explained to his employers why he sometimes pauses in the middle of a message, head tilted, as if listening to something on the line that isn't there.",
          function (s) {
            if (s.charClass === "captain") return "You do not revisit Dursey Rock. You have other crossings, other duties, other coasts. You think about it when you look at deep water — which, in your profession, is often. You have learned something about the difference between the sea you navigate and the sea that simply is, and you carry that knowledge the way all captains carry their worst memory: carefully, privately, and useful in ways you can't quite name.";
            if (s.charClass === "engineer") return "The signal horn broadcasts something, at frequency and period, into the western Atlantic. Whether it is received, and by what, and whether the receiver cares — this is not an engineering question. You have done what could be done with the tools available. The machinery works. The signal goes west. The coast is, for now, quiet.";
            if (s.charClass === "radioman") return "The eighteenth element — your address — is still in the pattern. You hear it sometimes, if you tune down far enough, still there, still tracking you. But it's pointing west now. Whatever gave you that address is looking at open ocean when it looks at you. You have never decided whether this is better or simply different. Some nights, when the long-wave is clear, you think it might be neither.";
            return "You continue your documentation. You have a theory, unpublished, about what the signal is: not intelligence, not intention, but process. Something that surveys the way weather surveys — without goal, without cessation, without malice or consideration. Something that noticed, in passing, that something noticed it back. Your theory predicts there are other signal sources. Other rocks. Other deep fissures. Other keepers. You do not know what to do with this prediction. You write it down.";
          }
        ]
      },

      end_recorded: {
        chapter:  "Ending — The Record",
        title:    "The Evidence",
        location: "The mainland — the following year",
        isEnding: true,
        paragraphs: [
          "Morrow is still at Dursey Rock. A subsequent investigation by the Lighthouse Authority found him in good health and good order and chose, for reasons never made fully explicit, to leave him there. He has stopped modifying the equipment. The light runs on schedule.",
          "Hale recovered. You heard this third-hand. You did not go looking for him.",
          "The materials you collected are divided across three institutions: the samples with a professor of marine geology in Dublin, the photographs with an archivist in London, the notebooks in your own possession.",
          function (s) {
            if (s.charClass === "captain") return "You have thought, more than once, about going back. About whether there is something more that could be done — whether your leaving it was the right choice or just the possible one. You have decided, each time, that the distinction matters less than it seems to. Morrow is there. The light is on. Ships are not dying on those rocks. The sea is keeping its own counsel, as it always has.";
            if (s.charClass === "engineer") return "The problem has no engineering solution. The source is beyond reach, the mechanism beyond interference, the process beyond interruption by anything you could bring to bear on it. What you brought back instead is evidence of a system operating at a scale that makes engineering feel like pointing a lamp at the sun. This has not made you humble. It has made you more interested in what a larger lamp might look like.";
            if (s.charClass === "radioman") return "The signal is still there. You check, sometimes. You will always check. It is quieter, it seems to you — though you know this may be your own adjustment to it, rather than any change in the signal itself. The eighteenth element is still there. Your address. Something very old and very deep knows where you are, and you are the only person on Earth who knows it knows, and you have written it down, and someday someone will read what you wrote.";
            return "You published. Not the full account — not yet, not in 1924. But the first paper: the sediment analysis. The second: the acoustic properties of the basalt formation. The third, cautiously, the biological anomalies of the organic compound. A trail of evidence laid down carefully, each paper a brick in a foundation you will spend decades building. The truth is patient. You will be patient too.";
          }
        ]
      },

      end_consumed: {
        chapter:  "Ending — The Survey",
        title:    "Point Eighteen",
        location: "Dursey Rock — the deep chamber",
        isEnding: true,
        paragraphs: [
          "You go back down.",
          "You tell yourself you are going back for more information. For Hale. For Morrow. For understanding. These things are all true, and they are not why you go back.",
          "You go back because the eighteenth element has your frequency in it, and you have been listening to the pattern for long enough that the pattern has become the ground state of your attention, and the silence when you walk away from it is worse than the signal.",
          "The water is warm. Warmer than seawater at this depth should be. You understand, in the moment you touch it, that you have been deciding to touch it since you first heard the seventeenth element on the crossing.",
          function (s) {
            if (s.charClass === "captain") return "You have commanded ships through things that should have sunk them. You have made decisions under conditions that dissolved other men's judgment. You have always known your own mind. The worst part — the detail that will replay across whatever you are becoming — is that you still do. You know exactly what you're doing. You are doing it anyway.";
            if (s.charClass === "engineer") return "The water is warm because something at 340 fathoms produces heat as a byproduct of the same process that produces the signal. You note this with the part of you that is still an engineer. That part is getting smaller. The rest of you is listening to a pattern that has always been more interesting than the machines you spent your life maintaining.";
            if (s.charClass === "radioman") return "The signal resolves, in the water, into something that is almost language. Almost. The way a transmission heard through heavy interference is almost speech. Your whole professional life has been spent at that threshold — the moment where noise becomes signal. You have reached it. You have been looking for it your whole career.";
            return "You have your notebook in your hand when you step in. You are still trying to write it down. This is the last thing you record: The water is warm. The pattern is complete. I understand that this is the conclusion of the observation, not the observer. I note that I do not stop. Your pencil continues for a moment after the words stop making sense, then stops too.";
          },
          "The survey continues. It now has three data points on this rock. It does not distinguish between them. They are all simply: here."
        ]
      },

      /* ═══════════════════════════════════════════
         EPILOGUE — THE LONG LISTENING
         ═══════════════════════════════════════════ */

      epilogue_start: {
        chapter: "Epilogue — The Long Listening",
        title: "The Frequency You Kept",
        location: "Somewhere inland — years later, an unlogged night",
        choicePrompt: "How do you begin?",
        paragraphs: [
          "You have been keeper, castaway, evidence, silence, and answer. You have sealed it, redirected it, documented it, drowned in it, and spoken back to it — not in that order, not in any order that makes sense to a body that only gets to live once. You remember doing all of it. None of it happened to the same you twice.",
          "It doesn't matter what year this is on the calendar you keep for other people. On the one you keep for yourself, there's only one date that counts, and it has never once managed to get all the way behind you.",
          "Somewhere in a drawer, in a locked case, in a report you never filed, is the version of the record that's actually true. You haven't looked at it in a long time. Tonight you're going to.",
          function (s) {
            if (s.charClass === "captain") return "It's a chart that does it — a coastal chart, unrelated, showing a shelf that happens to drop to three hundred fathoms a hundred miles from anywhere you've ever sailed. You put your finger on the depth marking and don't move it for a long time.";
            if (s.charClass === "engineer") return "It's the sound an old valve makes when it finally gives — a long, ductile groan of metal remembering a shape it was bent into once. You've heard that sound exactly once before in your life. You set down your tools.";
            if (s.charClass === "radioman") return "It's the long-wave band, three in the morning, tuned to nothing in particular, the way you tune it most nights out of a habit you've stopped explaining to anyone. Sixteen elements. Forty-seven seconds. You knew it would come back eventually. You didn't expect to feel relief when it did.";
            return "It's the notebook — the one with the locked clasp, the one you've never let anyone else open. You take it out. You've read it a hundred times. Tonight, for no reason you can name, you decide to finish where it left off instead of where you always stop.";
          },
          "The tide tables say the crossing is good for another eight hours. You have time. That has never once been the problem."
        ],
        choices: [
          { text: "Pack what you'll need and go by sea, the way you went the first time.", setsFlag: "epilogue_returned_by_sea", next: "epilogue_crossing" },
          { text: "You don't need the boat, not really. Sit down, tune down, and let the distance close itself.", next: "epilogue_crossing" }
        ]
      },

      epilogue_crossing: {
        chapter: "Epilogue — The Long Listening",
        title: "Open Water, Late",
        location: "The Atlantic — the same crossing, some other time",
        paragraphs: [
          function (s) {
            if (s.flags.epilogue_returned_by_sea) {
              return "You hired a boat this time — no coastguard cutter, no harbour authority breathing over the manifest, just a hull, an engine, and you. The crossing takes longer than you remember. Twelve miles was never really the distance that mattered.";
            }
            return "You didn't leave the room. You told yourself you would, and then you didn't, and the crossing happened anyway — the receiver warming under your hands, the pattern growing louder the way distance is supposed to work, except you haven't moved and the water outside your window is nowhere near open ocean.";
          },
          "Dursey Rock doesn't announce itself gradually anymore. There's no gradual with a place like that. It's a smudge on the horizon, and then it's the whole horizon, and then, for reasons that have nothing to do with speed, it's underneath you.",
          function (s) {
            if (s.charClass === "captain") return "You keep waiting for the wheel to tell you something. It doesn't. Water is water tonight, indifferent in the ordinary way, and you don't know if that's mercy or just distance.";
            if (s.charClass === "engineer") return "You listen for the resonance you heard the first time, the wrongness in the engine note. There isn't one. Either the water's stopped saying anything, or you've stopped being able to hear it over everything else you've heard since.";
            if (s.charClass === "radioman") return "You don't need the receiver to know the pattern's still running. You've had an address in it for years now. You could find your way back to this rock blind, the way sailors used to steer by stars that had already burned out.";
            return "You keep your notebook shut in your lap the whole crossing. You already know what you'd write. First entry, every time: approaching Dursey Rock. Second entry: it is exactly as I left it. Third entry, this time, unwritten yet: it is exactly as I left it, and so am I.";
          },
          "The lighthouse is dark. It has been dark, officially, for a long time — decommissioned, the paperwork says, after 'repeated equipment failure.' Unofficially, everyone who was ever actually here knows the paperwork is doing the same work paperwork always does about this rock: telling a story small enough to file."
        ],
        choices: [
          { text: "Bring the boat, or the distance, alongside the dock.", next: "epilogue_rock" }
        ]
      },

      epilogue_rock: {
        chapter: "Epilogue — The Long Listening",
        title: "The Dock, Unattended",
        location: "Dursey Rock — the dock",
        choicePrompt: "Where do you go first?",
        paragraphs: [
          "The dock is the same concrete, the same iron mooring rings, gone rust-orange now instead of rust-red. No rowing boat tied off this time. There's still a coiled rope with a frayed end — or rather, there is, but it's just rope now, old and stiff, finally, after all these years, done fraying.",
          "Salt grass has taken the paths between the outbuildings. The equipment store door hangs open on one hinge. Nobody has needed fuel canisters or lamp wicks here in a long time. Nobody has needed a light.",
          "There's a shack near the old garden plot that wasn't here before — driftwood and salvaged tin, the work of someone who wanted shelter and didn't much care what it looked like. A thin curl of smoke rises from something that might generously be called a chimney. You don't know if that's Morrow. You don't know if 'Morrow' is still the right word for whatever chose, at some point in some telling, to stay."
        ],
        choices: [
          { text: "Go to the shack. If someone's still keeping this rock, they deserve to be asked how.", next: "epilogue_shack" },
          { text: "Go straight to the lighthouse. Some questions don't need asking twice.", next: "epilogue_lighthouse" }
        ]
      },

      epilogue_shack: {
        chapter: "Epilogue — The Long Listening",
        title: "Driftwood and Tin",
        location: "Dursey Rock — the shack",
        paragraphs: [
          "The door is a sheet of corrugated iron on leather hinges. You knock, which feels absurd, and then the door opens, which feels more absurd, because you didn't actually expect anyone to answer.",
          "The man inside is old in the way rock is old — worn, not broken. He doesn't ask who you are. He looks at you the way Morrow once looked at the pool in the deep chamber: recognition, not surprise.",
          "'You came back,' he says. Not a question. His voice doesn't sound like Morrow's did, all those years ago, and it doesn't sound like Hale's either. It sounds like both of them said the same sentence at once and only one of them came out the other side of it.",
          "'It still asks about you,' he says. 'Not by name. It doesn't do names. But there's a place in the pattern that used to be empty and isn't anymore. I hear it most nights. I don't mind, anymore. Neither will you, eventually.'",
          "He closes the door before you can decide whether to say goodbye. Through the tin wall, faint, you hear him start to hum something in sixteen parts."
        ],
        choices: [
          { text: "Go down to the water.", next: "epilogue_descent" }
        ]
      },

      epilogue_lighthouse: {
        chapter: "Epilogue — The Long Listening",
        title: "The Empty Watch",
        location: "Dursey Rock — lighthouse base",
        paragraphs: [
          "The lighthouse door isn't locked. It's barely a door anymore — the wood swollen and sprung from the frame, held shut by its own weight more than by any latch. It gives when you lean on it.",
          "Inside: the smell you remember, fainter but not gone. Salt, cold ash, something underneath that used to remind you of drying seaweed and now just reminds you of this specific room. Nothing has been touched in a long time. Nothing has been put back, either.",
          "The kitchen table still has two chairs. One of them is still pushed back the way it was pushed back the day you found this place the first time. No one has straightened it. You don't straighten it either.",
          "You climb halfway up the spiral stair out of a habit you don't examine, and stop at the twelfth step, where a stain used to be. It's gone now — decades of salt air will do that to almost anything, eventually. You go back down without going all the way to the lantern room. You already know the ending to that part of the story, in every version you were given."
        ],
        choices: [
          { text: "Go down to the water.", next: "epilogue_descent" }
        ]
      },

      epilogue_descent: {
        chapter: "Epilogue — The Long Listening",
        title: "The Path Down, Again",
        location: "Dursey Rock — north face path",
        paragraphs: [
          "The path to the cave is worse than you remember — more slumped, more given over to salt and time — but it's still passable, and your feet find the good stone without being told which stone is good.",
          "The tide is out, the way it was the first time. You've never once managed to come back and find it otherwise. You've stopped believing that's a coincidence.",
          "The cave mouth is exactly as wide as it always was. The smell reaches you before the dark does — that same organic sweetness, that same mineral edge like struck flint, undiminished by any of the years or any of the endings that were supposed to have settled it.",
          "In every telling, this was the last threshold before the part of the story that changed depending on who you were when you crossed it. Tonight there's no version of you left to choose between. You're all of them at once, for the length of this last walk in."
        ],
        choices: [
          { text: "Go in.", next: "epilogue_chamber" }
        ]
      },

      epilogue_chamber: {
        chapter: "Epilogue — The Long Listening",
        title: "The Source, Unchanged",
        location: "Dursey Rock — the deep chamber",
        choicePrompt: "What do you do, before you leave for good?",
        paragraphs: [
          "The descent takes the same fifteen minutes it always takes, whether you're going down for the first time or the last. The luminescence is there, faint and blue-white, exactly where you left it in every telling that ever put you in this room.",
          "The chamber opens the way it opens. The markings are still on the walls, layered, older beneath newer, patient with an indifference that has never once needed your permission to continue. The pool at the centre is still. It is always still. That's the thing about a pool that has been listening for longer than land has had names.",
          "In one telling, you filled this chamber with dust and stone and left it sealed behind six charges of gelignite. In another, you turned its voice west and let it go on talking to water that never answers back. In another, you took your samples and your photographs and let the silence keep its secret while you kept your evidence. In another, you didn't come back up at all — you're the one who's still down here, in that telling, part of the pattern instead of a witness to it. In one, only one, and you remember it clearest of all, you answered it. You gave it coordinates. It listened to you the way you'd been listening to it, and it moved.",
          "None of that is what's happening tonight. Whatever's down here doesn't remember you the way a person remembers — it doesn't remember at all, not like that. It only ever surveys. But there is a shape in the pattern, low among the sixteen elements, that wasn't there before you first arrived and hasn't left since. You've come to recognise the shape of your own name in something that has never once used names.",
          function (s) {
            if (s.charClass === "captain") return "You have given orders your whole life, and taken responsibility for the ones that went wrong, and you find that whatever this thing is, it has still never once given or taken an order in any way you'd recognise. It doesn't command. It doesn't obey. It only counts. You've spent years wondering which is worse than a monster that wants something. You still don't know.";
            if (s.charClass === "engineer") return "You look for the failure point out of habit — the place where this could be interrupted, redirected, shut down for good. You don't find one. You never found one. What you found, across every telling, was a way to make the not-finding survivable. That's still the only kind of victory this room has ever offered anyone.";
            if (s.charClass === "radioman") return "You can hear it without the receiver now. You've been able to for years — the seventeenth element, the eighteenth, whichever one ended up being yours, a low tone under everything, present the way a heartbeat is present until you go looking for it. Down here, for once, you let yourself listen on purpose instead of around it.";
            return "You don't take out your notebook. This is the one observation you've decided, across every telling, not to make — not because you can't, but because some things stop being data the moment you decide they're the only thing left worth writing down twice.";
          },
          "It doesn't ask anything of you, this time. It doesn't need to. It surveyed you a long time ago, in whichever telling did the surveying, and the result is already recorded somewhere in a geometry you were never going to fully read. You are, and have been for years, simply: here."
        ],
        choices: [
          { text: "Stay a while and listen, without answering.", setsFlag: "epilogue_listened", next: "epilogue_end" },
          { text: "Turn around and climb back out, and don't look back this time.", next: "epilogue_end" }
        ]
      },

      epilogue_end: {
        chapter: "Epilogue — The Long Listening",
        title: "The Nineteenth Element",
        location: "Dursey Rock — after, and always",
        isEnding: true,
        isEpilogue: true,
        paragraphs: [
          "You climb back up through the fissure, through the cave, out into whatever hour has decided to be waiting on the surface. The tide has come in around the cave mouth behind you, the way it always does, indifferent to how long you spent below it.",
          function (s) {
            if (s.flags.epilogue_listened) {
              return "You listened for a while down there, without answering anything. It felt less like keeping vigil and more like checking a pulse you already knew wasn't going to stop — confirming, one more time, that the thing you carry away from that rock is still exactly as large as it's always been.";
            }
            return "You didn't linger. You've done enough listening for one lifetime, in every telling that ever put a receiver or a set of ears in your hands. Walking away without a last look felt, for once, like the correct amount of respect to pay something that was never going to notice the difference.";
          },
          "No harbour authority is waiting this time. No chart, no telegram, no coastal steamer's nine dead to account for. Nobody sent you. Nobody's expecting a report.",
          "Somewhere behind you — in a shack of driftwood and tin, or in an empty house with two chairs and one of them still pushed back — whatever chose to stay on Dursey Rock goes on staying, the way the rock goes on being rock. You were never going to be the one who ended that. Nobody ends a survey. You can only ever stop being the one it's currently counting.",
          function (s) {
            if (s.charClass === "captain") return "You take the boat back yourself, hand steady on a wheel that has never once, across any telling, told you the whole truth about the water underneath it. You've made your peace with commanding what you can't fully chart. That peace is the only trophy this rock was ever going to let you keep.";
            if (s.charClass === "engineer") return "You think, on the crossing back, about the valve you once bent into shape with a wrench and two hours and more nerve than sense. Some things get fixed. Some things just get made survivable. You've spent the years since learning to tell the difference before you spend the effort — that, more than any repair, is the actual skill you brought home from this rock.";
            if (s.charClass === "radioman") return "You don't turn the receiver on for the crossing back. You don't need to. You know exactly what you'd hear, and exactly where in it you'd be, and for the first time in years that knowledge sits in you like ballast instead of like a wound. Some frequencies you learn to carry instead of chase.";
            return "Your notebook stays closed the whole way back. You already know what the last entry will say, because you've written some version of it in every telling: The phenomenon persists. Its subject does too. You have stopped waiting for a framework that will make the second sentence easier to file than the first.";
          },
          "Forty-seven seconds. Sixteen elements, or seventeen, or eighteen, depending on which telling is doing the counting. Somewhere below three hundred fathoms of cold Atlantic water, something that has never once needed you to understand it goes on surveying a coastline that includes, now and permanently, the specific shape of your attention.",
          "You were never going to get to stop being part of its data. The only thing you ever actually got to choose was how you carried that — and you have now carried it every way there was to carry it. That, on a rock that has never once offered anyone closure, is the closest thing to it you were ever going to get."
        ]
      }

    }
  }
});
