/*
 * Answer checking. Pure functions, no DOM, so they can be tested in Node.
 *
 * - Names: typo-tolerant match against the drug name, trade names and aliases.
 * - Lists (indications, contraindications): keyword overlap per item, with
 *   common EMS abbreviations expanded.
 * - Doses: every number in the correct dose must appear in the answer.
 */
(function (root) {
  var STOP = new Set(('a an and or the of with to for in on if is are be than as by at from ' +
    'use used using may can any other such e g eg etc not no per pt patient patients ' +
    'history hx known').split(' '));

  // Common shorthand → words that appear in the deck.
  var ABBREV = {
    '2nd': 'second', '3rd': 'third', '1st': 'first',
    hb: 'heart block', avb: 'heart block', ahb: 'heart block',
    vf: 'vfib', vt: 'vtach', pvt: 'pulseless vtach', pvc: 'pvc', pvcs: 'pvc',
    svt: 'svt', htn: 'hypertension', hr: 'heart rate', bp: 'blood pressure',
    loc: 'loc', aloc: 'altered loc', ams: 'altered loc', gi: 'gi', ich: 'intracranial bleed',
    tbi: 'head injury', co: 'cardiac output',
    sob: 'respiratory distress', dib: 'respiratory distress', resp: 'respiratory',
    od: 'overdose', ccb: 'calcium channel blocker', bb: 'beta blocker',
    maoi: 'mao inhibitors', maois: 'mao inhibitors', hypoglycemic: 'hypoglycemia',
    lowbloodsugar: 'hypoglycemia', etoh: 'etoh', afib: 'afib', uri: 'infection',
    nv: 'nausea vomiting', copd: 'copd', chf: 'chf',
    acs: 'acs', ami: 'ami', mi: 'ami', stemi: 'stemi', qt: 'qt',
    hypo: 'hypoglycemia', rxn: 'reaction', rxns: 'reaction', hrs: 'hour',
    ckd: 'chronic kidney disease', mh: 'malignant hyperthermia', wpw: 'wpw'
  };

  function clean(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/[’'`]/g, '')
      .replace(/\bv[\s-]?fib\b/g, 'vfib')
      .replace(/\bv[\s-]?tach\b/g, 'vtach')
      .replace(/\bn\s*\/\s*v\b/g, 'nausea vomiting')
      .replace(/[–—]/g, '-');
  }

  function stem(t) {
    if (t.length > 4 && /ies$/.test(t)) return t.slice(0, -3) + 'y';
    if (t.length > 3 && /s$/.test(t) && !/ss$/.test(t)) return t.slice(0, -1);
    return t;
  }

  function tokens(s) {
    var out = [];
    clean(s).split(/[^a-z0-9.]+/).forEach(function (raw) {
      var t = raw.replace(/^\.+|\.+$/g, '');
      if (!t) return;
      var exp = ABBREV[t];
      (exp ? exp.split(' ') : [t]).forEach(function (w) {
        if (!STOP.has(w)) out.push(stem(w));
      });
    });
    return out;
  }

  function lev(a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    var prev = [], cur = [];
    for (var j = 0; j <= n; j++) prev[j] = j;
    for (var i = 1; i <= m; i++) {
      cur[0] = i;
      for (j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      var tmp = prev; prev = cur; cur = tmp;
    }
    return prev[n];
  }

  function tokenMatch(a, b) {
    if (a === b) return true;
    if (/\d/.test(a) || /\d/.test(b)) return false;
    var min = Math.min(a.length, b.length);
    if (min >= 5 && (a.indexOf(b) === 0 || b.indexOf(a) === 0)) return true;
    if (min >= 5) return lev(a, b) <= (min >= 9 ? 2 : 1);
    return false;
  }

  // Keywords that carry the meaning of an item. Parenthetical asides
  // ("(cannot process it)") are extra detail, so they don't count.
  function coreTokens(item) {
    var core = tokens(String(item).replace(/\([^)]*\)/g, ' '));
    return core.length ? core : tokens(item);
  }

  function hits(want, answerTokens) {
    return want.filter(function (w) {
      return answerTokens.some(function (a) { return tokenMatch(w, a); });
    }).length;
  }

  // Fraction of the item's keywords found in the answer tokens.
  function itemScore(item, answerTokens) {
    var want = coreTokens(item);
    return want.length ? hits(want, answerTokens) / want.length : 0;
  }

  // Short items (1–2 keywords) need every keyword. Longer ones need half,
  // or two keywords if the item is wordy.
  function itemMatches(item, answerTokens) {
    var want = coreTokens(item);
    if (!want.length) return false;
    var h = hits(want, answerTokens);
    if (want.length <= 2) return h === want.length;
    return h / want.length >= 0.5 || (h >= 2 && h / want.length >= 0.25);
  }

  // Grade a free-text list answer against the correct items.
  function gradeList(correctItems, answer) {
    var at = tokens(answer);
    return correctItems.map(function (item) {
      return { item: item, hit: at.length > 0 && itemMatches(item, at) };
    });
  }

  // Loose "do these two items say the same thing" check, used to keep
  // multiple-choice distractors from being secretly correct.
  function sameItem(a, b) {
    var ta = tokens(a), tb = tokens(b);
    if (!ta.length || !tb.length) return false;
    return itemScore(a, tb) >= 0.5 || itemScore(b, ta) >= 0.5;
  }

  function numbers(s) {
    var out = [];
    String(s || '').replace(/,(?=\d{3})/g, '').replace(/\d*\.?\d+/g, function (m) {
      out.push(parseFloat(m));
      return m;
    });
    return out;
  }

  // A dose item counts when every number in it shows up in the answer.
  // Items with no numbers ("Self-administered") fall back to keywords.
  function doseMatches(item, answer) {
    var want = numbers(item);
    if (!want.length) return itemMatches(item, tokens(answer));
    var have = numbers(answer);
    return want.every(function (n) {
      return have.some(function (h) { return Math.abs(h - n) < 1e-9; });
    });
  }

  function gradeDoses(correctItems, answer) {
    return correctItems.map(function (item) {
      return { item: item, hit: String(answer || '').trim() !== '' && doseMatches(item, answer) };
    });
  }

  function normName(s) {
    return clean(s).replace(/sulfate|hydrochloride|\bhcl\b/g, '').replace(/[^a-z0-9:]/g, '');
  }

  function nameMatches(answer, drug) {
    var a = normName(answer);
    if (!a) return false;
    var names = [drug.name].concat(drug.aliases || [], drug.trade || []);
    return names.some(function (n) {
      var b = normName(n);
      if (!b) return false;
      if (a === b) return true;
      var tol = b.length >= 9 ? 2 : b.length >= 5 ? 1 : 0;
      return lev(a, b) <= tol;
    });
  }

  function sameNumber(answer, expected) {
    var got = numbers(answer);
    return got.length === 1 && Math.abs(got[0] - expected) < 1e-9;
  }

  root.Grading = {
    tokens: tokens,
    lev: lev,
    gradeList: gradeList,
    gradeDoses: gradeDoses,
    doseMatches: doseMatches,
    itemMatches: itemMatches,
    sameItem: sameItem,
    numbers: numbers,
    nameMatches: nameMatches,
    sameNumber: sameNumber
  };
})(typeof window !== 'undefined' ? window : globalThis);
