// Run: node tests/legal.test.js
const assert = require('assert');
globalThis.window = globalThis;
require('../js/legal-data.js');
const GROUPS = globalThis.LEGAL_GROUPS.map(g => g.id);
const TOPICS = globalThis.LEGAL_TOPICS;
const TERMS = globalThis.LEGAL_TERMS;
const FACTS = globalThis.LEGAL_FACTS;
const CASES = globalThis.LEGAL_SCENARIOS;
let n = 0;
function t(name, fn) { fn(); n++; }

t('every item belongs to a known area', () => {
  [].concat(TOPICS, TERMS, FACTS, CASES).forEach(x => assert(GROUPS.indexOf(x.group) !== -1, JSON.stringify(x).slice(0, 60)));
});

t('every area has terms, facts and scenarios to drill', () => {
  GROUPS.forEach(g => {
    assert(TERMS.some(x => x.group === g), 'no terms for ' + g);
    assert(FACTS.some(x => x.group === g), 'no facts for ' + g);
    assert(CASES.some(x => x.group === g), 'no scenarios for ' + g);
    assert(TOPICS.some(x => x.group === g), 'no topics for ' + g);
  });
});

t('topics are complete and ids are unique', () => {
  const ids = TOPICS.map(x => x.id).concat(CASES.map(x => x.id));
  assert.strictEqual(new Set(ids).size, ids.length);
  TOPICS.forEach(x => assert(x.name && x.about.length && x.points.length && x.scene.length, x.id));
});

t('terms are unique by name and definition', () => {
  const names = TERMS.map(x => x.term.toLowerCase());
  const defs = TERMS.map(x => x.def.toLowerCase());
  assert.strictEqual(new Set(names).size, names.length);
  assert.strictEqual(new Set(defs).size, defs.length);
  TERMS.forEach(x => assert(x.term && x.def, x.term));
});

t('facts and scenarios have three distinct wrong answers', () => {
  FACTS.concat(CASES).forEach(x => {
    const opts = [x.a].concat(x.wrong);
    assert.strictEqual(x.wrong.length, 3, x.q || x.id);
    assert.strictEqual(new Set(opts).size, 4, x.q || x.id);
  });
  CASES.forEach(x => assert(x.case && x.why, x.id));
});

console.log(n + ' legal tests passed');
