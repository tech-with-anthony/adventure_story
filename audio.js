window.AudioEngine = (function () {
  'use strict';

  var ctx = null;
  var nodes = [];       // active AudioNodes to stop later
  var timers = [];      // setTimeout IDs for scheduled events
  var muted = false;
  var currentStory = null;

  /* ---- Restore mute preference ---- */
  try { muted = localStorage.getItem('adv_audio_muted') === '1'; } catch (e) {}

  /* ---- Lazy AudioContext ---- */
  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  /* ---- White noise buffer (1 s, looping) ---- */
  function makeNoise(c) {
    var len = c.sampleRate;
    var buf = c.createBuffer(1, len, c.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    var src = c.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    return src;
  }

  /* ---- Oscillator helper ---- */
  function makeOsc(c, type, freq) {
    var o = c.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    return o;
  }

  /* ---- Filter helper ---- */
  function makeFilter(c, type, freq, q) {
    var f = c.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    if (q !== undefined) f.Q.value = q;
    return f;
  }

  /* ---- Gain helper ---- */
  function makeGain(c, val) {
    var g = c.createGain();
    g.gain.value = val;
    return g;
  }

  /* ---- Connect a chain and start if it has a start() ---- */
  function chain(c, parts, destGain) {
    for (var i = 0; i < parts.length - 1; i++) {
      parts[i].connect(parts[i + 1]);
    }
    parts[parts.length - 1].connect(destGain);
    if (parts[0].start) parts[0].start();
    nodes.push(parts[0]);
    return parts[0];
  }

  /* ================================================================
     VALDRATH'S KEEP — dark dungeon ambience
     Layers: bass drone pair · filtered wind · distant chain strikes
     ================================================================ */
  function startValdrath(c) {
    var master = makeGain(c, 0);
    master.connect(c.destination);
    nodes.push(master);

    /* Ramp master in gently */
    master.gain.setValueAtTime(0, c.currentTime);
    master.gain.linearRampToValueAtTime(1, c.currentTime + 4);

    /* Layer 1: two detuned bass drones for a beating / tension effect */
    var droneFilter = makeFilter(c, 'lowpass', 140);
    var droneGain   = makeGain(c, 0.09);
    droneFilter.connect(droneGain);
    droneGain.connect(master);

    var osc1 = makeOsc(c, 'sawtooth', 55);
    var osc2 = makeOsc(c, 'sawtooth', 58.5);
    [osc1, osc2].forEach(function (o) {
      o.connect(droneFilter);
      o.start();
      nodes.push(o);
    });

    /* Layer 2: low wind rumble — noise through lowpass */
    var windFilter = makeFilter(c, 'lowpass', 190);
    var windGain   = makeGain(c, 0.045);
    chain(c, [makeNoise(c), windFilter, windGain], master);

    /* Layer 3: distant chain strikes — random sine bursts */
    function chainStrike() {
      if (!nodes.length) return;
      var a = c.currentTime;
      var g = makeGain(c, 0);
      g.connect(master);
      nodes.push(g);

      var o = makeOsc(c, 'sine', 600 + Math.random() * 200);
      o.connect(g);
      o.start(a);
      o.stop(a + 0.35);
      nodes.push(o);

      g.gain.setValueAtTime(0, a);
      g.gain.linearRampToValueAtTime(0.06, a + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, a + 0.35);

      var delay = 12000 + Math.random() * 16000;
      timers.push(setTimeout(chainStrike, delay));
    }
    timers.push(setTimeout(chainStrike, 6000 + Math.random() * 8000));
  }

  /* ================================================================
     FAE COURT — ethereal shimmer ambience
     Layers: harmonic shimmer pair · airy wind · bell tones
     ================================================================ */
  function startFaeCourt(c) {
    var master = makeGain(c, 0);
    master.connect(c.destination);
    nodes.push(master);

    master.gain.setValueAtTime(0, c.currentTime);
    master.gain.linearRampToValueAtTime(1, c.currentTime + 5);

    /* Layer 1: shimmering harmonics — 4 sine oscillators with slow LFO on gain */
    var shimFreqs = [220, 330, 440, 660];
    var shimGain  = makeGain(c, 0.055);
    shimGain.connect(master);

    shimFreqs.forEach(function (freq, i) {
      var osc = makeOsc(c, 'sine', freq);
      var g   = makeGain(c, 0.25 - i * 0.04);
      osc.connect(g);
      g.connect(shimGain);
      osc.start();
      nodes.push(osc);

      /* LFO: slow volume swell per partial, offset phases */
      var lfo = makeOsc(c, 'sine', 0.07 + i * 0.03);
      var lfoGain = makeGain(c, 0.12);
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);
      lfo.start();
      nodes.push(lfo);
    });

    /* Layer 2: airy wind — noise through bandpass */
    var windFilter = makeFilter(c, 'bandpass', 450, 0.6);
    var windGain   = makeGain(c, 0.035);
    chain(c, [makeNoise(c), windFilter, windGain], master);

    /* Layer 3: bell tones — sine with fast attack, slow decay */
    var bellFreqs = [880, 1100, 1320, 1760];
    function bellTone() {
      if (!nodes.length) return;
      var a    = c.currentTime;
      var freq = bellFreqs[Math.floor(Math.random() * bellFreqs.length)];
      var g    = makeGain(c, 0);
      g.connect(master);
      nodes.push(g);

      var o = makeOsc(c, 'sine', freq);
      o.connect(g);
      o.start(a);
      o.stop(a + 2.5);
      nodes.push(o);

      g.gain.setValueAtTime(0, a);
      g.gain.linearRampToValueAtTime(0.07, a + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, a + 2.5);

      var delay = 10000 + Math.random() * 14000;
      timers.push(setTimeout(bellTone, delay));
    }
    timers.push(setTimeout(bellTone, 4000 + Math.random() * 6000));
  }

  var STARTERS = {
    valdrath:  startValdrath,
    fae_court: startFaeCourt
  };

  /* ---- Stop all active audio ---- */
  function stopAll() {
    timers.forEach(function (t) { clearTimeout(t); });
    timers = [];

    if (ctx) {
      var now = ctx.currentTime;
      nodes.forEach(function (n) {
        try {
          if (n instanceof GainNode) {
            n.gain.cancelScheduledValues(now);
            n.gain.setValueAtTime(n.gain.value, now);
            n.gain.linearRampToValueAtTime(0, now + 1.5);
          }
          if (n.stop) n.stop(now + 1.5);
        } catch (e) {}
      });
    }

    /* Clear the list after the fade */
    var captured = nodes;
    nodes = [];
    setTimeout(function () {
      captured.forEach(function (n) {
        try { n.disconnect(); } catch (e) {}
      });
    }, 1600);
  }

  /* ---- Update mute button icon ---- */
  function updateBtn() {
    var btn = document.getElementById('mute-toggle');
    if (btn) btn.textContent = muted ? '🔇' : '🔊';
  }

  /* ---- Public API ---- */
  function setStory(id) {
    currentStory = id;
    if (!muted && STARTERS[id]) {
      var c = getCtx();
      STARTERS[id](c);
    }
  }

  function stop() {
    stopAll();
    currentStory = null;
  }

  function onSceneLoad(id, scene) {
    /* Future: scene-level audio variation (e.g. boss filter shift) */
  }

  function toggleMute() {
    muted = !muted;
    try { localStorage.setItem('adv_audio_muted', muted ? '1' : '0'); } catch (e) {}

    if (muted) {
      stopAll();
    } else if (currentStory && STARTERS[currentStory]) {
      var c = getCtx();
      STARTERS[currentStory](c);
    }
    updateBtn();
  }

  /* Wire mute button once DOM is ready */
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('mute-toggle');
    if (btn) {
      btn.addEventListener('click', toggleMute);
      updateBtn();
    }
  });

  return { setStory: setStory, stop: stop, onSceneLoad: onSceneLoad, toggleMute: toggleMute };
})();
