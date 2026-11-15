/*
 * Break it down: measures one strip (drawn or real) and works out the right
 * answer at each step of the rhythm breakdown (rate, rhythm, QRS, P waves, PR)
 * for that strip, from window.CARDIO_BREAKDOWN.fits.
 *
 * Drawn strips are measured from the events js/ecg.js placed on them (exact
 * QRS and P times, PR intervals). Real strips are measured from the MIT-BIH
 * beat annotations, which give QRS times and beat types but not P waves.
 */
(function (root) {
  'use strict';

  var BD = root.CARDIO_BREAKDOWN;
  var SECONDS = 6;
  var QRS_KINDS = /^(N|W|V|VT)$/;
  // MIT-BIH beat types with a wide QRS: PVC, ventricular escape, paced, bundle branch block, fusion.
  var WIDE_BEATS = /^[VE\/RLFf]$/;
  // Real strips used here must show only these beat types (so nothing on the strip changes the answers),
  // and at least one of the beats in need[] when given.
  var REAL_OK = {
    nsr: { only: 'N' }, 'sinus-tach': { only: 'N' }, 'sinus-arrest': { only: 'N' }, wpw: { only: 'N' },
    afib: { only: 'N' }, flutter: { only: 'N' }, svt: { only: 'AJSN' },
    pac: { only: 'NA', need: 'A' }, pvc: { only: 'NV', need: 'V' },
    'junctional-escape': { only: 'j' }, 'accel-junctional': { only: 'J' },
    idioventricular: { only: 'E' }, vt: { only: 'V' }, paced: { only: '/' }, 'avb-2-2': { only: 'NR' }
  };
  var REGULAR = 0.12; // R-R spread under 3 small boxes counts as regular

  function round2(x) { return Math.round(x * 100) / 100; }
  function boxes(s) { return Math.round(s / 0.04); }

  function summarize(qrs, ps, prs) {
    var rr = [];
    for (var i = 1; i < qrs.length; i++) rr.push(qrs[i].t - qrs[i - 1].t);
    var spread = rr.length > 1 ? Math.max.apply(null, rr) - Math.min.apply(null, rr) : 0;
    var mean = rr.length ? rr.reduce(function (a, b) { return a + b; }, 0) / rr.length : 0;
    var regular = rr.length >= 1 && spread < REGULAR;
    return {
      qrs: qrs, count: qrs.length, wide: qrs.filter(function (q) { return q.wide; }).length,
      rr: rr, spread: spread, meanRR: mean, regular: regular,
      // Regular: 60 ÷ R-R (the same as 1,500 ÷ small boxes). Irregular: the six-second count.
      rate: regular && rr.length ? 60 / mean : qrs.length * 10,
      rateBy: regular && rr.length ? 'rr' : 'six',
      ps: ps, prs: prs
    };
  }

  // Facts for a drawn strip.
  function measureDrawn(id, seed) {
    var g = root.ECG.generate(id, seed), spec = g.spec;
    var ev = (spec.events || []).slice().sort(function (a, b) { return a.t - b.t; });
    var qrs = ev.filter(function (e) { return QRS_KINDS.test(e.k) && e.t >= 0 && e.t < SECONDS; })
      .map(function (e) { return { t: e.t, wide: e.k !== 'N' || !!e.delta, delta: !!e.delta }; });
    var ps = ev.filter(function (e) { return e.k === 'P' && e.t >= 0 && e.t < SECONDS; }).map(function (e) { return e.t; });
    var allP = ev.filter(function (e) { return e.k === 'P'; });
    var allQ = ev.filter(function (e) { return QRS_KINDS.test(e.k); });
    // PR for each conducted QRS: the P wave just before it, with no other QRS between.
    // js/ecg.js puts the QRS at P + PR − 0.02, so PR = QRS time − P time + 0.02.
    var prs = [];
    qrs.forEach(function (q) {
      var prevQ = allQ.filter(function (e) { return e.t < q.t - 0.01; }).pop();
      var p = allP.filter(function (e) { return e.t < q.t && (!prevQ || e.t > prevQ.t); }).pop();
      if (p && q.t - p.t < 0.5) prs.push(round2(q.t - p.t + 0.02));
    });
    var f = summarize(qrs, ps, prs);
    f.kind = 'drawn';
    f.pAfter = allP.some(function (p) { return allQ.some(function (q) { return p.t > q.t && p.t - q.t < 0.15; }); });
    f.bg = spec.bg ? spec.bg.k : null;
    return f;
  }

  // Facts for a real MIT-BIH strip (beats are [sample, type]).
  function measureReal(entry, hz) {
    var qrs = entry.beats.map(function (b) { return { t: b[0] / hz, wide: WIDE_BEATS.test(b[1]), type: b[1] }; })
      .filter(function (q) { return q.t >= 0 && q.t < SECONDS; });
    var f = summarize(qrs, null, null);
    f.kind = 'real';
    return f;
  }

  // Every answer on the strip fits the rhythm's textbook picture (so the steps lead to it).
  function consistent(id, f) {
    var last = narrowing([id], answers(id, f));
    return last[last.length - 1].length === 1;
  }

  // Does this drawn strip show what makes the rhythm (a PVC that landed inside the 6 seconds, say)?
  function drawnUsable(id, f) {
    if (id === 'pvc' && !f.wide) return false;
    return consistent(id, f);
  }

  // Can this real strip be broken down without surprises? Only the beat types the rhythm
  // should have, and measurements inside its textbook picture (no VT at 80).
  function realUsable(entry, hz) {
    var rule = REAL_OK[entry.id];
    if (!rule || (entry.also && entry.also.length)) return false;
    var types = entry.beats.map(function (b) { return b[1]; });
    if (!types.length || !types.every(function (t) { return rule.only.indexOf(t) !== -1; })) return false;
    if (rule.need && !types.some(function (t) { return rule.need.indexOf(t) !== -1; })) return false;
    return consistent(entry.id, measureReal(entry, hz));
  }

  function rateCats(rate) {
    var out = [rate < 60 ? 'slow' : rate <= 100 ? 'normal' : 'fast'];
    // Right at a line (a six-second count is only good to about ±10), either side counts.
    if (Math.abs(rate - 60) <= 4) out = ['slow', 'normal'];
    if (Math.abs(rate - 100) <= 4) out = ['normal', 'fast'];
    return out;
  }

  // The answers that count as right on this strip, step by step.
  function answers(id, f) {
    var fit = BD.fits[id], a = {};
    Object.keys(fit).forEach(function (k) { a[k] = fit[k].slice(); });
    var drawn = f.kind === 'drawn';
    // Rate: what this strip measures.
    if (id === 'vf' || id === 'asystole') a.rate = ['none'];
    else if (id === 'torsades') a.rate = ['fast'];
    else a.rate = rateCats(f.rate);
    // Rhythm: flutter and type II block can be regular (fixed conduction) or not.
    if (id === 'flutter') a.rhythm = f.regular ? ['regular'] : ['pattern', 'irreg'];
    if (id === 'avb-2-2') a.rhythm = f.regular ? ['regular'] : ['pattern'];
    // QRS: blocks can show a narrow or a wide QRS; this strip has one or the other.
    if (id === 'avb-2-2' || id === 'avb-3') a.qrs = f.wide ? ['wide'] : ['narrow'];
    // P waves and PR on drawn strips, where the P waves are known.
    if (drawn && (id === 'junctional-escape' || id === 'accel-junctional')) {
      var before = f.prs.length > 0;
      a.p = before || f.pAfter ? ['inverted'] : ['inverted', 'none'];
      a.pr = before ? ['short'] : ['none'];
    }
    if (drawn && id === 'asystole') a.p = f.ps.length ? ['extra'] : ['none'];
    if (drawn && id === 'paced') { a.p = ['none']; a.pr = ['none']; }
    if (drawn && id === 'vf') a.p = ['none', 'fib'];
    return a;
  }

  function opt(stepId, optId) {
    var st = BD.steps.filter(function (s) { return s.id === stepId; })[0];
    return st && st.options.filter(function (o) { return o.id === optId; })[0];
  }

  function fmt(s) { return s.toFixed(2) + ' s'; }

  // One plain sentence on what this strip shows at a step, without naming the rhythm.
  function describe(stepId, id, f) {
    if (stepId === 'rate') {
      if (id === 'vf' || id === 'asystole') return 'There are no QRS complexes to count.';
      if (id === 'torsades') return BD.notes.torsades;
      var six = f.count + ' QRS complex' + (f.count === 1 ? '' : 'es') + ' in 6 seconds × 10 = about ' + f.count * 10 + '/min.';
      if (f.rateBy === 'rr') {
        var b = boxes(f.meanRR);
        return 'Regular, so use the R-R: about ' + fmt(f.meanRR) + ' (' + b + ' small boxes), and 1,500 ÷ ' + b + ' ≈ ' + Math.round(1500 / b) + '/min. Six-second count: ' + six;
      }
      return 'Irregular, so use the six-second count: ' + six;
    }
    if (stepId === 'rhythm') {
      if (f.count < 2) return id === 'vf' || id === 'asystole' || id === 'torsades' ? 'There are no separate QRS complexes to march out.' : 'Only one QRS on the strip: too slow to judge, so look at a longer strip.';
      var lo = Math.min.apply(null, f.rr), hi = Math.max.apply(null, f.rr);
      return f.regular
        ? 'Every R-R is within ' + boxes(f.spread || 0.001) + ' small box' + (boxes(f.spread) === 1 ? '' : 'es') + ' of the others (' + fmt(lo) + ' to ' + fmt(hi) + ').'
        : 'The R-R intervals run from ' + fmt(lo) + ' to ' + fmt(hi) + ' (' + boxes(lo) + ' to ' + boxes(hi) + ' small boxes).';
    }
    if (stepId === 'qrs') {
      if (!f.count) return id === 'torsades' ? 'Wide complexes that twist around the baseline, growing and shrinking.' : 'There are no QRS complexes, only a ' + (id === 'vf' ? 'chaotic, quivering' : 'flat') + ' line.';
      if (id === 'wpw') return BD.notes.wpw;
      if (!f.wide) return 'All ' + f.count + ' QRS complexes are narrow.';
      if (f.wide === f.count) return 'All ' + f.count + ' QRS complexes are wide.' + (id === 'paced' ? ' ' + BD.notes.paced : '');
      return f.wide + ' of the ' + f.count + ' QRS complexes are wide; the rest are narrow.';
    }
    if (stepId === 'p') {
      if (id === 'svt') return BD.notes.svt;
      if (f.bg === 'flutter' || (f.kind === 'real' && id === 'flutter')) return 'The baseline is a row of sawtooth flutter waves.';
      if (f.bg === 'fib' || (f.kind === 'real' && id === 'afib')) return 'The baseline quivers, with no clear P waves.';
      if (f.kind === 'real' || !f.ps) return '';
      if (!f.ps.length) return 'There are no P waves on this strip.';
      if (f.ps.length > f.count + 1) return 'There are ' + f.ps.length + ' P waves but only ' + f.count + ' QRS complex' + (f.count === 1 ? '' : 'es') + '.';
      return '';
    }
    if (stepId === 'pr') {
      if (id === 'avb-3') return 'The PR changes every beat because the P waves and QRS complexes are not connected: the P waves march through at their own rate.';
      if (f.kind === 'real' || !f.prs || !f.prs.length) return f.kind === 'real' ? '' : 'No P wave sits in front of a QRS to measure from.';
      var min = Math.min.apply(null, f.prs), max = Math.max.apply(null, f.prs);
      if (max - min <= 0.03) {
        var avg = f.prs.reduce(function (s, x) { return s + x; }, 0) / f.prs.length;
        return 'PR about ' + fmt(avg) + ' (' + boxes(avg) + ' small boxes) on every conducted beat' + (f.ps.length > f.count + 1 ? ', with some P waves not followed by a QRS.' : '.');
      }
      return 'PR intervals on this strip: ' + f.prs.map(function (x) { return x.toFixed(2); }).join(', ') + ' s.';
    }
    return '';
  }

  // Rhythms still possible after each answered step, for the "how it narrowed" summary.
  function narrowing(ids, a) {
    var out = [], left = ids.slice();
    BD.steps.forEach(function (st) {
      left = left.filter(function (id) {
        var fit = BD.fits[id][st.id];
        return a[st.id].some(function (x) { return fit.indexOf(x) !== -1; });
      });
      out.push(left.slice());
    });
    return out;
  }

  root.BREAKDOWN = {
    measureDrawn: measureDrawn, measureReal: measureReal, realUsable: realUsable, drawnUsable: drawnUsable,
    answers: answers, describe: describe, narrowing: narrowing, option: opt, rateCats: rateCats
  };
})(typeof window !== 'undefined' ? window : globalThis);
