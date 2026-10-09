/*
 * Med math problem generator (Ch. 14, Medication Administration).
 * Every volume answer is worked with the basic formula, D/H × Q = X.
 * Concentrations are stated in each problem, so answers don't depend on
 * which vial your service stocks.
 */
(function () {
  'use strict';

  var rnd = Math.random;
  function pick(a) { return a[Math.floor(rnd() * a.length)]; }
  function int(lo, hi) { return lo + Math.floor(rnd() * (hi - lo + 1)); }
  function round(x, dp) { var m = Math.pow(10, dp); return Math.round(x * m + 1e-9) / m; }
  function fmt(x) {
    var r = round(x, 3);
    return r.toLocaleString('en-US', { maximumFractionDigits: 3 });
  }

  // D/H × Q, written out.
  function dhSteps(D, H, Q, unit) {
    var x = D / H * Q;
    return [
      'D/H × Q = X',
      'D = ' + fmt(D) + ' ' + unit + ' (desired), H = ' + fmt(H) + ' ' + unit + ' (on hand), Q = ' + fmt(Q) + ' mL',
      fmt(D) + ' ÷ ' + fmt(H) + ' × ' + fmt(Q) + ' = ' + fmt(x) + ' mL'
    ];
  }

  // On-hand stock for "desire over have". unit is the unit of H.
  var STOCK = [
    { drug: 'Epinephrine 1:1,000', H: 1, Q: 1, unit: 'mg', D: [0.3, 0.5, 0.15] },
    { drug: 'Epinephrine 1:10,000', H: 1, Q: 10, unit: 'mg', D: [1, 0.5, 0.1] },
    { drug: 'Adenosine', H: 6, Q: 2, unit: 'mg', D: [6, 12] },
    { drug: 'Amiodarone', H: 150, Q: 3, unit: 'mg', D: [300, 150] },
    { drug: 'Atropine', H: 1, Q: 10, unit: 'mg', D: [0.5, 1] },
    { drug: 'Fentanyl', H: 100, Q: 2, unit: 'mcg', D: [25, 50, 75], alt: { unit: 'mg', f: 0.001 } },
    { drug: 'Morphine', H: 10, Q: 1, unit: 'mg', D: [2, 4, 5] },
    { drug: 'Midazolam', H: 10, Q: 2, unit: 'mg', D: [2, 2.5, 5] },
    { drug: 'Diazepam', H: 10, Q: 2, unit: 'mg', D: [2.5, 5, 10] },
    { drug: 'Diphenhydramine', H: 50, Q: 1, unit: 'mg', D: [25, 50] },
    { drug: 'Naloxone', H: 2, Q: 2, unit: 'mg', D: [0.4, 0.5, 1] },
    { drug: 'Ondansetron', H: 4, Q: 2, unit: 'mg', D: [4, 2] },
    { drug: 'Lidocaine 2%', H: 100, Q: 5, unit: 'mg', D: [50, 75, 100] },
    { drug: 'Dextrose 50%', H: 25, Q: 50, unit: 'g', D: [12.5, 25] },
    { drug: 'Calcium chloride 10%', H: 1, Q: 10, unit: 'g', D: [0.5, 1], alt: { unit: 'mg', f: 1000 } },
    { drug: 'Magnesium sulfate 50%', H: 5, Q: 10, unit: 'g', D: [1, 2] },
    { drug: 'Ketamine', H: 500, Q: 10, unit: 'mg', D: [50, 100, 25] },
    { drug: 'Glucagon', H: 1, Q: 1, unit: 'mg', D: [0.5, 1] }
  ];

  function genDH() {
    var s = pick(STOCK), D = pick(s.D), orderUnit = s.unit, orderD = D;
    // Sometimes the order comes in a different unit, so convert first.
    if (s.alt && rnd() < 0.5) { orderUnit = s.alt.unit; orderD = D * s.alt.f; }
    var steps = [];
    if (orderUnit !== s.unit) steps.push('Convert first: ' + fmt(orderD) + ' ' + orderUnit + ' = ' + fmt(D) + ' ' + s.unit);
    return {
      type: 'dh',
      given: [['Order', s.drug + ' ' + fmt(orderD) + ' ' + orderUnit], ['On hand', fmt(s.H) + ' ' + s.unit + ' in ' + fmt(s.Q) + ' mL']],
      ask: 'How many mL do you give?', unit: 'mL', dp: 2,
      answer: D / s.H * s.Q,
      steps: steps.concat(dhSteps(D, s.H, s.Q, s.unit))
    };
  }

  // Weight-based doses. kg ranges keep doses realistic; peds ones say so.
  var WT = [
    { drug: 'Ketamine', per: 2, unit: 'mg', H: 500, Q: 10, kg: [50, 110], why: 'induction' },
    { drug: 'Rocuronium', per: 1, unit: 'mg', H: 50, Q: 5, kg: [50, 110], why: 'RSI' },
    { drug: 'Succinylcholine', per: 1.5, unit: 'mg', H: 200, Q: 10, kg: [50, 110], why: 'RSI' },
    { drug: 'Etomidate', per: 0.3, unit: 'mg', H: 40, Q: 20, kg: [50, 110], why: 'induction' },
    { drug: 'Lidocaine 2%', per: 1, unit: 'mg', H: 100, Q: 5, kg: [50, 110], why: 'antidysrhythmic' },
    { drug: 'Fentanyl', per: 1, unit: 'mcg', H: 100, Q: 2, kg: [50, 100], why: 'pain' },
    { drug: 'Epinephrine 1:10,000', per: 0.01, unit: 'mg', H: 1, Q: 10, kg: [4, 40], peds: true, why: 'pediatric cardiac arrest' },
    { drug: 'Amiodarone', per: 5, unit: 'mg', H: 150, Q: 3, kg: [5, 40], peds: true, why: 'pediatric VF' },
    { drug: 'Naloxone', per: 0.1, unit: 'mg', H: 2, Q: 2, kg: [4, 20], peds: true, why: 'pediatric overdose' },
    { drug: 'Midazolam', per: 0.1, unit: 'mg', H: 10, Q: 2, kg: [10, 40], peds: true, why: 'pediatric seizure' }
  ];

  function genWt() {
    var s = pick(WT), kg = int(s.kg[0], s.kg[1]), useLb = rnd() < 0.5, steps = [], lb;
    if (useLb) {
      lb = round(kg * 2.2, 0);
      kg = round(lb / 2.2, 1);
      steps.push('Weight: ' + fmt(lb) + ' lb ÷ 2.2 = ' + fmt(kg) + ' kg');
    }
    var D = round(s.per * kg, 2);
    steps.push('Dose: ' + fmt(s.per) + ' ' + s.unit + '/kg × ' + fmt(kg) + ' kg = ' + fmt(D) + ' ' + s.unit);
    return {
      type: 'wtdose',
      given: [
        ['Order', s.drug + ' ' + fmt(s.per) + ' ' + s.unit + '/kg (' + s.why + ')'],
        ['Patient', useLb ? fmt(lb) + ' lb' : fmt(kg) + ' kg'],
        ['On hand', fmt(s.H) + ' ' + s.unit + ' in ' + fmt(s.Q) + ' mL']
      ],
      ask: 'How many mL do you give? (one decimal)', unit: 'mL', dp: 1,
      answer: D / s.H * s.Q,
      steps: steps.concat(dhSteps(D, s.H, s.Q, s.unit))
    };
  }

  var TIMES = [[15, '15 minutes'], [30, '30 minutes'], [60, '1 hour'], [120, '2 hours'], [240, '4 hours'], [480, '8 hours']];
  function genFlow() {
    var vol = pick([100, 250, 500, 1000]), t = pick(TIMES), gtt = pick([10, 15, 20, 60]);
    if (vol >= 500 && t[0] < 30) t = TIMES[3];
    if (rnd() < 0.25) {
      var h = t[0] / 60;
      return {
        type: 'flow',
        given: [['Order', fmt(vol) + ' mL over ' + t[1]]],
        ask: 'What rate do you set on the pump, in mL/hr?', unit: 'mL/hr', dp: 0,
        answer: vol / h,
        steps: ['mL/hr = volume ÷ hours', fmt(vol) + ' mL ÷ ' + fmt(h) + ' hr = ' + fmt(vol / h) + ' mL/hr']
      };
    }
    var x = vol * gtt / t[0];
    return {
      type: 'flow',
      given: [['Order', fmt(vol) + ' mL over ' + t[1]], ['Set', gtt + ' gtt/mL' + (gtt === 60 ? ' (microdrip)' : ' (macrodrip)')]],
      ask: 'How many drops per minute? (round to a whole drop)', unit: 'gtt/min', dp: 0,
      answer: x,
      steps: [
        'gtt/min = volume (mL) × drop factor ÷ time (min)',
        'Time: ' + t[1] + ' = ' + t[0] + ' min',
        fmt(vol) + ' × ' + gtt + ' ÷ ' + t[0] + ' = ' + fmt(x) + (Math.round(x) === round(x, 3) ? '' : ' ≈ ' + Math.round(x)) + ' gtt/min'
      ]
    };
  }

  // Continuous infusions: gtt/min = dose per min × drop factor ÷ concentration per mL.
  var DRIPS = [
    { drug: 'Lidocaine', amt: 1, amtUnit: 'g', vol: 250, unit: 'mg', mult: 1000, doses: [2, 3, 4] },
    { drug: 'Lidocaine', amt: 2, amtUnit: 'g', vol: 500, unit: 'mg', mult: 1000, doses: [2, 3, 4] },
    { drug: 'Epinephrine', amt: 1, amtUnit: 'mg', vol: 250, unit: 'mcg', mult: 1000, doses: [2, 4, 5, 10] },
    { drug: 'Nitroglycerin', amt: 50, amtUnit: 'mg', vol: 250, unit: 'mcg', mult: 1000, doses: [10, 20, 40] },
    { drug: 'Dopamine', amt: 400, amtUnit: 'mg', vol: 250, unit: 'mcg', mult: 1000, doses: [5, 10, 15, 20], perKg: true },
    { drug: 'Dopamine', amt: 800, amtUnit: 'mg', vol: 500, unit: 'mcg', mult: 1000, doses: [2, 5, 10], perKg: true }
  ];
  function genDrip() {
    var s = pick(DRIPS), dose = pick(s.doses), gtt = rnd() < 0.8 ? 60 : pick([10, 15]);
    var conc = s.amt * s.mult / s.vol, steps = [], perMin = dose, kg;
    steps.push('Concentration: ' + fmt(s.amt) + ' ' + s.amtUnit + ' = ' + fmt(s.amt * s.mult) + ' ' + s.unit +
      '; ' + fmt(s.amt * s.mult) + ' ÷ ' + s.vol + ' mL = ' + fmt(conc) + ' ' + s.unit + '/mL');
    if (s.perKg) {
      kg = pick([50, 60, 70, 75, 80, 90, 100]);
      perMin = dose * kg;
      steps.push('Dose per minute: ' + dose + ' ' + s.unit + '/kg/min × ' + kg + ' kg = ' + fmt(perMin) + ' ' + s.unit + '/min');
    }
    var x = perMin * gtt / conc;
    steps.push('gtt/min = dose per min × drop factor ÷ concentration per mL');
    steps.push(fmt(perMin) + ' × ' + gtt + ' ÷ ' + fmt(conc) + ' = ' + fmt(x) + (Math.round(x) === round(x, 3) ? '' : ' ≈ ' + Math.round(x)) + ' gtt/min');
    var given = [
      ['Order', s.drug + ' ' + dose + ' ' + s.unit + (s.perKg ? '/kg' : '') + '/min'],
      ['Mixed', fmt(s.amt) + ' ' + s.amtUnit + ' in ' + s.vol + ' mL'],
      ['Set', gtt + ' gtt/mL']
    ];
    if (s.perKg) given.splice(1, 0, ['Patient', kg + ' kg']);
    return { type: 'drip', given: given, ask: 'How many drops per minute? (round to a whole drop)', unit: 'gtt/min', dp: 0, answer: x, steps: steps };
  }

  var PCT = [['Lidocaine', 2], ['Lidocaine', 1], ['Dextrose', 50], ['Dextrose', 10], ['Calcium chloride', 10], ['Magnesium sulfate', 50], ['Sodium bicarbonate', 8.4]];
  var RATIO = [['1:1,000', 1000], ['1:10,000', 10000]];
  function genConc() {
    var r = rnd();
    if (r < 0.3) {
      var p = pick(PCT);
      return {
        type: 'conc', given: [['Drug', p[0] + ' ' + p[1] + '%']],
        ask: 'How many mg per mL?', unit: 'mg/mL', dp: 1, answer: p[1] * 10,
        steps: ['Percent = grams per 100 mL', p[1] + '% = ' + fmt(p[1]) + ' g in 100 mL = ' + fmt(p[1] * 1000) + ' mg in 100 mL', fmt(p[1] * 1000) + ' ÷ 100 = ' + fmt(p[1] * 10) + ' mg/mL']
      };
    }
    if (r < 0.5) {
      var q = pick(RATIO);
      return {
        type: 'conc', given: [['Drug', 'Epinephrine ' + q[0]]],
        ask: 'How many mg per mL?', unit: 'mg/mL', dp: 2, answer: 1000 / q[1],
        steps: ['Ratio = 1 g in that many mL', q[0] + ' = 1 g (1,000 mg) in ' + fmt(q[1]) + ' mL', '1,000 ÷ ' + fmt(q[1]) + ' = ' + fmt(1000 / q[1]) + ' mg/mL']
      };
    }
    if (r < 0.65) {
      return {
        type: 'conc', given: [['Mix', '1 mL of epinephrine 0.1 mg/mL (1:10,000) added to 9 mL of normal saline']],
        ask: 'Push-dose epi: how many mcg per mL?', unit: 'mcg/mL', dp: 1, answer: 10,
        steps: ['Drug: 1 mL × 0.1 mg/mL = 0.1 mg = 100 mcg', 'Total volume: 1 + 9 = 10 mL', '100 mcg ÷ 10 mL = 10 mcg/mL']
      };
    }
    var m = pick([[400, 'mg', 250, 'mcg'], [1, 'g', 250, 'mg'], [2, 'g', 500, 'mg'], [1, 'mg', 250, 'mcg'], [50, 'mg', 250, 'mcg'], [4, 'g', 250, 'mg'], [150, 'mg', 100, 'mg']]);
    var f = m[1] === m[3] ? 1 : 1000, c = m[0] * f / m[2];
    return {
      type: 'conc', given: [['Mix', fmt(m[0]) + ' ' + m[1] + ' in ' + m[2] + ' mL']],
      ask: 'Concentration in ' + m[3] + '/mL?', unit: m[3] + '/mL', dp: 2, answer: c,
      steps: (f === 1 ? [] : ['Convert: ' + fmt(m[0]) + ' ' + m[1] + ' = ' + fmt(m[0] * f) + ' ' + m[3]])
        .concat([fmt(m[0] * f) + ' ' + m[3] + ' ÷ ' + m[2] + ' mL = ' + fmt(c) + ' ' + m[3] + '/mL'])
    };
  }

  function genLbKg() {
    if (rnd() < 0.75) {
      var lb = int(8, 320);
      return {
        type: 'wt', given: [['Weight', lb + ' lb']], ask: 'Weight in kg? (one decimal)', unit: 'kg', dp: 1, answer: lb / 2.2,
        steps: ['1 kg = 2.2 lb, so divide by 2.2', lb + ' ÷ 2.2 = ' + fmt(round(lb / 2.2, 1)) + ' kg']
      };
    }
    var kg = int(3, 140);
    return {
      type: 'wt', given: [['Weight', kg + ' kg']], ask: 'Weight in lb? (one decimal)', unit: 'lb', dp: 1, answer: kg * 2.2,
      steps: ['1 kg = 2.2 lb, so multiply by 2.2', kg + ' × 2.2 = ' + fmt(kg * 2.2) + ' lb']
    };
  }

  var METRIC = [
    ['g', 'mg', 1000, [0.5, 1, 2, 0.25, 1.5, 0.1]],
    ['mg', 'g', 0.001, [500, 250, 1000, 2000, 125, 50]],
    ['mg', 'mcg', 1000, [0.4, 0.1, 0.05, 1, 0.5, 0.025]],
    ['mcg', 'mg', 0.001, [100, 50, 400, 25, 1000, 250]],
    ['L', 'mL', 1000, [1, 0.5, 0.25, 2, 1.5]],
    ['mL', 'L', 0.001, [250, 500, 100, 1000, 750]],
    ['kg', 'g', 1000, [0.5, 1, 2.5]],
    ['g', 'mcg', 1000000, [0.001, 0.0005, 0.002]]
  ];
  function genMetric() {
    var m = pick(METRIC), v = pick(m[3]), x = v * m[2];
    return {
      type: 'metric', given: [['Convert', fmt(v) + ' ' + m[0]]], ask: 'How many ' + m[1] + '?', unit: m[1], dp: 4, answer: x,
      steps: [(m[2] > 1 ? 'Bigger unit to smaller: multiply by ' + fmt(m[2]) : 'Smaller unit to bigger: divide by ' + fmt(1 / m[2])),
        fmt(v) + ' ' + m[0] + ' = ' + fmt(x) + ' ' + m[1]]
    };
  }

  function genTemp() {
    if (rnd() < 0.5) {
      var F = pick([95, 96.8, 98.6, 100.4, 101, 102.2, 103, 104, 105.8, 90, 86]);
      var C = (F - 32) * 5 / 9;
      return {
        type: 'temp', given: [['Temperature', fmt(F) + ' °F']], ask: 'In °C? (one decimal)', unit: '°C', dp: 1, answer: C,
        steps: ['°C = (°F − 32) × 5/9', '(' + fmt(F) + ' − 32) × 5/9 = ' + fmt(F - 32) + ' × 5/9 = ' + fmt(round(C, 1)) + ' °C']
      };
    }
    var c = pick([35, 36, 37, 38, 38.5, 39, 40, 41, 32, 30]);
    var f = c * 9 / 5 + 32;
    return {
      type: 'temp', given: [['Temperature', fmt(c) + ' °C']], ask: 'In °F? (one decimal)', unit: '°F', dp: 1, answer: f,
      steps: ['°F = (°C × 9/5) + 32', fmt(c) + ' × 9/5 = ' + fmt(c * 9 / 5) + '; + 32 = ' + fmt(f) + ' °F']
    };
  }

  var ETD = [['Epinephrine', 1, 'mg'], ['Naloxone', 0.4, 'mg'], ['Naloxone', 2, 'mg'], ['Atropine', 0.5, 'mg'], ['Atropine', 1, 'mg'], ['Lidocaine', 100, 'mg']];
  function genET() {
    var d = pick(ETD), k = pick([2, 2.5]);
    return {
      type: 'et', given: [['IV dose', d[0] + ' ' + fmt(d[1]) + ' ' + d[2]], ['Use', k + ' × the IV dose']],
      ask: 'What is the ET dose in ' + d[2] + '?', unit: d[2], dp: 2, answer: d[1] * k,
      steps: ['ET dose = 2 to 2.5 × the IV dose (absorption through the tube is unpredictable)', fmt(d[1]) + ' × ' + k + ' = ' + fmt(d[1] * k) + ' ' + d[2], 'Follow it with a saline flush and ventilations']
    };
  }

  var TYPES = [
    { id: 'dh', name: 'Desire over have', blurb: 'D/H × Q = mL to give', gen: genDH },
    { id: 'wtdose', name: 'Weight-based doses', blurb: 'mg/kg, then D/H × Q', gen: genWt },
    { id: 'flow', name: 'IV flow rates', blurb: 'Fluids in gtt/min or mL/hr', gen: genFlow },
    { id: 'drip', name: 'Drug drips', blurb: 'Infusions in gtt/min', gen: genDrip },
    { id: 'conc', name: 'Concentrations', blurb: '%, ratios and mixes', gen: genConc },
    { id: 'wt', name: 'Pounds ↔ kilograms', blurb: '1 kg = 2.2 lb', gen: genLbKg },
    { id: 'metric', name: 'Metric conversions', blurb: 'g, mg, mcg, L, mL', gen: genMetric },
    { id: 'temp', name: 'Temperature', blurb: '°F ↔ °C', gen: genTemp },
    { id: 'et', name: 'ET doses', blurb: '2 to 2.5 × IV dose', gen: genET }
  ];
  var BY = {};
  TYPES.forEach(function (t) { BY[t.id] = t; });

  function make(type) {
    var p = BY[type].gen(), raw = p.answer;
    p.answer = round(raw, p.dp);
    var last = p.steps[p.steps.length - 1];
    if (Math.abs(raw - p.answer) > 1e-9 && last.indexOf(fmt(p.answer)) === -1) p.steps.push('Round: ' + fmt(p.answer) + ' ' + p.unit);
    return p;
  }

  // Parse "0.5", ".5", "1,000", "12 mL". Returns NaN when there's no number.
  function parse(s) {
    var m = String(s == null ? '' : s).replace(/,/g, '').match(/-?\d*\.?\d+/);
    return m ? parseFloat(m[0]) : NaN;
  }
  // Right if it matches the rounded answer to the requested places (half a unit either way).
  function check(p, input) {
    var x = parse(input);
    if (isNaN(x)) return false;
    var tol = 0.5 * Math.pow(10, -p.dp) + 1e-9;
    if (p.dp === 0) tol = 0.5 + 1e-9;
    return Math.abs(x - p.answer) <= tol;
  }

  window.MedMath = {
    TYPES: TYPES, make: make, check: check, parse: parse, fmt: fmt, round: round,
    setRandom: function (f) { rnd = f || Math.random; }
  };
})();
