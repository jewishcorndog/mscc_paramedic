/*
 * Pathophysiology content, from Chapter 11 (General Principles of
 * Pathophysiology) of Sanders' Paramedic Textbook, 6th ed.: the lecture
 * slides, including the figures and tables that are only pictures on the
 * slides (body fluid compartments, Table 11-2 electrolytes, the pH scale, the
 * acid-base balance and the acidosis/alkalosis flowcharts, the ATP yield).
 *
 * The chapter is the overview; acid-base (pH balance) is covered in the most
 * depth. Where the app adds standard paramedic material the slides don't
 * spell out (reading an ABG, IV fluid tonicity, specific electrolyte
 * disorders, hypersensitivity types I-IV, field care), the topic or fact has
 * extra: true and the app marks it.
 *
 * Topic fields: about, patho (how it happens), signs, care (in the field).
 * Facts are { q, a, wrong[] } for cards and multiple choice.
 */
window.PATHO_GROUPS = [
  { id: 'acidbase', name: 'pH & acid-base balance' },
  { id: 'cell', name: 'The cell' },
  { id: 'fluids', name: 'Fluids & electrolytes' },
  { id: 'shock', name: 'Hypoperfusion & shock' },
  { id: 'immune', name: 'Inflammation & immunity' },
  { id: 'stress', name: 'Stress & disease' }
];

