/*
 * ACLS content: the adult algorithms of the 2025 American Heart Association
 * Guidelines for CPR and Emergency Cardiovascular Care (cardiac arrest,
 * post-cardiac arrest care, bradycardia, tachyarrhythmia with a pulse, ACS
 * and suspected stroke), with the doses and energies printed on the 2025
 * algorithm cards.
 *
 * Tennessee: tn fields and ACLS_TN compare AHA with the Tennessee EMS ALS/BLS
 * Blended Protocol Guidelines 2022-23 (state model protocols, SOP numbers
 * given) and the class deck Paramedic Pharmacology – TN Protocols. Agencies
 * and medical directors adapt the state guidelines, so check yours.
 *
 * Items with new25: true changed in the 2025 guidelines. Items with std: true
 * are standard ACLS teaching that the 2025 algorithm cards do not print.
 *
 * Algorithm flow nodes: { title, lines, tn, kind } or
 * { decide, branches: [{ label, steps: [...] }] }.
 * Drugs: name, use, dose, wrong (near-miss doses), note, tn.
 * Facts: q, a, wrong (3), why. Strip questions: rhythm (js/ecg.js id), label,
 * ctx, a, wrong, why, tn. Megacode stages: clock, title, rhythm, label,
 * callRhythm (ask the rhythm first), rhythmWrong, vitals, text, q.
 */
window.ACLS_GROUPS = [
  { id: 'arrest', name: 'Cardiac arrest' },
  { id: 'rosc', name: 'Post-arrest care' },
  { id: 'brady', name: 'Bradycardia' },
  { id: 'tachy', name: 'Tachycardia' },
  { id: 'acs', name: 'ACS' },
  { id: 'stroke', name: 'Stroke' }
];

window.ACLS_ALGOS = [
  {
    id: 'arrest', group: 'arrest', name: 'Adult cardiac arrest', short: 'Cardiac arrest',
    source: 'AHA 2025 · Adult Cardiac Arrest Algorithm',
    summary: 'High-quality CPR and early defibrillation are what save the patient. Everything else (drugs, airway) fits around 2-minute cycles of CPR with as few pauses as possible.',
    flow: [
      { title: 'Start CPR', lines: ['Give oxygen and ventilate with a bag-mask', 'Attach the monitor/defibrillator'], tn: 'SOP 101: compressions first; manage the airway after 2 minutes of effective compressions.' },
      { decide: 'Rhythm shockable?', branches: [
        { label: 'Yes: VF / pVT', steps: [
          { title: 'Shock', kind: 'shock', lines: ['Biphasic: device recommendation (often 120–200 J); if unknown, maximum', 'Monophasic: 360 J'] },
          { title: 'CPR 2 min', lines: ['IV access (IO if IV fails or is not feasible)'], new25: true },
          { title: 'Rhythm check. Still shockable: shock', kind: 'shock' },
          { title: 'CPR 2 min', lines: ['Epinephrine 1 mg every 3–5 min', 'Consider an advanced airway and capnography'], tn: 'TN SOP 110: epinephrine 0.5 mg IV/IO.' },
          { title: 'Rhythm check. Still shockable: shock', kind: 'shock' },
          { title: 'CPR 2 min', lines: ['Amiodarone 300 mg, then 150 mg', 'or lidocaine 1–1.5 mg/kg, then 0.5–0.75 mg/kg', 'Treat reversible causes'] }
        ] },
        { label: 'No: asystole / PEA', steps: [
          { title: 'Epinephrine as soon as possible', lines: ['1 mg IV/IO, then every 3–5 min'], tn: 'TN: 0.5 mg in asystole (SOP 109); 1 mg as early as possible in PEA (SOP 105).' },
          { title: 'CPR 2 min', lines: ['IV/IO access', 'Consider an advanced airway and capnography'] },
          { title: 'Rhythm check', lines: ['Shockable now: go to the shock side', 'Not shockable: CPR 2 min, treat reversible causes (H\'s and T\'s)'] }
        ] }
      ] },
      { title: 'At every rhythm check', lines: ['Organized rhythm: check a pulse', 'Signs of ROSC: go to post-cardiac arrest care', 'No ROSC: keep cycling; consider whether to continue resuscitation'] }
    ],
    notes: [
      { title: 'CPR quality', lines: ['Push hard: at least 2 in (5 cm)', 'Push fast: 100–120/min, full chest recoil', 'Minimize pauses; avoid excessive ventilation', 'Change compressors every 2 min, or sooner if tired', 'No advanced airway: 30:2', 'Advanced airway: 1 breath every 6 s (10/min) with continuous compressions', 'Low or falling ETCO2: fix CPR quality'], tn: 'SOP 101: rate 100–110/min, tidal volume no more than 500 mL, impedance threshold device in all arrests.' },
      { title: 'Shock energy', lines: ['Biphasic: manufacturer recommendation (e.g. initial 120–200 J); if unknown, use the maximum', 'Second and later shocks: same energy, higher may be considered', 'Monophasic: 360 J'] },
      { title: 'Drugs', lines: ['Epinephrine 1 mg IV/IO every 3–5 min', 'Amiodarone 300 mg bolus, then 150 mg', 'Lidocaine 1–1.5 mg/kg, then 0.5–0.75 mg/kg'], tn: 'TN: epinephrine 0.5 mg (VF/pVT, asystole), and little benefit expected beyond 3 mg total.' },
      { title: 'Advanced airway', lines: ['Endotracheal tube or supraglottic airway', 'Waveform capnography to confirm and monitor placement'], tn: 'SOP 101: waveform capnography is mandatory; go to an i-gel if intubation takes longer than 30 s.' },
      { title: 'Signs of ROSC', std: true, lines: ['Pulse and blood pressure', 'Abrupt, sustained rise in ETCO2 (often 40 mm Hg or more)', 'Spontaneous arterial pressure waves on an arterial line'] },
      { title: 'New in 2025', new25: true, lines: ['Try IV access first; IO if IV fails or is not feasible', 'Double sequential defibrillation and vector change: benefit not established', 'Vasopressin adds nothing over epinephrine alone', 'Routine calcium is not recommended'] }
    ]
  },
  {
    id: 'rosc', group: 'rosc', name: 'Post-cardiac arrest care', short: 'Post-arrest (ROSC)',
    source: 'AHA 2025 · Adult Post-Cardiac Arrest Care Algorithm',
    summary: 'ROSC is the start of the next phase. Protect the brain and heart: secure the airway, avoid hypoxia and hyperoxia, keep the blood pressure up, get a 12-lead and control temperature.',
    flow: [
      { title: 'Manage the airway', lines: ['Place or keep an advanced airway', 'Confirm and monitor with waveform capnography'] },
      { title: 'Oxygen and ventilation', lines: ['100% FiO2 until SpO2 can be measured reliably', 'Then titrate to SpO2 90–98%', 'PaCO2 35–45 mm Hg (do not hyperventilate)'], tn: 'SOP 113: keep ETCO2 above 20, ideally fewer than 12 breaths/min, head of bed 30°.' },
      { title: 'Blood pressure', lines: ['MAP 65 mm Hg or higher', 'Fluids and/or vasopressors'], tn: 'SOP 113: if systolic below 90, 250 mL NS boluses until above 90; epinephrine drip 2–20 mcg/min or push-dose epinephrine 5–10 mcg.' },
      { title: '12-lead ECG', lines: ['Early 12-lead; consider CT and ultrasound'] },
      { decide: 'STEMI, cardiogenic shock, or recurrent VF/VT?', branches: [
        { label: 'Yes', steps: [{ title: 'Emergency cardiac intervention', lines: ['Coronary angiography (cath lab); consider mechanical support'] }] },
        { label: 'No', steps: [{ title: 'Keep looking for the cause', lines: ['Treat reversible causes', 'Consider antibiotics if infection is likely'] }] }
      ] },
      { decide: 'Following commands?', branches: [
        { label: 'No', steps: [{ title: 'Temperature control', lines: ['Start a deliberate strategy, goal 32–37.5 °C, as soon as possible', 'Look for seizures (EEG)'] }] },
        { label: 'Yes', steps: [{ title: 'Supportive care', lines: ['Avoid fever, hypoxia and hypotension'] }] }
      ] },
      { title: 'Other goals', lines: ['Glucose 70–180 mg/dL', 'Delay prognosis for at least 72 h after ROSC or normothermia'] }
    ],
    notes: [
      { title: 'Targets at a glance', lines: ['SpO2 90–98%', 'PaCO2 35–45 mm Hg', 'MAP 65 mm Hg or more', 'Temperature 32–37.5 °C if not following commands', 'Glucose 70–180 mg/dL'] },
      { title: 'Antiarrhythmics after ROSC', lines: ['If VF/pVT recurs, treat it again; an antiarrhythmic infusion may be considered'], tn: 'SOP 113: amiodarone 300 mg IV; 150 mg second dose if the arrhythmia persists.' }
    ]
  },
  {
    id: 'brady', group: 'brady', name: 'Adult bradycardia with a pulse', short: 'Bradycardia',
    source: 'AHA 2025 · Adult Bradycardia Algorithm',
    summary: 'A slow heart rate only needs treatment when it is causing trouble. Look for poor perfusion first, then atropine, then pacing or a drip.',
    flow: [
      { title: 'Assess', lines: ['Heart rate typically below 50/min', 'Airway, oxygen if hypoxemic, monitor, BP, SpO2, IV, 12-lead', 'Look for causes: ischemia, drugs (beta blockers, calcium channel blockers, digoxin), hypoxia, hyperkalemia'], tn: 'SOP 102: symptomatic bradycardia is a rate below 60 with poor perfusion; put pacer pads on for 2nd- and 3rd-degree blocks.' },
      { decide: 'Hypotension, altered mental status, shock, ischemic chest pain or acute heart failure?', branches: [
        { label: 'No', steps: [{ title: 'Monitor and observe', lines: ['Find and treat the cause'] }] },
        { label: 'Yes', steps: [
          { title: 'Atropine', lines: ['1 mg IV, repeat every 3–5 min', 'Maximum 3 mg'], tn: 'SOP 102: atropine 0.5 mg, repeat up to 0.04 mg/kg (3 mg).' },
          { title: 'If atropine does not work', lines: ['Transcutaneous pacing, and/or', 'Dopamine 5–20 mcg/kg/min, or', 'Epinephrine 2–10 mcg/min'], tn: 'SOP 102: contact Medical Control and pace; consider an epinephrine drip; glucagon 1–2 mg for suspected beta blocker overdose.' },
          { title: 'Consider', lines: ['Expert consultation', 'Transvenous pacing'] }
        ] }
      ] }
    ],
    notes: [
      { title: 'Doses', lines: ['Atropine 1 mg IV every 3–5 min, max 3 mg', 'Dopamine infusion 5–20 mcg/kg/min, titrate, taper slowly', 'Epinephrine infusion 2–10 mcg/min, titrate'], tn: 'TN starts atropine at 0.5 mg (class deck: 0.5–1 mg).' },
      { title: 'Pacing tips', std: true, lines: ['Sedate and treat pain if you can', 'Start at a rate of about 60–80/min', 'Raise the mA until every spike captures (wide QRS after each spike), then a little higher', 'Confirm mechanical capture with a femoral pulse, not the carotid'] },
      { title: 'When atropine will not work', std: true, lines: ['Heart transplant patients (no vagal nerve to block)', 'Type II 2nd-degree and 3rd-degree blocks with wide QRS often do not respond: go straight to pacing'] },
      { title: 'Watch out', std: true, lines: ['Do not give amiodarone or lidocaine for escape beats in bradycardia: they may be keeping the patient alive'], tn: 'SOP 102: if PVCs are present with bradycardia, do not give amiodarone or lidocaine.' }
    ]
  },
  {
    id: 'tachy', group: 'tachy', name: 'Adult tachyarrhythmia with a pulse', short: 'Tachycardia',
    source: 'AHA 2025 · Adult Tachyarrhythmia With a Pulse Algorithm',
    summary: 'Two questions decide the treatment: is the patient unstable because of the fast rate, and is the QRS narrow or wide? Unstable means synchronized cardioversion.',
    flow: [
      { title: 'Assess', lines: ['Heart rate typically 150/min or more if the rhythm is the cause', 'Airway, oxygen if hypoxemic, monitor, BP, SpO2, IV, 12-lead'] },
      { decide: 'Hypotension, acute altered mental status, shock, ischemic chest pain or acute heart failure?', branches: [
        { label: 'Yes: unstable', steps: [
          { title: 'Synchronized cardioversion', kind: 'shock', lines: ['Sedate whenever feasible', 'Energy: the device\'s recommended level; if unknown, maximum', 'Narrow and regular: consider adenosine while you get ready'], tn: 'SOP 107: 50, 100, then 200 J; sedate with midazolam or diazepam 2–5 mg IV.' }
        ] },
        { label: 'No: stable', steps: [
          { decide: 'QRS?', branches: [
            { label: 'Narrow (< 0.12 s)', steps: [
              { title: 'Regular: vagal maneuvers', lines: ['Modified Valsalva'] },
              { title: 'Adenosine', lines: ['6 mg rapid IV push with a saline flush', '12 mg if needed'], tn: 'SOP 107: adenosine 12 mg first, repeat 12 mg once.' },
              { title: 'Still fast', lines: ['Beta blocker or calcium channel blocker', 'Consider expert consultation'] }
            ] },
            { label: 'Wide (0.12 s or more)', steps: [
              { title: 'Regular and monomorphic: consider adenosine' },
              { title: 'Antiarrhythmic infusion', lines: ['Amiodarone 150 mg over 10 min', 'or procainamide 20–50 mg/min'], tn: 'SOP 112: amiodarone 150 mg over 10 min, up to three doses; procainamide is not in the 2022-23 guidelines.' },
              { title: 'Expert consultation' }
            ] }
          ] }
        ] }
      ] }
    ],
    notes: [
      { title: 'Adenosine', lines: ['6 mg rapid IV push, then a saline flush', 'Second dose 12 mg', 'Use a large vein close to the heart (antecubital)'], tn: 'TN: 12 mg first and again (12 mg, 12 mg); half dose for heart transplant patients and patients on carbamazepine.' },
      { title: 'Amiodarone (wide, stable)', lines: ['150 mg IV over 10 min, repeat if VT recurs', 'Maintenance 1 mg/min for the first 6 h'] },
      { title: 'Procainamide', lines: ['20–50 mg/min until the rhythm stops, hypotension, QRS widens more than 50%, or 17 mg/kg given', 'Maintenance 1–4 mg/min', 'Avoid with prolonged QT or heart failure'] },
      { title: 'Cardioversion energy', lines: ['AHA 2025: the device\'s recommended energy; if unknown, the maximum', 'Atrial fibrillation: a higher first shock (200 J biphasic or more) works better', 'Refractory: increase the energy, add an antiarrhythmic'], new25: true, tn: 'TN: SVT 50, 100, 200 J; wide-complex tachycardia starts at 50 J, then amiodarone and 100 J.' },
      { title: 'Polymorphic VT', std: true, lines: ['Unstable polymorphic VT cannot be synchronized: defibrillate (unsynchronized)', 'Torsades: magnesium 1–2 g IV'], tn: 'SOP 108: magnesium 1–2 g over 2 min; cardioversion 50, 100, then 200 J if systolic below 90.' }
    ]
  },
  {
    id: 'acs', group: 'acs', name: 'Acute coronary syndromes', short: 'ACS',
    source: 'AHA 2025 · Acute Coronary Syndromes Algorithm (EMS part)',
    summary: 'Get the 12-lead early, treat pain and ischemia, and get a STEMI to a cath lab fast. Time is muscle.',
    flow: [
      { title: 'EMS assessment and care', lines: ['Monitor, support ABCs, be ready for CPR and defibrillation', 'Aspirin', 'Oxygen only if SpO2 is below 90% (start at 4 L/min, titrate)', 'Nitroglycerin SL', 'Morphine or fentanyl if the pain is not relieved'], tn: 'SOP 103: aspirin 324 mg chewed; oxygen 2–6 L/min to SpO2 above 92%; nitroglycerin 0.4 mg every 5 min x3 if systolic above 100.' },
      { title: '12-lead within 10 min of first medical contact', lines: ['Serial ECGs if the first one is not diagnostic', 'Pre-notify the hospital; transmit the 12-lead'], tn: 'SOP 103: transmit to a PCI-capable hospital.' },
      { decide: 'ST elevation?', branches: [
        { label: 'STEMI', steps: [{ title: 'Reperfusion', lines: ['PCI: first medical contact to balloon 90 min or less', 'Fibrinolysis: door to needle 30 min or less'] }] },
        { label: 'No STEMI', steps: [{ title: 'NSTE-ACS', lines: ['Serial ECGs and troponin', 'Risk-stratify at the hospital'] }] }
      ] }
    ],
    notes: [
      { title: 'Nitroglycerin cautions', std: true, lines: ['Hold if systolic is below 90 (TN: 100)', 'Hold after erectile dysfunction drugs (sildenafil, vardenafil within 24 h; tadalafil within 48 h)', 'Use caution with an inferior MI: check V4R for right ventricular infarct'] },
      { title: 'Hospital care', lines: ['Aspirin 162–325 mg if EMS did not give it', 'Consider a P2Y12 inhibitor', 'Chest x-ray within 30 min, without delaying reperfusion'] },
      { title: 'PVCs in ACS', lines: ['Do not treat isolated PVCs routinely'], tn: 'SOP 103: symptomatic PVCs over 15/min: amiodarone 150 mg over 2 min.' }
    ]
  },
  {
    id: 'stroke', group: 'stroke', name: 'Suspected stroke', short: 'Stroke',
    source: 'AHA 2025 · Adult Suspected Stroke Algorithm (EMS part)',
    summary: 'Find the stroke, nail down the time last known normal, check the glucose, and take the patient to the right stroke center with a heads-up.',
    flow: [
      { title: 'EMS assessment and care', lines: ['Support ABCs; oxygen if needed', 'Validated prehospital stroke screen and severity tool', 'Establish the time last known normal', 'Check glucose and treat if low'], tn: 'TN uses C-STAT: a score above 2 means a stroke center that can do thrombectomy; also complete the prehospital thrombolytic screen.' },
      { title: 'Triage and pre-notify', lines: ['To the most appropriate stroke center', 'Best practice: straight to imaging, bypassing the ED bed'] },
      { title: 'Hospital', lines: ['NIHSS', 'CT or MRI, CT angiography'] },
      { decide: 'Hemorrhage on imaging?', branches: [
        { label: 'No', steps: [{ title: 'Ischemic stroke', lines: ['Thrombolytic if a candidate', 'Large vessel occlusion: endovascular thrombectomy'] }] },
        { label: 'Yes', steps: [{ title: 'Intracranial hemorrhage protocol' }] }
      ] }
    ],
    notes: [
      { title: 'In the field', std: true, lines: ['Do not give anything by mouth (swallowing may be impaired)', 'Do not treat high blood pressure unless medical control orders it', 'Bring a witness or get a phone number for whoever saw the patient last normal', '12-lead and look for atrial fibrillation'], tn: 'TN: contact Medical Control if systolic above 220 or diastolic above 140; glucose below 60: D10.' },
      { title: 'Thrombolytic screen red flags', std: true, lines: ['Recent surgery, head injury, stroke or bleeding', 'Bleeding disorder or anticoagulants', 'Very high blood pressure'], tn: 'TN screen: systolic above 240, diastolic above 110, or arm-to-arm systolic difference above 15.' }
    ]
  }
];

