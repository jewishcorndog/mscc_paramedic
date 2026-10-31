// Run: node tests/ob.test.js
const assert = require('assert');
globalThis.window = globalThis;
require('../js/ob-data.js');
const GROUPS = globalThis.OB_GROUPS.map(g => g.id);
const TOPICS = globalThis.OB_TOPICS;
const TERMS = globalThis.OB_TERMS;
const FACTS = globalThis.OB_FACTS;
const CASES = globalThis.OB_SCENARIOS;
const TL = globalThis.OB_TIMELINE;
const ST = globalThis.OB_STAGES;
const APGAR = globalThis.OB_APGAR;
let n = 0;
function t(name, fn) { fn(); n++; }

t('every item belongs to a known area', () => {
  [].concat(TOPICS, TERMS, FACTS, CASES, TL).forEach(x => assert(GROUPS.indexOf(x.group) !== -1, JSON.stringify(x).slice(0, 60)));
});

t('every area has topics, facts and something to drill', () => {
  GROUPS.forEach(g => {
    assert(TOPICS.some(x => x.group === g), 'no topics for ' + g);
    assert(FACTS.some(x => x.group === g), 'no facts for ' + g);
    assert(TERMS.some(x => x.group === g), 'no terms for ' + g);
  });
});

t('ids are unique and topics are complete', () => {
  const ids = TOPICS.map(x => x.id).concat(CASES.map(x => x.id), TL.map(x => x.id));
  assert.strictEqual(new Set(ids).size, ids.length);
  TOPICS.forEach(x => assert(x.name && x.about.length && x.points.length && x.care.length, x.id));
});

t('terms are unique by name and definition', () => {
  const names = TERMS.map(x => x.term.toLowerCase());
  const defs = TERMS.map(x => x.def.toLowerCase());
  assert.strictEqual(new Set(names).size, names.length);
  assert.strictEqual(new Set(defs).size, defs.length);
});

t('facts and scenarios have three distinct wrong answers', () => {
  FACTS.concat(CASES).forEach(x => {
    const opts = [x.a].concat(x.wrong);
    assert.strictEqual(x.wrong.length, 3, x.q || x.id);
    assert.strictEqual(new Set(opts).size, 4, x.q || x.id);
  });
  CASES.forEach(x => assert(x.case && x.why, x.id));
});

t('timeline bars stay on the axis and every condition has a window', () => {
  const whens = TL.map(x => x.when), names = TL.map(x => x.name);
  assert.strictEqual(new Set(whens).size, whens.length);
  assert.strictEqual(new Set(names).size, names.length);
  TL.forEach(x => {
    assert((x.preg && x.preg.length) || x.labor || (x.pp && x.pp.length), x.id);
    (x.preg || []).forEach(b => assert(b[0] >= 0 && b[1] <= 42 && b[0] <= b[1] && /^(strong|weak)$/.test(b[2]), x.id));
    (x.pp || []).forEach(b => assert(b[0] >= 0 && b[1] <= 6 && b[0] <= b[1] && /^(strong|weak)$/.test(b[2]), x.id));
    assert(!x.labor || /^(strong|weak)$/.test(x.labor), x.id);
    assert(x.key, x.id);
  });
});

t('every week 0 to 42 has one viability band, a trimester and a fundal height', () => {
  for (let w = 0; w <= 42; w++) {
    assert.strictEqual(ST.viability.filter(v => w >= v.from && w <= v.to).length, 1, 'viability ' + w);
    assert.strictEqual(ST.trimesters.filter(v => w >= v.from && w <= v.to).length, 1, 'trimester ' + w);
    assert.strictEqual(ST.fundus.filter(f => w >= f[0] && w <= f[1]).length, 1, 'fundus ' + w);
  }
  assert.strictEqual(ST.lunar.length, 10);
  assert.strictEqual(new Set(ST.viability.map(v => v.name)).size, ST.viability.length);
});

t('the slide numbers are right', () => {
  const f = q => FACTS.find(x => x.q === q).a;
  assert.strictEqual(f('What is the normal fetal heart rate?'), '120 to 160 beats/min');
  assert.strictEqual(f('Postpartum hemorrhage is blood loss over…'), '500 mL');
  assert.strictEqual(f('Where is the fundus at 20 weeks?'), 'At the umbilicus');
  assert(TL.find(x => x.id === 'tl-eclampsia').pp.some(b => b[1] === 4));
});

t('Apgar has five signs scored 0 to 2 and bands cover 0 to 10', () => {
  assert.deepStrictEqual(APGAR.signs.map(s => s.name), ['Appearance', 'Pulse', 'Grimace', 'Activity', 'Respirations']);
  APGAR.signs.forEach(s => assert.strictEqual(s.s.length, 3));
  for (let i = 0; i <= 10; i++) assert.strictEqual(APGAR.bands.filter(b => i >= b.min && i <= b.max).length, 1);
  const c = CASES.find(x => x.id === 'sc-apgar');
  assert.strictEqual(c.a, 'Apgar 6');
});

console.log(n + ' OB tests passed');