window.PATHO_TOPICS = [
  // ---------------- pH & acid-base ----------------
  {
    id: 'ph', name: 'pH and hydrogen ions', group: 'acidbase', aliases: ['h+', 'hydrogen ion', 'ph scale', 'acid', 'base'],
    about: ['The body makes acids through normal metabolism: respiratory acids (ending as carbon dioxide) and nonrespiratory (metabolic) acids',
      'Bases are used in metabolic disturbances to return the plasma to normal pH',
      'For the body to function, the balance must stay in a narrow range: blood pH 7.35 to 7.45 (normal 7.4)'],
    patho: ['A hydrogen ion (H⁺) is a proton with a positive charge, made when a hydrogen atom loses its electron',
      'pH measures hydrogen ions: more H⁺ means a lower pH (more acid); less H⁺ means a higher pH (more alkaline)',
      'Each unit change in pH is a 10-times change in the strength of the acid or base, so small changes in pH matter',
      'On the pH scale 7 is neutral; human blood (7.4) is slightly alkaline',
      'Below 7.35 is acidosis; above 7.45 is alkalosis. About 6.9 and 8.0 are the limits of life'],
    signs: [],
    care: ['A pH of 7.2 has more than twice the H⁺ of 7.4, even though the number moved only 0.2']
  },
  {
    id: 'buffers', name: 'Buffer systems', group: 'acidbase', aliases: ['carbonic acid', 'bicarbonate', 'renal buffering', 'protein buffering', 'compensatory mechanisms'],
    about: ['Buffers are molecules that release or bind hydrogen ions to keep pH stable',
      'They try to keep the pH of extracellular fluid within 7.35 to 7.45',
      'Four compensatory mechanisms: carbonic acid–bicarbonate buffering, renal buffering, protein buffering, and the lungs'],
    patho: ['Carbonic acid–bicarbonate: bicarbonate, carbon dioxide and carbonic acid are always present in a dynamic balance in the blood: H₂O + CO₂ ⇄ H₂CO₃ ⇄ H⁺ + HCO₃⁻',
      'That balance is mainly controlled by the lungs (CO₂, the carbonic acid side) and the kidneys (HCO₃⁻, the bicarbonate side)',
      'Renal buffering: the kidneys reabsorb bicarbonate from urine back into the blood and secrete H⁺ into urine. They work slowly: hours to days to bring pH back to normal',
      'Protein buffering: proteins inside and outside cells have negative charges and can serve as buffers',
      'Lungs: ventilation keeps pH normal by regulating the amount of CO₂ in the blood. Any disruption in ventilation affects acid-base balance'],
    signs: [],
    care: ['The lungs answer in minutes; the kidneys take hours to days. In the field, the only compensation you will see happen is the breathing']
  },
  {
    id: 'resp-acidosis', name: 'Respiratory acidosis', group: 'acidbase', aliases: ['hypoventilation', 'co2 retention', 'hypercapnia'],
    about: ['Caused by retention of carbon dioxide, which raises the PCO₂'],
    patho: ['Decreased ventilation → ↑ blood PCO₂ → ↑ H₂CO₃ → ↑ H⁺ → ↓ serum pH',
      'Renal compensation: increased acid titration; the kidneys excrete more acid in urine and regenerate more bicarbonate → pH rises back toward normal'],
    signs: ['Slow or shallow breathing, high ETCO₂, drowsiness, confusion, headache'],
    care: ['Causes: opioid or sedative overdose, head injury, COPD, severe asthma, chest trauma, airway obstruction, poor BVM ventilation',
      'Fix the ventilation: open the airway, assist with a BVM, naloxone for opioids, CPAP or an advanced airway as needed']
  },
  {
    id: 'metab-acidosis', name: 'Metabolic acidosis', group: 'acidbase', aliases: ['dka', 'lactic acidosis', 'kussmaul', 'loss of base'],
    about: ['Results from a buildup of acid or a loss of base',
      'When too much acid is made, it spills into the extracellular fluid and uses up some of the bicarbonate buffer'],
    patho: ['Loss of base (↓ HCO₃⁻) or addition of acid (↑ H⁺) → ↓ serum pH',
      'Respiratory compensation: hyperventilation → ↓ PCO₂ → ↓ CO₂ + H₂O → ↓ H₂CO₃ → ↓ H⁺',
      'Renal correction: increased acid titration; more acid excreted in urine and more bicarbonate regenerated → ↑ serum pH'],
    signs: ['Fast, deep breathing (Kussmaul respirations), low ETCO₂, altered mental status, fruity breath in DKA'],
    care: ['Causes: lactic acid from shock, cardiac arrest or seizures; DKA; kidney failure; toxic alcohols or aspirin; severe diarrhea (loss of base)',
      'Treat the cause (perfusion, fluids). If you ventilate this patient, keep the fast rate; slowing it removes their compensation',
      'Sodium bicarbonate (1 mEq/kg IV, per protocol) for specific causes only: prolonged cardiac arrest, hyperkalemia, crush syndrome, TCA or aspirin overdose, severe DKA. It turns into CO₂, so the patient must be well ventilated']
  },
  {
    id: 'resp-alkalosis', name: 'Respiratory alkalosis', group: 'acidbase', aliases: ['hyperventilation', 'hypocapnia'],
    about: ['Hyperventilation causes respiratory alkalosis by lowering the PCO₂'],
    patho: ['Increased ventilation → ↓ blood PCO₂ → ↓ H₂CO₃ → ↓ H⁺ → ↑ serum pH',
      'Renal compensation: decreased acid titration; less acid excreted in urine and less bicarbonate regenerated → pH falls back toward normal'],
    signs: ['Fast breathing, low ETCO₂, lightheadedness, tingling around the mouth and fingers, carpopedal spasm'],
    care: ['Causes: anxiety, pain, fever, early hypoxia, pulmonary embolism, high altitude, overventilation with a BVM',
      'Rule out hypoxia and PE before calling it anxiety; coach the breathing',
      'Ventilate at the right rate (about 1 breath every 6 seconds for an adult with an advanced airway)']
  },
  {
    id: 'metab-alkalosis', name: 'Metabolic alkalosis', group: 'acidbase', aliases: ['vomiting', 'antacids', 'bicarbonate'],
    about: ['Results from loss of hydrogen ions, eating or drinking large amounts of absorbable base (sodium bicarbonate or calcium carbonate), or too much IV alkali'],
    patho: ['Addition of base (↑ HCO₃⁻) or loss of acid (↓ H⁺) → ↑ serum pH',
      'Respiratory compensation: hypoventilation → ↑ PCO₂ → ↑ CO₂ + H₂O → ↑ H₂CO₃ → ↑ H⁺',
      'Renal correction: less bicarbonate reabsorbed (more excreted in urine), decreased acid titration, less acid excreted and less bicarbonate regenerated → ↓ serum pH'],
    signs: ['Slow, shallow breathing, weakness, muscle cramps, dysrhythmias'],
    care: ['Causes: prolonged vomiting or NG suction (loss of stomach acid), antacid or baking soda overuse, too much IV sodium bicarbonate, diuretics',
      'Usually supportive in the field: fluids for the vomiting patient and watch the ECG']
  },
  {
    id: 'mixed', name: 'Mixed acid-base disturbances', group: 'acidbase', aliases: ['combined', 'shock acidosis', 'cardiac arrest'],
    about: ['Many conditions cause mixed problems with acid-base regulation',
      'Simultaneous respiratory and metabolic changes are common in patients in shock'],
    patho: ['They develop because the illness changes both the respiratory and the metabolic parts of the acid-base system at once',
      'Example: in cardiac arrest, no breathing raises CO₂ (respiratory acidosis) and no perfusion builds lactic acid (metabolic acidosis), so the pH falls fast'],
    signs: ['Both PCO₂ and HCO₃⁻ push the pH the same way'],
    care: ['Good ventilation and perfusion (CPR, oxygenation, fixing shock) treat both parts']
  },
  {
    id: 'compensation', name: 'Reading an ABG', group: 'acidbase', extra: true, aliases: ['rome', 'compensated', 'abg interpretation', 'blood gas'],
    about: ['Normal arterial values: pH 7.35 to 7.45, PaCO₂ 35 to 45 mm Hg, HCO₃⁻ 22 to 26 mEq/L',
      'Step 1: Is the pH acidotic (< 7.35), alkalotic (> 7.45) or normal?',
      'Step 2: Which value explains it? PaCO₂ high = respiratory acidosis, low = respiratory alkalosis. HCO₃⁻ low = metabolic acidosis, high = metabolic alkalosis',
      'Step 3: Is the other value moving to offset it? Then the body is compensating',
      'ROME: Respiratory Opposite (pH and PaCO₂ move in opposite directions), Metabolic Equal (pH and HCO₃⁻ move the same way)'],
    patho: ['Uncompensated: pH abnormal, only the cause is out of range',
      'Partially compensated: pH still abnormal, both values abnormal',
      'Fully compensated: pH back in range, both values abnormal; the side of 7.40 the pH is on shows the original problem',
      'Mixed: both values push pH the same way'],
    signs: [],
    care: ['Compensation never overshoots: the body does not push pH past normal',
      'Table 11-2 lists serum bicarbonate as 22 to 30 mEq/L; blood gas interpretation usually uses 22 to 26']
  },

  // ---------------- The cell ----------------
  {
    id: 'cell-basics', name: 'Basic cellular review', group: 'cell', aliases: ['tissue types', 'epithelial', 'connective', 'muscle', 'nervous'],
    about: ['Cells form four basic types of tissue: epithelial, connective (including blood), muscle and nervous',
      'Cells live in fluid: intracellular fluid inside them and extracellular fluid around them'],
    patho: [],
    signs: [],
    care: []
  },
  {
    id: 'metabolism', name: 'Cellular metabolism', group: 'cell', aliases: ['glycolysis', 'atp', 'lactic acid', 'krebs', 'aerobic', 'anaerobic'],
    about: ['Cells need energy (ATP) for all their activities; glucose is the key fuel',
      'In a healthy body most metabolism is aerobic: one glucose yields a total net 36 ATP (glycolysis, then the Krebs cycle)',
      'Anaerobic metabolism happens when the need for energy exceeds the oxygen supply; it supplies only a small fraction of the energy'],
    patho: ['Without oxygen, pyruvate becomes lactic acid instead of entering the Krebs cycle, which adds acid to the blood (metabolic acidosis)',
      'As tissue metabolites build up they cause vasodilation, which reduces the body\'s ability to keep perfusing vital tissue'],
    signs: ['Rising lactate and falling pH; fast, deep breathing to blow off CO₂'],
    care: ['This is why shock causes acidosis: treating shock gets cells back to aerobic metabolism']
  },
  {
    id: 'adaptation', name: 'Cellular adaptation', group: 'cell', aliases: ['atrophy', 'hypertrophy', 'hyperplasia', 'metaplasia', 'dysplasia', 'neoplasia'],
    about: ['Cells adapt to their environment. The most significant changes: atrophy, hypertrophy, hyperplasia, metaplasia and dysplasia'],
    patho: ['Atrophy: cells shrink (less use, less blood supply, poor nutrition)',
      'Hypertrophy: cells get bigger to handle more work (left ventricle in long-standing hypertension)',
      'Hyperplasia: cells increase in number',
      'Metaplasia: one mature cell type is replaced by another (airway lining in smokers)',
      'Dysplasia: abnormal changes in cell size, shape and organization; can lead to neoplasia (malignancy)'],
    signs: [],
    care: ['A hypertrophied heart needs more oxygen and is prone to ischemia and dysrhythmias']
  },
  {
    id: 'cell-injury', name: 'Cellular injury', group: 'cell', aliases: ['hypoxic injury', 'free radicals', 'chemical injury', 'infectious injury'],
    about: ['Hypoxic injury is the most common cause of cell damage, commonly from atherosclerosis and thrombosis',
      'Prolonged ischemia leads to infarction (cell death); atherosclerosis and thrombosis can lead to gangrene, MI and stroke'],
    patho: ['Free radical injury: free radicals bond with carbohydrates, lipids and proteins in cell membranes and damage them',
      'Chemical injury: many chemical agents can damage a cell',
      'Infectious injury: bacteria make toxins (exotoxins and endotoxins); viruses reproduce only by infecting living host cells',
      'Immunologic and inflammatory injury: phagocytes, antibodies, lymphokines, complement and proteases damage cell membranes',
      'Genetic factors: disorders that change the cell\'s structure and function',
      'Nutritional imbalances: too little or too much of a nutrient',
      'Physical agents: temperature extremes, atmospheric pressure changes, ionizing and nonionizing radiation, illumination, mechanical stress'],
    signs: [],
    care: []
  },
  {
    id: 'injury-signs', name: 'Manifestations of cellular injury', group: 'cell', aliases: ['cellular swelling', 'fatty change', 'necrosis', 'lysosomes', 'cell death'],
    about: ['Injured cells accumulate substances that are normally present; abnormal buildup inside the cell can damage it'],
    patho: ['Cellular swelling: membrane changes let potassium leak out of the cell and sodium and water enter',
      'Fatty change: the enzymes that metabolize fat are impaired or overwhelmed, so lipids build up in the cell',
      'Systemic manifestations: cellular injury causes body-wide effects',
      'Cell death and necrosis: an irreparably damaged cell dies; its lysosomes break down and release enzymes that digest the cell'],
    signs: ['Potassium leaking from injured cells can raise serum potassium (crush injury)'],
    care: []
  },

  // ---------------- Fluids & electrolytes ----------------
  {
    id: 'body-water', name: 'Body water and compartments', group: 'fluids', aliases: ['tbw', 'intracellular', 'extracellular', 'interstitial', 'plasma'],
    about: ['Intracellular fluid: 40% of body weight',
      'Interstitial fluid (between cells): 16% of body weight',
      'Plasma: 4% of body weight',
      'The distribution and amount of total body water vary by age, sex and hydration'],
    patho: ['Osmosis: net movement of water (solvent) through a semipermeable membrane',
      'Diffusion: molecules or ions move from higher concentration to lower concentration',
      'Mediated transport: carrier molecules move large, water-soluble or charged molecules across cell membranes',
      'Capillaries are thin-walled tubes of endothelial cells; tissue cells do not exchange material directly with blood but through the interstitial fluid',
      'The integrity of the capillary membrane is the key factor in fluid movement'],
    signs: [],
    care: ['Infants and older adults have less reserve and dehydrate faster']
  },
  {
    id: 'edema', name: 'Edema', group: 'fluids', aliases: ['swelling', 'hydrostatic', 'oncotic', 'lymphatic'],
    about: ['A problem of fluid distribution: fluid builds up in the interstitial spaces',
      'Normal flow depends on capillary hydrostatic pressure, oncotic pressure, capillary permeability, and open lymphatic channels'],
    patho: ['Increased capillary hydrostatic pressure: venous obstruction or sodium and water retention',
      'Decreased plasma oncotic pressure: less plasma albumin, so fluid moves into the interstitial space',
      'Increased capillary permeability: more fluid than normal filters into the interstitial space',
      'Lymphatic obstruction: blocked (infection) or removed (surgery) lymph channels let proteins and fluid build up'],
    signs: ['Localized edema: limited to the injury site',
      'Generalized edema: more widespread, most obvious in dependent parts of the body',
      'Weight gain, swelling and puffiness, often with symptoms of the underlying illness'],
    care: []
  },
  {
    id: 'water-sodium', name: 'Water, sodium and chloride balance', group: 'fluids', aliases: ['adh', 'thirst', 'chloride', 'sodium', 'dehydration', 'overhydration'],
    about: ['Water balance is mainly regulated by antidiuretic hormone (ADH) and thirst',
      'Sodium is the primary extracellular cation; chloride is the major extracellular anion and balances sodium\'s charge',
      'The body gains water from drinking fluids, eating moist foods, and the oxidation of hydrogen during metabolism'],
    patho: ['Dehydration can be isotonic, hypernatremic or hyponatremic',
      'Overhydration: an increase in body water that lowers the solute concentration',
      'Hormones that balance water and sodium: ADH from the posterior pituitary, renin-angiotensin-aldosterone from the kidney and adrenal cortex, and natriuretic hormone from the heart (more fluid and sodium lost in urine)'],
    signs: ['Dehydration: dry mucous membranes, poor skin turgor, tachycardia, decreased urine',
      'Overhydration: edema, crackles, JVD, weight gain'],
    care: []
  },
  {
    id: 'electrolytes', name: 'Electrolytes (Table 11-2)', group: 'fluids', aliases: ['potassium', 'magnesium', 'phosphate', 'chloride', 'bicarbonate', 'normal values'],
    about: ['Intracellular cations: potassium (K⁺) 3.5 to 5.0 mEq/L, magnesium (Mg²⁺) 1.5 to 2.0 mEq/L',
      'Extracellular cation: sodium (Na⁺) 135 to 145 mEq/L',
      'Intracellular anion: phosphate (PO₄³⁻) 50 to 60 units/L',
      'Extracellular anions: chloride (Cl⁻) 90 to 108 mEq/L, bicarbonate (HCO₃⁻) 22 to 30 mEq/L'],
    patho: [],
    signs: [],
    care: []
  },
  {
    id: 'lyte-disorders', name: 'Common electrolyte disorders', group: 'fluids', extra: true, aliases: ['hyperkalemia', 'hypokalemia', 'hyponatremia', 'hypocalcemia'],
    about: ['The electrolyte problems paramedics see most, and how they show on the patient and the ECG'],
    patho: ['Hyperkalemia: kidney failure, missed dialysis, crush injury, acidosis (K⁺ shifts out of cells)',
      'Hypokalemia: diuretics, vomiting, diarrhea, alkalosis (K⁺ shifts into cells)',
      'Hyponatremia: too much water for the sodium; brain cells swell',
      'Hypocalcemia: hyperventilation and alkalosis lower ionized calcium'],
    signs: ['Hyperkalemia: peaked T waves, wide QRS, bradycardia, arrest',
      'Hypokalemia: flat T waves, U waves, PVCs',
      'Hyponatremia: confusion, seizures',
      'Hypocalcemia: tingling, carpopedal spasm, long QT'],
    care: ['Hyperkalemia with ECG changes: calcium, then sodium bicarbonate and albuterol per protocol']
  },
  {
    id: 'iv-fluids', name: 'Tonicity and IV fluids', group: 'fluids', extra: true, aliases: ['isotonic', 'hypotonic', 'hypertonic', 'normal saline', 'lactated ringers', 'd5w'],
    about: ['Isotonic: same concentration as plasma (normal saline, lactated Ringer\'s)',
      'Hypotonic: water moves into cells (D5W once the sugar is used, 0.45% saline)',
      'Hypertonic: water is pulled out of cells into the vessels (3% saline, D50)'],
    patho: ['Most infused isotonic crystalloid leaves the vessels for the interstitial space within an hour'],
    signs: [],
    care: ['Give fluid to a target in hemorrhage (permissive hypotension); avoid hypotonic fluid in head injury']
  },

  // ---------------- Hypoperfusion & shock ----------------
  {
    id: 'cardiac-output', name: 'Hypoperfusion and cardiac output', group: 'shock', aliases: ['perfusion', 'cardiac output', 'stroke volume'],
    about: ['Hypoperfusion is often the result of decreased cardiac output and may lead to shock',
      'Cardiac output: the total blood pumped by the ventricles each minute (L/min); the crucial determinant of organ perfusion'],
    patho: ['Cardiac output = heart rate × stroke volume',
      'Blood pressure = cardiac output × peripheral resistance'],
    signs: [],
    care: ['A normal blood pressure does not prove good perfusion; check mental status, skin, capillary refill, heart rate and ETCO₂']
  },
  {
    id: 'compensatory', name: 'Compensatory mechanisms', group: 'shock', aliases: ['baroreceptor', 'chemoreceptor', 'raas', 'vasopressin', 'adrenal medulla', 'spleen'],
    about: ['The body prevents tissue hypoperfusion by using compensatory mechanisms to manage blood pressure and cardiac output'],
    patho: ['Baroreceptor reflexes: pressure-sensitive nerve endings in the heart and great vessels keep BP and cardiac output in the normal range',
      'Chemoreceptor reflexes: more involved in regulating breathing than heart rate, rhythm or BP',
      'Central nervous system ischemic response: when blood flow to the vasomotor center in the medulla drops enough to cause ischemia, its neurons raise arterial BP',
      'Hormonal: adrenal medulla (epinephrine, norepinephrine), renin-angiotensin-aldosterone, vasopressin (ADH)',
      'Reabsorption of tissue fluids into the vessels',
      'Splenic discharge of stored blood'],
    signs: ['Tachycardia, pale cool skin, narrowed pulse pressure, anxiety, thirst while BP is still normal'],
    care: ['Hypotension means these mechanisms are failing: it is a late sign']
  },
  {
    id: 'shock-types', name: 'Types of shock', group: 'shock', aliases: ['hypovolemic', 'cardiogenic', 'neurogenic', 'obstructive', 'distributive', 'septic', 'anaphylactic'],
    about: ['Shock is hypoxia at the cellular level, classified by its primary cause: hypovolemic, cardiogenic, neurogenic, obstructive, distributive'],
    patho: ['Hypovolemic: not enough volume (bleeding, burns, vomiting, diarrhea)',
      'Cardiogenic: the pump fails (large MI)',
      'Neurogenic: lost sympathetic tone after spinal cord injury; vessels dilate and the heart cannot speed up',
      'Obstructive: blood flow is blocked (tension pneumothorax, cardiac tamponade, pulmonary embolism)',
      'Distributive: vessels dilate and leak (sepsis, anaphylaxis)'],
    signs: ['See the Shock tab for heart rate, skin, neck veins and lungs by type'],
    care: ['Every type ends in anaerobic metabolism and acidosis if not fixed']
  },
  {
    id: 'mods', name: 'Multiple organ dysfunction syndrome', group: 'shock', aliases: ['mods', 'sirs', 'organ failure'],
    about: ['Can start from any process that triggers the inflammatory response: trauma, sepsis, burns'],
    patho: ['Begins with damage to the vascular endothelium from endotoxins and inflammatory mediators released into the circulation',
      'Sympathetic drive and hyperdynamic circulation → more demand on the heart → depletion of oxygen and fuel → less oxygen to cells, hypermetabolism, myocardial depression → multiple organ failure and tissue hypoxia'],
    signs: ['Tachycardia, tachypnea, altered mental status, low urine output'],
    care: ['Prevent it by fixing shock early and fully']
  },

  // ---------------- Inflammation & immunity ----------------
  {
    id: 'inflammation', name: 'Inflammatory response', group: 'immune', aliases: ['mast cells', 'degranulation', 'phagocytosis', 'chronic inflammation'],
    about: ['A local reaction to cellular injury',
      'Stages: cellular response, vascular response, phagocytosis'],
    patho: ['Injured tissue makes mast cells discharge their granules (degranulation), releasing histamine and other mediators',
      'Local response: vascular changes (dilation and leaky vessels: redness, heat, swelling, pain)',
      'Systemic response: fever, leukocytosis (more white blood cells) and more circulating plasma proteins',
      'Chronic inflammation: lasts 2 weeks or longer; from a persistent acute response, a foreign body (splinter), persistent infection or continued exposure to an antigen'],
    signs: ['Redness, heat, swelling, pain, loss of function', 'Fever and a high white count'],
    care: []
  },
  {
    id: 'immunity', name: 'Immune response', group: 'immune', aliases: ['antigen', 'immunogenic', 'antibodies', 'immunoglobulins'],
    about: ['To trigger an immune response (be immunogenic), an antigen must be sufficiently foreign, large, complex and present in sufficient amounts',
      'Antibodies (immunoglobulins) are made by plasma cells in response to an antigen. Humans make five classes (IgG, IgM, IgA, IgE, IgD)'],
    patho: [],
    signs: [],
    care: []
  },
  {
    id: 'blood-groups', name: 'Blood groups, Rh and whole blood', group: 'immune', aliases: ['abo', 'rh factor', 'agglutination', 'whole blood', 'ltowb', 'type o'],
    about: ['Red cells mixed with foreign plasma either clump (agglutinate) or show no change',
      'Two antigens on red cells cause the clumping, giving four blood types: A, B, AB and O',
      'Rh (from the rhesus monkey): mixing Rh-positive and Rh-negative blood can cause a harmful immune response (transfusion or childbirth)'],
    patho: ['Resuscitation used to be type O packed red cells with crystalloid, then packed cells with fresh frozen plasma and platelets',
      'Low-titer group O whole blood simplifies giving blood, has fewer additives that impair clotting, and reduces the amount of fluid given'],
    signs: [],
    care: ['Stop a transfusion at the first sign of a reaction']
  },
  {
    id: 'hypersensitivity', name: 'Hypersensitivity: allergy, autoimmunity, isoimmunity', group: 'immune', aliases: ['allergy', 'anaphylaxis', 'ige', 'autoimmune', 'lupus'],
    about: ['Reactions can be immediate or delayed',
      'Mild: itching and hives. Severe: life-threatening respiratory distress and anaphylaxis',
      'Allergic (IgE) reactions drive anaphylaxis'],
    patho: ['Autoimmunity causes Graves disease, rheumatoid arthritis, myasthenia gravis, immune thrombocytopenic purpura, systemic lupus erythematosus and multiple sclerosis',
      'Isoimmunity: an immune reaction against another person\'s tissue (transfusion reactions, Rh disease of the newborn)'],
    signs: ['Hives, itching, wheezing, swelling, hypotension'],
    care: ['Anaphylaxis: IM epinephrine first']
  },
  {
    id: 'immune-deficiency', name: 'Immune deficiencies', group: 'immune', aliases: ['primary', 'secondary', 'aids', 'hiv', 'iatrogenic'],
    about: ['Primary: genetic; usually shows in infancy and childhood as recurrent or unusual infections; classified by the part of the immune system that is missing or defective',
      'Secondary (acquired): nutritional, iatrogenic (from treatment such as chemotherapy or steroids), trauma, stress, AIDS'],
    patho: [],
    signs: ['Frequent or unusual infections; fever may be absent'],
    care: ['Extra infection control protects the immunocompromised patient']
  },

  // ---------------- Stress & disease ----------------
  {
    id: 'stress', name: 'Neuroendocrine regulation of stress', group: 'stress', aliases: ['catecholamines', 'cortisol', 'alpha', 'beta', 'fight or flight'],
    about: ['Stress makes the adrenal glands release catecholamines (epinephrine, norepinephrine and dopamine) into the blood',
      'Catecholamines act on two classes of receptors: alpha-adrenergic and beta-adrenergic'],
    patho: ['Cortisol (hydrocortisone) mobilizes the substances cells need for metabolism',
      'Cortisol is an immunosuppressant: it reduces lymphocytes, especially T cells, so cellular immunity drops',
      'The nervous, endocrine and immune systems talk to each other, so stress can trigger immune disease',
      'The damage depends on the nature, intensity and duration of the stressor; stress reduction is crucial to good health'],
    signs: ['Tachycardia, high BP, high blood sugar, dilated pupils'],
    care: []
  },
  {
    id: 'disease-factors', name: 'Factors causing disease', group: 'stress', aliases: ['genetics', 'environment', 'determinants of health', 'age', 'sex'],
    about: ['Genetic factors: heredity follows chance; more than 19,000 genes make up a person\'s genetic makeup',
      'Social and environmental factors: microorganisms and immune exposure, personal habits and lifestyle, chemicals, physical and psychosocial environment',
      'Age and sex: affect hereditary disease; sex is linked to diseases from hormonal and anatomic differences'],
    patho: ['Five determinants of a population\'s health: genes and biology, health behaviors, social environment, physical environment, health services'],
    signs: [],
    care: []
  },
  {
    id: 'disease-risk', name: 'Analyzing the risk of disease', group: 'stress', aliases: ['incidence', 'prevalence', 'mortality', 'risk factors', 'familial'],
    about: ['Incidence rate: new cases in a period per number of people',
      'Prevalence rate: people living with the disease per number of people',
      'Mortality rate: deaths from the disease in a period per number of people'],
    patho: ['Causal risk factors: removing them delays or prevents the disease',
      'Noncausal risk factors: help predict the disease but don\'t cause it',
      'Familial tendency: families share genes and environment',
      'Advanced age is a risk factor for heart attack, stroke and cancer (the cumulative effect of genes and environment)'],
    signs: [],
    care: ['People at high risk can avoid many familial diseases: genes can\'t be changed, but lifestyle and environment can']
  }
];

