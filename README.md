# The Curse of Valdrath's Keep

A choose-your-own-adventure game in the browser. You play an adventurer hired to
break the curse on a haunted keep — and the class you pick genuinely changes the
story, not just the flavour text.

No build step, no server, no dependencies. Open the file and play.

```
open adventure.html        # macOS
xdg-open adventure.html    # Linux
start adventure.html       # Windows
```

Prefer a single file? `adventure_standalone.html` has everything inlined —
drop it on a USB stick or email it and it still works.

---

## The game

Lord Harwick's ancestral keep has been overrun by the dead, and something
ancient is commanding them. Fifty gold crowns to whoever walks in and ends it.

**70 scenes across three acts, and four different endings.** Where you end up
depends on what you learned, what you carried in, and what you were willing to
do to get it.

### Pick a class, get a different story

Your class is not a stat block — it opens and closes real branches.

| Class | What only you can do |
|---|---|
| **Fighter** | Win fights cleanly instead of barely. Force the gate while wounded. Pass the seal's trial by proving intent, not strength. |
| **Wizard** | Read Malachar's own research in High Arcane. Study the gate wards. Parley with the wight and get a straight answer. |
| **Rogue** | Find the hidden mechanism, disarm the crypt's tripwire *and* its alarm glyph, flank the wight and take the phylactery outright. |
| **Cleric** | Turn the undead. Reconsecrate the defiled altar — which strengthens your final rite. Speak with the dead and learn what they saw. |

Choices you can't take are hidden, not greyed out, so each class's playthrough
reads as though the story were written for it.

### Things you carry forward

The game tracks what you've done and refers back to it. Help the survivor in
Thornwall and you get a key that opens a door three scenes later. Sneak in and
the grand hall greets you differently than if you came in loud. Restore the
chapel and a Cleric's final confrontation plays out differently.

### The four endings

- **The Curse Broken** — Malachar destroyed. Clean victory.
- **Victory's Price** — He's driven back, but it cost you.
- **The Lich Retreats** — Weakened, not ended. He'll be back.
- **Darkness Eternal** — You came further than most. It wasn't enough.

Reaching the best ending takes preparation. Walking in and swinging is a way to
find that out.

---

## For developers

Three files, plain ES5, no tooling:

| File | Contents |
|---|---|
| `adventure.html` | HTML shell + all CSS |
| `engine.js` | State machine, scene rendering, class gates, flag system |
| `story-data.js` | All 70 scenes as pure data (`window.STORY`) |

`story-data.js` never touches the DOM. Scenes are plain objects, and any
paragraph may be a `function(state)` returning a string — that's how the story
reacts to what you've done:

```js
"scene-id": {
  chapter: "Act II — The Keep",
  title:   "The Grand Hall",
  paragraphs: [
    "A static paragraph.",
    function (s) { return s.flags.entered_quietly ? "Unseen." : "They heard you."; }
  ],
  choices: [
    { text: "Take the stairs down.", next: "crypt_entrance" },
    { text: "Turn undead.", onlyFor: ["cleric"], next: "hall_combat_cleric" },
    { text: "Use the postern key.", requiresFlag: "has_postern_key", next: "keep_side_entry" },
    { text: "Charge.", next: { fighter: "clean_win", default: "hard_win" }, setsFlag: "alerted_keep" }
  ]
}
```

A choice's `next` can be a scene id, a `{class: id, default: id}` map, or a
`function(state)` returning an id. That's the whole branching vocabulary —
adding content means adding data, not code.

See `CLAUDE.md` for architecture notes, naming conventions, and the manual test
paths.

## Also included

- **PWA** — `manifest.json` + `sw.js` cache the game for offline play, and it
  installs to a phone home screen.
- **Android** — Capacitor project in `android/`. `npm run build` stages the game
  into `www/`, `npm run sync` pushes it to the Android assets.

## Compatibility

Works in any modern browser. Google Fonts (Cinzel, EB Garamond) are the only
external resource, and the game falls back to system serifs without them.
Layout is tested down to 420 px. Animations respect
`prefers-reduced-motion`.
