/* Drug Box Learn and Math tabs: pharmacology principles (Ch. 13) and
   medication administration and med math (Ch. 14). Registers its views in
   window.PHARM_VIEWS, which app.js adds to the Pharmacology tabs. */
(function () {
  'use strict';

  var TOPICS = window.PHARM_TOPICS;
  var RATES = window.PHARM_RATES;
  var ROUTES = window.PHARM_ROUTES;
  var RECEPTORS = window.PHARM_RECEPTORS;
  var DRUG_REC = window.PHARM_DRUG_RECEPTORS;
  var TERMS = window.PHARM_TERMS;
  var FACTS = window.PHARM_FACTS;
  var CLASS_GROUPS = window.PHARM_CLASS_GROUPS;
  var MM = window.MedMath;
  var TOPIC_IDS = TOPICS.map(function (t) { return t.id; });

  function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  TERMS.forEach(function (t) { t.id = 'term-' + slug(t.term); });
  FACTS.forEach(function (f, i) { f.id = 'fact-' + f.topic + '-' + i; });

  // ---------- Saved state ----------
  var KEY = 'mscc-pharmlearn-v1';
  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  var S = Object.assign({
    mode: 'read',
    page: 'routes',
    topics: TOPIC_IDS.slice(),
    decks: { terms: true, facts: true, routes: true, receptors: true },
    quizLen: 15,
    mathMode: 'practice',
    mathTypes: { dh: true, wtdose: true, flow: true, drip: true, conc: true, wt: true, metric: false, temp: false, et: false },
    mathLen: 10,
    stats: { topics: {}, math: {}, items: {} }
  }, loadSaved());
  S.topics = S.topics.filter(function (t) { return TOPIC_IDS.indexOf(t) !== -1; });
  ['topics', 'math', 'items'].forEach(function (k) { S.stats[k] = S.stats[k] || {}; });

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked */ }
  }
  function bump(bucket, id, ok) {
    var s = S.stats[bucket][id] || (S.stats[bucket][id] = { c: 0, w: 0 });
    if (ok) s.c++; else s.w++;
  }
  function record(item, ok) {
    bump('topics', item.topic, ok);
    bump('items', item.id, ok);
    save();
  }
  function accPill(s) {
    if (!s || !(s.c + s.w)) return '<span class="pill none">–</span>';
    var p = s.c / (s.c + s.w);
    return '<span class="pill ' + (p >= 0.8 ? 'high' : p >= 0.5 ? 'mid' : 'low') + '">' + Math.round(p * 100) + '%</span>';
  }

  // ---------- Helpers ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function seg(name, value, options) {
    return '<div class="seg" role="group">' + options.map(function (o) {
      return '<button data-seg="' + name + '" data-val="' + esc(o[0]) + '" aria-pressed="' + (String(value) === String(o[0])) + '">' + esc(o[1]) + '</button>';
    }).join('') + '</div>';
  }
  function listHtml(list) {
    return '<ul class="items">' + list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
  }
  function band(title, meta, hidden) {
    if (hidden) return '<div class="label-band hidden-name rx"><span class="label-name">? ? ?</span><span class="label-meta">' + esc(meta || 'Which one?') + '</span></div>';
    return '<div class="label-band rx"><span class="label-name">' + esc(title) + '</span><span class="label-meta">' + esc(meta || '') + '</span></div>';
  }
  var STD = ' <span class="std-mark" title="Goes beyond the Chapter 13 and 14 slides">*</span>';
  function std(x) { return x.std ? STD : ''; }
  function topicName(id) {
    for (var i = 0; i < TOPICS.length; i++) if (TOPICS[i].id === id) return TOPICS[i].name;
    return '';
  }
  function rateClass(r) { return r ? 'rate rate-' + r.toLowerCase() : 'rate rate-none'; }
  function rateTag(r) { return '<span class="' + rateClass(r) + '">' + esc(r || 'Not rated') + '</span>'; }
  function inTopics(x) { return S.topics.indexOf(x.topic) !== -1; }
  function mcFrom(correct, pool) {
    var opts = [correct];
    shuffle(pool).forEach(function (p) { if (opts.length < 4 && opts.indexOf(p) === -1) opts.push(p); });
    var s = shuffle(opts);
    return { options: s, answer: s.indexOf(correct) };
  }
  function topicChips() {
    return '<div class="field-row"><p class="eyebrow">Topics</p><div class="chips">' + TOPICS.map(function (t) {
      return '<button class="chip" data-topic="' + t.id + '" aria-pressed="' + (S.topics.indexOf(t.id) !== -1) + '">' + esc(t.name) + '</button>';
    }).join('') + '</div></div>';
  }
  function toggleTopic(id) {
    var i = S.topics.indexOf(id);
    if (i === -1) S.topics.push(id); else S.topics.splice(i, 1);
    save();
  }
  function gotoDrug(name) {
    var tab = $('#tab-drugs');
    if (!tab) return;
    tab.click();
    var q = $('#ref-q');
    if (!q) return;
    q.value = name;
    q.dispatchEvent(new Event('input', { bubbles: true }));
    var d = $('#ref-list details');
    if (d) d.open = true;
    window.scrollTo(0, 0);
  }

  // =====================================================================
  // Learn tab: Read / Cards / Quiz
  // =====================================================================
  var learnEl = $('#view-learn');

  function learnRender() {
    var head = '<div><h2 class="title">Principles &amp; administration</h2><p class="lede">Chapter 13 (principles of pharmacology) and Chapter 14 (medication administration). ' +
      'Items marked * go beyond the slides.</p></div>' +
      seg('mode', S.mode, [['read', 'Read'], ['cards', 'Cards'], ['quiz', 'Quiz']]);
    if (S.mode === 'cards') { learnEl.innerHTML = head + '<div id="lp-body"></div>'; return C ? cardsRender() : cardsSetup(); }
    if (S.mode === 'quiz') { learnEl.innerHTML = head + '<div id="lp-body"></div>'; return Q ? quizRender() : quizSetup(); }
    learnEl.innerHTML = head +
      seg('page', S.page, TOPICS.map(function (t) { return [t.id, t.name]; })) +
      '<div id="lp-body" class="lp-page">' + PAGES[S.page]() + '</div>';
  }
  function body() { return $('#lp-body', learnEl); }

  // ---------- Read pages ----------
  function ladder() {
    return '<div class="ladder">' + RATES.map(function (r) {
      var list = ROUTES.filter(function (x) { return x.rate === r; });
      return '<div class="rung"><p class="' + rateClass(r) + '">' + r + '</p><ul>' + list.map(function (x) {
        return '<li><button class="btn link" data-route="' + x.id + '">' + esc(x.name) + '</button></li>';
      }).join('') + '</ul></div>';
    }).join('') + '</div>';
  }
  function pageRoutes() {
    return '<div class="panel"><p class="eyebrow">Rate of absorption (Table 13-2)</p>' + ladder() +
      '<p class="small muted">Fastest on the left. The route changes how fast the drug starts working and can change the response. Intradermal and rectal are not rated in the table.</p></div>' +
      '<div class="panel"><p class="eyebrow">What sets the rate and extent of absorption</p>' +
      listHtml(['Nature of the absorbing surface the drug must cross', 'Blood flow to the site', 'Solubility of the drug', 'pH of the drug environment', 'Drug concentration', 'Form of the dosage']) + '</div>' +
      '<div class="table-wrap"><table class="grid basics"><thead><tr><th>Route</th><th>Type</th><th>Absorption</th></tr></thead><tbody>' +
      ROUTES.map(function (r) {
        return '<tr><td><button class="btn link" data-route="' + r.id + '">' + esc(r.name) + '</button></td><td>' + esc(r.kind) + '</td><td>' + rateTag(r.rate) +
          (r.rateNote ? ' <span class="small muted">' + esc(r.rateNote) + '</span>' : '') + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<div class="ref-list">' + ROUTES.map(function (r) {
        return '<details class="ref" id="route-' + r.id + '"><summary><span class="r-name">' + esc(r.name) + '</span><span class="r-sub">' + esc(r.kind) + ' · ' + esc(r.rate || 'not rated in Table 13-2') + '</span></summary>' +
          '<div class="ref-body">' + listHtml(r.points) + '</div></details>';
      }).join('') + '</div>';
  }

  // Plasma concentration over time, drawn after the textbook's figure.
  function curveSvg() {
    var W = 320, H = 180, x0 = 34, y0 = 150, xs = 22, ys = 6.5;
    function X(h) { return x0 + h * xs; }
    function Y(c) { return y0 - c * ys; }
    var pts = [];
    for (var t = 0; t <= 12.5; t += 0.25) {
      var c = 17 * Math.pow(t / 5, 3) * Math.exp(3 * (1 - t / 5));
      pts.push(X(t).toFixed(1) + ',' + Y(c).toFixed(1));
    }
    return '<svg class="pk-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Plasma drug concentration over time: absorption rises to a peak, then distribution and elimination; the drug works while above the minimum effective concentration and below the toxic level">' +
      '<rect class="pk-range" x="' + x0 + '" y="' + Y(20) + '" width="' + (W - x0 - 8) + '" height="' + (Y(6) - Y(20)) + '"></rect>' +
      '<line class="pk-axis" x1="' + x0 + '" y1="' + y0 + '" x2="' + (W - 8) + '" y2="' + y0 + '"></line>' +
      '<line class="pk-axis" x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="10"></line>' +
      '<line class="pk-tox" x1="' + x0 + '" y1="' + Y(20) + '" x2="' + (W - 8) + '" y2="' + Y(20) + '"></line>' +
      '<line class="pk-mec" x1="' + x0 + '" y1="' + Y(6) + '" x2="' + (W - 8) + '" y2="' + Y(6) + '"></line>' +
      '<text class="pk-lbl end" x="' + (W - 10) + '" y="' + (Y(20) - 3) + '">Toxic level</text>' +
      '<text class="pk-lbl end" x="' + (W - 10) + '" y="' + (Y(6) + 9) + '">Minimum effective conc.</text>' +
      '<text class="pk-lbl end" x="' + (W - 10) + '" y="' + (Y(18) + 3) + '">Therapeutic range</text>' +
      '<polyline class="pk-curve" points="' + pts.join(' ') + '"></polyline>' +
      '<text class="pk-lbl mid" x="' + X(5) + '" y="' + (Y(17) - 5) + '">Peak</text>' +
      '<text class="pk-lbl end" x="' + X(2.5) + '" y="' + Y(11) + '">Absorption</text>' +
      '<text class="pk-lbl" x="' + X(8.1) + '" y="' + Y(13.5) + '">Elimination</text>' +
      '<line class="pk-tick" x1="' + X(2) + '" y1="' + (y0 + 2) + '" x2="' + X(2) + '" y2="' + (y0 + 18) + '"></line>' +
      '<line class="pk-tick" x1="' + X(10) + '" y1="' + (y0 + 2) + '" x2="' + X(10) + '" y2="' + (y0 + 18) + '"></line>' +
      '<text class="pk-lbl mid" x="' + X(1) + '" y="' + (y0 + 14) + '">Onset</text>' +
      '<text class="pk-lbl mid" x="' + X(5.9) + '" y="' + (y0 + 14) + '">Duration of action</text>' +
      '<text class="pk-lbl mid" x="' + X(11.2) + '" y="' + (y0 + 14) + '">Ends</text>' +
      '<text class="pk-ax" x="' + (x0 - 4) + '" y="16" transform="rotate(-90 ' + (x0 - 22) + ' 80)">Plasma level</text>' +
      '</svg>';
  }
  function termList(topic) {
    return '<dl class="rules">' + TERMS.filter(function (t) { return t.topic === topic; }).map(function (t) {
      return '<dt>' + esc(t.term) + std(t) + '</dt><dd>' + esc(t.def) + '</dd>';
    }).join('') + '</dl>';
  }
  function pageKinetics() {
    return '<div class="phases">' +
      '<div class="phase"><p class="eyebrow">1 · Pharmaceutical</p><p>The drug\'s form dissolves. Faster dissolution means faster absorption.</p></div>' +
      '<div class="phase"><p class="eyebrow">2 · Pharmacokinetic</p><p>What the body does to the drug: <strong>A</strong>bsorption, <strong>D</strong>istribution, <strong>B</strong>iotransformation (<strong>M</strong>etabolism), <strong>E</strong>xcretion.</p></div>' +
      '<div class="phase"><p class="eyebrow">3 · Pharmacodynamic</p><p>What the drug does to the body, mostly by binding receptors.</p></div></div>' +
      '<div class="panel"><p class="eyebrow">Drug level over time</p>' + curveSvg() +
      '<p class="small muted">The drug works between the minimum effective concentration and the toxic level. Half-life (time to clear 50%) sets how often it is given; therapeutic index (lethal dose ÷ effective dose) says how safe it is.</p></div>' +
      '<div class="panel"><p class="eyebrow">Distribution</p>' + listHtml([
        'Rate depends on how permeable the capillaries are to the drug',
        'Lipid-soluble drugs enter tissues readily; lipid-insoluble drugs take longer',
        'Organs with a rich blood supply get the drug first',
        'Reservoirs: drugs can bind tissues and be stored there',
        'Barriers: the blood-brain barrier and the placental barrier'
      ]) + '<p class="eyebrow">Biotransformation and excretion</p>' + listHtml([
        'Biotransformation turns drugs into metabolites to detoxify them and make them less active',
        'Excretion is mainly by the kidneys; also intestine, lungs, sweat, salivary and mammary glands'
      ]) + '</div>' +
      '<div class="panel"><p class="eyebrow">Factors that change how a drug acts</p><p>Age · body mass · sex · environment · time of administration · pathologic state · genetics · psychological factors</p>' +
      '<p class="eyebrow">Special patients</p>' + listHtml([
        'Pregnant: weigh benefit against risk to the fetus; check the FDA label',
        'Pediatric and older adults: absorption, distribution, biotransformation and elimination all differ',
        'Older adults: several diseases and drugs, nutrition problems, slower metabolism, missed doses'
      ]) + '<p class="eyebrow">Drug interactions</p><p>Intestinal absorption · plasma protein binding · biotransformation · receptor site · renal excretion · electrolytes. Also food, alcohol and smoking. Ask medical direction before giving drugs together.</p></div>' +
      '<div class="panel"><p class="eyebrow">Terms</p>' + termList('kinetics') + '</div>';
  }

  function ansSvg() {
    // Three pathways like Figure 13 (A, B, C): pre- and postganglionic fibers with their transmitters.
    function row(y, label, gx, post, postRec) {
      return '<text class="ans-row" x="4" y="' + (y + 4) + '">' + label + '</text>' +
        '<line class="ans-fiber" x1="70" y1="' + y + '" x2="' + (gx - 9) + '" y2="' + y + '"></line>' +
        '<circle class="ans-gang" cx="' + gx + '" cy="' + y + '" r="9"></circle>' +
        '<text class="ans-tx" x="' + gx + '" y="' + (y - 13) + '">ACh → nicotinic</text>' +
        '<line class="ans-fiber post" x1="' + (gx + 9) + '" y1="' + y + '" x2="290" y2="' + y + '"></line>' +
        '<rect class="ans-organ" x="292" y="' + (y - 9) + '" width="24" height="18" rx="4"></rect>' +
        '<text class="ans-tx end" x="288" y="' + (y - 13) + '">' + post + ' → ' + postRec + '</text>';
    }
    return '<svg class="ans-svg" viewBox="0 0 320 150" role="img" aria-label="Autonomic pathways: in both divisions the preganglionic fiber releases acetylcholine at nicotinic receptors in the ganglion. Sympathetic postganglionic fibers release norepinephrine at alpha and beta receptors (acetylcholine at muscarinic receptors for sweat glands). Parasympathetic postganglionic fibers release acetylcholine at muscarinic receptors.">' +
      '<text class="ans-head" x="70" y="12">CNS</text><text class="ans-head end" x="316" y="12">Organ</text>' +
      row(42, 'Sympathetic', 130, 'NE', 'alpha / beta') +
      row(86, 'Sweat glands', 130, 'ACh', 'muscarinic') +
      row(130, 'Parasympath.', 245, 'ACh', 'musc.') +
      '</svg>';
  }
  function pageReceptors() {
    return '<div class="panel"><p class="eyebrow">Autonomic nervous system</p>' + ansSvg() +
      listHtml([
        'Almost every organ gets fibers from both divisions; one augments a function, the other inhibits it',
        'Sympathetic = adrenergic: alpha and beta receptors (norepinephrine)',
        'Parasympathetic = cholinergic: nicotinic and muscarinic receptors (acetylcholine)',
        'Sympathetic ganglia sit near the spinal cord (short preganglionic fiber); parasympathetic ganglia sit near the organ (long preganglionic fiber)',
        'Skeletal muscle contracts through nicotinic cholinergic transmission (neuromuscular blockers act here)'
      ]) + '</div>' +
      '<div class="panel"><p class="eyebrow">Drugs that affect the ANS: four groups</p><dl class="rules">' +
      '<dt>Cholinergic</dt><dd>Mimic ACh (parasympathomimetic)</dd>' +
      '<dt>Cholinergic blocking</dt><dd>Block ACh (anticholinergic): atropine</dd>' +
      '<dt>Adrenergic</dt><dd>Mimic the sympathetic division (sympathomimetic): epinephrine, albuterol</dd>' +
      '<dt>Adrenergic blocking</dt><dd>Block alpha or beta (sympatholytic): beta blockers</dd></dl></div>' +
      '<div class="ref-list">' + RECEPTORS.map(function (r) {
        return '<details class="ref"><summary><span class="r-name">' + esc(r.name) + std(r) + '</span><span class="r-sub">' + esc(r.division) + ' · ' + esc(r.nt) + '</span></summary>' +
          '<div class="ref-body"><dl class="rules"><dt>Where</dt><dd>' + esc(r.where) + '</dd><dt>Effects</dt><dd>' + esc(r.effects.join('; ')) + '</dd><dt>Drugs</dt><dd>' + esc(r.drugs) + '</dd></dl></div></details>';
      }).join('') + '</div>' +
      '<div class="panel"><p class="eyebrow">Your drug box at the receptor' + STD + '</p><div class="table-wrap"><table class="grid basics"><thead><tr><th>Drug</th><th>Action</th><th>Receptor</th><th>Effect</th></tr></thead><tbody>' +
      DRUG_REC.map(function (d) {
        return '<tr><td><button class="btn link" data-drug="' + esc(d.name) + '">' + esc(d.name) + '</button></td><td>' + esc(d.action) + '</td><td>' + esc(d.receptor) + '</td><td>' + esc(d.effect) + '</td></tr>';
      }).join('') + '</tbody></table></div>' +
      '<p class="small muted">Memory aid: beta-1, one heart; beta-2, two lungs.</p></div>' +
      '<div class="panel"><p class="eyebrow">Terms</p>' + termList('receptors') + '</div>';
  }

  function pageClasses() {
    return CLASS_GROUPS.map(function (g) {
      return '<div class="panel"><p class="eyebrow">' + esc(g.name) + '</p><dl class="rules">' + g.items.map(function (i) {
        return '<dt>' + esc(i[0]) + '</dt><dd>' + esc(i[1]) + '</dd>';
      }).join('') + '</dl></div>';
    }).join('') + '<div class="panel"><p class="eyebrow">Definitions</p>' + termList('classes') + '</div>' +
      '<div class="panel"><p class="eyebrow">Parts of a drug profile</p><p>Names · classification · mechanism of action · indications · pharmacokinetics · side and adverse effects · dosages · routes · contraindications · special considerations · storage</p>' +
      '<p class="small muted">Temperature, light, moisture and shelf life all affect potency.</p></div>';
  }

  function angleIcon(deg) {
    var r = deg * Math.PI / 180, x = 6 + 36 * Math.cos(r), y = 34 - 36 * Math.sin(r);
    return '<svg class="angle" viewBox="0 0 48 40" aria-hidden="true"><line class="skin" x1="2" y1="34" x2="46" y2="34"></line>' +
      '<line class="needle" x1="' + x.toFixed(1) + '" y1="' + Math.max(y, 2).toFixed(1) + '" x2="6" y2="34"></line></svg>';
  }
  function pageAdmin() {
    var angles = [['Intradermal', '10° to 15°', 12, 'Skin taut; bevel just under the skin'], ['Subcutaneous', '45°', 45, 'Pinch the tissue; bevel up'],
      ['Intramuscular', '90°', 90, 'Skin taut, not pinched; aspirate'], ['Peripheral IV', '35° to 45°', 40, 'Stabilize the vein; bevel up']];
    return '<div class="panel"><p class="eyebrow">Six rights</p><p class="rights">Right <strong>patient</strong> · right <strong>drug</strong> · right <strong>dose</strong> · right <strong>route</strong> · right <strong>time</strong> · <strong>documentation</strong></p>' +
      listHtml(['Repeat orders back; ask again if anything is unclear', 'Check allergies', 'Read the label against the order at least 3 times', 'Never give from an unlabeled container or a drug someone else drew up unlabeled',
        'Label each syringe right away when preparing more than one', 'Never give an expired drug', 'Unsure of the math? Have a coworker check it', 'If anyone voices doubt, recheck',
        'Medication cross-check before every drug']) + '</div>' +
      '<div class="table-wrap"><table class="grid basics"><thead><tr><th>Injection</th><th>Angle</th><th></th><th>Technique</th></tr></thead><tbody>' +
      angles.map(function (a) { return '<tr><td>' + a[0] + '</td><td class="mono">' + a[1] + '</td><td>' + angleIcon(a[2]) + '</td><td>' + a[3] + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<div class="panel"><p class="eyebrow">Containers</p>' + listHtml([
        'Vial: clean the stopper, inject air equal to the volume you will withdraw, withdraw, expel air',
        'Ampule: tap the neck, snap the top, draw through a filter needle or straw, then change needles',
        'Mixing two drugs: one syringe, air into both vials first, new needle between vials',
        'Prefilled syringe: remove both caps, screw the cartridge in, expel air',
        'Skin prep: chlorhexidine up-and-down then side-to-side; other products in circles moving outward; let it dry'
      ]) + '</div>' +
      '<div class="panel"><p class="eyebrow">IV complications</p><dl class="rules">' +
      '<dt>Local</dt><dd>Hematoma, thrombosis, thromboembolism, cellulitis, phlebitis, sloughing, necrosis, infiltration</dd>' +
      '<dt>Systemic</dt><dd>Sepsis, pulmonary embolism, catheter fragment embolism, arterial puncture, air embolism</dd>' +
      '<dt>Infiltration</dt><dd>Lower the bag below the site and look for backflow of blood</dd>' +
      '<dt>Air embolism</dt><dd>Close the tubing, turn the patient onto the left side head down, check for leaks, 100% oxygen, notify medical direction. Signs: hypotension, cyanosis, weak rapid pulse, loss of consciousness</dd></dl></div>' +
      '<div class="panel"><p class="eyebrow">Medication errors</p><p class="small muted">Common causes: wrong dose ordered, wrong math, wrong route, wrong patient, wrong drug.</p>' +
      '<ol class="items"><li>Accept responsibility</li><li>Advise medical direction right away</li><li>Assess and monitor the patient</li><li>Document the error</li><li>Change your practice to avoid it again</li><li>Follow agency QI procedures</li></ol></div>' +
      '<div class="panel"><p class="eyebrow">Special patients</p><dl class="rules">' +
      '<dt>Older adults</dt><dd>Doses may be lower; less saliva slows SL drugs; less muscle may need a shorter needle or another IM site; Z-track; hard veins; fragile skin (use transparent film)</dd>' +
      '<dt>Children</dt><dd>Dose by weight in kg and double-check it; be honest; let caregivers help; give injections quickly. The smaller the child, the smaller the margin for error</dd></dl></div>' +
      '<div class="panel"><p class="eyebrow">Asepsis and sharps</p>' + listHtml([
        'Medical asepsis is "clean" technique, not sterile',
        'Disinfectants are for objects only; antiseptics are for skin',
        'Don\'t recap, bend or break needles; drop the whole syringe in a puncture-proof, leak-proof sharps container'
      ]) + '</div>' +
      '<div class="panel"><p class="eyebrow">Terms</p>' + termList('admin') + '</div>';
  }

  var PAGES = { routes: pageRoutes, kinetics: pageKinetics, receptors: pageReceptors, classes: pageClasses, admin: pageAdmin };

  // ---------- Cards ----------
  var C = null;
  var DECKS = [
    ['terms', 'Terms', 'Pharmacokinetics, receptors, drug classes, technique'],
    ['facts', 'Key facts', 'Short questions on the main points'],
    ['routes', 'Routes', 'Rate of absorption and key points for each route'],
    ['receptors', 'Receptors', 'Receptors and what your drug box does at them']
  ];
  function buildCards() {
    var list = [], d = S.decks;
    if (d.terms) TERMS.filter(inTopics).forEach(function (t) { list.push({ kind: 'term', item: t, rev: Math.random() < 0.5 }); });
    if (d.facts) FACTS.filter(inTopics).forEach(function (f) { list.push({ kind: 'fact', item: f }); });
    if (d.routes && S.topics.indexOf('routes') !== -1) ROUTES.forEach(function (r) { list.push({ kind: 'route', item: { id: 'route-' + r.id, topic: 'routes', r: r } }); });
    if (d.receptors && S.topics.indexOf('receptors') !== -1) {
      RECEPTORS.forEach(function (r) { list.push({ kind: 'receptor', item: { id: 'rec-' + r.id, topic: 'receptors', r: r, std: r.std } }); });
      DRUG_REC.forEach(function (r) { list.push({ kind: 'drugrec', item: { id: 'drugrec-' + r.drug, topic: 'receptors', r: r, std: true } }); });
    }
    return shuffle(list);
  }
  function cardsSetup() {
    var n = buildCards().length;
    body().innerHTML =
      '<div class="panel"><div class="field-row"><p class="eyebrow">Decks</p><div class="deck-list">' +
      DECKS.map(function (k) {
        return '<label class="check deck"><input type="checkbox" data-deck="' + k[0] + '"' + (S.decks[k[0]] ? ' checked' : '') + '> <span><strong>' + esc(k[1]) +
          '</strong><span class="muted small">' + esc(k[2]) + '</span></span></label>';
      }).join('') + '</div></div>' + topicChips() +
      '<div><button class="btn primary big" data-act="lp-start-cards"' + (n ? '' : ' disabled') + '>Start ' + n + ' cards</button></div></div>';
  }
  function cardFace(card, flipped) {
    var x = card.item, hint = '<p class="hint">Tap to flip</p>', g = topicName(x.topic);
    function back(html) { return flipped ? '<hr class="divider">' + html : hint; }
    if (card.kind === 'term') {
      if (card.rev) {
        return band(x.term, g, !flipped) + '<div class="card-body"><p class="answer">' + esc(x.def) + std(x) + '</p>' + (flipped ? '' : '<p class="hint">Which term? Tap to flip</p>') + '</div>';
      }
      return band(x.term, g) + '<div class="card-body"><p class="ask">What does it mean?</p>' + back('<p class="answer">' + esc(x.def) + std(x) + '</p>') + '</div>';
    }
    if (card.kind === 'fact') {
      return band('Key fact', g) + '<div class="card-body"><p class="ask">' + esc(x.q) + std(x) + '</p>' + back('<p class="answer">' + esc(x.a) + '</p>') + '</div>';
    }
    if (card.kind === 'route') {
      return band(x.r.name, x.r.kind) + '<div class="card-body"><p class="ask">Rate of absorption and key points?</p>' +
        back('<p class="answer">' + rateTag(x.r.rate) + (x.r.rateNote ? ' <span class="small muted">' + esc(x.r.rateNote) + '</span>' : '') + '</p>' + listHtml(x.r.points)) + '</div>';
    }
    if (card.kind === 'receptor') {
      return band(x.r.name, x.r.division) + '<div class="card-body"><p class="ask">Where is it and what does it do?' + std(x) + '</p>' +
        back('<dl class="rules"><dt>Transmitter</dt><dd>' + esc(x.r.nt) + '</dd><dt>Where</dt><dd>' + esc(x.r.where) + '</dd><dt>Effects</dt><dd>' + esc(x.r.effects.join('; ')) + '</dd><dt>Drugs</dt><dd>' + esc(x.r.drugs) + '</dd></dl>') + '</div>';
    }
    return band(x.r.name, 'At the receptor') + '<div class="card-body"><p class="ask">Which receptor, and agonist or antagonist?' + STD + '</p>' +
      back('<p class="answer">' + esc(x.r.action) + ' · ' + esc(x.r.receptor) + '</p><p class="small">' + esc(x.r.effect) + '</p>') + '</div>';
  }
  function cardsRender() {
    if (!C.queue.length) return cardsDone();
    var card = C.queue[0], done = C.total - C.queue.length;
    body().innerHTML =
      '<div class="view"><div class="progress-line"><span>Card ' + (done + 1) + ' of ' + C.total + '</span><span>' + C.again.length + ' to see again</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(done / C.total * 100) + '%"></span></div>' +
      '<div class="card" role="button" tabindex="0" data-act="lp-flip">' + cardFace(card, C.flipped) + '</div>' +
      (C.flipped
        ? '<div class="btn-grid"><button class="btn bad big" data-act="lp-miss">Missed it</button><button class="btn good big" data-act="lp-got">Got it</button></div>'
        : '<div class="btn-grid"><button class="btn big" data-act="lp-quit">End round</button><button class="btn primary big" data-act="lp-flip">Show answer</button></div>') +
      '<p class="kbd-hint">Keys: Space flips · 1 missed · 2 got it</p></div>';
  }
  function cardAnswer(ok) {
    var card = C.queue.shift(), id = card.item.id;
    if (C.again.indexOf(id) === -1) {
      record(card.item, ok);
      if (ok) C.firstTry++;
      else { C.again.push(id); C.missed.push(card); }
    }
    if (!ok) C.queue.splice(Math.min(C.queue.length, 3 + Math.floor(Math.random() * 3)), 0, card);
    else C.again = C.again.filter(function (x) { return x !== id; });
    C.flipped = false;
    cardsRender();
  }
  function cardLabel(card) {
    var x = card.item;
    return card.kind === 'term' ? x.term : card.kind === 'fact' ? x.q : x.r.name;
  }
  function cardsDone() {
    var missed = C.missed;
    body().innerHTML =
      '<div class="panel"><p class="eyebrow">Round complete</p><p class="score-big">' + C.firstTry + ' / ' + C.total + '</p><p class="muted">right on the first try</p>' +
      (missed.length ? '<p class="eyebrow">Missed</p><ul class="missed-list">' + missed.map(function (c) { return '<li>' + esc(cardLabel(c)) + '</li>'; }).join('') + '</ul>' : '') +
      '<div class="row"><button class="btn primary" data-act="lp-start-cards">New round</button><button class="btn" data-act="lp-setup-cards">Change decks</button></div></div>';
    C = null;
  }

  // ---------- Quiz ----------
  var Q = null;
  function routeQ() {
    var rated = ROUTES.filter(function (r) { return r.rate; });
    if (Math.random() < 0.6) {
      var r = pick(rated), opts = RATES.slice();
      return { id: 'route-' + r.id, topic: 'routes', prompt: 'Rate of absorption for <q>' + esc(r.name) + '</q> (Table 13-2)?', options: opts, answer: opts.indexOf(r.rate), why: r.rateNote || '' };
    }
    // Fastest or slowest of routes with different rates.
    var byRate = RATES.map(function (rt) { return pick(rated.filter(function (r) { return r.rate === rt; })); });
    var set = shuffle(byRate).slice(0, 3 + Math.floor(Math.random() * 2));
    var fast = Math.random() < 0.6;
    set.sort(function (a, b) { return RATES.indexOf(a.rate) - RATES.indexOf(b.rate); });
    var target = fast ? set[0] : set[set.length - 1];
    var shown = shuffle(set);
    return {
      id: 'route-' + target.id, topic: 'routes', prompt: 'Which route absorbs ' + (fast ? 'fastest' : 'slowest') + '?',
      options: shown.map(function (r) { return r.name; }), answer: shown.indexOf(target),
      why: shown.map(function (r) { return r.name + ': ' + r.rate; }).join(' · ')
    };
  }
  function receptorQ() {
    if (Math.random() < 0.6) {
      var d = pick(DRUG_REC), mc = mcFrom(d.action + ' · ' + d.receptor, DRUG_REC.filter(function (o) { return o.receptor !== d.receptor; }).map(function (o) { return o.action + ' · ' + o.receptor; }));
      return { id: 'drugrec-' + d.drug, topic: 'receptors', std: true, prompt: 'How does <q>' + esc(d.name) + '</q> work at the receptor?', options: mc.options, answer: mc.answer, why: d.effect };
    }
    var r = pick(RECEPTORS.filter(function (x) { return x.std; })), eff = pick(r.effects);
    var others = RECEPTORS.filter(function (o) { return o !== r && o.effects.indexOf(eff) === -1; }).map(function (o) { return o.name; });
    var m = mcFrom(r.name, others);
    return { id: 'rec-' + r.id, topic: 'receptors', std: true, prompt: 'Which receptor causes: <q>' + esc(eff) + '</q>?', options: m.options, answer: m.answer, why: r.name + ': ' + r.where };
  }
  function termQ(t) {
    var same = TERMS.filter(function (o) { return o !== t && o.topic === t.topic; });
    if (Math.random() < 0.5) {
      var a = mcFrom(t.term, same.map(function (o) { return o.term; }));
      return { id: t.id, topic: t.topic, std: t.std, prompt: 'Which term means: <q>' + esc(t.def) + '</q>?', options: a.options, answer: a.answer, why: '' };
    }
    var b = mcFrom(t.def, same.map(function (o) { return o.def; }));
    return { id: t.id, topic: t.topic, std: t.std, prompt: 'What does <q>' + esc(t.term) + '</q> mean?', options: b.options, answer: b.answer, why: '' };
  }
  function factQ(f) {
    var m = mcFrom(f.a, f.wrong);
    return { id: f.id, topic: f.topic, std: f.std, prompt: esc(f.q), options: m.options, answer: m.answer, why: '' };
  }
  function buildQuiz() {
    var pool = [];
    TERMS.filter(inTopics).forEach(function (t) { pool.push(function () { return termQ(t); }); });
    FACTS.filter(inTopics).forEach(function (f) { pool.push(function () { return factQ(f); }); pool.push(function () { return factQ(f); }); });
    if (S.topics.indexOf('routes') !== -1) for (var i = 0; i < 12; i++) pool.push(routeQ);
    if (S.topics.indexOf('receptors') !== -1) for (var j = 0; j < 10; j++) pool.push(receptorQ);
    var out = [], seen = {};
    shuffle(pool).forEach(function (f) {
      if (out.length >= S.quizLen) return;
      var q = f();
      if (seen[q.prompt]) return;
      seen[q.prompt] = 1; out.push(q);
    });
    return out;
  }
  function quizSetup() {
    body().innerHTML =
      '<div class="panel">' + topicChips() +
      '<div class="field-row"><p class="eyebrow">Questions</p>' + seg('quizLen', S.quizLen, [[10, '10'], [15, '15'], [25, '25'], [40, '40']]) + '</div>' +
      '<div class="field-row"><p class="eyebrow">Your accuracy by topic</p><div class="chips">' + TOPICS.map(function (t) {
        return '<span class="chip">' + esc(t.name) + ' ' + accPill(S.stats.topics[t.id]) + '</span>';
      }).join('') + '</div></div>' +
      '<div><button class="btn primary big" data-act="lp-start-quiz"' + (S.topics.length ? '' : ' disabled') + '>Start quiz</button></div></div>';
  }
  function quizRender() {
    if (Q.i >= Q.list.length) return quizDone();
    var q = Q.list[Q.i], st = Q.state;
    body().innerHTML =
      '<div class="view"><div class="progress-line"><span>Question ' + (Q.i + 1) + ' of ' + Q.list.length + '</span><span>' + Q.right + ' right</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(Q.i / Q.list.length * 100) + '%"></span></div>' +
      '<div class="panel"><p class="eyebrow">' + esc(topicName(q.topic)) + (q.std ? STD : '') + '</p><p class="q-prompt">' + q.prompt + '</p>' +
      '<div class="options">' + q.options.map(function (o, k) {
        var cls = 'option';
        if (st) { if (k === q.answer) cls += ' right'; else if (k === st.choice) cls += ' wrong'; }
        return '<button class="' + cls + '" data-opt="' + k + '"' + (st ? ' disabled' : '') + '><span class="key">' + 'ABCD'[k] + '</span><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>' +
      (st ? '<div class="verdict ' + (st.ok ? 'ok' : 'no') + '"><p class="v-title">' + (st.ok ? 'Right' : 'Not quite') + '</p>' +
        (st.ok ? '' : '<p>Answer: ' + esc(q.options[q.answer]) + '</p>') + (q.why ? '<p class="small">' + esc(q.why) + '</p>' : '') + '</div>' +
        '<button class="btn primary big" data-act="lp-next">Next</button>' : '') +
      '</div><p class="kbd-hint">Keys: A–D answer · Enter next</p></div>';
  }
  function quizAnswer(k) {
    var q = Q.list[Q.i], ok = k === q.answer;
    Q.state = { ok: ok, choice: k };
    if (ok) Q.right++; else Q.missed.push(q);
    record(q, ok);
    quizRender();
  }
  function quizDone() {
    body().innerHTML =
      '<div class="panel"><p class="eyebrow">Quiz complete</p><p class="score-big">' + Q.right + ' / ' + Q.list.length + '</p>' +
      (Q.missed.length ? '<p class="eyebrow">Review</p><ul class="missed-list">' + Q.missed.map(function (q) {
        return '<li><span>' + q.prompt + '</span><span class="small"><strong>' + esc(q.options[q.answer]) + '</strong></span></li>';
      }).join('') + '</ul>' : '') +
      '<div class="row"><button class="btn primary" data-act="lp-start-quiz">New quiz</button><button class="btn" data-act="lp-setup-quiz">Change topics</button></div></div>';
    Q = null;
  }

  learnEl.addEventListener('click', function (e) {
    var t = e.target.closest('button, [data-act], label');
    if (!t || !learnEl.contains(t)) return;
    if (t.dataset.seg === 'mode') { S.mode = t.dataset.val; save(); return learnRender(); }
    if (t.dataset.seg === 'page') { S.page = t.dataset.val; save(); return learnRender(); }
    if (t.dataset.seg === 'quizLen') { S.quizLen = +t.dataset.val; save(); return quizSetup(); }
    if (t.dataset.route) {
      var d = $('#route-' + t.dataset.route, learnEl);
      if (d) { d.open = true; d.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
      return;
    }
    if (t.dataset.drug) return gotoDrug(t.dataset.drug);
    if (t.dataset.topic) { toggleTopic(t.dataset.topic); return S.mode === 'cards' ? cardsSetup() : quizSetup(); }
    if (t.dataset.opt !== undefined && Q && !Q.state) return quizAnswer(+t.dataset.opt);
    switch (t.dataset.act) {
      case 'lp-start-cards': {
        var list = buildCards();
        if (!list.length) return;
        C = { queue: list, total: list.length, again: [], missed: [], firstTry: 0, flipped: false };
        return cardsRender();
      }
      case 'lp-setup-cards': C = null; return cardsSetup();
      case 'lp-flip': if (C && !C.flipped) { C.flipped = true; cardsRender(); } return;
      case 'lp-got': return cardAnswer(true);
      case 'lp-miss': return cardAnswer(false);
      case 'lp-quit': C = null; return cardsSetup();
      case 'lp-start-quiz': Q = { list: buildQuiz(), i: 0, right: 0, missed: [], state: null }; return quizRender();
      case 'lp-setup-quiz': Q = null; return quizSetup();
      case 'lp-next': Q.i++; Q.state = null; return quizRender();
    }
  });
  learnEl.addEventListener('change', function (e) {
    if (e.target.dataset.deck) { S.decks[e.target.dataset.deck] = e.target.checked; save(); cardsSetup(); }
  });

  // =====================================================================
  // Math tab: practice problems and formulas
  // =====================================================================
  var mathEl = $('#view-math');
  var M = null;

  function mathRender() {
    var head = '<div><h2 class="title">Med math</h2><p class="lede">Drug doses, drips and conversions from Chapter 14. Every volume answer is worked with <strong>D/H × Q</strong>.</p></div>' +
      seg('mathMode', S.mathMode, [['practice', 'Practice'], ['formulas', 'Formulas']]);
    if (S.mathMode === 'formulas') { mathEl.innerHTML = head + formulasHtml(); return; }
    mathEl.innerHTML = head + '<div id="mm-body"></div>';
    if (M) mathQRender(); else mathSetup();
  }
  function mbody() { return $('#mm-body', mathEl); }

  function dhBox() {
    return '<div class="formula"><p class="f-main"><span class="frac"><span>D</span><span>H</span></span> × Q = X</p>' +
      '<dl class="rules"><dt>D</dt><dd>Desired dose (the order)</dd><dt>H</dt><dd>Dose on hand (in the vial or syringe)</dd><dt>Q</dt><dd>Volume the dose on hand comes in (mL)</dd><dt>X</dt><dd>Volume to give</dd></dl>' +
      '<p class="small muted">Convert D and H to the same unit first.</p></div>';
  }
  function formulasHtml() {
    return '<div class="panel"><p class="eyebrow">Method 1: basic formula ("desire over have")</p>' + dhBox() +
      '<p><strong>Example:</strong> order fentanyl 50 mcg; on hand 100 mcg in 2 mL. 50 ÷ 100 × 2 = <strong>1 mL</strong>.</p>' +
      '<p class="small muted">The easiest formula; it works for nearly all emergency drug calculations.</p></div>' +
      '<div class="panel"><p class="eyebrow">Method 2: ratio and proportion</p>' +
      '<p class="f-line">Dose on hand : Volume on hand :: Desired dose : X</p>' +
      '<p><strong>Example:</strong> 100 mcg : 2 mL :: 50 mcg : X → 100X = 100 → X = <strong>1 mL</strong>. Keep the units in the same order on both sides.</p></div>' +
      '<div class="panel"><p class="eyebrow">Method 3: dimensional analysis</p>' +
      '<p>Chain every conversion in one line, multiply, and cancel units until only the one you want is left.</p>' +
      '<p class="f-line">0.05 mg × (1,000 mcg / 1 mg) × (2 mL / 100 mcg) = 1 mL</p></div>' +
      '<div class="panel"><p class="eyebrow">Weight-based doses</p>' +
      '<p class="f-line">kg = lb ÷ 2.2 &nbsp;→&nbsp; dose = mg/kg × kg &nbsp;→&nbsp; D/H × Q</p>' +
      '<p class="small muted">Weight in kilograms is the most precise way to dose a child. Double-check every pediatric dose.</p></div>' +
      '<div class="panel"><p class="eyebrow">IV flow rate (fluids)</p>' +
      '<p class="f-main"><span class="frac"><span>volume (mL) × drop factor (gtt/mL)</span><span>time (min)</span></span> = gtt/min</p>' +
      '<p class="small muted">You need the volume, the time in minutes and the set\'s drop factor. Macrodrip: 10, 15 or 20 gtt/mL. Microdrip: 60 gtt/mL.' + STD + ' Pump: mL/hr = volume ÷ hours.</p></div>' +
      '<div class="panel"><p class="eyebrow">IV drip (drug infusion)</p>' +
      '<p class="f-main"><span class="frac"><span>prescribed dose per min × drop factor</span><span>concentration of drug in 1 mL</span></span> = gtt/min</p>' +
      '<p><strong>Example:</strong> lidocaine 2 mg/min, 1 g in 250 mL (4 mg/mL), 60 gtt set: 2 × 60 ÷ 4 = <strong>30 gtt/min</strong>.</p>' +
      '<p class="small muted">With a microdrip set, gtt/min equals mL/hr.' + STD + '</p></div>' +
      '<div class="panel"><p class="eyebrow">Equivalents</p><div class="table-wrap"><table class="grid basics"><tbody>' +
      [['1 kg', '1,000 g = 2.2 lb'], ['1 g', '1,000 mg'], ['1 mg', '1,000 mcg'], ['1 L', '1,000 mL'], ['1 mL', '1 cc'], ['kilo-', '× 1,000'], ['centi-', '÷ 100'], ['milli-', '÷ 1,000'], ['micro-', '÷ 1,000,000']]
        .map(function (r) { return '<tr><td class="mono">' + r[0] + '</td><td class="mono">' + r[1] + '</td></tr>'; }).join('') +
      '</tbody></table></div><p class="small muted">Big unit to small unit: multiply. Small to big: divide.</p></div>' +
      '<div class="panel"><p class="eyebrow">Percent and ratio solutions' + STD + '</p><dl class="rules">' +
      '<dt>Percent</dt><dd>X% = X g in 100 mL. Lidocaine 2% = 2 g/100 mL = 20 mg/mL. D50 = 50 g/100 mL = 0.5 g/mL</dd>' +
      '<dt>Ratio</dt><dd>1:1,000 = 1 g in 1,000 mL = 1 mg/mL. 1:10,000 = 0.1 mg/mL</dd>' +
      '<dt>Push-dose epi</dt><dd>1 mL of 0.1 mg/mL + 9 mL NS = 10 mcg/mL</dd></dl></div>' +
      '<div class="panel"><p class="eyebrow">Temperature and ET</p><dl class="rules">' +
      '<dt>°F → °C</dt><dd>(°F − 32) × 5/9</dd><dt>°C → °F</dt><dd>(°C × 9/5) + 32</dd>' +
      '<dt>ET dose</dt><dd>2 to 2.5 × the IV dose</dd></dl></div>';
  }

  function mathSetup() {
    var any = MM.TYPES.some(function (t) { return S.mathTypes[t.id]; });
    mbody().innerHTML =
      '<div class="panel"><div class="field-row"><p class="eyebrow">Problem types</p><div class="deck-list">' +
      MM.TYPES.map(function (t) {
        return '<label class="check deck"><input type="checkbox" data-mtype="' + t.id + '"' + (S.mathTypes[t.id] ? ' checked' : '') + '> <span><strong>' + esc(t.name) + ' ' + accPill(S.stats.math[t.id]) +
          '</strong><span class="muted small">' + esc(t.blurb) + '</span></span></label>';
      }).join('') + '</div></div>' +
      '<div class="field-row"><p class="eyebrow">Problems</p>' + seg('mathLen', S.mathLen, [[5, '5'], [10, '10'], [20, '20']]) + '</div>' +
      '<div><button class="btn primary big" data-act="mm-start"' + (any ? '' : ' disabled') + '>Start</button></div></div>';
  }
  function mathStart() {
    var types = MM.TYPES.filter(function (t) { return S.mathTypes[t.id]; }).map(function (t) { return t.id; });
    if (!types.length) return;
    var list = [], last = '';
    for (var i = 0; i < S.mathLen; i++) {
      var p;
      for (var k = 0; k < 6; k++) { p = MM.make(pick(types)); if (JSON.stringify(p.given) !== last) break; }
      last = JSON.stringify(p.given);
      list.push(p);
    }
    M = { list: list, i: 0, right: 0, missed: [], state: null, hint: false, input: '' };
    mathQRender();
  }
  function typeName(id) {
    for (var i = 0; i < MM.TYPES.length; i++) if (MM.TYPES[i].id === id) return MM.TYPES[i].name;
    return '';
  }
  function mathQRender() {
    if (M.i >= M.list.length) return mathDone();
    var p = M.list[M.i], st = M.state;
    var showDH = p.type === 'dh' || p.type === 'wtdose';
    mbody().innerHTML =
      '<div class="view"><div class="progress-line"><span>Problem ' + (M.i + 1) + ' of ' + M.list.length + '</span><span>' + M.right + ' right</span></div>' +
      '<div class="meter"><span style="width:' + Math.round(M.i / M.list.length * 100) + '%"></span></div>' +
      '<div class="panel"><p class="eyebrow">' + esc(typeName(p.type)) + '</p>' +
      '<dl class="rules given">' + p.given.map(function (g) { return '<dt>' + esc(g[0]) + '</dt><dd>' + esc(g[1]) + '</dd>'; }).join('') + '</dl>' +
      '<p class="q-prompt">' + esc(p.ask) + '</p>' +
      '<form class="mm-form" data-act="mm-check"><input type="text" id="mm-in" inputmode="decimal" autocomplete="off" aria-label="Your answer" value="' + esc(M.input) + '"' + (st ? ' disabled' : '') + '>' +
      '<span class="unit">' + esc(p.unit) + '</span>' + (st ? '' : '<button class="btn primary" type="submit">Check</button>') + '</form>' +
      (!st && !M.hint ? '<button class="btn link" data-act="mm-hint">Show the formula</button>' : '') +
      (!st && M.hint ? (showDH ? dhBox() : '<p class="small muted">' + esc(p.steps[0]) + '</p>') : '') +
      (st ? '<div class="verdict ' + (st.ok ? 'ok' : 'no') + '"><p class="v-title">' + (st.ok ? 'Right' : 'Answer: ' + esc(MM.fmt(p.answer)) + ' ' + esc(p.unit)) + '</p>' +
        '<ol class="steps">' + p.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol></div>' +
        '<button class="btn primary big" data-act="mm-next">Next</button>' : '') +
      '</div><p class="kbd-hint">Enter checks, then Enter again for the next problem</p></div>';
    var inp = $('#mm-in', mathEl);
    if (inp && !st) inp.focus({ preventScroll: true });
  }
  function mathCheck() {
    var inp = $('#mm-in', mathEl), p = M.list[M.i];
    if (!inp || M.state) return;
    var v = inp.value.trim();
    if (!v || isNaN(MM.parse(v))) { inp.focus(); return; }
    M.input = v;
    var ok = MM.check(p, v);
    M.state = { ok: ok };
    if (ok) M.right++; else M.missed.push({ p: p, v: v });
    bump('math', p.type, ok); save();
    mathQRender();
  }
  function mathNext() { M.i++; M.state = null; M.hint = false; M.input = ''; mathQRender(); }
  function mathDone() {
    mbody().innerHTML =
      '<div class="panel"><p class="eyebrow">Set complete</p><p class="score-big">' + M.right + ' / ' + M.list.length + '</p>' +
      (M.missed.length ? '<p class="eyebrow">Review</p><ul class="missed-list">' + M.missed.map(function (m) {
        return '<li><span>' + esc(m.p.given.map(function (g) { return g[1]; }).join(' · ')) + '</span><span class="small">You: ' + esc(m.v) + ' · Answer: <strong>' + esc(MM.fmt(m.p.answer)) + ' ' + esc(m.p.unit) + '</strong></span>' +
          '<span class="small muted">' + esc(m.p.steps[m.p.steps.length - 1]) + '</span></li>';
      }).join('') + '</ul>' : '') +
      '<div class="row"><button class="btn primary" data-act="mm-start">New set</button><button class="btn" data-act="mm-setup">Change types</button></div></div>';
    M = null;
  }

  mathEl.addEventListener('click', function (e) {
    var t = e.target.closest('button');
    if (!t || !mathEl.contains(t)) return;
    if (t.dataset.seg === 'mathMode') { S.mathMode = t.dataset.val; save(); return mathRender(); }
    if (t.dataset.seg === 'mathLen') { S.mathLen = +t.dataset.val; save(); return mathSetup(); }
    switch (t.dataset.act) {
      case 'mm-start': return mathStart();
      case 'mm-setup': M = null; return mathSetup();
      case 'mm-hint': M.input = ($('#mm-in', mathEl) || {}).value || ''; M.hint = true; return mathQRender();
      case 'mm-next': return mathNext();
    }
  });
  mathEl.addEventListener('submit', function (e) { e.preventDefault(); mathCheck(); });
  mathEl.addEventListener('change', function (e) {
    if (e.target.dataset.mtype) { S.mathTypes[e.target.dataset.mtype] = e.target.checked; save(); mathSetup(); }
  });

  // ---------- Keyboard ----------
  function activeTab() {
    var b = $('#subj-pharm .tab[aria-selected="true"]');
    return document.body.dataset.subject && document.body.dataset.subject !== 'pharm' ? '' : b ? b.dataset.tab : '';
  }
  document.addEventListener('keydown', function (e) {
    var tab = activeTab(), tag = (e.target.tagName || '').toLowerCase();
    var typing = tag === 'input' || tag === 'textarea' || tag === 'select';
    if (tab === 'learn' && S.mode === 'cards' && C && C.queue.length && !typing) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!C.flipped) { C.flipped = true; cardsRender(); } }
      else if (C.flipped && e.key === '1') cardAnswer(false);
      else if (C.flipped && e.key === '2') cardAnswer(true);
    } else if (tab === 'learn' && S.mode === 'quiz' && Q && Q.i < Q.list.length && !typing) {
      var idx = 'abcd'.indexOf((e.key || '').toLowerCase());
      if (!Q.state && idx !== -1 && idx < Q.list[Q.i].options.length) quizAnswer(idx);
      else if (Q.state && e.key === 'Enter' && tag !== 'button') { e.preventDefault(); Q.i++; Q.state = null; quizRender(); }
    } else if (tab === 'math' && M && M.state && e.key === 'Enter' && tag !== 'button') {
      e.preventDefault(); mathNext();
    }
  });

  window.PHARM_VIEWS = {
    learn: { show: function () { if (!learnEl.firstChild) learnRender(); } },
    math: { show: function () { if (!mathEl.firstChild) mathRender(); } }
  };
})();
