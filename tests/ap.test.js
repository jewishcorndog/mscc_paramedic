// Run: node tests/ap.test.js
const assert = require('assert');
globalThis.window = globalThis;
require('../js/ap-data.js');
const GROUPS = globalThis.AP_GROUPS.map(g => g.id);
const TOPICS = globalThis.AP_TOPICS;
const TERMS = globalThis.AP_TERMS;
const FACTS = globalThis.AP_FACTS;
const NORMALS = globalThis.AP_NORMALS;
const CASES = globalThis.AP_SCENARIOS;
let n = 0;
function t(name, fn) { fn(); n++; }

t('every item belongs to a known body system', () => {
  [].concat(TOPICS, TERMS, FACTS, NORMALS, CASES).forEach(x => assert(GROUPS.indexOf(x.group) !== -1, JSON.stringify(x).slice(0, 60)));
});

t('every system has topics, terms, facts and applied cases', () => {
  GROUPS.forEach(g => {
    assert(TOPICS.some(x => x.group === g), 'no topics for ' + g);
    assert(TERMS.some(x => x.group === g), 'no terms for ' + g);
    assert(FACTS.some(x => x.group === g), 'no facts for ' + g);
    assert(CASES.some(x => x.group === g), 'no cases for ' + g);
  });
});

t('topics are complete and ids are unique', () => {
  const ids = TOPICS.map(x => x.id).concat(CASES.map(x => x.id));
  assert.strictEqual(new Set(ids).size, ids.length);
  TOPICS.forEach(x => assert(x.name && x.about.length && x.points.length && x.field.length && Array.isArray(x.aliases), x.id));
});

t('terms are unique by name and definition', () => {
  const names = TERMS.map(x => x.term.toLowerCase());
  const defs = TERMS.map(x => x.def.toLowerCase());
  assert.strictEqual(new Set(names).size, names.length);
  assert.strictEqual(new Set(defs).size, defs.length);
  TERMS.forEach(x => assert(x.term && x.def, x.term));
});

t('normals are unique by name and have a value', () => {
  const names = NORMALS.map(x => x.name.toLowerCase());
  assert.strictEqual(new Set(names).size, names.length);
  NORMALS.forEach(x => assert(x.value, x.name));
});

t('facts, normals and cases have three distinct wrong answers', () => {
  FACTS.concat(CASES).forEach(x => {
    const opts = [x.a].concat(x.wrong);
    assert.strictEqual(x.wrong.length, 3, x.q || x.id);
    assert.strictEqual(new Set(opts).size, 4, x.q || x.id);
  });
  NORMALS.forEach(x => {
    assert.strictEqual(x.wrong.length, 3, x.name);
    assert.strictEqual(new Set([x.value].concat(x.wrong)).size, 4, x.name);
  });
  CASES.forEach(x => assert(x.case && x.why, x.id));
});

console.log(n + ' A&P tests passed');