// Reversible causes of cardiac arrest.
window.ACLS_HT = {
  h: [
    { name: 'Hypovolemia', clues: 'Trauma, GI bleed, dehydration; flat neck veins; narrow-complex PEA', fix: 'Fluid bolus, blood, stop the bleeding' },
    { name: 'Hypoxia', clues: 'Respiratory arrest, airway obstruction, drowning', fix: 'Oxygen, open the airway, ventilate, confirm tube placement' },
    { name: 'Hydrogen ion (acidosis)', clues: 'DKA, renal failure, long downtime', fix: 'Ventilate well; sodium bicarbonate for known severe acidosis' },
    { name: 'Hypo-/hyperkalemia', clues: 'Dialysis or missed dialysis, renal failure; peaked T waves, wide QRS', fix: 'Hyperkalemia: calcium, sodium bicarbonate (insulin and glucose in hospital)' },
    { name: 'Hypothermia', clues: 'Cold exposure, cold water', fix: 'Rewarm; keep going (not dead until warm and dead)' }
  ],
  t: [
    { name: 'Tension pneumothorax', clues: 'Trauma, ventilated asthma/COPD, absent breath sounds, hard to bag, JVD', fix: 'Needle decompression' },
    { name: 'Tamponade, cardiac', clues: 'Penetrating chest trauma, JVD, muffled heart sounds, low-voltage QRS', fix: 'Fluids; pericardiocentesis' },
    { name: 'Toxins', clues: 'Pill bottles, history; opioids, tricyclics, beta blockers, calcium channel blockers', fix: 'Antidote: naloxone, sodium bicarbonate (tricyclics), calcium, glucagon' },
    { name: 'Thrombosis, pulmonary', clues: 'Recent surgery or immobility, leg swelling, sudden dyspnea before arrest', fix: 'Fibrinolytic in hospital' },
    { name: 'Thrombosis, coronary', clues: 'Chest pain before arrest, STEMI after ROSC', fix: 'Cath lab (PCI)' }
  ]
};