// Acid-base scenarios for the pH balance page, cards and quiz. kind is the
// disturbance; co2/hco3 are typical values before the body compensates.
window.PATHO_PH_SCENARIOS = [
  { id: 'opioid', name: 'Opioid overdose, respirations 6', kind: 'resp-acidosis', co2: 68, hco3: 24 },
  { id: 'copd', name: 'COPD patient retaining CO₂', kind: 'resp-acidosis', co2: 62, hco3: 24 },
  { id: 'asthma-tired', name: 'Severe asthma, patient tiring out', kind: 'resp-acidosis', co2: 58, hco3: 24 },
  { id: 'head-injury', name: 'Head injury with slow, irregular breathing', kind: 'resp-acidosis', co2: 60, hco3: 24 },
  { id: 'flail', name: 'Flail chest with shallow breathing', kind: 'resp-acidosis', co2: 55, hco3: 24 },
  { id: 'bvm-slow', name: 'BVM ventilations too slow and too small', kind: 'resp-acidosis', co2: 56, hco3: 24 },
  { id: 'anxiety', name: 'Panic attack, breathing 40 times a minute', kind: 'resp-alkalosis', co2: 26, hco3: 24 },
  { id: 'bvm-fast', name: 'Overventilating with a BVM', kind: 'resp-alkalosis', co2: 25, hco3: 24 },
  { id: 'pe', name: 'Early pulmonary embolism, fast breathing', kind: 'resp-alkalosis', co2: 28, hco3: 24 },
  { id: 'altitude', name: 'Hiker at high altitude', kind: 'resp-alkalosis', co2: 28, hco3: 24 },
  { id: 'dka', name: 'Diabetic ketoacidosis (DKA)', kind: 'metab-acidosis', co2: 40, hco3: 12 },
  { id: 'lactic', name: 'Shock with lactic acid buildup', kind: 'metab-acidosis', co2: 40, hco3: 15 },
  { id: 'seizure', name: 'Prolonged seizure', kind: 'metab-acidosis', co2: 40, hco3: 16 },
  { id: 'diarrhea', name: 'Severe diarrhea (loss of base)', kind: 'metab-acidosis', co2: 40, hco3: 16 },
  { id: 'renal', name: 'Kidney failure, missed dialysis', kind: 'metab-acidosis', co2: 40, hco3: 15 },
  { id: 'antifreeze', name: 'Antifreeze (ethylene glycol) ingestion', kind: 'metab-acidosis', co2: 40, hco3: 11 },
  { id: 'vomiting', name: 'Days of vomiting (loss of stomach acid)', kind: 'metab-alkalosis', co2: 40, hco3: 34 },
  { id: 'antacid', name: 'Eating large amounts of antacids or baking soda', kind: 'metab-alkalosis', co2: 40, hco3: 33 },
  { id: 'bicarb', name: 'Too much IV sodium bicarbonate', kind: 'metab-alkalosis', co2: 40, hco3: 35 },
  { id: 'ng', name: 'Continuous NG tube suction', kind: 'metab-alkalosis', co2: 40, hco3: 33 },
  { id: 'arrest', name: 'Cardiac arrest: no breathing and no perfusion', kind: 'mixed-acidosis', co2: 65, hco3: 15 },
  { id: 'shock-resp', name: 'Shock with respiratory failure', kind: 'mixed-acidosis', co2: 55, hco3: 17 }
];

