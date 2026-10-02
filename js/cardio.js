/* Cardiology: rhythm strips, flashcards, quiz, reference and stats over
   window.CARDIO_* data, plus the Pharmacology / Cardiology subject switch. */
(function () {
  'use strict';

  var RHYTHMS = window.CARDIO_RHYTHMS;
  var RGROUPS = window.CARDIO_RHYTHM_GROUPS;
  var TOPICS = window.CARDIO_TOPICS;
  var TGROUPS = window.CARDIO_TOPIC_GROUPS;
  var BASICS = window.CARDIO_BASICS;
  var ECG = window.ECG;
  var G = window.Grading;
  var R_BY = {}, T_BY = {};
  RHYTHMS.forEach(function (r) { R_BY[r.id] = r; });
  TOPICS.forEach(function (t) { T_BY[t.id] = t; });
  var STRIP_IDS = RHYTHMS.filter(function (r) { return ECG.ids.indexOf(r.id) !== -1; }).map(function (r) { return r.id; });

  var RULES = [['rate', 'Rate'], ['rhythm', 'Rhythm'], ['qrs', 'QRS'], ['p', 'P waves'], ['pr', 'PR interval']];
  var CARE = [['causes', 'Causes'], ['significance', 'Clinical significance'], ['management', 'Management']];
  var TFIELDS = [['about', 'About'], ['signs', 'Signs & symptoms'], ['ecg', 'ECG findings'], ['management', 'Management']];

  // Rhythms that are easy to mix up, used for multiple-choice wrong answers.
  var CONFUSE = {
    nsr: ['sinus-brady', 'sinus-tach', 'sinus-arrhythmia', 'avb-1', 'wap'],
    'sinus-brady': ['nsr', 'junctional-escape', 'avb-1', 'avb-2-2'],
    'sinus-tach': ['svt', 'nsr', 'flutter', 'afib'],
    'sinus-arrhythmia': ['nsr', 'wap', 'afib', 'sinus-arrest'],
    'sinus-arrest': ['sinus-arrhythmia', 'avb-2-2', 'avb-2-1', 'pac'],
    pac: ['pjc', 'pvc', 'sinus-arrhythmia', 'sinus-arrest'],
    wap: ['sinus-arrhythmia', 'nsr', 'pac', 'afib'],
    svt: ['sinus-tach', 'flutter', 'vt', 'afib'],
    flutter: ['afib', 'svt', 'sinus-tach'],
    afib: ['flutter', 'sinus-arrhythmia', 'wap', 'vf'],
    pjc: ['pac', 'pvc', 'junctional-escape'],
    'junctional-escape': ['accel-junctional', 'sinus-brady', 'idioventricular', 'avb-3'],
    'accel-junctional': ['junctional-escape', 'nsr', 'wap'],
    idioventricular: ['junctional-escape', 'avb-3', 'paced', 'asystole'],
    pvc: ['pac', 'pjc', 'vt', 'paced'],
    vt: ['torsades', 'svt', 'vf', 'idioventricular'],
    torsades: ['vt', 'vf'],
    vf: ['torsades', 'asystole', 'vt', 'afib'],
    asystole: ['vf', 'idioventricular'],
    paced: ['idioventricular', 'pvc', 'vt'],
    'avb-1': ['nsr', 'avb-2-1', 'sinus-brady'],
    'avb-2-1': ['avb-2-2', 'avb-1', 'avb-3', 'sinus-arrest'],
    'avb-2-2': ['avb-2-1', 'avb-3', 'sinus-arrest'],
    'avb-3': ['avb-2-2', 'idioventricular', 'junctional-escape'],
    wpw: ['avb-1', 'nsr', 'pac']
  };

  // ---------- Saved state ----------
  var KEY = 'mscc-cardio-v1';
  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  var S = Object.assign({
    tab: 'strips',
    stripSel: STRIP_IDS.slice(),
    stripMode: 'mc',
    stripLen: 20,
    cardDecks: { strips: true, rules: true, care: false, conditions: false, treatments: false, basics: false },
    cardDir: 'forward',
    quizLen: 20,
    quizTopics: { strips: true, rules: true, care: true, conditions: true, treatments: true, basics: true },
    learn: 'rhythms',
    stats: {}
  }, loadSaved());
  S.stripSel = S.stripSel.filter(function (id) { return STRIP_IDS.indexOf(id) !== -1; });

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
  function acc(id, field) {
    var s = S.stats[id] && S.stats[id][field];
    return s && s.c + s.w ? s.c / (s.c + s.w) : null;
  }
  function stripWeakness(id) {
    var a = acc(id, 'strip');
    return a === null ? 0.5 : 1 - a;
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
  function newSeed() { return Math.floor(Math.random() * 4294967295); }

  function seg(name, value, options) {
    return '<div class="seg" role="group">' + options.map(function (o) {
      return '<button data-seg="' + name + '" data-val="' + esc(o[0]) + '" aria-pressed="' + (String(value) === String(o[0])) + '">' + esc(o[1]) + '</button>';
    }).join('') + '</div>';
  }
  function listHtml(list) {
    if (!list || !list.length) return '<p class="none">Not covered in the chapter</p>';
    return '<ul class="items">' + list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
  }
  function band(title, meta, hidden) {
    if (hidden) return '<div class="label-band hidden-name heart"><span class="label-name">? ? ?</span><span class="label-meta">' + esc(meta || 'Which one?') + '</span></div>';
    return '<div class="label-band heart"><span class="label-name">' + esc(title) + '</span><span class="label-meta">' + esc(meta || '') + '</span></div>';
  }
  function groupName(groups, id) {
    for (var i = 0; i < groups.length; i++) if (groups[i].id === id) return groups[i].name;
    return '';
  }
  function rulesHtml(r) {
    return '<dl class="rules">' + RULES.map(function (k) {
      return '<dt>' + k[1] + '</dt><dd>' + esc(r.rules[k[0]]) + '</dd>';
    }).join('') + '</dl>' +
      (r.std ? '<p class="std-note">Rules are standard ECG criteria; the slides leave this table blank.</p>' : '');
  }
  function stripHtml(id, seed) {
    return ECG.strip(id, seed == null ? newSeed() : seed);
  }
  function verdictPill(p) { return p >= 0.8 ? 'high' : p >= 0.5 ? 'mid' : 'low'; }

  // Multiple choice: correct plus up to 3 wrong, distinct by text.
  function mcFrom(correct, pool) {
    var opts = [correct];
    pool.forEach(function (p) {
      if (opts.length < 4 && opts.indexOf(p) === -1) opts.push(p);
    });
    if (opts.length < 3) return null;
    var s = shuffle(opts);
    return { options: s, answer: s.indexOf(correct) };
  }

  function rhythmDistractors(id, within) {
    var near = (CONFUSE[id] || []).filter(function (x) { return within.indexOf(x) !== -1; });
    var sameGroup = within.filter(function (x) { return x !== id && R_BY[x].group === R_BY[id].group; });
    var rest = within.filter(function (x) { return x !== id; });
    var out = [];
    shuffle(near).concat(shuffle(sameGroup), shuffle(rest)).forEach(function (x) { if (out.indexOf(x) === -1) out.push(x); });
    return out;
  }
  function rhythmMC(id, within) {
    if (within.length < 4) within = STRIP_IDS;
    var names = rhythmDistractors(id, within).slice(0, 3).map(function (x) { return R_BY[x].name; });
    return mcFrom(R_BY[id].name, names);
  }

  // ---------- Subject switch ----------
  var SUBJ_KEY = 'mscc-subject';
  var subject = 'pharm';
  try { subject = localStorage.getItem(SUBJ_KEY) || 'pharm'; } catch (e) { /* storage blocked */ }

  function setSubject(sub) {
    subject = sub === 'cardio' ? 'cardio' : 'pharm';
    try { localStorage.setItem(SUBJ_KEY, subject); } catch (e) { /* storage blocked */ }
    document.body.dataset.subject = subject;
    $('#subj-pharm').hidden = subject !== 'pharm';
    $('#subj-cardio').hidden = subject !== 'cardio';
    $all('[data-subject]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.subject === subject)); });
    $('#brand-name').textContent = subject === 'cardio' ? 'Rhythm Box' : 'Drug Box';
    $('#brand-sub').textContent = subject === 'cardio' ? 'Motlow State Paramedic · Ch. 21 Cardiology' : 'Motlow State Paramedic · TN protocols';
    document.title = subject === 'cardio' ? 'Paramedic Rhythm Box' : 'Paramedic Drug Box';
    if (subject === 'cardio') showTab(VIEWS[S.tab] ? S.tab : 'strips');
  }
  $all('[data-subject]').forEach(function (b) {
    b.addEventListener('click', function () { setSubject(b.dataset.subject); window.scrollTo(0, 0); });
  });

  // ---------- Tabs ----------
  var VIEWS = {};
  function showTab(tab) {
    S.tab = tab; save();
    $all('#subj-cardio .tab').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.ctab === tab)); });
    $all('#subj-cardio .view').forEach(function (v) { v.hidden = v.id !== 'cview-' + tab; });
    VIEWS[tab].show();
  }
  $all('#subj-cardio .tab').forEach(function (b) {
    b.addEventListener('click', function () { showTab(b.dataset.ctab); });
  });

  // =====================================================================
  // Strips: identify the rhythm
  // =====================================================================
  var stripsEl = $('#cview-strips');
  var X = null;

  function rhythmChips(selected) {
    return RGROUPS.map(function (g) {
      var list = RHYTHMS.filter(function (r) { return r.group === g.id && STRIP_IDS.indexOf(r.id) !== -1; });
      if (!list.length) return '';
      return '<div class="chip-group"><button class="btn link group-btn" data-rgroup="' + g.id + '">' + esc(g.name) + '</button><div class="chips">' +
        list.map(function (r) {
          return '<button class="chip" data-rhythm="' + r.id + '" aria-pressed="' + (selected.indexOf(r.id) !== -1) + '">' + esc(r.name) + '</button>';
        }).join('') + '</div></div>';
    }).join('');
  }
  function toggleRGroup(selected, gid) {
    var ids = STRIP_IDS.filter(function (id) { return R_BY[id].group === gid; });
    var allOn = ids.every(function (x) { return selected.indexOf(x) !== -1; });
    if (allOn) return selected.filter(function (x) { return ids.indexOf(x) === -1; });
    return selected.concat(ids.filter(function (x) { return selected.indexOf(x) === -1; }));
  }

  function stripsSetup() {
    var n = S.stripSel.length, y = window.scrollY;
    stripsEl.innerHTML =
      '<div><h2 class="title">Rhythm strips</h2><p class="lede">Name the rhythm on a 6-second lead II strip. Every strip is drawn fresh, so you never see the exact same one twice.</p></div>' +
      '<div class="panel">' +
      '<div class="field-row"><div class="row spread"><p class="eyebrow">Rhythms (' + n + ' of ' + STRIP_IDS.length + ')</p>' +
      '<div class="row"><button class="btn link" data-act="all">All</button><button class="btn link" data-act="none">None</button>' +
      '<button class="btn link" data-act="weak">Weakest 6</button></div></div>' + rhythmChips(S.stripSel) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Answer by</p>' +
      seg('stripMode', S.stripMode, [['mc', 'Choices'], ['list', 'List'], ['type', 'Type it']]) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Strips per round</p>' + seg('stripLen', S.stripLen, [[10, '10'], [20, '20'], [40, '40']]) + '</div>' +
      (n ? '' : '<p class="muted small">Tap rhythms above to add them.</p>') +
      '<div><button class="btn primary big" data-act="start"' + (n ? '' : ' disabled') + '>Start ' + S.stripLen + ' strips</button></div></div>';
    window.scrollTo(0, y);
  }

  function stripsStart(ids) {
    var list = [];
    // Spread rhythms evenly, then shuffle, so small sets still repeat fairly.
    while (list.length < S.stripLen) list = list.concat(shuffle(ids));
    list = list.slice(0, S.stripLen).map(function (id) { return { id: id, seed: newSeed() }; });
    X = { list: list, i: 0, right: 0, missed: [], state: null };
    stripsRender();
  }

  function stripsRender() {
    if (X.i >= X.list.length) return stripsDone();
    var item = X.list[X.i], st = X.state, r = R_BY[item.id];
    if (!item.mc) item.mc = rhythmMC(item.id, S.stripSel);
    var html = '<div class="progress-line"><span>Strip ' + (X.i + 1) + ' of ' + X.list.length + '</span><span>' + X.right + ' right</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(X.i / X.list.length * 100) + '%"></span></div>' +
      '<div class="panel">' + stripHtml(item.id, item.seed) +
      '<div class="row spread"><p class="q-prompt">What is this rhythm?</p>' +
      (st ? '' : seg('stripMode', S.stripMode, [['mc', 'Choices'], ['list', 'List'], ['type', 'Type']])) + '</div>';
    if (S.stripMode === 'mc') {
      html += '<div class="options">' + item.mc.options.map(function (o, i) {
        var cls = 'option';
        if (st) { if (i === item.mc.answer) cls += ' right'; else if (i === st.choice) cls += ' wrong'; }
        return '<button class="' + cls + '" data-opt="' + i + '"' + (st ? ' disabled' : '') + '><span class="key">' + 'ABCD'[i] + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>';
    } else if (S.stripMode === 'list') {
      var pool = S.stripSel.length >= 4 ? S.stripSel : STRIP_IDS;
      html += RGROUPS.map(function (g) {
        var ids = pool.filter(function (id) { return R_BY[id].group === g.id; });
        if (!ids.length) return '';
        return '<div class="pick-group"><p class="eyebrow">' + esc(g.name) + '</p><div class="chips">' + ids.map(function (id) {
          var cls = 'chip pick';
          if (st && id === item.id) cls += ' right';
          else if (st && id === st.pickId) cls += ' wrong';
          return '<button class="' + cls + '" data-pick="' + id + '"' + (st ? ' disabled' : '') + '>' + esc(R_BY[id].name) + '</button>';
        }).join('') + '</div></div>';
      }).join('');
    } else {
      html += '<form class="row" data-form="answer"><input type="text" id="strip-answer" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Rhythm name"' +
        (st ? ' disabled value="' + esc(st.text) + '"' : '') + ' style="flex:1;min-width:0">' + (st ? '' : '<button class="btn primary" type="submit">Check</button>') + '</form>';
    }
    if (st) {
      html += '<div class="verdict ' + (st.ok ? 'ok' : 'no') + '"><p class="v-title">' + (st.ok ? 'Correct: ' : 'It\'s ') + esc(r.name) + '</p>' +
        '<p>' + esc(r.look) + '</p>' + rulesHtml(r);
      if (!st.ok && st.otherId && R_BY[st.otherId]) {
        html += '<p class="small"><strong>' + esc(R_BY[st.otherId].name) + '</strong> would look like this instead: ' + esc(R_BY[st.otherId].look) + '</p>';
      }
      if (S.stripMode === 'type') html += '<div><button class="btn link" data-act="override">' + (st.ok ? 'Actually, count it wrong' : 'I was right, count it') + '</button></div>';
      html += '</div><div class="row"><button class="btn primary big" data-act="next">' + (X.i + 1 < X.list.length ? 'Next strip' : 'See results') + '</button>' +
        '<button class="btn" data-act="another">Another ' + esc(r.name) + '</button></div>';
    }
    html += '</div><p class="kbd-hint">Keys: A–D to answer · Enter for next</p>';
    stripsEl.innerHTML = html;
    var inp = $('#strip-answer');
    if (inp && !st) inp.focus();
    else if (st) { var nx = $('[data-act="next"]', stripsEl); if (nx) nx.focus({ preventScroll: true }); }
  }

  function nameMatchesRhythm(text, r) {
    return G.nameMatches(text, { name: r.name, aliases: r.aliases || [], trade: [] });
  }

  function stripsAnswer(ok, extra) {
    X.state = Object.assign({ ok: ok }, extra);
    stripsRender();
  }

  function stripsNext() {
    var item = X.list[X.i];
    record(item.id, 'strip', X.state.ok);
    if (X.state.ok) X.right++; else X.missed.push(item.id);
    X.i++;
    X.state = null;
    stripsRender();
    window.scrollTo(0, 0);
  }

  function stripsDone() {
    var pct = Math.round(X.right / X.list.length * 100);
    var counts = {};
    X.missed.forEach(function (id) { counts[id] = (counts[id] || 0) + 1; });
    var missedIds = Object.keys(counts);
    stripsEl.innerHTML =
      '<div class="panel"><p class="eyebrow">Round complete</p><p class="score-big">' + pct + '%</p>' +
      '<p class="lede">' + X.right + ' of ' + X.list.length + ' strips named correctly.</p>' +
      '<div class="row">' + (missedIds.length ? '<button class="btn primary" data-act="retry">Practice the ' + missedIds.length + ' I missed</button>' : '') +
      '<button class="btn" data-act="new">New round</button></div></div>' +
      (missedIds.length ? '<div class="panel"><p class="eyebrow">Missed</p><ul class="missed-list">' + missedIds.map(function (id) {
        return '<li><strong>' + esc(R_BY[id].name) + (counts[id] > 1 ? ' ×' + counts[id] : '') + '</strong><span class="muted small">' + esc(R_BY[id].look) + '</span></li>';
      }).join('') + '</ul></div>' : '');
  }

  stripsEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-seg],[data-opt],[data-pick],[data-rhythm],[data-rgroup]');
    if (!t) return;
    if (t.dataset.seg) {
      S[t.dataset.seg] = t.dataset.seg === 'stripLen' ? Number(t.dataset.val) : t.dataset.val;
      save();
      if (X && X.i < X.list.length) return stripsRender();
      return stripsSetup();
    }
    if (t.dataset.rhythm) {
      var i = S.stripSel.indexOf(t.dataset.rhythm);
      if (i === -1) S.stripSel.push(t.dataset.rhythm); else S.stripSel.splice(i, 1);
      save(); return stripsSetup();
    }
    if (t.dataset.rgroup) { S.stripSel = toggleRGroup(S.stripSel, t.dataset.rgroup); save(); return stripsSetup(); }
    var item = X && X.list[X.i];
    if (t.dataset.opt && item && !X.state) {
      var choice = Number(t.dataset.opt), chosen = item.mc.options[choice];
      var other = RHYTHMS.filter(function (r) { return r.name === chosen; })[0];
      return stripsAnswer(choice === item.mc.answer, { choice: choice, otherId: other && other.id });
    }
    if (t.dataset.pick && item && !X.state) {
      return stripsAnswer(t.dataset.pick === item.id, { pickId: t.dataset.pick, otherId: t.dataset.pick });
    }
    var act = t.dataset.act;
    if (act === 'all') { S.stripSel = STRIP_IDS.slice(); save(); return stripsSetup(); }
    if (act === 'none') { S.stripSel = []; save(); return stripsSetup(); }
    if (act === 'weak') {
      S.stripSel = STRIP_IDS.slice().sort(function (a, b) { return stripWeakness(b) - stripWeakness(a); }).slice(0, 6);
      save(); return stripsSetup();
    }
    if (act === 'start') return stripsStart(S.stripSel);
    if (act === 'next') return stripsNext();
    if (act === 'another') { item.seed = newSeed(); return stripsRender(); }
    if (act === 'override') { X.state.ok = !X.state.ok; return stripsRender(); }
    if (act === 'retry') return stripsStart(Object.keys(X.missed.reduce(function (m, id) { m[id] = 1; return m; }, {})));
    if (act === 'new') { X = null; return stripsSetup(); }
  });
  stripsEl.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = $('#strip-answer').value.trim();
    if (!v || X.state) return;
    var item = X.list[X.i];
    var guess = RHYTHMS.filter(function (r) { return nameMatchesRhythm(v, r); })[0];
    stripsAnswer(nameMatchesRhythm(v, R_BY[item.id]), { text: v, otherId: guess && guess.id !== item.id ? guess.id : null });
  });

  VIEWS.strips = { show: function () { if (X && X.i < X.list.length) stripsRender(); else if (X) stripsDone(); else stripsSetup(); } };

  // =====================================================================
  // Flashcards
  // =====================================================================
  var cardsEl = $('#cview-cards');
  var C = null;
  var DECKS = [
    ['strips', 'Rhythm strips', 'Strip on the front, name it'],
    ['rules', 'Rhythm rules', 'Rate, rhythm, QRS, P waves, PR'],
    ['care', 'Rhythm causes & care', 'Causes, significance, management'],
    ['conditions', 'Conditions', 'ACS, heart failure, tamponade, dissection…'],
    ['treatments', 'Treatments & devices', 'CPR, defib, cardioversion, pacing, ICD, LVAD…'],
    ['basics', 'ECG basics', 'Waves, intervals, paper, leads, axis']
  ];

  function dirFor() { return S.cardDir === 'mixed' ? (Math.random() < 0.5 ? 'forward' : 'reverse') : S.cardDir; }

  function buildCards() {
    var list = [], d = S.cardDecks;
    if (d.strips) STRIP_IDS.forEach(function (id) { list.push({ kind: 'strip', id: id, field: 'strip' }); });
    if (d.rules) RHYTHMS.forEach(function (r) { list.push({ kind: 'rules', id: r.id, field: 'rules', dir: dirFor() }); });
    if (d.care) RHYTHMS.forEach(function (r) {
      CARE.forEach(function (f) { if (r[f[0]].length) list.push({ kind: 'care', id: r.id, field: f[0], dir: 'forward' }); });
    });
    TOPICS.forEach(function (t) {
      if (t.kind === 'condition' ? !d.conditions : !d.treatments) return;
      TFIELDS.forEach(function (f) { if ((t[f[0]] || []).length) list.push({ kind: 'topic', id: t.id, field: f[0], dir: dirFor() }); });
    });
    if (d.basics) BASICS.forEach(function (b, i) { list.push({ kind: 'basic', id: 'b' + i, idx: i, field: 'basics' }); });
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
      '<div class="field-row"><p class="eyebrow">Card front (rules, conditions, treatments)</p>' +
      seg('cardDir', S.cardDir, [['forward', 'Name → info'], ['reverse', 'Info → name'], ['mixed', 'Mixed']]) + '</div>' +
      '<div><button class="btn primary big" data-act="start"' + (n ? '' : ' disabled') + '>Start ' + n + ' cards</button></div></div>';
  }

  function cardFace(card, flipped) {
    var r = R_BY[card.id], t = T_BY[card.id];
    if (card.kind === 'strip') {
      if (!card.seed) card.seed = newSeed();
      return band(flipped ? r.name : '', 'Name the rhythm', !flipped) + '<div class="card-body">' + stripHtml(card.id, card.seed) +
        (flipped ? '<hr class="divider"><p>' + esc(r.look) + '</p>' : '<p class="hint">Tap to flip</p>') + '</div>';
    }
    if (card.kind === 'rules') {
      if (card.dir === 'reverse') {
        return band(r.name, 'Rules for interpretation', !flipped) + '<div class="card-body">' + rulesHtml(r) +
          (flipped ? '' : '<p class="hint">Which rhythm? Tap to flip</p>') + '</div>';
      }
      return band(r.name, groupName(RGROUPS, r.group)) + '<div class="card-body"><p class="ask">Rules for interpretation?</p>' +
        (flipped ? '<hr class="divider">' + rulesHtml(r) + '<p class="small">' + esc(r.look) + '</p>' : '<p class="hint">Tap to flip</p>') + '</div>';
    }
    if (card.kind === 'care') {
      var label = CARE.filter(function (f) { return f[0] === card.field; })[0][1];
      return band(r.name, groupName(RGROUPS, r.group)) + '<div class="card-body"><p class="ask">' + esc(label) + '?</p>' +
        (flipped ? '<hr class="divider">' + listHtml(r[card.field]) : '<p class="hint">Tap to flip</p>') + '</div>';
    }
    if (card.kind === 'topic') {
      var tl = TFIELDS.filter(function (f) { return f[0] === card.field; })[0][1];
      if (card.dir === 'reverse') {
        return band(t.name, tl, !flipped) + '<div class="card-body"><p class="eyebrow">' + esc(tl) + '</p>' + listHtml(t[card.field]) +
          (flipped ? '' : '<p class="hint">Which one is this? Tap to flip</p>') + '</div>';
      }
      return band(t.name, groupName(TGROUPS, t.group)) + '<div class="card-body"><p class="ask">' + esc(tl) + '?</p>' +
        (flipped ? '<hr class="divider">' + listHtml(t[card.field]) : '<p class="hint">Tap to flip</p>') + '</div>';
    }
    var b = BASICS[card.idx];
    return band('ECG basics', '') + '<div class="card-body"><p class="ask">' + esc(b.q) + '</p>' +
      (flipped ? '<hr class="divider"><p class="answer">' + esc(b.a) + '</p>' : '<p class="hint">Tap to flip</p>') + '</div>';
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

  function cardStatField(card) {
    if (card.kind === 'strip') return 'strip';
    if (card.kind === 'rules') return 'rules';
    if (card.kind === 'care') return 'care';
    if (card.kind === 'topic') return 'topic';
    return 'basics';
  }

  function cardAnswer(ok) {
    var card = C.queue.shift();
    var key = card.kind + ':' + card.id + ':' + card.field + ':' + (card.dir || '');
    record(card.id, cardStatField(card), ok);
    if (ok) {
      if (!C.again.has(key)) C.firstTry++;
      C.again.delete(key);
    } else {
      if (!C.again.has(key)) C.missedCards.push(Object.assign({}, card, { seed: null }));
      C.again.add(key);
      card.seed = null;
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
    var k = e.target.dataset && e.target.dataset.deck;
    if (k) { S.cardDecks[k] = e.target.checked; save(); cardsSetup(); }
  });

  VIEWS.cards = { show: function () { if (C && C.queue.length) cardsRender(); else if (!C) cardsSetup(); } };

  // =====================================================================
  // Quiz
  // =====================================================================
  var quizEl = $('#cview-quiz');
  var Q = null;
  var QTOPICS = [['strips', 'Rhythm strips'], ['rules', 'Rhythm rules'], ['care', 'Rhythm causes & care'],
    ['conditions', 'Conditions'], ['treatments', 'Treatments & devices'], ['basics', 'ECG basics']];

  function notIn(list, item) {
    return !list.some(function (x) { return x === item || G.sameItem(x, item); });
  }

  // Wrong answers for "which of these is a <field> of X": items from other
  // entries that X's own list doesn't contain.
  function foreignItems(own, entries, field) {
    var out = [];
    shuffle(entries).forEach(function (o) {
      (o[field] || []).forEach(function (x) {
        if (out.indexOf(x) === -1 && notIn(own, x)) out.push(x);
      });
    });
    return shuffle(out);
  }

  var QGEN = {
    strips: function () {
      var id = pick(STRIP_IDS), mc = rhythmMC(id, STRIP_IDS);
      return { id: id, stat: 'strip', seed: newSeed(), strip: true, prompt: 'What is this rhythm?', options: mc.options, answer: mc.answer, explain: 'rhythm' };
    },
    rules: function () {
      var r = pick(RHYTHMS);
      if (Math.random() < 0.5) {
        var mc = rhythmMC(r.id, RHYTHMS.map(function (x) { return x.id; }));
        return { id: r.id, stat: 'rules', prompt: 'Which rhythm fits these rules?', block: rulesTable(r), options: mc.options, answer: mc.answer, explain: 'rhythm' };
      }
      var k = pick(RULES);
      var pool = shuffle(RHYTHMS.filter(function (o) { return o.rules[k[0]] !== r.rules[k[0]]; }).map(function (o) { return o.rules[k[0]]; }));
      var m2 = mcFrom(r.rules[k[0]], pool);
      return { id: r.id, stat: 'rules', prompt: esc(k[1]) + ' in <q>' + esc(r.name) + '</q>?', options: m2.options, answer: m2.answer, explain: 'rhythm' };
    },
    care: function () {
      for (var tries = 0; tries < 20; tries++) {
        var r = pick(RHYTHMS), f = pick(CARE);
        var own = r[f[0]];
        if (!own.length) continue;
        var item = pick(own);
        if (Math.random() < 0.5) {
          var wrong = foreignItems(own, RHYTHMS.filter(function (o) { return o.group !== r.group; }), f[0]);
          var mc = mcFrom(item, wrong);
          if (!mc) continue;
          var label = { causes: 'a cause of', significance: 'true of', management: 'part of the management of' }[f[0]];
          return { id: r.id, stat: 'care', prompt: 'Which of these is ' + label + ' <q>' + esc(r.name) + '</q>?', options: mc.options, answer: mc.answer, explain: 'rhythm', field: f };
        }
        var others = RHYTHMS.filter(function (o) { return o.id !== r.id && notIn(o[f[0]], item); });
        var m2 = mcFrom(r.name, shuffle(others).map(function (o) { return o.name; }));
        if (!m2) continue;
        var lead = { causes: 'Which rhythm can be caused by', significance: 'Which rhythm does this describe:', management: 'Which rhythm is managed with' }[f[0]];
        return { id: r.id, stat: 'care', prompt: lead + ' <q>' + esc(item) + '</q>?', options: m2.options, answer: m2.answer, explain: 'rhythm', field: f };
      }
      return null;
    },
    conditions: function () { return topicQ('condition'); },
    treatments: function () { return topicQ('treatment'); },
    basics: function () {
      var i = Math.floor(Math.random() * BASICS.length), b = BASICS[i];
      var mc = mcFrom(b.a, shuffle(b.wrong));
      return { id: 'b' + i, idx: i, stat: 'basics', prompt: esc(b.q), options: mc.options, answer: mc.answer, explain: 'basic' };
    }
  };

  function topicQ(kind) {
    var pool = TOPICS.filter(function (t) { return t.kind === kind; });
    for (var tries = 0; tries < 20; tries++) {
      var t = pick(pool), fields = TFIELDS.filter(function (f) { return (t[f[0]] || []).length; });
      var f = pick(fields), item = pick(t[f[0]]);
      if (Math.random() < 0.5) {
        var others = pool.filter(function (o) { return o.id !== t.id && notIn(o[f[0]] || [], item); });
        var mc = mcFrom(t.name, shuffle(others).map(function (o) { return o.name; }));
        if (!mc) continue;
        var lead = { about: 'Which one is this:', signs: 'Which condition has this sign:', ecg: 'Which one shows this on the ECG:', management: kind === 'treatment' ? 'Which one does this apply to:' : 'Which condition is managed with' }[f[0]];
        return { id: t.id, stat: 'topic', prompt: lead + ' <q>' + esc(item) + '</q>?', options: mc.options, answer: mc.answer, explain: 'topic', field: f };
      }
      var wrong = foreignItems(t[f[0]], pool.filter(function (o) { return o.id !== t.id; }), f[0]);
      var m2 = mcFrom(item, wrong);
      if (!m2) continue;
      var lead2 = { about: 'Which is true of', signs: 'Which is a sign or symptom of', ecg: 'Which ECG finding goes with', management: kind === 'treatment' ? 'Which is correct for' : 'Which is part of the management of' }[f[0]];
      return { id: t.id, stat: 'topic', prompt: lead2 + ' <q>' + esc(t.name) + '</q>?', options: m2.options, answer: m2.answer, explain: 'topic', field: f };
    }
    return null;
  }

  function rulesTable(r) {
    return '<dl class="rules">' + RULES.map(function (k) { return '<dt>' + k[1] + '</dt><dd>' + esc(r.rules[k[0]]) + '</dd>'; }).join('') + '</dl>';
  }

  function buildQuiz() {
    var topics = QTOPICS.map(function (k) { return k[0]; }).filter(function (k) { return S.quizTopics[k]; });
    if (!topics.length) return [];
    var out = [], seen = {};
    for (var i = 0; out.length < S.quizLen && i < S.quizLen * 10; i++) {
      var q = QGEN[pick(topics)]();
      if (!q) continue;
      var key = q.prompt + q.options.join('|') + (q.strip ? q.id + i : '');
      if (seen[key]) continue;
      seen[key] = true;
      out.push(q);
    }
    return out;
  }

  function quizSetup(error) {
    quizEl.innerHTML =
      '<div><h2 class="title">Quiz</h2><p class="lede">Multiple-choice questions mixed from everything you pick: strips, rhythm rules, conditions, treatments and ECG basics.</p></div>' +
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
    if (q.explain === 'rhythm') {
      var r = R_BY[q.id];
      var extra = q.field ? '<p class="eyebrow">' + esc(q.field[1]) + '</p>' + listHtml(r[q.field[0]]) : '<p>' + esc(r.look) + '</p>' + rulesHtml(r);
      return '<p><strong>' + esc(r.name) + '</strong></p>' + extra;
    }
    if (q.explain === 'topic') {
      var t = T_BY[q.id];
      return '<p><strong>' + esc(t.name) + '</strong></p><p class="eyebrow">' + esc(q.field[1]) + '</p>' + listHtml(t[q.field[0]]);
    }
    return '<p>' + esc(BASICS[q.idx].a) + '</p>';
  }

  function quizRender() {
    if (Q.i >= Q.list.length) return quizDone();
    var q = Q.list[Q.i], st = Q.state;
    var html = '<div class="progress-line"><span>Question ' + (Q.i + 1) + ' of ' + Q.list.length + '</span><span>' + Q.right + ' right</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(Q.i / Q.list.length * 100) + '%"></span></div>' +
      '<div class="panel">' + (q.strip ? stripHtml(q.id, q.seed) : '') + '<p class="q-prompt">' + q.prompt + '</p>' + (q.block || '') +
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
        return '<li><span>' + (q.strip ? 'Strip: ' : '') + q.prompt + '</span><span class="muted small">Answer: <strong>' + esc(q.options[q.answer]) + '</strong></span></li>';
      }).join('') + '</ul></div>' : '');
  }

  function quizChoose(choice) {
    var q = Q.list[Q.i];
    Q.state = { ok: choice === q.answer, choice: choice };
    quizRender();
  }

  quizEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-seg],[data-opt]');
    if (!t) return;
    if (t.dataset.seg) { S[t.dataset.seg] = Number(t.dataset.val); save(); return quizSetup(); }
    if (t.dataset.opt && Q && !Q.state) return quizChoose(Number(t.dataset.opt));
    var act = t.dataset.act;
    if (act === 'start') return quizStart(buildQuiz());
    if (act === 'next') return quizNext();
    if (act === 'retry') return quizStart(shuffle(Q.missed.map(function (q) { return Object.assign({}, q, { seed: newSeed() }); })));
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
  var learnEl = $('#cview-learn');
  var learnQuery = '';

  function hay(parts) { return parts.join(' ').toLowerCase(); }

  function rhythmRef(r) {
    return '<details class="ref" data-ref-rhythm="' + r.id + '"><summary><span class="r-name">' + esc(r.name) + '</span></summary>' +
      '<div class="ref-body">' + (STRIP_IDS.indexOf(r.id) !== -1 ? '<div class="strip-slot"></div><div><button class="btn" data-act="new-example">New example</button></div>' : '') +
      '<p><strong>Look for:</strong> ' + esc(r.look) + '</p>' +
      '<div><h4 class="ref-h">Rules for interpretation</h4>' + rulesHtml(r) + '</div>' +
      '<div class="core-grid">' + CARE.map(function (f) {
        return r[f[0]].length ? '<div' + (f[0] === 'management' ? ' class="span2"' : '') + '><h4>' + f[1] + '</h4>' + listHtml(r[f[0]]) + '</div>' : '';
      }).join('') + '</div></div></details>';
  }

  function topicRef(t) {
    return '<details class="ref"><summary><span class="r-name">' + esc(t.name) + '</span></summary>' +
      '<div class="ref-body"><div class="core-grid">' + TFIELDS.map(function (f) {
        var list = t[f[0]] || [];
        if (!list.length) return '';
        return '<div' + (f[0] === 'management' || f[0] === 'about' ? ' class="span2"' : '') + '><h4>' + (t.kind === 'treatment' && f[0] === 'management' ? 'Key points' : f[1]) + '</h4>' + listHtml(list) + '</div>';
      }).join('') + '</div></div></details>';
  }

  function learnRender() {
    learnEl.innerHTML =
      '<div><h2 class="title">Learn</h2><p class="lede">Everything from the Chapter 21 slides and outline. Open a rhythm to see a sample strip.</p></div>' +
      seg('learn', S.learn, [['rhythms', 'Rhythms'], ['conditions', 'Conditions'], ['treatments', 'Treatments'], ['basics', 'Basics']]) +
      '<input type="search" id="learn-q" placeholder="Search…" value="' + esc(learnQuery) + '">' +
      '<div class="ref-list" id="learn-list"></div>';
    learnFilter();
  }

  function learnFilter() {
    var q = learnQuery.toLowerCase().trim(), html = '';
    if (S.learn === 'rhythms') {
      html = RGROUPS.map(function (g) {
        var list = RHYTHMS.filter(function (r) {
          if (r.group !== g.id) return false;
          if (!q) return true;
          var rr = r.rules;
          return hay([r.name, r.look, rr.rate, rr.rhythm, rr.qrs, rr.p, rr.pr].concat(r.aliases, r.causes, r.significance, r.management)).indexOf(q) !== -1;
        });
        return list.length ? '<p class="eyebrow ref-group">' + esc(g.name) + '</p>' + list.map(rhythmRef).join('') : '';
      }).join('');
    } else if (S.learn === 'basics') {
      var list = BASICS.filter(function (b) { return !q || hay([b.q, b.a]).indexOf(q) !== -1; });
      html = list.length ? '<div class="table-wrap"><table class="grid basics"><tbody>' + list.map(function (b) {
        return '<tr><td>' + esc(b.q) + '</td><td><strong>' + esc(b.a) + '</strong>' + (b.std ? ' <span class="std-mark" title="Standard ECG fact; not spelled out on the slides">*</span>' : '') + '</td></tr>';
      }).join('') + '</tbody></table></div><p class="std-note">* Standard ECG facts that the slides use but don\'t spell out.</p>' : '';
    } else {
      var kind = S.learn === 'conditions' ? 'condition' : 'treatment';
      html = TGROUPS.map(function (g) {
        var list2 = TOPICS.filter(function (t) {
          if (t.kind !== kind || t.group !== g.id) return false;
          if (!q) return true;
          return hay([t.name].concat(t.aliases, t.about, t.signs, t.ecg, t.management)).indexOf(q) !== -1;
        });
        return list2.length ? '<p class="eyebrow ref-group">' + esc(g.name) + '</p>' + list2.map(topicRef).join('') : '';
      }).join('');
    }
    $('#learn-list').innerHTML = html || '<p class="none">Nothing matches that search.</p>';
  }

  learnEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-seg],[data-act]');
    if (!t) return;
    if (t.dataset.seg) { S.learn = t.dataset.val; save(); return learnRender(); }
    if (t.dataset.act === 'new-example') {
      var d = t.closest('[data-ref-rhythm]');
      $('.strip-slot', d).innerHTML = stripHtml(d.dataset.refRhythm);
    }
  });
  learnEl.addEventListener('input', function (e) {
    if (e.target.id === 'learn-q') { learnQuery = e.target.value; learnFilter(); }
  });
  // Draw a sample strip the first time a rhythm is opened.
  learnEl.addEventListener('toggle', function (e) {
    var d = e.target;
    if (!d.open || !d.dataset || !d.dataset.refRhythm) return;
    var slot = $('.strip-slot', d);
    if (slot && !slot.innerHTML) slot.innerHTML = stripHtml(d.dataset.refRhythm);
  }, true);

  VIEWS.learn = { show: function () { if (!$('#learn-list')) learnRender(); } };

  // =====================================================================
  // Stats
  // =====================================================================
  var statsEl = $('#cview-stats');
  var confirmReset = false;

  function cell(id, field) {
    var s = S.stats[id] && S.stats[id][field];
    if (!s) return '<td class="cell"><span class="pill none">–</span></td>';
    var p = s.c / (s.c + s.w);
    return '<td class="cell"><span class="pill ' + verdictPill(p) + '" title="' + s.c + ' right, ' + s.w + ' wrong">' + Math.round(p * 100) + '%</span></td>';
  }

  function statsRender() {
    var answered = 0, right = 0;
    Object.keys(S.stats).forEach(function (id) {
      Object.keys(S.stats[id]).forEach(function (f) { answered += S.stats[id][f].c + S.stats[id][f].w; right += S.stats[id][f].c; });
    });
    var stripTotals = STRIP_IDS.reduce(function (m, id) {
      var s = S.stats[id] && S.stats[id].strip;
      if (s) { m.c += s.c; m.n += s.c + s.w; }
      return m;
    }, { c: 0, n: 0 });
    var rhythmRows = RHYTHMS.slice().sort(function (a, b) { return stripWeakness(b.id) - stripWeakness(a.id); }).map(function (r) {
      return '<tr><td>' + esc(r.name) + '</td>' + cell(r.id, 'strip') + cell(r.id, 'rules') + cell(r.id, 'care') + '</tr>';
    }).join('');
    var topicRows = TOPICS.filter(function (t) { return S.stats[t.id]; }).sort(function (a, b) { return (acc(a.id, 'topic') || 0) - (acc(b.id, 'topic') || 0); }).map(function (t) {
      return '<tr><td>' + esc(t.name) + '</td>' + cell(t.id, 'topic') + '</tr>';
    }).join('');
    var basics = BASICS.reduce(function (m, b, i) {
      var s = S.stats['b' + i] && S.stats['b' + i].basics;
      if (s) { m.c += s.c; m.n += s.c + s.w; }
      return m;
    }, { c: 0, n: 0 });
    statsEl.innerHTML =
      '<div><h2 class="title">Progress</h2><p class="lede">Weakest rhythms first. Progress is saved in this browser only.</p></div>' +
      '<div class="stats-row"><div class="stat"><div class="n">' + answered + '</div><div class="l">Answers</div></div>' +
      '<div class="stat"><div class="n">' + (answered ? Math.round(right / answered * 100) + '%' : '–') + '</div><div class="l">Accuracy</div></div>' +
      '<div class="stat"><div class="n">' + (stripTotals.n ? Math.round(stripTotals.c / stripTotals.n * 100) + '%' : '–') + '</div><div class="l">Strips named</div></div></div>' +
      '<div class="row"><button class="btn primary" data-act="weak">Practice my weakest 6 strips</button></div>' +
      '<div class="table-wrap"><table class="grid"><thead><tr><th>Rhythm</th><th style="text-align:center">Strip</th><th style="text-align:center">Rules</th><th style="text-align:center">Care</th></tr></thead><tbody>' +
      rhythmRows + '</tbody></table></div>' +
      (topicRows ? '<div class="table-wrap"><table class="grid"><thead><tr><th>Condition or treatment</th><th style="text-align:center">Score</th></tr></thead><tbody>' + topicRows + '</tbody></table></div>' : '') +
      (basics.n ? '<p class="muted">ECG basics: ' + Math.round(basics.c / basics.n * 100) + '% of ' + basics.n + ' answers right.</p>' : '') +
      '<div class="row">' + (confirmReset
        ? '<span class="muted">Erase all cardiology progress?</span><button class="btn bad" data-act="reset-yes">Erase</button><button class="btn" data-act="reset-no">Keep it</button>'
        : '<button class="btn link" data-act="reset">Reset progress</button>') + '</div>';
  }

  statsEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    var act = t.dataset.act;
    if (act === 'weak') {
      S.stripSel = STRIP_IDS.slice().sort(function (a, b) { return stripWeakness(b) - stripWeakness(a); }).slice(0, 6);
      save(); X = null;
      return showTab('strips');
    }
    if (act === 'reset') confirmReset = true;
    if (act === 'reset-no') confirmReset = false;
    if (act === 'reset-yes') { S.stats = {}; save(); confirmReset = false; }
    statsRender();
  });

  VIEWS.stats = { show: statsRender };

  // ---------- Keyboard shortcuts ----------
  document.addEventListener('keydown', function (e) {
    if (subject !== 'cardio') return;
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
    } else if (S.tab === 'strips' && X && X.i < X.list.length) {
      var item = X.list[X.i];
      if (!X.state && !typing && S.stripMode === 'mc' && idx !== -1 && idx < item.mc.options.length) {
        var other = RHYTHMS.filter(function (r) { return r.name === item.mc.options[idx]; })[0];
        stripsAnswer(idx === item.mc.answer, { choice: idx, otherId: other && other.id });
      } else if (X.state && e.key === 'Enter' && tag !== 'button') { e.preventDefault(); stripsNext(); }
    }
  });

  setSubject(subject);
})();
