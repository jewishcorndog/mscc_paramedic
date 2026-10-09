/*
 * Midterm review content. The topic list is the one the instructor gave for
 * the midterm:
 *   negligence (elements, gross negligence); 3 electrolytes and the Na-K pump;
 *   patient assessment; acid-base balance and the 4 disturbances; blood flow
 *   through the heart; the conduction system and intrinsic rates; intubation
 *   DOPE; med math (D/H × V, drip rates); rhythm, ECG and 12-lead analysis;
 *   COPD (emphysema, chronic bronchitis) and acute asthma.
 *
 * Wording follows Sanders' Paramedic Textbook (6th ed.) where the class slides
 * cover it (Ch. 6, 10, 11, 13/14, 21) and standard paramedic curriculum
 * elsewhere. Check anything that matters against your instructor.
 *
 * Topic fields:
 *   points  review sheet, one fact per line
 *   facts   { q, a, wrong[], why? } multiple-choice questions
 *   link    where the app covers it in more depth: [subject, tab, label, learnPage?]
 *   gen     name of a question generator in midterm.js (med math, ABGs)
 *
 * MIDTERM_STRIPS are the 36 strips from the class handout "Send home rhythms"
 * with its answer key. Strips 1-30 were generated with 12LeadTrainer.com.
 */
