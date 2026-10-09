// Run: node tests/pharm-learn.test.js
const assert = require('assert');
globalThis.window = globalThis;
require('../js/drugs.js');
require('../js/pharm-learn-data.js');
require('../js/med-math.js');
const MM = globalThis.MedMath;
const drugIds = new Set(globalThis.DRUGS.map(d => d.id));
const topics = new Set(globalThis.PHARM_TOPICS.map(t => t.id));
let n = 0;
function t(name, fn) { fn(); n++; }

t('every term and fact has a known topic', () => {
  for (const x of [...PHARM_TERMS, ...PHARM_FACTS]) assert(topics.has(x.topic), x.term || x.q);
});
t('facts have three distinct wrong answers', () => {
  for (const f of PHARM_FACTS) {
    assert.strictEqual(f.wrong.length, 3, f.q);
    assert(!f.wrong.includes(f.a), f.q);
    assert.strictEqual(new Set(f.wrong).size, 3, f.q);
  }
});
t('route rates come from Table 13-2', () => {
  for (const r of PHARM_ROUTES) assert(r.rate === null || PHARM_RATES.includes(r.rate), r.id);
  const rate = Object.fromEntries(PHARM_ROUTES.map(r => [r.id, r.rate]));
  assert.strictEqual(rate.iv, 'Immediate');
  assert.strictEqual(rate.io, 'Immediate');
  assert.strictEqual(rate.im, 'Moderate');
  assert.strictEqual(rate.subq, 'Slow');
  assert.strictEqual(rate.po, 'Slow');
  assert.strictEqual(rate.in, 'Rapid');
  assert.strictEqual(rate.topical, 'Moderate');
});
t('drug-receptor rows point at real drugs', () => {
  for (const d of PHARM_DRUG_RECEPTORS) assert(drugIds.has(d.drug), d.drug);
});
t('terms are unique', () => {
  assert.strictEqual(new Set(PHARM_TERMS.map(x => x.term)).size, PHARM_TERMS.length);
});

t('D/H × Q worked examples', () => {
  assert(MM.check({ answer: 1, dp: 1 }, '1'));
  assert(MM.check({ answer: 0.3, dp: 2 }, '.3 mL'));
  assert(MM.check({ answer: 2.8, dp: 1 }, '2.82'));
  assert(!MM.check({ answer: 2.8, dp: 1 }, '2.9'));
  assert(MM.check({ answer: 42, dp: 0 }, '41.7'));
  assert(MM.check({ answer: 1600, dp: 2 }, '1,600'));
  assert(!MM.check({ answer: 1, dp: 1 }, 'abc'));
});

t('generated problems are self-consistent', () => {
  for (const type of MM.TYPES) {
    for (let i = 0; i < 400; i++) {
      const p = MM.make(type.id);
      assert(Number.isFinite(p.answer) && p.answer > 0, type.id + ' ' + JSON.stringify(p));
      assert(p.steps.length && p.given.length && p.unit && p.ask, type.id);
      assert(MM.check(p, String(p.answer)), type.id + ' answer checks itself');
      // The last step shows the answer (rounded to the problem's places).
      const last = p.steps.join(' ');
      assert(last.includes(MM.fmt(p.answer)) || last.includes(MM.fmt(MM.round(p.answer, 0))), type.id + ': ' + last + ' vs ' + p.answer);
    }
  }
});

t('volumes match D/H × Q', () => {
  const vals = { dh: [], wtdose: [] };
  for (let i = 0; i < 300; i++) {
    const p = MM.make('dh');
    const order = p.given[0][1].replace(/,/g, ''), hand = p.given[1][1].replace(/,/g, '');
    const H = parseFloat(hand), Q = parseFloat(hand.split(' in ')[1]);
    let D = parseFloat(order.match(/([\d.]+) (mg|mcg|g)$/)[1]);
    const ou = order.match(/(mg|mcg|g)$/)[1], hu = hand.split(' ')[1];
    if (ou !== hu) D = ou === 'mg' && hu === 'mcg' ? D * 1000 : ou === 'mg' && hu === 'g' ? D / 1000 : ou === 'mcg' && hu === 'mg' ? D / 1000 : D * 1000;
    assert(Math.abs(D / H * Q - p.answer) < 0.051, order + ' / ' + hand + ' = ' + p.answer);
    vals.dh.push(p.answer);
  }
  assert(Math.max(...vals.dh) <= 50);
});

t('drip answers', () => {
  // lidocaine 2 mg/min, 1 g in 250 mL, 60 gtt -> 30 gtt/min
  let seen = false;
  for (let i = 0; i < 500 && !seen; i++) {
    const p = MM.make('drip');
    const g = Object.fromEntries(p.given);
    if (g.Order === 'Lidocaine 2 mg/min' && g.Mixed === '1 g in 250 mL' && g.Set === '60 gtt/mL') { assert.strictEqual(p.answer, 30); seen = true; }
  }
  assert(seen);
});

console.log(n + ' tests passed');
