/*
 * Pathophysiology overview at the paramedic level: the cell, fluids and
 * electrolytes, acid-base, perfusion and shock, inflammation and immunity,
 * and the stress response.
 *
 * No class slides for this unit have been uploaded yet, so this content is
 * written from standard paramedic pathophysiology (the material the National
 * EMS Education Standards and Sanders' Paramedic Textbook cover). Normal
 * values are the common textbook ones; your program's may differ slightly.
 *
 * Topic fields: about, patho (how it happens), signs, care (what it means in
 * the field). Key facts are { q, a, wrong[] } for cards and multiple choice.
 */
window.PATHO_GROUPS = [
  { id: 'cell', name: 'The cell' },
  { id: 'fluids', name: 'Fluids & electrolytes' },
  { id: 'acidbase', name: 'Acid-base' },
  { id: 'shock', name: 'Perfusion & shock' },
  { id: 'immune', name: 'Inflammation & immunity' },
  { id: 'stress', name: 'Stress & disease' }
];

window.PATHO_TOPICS = [
  // ---------------- The cell ----------------
  {
    id: 'metabolism', name: 'Aerobic vs anaerobic metabolism', group: 'cell', aliases: ['glycolysis', 'atp', 'lactic acid', 'krebs'],
    about: ['Cells need a steady supply of oxygen and glucose to make ATP, the energy that runs every cell function',
      'Aerobic metabolism (with oxygen) makes about 36 to 38 ATP per glucose; the by-products are CO₂ and water',
      'Anaerobic metabolism (without oxygen) makes only 2 ATP per glucose; the by-product is lactic acid'],
    patho: ['When perfusion or oxygenation fails, cells switch to anaerobic metabolism',
      'Too little ATP stops the sodium-potassium pump: sodium and water flow into the cell and it swells',
      'Lactic acid builds up and causes metabolic acidosis',
      'If oxygen is not restored, the cell membrane ruptures and the cell dies'],
    signs: ['Rising lactate and falling pH (metabolic acidosis)', 'Fast, deep breathing as the body blows off CO₂ to compensate'],
    care: ['Shock is a problem at the cell level: the goal of oxygen, ventilation, bleeding control and fluids is to get cells back to aerobic metabolism']
  },
  {
    id: 'adaptation', name: 'Cellular adaptation', group: 'cell', aliases: ['atrophy', 'hypertrophy', 'hyperplasia', 'metaplasia', 'dysplasia'],
    about: ['Cells change their size, number or type to survive stress. Adaptation can be normal or a warning sign of disease'],
    patho: ['Atrophy: cells shrink from less use, less blood supply, poor nutrition or loss of nerve or hormone stimulation (a limb in a cast)',
      'Hypertrophy: cells get bigger to meet more workload (left ventricle in long-standing hypertension, athlete muscle)',
      'Hyperplasia: cells increase in number (uterine lining, callus, enlarged prostate)',
      'Metaplasia: one mature cell type is replaced by another that tolerates the stress better (airway lining in smokers)',
      'Dysplasia: abnormal changes in cell size, shape and organization; often a precursor to cancer'],
    signs: ['LVH on the 12-lead from hypertrophy', 'Muscle wasting from atrophy'],
    care: ['Hypertrophied hearts need more oxygen and are prone to ischemia and dysrhythmias']
  },
  {
    id: 'cell-injury', name: 'Cellular injury', group: 'cell', aliases: ['hypoxic injury', 'free radicals', 'cell damage'],
    about: ['Cells are injured when the stress is more than they can adapt to',
      'Hypoxia is the most common cause of cell injury'],
    patho: ['Hypoxic injury: low oxygen from poor perfusion, anemia, CO poisoning or respiratory failure',
      'Chemical injury: drugs, poisons, alcohol, carbon monoxide, cyanide',
      'Infectious injury: bacteria (toxins), viruses (take over the cell)',
      'Immunologic and inflammatory injury: the body\'s own defenses damage cells',
      'Physical injury: trauma, heat, cold, radiation, electricity',
      'Genetic and nutritional causes: inherited disease, too little or too much intake',
      'Reperfusion injury: when blood flow returns, free radicals and built-up acid and potassium wash out into the circulation'],
    signs: ['Depends on the organ: chest pain (heart), stroke signs (brain), altered mental status'],
    care: ['Expect acidosis and hyperkalemia after a crush or tourniquet is released (reperfusion)']
  },
  {
    id: 'cell-death', name: 'Cell death', group: 'cell', aliases: ['necrosis', 'apoptosis', 'gangrene'],
    about: ['Apoptosis is planned, normal cell death; the cell breaks down without inflammation',
      'Necrosis is death from injury; the cell swells and bursts and causes inflammation'],
    patho: ['Coagulative necrosis: from ischemia, as in MI (tissue stays firm)',
      'Liquefactive necrosis: tissue turns to liquid, as in a brain infarct or an abscess',
      'Caseous necrosis: cheese-like, as in tuberculosis',
      'Fat necrosis: from enzymes breaking down fat, as in pancreatitis',
      'Gangrene: necrosis of a large area, usually from lost blood supply (dry, wet, or gas gangrene from Clostridium)'],
    signs: ['Released cell contents raise blood markers (troponin after MI, CK after crush injury)'],
    care: ['Dead tissue cannot be saved; the goal is to protect the injured tissue around it (the ischemic zone in MI or stroke)']
  },

  // ---------------- Fluids & electrolytes ----------------
  {
    id: 'body-water', name: 'Body water and compartments', group: 'fluids', aliases: ['tbw', 'intracellular', 'extracellular', 'interstitial', 'intravascular'],
    about: ['Water is about 60% of adult body weight (more in infants, less in older adults)',
      'Intracellular fluid (inside cells): about two-thirds of body water',
      'Extracellular fluid: about one-third, split into interstitial (between cells, about three-quarters) and intravascular (plasma, about one-quarter)'],
    patho: ['Water moves between compartments by osmosis toward the higher concentration of particles',
      'Hydrostatic pressure (blood pressure) pushes fluid out of capillaries; oncotic pressure (proteins such as albumin) pulls it back in'],
    signs: [],
    care: ['Infants and older adults dehydrate faster and tolerate fluid loss poorly']
  },
  {
    id: 'iv-fluids', name: 'Tonicity and IV fluids', group: 'fluids', aliases: ['isotonic', 'hypotonic', 'hypertonic', 'normal saline', 'lactated ringers', 'd5w', 'crystalloid', 'colloid'],
    about: ['Isotonic: same particle concentration as plasma; stays in the extracellular space (normal saline, lactated Ringer\'s)',
      'Hypotonic: lower concentration; water moves into the cells (D5W once the sugar is used, 0.45% saline)',
      'Hypertonic: higher concentration; water is pulled out of the cells into the vessels (3% saline, D50)',
      'Crystalloids contain electrolytes and cross capillary walls; colloids contain large molecules that stay in the vessels'],
    patho: ['Only about one-quarter to one-third of infused isotonic crystalloid stays in the vessels; the rest moves to the interstitial space within an hour',
      'Crystalloids carry no oxygen and dilute clotting factors'],
    signs: ['Too much fluid: crackles, JVD, pulmonary and peripheral edema'],
    care: ['In hemorrhagic shock, give fluid in small boluses to a target (permissive hypotension) rather than large volumes',
      'Do not give hypotonic fluid to a patient with a head injury (it can worsen brain swelling)']
  },
  {
    id: 'edema', name: 'Edema', group: 'fluids', aliases: ['swelling', 'third spacing', 'starling'],
    about: ['Edema is excess fluid in the interstitial space'],
    patho: ['Higher hydrostatic pressure: heart failure, fluid overload, venous obstruction',
      'Lower oncotic pressure: low albumin from liver disease, malnutrition, kidney loss, burns',
      'Leaky capillaries: inflammation, burns, sepsis, anaphylaxis',
      'Blocked lymph drainage: lymphedema, tumors, surgery'],
    signs: ['Pitting edema of the legs or sacrum', 'Pulmonary edema: crackles, dyspnea, pink frothy sputum', 'Swollen airway in anaphylaxis'],
    care: ['Third-spaced fluid is lost to the circulation: a burn or septic patient can be hypovolemic while swollen']
  },
  {
    id: 'dehydration', name: 'Dehydration and overhydration', group: 'fluids', aliases: ['hypovolemia', 'fluid overload', 'volume'],
    about: ['Dehydration: loss of water, often with electrolytes, from vomiting, diarrhea, sweating, fever, burns, diuretics or poor intake',
      'Overhydration: too much body water, from kidney or heart failure or excess IV fluid'],
    patho: ['Fluid loss lowers preload and stroke volume; the body compensates with tachycardia and vasoconstriction'],
    signs: ['Dehydration: dry mucous membranes, poor skin turgor, tachycardia, orthostatic changes, decreased urine, sunken fontanelle in infants',
      'Overhydration: edema, crackles, JVD, weight gain, shortness of breath'],
    care: ['Isotonic fluid boluses for dehydration with poor perfusion; reassess lung sounds between boluses']
  },
  {
    id: 'sodium', name: 'Sodium (Na⁺)', group: 'fluids', aliases: ['hyponatremia', 'hypernatremia', 'na'],
    about: ['Main extracellular cation; controls water balance and nerve conduction',
      'Normal about 135 to 145 mEq/L'],
    patho: ['Hyponatremia: too much water for the sodium (excess water intake, SIADH, diuretics, heart failure) or sodium loss (vomiting, diarrhea, sweating)',
      'Water moves into brain cells and they swell',
      'Hypernatremia: water loss greater than sodium loss (dehydration, diabetes insipidus, no access to water); brain cells shrink'],
    signs: ['Hyponatremia: headache, nausea, confusion, seizures, coma', 'Hypernatremia: thirst, irritability, confusion, seizures'],
    care: ['Seizures from hyponatremia (endurance athletes, water intoxication) may not respond to benzodiazepines alone; hospital uses hypertonic saline']
  },
  {
    id: 'potassium', name: 'Potassium (K⁺)', group: 'fluids', aliases: ['hyperkalemia', 'hypokalemia', 'k'],
    about: ['Main intracellular cation; sets the resting membrane potential of heart and muscle cells',
      'Normal about 3.5 to 5.0 mEq/L'],
    patho: ['Hyperkalemia: kidney failure, missed dialysis, crush injury or rhabdomyolysis, acidosis (K⁺ shifts out of cells), potassium-sparing drugs',
      'Hypokalemia: diuretics, vomiting, diarrhea, alkalosis (K⁺ shifts into cells)'],
    signs: ['Hyperkalemia: weakness, peaked T waves, wide QRS, sine-wave pattern, bradycardia, cardiac arrest',
      'Hypokalemia: weakness, cramps, flat T waves, U waves, PVCs and other ventricular dysrhythmias'],
    care: ['Hyperkalemia with ECG changes: calcium to stabilize the heart, then shift K⁺ into cells (sodium bicarbonate, albuterol) per protocol',
      'Think hyperkalemia in a dialysis patient with weakness or a wide, slow rhythm']
  },
  {
    id: 'calcium', name: 'Calcium (Ca²⁺) and magnesium (Mg²⁺)', group: 'fluids', aliases: ['hypocalcemia', 'hypercalcemia', 'hypomagnesemia', 'ca', 'mg'],
    about: ['Calcium: bones, muscle contraction, clotting, nerve function; normal about 8.5 to 10.5 mg/dL',
      'Magnesium: works with potassium and calcium in muscle and nerve; normal about 1.5 to 2.5 mEq/L'],
    patho: ['Hypocalcemia: hyperventilation or alkalosis (less ionized calcium), low parathyroid hormone, massive transfusion, pancreatitis',
      'Hypercalcemia: cancer, overactive parathyroid; causes weakness and kidney stones',
      'Hypomagnesemia: alcoholism, malnutrition, diuretics; often comes with hypokalemia'],
    signs: ['Hypocalcemia: tingling around the mouth and fingers, carpopedal spasm, long QT, seizures',
      'Hypomagnesemia: tremor, long QT, torsades de pointes'],
    care: ['Torsades: magnesium sulfate', 'Carpopedal spasm in a hyperventilating patient comes from alkalosis lowering ionized calcium; coach the breathing']
  },

  // ---------------- Acid-base ----------------
  {
    id: 'ph-buffers', name: 'pH and buffer systems', group: 'acidbase', aliases: ['ph', 'bicarbonate buffer', 'abg', 'normal values'],
    about: ['pH measures hydrogen ions; normal blood pH is 7.35 to 7.45',
      'Below 7.35 is acidosis; above 7.45 is alkalosis. Life is hard to sustain below about 6.8 or above about 7.8',
      'Normal PaCO₂ is 35 to 45 mm Hg (the respiratory part); normal HCO₃⁻ is 22 to 26 mEq/L (the metabolic part)'],
    patho: ['Bicarbonate buffer: CO₂ + H₂O ⇄ H₂CO₃ ⇄ H⁺ + HCO₃⁻; acts in seconds',
      'Respiratory system: changes the rate and depth of breathing to blow off or keep CO₂; acts in minutes',
      'Kidneys: excrete H⁺ and make or keep HCO₃⁻; slowest (hours to days) but the most powerful'],
    signs: [],
    care: ['ETCO₂ reflects PaCO₂ in a patient with good perfusion; normal is about 35 to 45 mm Hg',
      'How you ventilate changes the patient\'s pH: hypoventilation causes acidosis, hyperventilation causes alkalosis']
  },
  {
    id: 'resp-acidosis', name: 'Respiratory acidosis', group: 'acidbase', aliases: ['hypoventilation', 'co2 retention', 'hypercapnia'],
    about: ['pH below 7.35 with PaCO₂ above 45 mm Hg: the patient is not breathing off enough CO₂'],
    patho: ['Hypoventilation from opioid or sedative overdose, head injury, COPD exacerbation, severe asthma, chest trauma, neuromuscular disease, airway obstruction',
      'Kidneys compensate over days by keeping bicarbonate (chronic COPD patients often have a high HCO₃⁻)'],
    signs: ['Slow or shallow breathing, high ETCO₂, drowsiness, confusion, headache, flushed skin'],
    care: ['Fix the ventilation: open the airway, BVM, naloxone for opioid overdose, CPAP or advanced airway as needed']
  },
  {
    id: 'resp-alkalosis', name: 'Respiratory alkalosis', group: 'acidbase', aliases: ['hyperventilation', 'hypocapnia'],
    about: ['pH above 7.45 with PaCO₂ below 35 mm Hg: the patient is blowing off too much CO₂'],
    patho: ['Hyperventilation from anxiety, pain, fever, early hypoxia, pulmonary embolism, early salicylate overdose, high altitude, or overventilation with a BVM',
      'Kidneys compensate by excreting bicarbonate'],
    signs: ['Fast breathing, low ETCO₂, lightheadedness, tingling around the mouth and fingers, carpopedal spasm'],
    care: ['Rule out hypoxia, PE and other serious causes before calling it anxiety',
      'Coach the breathing; do not have the patient rebreathe into a paper bag',
      'Ventilate at the right rate (about 1 breath every 6 seconds for an adult with an advanced airway)']
  },
  {
    id: 'metab-acidosis', name: 'Metabolic acidosis', group: 'acidbase', aliases: ['dka', 'lactic acidosis', 'mudpiles', 'kussmaul'],
    about: ['pH below 7.35 with HCO₃⁻ below 22 mEq/L: too much acid or too little bicarbonate'],
    patho: ['Acid gain: lactic acidosis (shock, cardiac arrest, seizures), DKA, toxic alcohols (methanol, ethylene glycol), salicylates, kidney failure',
      'Bicarbonate loss: severe diarrhea',
      'The lungs compensate fast by blowing off CO₂ (Kussmaul respirations: deep and fast)'],
    signs: ['Kussmaul respirations, low ETCO₂, fruity breath in DKA, altered mental status, hypotension, hyperkalemia'],
    care: ['Treat the cause: perfusion for lactic acidosis, fluids for DKA',
      'If you intubate a patient in metabolic acidosis, keep their fast respiratory rate; slowing it can drop the pH quickly'],
  },
  {
    id: 'metab-alkalosis', name: 'Metabolic alkalosis', group: 'acidbase', aliases: ['vomiting', 'contraction alkalosis'],
    about: ['pH above 7.45 with HCO₃⁻ above 26 mEq/L: too little acid or too much bicarbonate'],
    patho: ['Acid loss: prolonged vomiting or NG suction (loss of stomach acid)',
      'Bicarbonate gain: diuretics, excess antacids or sodium bicarbonate',
      'The lungs compensate by slowing breathing to keep CO₂'],
    signs: ['Slow, shallow breathing, weakness, muscle cramps, dysrhythmias (often with hypokalemia)'],
    care: ['Usually supportive in the field: fluids for the vomiting patient and watch the ECG for low-potassium changes']
  },
  {
    id: 'compensation', name: 'Compensation and reading an ABG', group: 'acidbase', aliases: ['rome', 'compensated', 'mixed', 'abg interpretation'],
    about: ['Step 1: Is the pH acidotic (< 7.35), alkalotic (> 7.45) or normal?',
      'Step 2: Which value explains it? PaCO₂ high means respiratory acidosis; low means respiratory alkalosis. HCO₃⁻ low means metabolic acidosis; high means metabolic alkalosis',
      'Step 3: Is the other value moving the opposite way? Then the body is compensating',
      'ROME: Respiratory Opposite (pH and PaCO₂ move in opposite directions), Metabolic Equal (pH and HCO₃⁻ move the same direction)'],
    patho: ['Uncompensated: pH abnormal, only the cause is out of range',
      'Partially compensated: pH still abnormal, both values out of range in the compensating directions',
      'Fully compensated: pH back in 7.35 to 7.45, both values abnormal; the side of 7.40 the pH sits on shows the original problem',
      'Mixed (combined): both values push pH the same way, such as cardiac arrest with high CO₂ and low HCO₃⁻'],
    signs: [],
    care: ['Compensation never overshoots: the body does not push pH past normal',
      'Practice with the ABG tab in Learn']
  },

  // ---------------- Perfusion & shock ----------------
  {
    id: 'perfusion', name: 'Perfusion and the Fick principle', group: 'shock', aliases: ['fick', 'cardiac output', 'map', 'perfusion triangle', 'stroke volume'],
    about: ['Perfusion is the delivery of oxygen and nutrients to cells and the removal of wastes',
      'It depends on the pump (heart), the pipes (vessels) and the volume (blood); shock is a failure of one or more',
      'Fick principle: oxygen must get into the blood (lungs), bind to hemoglobin, be carried to the tissues, and be released into the cells'],
    patho: ['Cardiac output = heart rate × stroke volume (normal about 5 L/min)',
      'Stroke volume depends on preload (filling), contractility, and afterload (the resistance the heart pumps against)',
      'Blood pressure = cardiac output × systemic vascular resistance',
      'Mean arterial pressure ≈ diastolic + one-third of pulse pressure; about 65 mm Hg is the usual minimum for organ perfusion'],
    signs: [],
    care: ['A normal blood pressure does not prove good perfusion; look at mental status, skin, capillary refill, heart rate and ETCO₂']
  },
  {
    id: 'shock-stages', name: 'Stages of shock', group: 'shock', aliases: ['compensated shock', 'decompensated shock', 'irreversible shock', 'progressive'],
    about: ['Compensated: the body keeps blood pressure normal with catecholamines and vasoconstriction',
      'Decompensated (progressive): compensation fails and blood pressure falls',
      'Irreversible: cell and organ damage is too great to recover, even with treatment'],
    patho: ['Baroreceptors sense falling pressure; the sympathetic nervous system releases epinephrine and norepinephrine',
      'Heart rate and contractility rise; vessels to skin, gut and kidneys constrict to save the brain and heart',
      'Renin-angiotensin-aldosterone and ADH hold onto sodium and water',
      'As cells go anaerobic, lactic acid builds up, precapillary sphincters relax while postcapillary ones stay closed, and blood pools and leaks out of the capillaries',
      'Late: microclots (DIC), multiple organ dysfunction syndrome (MODS), death'],
    signs: ['Compensated: anxiety or restlessness, tachycardia, pale cool clammy skin, delayed capillary refill, narrowed pulse pressure, normal BP, thirst',
      'Decompensated: falling BP, altered mental status, weak or absent radial pulse, mottled skin, decreased urine',
      'Irreversible: bradycardia, profound hypotension, unresponsiveness, agonal breathing'],
    care: ['Find shock while it is compensated; hypotension is a late sign, especially in children',
      'Children compensate well and then crash suddenly'],
  },
  {
    id: 'hypovolemic', name: 'Hypovolemic shock', group: 'shock', aliases: ['hemorrhagic shock', 'bleeding', 'volume loss'],
    about: ['Not enough circulating volume. Hemorrhagic (blood loss) or non-hemorrhagic (vomiting, diarrhea, burns, third spacing)'],
    patho: ['Less preload means less stroke volume and cardiac output; the body compensates with tachycardia and vasoconstriction',
      'In hemorrhage, the lethal triad is hypothermia, acidosis and coagulopathy, each making the others worse'],
    signs: ['Tachycardia, pale cool clammy skin, flat neck veins, thirst, anxiety, then hypotension'],
    care: ['Stop the bleeding first (direct pressure, tourniquet, wound packing)',
      'Keep the patient warm; give blood if available, or small fluid boluses to a target BP (permissive hypotension) per protocol; TXA per protocol',
      'Fast transport to a trauma center']
  },
  {
    id: 'cardiogenic', name: 'Cardiogenic shock', group: 'shock', aliases: ['pump failure'],
    about: ['The heart cannot pump enough blood even though volume is adequate. Most often from a large MI (usually 40% or more of the left ventricle)'],
    patho: ['Low contractility lowers stroke volume; blood backs up into the lungs',
      'Compensation (tachycardia, vasoconstriction) raises the heart\'s oxygen demand and makes the ischemia worse'],
    signs: ['Hypotension, tachycardia or dysrhythmia, crackles, JVD, cool clammy skin, chest pain, dyspnea'],
    care: ['12-lead ECG, oxygen to target, careful small fluid boluses only if lungs are clear, vasopressors (such as norepinephrine) per protocol, transport to a PCI center',
      'Avoid nitroglycerin when hypotensive']
  },
  {
    id: 'obstructive', name: 'Obstructive shock', group: 'shock', aliases: ['tension pneumothorax', 'tamponade', 'pulmonary embolism'],
    about: ['Something physically blocks blood flow into or out of the heart'],
    patho: ['Tension pneumothorax: rising pressure in the chest shifts the mediastinum and kinks the vena cava, so preload drops',
      'Cardiac tamponade: fluid in the pericardium squeezes the heart so it cannot fill',
      'Pulmonary embolism: a clot blocks the pulmonary artery, so the right ventricle cannot empty and the left ventricle gets little blood'],
    signs: ['Tension pneumothorax: absent breath sounds on one side, JVD, worsening dyspnea, tracheal deviation (late)',
      'Tamponade: Beck\'s triad (hypotension, JVD, muffled heart sounds), pulsus paradoxus, electrical alternans',
      'PE: sudden dyspnea, pleuritic chest pain, tachycardia, hypoxia despite oxygen'],
    care: ['Fix the obstruction: needle decompression for tension pneumothorax; rapid transport for tamponade (pericardiocentesis) and PE',
      'Fluids may help briefly by raising preload']
  },
  {
    id: 'distributive', name: 'Distributive shock', group: 'shock', aliases: ['septic shock', 'anaphylactic shock', 'neurogenic shock', 'vasodilatory'],
    about: ['Blood vessels dilate (and may leak), so normal blood volume can no longer fill the bigger space. Three main types: septic, anaphylactic, neurogenic'],
    patho: ['Septic: an infection triggers a body-wide inflammatory response; vessels dilate and leak, and cells cannot use oxygen well',
      'Anaphylactic: a type I allergic reaction releases histamine and other mediators; vessels dilate and leak, airways swell and constrict',
      'Neurogenic: a spinal cord injury (usually above T6) cuts sympathetic tone; vessels dilate and the heart cannot speed up'],
    signs: ['Septic: fever or hypothermia, tachycardia, tachypnea, warm flushed skin early then cool and mottled, altered mental status',
      'Anaphylactic: hives, flushing, wheezing, stridor, facial and airway swelling, GI upset, hypotension',
      'Neurogenic: hypotension with bradycardia, warm dry pink skin below the injury, priapism'],
    care: ['Septic: fluids, early recognition and notification, vasopressors per protocol',
      'Anaphylactic: IM epinephrine first, then airway support, fluids, antihistamines, albuterol',
      'Neurogenic: spinal motion restriction, fluids, atropine for bradycardia, vasopressors per protocol; rule out bleeding first']
  },
  {
    id: 'mods', name: 'SIRS, sepsis and MODS', group: 'shock', aliases: ['multiple organ dysfunction', 'sirs', 'dic'],
    about: ['SIRS: a body-wide inflammatory response to infection, trauma, burns or pancreatitis',
      'MODS: progressive failure of two or more organ systems after a severe illness or injury; often the final common path of shock'],
    patho: ['Inflammatory mediators damage the endothelium everywhere, causing leaky vessels, microclots and poor oxygen use',
      'Organs commonly fail in order: lungs (ARDS), then liver, kidneys, gut, heart and brain',
      'DIC: clotting factors are used up by widespread small clots, so the patient both clots and bleeds'],
    signs: ['Tachycardia, tachypnea, fever or low temperature, altered mental status, low urine output, bleeding from IV sites in DIC'],
    care: ['Prevent it: fix shock early and fully',
      'Screen for sepsis and notify the hospital early']
  },

  // ---------------- Inflammation & immunity ----------------
  {
    id: 'inflammation', name: 'Inflammation', group: 'immune', aliases: ['inflammatory response', 'histamine', 'mast cells', 'chemotaxis'],
    about: ['The body\'s fast, nonspecific response to any injury (trauma, infection, toxins, burns)',
      'Goals: wall off and destroy the cause, clean up dead tissue and start healing',
      'Acute inflammation lasts days; chronic inflammation lasts weeks or longer and can damage tissue'],
    patho: ['Mast cells release histamine and other mediators: vessels dilate and become leaky',
      'White blood cells (neutrophils first, then macrophages) are drawn to the site (chemotaxis) and eat invaders (phagocytosis)',
      'Plasma protein systems switch on: complement, clotting and kinin (bradykinin causes pain)'],
    signs: ['Five classic signs: redness, heat, swelling, pain and loss of function',
      'Body-wide: fever, malaise, high white blood cell count'],
    care: ['The same response that heals a wound causes the leaky vessels of sepsis and anaphylaxis when it goes body-wide']
  },
  {
    id: 'immunity', name: 'Immune response', group: 'immune', aliases: ['innate', 'acquired', 'humoral', 'cell-mediated', 'antibodies', 'b cells', 't cells'],
    about: ['Innate (natural) immunity: present at birth, nonspecific; skin, mucous membranes, inflammation',
      'Acquired (adaptive) immunity: specific to one antigen, has memory, and gets stronger with repeat exposure',
      'Active immunity: the body makes its own antibodies (infection or vaccine). Passive immunity: antibodies are given (mother to baby, immune globulin)'],
    patho: ['Humoral immunity: B cells become plasma cells and make antibodies (immunoglobulins IgG, IgM, IgA, IgE, IgD)',
      'Cell-mediated immunity: T cells kill infected or abnormal cells directly (cytotoxic T cells) and direct the response (helper T cells)',
      'IgE binds mast cells and drives allergic reactions'],
    signs: [],
    care: ['Immunocompromised patients (HIV, chemotherapy, transplant, steroids, older adults) may have serious infections with little or no fever']
  },
  {
    id: 'hypersensitivity', name: 'Hypersensitivity reactions', group: 'immune', aliases: ['allergy', 'type i', 'type ii', 'type iii', 'type iv', 'anaphylaxis'],
    about: ['An exaggerated or harmful immune response. Four types'],
    patho: ['Type I (immediate, IgE): antigen binds IgE on mast cells and they release histamine; allergies, asthma, anaphylaxis',
      'Type II (cytotoxic): antibodies attack the body\'s own cells; transfusion reaction, hemolytic disease of the newborn',
      'Type III (immune complex): antigen-antibody clumps deposit in tissue and cause inflammation; lupus, serum sickness',
      'Type IV (delayed, T cell): reaction 24 to 72 hours later; poison ivy, TB skin test, contact dermatitis'],
    signs: ['Type I: hives, itching, wheezing, swelling, hypotension within minutes'],
    care: ['Anaphylaxis is a type I reaction: IM epinephrine is the first drug',
      'Stop a transfusion at the first sign of a reaction']
  },
  {
    id: 'autoimmune', name: 'Autoimmune disease and immunodeficiency', group: 'immune', aliases: ['hiv', 'lupus', 'immunocompromised', 'type 1 diabetes'],
    about: ['Autoimmune disease: the immune system attacks the body\'s own tissue (type 1 diabetes, rheumatoid arthritis, lupus, multiple sclerosis, myasthenia gravis, Graves disease)',
      'Immunodeficiency: the immune system is too weak; congenital or acquired (HIV, chemotherapy, steroids, malnutrition, diabetes, aging)'],
    patho: ['Autoimmunity: loss of tolerance to self antigens',
      'HIV infects helper T cells (CD4); a low CD4 count opens the door to opportunistic infections'],
    signs: ['Frequent or unusual infections, fever may be absent'],
    care: ['Use extra infection control to protect the immunocompromised patient', 'Ask about steroid use: a patient on long-term steroids may need stress-dose steroids when sick or injured']
  },

  // ---------------- Stress & disease ----------------
  {
    id: 'stress-response', name: 'Stress response (GAS)', group: 'stress', aliases: ['general adaptation syndrome', 'fight or flight', 'cortisol', 'catecholamines'],
    about: ['General adaptation syndrome (Selye) has three stages: alarm, resistance and exhaustion'],
    patho: ['Alarm: the sympathetic nervous system releases epinephrine and norepinephrine (fight or flight): heart rate, blood pressure, blood sugar and breathing rate rise; pupils dilate',
      'Resistance: cortisol and other hormones keep up the response; blood sugar stays high, inflammation and immunity are suppressed',
      'Exhaustion: the body can no longer adapt; disease or death can follow'],
    signs: ['Tachycardia, hypertension, hyperglycemia, dilated pupils, anxiety'],
    care: ['Pain and fear raise oxygen demand; treating pain and calming the patient helps perfusion',
      'Long-term stress raises the risk of hypertension, heart disease, infection and depression (including in EMS providers)']
  },
  {
    id: 'disease-risk', name: 'Disease risk factors', group: 'stress', aliases: ['genetics', 'risk', 'epidemiology', 'modifiable'],
    about: ['Most diseases come from a mix of genetic and environmental factors',
      'Non-modifiable risk factors: age, sex, family history, genetics, race or ethnicity',
      'Modifiable risk factors: smoking, diet, activity, weight, alcohol, blood pressure, cholesterol, blood sugar control'],
    patho: ['Incidence: new cases in a period. Prevalence: all existing cases at one time',
      'Morbidity: illness. Mortality: death'],
    signs: [],
    care: ['Family history in the SAMPLE history (early heart disease, clotting disorders, sudden death) changes your index of suspicion']
  }
];

