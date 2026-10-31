// Run: node tests/trauma.test.js
const assert = require('assert');
globalThis.window = globalThis;
require('../js/trauma-data.js');
const GROUPS = globalThis.TRAUMA_GROUPS.map(g => g.id);
const TOPICS = globalThis.TRAUMA_TOPICS;
const TERMS = globalThis.TRAUMA_TERMS;
const FACTS = globalThis.TRAUMA_FACTS;
const CASES = globalThis.TRAUMA_SCENARIOS;
const SURVEY = globalThis.TRAUMA_SURVEY;
const TN = globalThis.TRAUMA_TN;
let n = 0;
function t(name, fn) { fn(); n++; }

t('every item belongs to a known area', () => {
  [].concat(TOPICS, TERMS, FACTS, CASES, TN).forEach(x => assert(GROUPS.indexOf(x.group) !== -1, JSON.stringify(x).slice(0, 60)));
});

t('every area has topics, terms, facts and scenarios', () => {
  GROUPS.forEach(g => {
    assert(TOPICS.some(x => x.group === g), 'no topics for ' + g);
    assert(TERMS.some(x => x.group === g), 'no terms for ' + g);
    assert(FACTS.some(x => x.group === g), 'no facts for ' + g);
    assert(CASES.some(x => x.group === g), 'no scenarios for ' + g);
  });
});

t('every slide chapter 35–42 has an area', () => {
  for (let ch = 35; ch <= 42; ch++) assert(globalThis.TRAUMA_GROUPS.some(g => g.ch === ch), 'no area for chapter ' + ch);
});

t('topics are complete and ids are unique', () => {
  const ids = TOPICS.map(x => x.id).concat(CASES.map(x => x.id));
  assert.strictEqual(new Set(ids).size, ids.length);
  TOPICS.forEach(x => assert(x.name && x.about.length && x.points.length && x.scene.length && Array.isArray(x.aliases), x.id));
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

t('survey steps are XABCDE and every drill answer is a choice', () => {
  assert.deepStrictEqual(SURVEY.steps.map(s => s.key), ['X', 'A', 'B', 'C', 'D', 'E']);
  SURVEY.steps.forEach(s => assert(s.look.length && s.act.length, s.key));
  SURVEY.firstDrills.forEach(d => assert(SURVEY.steps.some(s => s.key === d.a) && d.case && d.why, d.case));
  SURVEY.triageDrills.forEach(d => assert(SURVEY.destinations.indexOf(d.a) !== -1 && d.case && d.why, d.case));
  assert.strictEqual(SURVEY.components.length, 9);
});

t('GCS columns score 4, 5 and 6, and the bands cover 3 to 15 once', () => {
  const G = SURVEY.gcs;
  assert.deepStrictEqual([G.eyes, G.verbal, G.motor].map(c => c[0][0]), [4, 5, 6]);
  for (let s = 3; s <= 15; s++) assert.strictEqual(G.bands.filter(b => s >= b[0] && s <= b[1]).length, 1, 'GCS ' + s);
});

t('hemorrhage table has four classes per row', () => {
  SURVEY.hemorrhage.forEach(r => assert.strictEqual(r.length, 5, r[0]));
});

t('worked numbers in the scenarios are right', () => {
  const burn = CASES.find(c => c.id === 'sc-burn-size');
  assert.strictEqual(burn.a, 'About ' + (18 + 9) + '% TBSA');
  const park = CASES.find(c => c.id === 'sc-parkland');
  assert.strictEqual(park.a, (4 * 80 * 50 / 2).toLocaleString('en-US') + ' mL');
  const peds = FACTS.find(f => /4-year-old/.test(f.q));
  assert(peds.a.startsWith('Below ' + (70 + 2 * 4) + ' '));
});

t('TN rows name both sides', () => {
  TN.forEach(r => assert(r.topic && r.national && r.tn, r.topic));
});

console.log(n + ' trauma tests passed');