// Cause and compensation chains, from the Chapter 11 flowcharts.
window.PATHO_PH_KINDS = {
  'resp-acidosis': { name: 'Respiratory acidosis', side: 'acid', system: 'Respiratory',
    short: 'Kidneys excrete more acid and regenerate more bicarbonate (hours to days)',
    cause: ['Decreased ventilation', '↑ blood PCO₂', '↑ H₂CO₃ → ↑ H⁺', '↓ serum pH'],
    comp: ['Kidneys: increased acid titration', '↑ acid excreted in urine', '↑ bicarbonate regenerated', '↑ serum pH (hours to days)'] },
  'resp-alkalosis': { name: 'Respiratory alkalosis', side: 'base', system: 'Respiratory',
    short: 'Kidneys excrete less acid and regenerate less bicarbonate (hours to days)',
    cause: ['Increased ventilation', '↓ blood PCO₂', '↓ H₂CO₃ → ↓ H⁺', '↑ serum pH'],
    comp: ['Kidneys: decreased acid titration', '↓ acid excreted in urine', '↓ bicarbonate regenerated', '↓ serum pH (hours to days)'] },
  'metab-acidosis': { name: 'Metabolic acidosis', side: 'acid', system: 'Metabolic',
    short: 'Lungs hyperventilate to blow off CO₂, then the kidneys excrete acid',
    cause: ['Loss of base (↓ HCO₃⁻) or addition of acid (↑ H⁺)', '↓ serum pH'],
    comp: ['Lungs: hyperventilation (fast, deep)', '↓ PCO₂ → ↓ H₂CO₃ → ↓ H⁺', 'Kidneys: ↑ acid excreted, ↑ bicarbonate regenerated', '↑ serum pH'] },
  'metab-alkalosis': { name: 'Metabolic alkalosis', side: 'base', system: 'Metabolic',
    short: 'Lungs hypoventilate to keep CO₂, then the kidneys excrete bicarbonate',
    cause: ['Addition of base (↑ HCO₃⁻) or loss of acid (↓ H⁺)', '↑ serum pH'],
    comp: ['Lungs: hypoventilation', '↑ PCO₂ → ↑ H₂CO₃ → ↑ H⁺', 'Kidneys: ↑ bicarbonate excreted, ↓ acid excreted', '↓ serum pH'] },
  'mixed-acidosis': { name: 'Mixed acidosis', side: 'acid', system: 'Both',
    short: 'Neither system can offset the other; fix ventilation and perfusion',
    cause: ['Not breathing off CO₂ (↑ PCO₂)', 'and acid building up (↓ HCO₃⁻)', 'Both push ↓ serum pH'],
    comp: ['Neither system can compensate for the other', 'Fix ventilation and perfusion'] }
};

