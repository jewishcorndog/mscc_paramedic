/* Midterm review: a review sheet per midterm topic, a mixed practice exam
   (facts, generated med math and ABGs, and the class handout strips), the
   36 handout strips on their own, and stats. Content is in js/midterm-data.js.
   Exposes window.MidtermBox (show) for the subject switch in cardio.js, and
   window.MidtermGen for tests. */
(function () {
  'use strict';

  var TOPICS = window.MIDTERM_TOPICS;
  var STRIPS = window.MIDTERM_STRIPS;
  var ANS = window.MIDTERM_STRIP_ANSWERS;
  var T_BY = {};
  TOPICS.forEach(function (t) { T_BY[t.id] = t; });

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
  function rand(lo, hi) { return lo + Math.random() * (hi - lo); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function seg(name, value, options) {
    return '<div class="seg" role="group">' + options.map(function (o) {
      return '<button data-seg="' + name + '" data-val="' + esc(o[0]) + '" aria-pressed="' + (String(value) === String(o[0])) + '">' + esc(o[1]) + '</button>';
    }).join('') + '</div>';
  }
  // Round to at most `d` decimals and drop trailing zeros.
  function num(x, d) {
    var p = Math.pow(10, d == null ? 2 : d);
    return String(Math.round(x * p) / p);
  }

  // Multiple choice from a correct answer and candidate wrong ones (distinct by text).
  function mc(answer, wrong) {
    var seen = {}, opts = [answer];
    seen[answer] = true;
    wrong.forEach(function (w) { if (opts.length < 4 && !seen[w]) { seen[w] = true; opts.push(w); } });
    opts = shuffle(opts);
    return { options: opts, answer: opts.indexOf(answer) };
  }

  // ---------- State ----------
  var KEY = 'mscc-midterm';
  var S = { tab: 'review', len: 40, feedback: 'each', topics: {}, stats: {}, strips: {}, stripOrder: 'shuffle', stripMode: 'mc' };
  try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { /* storage blocked */ }
  TOPICS.forEach(function (t) { if (S.topics[t.id] == null) S.topics[t.id] = true; });
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ } }
  function record(bucket, id, ok) {
    var s = S[bucket][id] || (S[bucket][id] = { r: 0, n: 0 });
    s.n++; if (ok) s.r++;
  }
  function acc(bucket, id) { var s = S[bucket][id]; return s && s.n ? s.r / s.n : null; }

  // =====================================================================
  // Question generators
  // =====================================================================
  // D/H × V: [drug, amount on hand, unit, volume (mL), doses that get ordered].
  var VIALS = [
    ['fentanyl', 100, 'mcg', 2, [25, 50, 75, 100, 150]],
    ['morphine', 10, 'mg', 1, [2, 4, 5, 6, 8]],
    ['midazolam (Versed)', 10, 'mg', 2, [2, 2.5, 4, 5]],
    ['ketamine', 500, 'mg', 10, [50, 100, 150, 200]],
    ['amiodarone', 150, 'mg', 3, [150, 300]],
    ['adenosine', 6, 'mg', 2, [6, 12]],
    ['naloxone (Narcan)', 2, 'mg', 2, [0.4, 0.5, 1, 2]],
    ['diphenhydramine (Benadryl)', 50, 'mg', 1, [12.5, 25, 50]],
    ['ondansetron (Zofran)', 4, 'mg', 2, [2, 4]],
    ['epinephrine 1:10,000', 1, 'mg', 10, [0.5, 1]],
    ['atropine', 1, 'mg', 10, [0.5, 1]],
    ['dextrose 50%', 25, 'g', 50, [12.5, 25]]
  ];
  var LBS = [110, 132, 154, 176, 198, 220];

  function wrongNums(ans, list) {
    var out = list.filter(function (x) { return isFinite(x) && x > 0 && Math.abs(x - ans) > 1e-9; });
    [2, 0.5, 1.5, 10].forEach(function (f) { out.push(ans * f); });
    return out;
  }
  function numQ(prompt, ans, wrong, unit, d, why) {
    var a = num(ans, d) + ' ' + unit;
    var m = mc(a, wrongNums(ans, wrong).map(function (x) { return num(x, d) + ' ' + unit; }));
    return { topic: 'medmath', prompt: prompt, options: m.options, answer: m.answer, why: why, mono: true };
  }

  var MATH = {
    dh: function () {
      var v = pick(VIALS), D = pick(v[4]), H = v[1], V = v[3], ans = D / H * V;
      return numQ('Order: ' + num(D) + ' ' + v[2] + ' of ' + v[0] + '. You have ' + H + ' ' + v[2] + ' in ' + V + ' mL. How many mL do you give?',
        ans, [H / D * V, D / H, D * V / 10, D * H / V], 'mL', 2,
        'D ÷ H × V = ' + num(D) + ' ÷ ' + H + ' × ' + V + ' = ' + num(ans) + ' mL');
    },
    weight: function () {
      var lb = pick(LBS), kg = lb / 2.2, per = pick([0.5, 1, 1.5, 2]), mg = per * kg, conc = 50, ans = mg / conc;
      return numQ('Ketamine ' + per + ' mg/kg IV for a ' + lb + ' lb patient. You have 500 mg in 10 mL (50 mg/mL). How many mL?',
        ans, [per * lb / conc, mg / 10, mg / 100, per * lb / 2.2], 'mL', 1,
        lb + ' lb ÷ 2.2 = ' + num(kg, 1) + ' kg; × ' + per + ' mg/kg = ' + num(mg, 1) + ' mg; ÷ 50 mg/mL = ' + num(ans, 1) + ' mL');
    },
    gtt: function () {
      var c = pick([[1000, 8 * 60, '8 hours'], [1000, 4 * 60, '4 hours'], [500, 60, '1 hour'], [250, 60, '1 hour'], [500, 120, '2 hours'],
        [100, 30, '30 minutes'], [250, 30, '30 minutes'], [1000, 2 * 60, '2 hours'], [100, 60, '1 hour']]);
      var gf = pick([10, 15, 20, 60]);
      var ans = c[0] * gf / c[1];
      return numQ('Run ' + c[0] + ' mL over ' + c[2] + ' with a ' + gf + ' gtt/mL set. Drip rate?',
        Math.round(ans), [Math.round(c[0] * gf / (c[1] / 60)), Math.round(c[0] / c[1]), Math.round(c[0] * c[1] / gf / 60), Math.round(ans * 60 / gf)], 'gtt/min', 0,
        c[0] + ' mL × ' + gf + ' gtt/mL ÷ ' + c[1] + ' min = ' + num(ans, 1) + ' → ' + Math.round(ans) + ' gtt/min');
    },
    dopamine: function () {
      var dose = pick([2, 5, 10, 15, 20]), kg = pick([50, 60, 70, 80, 90, 100]), ans = dose * kg * 60 / 1600;
      return numQ('Dopamine ' + dose + ' mcg/kg/min for an ' + kg + ' kg patient. Bag: 400 mg in 250 mL (1600 mcg/mL), microdrip (60 gtt/mL). Drip rate?',
        ans, [dose * kg / 1600, dose * kg / 1600 * 1000, dose * kg * 60 / 400, dose * 60 / 1600 * 10], 'gtt/min', 1,
        dose + ' × ' + kg + ' kg × 60 min ÷ 1600 mcg/mL = ' + num(ans, 1) + ' mL/hr = ' + num(ans, 1) + ' gtt/min on a microdrip');
    },
    lido: function () {
      var dose = pick([1, 2, 3, 4]), ans = dose * 60 / 4;
      return numQ('Lidocaine drip at ' + dose + ' mg/min. Bag: 2 g in 500 mL, microdrip (60 gtt/mL). Drip rate?',
        ans, [dose * 4, dose * 60 / 2, dose * 15 / 60, dose * 60 / 40], 'gtt/min', 1,
        '2 g = 2000 mg ÷ 500 mL = 4 mg/mL. ' + dose + ' mg/min × 60 ÷ 4 mg/mL = ' + num(ans) + ' mL/hr = ' + num(ans) + ' gtt/min');
    }
  };
  var MATH_KINDS = ['dh', 'dh', 'weight', 'gtt', 'gtt', 'dopamine', 'lido'];

  // ABGs: pick a disturbance and whether it is partly compensated.
  var ABG_NAMES = { ra: 'Respiratory acidosis', rb: 'Respiratory alkalosis', ma: 'Metabolic acidosis', mb: 'Metabolic alkalosis' };
  function abg() {
    var kind = pick(['ra', 'rb', 'ma', 'mb']), comp = Math.random() < 0.5, pH, co2, hco3;
    if (kind === 'ra') { pH = rand(7.18, 7.32); co2 = rand(52, 72); hco3 = comp ? rand(28, 33) : rand(23, 26); }
    if (kind === 'rb') { pH = rand(7.48, 7.58); co2 = rand(22, 31); hco3 = comp ? rand(17, 21) : rand(22, 25); }
    if (kind === 'ma') { pH = rand(7.12, 7.32); hco3 = rand(9, 18); co2 = comp ? rand(24, 33) : rand(37, 43); }
    if (kind === 'mb') { pH = rand(7.48, 7.56); hco3 = rand(31, 39); co2 = comp ? rand(46, 52) : rand(37, 43); }
    pH = num(pH, 2); co2 = Math.round(co2); hco3 = Math.round(hco3);
    var acid = kind === 'ra' || kind === 'ma', resp = kind === 'ra' || kind === 'rb';
    var why = 'pH ' + pH + ' is ' + (acid ? 'acidic (< 7.35)' : 'alkalotic (> 7.45)') + '. ' +
      (resp ? 'PaCO₂ ' + co2 + ' moves opposite to pH, so it is respiratory (ROME: Respiratory Opposite).'
            : 'HCO₃⁻ ' + hco3 + ' moves the same way as pH, so it is metabolic (ROME: Metabolic Equal).') +
      (comp ? ' The ' + (resp ? 'HCO₃⁻' : 'PaCO₂') + ' is moving to compensate (partly compensated).' : ' The other value is normal (uncompensated).');
    var m = mc(ABG_NAMES[kind], shuffle(Object.keys(ABG_NAMES).filter(function (k) { return k !== kind; }).map(function (k) { return ABG_NAMES[k]; })));
    return { topic: 'acidbase', prompt: 'ABG: pH ' + pH + ', PaCO₂ ' + co2 + ' mmHg, HCO₃⁻ ' + hco3 + ' mEq/L. Primary disturbance?',
      options: m.options, answer: m.answer, why: why, mono: false, kind: kind };
  }

  // Strip questions: wrong answers from the same family first, then any other.
  function stripQ(s) {
    var a = ANS[s.ans];
    var same = shuffle(Object.keys(ANS).filter(function (k) { return k !== s.ans && ANS[k].family === a.family; }));
    var other = shuffle(Object.keys(ANS).filter(function (k) { return k !== s.ans && ANS[k].family !== a.family; }));
    var m = mc(a.name, same.concat(other).map(function (k) { return ANS[k].name; }));
    return { topic: 'ecg', strip: s.n, prompt: 'What is this rhythm?', options: m.options, answer: m.answer,
      why: a.look + ' (Handout key: ' + s.key + ')' };
  }

  function factQ(t, f) {
    var m = mc(f.a, shuffle(f.wrong));
    return { topic: t.id, prompt: esc(f.q), options: m.options, answer: m.answer, why: f.why || '' };
  }

  // Everything one topic can ask, as factories so generated ones come out fresh.
  function pool(t, withStrips) {
    var out = t.facts.map(function (f) { return function () { return factQ(t, f); }; });
    if (t.gen === 'math') MATH_KINDS.concat(MATH_KINDS).forEach(function (k) { out.push(MATH[k]); });
    if (t.gen === 'abg') for (var i = 0; i < 8; i++) out.push(abg);
    if (t.strips && withStrips) STRIPS.forEach(function (s) { out.push(function () { return stripQ(s); }); });
    return out;
  }

  // An exam spread evenly across the picked topics.
  function buildExam(ids, len, withStrips) {
    if (!ids.length) return [];
    var per = Math.ceil(len / ids.length), qs = [];
    ids.forEach(function (id) {
      shuffle(pool(T_BY[id], withStrips)).slice(0, per).forEach(function (f) { qs.push(f()); });
    });
    return shuffle(qs).slice(0, len);
  }

  window.MidtermGen = { math: MATH, abg: abg, stripQ: stripQ, buildExam: buildExam, num: num };

  if (typeof document === 'undefined' || !document.getElementById('subj-midterm')) return;

  // =====================================================================
  // Links into the other subjects (only shown when that subject exists)
  // =====================================================================
  function linkHtml(t) {
    var l = t.link;
    if (!l || !$('[data-subject="' + l[0] + '"]')) return '';
    return '<button class="btn" data-go="' + t.id + '">Study more: ' + esc(l[2]) + '</button>';
  }
  function go(t) {
    var l = t.link;
    var sb = $('[data-subject="' + l[0] + '"]');
    if (!sb) return;
    sb.click();
    var tab = $all('#subj-' + l[0] + ' .tab').filter(function (b) {
      return Object.keys(b.dataset).some(function (k) { return b.dataset[k] === l[1]; });
    })[0];
    if (tab) tab.click();
    if (l[3]) { var page = $('#subj-' + l[0] + ' [data-seg="learn"][data-val="' + l[3] + '"]'); if (page) page.click(); }
    window.scrollTo(0, 0);
  }

  function stripImg(n) {
    var nn = (n < 10 ? '0' : '') + n;
    return '<div class="mt-strip-wrap"><img class="mt-strip" src="img/midterm/strip' + nn + '.jpg" alt="Rhythm strip ' + n + ' from the class handout" loading="lazy"></div>' +
      '<p class="real-note">Handout strip ' + n + ' · Lead II · swipe sideways on a phone to see all of it</p>';
  }

  // =====================================================================
  // Tabs
  // =====================================================================
  var VIEWS = {};
  function showTab(tab) {
    S.tab = VIEWS[tab] ? tab : 'review'; save();
    $all('#subj-midterm .tab').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.mtab === S.tab)); });
    $all('#subj-midterm .view').forEach(function (v) { v.hidden = v.id !== 'mview-' + S.tab; });
    VIEWS[S.tab].show();
  }
  $all('#subj-midterm .tab').forEach(function (b) {
    b.addEventListener('click', function () { showTab(b.dataset.mtab); });
  });

  // ---------- Review ----------
  var reviewEl = $('#mview-review');
  function pill(a) {
    if (a === null) return '<span class="pill none">new</span>';
    var p = Math.round(a * 100);
    return '<span class="pill ' + (p >= 80 ? 'high' : p >= 60 ? 'mid' : 'low') + '">' + p + '%</span>';
  }
  function reviewRender() {
    reviewEl.innerHTML =
      '<div><h2 class="title">Midterm review</h2><p class="lede">The ' + TOPICS.length + ' topics on the midterm. Open one to read the review sheet, then drill it, or take a mixed practice exam.</p></div>' +
      '<div class="row"><button class="btn primary big" data-act="exam-all">Practice exam: all topics</button><button class="btn" data-act="strips">Handout strips (' + STRIPS.length + ')</button></div>' +
      '<div class="ref-list">' + TOPICS.map(function (t, i) {
        return '<details class="ref"><summary><span class="r-name">' + (i + 1) + '. ' + esc(t.name) + '</span> ' + pill(acc('stats', t.id)) + '</summary>' +
          '<div class="ref-body"><ul class="items mt-points">' + t.points.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
          '<div class="row"><button class="btn primary" data-drill="' + t.id + '">Drill this topic</button>' + linkHtml(t) + '</div></div></details>';
      }).join('') + '</div>';
  }
  reviewEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-drill],[data-go]');
    if (!t) return;
    if (t.dataset.go) return go(T_BY[t.dataset.go]);
    if (t.dataset.drill) { showTab('exam'); return examStart(buildExam([t.dataset.drill], 15, true), T_BY[t.dataset.drill].name); }
    if (t.dataset.act === 'exam-all') { showTab('exam'); return examStart(buildExam(TOPICS.map(function (x) { return x.id; }), S.len, true), 'Practice exam'); }
    if (t.dataset.act === 'strips') return showTab('strips');
  });
  VIEWS.review = { show: reviewRender };

  // ---------- Exam ----------
  var examEl = $('#mview-exam');
  var E = null;

  function examSetup(error) {
    examEl.innerHTML =
      '<div><h2 class="title">Practice exam</h2><p class="lede">Mixed multiple-choice questions spread across the topics you pick, including fresh med math and ABG problems and the handout rhythm strips.</p></div>' +
      '<div class="panel"><div class="field-row"><p class="eyebrow">Questions</p>' + seg('len', S.len, [[20, '20'], [40, '40'], [60, '60'], [100, '100']]) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Answers</p>' + seg('feedback', S.feedback, [['each', 'After each question'], ['end', 'At the end (test mode)']]) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Topics</p><div class="row">' + TOPICS.map(function (t) {
        return '<label class="check"><input type="checkbox" data-topic="' + t.id + '"' + (S.topics[t.id] ? ' checked' : '') + '> ' + esc(t.short) + '</label>';
      }).join('') + '</div><div class="row"><button class="btn" data-act="all">All</button><button class="btn" data-act="none">None</button><button class="btn" data-act="weak">Weakest 3</button></div></div>' +
      (error ? '<p class="error">' + esc(error) + '</p>' : '') +
      '<div><button class="btn primary big" data-act="start">Start exam</button></div></div>';
  }

  function examStart(list, title) {
    if (!list.length) return examSetup('Pick at least one topic.');
    E = { list: list, i: 0, title: title || 'Practice exam', answers: [], state: null, feedback: S.feedback };
    examRender();
    window.scrollTo(0, 0);
  }

  function examRender() {
    if (E.i >= E.list.length) return examDone();
    var q = E.list[E.i], st = E.state, show = st && E.feedback === 'each';
    var right = E.answers.filter(function (a) { return a.ok; }).length;
    var html = '<div class="progress-line"><span>' + esc(E.title) + ' · ' + (E.i + 1) + ' of ' + E.list.length + '</span><span>' +
      (E.feedback === 'each' ? right + ' right' : esc(T_BY[q.topic].short)) + '</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(E.i / E.list.length * 100) + '%"></span></div>' +
      '<div class="panel">' + (E.feedback === 'each' ? '<p class="eyebrow">' + esc(T_BY[q.topic].name) + '</p>' : '') +
      (q.strip ? stripImg(q.strip) : '') + '<p class="q-prompt">' + q.prompt + '</p>' +
      '<div class="options">' + q.options.map(function (o, i) {
        var cls = 'option' + (q.mono ? ' dose-opt' : '');
        if (show) { if (i === q.answer) cls += ' right'; else if (i === st.choice) cls += ' wrong'; }
        return '<button class="' + cls + '" data-opt="' + i + '"' + (show ? ' disabled' : '') + '><span class="key">' + 'ABCD'[i] + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>';
    if (show) {
      html += '<div class="verdict ' + (st.ok ? 'ok' : 'no') + '"><p class="v-title">' + (st.ok ? 'Correct' : 'Answer: ' + esc(q.options[q.answer])) + '</p>' +
        (q.why ? '<p>' + esc(q.why) + '</p>' : '') + '</div>' +
        '<div><button class="btn primary big" data-act="next">' + (E.i + 1 < E.list.length ? 'Next question' : 'See results') + '</button></div>';
    }
    html += '</div><div class="row spread"><p class="kbd-hint">Keys: A–D to answer · Enter for next</p><button class="btn" data-act="quit">End exam</button></div>';
    examEl.innerHTML = html;
    if (show) { var nx = $('[data-act="next"]', examEl); if (nx) nx.focus({ preventScroll: true }); }
  }

  function examChoose(choice) {
    var q = E.list[E.i], ok = choice === q.answer;
    E.answers.push({ q: q, choice: choice, ok: ok });
    record('stats', q.topic, ok);
    if (q.strip) record('strips', q.strip, ok);
    save();
    if (E.feedback === 'each') { E.state = { ok: ok, choice: choice }; return examRender(); }
    E.i++;
    examRender();
  }
  function examNext() { E.i++; E.state = null; examRender(); window.scrollTo(0, 0); }

  function examDone() {
    var n = E.answers.length;
    if (!n) { E = null; return examSetup(); }
    var right = E.answers.filter(function (a) { return a.ok; }).length, pct = Math.round(right / n * 100);
    var by = {};
    E.answers.forEach(function (a) { var b = by[a.q.topic] || (by[a.q.topic] = { r: 0, n: 0 }); b.n++; if (a.ok) b.r++; });
    var missed = E.answers.filter(function (a) { return !a.ok; });
    examEl.innerHTML =
      '<div class="panel"><p class="eyebrow">' + esc(E.title) + ' complete</p><p class="score-big">' + pct + '%</p><p class="lede">' + right + ' of ' + n + ' right.</p>' +
      '<div class="row">' + (missed.length ? '<button class="btn primary" data-act="retry">Retry the ' + missed.length + ' missed</button>' : '') +
      '<button class="btn" data-act="new">New exam</button></div></div>' +
      '<div class="panel"><p class="eyebrow">By topic</p><div class="table-wrap"><table><thead><tr><th>Topic</th><th>Score</th><th></th></tr></thead><tbody>' +
      TOPICS.filter(function (t) { return by[t.id]; }).sort(function (a, b) { return by[a.id].r / by[a.id].n - by[b.id].r / by[b.id].n; }).map(function (t) {
        return '<tr><td>' + esc(t.name) + '</td><td>' + by[t.id].r + '/' + by[t.id].n + ' ' + pill(by[t.id].r / by[t.id].n) + '</td><td><button class="btn" data-drill="' + t.id + '">Drill</button></td></tr>';
      }).join('') + '</tbody></table></div></div>' +
      (missed.length ? '<div class="panel"><p class="eyebrow">Missed questions</p><ul class="missed-list">' + missed.map(function (a) {
        return '<li><span>' + (a.q.strip ? 'Handout strip ' + a.q.strip + ': ' : '') + a.q.prompt + '</span>' +
          '<span class="small">You picked: ' + esc(a.q.options[a.choice]) + '</span>' +
          '<span class="muted small">Answer: <strong>' + esc(a.q.options[a.q.answer]) + '</strong>' + (a.q.why ? '. ' + esc(a.q.why) : '') + '</span></li>';
      }).join('') + '</ul></div>' : '');
  }

  examEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-seg],[data-opt],[data-drill]');
    if (!t) return;
    if (t.dataset.seg) { S[t.dataset.seg] = t.dataset.seg === 'len' ? Number(t.dataset.val) : t.dataset.val; save(); return examSetup(); }
    if (t.dataset.opt && E && !E.state) return examChoose(Number(t.dataset.opt));
    if (t.dataset.drill) return examStart(buildExam([t.dataset.drill], 15, true), T_BY[t.dataset.drill].name);
    var act = t.dataset.act;
    if (act === 'start') return examStart(buildExam(TOPICS.filter(function (x) { return S.topics[x.id]; }).map(function (x) { return x.id; }), S.len, true));
    if (act === 'next') return examNext();
    if (act === 'quit') { E.list = E.list.slice(0, E.answers.length); E.i = E.list.length; return examRender(); }
    if (act === 'retry') {
      // Strips and fact questions come back as they were; reshuffle their choices.
      return examStart(shuffle(E.answers.filter(function (a) { return !a.ok; }).map(function (a) {
        var q = a.q, right = q.options[q.answer], m = mc(right, q.options.filter(function (o) { return o !== right; }));
        return Object.assign({}, q, { options: m.options, answer: m.answer });
      })), 'Missed questions');
    }
    if (act === 'new') { E = null; return examSetup(); }
    if (act === 'all' || act === 'none') { TOPICS.forEach(function (x) { S.topics[x.id] = act === 'all'; }); save(); return examSetup(); }
    if (act === 'weak') {
      var weak = TOPICS.slice().sort(function (a, b) {
        var x = acc('stats', a.id), y = acc('stats', b.id);
        return (x === null ? 0.5 : x) - (y === null ? 0.5 : y);
      }).slice(0, 3).map(function (x) { return x.id; });
      TOPICS.forEach(function (x) { S.topics[x.id] = weak.indexOf(x.id) !== -1; }); save(); return examSetup();
    }
  });
  examEl.addEventListener('change', function (e) {
    var k = e.target.dataset && e.target.dataset.topic;
    if (k) { S.topics[k] = e.target.checked; save(); }
  });
  VIEWS.exam = { show: function () { if (E) examRender(); else examSetup(); } };

  // ---------- Handout strips ----------
  var stripsEl = $('#mview-strips');
  var X = null;

  function stripsSetup() {
    stripsEl.innerHTML =
      '<div><h2 class="title">Handout strips</h2><p class="lede">The ' + STRIPS.length + ' strips from the "Send home rhythms" handout, checked against its answer key. Name each rhythm, then see what to look for.</p></div>' +
      '<div class="panel"><div class="field-row"><p class="eyebrow">Order</p>' + seg('stripOrder', S.stripOrder, [['shuffle', 'Shuffled'], ['handout', 'Handout order'], ['weak', 'Missed first']]) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Answer by</p>' + seg('stripMode', S.stripMode, [['mc', 'Multiple choice'], ['reveal', 'Say it, then reveal']]) + '</div>' +
      '<div><button class="btn primary big" data-act="start">Start</button></div></div>';
  }
  function stripsStart() {
    var list = STRIPS.slice();
    if (S.stripOrder === 'shuffle') list = shuffle(list);
    if (S.stripOrder === 'weak') list = shuffle(list).sort(function (a, b) {
      var x = acc('strips', a.n), y = acc('strips', b.n);
      return (x === null ? 0.5 : x) - (y === null ? 0.5 : y);
    });
    X = { list: list.map(stripQ), i: 0, right: 0, missed: [], state: null };
    stripsRender();
  }
  function stripsRender() {
    if (X.i >= X.list.length) return stripsDone();
    var q = X.list[X.i], st = X.state, s = STRIPS.filter(function (x) { return x.n === q.strip; })[0];
    var html = '<div class="progress-line"><span>Strip ' + (X.i + 1) + ' of ' + X.list.length + '</span><span>' + X.right + ' right</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(X.i / X.list.length * 100) + '%"></span></div>' +
      '<div class="panel">' + stripImg(q.strip) + '<p class="q-prompt">What is this rhythm?</p>';
    if (S.stripMode === 'mc') {
      html += '<div class="options">' + q.options.map(function (o, i) {
        var cls = 'option';
        if (st) { if (i === q.answer) cls += ' right'; else if (i === st.choice) cls += ' wrong'; }
        return '<button class="' + cls + '" data-opt="' + i + '"' + (st ? ' disabled' : '') + '><span class="key">' + 'ABCD'[i] + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>';
    } else if (!st) {
      html += '<div><button class="btn primary big" data-act="reveal">Reveal</button></div>';
    }
    if (st && st.revealed) {
      html += '<div class="verdict ok"><p class="v-title">' + esc(q.options[q.answer]) + '</p><p>' + esc(ANS[s.ans].look) + '</p><p class="small">Handout key: ' + esc(s.key) + '</p></div>' +
        '<div class="row"><button class="btn" data-act="self-no">I missed it</button><button class="btn primary" data-act="self-yes">I got it</button></div>';
    } else if (st) {
      html += '<div class="verdict ' + (st.ok ? 'ok' : 'no') + '"><p class="v-title">' + (st.ok ? 'Correct: ' : 'It\'s ') + esc(q.options[q.answer]) + '</p><p>' + esc(ANS[s.ans].look) + '</p><p class="small">Handout key: ' + esc(s.key) + '</p></div>' +
        '<div><button class="btn primary big" data-act="next">' + (X.i + 1 < X.list.length ? 'Next strip' : 'See results') + '</button></div>';
    }
    stripsEl.innerHTML = html + '</div>';
  }
  function stripsAnswer(ok, choice) {
    var q = X.list[X.i];
    record('strips', q.strip, ok); record('stats', 'ecg', ok); save();
    if (ok) X.right++; else X.missed.push(q);
    X.state = { ok: ok, choice: choice };
    if (S.stripMode === 'reveal') return stripsNext();
    stripsRender();
  }
  function stripsNext() { X.i++; X.state = null; stripsRender(); window.scrollTo(0, 0); }
  function stripsDone() {
    var n = X.list.length;
    stripsEl.innerHTML = '<div class="panel"><p class="eyebrow">Strips complete</p><p class="score-big">' + Math.round(X.right / n * 100) + '%</p><p class="lede">' + X.right + ' of ' + n + ' right.</p>' +
      '<div class="row">' + (X.missed.length ? '<button class="btn primary" data-act="retry">Retry the ' + X.missed.length + ' missed</button>' : '') + '<button class="btn" data-act="new">Start over</button></div></div>' +
      (X.missed.length ? '<div class="panel"><p class="eyebrow">Missed</p><ul class="missed-list">' + X.missed.map(function (q) {
        return '<li><span>Strip ' + q.strip + '</span><span class="muted small">' + esc(q.options[q.answer]) + '</span></li>';
      }).join('') + '</ul></div>' : '');
  }
  stripsEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-seg],[data-opt]');
    if (!t) return;
    if (t.dataset.seg) { S[t.dataset.seg] = t.dataset.val; save(); return stripsSetup(); }
    if (t.dataset.opt && X && !X.state) { var c = Number(t.dataset.opt); return stripsAnswer(c === X.list[X.i].answer, c); }
    var act = t.dataset.act;
    if (act === 'start') return stripsStart();
    if (act === 'reveal') { X.state = { revealed: true }; return stripsRender(); }
    if (act === 'self-yes' || act === 'self-no') return stripsAnswer(act === 'self-yes', -1);
    if (act === 'next') return stripsNext();
    if (act === 'retry') { X = { list: shuffle(X.missed).map(function (q) { return stripQ(STRIPS.filter(function (s) { return s.n === q.strip; })[0]); }), i: 0, right: 0, missed: [], state: null }; return stripsRender(); }
    if (act === 'new') { X = null; return stripsSetup(); }
  });
  VIEWS.strips = { show: function () { if (X) stripsRender(); else stripsSetup(); } };

  // ---------- Stats ----------
  var statsEl = $('#mview-stats');
  var confirmReset = false;
  function statsRender() {
    var total = 0, right = 0;
    TOPICS.forEach(function (t) { var s = S.stats[t.id]; if (s) { total += s.n; right += s.r; } });
    var seenStrips = STRIPS.filter(function (s) { return S.strips[s.n]; });
    statsEl.innerHTML =
      '<div><h2 class="title">Stats</h2><p class="lede">Accuracy per midterm topic across exams, drills and strips, weakest first.</p></div>' +
      '<div class="stats-row"><div class="stat"><p class="eyebrow">Answered</p><p class="score-big">' + total + '</p></div>' +
      '<div class="stat"><p class="eyebrow">Accuracy</p><p class="score-big">' + (total ? Math.round(right / total * 100) + '%' : '–') + '</p></div>' +
      '<div class="stat"><p class="eyebrow">Strips seen</p><p class="score-big">' + seenStrips.length + '/' + STRIPS.length + '</p></div></div>' +
      '<div class="panel"><div class="table-wrap"><table><thead><tr><th>Topic</th><th>Right</th><th>Accuracy</th><th></th></tr></thead><tbody>' +
      TOPICS.slice().sort(function (a, b) {
        var x = acc('stats', a.id), y = acc('stats', b.id);
        return (x === null ? 2 : x) - (y === null ? 2 : y);
      }).map(function (t) {
        var s = S.stats[t.id];
        return '<tr><td>' + esc(t.name) + '</td><td>' + (s ? s.r + '/' + s.n : '–') + '</td><td>' + pill(acc('stats', t.id)) + '</td><td><button class="btn" data-drill="' + t.id + '">Drill</button></td></tr>';
      }).join('') + '</tbody></table></div></div>' +
      (seenStrips.length ? '<div class="panel"><p class="eyebrow">Handout strips</p><div class="chips">' + STRIPS.filter(function (s) { return S.strips[s.n]; }).map(function (s) {
        return '<span class="chip">' + s.n + ' ' + pill(acc('strips', s.n)) + '</span>';
      }).join('') + '</div></div>' : '') +
      '<div class="row">' + (confirmReset ? '<span>Clear all midterm stats?</span><button class="btn" data-act="reset-no">Cancel</button><button class="btn primary" data-act="reset-yes">Clear</button>'
        : '<button class="btn" data-act="reset">Reset stats</button>') + '</div>';
  }
  statsEl.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act],[data-drill]');
    if (!t) return;
    if (t.dataset.drill) { showTab('exam'); return examStart(buildExam([t.dataset.drill], 15, true), T_BY[t.dataset.drill].name); }
    if (t.dataset.act === 'reset') confirmReset = true;
    if (t.dataset.act === 'reset-no') confirmReset = false;
    if (t.dataset.act === 'reset-yes') { S.stats = {}; S.strips = {}; save(); confirmReset = false; }
    statsRender();
  });
  VIEWS.stats = { show: statsRender };

  // ---------- Keyboard ----------
  document.addEventListener('keydown', function (e) {
    if (document.body.dataset.subject !== 'midterm') return;
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    var idx = 'abcd'.indexOf((e.key || '').toLowerCase());
    if (S.tab === 'exam' && E && E.i < E.list.length) {
      if (!E.state && idx !== -1 && idx < E.list[E.i].options.length) examChoose(idx);
      else if (E.state && e.key === 'Enter' && tag !== 'button') { e.preventDefault(); examNext(); }
    } else if (S.tab === 'strips' && X && X.i < X.list.length && S.stripMode === 'mc') {
      if (!X.state && idx !== -1) stripsAnswer(idx === X.list[X.i].answer, idx);
      else if (X.state && e.key === 'Enter' && tag !== 'button') { e.preventDefault(); stripsNext(); }
    }
  });

  window.MidtermBox = { show: function () { showTab(S.tab); } };
})();
