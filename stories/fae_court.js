/* stories/fae_court.js — The Court of Stolen Hours */
window.STORIES = window.STORIES || [];
window.STORIES.push({
  id: "fae_court",
  title: "The Court of Stolen Hours",
  blurb: "On Midsummer's Eve your sibling vanished into the ring of standing stones. Three days have passed in the world, but time moves wrong beyond the veil. You've found the crossing. Now you must navigate the Twilight Court before you forget why you came.",
  classes: [
    { id: "knight",     name: "Knight",     tag: "Iron & Will",    desc: "Cold iron resists glamour. You came prepared." },
    { id: "bard",       name: "Bard",       tag: "Song & Story",   desc: "Music opens fae doors. Every fae loves a good performance." },
    { id: "witch",      name: "Witch",      tag: "Old Pacts",      desc: "You know fae law and the old bindings. Names have power here." },
    { id: "changeling", name: "Changeling", tag: "Twilight Blood", desc: "Half-fae yourself — you see through glamour and know this world." }
  ],
  achievements: [
    { id: "first_steps",       icon: "🌺", title: "Stepped Through",       desc: "Enter the great hall of the Twilight Court.",                  condition: { type: "scene_visit",  scene: "great_hall" } },
    { id: "knight_victor",     icon: "⚔️", title: "Iron in the Gloaming",  desc: "Rescue your sibling as a Knight.",                             condition: { type: "class_ending", charClass: "knight",     ending: "end_heroic" } },
    { id: "bard_victor",       icon: "🎵", title: "The Last Verse",         desc: "Rescue your sibling as a Bard.",                               condition: { type: "class_ending", charClass: "bard",       ending: "end_heroic" } },
    { id: "witch_victor",      icon: "🌿", title: "Old Pact Honored",       desc: "Rescue your sibling as a Witch.",                              condition: { type: "class_ending", charClass: "witch",      ending: "end_heroic" } },
    { id: "changeling_victor", icon: "🌙", title: "Twilight Reclaimed",     desc: "Rescue your sibling as a Changeling.",                         condition: { type: "class_ending", charClass: "changeling", ending: "end_heroic" } },
    { id: "gilded_cage",       icon: "🤝", title: "The Gilded Cage",        desc: "Strike a bargain with the Thornweave.",                         condition: { type: "any_ending",   ending: "end_bargain" } },
    { id: "bittersweet",       icon: "🍂", title: "Bittersweet",            desc: "Find an imperfect freedom.",                                   condition: { type: "any_ending",   ending: "end_partial" } },
    { id: "lost_to_gloaming",  icon: "🌑", title: "Gone to the Gloaming",  desc: "Lose yourself to the twilight court.",                         condition: { type: "any_ending",   ending: "end_lost" } },
    { id: "fae_ally",          icon: "🧚", title: "A Friend Among Foes",   desc: "Earn the loyalty of a fae ally.",                              condition: { type: "flag_set",     flag: "has_fae_ally" } },
    { id: "true_name",         icon: "🔮", title: "The Name of Power",      desc: "Learn the Thornweave's true name.",                            condition: { type: "flag_set",     flag: "has_true_name" } },
    { id: "reunion",           icon: "💛", title: "Found You",              desc: "Find your missing sibling within the court.",                  condition: { type: "flag_set",     flag: "sibling_found" } },
    { id: "court_claim",       icon: "👑", title: "Twilight Sovereign",    desc: "Find the hidden ending — claim the Thornweave's court as a Changeling.", condition: { type: "any_ending", ending: "end_court_claim" } },
    { id: "all_endings",       icon: "📜", title: "Chronicler of Courts",   desc: "Discover all four endings.",                                   condition: { type: "all_endings" } }
  ],
  story: {
    start: "crossroads",
    scenes: {

    /* ═══════════════════════════════════════════════════════════════
       ACT I — THE CROSSING
    ═══════════════════════════════════════════════════════════════ */

    "crossroads": {
      chapter: "Act I — The Crossing",
      title: "The Ring of Standing Stones",
      location: "Midsummer's Hill — Dusk",
      choicePrompt: "How do you cross the veil?",
      paragraphs: [
        function(s) {
          return "Three days. Three days since " + s.name + " stood on this hill and watched the standing stones swallow the last light of Midsummer's Eve — and swallow your sibling with it.";
        },
        "The stones are older than the village, older than the road, older perhaps than memory. Twelve of them, waist-high and mossy, arranged in a circle exactly wide enough to dance in. At dusk they begin to hum.",
        "The air inside the ring shimmers. Through it you can almost see another sky — a sky the wrong shade of violet, lit by no sun you can name.",
        function(s) {
          if (s.charClass === "knight") return "You've spent three days preparing. Cold iron — real iron, not steel — hangs heavy at your belt and wrists. Every traveler's tale says the same thing: iron is the only honesty the fae cannot refuse.";
          if (s.charClass === "bard") return "You've spent three days in the village records, reading the old crossing songs. The fae are proud of their music. They always let a performer in — they can never resist seeing if a mortal can match them.";
          if (s.charClass === "witch") return "You've spent three days in preparation. The old compact between the speaking world and the fae courts has never been formally dissolved. You know the words that name the right of passage. The fae are bound to honor them.";
          return "You've spent three days feeling the pull. You've always known you were different — the way glamour slides off you, the way fae things seem to recognize you. Half of you already belongs to this place. The veil knows it.";
        },
        "The stones hum louder. The crossing is now or not at all."
      ],
      choices: [
        { text: "Grip the cold iron and walk through the glamour.", onlyFor: ["knight"], next: "ring_knight", setsFlag: "has_iron" },
        { text: "Sing the old crossing song until the stones answer.", onlyFor: ["bard"], next: "ring_bard" },
        { text: "Speak the words of the old compact and claim right of passage.", onlyFor: ["witch"], next: "ring_witch" },
        { text: "Step through. The veil has always recognized you.", onlyFor: ["changeling"], next: "ring_changeling" }
      ]
    },

    "ring_knight": {
      chapter: "Act I — The Crossing",
      title: "Iron Against Glamour",
      location: "The Standing Stones",
      paragraphs: [
        "You close your fist around the iron pendant at your throat and walk forward.",
        "The glamour hits like a wall of warm water — disorienting, sweet-smelling, full of voices urging you to stop, to rest, to forget what you came for. The iron burns cold in your palm, and the voices scatter like smoke in wind.",
        "The stones sing a single rising note as you pass between the two tallest. The sky tilts. The grass changes color. The air tastes of something that has never had a name.",
        "You're through. The world behind you is already dimming, the gap closing like a healing wound.",
        "Your iron is warm now. Something in this realm already dislikes it. Good."
      ],
      choices: [
        { text: "Take stock of where you are.", next: "twilight_arrival" }
      ]
    },

    "ring_bard": {
      chapter: "Act I — The Crossing",
      title: "The Crossing Song",
      location: "The Standing Stones",
      paragraphs: [
        "You begin with the oldest verse you found — three words in a language that predates writing, meant to be spoken to stone and meant to be heard.",
        "The stones respond immediately. The hum deepens, harmonizing with you, adding harmonics you couldn't produce alone. The hair on your arms rises.",
        "You sing the full song twice through. On the third repetition, the shimmer in the ring blazes silver-white and the gap widens. You hear applause from the other side — thin, like wind through reeds. Something is already waiting.",
        "You walk through mid-verse, still singing, because stopping feels like it would be rude, and you have an instinct that rudeness here is dangerous.",
        "The last note hangs in the air on the other side of the veil long after your mouth has closed."
      ],
      choices: [
        { text: "Look around at this new world.", next: "twilight_arrival" }
      ]
    },

    "ring_witch": {
      chapter: "Act I — The Crossing",
      title: "The Old Compact",
      location: "The Standing Stones",
      paragraphs: [
        "You face the ring and speak the formula carefully — not loudly, because this is not an invocation but a citation. You are quoting a contract older than kings.",
        "\"By the Accord of Thornvale, which bound the speaking courts to honor passage to any mortal who names the right of petition, I name that right now. I have cause. I have purpose. I pass.\"",
        "The stones go silent. Then, one by one, they lean slightly outward — as if making room.",
        "The veil parts. Not dramatically, not with silver fire — it simply opens, the way a door does when the latch releases. You walk through.",
        "On the other side, something watches you from a distance that is hard to judge. You cannot tell if it is impressed or annoyed. Possibly both."
      ],
      choices: [
        { text: "Step forward into the fae realm.", next: "twilight_arrival" }
      ]
    },

    "ring_changeling": {
      chapter: "Act I — The Crossing",
      title: "Coming Home",
      location: "The Standing Stones",
      paragraphs: [
        "You walk forward without ceremony.",
        "The veil does not resist you. It recognizes you the way a door recognizes a key — not warmly, not coldly, simply correctly. The shimmer parts around you and closes behind.",
        "For a single disorienting heartbeat you exist in both worlds at once. You feel your mortal half and your fae half align like two halves of a compass snapping together.",
        "Then you're through. The Twilight Court's realm spreads before you, and you feel it settle around you like a cloak that fits because it was always yours.",
        "The shapes in the middle distance turn to look. They already know what you are. That is an advantage — and a complication."
      ],
      choices: [
        { text: "Look around and take your bearings.", next: "twilight_arrival" }
      ]
    },

    "twilight_arrival": {
      chapter: "Act I — The Crossing",
      title: "The Twilight Realm",
      location: "Beyond the Veil",
      paragraphs: [
        "The sky here is the color of a bruise — violet fading to grey at the edges, lit by a sun that has already set or has not yet risen; you cannot tell which. The light does not cast shadows in the right direction.",
        "The landscape is familiar and wrong in equal measure. Hills that look like the hills you know, but steeper, more deliberate, as if someone arranged them for effect. Trees with silver bark and leaves of hammered copper that do not move in the wind.",
        "The air has weight. Not thick, exactly, but present — as if each breath contains something extra that your lungs are processing for the first time.",
        function(s) {
          if (s.charClass === "knight") return "Your iron is warm against your skin. The realm registers it the way a body registers a splinter — a low, persistent awareness. That awareness runs in both directions.";
          if (s.charClass === "bard") return "The ambient sound here is extraordinary. Beneath the wind and the faint distant bells, there is music — not performed, but structural, as if the place is built from harmonics rather than stone and wood.";
          if (s.charClass === "witch") return "You read the place as you would a contract: noting terms, conditions, exceptions. The old compact is in force here; you can feel it like a handshake that is still being held. Good. You have rights, and rights here have teeth.";
          return "You feel it immediately — the place filling in around you like memory returning. The glamour that would disorient a mortal visitor simply isn't there for you. You see the realm as it is, not as it is presented. And what it is, is old, and deliberate, and watching.";
        },
        "Far ahead, rising above the silver trees, the spires of the Twilight Court cut the bruised sky. Your sibling is in there somewhere. You need to reach them before you lose track of why that matters."
      ],
      choices: [
        { text: "Follow the road toward the court.", next: "fae_road" }
      ]
    },

    "fae_road": {
      chapter: "Act I — The Crossing",
      title: "The Twilight Road",
      location: "The Road to the Court",
      choicePrompt: "What do you do?",
      paragraphs: [
        "The road is crushed white stone that rings softly underfoot. It winds in ways that make no sense for the landscape — curving away from the most direct path, doubling back, looping around trees that could simply be walked around.",
        "You have been on it for what feels like an hour when you realize the sun has not moved. It is still in the same position it was when you arrived — that ambiguous twilight position between gone and coming.",
        "Time is not working correctly. You understand this intellectually but your body keeps trying to track it anyway. Your stomach says one thing. The light says another.",
        "Two figures appear on the road ahead, moving in the same direction as you."
      ],
      choices: [
        { text: "Approach the figures.", next: "road_encounter_a" },
        { text: "Hang back and observe them from a distance first.", next: "road_encounter_b" }
      ]
    },

    "road_encounter_a": {
      chapter: "Act I — The Crossing",
      title: "A Fellow Traveler",
      location: "The Twilight Road",
      choicePrompt: "What do you do?",
      paragraphs: [
        "One of the figures is fae — tall, silver-eyed, dressed in clothes that shift color when you look away. The other is mortal: a young man in clothes that were fashionable perhaps twenty years ago, walking in a daze.",
        "The fae traveler notices you first and offers a bow so elaborate it loops back around into mockery. \"Another mortal crossing. How fashionable. The court will be pleased.\"",
        "They are heading to the court, they say, on errands of their own. They do not explain the mortal man. He does not seem to hear anything said around him.",
        function(s) {
          if (s.charClass === "knight") return "The fae's gaze drops briefly to your iron and comes back to your face with a fractionally different quality. Less amusement. More caution. You keep your expression neutral.";
          if (s.charClass === "bard") return "You recognize the pattern of the fae's embroidery — a minor house, not a great court. An errand-runner, not a courtier. A potential source of information if you can find the right song for the conversation.";
          if (s.charClass === "witch") return "You clock the fae's house sigil and cross-reference it in memory: House Ashwither, bound to the Thornweave's court but not entirely loyal. Interesting. The disloyal often know things they'd like to share.";
          return "The fae sees you see through them and pauses — a fractional break in their performance. Half-bloods always recognize each other. They recalibrate immediately, the smile returning, but with a different quality now. Respect, maybe. Or wariness.";
        }
      ],
      choices: [
        { text: "Ask about the mortal man walking with them.", next: "road_help_mortal" },
        { text: "Ask about the fastest route to the Thornweave's court.", next: "crossroads_fork" },
        { text: "Keep walking. You don't need fae company.", next: "road_ignore_mortal" }
      ]
    },

    "road_encounter_b": {
      chapter: "Act I — The Crossing",
      title: "The Man on the Road",
      location: "The Twilight Road",
      choicePrompt: "What do you do?",
      paragraphs: [
        "From a distance, the second figure is clearly mortal — he moves wrong for a fae, too stiff, too bound to the ground. He is wearing clothes that went out of fashion before you were born.",
        "As you close the gap, you see his face: blank, peaceful, utterly absent. He is walking in a perfect daze. His eyes are open but not looking at anything in this world.",
        "The fae with him notices you watching and changes course to intercept. Up close, the fae is precisely too beautiful — features arranged just slightly beyond natural distribution.",
        "\"Admiring my companion?\" they say pleasantly. \"He wandered in thirty years ago. He has been very happy here ever since. He no longer asks questions. Questions are so tiring.\""
      ],
      choices: [
        { text: "Ask if there is any way to help the man.", next: "road_help_mortal" },
        { text: "Nod politely and walk on. You cannot save everyone.", next: "road_ignore_mortal" }
      ]
    },

    "road_help_mortal": {
      chapter: "Act I — The Crossing",
      title: "Thirty Years Gone",
      location: "The Twilight Road",
      paragraphs: [
        "\"Can he be helped?\" you ask.",
        "The fae tilts their head, as if the question is novel. \"Helped. What a mortal word. He is content. He eats when food appears. He sleeps when darkness falls — though darkness does not often fall. He has forgotten everything that would cause him pain. Is that not a kind of help?\"",
        "The man himself says nothing. His face is smooth with a peace you have not earned and cannot imagine wanting.",
        function(s) {
          if (s.charClass === "knight") return "You note the man's condition and file it away. This is what losing looks like here. Not death. Not pain. Just — erasure. The stakes clarify in your chest like cold water.";
          if (s.charClass === "bard") return "You try speaking to him — not a song, just words, normal words, someone's name, a town. Nothing reaches. The person who came in thirty years ago is very far down underneath the peace. You wonder if he is still screaming, very quietly, where the fae cannot hear.";
          if (s.charClass === "witch") return "You check his eyes. The pupils are the wrong size for the light — not his own light, not calibrated to any sun you know. His name is gone first, always. Then the faces. Then the words for things. Finally the feeling that anything is missing.";
          return "You look at him and feel the pull of what he has — the ease of it. That pull is the fae blood in you, recognizing the state as natural. Your mortal half is horrified by the recognition. You look away.";
        },
        "There is nothing to be done for him now. But your sibling has only been here three days. There is still time.",
        "You leave the man to his contentment and press on toward the court."
      ],
      choices: [
        { text: "Continue to the crossroads.", next: "crossroads_fork" }
      ]
    },

    "road_ignore_mortal": {
      chapter: "Act I — The Crossing",
      title: "Eyes Forward",
      location: "The Twilight Road",
      paragraphs: [
        "You end the exchange without ceremony and walk on. The fae watches you go with what might be approval.",
        "\"Practical,\" they call after you. \"You'll do well here.\"",
        "You do not look back at the man in the old clothes. You cannot afford to carry anything that isn't your sibling home."
      ],
      choices: [
        { text: "Press on to the crossroads.", next: "crossroads_fork" }
      ]
    },

    "crossroads_fork": {
      chapter: "Act I — The Crossing",
      title: "Three-Way Crossroads",
      location: "The Twilight Road — Crossroads",
      choicePrompt: "Which way do you go?",
      paragraphs: [
        "The road splits into three at a junction marked by a tall carved post. Each arm points in a different direction. Each bears a sign.",
        "The signs read: THE COURT (pointing left), THE COURT (pointing straight ahead), and THE COURT (pointing right).",
        "All three say the same thing."
      ],
      choices: [
        { text: "Read the signs more carefully.", next: "signpost_lies" }
      ]
    },

    "signpost_lies": {
      chapter: "Act I — The Crossing",
      title: "The Lying Signpost",
      location: "The Twilight Road — Crossroads",
      choicePrompt: "Which road do you take?",
      paragraphs: [
        "Up close, the signs are stranger than they looked. The letters are carved deeply, but the wood beneath has grain that flows against the direction of the carving — as if the post itself is resisting what the words say.",
        function(s) {
          if (s.charClass === "knight") return "The iron at your wrist goes cold when you hold it toward the left road and warm when you hold it toward the center. Iron responds to wrongness. The left road is the lure.";
          if (s.charClass === "bard") return "You hum a single sustained note and watch which way the sound bends. Sound here follows truth the way it follows canyons — it wants to go somewhere real. The center road carries your note forward cleanly. The left and right roads swallow it.";
          if (s.charClass === "witch") return "You press your thumb to the post and feel the binding on the sign — it is a genuine compulsion, the post literally cannot say anything other than THE COURT. But two of those signs are technically true in a misdirecting way. The center sign points to the court gate. The others point to... aspects of the court. Places inside. Technically accurate. Deeply deceptive.";
          return "You look at all three roads with fae sight and let the glamour of each settle over you like light. The center road glows with honest intention. The left road glows with something sweet and hungry. The right road glows with very old intention — a tradition so calcified it has become compulsory. You have been on both trap-roads before, in your own way.";
        },
        "All three roads reach the court. The center road reaches it directly. The left road reaches it hungry — something in it wants to keep you. The right road reaches it slowly, through a tradition that predates the Thornweave's tenure and does not particularly care about your schedule."
      ],
      choices: [
        { text: "Take the center road — the honest one.", next: "arrive_court_gate" },
        { text: "Take the left road anyway — you've handled hungry roads before.", next: "arrive_court_gate" },
        { text: "Take the right road — tradition moves slowly but it moves.", next: "arrive_court_gate" }
      ]
    },

    "arrive_court_gate": {
      chapter: "Act I — The Crossing",
      title: "The Court Gate",
      location: "The Outer Gate of the Twilight Court",
      paragraphs: [
        "The Twilight Court rises above you: a structure that should not be able to stand. Towers that lean and curve like living things. Bridges of woven glass spanning distances too great to be comfortable. The whole complex is the color of the inside of a shell — iridescent, deep, lit from within.",
        "The outer gate is a double arch of dark thorned wood, each arch tall enough to admit something much larger than a person. Torches burn in brackets on either side — green fire, completely steady, not moved by any wind.",
        "Two guards stand at the arch. They are fae and make no effort to appear otherwise: too tall, too still, armor that casts no shadow.",
        "They see you coming from far away and do not move."
      ],
      choices: [
        { text: "Approach the guards.", next: "gate_guard" }
      ]
    },

    "gate_guard": {
      chapter: "Act I — The Crossing",
      title: "The Gate Guards",
      location: "The Outer Gate",
      choicePrompt: "How do you gain entry?",
      paragraphs: [
        "\"Mortal,\" the left guard says. It does not inflect like a question or an accusation — simply an observation, the way you might say: stone.",
        "\"State your purpose and your name,\" the right guard adds. \"The court does not open to all who knock.\"",
        "Behind them, through the arch, you can see the beginning of a grand courtyard. Movement inside — figures, light, the suggestion of music."
      ],
      choices: [
        { text: "Hold up your iron and let your reputation precede you.", onlyFor: ["knight"], next: "gate_knight" },
        { text: "Step forward and begin to perform.", onlyFor: ["bard"], next: "gate_bard" },
        { text: "Cite the old right of petition by name.", onlyFor: ["witch"], next: "gate_witch" },
        { text: "Walk in as if you belong here.", onlyFor: ["changeling"], next: "gate_changeling" }
      ]
    },

    "gate_knight": {
      chapter: "Act I — The Crossing",
      title: "Iron at the Gate",
      location: "The Outer Gate",
      paragraphs: [
        "You say your name. Then: \"I am here under the old laws of sanctuary and grievance. My sibling was taken without compact or bargain. I claim the right of retrieval.\"",
        "You hold up your wrist so the iron bracelet catches the green torchlight.",
        "The guards process this. They step back — not much, but perceptibly. Cold iron is the one trump card here and they know it, and you know they know it, and that shared knowledge makes the next move obvious.",
        "\"The court grants entry,\" the left guard says, with the tone of someone who does not enjoy saying it. \"Mortal and iron together. The Lord is informed.\"",
        "The arch opens."
      ],
      choices: [
        { text: "Enter the court.", next: "court_entry" }
      ]
    },

    "gate_bard": {
      chapter: "Act I — The Crossing",
      title: "The Performance at the Gate",
      location: "The Outer Gate",
      paragraphs: [
        "\"I'm here to perform for the court,\" you say simply. \"I've heard the Thornweave appreciates talent. I've been told I have some.\"",
        "You begin before they can object — a song you composed in the three days since your sibling vanished, about a musician who travels to the end of the world to find a note that was stolen from a song. It is, you realize as you sing it, somewhat on the nose.",
        "The guards' expressions do not change, but they go very still in the way that means they are listening with their whole bodies.",
        "When you finish, the right guard says: \"The court will receive a performer. Enter. Do not make the Lord wait for your second song.\"",
        "The arch opens. You get the sense the guards would like you to play the whole thing again, and that they will deny it forever."
      ],
      choices: [
        { text: "Enter the court.", next: "court_entry" }
      ]
    },

    "gate_witch": {
      chapter: "Act I — The Crossing",
      title: "The Old Right of Petition",
      location: "The Outer Gate",
      paragraphs: [
        "\"I invoke the Accord of Thornvale, Section IV, Clause the Second: any mortal who comes before a fae court with evidence of wrongful taking — a mortal conveyed across the veil without consent or compact — has the right of petition before the court's Lord.\"",
        "You pause. \"Cite the counter-argument if you have one.\"",
        "Neither guard does. The law is the law, and the law is older than this court and older than its Lord. Fae are many things, but they are bound by their own compacts in ways that cannot be undone without unraveling everything.",
        "\"Entry granted under the Accord,\" the left guard says, with the forced neutrality of someone reciting from a document they cannot edit. \"The Lord will be notified of the legal basis for your visit.\"",
        "The arch opens. You have an appointment, whether the Thornweave wanted to grant you one or not."
      ],
      choices: [
        { text: "Enter the court.", next: "court_entry" }
      ]
    },

    "gate_changeling": {
      chapter: "Act I — The Crossing",
      title: "Returning Courtier",
      location: "The Outer Gate",
      paragraphs: [
        "You don't slow down as you approach the gate. You walk like you own the space between yourself and the arch. Your fae half provides the vocabulary of posture; you let it.",
        "The guards read you the way guards read everyone — looking for the thing that doesn't fit. In your case, nothing doesn't fit. You are half of this place.",
        "\"House?\" the right guard asks.",
        "\"Guest of the Lord,\" you say, without inflection. It is not technically a lie — you intend to make it true the moment you're inside.",
        "The left guard frowns very slightly. Then the frown smooths. The glamour of confidence is doing its work. They have seen a thousand courtiers come and go. You look like one.",
        "\"Enter,\" the right guard says.",
        "You are already walking."
      ],
      choices: [
        { text: "Pass into the court.", next: "court_entry" }
      ]
    },

    "court_entry": {
      chapter: "Act I — The Crossing",
      title: "The Twilight Court",
      location: "The Court — Outer Courtyard",
      paragraphs: [
        "The outer courtyard is larger inside the gate than the gate suggested it could be. This bothers you less than it probably should — you are already adjusting.",
        "Fae move through the space in ones and twos, dressed in clothes built for ornament rather than function. Their conversations are inaudible at this distance but visually elaborate — gestures that mean things, pauses that mean more.",
        "The great hall doors are straight ahead: two stories of carved dark wood, worked with images of time flowing in directions it does not naturally go.",
        "To the left, through a bower of silver trees, you can see a garden. To the right, a long window-lit building that might be a library or archive. The hall doors ahead lead deeper into the court.",
        function(s) {
          if (s.charClass === "knight") return "You count exits inside thirty seconds: gate behind you, great hall doors ahead, bower path left, archive building right. The courtiers clocking your iron with practiced neutrality are a known quantity — fae trained to appear unbothered by the things that bother them. You have worked with that type. You know the difference between unbothered and disciplined.";
          if (s.charClass === "bard") return "The ambient sound of the courtyard has a structure — not random conversation but something layered, organized. Fae courts run on performance and the courtyard is the opening act. You listen for the gaps. Every performance has things it is trying not to say, and the gaps are always where the truth lives.";
          if (s.charClass === "witch") return "You read the carvings on the great hall doors from twenty feet: old law, old binding, some of it correctly applied and some interpretively stretched in ways that would not survive a formal challenge. The Thornweave has been relying on the unchallengeability for a long time. You note that. You note it carefully.";
          return "The courtiers calculating your house allegiance are running an equation with no solution, and after a moment you see each of them, one by one, set it quietly aside. Half-bloods don't resolve cleanly. That is a kind of invisibility. You have used it before. You let it work while you study the great hall doors and decide what comes next.";
        },
        "You have made it inside. Now you need a plan."
      ],
      choices: [
        { text: "Enter the great hall.", next: "great_hall" }
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       ACT II — THE COURT
    ═══════════════════════════════════════════════════════════════ */

    "great_hall": {
      chapter: "Act II — The Court",
      title: "The Great Hall",
      location: "The Thornweave's Great Hall",
      choicePrompt: "Where do you go first?",
      paragraphs: [
        "The great hall is designed to remind you of your smallness. The ceiling is so high it has its own weather — thin cloud at the apex, lit by chandeliers made of what appear to be captive stars.",
        "The Thornweave's throne sits at the far end of the hall, elevated above the floor on a dais of black glass. The throne is empty. The Lord is not present, or not visibly so.",
        "Fae courtiers fill the hall, watching everything with beautiful, calculating faces. Several look at you with undisguised curiosity. None approach. The social architecture here is complex, and you are an unknown variable in it.",
        function(s) {
          if (s.charClass === "knight") return "You scan exits and entry points from habit. Three visible doors besides the one you came through. The throne dais has a rear passage behind a curtain. The iron at your wrist keeps the glamour from settling on you, and you are grateful for the clarity.";
          if (s.charClass === "bard") return "The hall has its own acoustics — every sound slightly amplified, every whisper designed to be overheard by whoever the speaker intends. This is a performance space as much as a court. You feel more comfortable already.";
          if (s.charClass === "witch") return "The hall is a legal space. The binding language is written into the architecture — literally, in script carved into the floor that the rushes half-conceal. You catch words: CONTRACT. WITNESS. BINDING. Everything said in this room carries weight.";
          return "The glamour here is the strongest you've felt — thick as tapestry, layered over every surface. You see through it, and what you see is stranger than the show: the hall is not purely here. Parts of it exist slightly sideways, occupying a different angle of the same space. Time flows differently in different corners of the room.";
        },
        "You need to find your sibling. You need information. You need allies, or at least the absence of enemies."
      ],
      choices: [
        { text: "Try to approach the Thornweave's throne directly.", next: "hall_approach_direct" },
        { text: "Explore the garden through the silver trees.", next: "garden" },
        {
          text: function(s) {
            if (s.charClass === "witch") return "Go to the archive — that classification system is navigable if you know what you're looking for.";
            if (s.charClass === "bard") return "Check the archive — fae courts keep legal records of their own vulnerabilities.";
            return "Investigate the archive building.";
          },
          next: "archive"
        },
        { text: "Search the court for your sibling.", next: "sibling_search" },
        {
          text: function(s) {
            if (s.charClass === "bard") return "Listen to the courtiers — fae conversation has structure, and structure has a key.";
            if (s.charClass === "changeling") return "Listen to the courtiers' conversations. You know how fae say things by not saying them.";
            return "Listen to the courtiers' conversations.";
          },
          next: "hall_whispers"
        },
        { text: "Explore the passages between the wings.", next: "court_wander" }
      ]
    },

    "hall_approach_direct": {
      chapter: "Act II — The Court",
      title: "Not Yet",
      location: "The Thornweave's Great Hall",
      paragraphs: [
        "You walk toward the throne. Three steps, and a fae courtier steps into your path — not threateningly, almost pleasantly.",
        "\"The Lord is not receiving guests at present,\" they say. \"The Lord is... elsewhere. Temporally speaking.\"",
        "\"What does that mean?\" you ask.",
        "\"It means,\" the courtier says, with elaborate patience, \"that the Lord is in a different moment of today. He will be here when he decides to have always been here. Fae courts do not operate on mortal schedules.\"",
        "They gesture toward the wings of the hall with an encouraging smile. \"Perhaps explore while you wait. The garden is particularly lovely this unspecified evening.\""
      ],
      choices: [
        { text: "Go to the garden.", next: "garden" },
        { text: "Go to the archive.", next: "archive" },
        { text: "Search for your sibling.", next: "sibling_search" }
      ]
    },

    /* GARDEN WING */

    "garden": {
      chapter: "Act II — The Court",
      title: "The Twilight Garden",
      location: "The Thornweave's Garden",
      choicePrompt: "What catches your attention?",
      paragraphs: [
        "The garden is behind the hall, through a passage lined with mirrors that do not reflect you correctly — always showing you a half-second ahead, so you walk toward your own gestures rather than making them.",
        "The garden itself is breathtaking and deeply wrong. Flowers of colors that do not exist in the mortal world. Trees whose branches end in perfect geometric shapes, as if the growth was legislated. A fountain at the center that runs upward and collects in a pool suspended three feet above the basin.",
        "Something moves in the deeper growth — not threatening, not hiding, just moving in a way that is clearly aware of you.",
        "At the far end of the garden you see something that stops your breath: a figure seated on a stone bench, a mortal figure, your sibling's height, your sibling's posture—",
        "But the figure shifts, and it is not them. Just the light. Just the garden playing with your expectations.",
        "You realize your hands are shaking."
      ],
      choices: [
        { text: "Investigate the movement in the deeper growth.", next: "garden_fae" },
        { text: "Look for any sign of where your sibling might be kept.", next: "garden_sibling_glimpse" },
        { text: "Examine the suspended fountain more carefully.", next: "garden_circle" }
      ]
    },

    "garden_fae": {
      chapter: "Act II — The Court",
      title: "A Garden Spirit",
      location: "The Twilight Garden — Deep Growth",
      choicePrompt: "How do you respond?",
      paragraphs: [
        "In the deep growth, between two trees whose branches have grown together into an archway, sits a small fae. Small by fae standards — no taller than a child, though clearly ancient. Silver-green, dressed in something that might be woven lichen.",
        "\"You move like someone who knows they're on borrowed time,\" the fae says, without looking up from what they are doing — which appears to be repairing a bird's wing, though the bird is made of glass.",
        "\"I have been here longer than the court,\" the small fae continues. \"The Thornweave built his hall around my garden, not the other way. I have opinions about his methods that I am not permitted to express directly. I have been known to assist those who share my perspective through indirect means.\"",
        "They look up. Their eyes are the color of old moss. \"You are here for the one he took. The young one. I know where they are kept. The question is what you'll do for me in return — and whether I like your answer.\""
      ],
      choices: [
        { text: "\"Name your price.\"", next: "garden_ally_befriend" },
        { text: "\"I don't make deals with fae I don't know.\"", next: "garden_ally_refuse" }
      ]
    },

    "garden_ally_befriend": {
      chapter: "Act II — The Court",
      title: "A Garden Compact",
      location: "The Twilight Garden — Deep Growth",
      paragraphs: [
        "The small fae sets the glass bird aside and considers you with those moss-colored eyes.",
        "\"I want the three songs the Thornweave stole from the air of this garden when he built his hall. I want them returned to the wind when this is over. I cannot compel him to return them, but you might.\"",
        "\"When you face him at the end,\" they say, \"remember those songs. Say: return what belongs to the garden. If you defeat him, if you bind him, if you bargain with him — add that clause. It will cost you nothing extra. The Thornweave will give them up if he loses everything else, because they are small to him.\"",
        "\"In return, I'll tell you this: your sibling is in the east wing, below the hall floor, in what the court calls the Waiting Rooms. There is a door from the vault passage. And — \" the small fae hesitates, then adds, \" — the Thornweave fears one thing above all. Endings. He has stolen so much time that he is terrified of his own ending. That is his weakness. Use it.\"",
        "They pick up the glass bird again. \"We are agreed. Go. Remember what I asked.\"",
        "You leave with an ally and a secret."
      ],
      choices: [
        { text: "Return to the great hall with new information.", next: "garden_ally_befriend_b", setsFlag: "has_fae_ally" }
      ]
    },

    "garden_ally_befriend_b": {
      chapter: "Act II — The Court",
      title: "The Garden's Parting Gift",
      location: "The Twilight Garden — Deep Growth",
      paragraphs: [
        "The small fae's parting words settle into you as you leave the garden: endings. The Thornweave fears endings above all. You file that away alongside the fae ally you've gained."
      ],
      choices: [
        { text: "Return to the great hall.", next: "return_to_hall", setsFlag: "knows_weakness" }
      ]
    },

    "garden_ally_refuse": {
      chapter: "Act II — The Court",
      title: "No Deal",
      location: "The Twilight Garden — Deep Growth",
      paragraphs: [
        "\"I appreciate the offer,\" you say carefully, \"but I'm not in a position to make binding promises with anyone I just met in a fae court.\"",
        "The small fae nods slowly, as if this is not unexpected. \"Wise. Cautious. Less useful to me.\"",
        "\"I can tell you your sibling is alive and held below the hall,\" the fae says after a moment. \"That I give freely, because I dislike the Thornweave and want you to find them. But the where, and the how — those I keep. Come back if you change your mind.\"",
        "They return to their glass bird. The conversation is over.",
        "You have a direction, at least. Below the hall."
      ],
      choices: [
        { text: "Return to the great hall.", next: "return_to_hall" }
      ]
    },

    "garden_sibling_glimpse": {
      chapter: "Act II — The Court",
      title: "A Glimpse",
      location: "The Twilight Garden",
      paragraphs: [
        "You move through the garden methodically, checking each bower, each bench. The garden responds to your attention — flowers turn toward you, then away, like surveillance.",
        "Then: across the garden, through an archway of thorned branches, you see them.",
        "Your sibling. Standing completely still, looking at something in their hands. For a moment you almost call out.",
        "Then two fae courtiers move between you and the archway. When they pass, the archway is empty. No one stands on the other side.",
        "But you saw them. They are here. They are standing on their own two feet. They have not been unmade.",
        "You hold that knowledge like a coal in your chest — painful and warm and necessary."
      ],
      choices: [
        { text: "Follow the path toward where you saw them.", next: "sibling_search", setsFlag: "sibling_found" },
        { text: "Return to the hall to look for another way to reach them.", next: "return_to_hall" }
      ]
    },

    "garden_circle": {
      chapter: "Act II — The Court",
      title: "The Time Loop Circle",
      location: "The Twilight Garden — The Circling Path",
      paragraphs: [
        "The suspended fountain is beautiful. You walk toward it, and then you are walking toward it, and then you are walking toward it, and the distance is not changing.",
        "You stop. Look at your feet. The path beneath you is circular — you've been walking a loop fifteen feet in diameter without noticing the curve.",
        "This is a time circle. The garden has them deliberately. If you had stepped inside the inner ring you would be here still, circling forever, the fountain always twenty feet away.",
        "You step backward carefully until you feel the path change underfoot. The loop releases you with a faint sound like a sigh.",
        "You are shaking slightly. The garden does not apologize."
      ],
      choices: [
        { text: "Move away carefully and explore elsewhere.", next: "garden_fae" }
      ]
    },

    /* ARCHIVE WING */

    "archive": {
      chapter: "Act II — The Court",
      title: "The Fae Law Archive",
      location: "The Archive of the Twilight Court",
      choicePrompt: "What do you study?",
      paragraphs: [
        "The archive is a long hall built entirely of shelves and the things on shelves — not only books, but contracts written on skin, songs trapped in crystal vials, oaths pressed between sheets of mica, agreements inlaid in precious metal on wooden plaques.",
        "A librarian fae sits at a desk near the entrance, so old and so still that for a moment you think they are decorative. Then they blink.",
        "\"Research,\" you tell them.",
        "\"Obviously,\" they say. \"No one comes to an archive to not research. What do you want to know?\"",
        function(s) {
          if (s.charClass === "witch") return "You recognize the organizational system — it's an old classification framework based on binding categories rather than subject matter. You've used something like it. You can navigate this archive without a guide, and you know which section to look in first.";
          return "The archive is disorienting. The organizational system defies any logic you can bring to bear. The librarian watches you try to read the section markers with gentle, unhelpful patience.";
        }
      ],
      choices: [
        { text: "Ask about the history of the Thornweave.", next: "archive_research" },
        { text: "Look for records of true names.", next: "archive_true_name" },
        { text: "Research fae law regarding mortal captives.", next: "archive_law" },
        { text: "Look for any records of the Thornweave's vulnerabilities.", next: "archive_weakness" },
        { text: "Try the restricted cabinets at the far end.", next: "archive_guard" }
      ]
    },

    "archive_research": {
      chapter: "Act II — The Court",
      title: "The History of the Court",
      location: "The Archive",
      paragraphs: [
        "The librarian retrieves a plaque of cold gold — not welcoming to the touch, but unavoidable. \"The Thornweave's history,\" they say, and leave you to it.",
        "The history is extensive and strange. The Thornweave — that is a title, not a name — has held this court for what the fae measure as seven ages. He has stolen time rather than consuming it. Every year, every decade, every ordinary Tuesday that fell into his court is stored somewhere. He keeps them because he fears running out.",
        function(s) {
          if (s.charClass === "witch") return "You see between the official account and the truth it obscures: the Thornweave is afraid. Every stolen hour is a deferral. He has been deferring something for seven ages. The archive is coded, but to you the code is visible — the Lord of the Twilight Court is mortally afraid of dying, in a way that fae do not usually die.";
          return "The document is dense, but one thing surfaces clearly: the Thornweave does not steal for pleasure. He steals because he is trying to outrun something. The archive doesn't say what.";
        }
      ],
      choices: [
        { text: "Research further.", next: "archive_weakness" },
        { text: "Look into the archive's other sections.", next: "archive_law" }
      ]
    },

    "archive_true_name": {
      chapter: "Act II — The Court",
      title: "The Name beneath the Title",
      location: "The Archive",
      paragraphs: [
        "True names are the most jealously guarded fae secrets. The section is a small locked cabinet set into the archive's north wall — the one corner where even the librarian's expression shifts — and it is open now.",
        "Inside, a single folded mica sheet. \"Titles of the Court's Lord, Historical Record.\"",
        "Most of the titles are public. But at the bottom, in handwriting different from the rest — smaller, as if written in haste or in concealment — is a single line in the old language.",
        function(s) {
          if (s.charClass === "witch") return "You read it. Your breath stops. A true name, written down — almost certainly placed here as a precaution by someone who wanted it to be findable under the right circumstances. Someone who wanted the Lord to be findable. You commit it to memory with the care of someone handling a live coal: Eravel. His name is Eravel.";
          if (s.charClass === "changeling") return "The old language sits in you alongside your fae blood — not quite learned, more like inherited. You read the bottom line and feel the name settle into your memory like a stone settling into water. Eravel. When you say it, even inside your head, something distant in the court shifts. He felt that. You don't say it again.";
          return "You cannot read the old language. The librarian, when you ask, looks at the line, then at you, then away. \"That section is restricted,\" they say, and close the cabinet.";
        }
      ],
      choices: [
        { text: "Commit the name to memory and leave.", next: "return_to_hall", setsFlag: "has_true_name", onlyFor: ["witch", "changeling"] },
        { text: "Leave the archive.", next: "return_to_hall", onlyFor: ["knight", "bard"] },
        { text: "Research the law before leaving.", next: "archive_law" }
      ]
    },

    "archive_weakness": {
      chapter: "Act II — The Court",
      title: "A Documented Vulnerability",
      location: "The Archive",
      paragraphs: [
        "Fae courts keep records of their Lords' vulnerabilities for legal reasons — any challenger has the right to know what constitutes a fair fight. The librarian produces this record with visible reluctance.",
        "\"Endings,\" the record says. \"The Lord of the Twilight Court is susceptible to true endings. As he has stolen time to avoid conclusion, any force that compels conclusion will find him diminished. An ending witnessed, an ending spoken, an ending offered freely — these bind him as iron binds his kind.\"",
        "You read it again more slowly. He is afraid of endings. He hoards time because time running out means an end. He can be defeated not by force but by making him face what he fears.",
        function(s) {
          if (s.charClass === "knight") return "The practical implication assembles itself in your mind: you don't have to overpower him. You have to make him believe the ending is real. That is a different kind of fight.";
          if (s.charClass === "bard") return "An ending. Every story has one. You know how to perform endings — you've ended a hundred songs, a thousand performances. The ending of a performance always carries that note of finality. You know how to make something feel complete.";
          if (s.charClass === "witch") return "An offered ending — that is the key phrase. Not forced upon him but offered. A bargain with an ending as the terms. That you can do. That is, in fact, exactly what you trained to do.";
          return "Your mortal half understands endings completely. It is the one thing your fae blood cannot domesticate. You carry that knowledge like a weapon you were born with.";
        }
      ],
      choices: [
        { text: "Return to the hall.", next: "return_to_hall", setsFlag: "knows_weakness" }
      ]
    },

    "archive_law": {
      chapter: "Act II — The Court",
      title: "Fae Law on Mortal Captives",
      location: "The Archive",
      paragraphs: [
        "The section on mortal captives is extensive. Fae courts have a long history of bringing mortals across the veil, and the law has had to grow around that history the way a tree grows around a fence.",
        "Key provisions: A mortal brought without consent or compact has the right of petition. A mortal held beyond three turning cycles of the mortal world acquires additional rights. A mortal who has made no bargain cannot be permanently bound without explicit and witnessed consent.",
        "Your sibling has been here three days in mortal time. The law here does not map neatly to mortal time, but three days is close to but not yet the three-cycle threshold.",
        "\"Can the Thornweave extend mortal captivity?\" you ask the librarian.",
        "\"He can offer bargains that extend it by consent,\" the librarian says carefully. \"He cannot extend it by force. He cannot extend it if the mortal explicitly refuses in the old words.\"",
        "\"Does my sibling know those words?\" you ask.",
        "The librarian says nothing. That is an answer."
      ],
      choices: [
        { text: "Return to the hall.", next: "return_to_hall", setsFlag: "archive_studied" }
      ]
    },

    "archive_guard": {
      chapter: "Act II — The Court",
      title: "The Archive Guardian",
      location: "The Archive — Restricted Section",
      choicePrompt: "How do you handle this?",
      paragraphs: [
        "You reach for a cabinet you were not directed toward. A hand closes around your wrist — not roughly, but with the specific grip of someone who has stopped many people from doing this.",
        "The archive guardian is enormous — a fae in full formal dress, which here means something that functions as armor while technically remaining clothing. \"Restricted,\" they say.",
        function(s) {
          if (s.charClass === "knight") return "Your iron bracelet presses against the guardian's wrist where they grip you. They release you immediately — involuntarily, reflexively, as if they touched a burning coal. They step back. You do not apologize.";
          if (s.charClass === "bard") return "You shift your weight and smile. \"I was about to ask you,\" you say pleasantly. \"I was told there was a section here that could only be accessed with a guide. You're clearly experienced. Could you help me understand the organizational system?\" The flattery is imprecise but the tone is perfect. The guardian's grip loosens.";
          if (s.charClass === "witch") return "\"I invoke the visitor's research right under the Accord of Thornvale,\" you say, quietly but precisely. \"If this section contains information pertinent to a grievance matter currently under that Accord, access cannot be denied.\" The guardian checks this in their memory against the law. Their grip loosens.";
          return "You look at the guardian steadily. \"You know what I am,\" you say. \"And you know I can see the filing system. I'll find what I need one way or another. It would be faster with your help.\" The guardian considers this. Their grip loosens.";
        }
      ],
      choices: [
        { text: "Access the restricted section.", next: "archive_true_name" }
      ]
    },

    /* VAULT WING */

    "vault": {
      chapter: "Act II — The Court",
      title: "The Vault of Stolen Hours",
      location: "The Thornweave's Vault",
      paragraphs: [
        "A passage off the great hall leads down and down — the stairs are wrong in a way you can feel but not articulate, as if each step takes the same time but covers different distances.",
        "At the bottom: the vault. A long room lit by the stolen hours themselves — time stored in bottles, in boxes, in cases of glass and thorn-wood. Each one glows faintly, like amber with a candle inside.",
        "The stolen time is palpable. You can feel the weight of lost afternoons, wasted mornings, years that were let slip. The vault smells of old light.",
        "At the far end, a second door. Locked. Beyond it, presumably, the passage to the Waiting Rooms where your sibling is held.",
        "The door is elaborate and fae-made and has no visible keyhole — the lock is somewhere in its essence rather than its surface."
      ],
      choices: [
        { text: "Try to open the locked door.", next: "vault_locked" }
      ]
    },

    "vault_locked": {
      chapter: "Act II — The Court",
      title: "The Lock Without a Keyhole",
      location: "The Vault",
      choicePrompt: "How do you open it?",
      paragraphs: [
        "The door resists. Not physically — it simply does not yield. You press and push and the door remains as indifferent as a wall.",
        "There is something listening inside the door. You can feel it."
      ],
      choices: [
        { text: "Play the lock open with music.", onlyFor: ["bard"], next: "vault_key_bard" },
        { text: "Name the lock and command it to open.", onlyFor: ["witch"], next: "vault_key_witch" },
        { text: "Find another way through.", next: "vault_key_other" }
      ]
    },

    "vault_key_bard": {
      chapter: "Act II — The Court",
      title: "Music as a Key",
      location: "The Vault",
      paragraphs: [
        "You press your palm to the door and begin to hum.",
        "The lock is not a mechanism but a spell — a sustained chord of binding intention. You find the root note by feel, by the resonance against your palm. Then the third. Then the fifth. You build the chord from underneath it, matching it, then adding a fourth note the original chord does not contain — a note that completes it, the way the final word completes a sentence.",
        "The door exhales.",
        "It opens inward, into darkness."
      ],
      choices: [
        { text: "Enter the passage.", next: "vault_interior" }
      ]
    },

    "vault_key_witch": {
      chapter: "Act II — The Court",
      title: "Named and Commanded",
      location: "The Vault",
      paragraphs: [
        "You press your palm to the door and feel its character — not its name, exactly, but its function. A lock exists to hold. You name what it holds: \"You hold the passage to the Waiting Rooms. You hold it for the Thornweave's convenience. You hold it against those who have no right.\"",
        "You pause. \"I have the right of petition. I am here for what was taken from me. You are not bound to hold against me.\"",
        "The lock considers this. It is not a thinking thing, but it is a fae-made thing, and fae things have opinions.",
        "The door opens. Even the lock knows the law."
      ],
      choices: [
        { text: "Enter the passage.", next: "vault_interior" }
      ]
    },

    "vault_key_other": {
      chapter: "Act II — The Court",
      title: "Another Way",
      location: "The Vault",
      paragraphs: [
        function(s) {
          if (s.charClass === "knight") return "You don't waste time on the door. You walk the vault's perimeter instead, tapping the walls. Stone. Stone. Stone. A panel near the floor gives a different sound — hollow. You find the edge of it with your thumbnail and pull. A crawl-space passage, low and dark, leads through.";
          return "You walk the vault's perimeter, looking for anything the main passage doesn't offer. Near the floor, half hidden behind a case of bottled Tuesdays, a small door — more a hatch, really — opens when you press it. The passage beyond requires ducking, but it goes through.";
        }
      ],
      choices: [
        { text: "Use the alternate passage.", next: "vault_interior" }
      ]
    },

    "vault_interior": {
      chapter: "Act II — The Court",
      title: "Inside the Vault",
      location: "The Vault — Inner Chamber",
      paragraphs: [
        "The inner chamber is smaller than the outer vault and emptier. The stolen hours here are older — the glow is dimmer, the amber deeper. These are decades, you think. Decades siphoned from the mortal world.",
        "A door on the far wall stands open, leading to a corridor that smells of cold stone and damp. The Waiting Rooms.",
        "You are almost there. The thought of finding your sibling makes you move faster and also makes you careful, because you have learned enough about this court to know that things here do not give themselves easily."
      ],
      choices: [
        { text: "Head for the Waiting Rooms.", next: "find_sibling" },
        { text: "Take the connecting passage more carefully.", next: "vault_passage" },
        { text: "Examine the stolen decades before you leave.", next: "vault_trap" }
      ]
    },

    "vault_trap": {
      chapter: "Act II — The Court",
      title: "The Touching Trap",
      location: "The Vault — Inner Chamber",
      paragraphs: [
        "You reach for one of the amber bottles — decades of stolen time, stored and still.",
        "Your hand closes around it and the room tilts. The bottle holds fifteen years of a life that was not yours, and for three terrible seconds they cascade through you — fifteen years of someone else's afternoons, someone else's mornings, someone else's small decisions. You are briefly and completely not yourself.",
        "You put the bottle down. It takes all of you.",
        "You stand still, breathing, sorting yourself back into order. The court is full of traps, and some of them are just objects.",
        "You leave the vault more carefully than you entered it."
      ],
      choices: [
        { text: "Continue to the Waiting Rooms.", next: "find_sibling" }
      ]
    },

    /* SIBLING SCENES */

    "sibling_search": {
      chapter: "Act II — The Court",
      title: "Searching the Court",
      location: "The Twilight Court",
      paragraphs: [
        "You move through the court looking for signs of your sibling. Fae courtiers watch you with polite interest and volunteer nothing.",
        "The court is larger inside than its exterior suggests. Passages lead to rooms that have no corresponding space in the outer plan. Time slips — you lose a few minutes somewhere in a corridor, then find them again in a room that's ahead of where you expected to be.",
        "A passing courtier mentions, without being asked, that the Thornweave's guests are typically housed in comfort in the east wing. They gesture vaguely downward.",
        "Below the hall. Now you have a direction."
      ],
      choices: [
        { text: "Find a way down to the east wing.", next: "vault" },
        { text: "Check the formal detention cells — they might be held there.", next: "dungeon" },
        { text: "Look in the garden first — you thought you saw someone there.", next: "garden_sibling_glimpse" }
      ]
    },

    "find_sibling": {
      chapter: "Act II — The Court",
      title: "The Waiting Room",
      location: "Below the Great Hall — The Waiting Rooms",
      paragraphs: [
        "The Waiting Rooms are not a dungeon. That is the cruelest part. They are comfortable — soft light, warm air, furniture of the kind that fae find appropriate for mortal guests. Exactly enough to be bearable. Exactly not enough to be adequate.",
        "Your sibling is in the third room. Sitting at a small table with a cup of something warm, looking at the wall.",
        "They look up when you enter. And then they are out of the chair and across the room and your arms are around them and you are saying their name.",
        "\"You came,\" they say, against your shoulder. \"You actually came. I was starting to think — I was starting to forget — \"",
        "\"Three days,\" you say. \"It's only been three days.\"",
        "\"Here it has been longer,\" they say. \"Much longer. I've been careful not to eat anything, but it's been — harder, lately, to remember why that matters.\""
      ],
      choices: [
        { text: "Listen to what they know about the court.", next: "sibling_warn", setsFlag: "sibling_found" }
      ]
    },

    "sibling_warn": {
      chapter: "Act II — The Court",
      title: "What They Know",
      location: "The Waiting Rooms",
      paragraphs: [
        "Your sibling tells you what they have learned in their long days here.",
        "The Thornweave is not arbitrary. He took them because of something they were — something in their blood or their future, some quality that matters to fae in ways they don't explain. He has been visiting them. Talking. Offering.",
        "\"He wants me to make a bargain,\" your sibling says. \"He keeps presenting it differently, but it's always the same thing. He wants me to give him something — he won't say what exactly — and in return I get to stay here forever, comfortable, taken care of. No aging. No loss. No endings.\"",
        "\"He can smell that I'm weakening,\" they add quietly. \"I can feel it happening. The forgetting starts at the edges — I couldn't remember our mother's middle name this morning. Tomorrow it'll be something else.\"",
        "\"How do we get out?\" they ask. \"Do you know how to get out?\""
      ],
      choices: [
        { text: "Promise you'll take them home.", next: "sibling_promise" },
        { text: "Tell them what you know and plan next steps.", next: "dungeon_escaped" }
      ]
    },

    "sibling_promise": {
      chapter: "Act II — The Court",
      title: "A Promise Given",
      location: "The Waiting Rooms",
      paragraphs: [
        "\"I promise,\" you say. \"I will take you home.\"",
        "The words settle into the air with a weight that is not metaphorical. A fae promise, spoken in a fae court, carries the force of law here. You feel something click around you — not painful, not harmful, but present. Like a commitment made visible.",
        "Your sibling exhales. \"Good,\" they say. \"I needed to hear that. I needed to know that was real.\"",
        "The promise will cost you something if you fail to keep it. You know that. But you were not going to fail before you made it, and you are not going to fail now."
      ],
      choices: [
        { text: "Make a plan and move.", next: "dungeon_escaped", setsFlag: "made_bargain" }
      ]
    },

    "dungeon": {
      chapter: "Act II — The Court",
      title: "The Formal Cells",
      location: "Below the Hall — Formal Detention",
      paragraphs: [
        "In a different part of the below-hall labyrinth, you find what the court calls formal detention — cells with no iron, no force, nothing so crude as a lock. Simply rooms that have forgotten how to open, maintained by a guard who sits outside each door like a statement of intent.",
        "The guard is fae, armed, and very bored. Boredom is universal. It is, in some courts, a greater vulnerability than fear."
      ],
      choices: [
        { text: "Challenge the guard.", next: "dungeon_guard" }
      ]
    },

    "dungeon_guard": {
      chapter: "Act II — The Court",
      title: "The Bored Guard",
      location: "Below the Hall — Formal Detention",
      choicePrompt: "How do you handle the guard?",
      paragraphs: [
        "The guard looks at you with the expression of someone who has been sitting in a corridor for what might be a century.",
        function(s) {
          if (s.charClass === "knight") return "You hold up your iron. The guard flinches. \"I can hurt you with this,\" you say pleasantly, \"or you can take a long walk and come back in an hour and say you saw nothing. I recommend the second option.\" The guard weighs the options briefly and chooses the walk.";
          if (s.charClass === "bard") return "\"You look like someone who could use a song,\" you say. \"And I happen to know one that's specifically about what a terrible job this is, and how the people who assign this shift don't appreciate those who do it.\" You begin. The guard's posture changes. By the third verse they are smiling. They take a walk. You have fifteen minutes.";
          if (s.charClass === "witch") return "You speak the guard's nature aloud — not a true name, but the nature of their position, their obligation, the formal terms of their duty — and then note that their duty is to guard against escape, not entry, and that entry by a mortal under the Accord doesn't technically fall under their mandate. The guard consults their own memory of the posting orders and finds, to their clear annoyance, that you are correct.";
          return "You look at the guard with your full fae aspect, which you rarely do deliberately. The guard looks back. Recognition moves across their face — not of you personally, but of what you are. They stand aside. Court etiquette around half-bloods is complex, but it generally defaults to deference. It is not worth the paperwork otherwise.";
        }
      ],
      choices: [
        { text: "Move past the guard.", next: "find_sibling" }
      ]
    },

    "dungeon_escaped": {
      chapter: "Act II — The Court",
      title: "Moving",
      location: "The Waiting Rooms",
      paragraphs: [
        "\"We can't leave through the gate the same way I came in,\" you say. \"Not yet. The Thornweave has to be dealt with first — or he'll stop us, or he'll reach out and take you back the moment we cross the veil.\"",
        "Your sibling nods. They are afraid but functional — you can see them assembling themselves for what comes next, the way they have always done when things get hard.",
        "\"Then we go face him,\" they say.",
        "\"Then we go face him,\" you agree.",
        "You move through the below-hall passages together, back toward the great hall and the empty throne."
      ],
      choices: [
        { text: "Return to the great hall to confront the Thornweave.", next: "hall_confrontation_ready" }
      ]
    },

    "return_to_hall": {
      chapter: "Act II — The Court",
      title: "Back to the Hall",
      location: "The Great Hall",
      paragraphs: [
        "You return to the great hall with more than you arrived with — knowledge, possibly allies, a clearer picture of what you are dealing with.",
        "The hall has changed while you were in the wings. The courtiers are more alert. The throne's emptiness seems more deliberate than accidental — as if the throne is choosing to be empty rather than simply happening to be.",
        "Something knows you've been doing your research."
      ],
      choices: [
        { text: "Search for your sibling before confronting the Thornweave.", next: "sibling_search" },
        { text: "You've found your sibling — go to the throne room.", next: "hall_confrontation_ready", requiresFlag: "sibling_found" },
        { text: "Explore the vault below the hall.", next: "vault" },
        { text: "You're ready. Find the Thornweave.", next: "hall_confrontation_ready" }
      ]
    },

    "hall_confrontation_ready": {
      chapter: "Act II — The Court",
      title: "The Moment Before",
      location: "The Great Hall — Approach to the Throne",
      paragraphs: [
        "The courtiers part as you walk toward the throne. Not because anyone told them to — they simply recognize what is happening. A mortal who has made it this far, through the veil and the gate and the wings of the court, is a mortal approaching a conclusion. Even fae find that compelling.",
        "The throne is still empty. But the dais is different now — the black glass is lit from beneath, as if something under the floor has noticed your attention.",
        "And then the Thornweave is on the throne. Not arriving — already there, as if he has always been there and you simply needed to believe it first."
      ],
      choices: [
        { text: "Face him.", next: "boss_approach" }
      ]
    },

    "hall_whispers": {
      chapter: "Act II — The Court",
      title: "Courtier Conversations",
      location: "The Great Hall",
      choicePrompt: "What do you ask?",
      paragraphs: [
        "You listen to the courtiers. Fae conversation moves in spirals — nothing said directly, everything communicated. After ten minutes of patient, apparently idle listening, you have gathered the following:",
        "The sibling is being kept comfortable. The Thornweave has not yet made the final offer that would bind them permanently. There is still time, but the courtiers speak of 'the deadline' — a phrase that carries weight — without specifying when it falls.",
        "More importantly: the Thornweave has been distracted. Something about a mortal who crossed in has unsettled him. Several courtiers find this interesting. Several find it worrying. One finds it funny and is pretending not to."
      ],
      choices: [
        { text: "Ask about the deadline.", next: "hall_deadline" },
        { text: "Ask which wing the sibling is most likely to be in.", next: "sibling_search" },
        { text: "Move on — you have enough.", next: "return_to_hall" }
      ]
    },

    "hall_deadline": {
      chapter: "Act II — The Court",
      title: "When the Clock Runs Out",
      location: "The Great Hall",
      paragraphs: [
        "A courtier — the one who was finding it funny — slides next to you while the others are occupied and speaks quietly.",
        "\"The deadline is the next Court Convening. In mortal terms, six days from now. If the captive hasn't made a compact by then, the Lord loses the legal basis for keeping them. Court law.\" A pause. \"He won't lose graciously. He'll accelerate the forgetting.\"",
        "\"Why are you telling me this?\" you ask.",
        "\"I find the whole situation tedious,\" the courtier says pleasantly. \"I've been at court for four ages. The Lord's methods have become repetitive. A mortal who fights back is at least novel.\" They drift away before you can ask anything else.",
        "Six days. You have time — not much, but real time."
      ],
      choices: [
        { text: "Go find your sibling before anything else.", next: "sibling_search" },
        { text: "Continue gathering information.", next: "return_to_hall" }
      ]
    },

    "court_wander": {
      chapter: "Act II — The Court",
      title: "Between the Wings",
      location: "The Twilight Court — Passages",
      paragraphs: [
        "The court has passages between its major spaces that are not entirely deliberate — gaps in the architecture where one construction meets another and the intentions of both get muddled.",
        "In one such gap you find something pinned to the wall: a note in mortal handwriting. Your sibling's handwriting.",
        "It says: I am in the east wing below the hall. I am okay for now. I left this note three days ago. Or longer. I can't tell anymore.",
        "Three days. The same three days that have passed in the mortal world. The note is very recent, by this court's standards.",
        "They are okay. They were okay when this was written. You fold the note and put it in your pocket."
      ],
      choices: [
        { text: "Go to the east wing below the hall.", next: "vault", setsFlag: "sibling_found" }
      ]
    },

    "vault_passage": {
      chapter: "Act II — The Court",
      title: "The Passage Downward",
      location: "The Vault — Connecting Passage",
      paragraphs: [
        "Between the inner vault and the Waiting Rooms, there is a passage that exists in a different time than the spaces it connects.",
        "You feel it as you walk through — the seconds stretching, contracting, running sideways. It is not dangerous, not a trap; it is simply the physical seam where different stolen moments were stitched together to make a continuous space.",
        "When you emerge on the other side, you cannot be certain how long the passage took. It felt like a minute. It might have been an afternoon.",
        "The Waiting Rooms are ahead. The passage is behind. Whatever time you spent in it, it's spent."
      ],
      choices: [
        { text: "Enter the Waiting Rooms.", next: "find_sibling" }
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       ACT III — THE CONFRONTATION
    ═══════════════════════════════════════════════════════════════ */

    "boss_approach": {
      chapter: "Act III — The Confrontation",
      title: "The Thornweave",
      location: "The Throne of the Twilight Court",
      choicePrompt: "How do you face him?",
      paragraphs: [
        "The Thornweave is old in the way that things become old when they have refused all endings long enough. He is not imposing through size but through presence — the specific gravity of someone who has occupied a throne for seven ages and removed every mirror from their path.",
        "His clothing is time itself, woven into cloth. You can see moments in it — fragments of stolen hours, evenings and dawns and ordinary afternoons pressed into threads. He wears other people's time like an heirloom.",
        function(s) {
          if (s.charClass === "knight") return "The iron at your wrist is the coldest it has been since you crossed the veil — not warming, resisting. The hall's stolen hours press at the edges of your purpose and the iron pushes back, steady as a held shield. You are aware of every courtier watching. You have walked into enemy territory before. The principle is the same.";
          if (s.charClass === "bard") return "The hall has gone quiet in the specific way halls go quiet before a performance begins. Conversations cease mid-phrase. Even the stolen-hours glow dims slightly, as if the room is drawing breath. You have played for kings and performed for courts that frightened you. None of them have made you want this much to be good.";
          if (s.charClass === "witch") return "The binding language in the floor is active beneath your feet, registering each step, tallying your rights. The archive, the Accord, the name waiting coiled inside your memory — each item in your inventory corresponds to a law. By any legal standard, you are as prepared as you have ever been for anything. Your hands are perfectly steady. That steadiness is earned.";
          return "The court recognizes you as you cross the floor. Not with hostility — with the specific attention of a space that contains something like you in every corner and every stolen hour. Your fae half finds the hall familiar in the way that dreams are familiar. Your mortal half holds the memory of your sibling's face like a lamp against the dark. You keep both lit, and you keep walking.";
        },
        function(s) {
          if (s.charClass === "knight") return "He looks at your iron with the expression of a very old pain being visited again. \"A knight with cold iron. How traditional. How mortal.\" His voice is pleasant. \"I wonder if you understand that the iron only protects you from what I would do casually. Against what I would do deliberately, you have nothing.\" He is not wrong that this is a challenge. He may be wrong about the conclusion.";
          if (s.charClass === "bard") return "He looks at you with something close to delight. \"A bard. I haven't had a proper bard in — \" he pauses, genuinely calculating \" — four centuries, give or take a decade. They're always so interesting. They always think a song will solve everything.\" A pause. \"To be fair, it sometimes does.\" He is watching you the way you watch a performance you're not sure is good yet.";
          if (s.charClass === "witch") return "He looks at you for a long moment in complete silence. Then: \"You've been in the archive.\" It is not a question. \"The old compact clause, I suppose. And the restricted section — yes, I can tell.\" Something in his posture is fractionally less than it was a moment ago. \"You know the law better than most of my courtiers. That is either very useful or very inconvenient. I have not yet decided which.\"";
          return "He looks at you, and you look at him, and for a moment the hall is simply quiet. Then he says, in a voice with different harmonics than his words: \"Ah. A half-blood. I thought I felt the crossing.\" He is looking at you the way one looks at something they had not expected to find here. \"This complicates things considerably. For both of us.\"";
        },
        "\"You want the mortal I've been keeping,\" he says. \"Everyone always wants their mortal back. The question is what you'll offer for them. The second question — the more interesting one — is what you think you can compel me to do, and whether you're right.\""
      ],
      choices: [
        {
          text: function(s) {
            if (s.charClass === "knight") return "Draw your iron blade and charge.";
            if (s.charClass === "bard") return "Challenge him to a contest of songs.";
            if (s.charClass === "witch") return "Speak his true name.";
            return "Invoke your fae heritage to challenge the court.";
          },
          next: function(s) {
            if (s.charClass === "knight") return "boss_knight";
            if (s.charClass === "bard") return "boss_bard";
            if (s.charClass === "witch") return s.flags.has_true_name ? "boss_witch" : "boss_direct";
            return "boss_changeling";
          }
        },
        { text: "Attempt to bargain directly.", next: "boss_bargain_trap" },
        { text: "Call on your fae ally.", requiresFlag: "has_fae_ally", next: "boss_ally_assist" },
        { text: "Confront him without preparation.", next: "boss_direct" }
      ]
    },

    "boss_knight": {
      chapter: "Act III — The Confrontation",
      title: "Iron Vs. Ages",
      location: "The Throne Room",
      paragraphs: [
        "You draw the cold iron blade and walk forward.",
        "The court reacts — a sound like wind through glass, the courtiers stepping back, fae glamour receding from you like water from a hot stone. The iron cuts through all of it: the weight of the hall, the aesthetic of the throne, the performance of the Thornweave's power.",
        "He rises from the throne. He is taller standing. He raises a hand, and time thickens around you — you feel the hours pressing in, trying to stop you, to stall you, to add weight to each step.",
        "The iron resists it. The iron is simply not subject to what he is doing.",
        "You reach the dais before he finishes his first move. The iron at his throat has a quality that nothing in this court has: finality.",
        "He is very still.",
        "\"Iron,\" he says quietly. \"You actually brought iron.\" The tone has changed entirely. Fear lives inside the old pain now.",
        "\"Name your terms,\" you say. You have won the position. Now you need to win the negotiation."
      ],
      choices: [
        { text: "Demand your sibling's immediate release.", next: "boss_final_choice" }
      ]
    },

    "boss_bard": {
      chapter: "Act III — The Confrontation",
      title: "The Contest of Songs",
      location: "The Throne Room",
      paragraphs: [
        "\"A contest,\" you say. \"Your best song against mine. The fae contest rule applies — winner names the prize.\"",
        "The Thornweave pauses. Then, slowly, he smiles. \"You know fae contest law. You came prepared.\"",
        "\"I'm a bard. Preparation is the performance.\"",
        "He accepts. He goes first — and his song is extraordinary. You feel it rewriting the air, filling the room with a constructed history, seven ages of a court that believes in its own permanence. The courtiers are rapt. Even you are rapt.",
        "When it ends, the hall is silent.",
        "You begin. Your song is not about the court. It is about three days — three days in the mortal world while someone waits for a sibling who might not come. It is ordinary and it is true and it is the most mortal thing in this room.",
        "Fae cannot make things like this. They can approximate longing, construct it, perform it. They cannot feel it the way you are feeling it right now, performing it, and that difference is audible to every creature in the hall.",
        "When you finish, the Thornweave's expression is complex. He has heard something he cannot produce. That, the contest law confirms, is a loss."
      ],
      choices: [
        { text: "Collect your prize.", next: "boss_final_choice" }
      ]
    },

    "boss_witch": {
      chapter: "Act III — The Confrontation",
      title: "The True Name Spoken",
      location: "The Throne Room",
      paragraphs: [
        "You speak it quietly. You do not shout — shouting is for threats. A true name is a key; you only have to insert it into the lock.",
        "\"Eravel.\"",
        "The court stops. Not metaphorically — literally stops, as if the air itself has been told to wait. The courtiers freeze. The stolen-hour glow dims in every lamp.",
        "The Thornweave — Eravel — loses several inches of height. Not physically. But in the space he occupies, the amount of reality he claims, the gravitational authority of his presence: all of it reduces, immediately and perceptibly, like a room's oxygen being drawn out through a single open window.",
        "\"Where,\" he says, very quietly, \"did you find that?\"",
        "\"The archive,\" you say. \"Section IV, behind the restricted cabinet. Someone wanted it findable under the right circumstances. I was the right circumstances.\"",
        "You hold the name in front of you like a lantern. \"You will return my sibling. And then you will discuss what else needs to change about this arrangement.\""
      ],
      choices: [
        { text: "Press the advantage.", next: "boss_final_choice" }
      ]
    },

    "boss_changeling": {
      chapter: "Act III — The Confrontation",
      title: "Challenge of Heritage",
      location: "The Throne Room",
      paragraphs: [
        "\"I challenge the authority of this court,\" you say, \"over any mortal in its keeping, under the Right of Blood.\"",
        "The Right of Blood is an old law and a dangerous one — it allows any fae-blooded individual to challenge a court's claim on a mortal they have familial connection to. It was written to prevent courts from stealing half-blood relatives. It applies to you, and the law knows it, and the Thornweave knows it, and the whole court knows it the moment you say the words.",
        "\"You are half-blood,\" the Thornweave says.",
        "\"Yes.\"",
        "\"And the mortal I hold is your family.\"",
        "\"Yes.\"",
        "He is quiet for a long moment. The court is quiet. The law, in this space, is not abstract — it is the floor you are standing on. He cannot refuse the challenge without the floor giving way beneath him.",
        "\"Then we must settle this,\" he says, and his voice is very controlled, \"according to the old way.\""
      ],
      choices: [
        { text: "Face the old way.", next: "boss_final_choice" }
      ]
    },

    "boss_direct": {
      chapter: "Act III — The Confrontation",
      title: "Unprepared",
      location: "The Throne Room",
      paragraphs: [
        "You go to the throne with nothing but yourself.",
        "The Thornweave looks at you for a long moment. Then: \"No iron. No true name. No contest law cited. No ally hidden in the wings.\" He tilts his head. \"Just you.\"",
        "\"Just me,\" you agree.",
        "\"Then,\" he says, and rises from the throne, and the court closes around you like a hand, \"we will do this the simple way.\"",
        "The simple way is not good for you. The court's weight comes down on you — stolen hours pressing at the edges of your memory, your purpose, your name. You feel them slipping. You hold on. It is not enough and you know it is not enough, but you hold on anyway.",
        "\"This is brave,\" the Thornweave says, almost gently. \"Brave and foolish. In my experience the two are rarely distinguishable.\""
      ],
      choices: [
        { text: "Fight through it — make the final choice anyway.", next: "boss_final_choice" },
        { text: "Try to bargain from this position.", next: "boss_bargain_trap" }
      ]
    },

    "boss_bargain_trap": {
      chapter: "Act III — The Confrontation",
      title: "The Offered Bargain",
      location: "The Throne Room",
      paragraphs: [
        "The Thornweave spreads his hands in the gesture of a reasonable man making a reasonable offer. \"Let's be direct. You want the mortal. I want something of equivalent value. These transactions don't have to be complicated.\"",
        "\"What equivalent value?\" you ask carefully.",
        "\"Time,\" he says. \"Ten years of your life, given freely. Not taken — given. You walk out of here with your sibling. You live your life somewhat shorter. This is a clean exchange. Many have accepted it. Most were glad they did.\"",
        "The offer is designed to sound good. It is designed specifically to sound like a gift.",
        function(s) {
          if (s.charClass === "witch") return "You recognize the trap clause immediately: 'given freely.' If you agree under duress — which you are — that clause shifts what 'freely' means for all future transactions. It sets a precedent that changes your legal standing in every fae interaction for the rest of your life. The Thornweave is very good at his work.";
          if (s.charClass === "changeling") return "The offer feels greased. You can feel the glamour on it — thin, professional. You put your fae sight on it and see the shape of what he's actually proposing: the ten years are a pretense. What he wants is the giving, the consent, the act of handing something over. He collects those moments.";
          return "Something about the offer feels wrong in a way you can't articulate. The ease of it. The reasonableness. Everything here is a transaction and some transactions are disguised.";
        }
      ],
      choices: [
        { text: "Reject the bargain and press on.", next: "boss_final_choice" },
        { text: "Accept the bargain — ten years is survivable.", next: "end_bargain" }
      ]
    },

    "boss_ally_assist": {
      chapter: "Act III — The Confrontation",
      title: "The Garden's Intervention",
      location: "The Throne Room",
      paragraphs: [
        "You don't call out. You simply remember the agreement in the garden, and the small fae appears at the edge of the hall as if they had been waiting there all along — which, you suspect, they had.",
        "\"Eravel,\" the small fae says, from across the room. Not loudly. Not dramatically. Just: the name.",
        "The effect is the same as it would have been from your mouth — the Thornweave diminishes, loses presence, loses the room. But the small fae is not finished.",
        "\"Seven ages you've kept this court,\" the small fae continues, in the same quiet tone, \"and seven ages you have taken what isn't yours. The garden remembers every song you stole from its air. The law remembers every mortal taken without compact. And I remember — \" a pause \" — all of it. I have been here longer than you.\"",
        "The Thornweave is looking at the small fae with an expression you could not name in any language.",
        "\"The mortal's visitor has rights,\" the small fae says. \"And I am here to witness them exercised.\""
      ],
      choices: [
        { text: "Press the advantage while you have it.", next: "boss_final_choice" }
      ]
    },

    "boss_final_choice": {
      chapter: "Act III — The Confrontation",
      title: "The Pivotal Moment",
      location: "The Throne Room",
      choicePrompt: "What do you do with the advantage?",
      paragraphs: [
        function(s) {
          if (s.flags.knows_weakness || s.flags.has_true_name || s.flags.has_fae_ally) {
            return "You have the Thornweave in a position he has not occupied in seven ages: disadvantaged.";
          }
          return "You are still standing. That is not nothing. The Thornweave watches you with the particular attention of someone reassessing an obstacle that has not yet fallen.";
        },
        function(s) {
          if (s.flags.knows_weakness || s.flags.has_true_name || s.flags.has_fae_ally) {
            return "He knows it. You know it. The whole court knows it — you can feel the weight of their attention as if they are collectively holding their breath.";
          }
          return null;
        },
        "Your sibling stands behind you, found and present and afraid and trying not to show it. The Thornweave looks at you across the length of the throne room with the expression of someone calculating odds.",
        "You have the next move."
      ],
      choices: [
        {
          text: "Destroy him — end the Thornweave's hold on this court entirely.",
          requiresFlag: "knows_weakness",
          next: "end_heroic"
        },
        {
          text: "Banish him — drive him from his court and seal the bargain with his true name.",
          requiresFlag: "has_true_name",
          next: "end_heroic"
        },
        {
          text: "Bargain — your sibling's freedom in exchange for something you can afford to give.",
          next: "end_bargain"
        },
        {
          text: "Take your sibling and run — the gate is open, the moment is now.",
          requiresFlag: "sibling_found",
          next: "end_partial"
        },
        {
          text: "Claim the court. You were born for this.",
          onlyFor: ["changeling"],
          requiresFlag: "has_true_name",
          next: "end_court_claim"
        },
        {
          text: "Hesitate too long.",
          next: "end_lost"
        }
      ]
    },

    /* ═══════════════════════════════════════════════════════════════
       ENDINGS
    ═══════════════════════════════════════════════════════════════ */

    "end_court_claim": {
      chapter: "Ending — Hidden",
      title: "Twilight Sovereign",
      location: "The Throne Room — The Court Holds Its Breath",
      isEnding: true,
      paragraphs: [
        "You speak his name. Not to banish. Not to bind. You speak it as a claim.",
        "Eravel. Old tongue: he who holds the dusk. The court goes perfectly still.",
        "The Thornweave rises from his throne — not in anger, you realize, but in recognition. He looks at you the way a dying man looks at his heir. Something in him has always known it would come to this. Something in him has always wanted it to.",
        "'You cannot,' he says. And then: 'You can.'",
        function (s) {
          if (s.flags.has_fae_ally) {
            return "Your ally steps into sight at the edge of the court — among their own kind at last, steady in the way that only the genuinely comfortable can be. They do not speak. They do not need to. Their presence is a vote.";
          }
          return "The court stirs around you. Not in opposition. They have lived under the Thornweave's rule since before your grandparents' grandparents drew breath. Changeless, lightless, waiting. A new sovereign is not a threat. It is something they have not dared to want until this moment.";
        },
        "The Thornweave dissolves. Not destroyed — dispersed, returning to the dusk that made him, as all sovereign fae do when their time ends. His power settles over you like a cloak that was always meant for your shoulders.",
        function (s) {
          return s.name + " sits in the throne of the Twilight Court. The twilight blood that was always yours to claim has claimed you back.";
        },
        "Your sibling crosses the floor and stands at your side. They do not ask if you are alright. They can see that you are different. They reach out and take your hand, and your hand is cooler than it was.",
        "'You can still come home,' they say.",
        "'I know,' you tell them. 'That's not the same thing as being able to stay.'",
        "You let them through the gate. You watch it close.",
        "The court waits. You were born for this. You were born for exactly this.",
        "Whether that is a gift or a sentence is a question the Twilight Court has never found it useful to answer."
      ]
    },

    "end_heroic": {
      chapter: "Ending — Full Victory",
      title: "The Court Unmade",
      location: "The Twilight Court — Dissolving",
      isEnding: true,
      paragraphs: [
        function(s) {
          if (s.flags.has_true_name && !s.flags.knows_weakness) {
            return "You speak his name into the hall — not loudly. A true name is a key; you only have to place it in the lock. Eravel.";
          }
          return "You tell him what he is afraid of.";
        },
        function(s) {
          if (s.flags.has_true_name && !s.flags.knows_weakness) {
            return "The court stops. The Thornweave — Eravel — sits back in his throne, and in sitting back, he begins to diminish. Not painfully. Not dramatically. Simply: correctly. The name binds him to his ending, and the ending takes him at last.";
          }
          return "Not as a threat — as a fact. As a gift, even, offered cleanly: \"Every court ends. Every age concludes. You have stolen all this time and you are still here, still afraid, and the ending is still waiting. It has infinite patience. You are the one who has been running.\"";
        },
        function(s) {
          if (s.flags.has_true_name && !s.flags.knows_weakness) return null;
          return "The Thornweave is very still.";
        },
        function(s) {
          if (s.flags.has_true_name && !s.flags.knows_weakness) return null;
          return "\"What if you stopped?\" you say. \"What if you simply let the ending come?\"";
        },
        "The court changes. The air changes. The stolen hours in their bottles and cases begin to glow brighter — not with age, but with release. The decades and afternoons and ordinary Tuesdays begin to move, flowing back toward the veil, returning to the world they were taken from.",
        "The Thornweave — Eravel — sits back in his throne. And something in his face changes — not fear, not defeat, but something that looks almost like relief. The relief of someone who has been standing very straight for a very long time and been given permission to stop.",
        function(s) {
          if (s.charClass === "knight") return "You stand in the dissolving court until the last of the stolen hours have passed through the veil, because a knight completes what they begin. Your sibling is beside you. The iron is cool at your wrist, its work done. When the gate finally opens — wide, honest, ordinary — you walk through without looking back.";
          if (s.charClass === "bard") return "You remember the garden's request and say it before the court fully dissolves: return what belongs to the garden. Eravel, diminishing, lets the three stolen songs go. You hear them pass you as you walk toward the gate — three notes, distinct, finally free. You file them away. Someday you'll write a song about this. It'll be a good one.";
          if (s.charClass === "witch") return "The compact is honored. The law has been followed from beginning to end, and that matters — the fae world runs on binding and compacts, and what you've done here has been entirely correct. You take your sibling's hand and walk through the gate under the Accord, fulfilled, released.";
          return "You feel the fae half of you settle differently as the court dissolves — as if something that was pulled in two directions has found its alignment. You are not less fae. You are not less mortal. You are the ending that walked in and made an ending possible. Your sibling leans against you as you find the gate together. The veil opens for you both.";
        },
        "On the other side, the standing stones are cold and ordinary in the late summer dark. Three days in the mortal world. Three days that felt like centuries beyond the veil.",
        "Your sibling breathes the real air and says nothing for a long time.",
        "You let the silence be what it is.",
        function(s) {
          if (s.charClass === "knight") return "Before you leave the hill, you stand still for a count of ten and account for it: what came in, what comes out, what the difference cost. The numbers are not comfortable, but they are real. A knight does not look away from real numbers. You sheathe the iron blade and walk your sibling home.";
          if (s.charClass === "bard") return "On the walk down through the dark, you find the first line. Not the second — the second will come in its own time. Just the opening: the key of it, the note of it, the particular quality of a story about a place where time was a currency and what it cost to take it back. It will be a good song. You know it already, the way you know anything that is already true before it is written.";
          if (s.charClass === "witch") return "Before the stones are out of sight behind you, you speak the name once more — quietly, to the air — and release it. A true name carried back across the veil is a weapon that will eventually turn in your hand. You were trained never to keep one. The knowing goes cleanly, the way a flame goes when you cover it with your palm: present, then not. The compact is complete. The law is fully satisfied. You walk home.";
          return "The veil closes at your back with a sound like a held breath finally released. You stand on the ordinary grass of Midsummer's Hill with your sibling's hand in yours and take stock of the question that has not resolved: which side you belong to. It probably won't resolve. You have stopped expecting it to. Half here, half there, standing in the seam — it is what you are, and tonight it is also what brought someone home. That is enough to walk on.";
        }
      ]
    },

    "end_bargain": {
      chapter: "Ending — A Price Paid",
      title: "What You Left Behind",
      location: "The Gate of the Twilight Court",
      isEnding: true,
      paragraphs: [
        "You agree to the Thornweave's terms — not his first offer, but the version you negotiated, because you know enough now to negotiate. Something for your sibling's freedom. Something that costs.",
        "He takes it with the formality of someone who has done this many times and feels no pleasure in it — just the satisfaction of an exchange correctly made.",
        function(s) {
          if (s.charClass === "knight") return "He takes a year of your life. You feel it leave — not painfully, not dramatically, just a subtraction. A year you will not have at the end. The kind of year that might have been ordinary, or might have been important. You will never know which. You take your sibling's hand and walk toward the gate.";
          if (s.charClass === "bard") return "He takes your name from this place — you will never be known in the fae realm, never spoken of in fae courts, never remembered here. It is a strange thing to give and a stranger thing to feel given. Part of you protests that you did something worth remembering here. The rest of you says: at least you did it.";
          if (s.charClass === "witch") return "He takes one of your pacts — the oldest one, the one you inherited rather than made. You feel it disconnect. The law will be slightly thinner for you now, in places where that pact used to give you standing. A calculated loss. You made calculations. You walk out.";
          return "He takes your shadow. You don't notice until you are outside the gate, in the ordinary dark of the mortal world, and there is no shadow where there should be one. Your sibling looks at where it should be and says nothing. You say: it's okay. You're not sure if that's true.";
        },
        "Your sibling is free. They cross the veil with you and collapse onto the ordinary grass of Midsummer's Hill and simply lie there, breathing.",
        "\"You came for me,\" they say.",
        "\"Of course I did,\" you say.",
        "The standing stones are silent. Whatever was taken from you is gone cleanly, as fae transactions go. You are lighter by it. Whether that is a loss or a relief, you have not yet decided.",
        function(s) {
          if (s.charClass === "knight") return "Halfway down the hill, you say it aloud — not to your sibling, to the air. The year. The terms. What you gave and what you got for it. Knight's accounting: cost acknowledged, transaction honored, move forward. You do not think about which year it would have been. That kind of thinking does not close.";
          if (s.charClass === "bard") return "There are fae courts where your name will never be carried in song, your performance tonight never spoken of by those who heard it. You feel the edges of that absence like a room where a door has been removed — not painful, but permanently present. You have given your sibling's freedom the one currency a bard prizes above gold: being remembered somewhere that matters. You walk down the hill and decide it was worth it. It mostly was.";
          if (s.charClass === "witch") return "Before the road levels out you have completed the audit: one pact, its provenance, the standing it provided, the contexts where its absence will register. The inventory takes eighty seconds. You gave worse for less on two prior occasions. The terms were fair, the law was satisfied on both sides, and you know exactly what rebuilding the diminished standing will require. You walk home and begin planning.";
          return "Your sibling notices the missing shadow at the first streetlamp on the road back. You tell them what it was. They are quiet for a moment. Then: 'Will it come back?' You say: 'I don't know.' The honest answer. What you don't say is that the shadow was the most fae part of you — the part that knew how to be absent from both worlds at once — and that losing it feels something like becoming slightly more mortal. You are not entirely sure whether that is a loss.";
        }
      ]
    },

    "end_partial": {
      chapter: "Ending — Partial Victory",
      title: "Changed",
      location: "Beyond the Veil — The Crossing Back",
      isEnding: true,
      paragraphs: [
        "You run. You take your sibling's hand and you run for the gate while the Thornweave is disadvantaged and the court is still reorienting itself around what happened to him.",
        "He does not pursue you directly — he cannot, not now. But the court tries. The gate is sticky, the veil thicker than it was, the standing stones harder to pass through in this direction than the other.",
        "You make it through. Both of you.",
        "On the other side, your sibling drops to the grass. You drop beside them. For a while you just breathe.",
        "Then your sibling holds up their hand and you see: the light catches it wrong. There is a fae quality to the way it refracts — not dramatic, not monstrous, but there. The time they spent in the court has left a mark. It doesn't wash off. It won't.",
        function(s) {
          if (s.charClass === "knight") return "You look at your sibling's hand and then at your iron bracelet and then back. The iron is calm — whatever fae quality your sibling now carries is not hostile, not a glamour, not a threat. Just: changed. You put the bracelet in your pocket. The fight is over.";
          if (s.charClass === "bard") return "You say, after a long silence: \"I can write about this.\" Your sibling looks at you. \"I mean — what you are now. What the court did. I can write it so people understand. It doesn't have to be a curse just because it doesn't have a name yet.\" Your sibling considers this. They almost smile.";
          if (s.charClass === "witch") return "You know what it means, legally, for your sibling's standing in both worlds. It is complicated. It can be managed. The old compacts have provisions for those who have been touched by fae time. You will learn them. You will advocate. You have done it before.";
          return "You look at your sibling's hand and recognize it. That quality, that refraction. You know it from mirrors. You know it from your own reflection. You have never thought of yours as a curse. You take their hand and hold it. \"You're still you,\" you say. It is true. \"It's just also other things now.\" That is also true.";
        },
        "The Thornweave is still in his court. The curse on the region around the standing stones has not lifted — it has merely weakened. He will recover. He may come looking again.",
        "But not tonight. Tonight you have your sibling back, and that was the point.",
        "It was always the point.",
        function(s) {
          if (s.charClass === "knight") return "You don't call it a victory. You don't call it a failure either. You assess: objective retrieved, threat contained but not eliminated, your condition functional, your sibling's condition altered but present. The kind of outcome you file under acceptable and move forward from. You will be watching the hill at midsummer. You note that, and you walk.";
          if (s.charClass === "bard") return "The story doesn't have a proper ending yet. You know this the way you know an unfinished song — by the particular unresolved quality of its last note, the sense of something waiting for a resolution that hasn't come. Maybe that's the point. Some stories are about the getting-there. You got there. Whatever comes next is another chapter, and you will be there to tell it.";
          if (s.charClass === "witch") return "The binding you made in that court was partial, and you know precisely what partial bindings do over time. You will feel it starting to fray in three months, possibly four. You will address it then — you have the knowledge, you have the law, and you have the precedent of what was formally agreed. Incomplete, yes. Unmanageable, no. You walk home and begin planning the follow-through.";
          return "Your sibling sleeps that night with their changed hand turned toward the window, the fae quality of their skin catching the moonlight in a way that neither of you will ever fully explain to anyone. You sit in the chair by the door and watch them breathe and think about what it is to be of two worlds at once, neither belonging cleanly to either, both present in you regardless. Your sibling is learning that now. You have been learning it your whole life. You know how to teach it.";
        }
      ]
    },

    "end_lost": {
      chapter: "Ending — Lost",
      title: "A New Courtier",
      location: "The Twilight Court",
      isEnding: true,
      paragraphs: [
        "You hesitate.",
        "The Thornweave watches you hesitate and does nothing to interrupt it. He understands hesitation. He has watched mortals hesitate for seven ages. He knows what comes next.",
        "The moment passes. Another arrives. The court fills in around the moment the way water fills around a stone.",
        "You had something you were trying to remember. Something urgent. Someone you came here for.",
        "\"You seem tired,\" one of the courtiers says, beside you now. \"The court is tiring, at first. Would you like to sit?\"",
        "You sit.",
        "The stolen hours in their cases glow softly. The Thornweave is back on his throne, doing something with a scroll that seems to require his full attention. The courtiers flow around you gently, accommodating your presence, orienting around you as a new fixed point.",
        function(s) {
          if (s.charClass === "knight") return "Your iron is still at your wrist. You look at it sometimes. You know it means something. The knowing gets smaller each time the thought passes — the way a path through grass gets harder to see the longer no one walks it.";
          if (s.charClass === "bard") return "You still hum sometimes. The melodies come and go. You can no longer remember which ones you wrote and which ones the court has always had. That distinction seems like it probably mattered once.";
          if (s.charClass === "witch") return "The compacts are still technically in force. You sense them at the edges of your awareness — bindings to a world you can no longer remember the shape of. The law is always there. It is just that the other party to the contract is very, very far away now.";
          return "The fae half of you has never been more at ease. It settles into the court like a key into a lock. The mortal half grows quiet. Not gone — never entirely gone. But farther down. Speaking in a voice that sounds like it's coming through a wall.";
        },
        "Somewhere in the Waiting Rooms, your sibling is still sitting at the table with the warm drink.",
        "They are waiting for someone. They cannot remember who.",
        "Neither, quite, can you.",
        function(s) {
          if (s.charClass === "knight") return "The iron is still at your wrist. Cold, as it has always been. You look at it sometimes when the light catches it, and you know — in a way that does not quite reach the part of you that used to act on knowing — that it means something. Protection. Resistance. A name that goes with a face you used to be able to picture. You are still trying to picture it. The iron waits with you.";
          if (s.charClass === "bard") return "You have been composing a song. You are not sure when you started. It is about someone who went somewhere to find someone they loved, and the melody is very beautiful, and every time it reaches the part where they find them, the song turns and returns to the beginning. You think you haven't written the ending yet. You will. You forget, and you begin again.";
          if (s.charClass === "witch") return "You know precisely what happened. The steps, the choices, the specific moment when the court's weight exceeded what you had prepared for. The memory is complete and in perfect order. What you no longer have is the ground the knowledge is supposed to stand on — the reason why knowing should produce movement. The law is still there. The party to the compact is very far away now. You know. You cannot make the knowing matter.";
          return "The fae half of you is, for the first time in your life, entirely at peace. Not suppressed, not divided — simply home. The court settles around you like a hand that always knew the shape of what it was made to hold. The mortal half grows quiet. Not gone — it does not go. But quieter, farther down, speaking in a voice that sounds like it is coming through a wall you cannot find the door in. You are home. That is, at last, enough.";
        }
      ]
    }

    } /* end scenes */
  } /* end story */
}); /* end push */
