// Run: node tests/cardio.test.js
const assert = require('assert');
globalThis.window = globalThis;
require('../js/grading.js');
require('../js/ecg.js');
require('../js/twelve.js');
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

t('conduction pathway runs in order and links real rhythms', () => {
  const C = globalThis.CARDIO_CONDUCTION, ids = new Set(globalThis.CARDIO_RHYTHMS.map(r => r.id));
  assert.deepStrictEqual(C.steps.map(s => s.id), ['sa', 'atria', 'av', 'his', 'bb', 'purkinje', 'repol']);
  C.steps.forEach(s => s.problems.forEach(id => assert(ids.has(id), 'unknown rhythm ' + id)));
  C.blocks.forEach(b => assert(b.id === null || ids.has(b.id), 'unknown block ' + b.id));
  assert(C.qa.length >= 20);
  C.qa.forEach(b => {
    assert(b.q && b.a && b.wrong.length >= 3, b.q);
    assert(!b.wrong.includes(b.a) && new Set(b.wrong).size === b.wrong.length, 'bad choices: ' + b.q);
  });
});

// ---------- 12-lead ----------
const TW = globalThis.CARDIO_TWELVE, TWG = globalThis.TWELVE;
// Net QRS (mV·s) in a lead around each beat: positive = mostly upright.
function netQrs(g, L) {
  const s = g.leads[L], b = s.slice(0, 2500), med = [...b].sort((x, y) => x - y)[1250];
  let best = 0, bi = 0;
  for (let i = 50; i < 2400; i++) { const d = Math.abs(s[i] - med); if (d > best) { best = d; bi = i; } }
  let sum = 0;
  for (let i = bi - 40; i < bi + 40; i++) sum += s[i] - med;
  return sum / 500;
}
// ST shift at J + 40 ms relative to the PR baseline, averaged over beats, using the generator's own timing.
function stShift(id, L, seed) {
  const g = TWG.generate(id, seed), s = g.leads[L];
  // Find QRS peaks in the sum of absolute leads.
  const e = s.map((_, i) => TWG.leads.reduce((m, k) => m + Math.abs(g.leads[k][i]), 0));
  const pk = [];
  for (let i = 100; i < e.length - 400; i++) if (e[i] > 0.5 * Math.max(...e.slice(0, 2500)) && e[i] >= e[i - 1] && e[i] > e[i + 1] && (!pk.length || i - pk[pk.length - 1] > 0.3 * 500)) pk.push(i);
  let sum = 0;
  pk.forEach(i => { const base = s[i - 40]; sum += s[i + Math.round((g.qrs - 0.045 + 0.04) * 500)] - base; });
  return sum / pk.length;
}

t('12-lead data matches the generator', () => {
  const ids = TW.patterns.map(p => p.id);
  assert.strictEqual(new Set(ids).size, ids.length);
  ids.forEach(id => assert(TWG.ids.includes(id), 'no generator for ' + id));
  const leads = new Set(TW.leads.map(l => l.id)), topics = new Set(globalThis.CARDIO_TOPICS.map(x => x.id)), groups = new Set(TW.groups.map(g => g.id));
  TW.patterns.forEach(p => {
    assert(p.name && p.find.length && groups.has(p.group), p.id);
    p.leads.concat(p.recip).forEach(L => assert(leads.has(L), p.id + ' unknown lead ' + L));
    if (p.topic) assert(topics.has(p.topic), p.id + ' unknown topic ' + p.topic);
    if (p.rhythm) assert(globalThis.CARDIO_RHYTHMS.some(r => r.id === p.rhythm), p.id + ' unknown rhythm ' + p.rhythm);
  });
  TW.walls.forEach(w => w.leads.concat(w.recip).forEach(L => assert(leads.has(L), w.id + ' ' + L)));
  assert(TW.qa.length >= 30);
  TW.qa.forEach(b => assert(b.q && b.a && b.wrong.length >= 3 && !b.wrong.includes(b.a), b.q));
});

t('every 12-lead pattern generates and renders', () => {
  TWG.ids.forEach(id => {
    for (let seed = 1; seed < 8; seed++) {
      const g = TWG.generate(id, seed);
      Object.keys(g.leads).forEach(L => { assert.strictEqual(g.leads[L].length, 10 * 500 + 1); assert(g.leads[L].every(Number.isFinite), id + ' ' + L); });
      const html = TWG.render(g, { extra: seed % 2 === 0, hl: { II: 'face' } });
      assert(!/NaN|undefined/.test(html), 'bad render ' + id);
    }
  });
});

t('12-lead axis follows leads I, aVF and II', () => {
  const cases = [[50, '+', '+', '+'], [-15, '+', '-', '+'], [-60, '+', '-', '-'], [130, '-', '+', null], [-135, '-', '-', null]];
  cases.forEach(([ax, i, f, ii]) => {
    for (let seed = 1; seed < 6; seed++) {
      const g = TWG.generate('axis', seed, { axis: ax });
      const sgn = L => netQrs(g, L) > 0 ? '+' : '-';
      assert.strictEqual(sgn('I'), i, 'lead I at ' + ax);
      assert.strictEqual(sgn('aVF'), f, 'aVF at ' + ax);
      if (ii) assert.strictEqual(sgn('II'), ii, 'lead II at ' + ax);
    }
  });
  ['lah', 'bifasc'].forEach(id => { const g = TWG.generate(id, 3); assert(netQrs(g, 'I') > 0 && netQrs(g, 'aVF') < 0 && netQrs(g, 'II') < 0, id + ' should be pathologic left'); });
  const lph = TWG.generate('lph', 3);
  assert(netQrs(lph, 'I') < 0 && netQrs(lph, 'aVF') > 0, 'lph should be right axis');
});