window.MIDTERM_TOPICS = [
  {
    id: 'negligence', name: 'Negligence', short: 'Negligence',
    link: ['legal', 'learn', 'Legal'],
    points: [
      'Negligence: failing to act as a reasonable, similarly trained paramedic would in the same circumstances (deviation from the standard of care).',
      'The 4 elements, all of which the plaintiff must prove: (1) duty to act, (2) breach of duty, (3) damages (actual harm), (4) proximate cause (the breach caused the harm).',
      'Duty to act: on duty, dispatched, or you started care. It lasts until care is handed off to someone of equal or higher training or the patient competently refuses.',
      'Breach of duty comes in three forms: malfeasance (doing a wrongful or unlawful act), misfeasance (doing a lawful act the wrong way), nonfeasance (failing to do what you were required to do).',
      'Damages: compensable (pays the patient back for real losses: medical bills, lost wages, pain and suffering) vs punitive (punishes willful or reckless conduct).',
      'Proximate cause: the harm must be a foreseeable result of the breach. A mistake that hurt no one is not negligence.',
      'Ordinary negligence is a careless mistake. Gross negligence is a willful, wanton, or reckless disregard for the patient\'s safety (for example, driving drunk on a call, abandoning a patient).',
      'Good Samaritan laws and governmental immunity protect against ordinary negligence, but never against gross negligence or willful misconduct.',
      'Negligence per se: breaking a law or regulation (such as working outside your scope) that causes harm is negligence by itself.',
      'Res ipsa loquitur ("the thing speaks for itself"): the harm could not have happened without negligence, so the burden shifts to the defendant.',
      'Abandonment: ending care without handing off to an equal or higher level of care.',
      'Best defenses: good documentation, following protocols and medical direction, staying in your scope, continuing education.'
    ],
    facts: [
      { q: 'What are the 4 elements of negligence?', a: 'Duty to act, breach of duty, damages, proximate cause', wrong: ['Duty, consent, harm, intent', 'Assault, battery, abandonment, false imprisonment', 'Breach, intent, damages, liability'] },
      { q: 'Which element is missing? You were on duty and gave the wrong drug, but the patient had no ill effects.', a: 'Damages', wrong: ['Duty to act', 'Breach of duty', 'Standard of care'] },
      { q: 'A paramedic\'s mistake happened, and the patient was hurt, but the injury came from something else entirely. Which element fails?', a: 'Proximate cause', wrong: ['Duty to act', 'Breach of duty', 'Damages'] },
      { q: 'Gross negligence is…', a: 'Willful, wanton, or reckless disregard for patient safety', wrong: ['Any mistake that harms a patient', 'A mistake made off duty', 'Failing to document a call'] },
      { q: 'Which is an example of gross negligence?', a: 'Responding to a call while intoxicated', wrong: ['Missing an IV on the first attempt', 'Misspelling a medication on the PCR', 'Taking a slightly longer route to the hospital'] },
      { q: 'Good Samaritan laws do NOT protect against…', a: 'Gross negligence', wrong: ['Ordinary negligence', 'Honest mistakes in good faith', 'Care given off duty without pay'] },
      { q: 'Doing a lawful act in a wrong or harmful way is…', a: 'Misfeasance', wrong: ['Malfeasance', 'Nonfeasance', 'Abandonment'] },
      { q: 'Failing to do something you had a duty to do is…', a: 'Nonfeasance', wrong: ['Misfeasance', 'Malfeasance', 'Battery'] },
      { q: 'Doing a wrongful or unlawful act is…', a: 'Malfeasance', wrong: ['Misfeasance', 'Nonfeasance', 'Libel'] },
      { q: 'Damages meant to punish willful or reckless conduct are…', a: 'Punitive damages', wrong: ['Compensable damages', 'Nominal damages', 'Actual damages'] },
      { q: 'The standard of care is judged against…', a: 'What a similarly trained paramedic would do in the same circumstances', wrong: ['What a physician would do', 'Whatever the patient expected', 'The best care possible anywhere'] },
      { q: 'Breaking a law or regulation that leads to harm is called…', a: 'Negligence per se', wrong: ['Res ipsa loquitur', 'Gross negligence', 'Contributory negligence'] },
      { q: 'Leaving a patient without handing off to an equal or higher level of care is…', a: 'Abandonment', wrong: ['Nonfeasance only', 'Assault', 'False imprisonment'] },
      { q: 'Who must prove the elements of negligence?', a: 'The plaintiff (the person suing)', wrong: ['The defendant (the paramedic)', 'The medical director', 'The judge'] }
    ]
  },
  {
    id: 'electrolytes', name: 'Electrolytes & the Na-K pump', short: 'Electrolytes',
    link: ['cardio', 'learn', 'Cardiology › Learn › Na-K pump', 'pump'],
    points: [
      'The 3 major electrolytes that affect cardiac function: sodium (Na⁺), potassium (K⁺), and calcium (Ca²⁺).',
      'Sodium: the main extracellular cation (normal 135 to 145 mEq/L). Pulls water with it; rushes into the cell to start depolarization (phase 0).',
      'Potassium: the main intracellular cation (normal 3.5 to 5.0 mEq/L). Leaves the cell to repolarize it (phase 3). High K⁺: peaked T waves, wide QRS, bradycardia, arrest. Low K⁺: PVCs, VT, VF, U waves.',
      'Calcium: mostly outside the cell (normal about 8.5 to 10.5 mg/dL). Enters through slow channels in the plateau (phase 2) and triggers contraction. Needed for clotting and nerve and muscle function.',
      'Magnesium is the other major intracellular cation; chloride and bicarbonate are the main extracellular anions.',
      'The sodium-potassium pump moves 3 Na⁺ out for every 2 K⁺ in, against their gradients, using 1 ATP (active transport).',
      'Because 3 positive charges leave and only 2 come back, the inside of the cell stays negative (resting potential about –70 to –90 mV).',
      'Step by step: 3 Na⁺ bind inside → ATP is split and the pump flips → 3 Na⁺ released outside → 2 K⁺ bind outside → pump flips back → 2 K⁺ released inside.',
      'After every beat the pump restores the original ion balance so the cell can fire again.',
      'No oxygen means no ATP: the pump fails, sodium and water stay in, cells swell and become irritable (dysrhythmias in ischemia).',
      'Digoxin slows the Na-K pump, leaving more calcium in the cell (stronger contraction); low K⁺ makes digoxin toxicity worse.'
    ],
    facts: [
      { q: 'Name the 3 major electrolytes that affect cardiac function.', a: 'Sodium, potassium, and calcium', wrong: ['Sodium, chloride, and bicarbonate', 'Magnesium, phosphate, and chloride', 'Potassium, chloride, and glucose'] },
      { q: 'The sodium-potassium pump moves…', a: '3 Na⁺ out and 2 K⁺ in', wrong: ['2 Na⁺ out and 3 K⁺ in', '3 K⁺ out and 2 Na⁺ in', '1 Na⁺ out and 1 K⁺ in'] },
      { q: 'What powers the sodium-potassium pump?', a: 'ATP (active transport)', wrong: ['Osmosis', 'Diffusion down the gradient', 'Calcium release'] },
      { q: 'Why does the inside of the cell stay negative at rest?', a: 'The pump moves 3 positive charges out for every 2 it brings in', wrong: ['Chloride is pumped in', 'Sodium leaks in constantly', 'Calcium is stored inside'] },
      { q: 'Main extracellular cation?', a: 'Sodium', wrong: ['Potassium', 'Magnesium', 'Chloride'] },
      { q: 'Main intracellular cation?', a: 'Potassium', wrong: ['Sodium', 'Calcium', 'Chloride'] },
      { q: 'Which ion rushes in to depolarize a cardiac cell (phase 0)?', a: 'Sodium', wrong: ['Potassium', 'Calcium', 'Chloride'] },
      { q: 'Which ion leaves the cell to repolarize it (phase 3)?', a: 'Potassium', wrong: ['Sodium', 'Calcium', 'Magnesium'] },
      { q: 'Which ion enters during the plateau (phase 2) and triggers contraction?', a: 'Calcium', wrong: ['Sodium', 'Potassium', 'Chloride'] },
      { q: 'Classic first ECG sign of hyperkalemia?', a: 'Tall, peaked T waves', wrong: ['U waves', 'Delta waves', 'ST depression'] },
      { q: 'Hypokalemia makes the ventricles irritable and can cause…', a: 'PVCs, VT and VF', wrong: ['Peaked T waves', 'Sinus arrest only', 'Wide QRS and bradycardia'] },
      { q: 'Normal serum potassium?', a: '3.5 to 5.0 mEq/L', wrong: ['135 to 145 mEq/L', '8.5 to 10.5 mEq/L', '1.5 to 2.5 mEq/L'] },
      { q: 'Normal serum sodium?', a: '135 to 145 mEq/L', wrong: ['3.5 to 5.0 mEq/L', '95 to 105 mEq/L', '22 to 26 mEq/L'] },
      { q: 'What happens to the Na-K pump without oxygen?', a: 'It fails for lack of ATP; Na⁺ and water stay in and the cell swells', wrong: ['It speeds up', 'It reverses and pumps K⁺ out', 'Nothing; it does not need energy'] }
    ]
  },
  {
    id: 'assessment', name: 'Patient assessment', short: 'Assessment',
    points: [
      'Order: scene size-up → primary survey → history taking → secondary assessment → reassessment.',
      'Scene size-up: scene safety, standard precautions (BSI), mechanism of injury or nature of illness, number of patients, additional resources (and consider spinal motion restriction).',
      'Primary survey: general impression, level of consciousness (AVPU), then XABCDE: eXsanguinating hemorrhage, Airway, Breathing, Circulation, Disability (neuro), Exposure. Then the transport decision and priority.',
      'Fix life threats as you find them in the primary survey; do not move on until they are managed.',
      'AVPU: Alert, responsive to Verbal, responsive to Pain, Unresponsive. GCS: eyes 4, verbal 5, motor 6 (3 to 15).',
      'SAMPLE history: Signs and symptoms, Allergies, Medications, Pertinent past history, Last oral intake, Events leading up.',
      'OPQRST for pain: Onset, Provocation/palliation, Quality, Region/radiation, Severity, Time.',
      'Secondary assessment: full-body exam (trauma) or focused exam (medical), plus a full set of vital signs. DCAP-BTLS for trauma: Deformities, Contusions, Abrasions, Punctures/penetrations, Burns, Tenderness, Lacerations, Swelling.',
      'Pertinent negatives: findings you looked for and did not find (no chest pain with shortness of breath). Document them.',
      'Reassessment: every 5 minutes for unstable patients, every 15 minutes for stable patients, and after every intervention.',
      'Trauma vs medical: trauma leans on the mechanism and a rapid exam; responsive medical patients lean on the history first.'
    ],
    facts: [
      { q: 'First step of every patient assessment?', a: 'Scene size-up (scene safety and standard precautions)', wrong: ['Check the airway', 'Take a SAMPLE history', 'Get a full set of vitals'] },
      { q: 'Correct order of patient assessment?', a: 'Scene size-up, primary survey, history, secondary assessment, reassessment', wrong: ['Primary survey, scene size-up, vitals, history, transport', 'History, vitals, primary survey, secondary, reassessment', 'Secondary assessment, primary survey, history, reassessment, size-up'] },
      { q: 'In XABCDE, the X stands for…', a: 'Exsanguinating (life-threatening) hemorrhage', wrong: ['X-ray', 'Expose the patient', 'Extremities'] },
      { q: 'What is the goal of the primary survey?', a: 'Find and treat immediate life threats', wrong: ['Get a detailed history', 'Find every injury', 'Complete a full set of vitals'] },
      { q: 'A patient opens their eyes and moans only when you pinch the trapezius. AVPU?', a: 'P (responsive to pain)', wrong: ['A (alert)', 'V (responsive to verbal)', 'U (unresponsive)'] },
      { q: 'What does the L in SAMPLE stand for?', a: 'Last oral intake', wrong: ['Level of consciousness', 'Lung sounds', 'Location of pain'] },
      { q: 'In OPQRST, "Does anything make it better or worse?" is…', a: 'P: provocation/palliation', wrong: ['O: onset', 'Q: quality', 'R: region/radiation'] },
      { q: 'How often should you reassess an unstable patient?', a: 'Every 5 minutes', wrong: ['Every 15 minutes', 'Every 30 minutes', 'Only on arrival at the hospital'] },
      { q: 'How often should you reassess a stable patient?', a: 'Every 15 minutes', wrong: ['Every 5 minutes', 'Every 30 minutes', 'Once en route'] },
      { q: 'Lowest possible GCS score?', a: '3', wrong: ['0', '1', '5'] },
      { q: 'GCS components and their maximum points?', a: 'Eyes 4, verbal 5, motor 6', wrong: ['Eyes 5, verbal 4, motor 6', 'Eyes 4, verbal 6, motor 5', 'Eyes 3, verbal 5, motor 7'] },
      { q: '"Denies chest pain" in a short-of-breath patient is a…', a: 'Pertinent negative', wrong: ['Chief complaint', 'Sign', 'Mechanism of injury'] },
      { q: 'In DCAP-BTLS, the P stands for…', a: 'Punctures/penetrations', wrong: ['Pain', 'Pulses', 'Paradoxical motion'] },
      { q: 'A responsive medical patient: what usually comes before the physical exam?', a: 'The history (SAMPLE, OPQRST)', wrong: ['A rapid head-to-toe trauma exam', 'Spinal immobilization', 'A 12-lead in every case'] }
    ]
  },
  {
    id: 'acidbase', name: 'Acid-base balance', short: 'Acid-base',
    link: ['patho', 'learn', 'Pathophysiology'],
    gen: 'abg',
    points: [
      'Normal blood pH is 7.35 to 7.45 (7.40). Below 7.35 is acidosis, above 7.45 is alkalosis. About 6.9 and 8.0 are the limits of life.',
      'Normal PaCO₂ is 35 to 45 mmHg (the respiratory acid). Normal HCO₃⁻ is 22 to 26 mEq/L (the metabolic base).',
      'Three defenses, fastest first: buffers (bicarbonate, in seconds), the lungs (blow off or keep CO₂, in minutes), the kidneys (excrete H⁺ or keep HCO₃⁻, hours to days).',
      'The bicarbonate buffer: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻.',
      'The 4 disturbances: respiratory acidosis, respiratory alkalosis, metabolic acidosis, metabolic alkalosis.',
      'Respiratory acidosis: CO₂ builds up from hypoventilation (COPD, overdose of opioids or sedatives, head injury, airway obstruction). pH ↓, PaCO₂ ↑. Fix: ventilate.',
      'Respiratory alkalosis: CO₂ blown off by hyperventilation (anxiety, pain, high altitude, early sepsis, PE, overventilation with a BVM). pH ↑, PaCO₂ ↓. Fix: slow the breathing, treat the cause.',
      'Metabolic acidosis: acid gained or bicarbonate lost (DKA, lactic acidosis from shock or cardiac arrest, aspirin overdose, renal failure, severe diarrhea). pH ↓, HCO₃⁻ ↓. The body compensates with deep, rapid Kussmaul respirations.',
      'Metabolic alkalosis: acid lost or bicarbonate gained (prolonged vomiting or NG suction, diuretics, too much antacid or bicarb). pH ↑, HCO₃⁻ ↑. Compensation: slower, shallower breathing.',
      'ROME: Respiratory Opposite (pH and PaCO₂ move in opposite directions), Metabolic Equal (pH and HCO₃⁻ move the same direction).',
      'Reading an ABG: 1) pH acid or base? 2) Does PaCO₂ explain it (respiratory)? 3) Does HCO₃⁻ explain it (metabolic)? 4) Is the other value moving to compensate?'
    ],
    facts: [
      { q: 'Normal blood pH range?', a: '7.35 to 7.45', wrong: ['7.0 to 7.35', '7.45 to 7.55', '6.9 to 7.2'] },
      { q: 'Normal PaCO₂?', a: '35 to 45 mmHg', wrong: ['22 to 26 mmHg', '80 to 100 mmHg', '45 to 55 mmHg'] },
      { q: 'Normal bicarbonate (HCO₃⁻)?', a: '22 to 26 mEq/L', wrong: ['35 to 45 mEq/L', '7.35 to 7.45 mEq/L', '135 to 145 mEq/L'] },
      { q: 'What are the 4 acid-base disturbances?', a: 'Respiratory acidosis, respiratory alkalosis, metabolic acidosis, metabolic alkalosis', wrong: ['Acidosis, alkalosis, hypercapnia, hypoxia', 'Simple, mixed, compensated, uncompensated', 'Lactic, keto, renal, respiratory acidosis'] },
      { q: 'Fastest acid-base defense?', a: 'Buffer systems (bicarbonate)', wrong: ['The kidneys', 'The lungs', 'The liver'] },
      { q: 'Slowest but most powerful acid-base defense?', a: 'The kidneys', wrong: ['Buffers', 'The lungs', 'The skin'] },
      { q: 'Opioid overdose with a respiratory rate of 6 causes…', a: 'Respiratory acidosis', wrong: ['Respiratory alkalosis', 'Metabolic acidosis', 'Metabolic alkalosis'] },
      { q: 'An anxious patient breathing 40 times a minute develops…', a: 'Respiratory alkalosis', wrong: ['Respiratory acidosis', 'Metabolic acidosis', 'Metabolic alkalosis'] },
      { q: 'DKA causes which disturbance?', a: 'Metabolic acidosis', wrong: ['Metabolic alkalosis', 'Respiratory acidosis', 'Respiratory alkalosis'] },
      { q: 'Prolonged vomiting causes…', a: 'Metabolic alkalosis', wrong: ['Metabolic acidosis', 'Respiratory acidosis', 'Respiratory alkalosis'] },
      { q: 'Kussmaul respirations are the body compensating for…', a: 'Metabolic acidosis', wrong: ['Metabolic alkalosis', 'Respiratory acidosis', 'Respiratory alkalosis'] },
      { q: 'In ROME, "Respiratory Opposite" means…', a: 'pH and PaCO₂ move in opposite directions', wrong: ['pH and HCO₃⁻ move in opposite directions', 'Breathing slows in acidosis', 'The lungs oppose the kidneys'] },
      { q: 'Lactic acid buildup in shock or cardiac arrest causes…', a: 'Metabolic acidosis', wrong: ['Respiratory acidosis', 'Metabolic alkalosis', 'Respiratory alkalosis'] },
      { q: 'How do the lungs correct a metabolic acidosis?', a: 'Breathe faster and deeper to blow off CO₂', wrong: ['Breathe slower to keep CO₂', 'Excrete bicarbonate', 'Hold acid in the alveoli'] },
      { q: 'A COPD patient retaining CO₂ has chronic…', a: 'Respiratory acidosis (kidneys compensate by keeping HCO₃⁻)', wrong: ['Respiratory alkalosis', 'Metabolic acidosis', 'Metabolic alkalosis'] }
    ]
  },
  {
    id: 'bloodflow', name: 'Blood flow through the heart', short: 'Blood flow',
    link: ['ap', 'learn', 'Anatomy & Physiology'],
    points: [
      'Deoxygenated blood from the body: superior and inferior vena cava → right atrium.',
      'Right atrium → tricuspid valve → right ventricle.',
      'Right ventricle → pulmonic (pulmonary) semilunar valve → pulmonary arteries → lungs (gas exchange in the capillaries around the alveoli).',
      'Oxygenated blood: pulmonary veins → left atrium.',
      'Left atrium → mitral (bicuspid) valve → left ventricle.',
      'Left ventricle → aortic semilunar valve → aorta → the body (systemic circulation).',
      'Full route: vena cava, RA, tricuspid, RV, pulmonic valve, pulmonary arteries, lungs, pulmonary veins, LA, mitral, LV, aortic valve, aorta.',
      'Pulmonary arteries are the only arteries that carry deoxygenated blood; pulmonary veins are the only veins that carry oxygenated blood.',
      'Right side pumps to the lungs (pulmonary circulation, low pressure); left side pumps to the body (systemic circulation, high pressure), so the left ventricle wall is thickest.',
      'Coronary arteries branch off the aorta just above the aortic valve and fill during diastole. Left main → LAD and circumflex; RCA supplies the right heart and usually the inferior wall.',
      'Atrioventricular valves (tricuspid, mitral) are held by chordae tendineae and papillary muscles; their closing makes S1. Semilunar valves closing make S2.'
    ],
    facts: [
      { q: 'Blood leaving the right atrium passes through which valve?', a: 'Tricuspid valve', wrong: ['Mitral valve', 'Pulmonic valve', 'Aortic valve'] },
      { q: 'Blood leaving the left atrium passes through which valve?', a: 'Mitral (bicuspid) valve', wrong: ['Tricuspid valve', 'Aortic valve', 'Pulmonic valve'] },
      { q: 'Which vessels carry oxygenated blood from the lungs to the heart?', a: 'Pulmonary veins', wrong: ['Pulmonary arteries', 'Vena cava', 'Coronary arteries'] },
      { q: 'Which vessels carry deoxygenated blood to the lungs?', a: 'Pulmonary arteries', wrong: ['Pulmonary veins', 'Aorta', 'Coronary sinus'] },
      { q: 'Which chamber pumps blood into the aorta?', a: 'Left ventricle', wrong: ['Right ventricle', 'Left atrium', 'Right atrium'] },
      { q: 'Which chamber receives blood from the vena cavae?', a: 'Right atrium', wrong: ['Left atrium', 'Right ventricle', 'Left ventricle'] },
      { q: 'Correct order after the right ventricle?', a: 'Pulmonic valve, pulmonary arteries, lungs, pulmonary veins, left atrium', wrong: ['Aortic valve, aorta, body, vena cava, right atrium', 'Mitral valve, left atrium, pulmonary veins, lungs', 'Tricuspid valve, right atrium, vena cava'] },
      { q: 'Which chamber has the thickest wall, and why?', a: 'Left ventricle, because it pumps against systemic pressure', wrong: ['Right ventricle, because it pumps to the lungs', 'Left atrium, because it receives oxygenated blood', 'Right atrium, because it receives all venous return'] },
      { q: 'When do the coronary arteries fill?', a: 'During diastole', wrong: ['During systole', 'Only during exercise', 'During atrial contraction only'] },
      { q: 'The two semilunar valves are…', a: 'Pulmonic and aortic', wrong: ['Tricuspid and mitral', 'Mitral and aortic', 'Tricuspid and pulmonic'] },
      { q: 'The first heart sound (S1) is made by…', a: 'The tricuspid and mitral valves closing', wrong: ['The aortic and pulmonic valves closing', 'Blood filling the atria', 'The SA node firing'] },
      { q: 'Pulmonary circulation runs from…', a: 'The right ventricle to the lungs and back to the left atrium', wrong: ['The left ventricle to the body and back to the right atrium', 'The aorta to the coronary arteries', 'The vena cava to the right atrium'] }
    ]
  },
  {
    id: 'conduction', name: 'Conduction system & intrinsic rates', short: 'Conduction',
    link: ['cardio', 'learn', 'Cardiology › Learn'],
    points: [
      'Pathway: SA node → internodal pathways (and Bachmann bundle to the left atrium) → AV node → bundle of His → right and left bundle branches → Purkinje fibers.',
      'SA node: the chief pacemaker, in the right atrium near the superior vena cava. Intrinsic rate 60 to 100/min.',
      'AV node / AV junction: delays the impulse (about 0.12 s total PR) so the atria can empty into the ventricles. Junctional intrinsic rate 40 to 60/min.',
      'Ventricles (bundle branches and Purkinje fibers): intrinsic rate 20 to 40/min.',
      'The fastest pacemaker controls the heart; if it fails, the next one down takes over (escape rhythm): sinus 60 to 100, junctional 40 to 60, ventricular 20 to 40.',
      'Left bundle branch splits into anterior and posterior fascicles.',
      'Cardiac cell properties: automaticity (fires on its own), excitability, conductivity, contractility.',
      'ECG: P wave = atrial depolarization; PR interval = SA to ventricles (0.12 to 0.20 s); QRS = ventricular depolarization (< 0.12 s); T wave = ventricular repolarization. Atrial repolarization is hidden in the QRS.',
      'Parasympathetic (vagus nerve, acetylcholine) slows the SA node and AV conduction; sympathetic (norepinephrine, beta-1) speeds rate and force.'
    ],
    facts: [
      { q: 'Correct order of the conduction system?', a: 'SA node, internodal pathways, AV node, bundle of His, bundle branches, Purkinje fibers', wrong: ['AV node, SA node, bundle of His, Purkinje fibers, bundle branches', 'SA node, bundle of His, AV node, bundle branches, Purkinje fibers', 'Purkinje fibers, bundle branches, bundle of His, AV node, SA node'] },
      { q: 'Intrinsic rate of the SA node?', a: '60 to 100/min', wrong: ['40 to 60/min', '20 to 40/min', '100 to 150/min'] },
      { q: 'Intrinsic rate of the AV junction?', a: '40 to 60/min', wrong: ['60 to 100/min', '20 to 40/min', '10 to 20/min'] },
      { q: 'Intrinsic rate of the ventricles?', a: '20 to 40/min', wrong: ['40 to 60/min', '60 to 100/min', '100 to 150/min'] },
      { q: 'Why does the AV node delay the impulse?', a: 'So the atria can finish emptying into the ventricles', wrong: ['To let the SA node recharge', 'To prevent repolarization', 'To speed up the ventricles'] },
      { q: 'Where is the SA node?', a: 'Right atrium, near the superior vena cava', wrong: ['Left atrium, near the pulmonary veins', 'Interventricular septum', 'Apex of the left ventricle'] },
      { q: 'A regular, narrow rhythm at 48 with no P waves most likely comes from…', a: 'The AV junction', wrong: ['The SA node', 'The ventricles', 'The atria'] },
      { q: 'A regular, wide rhythm at 32 with no P waves most likely comes from…', a: 'The ventricles', wrong: ['The SA node', 'The AV junction', 'The atria'] },
      { q: 'The ability of a cardiac cell to fire on its own is…', a: 'Automaticity', wrong: ['Conductivity', 'Contractility', 'Excitability'] },
      { q: 'Normal PR interval?', a: '0.12 to 0.20 second', wrong: ['0.04 to 0.10 second', '0.20 to 0.30 second', 'Less than 0.12 second'] },
      { q: 'Normal QRS duration?', a: 'Less than 0.12 second', wrong: ['0.12 to 0.20 second', 'More than 0.12 second', '0.20 to 0.40 second'] },
      { q: 'What does the QRS complex represent?', a: 'Ventricular depolarization', wrong: ['Atrial depolarization', 'Ventricular repolarization', 'AV node delay'] },
      { q: 'Vagal (parasympathetic) stimulation does what to the heart?', a: 'Slows the SA node and AV conduction', wrong: ['Speeds up the rate', 'Strengthens contraction', 'Blocks the bundle branches'] }
    ]
  },
  {
    id: 'dope', name: 'Intubation & DOPE', short: 'DOPE',
    points: [
      'DOPE troubleshoots an intubated patient who suddenly gets worse (falling SpO₂, falling EtCO₂, high pressures, hard to bag):',
      'D: Displacement (the tube came out or moved into the esophagus or right mainstem). Check EtCO₂ waveform, breath sounds, tube depth at the teeth.',
      'O: Obstruction (secretions, blood, kinked tube, patient biting). Suction the tube, check for kinks, bite block.',
      'P: Pneumothorax (often tension, from positive-pressure ventilation). Absent breath sounds on one side, high pressures, JVD, hypotension: needle decompression.',
      'E: Equipment failure (oxygen disconnected or empty, BVM or ventilator problem). Take the patient off the vent and bag them with a BVM on oxygen.',
      'Many programs add S for Stacked breaths (auto-PEEP in asthma/COPD): disconnect and let the patient exhale ("DOPES").',
      'Confirming placement: continuous waveform capnography is the most reliable; also direct visualization through the cords, bilateral breath sounds, no epigastric sounds, chest rise, misting, rising SpO₂.',
      'Normal EtCO₂ is 35 to 45 mmHg. A flat line after intubation means the tube is not in the trachea (or there is no circulation).',
      'Right mainstem intubation: breath sounds only on the right. Pull the tube back slightly and reassess. Typical depth in an adult: about 3 × the tube size at the teeth (for example, a 7.5 tube at 22 to 23 cm).',
      'Preoxygenate before every attempt; limit attempts to about 30 seconds; stop and ventilate if SpO₂ falls.',
      'Indications: cannot protect the airway (GCS 8 or less), failure to oxygenate or ventilate, expected course (burns to the airway, anaphylaxis).'
    ],
    facts: [
      { q: 'What does DOPE stand for?', a: 'Displacement, Obstruction, Pneumothorax, Equipment failure', wrong: ['Drugs, Oxygen, Pressure, Esophagus', 'Dislodgement, Oxygenation, Perfusion, Exhalation', 'Disconnect, Occlusion, Positioning, Edema'] },
      { q: 'When do you use DOPE?', a: 'An intubated patient suddenly deteriorates', wrong: ['Before every intubation attempt', 'To choose the tube size', 'To decide on RSI drugs'] },
      { q: 'Intubated patient: EtCO₂ waveform suddenly goes flat, with a pulse. First suspect…', a: 'Displacement of the tube', wrong: ['Pneumothorax', 'Hyperventilation', 'Bronchospasm'] },
      { q: 'High pressure, hard to bag, gurgling in the tube. Most likely D-O-P-E cause and fix?', a: 'Obstruction: suction the tube', wrong: ['Displacement: re-intubate right away', 'Pneumothorax: needle decompression', 'Equipment: change the oxygen tank'] },
      { q: 'Intubated trauma patient: absent breath sounds on the left, JVD, hypotension, hard to bag. Which letter and fix?', a: 'P: tension pneumothorax, needle decompression', wrong: ['D: pull the tube back', 'O: suction', 'E: check the oxygen tank'] },
      { q: 'On a ventilator and deteriorating with no obvious cause. Best first step for the E in DOPE?', a: 'Disconnect the ventilator and bag with a BVM on oxygen', wrong: ['Increase the ventilator rate', 'Give a sedative', 'Pull the tube'] },
      { q: 'Breath sounds only on the right after intubation suggests…', a: 'Right mainstem intubation; pull back slightly and reassess', wrong: ['Esophageal intubation', 'Left pneumothorax that needs decompression', 'Normal placement'] },
      { q: 'Most reliable way to confirm and monitor ET tube placement?', a: 'Continuous waveform capnography', wrong: ['Misting in the tube', 'Chest rise', 'Pulse oximetry'] },
      { q: 'Normal EtCO₂?', a: '35 to 45 mmHg', wrong: ['15 to 25 mmHg', '80 to 100 mmHg', '7.35 to 7.45 mmHg'] },
      { q: 'An approximate adult tube depth at the teeth for a 7.5 tube?', a: 'About 22 to 23 cm (3 × tube size)', wrong: ['About 15 cm', 'About 30 cm', 'About 10 cm'] },
      { q: 'The S added in DOPES stands for…', a: 'Stacked breaths (auto-PEEP)', wrong: ['Suction', 'Sedation', 'SpO₂'] },
      { q: 'Maximum time for one intubation attempt?', a: 'About 30 seconds, then reoxygenate', wrong: ['About 2 minutes', 'Until the tube is placed', 'About 5 seconds'] }
    ]
  },
  {
    id: 'medmath', name: 'Med math & drip rates', short: 'Med math',
    link: ['pharm', 'math', 'Pharmacology › Math'],
    gen: 'math',
    points: [
      'Desired over Have times Volume: mL to give = D ÷ H × V (D = dose ordered, H = drug on hand, V = volume it is in). Some books write the volume as Q (quantity) or T (tablet).',
      'Example: 4 mg of Zofran ordered, vial is 4 mg in 2 mL → 4 ÷ 4 × 2 = 2 mL.',
      'Concentration = total drug ÷ total volume. Example: 1 g lidocaine in 250 mL = 4 mg/mL.',
      'Weight first: kg = lb ÷ 2.2. Weight-based dose = dose per kg × kg.',
      'Drip rate (gtt/min) = volume (mL) × drop factor (gtt/mL) ÷ time (minutes).',
      'Macrodrip sets: 10, 15 or 20 gtt/mL (for fluids). Microdrip set: 60 gtt/mL (for drug drips).',
      'With a 60 gtt/mL set, gtt/min equals mL/hr.',
      'Drug drip: mL/hr = dose per min × 60 ÷ concentration (and × kg if the dose is per kg). Example: dopamine 5 mcg/kg/min, 80 kg, 1600 mcg/mL → 5 × 80 × 60 ÷ 1600 = 15 mL/hr = 15 gtt/min on a microdrip.',
      'Unit conversions: 1 g = 1000 mg, 1 mg = 1000 mcg, 1 L = 1000 mL. Convert so the dose and concentration use the same unit before dividing.',
      'Sanity check every answer: is the volume reasonable for that vial? Round gtt/min to a whole number.'
    ],
    facts: [
      { q: 'The D/H × V formula gives you…', a: 'The volume (mL) to give', wrong: ['The drip rate in gtt/min', 'The concentration in mg/mL', 'The dose in mg/kg'] },
      { q: 'Drip rate formula?', a: 'Volume (mL) × drop factor (gtt/mL) ÷ time (min)', wrong: ['Volume × time ÷ drop factor', 'Drop factor ÷ volume × time', 'Time × drop factor ÷ volume'] },
      { q: 'Drop factor of a microdrip set?', a: '60 gtt/mL', wrong: ['10 gtt/mL', '15 gtt/mL', '20 gtt/mL'] },
      { q: 'With a microdrip (60 gtt/mL) set, gtt/min equals…', a: 'mL/hr', wrong: ['mL/min', 'mg/min', 'Twice the mL/hr'] },
      { q: 'Convert 176 lb to kg.', a: '80 kg', wrong: ['387 kg', '88 kg', '70 kg'] },
      { q: '1 mg equals how many mcg?', a: '1000 mcg', wrong: ['100 mcg', '10 mcg', '0.001 mcg'] },
      { q: 'Concentration of 2 g lidocaine in 500 mL?', a: '4 mg/mL', wrong: ['0.4 mg/mL', '40 mg/mL', '2 mg/mL'] },
      { q: 'Concentration of 400 mg dopamine in 250 mL?', a: '1600 mcg/mL', wrong: ['160 mcg/mL', '16 mcg/mL', '1.6 mcg/mL'] }
    ]
  },
  {
    id: 'ecg', name: 'Rhythm, ECG & 12-lead analysis', short: 'ECG & 12-lead',
    link: ['cardio', 'strips', 'Cardiology › Strips'],
    strips: true,
    points: [
      'Five questions for any rhythm: Is the patient sick? What is the rate? Is the QRS narrow or wide? Are there P waves? How do the P waves relate to the QRS?',
      'Rate: 6-second method (QRS complexes in 6 s × 10); 300 ÷ large boxes; 1500 ÷ small boxes. Small box 0.04 s; large box 0.20 s.',
      'P-wave approach (lead II): no consistent P waves → A-fib, V-fib, V-tach, asystole. P before QRS → sinus or atrial. P hidden in QRS or inverted/after QRS → junctional.',
      'Then: does every P have a QRS and every QRS a P? Yes (1:1) → sinus rhythm or 1st-degree block. Some P waves not conducted → 2nd-degree. No relationship → 3rd-degree.',
      '1st-degree AV block: every P conducts, PR > 0.20 s and constant.',
      '2nd-degree type I (Wenckebach, Mobitz I): PR gets longer and longer until a QRS drops; grouped beating.',
      '2nd-degree type II (Mobitz II): PR stays constant, then a P suddenly does not conduct. Can progress to complete block.',
      '3rd-degree (complete) block: P waves and QRS complexes march independently; atrial rate faster than ventricular.',
      'Ectopic beats: PAC has an early, different-looking P with a narrow QRS; PJC has an inverted or absent P with a narrow QRS; PVC is early, wide (> 0.12 s) and bizarre with no P. Bigeminy = every other beat, trigeminy = every third.',
      'Normal 12-lead: upright P, QRS and T in I, II, aVF; aVR is normally all negative; V1 has a small r and deep S, and R waves grow from V1 to V6 (transition near V3-V4).',
      '12-lead walls: Inferior II, III, aVF (RCA). Septal V1, V2 and anterior V3, V4 (LAD). Lateral I, aVL, V5, V6 (circumflex). Posterior V7 to V9, or ST depression in V1-V2 (RCA or circumflex).',
      'STEMI: ST elevation in 2 or more contiguous leads, often with reciprocal ST depression in the opposite leads. Inferior MI: get right-sided leads (V4R) before giving nitro.',
      'Wide (≥ 0.12 s) QRS with a supraventricular rhythm = bundle branch block. RBBB: RSR\' (rabbit ears) in V1. LBBB: wide, deep QS in V1.'
    ],
    facts: [
      { q: 'No identifiable P waves, irregularly irregular, narrow QRS?', a: 'Atrial fibrillation', wrong: ['Junctional rhythm', 'Sinus arrhythmia', 'Atrial flutter'] },
      { q: 'PR interval gets progressively longer until a QRS is dropped?', a: '2nd-degree AV block type I (Wenckebach)', wrong: ['2nd-degree AV block type II', '1st-degree AV block', '3rd-degree AV block'] },
      { q: 'Constant PR interval with occasional P waves that are not followed by a QRS?', a: '2nd-degree AV block type II', wrong: ['2nd-degree AV block type I', '1st-degree AV block', 'Sinus arrest'] },
      { q: 'P waves and QRS complexes have no relationship; atrial rate faster than ventricular?', a: '3rd-degree (complete) AV block', wrong: ['2nd-degree type II', 'Atrial flutter', 'Wandering atrial pacemaker'] },
      { q: 'Sinus rhythm with every PR interval 0.28 second?', a: '1st-degree AV block', wrong: ['2nd-degree type I', 'Normal sinus rhythm', 'Junctional rhythm'] },
      { q: 'Early beat that is wide and bizarre with no P wave?', a: 'PVC', wrong: ['PAC', 'PJC', 'Escape beat from the SA node'] },
      { q: 'Early beat with a different-looking upright P wave and a narrow QRS?', a: 'PAC', wrong: ['PVC', 'PJC', 'Dropped beat'] },
      { q: 'Early narrow beat with an inverted P wave or no P wave?', a: 'PJC', wrong: ['PAC', 'PVC', 'Sinus beat'] },
      { q: 'A PVC every third beat is called…', a: 'Trigeminy', wrong: ['Bigeminy', 'A couplet', 'A run of VT'] },
      { q: 'Leads that look at the inferior wall, and the usual artery?', a: 'II, III, aVF; right coronary artery', wrong: ['I, aVL, V5, V6; circumflex', 'V1 to V4; LAD', 'V7 to V9; LAD'] },
      { q: 'Leads that look at the lateral wall, and the usual artery?', a: 'I, aVL, V5, V6; circumflex', wrong: ['II, III, aVF; RCA', 'V1, V2; LAD', 'aVR; left main'] },
      { q: 'Leads that look at the anterior wall (including the septum), and the usual artery?', a: 'V1 to V4; left anterior descending', wrong: ['II, III, aVF; RCA', 'I, aVL; circumflex', 'V5, V6; RCA'] },
      { q: 'Leads that look at the septum?', a: 'V1, V2', wrong: ['V3, V4', 'V5, V6', 'II, III, aVF'] },
      { q: 'How can a posterior MI show on a standard 12-lead?', a: 'ST depression in V1 and V2 (confirm with V7 to V9)', wrong: ['ST elevation in aVR only', 'Peaked T waves in II, III, aVF', 'A wide QRS in V6'] },
      { q: 'In a normal 12-lead, which lead is normally negative (inverted P, QRS and T)?', a: 'aVR', wrong: ['Lead II', 'aVF', 'V5'] },
      { q: 'Inferior STEMI: what should you check before giving nitroglycerin?', a: 'Right-sided leads (V4R) for right ventricular infarct', wrong: ['Posterior leads only', 'Lead aVL only', 'A second set of limb leads'] },
      { q: 'STEMI criteria include ST elevation in…', a: '2 or more contiguous leads', wrong: ['Any single lead', 'aVR only', 'All 12 leads'] },
      { q: '6-second strip with 8 QRS complexes: heart rate?', a: '80/min', wrong: ['48/min', '60/min', '100/min'] },
      { q: 'One large box on ECG paper equals…', a: '0.20 second', wrong: ['0.04 second', '0.12 second', '1 second'] },
      { q: 'RSR\' (rabbit ears) in V1 with a wide QRS suggests…', a: 'Right bundle branch block', wrong: ['Left bundle branch block', 'WPW', 'Posterior MI'] },
      { q: 'Short PR interval with a slurred upstroke (delta wave)?', a: 'Wolff-Parkinson-White (WPW)', wrong: ['1st-degree AV block', 'Junctional rhythm', 'Left bundle branch block'] }
    ]
  },
  {
    id: 'copd', name: 'COPD & asthma', short: 'COPD & asthma',
    points: [
      'COPD is a chronic, progressive airflow obstruction, mostly from smoking. Its two main forms are emphysema and chronic bronchitis; acute asthma is the third major obstructive complaint (reversible bronchospasm).',
      'Emphysema ("pink puffer"): alveolar walls destroyed, lungs lose elastic recoil, air trapping. Thin, barrel chest, pursed-lip breathing, tripod position, prolonged exhalation, diminished breath sounds, usually pink (stays oxygenated by working hard). Risk of pneumothorax from ruptured blebs.',
      'Chronic bronchitis ("blue bloater"): inflamed airways with too much mucus; productive cough on most days for at least 3 months in 2 consecutive years. Often overweight, cyanotic, rhonchi, signs of right heart failure (cor pulmonale): JVD, peripheral edema.',
      'Asthma: reversible airway inflammation, bronchospasm and mucus plugging, triggered by allergens, cold, exercise, infection, smoke. Wheezing, prolonged exhalation, chest tightness, cough. Any age.',
      'Danger signs in asthma: a silent chest (too little air moving to wheeze), can\'t speak in full sentences, altered mental status, fatigue, rising or "normal" EtCO₂ in a tiring patient, tripod position. Status asthmaticus is a severe attack that doesn\'t respond to bronchodilators.',
      'Capnography: bronchospasm makes a "shark fin" waveform.',
      'Field care for all three: position of comfort (sitting up), oxygen titrated to SpO₂ (88 to 92% for many COPD patients, 94% or more for asthma), bronchodilators (albuterol, with ipratropium), CPAP if tolerated, steroids (methylprednisolone) per protocol; magnesium sulfate or epinephrine for severe asthma.',
      'Do not withhold oxygen from a hypoxic COPD patient. Watch for hypoventilation (CO₂ retention) and be ready to assist ventilations.',
      'Blood gases: COPD often has chronic respiratory acidosis with renal compensation (high HCO₃⁻). Early asthma: hyperventilation → respiratory alkalosis; a normal or rising PaCO₂ means the patient is tiring.'
    ],
    facts: [
      { q: 'The two main forms of COPD are…', a: 'Emphysema and chronic bronchitis', wrong: ['Asthma and pneumonia', 'Emphysema and pulmonary embolism', 'Chronic bronchitis and croup'] },
      { q: '"Pink puffer": thin, barrel chest, pursed-lip breathing?', a: 'Emphysema', wrong: ['Chronic bronchitis', 'Asthma', 'Pulmonary edema'] },
      { q: '"Blue bloater": cyanotic, productive cough, edema, JVD?', a: 'Chronic bronchitis', wrong: ['Emphysema', 'Asthma', 'Pneumothorax'] },
      { q: 'Chronic bronchitis is defined as a productive cough for…', a: 'At least 3 months a year for 2 consecutive years', wrong: ['At least 2 weeks', 'At least 6 months in 1 year', 'Any cough lasting more than 1 month'] },
      { q: 'Destruction of alveolar walls and loss of elastic recoil describe…', a: 'Emphysema', wrong: ['Chronic bronchitis', 'Asthma', 'Pneumonia'] },
      { q: 'Which of the three is reversible bronchospasm and airway inflammation?', a: 'Asthma', wrong: ['Emphysema', 'Chronic bronchitis', 'All three equally'] },
      { q: 'Severe asthma: wheezing stops but the patient is still struggling. This means…', a: 'Ominous sign: too little air is moving (silent chest)', wrong: ['The asthma attack is resolving', 'The albuterol worked', 'It is now a pneumothorax'] },
      { q: 'Status asthmaticus is…', a: 'A severe, prolonged attack that does not respond to bronchodilators', wrong: ['Asthma triggered by exercise', 'A mild attack with only a cough', 'Asthma in a COPD patient'] },
      { q: 'Right-sided heart failure caused by chronic lung disease is called…', a: 'Cor pulmonale', wrong: ['Pulmonary embolism', 'Cardiac tamponade', 'Pericarditis'] },
      { q: 'Capnography waveform shape typical of bronchospasm?', a: 'Shark fin', wrong: ['Square box', 'Flat line', 'Curare cleft'] },
      { q: 'First-line drug for bronchospasm in COPD and asthma?', a: 'Albuterol (a beta-2 agonist)', wrong: ['Metoprolol (a beta blocker)', 'Furosemide', 'Diphenhydramine'] },
      { q: 'Hypoxic COPD patient on oxygen: what is the right approach?', a: 'Give oxygen, titrate to SpO₂, and watch for hypoventilation', wrong: ['Withhold oxygen to keep the hypoxic drive', 'Give 15 L by NRB and do not monitor', 'Only give oxygen if SpO₂ is under 80%'] },
      { q: 'Emphysema patients are at risk of which sudden complication from ruptured blebs?', a: 'Spontaneous pneumothorax', wrong: ['Pulmonary embolism', 'Anaphylaxis', 'Epiglottitis'] },
      { q: 'Exhaling through pursed lips helps emphysema patients by…', a: 'Keeping back-pressure in small airways so they stay open', wrong: ['Increasing CO₂ intake', 'Slowing the heart rate', 'Clearing mucus from the trachea'] }
    ]
  }
];