window.PATHO_FACTS = [
  // pH & acid-base
  { q: 'Normal blood pH', a: '7.35 to 7.45', wrong: ['7.25 to 7.35', '7.45 to 7.55', '7.00 to 7.20'] },
  { q: 'A blood pH below 7.35 is called', a: 'Acidosis', wrong: ['Alkalosis', 'Neutral', 'Compensation'] },
  { q: 'A blood pH above 7.45 is called', a: 'Alkalosis', wrong: ['Acidosis', 'Hypercapnia', 'Neutral'] },
  { q: 'Approximate pH limits of life on the acid-base balance', a: '6.9 and 8.0', wrong: ['7.0 and 7.6', '6.0 and 9.0', '7.35 and 7.45'] },
  { q: 'Change in acid or base strength for each 1-unit change in pH', a: '10 times', wrong: ['2 times', '100 times', 'No change; the scale is linear'] },
  { q: 'What a hydrogen ion is', a: 'A proton with a positive charge (a hydrogen atom that lost its electron)', wrong: ['An electron with a negative charge', 'A hydrogen atom with an extra electron', 'A neutron'] },
  { q: 'More hydrogen ions in the blood make the pH', a: 'Lower (more acidic)', wrong: ['Higher (more alkaline)', 'Unchanged', 'Exactly 7.0'] },
  { q: 'pH that is neutral on the pH scale', a: '7', wrong: ['7.4', '0', '14'] },
  { q: 'Two kinds of acid the body makes', a: 'Respiratory acids (ending as CO₂) and nonrespiratory (metabolic) acids', wrong: ['Hydrochloric and sulfuric acids only', 'Amino acids and fatty acids', 'Carbonic acid and bicarbonate'] },
  { q: 'Four compensatory (buffer) mechanisms for pH', a: 'Carbonic acid–bicarbonate, renal, protein buffering, and the lungs', wrong: ['Liver, spleen, kidneys and lungs', 'Heart, lungs, kidneys and brain', 'Sodium, potassium, chloride and calcium'] },
  { q: 'The carbonic acid–bicarbonate equation', a: 'H₂O + CO₂ ⇄ H₂CO₃ ⇄ H⁺ + HCO₃⁻', wrong: ['H₂O + O₂ ⇄ H₂O₂', 'Na⁺ + Cl⁻ ⇄ NaCl', 'CO₂ + O₂ ⇄ H₂CO₃'] },
  { q: 'System that controls the carbonic acid (CO₂) side of the balance', a: 'Respiratory (the lungs)', wrong: ['Renal (the kidneys)', 'The liver', 'Protein buffers'] },
  { q: 'System that controls the bicarbonate side of the balance', a: 'Renal (the kidneys)', wrong: ['Respiratory (the lungs)', 'The heart', 'The spleen'] },
  { q: 'How the kidneys help keep acid-base balance', a: 'Reabsorb bicarbonate into the blood and secrete H⁺ into urine', wrong: ['Exhale CO₂', 'Make hemoglobin to bind H⁺', 'Release epinephrine'] },
  { q: 'How fast the kidneys restore pH', a: 'Slowly: hours to days', wrong: ['Within seconds', 'Within minutes', 'They never change pH'] },
  { q: 'How the lungs keep pH normal', a: 'By regulating the amount of CO₂ in the blood', wrong: ['By excreting bicarbonate', 'By making buffer proteins', 'By secreting H⁺ into the airway'] },
  { q: 'Why proteins can act as buffers', a: 'They have negative charges that can bind H⁺', wrong: ['They have positive charges that repel H⁺', 'They make bicarbonate', 'They exhale CO₂'] },
  { q: 'Cause of respiratory acidosis', a: 'Retention of CO₂ (decreased ventilation), raising PCO₂', wrong: ['Hyperventilation lowering PCO₂', 'Loss of bicarbonate in diarrhea', 'Vomiting stomach acid'] },
  { q: 'Cause of respiratory alkalosis', a: 'Hyperventilation lowering PCO₂', wrong: ['Hypoventilation raising PCO₂', 'Ingesting baking soda', 'Lactic acid buildup'] },
  { q: 'Cause of metabolic acidosis', a: 'Buildup of acid or loss of base', wrong: ['Loss of acid or gain of base', 'Hyperventilation', 'Retention of CO₂'] },
  { q: 'Cause of metabolic alkalosis', a: 'Loss of H⁺, ingesting absorbable base, or too much IV alkali', wrong: ['Buildup of lactic acid', 'Retention of CO₂', 'Loss of bicarbonate in diarrhea'] },
  { q: 'Respiratory compensation for metabolic acidosis', a: 'Hyperventilation to lower PCO₂', wrong: ['Hypoventilation to raise PCO₂', 'Holding the breath', 'No change in breathing'] },
  { q: 'Respiratory compensation for metabolic alkalosis', a: 'Hypoventilation to raise PCO₂', wrong: ['Hyperventilation to lower PCO₂', 'Kussmaul respirations', 'Cheyne-Stokes respirations'] },
  { q: 'Renal compensation for respiratory acidosis', a: 'More acid excreted in urine and more bicarbonate regenerated', wrong: ['Less acid excreted and less bicarbonate regenerated', 'Faster breathing', 'More potassium excreted only'] },
  { q: 'Renal compensation for respiratory alkalosis', a: 'Less acid excreted in urine and less bicarbonate regenerated', wrong: ['More acid excreted and more bicarbonate regenerated', 'Slower breathing', 'More sodium retained'] },
  { q: 'Patients in which acid-base disturbances are commonly mixed', a: 'Patients in shock', wrong: ['Patients with anxiety', 'Healthy athletes', 'Patients with a simple fracture'] },
  { q: 'What happens to bicarbonate when excess acid is produced', a: 'Acid spills into the extracellular fluid and uses up bicarbonate buffer', wrong: ['Bicarbonate rises', 'Bicarbonate is exhaled', 'Nothing; bicarbonate is not a buffer'] },
  { q: 'Breathing pattern that compensates for metabolic acidosis', a: 'Kussmaul respirations (deep and fast)', wrong: ['Cheyne-Stokes respirations', 'Slow, shallow respirations', 'Biot (ataxic) respirations'], extra: true },
  { q: 'Normal PaCO₂ on a blood gas', a: '35 to 45 mm Hg', wrong: ['22 to 26 mm Hg', '80 to 100 mm Hg', '45 to 55 mm Hg'], extra: true },
  { q: 'Normal serum bicarbonate (Table 11-2)', a: '22 to 30 mEq/L', wrong: ['35 to 45 mEq/L', '10 to 15 mEq/L', '135 to 145 mEq/L'] },
  // Cell
  { q: 'Four basic tissue types', a: 'Epithelial, connective, muscle, nervous', wrong: ['Skin, bone, blood, brain', 'Epithelial, cardiac, smooth, skeletal', 'Connective, adipose, lymph, nervous'] },
  { q: 'Total net ATP from one glucose by aerobic metabolism', a: '36', wrong: ['2', '12', '100'] },
  { q: 'When anaerobic metabolism happens', a: 'When the need for energy exceeds the oxygen supply', wrong: ['When there is extra oxygen', 'Only during sleep', 'When glucose is too high'] },
  { q: 'Key fuel for cellular energy', a: 'Glucose', wrong: ['Protein', 'Sodium', 'Carbon dioxide'] },
  { q: 'Most common cause of cell damage', a: 'Hypoxic injury', wrong: ['Infectious injury', 'Genetic injury', 'Radiation'] },
  { q: 'Common causes of hypoxic injury', a: 'Atherosclerosis and thrombosis', wrong: ['Viruses and bacteria', 'Radiation and heat', 'Free radicals'] },
  { q: 'Cells shrinking', a: 'Atrophy', wrong: ['Hypertrophy', 'Hyperplasia', 'Metaplasia'] },
  { q: 'Cells getting larger', a: 'Hypertrophy', wrong: ['Hyperplasia', 'Atrophy', 'Dysplasia'] },
  { q: 'Cells increasing in number', a: 'Hyperplasia', wrong: ['Hypertrophy', 'Metaplasia', 'Atrophy'] },
  { q: 'One mature cell type replaced by another', a: 'Metaplasia', wrong: ['Dysplasia', 'Hyperplasia', 'Atrophy'] },
  { q: 'Abnormal cell size, shape and organization', a: 'Dysplasia', wrong: ['Metaplasia', 'Hypertrophy', 'Atrophy'] },
  { q: 'Cause of cellular swelling in injury', a: 'Potassium leaks out; sodium and water enter the cell', wrong: ['Sodium leaks out; potassium enters', 'Fat builds up in the cell', 'The cell loses all water'] },
  { q: 'Cause of fatty change in cells', a: 'Fat-metabolizing enzymes are impaired or overwhelmed', wrong: ['Too much glucose', 'Sodium entering the cell', 'Lysosomes bursting'] },
  { q: 'What digests a dead cell', a: 'Enzymes released from its lysosomes', wrong: ['Its mitochondria', 'Red blood cells', 'Bicarbonate'] },
  { q: 'Two kinds of bacterial toxins', a: 'Exotoxins and endotoxins', wrong: ['Antigens and antibodies', 'Lymphokines and proteases', 'Free radicals and lipids'] },
  // Fluids
  { q: 'Intracellular fluid as a share of body weight', a: '40%', wrong: ['16%', '4%', '60%'] },
  { q: 'Interstitial fluid as a share of body weight', a: '16%', wrong: ['40%', '4%', '25%'] },
  { q: 'Plasma as a share of body weight', a: '4%', wrong: ['16%', '40%', '10%'] },
  { q: 'Osmosis', a: 'Net movement of water through a semipermeable membrane', wrong: ['Movement of molecules from low to high concentration', 'Carrier molecules moving large molecules', 'Fluid pushed out by blood pressure'] },
  { q: 'Diffusion', a: 'Molecules or ions moving from higher to lower concentration', wrong: ['Molecules moving from lower to higher concentration', 'Water moving through a membrane', 'Carrier-assisted transport'] },
  { q: 'Mediated transport', a: 'Carrier molecules move large, water-soluble or charged molecules across membranes', wrong: ['Water moving by osmosis', 'Gases moving by diffusion', 'Fluid leaking from capillaries'] },
  { q: 'Key factor in fluid movement between plasma and interstitial fluid', a: 'Integrity of the capillary membrane', wrong: ['Heart rate', 'Blood sugar', 'Red cell count'] },
  { q: 'Four causes of edema', a: '↑ hydrostatic pressure, ↓ oncotic pressure, ↑ capillary permeability, lymphatic obstruction', wrong: ['↓ hydrostatic pressure, ↑ oncotic pressure, ↓ permeability, open lymphatics', 'High sodium, low potassium, fever, anemia', 'Dehydration, hypothermia, acidosis, alkalosis'] },
  { q: 'Effect of low plasma albumin', a: 'Lower oncotic pressure, so fluid moves into the interstitial space', wrong: ['Higher oncotic pressure, so fluid moves into vessels', 'Higher hydrostatic pressure', 'No effect on fluid'] },
  { q: 'Where generalized edema shows most', a: 'Dependent parts of the body', wrong: ['Only at the injury site', 'The face only', 'The chest only'] },
  { q: 'Main hormone regulating water balance', a: 'Antidiuretic hormone (ADH)', wrong: ['Insulin', 'Cortisol', 'Epinephrine'] },
  { q: 'Primary extracellular cation', a: 'Sodium (Na⁺)', wrong: ['Potassium (K⁺)', 'Magnesium (Mg²⁺)', 'Chloride (Cl⁻)'] },
  { q: 'Major extracellular anion', a: 'Chloride (Cl⁻)', wrong: ['Phosphate (PO₄³⁻)', 'Sodium (Na⁺)', 'Potassium (K⁺)'] },
  { q: 'Three kinds of dehydration', a: 'Isotonic, hypernatremic, hyponatremic', wrong: ['Mild, moderate, severe', 'Hypotonic, hypertonic, colloid', 'Acute, chronic, mixed'] },
  { q: 'Normal potassium', a: '3.5 to 5.0 mEq/L', wrong: ['135 to 145 mEq/L', '1.5 to 2.0 mEq/L', '90 to 108 mEq/L'] },
  { q: 'Normal sodium', a: '135 to 145 mEq/L', wrong: ['3.5 to 5.0 mEq/L', '90 to 108 mEq/L', '22 to 30 mEq/L'] },
  { q: 'Normal magnesium (Table 11-2)', a: '1.5 to 2.0 mEq/L', wrong: ['3.5 to 5.0 mEq/L', '8.5 to 10.5 mEq/L', '22 to 30 mEq/L'] },
  { q: 'Normal chloride (Table 11-2)', a: '90 to 108 mEq/L', wrong: ['135 to 145 mEq/L', '22 to 30 mEq/L', '3.5 to 5.0 mEq/L'] },
  { q: 'Main intracellular anion', a: 'Phosphate (PO₄³⁻)', wrong: ['Chloride (Cl⁻)', 'Bicarbonate (HCO₃⁻)', 'Sodium (Na⁺)'] },
  // Shock
  { q: 'Cardiac output', a: 'Total blood pumped by the ventricles each minute (L/min)', wrong: ['Blood pumped with one beat', 'Pressure in the aorta', 'Blood returning to the heart per beat'] },
  { q: 'Shock is defined as', a: 'Hypoxia at the cellular level', wrong: ['Systolic BP below 90', 'Any heart rate over 100', 'Loss of consciousness'] },
  { q: 'Five types of shock in the chapter', a: 'Hypovolemic, cardiogenic, neurogenic, obstructive, distributive', wrong: ['Hypovolemic, septic, anaphylactic, psychogenic, cardiac', 'Compensated, decompensated, irreversible, mixed, obstructive', 'Hemorrhagic, burn, crush, cardiac, spinal'] },
  { q: 'Where baroreceptors are', a: 'Heart and great vessels', wrong: ['Brain stem only', 'Kidneys', 'Lungs'] },
  { q: 'Chemoreceptors mainly regulate', a: 'Respiration', wrong: ['Heart rate and rhythm', 'Blood pressure', 'Urine output'] },
  { q: 'CNS ischemic response', a: 'Ischemia of the medulla\'s vasomotor center raises arterial BP', wrong: ['The brain lowers BP to save oxygen', 'The heart slows to save energy', 'The spleen releases white cells'] },
  { q: 'Hormonal compensatory mechanisms in shock', a: 'Adrenal medulla, renin-angiotensin-aldosterone, vasopressin', wrong: ['Insulin, glucagon, thyroid', 'Histamine, bradykinin, prostaglandins', 'Cortisol, estrogen, testosterone'] },
  { q: 'What MODS begins with', a: 'Damage to the vascular endothelium from endotoxins and inflammatory mediators', wrong: ['A single organ infarct', 'Low blood sugar', 'A broken bone'] },
  { q: 'Why tissue metabolites worsen shock', a: 'They cause vasodilation, reducing perfusion of vital tissue', wrong: ['They cause vasoconstriction', 'They raise cardiac output', 'They make more ATP'] },
  // Inflammation & immunity
  { q: 'Three stages of the inflammatory response', a: 'Cellular response, vascular response, phagocytosis', wrong: ['Alarm, resistance, exhaustion', 'Antigen, antibody, memory', 'Clotting, scarring, healing'] },
  { q: 'Mast cells discharging their granules', a: 'Degranulation', wrong: ['Phagocytosis', 'Agglutination', 'Apoptosis'] },
  { q: 'Systemic responses to acute inflammation', a: 'Fever, leukocytosis, more circulating plasma proteins', wrong: ['Hypothermia, low white count, low proteins', 'Hives only', 'Bradycardia and hypotension'] },
  { q: 'How long chronic inflammation lasts', a: '2 weeks or longer', wrong: ['Less than 24 hours', '2 to 3 days', 'Exactly 1 week'] },
  { q: 'Four requirements for an antigen to be immunogenic', a: 'Foreign enough, large enough, complex enough, enough of it', wrong: ['Small, simple, familiar, rare', 'Live, moving, toxic, warm', 'Protein, fat, sugar, salt'] },
  { q: 'Number of immunoglobulin classes in humans', a: 'Five', wrong: ['Two', 'Three', 'Ten'] },
  { q: 'Cells that make antibodies', a: 'Plasma cells', wrong: ['Mast cells', 'Red blood cells', 'Platelets'] },
  { q: 'Four ABO blood types', a: 'A, B, AB, O', wrong: ['A, B, C, D', 'Rh+, Rh−, A, O', 'Type I, II, III, IV'] },
  { q: 'Benefit of low-titer group O whole blood', a: 'Simpler, fewer clot-impairing additives, less fluid given', wrong: ['Needs no blood typing for any future transfusion', 'Contains no plasma', 'Works only for Rh-negative patients'] },
  { q: 'Where the name Rh comes from', a: 'The rhesus monkey', wrong: ['Red hemoglobin', 'Renal hormone', 'Rheumatic heart'] },
  { q: 'Example of an autoimmune disease from the chapter', a: 'Myasthenia gravis', wrong: ['Tuberculosis', 'Asthma', 'Hepatitis A'] },
  { q: 'Primary immune deficiencies are', a: 'Genetic, usually seen in infancy and childhood', wrong: ['Caused by chemotherapy', 'Caused by AIDS', 'Caused by stress'] },
  { q: 'Iatrogenic immune deficiency', a: 'Caused by medical treatment', wrong: ['Caused by genetics', 'Caused by a virus', 'Caused by aging'] },
  // Stress & disease
  { q: 'Catecholamines released in stress', a: 'Epinephrine, norepinephrine, dopamine', wrong: ['Cortisol, aldosterone, ADH', 'Insulin, glucagon, somatostatin', 'Histamine, serotonin, bradykinin'] },
  { q: 'Two classes of receptors catecholamines act on', a: 'Alpha-adrenergic and beta-adrenergic', wrong: ['Muscarinic and nicotinic', 'H1 and H2', 'Mu and kappa'] },
  { q: 'Effect of cortisol on immunity', a: 'Suppresses it (fewer lymphocytes, especially T cells)', wrong: ['Boosts T cells', 'No effect', 'Increases antibodies'] },
  { q: 'Number of genes in a person\'s genetic makeup (per the chapter)', a: 'More than 19,000', wrong: ['About 1,000', 'About 46', 'More than 1 million'] },
  { q: 'Incidence rate', a: 'New cases in a period per number of people', wrong: ['All people living with the disease per number of people', 'Deaths from the disease per number of people', 'Cases per family'] },
  { q: 'Prevalence rate', a: 'People living with the disease per number of people', wrong: ['New cases in a period per number of people', 'Deaths per number of people', 'Risk factors per person'] },
  { q: 'Causal risk factor', a: 'Removing it delays or prevents the disease', wrong: ['Predicts the disease but does not cause it', 'Cannot be changed', 'Only applies to infections'] },
  { q: 'Five determinants of a population\'s health', a: 'Genes and biology, health behaviors, social environment, physical environment, health services', wrong: ['Age, sex, race, income, education', 'Diet, exercise, sleep, smoking, alcohol', 'Heart, lungs, kidneys, liver, brain'] }
];