t('12-lead ST changes show in the named leads', () => {
  [['inferior', ['II', 'III', 'aVF'], ['aVL']], ['anterior', ['V3', 'V4'], []], ['septal', ['V1', 'V2'], []],
    ['lateral', ['I', 'aVL', 'V5', 'V6'], ['III']], ['inferior-rv', ['III', 'V4R'], ['aVL']], ['posterior', ['V8', 'V9'], ['V1', 'V2', 'V3']]].forEach(([id, up, down]) => {
    for (let seed = 1; seed < 5; seed++) {
      up.forEach(L => assert(stShift(id, L, seed) > 0.1, id + ': no ST elevation in ' + L));
      down.forEach(L => assert(stShift(id, L, seed) < -0.05, id + ': no ST depression in ' + L));
      ['V6', 'aVR'].filter(L => !up.includes(L) && !down.includes(L) && id !== 'lateral').forEach(L => assert(Math.abs(stShift('normal', L, seed)) < 0.06, 'normal ST off in ' + L));
    }
  });
});

t('12-lead widths and intervals fit the criteria', () => {
  for (let seed = 1; seed < 10; seed++) {
    assert(TWG.generate('normal', seed).qrs < 0.12);
    ['rbbb', 'lbbb', 'bifasc'].forEach(id => assert(TWG.generate(id, seed).qrs >= 0.12, id + ' QRS too narrow'));
    assert(TWG.generate('wpw', seed).pr < 0.12, 'WPW PR not short');
    assert(TWG.generate('long-qt', seed).qtc > 0.47, 'long QT not long');
    assert(TWG.generate('normal', seed).qtc < 0.46, 'normal QTc too long');
  }
});

t('MI data points at real patterns', () => {
  const M = globalThis.CARDIO_MI, pids = new Set(TW.patterns.map(p => p.id));
  M.territories.concat(M.classes).forEach(x => x.pids.forEach(id => assert(pids.has(id), x.id + ' unknown pattern ' + id)));
  assert.deepStrictEqual(M.stages.map(st => st.id), TWG.stages);
  assert(M.qa.length >= 25);
  M.qa.forEach(b => assert(b.q && b.a && b.wrong.length >= 3 && !b.wrong.includes(b.a) && new Set(b.wrong).size === b.wrong.length, b.q));
});

t('MI patterns put the ST changes in the right leads', () => {
  [['anterolateral', ['V4', 'V5', 'I', 'aVL'], ['III']], ['inferolateral', ['II', 'III', 'V6'], ['aVL']], ['inferoposterior', ['III', 'aVF'], ['V2']],
    ['ischemia', [], ['V5', 'II']], ['sgarbossa', ['V6', 'aVL'], ['V2']]].forEach(([id, up, down]) => {
    for (let seed = 1; seed < 5; seed++) {
      up.forEach(L => assert(stShift(id, L, seed) > 0.08, id + ': no ST elevation in ' + L));
      down.forEach(L => assert(stShift(id, L, seed) < -0.05, id + ': no ST depression in ' + L));
    }
  });
  // Old MI: Q waves in the inferior leads, ST back at baseline.
  for (let seed = 1; seed < 5; seed++) {
    ['II', 'III', 'aVF'].forEach(L => assert(Math.abs(stShift('old-inferior', L, seed)) < 0.06, 'old MI ST not flat in ' + L));
  }
});

t('STEMI stages change over time', () => {
  // Voltage 22 ms before each QRS peak (where a pathologic Q sits), against the PR baseline.
  function qDepth(g, L) {
    const s = g.leads[L], e = s.map((_, i) => TWG.leads.reduce((m, k) => m + Math.abs(g.leads[k][i]), 0));
    const top = Math.max(...e.slice(0, 2500)), pk = [];
    for (let i = 100; i < e.length - 100; i++) if (e[i] > 0.5 * top && e[i] >= e[i - 1] && e[i] > e[i + 1] && (!pk.length || i - pk[pk.length - 1] > 150)) pk.push(i);
    return pk.reduce((m, i) => m + s[i - 11] - s[i - 40], 0) / pk.length;
  }
  // T-wave peak voltage (T peak sits at qt - 145 ms after the QRS center), against the PR baseline.
  function tWave(g, L) {
    const s = g.leads[L], e = s.map((_, i) => TWG.leads.reduce((m, k) => m + Math.abs(g.leads[k][i]), 0));
    const top = Math.max(...e.slice(0, 2500)), pk = [], off = Math.round((g.qt - 0.145) * 500);
    for (let i = 100; i < e.length - off - 10; i++) if (e[i] > 0.5 * top && e[i] >= e[i - 1] && e[i] > e[i + 1] && (!pk.length || i - pk[pk.length - 1] > 150)) pk.push(i);
    return pk.reduce((m, i) => m + s[i + off] - s[i - 40], 0) / pk.length;
  }
  for (let seed = 1; seed < 5; seed++) {
    const acute = TWG.generate('anterior', seed, { stage: 'acute' }), old = TWG.generate('anterior', seed, { stage: 'old' });
    assert(qDepth(old, 'V4') < qDepth(acute, 'V4') - 0.3, 'no Q wave in old anterior MI');
    // Hyperacute: tall T, little ST; T inversion stage: T below baseline.
    const hy = TWG.generate('anterior', seed, { stage: 'hyperacute' }), inv = TWG.generate('anterior', seed, { stage: 'inverted' });
    assert(tWave(hy, 'V3') > 0.45, 'hyperacute T not tall');
    assert(tWave(inv, 'V3') < -0.1, 'T not inverted in the inverted stage');
    assert(tWave(acute, 'V3') > 0.2, 'acute T not upright');
  }
});

console.log(n + ' cardiology test groups passed');
