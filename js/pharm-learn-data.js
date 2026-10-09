/*
 * Pharmacology principles and medication administration, transcribed from the
 * lecture slides for Sanders' Paramedic Textbook (6th ed.):
 *   Chapter 13, Principles of Pharmacology and Emergency Medications
 *   Chapter 14, Medication Administration
 * Items marked std: true go beyond the slides (standard paramedic pharmacology,
 * such as alpha-1 / beta-1 / beta-2 effects) and are flagged with * in the app.
 */
window.PHARM_TOPICS = [
  { id: 'routes', name: 'Routes & absorption', src: 'Ch. 13 Table 13-2, Ch. 14' },
  { id: 'kinetics', name: 'Kinetics & dynamics', src: 'Ch. 13' },
  { id: 'receptors', name: 'Receptors & ANS', src: 'Ch. 13' },
  { id: 'classes', name: 'Drug classes', src: 'Ch. 13' },
  { id: 'admin', name: 'Giving meds', src: 'Ch. 14' }
];

// Rates of absorption, fastest first (Table 13-2 uses these four words).
window.PHARM_RATES = ['Immediate', 'Rapid', 'Moderate', 'Slow'];

window.PHARM_ROUTES = [
  {
    id: 'iv', name: 'Intravenous (IV)', kind: 'Parenteral', rate: 'Immediate',
    rateNote: 'No absorption required',
    points: [
      'Puts the drug directly into the bloodstream, bypassing all barriers to absorption',
      'Used to give fluids and drugs and to draw blood for lab tests',
      'Route of choice in the field: a peripheral vein in an extremity, with an over-the-needle catheter',
      'Insert bevel up at a 35° to 45° angle',
      'Sites: hands and arms, long saphenous vein in the leg, external jugular'
    ]
  },
  {
    id: 'io', name: 'Intraosseous (IO)', kind: 'Parenteral', rate: 'Immediate',
    points: [
      'Drugs pass from the marrow cavity into sinusoids, then large venous channels and emissary veins, then the systemic circulation',
      'Use when peripheral access is difficult or unobtainable; safe in children and adults',
      'Usual site: the tibia. Children: also femur, humeral head (older children). Adults: also sternum, medial malleolus, humeral head',
      'Contraindications: fracture at or above the site, traumatized extremity, cellulitis, burns, congenital bone disease, previous IO attempt in the same bone',
      'Fluid infusion can be very painful: lidocaine through the IO before fluids gives intramedullary anesthesia'
    ]
  },
  {
    id: 'et', name: 'Endotracheal (ET)', kind: 'Parenteral', rate: 'Rapid',
    points: [
      'Only when IV or IO access cannot be established and other routes are not appropriate',
      'Absorption is unpredictable and less effective, so the dose is 2 to 2.5 times the IV dose',
      'Confirm tube position and ventilation, inject deep into the tube, follow with a saline flush, resume ventilations'
    ]
  },
  {
    id: 'inhaled', name: 'Pulmonary (inhaled)', kind: 'Parenteral', rate: 'Rapid',
    points: [
      'Nebulizer or metered-dose inhaler (MDI)',
      'Advantages: rapid onset and fewer systemic side effects',
      'Depends on droplet number, gas flow rate, particle size and the depth of the patient\'s breathing',
      'MDI: exhale, press the canister as the patient inhales deeply, hold the breath 5 to 10 seconds',
      'Nebulizer: mix with normal saline, run on nonhumidified O2 or compressed air; stop if heart rate changes or dysrhythmias occur'
    ]
  },
  {
    id: 'im', name: 'Intramuscular (IM)', kind: 'Parenteral', rate: 'Moderate',
    points: [
      'Used when the drug is irritating or a larger volume or faster absorption (than SubQ) is wanted',
      'Needle at 90°, skin held taut (not pinched), aspirate: no blood, then inject',
      'Sites: deltoid, dorsogluteal, vastus lateralis, rectus femoris, ventrogluteal',
      'Z-track for large volumes or irritating drugs: pull the skin laterally, inject, release as the needle comes out'
    ]
  },
  {
    id: 'subq', name: 'Subcutaneous (SubQ)', kind: 'Parenteral', rate: 'Slow',
    points: [
      'Into the subcutaneous layer below the skin',
      'Pinch (elevate) the tissue, needle bevel up at 45° in one quick motion',
      'Withdraw at the same angle, then apply direct pressure'
    ]
  },
  {
    id: 'intradermal', name: 'Intradermal', kind: 'Parenteral', rate: null,
    points: [
      'Just below the epidermis',
      'Sites: medial forearm and the back',
      'Hold the skin taut, needle at 10° to 15°, insert until the bevel is just under the skin'
    ]
  },
  {
    id: 'sl', name: 'Sublingual & buccal', kind: 'Enteral', rate: 'Rapid',
    points: [
      'Sublingual: under the tongue. Buccal: between cheek and gum',
      'Transmucosal: fast, noninvasive, and no first-pass metabolism in the liver',
      'No fluids while it absorbs; if swallowed, the effect is diminished and delayed',
      'Older adults have less saliva, so absorption can be slow and unpredictable',
      'Not for altered mental status, inability to swallow or no gag reflex (buccal)'
    ]
  },
  {
    id: 'in', name: 'Intranasal (IN)', kind: 'Transmucosal', rate: 'Rapid',
    points: [
      'Acts quickly on the brain because it is absorbed close to it',
      'No first-pass metabolism, so serum levels stay high',
      'Only small volumes; congestion or damaged mucosa limits it',
      'Atomizer on the syringe, aim toward the top of the ear, give half the dose in each nostril; draw up extra for dead space'
    ]
  },
  {
    id: 'topical', name: 'Topical / transdermal', kind: 'Transdermal', rate: 'Moderate',
    points: [
      'Absorbed through the skin; includes eye and ear drugs',
      'Slower onset and longer duration than parenteral routes',
      'Clean, dry upper arm or hair-free chest; wear gloves to avoid absorbing it yourself',
      'Eye: into the conjunctival sac of the lower lid, never onto the eyeball. Ear: ear up about 10 minutes. Nose drops: don\'t blow the nose for several minutes'
    ]
  },
  {
    id: 'po', name: 'Oral / gastric (swallowed)', kind: 'Enteral', rate: 'Slow',
    points: [
      'Most frequently used route; patient upright or sitting, swallow with fluid',
      'Not if the patient cannot swallow or has no effective gag reflex',
      'Gastric tube (OG or NG): confirm placement, give the drug, flush with water',
      'Goes through first-pass metabolism in the liver'
    ]
  },
  {
    id: 'pr', name: 'Rectal (PR)', kind: 'Enteral', rate: null,
    points: [
      'Some drugs are made for rectal use',
      'Others can be given rectally when vascular access cannot be established'
    ]
  }
];