window.ACLS_DRUGS = [
  { group: 'arrest', name: 'Epinephrine', use: 'cardiac arrest', dose: '1 mg IV/IO every 3–5 min', wrong: ['1 mg IV/IO every 10 min', '0.3 mg IM every 5 min', '3 mg IV/IO once'], note: 'Non-shockable: give it as soon as possible. Shockable: after the first shocks fail (usually after the 2nd shock).', tn: '0.5 mg IV/IO in VF/pVT and asystole, 1 mg in PEA; little benefit beyond 3 mg total.' },
  { group: 'arrest', name: 'Amiodarone', use: 'VF / pulseless VT (first dose)', dose: '300 mg IV/IO bolus', wrong: ['150 mg IV over 10 min', '450 mg IV/IO bolus', '1 mg/kg IV/IO'], note: 'After the 3rd shock. Second dose 150 mg.' },
  { group: 'arrest', name: 'Amiodarone', use: 'VF / pulseless VT (second dose)', dose: '150 mg IV/IO', wrong: ['300 mg IV/IO', '75 mg IV/IO', '150 mg over 10 min drip'] },
  { group: 'arrest', name: 'Lidocaine', use: 'VF / pulseless VT (first dose)', dose: '1–1.5 mg/kg IV/IO', wrong: ['0.5–0.75 mg/kg IV/IO', '3 mg/kg IV/IO', '100 mg/kg IV/IO'], note: 'Second dose 0.5–0.75 mg/kg. Use it instead of amiodarone, not with it.' },
  { group: 'arrest', name: 'Lidocaine', use: 'VF / pulseless VT (second dose)', dose: '0.5–0.75 mg/kg IV/IO', wrong: ['1–1.5 mg/kg IV/IO', '2 mg/kg IV/IO', '0.1 mg/kg IV/IO'] },
  { group: 'arrest', name: 'Defibrillation', use: 'VF / pVT, biphasic', dose: 'Manufacturer\'s recommendation (e.g. 120–200 J); maximum if unknown', wrong: ['50 J, then 100 J', '2 J/kg', '360 J biphasic only'], note: 'Monophasic: 360 J.' },
  { group: 'arrest', name: 'Defibrillation', use: 'VF / pVT, monophasic', dose: '360 J', wrong: ['200 J', '120 J', '50 J'] },
  { group: 'arrest', name: 'Magnesium sulfate', use: 'torsades de pointes (pulseless)', dose: '1–2 g IV/IO', wrong: ['4–6 g IV/IO', '100 mg IV/IO', '10 g IV/IO'], tn: 'SOP 108: 25–50 mg/kg, max 2 g, in 10 mL D5W over 1–2 min.' },
  { group: 'arrest', name: 'Sodium bicarbonate', use: 'known hyperkalemia, tricyclic overdose or severe acidosis', dose: '1 mEq/kg IV/IO', wrong: ['10 mEq/kg IV/IO', '0.1 mEq/kg IV/IO', '50 mEq/kg IV/IO'], note: 'Not routine in arrest.', tn: 'TN: 1 mEq/kg, then 0.5 mEq/kg every 10 min (SOP 105, 109, 110).' },
  { group: 'arrest', name: 'Calcium chloride', use: 'arrest with known hyperkalemia or dialysis patient', dose: '500 mg–1 g IV/IO', wrong: ['10 g IV/IO', '50 mg IV/IO', '5 mg/kg IV/IO'], note: 'Not routine in arrest (2025).', tn: 'TN: calcium chloride 500 mg IV for arrest with renal failure or dialysis.' },
  { group: 'rosc', name: 'Norepinephrine', use: 'post-arrest hypotension (infusion)', dose: '0.1–0.5 mcg/kg/min, titrate to MAP 65 or more', wrong: ['1 mg IV push', '20 mcg/kg/min', '0.5 mg IM'], note: 'Common post-arrest pressor (standard ACLS teaching).' },
  { group: 'rosc', name: 'Epinephrine', use: 'post-arrest hypotension (infusion)', dose: '0.1–0.5 mcg/kg/min, titrate to MAP 65 or more', wrong: ['1 mg IV push every 3–5 min', '0.3 mg IM', '10 mg IV'], tn: 'SOP 113: 2–20 mcg/min, or push-dose 5–10 mcg every 2–5 min.' },
  { group: 'rosc', name: 'Fluid bolus', use: 'post-arrest hypotension', dose: '1–2 L NS or LR', wrong: ['50 mL NS', '5 L NS', '10 mL/kg D5W'], note: 'Standard teaching; watch the lungs.', tn: 'SOP 113: 250 mL NS boluses until systolic above 90.' },
  { group: 'brady', name: 'Atropine', use: 'symptomatic bradycardia', dose: '1 mg IV every 3–5 min, max 3 mg', wrong: ['0.5 mg IV every 3–5 min, max 0.04 mg/kg', '1 mg IV every 3–5 min, max 0.5 mg', '3 mg IV once'], tn: '0.5 mg IV, repeat up to 0.04 mg/kg (3 mg) (SOP 102).' },
  { group: 'brady', name: 'Dopamine', use: 'bradycardia (infusion)', dose: '5–20 mcg/kg/min', wrong: ['2–10 mcg/min', '1 mg IV push', '50–100 mcg/kg/min'] },
  { group: 'brady', name: 'Epinephrine', use: 'bradycardia (infusion)', dose: '2–10 mcg/min', wrong: ['5–20 mcg/kg/min', '1 mg IV every 3–5 min', '0.3 mg IM'], tn: 'TN lists an epinephrine drip; SOP 113 gives 2–20 mcg/min.' },
  { group: 'brady', name: 'Transcutaneous pacing', use: 'unstable bradycardia', dose: 'Rate about 60–80/min; raise mA until capture, then slightly above', wrong: ['Rate 150/min at 10 mA', 'Synchronized at 100 J', 'Rate 40/min, lowest mA'], note: 'Standard teaching; confirm capture with a femoral pulse.' },
  { group: 'tachy', name: 'Adenosine', use: 'stable regular narrow-complex tachycardia (first dose)', dose: '6 mg rapid IV push with a flush', wrong: ['12 mg slow IV over 2 min', '3 mg rapid IV push', '0.1 mg/kg IV over 10 min'], note: 'Second dose 12 mg.', tn: 'TN SOP 107: 12 mg rapid IV first.' },
  { group: 'tachy', name: 'Adenosine', use: 'stable regular narrow-complex tachycardia (second dose)', dose: '12 mg rapid IV push', wrong: ['6 mg rapid IV push', '18 mg slow IV', '24 mg rapid IV push'], tn: 'TN: repeat 12 mg once.' },
  { group: 'tachy', name: 'Amiodarone', use: 'stable wide-complex tachycardia', dose: '150 mg IV over 10 min', wrong: ['300 mg IV push', '150 mg rapid IV push', '1 mg/kg IV over 1 min'], note: 'Repeat if VT recurs; maintenance 1 mg/min for 6 h.', tn: 'SOP 112: up to three 150 mg doses.' },
  { group: 'tachy', name: 'Procainamide', use: 'stable wide-complex tachycardia', dose: '20–50 mg/min, max 17 mg/kg', wrong: ['300 mg IV push', '1–4 mg/kg/min', '100 mg/min, max 30 mg/kg'], note: 'Stop for hypotension, QRS widening over 50%, or the rhythm stops. Avoid with long QT or heart failure.', tn: 'Not in the TN 2022-23 guidelines.' },
  { group: 'tachy', name: 'Diltiazem', use: 'rate control, stable A-fib/flutter or SVT', dose: '0.25 mg/kg IV over 2 min (about 15–20 mg)', wrong: ['2.5 mg/kg IV push', '0.25 mg IV once', '1 mg/kg IV over 2 min'], note: 'Standard teaching (not printed on the 2025 card). Avoid in heart failure, WPW and wide-complex rhythms.' },
  { group: 'tachy', name: 'Synchronized cardioversion', use: 'unstable tachycardia with a pulse', dose: 'Device\'s recommended energy; maximum if unknown', wrong: ['Unsynchronized 360 J only', '2 J/kg unsynchronized', '10 J synchronized'], new25: true, tn: 'TN: 50, 100, then 200 J (SOP 107).' },
  { group: 'acs', name: 'Aspirin', use: 'suspected ACS', dose: '162–325 mg chewed', wrong: ['81 mg swallowed whole', '650 mg PO', '1 g IV'], tn: '324 mg chewable (SOP 103).' },
  { group: 'acs', name: 'Nitroglycerin', use: 'ischemic chest pain', dose: '0.4 mg SL every 5 min, up to 3', wrong: ['4 mg SL every 5 min', '0.4 mg IV push', '0.04 mg SL every 15 min'], note: 'Hold for low BP, recent erectile dysfunction drugs, or right ventricular infarct.', tn: 'Only if systolic above 100 (SOP 103).' },
  { group: 'acs', name: 'Oxygen', use: 'ACS', dose: 'Only if SpO2 below 90%; start 4 L/min and titrate', wrong: ['15 L/min NRB for every patient', 'Never give oxygen', 'Titrate to SpO2 100%'], tn: '2–6 L/min nasal cannula to SpO2 above 92% (SOP 103).' }
];