// Side-by-side comparison of shock types for the Learn tab (standard
// findings; the chapter lists the types without this detail).
window.PATHO_SHOCK = {
  cols: [['problem', 'Problem'], ['hr', 'Heart rate'], ['skin', 'Skin'], ['jvd', 'Neck veins'], ['lungs', 'Lungs'], ['first', 'First care']],
  rows: [
    { name: 'Hypovolemic', problem: 'Volume', hr: 'Fast', skin: 'Pale, cool, clammy', jvd: 'Flat', lungs: 'Clear', first: 'Stop bleeding, warm, blood or fluid to target' },
    { name: 'Cardiogenic', problem: 'Pump', hr: 'Fast, slow or irregular', skin: 'Pale, cool, clammy', jvd: 'Distended', lungs: 'Crackles', first: '12-lead, pressors, PCI center' },
    { name: 'Neurogenic', problem: 'Pipes (lost sympathetic tone)', hr: 'Slow or normal', skin: 'Warm, dry, pink below the injury', jvd: 'Flat', lungs: 'Clear', first: 'SMR, fluids, atropine, pressors' },
    { name: 'Obstructive', problem: 'Blocked flow', hr: 'Fast', skin: 'Pale, cool; cyanosis', jvd: 'Distended', lungs: 'Absent one side (tension pneumo), clear (tamponade, PE)', first: 'Fix the cause: decompress, rapid transport' },
    { name: 'Distributive: septic', problem: 'Pipes (dilated, leaky)', hr: 'Fast', skin: 'Warm and flushed early, then mottled', jvd: 'Flat', lungs: 'Clear or signs of pneumonia', first: 'Fluids, early notification, pressors' },
    { name: 'Distributive: anaphylactic', problem: 'Pipes (dilated, leaky)', hr: 'Fast', skin: 'Flushed, hives, swelling', jvd: 'Flat', lungs: 'Wheezes, stridor', first: 'IM epinephrine, airway, fluids' }
  ]
};