// Autonomic receptors. The slides cover alpha/beta and nicotinic/muscarinic;
// the subtypes and their effects are standard material (std).
window.PHARM_RECEPTORS = [
  {
    id: 'nicotinic', name: 'Nicotinic', division: 'Both divisions (cholinergic)', nt: 'Acetylcholine (ACh)',
    where: 'Autonomic ganglia (pre- to postganglionic fibers in both divisions); skeletal muscle (neuromuscular junction)',
    effects: ['Passes the impulse to the postganglionic neuron', 'Skeletal muscle contraction'],
    drugs: 'Succinylcholine (depolarizing agonist); rocuronium, vecuronium (antagonists)'
  },
  {
    id: 'muscarinic', name: 'Muscarinic', division: 'Parasympathetic (cholinergic)', nt: 'Acetylcholine (ACh)',
    where: 'Effector organs (heart, glands, smooth muscle); also sympathetic sweat glands',
    effects: ['Slows heart rate', 'Increases secretions (salivation, lacrimation) and GI motility', 'Bronchoconstriction', 'Pupil constriction'],
    drugs: 'Atropine blocks it (anticholinergic); organophosphates overstimulate it (SLUDGE)', std: true
  },
  {
    id: 'alpha1', name: 'Alpha-1', division: 'Sympathetic (adrenergic)', nt: 'Norepinephrine (NE)',
    where: 'Blood vessels (vascular smooth muscle)',
    effects: ['Vasoconstriction', 'Raises blood pressure (afterload)', 'Pupil dilation'],
    drugs: 'Epinephrine, dopamine (high dose), norepinephrine', std: true
  },
  {
    id: 'alpha2', name: 'Alpha-2', division: 'Sympathetic (adrenergic)', nt: 'Norepinephrine (NE)',
    where: 'Presynaptic nerve endings',
    effects: ['Inhibits further norepinephrine release (negative feedback)'],
    drugs: 'Clonidine (central-acting antihypertensive)', std: true
  },
  {
    id: 'beta1', name: 'Beta-1', division: 'Sympathetic (adrenergic)', nt: 'Norepinephrine (NE)',
    where: 'Heart ("one heart")',
    effects: ['Increases heart rate (chronotropy)', 'Increases contractility (inotropy)', 'Increases conduction speed (dromotropy)', 'Renin release'],
    drugs: 'Epinephrine, dopamine, dobutamine; blocked by beta blockers (metoprolol)', std: true
  },
  {
    id: 'beta2', name: 'Beta-2', division: 'Sympathetic (adrenergic)', nt: 'Norepinephrine (NE) / epinephrine',
    where: 'Lungs ("two lungs"), skeletal-muscle blood vessels',
    effects: ['Bronchodilation', 'Vasodilation in skeletal muscle'],
    drugs: 'Albuterol, epinephrine, terbutaline', std: true
  },
  {
    id: 'dopaminergic', name: 'Dopaminergic', division: 'Sympathetic', nt: 'Dopamine',
    where: 'Renal, mesenteric and coronary vessels',
    effects: ['Vasodilation of renal and mesenteric vessels'],
    drugs: 'Dopamine (low dose)', std: true
  }
];

