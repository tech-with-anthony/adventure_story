(function () {
  "use strict";

  var state = { name: "", charClass: "", flags: {}, history: [], story: null };

  var setupContentEl  = document.getElementById("setup-content");
  var sceneChapterEl  = document.getElementById("scene-chapter");
  var sceneTitleEl    = document.getElementById("scene-title");
  var sceneLocationEl = document.getElementById("scene-location");
  var classBadgeEl    = document.getElementById("class-badge");
  var sceneTextEl     = document.getElementById("scene-text");
  var sceneInteractEl = document.getElementById("scene-interact");
  var storyGridEl  = document.getElementById("story-grid");
  var setupTitleEl = document.getElementById("setup-title");

  /* ---- PERSISTENCE ---- */

  function saveKey(id) { return "adv_save_" + id; }
  function endsKey(id) { return "adv_ends_" + id; }

  function getSave(id) {
    try { var r = localStorage.getItem(saveKey(id)); return r ? JSON.parse(r) : null; } catch(e) { return null; }
  }
  function getEndings(id) {
    try { var r = localStorage.getItem(endsKey(id)); return r ? JSON.parse(r) : {}; } catch(e) { return {}; }
  }
  function saveProgress(sceneId) {
    if (!state.story || !state.story.id) return;
    try {
      localStorage.setItem(saveKey(state.story.id), JSON.stringify({
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
      localStorage.removeItem(saveKey(state.story.id));
    } catch(e) {}
  }
  function clearSave(id) {
    try { localStorage.removeItem(saveKey(id)); } catch(e) {}
  }
  function countEndingScenes(scenes) {
    return Object.keys(scenes).filter(function(id) { return scenes[id].isEnding; }).length;
  }

  /* ---- DOM UTILITIES (same patterns as original) ---- */

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

      var actionsEl = document.createElement("div");
      actionsEl.className = "story-card-actions";

      var save = entry.id ? getSave(entry.id) : null;
      if (save) {
        var contBtn = document.createElement("button");
        contBtn.type = "button";
        contBtn.className = "primary";
        contBtn.textContent = "Continue";
        contBtn.addEventListener("click", function () { resumeStory(entry, save); });
        actionsEl.appendChild(contBtn);

        var newBtn = document.createElement("button");
        newBtn.type = "button";
        newBtn.textContent = "New Game";
        newBtn.addEventListener("click", function () { selectStory(entry); });
        actionsEl.appendChild(newBtn);
      } else {
        var playBtn = document.createElement("button");
        playBtn.type = "button";
        playBtn.className = "primary";
        playBtn.textContent = "Begin Adventure";
        playBtn.addEventListener("click", function () { selectStory(entry); });
        actionsEl.appendChild(playBtn);
      }

      card.appendChild(actionsEl);

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

      storyGridEl.appendChild(card);
    });

    showPage("page-library");
    var firstBtn = storyGridEl.querySelector("button");
    if (firstBtn) firstBtn.focus();
  }

  function resumeStory(entry, save) {
    state.story = entry;
    state.name = save.name;
    state.charClass = save.charClass;
    state.flags = save.flags || {};
    state.history = save.history || [];
    var cls = entry.classes.find(function (c) { return c.id === state.charClass; });
    classBadgeEl.textContent = cls ? cls.name : state.charClass;
    classBadgeEl.className = "class-badge " + state.charClass;
    if (window.AudioEngine) AudioEngine.setStory(entry.id);
    loadScene(save.sceneId);
  }

  function selectStory(entry) {
    state.story = entry;
    setupTitleEl.textContent = entry.title;
    if (window.AudioEngine) AudioEngine.setStory(entry.id);
    showPage("page-setup");
    showSetupIntro();
  }

  /* ---- SETUP FLOW ---- */

  function startGame() {
    if (state.story && state.story.id) clearSave(state.story.id);
    state = { name: "", charClass: "", flags: {}, history: [], story: null };
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
    var paras = scene.paragraphs || [];
    var lines = paras.map(function (p) { return typeof p === "function" ? p(state) : p; });
    addPs(sceneTextEl, lines);

    clearInteract(sceneInteractEl);

    if (scene.isEnding) {
      recordEnding(id, scene.title);
      renderContinue(sceneInteractEl, "Play Again", startGame);
    } else {
      saveProgress(id);
      renderChoices(scene.choices || [], scene.choicePrompt);
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

  loadCatalogStories();
})();
