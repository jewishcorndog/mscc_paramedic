/*
 * ECG strip generator. Builds a 6-second lead II tracing for a named rhythm
 * and draws it on standard ECG paper (25 mm/s, 10 mm/mV) as inline SVG.
 *
 * Every strip is generated fresh from a few random parameters (rate, PR,
 * where the early beat lands...), so the same rhythm never looks exactly the
 * same twice. Pure functions, no DOM, so it can be tested in Node.
 *
 * The waveform is a sum of bumps: each beat is described by events (P, QRS,
 * pacer spike), and continuous rhythms (flutter, fibrillation, VF, torsades)
 * add a background signal.
 */
(function (root) {
  'use strict';

  var SECONDS = 6;
  var HZ = 500;
  var MM_PER_S = 25;
  var MM_PER_MV = 10;

  // Seeded random numbers (mulberry32) so tests can reproduce a strip.
  function makeRng(seed) {
    if (seed == null) return Math.random;
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function gauss(t, mu, sigma, amp) {
    var x = (t - mu) / sigma;
    if (x > 6 || x < -6) return 0;
    return amp * Math.exp(-0.5 * x * x);
  }

  // QT shortens as the heart speeds up (roughly Bazett).
  function tOffset(rr) {
    var qt = 0.4 * Math.sqrt(Math.max(0.3, Math.min(rr, 1.8)));
    return Math.max(0.16, qt - 0.1);
  }

  // ---------- Beat shapes ----------
  // Each returns the voltage contribution at time t (seconds) in mV.
  var SHAPES = {
    // Sinus / atrial P wave. amp < 0 gives an inverted (retrograde) P.
    P: function (e, t) { return gauss(t, e.t, e.w || 0.022, e.amp); },
    // Narrow (supraventricular) QRS with its T wave.
    N: function (e, t) {
      var r = e.amp || 1.1;
      var v = gauss(t, e.t - 0.024, 0.008, -0.08 * r) +
        gauss(t, e.t, 0.0105, r) +
        gauss(t, e.t + 0.026, 0.010, -0.24 * r);
      if (e.delta) v += gauss(t, e.t - 0.035, 0.018, 0.3);
      if (e.tAmp !== 0) v += gauss(t, e.t + tOffset(e.rr || 0.8), 0.05, e.tAmp || 0.28);
      return v;
    },
    // Wide QRS from a supraventricular beat with a bundle branch block.
    W: function (e, t) {
      var v = gauss(t, e.t - 0.02, 0.016, 0.9) + gauss(t, e.t + 0.035, 0.02, 0.55) +
        gauss(t, e.t + 0.07, 0.016, -0.25);
      if (e.tAmp !== 0) v += gauss(t, e.t + tOffset(e.rr || 0.8) + 0.04, 0.06, -0.25);
      return v;
    },
    // Ventricular beat: wide, bizarre, T wave opposite the QRS.
    V: function (e, t) {
      var s = e.sign || 1, f = e.form || 0, v;
      if (f === 1) {
        v = gauss(t, e.t, 0.03, -1.1 * s) + gauss(t, e.t + 0.07, 0.025, 0.35 * s);
      } else {
        v = gauss(t, e.t, 0.028, 1.25 * s) + gauss(t, e.t + 0.075, 0.03, -0.55 * s);
      }
      if (e.tAmp !== 0) v += gauss(t, e.t + tOffset(e.rr || 1) + 0.08, 0.075, -0.42 * s * (f === 1 ? -0.8 : 1));
      return v;
    },
    // VT complexes are broad and run into each other.
    VT: function (e, t) {
      return gauss(t, e.t, 0.04, 1.35 * (e.amp || 1)) + gauss(t, e.t + 0.13, 0.045, -0.8 * (e.amp || 1));
    },
    // Pacemaker spike: tall and very narrow.
    S: function (e, t) { return gauss(t, e.t, 0.0016, e.amp || 1.6); }
  };

  // ---------- Background signals ----------
  var BACKGROUNDS = {
    flutter: function (b, t) {
      var ph = ((t - b.phase) / b.period) % 1;
      if (ph < 0) ph += 1;
      // Sawtooth: slow downslope, quick return (negative F waves in lead II).
      return ph < 0.72 ? 0.12 - 0.36 * (ph / 0.72) : -0.24 + 0.36 * ((ph - 0.72) / 0.28);
    },
    fib: function (b, t) {
      var v = 0;
      for (var i = 0; i < b.waves.length; i++) {
        var w = b.waves[i];
        v += w.a * Math.sin(2 * Math.PI * w.f * t + w.p);
      }
      return v;
    },
    vf: function (b, t) {
      var v = 0;
      for (var i = 0; i < b.waves.length; i++) {
        var w = b.waves[i];
        v += w.a * Math.sin(2 * Math.PI * w.f * t + w.p);
      }
      var env = b.amp * (0.65 + 0.35 * Math.sin(2 * Math.PI * b.envF * t + b.envP));
      return v * env;
    },
    torsades: function (b, t) {
      var env = 0.25 + 1.15 * Math.abs(Math.sin(Math.PI * (t + b.envP) / b.twist));
      return env * Math.sin(2 * Math.PI * b.f * t + b.p) + 0.12 * Math.sin(4 * Math.PI * b.f * t);
    }
  };

  // ---------- Rhythm builders ----------
  function U(rng, a, b) { return a + (b - a) * rng(); }
  function choice(rng, list) { return list[Math.floor(rng() * list.length)]; }

  // Conducted sinus beat: P, then QRS after the PR interval.
  // PR interval is measured from P onset to QRS onset.
  function conducted(ev, tp, pr, rr, opts) {
    opts = opts || {};
    ev.push({ k: 'P', t: tp, amp: opts.pAmp == null ? 0.16 : opts.pAmp });
    var tq = tp - 0.05 + pr + 0.03;
    ev.push({ k: opts.wide ? 'W' : 'N', t: tq, rr: rr, delta: opts.delta, amp: opts.rAmp });
    return tq;
  }

  function regularTimes(rng, rate, jitter) {
    var rr = 60 / rate, out = [];
    var t = -U(rng, 0, rr) - 0.5;
    while (t < SECONDS + 0.6) {
      out.push(t);
      t += rr * (1 + (jitter || 0.012) * (rng() * 2 - 1));
    }
    return out;
  }

  function sinusBase(rng, rate, pr, opts) {
    var ev = [], rr = 60 / rate;
    regularTimes(rng, rate).forEach(function (tp) { conducted(ev, tp, pr, rr, opts); });
    return { events: ev, rate: rate };
  }

  function fibWaves(rng, n, amp, fLo, fHi) {
    var w = [];
    for (var i = 0; i < n; i++) w.push({ a: amp * U(rng, 0.5, 1), f: U(rng, fLo, fHi), p: U(rng, 0, 6.28) });
    return w;
  }

  // Ectopic beats inserted into an otherwise sinus rhythm.
  function sinusWithEctopy(rng, rate, kind, pattern) {
    var rr = 60 / rate, pr = U(rng, 0.14, 0.18), ev = [];
    var t = -U(rng, 0, rr) - 0.4, i = 0;
    var early = {};
    if (pattern === 'bigeminy') { for (var b = 1; b < 20; b += 2) early[b] = true; }
    else if (pattern === 'trigeminy') { for (var c = 2; c < 30; c += 3) early[c] = true; }
    else {
      var first = 2 + Math.floor(rng() * 3);
      early[first] = true;
      if (rng() < 0.6) early[first + 3 + Math.floor(rng() * 2)] = true;
    }
    var sign = rng() < 0.5 ? 1 : -1, form = rng() < 0.5 ? 0 : 1;
    while (t < SECONDS + 0.6) {
      if (early[i] && t > 0.6) {
        var te = t - rr + rr * (kind === 'pvc' ? U(rng, 0.58, 0.68) : U(rng, 0.5, 0.6)); // premature by about a third
        if (kind === 'pac') {
          conducted(ev, te, U(rng, 0.12, 0.16), rr, { pAmp: choice(rng, [0.07, -0.07, 0.24]) });
          t = te + rr; // resets the sinus node: noncompensatory pause
        } else if (kind === 'pjc') {
          var where = choice(rng, ['before', 'none']);
          if (where === 'before') ev.push({ k: 'P', t: te - 0.07, amp: -0.11 });
          ev.push({ k: 'N', t: te, rr: rr });
          t = te + rr;
        } else {
          ev.push({ k: 'V', t: te, rr: rr, sign: sign, form: form });
          t += rr; // sinus keeps its schedule: full compensatory pause
        }
      } else {
        conducted(ev, t, pr, rr);
        t += rr * (1 + 0.01 * (rng() * 2 - 1));
      }
      i++;
    }
    return { events: ev, rate: rate };
  }

  function junctional(rng, rate) {
    var rr = 60 / rate, ev = [];
    var where = choice(rng, ['before', 'none', 'after']);
    regularTimes(rng, rate, 0.01).forEach(function (tq) {
      if (where === 'before') ev.push({ k: 'P', t: tq - 0.075, amp: -0.11 });
      if (where === 'after') ev.push({ k: 'P', t: tq + 0.1, amp: -0.1 });
      ev.push({ k: 'N', t: tq, rr: rr });
    });
    return { events: ev, rate: rate };
  }

  var RHYTHMS = {
    nsr: function (rng) { return sinusBase(rng, U(rng, 62, 95), U(rng, 0.14, 0.19)); },
    'sinus-brady': function (rng) { return sinusBase(rng, U(rng, 38, 56), U(rng, 0.14, 0.19)); },
    'sinus-tach': function (rng) { return sinusBase(rng, U(rng, 108, 145), U(rng, 0.12, 0.15)); },
    'sinus-arrhythmia': function (rng) {
      var base = U(rng, 62, 82), pr = U(rng, 0.14, 0.18), period = U(rng, 3.2, 4.5), ph = U(rng, 0, 6.28), ev = [];
      var t = -0.8;
      while (t < SECONDS + 0.6) {
        var rr = (60 / base) * (1 + 0.24 * Math.sin(2 * Math.PI * t / period + ph));
        conducted(ev, t, pr, rr);
        t += rr;
      }
      return { events: ev, rate: base };
    },
    'sinus-arrest': function (rng) {
      var rate = U(rng, 64, 82), rr = 60 / rate, pr = U(rng, 0.14, 0.18), ev = [];
      var t = U(rng, 0.1, 0.5), pauseAt = 2 + Math.floor(rng() * 2), i = 0;
      while (t < SECONDS + 0.6) {
        conducted(ev, t, pr, rr);
        t += i === pauseAt ? rr * U(rng, 2.4, 3.1) : rr;
        i++;
      }
      return { events: ev, rate: rate };
    },
    pac: function (rng) { return sinusWithEctopy(rng, U(rng, 68, 88), 'pac'); },
    wap: function (rng) {
      var rate = U(rng, 62, 88), ev = [], t = -0.6, i = U(rng, 0, 6);
      var amps = [0.16, 0.12, 0.07, 0.03, -0.05, -0.09, -0.05, 0.03, 0.08, 0.13];
      while (t < SECONDS + 0.6) {
        var a = amps[Math.floor(i) % amps.length];
        var rr = (60 / rate) * (1 + 0.06 * (rng() * 2 - 1));
        conducted(ev, t, a < 0 ? 0.11 : U(rng, 0.13, 0.19), rr, { pAmp: a });
        t += rr; i += 1;
      }
      return { events: ev, rate: rate };
    },
    svt: function (rng) {
      var rate = U(rng, 165, 220), rr = 60 / rate, ev = [];
      regularTimes(rng, rate, 0.003).forEach(function (tq) { ev.push({ k: 'N', t: tq, rr: rr, tAmp: 0.22 }); });
      return { events: ev, rate: rate };
    },
    flutter: function (rng) {
      var period = 60 / U(rng, 270, 310), phase = U(rng, 0, period), ev = [];
      var mode = choice(rng, [2, 4, 4, 3, 'var']);
      var t = phase - period * 6, n = 0;
      while (t < SECONDS + 0.6) {
        var ratio = mode === 'var' ? choice(rng, [2, 3, 4]) : mode;
        var tq = t + 0.24;
        ev.push({ k: 'N', t: tq, rr: period * ratio, tAmp: 0.12 });
        t += period * ratio; n++;
      }
      return { events: ev, bg: { k: 'flutter', period: period, phase: phase }, rate: 60 / period };
    },
    afib: function (rng) {
      var ev = [], t = -U(rng, 0, 0.6), lo = U(rng, 0.36, 0.5), hi = U(rng, 0.8, 1.05);
      while (t < SECONDS + 0.6) {
        var rr = U(rng, lo, hi);
        ev.push({ k: 'N', t: t, rr: rr, tAmp: 0.2 });
        t += rr;
      }
      return { events: ev, bg: { k: 'fib', waves: fibWaves(rng, 5, 0.035, 5, 9) } };
    },
    pjc: function (rng) { return sinusWithEctopy(rng, U(rng, 66, 84), 'pjc'); },
    'junctional-escape': function (rng) { return junctional(rng, U(rng, 41, 58)); },
    'accel-junctional': function (rng) { return junctional(rng, U(rng, 64, 96)); },
    idioventricular: function (rng) {
      var rate = U(rng, 24, 38), rr = 60 / rate, ev = [], sign = rng() < 0.5 ? 1 : -1;
      regularTimes(rng, rate, 0.02).forEach(function (tq) { ev.push({ k: 'V', t: tq, rr: rr, sign: sign }); });
      return { events: ev, rate: rate };
    },
    pvc: function (rng) {
      return sinusWithEctopy(rng, U(rng, 68, 86), 'pvc', choice(rng, ['single', 'single', 'bigeminy', 'trigeminy']));
    },
    vt: function (rng) {
      var rate = U(rng, 150, 210), ev = [];
      regularTimes(rng, rate, 0.006).forEach(function (tq) { ev.push({ k: 'VT', t: tq }); });
      return { events: ev, rate: rate };
    },
    torsades: function (rng) {
      return { events: [], bg: { k: 'torsades', f: U(rng, 3.6, 4.4), p: U(rng, 0, 6.28), twist: U(rng, 1.8, 2.6), envP: U(rng, 0, 2) } };
    },
    vf: function (rng) {
      var coarse = rng() < 0.6;
      return {
        events: [],
        bg: { k: 'vf', waves: fibWaves(rng, 5, 0.32, 2.8, 7.5), amp: coarse ? 1.15 : 0.32, envF: U(rng, 0.25, 0.6), envP: U(rng, 0, 6.28) },
        coarse: coarse
      };
    },
    asystole: function (rng) {
      var ev = [];
      if (rng() < 0.3) regularTimes(rng, U(rng, 30, 50), 0.02).forEach(function (tp) { ev.push({ k: 'P', t: tp, amp: 0.13 }); });
      return { events: ev };
    },
    paced: function (rng) {
      var rate = choice(rng, [60, 70, 72, 80]), rr = 60 / rate, ev = [];
      regularTimes(rng, rate, 0.001).forEach(function (ts) {
        ev.push({ k: 'S', t: ts, amp: U(rng, 1.1, 1.5) });
        ev.push({ k: 'V', t: ts + 0.045, rr: rr, sign: -1, form: 1 });
      });
      return { events: ev, rate: rate };
    },
    'avb-1': function (rng) { return sinusBase(rng, U(rng, 58, 88), U(rng, 0.27, 0.38)); },
    'avb-2-1': function (rng) {
      var rate = U(rng, 72, 96), rr = 60 / rate, ev = [];
      var len = choice(rng, [3, 4, 4, 5]); // P waves per cycle, last one dropped
      var prs = [0.16, 0.26, 0.33, 0.38].slice(0, len - 1);
      var times = regularTimes(rng, rate, 0.008), start = Math.floor(rng() * len);
      times.forEach(function (tp, i) {
        var k = (i + start) % len;
        if (k === len - 1) ev.push({ k: 'P', t: tp, amp: 0.16 });
        else conducted(ev, tp, prs[k] + U(rng, -0.01, 0.01), rr * 1.2);
      });
      return { events: ev, rate: rate };
    },
    'avb-2-2': function (rng) {
      var rate = U(rng, 72, 100), rr = 60 / rate, ev = [], pr = U(rng, 0.15, 0.2);
      var len = choice(rng, [2, 3, 3, 4]), wide = rng() < 0.55;
      var times = regularTimes(rng, rate, 0.008), start = Math.floor(rng() * len);
      times.forEach(function (tp, i) {
        var k = (i + start) % len;
        if (k === len - 1) ev.push({ k: 'P', t: tp, amp: 0.16 });
        else conducted(ev, tp, pr, rr * 1.4, { wide: wide });
      });
      return { events: ev, rate: rate, ratio: len + ':' + (len - 1) };
    },
    'avb-3': function (rng) {
      var ev = [], atrial = U(rng, 70, 98), ventricular = rng() < 0.5;
      var vrate = ventricular ? U(rng, 28, 40) : U(rng, 40, 55), vrr = 60 / vrate;
      regularTimes(rng, atrial, 0.006).forEach(function (tp) { ev.push({ k: 'P', t: tp, amp: 0.16 }); });
      regularTimes(rng, vrate, 0.006).forEach(function (tq) {
        ev.push(ventricular ? { k: 'V', t: tq, rr: vrr, sign: 1 } : { k: 'N', t: tq, rr: vrr });
      });
      return { events: ev, rate: vrate };
    },
    wpw: function (rng) { return sinusBase(rng, U(rng, 64, 90), U(rng, 0.09, 0.11), { delta: true }); }
  };

  // ---------- Sampling ----------
  function generate(id, seed) {
    var build = RHYTHMS[id];
    if (!build) throw new Error('No strip for rhythm ' + id);
    var rng = makeRng(seed);
    var spec = build(rng);
    var wander = { a: U(rng, 0.02, 0.06), f: U(rng, 0.15, 0.3), p: U(rng, 0, 6.28) };
    var n = SECONDS * HZ, out = new Array(n + 1);
    var events = spec.events.slice().sort(function (a, b) { return a.t - b.t; });
    var bg = spec.bg && BACKGROUNDS[spec.bg.k];
    var lo = 0;
    for (var i = 0; i <= n; i++) {
      var t = i / HZ;
      var v = wander.a * Math.sin(2 * Math.PI * wander.f * t + wander.p) + 0.008 * (rng() * 2 - 1);
      if (bg) v += bg(spec.bg, t);
      while (lo < events.length && events[lo].t < t - 1.2) lo++;
      for (var j = lo; j < events.length && events[j].t < t + 0.4; j++) {
        v += SHAPES[events[j].k](events[j], t);
      }
      out[i] = v;
    }
    return { id: id, hz: HZ, seconds: SECONDS, samples: out, spec: spec };
  }

  // ---------- Drawing ----------
  var uid = 0;

  // One row of paper covering [t0, t1) seconds. Returns SVG children.
  function row(samples, hz, t0, t1, yTop, height) {
    var x0 = t0 * MM_PER_S, w = (t1 - t0) * MM_PER_S;
    var mid = yTop + height * 0.56;
    var pts = [];
    var i0 = Math.round(t0 * hz), i1 = Math.round(t1 * hz);
    for (var i = i0; i <= i1 && i < samples.length; i++) {
      var x = i / hz * MM_PER_S - x0;
      var y = mid - samples[i] * MM_PER_MV;
      y = Math.max(yTop + 0.4, Math.min(yTop + height - 0.4, y));
      pts.push((i === i0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2));
    }
    return { path: pts.join(''), width: w };
  }

  function paper(id, w, h) {
    return '<defs>' +
      '<pattern id="s' + id + '" width="1" height="1" patternUnits="userSpaceOnUse"><path d="M1 0V1H0" class="ecg-minor"/></pattern>' +
      '<pattern id="l' + id + '" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="url(#s' + id + ')"/><path d="M5 0V5H0" class="ecg-major"/></pattern>' +
      '</defs><rect width="' + w + '" height="' + h + '" class="ecg-bg"/><rect width="' + w + '" height="' + h + '" fill="url(#l' + id + ')"/>';
  }

  function ticks(t0, t1, y) {
    var s = '';
    for (var t = Math.ceil(t0); t <= t1; t++) {
      if (t % 3 !== 0) continue;
      var x = (t - t0) * MM_PER_S;
      s += '<path d="M' + x + ' ' + y + 'v2.4" class="ecg-tick"/>';
    }
    return s;
  }

  // Beat labels drawn along the top edge, for real strips after answering.
  function marks(list, hz, t0, t1) {
    return (list || []).filter(function (m) { var t = m[0] / hz; return t >= t0 && t < t1; }).map(function (m) {
      var x = (m[0] / hz - t0) * MM_PER_S;
      return '<text x="' + x.toFixed(2) + '" y="3.6" class="ecg-mark">' + m[1] + '</text>';
    }).join('');
  }

  // Wide layout: one 6 s row. Narrow layout: two 3 s rows stacked.
  // opts: { cap: [left, right], marks: [[sample, text]] }
  function render(strip, label, opts) {
    opts = opts || {};
    var h = 40, id = ++uid, s = strip.samples, hz = strip.hz || HZ, title = label ? '<title>' + label + '</title>' : '';
    var full = row(s, hz, 0, SECONDS, 0, h);
    var wide = '<svg class="ecg ecg-wide" viewBox="0 0 150 ' + h + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="ECG strip, 6 seconds, lead II">' + title +
      paper(id, 150, h) + ticks(0, 6, 0) + '<path d="' + full.path + '" class="ecg-trace"/>' + marks(opts.marks, hz, 0, 6) + '</svg>';
    var a = row(s, hz, 0, 3, 0, h), b = row(s, hz, 3, 6, 0, h);
    var id2 = ++uid;
    var narrow = '<svg class="ecg ecg-narrow" viewBox="0 0 75 ' + (h * 2 + 3) + '" role="img" aria-label="ECG strip, 6 seconds in two rows, lead II">' + title +
      '<g>' + paper(id2, 75, h) + ticks(0, 3, 0) + '<path d="' + a.path + '" class="ecg-trace"/>' + marks(opts.marks, hz, 0, 3) + '</g>' +
      '<g transform="translate(0 ' + (h + 3) + ')">' + paper(id2 + 'b', 75, h) + ticks(3, 6, 0) + '<path d="' + b.path + '" class="ecg-trace"/>' + marks(opts.marks, hz, 3, 6) + '</g></svg>';
    var cap = opts.cap || ['Lead II', '6 seconds · 25 mm/s'];
    return '<div class="ecg-wrap">' + wide + narrow + '<div class="ecg-cap"><span>' + cap[0] + '</span><span>' + cap[1] + '</span></div></div>';
  }

  // A recorded strip from window.REAL_STRIPS (hundredths of a mV) in the same shape generate() returns.
  function fromReal(entry, hz) {
    return { id: entry.id, hz: hz, seconds: SECONDS, samples: entry.mv.map(function (v) { return v / 100; }) };
  }

  function strip(id, seed) { return render(generate(id, seed)); }

  root.ECG = {
    ids: Object.keys(RHYTHMS),
    generate: generate,
    render: render,
    fromReal: fromReal,
    strip: strip,
    makeRng: makeRng
  };
})(typeof window !== 'undefined' ? window : globalThis);
