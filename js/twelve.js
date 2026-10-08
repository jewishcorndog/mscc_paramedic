/*
 * 12-lead ECG generator. Builds 10 seconds of all 12 leads (plus V4R and
 * V7–V9) for a named pattern and draws them in the standard 3 × 4 layout with
 * a lead II rhythm strip, on 25 mm/s, 10 mm/mV paper, as inline SVG.
 *
 * The QRS, P and T waves come from a few electrical vectors in the body
 * (x = patient's left, y = down, z = toward the front). Each lead records the
 * part of each vector pointing toward it, so the leads always agree with each
 * other the way a real 12-lead does: rotate the vectors and the axis changes
 * in every lead at once. ST changes, extra Q or R waves and the Brugada and
 * ARVD shapes are added per lead on top, because the teaching patterns
 * name the leads directly.
 *
 * Pure functions, no DOM, so it can be tested in Node. Needs ecg.js first
 * (for the seeded random numbers).
 */
(function (root) {
  'use strict';

  var SECONDS = 10, HZ = 500, MM_PER_S = 25, MM_PER_MV = 10;

  function gauss(t, mu, sigma, amp) {
    var x = (t - mu) / sigma;
    if (x > 6 || x < -6) return 0;
    return amp * Math.exp(-0.5 * x * x);
  }
  function sig(x) { return x > 30 ? 1 : x < -30 ? 0 : 1 / (1 + Math.exp(-x)); }
  function rad(a) { return a * Math.PI / 180; }
  function unit(v) { var m = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]); return [v[0] / m, v[1] / m, v[2] / m]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function U(rng, a, b) { return a + (b - a) * rng(); }
  function tOffset(rr) { var qt = 0.4 * Math.sqrt(Math.max(0.3, Math.min(rr, 1.8))); return Math.max(0.16, qt - 0.1); }

  // Where each lead looks from, with its gain (chest leads record bigger complexes).
  // Limb leads sit in the frontal plane at their hexaxial angles; chest leads go
  // around the horizontal plane from the right of the sternum (V1) to the left side (V6).
  function limb(a) { return [1.3 * Math.cos(rad(a)), 1.3 * Math.sin(rad(a)), 0]; }
  function chest(a, down, g) { return unit([Math.cos(rad(a)), down, Math.sin(rad(a))]).map(function (x) { return x * g; }); }
  var LEADS = {
    I: limb(0), II: limb(60), III: limb(120), aVR: limb(-150), aVL: limb(-30), aVF: limb(90),
    V1: chest(115, 0, 1.3), V2: chest(95, 0, 1.7), V3: chest(75, 0.1, 1.75), V4: chest(60, 0.2, 1.65), V5: chest(35, 0.2, 1.4), V6: chest(10, 0.2, 1.15),
    V4R: chest(150, 0.2, 1.0), V7: chest(-20, 0.1, 0.85), V8: chest(-45, 0.1, 0.75), V9: chest(-70, 0.1, 0.65)
  };
  var LEAD_IDS = Object.keys(LEADS);
  var STANDARD = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

  // ---------- Patterns ----------
  // st: ST shift in mV at the J point, per lead (+ elevation, – depression).
  // hyper: extra T height in leads with ST elevation, as a share of the elevation.
  // tAdd: T wave added per lead (mV). rAdd: tall R added. qAdd: narrow deep Q added.
  // qrs: which conduction shape. axis: [lo, hi] for the frontal QRS axis in degrees.
  var INFERIOR_ST = { II: 0.2, III: 0.3, aVF: 0.25, aVL: -0.2, I: -0.08 };
  function merge(a, b) { var o = {}, k; for (k in a) o[k] = a[k]; for (k in b) o[k] = b[k]; return o; }
  var PATTERNS = {
    normal: { axis: [20, 80] },
    inferior: { axis: [40, 80], st: INFERIOR_ST, hyper: 1 },
    'inferior-rv': { axis: [40, 80], st: merge(INFERIOR_ST, { V1: 0.15, V4R: 0.22 }), hyper: 1 },
    anterior: { axis: [20, 70], st: { V2: 0.15, V3: 0.3, V4: 0.3, V5: 0.08, III: -0.08, aVF: -0.05 }, hyper: 1 },
    septal: { axis: [20, 70], st: { V1: 0.2, V2: 0.26, V3: 0.07 }, hyper: 1 },
    lateral: { axis: [10, 60], st: { I: 0.15, aVL: 0.2, V5: 0.2, V6: 0.18, III: -0.18, aVF: -0.1, II: -0.03 }, hyper: 1 },
    posterior: { axis: [30, 75], st: { V1: -0.2, V2: -0.26, V3: -0.2, V7: 0.16, V8: 0.2, V9: 0.18 }, tAdd: { V1: 0.22, V2: 0.26, V3: 0.16 }, rAdd: { V1: 0.6, V2: 0.75, V3: 0.3 } },
    pericarditis: { axis: [40, 75], st: { I: 0.15, II: 0.2, III: 0.08, aVL: 0.06, aVF: 0.14, aVR: -0.15, V1: -0.03, V2: 0.16, V3: 0.22, V4: 0.22, V5: 0.2, V6: 0.16 },
      pr: { I: -0.06, II: -0.08, aVF: -0.07, aVR: 0.08, V3: -0.07, V4: -0.07, V5: -0.07, V6: -0.06 } },
    rbbb: { axis: [30, 80], qrs: 'rbbb' },
    lbbb: { axis: [-20, 40], qrs: 'lbbb' },
    lah: { axis: [-75, -45] },
    lph: { axis: [105, 140] },
    bifasc: { axis: [-75, -50], qrs: 'rbbb' },
    wpw: { axis: [20, 75], qrs: 'wpw' },
    brugada: { axis: [30, 75], brugada: { V1: 0.32, V2: 0.28 } },
    'long-qt': { axis: [30, 75], qtExtra: [0.14, 0.2], rate: [56, 72] },
    hocm: { axis: [0, 50], qrs: 'lvh', qAdd: { I: 0.6, aVL: 0.65, V5: 0.7, V6: 0.65, II: 0.4, III: 0.45, aVF: 0.45 } },
    arvd: { axis: [40, 85], tAdd: { V1: -0.3, V2: -0.42, V3: -0.32 }, epsilon: { V1: 0.12, V2: 0.1 } },
    axis: { axis: [20, 80] }
  };

  // ---------- One beat ----------
  // Vector components: { d: direction, t: center (s), s: width, a: size, k: 'g' bump or 'pl' plateau }.
  function C(d, t, s, a) { return { d: unit(d), t: t, s: s, a: a, k: 'g' }; }

  // QRS shapes. Each returns { comps, j } with j the J point (end of QRS), relative to tq.
  var QRS = {
    normal: function () {
      return { comps: [
        C([-0.7, 0.3, 0.65], -0.028, 0.008, 0.25), // septum: left to right, forward
        C([0.5, 0.7, 0.25], -0.006, 0.0085, 1.05), // apex
        C([0.6, 0.3, -0.75], 0.014, 0.009, 0.9), // lateral and back
        C([-0.3, -0.5, -0.4], 0.034, 0.008, 0.18) // base, last to depolarize
      ], j: 0.046, t: [0.6, 0.7, 0.25] };
    },
    lvh: function () {
      var n = QRS.normal();
      n.comps[1].a *= 1.8; n.comps[2].a *= 1.9;
      n.t = [-0.5, -0.1, 0.6]; // lateral strain: T opposite the tall R
      return n;
    },
    rbbb: function () {
      var n = QRS.normal();
      n.comps[3].a = 0.05;
      // Late, slow spread through the right ventricle: rightward and forward.
      n.comps.push(C([-0.55, 0.1, 0.8], 0.068, 0.02, 0.78));
      n.j = 0.11;
      n.t = [0.6, 0.6, -0.5]; // T opposite the late R' in V1 to V3
      return n;
    },
    lbbb: function () {
      return { comps: [
        C([0.7, 0.1, -0.4], -0.03, 0.01, 0.18), // septum backward: right to left, no septal q in I or V6
        C([0.75, 0.35, -0.45], 0.0, 0.02, 1.0),
        C([0.85, 0.15, -0.5], 0.05, 0.02, 1.0)
      ], j: 0.092, t: [-0.55, -0.25, 0.75], discord: 0.12 };
    },
    wpw: function () {
      var n = QRS.normal();
      n.comps.push(C([0.55, 0.6, 0.1], -0.042, 0.02, 0.45)); // delta wave
      return n;
    }
  };

  // Turn the QRS (and T, which follows it) in the frontal plane so its axis is `target`.
  function rotate(q, target) {
    var x = 0, y = 0;
    q.comps.forEach(function (c) { if (c.a > 0.5) { x += c.d[0] * c.a; y += c.d[1] * c.a; } });
    var by = rad(target) - Math.atan2(y, x), cs = Math.cos(by), sn = Math.sin(by);
    function turn(d) { return [d[0] * cs - d[1] * sn, d[0] * sn + d[1] * cs, d[2]]; }
    q.comps.forEach(function (c) { c.d = turn(c.d); });
    q.t = turn(unit(q.t));
  }

  // ---------- Build ----------
  function generate(id, seed, opts) {
    opts = opts || {};
    var P = PATTERNS[id];
    if (!P) throw new Error('No 12-lead pattern ' + id);
    var rng = root.ECG.makeRng(seed);
    var rate = P.rate ? U(rng, P.rate[0], P.rate[1]) : U(rng, 60, 92), rr = 60 / rate;
    var axis = opts.axis != null ? opts.axis : Math.round(U(rng, P.axis[0], P.axis[1]));
    var pr = P.qrs === 'wpw' ? U(rng, 0.09, 0.11) : U(rng, 0.13, 0.18);
    var qtExtra = P.qtExtra ? U(rng, P.qtExtra[0], P.qtExtra[1]) : 0;

    var q = QRS[P.qrs || 'normal']();
    if (P.qrs === 'rbbb' && id === 'bifasc') q.t = [0.7, 0.3, -0.5];
    rotate(q, axis);
    var j = q.j, tGap = tOffset(rr) - 0.03 + qtExtra + (q.discord ? 0.03 : 0) + (P.qrs === 'rbbb' ? 0.03 : 0);
    var tWidth = qtExtra ? 0.065 : 0.05;
    // QRS center from P center so the PR interval (P onset to QRS onset) comes out right.
    var lead = P.qrs === 'wpw' ? 0.04 : -0.005;

    // Per-lead projections of each vector component, done once.
    var proto = q.comps.concat([
      { d: unit([0.5, 0.85, 0.15]), t: 0, s: 0.022, a: 0.16, k: 'g', p: true }, // P wave, placed per beat
      { d: q.t, t: tGap, s: tWidth, a: q.discord ? 0.36 : 0.3, k: 'g' }
    ]);
    if (q.discord) proto.push({ d: q.t, t: j, s: 0, a: q.discord, k: 'pl', end: tGap + 0.05 });
    var proj = {};
    LEAD_IDS.forEach(function (L) { proj[L] = proto.map(function (c) { return dot(c.d, LEADS[L]); }); });

    var beats = [];
    for (var tp = -U(rng, 0, rr) - 0.3; tp < SECONDS + 0.8; tp += rr * (1 + 0.01 * (rng() * 2 - 1))) beats.push(tp);

    var n = SECONDS * HZ, leads = {};
    LEAD_IDS.forEach(function (L) {
      var st = (P.st && P.st[L]) || 0, tAdd = (P.tAdd && P.tAdd[L]) || 0, rAdd = (P.rAdd && P.rAdd[L]) || 0;
      var qAdd = (P.qAdd && P.qAdd[L]) || 0, prd = (P.pr && P.pr[L]) || 0;
      var bru = (P.brugada && P.brugada[L]) || 0, eps = (P.epsilon && P.epsilon[L]) || 0;
      var hyper = st > 0 ? st * (P.hyper || 0) : 0;
      var w = { a: U(rng, 0.01, 0.03), f: U(rng, 0.12, 0.3), p: U(rng, 0, 6.28) };
      var out = new Array(n + 1), pj = proj[L];
      var bi = 0;
      for (var i = 0; i <= n; i++) {
        var t = i / HZ;
        var v = w.a * Math.sin(2 * Math.PI * w.f * t + w.p) + 0.006 * (rng() * 2 - 1);
        while (bi < beats.length - 1 && beats[bi + 1] + pr + lead < t - 0.2) bi++;
        for (var b = Math.max(0, bi - 1); b < beats.length && b <= bi + 2; b++) {
          var tpb = beats[b], tq = tpb + pr + lead, x = t - tq;
          if (x < -0.6 || x > 1.0) continue;
          for (var c = 0; c < proto.length; c++) {
            var cp = proto[c];
            if (cp.k === 'pl') {
              v += cp.a * pj[c] * sig((x - cp.t) / 0.006) * (1 - sig((x - cp.end) / 0.03));
            } else if (cp.p) {
              v += gauss(t, tpb, cp.s, cp.a * pj[c]);
            } else {
              v += gauss(x, cp.t, cp.s, cp.a * pj[c]);
            }
          }
          if (st) v += st * sig((x - j) / 0.005) * (1 - sig((x - (tGap + 0.06)) / 0.03));
          if (hyper) v += gauss(x, tGap, tWidth * 1.1, hyper);
          if (tAdd) v += gauss(x, tGap, tWidth, tAdd);
          if (rAdd) v += gauss(x, 0.004, 0.016, rAdd);
          if (qAdd) v += gauss(x, -0.034, 0.0075, -qAdd);
          if (prd) { var xp = t - tpb; v += prd * sig((xp - 0.03) / 0.006) * (1 - sig((x + 0.045) / 0.004)); }
          // Brugada: coved ST rising from the J point and sloping down into an inverted T.
          if (bru) v += bru * sig((x - j + 0.01) / 0.004) * Math.exp(-Math.max(0, x - j) / 0.1) + gauss(x, tGap, 0.055, -0.8 * bru);
          if (eps) v += gauss(x, j + 0.018, 0.004, eps);
        }
        out[i] = v;
      }
      leads[L] = out;
    });
    // QT: QRS onset (45 ms before tq) to the end of the T wave (about 2 widths past its peak).
    var qt = 0.045 + tGap + 2 * tWidth;
    return { id: id, hz: HZ, seconds: SECONDS, leads: leads, rate: rate, axis: axis, pr: pr, qrs: j + 0.045, qt: qt, qtc: qt / Math.sqrt(rr) };
  }

  // ---------- Drawing ----------
  var ROWS = [['I', 'aVR', 'V1', 'V4'], ['II', 'aVL', 'V2', 'V5'], ['III', 'aVF', 'V3', 'V6']];
  var EXTRA = ['V4R', 'V7', 'V8', 'V9'];
  var uid = 0;
  var LEFT = 7, ROW_H = 30, COL_S = 2.5;

  function paper(id, w, h) {
    return '<defs>' +
      '<pattern id="ts' + id + '" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0V1H0" class="ecg-minor"/></pattern>' +
      '<pattern id="tl' + id + '" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="url(#ts' + id + ')"/><path d="M5 0V5H0" class="ecg-major"/></pattern>' +
      '</defs><rect width="' + w + '" height="' + h + '" class="ecg-bg"/><rect width="' + w + '" height="' + h + '" fill="url(#tl' + id + ')"/>';
  }

  function trace(samples, hz, t0, t1, x0, yTop, h) {
    var mid = yTop + h * 0.55, pts = [];
    var i0 = Math.round(t0 * hz), i1 = Math.min(Math.round(t1 * hz), samples.length - 1);
    for (var i = i0; i <= i1; i++) {
      var x = x0 + (i / hz - t0) * MM_PER_S;
      var y = Math.max(yTop + 0.3, Math.min(yTop + h - 0.3, mid - samples[i] * MM_PER_MV));
      pts.push((i === i0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2));
    }
    return pts.join('');
  }

  function calib(yTop, h) {
    var mid = yTop + h * 0.55;
    return '<path d="M0.8 ' + mid + 'h1v-10h5v10h1" class="ecg-trace tw-cal"/>';
  }

  // One sheet: rows of leads, each column a 2.5 s slice, then a lead II rhythm strip.
  function sheet(g, rows, rhythm, hl, cls, aria) {
    var id = ++uid, cols = rows[0].length;
    var w = LEFT + cols * COL_S * MM_PER_S, h = (rows.length + 1) * ROW_H, body = '', cells = '';
    rows.forEach(function (row, r) {
      var y = r * ROW_H;
      body += calib(y, ROW_H);
      row.forEach(function (L, c) {
        var x = LEFT + c * COL_S * MM_PER_S, t0 = c * COL_S;
        var k = hl[L] ? ' ' + hl[L] : '';
        cells += '<rect class="tw-cell' + k + '" data-lead="' + L + '" x="' + x + '" y="' + (y + 0.5) + '" width="' + COL_S * MM_PER_S + '" height="' + (ROW_H - 1) + '" rx="1"/>';
        body += '<path d="' + trace(g.leads[L], g.hz, t0, t0 + COL_S, x, y, ROW_H) + '" class="ecg-trace"/>';
        body += '<text x="' + (x + 1.2) + '" y="' + (y + 5) + '" class="tw-lab">' + L + '</text>';
        if (c) body += '<path d="M' + x + ' ' + (y + ROW_H * 0.55 - 3) + 'v6" class="tw-sep"/>';
      });
    });
    var ry = rows.length * ROW_H;
    body += calib(ry, ROW_H) + '<path d="' + trace(g.leads.II, g.hz, 0, rhythm, LEFT, ry, ROW_H) + '" class="ecg-trace"/>' +
      '<text x="' + (LEFT + 1.2) + '" y="' + (ry + 5) + '" class="tw-lab">II</text>';
    return '<svg class="tw-svg ' + cls + '" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + aria + '">' +
      paper(id, w, h) + '<g class="tw-cells">' + cells + '</g>' + body + '</svg>';
  }

  // Wide screens get the standard 3 x 4 printout. Phones get the same leads in two
  // columns (limb leads, then chest leads) so every lead fits without scrolling.
  // opts: { extra: show V4R and V7–V9, hl: { lead: 'face' | 'recip' } }
  function render(g, opts) {
    opts = opts || {};
    var hl = opts.hl || {}, aria = '12-lead ECG' + (opts.extra ? ' with V4R and V7 to V9' : '');
    var wide = ROWS.concat(opts.extra ? [EXTRA] : []);
    var narrow = [['I', 'V1'], ['II', 'V2'], ['III', 'V3'], ['aVR', 'V4'], ['aVL', 'V5'], ['aVF', 'V6']].concat(opts.extra ? [['V4R', 'V8'], ['V7', 'V9']] : []);
    return '<div class="tw-wrap">' + sheet(g, wide, SECONDS, hl, 'tw-wide', aria) + sheet(g, narrow, 2 * COL_S, hl, 'tw-narrow', aria) +
      '<div class="ecg-cap"><span>12-lead · drawn' + (opts.extra ? ' · with V4R, V7–V9' : '') + '</span><span>25 mm/s · 10 mm/mV</span></div></div>';
  }

  root.TWELVE = {
    ids: Object.keys(PATTERNS),
    leads: STANDARD,
    extra: EXTRA,
    generate: generate,
    render: render
  };
})(typeof window !== 'undefined' ? window : globalThis);