window.PATHO_FACTS = [
  { q: 'Normal blood pH', a: '7.35 to 7.45', wrong: ['7.25 to 7.35', '7.45 to 7.55', '7.00 to 7.20'] },
  { q: 'Normal PaCO₂', a: '35 to 45 mm Hg', wrong: ['22 to 26 mm Hg', '80 to 100 mm Hg', '45 to 55 mm Hg'] },
  { q: 'Normal HCO₃⁻ (bicarbonate)', a: '22 to 26 mEq/L', wrong: ['35 to 45 mEq/L', '10 to 15 mEq/L', '135 to 145 mEq/L'] },
  { q: 'Normal serum sodium', a: '135 to 145 mEq/L', wrong: ['3.5 to 5.0 mEq/L', '95 to 105 mEq/L', '8.5 to 10.5 mEq/L'] },
  { q: 'Normal serum potassium', a: '3.5 to 5.0 mEq/L', wrong: ['135 to 145 mEq/L', '1.5 to 2.5 mEq/L', '5.5 to 7.0 mEq/L'] },
  { q: 'Fastest acid-base buffer system', a: 'The bicarbonate buffer system (seconds)', wrong: ['The kidneys (seconds)', 'The respiratory system (seconds)', 'The liver (seconds)'] },
  { q: 'Slowest but most powerful acid-base system', a: 'The kidneys (hours to days)', wrong: ['The lungs (minutes)', 'The bicarbonate buffer (seconds)', 'The spleen (days)'] },
  { q: 'ATP made from one glucose by aerobic metabolism', a: 'About 36 to 38', wrong: ['2', 'About 10', 'About 100'] },
  { q: 'ATP made from one glucose by anaerobic metabolism', a: '2, with lactic acid as a by-product', wrong: ['36, with lactic acid as a by-product', '2, with only CO₂ and water as by-products', '18, with ketones as a by-product'] },
  { q: 'Main extracellular cation', a: 'Sodium (Na⁺)', wrong: ['Potassium (K⁺)', 'Magnesium (Mg²⁺)', 'Chloride (Cl⁻)'] },
  { q: 'Main intracellular cation', a: 'Potassium (K⁺)', wrong: ['Sodium (Na⁺)', 'Calcium (Ca²⁺)', 'Bicarbonate (HCO₃⁻)'] },
  { q: 'Percentage of adult body weight that is water', a: 'About 60%', wrong: ['About 30%', 'About 45%', 'About 80%'] },
  { q: 'Where most body water is', a: 'Inside the cells (intracellular), about two-thirds', wrong: ['In the plasma, about two-thirds', 'In the interstitial space, about two-thirds', 'Evenly split between all compartments'] },
  { q: 'Example of an isotonic IV fluid', a: 'Normal saline (0.9% NaCl) or lactated Ringer\'s', wrong: ['D5W', '0.45% saline', '3% saline'] },
  { q: 'What a hypertonic solution does to cells', a: 'Pulls water out of the cells, so they shrink', wrong: ['Pushes water into the cells, so they swell', 'No net water movement', 'Makes the cells burst'] },
  { q: 'What a hypotonic solution does to cells', a: 'Water moves into the cells, so they swell', wrong: ['Water leaves the cells, so they shrink', 'No net water movement', 'Pulls fluid into the vessels'] },
  { q: 'Force that pulls fluid back into capillaries', a: 'Oncotic (colloid osmotic) pressure from plasma proteins such as albumin', wrong: ['Hydrostatic pressure from the heart', 'Lymphatic pressure', 'Atmospheric pressure'] },
  { q: 'Force that pushes fluid out of capillaries', a: 'Hydrostatic pressure (blood pressure)', wrong: ['Oncotic pressure', 'Osmotic pressure from albumin', 'Interstitial suction'] },
  { q: 'Cardiac output formula', a: 'Heart rate × stroke volume', wrong: ['Stroke volume × systemic vascular resistance', 'Heart rate × blood pressure', 'Preload × afterload'] },
  { q: 'Blood pressure formula', a: 'Cardiac output × systemic vascular resistance', wrong: ['Heart rate × stroke volume', 'Preload ÷ afterload', 'Stroke volume ÷ heart rate'] },
  { q: 'Three parts of the perfusion triangle', a: 'Pump (heart), pipes (vessels), volume (blood)', wrong: ['Airway, breathing, circulation', 'Preload, afterload, contractility', 'Heart, lungs, kidneys'] },
  { q: 'Most common cause of cellular injury', a: 'Hypoxia', wrong: ['Infection', 'Genetic disease', 'Radiation'] },
  { q: 'Cells shrinking from disuse', a: 'Atrophy', wrong: ['Hypertrophy', 'Hyperplasia', 'Metaplasia'] },
  { q: 'Cells getting larger to handle more work', a: 'Hypertrophy', wrong: ['Hyperplasia', 'Atrophy', 'Dysplasia'] },
  { q: 'Cells increasing in number', a: 'Hyperplasia', wrong: ['Hypertrophy', 'Metaplasia', 'Atrophy'] },
  { q: 'One mature cell type replaced by another', a: 'Metaplasia', wrong: ['Dysplasia', 'Hyperplasia', 'Apoptosis'] },
  { q: 'Abnormal cell size, shape and organization, often before cancer', a: 'Dysplasia', wrong: ['Metaplasia', 'Hypertrophy', 'Atrophy'] },
  { q: 'Planned, normal cell death without inflammation', a: 'Apoptosis', wrong: ['Necrosis', 'Gangrene', 'Lysis'] },
  { q: 'Type of necrosis in an MI', a: 'Coagulative necrosis', wrong: ['Liquefactive necrosis', 'Caseous necrosis', 'Fat necrosis'] },
  { q: 'Type of necrosis in tuberculosis', a: 'Caseous necrosis', wrong: ['Coagulative necrosis', 'Fat necrosis', 'Liquefactive necrosis'] },
  { q: 'Five classic signs of inflammation', a: 'Redness, heat, swelling, pain, loss of function', wrong: ['Fever, chills, sweats, pain, nausea', 'Redness, cold, swelling, numbness, itching', 'Pallor, heat, swelling, pain, bleeding'] },
  { q: 'Cell that releases histamine', a: 'Mast cell', wrong: ['Red blood cell', 'Platelet', 'Helper T cell'] },
  { q: 'First white blood cells to arrive at inflammation', a: 'Neutrophils', wrong: ['Lymphocytes', 'Eosinophils', 'Plasma cells'] },
  { q: 'Antibody behind type I (allergic) reactions', a: 'IgE', wrong: ['IgG', 'IgM', 'IgA'] },
  { q: 'Hypersensitivity type for poison ivy and the TB skin test', a: 'Type IV (delayed, T cell)', wrong: ['Type I (IgE)', 'Type II (cytotoxic)', 'Type III (immune complex)'] },
  { q: 'Hypersensitivity type for a transfusion reaction', a: 'Type II (cytotoxic)', wrong: ['Type I (IgE)', 'Type III (immune complex)', 'Type IV (delayed)'] },
  { q: 'Cells that make antibodies', a: 'B cells (plasma cells)', wrong: ['Cytotoxic T cells', 'Neutrophils', 'Mast cells'] },
  { q: 'Cells HIV infects', a: 'Helper T cells (CD4)', wrong: ['B cells', 'Red blood cells', 'Neutrophils'] },
  { q: 'Immunity from a vaccine', a: 'Active acquired immunity', wrong: ['Passive acquired immunity', 'Innate immunity', 'Natural passive immunity'] },
  { q: 'Immunity a baby gets from the mother', a: 'Passive immunity', wrong: ['Active immunity', 'Cell-mediated immunity', 'Autoimmunity'] },
  { q: 'Three stages of the general adaptation syndrome', a: 'Alarm, resistance, exhaustion', wrong: ['Compensated, decompensated, irreversible', 'Alarm, recovery, adaptation', 'Fight, flight, freeze'] },
  { q: 'Earliest blood pressure change in compensated shock', a: 'Narrowing pulse pressure', wrong: ['Widening pulse pressure', 'Falling systolic pressure', 'Rising diastolic and falling systolic together'] },
  { q: 'Hypotension in shock is a sign of', a: 'Decompensated shock (a late sign)', wrong: ['Compensated shock (an early sign)', 'Recovery from shock', 'Neurogenic shock only'] },
  { q: 'Shock with hypotension and bradycardia after a spinal injury', a: 'Neurogenic shock', wrong: ['Hypovolemic shock', 'Cardiogenic shock', 'Septic shock'] },
  { q: 'Beck\'s triad (cardiac tamponade)', a: 'Hypotension, JVD, muffled heart sounds', wrong: ['Hypertension, bradycardia, irregular breathing', 'Hypotension, tachycardia, clear lungs', 'JVD, crackles, peripheral edema'] },
  { q: 'Cushing\'s triad (raised intracranial pressure)', a: 'Hypertension, bradycardia, irregular respirations', wrong: ['Hypotension, JVD, muffled heart sounds', 'Hypotension, tachycardia, tachypnea', 'Fever, tachycardia, hypotension'] },
  { q: 'Lethal triad of trauma', a: 'Hypothermia, acidosis, coagulopathy', wrong: ['Hypoxia, hypotension, hypoglycemia', 'Hyperthermia, alkalosis, thrombosis', 'Hypotension, JVD, muffled heart sounds'] },
  { q: 'Type of shock: tension pneumothorax, tamponade or PE', a: 'Obstructive shock', wrong: ['Distributive shock', 'Cardiogenic shock', 'Hypovolemic shock'] },
  { q: 'Type of shock: sepsis, anaphylaxis or spinal cord injury', a: 'Distributive shock', wrong: ['Obstructive shock', 'Hypovolemic shock', 'Cardiogenic shock'] },
  { q: 'Breathing pattern that compensates for metabolic acidosis', a: 'Kussmaul respirations (deep and fast)', wrong: ['Cheyne-Stokes respirations', 'Slow, shallow respirations', 'Biot (ataxic) respirations'] },
  { q: 'Cause of carpopedal spasm in hyperventilation', a: 'Respiratory alkalosis lowers ionized calcium', wrong: ['Respiratory acidosis raises potassium', 'Hypoxia of the hand muscles', 'Low sodium from sweating'] },
  { q: 'ECG sign of hyperkalemia', a: 'Tall, peaked T waves (then wide QRS)', wrong: ['U waves and flat T waves', 'Delta waves', 'ST depression with short QT'] },
  { q: 'ECG sign of hypokalemia', a: 'Flat T waves and U waves', wrong: ['Tall, peaked T waves', 'Sine-wave pattern', 'Osborn (J) waves'] },
  { q: 'Electrolyte for torsades de pointes', a: 'Magnesium sulfate', wrong: ['Calcium chloride', 'Potassium chloride', 'Sodium bicarbonate'] },
  { q: 'Acid-base effect of prolonged vomiting', a: 'Metabolic alkalosis', wrong: ['Metabolic acidosis', 'Respiratory acidosis', 'Respiratory alkalosis'] },
  { q: 'Acid-base effect of severe diarrhea', a: 'Metabolic acidosis (bicarbonate loss)', wrong: ['Metabolic alkalosis', 'Respiratory alkalosis', 'No change'] },
  { q: 'Acid-base effect of an opioid overdose with slow breathing', a: 'Respiratory acidosis', wrong: ['Respiratory alkalosis', 'Metabolic alkalosis', 'Metabolic acidosis only'] },
  { q: 'Minimum MAP usually needed for organ perfusion', a: 'About 65 mm Hg', wrong: ['About 40 mm Hg', 'About 90 mm Hg', 'About 120 mm Hg'] },
  { q: 'What afterload means', a: 'The resistance the ventricle pumps against', wrong: ['The volume filling the ventricle before it contracts', 'The force of contraction', 'The blood left in the ventricle after it contracts'] },
  { q: 'What preload means', a: 'The volume (stretch) in the ventricle before it contracts', wrong: ['The resistance the ventricle pumps against', 'The heart rate', 'The pressure in the aorta'] },
  { q: 'Main hormone of the resistance stage of stress', a: 'Cortisol', wrong: ['Insulin', 'Histamine', 'Glucagon'] }
];

