/* ACLS (Code Box): the adult ACLS algorithms as flowcharts, megacode
   scenarios run as a code with a monitor and code clock, flashcards, quiz
   and stats over window.ACLS_* data. Strips are drawn by js/ecg.js and
   rhythm names come from window.CARDIO_RHYTHMS. The subject switch in
   cardio.js calls window.AclsBox.show(). */
(function () {
  'use strict';

  var GROUPS = window.ACLS_GROUPS;
  var ALGOS = window.ACLS_ALGOS;
  var DRUGS = window.ACLS_DRUGS;
  var FACTS = window.ACLS_FACTS;
  var STRIPQ = window.ACLS_STRIP_QS;
  var CODES = window.ACLS_MEGACODES;
  var TNDIFF = window.ACLS_TN;
  var HT = window.ACLS_HT;
  var ECG = window.ECG;
  var RHYTHM_NAME = {};
  (window.CARDIO_RHYTHMS || []).forEach(function (r) { RHYTHM_NAME[r.id] = r.name; });
  var GROUP_IDS = GROUPS.map(function (g) { return g.id; });

  // Stable ids for stats.
  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  DRUGS.forEach(function (d) { d.id = 'drug-' + slug(d.name + ' ' + d.use); });
  FACTS.forEach(function (f, i) { f.id = 'fact-' + i; });
  STRIPQ.forEach(function (s, i) { s.id = 'strip-' + i; });
  TNDIFF.forEach(function (x, i) { x.id = 'tn-' + i; });
  // Every megacode decision, flattened, so the quiz can ask them one at a time.
  var STEPS = [];
  CODES.forEach(function (c) {
    c.stages.forEach(function (st, si) {
      st.q.forEach(function (q, qi) {
        q.id = 'mc-' + c.id + '-' + si + '-' + qi;
        STEPS.push({ id: q.id, group: c.group, code: c, stage: st, q: q });
      });
    });
  });

  // ---------- Saved state ----------
  var KEY = 'mscc-acls-v1';
  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  var S = Object.assign({
    tab: 'algos',
    algo: ALGOS[0].id,
    groups: GROUP_IDS.slice(),
    cardDecks: { drugs: true, facts: true, tn: false },
    quizLen: 20,
    quizTopics: { facts: true, drugs: true, strips: true, steps: true },
    feedback: 'each',
    best: {},
    stats: {}
  }, loadSaved());
  S.groups = S.groups.filter(function (g) { return GROUP_IDS.indexOf(g) !== -1; });

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
  function band(title, meta) {
    return '<div class="label-band code"><span class="label-name">' + esc(title) + '</span><span class="label-meta">' + esc(meta || '') + '</span></div>';
  }
  function groupName(id) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].id === id) return GROUPS[i].name;
    return '';
  }
  var TN = ' <span class="tn-tag" title="Tennessee EMS protocol differs from AHA here">TN</span>';
  var NEW = ' <span class="new-tag" title="Changed in the 2025 AHA guidelines">2025</span>';
  var STD = ' <span class="std-mark" title="Standard ACLS teaching, not printed on the 2025 algorithm card">*</span>';
  function marks(x) { return (x.new25 ? NEW : '') + (x.std ? STD : ''); }
  function tnNote(text) { return text ? '<p class="tn-note">' + TN + ' ' + esc(text) + '</p>' : ''; }
  function verdictPill(p) { return p >= 0.8 ? 'high' : p >= 0.5 ? 'mid' : 'low'; }
  function inGroups(x) { return S.groups.indexOf(x.group) !== -1; }
  function rhythmLabel(id, label) { return label || RHYTHM_NAME[id] || id; }
  function stripHtml(id, label) {
    var strip = ECG.generate(id, Math.floor(Math.random() * 1e9));
    return ECG.render(strip, rhythmLabel(id, label), { cap: ['Lead II · monitor', '6 seconds'] });
  }

  function mcFrom(correct, pool) {
    var opts = [correct];
    pool.forEach(function (p) { if (opts.length < 4 && opts.indexOf(p) === -1) opts.push(p); });
    var s = shuffle(opts);
    return { options: s, answer: s.indexOf(correct) };
  }
  function areaChips() {
    return '<div class="field-row"><p class="eyebrow">Algorithms</p><div class="chips">' + GROUPS.map(function (g) {
      return '<button class="chip" data-area="' + g.id + '" aria-pressed="' + (S.groups.indexOf(g.id) !== -1) + '">' + esc(g.name) + '</button>';
    }).join('') + '</div><div class="row"><button class="btn link" data-act="areas-all">All</button><button class="btn link" data-act="areas-none">Clear</button></div></div>';
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
    $all('#subj-acls .tab').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.xtab === tab)); });
    $all('#subj-acls .view').forEach(function (v) { v.hidden = v.id !== 'xview-' + tab; });
    VIEWS[tab].show();
  }
  $all('#subj-acls .tab').forEach(function (b) {
    b.addEventListener('click', function () { showTab(b.dataset.xtab); });
  });

  // =====================================================================
  // Algorithms
  // =====================================================================
  var algosEl = $('#xview-algos');
  var PAGES = ALGOS.map(function (a) { return [a.id, a.short || a.name]; }).concat([['drugs', 'Drugs & energies'], ['hts', 'H\'s & T\'s'], ['tn', 'TN vs AHA']]);

  // One flowchart node: a step box, or a question with a column per answer.
  function nodeHtml(n) {
    if (n.decide) {
      return '<div class="fl-decide"><p class="fl-q">' + esc(n.decide) + '</p><div class="fl-branches">' + n.branches.map(function (b) {
        return '<div class="fl-branch"><p class="fl-lab">' + esc(b.label) + '</p>' + flowHtml(b.steps) + '</div>';
      }).join('') + '</div></div>';
    }
    return '<div class="fl-step' + (n.kind ? ' fl-' + n.kind : '') + '"><p class="fl-title">' + esc(n.title) + marks(n) + '</p>' +
      (n.lines ? listHtml(n.lines) : '') + tnNote(n.tn) + '</div>';
  }
  function flowHtml(nodes) {
    return '<div class="flow">' + nodes.map(nodeHtml).join('') + '</div>';
  }
  function algoHtml(a) {
    return '<div class="panel"><p class="eyebrow">' + esc(a.source) + '</p><h3 class="algo-name">' + esc(a.name) + '</h3><p>' + esc(a.summary) + '</p></div>' +
      flowHtml(a.flow) +
      (a.notes && a.notes.length ? '<div class="panel"><p class="eyebrow">Doses and details</p><div class="core-grid">' + a.notes.map(function (x) {
        return '<div><h4>' + esc(x.title) + marks(x) + '</h4>' + listHtml(x.lines) + tnNote(x.tn) + '</div>';
      }).join('') + '</div></div>' : '') +
      '<div class="panel"><p class="eyebrow">Practice it</p><p>Run a megacode on this algorithm, or drill its doses and decision points.</p>' +
      '<div class="row">' + (CODES.some(function (c) { return c.group === a.group; }) ? '<button class="btn primary" data-act="algo-code" data-group="' + a.group + '">Run a megacode</button>' : '') +
      '<button class="btn" data-act="algo-quiz" data-group="' + a.group + '">Quiz me</button><button class="btn" data-act="algo-cards" data-group="' + a.group + '">Flashcards</button></div></div>';
  }
  function drugsHtml() {
    return '<div class="panel"><p class="eyebrow">Drugs, doses and energies</p><p class="small muted">Adult doses. ' + TN + ' marks a Tennessee EMS protocol that differs from AHA.</p></div>' +
      GROUPS.map(function (g) {
        var list = DRUGS.filter(function (d) { return d.group === g.id; });
        if (!list.length) return '';
        return '<p class="eyebrow ref-group">' + esc(g.name) + '</p><div class="table-wrap"><table class="grid basics dose-table"><tbody>' + list.map(function (d) {
          return '<tr><td><strong>' + esc(d.name) + '</strong><br><span class="small muted">' + esc(d.use) + '</span></td><td>' + esc(d.dose) + marks(d) +
            (d.note ? '<br><span class="small muted">' + esc(d.note) + '</span>' : '') + (d.tn ? '<br><span class="small tn-ink">TN: ' + esc(d.tn) + '</span>' : '') + '</td></tr>';
        }).join('') + '</tbody></table></div>';
      }).join('');
  }
  function htsHtml() {
    return '<div class="panel"><p class="eyebrow">Reversible causes</p><p>Look for these in every arrest, and in every patient heading toward one. In PEA and asystole, finding and fixing the cause is the treatment.</p></div>' +
      '<div class="core-grid ht-grid">' + ['h', 't'].map(function (k) {
        return '<div class="panel"><p class="eyebrow">' + (k === 'h' ? 'H\'s' : 'T\'s') + '</p><div class="table-wrap"><table class="grid basics"><tbody>' + HT[k].map(function (x) {
          return '<tr><td><strong>' + esc(x.name) + '</strong><br><span class="small muted">Clues: ' + esc(x.clues) + '</span><br><span class="small">Fix: ' + esc(x.fix) + '</span></td></tr>';
        }).join('') + '</tbody></table></div></div>';
      }).join('') + '</div>';
  }
  function tnHtml() {
    return '<div class="panel"><p class="eyebrow">Tennessee EMS protocols vs AHA ACLS</p><p>' + esc(window.ACLS_TN_SOURCE) + '</p></div>' +
      '<div class="table-wrap"><table class="grid basics tn-compare"><thead><tr><th>Topic</th><th>AHA 2025</th><th>Tennessee</th></tr></thead><tbody>' +
      TNDIFF.map(function (x) {
        return '<tr><td><strong>' + esc(x.topic) + '</strong></td><td>' + esc(x.aha) + '</td><td>' + esc(x.tnText) + '</td></tr>';
      }).join('') + '</tbody></table></div>';
  }
  function algosRender() {
    var page = S.algo, a = ALGOS.filter(function (x) { return x.id === page; })[0];
    if (!a && ['drugs', 'hts', 'tn'].indexOf(page) === -1) { a = ALGOS[0]; page = S.algo = a.id; }
    algosEl.innerHTML =
      '<div><h2 class="title">ACLS algorithms</h2><p class="lede">The adult algorithms from the 2025 AHA Guidelines for CPR and ECC, step by step. Notes tagged' + TN + ' are where Tennessee EMS protocols differ; items tagged' + NEW + ' changed in 2025.</p>' +
      '<p class="std-note">* Standard ACLS teaching that the 2025 algorithm cards do not print. A study aid: follow your local protocols and medical direction.</p></div>' +
      seg('algo', page, PAGES) +
      '<div class="algo-view">' + (a ? algoHtml(a) : page === 'drugs' ? drugsHtml() : page === 'hts' ? htsHtml() : tnHtml()) + '</div>';
  }
  function focusGroup(g) { S.groups = [g]; save(); }
  algosEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-seg],[data-act]');
    if (!t) return;
    if (t.dataset.seg) { S.algo = t.dataset.val; save(); return algosRender(); }
    var act = t.dataset.act, g = t.dataset.group;
    if (act === 'algo-code') { showTab('codes'); return codeStart(pick(CODES.filter(function (c) { return c.group === g; }))); }
    if (act === 'algo-quiz') {
      focusGroup(g);
      S.quizTopics = { facts: true, drugs: true, strips: true, steps: true };
      save(); showTab('quiz'); return quizStart(buildQuiz());
    }
    if (act === 'algo-cards') {
      focusGroup(g);
      S.cardDecks = { drugs: true, facts: true, tn: true };
      save(); showTab('cards'); return cardsStart(buildCards());
    }
  });
  VIEWS.algos = { show: algosRender };

  // =====================================================================
  // Megacodes
  // =====================================================================
  var codesEl = $('#xview-codes');
  var M = null;

  function codeList() {
    codesEl.innerHTML =
      '<div><h2 class="title">Megacodes</h2><p class="lede">You are the team leader. Each case moves through the algorithms the way a megacode testing station does: read the monitor, call the rhythm, then choose the next action. The rhythm changes as you go.</p></div>' +
      '<div class="panel"><div class="field-row"><p class="eyebrow">Feedback</p>' +
      seg('feedback', S.feedback, [['each', 'After each decision'], ['end', 'At the end (test mode)']]) + '</div>' +
      '<div class="row"><button class="btn primary big" data-act="random">Random megacode</button></div></div>' +
      '<div class="ref-list">' + CODES.map(function (c) {
        var b = S.best[c.id];
        return '<button class="code-card" data-code="' + c.id + '"><span class="cc-top"><span class="cc-name">' + esc(c.name) + '</span>' +
          (b != null ? '<span class="pill ' + verdictPill(b / 100) + '">Best ' + b + '%</span>' : '<span class="pill none">New</span>') + '</span>' +
          '<span class="small muted">' + esc(c.path) + '</span><span class="small">' + esc(c.patient) + '</span></button>';
      }).join('') + '</div>';
  }
  function codeStart(c) {
    M = { code: c, si: 0, qi: 0, pick: null, right: 0, total: 0, log: [], strip: null };
    codeRender();
    window.scrollTo(0, 0);
  }
  // The rhythm question is built once per stage so the options stay put after answering.
  function stageQuestions(st) {
    if (st.qs) return st.qs;
    var list = [];
    if (st.callRhythm) {
      var name = rhythmLabel(st.rhythm, st.label);
      var mc = mcFrom(name, shuffle(st.rhythmWrong || []));
      list.push({ id: 'rhythm-' + st.rhythm, ask: 'What is the rhythm?', options: mc.options, answer: mc.answer, why: st.rhythmWhy || '', rhythm: true });
    }
    st.q.forEach(function (q) {
      var m = mcFrom(q.a, shuffle(q.wrong));
      list.push({ id: q.id, ask: q.ask, options: m.options, answer: m.answer, why: q.why, tn: q.tn });
    });
    st.qs = list;
    return list;
  }
  function vitalsHtml(v) {
    return '<dl class="vitals">' + v.map(function (x) { return '<div><dt>' + esc(x[0]) + '</dt><dd>' + esc(x[1]) + '</dd></div>'; }).join('') + '</dl>';
  }
  function codeRender() {
    var c = M.code;
    if (M.si >= c.stages.length) return codeDone();
    var st = c.stages[M.si], qs = stageQuestions(st), q = qs[M.qi];
    if (!M.strip) M.strip = stripHtml(st.rhythm, st.label);
    var answered = M.pick !== null, ok = answered && M.pick === q.answer, show = answered && S.feedback === 'each';
    codesEl.innerHTML =
      '<div class="progress-line"><span>' + esc(c.name) + ' · stage ' + (M.si + 1) + ' of ' + c.stages.length + '</span><span>' + M.right + ' of ' + M.total + ' right</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(M.si / c.stages.length * 100) + '%"></span></div>' +
      (M.si === 0 && M.qi === 0 ? '<div class="panel"><p class="eyebrow">Dispatch</p><p>' + esc(c.patient) + '</p></div>' : '') +
      '<div class="panel monitor">' + band(st.clock ? 'Code clock ' + st.clock : st.title, st.clock ? st.title : 'Stage ' + (M.si + 1)) +
      '<p class="case code-case">' + esc(st.text) + '</p>' + vitalsHtml(st.vitals) + M.strip +
      '<p class="q-prompt">' + esc(q.ask) + '</p><div class="options">' + q.options.map(function (o, i) {
        var cls = 'option';
        if (show) { if (i === q.answer) cls += ' right'; else if (i === M.pick) cls += ' wrong'; }
        else if (answered && i === M.pick) cls += ' chosen';
        return '<button class="' + cls + '" data-opt="' + i + '"' + (answered ? ' disabled' : '') + '><span class="key">' + 'ABCD'[i] + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>' +
      (show ? '<div class="verdict ' + (ok ? 'ok' : 'no') + '"><p class="v-title">' + (ok ? 'Correct' : 'Not quite: ' + esc(q.options[q.answer])) + '</p>' +
        (q.why ? '<p>' + esc(q.why) + '</p>' : '') + tnNote(q.tn) + '</div>' : '') +
      (answered ? '<div><button class="btn primary big" data-act="next">' + nextLabel() + '</button></div>' : '') +
      '</div><div class="row"><button class="btn link" data-act="quit">End this megacode</button></div><p class="kbd-hint">Keys: A–D to answer · Enter for next</p>';
    if (answered) { var nx = $('[data-act="next"]', codesEl); if (nx) nx.focus({ preventScroll: true }); }
  }
  function nextLabel() {
    var st = M.code.stages[M.si];
    if (M.qi + 1 < stageQuestions(st).length) return 'Next decision';
    return M.si + 1 < M.code.stages.length ? 'Continue the code' : 'Debrief';
  }
  function codeChoose(i) {
    var st = M.code.stages[M.si], q = stageQuestions(st)[M.qi];
    M.pick = i;
    var ok = i === q.answer;
    M.total++;
    if (ok) M.right++;
    M.log.push({ stage: st, q: q, pick: i, ok: ok });
    if (!q.rhythm) record(q.id, 'step', ok);
    codeRender();
  }
  function codeNext() {
    var st = M.code.stages[M.si];
    M.pick = null;
    if (M.qi + 1 < stageQuestions(st).length) { M.qi++; return codeRender(); }
    M.si++; M.qi = 0; M.strip = null;
    codeRender();
    window.scrollTo(0, 0);
  }
  function codeDone() {
    var c = M.code, pct = M.total ? Math.round(M.right / M.total * 100) : 0;
    if (M.si >= c.stages.length && M.total) { S.best[c.id] = Math.max(S.best[c.id] || 0, pct); save(); }
    var missed = M.log.filter(function (x) { return !x.ok; });
    codesEl.innerHTML =
      '<div class="panel"><p class="eyebrow">Debrief · ' + esc(c.name) + '</p><p class="score-big">' + pct + '%</p><p class="lede">' + M.right + ' of ' + M.total + ' decisions right.</p>' +
      '<p class="eyebrow">Key points</p>' + listHtml(c.debrief) +
      '<div class="row"><button class="btn primary" data-act="again">Run it again</button><button class="btn" data-act="list">All megacodes</button></div></div>' +
      (missed.length ? '<div class="panel"><p class="eyebrow">Decisions to review</p><ul class="missed-list">' + missed.map(function (x) {
        return '<li><span class="small muted">' + esc(x.stage.clock ? x.stage.clock + ' · ' : '') + esc(x.stage.title) + '</span><span>' + esc(x.q.ask) + '</span>' +
          '<span class="small">You chose: ' + esc(x.q.options[x.pick]) + '</span><span class="small">Best: <strong>' + esc(x.q.options[x.q.answer]) + '</strong></span>' +
          (x.q.why ? '<span class="small muted">' + esc(x.q.why) + '</span>' : '') + (x.q.tn ? tnNote(x.q.tn) : '') + '</li>';
      }).join('') + '</ul></div>' : '');
  }
  codesEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-seg],[data-opt],[data-code]');
    if (!t) return;
    if (t.dataset.seg) { S[t.dataset.seg] = t.dataset.val; save(); return codeList(); }
    if (t.dataset.code) return codeStart(CODES.filter(function (c) { return c.id === t.dataset.code; })[0]);
    if (t.dataset.opt && M && M.pick === null) return codeChoose(Number(t.dataset.opt));
    var act = t.dataset.act;
    if (act === 'random') return codeStart(pick(CODES));
    if (act === 'next') return codeNext();
    if (act === 'quit') return codeDone();
    if (act === 'again') return codeStart(M.code);
    if (act === 'list') { M = null; return codeList(); }
  });
  VIEWS.codes = { show: function () { if (M && M.si < M.code.stages.length) codeRender(); else { M = null; codeList(); } } };

  // =====================================================================
  // Flashcards
  // =====================================================================
  var cardsEl = $('#xview-cards');
  var C = null;
  var DECKS = [
    ['drugs', 'Drugs & energies', 'Epinephrine, amiodarone, adenosine, joules…'],
    ['facts', 'Key facts', 'CPR quality, airway, ROSC targets, decision points'],
    ['tn', 'Tennessee vs AHA', 'Where TN protocols differ from the AHA algorithms']
  ];
  function buildCards() {
    var list = [], d = S.cardDecks;
    if (d.drugs) DRUGS.filter(inGroups).forEach(function (x) { list.push({ kind: 'drug', id: x.id, item: x, field: 'drug' }); });
    if (d.facts) FACTS.filter(inGroups).forEach(function (x) { list.push({ kind: 'fact', id: x.id, item: x, field: 'fact' }); });
    if (d.tn) TNDIFF.filter(inGroups).forEach(function (x) { list.push({ kind: 'tn', id: x.id, item: x, field: 'tn' }); });
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
      '<div><button class="btn primary big" data-act="start"' + (n ? '' : ' disabled') + '>Start ' + n + ' cards</button></div></div>';
  }
  function cardFace(card, flipped) {
    var x = card.item, g = groupName(x.group);
    var hint = '<p class="hint">Tap to flip</p>';
    if (card.kind === 'drug') {
      return band(x.name, g) + '<div class="card-body"><p class="ask">Adult dose for ' + esc(x.use) + '?</p>' +
        (flipped ? '<hr class="divider"><p class="answer">' + esc(x.dose) + marks(x) + '</p>' + (x.note ? '<p class="small">' + esc(x.note) + '</p>' : '') +
          (x.tn ? '<p class="small tn-ink">TN: ' + esc(x.tn) + '</p>' : '') : hint) + '</div>';
    }
    if (card.kind === 'fact') {
      return band('Key fact', g) + '<div class="card-body"><p class="ask">' + esc(x.q) + marks(x) + '</p>' +
        (flipped ? '<hr class="divider"><p class="answer">' + esc(x.a) + '</p>' + (x.why ? '<p class="small">' + esc(x.why) + '</p>' : '') : hint) + '</div>';
    }
    return band('TN vs AHA', g) + '<div class="card-body"><p class="ask">' + esc(x.topic) + ': what does Tennessee do differently?</p>' +
      (flipped ? '<hr class="divider"><p class="answer">' + esc(x.tnText) + '</p><p class="small">AHA: ' + esc(x.aha) + '</p>' : hint) + '</div>';
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
    var key = card.kind + ':' + card.id;
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
    var t = e.target.closest('[data-act],[data-area]');
    if (!t) return;
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
  var quizEl = $('#xview-quiz');
  var Q = null;
  var QTOPICS = [['facts', 'Key facts'], ['drugs', 'Doses & energies'], ['strips', 'Strip: what next?'], ['steps', 'Megacode decisions']];
  var QGEN = {
    facts: function (pool) {
      var f = pick(pool), mc = mcFrom(f.a, shuffle(f.wrong));
      return { item: f, stat: 'fact', prompt: esc(f.q), options: mc.options, answer: mc.answer, why: f.why };
    },
    drugs: function (pool) {
      var d = pick(pool);
      // Wrong doses: the drug's own near-misses first, then other doses in the same algorithm.
      var others = DRUGS.filter(function (o) { return o !== d && o.group === d.group; }).map(function (o) { return o.dose; });
      var mc = mcFrom(d.dose, shuffle(d.wrong || []).concat(shuffle(others)));
      return { item: d, stat: 'drug', prompt: 'Adult dose of <q>' + esc(d.name) + '</q> for ' + esc(d.use) + '?', options: mc.options, answer: mc.answer, why: d.note, tn: d.tn };
    },
    strips: function (pool) {
      var s = pick(pool), mc = mcFrom(s.a, shuffle(s.wrong));
      return { item: s, stat: 'strip', strip: s.rhythm, label: s.label, block: '<p class="case">' + esc(s.ctx) + '</p>', prompt: 'What is the next step?', options: mc.options, answer: mc.answer, why: s.why, tn: s.tn };
    },
    steps: function (pool) {
      var x = pick(pool), mc = mcFrom(x.q.a, shuffle(x.q.wrong));
      return { item: x, stat: 'step', strip: x.stage.rhythm, label: x.stage.label, block: '<p class="case">' + esc(x.stage.text) + '</p>' + vitalsHtml(x.stage.vitals), prompt: esc(x.q.ask), options: mc.options, answer: mc.answer, why: x.q.why, tn: x.q.tn };
    }
  };
  var QSRC = { facts: FACTS, drugs: DRUGS, strips: STRIPQ, steps: STEPS };
  function buildQuiz() {
    var topics = QTOPICS.map(function (k) { return k[0]; }).filter(function (k) {
      return S.quizTopics[k] && QSRC[k].some(inGroups);
    });
    if (!topics.length) return [];
    var out = [], seen = {};
    for (var i = 0; out.length < S.quizLen && i < S.quizLen * 10; i++) {
      var k = pick(topics), q = QGEN[k](QSRC[k].filter(inGroups));
      if (seen[q.item.id]) continue;
      seen[q.item.id] = true;
      out.push(q);
    }
    return out;
  }
  function quizSetup(error) {
    quizEl.innerHTML =
      '<div><h2 class="title">Quiz</h2><p class="lede">Multiple choice on the algorithms: key facts, doses and energies, "here is the monitor, what next?" and single decisions from the megacodes.</p></div>' +
      '<div class="panel"><div class="field-row"><p class="eyebrow">Questions</p>' + seg('quizLen', S.quizLen, [[10, '10'], [20, '20'], [40, '40']]) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Question types</p><div class="row">' + QTOPICS.map(function (k) {
        return '<label class="check"><input type="checkbox" data-qtopic="' + k[0] + '"' + (S.quizTopics[k[0]] ? ' checked' : '') + '> ' + esc(k[1]) + '</label>';
      }).join('') + '</div></div>' + areaChips() +
      (error ? '<p class="error">' + esc(error) + '</p>' : '') +
      '<div><button class="btn primary big" data-act="start">Start quiz</button></div></div>';
  }
  function quizStart(list) {
    if (!list.length) return quizSetup('Pick at least one question type and one algorithm.');
    Q = { list: list, i: 0, right: 0, missed: [], state: null };
    quizRender();
  }
  function quizRender() {
    if (Q.i >= Q.list.length) return quizDone();
    var q = Q.list[Q.i], st = Q.state;
    if (q.strip && !q.stripHtml) q.stripHtml = stripHtml(q.strip, q.label);
    var html = '<div class="progress-line"><span>Question ' + (Q.i + 1) + ' of ' + Q.list.length + '</span><span>' + Q.right + ' right</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(Q.i / Q.list.length * 100) + '%"></span></div>' +
      '<div class="panel"><p class="eyebrow">' + esc(groupName(q.item.group)) + '</p>' + (q.block || '') + (q.stripHtml || '') + '<p class="q-prompt">' + q.prompt + '</p>' +
      '<div class="options">' + q.options.map(function (o, i) {
        var cls = 'option';
        if (st) { if (i === q.answer) cls += ' right'; else if (i === st.choice) cls += ' wrong'; }
        return '<button class="' + cls + '" data-opt="' + i + '"' + (st ? ' disabled' : '') + '><span class="key">' + 'ABCD'[i] + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>';
    if (st) {
      html += '<div class="verdict ' + (st.ok ? 'ok' : 'no') + '"><p class="v-title">' + (st.ok ? 'Correct' : 'Not quite') + '</p><p><strong>' + esc(q.options[q.answer]) + '</strong></p>' +
        (q.why ? '<p>' + esc(q.why) + '</p>' : '') + tnNote(q.tn) + '</div>' +
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
        return '<li><span>' + (q.strip ? 'Strip: ' : '') + q.prompt + '</span><span class="muted small">Answer: <strong>' + esc(q.options[q.answer]) + '</strong></span></li>';
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
    if (act === 'retry') return quizStart(shuffle(Q.missed.map(function (q) { return Object.assign({}, q, mcFrom(q.options[q.answer], shuffle(q.options)), { stripHtml: null }); })));
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
  var statsEl = $('#xview-stats');
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
  function areaRows() {
    return GROUPS.map(function (g) {
      var facts = tally(FACTS, 'fact', g.id), tn = tally(TNDIFF, 'tn', g.id);
      var cols = [{ c: facts.c + tn.c, n: facts.n + tn.n }, tally(DRUGS, 'drug', g.id), tally(STRIPQ, 'strip', g.id), tally(STEPS, 'step', g.id)];
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
    var done = CODES.filter(function (c) { return S.best[c.id] != null; }).length;
    statsEl.innerHTML =
      '<div><h2 class="title">Progress</h2><p class="lede">Weakest algorithms first. Progress is saved in this browser only.</p></div>' +
      '<div class="stats-row"><div class="stat"><div class="n">' + answered + '</div><div class="l">Answers</div></div>' +
      '<div class="stat"><div class="n">' + (answered ? Math.round(right / answered * 100) + '%' : '–') + '</div><div class="l">Accuracy</div></div>' +
      '<div class="stat"><div class="n">' + done + ' / ' + CODES.length + '</div><div class="l">Megacodes run</div></div></div>' +
      '<div class="row"><button class="btn primary" data-act="weak">Quiz my weakest algorithm</button></div>' +
      '<div class="table-wrap"><table class="grid"><thead><tr><th>Algorithm</th><th style="text-align:center">Facts</th><th style="text-align:center">Doses</th><th style="text-align:center">Strips</th><th style="text-align:center">Megacode</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td>' + esc(r.g.name) + '</td>' + r.cols.map(cell).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>' +
      '<div class="table-wrap"><table class="grid"><thead><tr><th>Megacode</th><th style="text-align:center">Best</th></tr></thead><tbody>' +
      CODES.map(function (c) {
        var b = S.best[c.id];
        return '<tr><td>' + esc(c.name) + '</td><td class="cell">' + (b == null ? '<span class="pill none">–</span>' : '<span class="pill ' + verdictPill(b / 100) + '">' + b + '%</span>') + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<div class="row">' + (confirmReset
        ? '<span class="muted">Erase all ACLS progress?</span><button class="btn bad" data-act="reset-yes">Erase</button><button class="btn" data-act="reset-no">Keep it</button>'
        : '<button class="btn link" data-act="reset">Reset progress</button>') + '</div>';
  }
  statsEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    var act = t.dataset.act;
    if (act === 'weak') {
      var weakest = areaRows().sort(function (a, b) { return b.weak - a.weak; })[0];
      S.groups = [weakest.g.id];
      S.quizTopics = { facts: true, drugs: true, strips: true, steps: true };
      save(); Q = null;
      showTab('quiz');
      return quizStart(buildQuiz());
    }
    if (act === 'reset') confirmReset = true;
    if (act === 'reset-no') confirmReset = false;
    if (act === 'reset-yes') { S.stats = {}; S.best = {}; save(); confirmReset = false; }
    statsRender();
  });
  VIEWS.stats = { show: statsRender };

  // ---------- Keyboard shortcuts ----------
  document.addEventListener('keydown', function (e) {
    if (document.body.dataset.subject !== 'acls') return;
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
    } else if (S.tab === 'codes' && M && M.si < M.code.stages.length && !typing) {
      var cq = stageQuestions(M.code.stages[M.si])[M.qi];
      if (M.pick === null && idx !== -1 && idx < cq.options.length) codeChoose(idx);
      else if (M.pick !== null && e.key === 'Enter' && tag !== 'button') { e.preventDefault(); codeNext(); }
    }
  });

  window.AclsBox = { show: function () { showTab(VIEWS[S.tab] ? S.tab : 'algos'); } };
})();
