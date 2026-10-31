/*
 * One labeled ECG beat (plus the next one, so the R-R and TP segment show),
 * drawn to scale on ECG paper (25 mm/s, 10 mm/mV: 1 small box = 0.04 s) as
 * inline SVG. Used by the Cardiology "Intervals" page and its measuring
 * questions. Every wave starts and ends on a small-box line, so the student
 * can count boxes exactly. Pure functions, no DOM, so it can be tested in Node.
 */
(function (root) {
  'use strict';

  var MM_PER_S = 25, MM_PER_MV = 10, H = 30, BASE = 17, uid = 0;
  var DEFAULT = { pr: 0.16, p: 0.08, qrs: 0.08, qt: 0.36, t: 0.16, rr: 0.84, u: true };

  function r2(x) { return Math.round(x * 1000) / 1000; }

  // Times (seconds from the left edge) of every landmark for two beats.
  function landmarks(o) {
    o = Object.assign({}, DEFAULT, o || {});
    var p1 = 0.16, q1 = p1 + o.pr, tOff = q1 + o.qt;
    var L = {
      pOn: p1, pOff: p1 + o.p, qrsOn: q1, r1: q1 + o.qrs * 0.45, j: q1 + o.qrs,
      tOn: tOff - o.t, tOff: tOff, uOn: tOff + 0.04, uOff: tOff + 0.16,
      pOn2: p1 + o.rr, qrsOn2: q1 + o.rr, r2: q1 + o.rr + o.qrs * 0.45
    };
    if (L.uOff >= L.pOn2 - 0.02) o.u = false;
    L.restOn = o.u ? L.uOff : L.tOff;
    L.end = q1 + o.rr + o.qt + 0.12;
    Object.keys(L).forEach(function (k) { L[k] = r2(L[k]); });
    return { L: L, o: o };
  }

  // Voltage (mV) of one beat at time t, beat starting with its P wave at p0.
  function beat(t, p0, o) {
    var q = p0 + o.pr, j = q + o.qrs, tOff = q + o.qt, tOn = tOff - o.t, u;
    if (t >= p0 && t <= p0 + o.p) return 0.15 * Math.sin(Math.PI * (t - p0) / o.p);
    if (t >= q && t <= j) {
      var x = (t - q) / o.qrs;
      var pts = [[0, 0], [0.15, -0.1], [0.45, 1.2], [0.75, -0.3], [1, 0]];
      for (var i = 1; i < pts.length; i++) {
        if (x <= pts[i][0]) {
          var a = pts[i - 1], b = pts[i];
          return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
        }
      }
      return 0;
    }
    if (t > j && t < tOn) return 0.02 * (t - j) / (tOn - j);
    if (t >= tOn && t <= tOff) {
      u = (t - tOn) / o.t;
      return 0.02 * (1 - u) + 0.3 * Math.sin(Math.PI * Math.pow(u, 1.3));
    }
    if (o.u && t >= tOff + 0.04 && t <= tOff + 0.16) return 0.06 * Math.sin(Math.PI * (t - tOff - 0.04) / 0.12);
    return 0;
  }

  function voltage(t, o, L) { return beat(t, L.pOn, o) + beat(t, L.pOn2, o); }

  function x(t) { return (t * MM_PER_S).toFixed(2); }
  function y(v) { return (BASE - v * MM_PER_MV).toFixed(2); }

  function trace(o, L, t0, t1) {
    var d = '';
    for (var t = t0, first = true; t <= t1 + 1e-9; t += 0.002, first = false) d += (first ? 'M' : 'L') + x(t) + ' ' + y(voltage(t, o, L));
    return d;
  }

  function paper(id, w) {
    return '<defs>' +
      '<pattern id="ws' + id + '" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0V1H0" class="ecg-minor"/></pattern>' +
      '<pattern id="wl' + id + '" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="url(#ws' + id + ')"/><path d="M5 0V5H0" class="ecg-major"/></pattern>' +
      '</defs><rect width="' + w + '" height="' + H + '" class="ecg-bg"/><rect width="' + w + '" height="' + H + '" fill="url(#wl' + id + ')"/>';
  }

  // part: { id, from, to, name } from CARDIO_WAVES.parts, or null.
  // opts: { label: text under the bracket (default part.name), letters: show P Q R S T U }
  function svg(params, part, opts) {
    opts = opts || {};
    var lm = landmarks(params), L = lm.L, o = lm.o, w = Math.ceil(L.end * MM_PER_S / 5) * 5, id = ++uid;
    var s = '<svg class="ecg wv-svg" viewBox="0 0 ' + w + ' ' + H + '" role="img" aria-label="' + (part ? part.name : 'One heartbeat') + ' on ECG paper">' + paper(id, w);
    if (part) {
      var a = L[part.from], b = L[part.to];
      if (a === b) {
        s += '<path d="' + trace(o, L, 0, L.end) + '" class="ecg-trace"/>' +
          '<circle cx="' + x(a) + '" cy="' + y(voltage(a, o, L)) + '" r="0.9" class="wv-dot"/>' +
          '<text x="' + Math.max(9, a * MM_PER_S).toFixed(2) + '" y="' + (BASE + 10.4) + '" class="wv-lab">' + (opts.label || part.name) + '</text>';
      } else {
        var top = part.id === 'rr';
        s += '<rect x="' + x(a) + '" y="0" width="' + x(b - a) + '" height="' + H + '" class="wv-band"/>' +
          '<path d="' + trace(o, L, 0, L.end) + '" class="ecg-trace"/>' +
          '<path d="' + trace(o, L, a, b) + '" class="wv-hl"/>';
        var by = top ? 2 : BASE + 6, ty = BASE + 10.4, mid = Math.max(9, Math.min(w - 9, (a + b) / 2 * MM_PER_S)).toFixed(2);
        s += '<path d="M' + x(a) + ' ' + (by - 1) + 'v2M' + x(a) + ' ' + by + 'H' + x(b) + 'M' + x(b) + ' ' + (by - 1) + 'v2" class="wv-br"/>';
        if (top) s += '<text x="' + mid + '" y="' + (by + 2.6) + '" class="wv-lab">' + (opts.label || part.name) + '</text>';
        else s += '<text x="' + mid + '" y="' + ty + '" class="wv-lab">' + (opts.label || part.name) + '</text>';
      }
    } else {
      s += '<path d="' + trace(o, L, 0, L.end) + '" class="ecg-trace"/>';
    }
    if (opts.letters !== false) {
      var lt = [['P', (L.pOn + L.pOff) / 2, 0.15, -1.2], ['Q', L.qrsOn + o.qrs * 0.15 - 0.03, -0.1, 2.2], ['R', L.r1 + 0.04, 1.0, 0],
        ['S', L.qrsOn + o.qrs * 0.75, -0.3, 2.6], ['T', L.tOff - o.t * 0.42, 0.3, -1.2]];
      if (o.u) lt.push(['U', L.uOn + 0.06, 0.06, -1.2]);
      s += lt.map(function (k) {
        return '<text x="' + x(k[1]) + '" y="' + (Number(y(k[2])) + k[3]).toFixed(2) + '" class="wv-letter">' + k[0] + '</text>';
      }).join('');
    }
    return s + '</svg>';
  }

  // ---------- Measuring questions ----------
  function fmt(s) { return s.toFixed(2) + ' s'; }
  function boxes(s) { return Math.round(s / 0.04); }
  function pickR(rng, list) { return list[Math.floor(rng() * list.length)]; }

  // Options: the answer plus its nearest neighbors on the list.
  function nearOpts(rng, list, ans) {
    var i = list.indexOf(ans), out = [ans];
    for (var d = 1; out.length < 4 && d < list.length; d++) {
      if (list[i + d] != null) out.push(list[i + d]);
      if (out.length < 4 && list[i - d] != null) out.push(list[i - d]);
    }
    for (var k = out.length - 1; k > 0; k--) { var m = Math.floor(rng() * (k + 1)), tmp = out[k]; out[k] = out[m]; out[m] = tmp; }
    return out;
  }

  var KINDS = ['pr', 'qrs', 'qt', 'rate'];

  // Returns { kind, params, part id, prompt, options (strings), answer index, explain }.
  function measure(kind, seed) {
    var rng = root.ECG ? root.ECG.makeRng(seed) : Math.random;
    kind = kind || pickR(rng, KINDS);
    var p = { rr: pickR(rng, [0.8, 0.88, 0.96]), u: false }, ans, list, verdict, part, prompt, n;
    if (kind === 'pr') {
      list = [0.08, 0.12, 0.16, 0.2, 0.24, 0.28, 0.32];
      ans = pickR(rng, list.slice(1));
      p.pr = ans;
      n = boxes(ans);
      verdict = ans > 0.2 ? 'Long (over 0.20 s): first-degree AV block if it is the same every beat.' : 'Normal (0.12–0.20 s).';
      part = 'pr'; prompt = 'Count the small boxes. How long is the PR interval?';
    } else if (kind === 'qrs') {
      list = [0.04, 0.06, 0.08, 0.1, 0.12, 0.14, 0.16];
      ans = pickR(rng, list.slice(1));
      p.qrs = ans;
      p.qt = Math.max(0.36, ans + 0.24);
      n = Math.round(ans / 0.04 * 2) / 2;
      verdict = ans >= 0.12 ? 'Wide (0.12 s or more): bundle branch block, or a beat from the ventricles.' : 'Narrow (under 0.12 s): the impulse came down the normal pathway.';
      part = 'qrs'; prompt = 'Count the small boxes. How wide is the QRS?';
    } else if (kind === 'qt') {
      p.rr = pickR(rng, [0.8, 1.0, 1.2]);
      list = [0.28, 0.32, 0.36, 0.4, 0.44, 0.48, 0.52, 0.56, 0.6];
      var maxQt = p.rr - 0.32;
      ans = pickR(rng, list.filter(function (v) { return v >= 0.32 && v <= maxQt + 1e-9; }));
      p.qt = ans;
      p.t = 0.16;
      n = boxes(ans);
      var qtc = Math.round(ans / Math.sqrt(p.rr) * 1000);
      verdict = 'QTc = QT ÷ √R-R = ' + Math.round(ans * 1000) + ' ÷ √' + p.rr.toFixed(2) + ' ≈ ' + qtc + ' ms: ' +
        (qtc > 460 ? 'long in anyone (over 450 ms in males, 460 ms in females). Risk of torsades.' : qtc > 450 ? 'long in a male (over 450 ms), borderline in a female.' : 'normal.') +
        ' The QT is ' + (ans > p.rr / 2 ? 'more' : 'less') + ' than half the R-R (' + fmt(p.rr) + ').';
      part = 'qt'; prompt = 'Count the small boxes. How long is the QT interval?';
    } else {
      var rrBoxes = pickR(rng, [15, 20, 25, 30]);
      p.rr = rrBoxes * 0.04;
      p.qt = rrBoxes >= 25 ? 0.4 : 0.36;
      ans = 1500 / rrBoxes;
      list = [50, 60, 75, 100, 150];
      n = rrBoxes;
      verdict = rrBoxes + ' small boxes between R waves: 1,500 ÷ ' + rrBoxes + ' = ' + ans + '/min (or 300 ÷ ' + rrBoxes / 5 + ' large boxes).';
      part = 'rr'; prompt = 'Count the small boxes between the R waves. What is the heart rate?';
      var ro = nearOpts(rng, list, ans);
      return { kind: kind, params: p, part: part, prompt: prompt, options: ro.map(function (v) { return v + '/min'; }), answer: ro.indexOf(ans), explain: verdict };
    }
    var opts = nearOpts(rng, list, ans);
    return {
      kind: kind, params: p, part: part, prompt: prompt, options: opts.map(fmt), answer: opts.indexOf(ans),
      explain: n + ' small box' + (n === 1 ? '' : 'es') + ' × 0.04 s = ' + fmt(ans) + '. ' + verdict
    };
  }

  root.WAVES = { svg: svg, landmarks: landmarks, voltage: function (t, params) { var lm = landmarks(params); return voltage(t, lm.o, lm.L); }, measure: measure, kinds: KINDS, DEFAULT: DEFAULT };
})(typeof window !== 'undefined' ? window : globalThis);
