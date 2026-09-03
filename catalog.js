/* catalog.js — story registry
 *
 * To add a new story:
 *   1. Create stories/your-story-id.js (see stories/valdrath.js for the shape)
 *   2. Add one entry to the array below
 *   No other files need to change.
 */
window.STORY_CATALOG = [
  {
    id: "valdrath",
    file: "stories/valdrath.js",
    category: "Dark Fantasy",
    difficulty: 3
  },
  {
    id: "fae_court",
    file: "stories/fae_court.js",
    category: "Fae Fantasy",
    difficulty: 2
  }
];