window.ACLS_FACTS = [
  { group: 'arrest', q: 'Compression rate for adult CPR?', a: '100–120/min', wrong: ['60–80/min', '80–100/min', '120–150/min'], why: 'TN SOP 101 uses 100–110/min, which sits inside the AHA range.' },
  { group: 'arrest', q: 'Compression depth for an adult?', a: 'At least 2 inches (5 cm)', wrong: ['About 1 inch (2.5 cm)', '1.5 inches (4 cm)', 'At least 3 inches (7.5 cm)'] },
  { group: 'arrest', q: 'Ventilation rate once an advanced airway is in place?', a: '1 breath every 6 s (10/min) with continuous compressions', wrong: ['2 breaths after every 30 compressions', '1 breath every 2 s (30/min)', '1 breath every 12 s (5/min)'] },
  { group: 'arrest', q: 'Compression-to-ventilation ratio without an advanced airway?', a: '30:2', wrong: ['15:2', '30:1', '5:1'] },
  { group: 'arrest', q: 'How often should compressors switch?', a: 'Every 2 minutes, or sooner if tired', wrong: ['Every 5 minutes', 'Every 30 seconds', 'Only when the compressor asks'] },
  { group: 'arrest', q: 'Which rhythms are shockable?', a: 'Ventricular fibrillation and pulseless VT', wrong: ['Asystole and PEA', 'Asystole and VF', 'PEA and pulseless VT'] },
  { group: 'arrest', q: 'Epinephrine dose and interval in adult cardiac arrest?', a: '1 mg IV/IO every 3–5 min', wrong: ['0.5 mg IV/IO every 10 min', '1 mg IV/IO every 1 min', '0.3 mg IM every 5 min'], why: 'TN uses 0.5 mg in VF/pVT and asystole and 1 mg in PEA.' },
  { group: 'arrest', q: 'When is epinephrine given in asystole or PEA?', a: 'As soon as possible', wrong: ['After the second shock', 'Only after an advanced airway is placed', 'After 10 minutes of CPR'] },
  { group: 'arrest', q: 'When is the first antiarrhythmic usually given in VF?', a: 'After the third shock, if VF/pVT persists', wrong: ['Before the first shock', 'After the first shock', 'Only after ROSC'] },
  { group: 'arrest', q: 'A low or falling ETCO2 during CPR means what?', a: 'Reassess and improve CPR quality', wrong: ['ROSC is likely', 'Hyperventilate the patient', 'The tube is definitely in the right mainstem'] },
  { group: 'arrest', q: 'A sudden, sustained rise in ETCO2 during CPR suggests what?', a: 'Return of spontaneous circulation', wrong: ['The tube has slipped into the esophagus', 'The patient needs another shock', 'Compressions are too fast'], why: 'Standard ACLS teaching: blood is moving again and carrying CO2 to the lungs.' },
  { group: 'arrest', q: 'How long should a pulse check take?', a: 'No more than 10 seconds', wrong: ['At least 30 seconds', 'One full minute', '20 seconds'], why: 'Standard ACLS teaching: pauses cost perfusion.' },
  { group: 'arrest', q: 'Vascular access in arrest per the 2025 guidelines?', a: 'Try IV first; IO if IV fails or is not feasible', wrong: ['Always IO first', 'Endotracheal route first', 'Central line before any drugs'], new25: true },
  { group: 'arrest', q: 'Vasopressin in cardiac arrest (2025)?', a: 'No advantage over epinephrine alone', wrong: ['Replaces the first or second epinephrine dose', 'Give 40 U with every epinephrine', 'First-line in asystole'], new25: true },
  { group: 'arrest', q: 'Double sequential defibrillation for refractory VF (2025)?', a: 'Usefulness not established', wrong: ['Recommended after the first shock', 'Required after 3 shocks', 'Recommended instead of amiodarone'], new25: true },
  { group: 'arrest', q: 'What is PEA?', a: 'An organized rhythm on the monitor with no pulse', wrong: ['A flat line in two leads', 'Chaotic waves with no QRS', 'Any rhythm under 40/min'] },
  { group: 'arrest', q: 'Asystole on the monitor. What do you check first?', a: 'Leads, gain and a second lead (confirm it is real)', wrong: ['Shock at 200 J', 'Synchronized cardioversion', 'Give adenosine'], why: 'Standard teaching: a loose lead or low gain can look like asystole, and fine VF can hide.' },
  { group: 'arrest', q: 'The H\'s of cardiac arrest?', a: 'Hypovolemia, hypoxia, hydrogen ion, hypo-/hyperkalemia, hypothermia', wrong: ['Hypertension, hypoxia, hemorrhage, hypoglycemia, hyperthermia', 'Hypovolemia, hypocalcemia, heart block, hypothermia, hypertension', 'Hypoxia, hypercarbia, hyponatremia, hypotension, hypomagnesemia'] },
  { group: 'arrest', q: 'The T\'s of cardiac arrest?', a: 'Tension pneumothorax, tamponade, toxins, pulmonary thrombosis, coronary thrombosis', wrong: ['Trauma, tachycardia, tetany, thyroid, temperature', 'Tamponade, torsades, tachycardia, toxins, tension pneumothorax', 'Tension pneumothorax, trauma, tonsils, toxins, thrombosis'] },
  { group: 'arrest', q: 'Treatment for a dialysis patient in PEA with peaked T waves before the arrest?', a: 'CPR, epinephrine, plus calcium and sodium bicarbonate for hyperkalemia', wrong: ['Defibrillate at 360 J', 'Atropine 1 mg', 'Adenosine 6 mg'], why: 'TN SOP 105: known hyperkalemia gets sodium bicarbonate 1 mEq/kg and calcium chloride 500 mg.' },
  { group: 'rosc', q: 'SpO2 target after ROSC?', a: '90–98%', wrong: ['100%', '85–88%', 'Above 99%'], why: 'Avoid both hypoxia and too much oxygen.' },
  { group: 'rosc', q: 'PaCO2 target after ROSC?', a: '35–45 mm Hg', wrong: ['20–25 mm Hg', '50–60 mm Hg', 'As low as possible'], why: 'Hyperventilation lowers CO2, narrows brain vessels and lowers blood return to the heart.' },
  { group: 'rosc', q: 'Blood pressure target after ROSC?', a: 'MAP 65 mm Hg or higher', wrong: ['MAP 40 mm Hg or higher', 'Systolic above 200', 'Diastolic below 50'], why: 'TN SOP 113 uses systolic above 90.' },
  { group: 'rosc', q: 'Temperature control goal for a post-arrest patient not following commands?', a: '32–37.5 °C', wrong: ['28–30 °C', '38–39 °C', 'No temperature control needed'] },
  { group: 'rosc', q: 'Post-arrest 12-lead shows a STEMI. Where does the patient go?', a: 'Emergency coronary angiography (PCI center)', wrong: ['Nearest non-PCI hospital for observation', 'Home after 24 hours', 'Wait for troponin before deciding'] },
  { group: 'rosc', q: 'How long to wait before judging neurologic prognosis after ROSC?', a: 'At least 72 hours after ROSC or normothermia', wrong: ['12 hours', 'In the field, right after ROSC', '30 minutes'] },
  { group: 'rosc', q: 'Glucose range after ROSC?', a: '70–180 mg/dL', wrong: ['40–60 mg/dL', '200–300 mg/dL', 'Do not check it'] },
  { group: 'brady', q: 'Heart rate that defines bradycardia in the AHA algorithm?', a: 'Typically below 50/min', wrong: ['Below 70/min', 'Below 30/min', 'Below 100/min'], why: 'TN SOP 102 treats a rate below 60 with poor perfusion.' },
  { group: 'brady', q: 'First drug for symptomatic bradycardia?', a: 'Atropine', wrong: ['Adenosine', 'Amiodarone', 'Diltiazem'] },
  { group: 'brady', q: 'Atropine does not work. Next step?', a: 'Transcutaneous pacing or a dopamine/epinephrine drip', wrong: ['Adenosine 6 mg', 'Synchronized cardioversion', 'Amiodarone 150 mg'] },
  { group: 'brady', q: 'Which bradycardia patients should get pacing early instead of relying on atropine?', a: 'High-degree blocks (type II 2nd-degree, 3rd-degree)', wrong: ['Sinus bradycardia in an athlete', 'First-degree AV block', 'Asymptomatic patients'], why: 'Standard teaching: the block is below the AV node, where atropine has little effect.' },
  { group: 'brady', q: 'How do you confirm mechanical capture when pacing?', a: 'Feel a femoral pulse that matches the paced rate', wrong: ['Feel the carotid pulse', 'Look for pacer spikes alone', 'Check the SpO2 waveform only'], why: 'Standard teaching: pacing makes muscles twitch, which can feel like a carotid pulse.' },
  { group: 'brady', q: 'Signs that a bradycardia is unstable?', a: 'Hypotension, altered mental status, shock, ischemic chest pain, acute heart failure', wrong: ['Rate below 60 alone', 'Any AV block on the monitor', 'Patient on a beta blocker'] },
  { group: 'tachy', q: 'Heart rate at which a tachyarrhythmia usually causes symptoms?', a: '150/min or more', wrong: ['100/min', '120/min', '200/min'] },
  { group: 'tachy', q: 'Unstable tachycardia with a pulse. Treatment?', a: 'Synchronized cardioversion', wrong: ['Unsynchronized defibrillation', 'Atropine', 'Vagal maneuvers first'] },
  { group: 'tachy', q: 'Why synchronize the shock in a patient with a pulse?', a: 'So it does not land on the T wave and cause VF', wrong: ['To use less battery', 'So the pads stick better', 'To make the shock less painful'] },
  { group: 'tachy', q: 'Narrow-complex QRS width?', a: 'Less than 0.12 s', wrong: ['Less than 0.20 s', 'Less than 0.04 s', 'More than 0.12 s'] },
  { group: 'tachy', q: 'Stable regular narrow-complex tachycardia. First treatment?', a: 'Vagal maneuvers', wrong: ['Adenosine 12 mg', 'Synchronized cardioversion', 'Amiodarone 300 mg'] },
  { group: 'tachy', q: 'How is adenosine given?', a: 'Rapid IV push followed right away by a saline flush', wrong: ['Slow IV push over 2 minutes', 'IM in the deltoid', 'Infusion over 10 minutes'], why: 'Its half-life is under 10 seconds.' },
  { group: 'tachy', q: 'Adenosine in a wide-complex tachycardia?', a: 'Only if regular and monomorphic', wrong: ['Always first line', 'Only if irregular', 'Never'] },
  { group: 'tachy', q: 'Which rhythm should never get adenosine, diltiazem or other AV nodal blockers?', a: 'Irregular wide-complex tachycardia (possible A-fib with WPW)', wrong: ['Regular narrow-complex SVT', 'Sinus tachycardia from fever', 'Atrial flutter with narrow QRS'], why: 'Standard teaching: blocking the AV node can push conduction down the accessory pathway into VF.' },
  { group: 'tachy', q: 'Unstable polymorphic VT with a pulse. Treatment?', a: 'Unsynchronized defibrillation', wrong: ['Synchronized cardioversion at 50 J', 'Adenosine 6 mg', 'Vagal maneuvers'], why: 'Standard teaching: the monitor cannot find a consistent R wave to synchronize to.' },
  { group: 'tachy', q: 'Sinus tachycardia at 140 from a fever. Treatment?', a: 'Treat the cause (fever, pain, volume)', wrong: ['Synchronized cardioversion', 'Adenosine 6 mg', 'Amiodarone 150 mg'] },
  { group: 'acs', q: '12-lead ECG goal for chest pain?', a: 'Within 10 minutes of first medical contact', wrong: ['Within 30 minutes', 'At the hospital only', 'Within 60 minutes'] },
  { group: 'acs', q: 'First medical contact to balloon goal for STEMI?', a: '90 minutes or less', wrong: ['3 hours or less', '30 minutes or less', '6 hours or less'] },
  { group: 'acs', q: 'Door-to-needle goal for fibrinolysis?', a: '30 minutes or less', wrong: ['90 minutes or less', '10 minutes or less', '2 hours or less'] },
  { group: 'acs', q: 'When does a chest pain patient need oxygen in ACS?', a: 'When SpO2 is below 90%', wrong: ['Always, at 15 L/min', 'Only if pain is above 7/10', 'Never'], why: 'TN SOP 103 gives 2–6 L/min to keep SpO2 above 92%.' },
  { group: 'acs', q: 'Inferior STEMI with low blood pressure. Before nitro, what do you check?', a: 'A right-sided 12-lead (V4R) for right ventricular infarct', wrong: ['A peak flow', 'A glucose only', 'Nothing: nitro always helps'], why: 'Standard teaching: RV infarcts are preload dependent and nitro can drop the BP hard.' },
  { group: 'stroke', q: 'Most important time to find out on a stroke call?', a: 'When the patient was last known normal', wrong: ['When 911 was called', 'When symptoms were discovered', 'When the patient last ate'] },
  { group: 'stroke', q: 'Which bedside test must be done on every suspected stroke?', a: 'Blood glucose', wrong: ['Peak flow', 'Orthostatic vitals', 'Pupil size only'], why: 'Hypoglycemia can look exactly like a stroke.' },
  { group: 'stroke', q: 'Which stroke scale do Tennessee protocols use?', a: 'C-STAT', wrong: ['NIHSS', 'GCS only', 'APGAR'], why: 'A C-STAT above 2 suggests a large vessel occlusion: go to a thrombectomy-capable center.' }
];

