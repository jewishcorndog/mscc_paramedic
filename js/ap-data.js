/* Anatomy & Physiology content, from the standard paramedic A&P curriculum
   (no class slides for this chapter yet). Read by js/ap.js.

   AP_GROUPS     body systems, in study order
   AP_TOPICS     reference pages: about, key points, and why it matters in the field
   AP_TERMS      glossary (term → meaning)
   AP_FACTS      short questions with one right answer and three wrong ones
   AP_NORMALS    normal adult values, with three wrong ranges each
   AP_SCENARIOS  applied questions: what is going on in this patient's body? */
(function () {
  'use strict';

  window.AP_GROUPS = [
    { id: 'org', name: 'Body organization' },
    { id: 'cell', name: 'Cells & fluids' },
    { id: 'msk', name: 'Skin, bones & muscles' },
    { id: 'nerv', name: 'Nervous system' },
    { id: 'endo', name: 'Endocrine' },
    { id: 'cv', name: 'Heart & circulation' },
    { id: 'blood', name: 'Blood & immune' },
    { id: 'resp', name: 'Respiratory' },
    { id: 'gi', name: 'Abdomen & digestion' },
    { id: 'renal', name: 'Kidneys & electrolytes' },
    { id: 'repro', name: 'Reproductive' }
  ];

  window.AP_TOPICS = [
    // ---------- Body organization ----------
    {
      id: 'planes', group: 'org', name: 'Anatomical position, planes & directions',
      aliases: ['topographic anatomy', 'directional terms', 'sagittal', 'coronal', 'transverse'],
      about: ['Every location on the body is described from the anatomical position: standing, facing forward, arms at the sides, palms forward. Left and right always mean the patient\'s left and right.'],
      points: [
        'Midsagittal plane: splits the body into equal left and right halves (the midline).',
        'Frontal (coronal) plane: splits the body into front (anterior) and back (posterior).',
        'Transverse (axial) plane: splits the body into top (superior) and bottom (inferior).',
        'Medial is toward the midline, lateral is away from it.',
        'Proximal is closer to the trunk, distal is farther from it (used on limbs).',
        'Superficial is near the skin surface, deep is farther in.'
      ],
      field: [
        'Use these words in your radio report and PCR so the hospital can picture the injury: "2 cm laceration, anterior left forearm, 3 cm proximal to the wrist."',
        'Check distal pulses, motor and sensation below any extremity injury and after splinting.'
      ]
    },
    {
      id: 'positions', group: 'org', name: 'Patient positions',
      aliases: ['supine', 'prone', 'fowler', 'trendelenburg', 'recovery'],
      about: ['Body positions describe how the patient is lying or sitting, and they are also treatments.'],
      points: [
        'Supine: lying face up. Prone: lying face down.',
        'Lateral recumbent (recovery position): lying on the side, which helps keep the airway clear.',
        'Fowler: sitting up with the head at about 45 to 60 degrees. Semi-Fowler is less upright.',
        'Trendelenburg: supine with the feet higher than the head. Shock position: legs raised about 12 inches.',
        'Left lateral recumbent is the position for a late-pregnancy patient, to take the uterus off the vena cava.'
      ],
      field: [
        'Most short-of-breath patients want to sit up (Fowler or tripod).',
        'Document the position you found the patient in and the position you transported them in.'
      ]
    },
    {
      id: 'cavities', group: 'org', name: 'Body cavities & abdominal quadrants',
      aliases: ['thoracic cavity', 'abdominal cavity', 'quadrants', 'mediastinum', 'RUQ', 'LUQ'],
      about: ['The trunk has a thoracic cavity and an abdominopelvic cavity, separated by the diaphragm. The abdomen is split into four quadrants by lines through the umbilicus.'],
      points: [
        'Thoracic cavity: lungs, heart, great vessels, esophagus and trachea. The space between the lungs is the mediastinum.',
        'RUQ: liver, gallbladder, part of the colon.',
        'LUQ: stomach, spleen, part of the colon, tail of the pancreas.',
        'RLQ: appendix, ascending colon, right ovary in females.',
        'LLQ: descending and sigmoid colon, left ovary in females.',
        'The diaphragm rises to about the nipple line (4th to 5th intercostal space) on full exhalation, so lower chest wounds can injure abdominal organs.'
      ],
      field: [
        'Palpate the quadrant that hurts last.',
        'A penetrating wound below the nipple line may involve both the chest and the abdomen.'
      ]
    },
    {
      id: 'homeostasis', group: 'org', name: 'Homeostasis & feedback',
      aliases: ['negative feedback', 'positive feedback', 'compensation'],
      about: ['Homeostasis is the body keeping its internal environment (temperature, pH, glucose, blood pressure, fluid) stable. Most of the signs you see in a sick patient are the body\'s attempts to compensate.'],
      points: [
        'Negative feedback reverses a change: blood pressure falls, so heart rate and vasoconstriction increase to bring it back up. Most body systems work this way.',
        'Positive feedback amplifies a change until an event ends it: labor contractions (oxytocin) and blood clotting.',
        'The nervous system responds in seconds; the endocrine system is slower but lasts longer.',
        'Normal core temperature is about 98.6 °F (37 °C); the hypothalamus is the thermostat.'
      ],
      field: [
        'Tachycardia, pale cool skin and anxiety in a trauma patient are compensation, not stability. Decompensation (falling BP) comes late.'
      ]
    },

    // ---------- Cells & fluids ----------
    {
      id: 'cell', group: 'cell', name: 'The cell & tissues',
      aliases: ['cell membrane', 'mitochondria', 'nucleus', 'tissue types', 'organelles'],
      about: ['The cell is the basic unit of life. Groups of similar cells form tissues, tissues form organs, and organs work together as systems.'],
      points: [
        'Cell membrane: a selectively permeable phospholipid bilayer that controls what goes in and out.',
        'Nucleus: holds the DNA and directs the cell.',
        'Mitochondria: the "powerhouse," where aerobic metabolism makes ATP.',
        'Four tissue types: epithelial (covers and lines), connective (supports; includes bone, fat and blood), muscle (moves), nervous (conducts signals).'
      ],
      field: [
        'Every cell needs a steady supply of oxygen and glucose. Shock is a failure to deliver them, which is why perfusion is the center of patient care.'
      ]
    },
    {
      id: 'metabolism', group: 'cell', name: 'Aerobic & anaerobic metabolism',
      aliases: ['ATP', 'lactic acid', 'krebs', 'glycolysis', 'cellular respiration'],
      about: ['Cells burn glucose to make ATP, the energy molecule. How much ATP they get depends on whether oxygen is available.'],
      points: [
        'Aerobic metabolism (with oxygen): glucose + O₂ gives about 36 to 38 ATP, plus CO₂ and water.',
        'Anaerobic metabolism (without oxygen): glucose gives only 2 ATP and makes lactic acid.',
        'Without enough ATP, the sodium-potassium pump fails, cells swell and eventually die.',
        'Lactic acid build-up causes metabolic acidosis.'
      ],
      field: [
        'Hypoperfusion leads to anaerobic metabolism, then acidosis, then cell death. Oxygen and restoring perfusion break the cycle.'
      ]
    },
    {
      id: 'fluids', group: 'cell', name: 'Body water & fluid movement',
      aliases: ['osmosis', 'diffusion', 'tonicity', 'isotonic', 'hypotonic', 'hypertonic', 'intracellular', 'extracellular'],
      about: ['Water is about 60% of adult body weight. Two thirds of it is inside cells (intracellular); one third is outside (extracellular), split between the spaces between cells (interstitial) and the blood plasma (intravascular).'],
      points: [
        'Diffusion: molecules move from high concentration to low concentration, no energy needed.',
        'Osmosis: water moves across a membrane toward the side with more dissolved particles.',
        'Active transport uses ATP to move substances against their gradient (the sodium-potassium pump moves 3 Na⁺ out and 2 K⁺ in).',
        'Isotonic fluid (0.9% saline, lactated Ringer\'s) has the same concentration as plasma: no net shift into or out of cells.',
        'Hypotonic fluid draws water into cells (cells swell); hypertonic fluid draws water out of cells (cells shrink).',
        'Infants have a higher percentage of body water than adults, and older adults less, so both dehydrate quickly.'
      ],
      field: [
        'Isotonic crystalloids spread out of the vessels into the interstitial space, so only a fraction stays in the blood. That is why large volumes are not a substitute for stopping bleeding.'
      ]
    },

    // ---------- Skin, bones & muscles ----------
    {
      id: 'skin', group: 'msk', name: 'The skin',
      aliases: ['integumentary', 'epidermis', 'dermis', 'subcutaneous', 'burns'],
      about: ['The skin is the largest organ. It protects against infection, holds in fluid, senses the environment and regulates temperature.'],
      points: [
        'Epidermis: the outer layer; no blood vessels.',
        'Dermis: blood vessels, nerves, sweat and oil glands, hair follicles.',
        'Subcutaneous layer: fat and connective tissue that insulate and cushion.',
        'Temperature control: sweating, and widening or narrowing of skin blood vessels.',
        'Burn depth follows the layers: superficial (epidermis), partial thickness (into the dermis, blisters), full thickness (through the dermis, may be painless).'
      ],
      field: [
        'Skin color, temperature and moisture are a window on perfusion: pale, cool and clammy means the body is shunting blood away from the skin.',
        'Burns destroy the barrier, so patients lose fluid and heat and get infected.'
      ]
    },
    {
      id: 'skeleton', group: 'msk', name: 'The skeleton & joints',
      aliases: ['bones', 'vertebrae', 'spine', 'axial', 'appendicular', 'ligament', 'joint'],
      about: ['The adult skeleton has 206 bones. It supports and protects the body, lets it move, stores calcium and makes blood cells in the red marrow.'],
      points: [
        'Axial skeleton: skull, spine, ribs and sternum. Appendicular skeleton: arms, legs, shoulder and pelvic girdles.',
        'Spine: 7 cervical, 12 thoracic, 5 lumbar, 5 fused sacral and 4 fused coccygeal vertebrae (33).',
        '12 pairs of ribs attach to the 12 thoracic vertebrae.',
        'The femur is the longest and strongest bone; a femur fracture can lose 1 to 1.5 L of blood into the thigh.',
        'Ligaments connect bone to bone; tendons connect muscle to bone; cartilage cushions joint surfaces.'
      ],
      field: [
        'Pelvic and femur fractures can bleed enough to cause shock. Stabilize them to limit blood loss.',
        'A sprain is a ligament injury; a strain is a muscle or tendon injury.'
      ]
    },
    {
      id: 'muscle', group: 'msk', name: 'Muscle types',
      aliases: ['skeletal', 'smooth', 'cardiac', 'striated', 'voluntary'],
      about: ['There are three kinds of muscle, each with a different job and control.'],
      points: [
        'Skeletal muscle: voluntary, striated; moves the bones.',
        'Smooth muscle: involuntary; in the walls of blood vessels, airways, the GI tract and the bladder.',
        'Cardiac muscle: involuntary, striated, found only in the heart; it has automaticity (makes its own impulses).',
        'Muscle contraction needs calcium and ATP.'
      ],
      field: [
        'Bronchospasm in asthma and vasoconstriction in shock are smooth muscle at work, which is why drugs that relax smooth muscle (beta-2 agonists) open the airways.'
      ]
    },

    // ---------- Nervous system ----------
    {
      id: 'ns-divisions', group: 'nerv', name: 'Divisions of the nervous system',
      aliases: ['CNS', 'PNS', 'autonomic', 'somatic', 'sympathetic', 'parasympathetic'],
      about: ['The central nervous system (CNS) is the brain and spinal cord. The peripheral nervous system (PNS) is every nerve outside them: 12 pairs of cranial nerves and 31 pairs of spinal nerves.'],
      points: [
        'Somatic nervous system: voluntary control of skeletal muscle.',
        'Autonomic nervous system: automatic control of the organs, with two branches.',
        'Sympathetic ("fight or flight"): raises heart rate and BP, dilates the bronchioles and pupils, shunts blood away from the gut and skin. Neurotransmitter norepinephrine (and epinephrine from the adrenals).',
        'Parasympathetic ("rest and digest"): slows the heart, increases digestion, constricts the pupils. Carried mostly by the vagus nerve (cranial nerve X); neurotransmitter acetylcholine.',
        'Receptors: alpha-1 constricts vessels; beta-1 increases heart rate and contractility; beta-2 dilates bronchioles.'
      ],
      field: [
        'Many drugs work by mimicking or blocking these branches: epinephrine is sympathetic, atropine blocks the parasympathetic.',
        'Vagal stimulation (bearing down, vomiting, suctioning) can drop the heart rate suddenly.'
      ]
    },
    {
      id: 'brain', group: 'nerv', name: 'The brain & its coverings',
      aliases: ['cerebrum', 'cerebellum', 'brainstem', 'medulla', 'meninges', 'CSF'],
      about: ['The brain uses about 20% of the body\'s oxygen and has almost no stored glucose, so it is the first organ to show hypoxia or hypoglycemia.'],
      points: [
        'Cerebrum: thought, memory, speech, voluntary movement and sensation. Each side controls the opposite side of the body.',
        'Cerebellum: coordination, balance and fine motor control.',
        'Brainstem (midbrain, pons, medulla): consciousness and the automatic centers for breathing, heart rate and blood pressure.',
        'Hypothalamus: temperature, thirst, hunger, and control of the pituitary.',
        'Meninges, outside in: dura mater, arachnoid, pia mater. Cerebrospinal fluid (CSF) in the subarachnoid space cushions the brain.'
      ],
      field: [
        'Altered mental status is often the first sign of shock, hypoxia or hypoglycemia. Check oxygen and glucose early.',
        'A stroke on the left side of the brain causes right-sided weakness (and often speech problems).'
      ]
    },
    {
      id: 'spinal-cord', group: 'nerv', name: 'Spinal cord & spinal nerves',
      aliases: ['dermatome', 'phrenic', 'reflex', 'spinal nerves'],
      about: ['The spinal cord carries signals between the brain and body and handles simple reflexes. It runs inside the vertebral canal and ends at about L1 to L2.'],
      points: [
        'Spinal nerves exit between the vertebrae; each supplies a strip of skin called a dermatome.',
        'Landmark dermatomes: C3 to C4 collarbone, T4 nipple line, T10 umbilicus.',
        'The phrenic nerve (C3, C4, C5) runs the diaphragm: "C3, 4, 5 keeps the diaphragm alive."',
        'Intercostal muscles are supplied by thoracic nerves, so a low cervical injury leaves only diaphragmatic (belly) breathing.'
      ],
      field: [
        'Use dermatomes to find the level of a spinal injury: where sensation stops.',
        'A high cervical injury (C3 to C5 or above) can stop breathing entirely.'
      ]
    },

    // ---------- Endocrine ----------
    {
      id: 'glands', group: 'endo', name: 'Endocrine glands & hormones',
      aliases: ['pituitary', 'thyroid', 'adrenal', 'hypothalamus', 'ADH', 'cortisol', 'parathyroid'],
      about: ['Endocrine glands release hormones into the blood. Each hormone acts only on cells with a matching receptor.'],
      points: [
        'Hypothalamus: links the nervous and endocrine systems and directs the pituitary.',
        'Pituitary ("master gland"): growth hormone, TSH, ACTH; the posterior pituitary releases ADH and oxytocin.',
        'Thyroid: T3 and T4 set the metabolic rate.',
        'Parathyroids: parathyroid hormone raises blood calcium.',
        'Adrenal medulla: epinephrine and norepinephrine (fight or flight).',
        'Adrenal cortex: cortisol (stress, raises glucose) and aldosterone (keeps sodium and water, gets rid of potassium).'
      ],
      field: [
        'Fever, tachycardia and agitation in a thyroid patient can be thyroid storm; cold, slow and sluggish can be myxedema.',
        'Patients on long-term steroids may not be able to make enough cortisol under stress (adrenal crisis).'
      ]
    },
    {
      id: 'pancreas', group: 'endo', name: 'Pancreas & blood glucose',
      aliases: ['insulin', 'glucagon', 'islets', 'diabetes', 'glucose', 'glycogen'],
      about: ['The islets of Langerhans in the pancreas keep blood glucose in a narrow range with two opposing hormones.'],
      points: [
        'Beta cells make insulin: it lets glucose into most cells and lowers blood glucose.',
        'Alpha cells make glucagon: it makes the liver break glycogen into glucose and raises blood glucose.',
        'Extra glucose is stored as glycogen in the liver and muscle.',
        'The brain uses glucose without needing insulin, but it cannot store it.',
        'Without insulin, cells burn fat instead, making ketones (ketoacidosis).'
      ],
      field: [
        'Too much insulin, or not enough food, gives hypoglycemia: confusion, sweating, seizures. Check a glucose on every altered patient.',
        'Glucagon IM works only if the liver has glycogen stores to release.'
      ]
    },

    // ---------- Heart & circulation ----------
    {
      id: 'heart', group: 'cv', name: 'The heart: chambers, valves & blood flow',
      aliases: ['atria', 'ventricles', 'valves', 'pericardium', 'myocardium', 'blood flow'],
      about: ['The heart is two pumps side by side. The right side pumps to the lungs (pulmonary circulation); the left side pumps to the body (systemic circulation).'],
      points: [
        'Layers: pericardium (sac), epicardium, myocardium (muscle), endocardium (lining).',
        'Flow: vena cava → right atrium → tricuspid valve → right ventricle → pulmonic valve → pulmonary arteries → lungs.',
        'Then: pulmonary veins → left atrium → mitral valve → left ventricle → aortic valve → aorta → body.',
        'Pulmonary arteries carry deoxygenated blood; pulmonary veins carry oxygenated blood.',
        'The left ventricle has the thickest wall because it pumps against systemic pressure.',
        'Coronary arteries branch off the aorta and fill mostly during diastole.'
      ],
      field: [
        'Left-sided failure backs blood up into the lungs (crackles, pulmonary edema); right-sided failure backs it up into the body (JVD, pedal edema).',
        'Fast heart rates shorten diastole, which cuts coronary filling and ventricular filling.'
      ]
    },
    {
      id: 'output', group: 'cv', name: 'Cardiac output & blood pressure',
      aliases: ['stroke volume', 'preload', 'afterload', 'Starling', 'MAP', 'perfusion'],
      about: ['Cardiac output is how much blood the heart pumps in a minute: heart rate × stroke volume. Blood pressure is cardiac output × systemic vascular resistance.'],
      points: [
        'Stroke volume (about 70 mL) depends on preload, contractility and afterload.',
        'Preload: the volume (stretch) in the ventricle before it contracts.',
        'Afterload: the resistance the ventricle pumps against.',
        'Frank-Starling law: more stretch gives a stronger contraction, up to a point.',
        'Mean arterial pressure ≈ diastolic + ⅓ of the pulse pressure; a MAP of about 60 to 65 mmHg is needed to perfuse the organs.',
        'Baroreceptors in the aortic arch and carotid sinus sense pressure and adjust heart rate and vessel tone.'
      ],
      field: [
        'Fluid raises preload; nitroglycerin lowers it. Vasoconstriction raises afterload.',
        'Shock is inadequate perfusion; blood pressure can stay normal while the body compensates.'
      ]
    },
    {
      id: 'vessels', group: 'cv', name: 'Blood vessels',
      aliases: ['arteries', 'veins', 'capillaries', 'arterioles', 'pulses'],
      about: ['Arteries carry blood away from the heart, veins carry it back, and capillaries connect them where exchange with the tissues happens.'],
      points: [
        'Arteries: thick, muscular walls under high pressure. Arterioles control resistance and where blood goes.',
        'Capillaries: one cell thick; oxygen, nutrients and waste diffuse across.',
        'Veins: thin walls, low pressure, with one-way valves. They hold most of the blood volume (capacitance vessels).',
        'Pulse points: carotid, brachial, radial, femoral, popliteal, posterior tibial, dorsalis pedis.'
      ],
      field: [
        'Arterial bleeding spurts bright red; venous bleeding flows dark red; capillary bleeding oozes.',
        'Losing peripheral pulses while central pulses remain is a sign of worsening shock.'
      ]
    },

    // ---------- Blood & immune ----------
    {
      id: 'blood', group: 'blood', name: 'Blood components',
      aliases: ['plasma', 'RBC', 'WBC', 'platelets', 'hemoglobin', 'hematocrit', 'blood types'],
      about: ['An adult has about 70 mL of blood per kilogram (about 5 to 6 L). Blood is about 55% plasma and 45% formed elements.'],
      points: [
        'Plasma: mostly water, with proteins (albumin, clotting factors), electrolytes and glucose.',
        'Red blood cells: carry oxygen on hemoglobin; live about 120 days.',
        'White blood cells: fight infection; neutrophils are the most common.',
        'Platelets: form a plug at the site of injury and start clotting.',
        'Clotting: vessel spasm, platelet plug, then the coagulation cascade forms fibrin to make a stable clot.',
        'O negative is the universal donor for red cells; AB positive is the universal recipient.'
      ],
      field: [
        'Hypothermia, acidosis and dilution with fluids all weaken clotting in trauma patients.',
        'Patients on anticoagulants bleed more and longer from minor injuries.'
      ]
    },
    {
      id: 'immune', group: 'blood', name: 'Lymphatic & immune systems',
      aliases: ['lymph', 'spleen', 'antibody', 'antigen', 'immunity', 'inflammation'],
      about: ['The lymphatic system returns extra tissue fluid to the blood and carries white blood cells. The spleen, lymph nodes, tonsils and thymus are lymphatic organs.'],
      points: [
        'Spleen (LUQ): filters blood, removes old red cells, and stores blood and platelets.',
        'Innate immunity is fast and general: skin, inflammation, neutrophils.',
        'Acquired immunity is specific and has memory: B cells make antibodies, T cells attack infected cells.',
        'An antigen is what the immune system recognizes; an antibody is the protein made to bind it.',
        'Inflammation: redness, heat, swelling, pain, from vessels dilating and leaking.'
      ],
      field: [
        'Anaphylaxis is a massive, body-wide immune reaction: histamine dilates vessels and makes them leak, and constricts the airways.',
        'The spleen is very vascular and bleeds heavily when injured.'
      ]
    },

    // ---------- Respiratory ----------
    {
      id: 'airway', group: 'resp', name: 'Upper & lower airway',
      aliases: ['larynx', 'trachea', 'epiglottis', 'bronchi', 'alveoli', 'carina'],
      about: ['The upper airway warms, filters and humidifies air. The lower airway starts below the vocal cords and ends at the alveoli, where gas exchange happens.'],
      points: [
        'Upper airway: nose, mouth, pharynx, larynx. The epiglottis covers the glottis when swallowing.',
        'The cricoid cartilage is the only complete ring of cartilage in the airway.',
        'The trachea splits at the carina into the right and left mainstem bronchi.',
        'The right mainstem bronchus is shorter, wider and more vertical, so aspirated objects and deep tubes go right.',
        'Bronchi → bronchioles (smooth muscle, no cartilage) → alveoli.',
        'Alveoli are coated with surfactant, which keeps them from collapsing.'
      ],
      field: [
        'Children have a larger tongue, a narrower airway and a floppy epiglottis, so small amounts of swelling obstruct them quickly.',
        'After intubation, listen for equal breath sounds; absent left-side sounds often mean the tube is in the right mainstem.'
      ]
    },
    {
      id: 'breathing', group: 'resp', name: 'Ventilation, respiration & control',
      aliases: ['tidal volume', 'minute volume', 'dead space', 'diaphragm', 'chemoreceptors', 'pleura', 'gas exchange'],
      about: ['Ventilation is moving air in and out. Respiration is gas exchange: oxygen into the blood and CO₂ out, in the lungs (external) and at the cells (internal).'],
      points: [
        'Inhalation is active: the diaphragm contracts and flattens and the intercostals lift the ribs, so pressure in the chest falls and air flows in. Exhalation is normally passive.',
        'The lungs are covered by visceral pleura and the chest wall is lined by parietal pleura; the pleural space between them is at negative pressure.',
        'Tidal volume is about 500 mL (5 to 7 mL/kg); about 150 mL of each breath stays in the dead space.',
        'Minute volume = tidal volume × respiratory rate.',
        'The breathing centers are in the medulla and pons. The main drive to breathe is the CO₂ level (sensed as pH by chemoreceptors).',
        'Oxygen is mostly carried bound to hemoglobin; CO₂ is mostly carried as bicarbonate.'
      ],
      field: [
        'Fast, shallow breathing can look like a lot of breathing but move very little air past the dead space.',
        'Air or blood in the pleural space breaks the seal and collapses the lung (pneumothorax, hemothorax).'
      ]
    },

    // ---------- Abdomen & digestion ----------
    {
      id: 'gi-tract', group: 'gi', name: 'The digestive tract',
      aliases: ['esophagus', 'stomach', 'intestine', 'colon', 'peristalsis'],
      about: ['The GI tract is a hollow tube from mouth to anus. Food is moved along by peristalsis (waves of smooth muscle contraction).'],
      points: [
        'Esophagus: carries food from the pharynx to the stomach, behind the trachea.',
        'Stomach (LUQ): acid and enzymes begin breaking down protein.',
        'Small intestine (duodenum, jejunum, ileum): where most digestion and absorption of nutrients happen.',
        'Large intestine (colon): absorbs water and forms stool.',
        'Appendix: hangs off the start of the colon in the RLQ.'
      ],
      field: [
        'Hollow organs (stomach, intestines, bladder) spill their contents when injured, causing peritonitis.',
        'Coffee-ground emesis or black tarry stool means upper GI bleeding; bright red blood per rectum is usually lower GI.'
      ]
    },
    {
      id: 'solid-organs', group: 'gi', name: 'Solid organs & the peritoneum',
      aliases: ['liver', 'gallbladder', 'pancreas', 'spleen', 'retroperitoneal', 'peritoneum', 'referred pain'],
      about: ['Solid organs have a rich blood supply and bleed when injured. The peritoneum lines the abdominal cavity; some organs sit behind it in the retroperitoneum.'],
      points: [
        'Liver (RUQ): makes bile and clotting factors, stores glycogen, and clears drugs and toxins.',
        'Gallbladder: stores bile and squeezes it out after a fatty meal.',
        'Pancreas: digestive enzymes (exocrine) and insulin and glucagon (endocrine).',
        'Retroperitoneal organs: kidneys, pancreas, most of the duodenum, aorta and inferior vena cava.',
        'Referred pain: gallbladder to the right shoulder; spleen or blood under the diaphragm to the left shoulder (Kehr sign).'
      ],
      field: [
        'Large blood loss into the abdomen or retroperitoneum may show little on the outside; trust the vital signs and mechanism.'
      ]
    },

    // ---------- Kidneys & electrolytes ----------
    {
      id: 'urinary', group: 'renal', name: 'The urinary system',
      aliases: ['kidney', 'nephron', 'ureter', 'bladder', 'urethra', 'renin', 'RAAS'],
      about: ['The kidneys filter the blood, make urine, and control fluid volume, electrolytes, acid-base balance and blood pressure. They sit in the retroperitoneum at about T12 to L3.'],
      points: [
        'The nephron is the working unit; the glomerulus is where blood is filtered.',
        'Urine flows kidney → ureter → bladder → urethra.',
        'Low kidney perfusion releases renin, which leads to angiotensin II (strong vasoconstrictor) and aldosterone (keeps sodium and water). This is the renin-angiotensin-aldosterone system (RAAS).',
        'ADH from the posterior pituitary makes the kidneys hold on to water.',
        'Normal urine output is at least 0.5 mL/kg/hr (about 30 mL/hr for an adult).'
      ],
      field: [
        'Low urine output is a sign of poor perfusion.',
        'Dialysis patients cannot get rid of potassium or fluid; watch for hyperkalemia and fluid overload.'
      ]
    },
    {
      id: 'electrolytes', group: 'renal', name: 'Electrolytes & acid-base balance',
      aliases: ['sodium', 'potassium', 'calcium', 'pH', 'buffer', 'bicarbonate'],
      about: ['Electrolytes are charged particles (ions) dissolved in body water. They control fluid shifts, nerve signals and muscle contraction.'],
      points: [
        'Sodium (Na⁺): the main extracellular cation; where sodium goes, water follows.',
        'Potassium (K⁺): the main intracellular cation; critical for heart rhythm.',
        'Calcium (Ca²⁺): muscle contraction, clotting, nerve signals.',
        'Normal blood pH is 7.35 to 7.45. Below is acidosis; above is alkalosis.',
        'Three systems control pH: bicarbonate buffer (seconds), lungs by blowing off CO₂ (minutes), kidneys by moving H⁺ and bicarbonate (hours to days).'
      ],
      field: [
        'High or low potassium shows up on the ECG (peaked T waves with high potassium).',
        'A patient in metabolic acidosis breathes fast and deep to blow off CO₂.'
      ]
    },

    // ---------- Reproductive ----------
    {
      id: 'female', group: 'repro', name: 'Female reproductive system',
      aliases: ['ovary', 'uterus', 'fallopian', 'cervix', 'menstrual cycle', 'ovulation'],
      about: ['The female reproductive organs sit in the pelvis: ovaries, fallopian tubes, uterus, cervix and vagina.'],
      points: [
        'Ovaries make eggs and the hormones estrogen and progesterone.',
        'Fallopian tubes carry the egg to the uterus; fertilization normally happens in the tube.',
        'The menstrual cycle is about 28 days, with ovulation around day 14.',
        'An ectopic pregnancy implants outside the uterus, most often in a fallopian tube, and can rupture and bleed heavily.'
      ],
      field: [
        'Any female of childbearing age with lower abdominal pain, vaginal bleeding or signs of shock may have a ruptured ectopic pregnancy.'
      ]
    },
    {
      id: 'pregnancy', group: 'repro', name: 'Pregnancy changes & the fetus',
      aliases: ['placenta', 'umbilical cord', 'amniotic', 'supine hypotension', 'third trimester'],
      about: ['Pregnancy changes almost every system, and those changes alter how a pregnant patient looks when sick or injured.'],
      points: [
        'The placenta exchanges oxygen, nutrients and waste between mother and fetus; the blood supplies do not mix.',
        'Umbilical cord: two arteries and one vein. The vein carries oxygenated blood to the fetus.',
        'The amniotic sac and fluid cushion the fetus.',
        'Blood volume rises 30 to 50% and heart rate rises 10 to 20 beats per minute.',
        'After about 20 weeks, lying supine lets the uterus press on the inferior vena cava and drop the blood pressure (supine hypotensive syndrome).'
      ],
      field: [
        'A pregnant patient can lose a lot of blood before her vital signs change, and the fetus is already being shorted.',
        'Transport late-pregnancy patients on the left side, or tilt the board.'
      ]
    },
    {
      id: 'male', group: 'repro', name: 'Male reproductive system',
      aliases: ['testes', 'prostate', 'scrotum', 'testicular torsion'],
      about: ['The male reproductive organs are the testes, the ducts that carry sperm, the prostate and other glands, and the penis.'],
      points: [
        'Testes make sperm and testosterone and sit outside the body in the scrotum to stay cooler.',
        'The prostate wraps around the urethra below the bladder; enlargement can block urine flow.',
        'The urethra carries both urine and semen in males.'
      ],
      field: [
        'Sudden, severe testicular pain can be testicular torsion, which needs surgery within hours to save the testicle.'
      ]
    }
  ];

  window.AP_TERMS = [
    // Body organization
    { group: 'org', term: 'Anatomical position', def: 'Standing, facing forward, arms at the sides, palms forward. The reference position for all directional terms.' },
    { group: 'org', term: 'Midsagittal plane', def: 'Divides the body into equal left and right halves.' },
    { group: 'org', term: 'Frontal (coronal) plane', def: 'Divides the body into front and back portions.' },
    { group: 'org', term: 'Transverse (axial) plane', def: 'Divides the body into top and bottom portions.' },
    { group: 'org', term: 'Medial', def: 'Closer to the midline of the body.' },
    { group: 'org', term: 'Lateral', def: 'Farther from the midline of the body.' },
    { group: 'org', term: 'Proximal', def: 'Closer to the trunk, or to the point of attachment of a limb.' },
    { group: 'org', term: 'Distal', def: 'Farther from the trunk, or from the point of attachment of a limb.' },
    { group: 'org', term: 'Anterior (ventral)', def: 'Toward the front of the body.' },
    { group: 'org', term: 'Posterior (dorsal)', def: 'Toward the back of the body.' },
    { group: 'org', term: 'Supine', def: 'Lying face up.' },
    { group: 'org', term: 'Prone', def: 'Lying face down.' },
    { group: 'org', term: 'Fowler position', def: 'Sitting up with the head elevated about 45 to 60 degrees.' },
    { group: 'org', term: 'Trendelenburg position', def: 'Lying supine with the feet higher than the head.' },
    { group: 'org', term: 'Mediastinum', def: 'The space in the middle of the chest between the lungs, holding the heart, great vessels, trachea and esophagus.' },
    { group: 'org', term: 'Homeostasis', def: 'The body keeping a stable internal environment despite outside changes.' },
    { group: 'org', term: 'Negative feedback', def: 'A control loop that reverses a change to bring a value back to normal.' },

    // Cells & fluids
    { group: 'cell', term: 'Cell membrane', def: 'Selectively permeable phospholipid bilayer that surrounds the cell and controls what enters and leaves.' },
    { group: 'cell', term: 'Mitochondria', def: 'Organelles where aerobic metabolism produces most of the cell\'s ATP.' },
    { group: 'cell', term: 'ATP', aliases: ['adenosine triphosphate'], def: 'Adenosine triphosphate, the energy molecule cells use to power their work.' },
    { group: 'cell', term: 'Aerobic metabolism', def: 'Breaking down glucose with oxygen; yields about 36 to 38 ATP plus CO₂ and water.' },
    { group: 'cell', term: 'Anaerobic metabolism', def: 'Breaking down glucose without oxygen; yields only 2 ATP and produces lactic acid.' },
    { group: 'cell', term: 'Diffusion', def: 'Movement of molecules from an area of higher concentration to lower concentration.' },
    { group: 'cell', term: 'Osmosis', def: 'Movement of water across a semipermeable membrane toward the side with more dissolved particles.' },
    { group: 'cell', term: 'Active transport', def: 'Moving a substance against its concentration gradient using energy (ATP).' },
    { group: 'cell', term: 'Isotonic', def: 'A solution with the same concentration of particles as the cell or plasma; no net water shift.' },
    { group: 'cell', term: 'Hypotonic', def: 'A solution with fewer particles than the cell; water moves into the cell and it swells.' },
    { group: 'cell', term: 'Hypertonic', def: 'A solution with more particles than the cell; water moves out and the cell shrinks.' },
    { group: 'cell', term: 'Intracellular fluid', def: 'Fluid inside the cells; about two thirds of total body water.' },
    { group: 'cell', term: 'Interstitial fluid', def: 'Fluid in the spaces between the cells, outside the blood vessels.' },

    // Skin, bones & muscles
    { group: 'msk', term: 'Epidermis', def: 'Outer layer of the skin; has no blood vessels.' },
    { group: 'msk', term: 'Dermis', def: 'Skin layer under the epidermis containing blood vessels, nerves, glands and hair follicles.' },
    { group: 'msk', term: 'Subcutaneous tissue', def: 'Layer of fat and connective tissue under the skin that insulates and cushions.' },
    { group: 'msk', term: 'Ligament', def: 'Connective tissue that connects bone to bone.' },
    { group: 'msk', term: 'Tendon', def: 'Connective tissue that connects muscle to bone.' },
    { group: 'msk', term: 'Cartilage', def: 'Smooth, tough connective tissue that cushions joint surfaces and shapes the nose, ears and airway rings.' },
    { group: 'msk', term: 'Axial skeleton', def: 'The skull, spine, ribs and sternum.' },
    { group: 'msk', term: 'Appendicular skeleton', def: 'The bones of the arms and legs plus the shoulder and pelvic girdles.' },
    { group: 'msk', term: 'Skeletal muscle', def: 'Voluntary, striated muscle that moves the bones.' },
    { group: 'msk', term: 'Smooth muscle', def: 'Involuntary muscle in the walls of blood vessels, airways and the GI tract.' },
    { group: 'msk', term: 'Cardiac muscle', def: 'Involuntary, striated muscle found only in the heart, with automaticity.' },

    // Nervous system
    { group: 'nerv', term: 'Central nervous system (CNS)', def: 'The brain and spinal cord.' },
    { group: 'nerv', term: 'Peripheral nervous system (PNS)', def: 'All nerves outside the brain and spinal cord, including the cranial and spinal nerves.' },
    { group: 'nerv', term: 'Sympathetic nervous system', def: 'Autonomic branch for "fight or flight": raises heart rate and BP, dilates bronchioles and pupils.' },
    { group: 'nerv', term: 'Parasympathetic nervous system', def: 'Autonomic branch for "rest and digest": slows the heart and promotes digestion, mainly via the vagus nerve.' },
    { group: 'nerv', term: 'Vagus nerve', def: 'Cranial nerve X; the main parasympathetic nerve to the heart, lungs and gut.' },
    { group: 'nerv', term: 'Cerebrum', def: 'Largest part of the brain; thought, memory, speech, voluntary movement and sensation.' },
    { group: 'nerv', term: 'Cerebellum', def: 'Part of the brain that controls coordination, balance and fine movement.' },
    { group: 'nerv', term: 'Brainstem', def: 'Midbrain, pons and medulla; controls consciousness, breathing, heart rate and blood pressure.' },
    { group: 'nerv', term: 'Meninges', def: 'The three membranes covering the brain and spinal cord: dura mater, arachnoid and pia mater.' },
    { group: 'nerv', term: 'Cerebrospinal fluid (CSF)', def: 'Clear fluid in the subarachnoid space and ventricles that cushions the brain and spinal cord.' },
    { group: 'nerv', term: 'Dermatome', def: 'The area of skin supplied by a single spinal nerve.' },
    { group: 'nerv', term: 'Neurotransmitter', def: 'A chemical released at a synapse that carries the signal from one nerve cell to the next cell.' },
    { group: 'nerv', term: 'Acetylcholine', def: 'Neurotransmitter of the parasympathetic system and of the nerve-to-skeletal-muscle junction.' },

    // Endocrine
    { group: 'endo', term: 'Hormone', def: 'A chemical messenger released by a gland into the blood that acts on distant target cells.' },
    { group: 'endo', term: 'Pituitary gland', def: 'The "master gland" at the base of the brain that controls many other endocrine glands.' },
    { group: 'endo', term: 'Hypothalamus', def: 'Brain region that links the nervous and endocrine systems and regulates temperature, thirst and hunger.' },
    { group: 'endo', term: 'Thyroid gland', def: 'Gland in the neck whose hormones (T3, T4) set the body\'s metabolic rate.' },
    { group: 'endo', term: 'Adrenal medulla', def: 'Inner part of the adrenal gland; releases epinephrine and norepinephrine.' },
    { group: 'endo', term: 'Adrenal cortex', def: 'Outer part of the adrenal gland; releases cortisol and aldosterone.' },
    { group: 'endo', term: 'Insulin', def: 'Hormone from pancreatic beta cells that moves glucose into cells and lowers blood glucose.' },
    { group: 'endo', term: 'Glucagon', def: 'Hormone from pancreatic alpha cells that makes the liver release glucose, raising blood glucose.' },
    { group: 'endo', term: 'Glycogen', def: 'The stored form of glucose, kept in the liver and skeletal muscle.' },
    { group: 'endo', term: 'Antidiuretic hormone (ADH)', def: 'Hormone from the posterior pituitary that makes the kidneys reabsorb water.' },
    { group: 'endo', term: 'Aldosterone', def: 'Adrenal cortex hormone that makes the kidneys keep sodium and water and excrete potassium.' },
    { group: 'endo', term: 'Cortisol', def: 'Adrenal cortex stress hormone that raises blood glucose and suppresses inflammation.' },

    // Heart & circulation
    { group: 'cv', term: 'Pericardium', def: 'The two-layered sac surrounding the heart.' },
    { group: 'cv', term: 'Myocardium', def: 'The heart muscle layer.' },
    { group: 'cv', term: 'Atria', def: 'The two upper chambers of the heart, which receive blood.' },
    { group: 'cv', term: 'Ventricles', def: 'The two lower chambers of the heart, which pump blood out.' },
    { group: 'cv', term: 'Tricuspid valve', def: 'Valve between the right atrium and right ventricle.' },
    { group: 'cv', term: 'Mitral (bicuspid) valve', def: 'Valve between the left atrium and left ventricle.' },
    { group: 'cv', term: 'Stroke volume', def: 'The amount of blood ejected by the ventricle in one contraction (about 70 mL).' },
    { group: 'cv', term: 'Cardiac output', def: 'The amount of blood pumped per minute: heart rate × stroke volume.' },
    { group: 'cv', term: 'Preload', def: 'The volume and stretch in the ventricle at the end of filling, before it contracts.' },
    { group: 'cv', term: 'Afterload', def: 'The resistance the ventricle must pump against to eject blood.' },
    { group: 'cv', term: 'Frank-Starling law', def: 'The more the heart muscle is stretched by filling, the stronger it contracts, up to a limit.' },
    { group: 'cv', term: 'Systole', def: 'The contraction phase of the cardiac cycle.' },
    { group: 'cv', term: 'Diastole', def: 'The relaxation and filling phase of the cardiac cycle; when the coronary arteries fill.' },
    { group: 'cv', term: 'Perfusion', def: 'Circulation of blood through the tissues, delivering oxygen and nutrients and removing waste.' },
    { group: 'cv', term: 'Baroreceptors', def: 'Pressure sensors in the aortic arch and carotid sinuses that adjust heart rate and vessel tone.' },
    { group: 'cv', term: 'Capillaries', def: 'The smallest vessels, one cell thick, where oxygen and waste are exchanged with the tissues.' },

    // Blood & immune
    { group: 'blood', term: 'Plasma', def: 'The liquid part of blood: water with proteins, electrolytes, glucose and clotting factors.' },
    { group: 'blood', term: 'Erythrocytes', def: 'Red blood cells; carry oxygen bound to hemoglobin.' },
    { group: 'blood', term: 'Leukocytes', def: 'White blood cells; defend the body against infection.' },
    { group: 'blood', term: 'Platelets (thrombocytes)', def: 'Cell fragments that clump at an injury to form a plug and start clotting.' },
    { group: 'blood', term: 'Hemoglobin', def: 'Iron-containing protein in red blood cells that binds and carries oxygen.' },
    { group: 'blood', term: 'Hematocrit', def: 'The percentage of blood volume made up of red blood cells.' },
    { group: 'blood', term: 'Fibrin', def: 'Protein strands formed at the end of the clotting cascade that bind the clot together.' },
    { group: 'blood', term: 'Spleen', def: 'LUQ organ that filters blood, removes old red cells and stores blood and platelets.' },
    { group: 'blood', term: 'Antigen', def: 'A substance the immune system recognizes as foreign and responds to.' },
    { group: 'blood', term: 'Antibody', def: 'A protein made by B cells that binds a specific antigen.' },
    { group: 'blood', term: 'Histamine', def: 'Chemical released by mast cells that dilates blood vessels, makes them leaky and constricts the airways.' },

    // Respiratory
    { group: 'resp', term: 'Epiglottis', def: 'Leaf-shaped flap that covers the glottis during swallowing.' },
    { group: 'resp', term: 'Glottis', def: 'The opening between the vocal cords; the boundary of the upper and lower airway.' },
    { group: 'resp', term: 'Cricoid cartilage', def: 'The only complete ring of cartilage in the airway, just below the thyroid cartilage.' },
    { group: 'resp', term: 'Carina', def: 'The point where the trachea divides into the right and left mainstem bronchi.' },
    { group: 'resp', term: 'Bronchioles', def: 'Small airways with smooth muscle and no cartilage, leading to the alveoli.' },
    { group: 'resp', term: 'Alveoli', def: 'Tiny air sacs where oxygen and carbon dioxide are exchanged with the capillaries.' },
    { group: 'resp', term: 'Surfactant', def: 'Substance lining the alveoli that lowers surface tension and keeps them from collapsing.' },
    { group: 'resp', term: 'Pleura', def: 'The membranes covering the lungs (visceral) and lining the chest wall (parietal).' },
    { group: 'resp', term: 'Tidal volume', def: 'The amount of air moved in one normal breath (about 500 mL in an adult).' },
    { group: 'resp', term: 'Minute volume', def: 'The amount of air moved in one minute: tidal volume × respiratory rate.' },
    { group: 'resp', term: 'Dead space', def: 'Air in the airways that never reaches the alveoli for gas exchange (about 150 mL).' },
    { group: 'resp', term: 'Ventilation', def: 'Moving air into and out of the lungs.' },
    { group: 'resp', term: 'Respiration', def: 'Gas exchange: oxygen into the blood and carbon dioxide out, at the lungs and at the cells.' },
    { group: 'resp', term: 'Chemoreceptors', def: 'Sensors in the brainstem, aorta and carotids that detect CO₂, pH and oxygen levels and adjust breathing.' },

    // Abdomen & digestion
    { group: 'gi', term: 'Peritoneum', def: 'The membrane lining the abdominal cavity and covering most abdominal organs.' },
    { group: 'gi', term: 'Retroperitoneum', def: 'The space behind the peritoneum holding the kidneys, pancreas, aorta and vena cava.' },
    { group: 'gi', term: 'Peristalsis', def: 'Waves of smooth muscle contraction that push food through the GI tract.' },
    { group: 'gi', term: 'Small intestine', def: 'The duodenum, jejunum and ileum, where most digestion and nutrient absorption happen.' },
    { group: 'gi', term: 'Large intestine', def: 'The colon, which absorbs water and forms stool.' },
    { group: 'gi', term: 'Liver', def: 'RUQ solid organ that makes bile and clotting factors, stores glycogen and clears toxins.' },
    { group: 'gi', term: 'Gallbladder', def: 'Small sac under the liver that stores bile and releases it after fatty meals.' },
    { group: 'gi', term: 'Bile', def: 'Fluid made by the liver that helps digest fats.' },
    { group: 'gi', term: 'Solid organ', def: 'An abdominal organ with a rich blood supply that bleeds when injured (liver, spleen, kidneys, pancreas).' },
    { group: 'gi', term: 'Hollow organ', def: 'A tube or sac organ that spills its contents when injured (stomach, intestines, bladder).' },
    { group: 'gi', term: 'Referred pain', def: 'Pain felt in a place away from the organ causing it.' },
    { group: 'gi', term: 'Kehr sign', def: 'Left shoulder pain from blood irritating the diaphragm, often from a ruptured spleen.' },

    // Kidneys & electrolytes
    { group: 'renal', term: 'Nephron', def: 'The working unit of the kidney that filters blood and forms urine.' },
    { group: 'renal', term: 'Glomerulus', def: 'The ball of capillaries in the nephron where blood is filtered.' },
    { group: 'renal', term: 'Ureter', def: 'Tube carrying urine from a kidney to the bladder.' },
    { group: 'renal', term: 'Urethra', def: 'Tube carrying urine from the bladder out of the body.' },
    { group: 'renal', term: 'Renin', def: 'Enzyme released by the kidneys when their perfusion drops; starts the RAAS.' },
    { group: 'renal', term: 'Angiotensin II', def: 'Strong vasoconstrictor formed in the RAAS that also triggers aldosterone release.' },
    { group: 'renal', term: 'Electrolyte', def: 'A substance that separates into charged ions in water (sodium, potassium, calcium, chloride).' },
    { group: 'renal', term: 'Cation', def: 'A positively charged ion, such as Na⁺, K⁺ or Ca²⁺.' },
    { group: 'renal', term: 'Anion', def: 'A negatively charged ion, such as Cl⁻ or HCO₃⁻.' },
    { group: 'renal', term: 'Buffer', def: 'A substance that absorbs or releases hydrogen ions to resist a change in pH (bicarbonate is the main one).' },
    { group: 'renal', term: 'Acidosis', def: 'A blood pH below 7.35.' },
    { group: 'renal', term: 'Alkalosis', def: 'A blood pH above 7.45.' },

    // Reproductive
    { group: 'repro', term: 'Ovaries', def: 'Female glands that produce eggs and the hormones estrogen and progesterone.' },
    { group: 'repro', term: 'Fallopian tubes', def: 'Tubes that carry the egg from the ovary to the uterus; the usual site of fertilization.' },
    { group: 'repro', term: 'Uterus', def: 'Muscular organ where the fetus develops.' },
    { group: 'repro', term: 'Cervix', def: 'The lower neck of the uterus that opens into the vagina and dilates during labor.' },
    { group: 'repro', term: 'Placenta', def: 'Organ that exchanges oxygen, nutrients and waste between the mother\'s and fetus\'s blood.' },
    { group: 'repro', term: 'Umbilical cord', def: 'Connects the fetus to the placenta; two arteries and one vein.' },
    { group: 'repro', term: 'Amniotic sac', def: 'Fluid-filled membrane that surrounds and cushions the fetus.' },
    { group: 'repro', term: 'Ectopic pregnancy', def: 'A pregnancy implanted outside the uterus, most often in a fallopian tube.' },
    { group: 'repro', term: 'Supine hypotensive syndrome', def: 'Low blood pressure when a late-pregnancy patient lies flat and the uterus compresses the inferior vena cava.' },
    { group: 'repro', term: 'Testes', def: 'Male glands in the scrotum that produce sperm and testosterone.' },
    { group: 'repro', term: 'Prostate', def: 'Male gland around the urethra below the bladder that adds fluid to semen.' }
  ];

  window.AP_FACTS = [
    // Body organization
    { group: 'org', q: 'Which plane divides the body into front and back?', a: 'Frontal (coronal) plane', wrong: ['Midsagittal plane', 'Transverse plane', 'Horizontal midline'] },
    { group: 'org', q: 'In which abdominal quadrant are the liver and gallbladder?', a: 'Right upper quadrant', wrong: ['Left upper quadrant', 'Right lower quadrant', 'Left lower quadrant'] },
    { group: 'org', q: 'In which abdominal quadrant is the spleen?', a: 'Left upper quadrant', wrong: ['Right upper quadrant', 'Left lower quadrant', 'Right lower quadrant'] },
    { group: 'org', q: 'In which abdominal quadrant is the appendix?', a: 'Right lower quadrant', wrong: ['Left lower quadrant', 'Right upper quadrant', 'Left upper quadrant'] },
    { group: 'org', q: 'What separates the thoracic cavity from the abdominal cavity?', a: 'The diaphragm', wrong: ['The mediastinum', 'The peritoneum', 'The pleura'] },
    { group: 'org', q: 'Most of the body\'s control systems use which kind of feedback?', a: 'Negative feedback', wrong: ['Positive feedback', 'Feed-forward control', 'No feedback; they are fixed'] },
    { group: 'org', q: 'Which is an example of positive feedback?', a: 'Labor contractions driven by oxytocin', wrong: ['Shivering when cold', 'Insulin release after a meal', 'Heart rate rising when BP falls'] },

    // Cells & fluids
    { group: 'cell', q: 'What are the four basic tissue types?', a: 'Epithelial, connective, muscle, nervous', wrong: ['Epithelial, blood, bone, nervous', 'Skin, muscle, fat, nervous', 'Connective, cardiac, smooth, skeletal'] },
    { group: 'cell', q: 'What does anaerobic metabolism produce as a byproduct?', a: 'Lactic acid', wrong: ['Carbon dioxide and water only', 'Ketones', 'Urea'] },
    { group: 'cell', q: 'About how much of adult body weight is water?', a: 'About 60%', wrong: ['About 40%', 'About 75%', 'About 90%'] },
    { group: 'cell', q: 'Where is most of the body\'s water?', a: 'Inside the cells (intracellular)', wrong: ['In the blood plasma', 'In the interstitial spaces', 'Evenly split inside and outside the cells'] },
    { group: 'cell', q: 'A red blood cell placed in a hypotonic solution will:', a: 'Swell as water moves in', wrong: ['Shrink as water moves out', 'Stay the same size', 'Lose its potassium but keep its size'] },
    { group: 'cell', q: 'How much ATP does aerobic metabolism of one glucose make, compared with anaerobic?', a: 'About 36–38 ATP vs 2 ATP', wrong: ['2 ATP vs 36–38 ATP', 'About the same amount', '10 ATP vs 5 ATP'] },

    // Skin, bones & muscles
    { group: 'msk', q: 'How many bones are in the adult skeleton?', a: '206', wrong: ['186', '226', '270'] },
    { group: 'msk', q: 'How many cervical vertebrae are there?', a: '7', wrong: ['5', '8', '12'] },
    { group: 'msk', q: 'How many thoracic vertebrae are there?', a: '12', wrong: ['7', '5', '10'] },
    { group: 'msk', q: 'Which skin layer has no blood vessels?', a: 'Epidermis', wrong: ['Dermis', 'Subcutaneous layer', 'Fascia'] },
    { group: 'msk', q: 'Where are red blood cells made in adults?', a: 'Red bone marrow', wrong: ['Spleen', 'Liver', 'Lymph nodes'] },
    { group: 'msk', q: 'Which muscle type is involuntary and striated?', a: 'Cardiac muscle', wrong: ['Skeletal muscle', 'Smooth muscle', 'Both skeletal and smooth muscle'] },
    { group: 'msk', q: 'About how much blood can a closed femur fracture lose into the thigh?', a: '1 to 1.5 L', wrong: ['100 to 200 mL', '3 to 4 L', 'Almost none; bone does not bleed'] },

    // Nervous system
    { group: 'nerv', q: 'What is the order of the meninges from outside in?', a: 'Dura mater, arachnoid, pia mater', wrong: ['Pia mater, arachnoid, dura mater', 'Arachnoid, dura mater, pia mater', 'Dura mater, pia mater, arachnoid'] },
    { group: 'nerv', q: 'Where are the centers that control breathing?', a: 'Brainstem (medulla and pons)', wrong: ['Cerebellum', 'Frontal lobe of the cerebrum', 'Spinal cord at C3–C5'] },
    { group: 'nerv', q: 'Which spinal nerves form the phrenic nerve to the diaphragm?', a: 'C3, C4, C5', wrong: ['C1, C2', 'C6, C7, C8', 'T1 to T4'] },
    { group: 'nerv', q: 'Which dermatome is at the level of the umbilicus?', a: 'T10', wrong: ['T4', 'L1', 'T12'] },
    { group: 'nerv', q: 'Which dermatome is at the level of the nipple line?', a: 'T4', wrong: ['T10', 'C7', 'T8'] },
    { group: 'nerv', q: 'Stimulating beta-1 receptors causes:', a: 'Faster heart rate and stronger contractions', wrong: ['Bronchodilation', 'Constriction of blood vessels', 'Slower heart rate'] },
    { group: 'nerv', q: 'How many pairs of cranial nerves are there?', a: '12', wrong: ['10', '31', '8'] },
    { group: 'nerv', q: 'Which part of the brain controls balance and coordination?', a: 'Cerebellum', wrong: ['Medulla', 'Cerebrum', 'Hypothalamus'] },

    // Endocrine
    { group: 'endo', q: 'Which cells make insulin?', a: 'Beta cells of the pancreatic islets', wrong: ['Alpha cells of the pancreatic islets', 'Cells of the adrenal cortex', 'Liver cells'] },
    { group: 'endo', q: 'Which hormone raises blood glucose by breaking down glycogen in the liver?', a: 'Glucagon', wrong: ['Insulin', 'ADH', 'Aldosterone'] },
    { group: 'endo', q: 'Which gland releases epinephrine and norepinephrine?', a: 'Adrenal medulla', wrong: ['Adrenal cortex', 'Thyroid', 'Posterior pituitary'] },
    { group: 'endo', q: 'Which hormone makes the kidneys reabsorb water?', a: 'ADH (antidiuretic hormone)', wrong: ['Insulin', 'Thyroxine (T4)', 'Glucagon'] },
    { group: 'endo', q: 'Which hormone controls the body\'s metabolic rate?', a: 'Thyroid hormone (T3 and T4)', wrong: ['Cortisol', 'Oxytocin', 'Parathyroid hormone'] },
    { group: 'endo', q: 'What does parathyroid hormone do?', a: 'Raises blood calcium', wrong: ['Lowers blood glucose', 'Raises blood sodium', 'Lowers heart rate'] },

    // Heart & circulation
    { group: 'cv', q: 'Where does blood go when it leaves the right ventricle?', a: 'To the lungs through the pulmonary arteries', wrong: ['To the body through the aorta', 'To the left atrium through the pulmonary veins', 'Back to the right atrium'] },
    { group: 'cv', q: 'Which vessels carry oxygenated blood back to the heart?', a: 'Pulmonary veins', wrong: ['Pulmonary arteries', 'Superior vena cava', 'Coronary sinus'] },
    { group: 'cv', q: 'When do the coronary arteries fill?', a: 'Mostly during diastole', wrong: ['Mostly during systole', 'Only during atrial contraction', 'Evenly through the whole cycle'] },
    { group: 'cv', q: 'Cardiac output equals:', a: 'Heart rate × stroke volume', wrong: ['Heart rate × blood pressure', 'Stroke volume × vascular resistance', 'Blood pressure ÷ heart rate'] },
    { group: 'cv', q: 'Which chamber has the thickest wall?', a: 'Left ventricle', wrong: ['Right ventricle', 'Left atrium', 'Right atrium'] },
    { group: 'cv', q: 'Which valve sits between the left atrium and left ventricle?', a: 'Mitral (bicuspid) valve', wrong: ['Tricuspid valve', 'Aortic valve', 'Pulmonic valve'] },
    { group: 'cv', q: 'Which vessels hold most of the body\'s blood volume?', a: 'Veins', wrong: ['Arteries', 'Capillaries', 'Arterioles'] },

    // Blood & immune
    { group: 'blood', q: 'Which red cell type is the universal donor?', a: 'O negative', wrong: ['AB positive', 'A negative', 'O positive'] },
    { group: 'blood', q: 'About how long does a red blood cell live?', a: 'About 120 days', wrong: ['About 7 days', 'About 30 days', 'About 1 year'] },
    { group: 'blood', q: 'What is the most common white blood cell?', a: 'Neutrophils', wrong: ['Lymphocytes', 'Eosinophils', 'Monocytes'] },
    { group: 'blood', q: 'About what share of blood is plasma?', a: 'About 55%', wrong: ['About 25%', 'About 80%', 'About 45%'] },
    { group: 'blood', q: 'What forms the mesh that holds a stable clot together?', a: 'Fibrin', wrong: ['Albumin', 'Hemoglobin', 'Histamine'] },

    // Respiratory
    { group: 'resp', q: 'An endotracheal tube pushed too deep usually goes into the:', a: 'Right mainstem bronchus', wrong: ['Left mainstem bronchus', 'Esophagus', 'Carina, blocking both lungs'] },
    { group: 'resp', q: 'In a healthy person, what is the main stimulus to breathe?', a: 'Rising CO₂ (falling pH)', wrong: ['Falling oxygen level', 'Rising blood pressure', 'Body temperature'] },
    { group: 'resp', q: 'Where does gas exchange happen in the lungs?', a: 'Alveoli', wrong: ['Bronchioles', 'Trachea', 'Pleural space'] },
    { group: 'resp', q: 'What is the main muscle of breathing?', a: 'Diaphragm', wrong: ['Intercostal muscles', 'Sternocleidomastoid', 'Abdominal muscles'] },
    { group: 'resp', q: 'Which is the only complete ring of cartilage in the airway?', a: 'Cricoid cartilage', wrong: ['Thyroid cartilage', 'Epiglottis', 'The first tracheal ring'] },
    { group: 'resp', q: 'How is most CO₂ carried in the blood?', a: 'As bicarbonate', wrong: ['Bound to hemoglobin', 'Dissolved in plasma', 'Bound to albumin'] },

    // Abdomen & digestion
    { group: 'gi', q: 'An injured hollow organ mainly causes:', a: 'Peritonitis from leaked contents', wrong: ['Heavy internal bleeding', 'Immediate hypoglycemia', 'No problems until days later'] },
    { group: 'gi', q: 'Which organ is retroperitoneal?', a: 'Kidney', wrong: ['Stomach', 'Spleen', 'Gallbladder'] },
    { group: 'gi', q: 'Where are most nutrients absorbed?', a: 'Small intestine', wrong: ['Stomach', 'Large intestine', 'Esophagus'] },
    { group: 'gi', q: 'Which organ makes most clotting factors?', a: 'Liver', wrong: ['Spleen', 'Pancreas', 'Kidney'] },
    { group: 'gi', q: 'Gallbladder pain is commonly referred to the:', a: 'Right shoulder', wrong: ['Left shoulder', 'Lower back on the left', 'Groin'] },

    // Kidneys & electrolytes
    { group: 'renal', q: 'What is the main intracellular cation?', a: 'Potassium', wrong: ['Sodium', 'Calcium', 'Chloride'] },
    { group: 'renal', q: 'What is the main extracellular cation?', a: 'Sodium', wrong: ['Potassium', 'Magnesium', 'Bicarbonate'] },
    { group: 'renal', q: 'Which acid-base control system is slowest but most powerful?', a: 'The kidneys (hours to days)', wrong: ['The bicarbonate buffer (seconds)', 'The lungs (minutes)', 'The liver (seconds)'] },
    { group: 'renal', q: 'What do the kidneys release when their blood flow drops?', a: 'Renin', wrong: ['Insulin', 'Glucagon', 'Histamine'] },
    { group: 'renal', q: 'Where in the nephron is blood filtered?', a: 'Glomerulus', wrong: ['Ureter', 'Loop of Henle', 'Renal pelvis'] },

    // Reproductive
    { group: 'repro', q: 'What vessels are in the umbilical cord?', a: 'Two arteries and one vein', wrong: ['One artery and two veins', 'One artery and one vein', 'Two arteries and two veins'] },
    { group: 'repro', q: 'Where does fertilization normally happen?', a: 'Fallopian tube', wrong: ['Uterus', 'Ovary', 'Cervix'] },
    { group: 'repro', q: 'By how much does blood volume rise in pregnancy?', a: 'About 30 to 50%', wrong: ['About 5 to 10%', 'It does not change', 'It doubles or more'] },
    { group: 'repro', q: 'Which umbilical vessel carries oxygenated blood to the fetus?', a: 'The umbilical vein', wrong: ['The umbilical arteries', 'The uterine artery', 'The inferior vena cava'] },
    { group: 'repro', q: 'Where is the prostate?', a: 'Around the urethra just below the bladder', wrong: ['Inside the scrotum beside the testes', 'Behind the kidneys', 'Above the bladder in the abdomen'] }
  ];

  window.AP_NORMALS = [
    { group: 'org', name: 'Core body temperature', value: 'About 98.6 °F (37 °C)', wrong: ['About 96.0 °F (35.6 °C)', 'About 100.4 °F (38 °C)', 'About 99.9 °F (37.7 °C)'] },
    { group: 'cv', name: 'Adult heart rate', value: '60–100 beats/min', wrong: ['40–60 beats/min', '100–140 beats/min', '80–120 beats/min'] },
    { group: 'cv', name: 'Stroke volume', value: 'About 70 mL', wrong: ['About 20 mL', 'About 150 mL', 'About 500 mL'] },
    { group: 'cv', name: 'Cardiac output', value: 'About 5 L/min (4–8)', wrong: ['About 1 L/min', 'About 12 L/min', 'About 500 mL/min'] },
    { group: 'cv', name: 'Mean arterial pressure (MAP)', value: '70–100 mmHg', note: 'At least about 60–65 mmHg is needed to perfuse the organs.', wrong: ['40–60 mmHg', '110–130 mmHg', '130–150 mmHg'] },
    { group: 'cv', name: 'Capillary refill', value: 'Under 2 seconds', note: 'Most reliable in children under 6.', wrong: ['Under 5 seconds', '3 to 4 seconds', 'Under 10 seconds'] },
    { group: 'blood', name: 'Adult blood volume', value: 'About 70 mL/kg (5–6 L)', wrong: ['About 20 mL/kg (1.5 L)', 'About 150 mL/kg (10 L)', 'About 35 mL/kg (2.5 L)'] },
    { group: 'blood', name: 'Hemoglobin', value: 'Men about 13.5–17.5 g/dL; women about 12–15.5 g/dL', wrong: ['About 5–8 g/dL for everyone', 'About 20–25 g/dL', 'About 135–145 g/dL'] },
    { group: 'blood', name: 'Platelets', value: '150,000–400,000 per µL', wrong: ['5,000–10,000 per µL', '1–2 million per µL', '20,000–50,000 per µL'] },
    { group: 'blood', name: 'White blood cells', value: 'About 5,000–10,000 per µL', wrong: ['About 150,000–400,000 per µL', 'About 500–1,000 per µL', 'About 4–6 million per µL'] },
    { group: 'resp', name: 'Adult respiratory rate', value: '12–20 breaths/min', wrong: ['6–10 breaths/min', '20–30 breaths/min', '30–40 breaths/min'] },
    { group: 'resp', name: 'Tidal volume', value: 'About 500 mL (5–7 mL/kg)', wrong: ['About 150 mL', 'About 1,500 mL', 'About 3,000 mL'] },
    { group: 'resp', name: 'SpO₂ (pulse oximetry)', value: '95–100%', wrong: ['85–90%', '80–85%', '75–80%'] },
    { group: 'resp', name: 'End-tidal CO₂ (EtCO₂)', value: '35–45 mmHg', wrong: ['15–25 mmHg', '50–60 mmHg', '80–100 mmHg'] },
    { group: 'resp', name: 'PaO₂ (arterial oxygen)', value: '80–100 mmHg', wrong: ['35–45 mmHg', '50–60 mmHg', '150–200 mmHg'] },
    { group: 'endo', name: 'Blood glucose', value: 'About 70–120 mg/dL', note: 'Texts vary a little; fasting is about 70–100 mg/dL.', wrong: ['About 40–60 mg/dL', 'About 150–200 mg/dL', 'About 250–350 mg/dL'] },
    { group: 'nerv', name: 'Glasgow Coma Scale, fully alert', value: '15', wrong: ['3', '10', '12'] },
    { group: 'renal', name: 'Blood pH', value: '7.35–7.45', wrong: ['7.00–7.20', '7.25–7.35', '7.45–7.60'] },
    { group: 'renal', name: 'Bicarbonate (HCO₃⁻)', value: '22–26 mEq/L', wrong: ['10–14 mEq/L', '35–45 mEq/L', '3.5–5.0 mEq/L'] },
    { group: 'renal', name: 'Sodium (Na⁺)', value: '135–145 mEq/L', wrong: ['3.5–5.0 mEq/L', '95–105 mEq/L', '150–165 mEq/L'] },
    { group: 'renal', name: 'Potassium (K⁺)', value: '3.5–5.0 mEq/L', wrong: ['135–145 mEq/L', '1.5–2.5 mEq/L', '6.0–7.5 mEq/L'] },
    { group: 'renal', name: 'Adult urine output', value: 'At least 0.5 mL/kg/hr (about 30 mL/hr)', wrong: ['At least 5 mL/kg/hr', 'About 5 mL/hr', 'At least 2 L/hr'] }
  ];

  window.AP_SCENARIOS = [
    // Body organization
    {
      id: 'sc-prone', group: 'org',
      case: 'You find a patient lying face down on the kitchen floor. How do you describe the position in your report?',
      a: 'Prone', wrong: ['Supine', 'Fowler', 'Lateral recumbent'],
      why: 'Prone is face down; supine is face up. Lateral recumbent is on the side, and Fowler is sitting up.'
    },
    {
      id: 'sc-wound', group: 'org',
      case: 'A stab wound is on the front of the left chest, between the sternum and the nipple. How do you describe where it is?',
      a: 'Anterior chest, medial to the left nipple', wrong: ['Anterior chest, lateral to the left nipple', 'Posterior chest, medial to the left nipple', 'Posterior chest, lateral to the left nipple'],
      why: 'The front is anterior. The sternum is the midline, so between it and the nipple is medial (closer to the midline) to the nipple.'
    },
    // Cells & fluids
    {
      id: 'sc-lactate', group: 'cell',
      case: 'A trauma patient in shock has a high lactate level at the hospital. Why are their cells making lactic acid?',
      a: 'Without enough oxygen, cells switch to anaerobic metabolism', wrong: ['The cells are burning fat because there is no insulin', 'The kidneys are making acid to raise blood pressure', 'Lactic acid is released from damaged red blood cells'],
      why: 'Poor perfusion means poor oxygen delivery. Cells fall back on anaerobic metabolism, which makes only 2 ATP per glucose and leaves lactic acid behind, causing metabolic acidosis.'
    },
    {
      id: 'sc-saline', group: 'cell',
      case: 'You give 1 L of 0.9% normal saline. Where does most of it end up within an hour?',
      a: 'Outside the cells, mostly spread into the interstitial space', wrong: ['Inside the cells, because saline is hypotonic', 'It pulls water out of the cells, because saline is hypertonic', 'It all stays inside the blood vessels'],
      why: 'Normal saline is isotonic, so it does not move water into or out of cells. It stays extracellular, but most of it leaks from the vessels into the interstitial space, leaving only a fraction in the blood.'
    },
    // Skin, bones & muscles
    {
      id: 'sc-sprain', group: 'msk',
      case: 'A soccer player rolled an ankle. The ligaments are stretched and partly torn, and there is no fracture. What is the injury called?',
      a: 'Sprain', wrong: ['Strain', 'Dislocation', 'Contusion'],
      why: 'Ligaments connect bone to bone, and a ligament injury is a sprain. A strain is a stretched muscle or tendon.'
    },
    {
      id: 'sc-burn', group: 'msk',
      case: 'A burn on the forearm is red, wet, very painful and blistered. Which skin layers are involved?',
      a: 'The epidermis and part of the dermis (partial thickness)', wrong: ['Only the epidermis (superficial)', 'All of the dermis and into the fat (full thickness)', 'Only the subcutaneous layer'],
      why: 'Blisters and severe pain mean the burn has reached the dermis, where the nerves are, without destroying them. A full-thickness burn often does not hurt because the nerves are gone.'
    },
    // Nervous system
    {
      id: 'sc-vagal', group: 'nerv',
      case: 'An older patient strains hard on the toilet, feels faint, and has a heart rate of 40. What caused the slow heart rate?',
      a: 'Bearing down stimulated the vagus nerve (parasympathetic)', wrong: ['A surge of epinephrine from the adrenal glands', 'Stimulation of beta-1 receptors', 'Low blood glucose'],
      why: 'Bearing down (a Valsalva maneuver) stimulates the vagus nerve, the main parasympathetic nerve to the heart, which slows the heart rate and can drop the blood pressure.'
    },
    {
      id: 'sc-c6', group: 'nerv',
      case: 'A diver has a spinal cord injury at C6. The belly rises and falls but the chest wall barely moves. Why?',
      a: 'The phrenic nerve (C3–C5) still works the diaphragm, but the nerves to the intercostals are cut off', wrong: ['The brainstem breathing center was damaged', 'Both lungs have collapsed', 'The patient is using the abdominal muscles to breathe on purpose'],
      why: 'The diaphragm is supplied from C3, C4 and C5, above the injury. The intercostal muscles are supplied by thoracic nerves below the injury, so only diaphragmatic breathing remains. Watch for fatigue.'
    },
    {
      id: 'sc-stroke', group: 'nerv',
      case: 'A patient has sudden weakness of the right arm and leg and cannot get words out. Which part of the brain is most likely affected?',
      a: 'The left cerebral hemisphere', wrong: ['The right cerebral hemisphere', 'The cerebellum', 'The spinal cord'],
      why: 'Each side of the cerebrum controls the opposite side of the body, and the speech centers are on the left in most people.'
    },
    // Endocrine
    {
      id: 'sc-hypo', group: 'endo',
      case: 'A diabetic patient took their usual insulin and skipped breakfast. Now they are confused, pale and sweaty. What is going on?',
      a: 'Insulin moved glucose out of the blood and no food replaced it, so the brain is short of glucose', wrong: ['There is too much glucose in the blood, so the cells are flooded', 'The insulin caused an allergic reaction', 'The pancreas is releasing too much glucagon'],
      why: 'Insulin lowers blood glucose. Without food, blood glucose drops, and the brain, which cannot store glucose, is affected first. The sweating and pallor come from the epinephrine released in response.'
    },
    {
      id: 'sc-dka', group: 'endo',
      case: 'A type 1 diabetic has run out of insulin. The blood glucose is 540 mg/dL, yet the body is breaking down fat and making ketones. Why?',
      a: 'Without insulin, glucose cannot get into most cells, so they burn fat instead', wrong: ['The glucose is too high to be used by the cells', 'The liver has run out of glycogen', 'Ketones are made by the kidneys to lower the glucose'],
      why: 'Insulin is the key that lets glucose into most cells. Without it, the cells starve despite high blood glucose and burn fat, which produces ketone acids (ketoacidosis).'
    },
    // Heart & circulation
    {
      id: 'sc-svt', group: 'cv',
      case: 'A patient\'s heart rate is 200, and the blood pressure has dropped. Why can a very fast heart rate lower cardiac output?',
      a: 'There is too little time in diastole for the ventricles to fill, so stroke volume falls', wrong: ['The heart pumps too much blood and the vessels dilate', 'Fast rates always increase cardiac output', 'The valves close permanently at high rates'],
      why: 'Cardiac output is heart rate × stroke volume. At very fast rates, diastole shortens so much that the ventricles barely fill, stroke volume falls, and the coronary arteries also get less filling time.'
    },
    {
      id: 'sc-starling', group: 'cv',
      case: 'A dehydrated patient\'s blood pressure improves after a 500 mL fluid bolus. What explains the improvement?',
      a: 'More preload stretches the ventricle, giving a stronger contraction (Frank-Starling)', wrong: ['The fluid lowered afterload', 'The fluid slowed the heart rate', 'The fluid made the heart muscle grow stronger'],
      why: 'Fluid increases the volume returning to the heart (preload). More stretch on the ventricle gives a stronger contraction and a larger stroke volume, which raises cardiac output and blood pressure.'
    },
    {
      id: 'sc-lhf', group: 'cv',
      case: 'A patient with a large heart attack in the left ventricle develops crackles in both lungs. Why?',
      a: 'The failing left ventricle backs blood up into the pulmonary veins and lungs', wrong: ['Blood is backing up into the body\'s veins', 'The right ventricle is pumping too little blood to the lungs', 'The coronary arteries are leaking fluid into the lungs'],
      why: 'The left side receives blood from the lungs. When it cannot pump forward, pressure builds in the pulmonary veins and fluid leaks into the alveoli (pulmonary edema).'
    },
    // Blood & immune
    {
      id: 'sc-spleen', group: 'blood',
      case: 'A child hit the handlebars of a bike and now has left upper quadrant pain, left shoulder pain and a rising heart rate. What is the concern?',
      a: 'A ruptured spleen bleeding into the abdomen', wrong: ['A ruptured appendix', 'A gallbladder attack', 'A bruised kidney with no bleeding'],
      why: 'The spleen sits in the LUQ and is very vascular. Blood irritating the diaphragm refers pain to the left shoulder (Kehr sign), and tachycardia points to blood loss.'
    },
    {
      id: 'sc-anaph', group: 'blood',
      case: 'After a bee sting a patient has hives, wheezing and a BP of 78/40. What explains the low blood pressure?',
      a: 'Histamine dilates blood vessels and makes them leak', wrong: ['The heart has stopped pumping', 'The venom causes blood loss', 'The airway swelling blocks the aorta'],
      why: 'In anaphylaxis, mast cells release histamine and other chemicals. Vessels dilate and leak fluid, so blood pressure falls (distributive shock), while bronchial smooth muscle constricts.'
    },
    // Respiratory
    {
      id: 'sc-shallow', group: 'resp',
      case: 'A patient breathes 30 times a minute, but each breath is only about 150 mL. Why is that a problem?',
      a: 'Most of each breath only fills the dead space, so little air reaches the alveoli', wrong: ['A rate of 30 always means too much oxygen', 'Shallow breaths move more air than deep breaths', 'It is fine, because minute volume is normal'],
      why: 'About 150 mL of every breath stays in the airways (dead space). Breaths that small barely reach the alveoli, so gas exchange is poor even though the rate is high. Assist ventilations.'
    },
    {
      id: 'sc-ptx', group: 'resp',
      case: 'A stab wound to the chest lets air into the space between the lung and the chest wall. Why does the lung collapse?',
      a: 'Air in the pleural space breaks the negative pressure that holds the lung against the chest wall', wrong: ['The air fills the alveoli and bursts them', 'The diaphragm is paralyzed by the wound', 'The trachea is blocked by the air'],
      why: 'The visceral and parietal pleura are held together by negative pressure in the pleural space. When air enters, that seal is lost and the lung recoils and collapses (pneumothorax).'
    },
    {
      id: 'sc-tube', group: 'resp',
      case: 'After intubation you hear breath sounds on the right but none on the left, and the stomach is quiet. What is the most likely problem?',
      a: 'The tube is too deep, in the right mainstem bronchus', wrong: ['The tube is in the esophagus', 'The tube is in the left mainstem bronchus', 'The patient has a right-sided pneumothorax'],
      why: 'The right mainstem bronchus is shorter, wider and more vertical, so a tube pushed too far usually goes right. Pull it back slightly and recheck breath sounds.'
    },
    // Abdomen & digestion
    {
      id: 'sc-gb', group: 'gi',
      case: 'A patient has RUQ pain that radiates to the right shoulder, starting an hour after a fried meal. Why after a fatty meal?',
      a: 'Fat makes the gallbladder contract to release bile', wrong: ['Fat makes the stomach release more acid', 'Fat is absorbed in the large intestine', 'Fat lowers the blood glucose'],
      why: 'The gallbladder stores bile, which digests fat. A fatty meal makes it squeeze, and if a stone blocks the duct, that causes RUQ pain referred to the right shoulder.'
    },
    {
      id: 'sc-solid', group: 'gi',
      case: 'A driver struck the steering wheel and has RUQ tenderness, a heart rate of 128 and no outside bleeding. What is the concern?',
      a: 'Bleeding from the liver, a solid organ', wrong: ['A perforated stomach spilling acid', 'A ruptured spleen', 'Kidney stones'],
      why: 'The liver sits in the RUQ and has a rich blood supply, so it can bleed heavily inside the abdomen with nothing to see on the outside.'
    },
    // Kidneys & electrolytes
    {
      id: 'sc-raas', group: 'renal',
      case: 'A patient who has lost a lot of blood has poor perfusion to the kidneys. How do the kidneys respond?',
      a: 'Release renin, leading to angiotensin II (vasoconstriction) and aldosterone (sodium and water retention)', wrong: ['Make more urine to get rid of acid', 'Release insulin to lower glucose', 'Stop all hormone release until perfusion returns'],
      why: 'Renin starts the renin-angiotensin-aldosterone system. Angiotensin II constricts vessels and aldosterone keeps sodium and water, both raising blood pressure, and urine output falls.'
    },
    {
      id: 'sc-crush', group: 'renal',
      case: 'A patient has been pinned by a heavy beam for hours. After release, the ECG shows peaked T waves. Why?',
      a: 'Potassium is mostly inside cells, and crushed muscle releases it into the blood', wrong: ['Sodium leaves the blood and enters the muscle', 'The muscle damage lowers calcium only', 'Lactic acid lowers the potassium'],
      why: 'Potassium is the main intracellular cation. When muscle cells are crushed and break down, potassium floods into the blood, causing hyperkalemia and its ECG changes.'
    },
    {
      id: 'sc-kussmaul', group: 'renal',
      case: 'A patient with diabetic ketoacidosis is breathing fast and deep. What is the body doing?',
      a: 'Blowing off CO₂ to raise the pH (respiratory compensation)', wrong: ['Taking in more oxygen to burn ketones', 'Trying to cool down the body', 'Holding on to CO₂ to lower the pH'],
      why: 'Ketones make the blood acidic. CO₂ forms acid in the blood, so breathing it off raises the pH. The lungs compensate in minutes; the kidneys take hours to days.'
    },
    // Reproductive
    {
      id: 'sc-supine', group: 'repro',
      case: 'A patient at 34 weeks of pregnancy gets dizzy and pale when you lay her flat on the stretcher. What is happening, and what do you do?',
      a: 'The uterus is compressing the inferior vena cava; place her on her left side', wrong: ['She is hypoglycemic; give oral glucose', 'The placenta has separated; lay her flat', 'She is having a stroke; elevate her head'],
      why: 'After about 20 weeks the heavy uterus can press on the inferior vena cava when the patient lies supine, reducing blood return to the heart. Positioning on the left side relieves it.'
    },
    {
      id: 'sc-preg-shock', group: 'repro',
      case: 'A patient in the third trimester was in a crash. Her vital signs are near normal, but she is anxious and slightly tachycardic. Why be cautious?',
      a: 'Her expanded blood volume can hide major blood loss, and the fetus is already being shorted', wrong: ['Pregnant patients never go into shock', 'Pregnancy makes blood pressure rise with blood loss', 'Tachycardia is the only reliable sign of fetal distress'],
      why: 'Blood volume rises 30 to 50% in pregnancy, so a pregnant patient can lose a lot of blood before her vital signs change. The body protects the mother by shunting blood away from the uterus.'
    },
    {
      id: 'sc-ectopic', group: 'repro',
      case: 'A 24-year-old has sudden lower abdominal pain, a missed period and signs of shock. What should you suspect?',
      a: 'A ruptured ectopic pregnancy', wrong: ['Normal ovulation pain', 'A urinary tract infection', 'Testicular torsion'],
      why: 'An ectopic pregnancy usually implants in a fallopian tube, which can rupture and bleed heavily into the abdomen. Treat for shock and transport.'
    }
  ];
})();
