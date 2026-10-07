/* Pathophysiology: reference, flashcards, quiz, ABG practice and stats over
   window.PATHO_* data and window.ABG. The subject switch (cardio.js) calls
   window.Patho.show() when this subject is opened. */
(function () {
  'use strict';

  var TOPICS = window.PATHO_TOPICS;
  var GROUPS = window.PATHO_GROUPS;
  var FACTS = window.PATHO_FACTS;
  var SHOCK = window.PATHO_SHOCK;
  var ABG = window.ABG;
  var G = window.Grading;
  var T_BY = {};
  TOPICS.forEach(function (t) { T_BY[t.id] = t; });

  var FIELDS = [['about', 'About'], ['patho', 'How it happens'], ['signs', 'Signs & findings'], ['care', 'In the field']];

  // ---------- Saved state ----------
  var KEY = 'mscc-patho-v1';
  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  var S = Object.assign({
    tab: 'learn',
    learn: 'topics',
    cardDecks: { topics: true, facts: true, abg: false },
    cardGroups: GROUPS.reduce(function (m, g) { m[g.id] = true; return m; }, {}),
    cardDir: 'forward',
    quizLen: 20,
    quizTopics: GROUPS.reduce(function (m, g) { m[g.id] = true; return m; }, { facts: true, abg: true }),
    stats: {}
  }, loadSaved());

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
    if (!list || !list.length) return '<p class="none">Nothing listed</p>';
    return '<ul class="items">' + list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
  }
  function band(title, meta, hidden) {
    if (hidden) return '<div class="label-band cell hidden-name"><span class="label-name">? ? ?</span><span class="label-meta">' + esc(meta || 'Which one?') + '</span></div>';
    return '<div class="label-band cell"><span class="label-name">' + esc(title) + '</span><span class="label-meta">' + esc(meta || '') + '</span></div>';
  }
  function groupName(id) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].id === id) return GROUPS[i].name;
    return '';
  }
  function fieldName(f) { return FIELDS.filter(function (x) { return x[0] === f; })[0][1]; }
  function verdictPill(p) { return p >= 0.8 ? 'high' : p >= 0.5 ? 'mid' : 'low'; }
  function same(a, b) { return a === b || (G && G.sameItem ? G.sameItem(a, b) : false); }

  // Up to 3 distinct wrong answers plus the right one, shuffled.
  function mcFrom(correct, pool) {
    var wrong = [];
    pool.forEach(function (p) {
      if (wrong.length < 3 && p !== correct && wrong.indexOf(p) === -1) wrong.push(p);
    });
    if (wrong.length < 3) return null;
    var options = shuffle(wrong.concat([correct]));
    return { options: options, answer: options.indexOf(correct) };
  }

  function abgLine(g) {
    return '<div class="abg-vals"><span><em>pH</em> ' + g.ph.toFixed(2) + '</span><span><em>PaCO₂</em> ' + g.co2 + '</span><span><em>HCO₃⁻</em> ' + g.hco3 + '</span></div>';
  }
  function abgSteps(r) {
    return '<ol class="abg-steps">' + r.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>';
  }
  // Wrong ABG answers: same disorder with other compensation first, then the rest.
  function abgOptions(label) {
    var all = ABG.labels().filter(function (l) { return l !== label; });
    var core = label.replace(/^(Uncompensated|Partially compensated|Fully compensated) /, '');
    var near = all.filter(function (l) { return l.indexOf(core) !== -1; });
    var rest = all.filter(function (l) { return near.indexOf(l) === -1; });
    return mcFrom(label, shuffle(near).slice(0, 2).concat(shuffle(rest)));
  }

  // ---------- Tabs ----------
  var VIEWS = {};
  function showTab(tab) {
    S.tab = tab; save();
    $all('#subj-patho .tab').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.ptab === tab)); });
    $all('#subj-patho .view').forEach(function (v) { v.hidden = v.id !== 'pview-' + tab; });
    VIEWS[tab].show();
  }
  $all('#subj-patho .tab').forEach(function (b) {
    b.addEventListener('click', function () { showTab(b.dataset.ptab); });
  });

  // =====================================================================
  // Learn
  // =====================================================================
  var learnEl = $('#pview-learn');
  var learnQuery = '';
  var abgCur = null, abgShown = false;

  function topicRef(t) {
    return '<details class="ref"><summary><span class="r-name">' + esc(t.name) + '</span></summary>' +
      '<div class="ref-body"><div class="core-grid">' + FIELDS.map(function (f) {
        var list = t[f[0]] || [];
        if (!list.length) return '';
        return '<div class="span2"><h4>' + f[1] + '</h4>' + listHtml(list) + '</div>';
      }).join('') + '</div></div></details>';
  }

  function shockHtml() {
    return '<p class="lede">Every shock is a failure of the pump, the pipes or the volume. Compare the types side by side.</p>' +
      '<div class="shock-grid">' + SHOCK.rows.map(function (r) {
        return '<div class="panel shock-card"><p class="shock-name">' + esc(r.name) + '</p><dl class="rules">' +
          SHOCK.cols.map(function (c) { return '<dt>' + esc(c[1]) + '</dt><dd>' + esc(r[c[0]]) + '</dd>'; }).join('') + '</dl></div>';
      }).join('') + '</div>' +
      '<p class="eyebrow ref-group">Stages</p>' + topicRef(T_BY['shock-stages']) + topicRef(T_BY.perfusion);
  }

  function factsHtml() {
    var q = learnQuery.toLowerCase().trim();
    var list = FACTS.filter(function (f) { return !q || (f.q + ' ' + f.a).toLowerCase().indexOf(q) !== -1; });
    return list.length ? '<div class="table-wrap"><table class="grid basics"><tbody>' + list.map(function (f) {
      return '<tr><td>' + esc(f.q) + '</td><td><strong>' + esc(f.a) + '</strong></td></tr>';
    }).join('') + '</tbody></table></div>' : '<p class="none">Nothing matches that search.</p>';
  }

  function abgHtml() {
    if (!abgCur) abgCur = ABG.generate();
    var r = abgCur.result;
    return '<p class="lede">Read the gas, decide, then check. Or type in your own values.</p>' +
      '<div class="panel abg-panel"><p class="muted small">Normal: pH 7.35–7.45 · PaCO₂ 35–45 mm Hg · HCO₃⁻ 22–26 mEq/L</p>' +
      '<div class="abg-inputs">' +
      '<label>pH <input type="number" inputmode="decimal" step="0.01" min="6.8" max="7.8" data-abg="ph" value="' + abgCur.ph.toFixed(2) + '"></label>' +
      '<label>PaCO₂ <input type="number" inputmode="numeric" min="10" max="120" data-abg="co2" value="' + abgCur.co2 + '"></label>' +
      '<label>HCO₃⁻ <input type="number" inputmode="numeric" min="5" max="60" data-abg="hco3" value="' + abgCur.hco3 + '"></label></div>' +
      '<div class="row"><button class="btn" data-act="abg-new">New ABG</button>' +
      (abgShown ? '' : '<button class="btn primary" data-act="abg-show">Show interpretation</button>') + '</div>' +
      '<div id="abg-out">' + (abgShown ? '<div class="verdict ok"><p class="v-title">' + esc(r.label) + '</p>' + abgSteps(r) + '</div>' : '') + '</div></div>' +
      topicRef(T_BY.compensation);
  }

  function learnRender() {
    var mode = S.learn;
    learnEl.innerHTML =
      '<div><h2 class="title">Learn</h2><p class="lede">A paramedic-level overview of pathophysiology: how cells, fluids, acid-base, perfusion and the immune system fail.</p></div>' +
      seg('learn', mode, [['topics', 'Topics'], ['shock', 'Shock'], ['abg', 'ABG'], ['facts', 'Key facts']]) +
      (mode === 'topics' || mode === 'facts' ? '<input type="search" id="plearn-q" placeholder="Search…" value="' + esc(learnQuery) + '">' : '') +
      '<div class="ref-list" id="plearn-list"></div>' +
      '<p class="std-note">Written from standard paramedic pathophysiology; no class slides for this unit yet. Check normal values against your program.</p>';
    learnFill();
  }

  function learnFill() {
    var el = $('#plearn-list'), html = '';
    if (S.learn === 'topics') {
      var q = learnQuery.toLowerCase().trim();
      html = GROUPS.map(function (g) {
        var list = TOPICS.filter(function (t) {
          if (t.group !== g.id) return false;
          if (!q) return true;
          return [t.name].concat(t.aliases, t.about, t.patho, t.signs, t.care).join(' ').toLowerCase().indexOf(q) !== -1;
        });
        return list.length ? '<p class="eyebrow ref-group">' + esc(g.name) + '</p>' + list.map(topicRef).join('') : '';
      }).join('') || '<p class="none">Nothing matches that search.</p>';
    } else if (S.learn === 'shock') html = shockHtml();
    else if (S.learn === 'abg') html = abgHtml();
    else html = factsHtml();
    el.innerHTML = html;
  }

  function abgFromInputs() {
    var v = {};
    $all('[data-abg]', learnEl).forEach(function (i) { v[i.dataset.abg] = parseFloat(i.value); });
    if (!(v.ph > 6.5 && v.ph < 8) || !(v.co2 > 0) || !(v.hco3 > 0)) return null;
    return { ph: v.ph, co2: v.co2, hco3: v.hco3, result: ABG.interpret(v.ph, v.co2, v.hco3) };
  }

  learnEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-seg]');
    if (!t) return;
    if (t.dataset.seg) { S.learn = t.dataset.val; save(); return learnRender(); }
    if (t.dataset.act === 'abg-new') { abgCur = ABG.generate(); abgShown = false; return learnFill(); }
    if (t.dataset.act === 'abg-show') { abgCur = abgFromInputs() || abgCur; abgShown = true; return learnFill(); }
  });
  learnEl.addEventListener('input', function (e) {
    if (e.target.id === 'plearn-q') { learnQuery = e.target.value; return learnFill(); }
    if (e.target.dataset && e.target.dataset.abg && abgShown) {
      var g = abgFromInputs();
      if (!g) return;
      abgCur = g;
      $('#abg-out').innerHTML = '<div class="verdict ok"><p class="v-title">' + esc(g.result.label) + '</p>' + abgSteps(g.result) + '</div>';
    }
  });
  VIEWS.learn = { show: function () { if (!$('#plearn-list')) learnRender(); } };

  // =====================================================================
  // Cards
  // =====================================================================
  var cardsEl = $('#pview-cards');
  var C = null;
  var DECKS = [
    ['topics', 'Topics', 'About, how it happens, signs, field care'],
    ['facts', 'Key facts & numbers', 'Normal values, formulas, definitions'],
    ['abg', 'ABG practice', 'Read the gas, name the disorder']
  ];

  function dirFor() { return S.cardDir === 'mixed' ? (Math.random() < 0.5 ? 'forward' : 'reverse') : S.cardDir; }

  function buildCards(onlyIds) {
    var list = [], d = S.cardDecks;
    if (onlyIds || d.topics) TOPICS.forEach(function (t) {
      if (onlyIds ? onlyIds.indexOf(t.id) === -1 : !S.cardGroups[t.group]) return;
      FIELDS.forEach(function (f) { if ((t[f[0]] || []).length) list.push({ kind: 'topic', id: t.id, field: f[0], dir: dirFor() }); });
    });
    if (!onlyIds && d.facts) FACTS.forEach(function (f, i) { list.push({ kind: 'fact', id: 'f' + i, idx: i }); });
    if (!onlyIds && d.abg) for (var i = 0; i < 10; i++) list.push({ kind: 'abg', id: 'abg' + i });
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
      }).join('') + '</div></div>' +
      (S.cardDecks.topics ? '<div class="field-row"><p class="eyebrow">Topic groups</p><div class="row">' + GROUPS.map(function (g) {
        return '<label class="check"><input type="checkbox" data-cgroup="' + g.id + '"' + (S.cardGroups[g.id] ? ' checked' : '') + '> ' + esc(g.name) + '</label>';
      }).join('') + '</div></div>' +
      '<div class="field-row"><p class="eyebrow">Topic card front</p>' +
      seg('cardDir', S.cardDir, [['forward', 'Name → info'], ['reverse', 'Info → name'], ['mixed', 'Mixed']]) + '</div>' : '') +
      '<div><button class="btn primary big" data-act="start"' + (n ? '' : ' disabled') + '>Start ' + n + ' cards</button></div></div>';
  }

  function cardFace(card, flipped) {
    if (card.kind === 'topic') {
      var t = T_BY[card.id], fl = fieldName(card.field);
      if (card.dir === 'reverse') {
        return band(t.name, fl, !flipped) + '<div class="card-body"><p class="eyebrow">' + esc(fl) + '</p>' + listHtml(t[card.field]) +
          (flipped ? '' : '<p class="hint">Which topic is this? Tap to flip</p>') + '</div>';
      }
      return band(t.name, groupName(t.group)) + '<div class="card-body"><p class="ask">' + esc(fl) + '?</p>' +
        (flipped ? '<hr class="divider">' + listHtml(t[card.field]) : '<p class="hint">Tap to flip</p>') + '</div>';
    }
    if (card.kind === 'abg') {
      if (!card.gas) card.gas = ABG.generate();
      return band('ABG', 'Interpret it') + '<div class="card-body">' + abgLine(card.gas) +
        (flipped ? '<hr class="divider"><p class="answer">' + esc(card.gas.result.label) + '</p>' + abgSteps(card.gas.result) : '<p class="hint">Tap to flip</p>') + '</div>';
    }
    var f = FACTS[card.idx];
    return band('Key fact', '') + '<div class="card-body"><p class="ask">' + esc(f.q) + '</p>' +
      (flipped ? '<hr class="divider"><p class="answer">' + esc(f.a) + '</p>' : '<p class="hint">Tap to flip</p>') + '</div>';
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
    var key = card.kind + ':' + card.id + ':' + (card.field || '') + ':' + (card.dir || '');
    record(card.kind === 'topic' ? card.id : card.kind === 'abg' ? 'abg' : card.id, card.kind, ok);
    if (ok) {
      if (!C.again.has(key)) C.firstTry++;
      C.again.delete(key);
    } else {
      if (!C.again.has(key)) C.missedCards.push(Object.assign({}, card, { gas: null }));
      C.again.add(key);
      card.gas = null;
      C.queue.splice(Math.min(C.queue.length, 4 + Math.floor(Math.random() * 3)), 0, card);
      C.total++;
    }
    C.flipped = false;
    cardsRender();
  }

  cardsEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-seg]');
    if (!t) return;
    if (t.dataset.seg) { S[t.dataset.seg] = t.dataset.val; save(); return cardsSetup(); }
    var act = t.dataset.act;
    if (act === 'start') { var list = buildCards(); if (list.length) cardsStart(list); return; }
    if (act === 'flip') { if (!C.flipped) { C.flipped = true; cardsRender(); } return; }
    if (act === 'got') return cardAnswer(true);
    if (act === 'miss') return cardAnswer(false);
    if (act === 'quit') { C.queue = []; return cardsDone(); }
    if (act === 'again') return cardsStart(shuffle(C.missedCards));
    if (act === 'new') { C = null; return cardsSetup(); }
  });
  cardsEl.addEventListener('change', function (e) {
    var d = e.target.dataset || {};
    if (d.deck) { S.cardDecks[d.deck] = e.target.checked; save(); cardsSetup(); }
    if (d.cgroup) { S.cardGroups[d.cgroup] = e.target.checked; save(); cardsSetup(); }
  });

  VIEWS.cards = { show: function () { if (C && C.queue.length) cardsRender(); else if (!C) cardsSetup(); } };

  // =====================================================================
  // Quiz
  // =====================================================================
  var quizEl = $('#pview-quiz');
  var Q = null;
  var QTOPICS = GROUPS.map(function (g) { return [g.id, g.name]; }).concat([['facts', 'Key facts & numbers'], ['abg', 'ABG interpretation']]);

  // Items from other topics that this topic's own list doesn't contain.
  function foreignItems(own, others, field) {
    var out = [];
    shuffle(others).forEach(function (o) {
      (o[field] || []).forEach(function (x) {
        if (!own.some(function (y) { return same(x, y); }) && out.indexOf(x) === -1) out.push(x);
      });
    });
    return shuffle(out);
  }

  var LEAD = { about: 'Which topic is this:', patho: 'Which one works like this:', signs: 'Which one has this sign or finding:', care: 'Which topic does this field point go with:' };

  function topicQ(group) {
    var pool = TOPICS.filter(function (t) { return t.group === group; });
    var everyone = TOPICS;
    for (var tries = 0; tries < 20; tries++) {
      var t = pick(pool), fields = FIELDS.filter(function (f) { return (t[f[0]] || []).length; });
      var f = pick(fields), item = pick(t[f[0]]);
      if (Math.random() < 0.5) {
        // Name the topic: same-group topics first as wrong answers, then any.
        var others = shuffle(pool.filter(function (o) { return o.id !== t.id; })).concat(shuffle(everyone.filter(function (o) { return o.group !== group; })))
          .filter(function (o) { return !(o[f[0]] || []).some(function (y) { return same(y, item); }); });
        var mc = mcFrom(t.name, others.map(function (o) { return o.name; }));
        if (!mc) continue;
        return { id: t.id, stat: 'topic', prompt: LEAD[f[0]] + ' <q>' + esc(item) + '</q>?', options: mc.options, answer: mc.answer, explain: 'topic', field: f };
      }
      var wrong = foreignItems(t[f[0]], pool.filter(function (o) { return o.id !== t.id; }), f[0]);
      if (wrong.length < 3) wrong = wrong.concat(foreignItems(t[f[0]], everyone.filter(function (o) { return o.group !== group; }), f[0]));
      var m2 = mcFrom(item, wrong);
      if (!m2) continue;
      return { id: t.id, stat: 'topic', prompt: 'Which of these is true of <strong>' + esc(t.name) + '</strong> (' + esc(f[1].toLowerCase()) + ')?', options: m2.options, answer: m2.answer, explain: 'topic', field: f };
    }
    return null;
  }

  function factQ() {
    var i = Math.floor(Math.random() * FACTS.length), f = FACTS[i];
    var mc = mcFrom(f.a, shuffle(f.wrong));
    return { id: 'f' + i, idx: i, stat: 'fact', prompt: esc(f.q), options: mc.options, answer: mc.answer, explain: 'fact' };
  }

  function abgQ() {
    var g = ABG.generate(), mc = abgOptions(g.result.label);
    return { id: 'abg', stat: 'abg', gas: g, prompt: 'Interpret this ABG.', block: abgLine(g), options: mc.options, answer: mc.answer, explain: 'abg' };
  }

  function buildQuiz() {
    var topics = QTOPICS.map(function (k) { return k[0]; }).filter(function (k) { return S.quizTopics[k]; });
    if (!topics.length) return [];
    var out = [], seen = {};
    for (var i = 0; out.length < S.quizLen && i < S.quizLen * 10; i++) {
      var k = pick(topics);
      var q = k === 'facts' ? factQ() : k === 'abg' ? abgQ() : topicQ(k);
      if (!q) continue;
      var key = q.prompt + (q.block || '') + q.options.join('|');
      if (seen[key]) continue;
      seen[key] = true;
      out.push(q);
    }
    return out;
  }

  function quizSetup(error) {
    quizEl.innerHTML =
      '<div><h2 class="title">Quiz</h2><p class="lede">Multiple-choice questions mixed from the topics you pick, the key facts and practice ABGs.</p></div>' +
      '<div class="panel"><div class="field-row"><p class="eyebrow">Questions</p>' + seg('quizLen', S.quizLen, [[10, '10'], [20, '20'], [40, '40']]) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Topics</p><div class="row">' + QTOPICS.map(function (k) {
        return '<label class="check"><input type="checkbox" data-qtopic="' + k[0] + '"' + (S.quizTopics[k[0]] ? ' checked' : '') + '> ' + esc(k[1]) + '</label>';
      }).join('') + '</div></div>' +
      (error ? '<p class="error">' + esc(error) + '</p>' : '') +
      '<div><button class="btn primary big" data-act="start">Start quiz</button></div></div>';
  }

  function quizStart(list) {
    if (!list.length) return quizSetup('Pick at least one topic.');
    Q = { list: list, i: 0, right: 0, missed: [], state: null };
    quizRender();
  }

  function explainHtml(q) {
    if (q.explain === 'topic') {
      var t = T_BY[q.id];
      return '<p><strong>' + esc(t.name) + '</strong></p><p class="eyebrow">' + esc(q.field[1]) + '</p>' + listHtml(t[q.field[0]]);
    }
    if (q.explain === 'abg') return '<p><strong>' + esc(q.gas.result.label) + '</strong></p>' + abgSteps(q.gas.result);
    return '<p>' + esc(FACTS[q.idx].a) + '</p>';
  }

  function quizRender() {
    if (Q.i >= Q.list.length) return quizDone();
    var q = Q.list[Q.i], st = Q.state;
    var html = '<div class="progress-line"><span>Question ' + (Q.i + 1) + ' of ' + Q.list.length + '</span><span>' + Q.right + ' right</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(Q.i / Q.list.length * 100) + '%"></span></div>' +
      '<div class="panel"><p class="q-prompt">' + q.prompt + '</p>' + (q.block || '') +
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
    record(q.id, q.stat, Q.state.ok);
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
        return '<li><span>' + q.prompt + (q.gas ? ' ' + esc('pH ' + q.gas.ph.toFixed(2) + ', PaCO₂ ' + q.gas.co2 + ', HCO₃⁻ ' + q.gas.hco3) : '') +
          '</span><span class="muted small">Answer: <strong>' + esc(q.options[q.answer]) + '</strong></span></li>';
      }).join('') + '</ul></div>' : '');
  }

  quizEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-seg],[data-opt]');
    if (!t) return;
    if (t.dataset.seg) { S[t.dataset.seg] = Number(t.dataset.val); save(); return quizSetup(); }
    if (t.dataset.opt && Q && !Q.state) return quizChoose(Number(t.dataset.opt));
    var act = t.dataset.act;
    if (act === 'start') return quizStart(buildQuiz());
    if (act === 'next') return quizNext();
    if (act === 'retry') return quizStart(shuffle(Q.missed));
    if (act === 'new') { Q = null; return quizSetup(); }
  });
  quizEl.addEventListener('change', function (e) {
    var k = e.target.dataset && e.target.dataset.qtopic;
    if (k) { S.quizTopics[k] = e.target.checked; save(); }
  });

  VIEWS.quiz = { show: function () { if (Q) quizRender(); else quizSetup(); } };

  // =====================================================================
  // Stats
  // =====================================================================
  var statsEl = $('#pview-stats');
  var confirmReset = false;

  // Topic score combines cards and quiz answers on that topic.
  function topicTotals(id) {
    var s = S.stats[id] && S.stats[id].topic;
    return s ? { c: s.c, n: s.c + s.w } : { c: 0, n: 0 };
  }
  function weakness(id) {
    var t = topicTotals(id);
    return t.n ? 1 - t.c / t.n : 0.5;
  }
  function sumField(field, prefix) {
    return Object.keys(S.stats).reduce(function (m, id) {
      if (prefix && id.indexOf(prefix) !== 0) return m;
      var s = S.stats[id][field];
      if (s) { m.c += s.c; m.n += s.c + s.w; }
      return m;
    }, { c: 0, n: 0 });
  }
  function pct(t) { return t.n ? Math.round(t.c / t.n * 100) + '%' : '–'; }

  function statsRender() {
    var answered = 0, right = 0;
    Object.keys(S.stats).forEach(function (id) {
      Object.keys(S.stats[id]).forEach(function (f) { answered += S.stats[id][f].c + S.stats[id][f].w; right += S.stats[id][f].c; });
    });
    var facts = sumField('fact'), abg = sumField('abg');
    var rows = TOPICS.slice().sort(function (a, b) { return weakness(b.id) - weakness(a.id); }).map(function (t) {
      var tt = topicTotals(t.id);
      var cellHtml = tt.n ? '<span class="pill ' + verdictPill(tt.c / tt.n) + '" title="' + tt.c + ' right, ' + (tt.n - tt.c) + ' wrong">' + pct(tt) + '</span>' : '<span class="pill none">–</span>';
      return '<tr><td>' + esc(t.name) + ' <span class="muted small">' + esc(groupName(t.group)) + '</span></td><td class="cell">' + cellHtml + '</td></tr>';
    }).join('');
    statsEl.innerHTML =
      '<div><h2 class="title">Progress</h2><p class="lede">Weakest topics first. Progress is saved in this browser only.</p></div>' +
      '<div class="stats-row"><div class="stat"><div class="n">' + answered + '</div><div class="l">Answers</div></div>' +
      '<div class="stat"><div class="n">' + (answered ? Math.round(right / answered * 100) + '%' : '–') + '</div><div class="l">Accuracy</div></div>' +
      '<div class="stat"><div class="n">' + pct(abg) + '</div><div class="l">ABGs read</div></div></div>' +
      '<div class="row"><button class="btn primary" data-act="weak">Study my weakest 5 topics</button></div>' +
      '<div class="table-wrap"><table class="grid"><thead><tr><th>Topic</th><th style="text-align:center">Score</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      (facts.n ? '<p class="muted">Key facts: ' + pct(facts) + ' of ' + facts.n + ' answers right.</p>' : '') +
      '<div class="row">' + (confirmReset
        ? '<span class="muted">Erase all pathophysiology progress?</span><button class="btn bad" data-act="reset-yes">Erase</button><button class="btn" data-act="reset-no">Keep it</button>'
        : '<button class="btn link" data-act="reset">Reset progress</button>') + '</div>';
  }

  statsEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    var act = t.dataset.act;
    if (act === 'weak') {
      var ids = TOPICS.slice().sort(function (a, b) { return weakness(b.id) - weakness(a.id); }).slice(0, 5).map(function (x) { return x.id; });
      showTab('cards');
      return cardsStart(buildCards(ids));
    }
    if (act === 'reset') confirmReset = true;
    if (act === 'reset-no') confirmReset = false;
    if (act === 'reset-yes') { S.stats = {}; save(); confirmReset = false; }
    statsRender();
  });

  VIEWS.stats = { show: statsRender };

  // ---------- Keyboard shortcuts ----------
  document.addEventListener('keydown', function (e) {
    if (document.body.dataset.subject !== 'patho') return;
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

  window.Patho = { show: function () { showTab(VIEWS[S.tab] ? S.tab : 'learn'); } };
})();