// "Here is the monitor. What next?"
window.ACLS_STRIP_QS = [
  { group: 'arrest', rhythm: 'vf', ctx: 'Unresponsive, not breathing, no pulse. CPR is going and the pads are on.', a: 'Defibrillate, then resume CPR right away', wrong: ['Synchronized cardioversion at 100 J', 'Atropine 1 mg', 'Check a pulse for 30 seconds'], why: 'VF is shockable. Shock, then 2 minutes of CPR before the next rhythm check.' },
  { group: 'arrest', rhythm: 'vt', label: 'Pulseless ventricular tachycardia', ctx: 'The patient is unresponsive with no pulse. This is on the monitor.', a: 'Defibrillate (unsynchronized), then resume CPR', wrong: ['Synchronized cardioversion at 50 J', 'Adenosine 6 mg', 'Amiodarone 150 mg over 10 min'], why: 'Pulseless VT is treated exactly like VF.' },
  { group: 'arrest', rhythm: 'asystole', ctx: 'No pulse, CPR in progress. Leads are on and the gain is turned up; the flat line shows in two leads.', a: 'Continue CPR and give epinephrine as soon as possible', wrong: ['Defibrillate at 200 J', 'Synchronized cardioversion', 'Atropine 1 mg every 3 min'], why: 'Asystole is not shockable. CPR, epinephrine early, and look for the cause.', tn: 'TN SOP 109: epinephrine 0.5 mg every 3–5 min.' },
  { group: 'arrest', rhythm: 'sinus-brady', label: 'PEA (organized rhythm, no pulse)', ctx: 'There is an organized rhythm on the monitor but no carotid or femoral pulse.', a: 'CPR, epinephrine, and search for reversible causes', wrong: ['Defibrillate', 'Transcutaneous pacing at 80/min', 'Atropine 1 mg'], why: 'This is PEA. Treat it like asystole and hunt for the H\'s and T\'s.' },
  { group: 'arrest', rhythm: 'torsades', ctx: 'The patient collapses and is pulseless. This is on the monitor. Their QT was long earlier.', a: 'Defibrillate and give magnesium 1–2 g', wrong: ['Synchronized cardioversion at 50 J', 'Adenosine 6 mg', 'Atropine 1 mg'], why: 'Pulseless torsades is treated as VF, with magnesium added.' },
  { group: 'arrest', rhythm: 'vf', ctx: 'Third shock delivered, CPR resumed. Epinephrine was given after the second shock. VF continues.', a: 'Amiodarone 300 mg IV/IO', wrong: ['Amiodarone 150 mg over 10 min', 'Atropine 1 mg', 'Stop CPR to intubate'], why: 'Refractory VF after the third shock: amiodarone 300 mg (or lidocaine 1–1.5 mg/kg).' },
  { group: 'rosc', rhythm: 'sinus-tach', ctx: 'After the last shock, this rhythm appears and the patient has a femoral pulse. BP 78/44.', a: 'Post-arrest care: fluids and a pressor to MAP 65 or more, 12-lead', wrong: ['Resume compressions', 'Adenosine 6 mg for the tachycardia', 'Synchronized cardioversion'], why: 'Sinus tachycardia after ROSC is compensation. Do not try to slow it; fix the pressure.', tn: 'TN SOP 113: 250 mL NS boluses to systolic above 90, then an epinephrine drip.' },
  { group: 'brady', rhythm: 'avb-3', ctx: 'HR 34, BP 70/40, pale and confused.', a: 'Atropine 1 mg while getting ready to pace', wrong: ['Adenosine 6 mg', 'Defibrillate', 'Observe and transport'], why: 'Symptomatic complete heart block: atropine may not work, so get the pacer ready at the same time.', tn: 'TN SOP 102: atropine 0.5 mg and pacer pads on.' },
  { group: 'brady', rhythm: 'avb-2-2', ctx: 'HR 38, BP 76/50, dizzy and sweaty. Atropine 1 mg did nothing.', a: 'Transcutaneous pacing (or a dopamine/epinephrine drip)', wrong: ['More atropine every minute', 'Amiodarone 150 mg', 'Synchronized cardioversion'], why: 'Type II blocks often do not respond to atropine.' },
  { group: 'brady', rhythm: 'sinus-brady', ctx: 'HR 46, BP 128/78, warm and dry, talking normally. A runner.', a: 'Monitor, look for a cause, no drugs needed', wrong: ['Atropine 1 mg', 'Transcutaneous pacing', 'Dopamine drip'], why: 'Bradycardia without poor perfusion does not need treatment.' },
  { group: 'tachy', rhythm: 'svt', ctx: 'HR 190, BP 124/80, palpitations, alert and talking.', a: 'Vagal maneuvers, then adenosine', wrong: ['Synchronized cardioversion right away', 'Defibrillate', 'Atropine'], why: 'Stable, regular, narrow: vagal maneuvers first, then adenosine 6 mg, then 12 mg.', tn: 'TN SOP 107: adenosine 12 mg first.' },
  { group: 'tachy', rhythm: 'svt', ctx: 'HR 210, BP 72/40, confused and clammy.', a: 'Synchronized cardioversion (sedate if possible)', wrong: ['Vagal maneuvers and wait', 'Diltiazem', 'Defibrillate unsynchronized'], why: 'Unstable tachycardia with a pulse gets synchronized cardioversion.', tn: 'TN SOP 107: 50, 100, then 200 J.' },
  { group: 'tachy', rhythm: 'vt', label: 'Monomorphic ventricular tachycardia (with a pulse)', ctx: 'HR 160, BP 118/76, mild palpitations, alert.', a: 'Amiodarone 150 mg IV over 10 min', wrong: ['Amiodarone 300 mg IV push', 'Defibrillate', 'Atropine 1 mg'], why: 'Stable wide-complex tachycardia: antiarrhythmic infusion and expert consult. Adenosine is an option only if regular and monomorphic.' },
  { group: 'tachy', rhythm: 'vt', label: 'Monomorphic ventricular tachycardia (with a pulse)', ctx: 'HR 170, BP 70/palp, chest pain and confusion.', a: 'Synchronized cardioversion', wrong: ['Amiodarone 150 mg and wait 10 min', 'Adenosine 6 mg', 'Vagal maneuvers'], why: 'VT with a pulse and signs of instability: synchronized cardioversion.' },
  { group: 'tachy', rhythm: 'afib', ctx: 'HR 150 irregular, BP 132/84, mild palpitations for 2 hours. Narrow QRS.', a: 'Rate control (beta blocker or calcium channel blocker) and expert consult', wrong: ['Adenosine 12 mg to convert it', 'Defibrillate', 'Atropine'], why: 'Stable narrow, irregular: rate control. Adenosine will not convert A-fib.' },
  { group: 'tachy', rhythm: 'torsades', ctx: 'HR about 220, the patient has a weak pulse and is passing out.', a: 'Unsynchronized defibrillation and magnesium 1–2 g', wrong: ['Synchronized cardioversion at 50 J', 'Adenosine 6 mg', 'Amiodarone 300 mg IV push only'], why: 'Unstable polymorphic VT cannot be synchronized.', tn: 'TN SOP 108 lists cardioversion at 50, 100, then 200 J and magnesium 1–2 g.' },
  { group: 'tachy', rhythm: 'sinus-tach', ctx: 'HR 132, temperature 39.4 °C, BP 104/64, flu symptoms for 3 days.', a: 'Treat the cause: fluids, cooling, fever control', wrong: ['Adenosine 6 mg', 'Synchronized cardioversion', 'Amiodarone 150 mg'], why: 'Sinus tachycardia is a response, not the problem.' },
  { group: 'acs', rhythm: 'nsr', ctx: 'Crushing chest pain for 30 minutes, BP 148/90, SpO2 97%. The 12-lead shows ST elevation in II, III and aVF.', a: 'Aspirin, a right-sided ECG, and STEMI alert to a PCI center', wrong: ['High-flow oxygen and wait for symptoms to pass', 'Nitroglycerin x3 without checking anything', 'Transport to the closest non-PCI hospital'], why: 'Inferior STEMI: aspirin, check V4R before nitro, and get to the cath lab.', tn: 'TN SOP 103: aspirin 324 mg, transmit the 12-lead to a PCI-capable hospital.' }
];

