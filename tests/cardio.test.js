// Run: node tests/cardio.test.js
const assert = require('assert');
globalThis.window = globalThis;
require('../js/grading.js');
require('../js/ecg.js');
require('../js/cardio-data.js');
require('../js/real-strips.js');
const G = globalThis.Grading;
const ECG = globalThis.ECG;
const R = globalThis.CARDIO_RHYTHMS;
const T = globalThis.CARDIO_TOPICS;
const B = globalThis.CARDIO_BASICS;
let n = 0;
function t(name, fn) { fn(); n++; }

const ids = R.map(r => r.id);
const HZ = 500;

// Count R peaks: local maxima above a threshold, at least 0.2 s apart.
function peaks(samples, thr) {
  const out = [];
  for (let i = 1; i < samples.length - 1; i++) {
    if (samples[i] > thr && samples[i] >= samples[i - 1] && samples[i] > samples[i + 1]) {
      if (!out.length || i - out[out.length - 1] > 0.2 * HZ) out.push(i);
    }
  }
  return out;
}
function rate(samples, thr) {
  const p = peaks(samples, thr);
  if (p.length < 2) return 0;
  return 60 / ((p[p.length - 1] - p[0]) / (p.length - 1) / HZ);
}

t('every rhythm data entry is complete', () => {
  assert.strictEqual(new Set(ids).size, ids.length);
  R.forEach(r => {
    ['rate', 'rhythm', 'qrs', 'p', 'pr'].forEach(k => assert(r.rules[k], r.id + ' ' + k));
    assert(r.look && r.name && Array.isArray(r.management), r.id);
  });
  T.forEach(x => assert(x.name && (x.kind === 'condition' || x.kind === 'treatment') && x.management.length, x.id));
  B.forEach(b => assert(b.q && b.a && b.wrong.length >= 2 && b.wrong.indexOf(b.a) === -1, b.q));
});

t('every strip rhythm has data, and every generator runs', () => {
  ECG.ids.forEach(id => assert(ids.indexOf(id) !== -1, 'no data for ' + id));
  ECG.ids.forEach(id => {
    for (let seed = 1; seed < 30; seed++) {
      const s = ECG.generate(id, seed).samples;
      assert.strictEqual(s.length, 6 * HZ + 1);
      assert(s.every(Number.isFinite), id);
    }
  });
});

t('strip rates land in the textbook ranges', () => {
  const ranges = { nsr: [60, 100], 'sinus-brady': [30, 60], 'sinus-tach': [100, 150], svt: [150, 250], vt: [140, 250], idioventricular: [15, 42],
    'junctional-escape': [38, 61], 'accel-junctional': [60, 101], 'avb-1': [55, 92] };
  Object.keys(ranges).forEach(id => {
    for (let seed = 1; seed < 25; seed++) {
      const s = ECG.generate(id, seed).samples;
      const r = rate(s, 0.6);
      if (id === 'idioventricular' && r === 0) continue; // may show only one beat
      assert(r >= ranges[id][0] && r <= ranges[id][1], id + ' seed ' + seed + ' rate ' + r.toFixed(0));
    }
  });
});

t('afib is irregular, svt is regular, asystole is flat', () => {
  const spread = (id, seed) => {
    const p = peaks(ECG.generate(id, seed).samples, 0.6);
    const rr = p.slice(1).map((x, i) => x - p[i]);
    return (Math.max(...rr) - Math.min(...rr)) / HZ;
  };
  for (let seed = 1; seed < 10; seed++) {
    assert(spread('afib', seed) > 0.12, 'afib seed ' + seed);
    assert(spread('svt', seed) < 0.03, 'svt seed ' + seed);
    const flat = ECG.generate('asystole', seed).samples;
    assert(Math.max(...flat.map(Math.abs)) < 0.25, 'asystole seed ' + seed);
  }
});

t('wenckebach drops beats; complete heart block has more P waves than QRS', () => {
  for (let seed = 1; seed < 10; seed++) {
    const w = ECG.generate('avb-2-1', seed).spec.events;
    const pw = w.filter(e => e.k === 'P' && e.t > 0 && e.t < 6).length;
    const q = w.filter(e => e.k !== 'P' && e.t > 0 && e.t < 6).length;
    assert(pw > q, 'wenckebach seed ' + seed);
    const c = ECG.generate('avb-3', seed).spec.events;
    assert(c.filter(e => e.k === 'P').length > c.filter(e => e.k !== 'P').length, 'chb seed ' + seed);
  }
});

t('same seed draws the same strip', () => {
  assert.strictEqual(ECG.strip('vf', 42).replace(/[sl]\d+/g, ''), ECG.strip('vf', 42).replace(/[sl]\d+/g, ''));
  const svg = ECG.strip('nsr', 3);
  assert(svg.indexOf('ecg-wide') !== -1 && svg.indexOf('ecg-narrow') === -1, 'one strip, not two rows');
});

