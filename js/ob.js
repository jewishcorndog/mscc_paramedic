/* Obstetrics (Chapter 45): a week-by-week pregnancy page with viability, a
   complications timeline, the delivery and newborn pages, flashcards, quiz
   and stats over window.OB_* data. The subject switch in cardio.js calls
   window.OBBox.show(). */
(function () {
  'use strict';

  var GROUPS = window.OB_GROUPS;
  var TOPICS = window.OB_TOPICS;
  var TERMS = window.OB_TERMS;
  var FACTS = window.OB_FACTS;
  var CASES = window.OB_SCENARIOS;
  var TL = window.OB_TIMELINE;
  var ST = window.OB_STAGES;
  var DEL = window.OB_DELIVERY;
  var APGAR = window.OB_APGAR;
  var NRP = window.OB_NRP;
  var BLEED = window.OB_BLEEDING;
  var GROUP_IDS = GROUPS.map(function (g) { return g.id; });
  var MAXW = 42;

  // Stable ids for stats: terms by name, facts by position.
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  TERMS.forEach(function (t) { t.id = 'term-' + slug(t.term); });
  FACTS.forEach(function (f, i) { f.id = 'fact-' + i; });
  // Pseudo-items so the week and Apgar drills show up in stats by area.
  var VIA_ITEMS = ST.viability.map(function (v, i) { return { id: 'via-' + i, group: 'pregnancy', v: v }; });
  var APGAR_ITEM = { id: 'apgar-calc', group: 'newborn' };

  // ---------- Saved state ----------
  var KEY = 'mscc-ob-v1';
  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  var S = Object.assign({
    tab: 'learn',
    groups: GROUP_IDS.slice(),
    cardDecks: { terms: true, facts: true, cases: false, timeline: true, topics: false },
    cardDir: 'forward',
    quizLen: 20,
    quizTopics: { terms: true, facts: true, cases: true, timeline: true, weeks: true, apgar: true },
    learn: 'pregnancy',
    week: 20,
    tlPhase: 'all',
    stats: {}
  }, loadSaved());
  S.groups = S.groups.filter(function (g) { return GROUP_IDS.indexOf(g) !== -1; });
  S.week = Math.max(0, Math.min(MAXW, Number(S.week) || 0));

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ }
  }
  function record(id, field, ok) {
    var byItem = S.stats[id] || (S.stats[id] = {});
    var s = byItem[field] || (byItem[field] = { c: 0, w: 0 });
    if (ok) s.c++; else s.w++;
    s.t = Date.now();
    save();
  }

  // ---------- Helpers ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Escape, then turn a trailing or inline * (beyond the slides) into the muted mark.
  function txt(s) { return esc(s).replace(/\*/g, '<span class="std-mark" title="Goes beyond the Chapter 45 slides">*</span>'); }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function seg(name, value, options) {
    return '<div class="seg" role="group">' + options.map(function (o) {
      return '<button data-seg="' + name + '" data-val="' + esc(o[0]) + '" aria-pressed="' + (String(value) === String(o[0])) + '">' + esc(o[1]) + '</button>';
    }).join('') + '</div>';
  }
  function listHtml(list) {
    return '<ul class="items">' + list.map(function (x) { return '<li>' + txt(x) + '</li>'; }).join('') + '</ul>';
  }
  function band(title, meta, hidden) {
    if (hidden) return '<div class="label-band hidden-name ob"><span class="label-name">? ? ?</span><span class="label-meta">' + esc(meta || 'Which one?') + '</span></div>';
    return '<div class="label-band ob"><span class="label-name">' + esc(title) + '</span><span class="label-meta">' + esc(meta || '') + '</span></div>';
  }
  function groupName(id) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].id === id) return GROUPS[i].name;
    return '';
  }
  var TN = ' <span class="tn-tag" title="From the class Drug Box deck (TN protocols)">TN</span>';
  var STD = ' <span class="std-mark" title="Goes beyond the Chapter 45 slides">*</span>';
  function marks(x) { return (x.tn ? TN : '') + (x.std ? STD : ''); }
  function verdictPill(p) { return p >= 0.8 ? 'high' : p >= 0.5 ? 'mid' : 'low'; }
  function inGroups(x) { return S.groups.indexOf(x.group) !== -1; }

  function mcFrom(correct, pool) {
    var opts = [correct];
    pool.forEach(function (p) { if (opts.length < 4 && opts.indexOf(p) === -1) opts.push(p); });
    var s = shuffle(opts);
    return { options: s, answer: s.indexOf(correct) };
  }
  function termPool(t, key) {
    var same = TERMS.filter(function (o) { return o !== t && o.group === t.group; });
    var rest = TERMS.filter(function (o) { return o !== t && o.group !== t.group; });
    return shuffle(same).concat(shuffle(rest)).map(function (o) { return o[key]; });
  }
  function areaChips() {
    return '<div class="field-row"><p class="eyebrow">Areas</p><div class="chips">' + GROUPS.map(function (g) {
      return '<button class="chip" data-area="' + g.id + '" aria-pressed="' + (S.groups.indexOf(g.id) !== -1) + '">' + esc(g.name) + '</button>';
    }).join('') + '</div><div class="row"><button class="btn link" data-act="areas-all">All areas</button><button class="btn link" data-act="areas-none">Clear</button></div></div>';
  }
  function toggleArea(id) {
    var i = S.groups.indexOf(id);
    if (i === -1) S.groups.push(id); else S.groups.splice(i, 1);
    save();
  }

  // ---------- Pregnancy weeks ----------
  function inRange(w, a, b) { return w >= a && w <= b; }
  function viabilityAt(w) {
    for (var i = 0; i < ST.viability.length; i++) if (inRange(w, ST.viability[i].from, ST.viability[i].to)) return ST.viability[i];
    return ST.viability[ST.viability.length - 1];
  }
  function trimesterAt(w) {
    for (var i = 0; i < ST.trimesters.length; i++) if (inRange(w, ST.trimesters[i].from, ST.trimesters[i].to)) return ST.trimesters[i];
    return ST.trimesters[2];
  }
  function lunarAt(w) { return Math.max(1, Math.min(10, Math.ceil(w / 4) || 1)); }
  function fundusAt(w) {
    for (var i = 0; i < ST.fundus.length; i++) {
      var f = ST.fundus[i];
      if (inRange(w, f[0], f[1])) {
        var pos = f[3] != null ? f[3] : 0.5 + (w - 20) / 16 * 0.45;
        return { text: f[2], pos: pos, std: f[4] };
      }
    }
    return { text: '', pos: 0 };
  }
  // Timeline items whose pregnancy bars cover a week: strong first.
  function conditionsAt(w) {
    var out = [];
    TL.forEach(function (t) {
      var best = null;
      (t.preg || []).forEach(function (b) {
        if (w >= b[0] && w <= b[1]) best = best === 'strong' ? best : b[2];
      });
      if (best) out.push({ t: t, level: best });
    });
    return out.sort(function (a, b) { return (a.level === 'strong' ? 0 : 1) - (b.level === 'strong' ? 0 : 1); });
  }

  // ---------- Tabs ----------
  var VIEWS = {};
  function showTab(tab) {
    S.tab = tab; save();
    $all('#subj-ob .tab').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.otab === tab)); });
    $all('#subj-ob .view').forEach(function (v) { v.hidden = v.id !== 'oview-' + tab; });
    VIEWS[tab].show();
  }
  $all('#subj-ob .tab').forEach(function (b) {
    b.addEventListener('click', function () { showTab(b.dataset.otab); });
  });

  // =====================================================================
  // Flashcards
  // =====================================================================
  var cardsEl = $('#oview-cards');
  var C = null;
  var DECKS = [
    ['terms', 'Terms', 'Gravida, para, previa, abruption, dystocia…'],
    ['facts', 'Key facts', 'Numbers and rules: fundal height, FHR, doses, timings'],
    ['timeline', 'When can it happen?', 'Each complication and the weeks it can occur'],
    ['cases', 'Scenarios', 'What is going on and what do you do?'],
    ['topics', 'Topic key points', 'List the key points of each topic']
  ];
  function dirFor() { return S.cardDir === 'mixed' ? (Math.random() < 0.5 ? 'forward' : 'reverse') : S.cardDir; }

  function buildCards() {
    var list = [], d = S.cardDecks;
    if (d.terms) TERMS.filter(inGroups).forEach(function (t) { list.push({ kind: 'term', id: t.id, item: t, field: 'term', dir: dirFor() }); });
    if (d.facts) FACTS.filter(inGroups).forEach(function (f) { list.push({ kind: 'fact', id: f.id, item: f, field: 'fact' }); });
    if (d.timeline) TL.filter(inGroups).forEach(function (t) { list.push({ kind: 'timeline', id: t.id, item: t, field: 'timing' }); });
    if (d.cases) CASES.filter(inGroups).forEach(function (c) { list.push({ kind: 'case', id: c.id, item: c, field: 'case' }); });
    if (d.topics) TOPICS.filter(inGroups).forEach(function (t) { list.push({ kind: 'topic', id: t.id, item: t, field: 'topic' }); });
    return shuffle(list);
  }

  function cardsSetup() {
    var n = buildCards().length;
    cardsEl.innerHTML =
      '<div><h2 class="title">Flashcards</h2><p class="lede">Flip a card, say the answer out loud, then be honest. Cards you miss come back later in the round.</p></div>' +
      '<div class="panel"><div class="field-row"><p class="eyebrow">Decks</p><div class="deck-list">' +
      DECKS.map(function (k) {
        return '<label class="check deck"><input type="checkbox" data-deck="' + k[0] + '"' + (S.cardDecks[k[0]] ? ' checked' : '') + '> <span><strong>' + esc(k[1]) +
          '</strong><span class="muted small">' + esc(k[2]) + '</span></span></label>';
      }).join('') + '</div></div>' + areaChips() +
      '<div class="field-row"><p class="eyebrow">Term cards</p>' +
      seg('cardDir', S.cardDir, [['forward', 'Term → meaning'], ['reverse', 'Meaning → term'], ['mixed', 'Mixed']]) + '</div>' +
      '<div><button class="btn primary big" data-act="start"' + (n ? '' : ' disabled') + '>Start ' + n + ' cards</button></div></div>';
  }

  function cardFace(card, flipped) {
    var x = card.item, g = groupName(x.group), mk = marks(x);
    var hint = '<p class="hint">Tap to flip</p>';
    if (card.kind === 'term') {
      if (card.dir === 'reverse') {
        return band(x.term, g, !flipped) + '<div class="card-body"><p class="answer">' + esc(x.def) + mk + '</p>' +
          (flipped ? '' : '<p class="hint">Which term? Tap to flip</p>') + '</div>';
      }
      return band(x.term, g) + '<div class="card-body"><p class="ask">What does it mean?</p>' +
        (flipped ? '<hr class="divider"><p class="answer">' + esc(x.def) + mk + '</p>' : hint) + '</div>';
    }
    if (card.kind === 'fact') {
      return band('Key fact', g) + '<div class="card-body"><p class="ask">' + esc(x.q) + mk + '</p>' +
        (flipped ? '<hr class="divider"><p class="answer">' + esc(x.a) + '</p>' : hint) + '</div>';
    }
    if (card.kind === 'timeline') {
      return band(x.name, 'When?') + '<div class="card-body"><p class="ask">When in pregnancy (or after) can it happen?</p>' +
        (flipped ? '<hr class="divider"><p class="answer">' + txt(x.when) + '</p>' + tlMini(x) + '<p class="small">' + txt(x.key) + '</p>' : hint) + '</div>';
    }
    if (card.kind === 'case') {
      return band('Scenario', g) + '<div class="card-body"><p class="case ob-case">' + esc(x.case) + '</p><p class="ask">What is going on, and what do you do?</p>' +
        (flipped ? '<hr class="divider"><p class="answer">' + esc(x.a) + '</p><p class="small">' + txt(x.why) + '</p>' : hint) + '</div>';
    }
    return band(x.name, g) + '<div class="card-body"><p class="ask">Key points?' + mk + '</p>' +
      (flipped ? '<hr class="divider">' + listHtml(x.points) : hint) + '</div>';
  }

  function cardsRender() {
    if (!C.queue.length) return cardsDone();
    var card = C.queue[0], done = C.total - C.queue.length;
    cardsEl.innerHTML =
      '<div class="progress-line"><span>Card ' + (done + 1) + ' of ' + C.total + '</span><span>' + C.again.size + ' to see again</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(done / C.total * 100) + '%"></span></div>' +
      '<div class="card" role="button" tabindex="0" data-act="flip" aria-label="' + (C.flipped ? 'Card answer' : 'Flip card') + '">' + cardFace(card, C.flipped) + '</div>' +
      (C.flipped
        ? '<div class="btn-grid"><button class="btn bad big" data-act="miss">Missed it</button><button class="btn good big" data-act="got">Got it</button></div>'
        : '<div class="btn-grid"><button class="btn big" data-act="quit">End round</button><button class="btn primary big" data-act="flip">Show answer</button></div>') +
      '<p class="kbd-hint">Keys: Space flips · 1 missed · 2 got it</p>';
  }
  function cardsDone() {
    var missed = C.missedCards;
    cardsEl.innerHTML =
      '<div class="panel"><p class="eyebrow">Round complete</p><p class="score-big">' + C.firstTry + ' / ' + C.total + '</p>' +
      '<p class="lede">right on the first try. ' + (missed.length ? missed.length + ' card' + (missed.length === 1 ? '' : 's') + ' needed another pass.' : 'Clean round.') + '</p>' +
      '<div class="row">' + (missed.length ? '<button class="btn primary" data-act="again">Study the ' + missed.length + ' missed</button>' : '') +
      '<button class="btn" data-act="new">New round</button></div></div>';
  }
  function cardsStart(list) {
    C = { queue: list, total: list.length, flipped: false, again: new Set(), missedCards: [], firstTry: 0 };
    cardsRender();
  }
  function cardAnswer(ok) {
    var card = C.queue.shift();
    var key = card.kind + ':' + card.id + ':' + (card.dir || '');
    record(card.id, card.field, ok);
    if (ok) {
      if (!C.again.has(key)) C.firstTry++;
      C.again.delete(key);
    } else {
      if (!C.again.has(key)) C.missedCards.push(card);
      C.again.add(key);
      C.queue.splice(Math.min(C.queue.length, 4 + Math.floor(Math.random() * 3)), 0, card);
      C.total++;
    }
    C.flipped = false;
    cardsRender();
  }

  cardsEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-seg],[data-area]');
    if (!t) return;
    if (t.dataset.seg) { S[t.dataset.seg] = t.dataset.val; save(); return cardsSetup(); }
    if (t.dataset.area) { toggleArea(t.dataset.area); return cardsSetup(); }
    var act = t.dataset.act;
    if (act === 'areas-all') { S.groups = GROUP_IDS.slice(); save(); return cardsSetup(); }
    if (act === 'areas-none') { S.groups = []; save(); return cardsSetup(); }
    if (act === 'start') { var list = buildCards(); if (list.length) cardsStart(list); return; }
    if (act === 'flip') { if (!C.flipped) { C.flipped = true; cardsRender(); } return; }
    if (act === 'got') return cardAnswer(true);
    if (act === 'miss') return cardAnswer(false);
    if (act === 'quit') { C.queue = []; return cardsDone(); }
    if (act === 'again') return cardsStart(shuffle(C.missedCards));
    if (act === 'new') { C = null; return cardsSetup(); }
  });
  cardsEl.addEventListener('change', function (e) {
    var k = e.target.dataset && e.target.dataset.deck;
    if (k) { S.cardDecks[k] = e.target.checked; save(); cardsSetup(); }
  });
  VIEWS.cards = { show: function () { if (C && C.queue.length) cardsRender(); else if (!C) cardsSetup(); } };

  // =====================================================================
  // Apgar helpers (newborn page and quiz)
  // =====================================================================
  function apgarBand(total) {
    for (var i = 0; i < APGAR.bands.length; i++) if (total >= APGAR.bands[i].min && total <= APGAR.bands[i].max) return APGAR.bands[i];
    return APGAR.bands[2];
  }
  function randomBaby() {
    // Lean toward realistic babies: mostly 1s and 2s.
    // No pulse means a lifeless baby, so every sign is 0 then.
    var sc = APGAR.signs.map(function (s) {
      var r = Math.random();
      if (s.name === 'Pulse') return r < 0.35 ? 1 : 2;
      return r < 0.15 ? 0 : r < 0.6 ? 1 : 2;
    });
    if (Math.random() < 0.04) sc = [0, 0, 0, 0, 0];
    return { scores: sc, total: sc.reduce(function (a, b) { return a + b; }, 0) };
  }
  function babyText(b) {
    return APGAR.signs.map(function (s, i) { return s.name + ': ' + s.s[b.scores[i]].toLowerCase(); }).join(' · ');
  }
  function apgarOptions(total) {
    var near = [total - 2, total - 1, total + 1, total + 2, total - 3, total + 3].filter(function (n) { return n >= 0 && n <= 10; });
    return mcFrom(String(total), shuffle(near.slice(0, 4)).map(String));
  }

  // =====================================================================
  // Quiz
  // =====================================================================
  var quizEl = $('#oview-quiz');
  var Q = null;
  var QTOPICS = [['terms', 'Terms'], ['facts', 'Key facts'], ['cases', 'Scenarios'], ['timeline', 'When can it happen?'], ['weeks', 'Viability by week'], ['apgar', 'Score the newborn (Apgar)']];
  var VIA_NAMES = ST.viability.map(function (v) { return v.name; });

  var QGEN = {
    terms: function (pool) {
      var t = pick(pool);
      if (Math.random() < 0.5) {
        var mc = mcFrom(t.term, termPool(t, 'term'));
        return { item: t, stat: 'term', prompt: 'Which term means: <q>' + esc(t.def) + '</q>?', options: mc.options, answer: mc.answer };
      }
      var m2 = mcFrom(t.def, termPool(t, 'def'));
      return { item: t, stat: 'term', prompt: 'What does <q>' + esc(t.term) + '</q> mean?', options: m2.options, answer: m2.answer };
    },
    facts: function (pool) {
      var f = pick(pool), mc = mcFrom(f.a, shuffle(f.wrong));
      return { item: f, stat: 'fact', prompt: esc(f.q), options: mc.options, answer: mc.answer };
    },
    cases: function (pool) {
      var c = pick(pool), mc = mcFrom(c.a, shuffle(c.wrong));
      return { item: c, stat: 'case', block: '<p class="case ob-case">' + esc(c.case) + '</p>', prompt: 'What is the best answer?', options: mc.options, answer: mc.answer };
    },
    timeline: function (pool) {
      var t = pick(pool), others = shuffle(TL.filter(function (o) { return o !== t; }));
      if (Math.random() < 0.5) {
        var mc = mcFrom(t.when, others.map(function (o) { return o.when; }));
        return { item: t, stat: 'timing', prompt: 'When can <q>' + esc(t.name) + '</q> happen?', options: mc.options.map(function (o) { return o.replace(/\*/g, ''); }), answer: mc.answer, tl: true };
      }
      var m2 = mcFrom(t.name, others.map(function (o) { return o.name; }));
      return { item: t, stat: 'timing', prompt: 'Which condition fits this timing? <q>' + esc(t.when.replace(/\*/g, '')) + '</q>', options: m2.options, answer: m2.answer, tl: true };
    },
    weeks: function (pool) {
      var it = pick(pool), v = it.v;
      var w = v.from + Math.floor(Math.random() * (v.to - v.from + 1));
      var mc = mcFrom(v.name, shuffle(VIA_NAMES.filter(function (n) { return n !== v.name; })));
      return { item: it, stat: 'timing', key: 'w' + w, prompt: 'A baby is born at <strong>' + w + ' weeks</strong>. Which describes it?', options: mc.options, answer: mc.answer, via: v, week: w };
    },
    apgar: function () {
      var b = randomBaby(), mc = apgarOptions(b.total);
      return { item: APGAR_ITEM, stat: 'timing', key: b.scores.join(''), block: '<p class="case ob-case">At 1 minute: ' + esc(babyText(b)) + '.</p>', prompt: 'What is the Apgar score?', options: mc.options, answer: mc.answer, baby: b };
    }
  };
  var QSRC = { terms: TERMS, facts: FACTS, cases: CASES, timeline: TL, weeks: VIA_ITEMS, apgar: [APGAR_ITEM] };

  function buildQuiz() {
    var topics = QTOPICS.map(function (k) { return k[0]; }).filter(function (k) {
      return S.quizTopics[k] && QSRC[k].some(inGroups);
    });
    if (!topics.length) return [];
    var out = [], seen = {};
    for (var i = 0; out.length < S.quizLen && i < S.quizLen * 10; i++) {
      var k = pick(topics), q = QGEN[k](QSRC[k].filter(inGroups));
      var key = q.item.id + q.prompt + (q.key || '');
      if (seen[key]) continue;
      seen[key] = true;
      out.push(q);
    }
    return out;
  }
  function quizSetup(error) {
    quizEl.innerHTML =
      '<div><h2 class="title">Quiz</h2><p class="lede">Multiple-choice questions on terms, key facts, scenarios, when each complication can happen, viability by week, and Apgar scoring.</p></div>' +
      '<div class="panel"><div class="field-row"><p class="eyebrow">Questions</p>' + seg('quizLen', S.quizLen, [[10, '10'], [20, '20'], [40, '40']]) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Question types</p><div class="row">' + QTOPICS.map(function (k) {
        return '<label class="check"><input type="checkbox" data-qtopic="' + k[0] + '"' + (S.quizTopics[k[0]] ? ' checked' : '') + '> ' + esc(k[1]) + '</label>';
      }).join('') + '</div></div>' + areaChips() +
      (error ? '<p class="error">' + esc(error) + '</p>' : '') +
      '<div><button class="btn primary big" data-act="start">Start quiz</button></div></div>';
  }
  function quizStart(list) {
    if (!list.length) return quizSetup('Pick at least one question type and one area.');
    Q = { list: list, i: 0, right: 0, missed: [], state: null };
    quizRender();
  }
  function explainHtml(q) {
    var x = q.item, mk = marks(x);
    if (q.stat === 'term') return '<p><strong>' + esc(x.term) + '</strong>: ' + esc(x.def) + mk + '</p>';
    if (q.stat === 'case') return '<p><strong>' + esc(q.options[q.answer]) + '</strong></p><p>' + txt(x.why) + '</p>';
    if (q.tl) return '<p><strong>' + esc(x.name) + '</strong>: ' + txt(x.when) + '</p>' + tlMini(x) + '<p class="small">' + txt(x.key) + '</p>';
    if (q.via) return '<p><strong>' + esc(q.via.name) + '</strong>' + (q.via.std ? STD : '') + '</p><p>' + esc(q.via.text) + '</p>';
    if (q.baby) {
      return '<p><strong>Apgar ' + q.baby.total + '</strong> (' + esc(apgarBand(q.baby.total).name.toLowerCase()) + STD + ')</p><p class="small">' +
        APGAR.signs.map(function (s, i) { return esc(s.name) + ' ' + q.baby.scores[i]; }).join(' + ') + ' = ' + q.baby.total + '</p>';
    }
    return '<p><strong>' + esc(x.a) + '</strong>' + mk + '</p>';
  }
  function quizRender() {
    if (Q.i >= Q.list.length) return quizDone();
    var q = Q.list[Q.i], st = Q.state;
    var html = '<div class="progress-line"><span>Question ' + (Q.i + 1) + ' of ' + Q.list.length + '</span><span>' + Q.right + ' right</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(Q.i / Q.list.length * 100) + '%"></span></div>' +
      '<div class="panel"><p class="eyebrow">' + esc(groupName(q.item.group)) + '</p>' + (q.block || '') + '<p class="q-prompt">' + q.prompt + '</p>' +
      '<div class="options">' + q.options.map(function (o, i) {
        var cls = 'option';
        if (st) { if (i === q.answer) cls += ' right'; else if (i === st.choice) cls += ' wrong'; }
        return '<button class="' + cls + '" data-opt="' + i + '"' + (st ? ' disabled' : '') + '><span class="key">' + 'ABCD'[i] + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>';
    if (st) {
      html += '<div class="verdict ' + (st.ok ? 'ok' : 'no') + '"><p class="v-title">' + (st.ok ? 'Correct' : 'Not quite') + '</p>' + explainHtml(q) + '</div>' +
        '<div><button class="btn primary big" data-act="next">' + (Q.i + 1 < Q.list.length ? 'Next question' : 'See results') + '</button></div>';
    }
    html += '</div><p class="kbd-hint">Keys: A–D to answer · Enter for next</p>';
    quizEl.innerHTML = html;
    if (st) { var nx = $('[data-act="next"]', quizEl); if (nx) nx.focus({ preventScroll: true }); }
  }
  function quizChoose(choice) {
    var q = Q.list[Q.i];
    Q.state = { ok: choice === q.answer, choice: choice };
    quizRender();
  }
  function quizNext() {
    var q = Q.list[Q.i];
    record(q.item.id, q.stat, Q.state.ok);
    if (Q.state.ok) Q.right++; else Q.missed.push(q);
    Q.i++;
    Q.state = null;
    quizRender();
    window.scrollTo(0, 0);
  }
  function quizDone() {
    var pct = Math.round(Q.right / Q.list.length * 100);
    quizEl.innerHTML =
      '<div class="panel"><p class="eyebrow">Quiz complete</p><p class="score-big">' + pct + '%</p><p class="lede">' + Q.right + ' of ' + Q.list.length + ' right.</p>' +
      '<div class="row">' + (Q.missed.length ? '<button class="btn primary" data-act="retry">Retry the ' + Q.missed.length + ' missed</button>' : '') +
      '<button class="btn" data-act="new">New quiz</button></div></div>' +
      (Q.missed.length ? '<div class="panel"><p class="eyebrow">Review</p><ul class="missed-list">' + Q.missed.map(function (q) {
        return '<li><span>' + (q.stat === 'case' ? esc(q.item.case) : q.baby ? esc(babyText(q.baby)) : q.prompt) + '</span><span class="muted small">Answer: <strong>' + esc(q.options[q.answer]) + '</strong></span></li>';
      }).join('') + '</ul></div>' : '');
  }
  quizEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-seg],[data-opt],[data-area]');
    if (!t) return;
    if (t.dataset.seg) { S[t.dataset.seg] = Number(t.dataset.val); save(); return quizSetup(); }
    if (t.dataset.area) { toggleArea(t.dataset.area); return quizSetup(); }
    if (t.dataset.opt && Q && !Q.state) return quizChoose(Number(t.dataset.opt));
    var act = t.dataset.act;
    if (act === 'areas-all') { S.groups = GROUP_IDS.slice(); save(); return quizSetup(); }
    if (act === 'areas-none') { S.groups = []; save(); return quizSetup(); }
    if (act === 'start') return quizStart(buildQuiz());
    if (act === 'next') return quizNext();
    if (act === 'retry') return quizStart(shuffle(Q.missed.map(function (q) { return Object.assign({}, q, mcFrom(q.options[q.answer], shuffle(q.options))); })));
    if (act === 'new') { Q = null; return quizSetup(); }
  });
  quizEl.addEventListener('change', function (e) {
    var k = e.target.dataset && e.target.dataset.qtopic;
    if (k) { S.quizTopics[k] = e.target.checked; save(); }
  });
  VIEWS.quiz = { show: function () { if (Q) quizRender(); else quizSetup(); } };

  // =====================================================================
  // Timeline drawing
  // =====================================================================
  // The track has three parts: pregnancy (0 to 42 weeks), labor & delivery,
  // and postpartum (0 to 6 weeks).
  function bars(list, max) {
    return (list || []).map(function (b) {
      var l = b[0] / max * 100, w = Math.max((b[1] - b[0]) / max * 100, 1.6);
      return '<span class="tl-bar ' + b[2] + '" style="left:' + l.toFixed(2) + '%;width:' + w.toFixed(2) + '%"></span>';
    }).join('');
  }
  function track(t, week) {
    return '<div class="tl-track">' +
      '<div class="tl-seg preg"><span class="tl-v20"></span><span class="tl-v37"></span>' + bars(t.preg, MAXW) +
      (week != null ? '<span class="tl-now" style="left:' + (week / MAXW * 100).toFixed(2) + '%"></span>' : '') + '</div>' +
      '<div class="tl-seg labor">' + (t.labor ? '<span class="tl-bar ' + t.labor + '" style="left:8%;width:84%"></span>' : '') + '</div>' +
      '<div class="tl-seg pp">' + bars(t.pp, 6) + '</div></div>';
  }
  function axis() {
    var ticks = [0, 10, 20, 30, 40].map(function (w) {
      return '<span style="left:' + (w / MAXW * 100).toFixed(2) + '%">' + w + '</span>';
    }).join('');
    var pp = [0, 2, 4, 6].map(function (w) { return '<span style="left:' + (w / 6 * 100).toFixed(2) + '%">' + w + '</span>'; }).join('');
    return '<div class="tl-track tl-axis" aria-hidden="true"><div class="tl-seg preg">' + ticks + '</div><div class="tl-seg labor"><span style="left:50%">L&amp;D</span></div><div class="tl-seg pp">' + pp + '</div></div>';
  }
  function axisHead() {
    return '<div class="tl-track tl-head" aria-hidden="true"><div class="tl-seg preg"><span class="tri" style="left:0;width:' + (14 / MAXW * 100).toFixed(2) + '%">1st tri</span>' +
      '<span class="tri" style="left:' + (14 / MAXW * 100).toFixed(2) + '%;width:' + (14 / MAXW * 100).toFixed(2) + '%">2nd</span>' +
      '<span class="tri" style="left:' + (28 / MAXW * 100).toFixed(2) + '%;width:' + (14 / MAXW * 100).toFixed(2) + '%">3rd</span></div>' +
      '<div class="tl-seg labor"></div><div class="tl-seg pp"><span class="tri" style="left:0;width:100%">Postpartum</span></div></div>';
  }
  // A one-row timeline for cards and quiz answers.
  function tlMini(t) {
    return '<div class="tl tl-mini">' + axisHead() + track(t) + axis() + '</div>';
  }

  // =====================================================================
  // Learn (reference)
  // =====================================================================
  var learnEl = $('#oview-learn');
  var learnQuery = '';
  var tlSel = null;
  var dStep = 0;
  var apgarPick = [null, null, null, null, null];
  var baby = null, babyPick = null;

  function topicRef(t) {
    return '<details class="ref" data-ref-topic="' + t.id + '"><summary><span class="r-name">' + esc(t.name) + '</span>' + marks(t) + '</summary>' +
      '<div class="ref-body"><p>' + txt(t.about.join(' ')) + '</p><div class="core-grid">' +
      '<div class="span2"><h4>Key points</h4>' + listHtml(t.points) + '</div>' +
      '<div class="span2"><h4>In the field</h4>' + listHtml(t.care) + '</div></div></div></details>';
  }
  function caseRef(c) {
    return '<details class="ref"><summary><span class="r-sub">' + esc(c.case) + '</span>' + marks(c) + '</summary>' +
      '<div class="ref-body"><p><strong>' + esc(c.a) + '</strong></p><p>' + txt(c.why) + '</p></div></details>';
  }

  // ---------- Pregnancy page ----------
  function weekBar(w) {
    return '<div class="wk-bar" aria-hidden="true">' + ST.viability.map(function (v) {
      var l = v.from / (MAXW + 1) * 100, wd = (v.to - v.from + 1) / (MAXW + 1) * 100;
      return '<span class="wk-band ' + v.tone + '" style="left:' + l.toFixed(2) + '%;width:' + wd.toFixed(2) + '%"></span>';
    }).join('') +
      [20, 37].map(function (x) { return '<span class="wk-line" style="left:' + (x / (MAXW + 1) * 100).toFixed(2) + '%"><b>' + x + '</b></span>'; }).join('') +
      '<span class="wk-now" style="left:' + ((w + 0.5) / (MAXW + 1) * 100).toFixed(2) + '%"></span></div>';
  }
  function fundusSvg(w) {
    var f = fundusAt(w);
    var yP = 196, yU = 128, yX = 52;
    var top = w < 12 ? yP + 6 : yP - f.pos * (yP - yX);
    var half = w < 12 ? 16 : 24 + Math.min(1, f.pos) * 30;
    var d = 'M ' + (100 - half) + ' 214 C ' + (100 - half) + ' ' + (top + 24) + ', ' + (100 - half * 0.7) + ' ' + top + ', 100 ' + top +
      ' C ' + (100 + half * 0.7) + ' ' + top + ', ' + (100 + half) + ' ' + (top + 24) + ', ' + (100 + half) + ' 214 Z';
    function mark(y, label) {
      return '<line x1="34" x2="166" y1="' + y + '" y2="' + y + '" class="fd-line"/><text x="172" y="' + (y + 4) + '" class="fd-label">' + label + '</text>';
    }
    return '<svg viewBox="0 0 260 230" class="fundus-svg" role="img" aria-label="Fundal height at ' + w + ' weeks: ' + esc(f.text) + '">' +
      '<path d="M 40 20 Q 30 120 44 222 L 156 222 Q 170 120 160 20" class="fd-body"/>' +
      '<path d="' + d + '" class="fd-uterus"/>' +
      mark(yX, 'Xiphoid') + mark(yU, 'Umbilicus') + mark(yP, 'Pubis') +
      '<circle cx="100" cy="' + yU + '" r="3" class="fd-navel"/></svg>';
  }
  function weekHead(w) {
    var tri = trimesterAt(w), via = viabilityAt(w), lm = lunarAt(w);
    return '<div class="ob-week-head"><div><p class="eyebrow">Week of pregnancy</p><p class="ob-wk">' + w + '<span> wk</span></p></div>' +
      '<div class="ob-week-tags"><span class="pill ' + (via.tone === 'ok' ? 'high' : via.tone === 'mid' ? 'mid' : 'low') + '">' + esc(via.name) + '</span>' +
      '<span class="pill none">' + esc(tri.name) + STD + '</span><span class="pill none">' + (w <= 8 ? 'Embryo' : 'Fetus') + '</span><span class="pill none">Lunar month ' + lm + '</span></div></div>';
  }
  function pregnancyHtml() {
    var w = S.week;
    return '<div class="panel ob-week"><div id="wk-head">' + weekHead(w) + '</div>' +
      '<div class="ob-slider"><button class="btn" data-act="wk-" aria-label="One week earlier">−</button>' +
      '<input type="range" id="ob-week" min="0" max="' + MAXW + '" step="1" value="' + w + '" aria-label="Week of pregnancy"><button class="btn" data-act="wk+" aria-label="One week later">+</button></div>' +
      '<div id="wk-bar">' + weekBar(w) + '</div>' +
      '<div class="row wk-jump">' + [[6, '6'], [12, '12'], [20, '20'], [24, '24'], [28, '28'], [32, '32'], [37, '37'], [40, '40'], [42, '42']].map(function (j) {
        return '<button class="btn link" data-week="' + j[0] + '">' + j[1] + ' wk</button>';
      }).join('') + '</div></div>' +
      '<div id="wk-body">' + weekBody(w) + '</div>' + linesHtml() +
      checkYourself(['pregnancy', 'changes', 'assess'], 'Pregnancy, maternal changes and assessment: terms, facts, scenarios and viability by week.');
  }
  function weekBody(w) {
    var via = viabilityAt(w), lm = lunarAt(w), f = fundusAt(w);
    var miles = ST.milestones.filter(function (m) { return inRange(w, m[0], m[1]); });
    var conds = conditionsAt(w);
    return '' +
      '<div class="ob-grid">' +
      '<div class="panel"><p class="eyebrow">Can this baby survive?</p><p class="ob-via ' + via.tone + '">' + esc(via.name) + (via.std ? STD : '') + '</p><p>' + esc(via.text) + '</p></div>' +
      '<div class="panel"><p class="eyebrow">Development: lunar month ' + lm + ' (weeks ' + (lm * 4 - 3) + '–' + (lm * 4) + ')</p>' + listHtml(ST.lunar[lm - 1]) +
      '<p class="small muted">Box 45-1. A lunar month is 28 days.</p></div>' +
      '<div class="panel fundus-panel"><p class="eyebrow">Fundal height</p>' + fundusSvg(w) + '<p>' + esc(f.text) + (f.std ? STD : '') + '</p></div>' +
      '<div class="panel"><p class="eyebrow">What is happening now</p>' + (miles.length ? '<ul class="items">' + miles.map(function (m) {
        return '<li>' + esc(m[2]) + (m[4] ? STD : '') + '</li>';
      }).join('') + '</ul>' : '<p class="muted">Nothing new this week.</p>') + '</div>' +
      '</div>' +

      '<div class="panel"><p class="eyebrow">Complications possible at ' + w + ' weeks</p>' +
      (conds.length ? '<ul class="ob-conds">' + conds.map(function (c) {
        return '<li class="' + c.level + '"><button class="btn link" data-tl="' + c.t.id + '">' + esc(c.t.name) + '</button><span class="small muted">' + txt(c.t.when) + '</span></li>';
      }).join('') + '</ul>' : '<p class="muted">None on the timeline at this week.</p>') +
      '<p class="small muted">Bold: the usual window. Labor and postpartum problems are on the Complications page.</p></div>' +

      '';
  }
  function linesHtml() {
    return '' +
      '<div class="panel"><p class="eyebrow">The lines to know</p><div class="table-wrap"><table class="grid basics"><tbody>' +
      '<tr><td><strong>8 weeks</strong></td><td>Embryo becomes a fetus</td></tr>' +
      '<tr><td><strong>12 weeks</strong></td><td>Fetal heart tones by Doppler; fundus rises above the pubis</td></tr>' +
      '<tr><td><strong>20 weeks</strong></td><td>Fundus at the umbilicus. Loss before this is an abortion; para counts births after it; perimortem cesarean line; preeclampsia can start</td></tr>' +
      '<tr><td><strong>22–24 weeks' + STD + '</strong></td><td>Edge of viability with NICU care</td></tr>' +
      '<tr><td><strong>29–32 weeks</strong></td><td>Box 45-1: viable if born (8th lunar month)</td></tr>' +
      '<tr><td><strong>37 weeks</strong></td><td>Term. Before this is premature</td></tr>' +
      '<tr><td><strong>42 weeks</strong></td><td>Postterm</td></tr>' +
      '</tbody></table></div><p class="eyebrow">Dating terms</p><div class="table-wrap"><table class="grid basics"><tbody>' +
      ST.dating.map(function (d) { return '<tr><td><strong>' + esc(d[0]) + '</strong>' + (d[2] ? STD : '') + '</td><td>' + esc(d[1]) + '</td></tr>'; }).join('') +
      '</tbody></table></div></div>';
  }

  // ---------- Complications timeline page ----------
  var PHASES = [['all', 'All'], ['preg', 'Pregnancy'], ['labor', 'Labor & delivery'], ['pp', 'Postpartum']];
  function inPhase(t) {
    if (S.tlPhase === 'preg') return !!(t.preg && t.preg.length);
    if (S.tlPhase === 'labor') return !!t.labor;
    if (S.tlPhase === 'pp') return !!(t.pp && t.pp.length);
    return true;
  }
  function tlDetail() {
    var t = null;
    for (var i = 0; i < TL.length; i++) if (TL[i].id === tlSel) t = TL[i];
    if (!t) return '<p class="muted small">Tap a condition to see when it happens and what to do.</p>';
    return '<div class="tl-detail"><p class="neg-name">' + esc(t.name) + marks(t) + '</p><p><strong>When:</strong> ' + txt(t.when) + '</p><p>' + txt(t.key) + '</p>' +
      '<p class="small muted">' + esc(groupName(t.group)) + '</p></div>';
  }
  function timelineHtml() {
    var rows = TL.filter(inPhase);
    return '<div class="panel"><p class="eyebrow">Complications by when they happen</p>' +
      '<p class="small">Each bar is when a condition can occur. <span class="tl-key strong"></span> usual window <span class="tl-key weak"></span> possible. Dashed lines mark 20 and 37 weeks; the red line is the week picked on the Pregnancy page (' + S.week + ').</p>' +
      seg('tlPhase', S.tlPhase, PHASES) +
      '<div class="tl">' + '<div class="tl-row tl-headrow"><span></span>' + axisHead() + '</div>' +
      rows.map(function (t) {
        return '<button class="tl-row' + (t.id === tlSel ? ' sel' : '') + '" data-tl="' + t.id + '"><span class="tl-name">' + esc(t.name) + (t.std ? STD : '') + '</span>' + track(t, S.week) + '</button>';
      }).join('') +
      '<div class="tl-row"><span></span>' + axis() + '</div></div>' +
      '<div id="tl-detail">' + tlDetail() + '</div></div>' +
      '<div class="panel"><p class="eyebrow">Bleeding in pregnancy side by side</p><div class="table-wrap"><table class="grid basics bleed-table"><thead><tr><th></th>' +
      BLEED.cols.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      BLEED.rows.map(function (r) { return '<tr><td><strong>' + esc(r[0]) + '</strong></td>' + r.slice(1).map(function (c) { return '<td>' + txt(c) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div><p class="small muted">Painless and bright red: previa. Painful: abruption. First trimester with shock: ectopic.</p></div>' +
      checkYourself(['antepartum', 'hypertension', 'bleeding', 'postpartum'], 'Antepartum, hypertensive, bleeding and postpartum conditions, including "when can it happen?"', true);
  }

  // ---------- Delivery page ----------
  function deliveryHtml() {
    var s = DEL.steps[dStep];
    return '<div class="panel"><p class="eyebrow">Stages of labor (Box 45-6)</p><div class="stage-cards">' + DEL.stages.map(function (st) {
      return '<div class="stage-card' + (s.stage === st.n ? ' on' : '') + '"><p class="neg-name">' + esc(st.name) + '</p><p class="small">' + esc(st.span) + '</p>' + listHtml(st.times) + '</div>';
    }).join('') + '</div><p class="small muted">Each stage is shorter in a multipara (has delivered before) than a primipara.</p></div>' +

      '<div class="ob-grid"><div class="panel"><p class="eyebrow">Delivery is imminent when</p>' + listHtml(DEL.imminent) + '</div>' +
      '<div class="panel"><p class="eyebrow">OB kit</p>' + listHtml(DEL.kit) + '</div></div>' +

      '<div class="panel" id="del-steps"><p class="eyebrow">Normal delivery, step by step</p>' + stepHtml() + '</div>' +

      '<div class="panel"><p class="eyebrow">Complicated deliveries</p><div class="ref-list">' + DEL.complications.map(function (c) {
        return '<details class="ref"><summary><span class="r-name">' + esc(c.name) + '</span>' + (c.std ? STD : '') + '</summary><div class="ref-body"><div class="core-grid">' +
          '<div><h4>What you see</h4><p>' + txt(c.see) + '</p></div><div><h4>What you do</h4><p>' + txt(c.act) + '</p></div>' +
          (c.risk ? '<div class="span2"><h4>Risks</h4><p>' + esc(c.risk) + '</p></div>' : '') + '</div></div></details>';
      }).join('') + '</div></div>' +
      checkYourself(['delivery', 'complicated'], 'Labor, normal delivery and complicated deliveries.');
  }
  function stepHtml() {
    var s = DEL.steps[dStep], n = DEL.steps.length;
    return '<div class="step-dots" role="group" aria-label="Steps">' + DEL.steps.map(function (x, i) {
      return '<button class="step-dot' + (i === dStep ? ' on' : i < dStep ? ' done' : '') + '" data-step="' + i + '" aria-label="Step ' + (i + 1) + ': ' + esc(x.name) + '">' + (i + 1) + '</button>';
    }).join('') + '</div>' +
      '<div class="step-card"><p class="small muted">Step ' + (dStep + 1) + ' of ' + n + ' · Stage ' + s.stage + '</p><p class="neg-name">' + esc(s.name) + '</p><p>' + txt(s.text) + '</p></div>' +
      '<div class="row"><button class="btn" data-act="step-prev"' + (dStep ? '' : ' disabled') + '>Back</button><button class="btn primary" data-act="step-next"' + (dStep < n - 1 ? '' : ' disabled') + '>Next step</button></div>';
  }

  // ---------- Newborn page ----------
  function apgarCalcHtml() {
    var total = 0, done = 0;
    apgarPick.forEach(function (v) { if (v != null) { total += v; done++; } });
    var b = apgarBand(total);
    return '<div class="apgar">' + APGAR.signs.map(function (s, i) {
      return '<div class="apgar-row"><p class="apgar-sign"><strong>' + s.key + '</strong> ' + esc(s.name) + ' <span class="muted small">(' + esc(s.what) + ')</span></p><div class="apgar-opts">' +
        s.s.map(function (o, v) {
          return '<button class="chip" data-apgar="' + i + ':' + v + '" aria-pressed="' + (apgarPick[i] === v) + '"><b>' + v + '</b> ' + esc(o) + '</button>';
        }).join('') + '</div></div>';
    }).join('') + '</div>' +
      '<div class="apgar-total"><span class="score-big">' + (done ? total : '–') + '</span><span>' + (done === 5 ? '<strong>' + esc(b.name) + '</strong>' + STD + '<br><span class="small">' + esc(b.text) + '</span>' : '<span class="muted small">Pick a score for all five signs (' + done + ' of 5)</span>') + '</span>' +
      '<button class="btn link" data-act="apgar-clear">Clear</button></div>';
  }
  function babyHtml() {
    if (!baby) baby = randomBaby();
    var mc = baby.mc || (baby.mc = apgarOptions(baby.total));
    return '<p class="case ob-case">' + esc(babyText(baby)) + '</p><p class="q-prompt">What is the Apgar score?</p><div class="options">' + mc.options.map(function (o, i) {
      var cls = 'option';
      if (babyPick !== null) { if (i === mc.answer) cls += ' right'; else if (i === babyPick) cls += ' wrong'; }
      return '<button class="' + cls + '" data-baby="' + i + '"' + (babyPick !== null ? ' disabled' : '') + '><span class="key">' + 'ABCD'[i] + '</span><span>' + esc(o) + '</span></button>';
    }).join('') + '</div>' +
      (babyPick !== null ? '<div class="verdict ' + (babyPick === mc.answer ? 'ok' : 'no') + '"><p class="v-title">' + (babyPick === mc.answer ? 'Correct' : 'Not quite') + '</p><p class="small">' +
        APGAR.signs.map(function (s, i) { return esc(s.name) + ' ' + baby.scores[i]; }).join(' + ') + ' = <strong>' + baby.total + '</strong></p></div>' +
        '<div><button class="btn primary" data-act="baby-next">Next baby</button></div>' : '');
  }
  function newbornHtml() {
    return '<div class="panel"><p class="eyebrow">Apgar score (Table 45-3)</p><p class="small muted">Score at 1 and 5 minutes' + STD + '. Tap a box in each row.</p>' + '<div id="apgar-calc">' + apgarCalcHtml() + '</div></div>' +
      '<div class="panel" id="baby-box"><p class="eyebrow">Practice: score this newborn</p><div id="baby-q">' + babyHtml() + '</div></div>' +
      '<div class="panel"><p class="eyebrow">Newborn resuscitation' + STD + '</p><p>' + esc(NRP.first) + '</p><ol class="nrp-steps">' + NRP.steps.map(function (s) {
        return '<li><strong>' + esc(s.at) + '</strong><span>' + esc(s.do) + '</span></li>';
      }).join('') + '</ol>' +
      '<div class="ob-grid"><div><p class="eyebrow">Target preductal SpO2</p><div class="table-wrap"><table class="grid basics"><tbody>' + NRP.spo2.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>'; }).join('') + '</tbody></table></div></div>' +
      '<div><p class="eyebrow">Newborn normals</p><div class="table-wrap"><table class="grid basics"><tbody>' + NRP.vitals.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td>' + txt(r[1]) + '</td></tr>'; }).join('') + '</tbody></table></div></div></div>' +
      '<p class="small muted">From NRP and AHA newborn guidelines, not the Chapter 45 slides. Follow your protocols.</p></div>' +
      '<div class="panel"><p class="eyebrow">Premature newborn (slide 82)</p>' + listHtml(['Born before 37 weeks or under 2.5 kg (5.5 lb)', 'Keep warm and dry; cover the head', 'Suction secretions', 'Humidified free-flow oxygen', 'Watch the cord stump for oozing', 'Protect from contamination', 'Transport mother and newborn']) + '</div>' +
      checkYourself(['newborn'], 'Newborn terms, facts, scenarios and Apgar scoring.');
  }

  // Shared "Check yourself" box at the bottom of each Learn page.
  function checkYourself(groups, text, timeline) {
    return '<div class="panel"><p class="eyebrow">Check yourself</p><p>' + esc(text) + '</p>' +
      '<div class="row"><button class="btn primary" data-act="cy-cards" data-groups="' + groups.join(',') + '"' + (timeline ? ' data-tl-deck="1"' : '') + '>Flashcards</button>' +
      '<button class="btn" data-act="cy-quiz" data-groups="' + groups.join(',') + '">Quiz me</button></div></div>';
  }

  var LEARN_PAGES = [['pregnancy', 'Pregnancy'], ['timeline', 'Complications'], ['delivery', 'Delivery'], ['newborn', 'Newborn'], ['topics', 'Topics'], ['terms', 'Terms'], ['cases', 'Scenarios']];
  var PAGE_HTML = { pregnancy: pregnancyHtml, timeline: timelineHtml, delivery: deliveryHtml, newborn: newbornHtml };

  function learnRender() {
    var page = PAGE_HTML[S.learn];
    learnEl.innerHTML =
      '<div><h2 class="title">Obstetrics</h2><p class="lede">From Chapter 45 (Obstetrics): pregnancy week by week with viability, when each complication can happen, delivery, and newborn care.</p>' +
      '<p class="std-note">* Goes beyond the slides (standard paramedic curriculum). Items tagged' + TN + ' come from the class Drug Box deck. Check with your instructor and protocols.</p></div>' +
      '<div class="ob-learn-seg">' + seg('learn', S.learn, LEARN_PAGES) + '</div>' +
      (page ? '<div id="learn-list" class="ob-page">' + page() + '</div>' :
        '<input type="search" id="learn-q" placeholder="Search…" value="' + esc(learnQuery) + '">' +
        '<div class="ref-list" id="learn-list"></div>');
    if (!page) learnFilter();
  }
  function hay(parts) { return parts.join(' ').toLowerCase(); }
  function learnFilter() {
    var q = learnQuery.toLowerCase().trim();
    var html = GROUPS.map(function (g) {
      var body = '';
      if (S.learn === 'topics') {
        body = TOPICS.filter(function (t) {
          return t.group === g.id && (!q || hay([t.name].concat(t.about, t.points, t.care)).indexOf(q) !== -1);
        }).map(topicRef).join('');
      } else if (S.learn === 'terms') {
        var list = TERMS.filter(function (t) {
          return t.group === g.id && (!q || hay([t.term, t.def]).indexOf(q) !== -1);
        });
        body = list.length ? '<div class="table-wrap"><table class="grid basics"><tbody>' + list.map(function (t) {
          return '<tr><td><strong>' + esc(t.term) + '</strong>' + marks(t) + '</td><td>' + esc(t.def) + '</td></tr>';
        }).join('') + '</tbody></table></div>' : '';
      } else {
        body = CASES.filter(function (c) {
          return c.group === g.id && (!q || hay([c.case, c.a, c.why]).indexOf(q) !== -1);
        }).map(caseRef).join('');
      }
      return body ? '<p class="eyebrow ref-group">' + esc(g.name) + '</p>' + body : '';
    }).join('');
    $('#learn-list', learnEl).innerHTML = html || '<p class="none">Nothing matches that search.</p>';
  }
  function setWeek(w, fromSlider) {
    S.week = Math.max(0, Math.min(MAXW, w)); save();
    $('#wk-head', learnEl).innerHTML = weekHead(S.week);
    $('#wk-bar', learnEl).innerHTML = weekBar(S.week);
    $('#wk-body', learnEl).innerHTML = weekBody(S.week);
    if (!fromSlider) $('#ob-week', learnEl).value = S.week;
  }
  learnEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-seg],[data-act],[data-week],[data-tl],[data-step],[data-apgar],[data-baby]');
    if (!t) return;
    if (t.dataset.seg === 'learn') { S.learn = t.dataset.val; save(); return learnRender(); }
    if (t.dataset.seg === 'tlPhase') { S.tlPhase = t.dataset.val; save(); return learnRender(); }
    if (t.dataset.week) return setWeek(Number(t.dataset.week));
    if (t.dataset.tl) {
      tlSel = t.dataset.tl;
      if (S.learn !== 'timeline') { S.learn = 'timeline'; S.tlPhase = 'all'; save(); learnRender(); var row = $('[data-tl="' + tlSel + '"]', learnEl); if (row) row.scrollIntoView({ block: 'center' }); return; }
      $all('.tl-row[data-tl]', learnEl).forEach(function (r) { r.classList.toggle('sel', r.dataset.tl === tlSel); });
      $('#tl-detail', learnEl).innerHTML = tlDetail();
      return;
    }
    if (t.dataset.step) { dStep = Number(t.dataset.step); $('#del-steps', learnEl).innerHTML = '<p class="eyebrow">Normal delivery, step by step</p>' + stepHtml(); return; }
    if (t.dataset.apgar) {
      var p = t.dataset.apgar.split(':');
      apgarPick[Number(p[0])] = Number(p[1]);
      $('#apgar-calc', learnEl).innerHTML = apgarCalcHtml();
      return;
    }
    if (t.dataset.baby && babyPick === null) {
      babyPick = Number(t.dataset.baby);
      record(APGAR_ITEM.id, 'timing', babyPick === baby.mc.answer);
      $('#baby-q', learnEl).innerHTML = babyHtml();
      return;
    }
    var act = t.dataset.act;
    if (act === 'wk-') return setWeek(S.week - 1);
    if (act === 'wk+') return setWeek(S.week + 1);
    if (act === 'step-prev' || act === 'step-next') {
      dStep = Math.max(0, Math.min(DEL.steps.length - 1, dStep + (act === 'step-next' ? 1 : -1)));
      $('#del-steps', learnEl).innerHTML = '<p class="eyebrow">Normal delivery, step by step</p>' + stepHtml();
      return;
    }
    if (act === 'apgar-clear') { apgarPick = [null, null, null, null, null]; $('#apgar-calc', learnEl).innerHTML = apgarCalcHtml(); return; }
    if (act === 'baby-next') { baby = null; babyPick = null; $('#baby-q', learnEl).innerHTML = babyHtml(); return; }
    if (act === 'cy-cards') {
      S.groups = t.dataset.groups.split(',');
      S.cardDecks = { terms: true, facts: true, cases: true, timeline: !!t.dataset.tlDeck, topics: false };
      save(); showTab('cards'); return cardsStart(buildCards());
    }
    if (act === 'cy-quiz') {
      S.groups = t.dataset.groups.split(',');
      S.quizTopics = { terms: true, facts: true, cases: true, timeline: true, weeks: true, apgar: true };
      save(); showTab('quiz'); return quizStart(buildQuiz());
    }
  });
  learnEl.addEventListener('input', function (e) {
    if (e.target.id === 'learn-q') { learnQuery = e.target.value; learnFilter(); }
    if (e.target.id === 'ob-week') setWeek(Number(e.target.value), true);
  });
  VIEWS.learn = { show: function () { if (!$('#learn-list', learnEl)) learnRender(); } };

  // =====================================================================
  // Stats
  // =====================================================================
  var statsEl = $('#oview-stats');
  var confirmReset = false;
  function tally(list, field, gid) {
    return list.reduce(function (m, x) {
      var s = x.group === gid && S.stats[x.id] && S.stats[x.id][field];
      if (s) { m.c += s.c; m.n += s.c + s.w; }
      return m;
    }, { c: 0, n: 0 });
  }
  function cell(t) {
    if (!t.n) return '<td class="cell"><span class="pill none">–</span></td>';
    var p = t.c / t.n;
    return '<td class="cell"><span class="pill ' + verdictPill(p) + '" title="' + t.c + ' right, ' + (t.n - t.c) + ' wrong">' + Math.round(p * 100) + '%</span></td>';
  }
  var TIMING_ITEMS = TL.concat(VIA_ITEMS, [APGAR_ITEM]);
  function areaRows() {
    return GROUPS.map(function (g) {
      var cols = [tally(TERMS, 'term', g.id), tally(FACTS, 'fact', g.id), tally(CASES, 'case', g.id), tally(TIMING_ITEMS, 'timing', g.id)];
      var all = cols.reduce(function (m, t) { return { c: m.c + t.c, n: m.n + t.n }; }, { c: 0, n: 0 });
      return { g: g, cols: cols, all: all, weak: all.n ? 1 - all.c / all.n : 0.5 };
    });
  }
  function statsRender() {
    var answered = 0, right = 0;
    Object.keys(S.stats).forEach(function (id) {
      Object.keys(S.stats[id]).forEach(function (f) { answered += S.stats[id][f].c + S.stats[id][f].w; right += S.stats[id][f].c; });
    });
    var rows = areaRows().sort(function (a, b) { return b.weak - a.weak; });
    statsEl.innerHTML =
      '<div><h2 class="title">Progress</h2><p class="lede">Weakest areas first. Timing covers "when can it happen?", viability by week and Apgar scoring. Progress is saved in this browser only.</p></div>' +
      '<div class="stats-row"><div class="stat"><div class="n">' + answered + '</div><div class="l">Answers</div></div>' +
      '<div class="stat"><div class="n">' + (answered ? Math.round(right / answered * 100) + '%' : '–') + '</div><div class="l">Accuracy</div></div></div>' +
      '<div class="row"><button class="btn primary" data-act="weak">Study my weakest area</button></div>' +
      '<div class="table-wrap"><table class="grid"><thead><tr><th>Area</th><th style="text-align:center">Terms</th><th style="text-align:center">Facts</th><th style="text-align:center">Scenarios</th><th style="text-align:center">Timing</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td>' + esc(r.g.name) + '</td>' + r.cols.map(cell).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>' +
      '<div class="row">' + (confirmReset
        ? '<span class="muted">Erase all OB progress?</span><button class="btn bad" data-act="reset-yes">Erase</button><button class="btn" data-act="reset-no">Keep it</button>'
        : '<button class="btn link" data-act="reset">Reset progress</button>') + '</div>';
  }
  statsEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    var act = t.dataset.act;
    if (act === 'weak') {
      var weakest = areaRows().sort(function (a, b) { return b.weak - a.weak; })[0];
      S.groups = [weakest.g.id];
      S.cardDecks = { terms: true, facts: true, cases: true, timeline: true, topics: false };
      save(); C = null;
      showTab('cards');
      return cardsStart(buildCards());
    }
    if (act === 'reset') confirmReset = true;
    if (act === 'reset-no') confirmReset = false;
    if (act === 'reset-yes') { S.stats = {}; save(); confirmReset = false; }
    statsRender();
  });
  VIEWS.stats = { show: statsRender };

  // ---------- Keyboard shortcuts ----------
  document.addEventListener('keydown', function (e) {
    if (document.body.dataset.subject !== 'ob') return;
    var tag = (e.target.tagName || '').toLowerCase();
    var typing = tag === 'input' || tag === 'textarea' || tag === 'select';
    var idx = 'abcd'.indexOf((e.key || '').toLowerCase());
    if (S.tab === 'cards' && C && C.queue.length && !typing) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!C.flipped) { C.flipped = true; cardsRender(); } }
      else if (C.flipped && e.key === '1') cardAnswer(false);
      else if (C.flipped && e.key === '2') cardAnswer(true);
    } else if (S.tab === 'quiz' && Q && Q.i < Q.list.length) {
      var q = Q.list[Q.i];
      if (!Q.state && !typing && idx !== -1 && idx < q.options.length) quizChoose(idx);
      else if (Q.state && e.key === 'Enter' && tag !== 'button') { e.preventDefault(); quizNext(); }
    }
  });

  window.OBBox = { show: function () { showTab(VIEWS[S.tab] ? S.tab : 'learn'); } };
})();