/* The 36 strips from "Send home rhythms" with the handout's answer key.
   answer is the full name shown; key is the handout's own wording; family
   groups similar answers for multiple-choice wrong answers; look is what to
   notice on the strip. */
window.MIDTERM_STRIP_ANSWERS = {
  svt: { name: 'Supraventricular tachycardia (SVT)', family: 'fast', look: 'Fast (150+), regular, narrow QRS; P waves hidden in the T waves.' },
  'sb-1avb': { name: 'Sinus bradycardia with 1st-degree AV block', family: 'block', look: 'Under 60, regular, a P before every QRS, PR longer than 0.20 s and constant.' },
  ivr: { name: 'Idioventricular rhythm', family: 'vent', look: '20 to 40, wide and bizarre QRS, no P waves.' },
  afib: { name: 'Atrial fibrillation', family: 'atrial', look: 'Irregularly irregular, no P waves, fibrillatory (wavy) baseline, narrow QRS.' },
  st: { name: 'Sinus tachycardia', family: 'fast', look: 'Over 100 (usually under 150), regular, upright P before every QRS.' },
  'sr-pac': { name: 'Sinus rhythm with a PAC', family: 'ectopic', look: 'Underlying sinus rhythm with an early beat that has its own different P wave and a narrow QRS.' },
  junctional: { name: 'Junctional rhythm', family: 'junct', look: '40 to 60, regular, narrow QRS, P waves absent, inverted, or after the QRS.' },
  sb: { name: 'Sinus bradycardia', family: 'sinus', look: 'Under 60, regular, normal upright P before every QRS, normal PR.' },
  'sr-pvc-trig': { name: 'Sinus rhythm with PVCs (trigeminy)', family: 'ectopic', look: 'Every third beat is a wide, bizarre PVC with no P wave.' },
  asystole: { name: 'Asystole', family: 'lethal', look: 'Flat line. Confirm in two leads and check the gain and the electrodes.' },
  vt: { name: 'Ventricular tachycardia', family: 'lethal', look: 'Fast (over 100, often 150 to 250), wide, regular, no P waves.' },
  nsr: { name: 'Normal sinus rhythm', family: 'sinus', look: '60 to 100, regular, upright P before every QRS, PR 0.12 to 0.20 s, narrow QRS.' },
  vf: { name: 'Ventricular fibrillation', family: 'lethal', look: 'Chaotic, irregular waves with no identifiable P, QRS or T.' },
  'sb-pvc-bigem': { name: 'Sinus bradycardia with PVCs (bigeminy)', family: 'ectopic', look: 'Slow sinus beats alternating with wide, bizarre PVCs: every other beat is a PVC.' },
  avb3: { name: '3rd-degree (complete) AV block', family: 'block', look: 'P waves march through regularly but have no relationship to the QRS; atrial rate faster than ventricular.' },
  'sinus-dys': { name: 'Sinus dysrhythmia (sinus arrhythmia)', family: 'sinus', look: 'Sinus P waves, but the R-R interval speeds up and slows down (often with breathing).' },
  aivr: { name: 'Accelerated idioventricular rhythm', family: 'vent', look: '40 to 100, wide QRS, no P waves: a ventricular rhythm faster than its intrinsic 20 to 40.' },
  'junct-tach': { name: 'Junctional tachycardia', family: 'junct', look: 'Over 100, regular, narrow QRS, P waves absent, inverted or after the QRS.' },
  'sinus-arrest-pvc': { name: 'Sinus arrest with PVCs (sinus block)', family: 'ectopic', look: 'Sinus beats, then a pause where the SA node does not fire, with wide PVCs.' },
  avb2ii: { name: '2nd-degree AV block type II', family: 'block', look: 'Constant PR, then a P wave suddenly not followed by a QRS.' },
  'junct-tach-svt': { name: 'Junctional tachycardia (SVT)', family: 'fast', look: 'Fast, regular, narrow, no visible P waves: a supraventricular tachycardia from the junction.' },
  'afib-rvr': { name: 'Atrial fibrillation with RVR (SVT)', family: 'atrial', look: 'Irregularly irregular, narrow, no P waves, rate over 100 (rapid ventricular response).' },
  'sr-pvc': { name: 'Sinus rhythm with a PVC', family: 'ectopic', look: 'Underlying sinus rhythm with one early, wide, bizarre beat and no P wave.' },
  'st-pjc': { name: 'Sinus tachycardia with a PJC', family: 'ectopic', look: 'Sinus tachycardia with one early narrow beat with an inverted or absent P wave.' },
  wpw: { name: 'Wolff-Parkinson-White (WPW)', family: 'fast', look: 'Short PR (< 0.12 s) with a delta wave (slurred upstroke) widening the QRS.' },
  'afib-salvo': { name: 'Atrial fibrillation with a salvo of PVCs', family: 'atrial', look: 'A-fib baseline with a run of 3 or more PVCs in a row.' },
  'afib-pvc': { name: 'Atrial fibrillation with a PVC', family: 'atrial', look: 'Irregularly irregular narrow complexes with one wide, bizarre beat.' }
};

