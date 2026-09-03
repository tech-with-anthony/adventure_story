# The Curse of Valdrath's Keep

A DnD-themed "Choose Your Own Adventure" game playable in any browser — no install required.

**[Play it now →](https://tech-with-anthony.github.io/adventure_story/)**

---

## About

Dark clouds hang over the city of Thornwall. An ancient evil stirs within Valdrath's Keep, and the dead walk once more. A desperate lord needs a hero — and that hero is you.

Make choices that matter. Your character class shapes what options are available to you, and the flags you earn along the way determine how the story ends. Four distinct endings await.

## Playable Classes

| Class | Playstyle |
|---|---|
| **Fighter** | Brute-force your way through — combat choices favor direct, powerful resolutions |
| **Wizard** | Study the wards, research the enemy, outthink the lich with arcane knowledge |
| **Rogue** | Move unseen, exploit flanking angles, and uncover secrets others miss |
| **Cleric** | Turn the undead, reconsecrate holy ground, and call on divine power at the final hour |

## Features

- Fully branching narrative across 3 acts and 71 scenes
- Class-gated choices — each class sees options others don't
- Flag-based state — decisions made early ripple through to the ending
- Four distinct endings (heroic, costly, partial, defeat)
- Dark-fantasy visual design with animated text
- Works offline (PWA) — install to your home screen
- No login, no server, no build step

## Running Locally

Just open `adventure.html` in any modern browser:

```bash
# macOS
open adventure.html

# Linux
xdg-open adventure.html

# Windows
start adventure.html
```

## Project Structure

```
adventure_story/
├── adventure.html        # HTML shell + all CSS
├── engine.js             # Game engine (state machine, class gates, flag system)
├── story-data.js         # All 71 scene definitions
├── manifest.json         # PWA manifest
└── sw.js                 # Service worker for offline support
```