// What the Drug Box drugs do at receptors (std: standard pharmacology, not in the slides).
window.PHARM_DRUG_RECEPTORS = [
  { drug: 'epi-1000', name: 'Epinephrine', action: 'Agonist', receptor: 'Alpha-1, beta-1, beta-2', effect: 'Vasoconstriction, stronger faster heartbeat, bronchodilation' },
  { drug: 'dopamine', name: 'Dopamine', action: 'Agonist', receptor: 'Dopaminergic, beta-1, alpha-1 (dose-dependent)', effect: 'Low dose renal vasodilation, middle dose inotropy, high dose vasoconstriction' },
  { drug: 'albuterol', name: 'Albuterol', action: 'Agonist', receptor: 'Beta-2', effect: 'Bronchodilation' },
  { drug: 'atropine', name: 'Atropine', action: 'Antagonist', receptor: 'Muscarinic', effect: 'Blocks vagal tone: faster heart rate, dries secretions' },
  { drug: 'succinylcholine', name: 'Succinylcholine', action: 'Agonist (depolarizing)', receptor: 'Nicotinic (neuromuscular junction)', effect: 'Fasciculations, then paralysis' },
  { drug: 'rocuronium', name: 'Rocuronium', action: 'Antagonist (nondepolarizing)', receptor: 'Nicotinic (neuromuscular junction)', effect: 'Paralysis without fasciculations' },
  { drug: 'vecuronium', name: 'Vecuronium', action: 'Antagonist (nondepolarizing)', receptor: 'Nicotinic (neuromuscular junction)', effect: 'Paralysis without fasciculations' },
  { drug: 'fentanyl', name: 'Fentanyl', action: 'Agonist', receptor: 'Mu opioid', effect: 'Analgesia; respiratory depression' },
  { drug: 'morphine', name: 'Morphine', action: 'Agonist', receptor: 'Mu opioid', effect: 'Analgesia; histamine release, hypotension' },
  { drug: 'naloxone', name: 'Naloxone', action: 'Antagonist', receptor: 'Mu opioid', effect: 'Reverses opioid respiratory depression' },
  { drug: 'midazolam', name: 'Midazolam', action: 'Enhances GABA', receptor: 'GABA-A', effect: 'Sedation, stops seizures' },
  { drug: 'diazepam', name: 'Diazepam', action: 'Enhances GABA', receptor: 'GABA-A', effect: 'Sedation, stops seizures' },
  { drug: 'etomidate', name: 'Etomidate', action: 'Enhances GABA', receptor: 'GABA-A', effect: 'Induction (hypnosis)' },
  { drug: 'ketamine', name: 'Ketamine', action: 'Antagonist', receptor: 'NMDA', effect: 'Dissociative anesthesia, analgesia' },
  { drug: 'diphenhydramine', name: 'Diphenhydramine', action: 'Antagonist', receptor: 'H1 histamine', effect: 'Blocks allergic response; sedation' },
  { drug: 'ondansetron', name: 'Ondansetron', action: 'Antagonist', receptor: '5-HT3 serotonin', effect: 'Antiemetic' },
  { drug: 'adenosine', name: 'Adenosine', action: 'Agonist', receptor: 'Adenosine A1', effect: 'Briefly blocks the AV node' }
];

