// Run: node tests/acls.test.js
const assert = require('assert');
globalThis.window = globalThis;
require('../js/ecg.js');
require('../js/cardio-data.js');
require('../js/acls-data.js');
const GROUPS = globalThis.ACLS_GROUPS.map(g => g.id);
const ALGOS = globalThis.ACLS_ALGOS;
const DRUGS = globalThis.ACLS_DRUGS;
const FACTS = globalThis.ACLS_FACTS;
const STRIPS = globalThis.ACLS_STRIP_QS;
const CODES = globalThis.ACLS_MEGACODES;
const TN = globalThis.ACLS_TN;
const HT = globalThis.ACLS_HT;
const RHYTHM = {};
globalThis.CARDIO_RHYTHMS.forEach(r => { RHYTHM[r.id] = r.name; });
let n = 0;
function t(name, fn) { try { fn(); n++; } catch (e) { console.error('FAIL: ' + name); throw e; } }

function fourChoices(a, wrong, where) {
  assert.strictEqual(wrong.length, 3, where + ': needs 3 wrong answers');
  assert.strictEqual(new Set([a].concat(wrong)).size, 4, where + ': answers not distinct');
}

t('every item belongs to a known algorithm', () => {
  [].concat(ALGOS, DRUGS, FACTS, STRIPS, CODES, TN).forEach(x => assert(GROUPS.indexOf(x.group) !== -1, JSON.stringify(x).slice(0, 60)));
});

t('one algorithm page per group, with a flowchart whose decisions have branches', () => {
  assert.deepStrictEqual(ALGOS.map(a => a.group), GROUPS);
  function walk(nodes, where) {
    assert(nodes.length, where + ': empty flow');
    nodes.forEach(x => {
      if (x.decide) {
        assert(x.branches.length >= 2, where + ': ' + x.decide);
        x.branches.forEach(b => { assert(b.label); walk(b.steps, where + ' > ' + b.label); });
      } else assert(x.title, where + ': step without a title');
    });
  }
  ALGOS.forEach(a => { assert(a.name && a.source && a.summary, a.id); walk(a.flow, a.id); });
});

t('every algorithm has facts, doses, strips or megacodes to drill', () => {
  GROUPS.forEach(g => {
    assert(FACTS.some(x => x.group === g), 'no facts for ' + g);
    assert(TN.some(x => x.group === g), 'no TN notes for ' + g);
  });
  ['arrest', 'brady', 'tachy'].forEach(g => {
    assert(STRIPS.some(x => x.group === g), 'no strips for ' + g);
    assert(DRUGS.some(x => x.group === g), 'no drugs for ' + g);
  });
});

t('the 2025 AHA doses the algorithms are built on', () => {
  const dose = (name, use) => DRUGS.find(d => d.name === name && d.use.indexOf(use) === 0).dose;
  assert.strictEqual(dose('Epinephrine', 'cardiac arrest'), '1 mg IV/IO every 3–5 min');
  assert.strictEqual(dose('Amiodarone', 'VF / pulseless VT (first'), '300 mg IV/IO bolus');
  assert.strictEqual(dose('Amiodarone', 'VF / pulseless VT (second'), '150 mg IV/IO');
  assert.strictEqual(dose('Atropine', 'symptomatic'), '1 mg IV every 3–5 min, max 3 mg');
  assert.strictEqual(dose('Adenosine', 'stable regular narrow-complex tachycardia (first'), '6 mg rapid IV push with a flush');
  assert.strictEqual(dose('Adenosine', 'stable regular narrow-complex tachycardia (second'), '12 mg rapid IV push');
  assert(DRUGS.find(d => d.name === 'Adenosine' && /12 mg/.test(d.tn)), 'TN adenosine 12 mg note');
});

t('drugs are unique and have dose distractors', () => {
  const keys = DRUGS.map(d => d.name + ' ' + d.use);
  assert.strictEqual(new Set(keys).size, keys.length);
  DRUGS.forEach(d => fourChoices(d.dose, d.wrong, d.name));
});

t('facts and strip questions have three distinct wrong answers', () => {
  FACTS.forEach(f => fourChoices(f.a, f.wrong, f.q));
  STRIPS.forEach(s => { fourChoices(s.a, s.wrong, s.ctx); assert(s.why); });
});

t('every strip is one js/ecg.js can draw', () => {
  STRIPS.forEach(s => assert(globalThis.ECG.ids.indexOf(s.rhythm) !== -1, s.rhythm));
  CODES.forEach(c => c.stages.forEach(st => assert(globalThis.ECG.ids.indexOf(st.rhythm) !== -1, c.id + ' ' + st.rhythm)));
});

t('megacodes: unique ids, complete stages, valid rhythm calls', () => {
  assert(CODES.length >= 6);
  assert.strictEqual(new Set(CODES.map(c => c.id)).size, CODES.length);
  CODES.forEach(c => {
    assert(c.name && c.path && c.patient && c.debrief.length, c.id);
    assert(c.stages.length >= 2, c.id + ' stages');
    c.stages.forEach((st, i) => {
      const where = c.id + ' stage ' + (i + 1);
      assert(st.title && st.text && st.vitals.length && st.q.length, where);
      st.vitals.forEach(v => assert.strictEqual(v.length, 2, where + ' vitals'));
      st.q.forEach(q => { fourChoices(q.a, q.wrong, where + ': ' + q.ask); assert(q.why, where + ' why'); });
      if (st.callRhythm) {
        const name = st.label || RHYTHM[st.rhythm];
        assert(name, where + ' rhythm name');
        fourChoices(name, st.rhythmWrong, where + ' rhythm');
      }
    });
  });
});

t('the H\'s and T\'s are all there', () => {
  assert.strictEqual(HT.h.length, 5);
  assert.strictEqual(HT.t.length, 5);
  HT.h.concat(HT.t).forEach(x => assert(x.name && x.clues && x.fix, x.name));
});

t('TN comparisons name both sides', () => {
  TN.forEach(x => assert(x.topic && x.aha && x.tnText, x.topic));
  assert.strictEqual(new Set(TN.map(x => x.topic)).size, TN.length);
});

console.log(n + ' ACLS tests passed');