// Megacodes: each runs through 4–6 stages like an ACLS testing station.
window.ACLS_MEGACODES = [
  {
    id: 'vf-witnessed', group: 'arrest', name: 'Witnessed collapse at the gym',
    path: 'VF → VF → VF → ROSC',
    patient: 'A 56-year-old man collapsed on a treadmill. Bystanders started CPR. You arrive 4 minutes later.',
    stages: [
      { clock: '0:00', title: 'Arrival', rhythm: 'vf', callRhythm: true, rhythmWrong: ['Asystole', 'Ventricular tachycardia', 'Atrial fibrillation'], vitals: [['Pulse', 'None'], ['Breathing', 'None'], ['CPR', 'Bystander']],
        text: 'Your partner takes over compressions. The pads go on.',
        q: [{ ask: 'What do you do now?', a: 'Shock (biphasic per the device, e.g. 200 J), then CPR right away', wrong: ['Check a pulse for 30 seconds first', 'Intubate before shocking', 'Synchronized cardioversion at 100 J'], why: 'Early defibrillation is the most important treatment for VF. Resume CPR immediately after the shock without a pulse check.' }] },
      { clock: '2:00', title: 'Rhythm check 2', rhythm: 'vf', vitals: [['Pulse', 'None'], ['Access', 'IV placed'], ['Airway', 'Bag-mask, OPA']],
        text: 'Two minutes of CPR done. The rhythm is unchanged.',
        q: [
          { ask: 'Next?', a: 'Shock, resume CPR, then give epinephrine 1 mg', wrong: ['Amiodarone 300 mg before any more shocks', 'Atropine 1 mg', 'Stop and check a pulse for 20 seconds'], why: 'In VF, epinephrine comes after the first shocks fail (usually after the 2nd shock), every 3–5 min after that.', tn: 'TN SOP 110: epinephrine 0.5 mg IV/IO.' },
          { ask: 'Vascular access was hard. What does the 2025 guideline say?', a: 'Try IV first; go IO if IV fails or is not feasible', wrong: ['Always go IO first in arrest', 'Give the drugs down the ET tube', 'Wait for a central line'], why: 'New in 2025: IV first, IO as the backup.' }
        ] },
      { clock: '4:00', title: 'Rhythm check 3', rhythm: 'vf', vitals: [['Pulse', 'None'], ['ETCO2', '12 mm Hg'], ['Airway', 'i-gel placed']],
        text: 'Still VF. A supraglottic airway is in and capnography is attached.',
        q: [
          { ask: 'Next?', a: 'Shock, CPR, then amiodarone 300 mg IV', wrong: ['Amiodarone 150 mg over 10 minutes', 'Lidocaine 3 mg/kg', 'Another epinephrine right now'], why: 'After the 3rd shock, amiodarone 300 mg (or lidocaine 1–1.5 mg/kg). Epinephrine is not due until 3–5 min after the last dose.' },
          { ask: 'ETCO2 is 12 mm Hg. What does it tell you?', a: 'CPR quality could be better: push harder, change compressors, do not over-ventilate', wrong: ['ROSC has happened', 'The airway is in the esophagus for sure', 'Nothing useful during CPR'], why: 'Low or falling ETCO2 means reassess CPR quality.' },
          { ask: 'How do you ventilate now that the i-gel is in?', a: '1 breath every 6 seconds with continuous compressions', wrong: ['30:2 with pauses', '1 breath every 2 seconds', 'Stop ventilating, compressions only'], why: 'With an advanced airway: 10 breaths/min, no pauses for breaths.', tn: 'TN SOP 101: tidal volume no more than 500 mL.' }
        ] },
      { clock: '6:00', title: 'Rhythm check 4', rhythm: 'sinus-tach', callRhythm: true, rhythmWrong: ['Ventricular tachycardia', 'Supraventricular tachycardia', 'Atrial flutter'], vitals: [['ETCO2', 'Jumped to 42 mm Hg'], ['Pulse', 'Strong femoral'], ['BP', '84/50 (MAP 61)'], ['SpO2', '99% on 100%']],
        text: 'Before the check you saw ETCO2 jump. Now there is an organized rhythm.',
        q: [
          { ask: 'What is your priority now?', a: 'Post-arrest care: titrate O2 to 90–98%, raise the pressure to MAP 65, get a 12-lead', wrong: ['Shock again to be safe', 'Adenosine for the fast rate', 'Hyperventilate to blow off CO2'], why: 'ROSC. Avoid hypoxia, hyperoxia, hyperventilation and hypotension.', tn: 'TN SOP 113: 250 mL NS boluses to systolic above 90, then an epinephrine drip.' },
          { ask: 'The 12-lead shows ST elevation in V1–V4. Where do you go?', a: 'A PCI center for emergency coronary angiography', wrong: ['The closest hospital without a cath lab', 'Wait in the field for 20 minutes to see if it settles', 'Home with follow-up'], why: 'Post-arrest STEMI needs emergency cardiac intervention.' }
        ] }
    ],
    debrief: ['Shock VF as soon as the pads are on, and go straight back to compressions.', 'Epinephrine after the 2nd shock, amiodarone 300 mg after the 3rd.', 'Use ETCO2 to judge CPR quality and to spot ROSC.', 'After ROSC: SpO2 90–98%, MAP 65 or more, 12-lead, PCI for STEMI.']
  },
  {
    id: 'brady-arrest', group: 'brady', name: 'Dizzy grandfather',
    path: 'Complete heart block → pacing → VF → ROSC',
    patient: 'A 74-year-old man is dizzy and nearly passed out in his kitchen. He takes metoprolol.',
    stages: [
      { title: 'First look', rhythm: 'avb-3', callRhythm: true, rhythmWrong: ['Second-degree AV block type I (Wenckebach)', 'Sinus bradycardia', 'Idioventricular rhythm'], vitals: [['HR', '36'], ['BP', '72/40'], ['SpO2', '93%'], ['Skin', 'Pale, cool, clammy']],
        text: 'He is confused and slow to answer.',
        q: [
          { ask: 'Is this bradycardia stable or unstable?', a: 'Unstable: hypotension and altered mental status', wrong: ['Stable: he can still talk', 'Stable: any rate above 30 is fine', 'You cannot tell without a 12-lead'], why: 'Unstable means hypotension, altered mental status, shock, ischemic chest pain or acute heart failure.' },
          { ask: 'First treatment?', a: 'Atropine 1 mg IV and get the pacer pads on', wrong: ['Adenosine 6 mg', 'Amiodarone 150 mg', 'Synchronized cardioversion'], why: 'Atropine first, but third-degree block often does not respond, so get pacing ready at the same time.', tn: 'TN SOP 102: atropine 0.5 mg, pacer pads for 2nd/3rd-degree blocks.' }
        ] },
      { clock: '3:00', title: 'After atropine', rhythm: 'avb-3', vitals: [['HR', '36'], ['BP', '70/38'], ['Mental status', 'Worse']],
        text: 'No change after atropine.',
        q: [
          { ask: 'Next?', a: 'Transcutaneous pacing (or a dopamine or epinephrine drip)', wrong: ['Atropine 3 mg all at once', 'Defibrillate', 'Wait 10 minutes for the atropine to work'], why: 'If atropine fails: pacing and/or dopamine 5–20 mcg/kg/min or epinephrine 2–10 mcg/min.' },
          { ask: 'Metoprolol is on his med list. What else could help?', a: 'Glucagon for a possible beta blocker effect (per protocol)', wrong: ['More metoprolol', 'Adenosine', 'Diltiazem'], why: 'Beta blockers are a reversible cause of bradycardia.', tn: 'TN SOP 102: glucagon 1–2 mg IV/IM for suspected beta blocker ingestion.' }
        ] },
      { clock: '6:00', title: 'Pacing', rhythm: 'paced', callRhythm: true, rhythmWrong: ['Ventricular tachycardia', 'Idioventricular rhythm', 'Accelerated junctional rhythm'], vitals: [['Pacer', 'Rate 70, 80 mA'], ['BP', '98/60']],
        text: 'Every spike is followed by a wide QRS.',
        q: [{ ask: 'How do you confirm mechanical capture?', a: 'A femoral pulse that matches the pacer rate', wrong: ['A carotid pulse', 'The spikes on the monitor', 'The SpO2 number'], why: 'Pacing makes the neck muscles twitch, which can feel like a carotid pulse.' }] },
      { clock: '12:00', title: 'Sudden change', rhythm: 'vf', callRhythm: true, rhythmWrong: ['Torsades de pointes', 'Asystole', 'Atrial flutter'], vitals: [['Pulse', 'None'], ['Responsive', 'No']],
        text: 'On the way to the truck he goes unresponsive.',
        q: [{ ask: 'What do you do?', a: 'Turn the pacer off, start CPR and defibrillate', wrong: ['Increase the pacer mA', 'Atropine 1 mg', 'Synchronized cardioversion at 50 J'], why: 'He is in VF now. Pacing does nothing for VF: CPR and shock.' }] },
      { clock: '14:00', title: 'Rhythm check', rhythm: 'avb-3', label: 'Third-degree AV block (complete heart block) with a pulse', vitals: [['Pulse', 'Weak carotid'], ['BP', '80/46'], ['HR', '40']],
        text: 'After one shock and 2 minutes of CPR there is an organized rhythm with a pulse.',
        q: [{ ask: 'Next?', a: 'Restart transcutaneous pacing and support the blood pressure', wrong: ['Amiodarone 300 mg to prevent more VF', 'Lidocaine for the wide escape beats', 'Stop all treatment'], why: 'ROSC, but the block is back. Pace again. Do not suppress the escape rhythm with antiarrhythmics.', tn: 'TN SOP 102: if PVCs are present with bradycardia, do not give amiodarone or lidocaine.' }] }
    ],
    debrief: ['Unstable bradycardia: atropine 1 mg, max 3 mg, and have pacing ready.', 'If atropine fails: pace, or dopamine 5–20 mcg/kg/min, or epinephrine 2–10 mcg/min.', 'Confirm capture with a femoral pulse.', 'Look for causes: beta blockers, calcium channel blockers, digoxin, hyperkalemia, ischemia.']
  },
  {
    id: 'svt-unstable', group: 'tachy', name: 'Racing heart at the office',
    path: 'Stable SVT → adenosine → unstable SVT → cardioversion',
    patient: 'A 34-year-old woman says her heart started racing 40 minutes ago at work.',
    stages: [
      { title: 'First look', rhythm: 'svt', callRhythm: true, rhythmWrong: ['Sinus tachycardia', 'Atrial fibrillation', 'Ventricular tachycardia'], vitals: [['HR', '196, regular'], ['BP', '118/74'], ['SpO2', '98%'], ['Mental status', 'Alert']],
        text: 'She feels the pounding in her neck but no chest pain or shortness of breath. Narrow QRS.',
        q: [
          { ask: 'First treatment?', a: 'Vagal maneuvers (modified Valsalva)', wrong: ['Synchronized cardioversion', 'Adenosine 12 mg slow IV', 'Amiodarone 300 mg'], why: 'Stable, regular, narrow: vagal maneuvers first.', tn: 'TN SOP 107: Valsalva 15 s, then lie flat with the legs lifted 45° for 15 s.' }
        ] },
      { clock: '4:00', title: 'Vagal maneuvers failed', rhythm: 'svt', vitals: [['HR', '194'], ['BP', '116/72'], ['IV', '18 g left antecubital']],
        text: 'No change after vagal maneuvers.',
        q: [
          { ask: 'Next?', a: 'Adenosine 6 mg rapid IV push with a 20 mL flush', wrong: ['Adenosine 6 mg slow IV over 2 min', 'Diltiazem 2.5 mg/kg', 'Atropine 1 mg'], why: 'AHA: 6 mg rapid push, then 12 mg if needed.', tn: 'TN SOP 107 starts with 12 mg rapid IV, and repeats 12 mg once.' },
          { ask: 'What should you warn her about before you push it?', a: 'A few seconds of chest pressure, flushing or a feeling of doom', wrong: ['Hours of drowsiness', 'A burning rash', 'Nothing: it has no side effects'], why: 'Adenosine briefly stops AV conduction; the effects pass in seconds.' }
        ] },
      { clock: '7:00', title: 'Still going', rhythm: 'svt', vitals: [['HR', '198'], ['BP', '110/70']],
        text: 'There was a brief pause after the first dose, then SVT came right back.',
        q: [{ ask: 'Next dose?', a: 'Adenosine 12 mg rapid IV push', wrong: ['Adenosine 6 mg again', 'Adenosine 24 mg', 'Lidocaine 1 mg/kg'], why: 'The second dose is 12 mg.', tn: 'TN: 12 mg again (12, then 12).' }] },
      { clock: '10:00', title: 'Getting worse', rhythm: 'svt', vitals: [['HR', '210'], ['BP', '74/40'], ['Mental status', 'Confused, pale']],
        text: 'She says the room is spinning and she is getting harder to talk to.',
        q: [
          { ask: 'Next?', a: 'Sedate if possible and do synchronized cardioversion', wrong: ['Unsynchronized defibrillation at 360 J', 'A third dose of adenosine', 'Vagal maneuvers again'], why: 'She is now unstable: synchronized cardioversion.', tn: 'TN SOP 107: midazolam or diazepam 2–5 mg IV, then 50, 100, 200 J.' },
          { ask: 'You press shock but nothing happens for a moment. Why?', a: 'The device is waiting to time the shock to the R wave', wrong: ['The pads are broken', 'The battery is dead', 'It always fires one second late on purpose for safety'], why: 'Synchronized mode waits for a QRS so the shock does not land on the T wave.' }
        ] },
      { clock: '11:00', title: 'After cardioversion', rhythm: 'nsr', callRhythm: true, rhythmWrong: ['Sinus bradycardia', 'First-degree AV block', 'Junctional escape rhythm'], vitals: [['HR', '88'], ['BP', '112/70'], ['Mental status', 'Alert']],
        text: 'She converted after the shock.',
        q: [{ ask: 'Now?', a: '12-lead, monitor, transport; the device may still be in sync mode if you need to shock again', wrong: ['Shock again to be sure', 'Give amiodarone 300 mg IV push', 'Release her at the scene'], why: 'Recheck the 12-lead (look for WPW) and remember most monitors keep or drop sync mode after a shock depending on the model.' }] }
    ],
    debrief: ['Stable SVT: vagal maneuvers, then adenosine 6 mg, then 12 mg (TN: 12 and 12).', 'Push adenosine fast with a flush, in a vein close to the heart.', 'Unstable at any point: sedate and do synchronized cardioversion.', 'TN energies for SVT: 50, 100, then 200 J.']
  },
  {
    id: 'pea-dialysis', group: 'arrest', name: 'Missed dialysis',
    path: 'PEA → PEA → asystole → ROSC',
    patient: 'A 61-year-old woman on dialysis missed her last two sessions. Her family found her unresponsive.',
    stages: [
      { clock: '0:00', title: 'Arrival', rhythm: 'idioventricular', label: 'PEA (wide, slow organized rhythm, no pulse)', vitals: [['Pulse', 'None'], ['Breathing', 'Agonal'], ['Fistula', 'Left arm']],
        text: 'You see a slow, wide organized rhythm. There is no carotid or femoral pulse.',
        q: [
          { ask: 'What is this?', a: 'PEA', wrong: ['Third-degree heart block with a pulse', 'Ventricular fibrillation', 'Normal sinus rhythm'], why: 'Any organized rhythm without a pulse is PEA.' },
          { ask: 'First actions?', a: 'CPR and epinephrine as soon as possible', wrong: ['Defibrillate at 200 J', 'Transcutaneous pacing', 'Atropine 1 mg every 3 min'], why: 'PEA is not shockable. Epinephrine early.', tn: 'TN SOP 105: epinephrine 1 mg IV/IO as early as possible.' }
        ] },
      { clock: '2:00', title: 'Rhythm check 2', rhythm: 'idioventricular', label: 'PEA (wide, slow organized rhythm, no pulse)', vitals: [['Pulse', 'None'], ['History', 'Missed dialysis x2'], ['Earlier ECG', 'Peaked T waves (family\'s urgent care visit)']],
        text: 'Still PEA. You think about why.',
        q: [
          { ask: 'Which reversible cause fits best?', a: 'Hyperkalemia', wrong: ['Hypothermia', 'Tension pneumothorax', 'Hypoglycemia'], why: 'Missed dialysis, wide QRS and peaked T waves point to high potassium.' },
          { ask: 'Treatment for it?', a: 'Calcium and sodium bicarbonate (per protocol) with CPR and epinephrine', wrong: ['Potassium chloride', 'Adenosine', 'Amiodarone 300 mg'], why: 'Calcium stabilizes the heart; bicarbonate shifts potassium into the cells. 2025: routine calcium is not recommended, but suspected hyperkalemia is the reason to consider it.', tn: 'TN SOP 105: known hyperkalemia gets sodium bicarbonate 1 mEq/kg and calcium chloride 500 mg IV.' }
        ] },
      { clock: '6:00', title: 'Rhythm check 4', rhythm: 'asystole', callRhythm: true, rhythmWrong: ['Ventricular fibrillation', 'Sinus arrest', 'Idioventricular rhythm'], vitals: [['Pulse', 'None'], ['ETCO2', '18 mm Hg']],
        text: 'The rhythm is now a flat line.',
        q: [
          { ask: 'Before you call it asystole, what do you check?', a: 'Leads connected, gain up, a second lead', wrong: ['Shock to see if it is fine VF', 'Nothing: a flat line is always asystole', 'Pupils'], why: 'Rule out a loose lead or low gain.' },
          { ask: 'It is real asystole. Next?', a: 'CPR, epinephrine every 3–5 min, keep treating the cause', wrong: ['Defibrillate', 'Transcutaneous pacing as the main treatment', 'Atropine 1 mg'], why: 'Asystole is not shockable, and pacing does not help in arrest.', tn: 'TN SOP 109: epinephrine 0.5 mg every 3–5 min; calcium chloride 500 mg for renal failure/dialysis.' }
        ] },
      { clock: '10:00', title: 'Rhythm check 6', rhythm: 'sinus-brady', label: 'Sinus bradycardia with a pulse', vitals: [['Pulse', 'Present'], ['BP', '86/52'], ['ETCO2', '38 mm Hg']],
        text: 'An organized rhythm returns, and this time you feel a femoral pulse.',
        q: [{ ask: 'Next?', a: 'Post-arrest care: support BP to MAP 65, SpO2 90–98%, 12-lead, transport to a hospital that can dialyze', wrong: ['Resume compressions', 'Stop all fluids and pressors', 'Give more potassium'], why: 'ROSC. The cause still needs fixing: dialysis.' }] }
    ],
    debrief: ['Organized rhythm without a pulse is PEA: CPR and epinephrine early.', 'In PEA and asystole, the fix is the cause: think H\'s and T\'s.', 'Dialysis patient: think hyperkalemia; calcium and sodium bicarbonate.', 'Confirm asystole in a second lead with the gain up.']
  },
  {
    id: 'vt-pulse', group: 'tachy', name: 'Wide and fast',
    path: 'Stable VT → unstable VT → pulseless VT → ROSC',
    patient: 'A 67-year-old man with an old heart attack feels "fluttery" and weak.',
    stages: [
      { title: 'First look', rhythm: 'vt', label: 'Monomorphic ventricular tachycardia', callRhythm: true, rhythmWrong: ['Supraventricular tachycardia', 'Atrial flutter', 'Torsades de pointes'], vitals: [['HR', '164, regular'], ['BP', '122/78'], ['Mental status', 'Alert'], ['QRS', '0.16 s']],
        text: 'He is talking, a little anxious, no chest pain.',
        q: [
          { ask: 'Stable or unstable?', a: 'Stable', wrong: ['Unstable: any VT is unstable', 'Unstable: the rate is over 150', 'Pulseless'], why: 'No hypotension, altered mental status, shock, chest pain or heart failure.' },
          { ask: 'Treatment?', a: 'Amiodarone 150 mg IV over 10 min, 12-lead, expert consult', wrong: ['Amiodarone 300 mg IV push', 'Diltiazem 20 mg', 'Defibrillate'], why: 'Stable wide-complex: antiarrhythmic infusion. Adenosine is an option only if regular and monomorphic.', tn: 'TN SOP 112: Valsalva 10 s, then amiodarone 150 mg over 10 min, up to three doses.' }
        ] },
      { clock: '8:00', title: 'Getting worse', rhythm: 'vt', label: 'Monomorphic ventricular tachycardia', vitals: [['HR', '172'], ['BP', '78/50'], ['Mental status', 'Confused'], ['Chest', 'New pressure']],
        text: 'Halfway through the infusion he gets pale and confused.',
        q: [{ ask: 'Next?', a: 'Sedate if possible and do synchronized cardioversion', wrong: ['Finish the infusion first and recheck', 'Adenosine 6 mg', 'Atropine'], why: 'He is now unstable with a pulse: synchronized cardioversion.', tn: 'TN SOP 112: synchronized cardioversion starting at 50 J; if no conversion, amiodarone 150 mg and 100 J.' }] },
      { clock: '10:00', title: 'Collapse', rhythm: 'vt', label: 'Pulseless ventricular tachycardia', vitals: [['Pulse', 'None'], ['Responsive', 'No']],
        text: 'Before you can sync, his eyes roll back. No pulse.',
        q: [{ ask: 'Next?', a: 'CPR and defibrillate (unsynchronized)', wrong: ['Synchronized cardioversion at 50 J', 'Amiodarone 150 mg over 10 min', 'Check for a pulse for 30 seconds'], why: 'Pulseless VT = VF: unsynchronized shock. A synced shock may never fire if the device cannot find R waves.' }] },
      { clock: '12:00', title: 'Rhythm check', rhythm: 'nsr', label: 'Normal sinus rhythm with a pulse', vitals: [['Pulse', 'Strong'], ['BP', '96/62'], ['SpO2', '95%']],
        text: 'After one shock and CPR, he has a pulse.',
        q: [{ ask: 'Next?', a: 'Post-arrest care and a 12-lead; consider an antiarrhythmic infusion per medical control', wrong: ['Shock again to prevent VT', 'Adenosine 12 mg', 'Stop monitoring'], why: 'ROSC: support BP and oxygen, 12-lead, transport to a PCI center.', tn: 'TN SOP 113: amiodarone 300 mg IV after ROSC; 150 mg if the arrhythmia persists.' }] }
    ],
    debrief: ['Wide and regular: assume VT.', 'Stable: amiodarone 150 mg over 10 min (or procainamide).', 'Unstable with a pulse: synchronized cardioversion.', 'No pulse: unsynchronized defibrillation and CPR.']
  },
  {
    id: 'stemi-vf', group: 'acs', name: 'Chest pain on the porch',
    path: 'Inferior STEMI → VF → ROSC',
    patient: 'A 59-year-old man has crushing chest pain and sweating for 45 minutes.',
    stages: [
      { title: 'First look', rhythm: 'nsr', vitals: [['HR', '84'], ['BP', '138/86'], ['SpO2', '96% on room air'], ['Pain', '9/10, pressure']],
        text: 'He looks gray and sweaty.',
        q: [
          { ask: 'What is the first priority?', a: 'A 12-lead ECG within 10 minutes', wrong: ['High-flow oxygen by NRB', 'Morphine before anything else', 'Wait for symptoms to settle'], why: 'The 12-lead decides where he goes.' },
          { ask: 'SpO2 is 96%. Oxygen?', a: 'Not needed unless SpO2 drops below 90%', wrong: ['15 L/min NRB', '6 L/min nasal cannula for everyone', 'Bag-mask ventilation'], why: 'AHA: oxygen only if SpO2 is below 90%.', tn: 'TN SOP 103: 2–6 L/min nasal cannula to keep SpO2 above 92%; 96% needs none.' }
        ] },
      { title: '12-lead', rhythm: 'nsr', vitals: [['12-lead', 'ST elevation II, III, aVF; depression I, aVL'], ['BP', '104/70']],
        text: 'Inferior STEMI.',
        q: [
          { ask: 'Medications?', a: 'Aspirin 162–325 mg chewed; check V4R before nitroglycerin', wrong: ['Nitroglycerin x3 right away', 'Adenosine 6 mg', 'Atropine 1 mg'], why: 'Inferior MI can involve the right ventricle, which depends on preload.', tn: 'TN SOP 103: aspirin 324 mg; nitro only if systolic above 100.' },
          { ask: 'Destination?', a: 'PCI center, STEMI alert and transmit the 12-lead', wrong: ['Closest emergency department', 'Doctor\'s office', 'Wait for a troponin'], why: 'First medical contact to balloon 90 min or less.' }
        ] },
      { clock: '0:00', title: 'In the truck', rhythm: 'vf', callRhythm: true, rhythmWrong: ['Ventricular tachycardia', 'Torsades de pointes', 'Atrial fibrillation'], vitals: [['Pulse', 'None'], ['Responsive', 'No']],
        text: 'He groans and goes limp.',
        q: [{ ask: 'Next?', a: 'Defibrillate, then CPR', wrong: ['Synchronized cardioversion', 'Amiodarone 150 mg over 10 min', 'Pull over and call medical control first'], why: 'Witnessed VF on the monitor: shock right away.' }] },
      { clock: '2:00', title: 'Rhythm check', rhythm: 'sinus-tach', label: 'Sinus tachycardia with a pulse', vitals: [['Pulse', 'Present'], ['BP', '92/60 (MAP 71)'], ['ETCO2', '40 mm Hg']],
        text: 'One shock and two minutes of CPR later, he has a pulse.',
        q: [{ ask: 'Next?', a: 'Post-arrest care and continue to the PCI center', wrong: ['Go to the closest non-PCI hospital', 'Give adenosine for the fast rate', 'Hyperventilate'], why: 'Post-arrest STEMI: emergency coronary angiography.' }] }
    ],
    debrief: ['12-lead within 10 minutes; transmit it.', 'Aspirin chewed; oxygen only if SpO2 is low (TN: above 92%).', 'Inferior STEMI: check V4R and blood pressure before nitro.', 'STEMI patients can go into VF without warning: pads on.']
  },
  {
    id: 'torsades', group: 'tachy', name: 'Fainting spells',
    path: 'Torsades with a pulse → pulseless torsades → ROSC',
    patient: 'A 48-year-old woman on methadone and a new antibiotic keeps passing out.',
    stages: [
      { title: 'First look', rhythm: 'torsades', callRhythm: true, rhythmWrong: ['Ventricular fibrillation', 'Monomorphic ventricular tachycardia', 'Atrial flutter'], vitals: [['HR', 'About 220'], ['BP', '70/palp'], ['Mental status', 'Fading in and out']],
        text: 'The QRS twists around the baseline.',
        q: [
          { ask: 'Treatment?', a: 'Unsynchronized defibrillation and magnesium 1–2 g IV', wrong: ['Synchronized cardioversion at 50 J', 'Adenosine 6 mg', 'Amiodarone 150 mg only'], why: 'Unstable polymorphic VT cannot be synchronized; magnesium treats torsades.', tn: 'TN SOP 108: magnesium 1–2 g over 2 min; prepare to cardiovert at 50, 100, then 200 J.' },
          { ask: 'What likely caused it?', a: 'A long QT from her medicines', wrong: ['Hyperkalemia', 'Hypothermia', 'Too much magnesium'], why: 'Methadone and some antibiotics prolong the QT.' }
        ] },
      { clock: '1:00', title: 'Collapse', rhythm: 'torsades', vitals: [['Pulse', 'None']],
        text: 'She loses her pulse.',
        q: [{ ask: 'Next?', a: 'CPR and defibrillate; give magnesium', wrong: ['Synchronized cardioversion', 'Atropine', 'Wait for it to stop on its own'], why: 'Pulseless torsades is treated like VF.' }] },
      { clock: '3:00', title: 'Rhythm check', rhythm: 'nsr', label: 'Normal sinus rhythm with a pulse', vitals: [['Pulse', 'Present'], ['BP', '102/64']],
        text: 'Pulse back.',
        q: [{ ask: 'Next?', a: 'Post-arrest care, 12-lead (QT), and bring her medicines to the hospital', wrong: ['Give more methadone', 'Start amiodarone 300 mg IV push', 'Release her'], why: 'Amiodarone also lengthens the QT, so medical control decides on more antiarrhythmics.' }] }
    ],
    debrief: ['Twisting polymorphic VT with a long QT: torsades.', 'Magnesium 1–2 g.', 'Unstable polymorphic VT: defibrillate, do not sync.', 'Look for QT-prolonging drugs.']
  },
  {
    id: 'stroke', group: 'stroke', name: 'Slurred speech at breakfast',
    path: 'Stroke screen → A-fib → stroke center',
    patient: 'A 70-year-old woman suddenly cannot lift her right arm and her speech is slurred. Her husband called at 8:15.',
    stages: [
      { title: 'First look', rhythm: 'afib', callRhythm: true, rhythmWrong: ['Atrial flutter', 'Wandering atrial pacemaker', 'Sinus arrhythmia'], vitals: [['HR', '96, irregular'], ['BP', '178/96'], ['SpO2', '97%'], ['Glucose', 'Not checked yet']],
        text: 'Right facial droop, right arm drift, slurred speech.',
        q: [
          { ask: 'What do you check first at the bedside?', a: 'Blood glucose', wrong: ['Peak flow', 'Orthostatic vital signs', 'Temperature only'], why: 'Hypoglycemia can look like a stroke.', tn: 'TN: if glucose is below 60, give D10 slowly.' },
          { ask: 'The husband last saw her normal at 7:30 before her shower. What is the time last known normal?', a: '7:30', wrong: ['8:15, when he called', 'When you arrived', 'Unknown, so do not record it'], why: 'The clock starts the last time she was seen normal, not when symptoms were found.' }
        ] },
      { title: 'Decide where to go', rhythm: 'afib', vitals: [['Glucose', '128 mg/dL'], ['Stroke scale', 'Positive, severe (arm, speech, gaze)']],
        text: 'Her eyes are looking to the left.',
        q: [
          { ask: 'Destination?', a: 'A stroke center that can do thrombectomy, with a pre-notification', wrong: ['The closest clinic', 'Wait for her to improve', 'Home with a follow-up'], why: 'A severe stroke suggests a large vessel occlusion: thrombectomy center.', tn: 'TN uses C-STAT: a score above 2 means a center with interventional capability.' },
          { ask: 'BP is 178/96. What do you do about it?', a: 'Nothing in the field unless medical control orders it', wrong: ['Nitroglycerin to get it under 120', 'Labetalol per your own judgment', 'Fluids to raise it'], why: 'The brain may need that pressure.', tn: 'TN: contact Medical Control if systolic above 220 or diastolic above 140.' }
        ] }
    ],
    debrief: ['Glucose on every stroke.', 'Time last known normal, not time found.', 'Severe stroke: thrombectomy-capable center; pre-notify.', 'A-fib on the monitor is a likely cause; get a 12-lead.']
  }
];

