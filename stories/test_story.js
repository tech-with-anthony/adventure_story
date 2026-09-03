window.STORIES = window.STORIES || [];
window.STORIES.push({
  id: "test",
  title: "The Goblin's Riddle",
  blurb: "A test story. A goblin blocks the bridge and demands you answer three riddles. Can you outsmart the little menace?",
  classes: [
    { id: "fighter", name: "Fighter", tag: "Strength & Steel", desc: "Answer with force when words fail." },
    { id: "wizard",  name: "Wizard",  tag: "Arcane Mastery",  desc: "Ancient knowledge is your sharpest weapon." }
  ],
  story: {
    start: "bridge",
    scenes: {

      "bridge": {
        chapter: "The Bridge",
        title: "A Familiar Problem",
        location: "The Old Mill Road",
        paragraphs: [
          "A squat green goblin sits on the bridge railing, legs dangling. It grins when it sees you.",
          "\"Halt!\" it announces, holding up one grubby finger. \"Nobody crosses without answering my riddle. It's the law. I made it up this morning.\"",
          "You look left and right. The river is too wide to ford. The goblin tilts its head expectantly."
        ],
        choices: [
          { text: "Fine. Ask your riddle.", next: "riddle" },
          { text: "Attempt to walk straight past it.", next: "bluff" }
        ]
      },

      "riddle": {
        chapter: "The Bridge",
        title: "The Riddle",
        location: "The Old Mill Road",
        paragraphs: [
          "The goblin clears its throat with great ceremony.",
          "\"I have cities but no houses, forests but no trees, water but no fish. What am I?\"",
          "It watches you with enormous expectant eyes."
        ],
        choices: [
          { text: "\"A map.\"", next: "correct" },
          { text: "\"A dream.\"", next: "wrong" },
          { text: function(s) { return s.charClass === "wizard" ? "Consult your memory of goblin riddle-lore." : "Take a wild guess."; }, next: function(s) { return s.charClass === "wizard" ? "correct" : "wrong"; } }
        ]
      },

      "bluff": {
        chapter: "The Bridge",
        title: "Bold Move",
        location: "The Old Mill Road",
        paragraphs: [
          "You stride forward with complete confidence, as if the goblin is simply not there.",
          "The goblin watches you approach. It watches you step onto the bridge. It watches you get halfway across.",
          "Then it sticks out a foot and trips you. You recover before falling, but your dignity does not.",
          "\"Still have to answer the riddle,\" it says cheerfully."
        ],
        choices: [
          { text: "Alright, ask the riddle.", next: "riddle" }
        ]
      },

      "correct": {
        chapter: "The Bridge",
        title: "Correct!",
        location: "The Old Mill Road",
        paragraphs: [
          "\"A MAP!\" the goblin shouts, then immediately looks annoyed that you got it right.",
          "It slides off the railing and steps aside with exaggerated reluctance.",
          "\"Fine. You may pass. But tell no one how easy that was.\""
        ],
        choices: [
          { text: "Cross the bridge.", next: "end_pass" }
        ]
      },

      "wrong": {
        chapter: "The Bridge",
        title: "Wrong!",
        location: "The Old Mill Road",
        paragraphs: [
          "The goblin makes a loud buzzing noise.",
          "\"WRONG. The answer is a map. A MAP. Do you not know maps?\"",
          "It produces a small sign from nowhere that reads WRONG and holds it up.",
          "\"You may try again tomorrow. Or you can swim. I don't care.\""
        ],
        choices: [
          { text: "Try the riddle again.", next: "riddle" },
          { text: "Attempt to swim across.", next: "end_swim" }
        ]
      },

      "end_pass": {
        chapter: "The Bridge",
        title: "Across",
        location: "The Old Mill Road",
        isEnding: true,
        paragraphs: [
          "You cross the bridge without further incident.",
          "Behind you, the goblin is already resetting its sign for the next traveler.",
          "Somewhere in the distance, a cart horse whinnies. A perfectly ordinary afternoon.",
          "You got across. That's enough."
        ]
      },

      "end_swim": {
        chapter: "The Bridge",
        title: "Very Wet",
        location: "The River",
        isEnding: true,
        paragraphs: [
          "The water is cold. Very cold.",
          "You make it across, technically. Your boots will never fully recover.",
          "On the far bank you look back. The goblin waves.",
          "It was a map."
        ]
      }

    }
  }
});
