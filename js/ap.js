/* Anatomy & Physiology (Chapter 10, Review of Human Systems): a blood-flow
   overview with every body system on one page, reference by system,
   flashcards, quiz and stats over window.AP_* data. The subject switch in
   cardio.js calls window.APBox.show(). */
(function () {
  'use strict';

  var GROUPS = window.AP_GROUPS;
  var TOPICS = window.AP_TOPICS;
  var TERMS = window.AP_TERMS;
  var FACTS = window.AP_FACTS;
  var NORMALS = window.AP_NORMALS;
  var CASES = window.AP_SCENARIOS;
  var FLOW = window.AP_FLOW;
  // "What comes next?" items, one per step of the route (the loop wraps around).
  var FLOWQ = FLOW.steps.map(function (st, i) {
    var next = FLOW.steps[(i + 1) % FLOW.steps.length];
    return { id: 'flow-' + i, group: 'cv', from: st.name, a: next.name, why: next.text };
  });
  var FLOW_NAMES = FLOW.steps.map(function (st) { return st.name; });
  var GROUP_IDS = GROUPS.map(function (g) { return g.id; });

  // Stable ids for stats: terms and normals by name, facts by position.
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  TERMS.forEach(function (t) { t.id = 'term-' + slug(t.term); });
  FACTS.forEach(function (f, i) { f.id = 'fact-' + i; });
  NORMALS.forEach(function (n) { n.id = 'norm-' + slug(n.name); });

  // ---------- Saved state ----------
  var KEY = 'mscc-ap-v1';
  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  var S = Object.assign({
    tab: 'learn',
    groups: GROUP_IDS.slice(),
    cardDecks: { flow: true, terms: true, facts: true, normals: false, cases: false, topics: false },
    cardDir: 'forward',
    quizLen: 20,
    quizTopics: { flow: true, terms: true, facts: true, normals: true, cases: true },
    learn: 'overview',
    stats: {}
  }, loadSaved());
  S.groups = S.groups.filter(function (g) { return GROUP_IDS.indexOf(g) !== -1; });
  if (S.cardDecks.flow === undefined) S.cardDecks.flow = true;
  if (S.quizTopics.flow === undefined) S.quizTopics.flow = true;

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
    return '<ul class="items">' + list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
  }
  function band(title, meta, hidden) {
    if (hidden) return '<div class="label-band hidden-name ap"><span class="label-name">? ? ?</span><span class="label-meta">' + esc(meta || 'Which one?') + '</span></div>';
    return '<div class="label-band ap"><span class="label-name">' + esc(title) + '</span><span class="label-meta">' + esc(meta || '') + '</span></div>';
  }
  function groupName(id) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].id === id) return GROUPS[i].name;
    return '';
  }
  var STD = ' <span class="std-mark" title="Goes beyond the Chapter 10 slides">*</span>';
  function verdictPill(p) { return p >= 0.8 ? 'high' : p >= 0.5 ? 'mid' : 'low'; }
  function inGroups(x) { return S.groups.indexOf(x.group) !== -1; }

  function mcFrom(correct, pool) {
    var opts = [correct];
    pool.forEach(function (p) { if (opts.length < 4 && opts.indexOf(p) === -1) opts.push(p); });
    var s = shuffle(opts);
    return { options: s, answer: s.indexOf(correct) };
  }
  // Wrong terms (or definitions) for a term: same system first, then the rest.
  function termPool(t, key) {
    var same = TERMS.filter(function (o) { return o !== t && o.group === t.group; });
    var rest = TERMS.filter(function (o) { return o !== t && o.group !== t.group; });
    return shuffle(same).concat(shuffle(rest)).map(function (o) { return o[key]; });
  }
  function areaChips() {
    return '<div class="field-row"><p class="eyebrow">Body systems</p><div class="chips">' + GROUPS.map(function (g) {
      return '<button class="chip" data-area="' + g.id + '" aria-pressed="' + (S.groups.indexOf(g.id) !== -1) + '">' + esc(g.name) + '</button>';
    }).join('') + '</div><div class="row"><button class="btn link" data-act="areas-all">All systems</button><button class="btn link" data-act="areas-none">Clear</button></div></div>';
  }
  function toggleArea(id) {
    var i = S.groups.indexOf(id);
    if (i === -1) S.groups.push(id); else S.groups.splice(i, 1);
    save();
  }

  // ---------- Tabs ----------
  var VIEWS = {};
  function showTab(tab) {
    S.tab = tab; save();
    $all('#subj-ap .tab').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.atab === tab)); });
    $all('#subj-ap .view').forEach(function (v) { v.hidden = v.id !== 'aview-' + tab; });
    VIEWS[tab].show();
  }
  $all('#subj-ap .tab').forEach(function (b) {
    b.addEventListener('click', function () { showTab(b.dataset.atab); });
  });

  // =====================================================================
  // Flashcards
  // =====================================================================
  var cardsEl = $('#aview-cards');
  var C = null;
  var DECKS = [
    ['flow', 'Blood flow', 'Where does the blood go next?'],
    ['terms', 'Terms', 'Medial, preload, surfactant, glomerulus…'],
    ['facts', 'Key facts', 'Short questions on structure and function'],
    ['normals', 'Normal values', 'Vital signs, labs and volumes'],
    ['cases', 'Applied', 'What is going on in this patient\'s body?'],
    ['topics', 'Topic key points', 'List the key points of each topic']
  ];
  function dirFor() { return S.cardDir === 'mixed' ? (Math.random() < 0.5 ? 'forward' : 'reverse') : S.cardDir; }

  function buildCards() {
    var list = [], d = S.cardDecks;
    if (d.flow) FLOWQ.filter(inGroups).forEach(function (f) { list.push({ kind: 'flow', id: f.id, item: f, field: 'fact' }); });
    if (d.terms) TERMS.filter(inGroups).forEach(function (t) { list.push({ kind: 'term', id: t.id, item: t, field: 'term', dir: dirFor() }); });
    if (d.facts) FACTS.filter(inGroups).forEach(function (f) { list.push({ kind: 'fact', id: f.id, item: f, field: 'fact' }); });
    if (d.normals) NORMALS.filter(inGroups).forEach(function (n) { list.push({ kind: 'normal', id: n.id, item: n, field: 'fact' }); });
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
    var x = card.item, g = groupName(x.group);
    var hint = '<p class="hint">Tap to flip</p>';
    if (card.kind === 'term') {
      if (card.dir === 'reverse') {
        return band(x.term, g, !flipped) + '<div class="card-body"><p class="answer">' + esc(x.def) + '</p>' +
          (flipped ? '' : '<p class="hint">Which term? Tap to flip</p>') + '</div>';
      }
      return band(x.term, g) + '<div class="card-body"><p class="ask">What does it mean?</p>' +
        (flipped ? '<hr class="divider"><p class="answer">' + esc(x.def) + '</p>' : hint) + '</div>';
    }
    if (card.kind === 'fact') {
      return band('Key fact', g) + '<div class="card-body"><p class="ask">' + esc(x.q) + '</p>' +
        (flipped ? '<hr class="divider"><p class="answer">' + esc(x.a) + '</p>' : hint) + '</div>';
    }
    if (card.kind === 'flow') {
      return band('Blood flow', g) + '<div class="card-body"><p class="ask">After the ' + esc(x.from.toLowerCase()) + ', where does the blood go next?</p>' +
        (flipped ? '<hr class="divider"><p class="answer">' + esc(x.a) + '</p><p class="small">' + esc(x.why) + '</p>' : hint) + '</div>';
    }
    if (card.kind === 'normal') {
      return band('Normal value', g) + '<div class="card-body"><p class="ask">' + esc(x.name) + '?</p>' +
        (flipped ? '<hr class="divider"><p class="answer">' + esc(x.value) + '</p>' + (x.note ? '<p class="small">' + esc(x.note) + '</p>' : '') : hint) + '</div>';
    }
    if (card.kind === 'case') {
      return band('Applied', g) + '<div class="card-body"><p class="ap-case">' + esc(x.case) + '</p>' +
        (flipped ? '<hr class="divider"><p class="answer">' + esc(x.a) + '</p><p class="small">' + esc(x.why) + '</p>' : hint) + '</div>';
    }
    return band(x.name, g) + '<div class="card-body"><p class="ask">Key points?</p>' +
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
  // Quiz
  // =====================================================================
  var quizEl = $('#aview-quiz');
  var Q = null;
  var QTOPICS = [['flow', 'Blood flow'], ['terms', 'Terms'], ['facts', 'Key facts'], ['normals', 'Normal values'], ['cases', 'Applied']];

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
    flow: function (pool) {
      var f = pick(pool), mc = mcFrom(f.a, shuffle(FLOW_NAMES.filter(function (n) { return n !== f.from; })));
      return { item: f, stat: 'fact', flow: true, prompt: 'After the <q>' + esc(f.from.toLowerCase()) + '</q>, where does the blood go next?', options: mc.options, answer: mc.answer };
    },
    normals: function (pool) {
      var n = pick(pool), mc = mcFrom(n.value, shuffle(n.wrong));
      return { item: n, stat: 'fact', normal: true, prompt: 'What is the normal adult value for <q>' + esc(n.name) + '</q>?', options: mc.options, answer: mc.answer };
    },
    cases: function (pool) {
      var c = pick(pool), mc = mcFrom(c.a, shuffle(c.wrong));
      return { item: c, stat: 'case', block: '<p class="ap-case">' + esc(c.case) + '</p>', prompt: 'What is the best answer?', options: mc.options, answer: mc.answer };
    }
  };
  var QSRC = { flow: FLOWQ, terms: TERMS, facts: FACTS, normals: NORMALS, cases: CASES };

  function buildQuiz() {
    var topics = QTOPICS.map(function (k) { return k[0]; }).filter(function (k) {
      return S.quizTopics[k] && QSRC[k].some(inGroups);
    });
    if (!topics.length) return [];
    var out = [], seen = {};
    for (var i = 0; out.length < S.quizLen && i < S.quizLen * 10; i++) {
      var k = pick(topics), q = QGEN[k](QSRC[k].filter(inGroups));
      var key = q.item.id + q.prompt;
      if (seen[key]) continue;
      seen[key] = true;
      out.push(q);
    }
    return out;
  }
  function quizSetup(error) {
    quizEl.innerHTML =
      '<div><h2 class="title">Quiz</h2><p class="lede">Multiple-choice questions on blood flow, terms, key facts, normal values and applied cases, from the body systems you pick.</p></div>' +
      '<div class="panel"><div class="field-row"><p class="eyebrow">Questions</p>' + seg('quizLen', S.quizLen, [[10, '10'], [20, '20'], [40, '40']]) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Question types</p><div class="row">' + QTOPICS.map(function (k) {
        return '<label class="check"><input type="checkbox" data-qtopic="' + k[0] + '"' + (S.quizTopics[k[0]] ? ' checked' : '') + '> ' + esc(k[1]) + '</label>';
      }).join('') + '</div></div>' + areaChips() +
      (error ? '<p class="error">' + esc(error) + '</p>' : '') +
      '<div><button class="btn primary big" data-act="start">Start quiz</button></div></div>';
  }
  function quizStart(list) {
    if (!list.length) return quizSetup('Pick at least one question type and one body system.');
    Q = { list: list, i: 0, right: 0, missed: [], state: null };
    quizRender();
  }
  function explainHtml(q) {
    var x = q.item;
    if (q.stat === 'term') return '<p><strong>' + esc(x.term) + '</strong>: ' + esc(x.def) + '</p>';
    if (q.stat === 'case') return '<p><strong>' + esc(x.a) + '</strong></p><p>' + esc(x.why) + '</p>';
    if (q.flow) return '<p><strong>' + esc(x.a) + '</strong></p><p>' + esc(x.why) + '</p>';
    if (q.normal) return '<p><strong>' + esc(x.name) + '</strong>: ' + esc(x.value) + '</p>' + (x.note ? '<p>' + esc(x.note) + '</p>' : '');
    return '<p><strong>' + esc(x.a) + '</strong></p>';
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
        return '<li><span>' + (q.stat === 'case' ? esc(q.item.case) : q.prompt) + '</span><span class="muted small">Answer: <strong>' + esc(q.options[q.answer]) + '</strong></span></li>';
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
  // Learn (reference)
  // =====================================================================
  var learnEl = $('#aview-learn');
  var learnQuery = '';
  function hay(parts) { return parts.join(' ').toLowerCase(); }
  function topicRef(t) {
    return '<details class="ref"><summary><span class="r-name">' + esc(t.name) + '</span>' + (t.std ? STD : '') + '</summary>' +
      '<div class="ref-body"><p>' + esc(t.about.join(' ')) + '</p><div class="core-grid">' +
      '<div class="span2"><h4>Key points</h4>' + listHtml(t.points) + '</div>' +
      '<div class="span2"><h4>In the field</h4>' + listHtml(t.field) + '</div></div></div></details>';
  }
  function caseRef(c) {
    return '<details class="ref"><summary><span class="r-sub">' + esc(c.case) + '</span></summary>' +
      '<div class="ref-body"><p><strong>' + esc(c.a) + '</strong></p><p>' + esc(c.why) + '</p></div></details>';
  }
  function rowsTable(rows) {
    return '<div class="table-wrap"><table class="grid basics"><tbody>' + rows.join('') + '</tbody></table></div>';
  }

  // ---------- Overview: blood flow, then every body system ----------
  var flowI = 0;
  var order = null; // "put it in order" drill: { chips: shuffled step indexes, done: steps placed, miss: last wrong tap }
  // Schematic of the loop; the patient's right side is on the viewer's left.
  // Part ids are the ones AP_FLOW steps list in "on".
  function flowSvg(on) {
    function cls(id, extra) { return 'ap-part ' + extra + (on.indexOf(id) !== -1 ? ' on' : ''); }
    return '<svg class="ap-loop" viewBox="0 0 320 424" role="img" aria-label="Blood flow: body, venae cavae, right atrium, right ventricle, pulmonary arteries, lungs, pulmonary veins, left atrium, left ventricle, aorta, back to the body">' +
      '<defs><marker id="ap-arrow-poor" viewBox="0 0 10 10" refX="6" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0L10 5L0 10z" class="ap-tip poor"/></marker>' +
      '<marker id="ap-arrow-rich" viewBox="0 0 10 10" refX="6" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0L10 5L0 10z" class="ap-tip rich"/></marker></defs>' +
      '<g class="' + cls('lungs', 'ap-organ') + '"><rect x="70" y="10" width="180" height="66" rx="30"/>' +
      '<path class="ap-cap" d="M96 60 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0"/>' +
      '<text x="160" y="38" class="ap-lbl">Lungs</text></g>' +
      '<path class="' + cls('pa', 'ap-vessel poor') + '" d="M140 246 H160 V84" marker-end="url(#ap-arrow-poor)"/>' +
      '<path class="' + cls('pvn', 'ap-vessel rich') + '" d="M250 43 H284 V180 H268" marker-end="url(#ap-arrow-rich)"/>' +
      '<path class="' + cls('ao', 'ap-vessel rich') + '" d="M260 262 H292 V384 H268" marker-end="url(#ap-arrow-rich)"/>' +
      '<path class="' + cls('vc', 'ap-vessel poor') + '" d="M60 384 H28 V180 H52" marker-end="url(#ap-arrow-poor)"/>' +
      '<g class="' + cls('ra', 'ap-ch poor') + '"><rect x="60" y="150" width="80" height="60" rx="8"/><text x="100" y="185" class="ap-lbl">RA</text></g>' +
      '<g class="' + cls('rv', 'ap-ch poor') + '"><rect x="60" y="216" width="80" height="78" rx="8"/><text x="100" y="260" class="ap-lbl">RV</text></g>' +
      '<g class="' + cls('la', 'ap-ch rich') + '"><rect x="180" y="150" width="80" height="60" rx="8"/><text x="220" y="185" class="ap-lbl">LA</text></g>' +
      '<g class="' + cls('lv', 'ap-ch rich') + '"><rect x="180" y="216" width="80" height="78" rx="8" class="thick"/><text x="220" y="260" class="ap-lbl">LV</text></g>' +
      '<line class="' + cls('tri', 'ap-valve') + '" x1="78" y1="213" x2="122" y2="213"/>' +
      '<line class="' + cls('mit', 'ap-valve') + '" x1="198" y1="213" x2="242" y2="213"/>' +
      '<line class="' + cls('pvalve', 'ap-valve') + '" x1="150" y1="238" x2="150" y2="254"/>' +
      '<line class="' + cls('avalve', 'ap-valve') + '" x1="274" y1="254" x2="274" y2="270"/>' +
      '<text x="100" y="140" class="ap-sub">Right heart</text><text x="220" y="140" class="ap-sub">Left heart</text>' +
      '<text x="166" y="120" class="ap-sub start">PA</text><text x="278" y="120" class="ap-sub end">PV</text>' +
      '<text x="286" y="330" class="ap-sub end">Aorta</text><text x="34" y="330" class="ap-sub start">VC</text>' +
      '<g class="' + cls('body', 'ap-organ') + '"><rect x="60" y="352" width="200" height="64" rx="12"/>' +
      '<path class="ap-cap" d="M84 404 q8 -8 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0"/>' +
      '<text x="160" y="380" class="ap-lbl">Body tissues</text></g>' +
      '</svg>';
  }
  function o2Class(o2) { return o2 === 'rich' ? 'rich' : o2 === 'poor' ? 'poor' : 'mixed'; }
  function stepHtml() {
    var st = FLOW.steps[flowI];
    return '<p class="small muted">Step ' + (flowI + 1) + ' of ' + FLOW.steps.length + '</p>' +
      '<p class="ap-step-name">' + esc(st.name) + '</p>' +
      '<p class="ap-tags"><span class="ap-tag">' + (st.circuit === 'heart' ? 'In the heart' : st.circuit === 'pulmonary' ? 'Pulmonary circuit' : 'Systemic circuit') + '</span>' +
      '<span class="ap-tag ' + o2Class(st.o2) + '">Oxygen-' + esc(st.o2) + '</span></p>' +
      '<p>' + esc(st.text) + '</p>' +
      '<div class="row"><button class="btn" data-act="flow-prev">Back</button><button class="btn primary" data-act="flow-next">Next step</button></div>';
  }
  function flowBoxHtml() {
    return '<div class="ap-flow"><div class="ap-flow-fig">' + flowSvg(FLOW.steps[flowI].on) +
      '<p class="small muted ap-key"><span class="ap-dot poor"></span>Oxygen-poor <span class="ap-dot rich"></span>Oxygen-rich · patient\'s right is on the left</p></div>' +
      '<div class="ap-flow-text">' + stepHtml() + '<ol class="ap-steps">' + FLOW.steps.map(function (st, i) {
        return '<li><button class="ap-step-btn" data-step="' + i + '" aria-current="' + (i === flowI) + '">' + esc(st.name) + '</button></li>';
      }).join('') + '</ol></div></div>';
  }
  function orderHtml() {
    if (!order) order = { chips: shuffle(FLOW.steps.map(function (st, i) { return i; }).slice(1)), done: 1, miss: null };
    var finished = order.done >= FLOW.steps.length;
    return '<p class="eyebrow">Put it in order</p><p>Start in the body capillaries and tap each stop in order.</p>' +
      '<ol class="ap-order">' + FLOW.steps.slice(0, order.done).map(function (st) { return '<li>' + esc(st.name) + '</li>'; }).join('') + '</ol>' +
      (finished
        ? '<div class="verdict ok"><p class="v-title">Full loop</p><p>From the arterioles it is back to the body capillaries.</p></div><div><button class="btn" data-act="order-new">Again</button></div>'
        : '<div class="chips">' + order.chips.filter(function (i) { return i >= order.done; }).map(function (i) {
          return '<button class="chip" data-order="' + i + '">' + esc(FLOW.steps[i].name) + '</button>';
        }).join('') + '</div>' + (order.miss !== null ? '<p class="error">Not yet: ' + esc(FLOW.steps[order.miss].name) + ' comes later.</p>' : ''));
  }
  function overviewHtml() {
    return '<div class="panel"><p class="eyebrow">How blood moves</p><p>' + esc(FLOW.summary) + '</p><div id="ap-flow-box">' + flowBoxHtml() + '</div></div>' +
      '<div class="panel"><p class="eyebrow">Two circuits</p><div class="table-wrap"><table class="grid basics"><thead><tr><th></th><th>Pulmonary</th><th>Systemic</th></tr></thead><tbody>' +
      FLOW.compare.map(function (r) { return '<tr><td><strong>' + esc(r[0]) + '</strong></td><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td></tr>'; }).join('') +
      '</tbody></table></div></div>' +
      '<div class="panel"><p class="eyebrow">The vessels, in order</p><ol class="ap-chain">' + FLOW.vessels.map(function (v) {
        return '<li><strong>' + esc(v[0]) + '</strong> <span class="small muted">' + esc(v[1]) + '</span></li>';
      }).join('') + '</ol></div>' +
      '<div class="panel" id="ap-order-box">' + orderHtml() + '</div>' +
      '<div class="panel"><p class="eyebrow">Check yourself</p><p>Blood flow plus everything in the circulatory system.</p>' +
      '<div class="row"><button class="btn primary" data-act="flow-cards">Flashcards</button><button class="btn" data-act="flow-quiz">Quiz me</button></div></div>' +
      '<div><h3 class="title ap-h3">All body systems</h3><p class="lede">Every system from the chapter in one place. Tap one to open its topics.</p></div>' +
      '<div class="ap-sys-grid">' + GROUPS.map(function (g) {
        return '<button class="ap-sys" data-sys="' + g.id + '"><span class="ap-sys-name">' + esc(g.name) + '</span><span class="ap-sys-does">' + esc(g.does) + '</span>' +
          '<span class="small muted">' + esc(g.organs) + '</span></button>';
      }).join('') + '</div>';
  }

  function learnRender() {
    var ov = S.learn === 'overview';
    learnEl.innerHTML =
      '<div><h2 class="title">Anatomy &amp; physiology</h2><p class="lede">From Chapter 10 (Review of Human Systems). Start with how blood moves through the heart and body, then every body system in one place.</p>' +
      '<p class="std-note">* Goes beyond the slides (standard paramedic curriculum). Normal values and applied cases are extra practice.</p></div>' +
      seg('learn', S.learn, [['overview', 'Overview'], ['topics', 'Systems'], ['terms', 'Terms'], ['normals', 'Normals'], ['cases', 'Applied']]) +
      (ov ? '<div id="learn-list" class="ap-overview">' + overviewHtml() + '</div>'
        : '<input type="search" id="learn-q" placeholder="Search…" value="' + esc(learnQuery) + '">' +
          '<div class="ref-list" id="learn-list"></div>');
    if (!ov) learnFilter();
  }
  function learnFilter() {
    var q = learnQuery.toLowerCase().trim();
    var html = GROUPS.map(function (g) {
      var body = '';
      if (S.learn === 'topics') {
        body = TOPICS.filter(function (t) {
          return t.group === g.id && (!q || hay([t.name].concat(t.aliases, t.about, t.points, t.field)).indexOf(q) !== -1);
        }).map(topicRef).join('');
      } else if (S.learn === 'terms') {
        var list = TERMS.filter(function (t) {
          return t.group === g.id && (!q || hay([t.term, t.def].concat(t.aliases || [])).indexOf(q) !== -1);
        });
        body = list.length ? rowsTable(list.map(function (t) {
          return '<tr><td><strong>' + esc(t.term) + '</strong></td><td>' + esc(t.def) + '</td></tr>';
        })) : '';
      } else if (S.learn === 'normals') {
        var norms = NORMALS.filter(function (n) {
          return n.group === g.id && (!q || hay([n.name, n.value, n.note || '']).indexOf(q) !== -1);
        });
        body = norms.length ? rowsTable(norms.map(function (n) {
          return '<tr><td><strong>' + esc(n.name) + '</strong></td><td><span class="ap-val">' + esc(n.value) + '</span>' +
            (n.note ? '<br><span class="small muted">' + esc(n.note) + '</span>' : '') + '</td></tr>';
        })) : '';
      } else {
        body = CASES.filter(function (c) {
          return c.group === g.id && (!q || hay([c.case, c.a, c.why]).indexOf(q) !== -1);
        }).map(caseRef).join('');
      }
      return body ? '<p class="eyebrow ref-group" id="ap-g-' + g.id + '">' + esc(g.name) + '</p>' + body : '';
    }).join('');
    if (S.learn === 'normals' && html) html = '<p class="small muted">Normal adult values. Ranges differ a little between textbooks and labs.</p>' + html;
    $('#learn-list', learnEl).innerHTML = html || '<p class="none">Nothing matches that search.</p>';
  }
  function flowStep(i) {
    flowI = (i + FLOW.steps.length) % FLOW.steps.length;
    $('#ap-flow-box', learnEl).innerHTML = flowBoxHtml();
  }
  learnEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-seg],[data-act],[data-step],[data-order],[data-sys]');
    if (!t) return;
    if (t.dataset.seg) { S.learn = t.dataset.val; save(); return learnRender(); }
    if (t.dataset.step) return flowStep(Number(t.dataset.step));
    if (t.dataset.order) {
      var i = Number(t.dataset.order);
      if (i === order.done) { order.done++; order.miss = null; } else order.miss = i;
      $('#ap-order-box', learnEl).innerHTML = orderHtml();
      return;
    }
    if (t.dataset.sys) {
      S.learn = 'topics'; learnQuery = ''; save(); learnRender();
      var h = $('#ap-g-' + t.dataset.sys, learnEl);
      if (h) h.scrollIntoView({ block: 'start' });
      return;
    }
    var act = t.dataset.act;
    if (act === 'flow-next') return flowStep(flowI + 1);
    if (act === 'flow-prev') return flowStep(flowI - 1);
    if (act === 'order-new') { order = null; $('#ap-order-box', learnEl).innerHTML = orderHtml(); return; }
    if (act === 'flow-cards') {
      S.groups = ['cv'];
      S.cardDecks = { flow: true, terms: true, facts: true, normals: false, cases: true, topics: false };
      save(); C = null; showTab('cards'); return cardsStart(buildCards());
    }
    if (act === 'flow-quiz') {
      S.groups = ['cv'];
      S.quizTopics = { flow: true, terms: true, facts: true, normals: true, cases: true };
      save(); showTab('quiz'); return quizStart(buildQuiz());
    }
  });
  learnEl.addEventListener('input', function (e) {
    if (e.target.id === 'learn-q') { learnQuery = e.target.value; learnFilter(); }
  });
  VIEWS.learn = { show: function () { if (!$('#learn-list', learnEl)) learnRender(); } };

  // =====================================================================
  // Stats
  // =====================================================================
  var statsEl = $('#aview-stats');
  var confirmReset = false;
  // Right and total answers for one system and one kind of item.
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
  function areaRows() {
    return GROUPS.map(function (g) {
      var cols = [tally(TERMS, 'term', g.id), tally(FACTS.concat(NORMALS, FLOWQ), 'fact', g.id), tally(CASES, 'case', g.id)];
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
      '<div><h2 class="title">Progress</h2><p class="lede">Weakest body systems first. Progress is saved in this browser only.</p></div>' +
      '<div class="stats-row"><div class="stat"><div class="n">' + answered + '</div><div class="l">Answers</div></div>' +
      '<div class="stat"><div class="n">' + (answered ? Math.round(right / answered * 100) + '%' : '–') + '</div><div class="l">Accuracy</div></div></div>' +
      '<div class="row"><button class="btn primary" data-act="weak">Study my weakest system</button></div>' +
      '<div class="table-wrap"><table class="grid"><thead><tr><th>System</th><th style="text-align:center">Terms</th><th style="text-align:center">Facts</th><th style="text-align:center">Applied</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td>' + esc(r.g.name) + '</td>' + r.cols.map(cell).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>' +
      '<p class="small muted">Facts include normal values and blood flow (under Circulatory).</p>' +
      '<div class="row">' + (confirmReset
        ? '<span class="muted">Erase all A&amp;P progress?</span><button class="btn bad" data-act="reset-yes">Erase</button><button class="btn" data-act="reset-no">Keep it</button>'
        : '<button class="btn link" data-act="reset">Reset progress</button>') + '</div>';
  }
  statsEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    var act = t.dataset.act;
    if (act === 'weak') {
      var weakest = areaRows().sort(function (a, b) { return b.weak - a.weak; })[0];
      S.groups = [weakest.g.id];
      S.cardDecks = { flow: true, terms: true, facts: true, normals: true, cases: true, topics: false };
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
    if (document.body.dataset.subject !== 'ap') return;
    var tag = (e.target.tagName || '').toLowerCase();
    var typing = tag === 'input' || tag === 'textarea' || tag === 'select';
    var idx = 'abcd'.indexOf((e.key || '').toLowerCase());
    if (S.tab === 'learn' && S.learn === 'overview' && !typing && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      flowStep(flowI + (e.key === 'ArrowRight' ? 1 : -1));
    } else if (S.tab === 'cards' && C && C.queue.length && !typing) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!C.flipped) { C.flipped = true; cardsRender(); } }
      else if (C.flipped && e.key === '1') cardAnswer(false);
      else if (C.flipped && e.key === '2') cardAnswer(true);
    } else if (S.tab === 'quiz' && Q && Q.i < Q.list.length) {
      var q = Q.list[Q.i];
      if (!Q.state && !typing && idx !== -1 && idx < q.options.length) quizChoose(idx);
      else if (Q.state && e.key === 'Enter' && tag !== 'button') { e.preventDefault(); quizNext(); }
    }
  });

  window.APBox = { show: function () { showTab(VIEWS[S.tab] ? S.tab : 'learn'); } };
})();
