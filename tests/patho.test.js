// Run: node tests/patho.test.js
const assert = require('assert');
globalThis.window = globalThis;
require('../js/abg.js');
require('../js/patho-data.js');
const ABG = globalThis.ABG;
const T = globalThis.PATHO_TOPICS;
const GR = globalThis.PATHO_GROUPS;
const F = globalThis.PATHO_FACTS;
let n = 0;
function t(name, fn) { fn(); n++; }

t('topic ids are unique and groups exist', () => {
  const ids = T.map(x => x.id);
  assert.strictEqual(new Set(ids).size, ids.length);
  const groups = GR.map(g => g.id);
  T.forEach(x => assert.ok(groups.includes(x.group), x.id));
  groups.forEach(g => assert.ok(T.some(x => x.group === g), 'empty group ' + g));
});

t('every topic has an about list and the fields the app reads', () => {
  T.forEach(x => {
    assert.ok(x.name && x.about.length, x.id);
    ['aliases', 'patho', 'signs', 'care'].forEach(f => assert.ok(Array.isArray(x[f]), x.id + '.' + f));
  });
});

t('the topics the Learn tab links to exist', () => {
  ['shock-stages', 'perfusion', 'compensation'].forEach(id => assert.ok(T.some(x => x.id === id), id));
});

t('every fact has three distinct wrong answers that differ from the answer', () => {
  F.forEach(f => {
    assert.strictEqual(f.wrong.length, 3, f.q);
    assert.strictEqual(new Set(f.wrong).size, 3, f.q);
    assert.ok(!f.wrong.includes(f.a), f.q);
  });
});

t('ABG interpretation of textbook examples', () => {
  const cases = [
    [7.40, 40, 24, 'Normal ABG'],
    [7.22, 62, 25, 'Uncompensated respiratory acidosis'],
    [7.32, 60, 30, 'Partially compensated respiratory acidosis'],
    [7.37, 55, 32, 'Fully compensated respiratory acidosis'],
    [7.55, 28, 24, 'Uncompensated respiratory alkalosis'],
    [7.48, 30, 20, 'Partially compensated respiratory alkalosis'],
    [7.43, 30, 20, 'Fully compensated respiratory alkalosis'],
    [7.25, 40, 16, 'Uncompensated metabolic acidosis'],
    [7.30, 30, 15, 'Partially compensated metabolic acidosis'],
    [7.36, 30, 17, 'Fully compensated metabolic acidosis'],
    [7.52, 42, 33, 'Uncompensated metabolic alkalosis'],
    [7.49, 48, 35, 'Partially compensated metabolic alkalosis'],
    [7.44, 50, 34, 'Fully compensated metabolic alkalosis'],
    [7.10, 60, 18, 'Combined respiratory and metabolic acidosis'],
    [7.60, 30, 30, 'Combined respiratory and metabolic alkalosis']
  ];
  cases.forEach(([ph, co2, hco3, label]) => assert.strictEqual(ABG.interpret(ph, co2, hco3).label, label, [ph, co2, hco3].join(' ')));
});

t('values that fit no simple pattern are flagged', () => {
  assert.strictEqual(ABG.interpret(7.40, 50, 20).kind, 'unclear');
  assert.strictEqual(ABG.interpret(7.30, 30, 30).kind, 'unclear');
});

t('generated ABGs match their target and are internally consistent', () => {
  ABG.targets.forEach(target => {
    for (let i = 0; i < 50; i++) {
      const g = ABG.generate(target);
      assert.ok(g, 'could not generate ' + target);
      assert.strictEqual(g.ph, ABG.phFrom(g.co2, g.hco3));
      const r = ABG.interpret(g.ph, g.co2, g.hco3);
      assert.strictEqual(r.primary + '/' + (r.comp || ''), target);
      assert.ok(ABG.labels().includes(r.label), r.label);
    }
  });
});

t('there are enough ABG labels for multiple choice', () => {
  assert.strictEqual(new Set(ABG.labels()).size, ABG.targets.length);
});

console.log('patho: ' + n + ' tests passed');
