/* Drug Box: flashcards, quizzes and write-out drills over window.DRUGS. */
(function () {
  'use strict';

  var DRUGS = window.DRUGS;
  var GROUPS = window.DRUG_GROUPS;
  var G = window.Grading;
  var BY_ID = {};
  DRUGS.forEach(function (d) { BY_ID[d.id] = d; });

  // ---------- Fields ----------
  var FIELDS = {
    indications: { label: 'Indications', core: true, kind: 'list', get: function (d) { return d.indications; } },
    contraindications: { label: 'Contraindications', core: true, kind: 'list', get: function (d) { return d.contraindications; } },
    adult: { label: 'Adult dose', core: true, kind: 'dose', get: function (d) { return d.adult; } },
    peds: { label: 'Pediatric dose', core: true, kind: 'dose', get: function (d) { return d.peds; } },
    trade: { label: 'Trade names', kind: 'list', get: function (d) { return d.trade || []; } },
    classes: {
      label: 'Classification', kind: 'list',
      get: function (d) {
        var out = [];
        if (d.therapeutic) out.push('Therapeutic: ' + d.therapeutic);
        if (d.pharmacological) out.push('Pharmacological: ' + d.pharmacological);
        return out;
      }
    },
    moa: { label: 'Mechanism of action', kind: 'text', get: function (d) { return d.moa ? [d.moa] : []; } },
    adverse: { label: 'Adverse reactions', kind: 'list', get: function (d) { return d.adverse || []; } },
    cautions: { label: 'Cautions', kind: 'list', get: function (d) { return d.cautions || []; } }
  };
  var CORE = ['indications', 'contraindications', 'adult', 'peds'];
  var EXTRA = ['trade', 'classes', 'moa', 'adverse', 'cautions'];

  function items(d, f) { return FIELDS[f].get(d) || []; }

  // ---------- Saved state ----------
  var KEY = 'mscc-drugbox-v1';
  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  var S = Object.assign({
    selected: DRUGS.map(function (d) { return d.id; }),
    fields: { indications: true, contraindications: true, adult: true, peds: true },
    stats: {},
    tab: 'cards',
    cardDir: 'forward',
    cardOrder: 'shuffle',
    quizLen: 20,
    quizTypes: { mc: true, dose: true, name: true, recall: true },
    woSelected: DRUGS.map(function (d) { return d.id; }),
    woOrder: 'shuffle'
  }, loadSaved());
  S.selected = S.selected.filter(function (id) { return BY_ID[id]; });
  if (!S.selected.length) S.selected = DRUGS.map(function (d) { return d.id; });
  S.woSelected = S.woSelected.filter(function (id) { return BY_ID[id]; });

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ }
  }

  function activeFields() { return CORE.concat(EXTRA).filter(function (f) { return S.fields[f]; }); }
  function selectedDrugs() { return DRUGS.filter(function (d) { return S.selected.indexOf(d.id) !== -1; }); }

  function record(id, field, ok) {
    var byDrug = S.stats[id] || (S.stats[id] = {});
    var s = byDrug[field] || (byDrug[field] = { c: 0, w: 0 });
    if (ok) s.c++; else s.w++;
    s.t = Date.now();
    save();
  }
  function acc(id, field) {
    var s = S.stats[id] && S.stats[id][field];
    return s && s.c + s.w ? s.c / (s.c + s.w) : null;
  }
  function weakness(id) {
    var total = 0;
    CORE.forEach(function (f) {
      var a = acc(id, f);
      total += a === null ? 0.5 : 1 - a;
    });
    return total / CORE.length;
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

  function labStyle(d) { return 'style="--lab: var(--lab-' + esc(d.label || 'other') + ')"'; }
  function striped(d) { return d.label === 'antagonist' ? ' striped' : ''; }
  var LABEL_NAMES = {
    induction: 'Induction agent', benzo: 'Benzodiazepine', nmb: 'Neuromuscular blocker', opioid: 'Opioid',
    antagonist: 'Opioid antagonist', vasopressor: 'Vasopressor', local: 'Local anesthetic',
    anticholinergic: 'Anticholinergic', antiemetic: 'Antiemetic', other: 'General'
  };

  function band(d, hideName) {
    if (hideName) {
      return '<div class="label-band hidden-name"><span class="label-name">? ? ?</span><span class="label-meta">Which drug?</span></div>';
    }
    return '<div class="label-band' + striped(d) + '" ' + labStyle(d) + '>' +
      '<span class="label-name">' + esc(d.name) + '</span>' +
      '<span class="label-meta">' + esc(d.concentration || (d.trade && d.trade[0]) || '') + '</span></div>';
  }

  function listHtml(list, f) {
    if (!list.length) return '<p class="none">Not listed in the deck</p>';
    var cls = FIELDS[f] && FIELDS[f].kind === 'dose' ? 'items dose' : 'items';
    return '<ul class="' + cls + '">' + list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
  }

  function fieldNames(fields) {
    return fields.map(function (f) { return FIELDS[f].label; }).join(', ');
  }

  // ---------- Tabs ----------
  var VIEWS = {};
  function showTab(tab) {
    S.tab = tab; save();
    $all('#subj-pharm .tab').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.tab === tab)); });
    $all('#subj-pharm .view').forEach(function (v) { v.hidden = v.id !== 'view-' + tab; });
    VIEWS[tab].show();
  }
  $all('#subj-pharm .tab').forEach(function (b) {
    b.addEventListener('click', function () { showTab(b.dataset.tab); });
  });

  // ---------- Deck bar + setup sheet ----------
  function deckbar() {
    var n = S.selected.length;
    return '<div class="deckbar"><span><strong>' + n + '</strong> ' + (n === 1 ? 'drug' : 'drugs') +
      ' · ' + esc(fieldNames(activeFields())) + '</span>' +
      '<button class="btn link" data-act="setup">Change</button></div>';
  }

  var setupEl = $('#setup');
  var onSetupDone = null;

  function openSetup(done) {
    onSetupDone = done;
    renderSetup();
    setupEl.hidden = false;
    var first = $('button', setupEl);
    if (first) first.focus();
  }

  function drugChips(selected) {
    return '<div class="chips">' + DRUGS.map(function (d) {
      var on = selected.indexOf(d.id) !== -1;
      return '<button class="chip" data-drug="' + d.id + '" aria-pressed="' + on + '" ' + labStyle(d) + '>' +
        '<span class="swatch"></span>' + esc(d.name) + '</button>';
    }).join('') + '</div>';
  }
  function groupButtons() {
    return '<div class="row">' + GROUPS.map(function (g) {
      return '<button class="btn" data-group="' + g.id + '">' + esc(g.name) + '</button>';
    }).join('') + '</div>';
  }
  // Clicking a group adds all of its drugs, or removes them if all are already in.
  function toggleGroup(selected, groupId) {
    var ids = DRUGS.filter(function (d) { return d.groups.indexOf(groupId) !== -1; }).map(function (d) { return d.id; });
    var allOn = ids.every(function (x) { return selected.indexOf(x) !== -1; });
    if (allOn) return selected.filter(function (x) { return ids.indexOf(x) === -1; });
    return selected.concat(ids.filter(function (x) { return selected.indexOf(x) === -1; }));
  }
  function toggleDrug(selected, id) {
    var i = selected.indexOf(id);
    if (i === -1) selected.push(id); else selected.splice(i, 1);
  }
  function fieldChecks(list) {
    return list.map(function (f) {
      return '<label class="check"><input type="checkbox" data-field="' + f + '"' +
        (S.fields[f] ? ' checked' : '') + '> ' + esc(FIELDS[f].label) + '</label>';
    }).join('');
  }

  function renderSetup(error) {
    setupEl.innerHTML =
      '<div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="setup-title">' +
      '<div class="row spread"><h2 class="title" id="setup-title">What to study</h2>' +
      '<button class="btn primary" data-act="done">Done</button></div>' +
      (error ? '<p class="error">' + esc(error) + '</p>' : '') +
      '<div class="field-row"><p class="eyebrow">On the test</p><div class="row">' + fieldChecks(CORE) + '</div></div>' +
      '<div class="field-row"><p class="eyebrow">Secondary info</p><div class="row">' + fieldChecks(EXTRA) + '</div></div>' +
      '<div class="field-row"><div class="row spread"><p class="eyebrow">Drugs (' + S.selected.length + ' of ' + DRUGS.length + ')</p>' +
      '<div class="row"><button class="btn link" data-act="all">All</button><button class="btn link" data-act="none">None</button>' +
      '<button class="btn link" data-act="weak">Weakest 8</button></div></div>' +
      groupButtons() + drugChips(S.selected) + '</div>' +
      '</div>';
  }

  setupEl.addEventListener('click', function (e) {
    if (e.target === setupEl) return closeSetup();
    var t = e.target.closest('button');
    if (!t) return;
    if (t.dataset.drug) {
      toggleDrug(S.selected, t.dataset.drug);
    } else if (t.dataset.group) {
      S.selected = toggleGroup(S.selected, t.dataset.group);
    } else if (t.dataset.act === 'all') {
      S.selected = DRUGS.map(function (d) { return d.id; });
    } else if (t.dataset.act === 'none') {
      S.selected = [];
    } else if (t.dataset.act === 'weak') {
      S.selected = DRUGS.slice().sort(function (a, b) { return weakness(b.id) - weakness(a.id); })
        .slice(0, 8).map(function (d) { return d.id; });
    } else if (t.dataset.act === 'done') {
      return closeSetup();
    } else {
      return;
    }
    save();
    var scroll = $('.sheet-panel', setupEl).scrollTop;
    renderSetup();
    $('.sheet-panel', setupEl).scrollTop = scroll;
  });
  setupEl.addEventListener('change', function (e) {
    var f = e.target.dataset && e.target.dataset.field;
    if (!f) return;
    S.fields[f] = e.target.checked;
    save();
  });
  function closeSetup() {
    if (!S.selected.length) return renderSetup('Pick at least one drug.');
    if (!activeFields().length) return renderSetup('Pick at least one thing to study.');
    setupEl.hidden = true;
    if (onSetupDone) onSetupDone();
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !setupEl.hidden) closeSetup();
  });

  function seg(name, value, options) {
    return '<div class="seg" role="group">' + options.map(function (o) {
      return '<button data-seg="' + name + '" data-val="' + esc(o[0]) + '" aria-pressed="' + (String(value) === String(o[0])) + '">' + esc(o[1]) + '</button>';
    }).join('') + '</div>';
  }

  // =====================================================================
  // Flashcards
  // =====================================================================
  var cardsEl = $('#view-cards');
  var C = null; // session

  function buildCards() {
    var list = [];
    selectedDrugs().forEach(function (d) {
      activeFields().forEach(function (f) {
        if (!items(d, f).length) return;
        var dir = S.cardDir === 'mixed' ? (Math.random() < 0.5 ? 'forward' : 'reverse') : S.cardDir;
        list.push({ drug: d, field: f, dir: dir });
      });
    });
    return S.cardOrder === 'shuffle' ? shuffle(list) : list;
  }

  function cardsSetup() {
    var count = buildCards().length;
    cardsEl.innerHTML =
      '<div><h2 class="title">Flashcards</h2><p class="lede">Flip a card, say the answer out loud, then be honest. Cards you miss come back later in the round.</p></div>' +
      deckbar() +
      '<div class="panel">' +
      '<div class="field-row"><p class="eyebrow">Card front</p>' +
      seg('cardDir', S.cardDir, [['forward', 'Drug → info'], ['reverse', 'Info → drug'], ['mixed', 'Mixed']]) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Order</p>' +
      seg('cardOrder', S.cardOrder, [['shuffle', 'Shuffled'], ['inorder', 'Drug by drug']]) + '</div>' +
      '<div><button class="btn primary big" data-act="start"' + (count ? '' : ' disabled') + '>Start ' + count + ' cards</button></div>' +
      '</div>';
  }

  function sameAnswerDrugs(card) {
    var key = items(card.drug, card.field).join('|').toLowerCase();
    return DRUGS.filter(function (o) {
      return o.id !== card.drug.id && items(o, card.field).join('|').toLowerCase() === key;
    });
  }

  function cardsRender() {
    if (!C.queue.length) return cardsDone();
    var card = C.queue[0];
    var d = card.drug, f = card.field, list = items(d, f);
    var done = C.total - C.queue.length;
    var pct = Math.round(done / C.total * 100);
    var front, back;
    if (card.dir === 'forward') {
      front = band(d) + '<div class="card-body"><p class="ask">' + esc(FIELDS[f].label) + '?</p>' +
        (C.flipped ? '<hr class="divider">' + listHtml(list, f) : '<p class="hint">Tap to flip</p>') + '</div>';
    } else {
      var twins = sameAnswerDrugs(card);
      front = band(d, !C.flipped) + '<div class="card-body"><p class="eyebrow">' + esc(FIELDS[f].label) + '</p>' +
        listHtml(list, f) +
        (C.flipped
          ? (twins.length ? '<p class="hint">Same answer also fits: ' + esc(twins.map(function (t) { return t.name; }).join(', ')) + '</p>' : '')
          : '<p class="hint">Which drug is this? Tap to flip</p>') + '</div>';
    }
    back = C.flipped
      ? '<div class="btn-grid"><button class="btn bad big" data-act="miss">Missed it</button><button class="btn good big" data-act="got">Got it</button></div>'
      : '<div class="btn-grid"><button class="btn big" data-act="quit">End round</button><button class="btn primary big" data-act="flip">Show answer</button></div>';
    cardsEl.innerHTML =
      '<div class="progress-line"><span>Card ' + (done + 1) + ' of ' + C.total + '</span><span>' +
      C.again.size + ' to see again</span></div>' +
      '<div class="meter"><span style="width:' + pct + '%"></span></div>' +
      '<div class="card" role="button" tabindex="0" data-act="flip" aria-label="' + (C.flipped ? 'Card answer' : 'Flip card') + '">' + front + '</div>' +
      back +
      '<p class="kbd-hint">Keys: Space flips · 1 missed · 2 got it</p>';
  }

  function cardsDone() {
    var missed = C.missedCards;
    cardsEl.innerHTML =
      '<div class="panel"><p class="eyebrow">Round complete</p>' +
      '<p class="score-big">' + C.firstTry + ' / ' + C.total + '</p>' +
      '<p class="lede">right on the first try. ' + (missed.length ? missed.length + ' card' + (missed.length === 1 ? '' : 's') + ' needed another pass.' : 'Clean round.') + '</p>' +
      '<div class="row">' +
      (missed.length ? '<button class="btn primary" data-act="again">Study the ' + missed.length + ' missed</button>' : '') +
      '<button class="btn" data-act="new">New round</button></div></div>';
  }

  function cardsStart(list) {
    C = { queue: list, total: list.length, flipped: false, again: new Set(), missedCards: [], firstTry: 0 };
    cardsRender();
  }

  function cardAnswer(ok) {
    var card = C.queue.shift();
    var key = card.drug.id + ':' + card.field + ':' + card.dir;
    record(card.drug.id, card.field, ok);
    if (ok) {
      if (!C.again.has(key)) C.firstTry++;
      C.again.delete(key);
    } else {
      if (!C.again.has(key)) C.missedCards.push({ drug: card.drug, field: card.field, dir: card.dir });
      C.again.add(key);
      var at = Math.min(C.queue.length, 4 + Math.floor(Math.random() * 3));
      C.queue.splice(at, 0, card);
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
    if (act === 'setup') return openSetup(cardsSetup);
    if (act === 'start') return cardsStart(buildCards());
    if (act === 'flip') { if (!C.flipped) { C.flipped = true; cardsRender(); } return; }
    if (act === 'got') return cardAnswer(true);
    if (act === 'miss') return cardAnswer(false);
    if (act === 'quit') { C.queue = []; return cardsDone(); }
    if (act === 'again') return cardsStart(shuffle(C.missedCards));
    if (act === 'new') { C = null; return cardsSetup(); }
  });

  VIEWS.cards = { show: function () { if (C && C.queue.length) cardsRender(); else if (!C) cardsSetup(); } };

  // =====================================================================
  // Quiz
  // =====================================================================
  var quizEl = $('#view-quiz');
  var Q = null;

  var WHICH_DRUG = {
    indications: 'Which drug is indicated for',
    contraindications: 'Which drug is contraindicated with',
    adult: 'Which drug has this adult dose:',
    peds: 'Which drug has this pediatric dose:',
    trade: 'Which drug has the trade name',
    classes: 'Which drug has this classification:',
    moa: 'Which drug works like this:',
    adverse: 'Which drug lists this adverse reaction:',
    cautions: 'Which drug has this caution:'
  };
  var WHICH_ITEM = {
    indications: 'Which of these is an indication for',
    contraindications: 'Which of these is a contraindication for',
    adult: 'Which of these is an adult dose of',
    peds: 'Which of these is a pediatric dose of',
    trade: 'Which is a trade name for',
    classes: 'Which classification fits',
    moa: 'Which is the mechanism of action of',
    adverse: 'Which is an adverse reaction of',
    cautions: 'Which is a caution for'
  };
  var NAME_ONE = {
    indications: 'Name one indication for',
    contraindications: 'Name one contraindication for',
    trade: 'Give a trade name for',
    adverse: 'Name one adverse reaction of',
    cautions: 'Name one caution for'
  };

  function fmtNum(n) { return String(Number(n.toFixed(4))); }

  // Plausible wrong doses: change one number or swap mg/mcg.
  function mutateDose(s) {
    var out = [];
    var re = /\d*\.?\d+/g, m, spots = [];
    while ((m = re.exec(s))) spots.push({ i: m.index, t: m[0] });
    shuffle(spots).slice(0, 3).forEach(function (sp) {
      var v = parseFloat(sp.t);
      shuffle([10, 0.1, 2, 0.5, 5]).slice(0, 2).forEach(function (k) {
        var nv = fmtNum(v * k);
        if (nv !== sp.t && Number(nv) > 0) out.push(s.slice(0, sp.i) + nv + s.slice(sp.i + sp.t.length));
      });
    });
    if (/\bmcg\b/.test(s)) out.push(s.replace(/\bmcg\b/g, 'mg'));
    else if (/\bmg\b/.test(s)) out.push(s.replace(/\bmg\b/, 'mcg'));
    if (/mg\/kg/.test(s)) out.push(s.replace('mg/kg', 'mg'));
    return out;
  }

  function otherDrugs(d) {
    return DRUGS.filter(function (o) { return o.id !== d.id; });
  }

  function mcOptions(correct, pool, n) {
    var opts = [correct];
    shuffle(pool).forEach(function (p) {
      if (opts.length < n + 1 && opts.indexOf(p) === -1) opts.push(p);
    });
    if (opts.length < 3) return null;
    var shuffled = shuffle(opts);
    return { options: shuffled, answer: shuffled.indexOf(correct) };
  }

  var GEN = {
    // "Which drug is indicated for X?"
    whichDrug: function (d, f) {
      var list = items(d, f);
      if (!list.length) return null;
      var item = pick(list);
      var pool = otherDrugs(d).filter(function (o) {
        return !items(o, f).some(function (x) { return G.sameItem(x, item) || x === item; });
      }).map(function (o) { return o.name; });
      var mc = mcOptions(d.name, pool, 3);
      if (!mc) return null;
      var dose = FIELDS[f].kind === 'dose';
      return {
        type: 'mc', drug: d, field: f, options: mc.options, answer: mc.answer,
        prompt: esc(WHICH_DRUG[f]) + ' <q' + (dose ? ' class="dose"' : '') + '>' + esc(item) + '</q>?',
        correctText: d.name
      };
    },
    // "Which of these is a contraindication for X?"
    whichItem: function (d, f) {
      var list = items(d, f);
      if (!list.length) return null;
      var item = pick(list);
      var own = list;
      var pool = [];
      if (FIELDS[f].kind === 'dose') {
        pool = mutateDose(item).filter(function (x) { return own.indexOf(x) === -1; });
        pool = shuffle(pool).slice(0, 2);
      }
      otherDrugs(d).forEach(function (o) {
        items(o, f).forEach(function (x) {
          if (pool.indexOf(x) === -1 && own.indexOf(x) === -1 &&
              !own.some(function (y) { return G.sameItem(x, y); })) pool.push(x);
        });
      });
      // Keep mutated doses up front so they survive the shuffle-pick.
      var mutated = FIELDS[f].kind === 'dose' ? pool.slice(0, 2) : [];
      var rest = shuffle(pool.slice(mutated.length));
      var mc = mcOptions(item, mutated.concat(rest).slice(0, 3), 3);
      if (!mc) return null;
      return {
        type: 'mc', drug: d, field: f, options: mc.options, answer: mc.answer, doseOpts: FIELDS[f].kind === 'dose',
        prompt: esc(WHICH_ITEM[f]) + ' <q>' + esc(d.name) + '</q>?',
        correctText: item
      };
    },
    // Fill in the missing number of a dose.
    doseBlank: function (d, f) {
      if (FIELDS[f].kind !== 'dose') return null;
      var list = items(d, f).filter(function (x) { return /\d/.test(x); });
      if (!list.length) return null;
      var item = pick(list);
      var re = /\d*\.?\d+/g, m, spots = [];
      while ((m = re.exec(item))) {
        // Skip weight/age thresholds like "<1 month" or "20 kg" cutoffs? Keep all; they are tested too.
        spots.push({ i: m.index, t: m[0] });
      }
      var sp = pick(spots);
      var before = item.slice(0, sp.i), after = item.slice(sp.i + sp.t.length);
      return {
        type: 'num', drug: d, field: f, expected: parseFloat(sp.t),
        prompt: 'Fill in the blank. <strong>' + esc(FIELDS[f].label) + '</strong> of <q>' + esc(d.name) + '</q>:',
        blank: '<div class="blank-line">' + esc(before) + '<span class="gap">___</span>' + esc(after) + '</div>',
        correctText: item
      };
    },
    // Type the drug name from its indications and adult dose.
    nameIt: function (d) {
      var clues = '<div class="blank-line" style="font-family:var(--font-body)"><strong>Indications:</strong> ' + esc(d.indications.join('; ')) +
        '<br><strong>Adult dose:</strong> <span class="mono">' + esc(d.adult[0]) + '</span></div>';
      return {
        type: 'name', drug: d, field: 'name',
        prompt: 'Name the drug.', blank: clues,
        correctText: d.name
      };
    },
    // "Name one contraindication for X" (free text).
    nameOne: function (d, f) {
      if (!NAME_ONE[f] || !items(d, f).length) return null;
      return {
        type: 'text', drug: d, field: f,
        prompt: esc(NAME_ONE[f]) + ' <q>' + esc(d.name) + '</q>.',
        correctText: items(d, f).join('; ')
      };
    }
  };

  function makeQuestion(types, drugs, fields) {
    for (var tries = 0; tries < 60; tries++) {
      var d = pick(drugs), f = pick(fields), type = pick(types), q = null;
      if (type === 'mc') q = Math.random() < 0.5 ? GEN.whichDrug(d, f) : GEN.whichItem(d, f);
      else if (type === 'dose') {
        var doseFields = fields.filter(function (x) { return FIELDS[x].kind === 'dose'; });
        if (doseFields.length) q = GEN.doseBlank(d, pick(doseFields));
      } else if (type === 'name') q = GEN.nameIt(d);
      else if (type === 'recall') q = GEN.nameOne(d, f);
      if (q) return q;
    }
    return null;
  }

  function buildQuiz() {
    var types = Object.keys(S.quizTypes).filter(function (k) { return S.quizTypes[k]; });
    // Multiple choice gets double weight so typed questions don't dominate.
    if (types.indexOf('mc') !== -1 && types.length > 1) types.push('mc', 'mc');
    var drugs = selectedDrugs(), fields = activeFields();
    if (!types.length) return [];
    var out = [], seen = {};
    for (var i = 0; out.length < S.quizLen && i < S.quizLen * 8; i++) {
      var q = makeQuestion(types, drugs, fields);
      if (!q) break;
      var key = q.type + q.prompt + (q.blank || '');
      if (seen[key]) continue;
      seen[key] = true;
      out.push(q);
    }
    return out;
  }

  function quizSetup(error) {
    var types = [['mc', 'Multiple choice'], ['dose', 'Fill in the dose'], ['name', 'Name the drug'], ['recall', 'Name one item']];
    quizEl.innerHTML =
      '<div><h2 class="title">Quiz</h2><p class="lede">Mixed questions from the drugs and topics you picked. Typed answers forgive small spelling mistakes.</p></div>' +
      deckbar() +
      '<div class="panel">' +
      '<div class="field-row"><p class="eyebrow">Questions</p>' + seg('quizLen', S.quizLen, [[10, '10'], [20, '20'], [40, '40']]) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Question types</p><div class="row">' +
      types.map(function (t) {
        return '<label class="check"><input type="checkbox" id="qt-' + t[0] + '" data-qtype="' + t[0] + '"' + (S.quizTypes[t[0]] ? ' checked' : '') + '> ' + t[1] + '</label>';
      }).join('') + '</div></div>' +
      (error ? '<p class="error">' + esc(error) + '</p>' : '') +
      '<div><button class="btn primary big" data-act="start">Start quiz</button></div>' +
      '</div>';
  }

  function quizStart(list) {
    if (!list.length) return quizSetup('No questions fit those choices. Turn on another question type or topic.');
    Q = { list: list, i: 0, right: 0, missed: [], state: null };
    quizRender();
  }

  function quizRender() {
    if (Q.i >= Q.list.length) return quizDone();
    var q = Q.list[Q.i], st = Q.state;
    var html = '<div class="progress-line"><span>Question ' + (Q.i + 1) + ' of ' + Q.list.length + '</span><span>' + Q.right + ' right</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(Q.i / Q.list.length * 100) + '%"></span></div>' +
      '<div class="panel"><p class="q-prompt">' + q.prompt + '</p>' + (q.blank || '');

    if (q.type === 'mc') {
      html += '<div class="options">' + q.options.map(function (o, i) {
        var cls = 'option' + (q.doseOpts ? ' dose-opt' : '');
        if (st) {
          if (i === q.answer) cls += ' right';
          else if (i === st.choice) cls += ' wrong';
        }
        return '<button class="' + cls + '" data-opt="' + i + '"' + (st ? ' disabled' : '') + '><span class="key">' + 'ABCD'[i] + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>';
    } else {
      var ph = q.type === 'num' ? 'Number' : q.type === 'name' ? 'Drug name' : 'Your answer';
      html += '<form class="row" data-form="answer"><input type="text" id="quiz-answer" autocomplete="off" autocapitalize="off" spellcheck="false" ' +
        (q.type === 'num' ? 'inputmode="decimal" ' : '') + 'placeholder="' + ph + '"' + (st ? ' disabled value="' + esc(st.text) + '"' : '') + ' style="flex:1;min-width:0">' +
        (st ? '' : '<button class="btn primary" type="submit">Check</button>') + '</form>';
    }

    if (st) {
      var ok = st.ok;
      html += '<div class="verdict ' + (ok ? 'ok' : 'no') + '"><p class="v-title">' + (ok ? 'Correct' : 'Not quite') + '</p>';
      if (q.field !== 'name') {
        html += '<div><p class="eyebrow">' + esc(q.drug.name) + ' · ' + esc(FIELDS[q.field].label) + '</p>' + listHtml(items(q.drug, q.field), q.field) + '</div>';
      } else {
        html += '<p>Answer: <strong>' + esc(q.drug.name) + '</strong></p>';
      }
      if (q.type === 'text' || q.type === 'name') {
        html += '<div><button class="btn link" data-act="override">' + (ok ? 'Actually, count it wrong' : 'I was right, count it') + '</button></div>';
      }
      html += '</div><div><button class="btn primary big" data-act="next">' + (Q.i + 1 < Q.list.length ? 'Next question' : 'See results') + '</button></div>';
    }
    html += '</div><p class="kbd-hint">Keys: A–D to answer · Enter for next</p>';
    quizEl.innerHTML = html;
    var inp = $('#quiz-answer');
    if (inp && !st) inp.focus();
    else { var nx = $('[data-act="next"]', quizEl); if (nx) nx.focus(); }
  }

  function quizCheck(text) {
    var q = Q.list[Q.i], ok = false;
    if (q.type === 'num') ok = G.sameNumber(text, q.expected);
    else if (q.type === 'name') {
      ok = G.nameMatches(text, q.drug) || DRUGS.some(function (o) {
        return o.id !== q.drug.id && o.indications.join('|') === q.drug.indications.join('|') &&
          o.adult[0] === q.drug.adult[0] && G.nameMatches(text, o);
      });
    } else if (q.type === 'text') ok = G.gradeList(items(q.drug, q.field), text).some(function (r) { return r.hit; });
    Q.state = { ok: ok, text: text };
    quizRender();
  }

  function quizNext() {
    var q = Q.list[Q.i];
    record(q.drug.id, q.field, Q.state.ok);
    if (Q.state.ok) Q.right++;
    else Q.missed.push(q);
    Q.i++;
    Q.state = null;
    quizRender();
  }

  function quizDone() {
    var pct = Math.round(Q.right / Q.list.length * 100);
    quizEl.innerHTML =
      '<div class="panel"><p class="eyebrow">Quiz complete</p>' +
      '<p class="score-big">' + pct + '%</p><p class="lede">' + Q.right + ' of ' + Q.list.length + ' right.</p>' +
      '<div class="row">' + (Q.missed.length ? '<button class="btn primary" data-act="retry">Retry the ' + Q.missed.length + ' missed</button>' : '') +
      '<button class="btn" data-act="new">New quiz</button></div></div>' +
      (Q.missed.length ? '<div class="panel"><p class="eyebrow">Review</p><ul class="missed-list">' + Q.missed.map(function (q) {
        return '<li><span>' + q.prompt + '</span><span class="muted small">Answer: <strong>' + esc(q.correctText) + '</strong></span></li>';
      }).join('') + '</ul></div>' : '');
  }

  quizEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-seg],[data-opt]');
    if (!t) return;
    if (t.dataset.seg) { S[t.dataset.seg] = Number(t.dataset.val); save(); return quizSetup(); }
    if (t.dataset.opt && Q && !Q.state) {
      var q = Q.list[Q.i], choice = Number(t.dataset.opt);
      Q.state = { ok: choice === q.answer, choice: choice };
      return quizRender();
    }
    var act = t.dataset.act;
    if (act === 'setup') return openSetup(function () { Q = null; quizSetup(); });
    if (act === 'start') return quizStart(buildQuiz());
    if (act === 'next') return quizNext();
    if (act === 'override') { Q.state.ok = !Q.state.ok; return quizRender(); }
    if (act === 'retry') {
      return quizStart(shuffle(Q.missed.map(function (q) { return Object.assign({}, q, { options: q.options && q.options.slice() }); })));
    }
    if (act === 'new') { Q = null; return quizSetup(); }
  });
  quizEl.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = $('#quiz-answer').value.trim();
    if (v) quizCheck(v);
  });
  quizEl.addEventListener('change', function (e) {
    var k = e.target.dataset && e.target.dataset.qtype;
    if (k) { S.quizTypes[k] = e.target.checked; save(); }
  });

  VIEWS.quiz = { show: function () { if (Q) quizRender(); else quizSetup(); } };

  // =====================================================================
  // Write-out drill
  // =====================================================================
  var writeEl = $('#view-write');
  var W = null;

  function writeSetup() {
    var n = S.woSelected.length;
    var ready = n && activeFields().length;
    var scroll = window.scrollY;
    writeEl.innerHTML =
      '<div><h2 class="title">Write it out</h2><p class="lede">Practice like the written test. Pick the drugs, type everything you know for each one, then check it against the deck.</p></div>' +
      '<div class="panel">' +
      '<div class="field-row"><div class="row spread"><p class="eyebrow">Drugs to write out (' + n + ' of ' + DRUGS.length + ')</p>' +
      '<div class="row"><button class="btn link" data-act="wo-all">All</button><button class="btn link" data-act="wo-none">None</button>' +
      '<button class="btn link" data-act="wo-weak">Weakest 5</button></div></div>' +
      groupButtons() + drugChips(S.woSelected) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Write out</p><div class="row">' + fieldChecks(CORE) + '</div>' +
      '<div class="row">' + fieldChecks(EXTRA) + '</div></div>' +
      '<div class="field-row"><p class="eyebrow">Order</p>' +
      seg('woOrder', S.woOrder, [['shuffle', 'Random'], ['inorder', 'List order']]) + '</div>' +
      (n ? '' : '<p class="muted small">Tap drugs above to add them.</p>') +
      '<div><button class="btn primary big" data-act="start"' + (ready ? '' : ' disabled') + '>Write out ' + n + ' ' + (n === 1 ? 'drug' : 'drugs') + '</button></div></div>' +
      '<div class="panel"><p class="eyebrow">Warm-up</p><h3 class="title" style="font-size:1.3rem">Every drug on the list, from memory</h3>' +
      '<label for="recall-all" class="muted small">Type every drug name you can, one per line or separated by commas.</label>' +
      '<textarea id="recall-all" rows="6" placeholder="Acetaminophen&#10;Adenosine&#10;…"></textarea>' +
      '<div><button class="btn" data-act="recall-check">Check my list</button></div><div id="recall-result"></div></div>';
    window.scrollTo(0, scroll);
  }

  function recallCheck() {
    var parts = $('#recall-all').value.split(/[\n,;]+/).map(function (s) { return s.trim(); }).filter(Boolean);
    var found = [], missing = [];
    DRUGS.forEach(function (d) {
      (parts.some(function (p) { return G.nameMatches(p, d); }) ? found : missing).push(d.name);
    });
    $('#recall-result').innerHTML =
      '<div class="verdict ' + (missing.length ? 'no' : 'ok') + '"><p class="v-title">' + found.length + ' of ' + DRUGS.length + ' drugs named</p>' +
      (missing.length ? '<p class="small">Missing: ' + esc(missing.join(', ')) + '</p>' : '<p class="small">You named them all.</p>') + '</div>';
  }

  function writeStart() {
    var drugs = DRUGS.filter(function (d) { return S.woSelected.indexOf(d.id) !== -1; });
    if (!drugs.length || !activeFields().length) return;
    if (S.woOrder === 'shuffle') drugs = shuffle(drugs);
    W = { drugs: drugs, i: 0, results: [], graded: null };
    writeRender();
  }

  function writeFields(d) {
    return activeFields().filter(function (f) { return items(d, f).length; });
  }

  function writeRender() {
    if (W.i >= W.drugs.length) return writeDone();
    var d = W.drugs[W.i], fields = writeFields(d);
    var html = '<div class="progress-line"><span>Drug ' + (W.i + 1) + ' of ' + W.drugs.length + '</span></div>' +
      '<div class="sheet">' + band(d) + '<div class="sheet-body">';
    if (!W.graded) {
      html += fields.map(function (f) {
        return '<div><label class="eyebrow" for="wo-' + f + '">' + esc(FIELDS[f].label) + '</label>' +
          '<textarea id="wo-' + f + '" rows="3" placeholder="One per line"></textarea></div>';
      }).join('') +
        '<div class="row"><button class="btn primary big" data-act="grade">Check my answers</button>' +
        '<button class="btn" data-act="skip">Skip drug</button></div>';
    } else {
      html += '<p class="muted small">Checked automatically. Tap any line to flip it if the checker got it wrong.</p>';
      html += fields.map(function (f) {
        var g = W.graded[f];
        var hitN = g.rows.filter(function (r) { return r.hit; }).length;
        return '<div class="field-row"><div class="row spread"><span class="eyebrow">' + esc(FIELDS[f].label) + '</span>' +
          '<span class="field-score">' + hitN + ' / ' + g.rows.length + '</span></div>' +
          '<ul class="check-list' + (FIELDS[f].kind === 'dose' ? ' dose' : '') + '">' +
          g.rows.map(function (r, i) {
            return '<li><button class="' + (r.hit ? 'hit' : 'miss') + '" data-toggle="' + f + ':' + i + '"><span class="mark">' +
              (r.hit ? '✓' : '✗') + '</span><span>' + esc(r.item) + '</span></button></li>';
          }).join('') + '</ul>' +
          (g.text ? '<p class="you-wrote">You wrote: ' + esc(g.text) + '</p>' : '<p class="you-wrote">You left this blank.</p>') +
          '</div>';
      }).join('') +
        '<div><button class="btn primary big" data-act="next">' + (W.i + 1 < W.drugs.length ? 'Next drug' : 'Finish') + '</button></div>';
    }
    html += '</div></div>';
    writeEl.innerHTML = html;
    if (!W.graded) { var first = $('textarea', writeEl); if (first) first.focus(); }
  }

  function writeGrade() {
    var d = W.drugs[W.i];
    W.graded = {};
    writeFields(d).forEach(function (f) {
      var text = $('#wo-' + f).value.trim();
      var rows = FIELDS[f].kind === 'dose' ? G.gradeDoses(items(d, f), text) : G.gradeList(items(d, f), text);
      W.graded[f] = { text: text, rows: rows };
    });
    writeRender();
    window.scrollTo(0, 0);
  }

  function writeNext() {
    var d = W.drugs[W.i];
    if (W.graded) {
      var summary = { drug: d, fields: {} };
      Object.keys(W.graded).forEach(function (f) {
        var rows = W.graded[f].rows;
        var hit = rows.filter(function (r) { return r.hit; }).length;
        summary.fields[f] = [hit, rows.length];
        record(d.id, f, hit / rows.length >= 0.8);
      });
      W.results.push(summary);
    }
    W.i++;
    W.graded = null;
    writeRender();
    window.scrollTo(0, 0);
  }

  function writeDone() {
    var fields = activeFields();
    var totalHit = 0, total = 0;
    var rows = W.results.map(function (r) {
      return '<tr><td>' + esc(r.drug.name) + '</td>' + fields.map(function (f) {
        var v = r.fields[f];
        if (!v) return '<td class="cell"><span class="pill none">–</span></td>';
        totalHit += v[0]; total += v[1];
        var p = v[0] / v[1];
        return '<td class="cell"><span class="pill ' + (p >= 0.8 ? 'high' : p >= 0.5 ? 'mid' : 'low') + '">' + v[0] + '/' + v[1] + '</span></td>';
      }).join('') + '</tr>';
    }).join('');
    writeEl.innerHTML =
      '<div class="panel"><p class="eyebrow">Round complete</p>' +
      (total ? '<p class="score-big">' + Math.round(totalHit / total * 100) + '%</p><p class="lede">' + totalHit + ' of ' + total + ' items written correctly.</p>' : '<p class="lede">No drugs checked this round.</p>') +
      '<div class="row"><button class="btn primary" data-act="start">Another round</button><button class="btn" data-act="new">Change settings</button></div></div>' +
      (rows ? '<div class="table-wrap"><table class="grid"><thead><tr><th>Drug</th>' + fields.map(function (f) { return '<th>' + esc(FIELDS[f].label) + '</th>'; }).join('') +
        '</tr></thead><tbody>' + rows + '</tbody></table></div>' : '');
  }

  writeEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-seg],[data-toggle],[data-drug],[data-group]');
    if (!t) return;
    if (t.dataset.seg) { S[t.dataset.seg] = t.dataset.val; save(); return writeSetup(); }
    if (t.dataset.drug) { toggleDrug(S.woSelected, t.dataset.drug); save(); return writeSetup(); }
    if (t.dataset.group) { S.woSelected = toggleGroup(S.woSelected, t.dataset.group); save(); return writeSetup(); }
    if (t.dataset.toggle) {
      var p = t.dataset.toggle.split(':');
      var row = W.graded[p[0]].rows[Number(p[1])];
      row.hit = !row.hit;
      var y = window.scrollY;
      writeRender();
      window.scrollTo(0, y);
      return;
    }
    var act = t.dataset.act;
    if (act === 'wo-all' || act === 'wo-none' || act === 'wo-weak') {
      S.woSelected = act === 'wo-none' ? [] : act === 'wo-all' ? DRUGS.map(function (d) { return d.id; })
        : DRUGS.slice().sort(function (a, b) { return weakness(b.id) - weakness(a.id); }).slice(0, 5).map(function (d) { return d.id; });
      save();
      return writeSetup();
    }
    if (act === 'start') return writeStart();
    if (act === 'grade') return writeGrade();
    if (act === 'skip' || act === 'next') return writeNext();
    if (act === 'new') { W = null; return writeSetup(); }
    if (act === 'recall-check') return recallCheck();
  });

  writeEl.addEventListener('change', function (e) {
    var f = e.target.dataset && e.target.dataset.field;
    if (!f || W) return;
    S.fields[f] = e.target.checked;
    save();
    writeSetup();
  });

  VIEWS.write = { show: function () { if (W) writeRender(); else writeSetup(); } };

  // =====================================================================
  // Drug reference
  // =====================================================================
  var drugsEl = $('#view-drugs');
  var refQuery = '', refGroup = '';

  function refDrug(d) {
    function block(title, list, f, cls) {
      return '<div' + (cls ? ' class="' + cls + '"' : '') + '><h4>' + esc(title) + '</h4>' + listHtml(list, f) + '</div>';
    }
    function para(title, text) {
      return text ? '<div><h4>' + esc(title) + '</h4><p>' + esc(text) + '</p></div>' : '';
    }
    function lst(title, list) {
      return list && list.length ? '<div><h4>' + esc(title) + '</h4>' + listHtml(list, 'indications') + '</div>' : '';
    }
    var sub = [d.trade && d.trade.length ? d.trade.join(', ') : '', d.therapeutic].filter(Boolean).join(' · ');
    return '<details class="ref" id="ref-' + d.id + '"><summary><span><span class="r-name">' + esc(d.name) + '</span><br><span class="r-sub">' + esc(sub) + '</span></span>' +
      '<span class="tag" ' + labStyle(d) + '><span class="swatch' + (d.label === 'antagonist' ? ' striped' : '') + '"></span>' + esc(LABEL_NAMES[d.label] || 'General') + '</span></summary>' +
      '<div class="ref-body"><div class="core-grid">' +
      block('Indications', d.indications, 'indications') +
      block('Contraindications', d.contraindications, 'contraindications', 'contra') +
      block('Adult dose', d.adult, 'adult') +
      block('Pediatric dose', d.peds, 'peds') +
      '</div><div class="more">' +
      (d.concentration ? para('Concentration', d.concentration) : '') +
      para('Classification', [d.therapeutic && 'Therapeutic: ' + d.therapeutic, d.pharmacological && 'Pharmacological: ' + d.pharmacological].filter(Boolean).join(' · ')) +
      lst('Cautions', d.cautions) +
      para('Mechanism of action', d.moa) +
      lst('Adverse reactions', d.adverse) +
      lst('TN protocols', d.protocolsTN) +
      lst('NASEMSO protocols', d.protocolsNASEMSO) +
      para('Memory trick', d.mnemonic) +
      lst('Notes', d.notes) +
      '</div></div></details>';
  }

  function drugsRender() {
    drugsEl.innerHTML =
      '<div><h2 class="title">Drug list</h2><p class="lede">Everything from the class deck. The colored tag follows standard syringe-label colors for the drug\'s class.</p></div>' +
      '<div class="row" style="flex-wrap:nowrap"><input type="search" id="ref-q" placeholder="Search names, indications, doses…" value="' + esc(refQuery) + '" style="flex:1;min-width:0">' +
      '<select id="ref-g" style="width:auto;max-width:45%" aria-label="Filter by group"><option value="">All groups</option>' +
      GROUPS.map(function (g) { return '<option value="' + g.id + '"' + (refGroup === g.id ? ' selected' : '') + '>' + esc(g.name) + '</option>'; }).join('') +
      '</select></div><div class="ref-list" id="ref-list"></div>';
    refFilter();
  }

  function refFilter() {
    var q = refQuery.toLowerCase().trim();
    var list = DRUGS.filter(function (d) {
      if (refGroup && d.groups.indexOf(refGroup) === -1) return false;
      if (!q) return true;
      var hay = [d.name].concat(d.aliases, d.trade, d.indications, d.contraindications, d.adult, d.peds, [d.therapeutic, d.pharmacological]).join(' ').toLowerCase();
      return hay.indexOf(q) !== -1;
    });
    $('#ref-list').innerHTML = list.length ? list.map(refDrug).join('') : '<p class="none">No drugs match that search.</p>';
  }

  drugsEl.addEventListener('input', function (e) {
    if (e.target.id === 'ref-q') { refQuery = e.target.value; refFilter(); }
  });
  drugsEl.addEventListener('change', function (e) {
    if (e.target.id === 'ref-g') { refGroup = e.target.value; refFilter(); }
  });

  VIEWS.drugs = { show: function () { if (!$('#ref-list')) drugsRender(); } };

  // =====================================================================
  // Progress
  // =====================================================================
  var progEl = $('#view-progress');
  var confirmReset = false;

  function progRender() {
    var answered = 0, right = 0, seen = 0;
    DRUGS.forEach(function (d) {
      var any = false;
      Object.keys(S.stats[d.id] || {}).forEach(function (f) {
        var s = S.stats[d.id][f];
        answered += s.c + s.w; right += s.c; any = true;
      });
      if (any) seen++;
    });
    var cols = CORE.concat(['name']);
    var colLabel = { indications: 'Indic.', contraindications: 'Contra.', adult: 'Adult', peds: 'Peds', name: 'Name' };
    var rows = DRUGS.slice().sort(function (a, b) { return weakness(b.id) - weakness(a.id); }).map(function (d) {
      return '<tr><td>' + esc(d.name) + '</td>' + cols.map(function (f) {
        var s = S.stats[d.id] && S.stats[d.id][f];
        if (!s) return '<td class="cell"><span class="pill none">–</span></td>';
        var p = s.c / (s.c + s.w);
        return '<td class="cell"><span class="pill ' + (p >= 0.8 ? 'high' : p >= 0.5 ? 'mid' : 'low') + '" title="' + s.c + ' right, ' + s.w + ' wrong">' + Math.round(p * 100) + '%</span></td>';
      }).join('') + '</tr>';
    }).join('');
    progEl.innerHTML =
      '<div><h2 class="title">Progress</h2><p class="lede">Weakest drugs first. Progress is saved in this browser only.</p></div>' +
      '<div class="stats-row"><div class="stat"><div class="n">' + answered + '</div><div class="l">Answers</div></div>' +
      '<div class="stat"><div class="n">' + (answered ? Math.round(right / answered * 100) + '%' : '–') + '</div><div class="l">Accuracy</div></div>' +
      '<div class="stat"><div class="n">' + seen + '/' + DRUGS.length + '</div><div class="l">Drugs seen</div></div></div>' +
      '<div class="row"><button class="btn primary" data-act="weak">Study my weakest 8</button></div>' +
      '<div class="table-wrap"><table class="grid"><thead><tr><th>Drug</th>' + cols.map(function (f) { return '<th style="text-align:center">' + colLabel[f] + '</th>'; }).join('') +
      '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="row">' + (confirmReset
        ? '<span class="muted">Erase all progress?</span><button class="btn bad" data-act="reset-yes">Erase</button><button class="btn" data-act="reset-no">Keep it</button>'
        : '<button class="btn link" data-act="reset">Reset progress</button>') + '</div>';
  }

  progEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    var act = t.dataset.act;
    if (act === 'weak') {
      S.selected = DRUGS.slice().sort(function (a, b) { return weakness(b.id) - weakness(a.id); }).slice(0, 8).map(function (d) { return d.id; });
      save(); C = null;
      return showTab('cards');
    }
    if (act === 'reset') confirmReset = true;
    if (act === 'reset-no') confirmReset = false;
    if (act === 'reset-yes') { S.stats = {}; save(); confirmReset = false; }
    progRender();
  });

  VIEWS.progress = { show: progRender };

  // ---------- Keyboard shortcuts ----------
  document.addEventListener('keydown', function (e) {
    if (!setupEl.hidden || (document.body.dataset.subject || 'pharm') !== 'pharm') return;
    var tag = (e.target.tagName || '').toLowerCase();
    var typing = tag === 'input' || tag === 'textarea' || tag === 'select';
    if (S.tab === 'cards' && C && C.queue.length && !typing) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!C.flipped) { C.flipped = true; cardsRender(); } }
      else if (C.flipped && e.key === '1') cardAnswer(false);
      else if (C.flipped && e.key === '2') cardAnswer(true);
    } else if (S.tab === 'quiz' && Q && Q.i < Q.list.length) {
      var q = Q.list[Q.i];
      if (!Q.state && q.type === 'mc' && !typing) {
        var idx = 'abcd'.indexOf(e.key.toLowerCase());
        if (idx !== -1 && idx < q.options.length) { Q.state = { ok: idx === q.answer, choice: idx }; quizRender(); }
      } else if (Q.state && e.key === 'Enter' && tag !== 'button') {
        e.preventDefault(); quizNext();
      }
    }
  });

  // Shared "Change" button on deck bars.
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act="setup"]');
    if (t && !cardsEl.contains(t) && !quizEl.contains(t)) openSetup(null);
  });

  showTab(VIEWS[S.tab] ? S.tab : 'cards');
})();