window.PHARM_TERMS = [
  // Kinetics & dynamics
  { topic: 'kinetics', term: 'Drug', def: 'Substance used to treat or prevent a disease or condition; taken by mouth, injected, or applied topically' },
  { topic: 'kinetics', term: 'Four drug names', def: 'Chemical, generic, trade and official names' },
  { topic: 'kinetics', term: 'Orphan drug', def: 'A less profitable drug the federal government gives incentives to research and develop' },
  { topic: 'kinetics', term: 'Therapeutic effect', def: 'The desirable effect of a drug' },
  { topic: 'kinetics', term: 'Adverse effect', def: 'An undesirable or harmful effect of a drug' },
  { topic: 'kinetics', term: 'Agonist', def: 'Drug that binds a receptor and stimulates a response' },
  { topic: 'kinetics', term: 'Antagonist', def: 'Drug that binds a receptor but does not stimulate a response' },
  { topic: 'kinetics', term: 'Pharmaceutics', def: 'Science of dispensing drugs; how a drug\'s form affects its kinetics and dynamics' },
  { topic: 'kinetics', term: 'Pharmacokinetics', def: 'How the body handles a drug over time: absorption, distribution, biotransformation and excretion' },
  { topic: 'kinetics', term: 'Absorption', def: 'Movement of drug molecules from the entry site to the general circulation' },
  { topic: 'kinetics', term: 'Distribution', def: 'Transport of a drug through the bloodstream to its site of action' },
  { topic: 'kinetics', term: 'Drug reservoir', def: 'Tissue where a drug accumulates by binding, acting as a storage site' },
  { topic: 'kinetics', term: 'Biotransformation', def: 'Chemical conversion of a drug to metabolites, to detoxify it and make it less active' },
  { topic: 'kinetics', term: 'Excretion', def: 'Elimination of toxic or inactive metabolites, mainly by the kidneys' },
  { topic: 'kinetics', term: 'First-pass metabolism', def: 'Breakdown of a swallowed drug by the liver before it reaches the circulation; transmucosal and IN routes avoid it' },
  { topic: 'kinetics', term: 'Pharmacodynamics', def: 'How a drug acts on a living organism, mostly through drug-receptor interaction' },
  { topic: 'kinetics', term: 'Therapeutic range', def: 'Blood level with the highest chance of response and the least risk of toxicity' },
  { topic: 'kinetics', term: 'Minimum effective concentration', def: 'Lowest plasma level that produces the drug\'s effect; onset of action starts here' },
  { topic: 'kinetics', term: 'Biologic half-life', def: 'Time to metabolize or eliminate 50% of a drug; sets how often it is given' },
  { topic: 'kinetics', term: 'Therapeutic index', def: 'Ratio of lethal dose to effective dose; a measure of a drug\'s safety (wide = fairly safe)' },
  { topic: 'kinetics', term: 'Onset of action', def: 'Time from giving the drug until it reaches the minimum effective concentration', std: true },
  { topic: 'kinetics', term: 'Duration of action', def: 'Time the drug stays above the minimum effective concentration', std: true },
  { topic: 'kinetics', term: 'Peak level', def: 'Highest plasma concentration after a dose', std: true },
  // Receptors & ANS
  { topic: 'receptors', term: 'Sympathetic division', def: 'Adrenergic branch; postganglionic fibers release norepinephrine at alpha and beta receptors' },
  { topic: 'receptors', term: 'Parasympathetic division', def: 'Cholinergic branch; releases acetylcholine at nicotinic and muscarinic receptors' },
  { topic: 'receptors', term: 'Neurotransmitter', def: 'Chemical released from the presynaptic neuron that crosses the synapse to a receptor' },
  { topic: 'receptors', term: 'Cholinergic drug', def: 'Mimics acetylcholine (parasympathomimetic)' },
  { topic: 'receptors', term: 'Cholinergic blocking drug', def: 'Blocks acetylcholine (anticholinergic, parasympatholytic), such as atropine' },
  { topic: 'receptors', term: 'Adrenergic drug', def: 'Mimics the sympathetic division (sympathomimetic), such as epinephrine' },
  { topic: 'receptors', term: 'Adrenergic blocking drug', def: 'Blocks alpha or beta receptors (sympatholytic), such as a beta blocker' },
  { topic: 'receptors', term: 'Chronotropic', def: 'Affects heart rate', std: true },
  { topic: 'receptors', term: 'Inotropic', def: 'Affects force of contraction', std: true },
  { topic: 'receptors', term: 'Dromotropic', def: 'Affects conduction speed', std: true },
  // Drug classes
  { topic: 'classes', term: 'Opioid analgesic', def: 'Binds opioid receptors to relieve pain; can cause nausea, constipation and respiratory depression' },
  { topic: 'classes', term: 'Opioid antagonist', def: 'Blocks the effects of opioid analgesics (naloxone)' },
  { topic: 'classes', term: 'Opioid agonist-antagonist', def: 'Has both analgesic and antagonist effects' },
  { topic: 'classes', term: 'Nonopioid analgesic', def: 'Interferes with local mediators released by damaged tissue, so nerve endings fire less' },
  { topic: 'classes', term: 'Anesthetic', def: 'CNS suppressant with reversible action on nervous tissue: general, regional or local' },
  { topic: 'classes', term: 'Sedative-hypnotic', def: 'Depresses the CNS (reticular activating system) to calm and induce sleep: benzodiazepines, barbiturates' },
  { topic: 'classes', term: 'Anticonvulsant', def: 'Depresses the neurons that start a seizure and suppresses its spread' },
  { topic: 'classes', term: 'Cardiac glycoside', def: 'Blocks ion pumps to raise calcium for contraction: stronger beat, slower rate, slower conduction; narrow therapeutic index (digoxin)' },
  { topic: 'classes', term: 'Antidysrhythmic', def: 'Treats and prevents rhythm disorders; all suppress automaticity to some degree' },
  { topic: 'classes', term: 'ACE inhibitor', def: 'Blocks conversion of angiotensin I to angiotensin II (names end in -pril)' },
  { topic: 'classes', term: 'Angiotensin II receptor blocker', def: 'Blocks angiotensin II at its receptor (names end in -sartan)' },
  { topic: 'classes', term: 'Calcium channel blocker', def: 'Antihypertensive that relaxes blood vessels (diltiazem, nifedipine)' },
  { topic: 'classes', term: 'Diuretic', def: 'Antihypertensive that decreases sodium reabsorption in the kidney (furosemide)' },
  { topic: 'classes', term: 'Antiplatelet agent', def: 'Interferes with platelet aggregation (aspirin, clopidogrel)' },
  { topic: 'classes', term: 'Anticoagulant', def: 'Prevents intravascular thrombosis (heparin, warfarin)' },
  { topic: 'classes', term: 'Fibrinolytic', def: 'Dissolves clots after they form by digesting fibrin (alteplase)' },
  { topic: 'classes', term: 'Antifibrinolytic', def: 'Prevents breakdown of clots (tranexamic acid, TXA)' },
  { topic: 'classes', term: 'Hemostatic agent', def: 'Hastens clot formation to reduce bleeding; systemic or topical' },
  { topic: 'classes', term: 'Bronchodilator', def: 'Primary treatment for obstructive airway disease, given by inhalation: sympathomimetic, anticholinergic, xanthine' },
  { topic: 'classes', term: 'Mucokinetic drug', def: 'Changes the consistency of secretions so they can be cleared' },
  { topic: 'classes', term: 'Antacid', def: 'Buffers or neutralizes hydrochloric acid' },
  { topic: 'classes', term: 'H2-receptor antagonist', def: 'Reduces gastric acid volume and content (famotidine, cimetidine)' },
  { topic: 'classes', term: 'Proton pump inhibitor', def: 'Decreases HCl secretion by parietal cells (names end in -prazole)' },
  { topic: 'classes', term: 'Antiemetic', def: 'Treats nausea and vomiting; works best given before symptoms (ondansetron, promethazine)' },
  { topic: 'classes', term: 'Antipsychotic', def: 'Treats psychotic disorders: first-generation (typical) and second-generation (atypical)' },
  { topic: 'classes', term: 'Antidepressant classes', def: 'Tricyclics, SSRIs and MAO inhibitors (lithium for mania)' },
  { topic: 'classes', term: 'NSAID', def: 'Inhibits enzymes so prostaglandins are not formed; aspirin is the prototype' },
  { topic: 'classes', term: 'Antipyretic', def: 'Reduces fever (acetaminophen, aspirin)' },
  { topic: 'classes', term: 'Protease inhibitor', def: 'Inhibits retrovirus replication (names end in -navir)' },
  { topic: 'classes', term: 'Immunosuppressant', def: 'Reduces immune activity by suppressing lymphocytes' },
  { topic: 'classes', term: 'Antineoplastic', def: 'Cancer chemotherapy; interferes with cell reproduction and harms all cells' },
  // Giving meds
  { topic: 'admin', term: 'Enteral', def: 'Given and absorbed through the GI tract: oral, gastric or rectal' },
  { topic: 'admin', term: 'Parenteral', def: 'Given outside the GI tract, usually by injection: intradermal, SubQ, IM, IV, IO' },
  { topic: 'admin', term: 'Medical asepsis', def: 'Removing or destroying disease-causing organisms; "clean" rather than sterile technique' },
  { topic: 'admin', term: 'Disinfectant', def: 'Kills microorganisms on nonliving objects only; toxic to tissue' },
  { topic: 'admin', term: 'Antiseptic', def: 'Kills microorganisms on living tissue; more dilute' },
  { topic: 'admin', term: 'Saline lock', def: 'Peripheral IV cannula with no tubing attached, for quick access' },
  { topic: 'admin', term: 'Infiltration', def: 'IV fluid leaking into the tissues from a displaced catheter; check by lowering the bag for backflow' },
  { topic: 'admin', term: 'Phlebitis', def: 'Inflammation of a vein' },
  { topic: 'admin', term: 'Hematoma', def: 'Collection of blood at the injection or cannulation site' },
  { topic: 'admin', term: 'Catheter fragment embolism', def: 'Part of the IV catheter breaks off during insertion and travels in the bloodstream' },
  { topic: 'admin', term: 'Z-track technique', def: 'IM injection with the skin pulled laterally, for large volumes or irritating drugs' },
  { topic: 'admin', term: 'Macrodrip set', def: 'Infusion set delivering 10, 15 or 20 gtt/mL', std: true },
  { topic: 'admin', term: 'Microdrip set', def: 'Infusion set delivering 60 gtt/mL', std: true }
];