window.MIDTERM_STRIPS = [
  { n: 1, key: 'SVT', ans: 'svt' },
  { n: 2, key: 'Bradycardia with 1° block', ans: 'sb-1avb' },
  { n: 3, key: 'Idioventricular', ans: 'ivr' },
  { n: 4, key: 'A-fib', ans: 'afib' },
  { n: 5, key: 'Sinus tach', ans: 'st' },
  { n: 6, key: 'Sinus with PAC', ans: 'sr-pac' },
  { n: 7, key: 'Junctional', ans: 'junctional' },
  { n: 8, key: 'Sinus brady', ans: 'sb' },
  { n: 9, key: 'Sinus with PVC (trigeminy)', ans: 'sr-pvc-trig' },
  { n: 10, key: 'Asystole', ans: 'asystole' },
  { n: 11, key: 'V tach', ans: 'vt' },
  { n: 12, key: 'NSR', ans: 'nsr' },
  { n: 13, key: 'V-fib', ans: 'vf' },
  { n: 14, key: 'Sinus brady', ans: 'sb' },
  { n: 15, key: 'Sinus brady with PVC (bigeminy)', ans: 'sb-pvc-bigem' },
  { n: 16, key: '3° block', ans: 'avb3' },
  { n: 17, key: 'Sinus dysrhythmia', ans: 'sinus-dys' },
  { n: 18, key: 'A-fib', ans: 'afib' },
  { n: 19, key: 'NSR', ans: 'nsr' },
  { n: 20, key: 'Accelerated IVR', ans: 'aivr' },
  { n: 21, key: 'Junctional tach', ans: 'junct-tach' },
  { n: 22, key: 'Sinus arrest with PVCs (sinus block)', ans: 'sinus-arrest-pvc' },
  { n: 23, key: '2° type 2', ans: 'avb2ii' },
  { n: 24, key: 'V-tach', ans: 'vt' },
  { n: 25, key: 'Sinus brady with 1°', ans: 'sb-1avb' },
  { n: 26, key: '3° block', ans: 'avb3' },
  { n: 27, key: 'Junctional tach (SVT)', ans: 'junct-tach-svt' },
  { n: 28, key: 'Sinus tach', ans: 'st' },
  { n: 29, key: 'SVT (A-fib RVR)', ans: 'afib-rvr' },
  { n: 30, key: 'IVR', ans: 'ivr' },
  { n: 31, key: 'SR with PVC', ans: 'sr-pvc' },
  { n: 32, key: 'ST with PJC', ans: 'st-pjc' },
  { n: 33, key: 'WPW', ans: 'wpw' },
  { n: 34, key: '3° block', ans: 'avb3' },
  { n: 35, key: 'A-fib with salvo of PVCs', ans: 'afib-salvo' },
  { n: 36, key: 'A-fib with PVC', ans: 'afib-pvc' }
];
