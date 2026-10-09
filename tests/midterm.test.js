// Run: node tests/midterm.test.js
const assert = require('assert');
const fs = require('fs');
const path = require('path');
globalThis.window = globalThis;
require('../js/midterm-data.js');
require('../js/midterm.js');
const T = globalThis.MIDTERM_TOPICS;
const STRIPS = globalThis.MIDTERM_STRIPS;
const ANS = globalThis.MIDTERM_STRIP_ANSWERS;
const M = globalThis.MidtermGen;
let n = 0;
function t(name, fn) { try { fn(); n++; } catch (e) { console.error('FAIL: ' + name); throw e; } }

function checkQ(q, where) {
  assert.ok(q.options.length >= 2 && q.options.length <= 4, where + ': option count');
  assert.strictEqual(new Set(q.options).size, q.options.length, where + ': duplicate options ' + q.options.join(' | '));
  assert.ok(q.answer >= 0 && q.answer < q.options.length, where + ': answer index');
}

t('ten midterm topics with unique ids, review points and questions', () => {
  assert.strictEqual(T.length, 10);
  assert.strictEqual(new Set(T.map(x => x.id)).size, 10);
  T.forEach(x => {
    assert.ok(x.points.length >= 8, x.id + ' points');
    assert.ok(x.facts.length >= 8, x.id + ' facts');
  });
});

t('every fact has an answer and 3 distinct wrong answers', () => {
  T.forEach(x => x.facts.forEach(f => {
    assert.ok(f.q && f.a, x.id + ': ' + f.q);
    assert.strictEqual(f.wrong.length, 3, x.id + ': ' + f.q);
    assert.strictEqual(new Set([f.a].concat(f.wrong)).size, 4, x.id + ': ' + f.q);
  }));
});

t('36 handout strips, each with an answer and an image file', () => {
  assert.strictEqual(STRIPS.length, 36);
  STRIPS.forEach((s, i) => {
    assert.strictEqual(s.n, i + 1);
    assert.ok(ANS[s.ans], 'strip ' + s.n + ' answer ' + s.ans);
    const f = path.join(__dirname, '..', 'img', 'midterm', 'strip' + String(s.n).padStart(2, '0') + '.jpg');
    assert.ok(fs.existsSync(f), f);
  });
});

t('strip questions include the right answer and 3 other names', () => {
  STRIPS.forEach(s => {
    const q = M.stripQ(s);
    checkQ(q, 'strip ' + s.n);
    assert.strictEqual(q.options.length, 4);
    assert.strictEqual(q.options[q.answer], ANS[s.ans].name);
  });
});

t('D/H × V questions compute the volume', () => {
  for (let i = 0; i < 200; i++) {
    const q = M.math.dh();
    checkQ(q, 'dh');
    const m = q.prompt.match(/Order: ([\d.]+) \w+ of .*?You have ([\d.]+) \w+ in ([\d.]+) mL/);
    assert.ok(m, q.prompt);
    const want = M.num(m[1] / m[2] * m[3], 2) + ' mL';
    assert.strictEqual(q.options[q.answer], want, q.prompt);
  }
});

t('drip rate questions use volume × drop factor ÷ minutes', () => {
  for (let i = 0; i < 200; i++) {
    const q = M.math.gtt();
    checkQ(q, 'gtt');
    const m = q.prompt.match(/Run (\d+) mL over (\d+) (hours?|minutes) with a (\d+) gtt/);
    const min = m[3].startsWith('hour') ? m[2] * 60 : +m[2];
    assert.strictEqual(q.options[q.answer], Math.round(m[1] * m[4] / min) + ' gtt/min', q.prompt);
  }
});

t('dopamine, lidocaine and weight-based questions are well formed', () => {
  for (let i = 0; i < 200; i++) {
    const d = M.math.dopamine();
    checkQ(d, 'dopamine');
    const m = d.prompt.match(/Dopamine (\d+) mcg\/kg\/min for an (\d+) kg/);
    assert.strictEqual(d.options[d.answer], M.num(m[1] * m[2] * 60 / 1600, 1) + ' gtt/min');
    checkQ(M.math.lido(), 'lido');
    checkQ(M.math.weight(), 'weight');
  }
});

t('ABGs land in the right ranges for their disturbance', () => {
  const name = { ra: 'Respiratory acidosis', rb: 'Respiratory alkalosis', ma: 'Metabolic acidosis', mb: 'Metabolic alkalosis' };
  for (let i = 0; i < 400; i++) {
    const q = M.abg();
    checkQ(q, 'abg');
    assert.strictEqual(q.options[q.answer], name[q.kind]);
    const [, pH, co2, hco3] = q.prompt.match(/pH ([\d.]+), PaCO₂ (\d+) mmHg, HCO₃⁻ (\d+)/).map(Number);
    if (q.kind[1] === 'a') assert.ok(pH < 7.35, q.prompt); else assert.ok(pH > 7.45, q.prompt);
    if (q.kind === 'ra') assert.ok(co2 > 45 && hco3 >= 22, q.prompt);
    if (q.kind === 'rb') assert.ok(co2 < 35 && hco3 <= 26, q.prompt);
    if (q.kind === 'ma') assert.ok(hco3 < 22 && co2 <= 45, q.prompt);
    if (q.kind === 'mb') assert.ok(hco3 > 26 && co2 >= 35, q.prompt);
  }
});

t('a full exam spreads across all topics and has the requested length', () => {
  const ids = T.map(x => x.id);
  [20, 40, 60, 100].forEach(len => {
    const qs = M.buildExam(ids, len, true);
    assert.strictEqual(qs.length, len);
    qs.forEach((q, i) => checkQ(q, 'exam ' + i));
  });
  const qs = M.buildExam(ids, 100, true);
  ids.forEach(id => assert.ok(qs.filter(q => q.topic === id).length >= 8, id));
  assert.deepStrictEqual(M.buildExam([], 20, true), []);
});

console.log('midterm: ' + n + ' tests passed');