// Short-answer facts with wrong answers for the quiz.
window.PHARM_FACTS = [
  // Routes
  { topic: 'routes', q: 'Which route needs no absorption at all?', a: 'Intravenous', wrong: ['Intramuscular', 'Sublingual', 'Endotracheal'] },
  { topic: 'routes', q: 'Endotracheal drug dose compared with the IV dose?', a: '2 to 2.5 times the IV dose', wrong: ['Half the IV dose', 'Same as the IV dose', '10 times the IV dose'] },
  { topic: 'routes', q: 'Which routes avoid first-pass metabolism in the liver?', a: 'Sublingual, buccal and intranasal', wrong: ['Oral and gastric tube', 'Oral and rectal', 'Only swallowed tablets'] },
  { topic: 'routes', q: 'Usual IO site in many EMS systems?', a: 'Tibia', wrong: ['Sternum', 'Radius', 'Iliac crest'] },
  { topic: 'routes', q: 'Rate and extent of absorption depend on (pick the full list)', a: 'Absorbing surface, blood flow, solubility, pH, concentration, dosage form', wrong: ['Patient age and sex only', 'Only the route used', 'Drug name and manufacturer'] },
  { topic: 'routes', q: 'Which is NOT a contraindication to IO at a site?', a: 'Cardiac arrest', wrong: ['Fracture of the bone', 'Cellulitis over the site', 'Previous IO attempt in the same bone'] },
  { topic: 'routes', q: 'Why does the intranasal route act quickly on the brain?', a: 'It is absorbed close to the brain and skips first-pass metabolism', wrong: ['The nose has no capillaries', 'It is converted to an IV drug', 'It is given in large volumes'] },
  { topic: 'routes', q: 'Transdermal onset and duration compared with parenteral routes?', a: 'Slower onset, longer duration', wrong: ['Faster onset, shorter duration', 'Same onset and duration', 'Faster onset, longer duration'] },
  { topic: 'routes', q: 'Two main advantages of inhaled drugs?', a: 'Rapid onset and fewer systemic side effects', wrong: ['Slow onset and long duration', 'No need for patient cooperation', 'Larger doses are absorbed'] },
  { topic: 'routes', q: 'Why might sublingual nitroglycerin absorb slowly in an older adult?', a: 'Decreased saliva', wrong: ['Thicker oral mucosa', 'Faster liver metabolism', 'Lower blood pressure'] },
  // Kinetics
  { topic: 'kinetics', q: 'The four parts of pharmacokinetics?', a: 'Absorption, distribution, biotransformation, excretion', wrong: ['Absorption, binding, reaction, elimination', 'Ingestion, digestion, absorption, elimination', 'Dissolution, absorption, effect, excretion'] },
  { topic: 'kinetics', q: 'Main organ of excretion?', a: 'Kidneys', wrong: ['Liver', 'Lungs', 'Skin'] },
  { topic: 'kinetics', q: 'Drugs are distributed first to…', a: 'Organs with a rich blood supply', wrong: ['Fat tissue', 'Bone', 'The skin'] },
  { topic: 'kinetics', q: 'Which drugs reach tissues faster?', a: 'Lipid-soluble drugs', wrong: ['Lipid-insoluble drugs', 'Protein-bound drugs', 'Large-molecule drugs'] },
  { topic: 'kinetics', q: 'Two barriers to drug distribution?', a: 'Blood-brain barrier and placental barrier', wrong: ['Liver and kidney barriers', 'Skin and mucosal barriers', 'Gastric and intestinal barriers'] },
  { topic: 'kinetics', q: 'A wide therapeutic index means the drug is…', a: 'Fairly safe', wrong: ['Very dangerous', 'Long acting', 'Fast acting'] },
  { topic: 'kinetics', q: 'Biologic half-life is the time to eliminate…', a: '50% of the drug', wrong: ['All of the drug', '25% of the drug', '90% of the drug'] },
  { topic: 'kinetics', q: 'Drugs can only…', a: 'Modify existing functions of a tissue or organ', wrong: ['Give a tissue new functions', 'Replace damaged organs', 'Act on one receptor each'] },
  { topic: 'kinetics', q: 'Faster dissolution of a drug means…', a: 'Faster absorption', wrong: ['Slower absorption', 'Longer half-life', 'Lower peak level'] },
  { topic: 'kinetics', q: 'Purpose of biotransformation?', a: 'Detoxify the drug and make it less active', wrong: ['Make the drug more potent', 'Move the drug to its target', 'Store the drug for later'] },
  { topic: 'kinetics', q: 'Federal law of 1906 protecting the public from mislabeled or adulterated drugs?', a: 'Pure Food and Drug Act', wrong: ['Controlled Substances Act', 'Harrison Narcotic Act', 'Food, Drug, and Cosmetic Act'] },
  { topic: 'kinetics', q: 'Since 1973, the sole legal drug enforcement body in the US?', a: 'Drug Enforcement Administration (DEA)', wrong: ['FDA', 'Public Health Service', 'Federal Trade Commission'] },
  // Receptors
  { topic: 'receptors', q: 'Parasympathetic receptors?', a: 'Nicotinic and muscarinic', wrong: ['Alpha and beta', 'Beta-1 and beta-2', 'Dopaminergic and histamine'] },
  { topic: 'receptors', q: 'Sympathetic effector receptors?', a: 'Alpha and beta (adrenergic)', wrong: ['Nicotinic and muscarinic', 'Mu and kappa', 'H1 and H2'] },
  { topic: 'receptors', q: 'Neurotransmitter at both divisions\' ganglia?', a: 'Acetylcholine', wrong: ['Norepinephrine', 'Dopamine', 'Epinephrine'] },
  { topic: 'receptors', q: 'Neurotransmitter of sympathetic postganglionic fibers (most)?', a: 'Norepinephrine', wrong: ['Acetylcholine', 'Serotonin', 'GABA'] },
  { topic: 'receptors', q: 'The four groups of drugs that affect the ANS?', a: 'Cholinergic, cholinergic blocking, adrenergic, adrenergic blocking', wrong: ['Stimulants, depressants, opioids, antagonists', 'Alpha, beta, nicotinic, muscarinic', 'Agonists, antagonists, partial agonists, inverse agonists'] },
  { topic: 'receptors', q: 'Skeletal muscle contraction is triggered through which receptor?', a: 'Nicotinic', wrong: ['Muscarinic', 'Beta-2', 'Alpha-1'] },
  { topic: 'receptors', q: 'Beta-1 stimulation causes…', a: 'Faster rate and stronger contraction of the heart', wrong: ['Bronchodilation', 'Vasoconstriction', 'Slower heart rate'], std: true },
  { topic: 'receptors', q: 'Beta-2 stimulation causes…', a: 'Bronchodilation', wrong: ['Bronchoconstriction', 'Vasoconstriction', 'Increased heart rate only'], std: true },
  { topic: 'receptors', q: 'Alpha-1 stimulation causes…', a: 'Vasoconstriction', wrong: ['Vasodilation', 'Bronchodilation', 'Slower heart rate'], std: true },
  { topic: 'receptors', q: 'Muscarinic stimulation of the heart…', a: 'Slows the heart rate', wrong: ['Speeds the heart rate', 'Strengthens contraction', 'Has no effect'], std: true },
  { topic: 'receptors', q: 'Movement disorders like Parkinson disease come from an imbalance of…', a: 'Dopamine and acetylcholine', wrong: ['Serotonin and GABA', 'Norepinephrine and epinephrine', 'Histamine and dopamine'] },
  // Classes
  { topic: 'classes', q: 'Which drug class has a narrow therapeutic index and needs close monitoring?', a: 'Cardiac glycosides', wrong: ['Antacids', 'Antiemetics', 'Bronchodilators'] },
  { topic: 'classes', q: 'Tranexamic acid (TXA) is a…', a: 'Antifibrinolytic', wrong: ['Fibrinolytic', 'Anticoagulant', 'Antiplatelet agent'] },
  { topic: 'classes', q: 'Drug class ending in -prazole?', a: 'Proton pump inhibitors', wrong: ['H2-receptor antagonists', 'Antacids', 'ACE inhibitors'] },
  { topic: 'classes', q: 'Drug class ending in -pril?', a: 'ACE inhibitors', wrong: ['Beta blockers', 'Angiotensin II receptor blockers', 'Calcium channel blockers'], std: true },
  { topic: 'classes', q: 'Drug class ending in -olol?', a: 'Beta blockers', wrong: ['ACE inhibitors', 'Calcium channel blockers', 'Proton pump inhibitors'], std: true },
  { topic: 'classes', q: 'Three risk factors for thrombosis?', a: 'Stasis, localized trauma, hypercoagulability', wrong: ['Hypertension, diabetes, smoking', 'Anemia, bleeding, infection', 'Age, sex, weight'] },
  { topic: 'classes', q: 'NSAIDs work by…', a: 'Inhibiting enzymes so prostaglandins are not formed', wrong: ['Binding opioid receptors', 'Blocking histamine', 'Depressing the reticular activating system'] },
  { topic: 'classes', q: 'Sedative-hypnotics act by depressing the…', a: 'Reticular activating system', wrong: ['Medulla only', 'Spinal cord', 'Peripheral nerves'] },
  { topic: 'classes', q: 'Alcohol with a sedative-hypnotic…', a: 'Enhances the sedative effect', wrong: ['Cancels the sedative effect', 'Has no interaction', 'Speeds elimination of the drug'] },
  { topic: 'classes', q: 'Three types of anesthetics?', a: 'General, regional, local', wrong: ['Topical, oral, IV', 'Short, medium, long acting', 'Opioid, nonopioid, mixed'] },
  { topic: 'classes', q: 'Famotidine and cimetidine are…', a: 'H2-receptor antagonists', wrong: ['Proton pump inhibitors', 'Antacids', 'Antiemetics'] },
  { topic: 'classes', q: 'Primary treatment for obstructive pulmonary disease?', a: 'Bronchodilators', wrong: ['Mucokinetic drugs', 'Cough suppressants', 'Antihistamines'] },
  // Admin
  { topic: 'admin', q: 'The sixth right of medication administration?', a: 'Documentation', wrong: ['Right reason', 'Right to refuse', 'Right indication'] },
  { topic: 'admin', q: 'Compare the drug label with the order at least…', a: '3 times', wrong: ['Once', 'Twice', '5 times'] },
  { topic: 'admin', q: 'Intradermal needle angle?', a: '10° to 15°', wrong: ['45°', '90°', '35° to 45°'] },
  { topic: 'admin', q: 'Subcutaneous needle angle?', a: '45°', wrong: ['10° to 15°', '90°', '30°'] },
  { topic: 'admin', q: 'Intramuscular needle angle?', a: '90°', wrong: ['45°', '10° to 15°', '60°'] },
  { topic: 'admin', q: 'Peripheral IV insertion angle (bevel up)?', a: '35° to 45°', wrong: ['90°', '10° to 15°', '5°'] },
  { topic: 'admin', q: 'Suspected air embolism: position the patient…', a: 'On the left side, head down', wrong: ['On the right side, head up', 'Supine, legs raised', 'Sitting upright'] },
  { topic: 'admin', q: 'To calculate an IV flow rate you need…', a: 'Volume, time in minutes, and drop factor', wrong: ['Volume and patient weight', 'Drug dose and patient weight', 'Bag size and catheter gauge'] },
  { topic: 'admin', q: 'Drawing from a vial: first inject air equal to…', a: 'The volume you will withdraw', wrong: ['Twice the volume', 'Half the volume', 'No air; vials are vented'] },
  { topic: 'admin', q: 'Drawing from an ampule, use a…', a: 'Filter needle or filter straw', wrong: ['Blunt fill needle without filter', 'Butterfly needle', 'Tuberculin syringe'] },
  { topic: 'admin', q: 'Chlorhexidine skin prep is scrubbed…', a: 'Up and down, then side to side', wrong: ['In circles moving outward', 'In circles moving inward', 'Once in one direction'] },
  { topic: 'admin', q: 'After a medication error, first…', a: 'Accept responsibility and advise medical direction immediately', wrong: ['Finish the call and report later', 'Document only if harm occurred', 'Give the antidote without telling anyone'] },
  { topic: 'admin', q: 'MDI: after the puff, hold the breath for…', a: '5 to 10 seconds', wrong: ['1 to 2 seconds', '30 seconds', 'No breath hold'] },
  { topic: 'admin', q: 'Used needles should be…', a: 'Discarded uncapped in a sharps container', wrong: ['Recapped, then discarded', 'Bent, then discarded', 'Broken off the syringe'] },
  { topic: 'admin', q: 'Tuberculin and insulin syringes…', a: 'Should not be substituted for each other', wrong: ['Are interchangeable', 'Both measure units', 'Both hold 5 mL'] },
  { topic: 'admin', q: 'Most precise way to dose a child?', a: 'By weight in kilograms', wrong: ['By age in years', 'By height alone', 'Half the adult dose'] },
  { topic: 'admin', q: 'Which is a SYSTEMIC IV complication?', a: 'Pulmonary embolism', wrong: ['Phlebitis', 'Hematoma', 'Infiltration'] },
  { topic: 'admin', q: 'Conversion needed most often in emergency drug therapy?', a: 'Pounds to kilograms', wrong: ['Ounces to grams', 'Fahrenheit to Celsius', 'Inches to centimeters'] }
];

