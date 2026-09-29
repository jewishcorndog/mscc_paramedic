// Run: node tests/grading.test.js
const assert = require('assert');
globalThis.window = globalThis;
require('../js/drugs.js');
require('../js/grading.js');
const G = globalThis.Grading;
const D = Object.fromEntries(globalThis.DRUGS.map(d => [d.id, d]));
let n = 0;
function t(name, fn) { fn(); n++; }

t('names tolerate typos and trade names', () => {
  assert(G.nameMatches('amiodarone', D.amiodarone));
  assert(G.nameMatches('amiodarome', D.amiodarone));
  assert(G.nameMatches('Zofran', D.ondansetron));
  assert(G.nameMatches('epi', D['epi-1000']));
  assert(G.nameMatches('atropine', D.atropine));
  assert(G.nameMatches('succinylcholine', D.succinylcholine));
  assert(!G.nameMatches('adenosine', D.amiodarone));
  assert(!G.nameMatches('', D.amiodarone));
});

t('list grading matches shorthand', () => {
  const r = G.gradeList(D.adenosine.contraindications, '2nd/3rd degree HB');
  assert(r[0].hit, JSON.stringify(r));
  const a = G.gradeList(D.amiodarone.indications, 'VF, pulseless VT, wide complex tach');
  assert.deepStrictEqual(a.map(x => x.hit), [true, true, true, false]);
  const s = G.gradeList(D.succinylcholine.contraindications, 'burns > 72 hrs\nmalignant hyperthermia\nCKD');
  assert(s[1].hit && s[5].hit && !s[0].hit);
  const e = G.gradeList(D.acetaminophen.contraindications, '');
  assert(!e[0].hit);
});

t('dose grading requires every number', () => {
  assert(G.doseMatches('0.4 mg SL (max dose 1.2 mg)', 'nitro .4mg SL max 1.2'));
  assert(!G.doseMatches('0.4 mg SL (max dose 1.2 mg)', '0.4 mg'));
  assert(G.doseMatches('Self-administered', 'self administered'));
  assert(G.sameNumber('.01', 0.01));
  assert(G.sameNumber('2.0', 2));
});

t('distractor check spots overlap', () => {
  assert(G.sameItem('Pain', 'Pain management'));
  assert(!G.sameItem('Hypoglycemia', 'Hyperkalemia'));
});

t('every drug has the tested fields', () => {
  for (const d of globalThis.DRUGS) {
    for (const f of ['indications', 'contraindications', 'adult', 'peds', 'aliases', 'trade', 'groups']) {
      assert(Array.isArray(d[f]), d.id + '.' + f);
    }
    assert(d.indications.length, d.id + ' has indications');
    assert(d.adult.length, d.id + ' has an adult dose');
  }
  assert.strictEqual(new Set(globalThis.DRUGS.map(d => d.id)).size, globalThis.DRUGS.length);
});

console.log(n + ' test groups passed');
