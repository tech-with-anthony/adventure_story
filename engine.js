(function () {
  "use strict";

  var state = { name: "", charClass: "", flags: {}, history: [], story: null, slot: 1 };

  var setupContentEl  = document.getElementById("setup-content");
  var sceneChapterEl  = document.getElementById("scene-chapter");
  var sceneTitleEl    = document.getElementById("scene-title");
  var sceneLocationEl = document.getElementById("scene-location");
  var classBadgeEl    = document.getElementById("class-badge");
  var sceneTextEl     = document.getElementById("scene-text");
  var sceneInteractEl = document.getElementById("scene-interact");
  var storyGridEl     = document.getElementById("story-grid");
  var setupTitleEl    = document.getElementById("setup-title");
  var historyPanelEl  = document.getElementById("history-panel");
  var historyListEl   = document.getElementById("history-list");

  /* ---- PERSISTENCE ---- */

  function saveKey(id, slot) { return "adv_save_" + id + "_" + (slot || 1); }
  function endsKey(id) { return "adv_ends_" + id; }

  function getSave(id, slot) {
    try {
      var r = localStorage.getItem(saveKey(id, slot));
      // Migrate saves from single-slot format (slot 1 only)
      if (!r && (slot === 1 || !slot)) r = localStorage.getItem("adv_save_" + id);
      return r ? JSON.parse(r) : null;
    } catch(e) { return null; }
  }

  function getEndings(id) {
    try { var r = localStorage.getItem(endsKey(id)); return r ? JSON.parse(r) : {}; } catch(e) { return {}; }
  }

  function saveProgress(sceneId) {
    if (!state.story || !state.story.id) return;
    try {
      localStorage.setItem(saveKey(state.story.id, state.slot), JSON.stringify({
        name: state.name, charClass: state.charClass,
        flags: state.flags, history: state.history, sceneId: sceneId
      }));
    } catch(e) {}
  }

  function recordEnding(sceneId, title) {
    if (!state.story || !state.story.id) return;
    try {
      var ends = getEndings(state.story.id);
      ends[sceneId] = title || sceneId;
      localStorage.setItem(endsKey(state.story.id), JSON.stringify(ends));
      localStorage.removeItem(saveKey(state.story.id, state.slot));
      localStorage.removeItem("adv_save_" + state.story.id);
    } catch(e) {}
  }

  function clearSave(id, slot) {
    try {
      localStorage.removeItem(saveKey(id, slot));
      if (slot === 1 || !slot) localStorage.removeItem("adv_save_" + id);
    } catch(e) {}
  }

  function countEndingScenes(scenes) {
    return Object.keys(scenes).filter(function(id) { return scenes[id].isEnding; }).length;
  }

  /* ---- PREFERENCES ---- */

  function getPref(key, def) {
    try { var v = localStorage.getItem(key); return v !== null ? v : def; } catch(e) { return def; }
  }
  function setPref(key, val) { try { localStorage.setItem(key, val); } catch(e) {} }

  function applyTheme(t) {
    t = t || "valdrath";
    document.documentElement.dataset.theme = t;
    setPref("adv_theme", t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var colors = { valdrath: "#0a1a0d", parchment: "#c8b090", void: "#06060e", ember: "#120804" };
      meta.content = colors[t] || "#0a1a0d";
    }
    document.querySelectorAll(".swatch[data-theme-set]").forEach(function(s) {
      var active = s.dataset.themeSet === t;
      s.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function applyFontSize(s) {
    s = s || "medium";
    document.documentElement.dataset.fontsize = s;
    setPref("adv_fontsize", s);
    document.querySelectorAll(".font-btn[data-fontsize-set]").forEach(function(b) {
      var active = b.dataset.fontsizeSet === s;
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function getTypewriter() { return getPref("adv_typewriter", "off") === "on"; }

  function updateTwBtn() {
    var btn = document.getElementById("tw-toggle");
    if (!btn) return;
    var on = getTypewriter();
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.title = on ? "Typewriter mode: ON" : "Typewriter mode: OFF";
  }

  function initPreferences() {
    document.querySelectorAll(".swatch[data-theme-set]").forEach(function(btn) {
      btn.addEventListener("click", function() { applyTheme(btn.dataset.themeSet); });
    });
    document.querySelectorAll(".font-btn[data-fontsize-set]").forEach(function(btn) {
      btn.addEventListener("click", function() { applyFontSize(btn.dataset.fontsizeSet); });
    });
    var twBtn = document.getElementById("tw-toggle");
    if (twBtn) {
      twBtn.addEventListener("click", function() {
        setPref("adv_typewriter", getTypewriter() ? "off" : "on");
        updateTwBtn();
      });
    }
    var histToggle = document.getElementById("history-toggle");
    if (histToggle && historyListEl) {
      histToggle.addEventListener("click", function() {
        var open = historyListEl.hidden;
        historyListEl.hidden = !open;
        histToggle.setAttribute("aria-expanded", open ? "true" : "false");
        var chev = histToggle.querySelector(".history-chevron");
        if (chev) chev.textContent = open ? "▴" : "▾";
      });
    }
    applyTheme(getPref("adv_theme", "valdrath"));
    applyFontSize(getPref("adv_fontsize", "medium"));
    updateTwBtn();
  }

  /* ---- TYPEWRITER ---- */

  var twTimer = null;

  function cancelTypewriter() {
    if (twTimer) { clearTimeout(twTimer); twTimer = null; }
    sceneTextEl.onclick = null;
    sceneTextEl.style.cursor = "";
    sceneTextEl.title = "";
  }

  function startTypewriter(lines, onDone) {
    var idx = 0;
    var skipped = false;

    function flush() {
      cancelTypewriter();
      while (idx < lines.length) { addP(sceneTextEl, lines[idx]); idx++; }
      onDone();
    }

    sceneTextEl.onclick = function() { skipped = true; flush(); };
    sceneTextEl.style.cursor = "pointer";
    sceneTextEl.title = "Click to skip";

    function tick() {
      if (skipped) return;
      if (idx >= lines.length) {
        cancelTypewriter();
        onDone();
        return;
      }
      addP(sceneTextEl, lines[idx]);
      idx++;
      twTimer = setTimeout(tick, 850);
    }
    tick();
  }

  /* ---- HISTORY PANEL ---- */

  function updateHistoryPanel() {
    if (!historyPanelEl || !historyListEl) return;
    if (!state.history || state.history.length <= 1) {
      historyPanelEl.hidden = true;
      return;
    }
    historyPanelEl.hidden = false;
    historyListEl.innerHTML = "";
    var scenes = state.story && state.story.story ? state.story.story.scenes : {};
    var slice = state.history.slice(-12);
    slice.forEach(function(sceneId, i) {
      var scene = scenes[sceneId];
      var item = document.createElement("div");
      item.className = "history-item" + (i === slice.length - 1 ? " current" : "");
      item.textContent = (scene && scene.title) ? scene.title : sceneId;
      historyListEl.appendChild(item);
    });
  }

  /* ---- ACHIEVEMENTS ---- */

  function achKey(id) { return "adv_ach_" + id; }
  function getAchievements(id) {
    try { var r = localStorage.getItem(achKey(id)); return r ? JSON.parse(r) : {}; } catch(e) { return {}; }
  }

  function showAchievementToast(ach) {
    var toast = document.createElement("div");
    toast.className = "achievement-toast";
    toast.innerHTML =
      '<span class="achievement-toast-icon">' + (ach.icon || "🏆") + '</span>' +
      '<div class="achievement-toast-body">' +
        '<div class="achievement-toast-label">Achievement Unlocked</div>' +
        '<div class="achievement-toast-title">' + ach.title + '</div>' +
      '</div>';
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { toast.classList.add("achievement-toast-visible"); });
    });
    setTimeout(function () {
      toast.classList.remove("achievement-toast-visible");
      setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 500);
    }, 3500);
  }

  function unlockAchievement(storyId, ach) {
    try {
      var unlocked = getAchievements(storyId);
      if (unlocked[ach.id]) return;
      unlocked[ach.id] = Date.now();
      localStorage.setItem(achKey(storyId), JSON.stringify(unlocked));
      showAchievementToast(ach);
    } catch(e) {}
  }

  function checkAchievements(sceneId) {
    if (!state.story || !state.story.achievements) return;
    var storyId = state.story.id;
    var scene = state.story.story.scenes[sceneId];
    var ends = getEndings(storyId);
    var totalEnds = countEndingScenes(state.story.story.scenes);

    state.story.achievements.forEach(function (ach) {
      var c = ach.condition;
      if (!c) return;
      switch (c.type) {
        case "scene_visit":
          if (c.scene === sceneId) unlockAchievement(storyId, ach);
          break;
        case "flag_set":
          if (state.flags[c.flag]) unlockAchievement(storyId, ach);
          break;
        case "any_ending":
          if (scene && scene.isEnding && sceneId === c.ending) unlockAchievement(storyId, ach);
          break;
        case "class_ending":
          if (scene && scene.isEnding && sceneId === c.ending && state.charClass === c.charClass) unlockAchievement(storyId, ach);
          break;
        case "class_any_ending":
          if (scene && scene.isEnding && state.charClass === c.charClass) unlockAchievement(storyId, ach);
          break;
        case "all_endings":
          if (Object.keys(ends).length >= totalEnds) unlockAchievement(storyId, ach);
          break;
      }
    });
  }

  /* ---- DOM UTILITIES ---- */

  function showPage(id) {
    document.querySelectorAll(".page").forEach(function (p) { p.classList.remove("active"); });
    document.getElementById(id).classList.add("active");
    window.scrollTo(0, 0);
  }

  function addP(container, text, variant) {
    var p = document.createElement("p");
    p.className = "passage" + (variant ? " " + variant : "");
    p.textContent = text;
    container.appendChild(p);
    p.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return p;
  }

  function addPs(container, lines, variant) {
    for (var i = 0; i < lines.length; i++) addP(container, lines[i], variant);
  }

  function clearInteract(el) {
    el.innerHTML = "";
    el.hidden = true;
  }

  function renderContinue(el, label, onClick) {
    el.innerHTML = "";
    el.hidden = false;
    var row = document.createElement("div");
    row.className = "btn-row";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "primary";
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    row.appendChild(btn);
    el.appendChild(row);
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    btn.focus();
  }

  /* ---- LIBRARY FLOW ---- */

  function showLibrary() {
    storyGridEl.innerHTML = "";
    var stories = window.STORIES || [];
    stories.forEach(function (entry) {
      var card = document.createElement("div");
      card.className = "story-card";
      card.setAttribute("role", "listitem");
      card.setAttribute("aria-label", entry.title);

      var titleEl = document.createElement("div");
      titleEl.className = "story-card-title";
      titleEl.textContent = entry.title;

      var blurbEl = document.createElement("div");
      blurbEl.className = "story-card-blurb";
      blurbEl.textContent = entry.blurb;

      var chipsEl = document.createElement("div");
      chipsEl.className = "story-card-classes";
      (entry.classes || []).forEach(function (cls) {
        var chip = document.createElement("span");
        chip.className = "story-class-chip " + (cls.id || "unknown");
        chip.textContent = cls.name;
        chipsEl.appendChild(chip);
      });

      card.appendChild(titleEl);
      card.appendChild(blurbEl);
      card.appendChild(chipsEl);

      // Two save slots
      var slotRow = document.createElement("div");
      slotRow.className = "slot-row";
      [1, 2].forEach(function(slot) {
        var save = entry.id ? getSave(entry.id, slot) : null;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "slot-btn " + (save ? "slot-filled" : "slot-empty");

        var labelEl = document.createElement("span");
        labelEl.className = "slot-label";
        labelEl.textContent = "Slot " + (slot === 1 ? "I" : "II");

        var infoEl = document.createElement("span");
        infoEl.className = "slot-info";

        if (save) {
          btn.setAttribute("aria-label", "Slot " + slot + ": continue as " + save.name + " the " + save.charClass);
          infoEl.textContent = save.name + " · " + save.charClass;
          btn.addEventListener("click", (function(e, sv, sl) {
            return function() { resumeStory(e, sv, sl); };
          })(entry, save, slot));
        } else {
          btn.setAttribute("aria-label", "Slot " + slot + ": new game");
          infoEl.textContent = "— new game —";
          btn.addEventListener("click", (function(e, sl) {
            return function() { selectStory(e, sl); };
          })(entry, slot));
        }

        btn.appendChild(labelEl);
        btn.appendChild(infoEl);
        slotRow.appendChild(btn);
      });
      card.appendChild(slotRow);

      if (entry.id) {
        var ends = getEndings(entry.id);
        var endCount = Object.keys(ends).length;
        if (endCount > 0) {
          var totalEnds = countEndingScenes(entry.story.scenes);
          var endsEl = document.createElement("div");
          endsEl.className = "story-card-endings";
          endsEl.textContent = endCount + " of " + totalEnds + " endings discovered";
          card.appendChild(endsEl);
        }
      }

      if (entry.id && entry.achievements && entry.achievements.length) {
        var unlocked = getAchievements(entry.id);
        var unlockedCount = Object.keys(unlocked).length;
        var total = entry.achievements.length;

        var achSection = document.createElement("div");
        achSection.className = "story-card-achievements";

        var achToggle = document.createElement("button");
        achToggle.type = "button";
        achToggle.className = "achievements-toggle";
        achToggle.setAttribute("aria-expanded", "false");
        achToggle.innerHTML =
          '<span class="achievements-count">' + unlockedCount + ' of ' + total + ' achievements</span>' +
          '<span class="achievements-chevron">▾</span>';

        var achList = document.createElement("div");
        achList.className = "achievements-list";
        achList.hidden = true;

        entry.achievements.forEach(function (ach) {
          var isUnlocked = !!unlocked[ach.id];
          var item = document.createElement("div");
          item.className = "achievement-item" + (isUnlocked ? " unlocked" : " locked");
          item.innerHTML =
            '<span class="achievement-item-icon">' + (ach.icon || "🏆") + '</span>' +
            '<div class="achievement-item-text">' +
              '<div class="achievement-item-title">' + ach.title + '</div>' +
              '<div class="achievement-item-desc">' + (isUnlocked ? ach.desc : "Keep playing to unlock") + '</div>' +
            '</div>';
          achList.appendChild(item);
        });

        achToggle.addEventListener("click", function () {
          var open = achList.hidden;
          achList.hidden = !open;
          achToggle.setAttribute("aria-expanded", open ? "true" : "false");
          achToggle.querySelector(".achievements-chevron").textContent = open ? "▴" : "▾";
        });

        achSection.appendChild(achToggle);
        achSection.appendChild(achList);
        card.appendChild(achSection);
      }

      storyGridEl.appendChild(card);
    });

    showPage("page-library");
    var firstBtn = storyGridEl.querySelector("button");
    if (firstBtn) firstBtn.focus();
  }

  function resumeStory(entry, save, slot) {
    state.story = entry;
    state.slot  = slot || 1;
    state.name  = save.name;
    state.charClass = save.charClass;
    state.flags = save.flags || {};
    state.history = save.history || [];
    var cls = entry.classes.find(function (c) { return c.id === state.charClass; });
    classBadgeEl.textContent = cls ? cls.name : state.charClass;
    classBadgeEl.className = "class-badge " + state.charClass;
    if (window.AudioEngine) AudioEngine.setStory(entry.id);
    loadScene(save.sceneId);
  }

  function selectStory(entry, slot) {
    state.story = entry;
    state.slot  = slot || 1;
    setupTitleEl.textContent = entry.title;
    if (window.AudioEngine) AudioEngine.setStory(entry.id);
    showPage("page-setup");
    showSetupIntro();
  }

  /* ---- SETUP FLOW ---- */

  function startGame() {
    if (state.story && state.story.id) clearSave(state.story.id, state.slot);
    cancelTypewriter();
    state = { name: "", charClass: "", flags: {}, history: [], story: null, slot: 1 };
    if (window.AudioEngine) AudioEngine.stop();
    classBadgeEl.textContent = "";
    classBadgeEl.className = "class-badge";
    showLibrary();
  }

  function showSetupIntro() {
    setupContentEl.innerHTML = "";

    var intro = document.createElement("p");
    intro.className = "setup-intro-text";
    intro.textContent = state.story ? state.story.blurb : "";

    var row = document.createElement("div");
    row.className = "btn-row";
    row.style.marginTop = "1.5rem";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "primary";
    btn.textContent = "Begin Your Journey";
    btn.addEventListener("click", askName);

    row.appendChild(btn);
    setupContentEl.appendChild(intro);
    setupContentEl.appendChild(row);
    btn.focus();
  }

  function askName() {
    setupContentEl.innerHTML = "";

    var label = document.createElement("p");
    label.className = "setup-prompt";
    label.id = "setup-name-label";
    label.textContent = "What is your name, adventurer?";

    var field = document.createElement("div");
    field.className = "setup-field";

    var input = document.createElement("input");
    input.type = "text";
    input.autocomplete = "off";
    input.placeholder = "Enter your name…";
    input.setAttribute("aria-labelledby", "setup-name-label");
    input.setAttribute("aria-describedby", "name-error");

    var error = document.createElement("p");
    error.className = "error-msg";
    error.id = "name-error";
    error.setAttribute("aria-live", "assertive");

    var row = document.createElement("div");
    row.className = "btn-row";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "primary";
    btn.textContent = "Continue";
    btn.disabled = true;

    function trimmed() { return input.value.trim(); }
    function sync() { btn.disabled = !trimmed(); }
    function submit() {
      var v = trimmed();
      if (!v) { error.textContent = "Please enter your name."; input.focus(); return; }
      state.name = v;
      askClass();
    }

    input.addEventListener("input", function () { sync(); if (trimmed()) error.textContent = ""; });
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); submit(); } });
    btn.addEventListener("click", submit);

    row.appendChild(btn);
    field.appendChild(input);
    field.appendChild(error);
    field.appendChild(row);
    setupContentEl.appendChild(label);
    setupContentEl.appendChild(field);
    input.focus();
  }

  function askClass() {
    setupContentEl.innerHTML = "";

    var label = document.createElement("p");
    label.className = "setup-prompt";
    label.textContent = "Choose your class, " + state.name + ":";
    setupContentEl.appendChild(label);

    var grid = document.createElement("div");
    grid.className = "class-grid";
    grid.setAttribute("role", "group");
    grid.setAttribute("aria-label", "Choose your class");

    state.story.classes.forEach(function (cls) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "class-card " + cls.id;

      var name = document.createElement("div");
      name.className = "class-card-name";
      name.textContent = cls.name;

      var tag = document.createElement("div");
      tag.className = "class-card-tag";
      tag.textContent = cls.tag;

      var desc = document.createElement("div");
      desc.className = "class-card-desc";
      desc.textContent = cls.desc;

      card.appendChild(name);
      card.appendChild(tag);
      card.appendChild(desc);
      card.addEventListener("click", function () {
        state.charClass = cls.id;
        beginStory();
      });
      grid.appendChild(card);
    });

    setupContentEl.appendChild(grid);
    grid.querySelector("button").focus();
  }

  /* ---- SCENE ENGINE ---- */

  function beginStory() {
    var cls = state.story.classes.find(function (c) { return c.id === state.charClass; });
    classBadgeEl.textContent = cls ? cls.name : state.charClass;
    classBadgeEl.className = "class-badge " + state.charClass;
    loadScene(state.story.story.start);
  }

  function loadScene(id) {
    var scene = state.story.story.scenes[id];
    if (!scene) { console.error("Missing scene:", id); return; }

    state.history.push(id);
    showPage("page-scene");
    if (window.AudioEngine) AudioEngine.onSceneLoad(id, scene);

    sceneChapterEl.textContent  = scene.chapter  || "";
    sceneTitleEl.textContent    = scene.title     || "";
    sceneLocationEl.textContent = scene.location  || "";

    sceneTextEl.innerHTML = "";
    cancelTypewriter();
    clearInteract(sceneInteractEl);
    updateHistoryPanel();

    var paras = scene.paragraphs || [];
    var lines = paras.map(function (p) { return typeof p === "function" ? p(state) : p; });

    function afterParagraphs() {
      if (scene.isEnding) {
        recordEnding(id, scene.title);
        checkAchievements(id);
        renderContinue(sceneInteractEl, "Play Again", startGame);
      } else {
        saveProgress(id);
        checkAchievements(id);
        renderChoices(scene.choices || [], scene.choicePrompt);
      }
    }

    if (getTypewriter()) {
      startTypewriter(lines, afterParagraphs);
    } else {
      addPs(sceneTextEl, lines);
      afterParagraphs();
    }
  }

  function resolveNext(next) {
    if (typeof next === "function") return next(state);
    if (typeof next === "string") return next;
    return next[state.charClass] || next["default"] || "";
  }

  function renderChoices(choices, prompt) {
    var visible = choices.filter(function (c) {
      if (c.onlyFor && c.onlyFor.indexOf(state.charClass) === -1) return false;
      if (c.requiresFlag && !state.flags[c.requiresFlag]) return false;
      return true;
    });

    if (!visible.length) return;

    sceneInteractEl.hidden = false;

    function resolveText(choice) {
      return typeof choice.text === "function" ? choice.text(state) : choice.text;
    }

    if (visible.length === 1) {
      renderContinue(sceneInteractEl, resolveText(visible[0]), function () { applyChoice(visible[0]); });
      return;
    }

    var promptEl = document.createElement("p");
    promptEl.className = "choice-prompt";
    promptEl.textContent = prompt || "What do you do?";
    sceneInteractEl.appendChild(promptEl);

    var row = document.createElement("div");
    row.className = "btn-row choices-col";

    visible.forEach(function (choice) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = resolveText(choice);
      btn.addEventListener("click", function () { applyChoice(choice); });
      row.appendChild(btn);
    });

    sceneInteractEl.appendChild(row);
    sceneInteractEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    row.querySelector("button").focus();
  }

  function applyChoice(choice) {
    if (choice.setsFlag) state.flags[choice.setsFlag] = true;
    loadScene(resolveNext(choice.next));
  }

  /* ---- CATALOG LOADER ---- */

  function injectStoryScripts(catalog) {
    if (!catalog.length) { showLibrary(); return; }
    var pending = catalog.length;
    function onDone() { pending--; if (pending === 0) showLibrary(); }
    catalog.forEach(function (entry) {
      var s = document.createElement("script");
      s.src = entry.file;
      s.onload = onDone;
      s.onerror = onDone;
      document.head.appendChild(s);
    });
  }

  function loadCatalogStories() {
    var CATALOG_URL = "https://tech-with-anthony.github.io/adventure_story/catalog.json";
    fetch(CATALOG_URL)
      .then(function (r) { return r.json(); })
      .then(function (catalog) { injectStoryScripts(catalog); })
      .catch(function () { injectStoryScripts(window.STORY_CATALOG || []); });
  }

  initPreferences();
  loadCatalogStories();
})();