// Drug classes by body system (Ch. 13), for the reference page.
window.PHARM_CLASS_GROUPS = [
  { name: 'Nervous system', items: [
    ['Opioid analgesics', 'Morphine, fentanyl; antagonist naloxone'],
    ['Nonopioid analgesics', 'Acetaminophen, NSAIDs'],
    ['Anesthetics', 'General, regional, local'],
    ['Sedative-hypnotics', 'Benzodiazepines, barbiturates'],
    ['Anticonvulsants', 'Benzodiazepines and others'],
    ['CNS stimulants', 'Amphetamines, anorexiants'],
    ['Antipsychotics', 'Typical (first-generation), atypical (second-generation)'],
    ['Antidepressants', 'TCAs, SSRIs, MAOIs; lithium for mania'],
    ['Parkinson drugs', 'Anticholinergics, dopamine releasers and agonists'],
    ['Skeletal muscle relaxants', 'Central-acting, direct-acting, neuromuscular blockers']
  ] },
  { name: 'Cardiovascular & blood', items: [
    ['Cardiac glycosides', 'Digoxin; narrow therapeutic index'],
    ['Antidysrhythmics', 'Suppress automaticity'],
    ['Antihypertensives', 'Diuretics, sympathetic blockers, vasodilators, ACE inhibitors, CCBs, ARBs'],
    ['Antiplatelets', 'Aspirin'],
    ['Anticoagulants', 'Heparin, warfarin'],
    ['Fibrinolytics', 'Dissolve clots'],
    ['Antifibrinolytics', 'Tranexamic acid (TXA)'],
    ['Hemostatic agents', 'Systemic or topical'],
    ['Antihyperlipidemics', 'Lower cholesterol and triglycerides']
  ] },
  { name: 'Respiratory', items: [
    ['Bronchodilators', 'Sympathomimetic (albuterol), anticholinergic, xanthine'],
    ['Mucokinetics', 'Diluents, mucolytics, expectorants'],
    ['Other', 'Respiratory stimulants and depressants, cough suppressants, antihistamines']
  ] },
  { name: 'GI', items: [
    ['Antacids', 'Neutralize HCl'],
    ['H2-receptor antagonists', 'Famotidine, cimetidine, nizatidine'],
    ['Proton pump inhibitors', 'Omeprazole, pantoprazole (-prazole)'],
    ['Antiemetics', 'Ondansetron, promethazine, prochlorperazine, droperidol, diphenhydramine'],
    ['Cytoprotective agents', 'Sucralfate, misoprostol'],
    ['Laxatives and antidiarrheals', 'Lower GI tract']
  ] },
  { name: 'Other systems', items: [
    ['Eye', 'Antiglaucoma, mydriatics, anti-infectives, topical anesthetics (tetracaine)'],
    ['Endocrine', 'Pituitary, thyroid, adrenal cortex, pancreas (insulin, glucagon)'],
    ['Infection', 'Antibiotics, antifungals, antivirals, protease inhibitors'],
    ['Inflammation', 'NSAIDs, antipyretics'],
    ['Immune', 'Immunosuppressants, immunomodulators, serums and vaccines'],
    ['Neoplastic disease', 'Antineoplastics (chemotherapy)']
  ] }
];