t('typed rhythm names match aliases and tolerate typos', () => {
  const by = Object.fromEntries(R.map(r => [r.id, { name: r.name, aliases: r.aliases, trade: [] }]));
  assert(G.nameMatches('afib', by.afib));
  assert(G.nameMatches('atrial fibrilation', by.afib));
  assert(G.nameMatches('wenckebach', by['avb-2-1']));
  assert(G.nameMatches('complete heart block', by['avb-3']));
  assert(G.nameMatches('v tach', by.vt));
  assert(G.nameMatches('sinus brady', by['sinus-brady']));
  assert(!G.nameMatches('sinus tach', by['sinus-brady']));
  assert(!G.nameMatches('atrial flutter', by.afib));
});

t('real MIT-BIH strips are complete, credited and renderable', () => {
  const RS = globalThis.REAL_STRIPS;
  assert.strictEqual(RS.hz, 180);
  assert(RS.strips.length >= 50, 'expected a decent real-strip library');
  const real = new Set();
  RS.strips.forEach(x => {
    assert(ids.includes(x.id), 'unknown rhythm ' + x.id);
    assert(/^\d{3}$/.test(x.rec) && /^\d+:\d\d$/.test(x.at), 'missing record credit on ' + x.id);
    assert.strictEqual(x.mv.length, 6 * RS.hz, x.id + ' ' + x.rec + ' is not 6 s');
    x.also.forEach(a => assert(ids.includes(a) && a !== x.id));
    x.beats.forEach(b => assert(b[0] >= 0 && b[0] < x.mv.length));
    const html = ECG.render(ECG.fromReal(x, RS.hz), null, { cap: ['MIT-BIH ' + x.rec, x.at], marks: x.beats.map(b => [b[0], b[1]]) });
    assert(!/NaN/.test(html), 'NaN in rendered ' + x.id);
    real.add(x.id);
  });
  ['nsr', 'afib', 'flutter', 'vt', 'pvc', 'paced'].forEach(id => assert(real.has(id), 'no real ' + id));
});

t('sodium-potassium pump content is complete', () => {
  const P = globalThis.CARDIO_PUMP;
  assert.strictEqual(P.steps.length, 4);
  assert.deepStrictEqual(P.phases.map(p => p.n).sort(), [0, 1, 2, 3, 4]);
  assert(P.qa.length >= 20);
  P.qa.forEach(b => {
    assert(b.q && b.a && b.wrong.length >= 3, b.q);
    assert(!b.wrong.includes(b.a) && new Set(b.wrong).size === b.wrong.length, 'bad choices: ' + b.q);
  });
  assert(/3 Na⁺ out and 2 K⁺ in/.test(P.qa[0].a));
});

t('block strips show their criteria inside the strip', () => {
  // Pair each P with a QRS that follows within 0.5 s; unpaired P waves are dropped beats.
  function pairs(id, seed) {
    const ev = ECG.generate(id, seed).spec.events;
    const P = ev.filter(e => e.k === 'P').map(e => e.t), Q = ev.filter(e => e.k === 'N' || e.k === 'W').map(e => e.t);
    return P.map(tp => { const q = Q.find(tq => tq > tp && tq - tp < 0.5); return { tp, pr: q == null ? null : q - tp }; });
  }
  for (let seed = 1; seed <= 60; seed++) {
    const w = pairs('avb-2-1', seed);
    const drops = w.filter(x => x.pr == null && x.tp > 0 && x.tp < 6);
    assert(drops.length >= 1 && drops[0].tp >= 1.2 && drops[0].tp <= 2.3, 'Wenckebach drop not inside the strip, seed ' + seed);
    // PR before each drop is longer than the PR right after it.
    drops.forEach(d => {
      const i = w.indexOf(d), before = w[i - 1], after = w[i + 1];
      if (before && after && after.pr != null) assert(before.pr - after.pr >= 0.12, 'Wenckebach PR does not lengthen visibly, seed ' + seed);
    });
    const m = pairs('avb-2-2', seed);
    const prs = m.filter(x => x.pr != null).map(x => x.pr);
    assert(Math.max(...prs) - Math.min(...prs) < 0.01, 'Mobitz II PR not constant, seed ' + seed);
    const md = m.filter(x => x.pr == null && x.tp > 0 && x.tp < 6);
    assert(md.length >= 1 && md[0].tp >= 1.2 && md[0].tp <= 2.3, 'Mobitz II drop not inside the strip, seed ' + seed);
    assert(ECG.generate('avb-2-2', seed).spec.ratio !== '2:1', 'Mobitz II should not be 2:1');
  }
});

console.log(n + ' cardiology test groups passed');
