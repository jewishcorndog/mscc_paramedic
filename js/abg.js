/* Arterial blood gas interpretation and practice-ABG generator.
   Normal ranges: pH 7.35-7.45, PaCO2 35-45 mm Hg, HCO3- 22-26 mEq/L. */
(function () {
  'use strict';

  var NAMES = {
    'resp-acidosis': 'respiratory acidosis', 'resp-alkalosis': 'respiratory alkalosis',
    'metab-acidosis': 'metabolic acidosis', 'metab-alkalosis': 'metabolic alkalosis'
  };
  var COMP = { none: 'Uncompensated', partial: 'Partially compensated', full: 'Fully compensated' };

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function side(v, lo, hi) { return v < lo ? 'low' : v > hi ? 'high' : 'normal'; }

  // Returns { kind, primary, comp, label, steps }. kind is one of
  // 'simple', 'mixed', 'normal' or 'unclear'.
  function interpret(ph, co2, hco3) {
    var p = side(ph, 7.35, 7.45), c = side(co2, 35, 45), b = side(hco3, 22, 26);
    var steps = [];
    steps.push('pH ' + ph.toFixed(2) + ': ' + (p === 'low' ? 'acidosis (below 7.35)' : p === 'high' ? 'alkalosis (above 7.45)' : 'within 7.35 to 7.45'));
    steps.push('PaCO₂ ' + co2 + ': ' + (c === 'high' ? 'high (acid side)' : c === 'low' ? 'low (base side)' : 'normal'));
    steps.push('HCO₃⁻ ' + hco3 + ': ' + (b === 'low' ? 'low (acid side)' : b === 'high' ? 'high (base side)' : 'normal'));
    var out = { kind: 'unclear', primary: null, comp: null, steps: steps };

    if (p !== 'normal') {
      var acid = p === 'low';
      var resp = acid ? c === 'high' : c === 'low';
      var met = acid ? b === 'low' : b === 'high';
      var dir = acid ? 'acidosis' : 'alkalosis';
      if (resp && met) {
        out.kind = 'mixed'; out.primary = acid ? 'mixed-acidosis' : 'mixed-alkalosis';
        out.label = 'Combined respiratory and metabolic ' + dir;
        steps.push('Both values push the pH toward ' + dir + ', so both systems are causing it.');
      } else if (resp || met) {
        out.kind = 'simple';
        out.primary = (resp ? 'resp-' : 'metab-') + dir;
        var other = resp ? b : c;
        // The other system compensates by moving the same direction as the cause's value.
        var compensating = resp ? (acid ? other === 'high' : other === 'low') : (acid ? other === 'low' : other === 'high');
        out.comp = compensating ? 'partial' : other === 'normal' ? 'none' : null;
        if (out.comp === null) { out.kind = 'unclear'; out.primary = null; }
        else {
          out.label = COMP[out.comp] + ' ' + NAMES[out.primary];
          steps.push((resp ? 'PaCO₂' : 'HCO₃⁻') + ' matches the pH, so the cause is ' + (resp ? 'respiratory' : 'metabolic') + '.');
          steps.push(out.comp === 'partial'
            ? (resp ? 'HCO₃⁻' : 'PaCO₂') + ' has moved to offset it, but the pH is still abnormal: partially compensated.'
            : (resp ? 'HCO₃⁻' : 'PaCO₂') + ' is still normal: no compensation yet.');
        }
      }
    } else if (c === 'normal' && b === 'normal') {
      out.kind = 'normal'; out.label = 'Normal ABG';
      steps.push('Everything is in range.');
    } else if (c === 'high' && b === 'high' && ph !== 7.4) {
      out.kind = 'simple'; out.comp = 'full';
      out.primary = ph < 7.4 ? 'resp-acidosis' : 'metab-alkalosis';
    } else if (c === 'low' && b === 'low' && ph !== 7.4) {
      out.kind = 'simple'; out.comp = 'full';
      out.primary = ph < 7.4 ? 'metab-acidosis' : 'resp-alkalosis';
    }
    if (out.comp === 'full') {
      out.label = COMP.full + ' ' + NAMES[out.primary];
      steps.push('Both values are abnormal but the pH is normal, so the body has fully compensated.');
      steps.push('pH is on the ' + (ph < 7.4 ? 'acid' : 'base') + ' side of 7.40, so the original problem is ' + NAMES[out.primary] + '.');
    }
    if (out.kind === 'unclear') {
      out.label = 'Does not fit a simple pattern';
      steps.push('These values don\'t follow one simple disorder; this needs the full picture.');
    }
    return out;
  }

  // pH from PaCO2 and HCO3- (Henderson-Hasselbalch), to two decimals.
  function phFrom(co2, hco3) {
    return Math.round((6.1 + Math.log(hco3 / (0.03 * co2)) / Math.LN10) * 100) / 100;
  }

  var TARGETS = [];
  ['resp-acidosis', 'resp-alkalosis', 'metab-acidosis', 'metab-alkalosis'].forEach(function (p) {
    ['none', 'partial', 'full'].forEach(function (c) { TARGETS.push(p + '/' + c); });
  });
  TARGETS.push('mixed-acidosis/', 'mixed-alkalosis/');

  function keyOf(r) { return r.primary + '/' + (r.comp || ''); }

  // A random, internally consistent ABG for one target pattern.
  function generate(target, rand) {
    rand = rand || Math.random;
    target = target || TARGETS[Math.floor(rand() * TARGETS.length)];
    for (var i = 0; i < 5000; i++) {
      var co2 = 22 + Math.floor(rand() * 44); // 22-65
      var hco3 = 12 + Math.floor(rand() * 27); // 12-38
      var ph = phFrom(co2, hco3);
      if (ph < 7.0 || ph > 7.62 || ph === 7.4) continue;
      var r = interpret(ph, co2, hco3);
      if (r.kind !== 'unclear' && keyOf(r) === target) return { ph: ph, co2: co2, hco3: hco3, result: r };
    }
    return null;
  }

  // Every label a patient could get, for multiple-choice options.
  function allLabels() {
    var out = [];
    TARGETS.forEach(function (t) {
      var parts = t.split('/');
      out.push(parts[1] ? COMP[parts[1]] + ' ' + NAMES[parts[0]] : 'Combined respiratory and metabolic ' + parts[0].split('-')[1]);
    });
    return out;
  }

  // A teaching example for one disturbance: the gas before compensation and
  // after partial compensation (the other system moves pH about 60% of the
  // way back but not into the normal range). Mixed disturbances have none.
  function example(kind, co2, hco3) {
    var before = { co2: co2, hco3: hco3, ph: phFrom(co2, hco3) };
    if (!/^(resp|metab)-/.test(kind)) return { before: before, after: null };
    var acid = before.ph < 7.4;
    var target = before.ph + (7.4 - before.ph) * 0.6;
    target = acid ? Math.min(target, 7.32) : Math.max(target, 7.48);
    var f = Math.pow(10, target - 6.1);
    var after = kind.indexOf('resp') === 0
      ? { co2: co2, hco3: Math.round(0.03 * co2 * f) }
      : { co2: Math.round(hco3 / (0.03 * f)), hco3: hco3 };
    after.ph = phFrom(after.co2, after.hco3);
    return { before: before, after: after };
  }

  window.ABG = { example: example, interpret: interpret, generate: generate, phFrom: phFrom, targets: TARGETS, labels: allLabels, names: NAMES, cap: cap };
})();