// Side-by-side comparison of shock types for the Learn tab.
window.PATHO_SHOCK = {
  cols: [['problem', 'Problem'], ['hr', 'Heart rate'], ['skin', 'Skin'], ['jvd', 'Neck veins'], ['lungs', 'Lungs'], ['first', 'First care']],
  rows: [
    { name: 'Hypovolemic', problem: 'Volume', hr: 'Fast', skin: 'Pale, cool, clammy', jvd: 'Flat', lungs: 'Clear', first: 'Stop bleeding, warm, blood or fluid to target' },
    { name: 'Cardiogenic', problem: 'Pump', hr: 'Fast, slow or irregular', skin: 'Pale, cool, clammy', jvd: 'Distended', lungs: 'Crackles', first: '12-lead, pressors, PCI center' },
    { name: 'Obstructive', problem: 'Blocked flow', hr: 'Fast', skin: 'Pale, cool; cyanosis', jvd: 'Distended', lungs: 'Absent one side (tension pneumo), clear (tamponade, PE)', first: 'Fix the cause: decompress, rapid transport' },
    { name: 'Septic', problem: 'Pipes (dilated, leaky)', hr: 'Fast', skin: 'Warm and flushed early, then mottled', jvd: 'Flat', lungs: 'Clear or signs of pneumonia', first: 'Fluids, early notification, pressors' },
    { name: 'Anaphylactic', problem: 'Pipes (dilated, leaky)', hr: 'Fast', skin: 'Flushed, hives, swelling', jvd: 'Flat', lungs: 'Wheezes, stridor', first: 'IM epinephrine, airway, fluids' },
    { name: 'Neurogenic', problem: 'Pipes (lost sympathetic tone)', hr: 'Slow or normal', skin: 'Warm, dry, pink below the injury', jvd: 'Flat', lungs: 'Clear', first: 'SMR, fluids, atropine, pressors' }
  ]
};