window.ACLS_TN_SOURCE = 'From the Tennessee EMS ALS/BLS Blended Protocol Guidelines 2022-23 (the state model protocols, SOP numbers shown) and the class deck Paramedic Pharmacology – TN Protocols. Agencies and medical directors adapt the state guidelines, so check your own.';

window.ACLS_TN = [
  { group: 'arrest', topic: 'Epinephrine in arrest', aha: '1 mg IV/IO every 3–5 min', tnText: '0.5 mg in VF/pVT and asystole; 1 mg as early as possible in PEA. Doses beyond 3 mg total are unlikely to help (SOP 105, 109–111).' },
  { group: 'arrest', topic: 'CPR rate', aha: '100–120/min', tnText: '100–110/min; compressions first, airway after 2 minutes of good CPR; tidal volume no more than 500 mL (SOP 101).' },
  { group: 'arrest', topic: 'Airway in arrest', aha: 'ETT or supraglottic airway, with waveform capnography', tnText: 'Waveform capnography is mandatory; use an i-gel if intubation takes over 30 s; impedance threshold device in all arrests (SOP 101).' },
  { group: 'arrest', topic: 'Hyperkalemia or dialysis arrest', aha: 'Routine calcium and bicarbonate are not recommended; consider them for suspected hyperkalemia', tnText: 'Known hyperkalemia or tricyclic OD: sodium bicarbonate 1 mEq/kg and calcium chloride 500 mg; dialysis or renal failure arrest: calcium chloride 500 mg (SOP 105, 109, 110).' },
  { group: 'arrest', topic: 'Magnesium in arrest', aha: 'Only for torsades', tnText: 'Magnesium 1–2 g slow IV is listed in the asystole and VF/pVT protocols too (SOP 109, 110).' },
  { group: 'rosc', topic: 'Blood pressure after ROSC', aha: 'MAP 65 mm Hg or more', tnText: 'Systolic above 90: 250 mL NS boluses, then epinephrine drip 2–20 mcg/min or push-dose epinephrine 5–10 mcg (SOP 113).' },
  { group: 'rosc', topic: 'Ventilation after ROSC', aha: 'PaCO2 35–45 mm Hg, SpO2 90–98%', tnText: 'ETCO2 above 20, ideally fewer than 12 breaths/min, head of bed 30° (SOP 113).' },
  { group: 'brady', topic: 'Atropine for bradycardia', aha: '1 mg every 3–5 min, max 3 mg', tnText: '0.5 mg, repeat up to 0.04 mg/kg (3 mg); pacer pads on for 2nd/3rd-degree blocks (SOP 102).' },
  { group: 'brady', topic: 'Bradycardia definition', aha: 'Typically below 50/min', tnText: 'Below 60/min with poor perfusion (SOP 102).' },
  { group: 'tachy', topic: 'Adenosine for SVT', aha: '6 mg rapid IV, then 12 mg', tnText: '12 mg rapid IV, repeat 12 mg once; half dose for heart transplant or carbamazepine (SOP 107).' },
  { group: 'tachy', topic: 'Synchronized cardioversion energy', aha: 'The device\'s recommended energy; maximum if unknown', tnText: 'SVT: 50, 100, then 200 J. Wide-complex: start at 50 J, then 100 J after amiodarone (SOP 107, 112).' },
  { group: 'tachy', topic: 'Stable wide-complex tachycardia', aha: 'Amiodarone 150 mg over 10 min or procainamide', tnText: 'Valsalva, then amiodarone 150 mg over 10 min, up to three doses; procainamide is not listed (SOP 112).' },
  { group: 'acs', topic: 'Oxygen in ACS', aha: 'Only if SpO2 is below 90%', tnText: '2–6 L/min nasal cannula to keep SpO2 above 92% (SOP 103).' },
  { group: 'acs', topic: 'Aspirin and nitroglycerin', aha: 'Aspirin 162–325 mg; nitroglycerin SL', tnText: 'Aspirin 324 mg chewed; nitroglycerin 0.4 mg every 5 min x3 only if systolic above 100 (SOP 103).' },
  { group: 'stroke', topic: 'Stroke screen', aha: 'A validated prehospital stroke screen and severity tool', tnText: 'C-STAT; above 2 means a center with thrombectomy, plus the prehospital thrombolytic screen.' }
];
