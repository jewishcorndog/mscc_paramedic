/*
 * Trauma content, from Chapters 35–42 of Sanders' Paramedic Textbook, 6th ed.:
 * the lecture slides (35 Trauma Overview and Mechanism of Injury, 36 Bleeding
 * and Soft-Tissue Trauma, 37 Burns, 38 Head, Face, and Neck Trauma, 39 Spine
 * and Nervous System Trauma, 40 Chest Trauma, 41 Abdominal Trauma,
 * 42 Orthopaedic Trauma). Wording follows the slides where they say it;
 * examples and explanations are added to make them usable as study cards.
 *
 * Items with std: true go beyond the slides (standard paramedic teaching:
 * ATLS, PHTLS, the American Burn Association) and the app marks them with *.
 * Items with tn: true are Tennessee notes from the class deck Paramedic
 * Pharmacology – TN Protocols (rev. 08/15/2025); check them against the
 * current Tennessee EMS protocol guidelines and your instructor.
 *
 * Topic fields: about, points (key points), scene (what to do in the field).
 * Terms: term, def. Facts: q, a, wrong. Scenarios: case, a, wrong, why.
 */
window.TRAUMA_GROUPS = [
  { id: 'systems', name: 'Trauma systems & assessment', ch: 35 },
  { id: 'kinematics', name: 'Mechanism of injury', ch: 35 },
  { id: 'bleeding', name: 'Bleeding & shock', ch: 36 },
  { id: 'soft', name: 'Soft tissue', ch: 36 },
  { id: 'burns', name: 'Burns', ch: 37 },
  { id: 'face', name: 'Face, eye & neck', ch: 38 },
  { id: 'head', name: 'Head & brain', ch: 38 },
  { id: 'spine', name: 'Spine', ch: 39 },
  { id: 'chest', name: 'Chest', ch: 40 },
  { id: 'abdomen', name: 'Abdomen', ch: 41 },
  { id: 'msk', name: 'Orthopaedic', ch: 42 },
  { id: 'special', name: 'Special populations', std: true }
];

// The Primary survey page: the assessment order, the field triage guideline,
// the GCS, hemorrhage classes and two drills.
window.TRAUMA_SURVEY = {
  summary: 'The primary survey finds and fixes what will kill the patient in minutes, in the order it kills. Massive bleeding comes first, because a patient can bleed out before an airway problem ends their life. Fix each problem as you find it, then move to the next step. Treat life threats on scene and do the rest en route.',
  // Slide 35-54: nine components of trauma assessment.
  components: ['Standard precautions', 'Scene size-up', 'General impression', 'Mechanism of injury', 'Primary assessment', 'Baseline vital signs', 'Patient history and history of the event', 'Secondary assessment', 'Reassessment'],
  stepsStd: true,
  steps: [
    {
      key: 'X', label: 'Massive bleeding', name: 'Exsanguinating hemorrhage', short: 'Stop massive bleeding',
      look: ['Spurting or pooling blood', 'Blood-soaked clothing; check under the patient'],
      act: ['Direct pressure first', 'Tourniquet, high and tight, if pressure does not control life-threatening limb bleeding at once', 'Pack junctional wounds with hemostatic gauze and hold pressure at least 3 minutes']
    },
    {
      key: 'A', label: 'Airway', name: 'Airway', short: 'Open and protect it, with spinal care',
      look: ['Talking in full sentences means a patent airway for now', 'Snoring, gurgling, stridor, facial burns, facial fractures, an expanding neck hematoma'],
      act: ['Jaw thrust (not head tilt) if a spinal injury is possible', 'Suction', 'OPA; no NPA with a suspected basilar skull fracture', 'Advanced airway if the patient cannot protect it']
    },
    {
      key: 'B', label: 'Breathing', name: 'Breathing', short: 'Find the chest life threats',
      look: ['Rate, depth, SpO2, ETCO2', 'Expose the chest: wounds, paradoxical movement', 'Breath sounds both sides; JVD; tracheal position'],
      act: ['Oxygen to SpO2 94% or more', 'Occlusive dressing on an open chest wound; burp it if tension develops', 'Needle decompression for tension pneumothorax', 'Assist ventilations if rate or depth is inadequate']
    },
    {
      key: 'C', label: 'Circulation', name: 'Circulation', short: 'Find and treat shock',
      look: ['Radial pulse present? Rate and quality', 'Skin color, temperature, moisture; capillary refill', 'Hidden bleeding: chest, abdomen, pelvis/retroperitoneum, thigh'],
      act: ['Pelvic binder for a suspected pelvic fracture', 'IV/IO access en route', 'Blunt: fluid to SBP 80–90; penetrating: titrate to mental status; head injury: keep BP normal', 'TXA per local protocol']
    },
    {
      key: 'D', label: 'Disability', name: 'Disability', short: 'Brain and spinal cord',
      look: ['AVPU, then GCS', 'Pupils', 'Motor and sensation in all four limbs', 'Blood glucose if altered'],
      act: ['Head injury: SpO2 at least 90%, normal ventilation, no hypotension', 'Spinal motion restriction if indicated']
    },
    {
      key: 'E', label: 'Exposure', name: 'Exposure / environment', short: 'Find every injury, then keep them warm',
      look: ['Remove clothing; log roll and check the back', 'Look in the armpits, groin and creases for wounds'],
      act: ['Cover with blankets, warm the ambulance and fluids', 'Hypothermia makes bleeding worse (lethal triad)']
    }
  ],
  march: [['M', 'Massive hemorrhage'], ['A', 'Airway'], ['R', 'Respirations (chest injuries)'], ['C', 'Circulation (shock)'], ['H', 'Hypothermia and head injury']],
  // 2021 National Guideline for the Field Triage of Injured Patients (slide 35-7).
  triage: {
    red: {
      title: 'Red criteria: highest-level trauma center',
      groups: [
        ['Injury patterns', [
          'Penetrating injury to the head, neck, torso, or extremities proximal to the elbow or knee',
          'Skull deformity or suspected skull fracture',
          'Suspected spinal injury with new motor or sensory loss',
          'Chest wall instability, deformity, or suspected flail chest',
          'Suspected pelvic fracture',
          'Suspected fracture of two or more proximal long bones',
          'Crushed, degloved, mangled, or pulseless extremity',
          'Amputation proximal to the wrist or ankle',
          'Active bleeding that needs a tourniquet or wound packing with continuous pressure'
        ]],
        ['Mental status and vital signs', [
          'Unable to follow commands (motor GCS below 6)',
          'Respiratory rate below 10 or above 29/min',
          'Respiratory distress or need for respiratory support',
          'Room-air SpO2 below 90%',
          'Age 0–9: SBP below 70 mm Hg + (2 × age in years)',
          'Age 10–64: SBP below 90 mm Hg, or HR greater than SBP',
          'Age 65 and older: SBP below 110 mm Hg, or HR greater than SBP'
        ]]
      ]
    },
    yellow: {
      title: 'Yellow criteria: a trauma center (not always the highest level)',
      groups: [
        ['Mechanism of injury', [
          'High-risk crash: partial or complete ejection; intrusion over 12 in at an occupant site or over 18 in at any site (including the roof); need for extrication of an entrapped patient',
          'Death in the passenger compartment',
          'Child (0–9) unrestrained or in an unsecured child safety seat',
          'Vehicle telemetry data consistent with severe injury',
          'Rider separated from a transport vehicle with significant impact (motorcycle, ATV, horse)',
          'Pedestrian or bicyclist thrown, run over, or with significant impact',
          'Fall from height over 10 ft (all ages)'
        ]],
        ['EMS judgment', [
          'Low-level fall in a young child (age 5 or under) or older adult (65 or over) with significant head impact',
          'Anticoagulant use',
          'Suspected child abuse',
          'Special, high-resource health care needs',
          'Pregnancy over 20 weeks',
          'Burns together with trauma',
          'Children should go preferentially to pediatric-capable trauma centers'
        ]]
      ]
    },
    note: 'If a patient meets no criterion but you are still worried, your judgment counts: contact medical control or transport to a trauma center.'
  },
  gcs: {
    eyes: [[4, 'Opens spontaneously'], [3, 'Opens to sound or voice'], [2, 'Opens to pain or pressure'], [1, 'No eye opening']],
    verbal: [[5, 'Oriented'], [4, 'Confused'], [3, 'Inappropriate words'], [2, 'Incomprehensible sounds'], [1, 'No verbal response']],
    motor: [[6, 'Obeys commands'], [5, 'Localizes pain'], [4, 'Withdraws from pain'], [3, 'Abnormal flexion (decorticate)'], [2, 'Extension (decerebrate)'], [1, 'No motor response']],
    // Slide 38-78: moderate 9–13, severe 8 or less.
    bands: [[14, 15, 'Mild'], [9, 13, 'Moderate TBI'], [3, 8, 'Severe TBI: protect the airway']],
    note: 'The slides grade moderate TBI as 9–13 and severe as 8 or less. Score GCS after the airway is clear and breathing and circulation are supported: hypoxia and hypotension lower it.'
  },
  // Classic ATLS classes of hemorrhage (70 kg adult, about 5 L of blood). Not on the slides.
  hemorrhageStd: true,
  hemorrhage: [
    ['Blood loss', 'Up to 15% (up to 750 mL)', '15–30% (750–1,500 mL)', '30–40% (1,500–2,000 mL)', 'Over 40% (over 2,000 mL)'],
    ['Heart rate', 'Normal', 'Over 100', 'Over 120', 'Over 140'],
    ['Blood pressure', 'Normal', 'Normal', 'Decreased', 'Markedly decreased'],
    ['Pulse pressure', 'Normal', 'Narrowed', 'Narrowed', 'Narrowed'],
    ['Respiratory rate', '14–20', '20–30', '30–40', 'Over 35'],
    ['Mental status', 'Slightly anxious', 'Mildly anxious', 'Anxious, confused', 'Confused, lethargic'],
    ['Stage of shock', 'Compensated', 'Compensated', 'Decompensated', 'Irreversible if not stopped']
  ],
  // "What do you fix first?" drills. Answers are step keys.
  firstDrills: [
    { case: 'A man with a chainsaw wound to the thigh is screaming in pain. Bright red blood is spurting from the wound.', a: 'X', why: 'He is talking, so the airway is open. Spurting arterial bleeding will kill him in minutes: pressure, then a tourniquet if pressure does not stop it at once.' },
    { case: 'A driver is unresponsive after a rollover, with snoring respirations. No obvious bleeding.', a: 'A', why: 'Snoring means the tongue is blocking the airway. Jaw thrust (spinal precautions) and an airway adjunct.' },
    { case: 'A stabbing victim is anxious and short of breath. Breath sounds are absent on the left, the neck veins are distended, and the BP is 74/50. No external bleeding.', a: 'B', why: 'Tension pneumothorax is a breathing problem that causes obstructive shock. Decompress the chest; fluids will not fix it.' },
    { case: 'After a fall from a ladder, a woman is alert and talking with clear lungs. She has a weak, rapid radial pulse, pale cool skin, and a painful, unstable pelvis.', a: 'C', why: 'Airway and breathing are fine. The pelvis can hide a large amount of blood: bind it and treat for shock.' },
    { case: 'A cyclist hit by a car has an open airway, normal breathing and good radial pulses, but is confused and his left pupil is larger than the right.', a: 'D', why: 'X, A, B and C are intact. Disability: a dilated pupil on one side suggests rising intracranial pressure. Prevent hypoxia and hypotension and go to a trauma center.' },
    { case: 'An 80-year-old found on her kitchen floor after a fall last night is alert with stable vitals and no bleeding. She is shivering and her skin is cold.', a: 'E', why: 'Her ABCDs are stable. Exposure and environment: hypothermia worsens bleeding and outcomes, so warm her.' },
    { case: 'A man shot in the upper arm has blood pooling under him and is gurgling with blood in his mouth from a second wound to the jaw.', a: 'X', why: 'Massive bleeding first (tourniquet on the arm), then immediately suction and position the airway. In XABCDE, exsanguination is treated before the airway.' },
    { case: 'A worker pinned by a forklift has paradoxical movement of the right chest wall, a respiratory rate of 36, and an SpO2 of 86%. No external bleeding.', a: 'B', why: 'A flail segment with hypoxia is a breathing problem: oxygen and assisted ventilation.' }
  ],
  // "Where does this patient go?" drills: answers are destinations.
  destinations: ['Highest-level trauma center', 'Trauma center (any level)', 'Closest appropriate hospital'],
  triageDrills: [
    { case: '34-year-old with a gunshot wound to the abdomen. BP 128/80, HR 96, GCS 15.', a: 'Highest-level trauma center', why: 'Penetrating injury to the torso is a red criterion, whatever the vital signs.' },
    { case: '45-year-old restrained driver, airbag deployed, intrusion of 20 in on the passenger side. Vitals normal, no complaints.', a: 'Trauma center (any level)', why: 'Intrusion over 18 in at any site is a yellow (mechanism) criterion. No red criteria.' },
    { case: '70-year-old who tripped on a curb and has a painful wrist. BP 146/90, HR 82, GCS 15, no head strike, not on blood thinners.', a: 'Closest appropriate hospital', why: 'No red or yellow criteria: a ground-level fall with an isolated distal injury.' },
    { case: '72-year-old after a car crash. BP 104/70, HR 88, alert.', a: 'Highest-level trauma center', why: 'For age 65 and older, SBP below 110 is a red criterion. A "normal-looking" BP can be shock in the elderly.' },
    { case: '25-year-old ejected from a car, now walking around the scene with abrasions. Vitals normal.', a: 'Trauma center (any level)', why: 'Ejection is a yellow (high-risk crash) criterion even when the patient looks well. 75% of ejected people die from their injuries.' },
    { case: '30-year-old whose hand was amputated at the wrist by machinery. Bleeding controlled with a tourniquet.', a: 'Highest-level trauma center', why: 'Bleeding that needs a tourniquet is a red criterion.' },
    { case: '82-year-old on apixaban who fell from standing and hit her head. GCS 15, vitals normal.', a: 'Trauma center (any level)', why: 'Anticoagulant use and an older adult with significant head impact are yellow (EMS judgment) criteria.' },
    { case: '19-year-old after a motorcycle crash. Responds to pain only and cannot follow commands; BP 132/84.', a: 'Highest-level trauma center', why: 'Unable to follow commands (motor GCS below 6) is a red criterion.' }
  ]
};

// Where Tennessee (class deck) and the textbook or national guidance differ, or TN adds detail.
window.TRAUMA_TN = [
  { topic: 'Pain medicine with a head injury', national: 'National guidance (NASEMSO, PHTLS) allows careful opioid analgesia in head injury, watching for hypotension and respiratory depression, and now considers ketamine safe in TBI.', tn: 'The class TN deck lists head injury as a contraindication for fentanyl, morphine, ketamine, midazolam and nitrous oxide.', group: 'head' },
  { topic: 'Pressor in shock', national: 'Hemorrhagic shock is treated by stopping the bleeding and giving volume, not pressors. Neurogenic shock: fluids, then a pressor.', tn: 'Epinephrine is the first-line pressor in TN and is listed in the TN hypovolemic shock, neurogenic shock, spinal cord injury and blunt and penetrating trauma protocols (push-dose 5–10 mcg or a 2–10 mcg/min drip).', group: 'bleeding' },
  { topic: 'Crush injury', national: 'The slides call crush management controversial: time the release with medical care. Standard care: fluids before release, then treat hyperkalemia (calcium, sodium bicarbonate, albuterol).', tn: 'Albuterol is in the TN crush injury protocol (it drives potassium into the cells).', group: 'soft' },
  { topic: 'Musculoskeletal pain', national: 'Splinting, ice and elevation, then analgesia per local protocol.', tn: 'Nitrous oxide (self-administered) is in the TN musculoskeletal trauma protocol; not with altered mental status, head injury or alcohol/drug use. Ketamine is a pain adjunct but not for penetrating eye trauma.', group: 'msk' },
  { topic: 'TXA', national: 'The slides: a TXA protocol must be developed with the local trauma system. Usual practice: 1 g IV over 10 minutes within 3 hours of injury.', tn: 'TXA is not in the class TN pharmacology deck. Check whether your service carries it and its dose.', group: 'bleeding' }
];

window.TRAUMA_TOPICS = [
  // ---------------- Trauma systems & assessment (Ch 35) ----------------
  {
    id: 'epidemiology', name: 'Trauma and the phases of care', group: 'systems', aliases: ['epidemiology', 'pre-event', 'postevent', 'phases'],
    about: ['Unintentional injury is the leading cause of death for people aged 1 to 44 and the fourth-leading cause of death for all Americans. Most trauma deaths can be prevented.'],
    points: ['Pre-event: factors and events before the injury that influence its cause or the response to it',
      'Event: starts at first contact with the injuring force and ends when the force stops',
      'Postevent: when emergency care is delivered',
      'Paramedic jobs in the postevent phase: gather information, do lifesaving maneuvers, prepare for transport, and transport rapidly to the right facility'],
    scene: ['Injury prevention (seat belts, helmets, car seats) is part of the trauma system']
  },
  {
    id: 'trauma-systems', name: 'Trauma systems, centers and transport', group: 'systems', aliases: ['level i', 'trauma center', 'air medical', 'helicopter', 'golden hour'],
    about: ['A trauma system ties together injury prevention, prehospital care and triage, the emergency department, interfacility transport, definitive care, critical care, rehabilitation, and data collection (trauma registry).'],
    points: ['Level I: full range of specialists and equipment 24 hours a day; the regional resource for severely injured patients',
      'Levels II through V follow, each with fewer resources',
      'Ground transport is usually preferred if the destination can be reached in a reasonable time',
      'Consider air transport when ground time threatens survival, when weather, roads or traffic would seriously delay definitive care, or when critical care staff and equipment are needed',
      'Use the 2021 national field triage guideline to choose the destination'],
    scene: ['Fix immediate life threats on scene; do everything else en route', 'Pre-notify the trauma center early']
  },
  {
    id: 'field-triage', name: 'Field triage guideline (2021)', group: 'systems', aliases: ['red criteria', 'yellow criteria', 'triage', 'acs-cot'],
    about: ['The National Guideline for the Field Triage of Injured Patients (2021) sorts patients into red criteria (highest-level trauma center) and yellow criteria (a trauma center, not always the highest level). The slides use it to rate mechanisms as high risk or moderate risk.'],
    points: ['Red: injury patterns (penetrating torso or proximal limb, skull fracture, spinal injury with deficit, flail chest, pelvic fracture, 2+ proximal long bones, mangled limb, amputation above wrist/ankle, tourniquet or packing needed)',
      'Red: unable to follow commands, RR below 10 or above 29, respiratory distress, SpO2 below 90%, low SBP for age',
      'SBP thresholds: age 0–9 below 70 + 2 × age; 10–64 below 90; 65 and older below 110; or HR greater than SBP',
      'Yellow: high-risk crash (ejection, intrusion over 12 in occupant / 18 in any site, death in the vehicle, extrication), rider separated, pedestrian struck, fall over 10 ft',
      'Yellow (EMS judgment): anticoagulants, older adults or young children with a head strike, pregnancy over 20 weeks, suspected abuse, burns with trauma'],
    scene: ['When in doubt, go to the trauma center']
  },
  {
    id: 'assessment', name: 'Trauma assessment and documentation', group: 'systems', aliases: ['nine components', 'primary assessment', 'xabcde', 'march', 'documentation', 'pcr'],
    about: ['The slides list nine components of trauma assessment: standard precautions, scene size-up, general impression, mechanism of injury, primary assessment, baseline vital signs, history of the patient and the event, secondary assessment, and reassessment.'],
    points: ['Primary assessment treats life threats in the order they kill; many systems put exsanguinating hemorrhage (X) before the airway',
      'MARCH (military): Massive hemorrhage, Airway, Respirations, Circulation, Hypothermia/Head',
      'Use the mechanism to guide the assessment, rated high or moderate risk by the field triage guideline',
      'Documentation paints a picture of the event for the rest of the care team',
      'Mark wound locations on an anatomic drawing and describe the scene and the history of the event'],
    scene: ['Treat as you find, then reassess', 'Describe wounds; do not label them entrance or exit']
  },

  // ---------------- Mechanism of injury (Ch 35) ----------------
  {
    id: 'kinetics', name: 'Kinematics and energy', group: 'kinematics', aliases: ['kinematics', 'kinetic energy', 'velocity', 'newton', 'acceleration', 'deceleration'],
    about: ['Kinematics is the process of predicting injury patterns. Injuries come from energy moving from an outside source into the body.'],
    points: ['Consider individual factors (age), protective factors (restraints, helmets, airbags), the mechanism, the force, the anatomy, and the energy',
      'Injury depends on the type and amount of energy, how fast it is applied, and the part of the body it hits',
      'Newton\'s first law: an object at rest or in motion stays that way unless acted on by an outside force',
      'Conservation of energy: energy cannot be created or destroyed, only changed in form',
      'Newton\'s second law: force = mass × acceleration (or deceleration)',
      'Kinetic energy = ½ × mass × velocity²: doubling the speed quadruples the energy',
      'Blunt trauma comes from compression and sudden changes of speed (acceleration, deceleration)'],
    scene: ['Read the scene: vehicle damage, intrusion, a starred windshield, a bent steering wheel, deployed airbags']
  },
  {
    id: 'mvc', name: 'Motor vehicle crashes', group: 'kinematics', aliases: ['mvc', 'frontal', 'lateral', 'rear', 'rollover', 'rotational', 'up and over', 'down and under'],
    about: ['The type of impact predicts the injury pattern.'],
    points: ['Frontal, down and under: occupant goes down into the seat and forward into the dash or steering column (knees, femurs, hips)',
      'Frontal, up and over: occupant goes up into the steering column or dash and over into the windshield (head, chest, abdomen)',
      'Lateral: the occupant moves sideways with the car, away from the point of impact',
      'Rear-end: the vehicle moves forward under the occupant; neck and back injuries, cervical strain or fracture from hyperextension',
      'Rotational: an off-center part of the vehicle (usually a front corner) hits an object',
      'Rollover: the occupant tumbles inside and may be ejected if unrestrained; injured wherever the body strikes the vehicle'],
    scene: ['Look at the steering wheel, dash, windshield and intrusion', 'Ask about restraints and airbags']
  },
  {
    id: 'restraints', name: 'Restraints, airbags and car seats', group: 'kinematics', aliases: ['seat belt', 'lap belt', 'airbag', 'car seat', 'ejection'],
    about: ['Restraints save lives but cause their own injury patterns.'],
    points: ['Safety belts reduce the risk of fatal injury by 51% and serious injury by 65%',
      'Unrestrained occupants are 30 times more likely to be ejected; 75% of ejected people die from their injuries',
      'Lap belt: at a 45° angle to the floor, between the anterior-superior iliac spine and the femur; injuries still come from bending of the lumbar spine, pelvis, chest and head around it',
      'Pregnancy: lap belt under the belly, across the hips; shoulder strap between the breasts and off to the side of the belly; never across the belly',
      'Higher risk from airbags: children under 13, adults shorter than 4 ft 6 in, older adults, people with special medical conditions',
      'Motor vehicle crashes are the leading cause of death in children 1 to 4 years old'],
    scene: ['Look for a seat belt sign (bruising across the abdomen or chest)', 'Lift the deployed airbag and look at the steering wheel']
  },
  {
    id: 'deceleration', name: 'Deceleration and compression injuries', group: 'kinematics', aliases: ['deceleration', 'compression', 'paper bag', 'ligamentum arteriosum', 'coup'],
    about: ['After an impact, organs keep moving against the structures that hold them. They can tear away from their attachments or be crushed.'],
    points: ['Head: the skull stops, the brain keeps moving and hits the skull (concussion, contusion, laceration)',
      'Chest: the heart and aorta keep moving; the aorta usually shears at the ligamentum arteriosum',
      'Abdomen: kidneys shear from their vascular pedicles, intestines tear their mesentery, the liver can split at its midpoint',
      'Compression to the head: open or closed and depressed skull fractures, brain contusion and bleeding',
      'Compression to the chest: rib and sternal fractures, unstable chest wall, open pneumothorax',
      'Paper bag effect: a closed glottis plus a sudden rise in chest pressure ruptures the lungs',
      'Compression to the abdomen: solid organ rupture, hollow organ perforation; a full bladder ruptures more easily'],
    scene: ['A sudden stop at speed (crash, fall) means look for an aortic injury']
  },
  {
    id: 'motorcycle-ped', name: 'Motorcycles, ATVs and pedestrians', group: 'kinematics', aliases: ['motorcycle', 'atv', 'pedestrian', 'waddell', 'road rash', 'laying the bike down'],
    about: ['Riders and pedestrians have no vehicle around them to absorb energy.'],
    points: ['Motorcycle head-on: rider goes over the handlebars; feet on the pegs means bilateral femur and lower leg fractures; groin into the tank causes perineal injuries',
      'Angular impact: rider caught between the bike and an object; crush injuries, open tibia/fibula/femur fractures on that side',
      'Laying the bike down: massive abrasions (road rash), usually less serious than other impacts',
      'ATV: rear tire runs over a planted foot; extremity fractures, clavicle fractures, serious head and neck injuries',
      'Adult pedestrian: bumper to the lower legs, then the hood, then the ground',
      'Child pedestrian: first impact above the knees or pelvis (femur, pelvic girdle, internal bleeding), then the thorax, then the ground (Waddell\'s triad*)'],
    scene: ['Evaluate the helmet and protective gear', 'Children struck by cars: look for chest, abdominal and head injuries, not just the leg']
  },
  {
    id: 'falls-blast', name: 'Falls, sports and blasts', group: 'kinematics', aliases: ['falls', 'blast', 'calcaneus', 'quinary', 'sports'],
    about: ['Height, landing surface and what hit first determine fall injuries. Blasts injure in five ways.'],
    points: ['Falls from three times the person\'s height (15–20 ft) are more likely to cause severe injury',
      'Feet-first landing: bilateral calcaneus fractures, then the head, torso and pelvis are driven downward (spine)',
      'Infants fall headfirst: skull fractures and intracranial bleeding',
      'Older adults: many low falls, with hip fractures and head injuries',
      'Primary blast: pressure wave, gas-containing organs (ears, lungs, bowel); from high-order explosives',
      'Secondary: flying debris. Tertiary: thrown into objects (like a fall). Quaternary: everything else, including worsening of existing conditions',
      'Quinary: contaminants released by the explosion (chemical, biologic, radiologic; dirty bombs)',
      'Sports: acceleration/deceleration, compression, twisting, hyperextension and hyperflexion; evaluate the protective equipment'],
    scene: ['Ask what hit the ground first', 'With heel fractures from a fall, check the spine']
  },
  {
    id: 'penetrating', name: 'Penetrating trauma and ballistics', group: 'kinematics', aliases: ['gunshot', 'gsw', 'stab', 'cavitation', 'ballistics', 'shotgun'],
    about: ['All penetrating objects cause crushing and stretching of tissue. The object, its speed and the tissue decide which matters most.'],
    points: ['Low energy (knives, needles, ice picks): sharp cutting edges, little crush',
      'Medium energy: handguns and some rifles, muzzle velocity around 1,000 ft/s; high energy: over 2,000 ft/s',
      'Cavitation: tissue pushed away from the projectile\'s tract; usually temporary, permanent if it exceeds the tissue\'s strength',
      'Wounding factors: velocity (most important for cavitation), mass, deformation (bullet flattens), fragmentation, tissue type, range',
      'Shotguns: damage depends on gauge, pellet size, powder charge and distance',
      'Chest wounds can occur without a visible chest wound; always assume serious injury even if the patient looks stable',
      'Bone fragments act as secondary missiles'],
    scene: ['Scene safety first; cut around holes in clothing to preserve evidence', 'Find every wound: back, armpits, groin, creases']
  },

  // ---------------- Bleeding & shock (Ch 36) ----------------
  {
    id: 'hemorrhage', name: 'External and internal hemorrhage', group: 'bleeding', aliases: ['hemorrhage', 'internal bleeding', 'melena', 'hematochezia', 'arterial', 'venous'],
    about: ['Hemorrhage is a leak in the vascular system, external or internal. Internal hemorrhage has higher morbidity and mortality than external.'],
    points: ['External bleeding severity depends on the source (arterial, venous, capillary), how badly the vessel is disrupted, and how much loss the patient can tolerate',
      'Internal bleeding collects in the chest, abdomen, pelvis/retroperitoneum and thigh',
      'Signs of internal bleeding: bright red blood from the mouth, rectum or other orifice; coffee-ground vomit; melena (black, tarry stools); hematochezia (red blood from the rectum)',
      'Dizziness or syncope on sitting or standing; orthostatic hypotension',
      'Fractures can bleed moderately to severely within the first 2 hours'],
    scene: ['Treat for shock on suspicion; hypotension is a late sign*', 'Keep scene time short: surgery fixes internal bleeding']
  },
  {
    id: 'hemostasis', name: 'Hemostasis', group: 'bleeding', aliases: ['clotting', 'coagulation', 'platelet plug', 'fibrin', 'thrombin'],
    about: ['Hemostasis is the body\'s first response to a wound.'],
    points: ['Steps: vasoconstriction, a platelet plug, coagulation, then fibrous tissue grows into the clot and seals the vessel',
      'Within 3 to 6 minutes of a vessel rupturing, the end of the vessel fills with clot',
      'Within 30 minutes the clot retracts and seals the vessel further',
      'Clotting cascade: prothrombin activator forms, it converts prothrombin to thrombin, and thrombin turns fibrinogen into fibrin threads that trap platelets and cells',
      'Movement can break the clot: splint after bleeding is controlled'],
    scene: ['Ask about blood thinners: they impair hemostasis']
  },
  {
    id: 'hemorrhage-control', name: 'Hemorrhage control', group: 'bleeding', aliases: ['tourniquet', 'wound packing', 'hemostatic', 'direct pressure', 'junctional', 'quikclot'],
    about: ['Uncontrolled external bleeding is managed first, with direct pressure. A tourniquet goes on if pressure does not control life-threatening limb bleeding at once, or if you must move immediately.'],
    points: ['Direct pressure controls most bleeding',
      'Tourniquet: once a "last resort", now early; place it high, in the groin for a leg wound and the axilla for an arm wound; improvise if no commercial device',
      'Tighten until the bleeding stops; note the time; do not loosen it in the field*',
      'Junctional bleeding (limb–torso junction) is not controlled by tourniquets: devices include the CRoC, JETT and SAM Junctional Tourniquet',
      'Hemostatic gauze (QuikClot Combat Gauze, Celox, ChitoGauze; XStat for deep narrow wounds): pack it in and hold pressure at least 3 minutes',
      'Splint after bleeding is controlled: movement disrupts clots'],
    scene: ['Expose to find the source; check under the patient', 'A tourniquet hurts: that does not mean it is wrong*']
  },
  {
    id: 'hemorrhagic-shock', name: 'Hemorrhagic shock', group: 'bleeding', aliases: ['hypovolemic', 'classes of hemorrhage', 'compensated', 'decompensated', 'shock index'],
    about: ['Hemorrhagic shock is hypoperfusion from blood loss. The body compensates with tachycardia and vasoconstriction until it cannot.'],
    points: ['Class I: up to 15%, vital signs normal', 'Class II: 15–30%, tachycardia, narrow pulse pressure, BP still normal',
      'Class III: 30–40%, BP falls (decompensated), confused', 'Class IV: over 40%, life-threatening, lethargic',
      'Early signs: anxiety, tachycardia, narrow pulse pressure, cool pale skin, delayed capillary refill',
      'Shock index (HR ÷ SBP) over 1 is concerning'],
    std: true,
    scene: ['Treat the trend, not one BP']
  },
  {
    id: 'fluids', name: 'Fluids, permissive hypotension and TXA', group: 'bleeding', aliases: ['permissive hypotension', 'txa', 'tranexamic', 'lethal triad', 'fluid resuscitation'],
    about: ['The slides (Chapter 41) base fluid strategy on blunt vs penetrating trauma and on whether there is a brain injury. The aim is perfusion, not a normal BP.'],
    points: ['Blunt trauma with hypotension: fluids to keep SBP 80–90 mm Hg (MAP 60–65)',
      'Penetrating trauma: titrate fluids to mental status without restoring a normal BP (permissive hypotension)',
      'Head injury: keep BP normal; one episode of hypotension doubles mortality',
      'TXA (tranexamic acid): antifibrinolytic; blocks plasminogen from becoming plasmin, so clots do not break down',
      'A TXA protocol must be developed with the local trauma system; usually 1 g IV over 10 minutes within 3 hours of injury*',
      'Lethal triad*: hypothermia, acidosis and coagulopathy, each worsening the others'],
    scene: ['IV/IO access en route, not on scene', 'Warm the fluids and the patient'],
    tn: true
  },

  // ---------------- Soft tissue (Ch 36) ----------------
  {
    id: 'skin', name: 'Skin and wound healing', group: 'soft', aliases: ['epidermis', 'dermis', 'keloid', 'wound healing', 'inflammation', 'infection'],
    about: ['The skin has an epidermis (five layers; stratum corneum on top, stratum basale deepest) and a dermis with vessels, nerves, glands and the body\'s repair elements.'],
    points: ['Surface trauma triggers vascular and inflammatory reactions; both can lead to healing or scarring',
      'Delayed healing: advanced age, alcohol and tobacco, uremia, diabetes, immunosuppression, hypoxia, obesity, malnutrition, stress',
      'High-risk wounds for infection: hands, feet, perineum',
      'Keloid: scar tissue beyond the wound borders; hypertrophic scar: excess scar within the borders',
      'Wounds that need closure: cosmetic areas (face, lips, eyebrows), gaping wounds, wounds over joints, degloving, ring finger injuries, skin tears',
      'Inflammation, edema and bloody drainage are normal for the first 3 days'],
    scene: ['Irrigate gross contamination with sterile water or saline; no extensive debridement in the field', 'Ask about tetanus immunization']
  },
  {
    id: 'wounds', name: 'Closed and open wounds', group: 'soft', aliases: ['contusion', 'hematoma', 'abrasion', 'laceration', 'avulsion', 'puncture', 'bites', 'injection'],
    about: ['Closed wounds usually bleed little, but can hide major bleeding in the chest, abdomen, pelvis and legs. Open wounds break the skin.'],
    points: ['Contusion: vessels torn under the epidermis; swelling, pain, ecchymosis. Hematoma: blood collected under the skin',
      'Abrasion: partial-thickness scraping. Laceration: tear, split or incision',
      'Puncture: small entrance, possibly deep; in the chest or abdomen can cause pneumothorax, tamponade, organ damage, evisceration',
      'High-pressure injection injury: looks small, often life- or limb-threatening; may need surgical decompression',
      'Avulsion: full-thickness skin loss; edges cannot be brought together. Degloving: shearing separates skin from the tissue below',
      'Bites: puncture, laceration, avulsion and crush together; all bites need physician evaluation'],
    scene: ['Physician evaluation for nerve, tendon or vessel damage, heavy contamination, facial wounds, foreign bodies and all animal bites']
  },
  {
    id: 'dressings', name: 'Dressings and bandages', group: 'soft', aliases: ['occlusive', 'sterile', 'dressing', 'bandage', 'nonadherent'],
    about: ['Pick the dressing for the job, and apply it so it stops bleeding without cutting off circulation.'],
    points: ['Sterile: when infection is a concern. Nonsterile: when it is not',
      'Occlusive: chest wounds and major vessel wounds, where pneumothorax or air embolism could result',
      'Nonocclusive: most soft-tissue injuries',
      'Adherent: acute bleeding. Nonadherent: after wound closure',
      'Too loose: may not stop bleeding. Too tight: ischemia and damage to vessels, nerves, tendons, muscle and skin',
      'Steps: assess the wound, irrigate gross contaminants, apply and secure the dressing, tape loose ends'],
    scene: ['Check distal pulse, motor and sensation after bandaging']
  },
  {
    id: 'amputation-impaled', name: 'Avulsions, amputations and impaled objects', group: 'soft', aliases: ['amputation', 'impaled', 'amputated part', 'avulsed tissue'],
    about: ['Control the bleeding, save the part, and leave impaled objects in place.'],
    points: ['Avulsion still attached: clean off gross contaminants with saline, fold the skin back to its normal position, bulky pressure dressing',
      'Tissue or limb separated: wrap in gauze, dry or moistened with lactated Ringer\'s or saline, seal in a plastic bag, float the bag in ice water; never put tissue directly on ice',
      'Retrieve the part, but do not delay transport to find it',
      'Amputation bleeding: direct pressure first; tourniquet if the vessel cannot be found and bleeding continues',
      'Impaled object: do not remove or move it; pressure around it; stabilize it with bulky dressings; keep the patient still',
      'Exceptions* for removal: an object in the cheek blocking the airway, or one that prevents CPR'],
    scene: ['Take the part to the hospital with the patient', 'Cut the object only if needed to transport, and stabilize it first*']
  },
  {
    id: 'crush-compartment', name: 'Crush injury, crush syndrome and compartment syndrome', group: 'soft', aliases: ['crush syndrome', 'compartment', 'rhabdomyolysis', 'six ps'],
    about: ['Crush injury depends on how much pressure, for how long, and where. Crush syndrome is the life-threatening complication of prolonged compression and may not appear until the pressure is released.'],
    points: ['Crush syndrome: most likely in disasters with delayed extrication; ARDS, infection and sepsis can follow',
      'Management is controversial: coordinate with rescue so release from entrapment follows medical treatment',
      'Release floods the blood with potassium, acid and myoglobin*: hyperkalemia, dysrhythmias, kidney damage',
      'Compartment syndrome: rising pressure in a tight fibrous sheath (below the knee, above the elbow), usually from crush or blunt trauma',
      'Other causes: electrical injury, bleeding into the compartment, circumferential deep burns, vascular occlusion, high-pressure injection, immobility, D50 extravasation',
      'Six Ps: pain, pallor, paresthesia, pulselessness, paralysis, poikilothermia',
      'Earliest finding: pain on passive stretch; also pain out of proportion, woodlike firmness, tenderness, weakness'],
    scene: ['Start treatment before the patient is released', 'Monitor the ECG for peaked T waves after release*'],
    tn: true
  },

  // ---------------- Burns (Ch 37) ----------------
  {
    id: 'burn-types', name: 'Burn sources and the body\'s response', group: 'burns', aliases: ['thermal', 'burn shock', 'zone of coagulation', 'zones'],
    about: ['Most burns are thermal (flames, scalds, hot objects). Damage depends on temperature and duration. Chemical, electrical (including lightning) and radiation burns are the other sources.'],
    points: ['Full-thickness burns have three zones in a bull\'s-eye; the center is the zone of coagulation (then stasis and hyperemia*)',
      'Burn shock: within minutes, capillaries everywhere (not just in the burn) leak fluid',
      'Fluid shifts from the vessels into the tissues, and evaporates through lost skin: hypovolemia',
      'Sodium is lost, potassium is released, and the blood becomes concentrated',
      'Burn shock lasts about 24 hours, until capillary permeability returns to normal',
      'Systemic effects: pulmonary, GI, musculoskeletal, neuroendocrine, metabolic, immune and emotional'],
    scene: ['Burns alone do not cause early shock: look for another injury*']
  },
  {
    id: 'burn-depth', name: 'Burn depth', group: 'burns', aliases: ['superficial', 'partial thickness', 'full thickness', 'first degree', 'second degree', 'third degree'],
    about: ['Burns are classified by how deep they go.'],
    points: ['Superficial (first-degree): painful, red, dry, blanches with pressure',
      'Partial thickness (second-degree): superficial partial thickness has blisters (hot liquids, flash burns, grease, flame); deep partial thickness reaches the reticular layer of the dermis',
      'Full thickness (third-degree): the whole epidermis and dermis are destroyed, plus some subcutaneous tissue; needs a skin graft',
      'Full thickness looks white, brown or charred and leathery, and is painless in the center*'],
    scene: ['Stop the burning first']
  },
  {
    id: 'burn-size', name: 'Burn size, severity and burn centers', group: 'burns', aliases: ['rule of nines', 'lund browder', 'tbsa', 'burn center', 'palm'],
    about: ['Burn size, as % of total body surface area (TBSA), drives fluids and destination.'],
    points: ['Rule of nines: TBSA in multiples of 9%; a rough estimate, most accurate for adults and children over 10',
      'Adult*: head 9, each arm 9, front of trunk 18, back of trunk 18, each leg 18, perineum 1. Child*: head 18, each leg 14',
      'Lund-Browder chart: more accurate; adjusts body-part percentages for age',
      'Rule of palms*: the patient\'s palm with fingers is about 1%',
      'ABA categorizes burns as major, moderate or minor by extent, depth, location, age, agent, inhalation injury and other injuries or illness',
      'Burn center: partial thickness over 10%, face/hands/feet/genitalia/perineum/major joints, any full thickness, electrical (including lightning), chemical, inhalation injury, complicating medical disorders, children, special rehab needs'],
    scene: ['Estimate TBSA, but do not delay transport to calculate']
  },
  {
    id: 'burn-care', name: 'Burn management and fluids', group: 'burns', aliases: ['parkland', 'rule of 10', 'fluid', 'cooling', 'escharotomy'],
    about: ['Stop the burning, protect the airway, and replace fluid for burn shock.'],
    points: ['Stop the burning: small burns, cool with cool tap water; large burns, move to safety; flaming clothing, roll in a blanket or douse with room-temperature water',
      'Remove clothing and jewelry, then cover with a dry sterile dressing or clean dry sheet',
      'Humidified high-concentration oxygen for severe burns or suspected inhalation injury',
      'Parkland formula: 2–4 mL × kg × %TBSA of lactated Ringer\'s or NS over 24 hours: 50% in the first 8 hours, 25% in the second 8, 25% in the third 8',
      'Rule of 10 (40 kg and over): TBSA to the nearest 10 × 10 = mL/h (40–80 kg); add 100 mL/h for every 10 kg over 80 kg',
      'Children: fluids for burns of 10–20% TBSA or more, plus D5LR at maintenance (low glycogen stores); check glucose',
      'Circumferential burns act like a tourniquet; face burns swell fast'],
    scene: ['BP from an unburned limb, or gauze under the cuff if all are burned', 'Monitor SpO2, ETCO2 and ECG in severe burns']
  },
  {
    id: 'inhalation', name: 'Inhalation injury and carbon monoxide', group: 'burns', aliases: ['inhalation', 'carbon monoxide', 'cyanide', 'supraglottic', 'stridor'],
    about: ['Pulmonary complications cause 77% of deaths in residential fires, most from carbon monoxide. Heat, oxygen use by the fire, CO, and toxic gases (cyanide, hydrogen sulfide) all contribute.'],
    points: ['Carbon monoxide: colorless, odorless, tasteless; does not damage the lungs but displaces oxygen from hemoglobin (carboxyhemoglobin)',
      'CO care: patent airway, ventilation, high-concentration oxygen; SpO2 can read falsely normal*',
      'Above the glottis: heat causes rapid swelling of the pharynx and larynx',
      'Supraglottic signs: facial burns, singed hair, carbonaceous sputum, oral edema, hoarse voice, stridor, brassy cough, grunting',
      'Below the glottis: mostly toxic chemicals; wheezes, crackles, productive cough, bronchospasm, starting hours later',
      'Lost consciousness or an enclosed space: suspect inhalation injury',
      'Laryngeal edema can make intubation difficult or impossible; voice changes and stridor are key signs'],
    scene: ['Secure the airway early when swelling is coming', 'Cyanide from closed-space fires: hydroxocobalamin*']
  },
  {
    id: 'chemical-electrical', name: 'Chemical, electrical and radiation burns', group: 'burns', aliases: ['chemical', 'electrical', 'lightning', 'radiation', 'hydrofluoric', 'phosphorus', 'rem'],
    about: ['Stop the burning process. For most chemicals, nothing beats water.'],
    points: ['Chemical: remove all clothing including shoes, brush off powders, remove blisters that may hold chemical, irrigate with large amounts of water',
      'In a stable patient, irrigation comes before transport unless it can continue en route; eyes: flush (nasal cannula for both eyes); no antidote beats water',
      'Hydrofluoric acid: irrigate 15 minutes. Alkali metals (sodium, potassium): remove or cover with oil. White phosphorus: wet dressings or submerge',
      'Electrical: direct contact, arc, and flame/flash injuries; internal damage can be far worse than the skin; check joints and creases for entry/exit sites; early fluids',
      'Lightning: damage often travels over the skin; treat in a sheltered area during a storm',
      'Radiation: protect with time, distance, shielding and quantity; over 200 rem causes vomiting and diarrhea within 24 hours; 600 rem or more has high mortality',
      'Clean radiation patient: exposed but not contaminated. Dirty: contaminated'],
    scene: ['Scene safety: power off, hazmat, radiation secured before entry', 'Cardiac monitor for electrical injuries']
  },

  // ---------------- Face, eye & neck (Ch 38) ----------------
  {
    id: 'facial-fractures', name: 'Facial fractures', group: 'face', aliases: ['le fort', 'mandible', 'zygoma', 'orbit', 'blowout', 'epistaxis'],
    about: ['The face bleeds a lot but is seldom the life threat, unless it blocks the airway.'],
    points: ['Signs: asymmetry, crepitus, malocclusion, step-off of the orbital rim, nasal deviation, limited jaw or eye movement, numbness, visual changes',
      'Mandible: malocclusion, chin numbness, cannot open the mouth, drooling; anterior dislocation locks the mouth open',
      'Le Fort I: maxilla up to the nasal fossa. Le Fort II: pyramid through the nasal bones and medial orbits. Le Fort III: face separated from the skull',
      'Midface fracture signs: "donkey face" (lengthened), unstable maxilla, epistaxis, CSF rhinorrhea; often with brain and spine injury',
      'Orbital blowout: periorbital edema, double vision, sunken globe (enophthalmos), numbness below the eye, painful eye movement',
      'Nasal bones are the weakest and most often fractured facial bones'],
    scene: ['Consider spinal precautions; suction and maintain the airway', 'Epistaxis: sit up, lean forward, pinch the nares; unconscious on their side if no contraindication']
  },
  {
    id: 'eye-ear-teeth', name: 'Eye, ear and dental injuries', group: 'face', aliases: ['eye', 'hyphema', 'globe', 'tympanic', 'avulsed tooth', 'corneal abrasion'],
    about: ['Check visual acuity, pupils and eye movements (H pattern). All eye trauma needs a physician or ophthalmologist.'],
    points: ['Corneal abrasion: pain, foreign body feeling, light sensitivity, tearing, decreased vision',
      'Blunt eye injury (hyphema, globe rupture): gentle pressure for bleeding, metal shield or cup, head up 30–45°, avoid straining, analgesics and antiemetics',
      'Penetrating globe injury or object: stabilize it, cover with a cup, cover the other eye too',
      'Chemical in the eye: a true emergency; irrigate both eyes for 20 minutes; remove contact lenses only for chemical exposure',
      'Ruptured eardrum: from objects, pressure changes, blasts, diving; usually heals on its own',
      'Avulsed tooth: reimplant if out less than 15 minutes; otherwise store in cell-preserving fluid, cold whole milk, or saline briefly; do not rinse, scrub or let it dry'],
    scene: ['Tell medical direction about avulsed teeth so a dentist can be ready']
  },
  {
    id: 'neck', name: 'Anterior neck trauma', group: 'face', aliases: ['neck zones', 'zone i', 'air embolism', 'larynx', 'trachea', 'esophagus'],
    about: ['Neck injuries threaten the airway and the great vessels.'],
    points: ['Zone I: sternal notch to the clavicles/cricoid; highest mortality (great vessels and chest)',
      'Zone II: cricoid to the angle of the jaw; most common',
      'Zone III: above the angle of the jaw; distal carotid, salivary glands, pharynx',
      'Swelling or a hematoma can close the airway; cricothyrotomy is the last resort',
      'Venous neck wound: occlusive dressing; supine or Trendelenburg to prevent air embolism; if one is suspected, left side with head down',
      'Laryngeal fracture: voice change, loss of the thyroid cartilage prominence, hemoptysis, subcutaneous emphysema',
      'Esophageal injury: subcutaneous emphysema, hematoma, bleeding from mouth and nose; semi-Fowler position'],
    scene: ['Watch for an expanding hematoma, stridor and subcutaneous air']
  },

  // ---------------- Head & brain (Ch 38) ----------------
  {
    id: 'skull', name: 'Scalp wounds, skull fractures and cranial nerves', group: 'head', aliases: ['basilar skull', 'battle sign', 'raccoon eyes', 'depressed', 'linear', 'cranial nerve'],
    about: ['Skull fractures range from minor linear cracks to open vault fractures with exposed brain.'],
    points: ['Scalp: direct pressure, head elevated 30°',
      'Linear fracture: usually low risk; crossing the meningeal groove can cause an epidural bleed',
      'Basilar skull fracture: Battle\'s sign, raccoon eyes, blood behind the eardrum, CSF from the nose or ears, hearing loss, facial palsy',
      'Depressed fracture: small object at high speed; high risk of infection and seizures',
      'Open vault fracture: brain exposed; high mortality, meningitis risk',
      'Cranial nerve I loss of smell is a hallmark of basilar skull fracture; CN III compression gives a dilated, fixed pupil on the same side',
      'No nasal airway or nasogastric tube with a suspected basilar skull fracture*'],
    scene: ['Do not stop CSF drainage from the ears or nose*']
  },
  {
    id: 'tbi-icp', name: 'Traumatic brain injury and ICP', group: 'head', aliases: ['tbi', 'icp', 'intracranial pressure', 'cpp', 'cushing', 'herniation', 'secondary brain injury'],
    about: ['Primary brain injury happens at impact. Secondary brain injury follows from hypoxia, hypo- or hypercapnia, aspiration, chest injury, anemia and hypotension, and high or low glucose.'],
    points: ['CPP = MAP − ICP. Normal MAP 85–95, ICP 10–15 or less, CPP 70–80 mm Hg',
      'As ICP rises, CPP falls; the body raises MAP, which raises ICP further; then herniation',
      'Early signs of rising ICP: headache, nausea and vomiting, altered level of consciousness',
      'Cushing\'s triad (late): rising systolic BP, bradycardia, irregular respirations',
      'Posturing (decorticate, decerebrate) and breathing patterns: Cheyne-Stokes, central neurogenic hyperventilation, ataxic',
      'Deteriorating mental status is the most important sign of rising ICP',
      'Hyperventilate (ETCO2 30–35) only with signs of herniation*'],
    scene: ['Prevent secondary injury: oxygen, ventilation and BP', 'Head of the bed 30°; have suction ready']
  },
  {
    id: 'brain-bleeds', name: 'Brain bleeds and contusions', group: 'head', aliases: ['epidural', 'subdural', 'subarachnoid', 'contusion', 'coup', 'contrecoup'],
    about: ['Focal injuries are concentrated in one area of the brain. Bleeds are named by where the blood collects.'],
    points: ['Cerebral contusion: bruised brain at the impact (coup) or opposite side (contrecoup); seizures, weakness, aphasia, personality change; main danger is rising ICP',
      'Epidural hematoma: between the skull and dura; may lose consciousness, then a lucid interval, then decline; needs surgery fast',
      'Epidural bleeds come classically from the middle meningeal artery* (the slides say middle cerebral)',
      'Subdural hematoma: between the dura and arachnoid; acute (within 24 h), subacute (2–10 days), chronic (after 2 weeks); older adults, clotting problems, brain atrophy',
      'Subarachnoid hemorrhage: blood in the CSF; sudden severe headache, meningeal irritation',
      'Cerebral hematoma: within the brain; once symptoms appear, rapid decline'],
    scene: ['Anticoagulated + head strike = trauma center', 'A patient knocked out and now awake still needs a hospital']
  },
  {
    id: 'dai', name: 'Concussion and diffuse axonal injury', group: 'head', aliases: ['concussion', 'dai', 'diffuse axonal', 'amnesia'],
    about: ['Diffuse brain injuries are graded by how much axonal damage there is.'],
    points: ['Mild DAI (concussion): brief loss or change of consciousness, then drowsiness, confusion and a fairly quick return to normal; the most common brain injury',
      'Retrograde amnesia (before the event) and antegrade amnesia (after it)',
      'Also vomiting, combativeness, visual disturbances, balance problems; observe 24–48 hours',
      'Loss of consciousness over 5 minutes suggests a more serious injury',
      'Moderate DAI: petechial bruising, often with basilar skull fracture; unconscious, then lasting confusion and amnesia; quiet, dim, reorient often',
      'Severe DAI: shearing of axons in both hemispheres into the brainstem; prolonged unconsciousness, posturing'],
    scene: ['Frequent LOC checks; airway and tidal volume']
  },
  {
    id: 'head-care', name: 'Head injury care and scoring', group: 'head', aliases: ['gcs', 'glasgow', 'revised trauma score', 'head injury management', 'hypertonic'],
    about: ['Open the airway, then ventilate with high-concentration oxygen. Then support the circulation.'],
    points: ['Keep SaO2 at or above 90%; use capnography to guide ventilation, or give normal ventilations without it',
      'Keep BP normal; one episode of hypotension doubles mortality',
      'Restrict fluids if there is no hypotension; isotonic bolus for hypovolemia from another injury; hypertonic fluid (if available) for GCS below 8 with suspected high ICP',
      'GCS and pupils every 5 minutes; a drop of 2 points with a GCS of 9 or lower is significant',
      'GCS: 15 highest, 3 lowest; moderate TBI 9–13, severe 8 or less; score it after airway, breathing and circulation are supported',
      'Revised Trauma Score: GCS, SBP and RR; 0 is most critical, 12 least; usually calculated in the ED',
      'Anticonvulsants are not given in initial management because they sedate; cardiac problems after brain injury are usually reversible'],
    scene: ['Monitor the ECG for rhythm changes from rising ICP', 'Expect vomiting'],
    tn: true
  },

  // ---------------- Spine (Ch 39) ----------------
  {
    id: 'spine-anatomy', name: 'Spinal anatomy and mechanisms', group: 'spine', aliases: ['vertebrae', 'cauda equina', 'axial loading', 'flexion', 'distraction', 'wedge'],
    about: ['The spine has 33 vertebrae in five sections. The cord ends at about L1–L2 in adults (L3 in infants); below that is the cauda equina.'],
    points: ['Mechanisms: axial loading (vertical compression), flexion, hyperextension, hyperrotation, lateral bending, distraction (stretching)',
      'Subluxation: a vertebra dislocates into the canal',
      'Most injured regions, in order: C5–C7, C1–C2, T12–L2',
      'Wedge fractures: hyperflexion. Teardrop fractures: severe hyperflexion plus compression; unstable',
      'Primary cord injury happens at impact; secondary injury (swelling, ischemia, bone fragments) can be prevented',
      'Leading causes of spinal cord injury: crashes, falls, violence, sports, medical procedures'],
    scene: ['The paramedic\'s key role is preventing secondary injury']
  },
  {
    id: 'smr', name: 'Spinal motion restriction criteria', group: 'spine', aliases: ['smr', 'nexus', 'backboard', 'cervical collar', 'immobilization', 'criteria'],
    about: ['Apply clear clinical criteria, not just the mechanism. The spine is treated as a long bone with a joint at each end (head and pelvis).'],
    points: ['SMR criteria: GCS below 15, spinal pain or tenderness, neurologic deficit or complaint, anatomic deformity, unreliable patient',
      'Unreliable: GCS below 15, intoxicated, distracting injury, communication problems',
      'Negative mechanism with no signs or symptoms: no SMR needed',
      'No role for SMR in penetrating trauma unless another mechanism calls for it',
      'Rigid collar: midline pain or tenderness, deformity, unreliable patient, focal deficit, torticollis in children; must fit and not block the mouth or breathing',
      'A collar alone does not stabilize the spine',
      'Avoid transporting patients on a long backboard; it is for moving them'],
    scene: ['Manual in-line stabilization (no traction) until a collar is on', 'Stop moving the head if it causes resistance, spasm, pain, new deficits or airway problems']
  },
  {
    id: 'smr-techniques', name: 'SMR techniques, extrication and helmets', group: 'spine', aliases: ['log roll', 'rapid extrication', 'helmet removal', 'diving', 'short board'],
    about: ['Stabilize the head and neck by hand before using any device.'],
    points: ['Log roll: one rescuer at the head directs; roll in one organized move',
      'Short backboard: SMR for a sitting patient or confined space',
      'Rapid extrication: rotate in short controlled moves so the back faces the door, then slide onto the long board',
      'Full-face helmet: remove early to manage the airway (two rescuers: one holds the helmet, one takes over the neck)',
      'Sports helmets: leave on with shoulder pads; trainers can remove the face mask',
      'Diving: float the patient to shallow water, turn supine, slide a board under, collar, float out',
      'Children: pad under the shoulders; do not transport in the car seat if a spinal injury is suspected'],
    scene: ['Pad the voids; secure the torso before the head']
  },
  {
    id: 'neuro-exam', name: 'Spinal neurologic exam', group: 'spine', aliases: ['dermatome', 'motor exam', 'sensory', 'babinski', 't4', 't10'],
    about: ['Assess the spinal cord only after life threats are treated. The exam can be done en route.'],
    points: ['Motor: spread the fingers (T1), extend the hands and fingers (C7), pull the foot and big toe up (L5), push the foot down (S1–S2)',
      'Sensory, light touch with eyes closed: C2–C4 collar around the neck and upper chest',
      'T4 at the nipple line, T10 at the umbilicus, S1 on the soles of the feet',
      'Babinski sign: big toe goes up when the sole is stroked (normal under age 2)',
      'Body position can give clues to the level of injury'],
    scene: ['Document motor and sensation before and after moving the patient']
  },
  {
    id: 'cord', name: 'Cord injuries, spinal shock and neurogenic shock', group: 'spine', aliases: ['neurogenic shock', 'spinal shock', 'central cord', 'brown-sequard', 'anterior cord', 'autonomic hyperreflexia', 'priapism', 'tetraplegia'],
    about: ['Cord lesions are complete (no sensation and complete paralysis below the injury) or incomplete.'],
    points: ['C1–C4 is high tetraplegia; C3–C5 control the diaphragm*',
      'Autonomic dysfunction: bradycardia (T6 and above), hypotension, priapism, no sweating or shivering, poikilothermia, loss of bowel and bladder control',
      'Spinal shock: temporary loss of reflexes below the injury, with flaccid paralysis and autonomic signs',
      'Neurogenic shock: loss of sympathetic tone, vasodilation; usually at or above T6; hypotension with bradycardia and warm, dry skin*',
      'Autonomic hyperreflexia: chronic injury at T6 or above; BP up to 300, pounding headache, sweating and flushing above the injury, bradycardia 30–40',
      'Incomplete syndromes: central cord (arms weaker than legs*), anterior cord (motor, pain and temperature lost; position kept*), Brown-Séquard (same-side motor loss, opposite-side pain and temperature loss*)'],
    scene: ['In trauma, assume hypotension is bleeding until proven otherwise*'],
    tn: true
  },

  // ---------------- Chest (Ch 40) ----------------
  {
    id: 'chest-wall', name: 'Rib, sternal and clavicle fractures and flail chest', group: 'chest', aliases: ['flail', 'rib fracture', 'paradoxical', 'sternum', 'clavicle'],
    about: ['The thoracic cage (12 thoracic vertebrae, 12 ribs, clavicles and sternum) protects the chest organs and keeps the chest from collapsing during breathing.'],
    points: ['Clavicle: 5% of all fractures; the most fractured bone in children',
      'Ribs 3 through 8 break most often, on the lateral side; the danger is a rib piercing the pleura, lung, liver or spleen',
      'Flail chest: 2 or more adjacent ribs broken in 2 or more places; mortality 8–35% from the injuries underneath',
      'Flail signs: bruising, tenderness, crepitus; paradoxical motion is a late sign',
      'Sternal fracture: goes with an unstable chest wall, myocardial injury, tamponade, pulmonary contusion, aortic injury'],
    scene: ['Oxygen, pain control and assisted ventilation for hypoxia*']
  },
  {
    id: 'lung', name: 'Pulmonary contusion and pneumothorax', group: 'chest', aliases: ['pulmonary contusion', 'simple pneumothorax', 'open pneumothorax', 'sucking chest wound', 'communicating'],
    about: ['Air in the pleural space collapses the lung. A bruised lung bleeds into the alveoli.'],
    points: ['Pulmonary contusion: from rapid deceleration; subtle at first, worse over 24 hours; tachypnea, hypoxia, hemoptysis, crackles',
      'Simple (closed) pneumothorax: chest pain, dyspnea, tachypnea, diminished breath sounds on that side',
      'Open (communicating) pneumothorax: wound open to the air; severity matches wound size; sucking or gurgling sound',
      'A small open wound can act as a ball valve, letting air in but not out, and become a tension pneumothorax',
      'Cover open chest wounds with a sterile occlusive dressing'],
    scene: ['Watch for tension after sealing a wound']
  },
  {
    id: 'tension', name: 'Tension pneumothorax and hemothorax', group: 'chest', aliases: ['tension pneumothorax', 'needle decompression', 'hemothorax', 'burp', 'obstructive shock'],
    about: ['Tension pneumothorax develops when air cannot leave the pleural space. It cuts cardiac output and causes obstructive shock.'],
    points: ['Signs: increasing dyspnea, hard to ventilate with a bag-mask, decreased or absent breath sounds on one side',
      'Also anxiety, cyanosis, hypotension or unexplained shock, JVD, unequal chest rise, hyperresonance, subcutaneous emphysema; tracheal deviation is late',
      'Penetrating: "burp" the dressing (lift it briefly) to release air, then reseal',
      'Closed: decompress with a large-bore needle or commercial kit',
      'Sites*: 2nd intercostal space midclavicular line, or 4th/5th space anterior/mid-axillary line; go over the top of the rib',
      'Hemothorax: blood in the pleural space; dyspnea, diminished breath sounds, hypovolemic shock, narrow pulse pressure, trachea shifted to the unaffected side'],
    scene: ['Decompress on clinical signs; do not wait for tracheal deviation*']
  },
  {
    id: 'heart', name: 'Myocardial contusion, tamponade and rupture', group: 'chest', aliases: ['tamponade', 'beck', 'myocardial contusion', 'pulsus paradoxus', 'electrical alternans', 'rupture'],
    about: ['Heart and great vessel injuries can cause dysrhythmias, heart failure, cardiogenic shock, tamponade, rupture and coronary occlusion.'],
    points: ['Myocardial contusion: chest hits the dash or steering wheel; may feel like an MI; sinus tachycardia in 70%, ventricular rhythms, ST elevation, RBBB, new murmur',
      'Pericardial tamponade: blood in the pericardial sac stops the heart from refilling',
      'JVD is the single best way to tell tamponade from hemorrhagic shock',
      'Tamponade signs: tachycardia, respiratory distress, narrow pulse pressure, cyanosis of the head, neck and arms',
      'Pulsus paradoxus: SBP drops more than 10–15 mm Hg on inspiration. Electrical alternans: ECG amplitude changes every other beat',
      'Beck\'s triad*: hypotension, JVD, muffled heart sounds',
      'Myocardial rupture: mostly from crashes; tension pneumothorax mimics it with tamponade'],
    scene: ['Rapid transport: tamponade needs pericardiocentesis or surgery*']
  },
  {
    id: 'vessels-other', name: 'Aorta, airway, esophagus and diaphragm', group: 'chest', aliases: ['aortic', 'traumatic asphyxia', 'diaphragm', 'tracheobronchial', 'esophageal', 'commotio cordis'],
    about: ['Shearing, crushing and penetrating forces injure the great vessels and the structures around them.'],
    points: ['Blunt thoracic aortic injury: shearing from rapid deceleration (high-speed crash, falls from height, crush); usual site is the distal arch',
      'Suspect it in unexplained shock with a deceleration mechanism; pulses may differ between the arms or between arms and legs',
      'Traumatic asphyxia: severe crushing of the chest and abdomen; purple-red face and neck (pink below), JVD, subconjunctival bleeding and petechiae',
      'Tracheobronchial injury: severe hypoxia, massive subcutaneous emphysema, hemoptysis',
      'Esophageal injury: pain, fever (late), hoarseness, trouble swallowing, mediastinal and subcutaneous emphysema',
      'Diaphragmatic rupture: abdominal compression pushes organs into the chest; hollow-looking abdomen, bowel sounds in the chest',
      'Commotio cordis*: a blow to the chest at a vulnerable moment causes VF; defibrillate'],
    scene: ['Penetrating great vessel wounds bring massive hemothorax, shock and tamponade']
  },

  // ---------------- Abdomen (Ch 41) ----------------
  {
    id: 'abdominal-mech', name: 'Abdominal trauma: mechanisms and assessment', group: 'abdomen', aliases: ['blunt abdominal', 'penetrating abdominal', 'unexplained shock', 'evisceration'],
    about: ['Penetrating abdominal trauma has a higher mortality; blunt trauma often injures several organ systems. The most significant sign of abdominal injury is unexplained shock.'],
    points: ['Blunt: compression crushes organs; shearing tears organs and vessels at their attachments',
      'Penetrating: bleeding from major vessels or solid organs, bowel perforation',
      'Signs: bleeding, pain, tenderness or guarding, rigidity and distension, evisceration, rib or pelvic fractures; their absence does not rule injury out',
      'History: seat belt use, seat position, alcohol or drugs, medical problems, anticoagulants',
      'Care: airway with spinal precautions, ventilation, wound care, judicious fluids, rapid transport; keep SpO2 at 94% or more',
      'Evisceration*: moist sterile dressing, then an occlusive dressing; never push organs back in'],
    scene: ['Listen for bowel sounds only en route; never delay transport for it']
  },
  {
    id: 'solid-hollow', name: 'Solid and hollow organ injuries', group: 'abdomen', aliases: ['liver', 'spleen', 'kehr', 'hollow organ', 'peritonitis', 'cullen', 'grey turner'],
    about: ['Solid organs bleed fast; hollow organs spill and infect.'],
    points: ['Liver and spleen are injured most often and can bleed to death',
      'Liver: steering wheel or lap belt injury or epigastric trauma; blood and bile cause shock and peritoneal irritation; mortality 54% from uncontrolled bleeding',
      'Spleen: left upper abdominal impact; may have only minor symptoms at first',
      'Kehr\'s sign: referred left shoulder pain from blood irritating the diaphragm (the slides also note right shoulder pain with liver or gallbladder irritation)',
      'Hollow organs: peritonitis, sepsis and abscess; can be delayed for hours or days',
      'Stomach is protected and rarely injured by blunt trauma; bowel injuries need a lot of force, so look for other injuries',
      'Cullen\'s sign (around the navel) and Grey Turner\'s sign (flanks)*: late signs of internal bleeding'],
    scene: ['Treat for shock on suspicion']
  },
  {
    id: 'retro-gu', name: 'Retroperitoneal, urinary and vascular injuries', group: 'abdomen', aliases: ['kidney', 'bladder', 'urethra', 'pancreas', 'retroperitoneal', 'pelvic fracture'],
    about: ['The retroperitoneum holds the kidneys, adrenals, ureters, pancreas, duodenum and part of the esophagus. Bleeding there can be massive, usually from pelvic or lumbar fractures.'],
    points: ['Kidneys: contusions heal on their own; lacerations and fractures may need surgery',
      'Pancreas and duodenum: more often penetrating; duodenal injury usually goes with pancreatic injury',
      'Pelvic fractures cause severe retroperitoneal bleeding; mortality 6.4–19%',
      'Bladder: ruptures more easily when full; blood in the urine, unable to void',
      'Urethra: blood at the meatus strongly suggests injury; no urinary catheter',
      'Major vessels: aorta, IVC, renal, mesenteric and iliac vessels have the highest mortality; may cause a palpable mass'],
    scene: ['Pelvic binder for a suspected pelvic fracture']
  },

  // ---------------- Orthopaedic (Ch 42) ----------------
  {
    id: 'msk-basics', name: 'Fractures, sprains, strains and dislocations', group: 'msk', aliases: ['fracture', 'sprain', 'strain', 'dislocation', 'subluxation', 'luxation'],
    about: ['If trauma to an extremity is suspected, manage it as a fracture.'],
    points: ['Fracture: any break in the continuity of bone; complete or incomplete, open or closed; can bleed moderately to severely within 2 hours',
      'In children the epiphyseal (growth) plate separates the head of a long bone from the shaft',
      'Sprain: ligament injury, graded by severity; ice for the first 24–72 hours',
      'Strain: muscle or tendon injury from overexertion or overextension',
      'Dislocation: bone ends displaced in a joint. Luxation: complete; subluxation: incomplete',
      'Signs: pain on palpation or movement, swelling, deformity, crepitus, decreased range of motion, false movement, decreased distal sensation or circulation'],
    scene: ['Never let a grotesque injury distract from the primary assessment', 'Compare with the uninjured limb']
  },
  {
    id: 'splinting', name: 'Splinting principles', group: 'msk', aliases: ['splint', 'traction splint', 'rigid splint', 'vacuum splint', 'six ps', 'reposition'],
    about: ['Splinting relieves pain, decreases tissue injury, controls bleeding, contains contamination in open wounds, and makes transport easier.'],
    points: ['Check pulse, motor and sensation distal to the injury (six Ps) before and after',
      'Rigid splints: shape cannot change; pad them',
      'Soft or formable: pillows, blankets, sling and swathe, vacuum, cardboard, ladder, padded aluminum, air splints',
      'Traction splint: femur fractures; aligns, tamponades bleeding, reduces pain',
      'Immobilize fractures and dislocations in the position found and transport',
      'If transport is delayed and circulation is compromised, medical direction may allow one attempt at gentle traction along the long axis; if resistance, splint as is',
      'Limb threats: knee dislocation, ankle fracture or dislocation, subcondylar elbow fractures'],
    scene: ['Splint the joints above and below a fracture*', 'Ice and elevation']
  },
  {
    id: 'upper', name: 'Upper extremity injuries', group: 'msk', aliases: ['shoulder', 'humerus', 'elbow', 'wrist', 'colles', 'silver fork', 'boxer'],
    about: ['Upper extremity fractures are common in older adults, often from a fall on an outstretched hand.'],
    points: ['Shoulder: sling and swathe; improvise a splint for the position found',
      'Humerus: radial nerve injury, axillary nerve damage (deltoid); rigid splint plus sling and swathe',
      'Elbow: children and athletes; risk of vascular injury; no reduction in the field; consult medical direction',
      'Radius, ulna, wrist: fall on an outstretched hand; "silver fork" deformity most common',
      'Hand: boxer\'s fracture (metacarpal); splint in the position of function',
      'Fingers: not trivial; foam aluminum splint or tongue depressor'],
    scene: ['Check radial pulse and hand sensation']
  },
  {
    id: 'lower', name: 'Pelvis and lower extremity injuries', group: 'msk', aliases: ['pelvic binder', 'hip', 'femur', 'knee', 'tibia', 'traction splint'],
    about: ['Lower extremity injuries involve greater forces and more blood loss and can be life-threatening.'],
    points: ['Pelvic fracture: suspect from mechanism, shock, a gap at the pubis, or tenderness/instability on light palpation of the iliac crests; pelvic binder',
      'Hip fracture: leg shortened and externally rotated. Hip dislocation: usually shortened and internally rotated',
      'Hip: long backboard or scoop; padding under the knee for comfort',
      'Femur: shortened, externally rotated, midthigh swelling from bleeding; traction splint',
      'Knee: popliteal artery is close; splint as found, not fully extended; no traction splint',
      'Tibia: the most fractured long bone; with knee injury suspect popliteal vascular injury',
      'Open fractures: sterile dry dressing; do not irrigate or soak in antiseptic; cover exposed bone with saline-moistened gauze'],
    scene: ['Binder centered over the greater trochanters*']
  },
  {
    id: 'msk-pain', name: 'Pain management in trauma', group: 'msk', aliases: ['pain', 'fentanyl', 'ketamine', 'nitrous oxide', 'analgesia'],
    about: ['Pain control helps breathing, reduces stress, and makes splinting possible. The slides say to give analgesia per local protocol.'],
    points: ['Splinting, ice and elevation first',
      'Fentanyl*: fast, short-acting, less hypotension than morphine',
      'Ketamine*: severe pain, keeps airway reflexes and BP',
      'Watch for respiratory depression and hypotension after opioids*',
      'TN class deck: nitrous oxide for musculoskeletal trauma; head injury listed as a contraindication for fentanyl, morphine and ketamine'],
    scene: ['Reassess pain on a 0–10 scale after each dose*'],
    tn: true
  },

  // ---------------- Special populations (beyond the slides) ----------------
  {
    id: 'peds-trauma', name: 'Pediatric trauma', group: 'special', aliases: ['pediatric', 'child', 'children', 'peds'],
    about: ['Children compensate well and then crash fast.'],
    points: ['Larger head: head injuries are common; pad under the shoulders to keep the airway neutral',
      'Flexible ribs: serious lung and heart injury can happen without rib fractures',
      'Tachycardia is the early sign of shock; hypotension (SBP below 70 + 2 × age) is late',
      'Larger body surface area: they lose heat fast',
      'Injury pattern that does not match the story: suspect abuse'],
    std: true,
    scene: ['Use a length-based tape for doses and equipment', 'Pediatric-capable trauma center when possible']
  },
  {
    id: 'geri-trauma', name: 'Geriatric trauma', group: 'special', aliases: ['elderly', 'geriatric', 'older adult', 'anticoagulant', 'beta blocker'],
    about: ['Older adults have less reserve and get hurt worse with less force.'],
    points: ['Falls are the leading cause of trauma death in adults over 65',
      'Beta blockers can hide tachycardia; a "normal" BP may be shock for a usually hypertensive patient',
      'SBP below 110 is a red triage criterion at age 65 and older',
      'Anticoagulants raise the risk of brain bleeds, even from a fall from standing',
      'Brain atrophy stretches the bridging veins: subdural hematomas'],
    std: true,
    scene: ['Ask why they fell (syncope, stroke, dysrhythmia)', 'Pad bony areas and voids for SMR']
  },
  {
    id: 'ob-trauma', name: 'Trauma in pregnancy', group: 'special', aliases: ['pregnant', 'pregnancy', 'supine hypotension', 'abruption'],
    about: ['The best care for the fetus is good care for the mother.'],
    points: ['Blood volume rises up to 50%: the mother can lose 30–35% before showing signs of shock',
      'The fetus suffers first: blood is shunted away from the uterus when the mother compensates',
      'After 20 weeks, the uterus compresses the vena cava when supine: tilt left or manually displace the uterus',
      'Placental abruption can follow even minor trauma: abdominal pain, rigid uterus, vaginal bleeding',
      'Pregnancy over 20 weeks is a yellow triage criterion; the lap belt belongs under the belly'],
    std: true,
    scene: ['Give oxygen generously']
  }
];

window.TRAUMA_TERMS = [
  // systems
  { term: 'Trauma center, Level I', def: 'Full range of specialists and equipment 24 hours a day; the regional resource for severely injured patients', group: 'systems' },
  { term: 'Pre-event phase', def: 'Factors and events before an injury that influence its cause or the response to it', group: 'systems' },
  { term: 'Event phase', def: 'Begins at first contact with the injuring force and ends when the force is no longer applied', group: 'systems' },
  { term: 'Postevent phase', def: 'The phase of trauma care when emergency care is delivered to the patient', group: 'systems' },
  { term: 'Trauma registry', def: 'Data collection that tracks injuries and outcomes as part of a trauma system', group: 'systems' },
  { term: 'Red criteria', def: 'Field triage findings (injury pattern, mental status, vital signs) that call for the highest-level trauma center', group: 'systems' },
  { term: 'Yellow criteria', def: 'Field triage findings (mechanism, EMS judgment) that call for a trauma center, not always the highest level', group: 'systems' },
  { term: 'MARCH', def: 'Massive hemorrhage, Airway, Respirations, Circulation, Hypothermia/Head: the military primary survey', group: 'systems', std: true },
  // kinematics
  { term: 'Kinematics', def: 'The process of predicting injury patterns from the forces involved', group: 'kinematics' },
  { term: 'Kinetic energy', def: 'Energy of motion: one-half the mass multiplied by the velocity squared', group: 'kinematics' },
  { term: 'Acceleration', def: 'An increase in velocity', group: 'kinematics' },
  { term: 'Deceleration', def: 'A decrease in velocity', group: 'kinematics' },
  { term: 'Cavitation', def: 'Opening produced by force pushing body tissues away from the tract of a projectile', group: 'kinematics' },
  { term: 'Paper bag effect', def: 'Lung rupture when sudden compression raises intrathoracic pressure against a closed glottis', group: 'kinematics' },
  { term: 'Down-and-under pathway', def: 'Frontal crash where the occupant moves down into the seat and forward into the dash or steering column', group: 'kinematics' },
  { term: 'Up-and-over pathway', def: 'Frontal crash where the occupant moves up into the steering column and over into the windshield', group: 'kinematics' },
  { term: 'Primary blast injury', def: 'Injury from the pressure wave of a high-order explosive, mostly to gas-containing organs', group: 'kinematics' },
  { term: 'Tertiary blast injury', def: 'Injury from being thrown by the blast into stationary objects, similar to a fall', group: 'kinematics' },
  { term: 'Quinary blast injury', def: 'Injury from contaminants released by an explosion: chemical, biologic or radiologic', group: 'kinematics' },
  // bleeding
  { term: 'Melena', def: 'Black, tarry stools from bleeding high in the GI tract', group: 'bleeding' },
  { term: 'Hematochezia', def: 'Passage of red blood through the rectum', group: 'bleeding' },
  { term: 'Hemostasis', def: 'The body\'s initial response to wounding: vasoconstriction, platelet plug, coagulation, then sealing', group: 'bleeding' },
  { term: 'Fibrin', def: 'Threads made from fibrinogen by thrombin that trap platelets and cells to form a clot', group: 'bleeding' },
  { term: 'Tourniquet', def: 'Band tightened around a limb above a wound to stop life-threatening bleeding that pressure does not control', group: 'bleeding' },
  { term: 'Junctional hemorrhage', def: 'Bleeding at the junction of an extremity and the torso, where a tourniquet does not work', group: 'bleeding' },
  { term: 'Hemostatic gauze', def: 'Gauze that speeds clotting, packed into a wound with at least 3 minutes of direct pressure', group: 'bleeding' },
  { term: 'Tranexamic acid (TXA)', def: 'Antifibrinolytic that stops plasminogen becoming plasmin, so clots do not break down', group: 'bleeding' },
  { term: 'Permissive hypotension', def: 'Fluid resuscitation that keeps perfusion to vital organs without restoring a normal BP', group: 'bleeding' },
  { term: 'Lethal triad', def: 'Hypothermia, acidosis and coagulopathy: each worsens the others in a bleeding patient', group: 'bleeding', std: true },
  // soft
  { term: 'Contusion', def: 'Blood vessel disruption beneath the epidermis, with swelling, pain and bruising', group: 'soft' },
  { term: 'Ecchymosis', def: 'Bruising: discoloration from blood under the skin', group: 'soft' },
  { term: 'Hematoma', def: 'A collection of blood beneath the skin', group: 'soft' },
  { term: 'Abrasion', def: 'Partial-thickness skin injury from scraping or rubbing away a layer of skin', group: 'soft' },
  { term: 'Laceration', def: 'A tear, split or incision of the skin', group: 'soft' },
  { term: 'Avulsion', def: 'Full-thickness skin loss in which the wound edges cannot be brought together', group: 'soft' },
  { term: 'Degloving injury', def: 'Shearing forces separate the skin from the underlying tissues', group: 'soft' },
  { term: 'Keloid', def: 'Excessive scar tissue that grows beyond the original wound borders', group: 'soft' },
  { term: 'Hypertrophic scar', def: 'Excess scar tissue that stays within the original wound borders', group: 'soft' },
  { term: 'Crush syndrome', def: 'Life-threatening complication of prolonged compression of the body, often seen when the pressure is released', group: 'soft' },
  { term: 'Compartment syndrome', def: 'Rising pressure inside a tight fibrous muscle sheath that cuts off blood flow', group: 'soft' },
  { term: 'Poikilothermia', def: 'Body part or body temperature that varies with the surroundings', group: 'soft' },
  { term: 'Occlusive dressing', def: 'Airtight dressing for chest and major vessel wounds, to prevent pneumothorax or air embolism', group: 'soft' },
  // burns
  { term: 'Superficial burn', def: 'First-degree burn: painful, red, dry, blanches with pressure', group: 'burns' },
  { term: 'Superficial partial-thickness burn', def: 'Second-degree burn with blisters, often from hot liquids, flash burns, grease or flame', group: 'burns' },
  { term: 'Full-thickness burn', def: 'Third-degree burn that destroys the whole epidermis and dermis and needs a skin graft', group: 'burns' },
  { term: 'Zone of coagulation', def: 'The center of a full-thickness burn\'s bull\'s-eye, where tissue is destroyed', group: 'burns' },
  { term: 'Burn shock', def: 'Hypovolemia from capillary leak and fluid loss after a major burn, lasting about 24 hours', group: 'burns' },
  { term: 'Rule of nines', def: 'Divides TBSA into segments of 9%; most accurate for adults and children over 10', group: 'burns' },
  { term: 'Lund-Browder chart', def: 'More accurate burn-size chart that adjusts body-part percentages for age', group: 'burns' },
  { term: 'Parkland formula', def: '2–4 mL × kg × %TBSA over 24 hours: 50% in the first 8 hours, 25% in each of the next two 8-hour periods', group: 'burns' },
  { term: 'Rule of 10', def: '%TBSA to the nearest 10, × 10 = initial fluid rate in mL/h for 40–80 kg; add 100 mL/h per 10 kg over 80', group: 'burns' },
  { term: 'Carboxyhemoglobin', def: 'Hemoglobin bound to carbon monoxide instead of oxygen', group: 'burns' },
  { term: 'Arc injury', def: 'Electrical injury in which current jumps through the air from a high-voltage source to the person', group: 'burns' },
  { term: 'Dirty radiation patient', def: 'A patient who is contaminated with radioactive material, not just exposed', group: 'burns' },
  // face
  { term: 'Le Fort I fracture', def: 'Midface fracture of the maxilla up to the level of the nasal fossa', group: 'face' },
  { term: 'Le Fort II fracture', def: 'Pyramid-shaped midface fracture through the nasal bones and medial orbits', group: 'face' },
  { term: 'Le Fort III fracture', def: 'Complex fracture in which the facial bones separate from the cranial bones', group: 'face' },
  { term: 'Blowout fracture', def: 'Orbital fracture from an object larger than the orbital rim striking the eye', group: 'face' },
  { term: 'Enophthalmos', def: 'A recessed (sunken) globe, as after an orbital fracture', group: 'face' },
  { term: 'Diplopia', def: 'Double vision', group: 'face' },
  { term: 'Hyphema', def: 'Blood in the front chamber of the eye after blunt trauma', group: 'face' },
  { term: 'Barotitis', def: 'Middle ear injury from changes in barometric pressure', group: 'face' },
  { term: 'Zone I neck injury', def: 'Base of the neck, sternal notch to the cricoid; highest mortality', group: 'face' },
  { term: 'Zone II neck injury', def: 'Cricoid to the angle of the mandible; the most common neck injury zone', group: 'face' },
  // head
  { term: 'Basilar skull fracture', def: 'Fracture of the floor of the skull, often with Battle\'s sign, raccoon eyes and CSF leak', group: 'head' },
  { term: 'Battle\'s sign', def: 'Bruising behind the ear over the mastoid, a sign of basilar skull fracture', group: 'head' },
  { term: 'Raccoon eyes', def: 'Bruising around both eyes, a sign of basilar skull fracture', group: 'head' },
  { term: 'Hemotympanum', def: 'Blood behind the eardrum', group: 'head' },
  { term: 'Depressed skull fracture', def: 'Part of the skull pushed below the level of the skull around it', group: 'head' },
  { term: 'Secondary brain injury', def: 'Brain damage after the impact from hypoxia, hypotension, CO2 changes and glucose problems', group: 'head' },
  { term: 'Cerebral perfusion pressure', def: 'MAP minus ICP; normally 70–80 mm Hg', group: 'head' },
  { term: 'Cushing\'s triad', def: 'Increased systolic BP, bradycardia and irregular respirations from rising ICP', group: 'head' },
  { term: 'Coup injury', def: 'Brain damage at the site of impact', group: 'head' },
  { term: 'Contrecoup injury', def: 'Brain damage on the side opposite the impact', group: 'head' },
  { term: 'Epidural hematoma', def: 'Blood between the cranium and the dura, often with a lucid interval', group: 'head' },
  { term: 'Subdural hematoma', def: 'Blood between the dura and the arachnoid mater', group: 'head' },
  { term: 'Subarachnoid hemorrhage', def: 'Bleeding into the CSF, with sudden severe headache and meningeal irritation', group: 'head' },
  { term: 'Retrograde amnesia', def: 'Loss of memory of events before the injury', group: 'head' },
  { term: 'Antegrade amnesia', def: 'Inability to remember events after the injury', group: 'head' },
  { term: 'Diffuse axonal injury', def: 'Brain injury from shearing of axons; mild form is a concussion', group: 'head' },
  // spine
  { term: 'Cauda equina', def: 'The bundle of nerve roots below the end of the spinal cord (about L1–L2 in adults)', group: 'spine' },
  { term: 'Axial loading', def: 'Vertical compression: force sent down the length of the spinal column', group: 'spine' },
  { term: 'Subluxation', def: 'Partial dislocation, as of a cervical vertebra into the spinal canal', group: 'spine' },
  { term: 'Spinal motion restriction', def: 'Keeping the spine aligned as a long bone with joints at the head and pelvis, to prevent further injury', group: 'spine' },
  { term: 'Spinal shock', def: 'Temporary loss or depression of spinal reflexes below the level of injury', group: 'spine' },
  { term: 'Neurogenic shock', def: 'Loss of sympathetic tone to vessels after a cord injury, usually at or above T6', group: 'spine' },
  { term: 'Autonomic hyperreflexia', def: 'In chronic cord injury at T6 or above: sudden severe hypertension, pounding headache, sweating above the injury, bradycardia', group: 'spine' },
  { term: 'Priapism', def: 'Persistent erection, a sign of cord injury at T6 or above', group: 'spine' },
  { term: 'Babinski sign', def: 'Big toe bends up when the sole is stroked; abnormal after age 2', group: 'spine' },
  { term: 'Brown-Séquard syndrome', def: 'Cord hemisection: same-side motor loss, opposite-side pain and temperature loss', group: 'spine', std: true },
  // chest
  { term: 'Flail chest', def: 'Two or more adjacent ribs fractured in two or more places', group: 'chest' },
  { term: 'Pulmonary contusion', def: 'Bruised lung from deceleration, with symptoms that worsen over 24 hours', group: 'chest' },
  { term: 'Simple pneumothorax', def: 'Air in the pleural space without an open wound (closed pneumothorax)', group: 'chest' },
  { term: 'Open pneumothorax', def: 'Chest wound that exposes the pleural space to the atmosphere (communicating pneumothorax)', group: 'chest' },
  { term: 'Tension pneumothorax', def: 'Air that cannot leave the pleural space, causing decreased cardiac output and obstructive shock', group: 'chest' },
  { term: 'Hemothorax', def: 'Blood in the pleural space from the lung or damaged vessels', group: 'chest' },
  { term: 'Traumatic asphyxia', def: 'Severe chest and abdominal crush causing purple-red discoloration of the face and neck', group: 'chest' },
  { term: 'Myocardial contusion', def: 'Blunt injury to the heart muscle, often from the steering wheel or dash', group: 'chest' },
  { term: 'Pericardial tamponade', def: 'Blood in the pericardial sac that prevents the heart from refilling', group: 'chest' },
  { term: 'Pulsus paradoxus', def: 'A drop in systolic BP of more than 10–15 mm Hg during inspiration', group: 'chest' },
  { term: 'Electrical alternans', def: 'ECG waveform amplitude that changes with every other beat', group: 'chest' },
  { term: 'Diaphragmatic rupture', def: 'A tear in the diaphragm that lets abdominal contents into the chest', group: 'chest' },
  // abdomen
  { term: 'Kehr\'s sign', def: 'Referred shoulder pain from blood irritating the diaphragm, classically left shoulder with a spleen injury', group: 'abdomen' },
  { term: 'Peritonitis', def: 'Inflammation of the peritoneum, as from spilled hollow organ contents', group: 'abdomen' },
  { term: 'Retroperitoneum', def: 'The space behind the peritoneum holding the kidneys, pancreas, duodenum and great vessels', group: 'abdomen' },
  { term: 'Hemoperitoneum', def: 'Blood in the peritoneal cavity', group: 'abdomen' },
  { term: 'Gross hematuria', def: 'Visible blood in the urine', group: 'abdomen' },
  { term: 'Evisceration', def: 'Abdominal organs protruding through an open wound', group: 'abdomen' },
  { term: 'Cullen\'s sign', def: 'Bruising around the navel from bleeding in the abdomen', group: 'abdomen', std: true },
  // msk
  { term: 'Fracture', def: 'Any break in the continuity of bone', group: 'msk' },
  { term: 'Sprain', def: 'Injury to a ligament', group: 'msk' },
  { term: 'Strain', def: 'Injury to a muscle or its tendon from overexertion or overextension', group: 'msk' },
  { term: 'Luxation', def: 'Complete dislocation of a joint', group: 'msk' },
  { term: 'Crepitus', def: 'Grating of broken bone ends against each other', group: 'msk' },
  { term: 'Epiphyseal plate', def: 'Growth plate separating the head of a long bone from its shaft in children', group: 'msk' },
  { term: 'Traction splint', def: 'Splint used mostly for femur fractures to align the bone, tamponade bleeding and reduce pain', group: 'msk' },
  { term: 'Boxer\'s fracture', def: 'Fracture of a metacarpal from punching', group: 'msk' },
  { term: 'Silver fork deformity', def: 'Classic deformity of a distal radius fracture from a fall on an outstretched hand', group: 'msk' },
  // special
  { term: 'Supine hypotensive syndrome', def: 'Low BP when a woman over 20 weeks pregnant lies flat and the uterus compresses the vena cava', group: 'special', std: true },
  { term: 'Placental abruption', def: 'The placenta separating from the uterine wall, which can follow even minor trauma', group: 'special', std: true },
  { term: 'Length-based tape', def: 'Tape that estimates a child\'s weight, drug doses and equipment sizes from height', group: 'special', std: true }
];

window.TRAUMA_FACTS = [
  // systems
  { q: 'Unintentional injury is the leading cause of death for which age group?', a: '1 to 44 years', wrong: ['Under 1 year', '45 to 64 years', '65 and older'], group: 'systems' },
  { q: 'In which phase of trauma care does EMS deliver emergency care?', a: 'Postevent', wrong: ['Pre-event', 'Event', 'Rehabilitation'], group: 'systems' },
  { q: 'Which trauma center level has the full range of specialists 24 hours a day and is the regional resource?', a: 'Level I', wrong: ['Level II', 'Level III', 'Level V'], group: 'systems' },
  { q: 'When is ground transport usually preferred?', a: 'When the destination can be reached in a reasonable time', wrong: ['Only for patients with normal vital signs', 'Never for trauma patients', 'Only at night'], group: 'systems' },
  { q: 'Which is a reason to consider air transport?', a: 'Weather, road or traffic would seriously delay definitive care', wrong: ['The patient asks for it', 'The patient has a minor injury far from home', 'Ground crews are busy with paperwork'], group: 'systems' },
  { q: 'For a patient aged 10–64, which SBP is a red triage criterion?', a: 'Below 90 mm Hg', wrong: ['Below 100 mm Hg', 'Below 110 mm Hg', 'Below 80 mm Hg'], group: 'systems' },
  { q: 'For a patient 65 or older, which SBP is a red triage criterion?', a: 'Below 110 mm Hg', wrong: ['Below 90 mm Hg', 'Below 100 mm Hg', 'Below 120 mm Hg'], group: 'systems' },
  { q: 'Which respiratory rates are red triage criteria?', a: 'Below 10 or above 29/min', wrong: ['Below 12 or above 20/min', 'Below 8 or above 40/min', 'Above 24/min only'], group: 'systems' },
  { q: 'How many major components of trauma assessment do the slides list?', a: 'Nine', wrong: ['Five', 'Six', 'Twelve'], group: 'systems' },
  // kinematics
  { q: 'If a car\'s speed doubles, what happens to its kinetic energy?', a: 'It quadruples', wrong: ['It doubles', 'It triples', 'It stays the same'], group: 'kinematics' },
  { q: 'Which law says energy cannot be created or destroyed, only change form?', a: 'Conservation of energy', wrong: ['Newton\'s first law', 'Newton\'s second law', 'Newton\'s third law'], group: 'kinematics' },
  { q: 'What injury does a rear-end impact classically cause?', a: 'Cervical strain or fracture from hyperextension', wrong: ['Femur fractures', 'Flail chest', 'Calcaneus fractures'], group: 'kinematics' },
  { q: 'Where is the aorta usually sheared in a deceleration injury?', a: 'At the ligamentum arteriosum', wrong: ['At the aortic valve', 'At the renal arteries', 'At the iliac bifurcation'], group: 'kinematics' },
  { q: 'How much more likely are unrestrained occupants to be ejected?', a: '30 times', wrong: ['3 times', '10 times', '100 times'], group: 'kinematics' },
  { q: 'What percentage of ejected people die from their injuries?', a: '75%', wrong: ['25%', '50%', '95%'], group: 'kinematics' },
  { q: 'Falls from what height are more likely to cause severe injuries, per the slides?', a: 'Three times the person\'s height (15–20 ft)', wrong: ['Twice the person\'s height (10 ft)', 'Any fall over 6 ft', 'Five times the person\'s height'], group: 'kinematics' },
  { q: 'What is the predictable injury from a feet-first fall?', a: 'Bilateral calcaneus fractures', wrong: ['Bilateral wrist fractures', 'Clavicle fractures', 'Basilar skull fracture'], group: 'kinematics' },
  { q: 'Which blast injury comes from contaminants such as a dirty bomb?', a: 'Quinary', wrong: ['Primary', 'Secondary', 'Tertiary'], group: 'kinematics' },
  { q: 'What muzzle velocity is typical of medium-energy weapons like handguns?', a: 'About 1,000 ft/s', wrong: ['About 100 ft/s', 'Over 2,000 ft/s', 'About 5,000 ft/s'], group: 'kinematics' },
  { q: 'Where does a car usually first strike a child pedestrian?', a: 'Above the knees or the pelvis', wrong: ['The lower legs', 'The head', 'The feet'], group: 'kinematics' },
  { q: 'Which motorcycle crash usually causes the least serious injuries?', a: 'Laying the bike down', wrong: ['Head-on impact', 'Angular impact', 'Ejection over the handlebars'], group: 'kinematics' },
  // bleeding
  { q: 'Which has the higher morbidity and mortality?', a: 'Internal hemorrhage', wrong: ['External hemorrhage', 'Capillary bleeding', 'Venous bleeding'], group: 'bleeding' },
  { q: 'What are black, tarry stools called?', a: 'Melena', wrong: ['Hematochezia', 'Hematemesis', 'Hemoptysis'], group: 'bleeding' },
  { q: 'How soon after a vessel ruptures does the end fill with clot?', a: '3 to 6 minutes', wrong: ['30 seconds', '30 minutes', '2 hours'], group: 'bleeding' },
  { q: 'When should a tourniquet be applied?', a: 'When direct pressure does not immediately control life-threatening limb bleeding', wrong: ['Only as a last resort after everything else fails', 'For every bleeding wound', 'Only after 10 minutes of direct pressure'], group: 'bleeding' },
  { q: 'How long should you hold pressure after packing hemostatic gauze?', a: 'At least 3 minutes', wrong: ['30 seconds', 'At least 10 seconds', 'Only until the gauze is in'], group: 'bleeding' },
  { q: 'Which hemostatic product is best for deep, narrow wounds?', a: 'XStat', wrong: ['QuikClot Combat Gauze', 'Celox Gauze', 'A pressure bandage'], group: 'bleeding' },
  { q: 'How does TXA work?', a: 'It stops plasminogen from becoming plasmin, so clots do not break down', wrong: ['It thins the blood', 'It constricts blood vessels', 'It replaces clotting factors'], group: 'bleeding' },
  { q: 'What SBP target do the slides give for blunt trauma with hypotension?', a: '80–90 mm Hg (MAP 60–65)', wrong: ['At least 120 mm Hg', '60–70 mm Hg', 'Whatever the patient\'s normal is'], group: 'bleeding' },
  { q: 'How is fluid titrated in penetrating trauma?', a: 'To the patient\'s mental status, without restoring a normal BP', wrong: ['To an SBP of 120', 'Wide open until the BP is normal', 'No fluid at all'], group: 'bleeding' },
  { q: 'Which class of hemorrhage is the first where blood pressure falls?', a: 'Class III (30–40% loss)', wrong: ['Class I', 'Class II', 'Class IV only'], group: 'bleeding', std: true },
  // soft
  { q: 'What is the earliest finding of compartment syndrome?', a: 'Pain on passive stretch', wrong: ['Pulselessness', 'Paralysis', 'Pallor'], group: 'soft' },
  { q: 'How do you store an amputated part?', a: 'Wrapped in gauze, sealed in a plastic bag, floated in ice water', wrong: ['Directly on ice', 'Loose in a cup of saline', 'Wrapped dry and kept warm'], group: 'soft' },
  { q: 'What should you do with an impaled object in the abdomen?', a: 'Stabilize it in place with bulky dressings', wrong: ['Remove it and apply pressure', 'Twist it to check depth', 'Push it in further to stop bleeding'], group: 'soft' },
  { q: 'Which wounds have high risk for infection because of location?', a: 'Hands, feet and perineum', wrong: ['Scalp and face', 'Back and chest', 'Upper arms'], group: 'soft' },
  { q: 'What is excessive scar tissue that grows beyond the wound borders?', a: 'Keloid', wrong: ['Hypertrophic scar', 'Granuloma', 'Eschar'], group: 'soft' },
  { q: 'Which dressing is used for chest and major vessel wounds?', a: 'Occlusive', wrong: ['Nonocclusive', 'Nonadherent', 'Wet-to-dry'], group: 'soft' },
  { q: 'For how long are inflammation, edema and bloody drainage normal after a wound?', a: 'The first 3 days', wrong: ['The first 3 hours', 'The first 3 weeks', 'They are never normal'], group: 'soft' },
  { q: 'Which injury looks small but is often life- or limb-threatening?', a: 'High-pressure injection injury', wrong: ['Abrasion', 'Superficial laceration', 'Contusion'], group: 'soft' },
  { q: 'In the TN class deck, which drug is in the crush injury protocol to move potassium into cells?', a: 'Albuterol', wrong: ['Ondansetron', 'Diphenhydramine', 'Nitroglycerin'], group: 'soft', tn: true },
  // burns
  { q: 'Which burn depth is red, dry, painful and blanches with pressure?', a: 'Superficial (first-degree)', wrong: ['Superficial partial thickness', 'Deep partial thickness', 'Full thickness'], group: 'burns' },
  { q: 'Which burn depth needs a skin graft to heal?', a: 'Full thickness', wrong: ['Superficial', 'Superficial partial thickness', 'All partial-thickness burns'], group: 'burns' },
  { q: 'For which patients is the rule of nines most accurate?', a: 'Adults and children over 10', wrong: ['Infants', 'Children under 5', 'Everyone equally'], group: 'burns' },
  { q: 'What is the Parkland formula in the slides?', a: '2–4 mL × kg × %TBSA over 24 h, half in the first 8 h', wrong: ['4 mL × kg × %TBSA all in the first hour', '20 mL/kg bolus, repeated twice', '1 mL × kg × %TBSA over 8 h'], group: 'burns' },
  { q: 'Using the rule of 10, what is the starting fluid rate for a 70 kg adult with 40% TBSA burns?', a: '400 mL/h', wrong: ['40 mL/h', '700 mL/h', '280 mL/h'], group: 'burns' },
  { q: 'How long does burn shock last?', a: 'About 24 hours', wrong: ['About 1 hour', 'About 8 hours', 'About 1 week'], group: 'burns' },
  { q: 'What percentage of residential fire deaths are from pulmonary complications?', a: '77%', wrong: ['17%', '37%', '97%'], group: 'burns' },
  { q: 'Which partial-thickness burn size calls for a burn center?', a: 'Over 10% TBSA', wrong: ['Over 30% TBSA', 'Over 50% TBSA', 'Any size'], group: 'burns' },
  { q: 'What is the first step in managing any burn?', a: 'Stop the burning process', wrong: ['Calculate the TBSA', 'Start an IV', 'Apply burn ointment'], group: 'burns' },
  { q: 'How do you treat a burn from elemental sodium or potassium?', a: 'Remove the metal or cover it with oil', wrong: ['Flush with large amounts of water', 'Neutralize with vinegar', 'Cover with a wet dressing'], group: 'burns' },
  { q: 'How long do the slides say to irrigate a hydrofluoric acid exposure?', a: '15 minutes', wrong: ['1 minute', '5 minutes', '1 hour'], group: 'burns' },
  { q: 'Which radiation dose has high mortality?', a: '600 rem or more', wrong: ['Under 100 rem', '100–200 rem', '200 rem'], group: 'burns' },
  // face
  { q: 'Which Le Fort fracture separates the face from the skull?', a: 'Le Fort III', wrong: ['Le Fort I', 'Le Fort II', 'Blowout fracture'], group: 'face' },
  { q: 'Which facial bones are fractured most often?', a: 'Nasal bones', wrong: ['Zygoma', 'Mandible', 'Maxilla'], group: 'face' },
  { q: 'How should a conscious patient with epistaxis be positioned?', a: 'Sitting up, leaning forward, pinching the nares', wrong: ['Supine with the head back', 'Trendelenburg', 'Sitting with the head tilted back'], group: 'face' },
  { q: 'How long should you irrigate the eyes after a chemical exposure?', a: '20 minutes, both eyes', wrong: ['2 minutes, the affected eye', '5 minutes, both eyes', 'Until the pain stops'], group: 'face' },
  { q: 'When should contact lenses be removed in an eye injury?', a: 'With a chemical exposure', wrong: ['Always', 'Never', 'Only with blunt injury'], group: 'face' },
  { q: 'Within how long should an avulsed tooth be reimplanted into its socket?', a: 'Less than 15 minutes out', wrong: ['Less than 4 hours out', 'Less than 24 hours out', 'Never in the field'], group: 'face' },
  { q: 'What is the best alternative storage medium for an avulsed tooth?', a: 'Cold fresh whole milk', wrong: ['Tap water', 'A dry gauze pad', 'Alcohol'], group: 'face' },
  { q: 'Which neck zone has the highest mortality?', a: 'Zone I (base of the neck)', wrong: ['Zone II', 'Zone III', 'All are equal'], group: 'face' },
  { q: 'How should a patient with a suspected air embolism from a neck wound be positioned?', a: 'On the left side with the head lower than the feet', wrong: ['Sitting upright', 'On the right side with the head up', 'Prone'], group: 'face' },
  { q: 'For blunt eye injury, how much should the head be elevated?', a: '30° to 45°', wrong: ['Flat', '10°', '90°'], group: 'face' },
  // head
  { q: 'What is the formula for cerebral perfusion pressure?', a: 'CPP = MAP − ICP', wrong: ['CPP = SBP − DBP', 'CPP = ICP − MAP', 'CPP = MAP + ICP'], group: 'head' },
  { q: 'What is a normal CPP?', a: '70–80 mm Hg', wrong: ['10–15 mm Hg', '85–95 mm Hg', '120–140 mm Hg'], group: 'head' },
  { q: 'What are the signs of Cushing\'s triad?', a: 'Increased systolic BP, bradycardia, irregular respirations', wrong: ['Hypotension, tachycardia, tachypnea', 'Hypotension, JVD, muffled heart sounds', 'Fever, headache, stiff neck'], group: 'head' },
  { q: 'What is the most important indicator of increasing ICP?', a: 'Deterioration in the patient\'s mental status', wrong: ['A rising heart rate', 'A rising temperature', 'Pupils that react briskly'], group: 'head' },
  { q: 'Which bleed sits between the dura and arachnoid mater?', a: 'Subdural hematoma', wrong: ['Epidural hematoma', 'Subarachnoid hemorrhage', 'Cerebral hematoma'], group: 'head' },
  { q: 'A subdural hematoma with symptoms 2 to 10 days after injury is called:', a: 'Subacute', wrong: ['Acute', 'Chronic', 'Delayed epidural'], group: 'head' },
  { q: 'What SaO2 should ventilation target in a head injury?', a: 'At or above 90%', wrong: ['At or above 80%', 'Exactly 100%', 'At or above 85%'], group: 'head' },
  { q: 'What does a single episode of hypotension do to head injury mortality?', a: 'Doubles it', wrong: ['Has no effect', 'Lowers it', 'Raises it 10%'], group: 'head' },
  { q: 'How often should GCS and pupils be checked in a head injury?', a: 'Every 5 minutes', wrong: ['Every 15 minutes', 'Every 30 minutes', 'Once on scene'], group: 'head' },
  { q: 'What GCS range do the slides call moderate TBI?', a: '9 to 13', wrong: ['13 to 15', '3 to 8', '6 to 9'], group: 'head' },
  { q: 'Which cranial nerve injury causes a fixed, dilated pupil on the same side?', a: 'CN III (oculomotor)', wrong: ['CN I (olfactory)', 'CN VII (facial)', 'CN VIII (vestibulocochlear)'], group: 'head' },
  { q: 'Loss of consciousness over how long after a concussion suggests a more serious injury?', a: '5 minutes', wrong: ['5 seconds', '30 seconds', '1 hour'], group: 'head' },
  { q: 'When may hypertonic fluids be given for a head injury?', a: 'GCS below 8 with suspected increased ICP', wrong: ['Any GCS below 15', 'Only with hypotension', 'For every concussion'], group: 'head' },
  { q: 'In the TN class deck, which condition is listed as a contraindication for fentanyl, morphine and ketamine?', a: 'Head injury', wrong: ['Musculoskeletal pain', 'Burns', 'Hypertension'], group: 'head', tn: true },
  // spine
  { q: 'Where does the spinal cord end in adults?', a: 'About L1–L2', wrong: ['About T6', 'About L5', 'At the sacrum'], group: 'spine' },
  { q: 'Which spinal region is injured most often?', a: 'C5–C7', wrong: ['T6–T10', 'L3–L5', 'The sacrum'], group: 'spine' },
  { q: 'Which is NOT one of the slides\' clinical criteria for SMR?', a: 'Age over 50', wrong: ['GCS below 15', 'Spinal pain or tenderness', 'Anatomic deformity of the spine'], group: 'spine' },
  { q: 'Does a stab wound to the torso with no neurologic deficit need SMR?', a: 'No: there is no role for SMR in penetrating trauma unless another mechanism calls for it', wrong: ['Yes, always on a long backboard', 'Yes, with a collar only', 'Only if the patient is over 65'], group: 'spine' },
  { q: 'Which dermatome is at the umbilicus?', a: 'T10', wrong: ['T4', 'L1', 'C7'], group: 'spine' },
  { q: 'Which dermatome is at the nipple line?', a: 'T4', wrong: ['T10', 'C4', 'T1'], group: 'spine' },
  { q: 'Spreading the fingers tests which level?', a: 'T1', wrong: ['C5', 'L5', 'S1'], group: 'spine' },
  { q: 'Neurogenic shock is usually associated with injuries at or above:', a: 'T6', wrong: ['L1', 'S2', 'C1 only'], group: 'spine' },
  { q: 'Which syndrome causes paroxysmal hypertension up to 300 mm Hg in chronic cord injury?', a: 'Autonomic hyperreflexia', wrong: ['Spinal shock', 'Neurogenic shock', 'Central cord syndrome'], group: 'spine' },
  { q: 'When should a full-face helmet be removed?', a: 'Early in the assessment, to manage the airway', wrong: ['Never in the field', 'Only at the hospital', 'Only if the patient asks'], group: 'spine' },
  { q: 'How should a child with a suspected spinal injury be transported?', a: 'On an appropriate pediatric stabilization device, not in the car seat', wrong: ['In the car seat', 'Held by a parent', 'Sitting on the stretcher'], group: 'spine' },
  // chest
  { q: 'Which ribs are fractured most often?', a: 'Ribs 3 through 8, laterally', wrong: ['Ribs 1 and 2', 'Ribs 11 and 12', 'Ribs 9 and 10 posteriorly'], group: 'chest' },
  { q: 'What defines a flail chest?', a: '2 or more adjacent ribs broken in 2 or more places', wrong: ['Any single rib fracture with pain', '3 ribs broken in 1 place each', 'A fractured sternum'], group: 'chest' },
  { q: 'Paradoxical motion in flail chest is:', a: 'A late sign', wrong: ['The first sign', 'Always present', 'Only seen in children'], group: 'chest' },
  { q: 'Over what time do pulmonary contusion symptoms worsen?', a: '24 hours', wrong: ['5 minutes', '1 hour', '1 week'], group: 'chest' },
  { q: 'Which finding is the LATE sign of tension pneumothorax?', a: 'Tracheal deviation', wrong: ['Increasing dyspnea', 'Difficulty bagging', 'Decreased breath sounds on one side'], group: 'chest' },
  { q: 'How do you relieve a tension pneumothorax from a sealed penetrating wound?', a: 'Burp the dressing, then reseal it', wrong: ['Add a second dressing', 'Pack the wound', 'Give a fluid bolus'], group: 'chest' },
  { q: 'Which way does the trachea shift with a large hemothorax?', a: 'Toward the unaffected side', wrong: ['Toward the affected side', 'It never shifts', 'Downward'], group: 'chest' },
  { q: 'What is the single best way to tell pericardial tamponade from hemorrhagic shock?', a: 'JVD', wrong: ['Heart rate', 'Skin color', 'Breath sounds'], group: 'chest' },
  { q: 'What is pulsus paradoxus?', a: 'SBP drop of more than 10–15 mm Hg on inspiration', wrong: ['A pulse that speeds up on expiration', 'Different pulses in each arm', 'An irregularly irregular pulse'], group: 'chest' },
  { q: 'What rhythm do 70% of myocardial contusion patients show?', a: 'Sinus tachycardia', wrong: ['Atrial fibrillation', 'Third-degree block', 'Ventricular fibrillation'], group: 'chest' },
  { q: 'Where is the usual site of a blunt thoracic aortic injury, per the slides?', a: 'The distal arch', wrong: ['The aortic root', 'The abdominal aorta', 'The carotid arteries'], group: 'chest' },
  { q: 'Which finding suggests a diaphragmatic rupture?', a: 'Bowel sounds heard in the chest', wrong: ['Muffled heart sounds', 'Battle\'s sign', 'Kehr\'s sign'], group: 'chest' },
  // abdomen
  { q: 'What is the most significant sign of abdominal trauma?', a: 'Unexplained shock', wrong: ['Abdominal distension', 'Bowel sounds', 'Nausea'], group: 'abdomen' },
  { q: 'Which has a higher mortality rate?', a: 'Penetrating abdominal trauma', wrong: ['Blunt abdominal trauma', 'They are equal', 'Neither is ever fatal'], group: 'abdomen' },
  { q: 'Which two organs are injured most often in abdominal trauma?', a: 'Liver and spleen', wrong: ['Stomach and pancreas', 'Kidneys and bladder', 'Ureters and duodenum'], group: 'abdomen' },
  { q: 'What is the mortality rate from liver injury–related uncontrolled bleeding in the slides?', a: '54%', wrong: ['5%', '25%', '90%'], group: 'abdomen' },
  { q: 'What does blood at the urinary meatus mean for care?', a: 'Suspect urethral injury; no urinary catheter', wrong: ['It is normal after trauma', 'Place a catheter right away', 'It means a kidney contusion only'], group: 'abdomen' },
  { q: 'When is the bladder more likely to rupture?', a: 'When it is full', wrong: ['When it is empty', 'Only in children', 'Only with penetrating trauma'], group: 'abdomen' },
  { q: 'What SpO2 should be maintained in abdominal trauma?', a: '94% or higher', wrong: ['85% or higher', '90% or higher', '100% exactly'], group: 'abdomen' },
  { q: 'Hollow organ injury classically leads to:', a: 'Peritonitis, which may be delayed hours to days', wrong: ['Immediate massive bleeding', 'No symptoms ever', 'Cushing\'s triad'], group: 'abdomen' },
  // msk
  { q: 'How do the slides say to manage suspected extremity trauma?', a: 'As if it were a fracture', wrong: ['As a sprain until X-rays', 'With heat and movement', 'Only if there is deformity'], group: 'msk' },
  { q: 'Within what time can a fracture bleed moderately to severely?', a: 'The first 2 hours', wrong: ['The first 2 days', 'The first 2 weeks', 'Fractures do not bleed'], group: 'msk' },
  { q: 'How does a hip fracture usually look?', a: 'Shortened and externally rotated', wrong: ['Shortened and internally rotated', 'Lengthened and internally rotated', 'Normal length and position'], group: 'msk' },
  { q: 'How does a hip dislocation usually look?', a: 'Shortened and internally rotated', wrong: ['Shortened and externally rotated', 'Lengthened and externally rotated', 'Normal'], group: 'msk' },
  { q: 'Which is the most frequently fractured long bone?', a: 'Tibia', wrong: ['Femur', 'Humerus', 'Radius'], group: 'msk' },
  { q: 'Which injury should NOT get a traction splint?', a: 'Knee injury', wrong: ['Isolated mid-shaft femur fracture', 'Closed femur fracture with thigh swelling', 'Femur fracture with a distal pulse'], group: 'msk' },
  { q: 'How should an open fracture wound be dressed?', a: 'Sterile dry dressing; saline-moist gauze over exposed bone', wrong: ['Irrigate and soak in antiseptic', 'Push the bone back in', 'Leave it uncovered'], group: 'msk' },
  { q: 'What is the "silver fork" deformity?', a: 'A distal radius (wrist) fracture', wrong: ['A hip dislocation', 'A boxer\'s fracture', 'A clavicle fracture'], group: 'msk' },
  { q: 'If resistance is felt while repositioning a deformed limb, you should:', a: 'Stop and splint it as found', wrong: ['Pull harder', 'Try again twice', 'Rotate it instead'], group: 'msk' },
  { q: 'How long is ice generally used for a sprain?', a: 'The first 24 to 72 hours', wrong: ['The first 10 minutes only', 'Two weeks', 'Never'], group: 'msk' },
  { q: 'In the TN class deck, which inhaled agent is in the musculoskeletal trauma protocol?', a: 'Nitrous oxide', wrong: ['Albuterol', 'Ipratropium', 'Oxygen only'], group: 'msk', tn: true },
  // special
  { q: 'What SBP is a red triage criterion for a 4-year-old?', a: 'Below 78 mm Hg (70 + 2 × 4)', wrong: ['Below 90 mm Hg', 'Below 70 mm Hg', 'Below 60 mm Hg'], group: 'special' },
  { q: 'How should a pregnant patient over 20 weeks be positioned in SMR?', a: 'Tilt left or manually displace the uterus to the left', wrong: ['Flat supine', 'Tilt right', 'Trendelenburg'], group: 'special', std: true },
  { q: 'Why can an older adult be in shock with a normal heart rate?', a: 'Beta blockers and an aging heart blunt the tachycardia', wrong: ['Older adults do not lose blood', 'Their BP always rises', 'Shock is rare after 65'], group: 'special', std: true },
  { q: 'Which groups are at higher risk of injury from airbags?', a: 'Children under 13, short adults, older adults', wrong: ['Tall adults only', 'Athletes', 'Nobody: airbags are always safe'], group: 'special' }
];

window.TRAUMA_SCENARIOS = [
  // systems
  { id: 'sc-dest', group: 'systems', case: 'A 40-year-old was stabbed in the chest. He is alert, BP 124/82. The nearest hospital is 5 minutes away with no surgeon; the Level I trauma center is 20 minutes away.', a: 'Go to the Level I trauma center and pre-notify', wrong: ['Go to the closest hospital because he is stable', 'Stay on scene to start two IVs first', 'Ask the patient where he prefers and go there'], why: 'Penetrating torso trauma is a red criterion. A stable BP now does not mean he will stay stable; he needs a surgeon.' },
  { id: 'sc-scene-time', group: 'systems', case: 'You have a critical blunt trauma patient packaged. Your partner wants to start IVs and splint the forearm before leaving the scene.', a: 'Leave now and do the IVs and splinting en route', wrong: ['Start both IVs on scene first', 'Splint everything on scene first', 'Finish the full secondary assessment first'], why: 'Critical patients need definitive care fast. Only immediate life threats are treated on scene.' },
  { id: 'sc-air', group: 'systems', case: 'A rural crash patient meets red criteria. The trauma center is 90 minutes away by ground on a clear day, or 25 minutes by helicopter.', a: 'Request air medical transport', wrong: ['Drive to the trauma center by ground', 'Go to the closest clinic', 'Wait for the patient to improve'], why: 'Air transport makes sense when ground time threatens survival and recovery.' },
  // kinematics
  { id: 'sc-steering', group: 'kinematics', case: 'An unrestrained driver hit a tree head-on. The steering wheel is bent and the windshield is starred. He says he feels fine.', a: 'Assume head, chest and abdominal injuries and do a full rapid trauma assessment', wrong: ['Treat him as uninjured since he feels fine', 'Check only his head', 'Let him sign a refusal'], why: 'The vehicle tells the story: up-and-over path with head and chest impact. Adrenaline can mask pain.' },
  { id: 'sc-child-ped', group: 'kinematics', case: 'A 7-year-old was struck by a car while crossing the street. He has a deformed thigh and is crying.', a: 'Look for pelvic, chest and head injuries as well as the femur', wrong: ['Focus on splinting the femur only', 'Assume the femur is his only injury because he is crying', 'Have the parents drive him'], why: 'Child pedestrians are hit above the knees or pelvis first, then the thorax, then thrown to the ground.' },
  { id: 'sc-moto', group: 'kinematics', case: 'A motorcyclist hit a car head-on and went over the handlebars with his feet still on the pegs.', a: 'Expect bilateral femur and lower leg fractures, plus head and perineal injuries', wrong: ['Expect only road rash', 'Expect only a wrist fracture', 'Expect no injuries if he wore a helmet'], why: 'With the feet on the pegs, the femurs absorb the forward motion; the groin can hit the tank.' },
  // bleeding
  { id: 'sc-tq', group: 'bleeding', case: 'A man has spurting blood from a deep leg laceration. Firm direct pressure is not stopping it.', a: 'Apply a tourniquet high on the leg', wrong: ['Keep holding pressure for 15 more minutes', 'Elevate the leg and wait', 'Apply a loose bandage and transport'], why: 'Tourniquets are no longer a last resort: apply one when pressure does not immediately control life-threatening limb bleeding.' },
  { id: 'sc-groin', group: 'bleeding', case: 'A man has a gunshot wound high in the groin crease with heavy bleeding. A tourniquet will not fit above it.', a: 'Pack the wound with hemostatic gauze and hold pressure at least 3 minutes', wrong: ['Apply a tourniquet below the wound', 'Elevate the leg and wait', 'Apply a loose dressing and go'], why: 'Junctional bleeding is not controlled by a tourniquet: pack it and hold pressure, or use a junctional device.' },
  { id: 'sc-fluid', group: 'bleeding', case: 'A stabbing victim with an abdominal wound has a weak radial pulse, BP 84/56 and is alert. Transport is 15 minutes.', a: 'Titrate small fluid boluses to his mental status', wrong: ['Run 2 L wide open to normalize BP', 'Start a pressor to bring SBP to 120', 'Give no IV access at all'], why: 'Penetrating trauma: titrate fluid to mental status without restoring a normal BP (permissive hypotension).' },
  // soft
  { id: 'sc-impaled', group: 'soft', case: 'A carpenter has a 6-inch piece of rebar impaled in his thigh. Bleeding is minimal.', a: 'Stabilize the object in place with bulky dressings and transport', wrong: ['Pull it out and apply pressure', 'Cut it flush with the skin', 'Twist it to check how deep it goes'], why: 'Removing or moving it can cause severe bleeding or more damage.' },
  { id: 'sc-amp-finger', group: 'soft', case: 'A worker cut off two fingers in a table saw. The bleeding is controlled with pressure. A coworker hands you the fingers.', a: 'Wrap them in gauze, seal in a plastic bag, and float the bag in ice water', wrong: ['Put them directly on ice', 'Drop them in a cup of saline', 'Leave them; the hospital cannot use them'], why: 'Never put tissue directly on ice. Retrieve the part, but do not delay transport looking for it.' },
  { id: 'sc-crush', group: 'soft', case: 'A worker has had his legs pinned under a collapsed wall for 3 hours. Rescue is about to lift the wall off.', a: 'Coordinate with rescue: start treatment (IV fluids, monitor) before the wall is lifted', wrong: ['Lift the wall immediately and then assess', 'Give nothing until he is free', 'Elevate his legs as soon as they are free'], why: 'Crush syndrome may appear when the pressure is released. Time the release to follow medical treatment.' },
  { id: 'sc-compartment', group: 'soft', case: 'Hours after a tibia fracture was splinted, the patient has pain far worse than expected, a tense calf, and severe pain when you gently move his toes. Pulses are present.', a: 'Suspect compartment syndrome and transport for urgent evaluation', wrong: ['Reassure him: the pulse rules it out', 'Tighten the splint', 'Give heat to the calf'], why: 'Pain on passive stretch is the earliest finding. Pulselessness comes late.' },
  // burns
  { id: 'sc-burn-size', group: 'burns', case: 'An adult has partial-thickness burns to the whole front of the trunk and the entire right arm, plus superficial burns on the face.', a: 'About 27% TBSA', wrong: ['About 36% TBSA', 'About 18% TBSA', 'About 31% TBSA'], why: 'Front of trunk 18 + one arm 9 = 27. Superficial burns do not count.' },
  { id: 'sc-inhalation', group: 'burns', case: 'A man pulled from a closed-room house fire has soot around his mouth, singed nasal hairs and a hoarse voice. SpO2 is 99%.', a: 'Give humidified high-concentration oxygen and prepare to secure the airway early', wrong: ['Reassure him: his SpO2 is normal', 'Cool the airway with ice water', 'Wait for stridor before acting'], why: 'These are signs of supraglottic inhalation injury; laryngeal edema can make intubation impossible later. CO can make SpO2 read normal.' },
  { id: 'sc-chem', group: 'burns', case: 'A stable worker has dry lime powder on his arms and chest.', a: 'Remove his clothing, brush off the powder, then irrigate with large amounts of water', wrong: ['Flush with a small amount of water first', 'Apply a neutralizing acid', 'Cover with a dry dressing and transport without irrigating'], why: 'Brush off powders before irrigating. In a stable patient, irrigation comes before transport unless it can continue en route.' },
  { id: 'sc-parkland', group: 'burns', case: 'An 80 kg adult has 50% TBSA partial- and full-thickness burns. Using Parkland at 4 mL, how much fluid in the first 8 hours?', a: '8,000 mL', wrong: ['16,000 mL', '4,000 mL', '2,000 mL'], why: '4 × 80 × 50 = 16,000 mL in 24 hours; half (8,000 mL) in the first 8 hours from the time of the burn.' },
  // face
  { id: 'sc-tooth', group: 'face', case: 'A 16-year-old knocked out a front tooth 5 minutes ago playing hockey. The tooth is intact and the patient is alert.', a: 'Reimplant the tooth in its socket', wrong: ['Scrub it clean and wrap it dry', 'Put it in tap water', 'Throw it away'], why: 'Out less than 15 minutes: reimplant into the original socket. Do not scrub, rinse off or let it dry.' },
  { id: 'sc-neck-wound', group: 'face', case: 'A man has a laceration to the side of the neck with dark blood flowing. He suddenly becomes short of breath and hypotensive.', a: 'Occlusive dressing; place him on his left side with his head lower than his feet', wrong: ['Sit him upright', 'Leave the wound open', 'Apply a circumferential neck bandage'], why: 'Suspected air embolism from a venous neck wound: seal it, then left side with the head down to trap air in the right ventricle.' },
  { id: 'sc-eye-chem', group: 'face', case: 'A cleaner splashed a drain-cleaning chemical in both eyes. She wears contact lenses.', a: 'Remove the lenses and irrigate both eyes continuously for 20 minutes', wrong: ['Leave the lenses in and patch both eyes', 'Irrigate for 1 minute and transport', 'Apply an antidote drop'], why: 'Chemical eye injury is a true emergency. Contacts come out only for chemical exposure.' },
  // head
  { id: 'sc-lucid', group: 'head', case: 'A teenager was knocked out by a baseball to the side of the head, woke up and felt fine. 30 minutes later he is drowsy and vomiting.', a: 'Suspect an epidural hematoma and transport rapidly to a trauma center', wrong: ['Suspect a simple concussion and let him rest at home', 'Suspect hypoglycemia only', 'Wait to see if he improves'], why: 'Loss of consciousness, a lucid interval, then decline is the classic epidural hematoma pattern; it needs surgery.' },
  { id: 'sc-tbi-bp', group: 'head', case: 'A head-injured patient with a GCS of 7 has a BP of 82/50 from a femur fracture.', a: 'Give an isotonic fluid bolus to restore a normal BP', wrong: ['Withhold fluids to prevent brain swelling', 'Aim for permissive hypotension at SBP 80', 'Give a diuretic'], why: 'One episode of hypotension doubles head injury mortality. Fluids are restricted only when there is no hypotension.' },
  { id: 'sc-gcs', group: 'head', case: 'After a crash, a patient opens her eyes only when you speak, is confused about the date and follows commands.', a: 'GCS 13 (E3 V4 M6)', wrong: ['GCS 14 (E4 V4 M6)', 'GCS 12 (E3 V3 M6)', 'GCS 15'], why: 'Eyes to voice = 3, confused = 4, obeys = 6.' },
  // spine
  { id: 'sc-neurogenic', group: 'spine', case: 'After a diving accident, a patient cannot move his arms or legs. BP 78/40, HR 52, skin warm and dry.', a: 'Neurogenic shock', wrong: ['Hemorrhagic shock', 'Spinal shock only, which needs no treatment', 'Cardiogenic shock'], why: 'Hypotension with bradycardia and warm skin after a cord injury at or above T6 is neurogenic shock (loss of sympathetic tone). Still rule out bleeding.' },
  { id: 'sc-smr', group: 'spine', case: 'A sober, alert 30-year-old rear-ended at low speed has no neck pain, no tenderness, no deformity and no deficits, and is communicating well.', a: 'Spinal motion restriction is not indicated', wrong: ['Full backboard and collar', 'Collar only because of the mechanism', 'Head blocks without a collar'], why: 'He meets none of the clinical criteria: GCS 15, no pain or tenderness, no deficit, no deformity, reliable.' },
  { id: 'sc-gsw-smr', group: 'spine', case: 'A man was shot in the abdomen. He is moving all limbs normally and has no other mechanism of injury.', a: 'No spinal motion restriction; rapid transport', wrong: ['Full SMR on a long backboard', 'Cervical collar and head blocks', 'Manual in-line stabilization the whole way'], why: 'There is no role for SMR in penetrating trauma unless another mechanism calls for it.' },
  { id: 'sc-helmet', group: 'spine', case: 'An unresponsive motorcyclist in a full-face helmet has gurgling respirations.', a: 'Remove the helmet with two rescuers to manage the airway', wrong: ['Leave the helmet on and transport', 'Pull the helmet off quickly alone', 'Cut a hole in the face shield'], why: 'Full-face helmets must come off early so you can manage the airway and ventilation.' },
  // chest
  { id: 'sc-tension', group: 'chest', case: 'A ventilated patient with closed chest trauma becomes harder to bag. BP drops to 70/40, breath sounds are absent on the right and neck veins are distended.', a: 'Needle decompression of the right chest', wrong: ['Give a 1 L fluid bolus first', 'Increase the ventilation rate', 'Wait for tracheal deviation to confirm'], why: 'Tension pneumothorax from closed trauma needs decompression. Tracheal deviation is late.' },
  { id: 'sc-burp', group: 'chest', case: 'You sealed a gunshot wound to the chest with an occlusive dressing. Now the patient is more short of breath and hypotensive.', a: 'Burp the dressing to release air, then reseal it', wrong: ['Add more tape to the dressing', 'Remove the dressing and leave it open', 'Give nitroglycerin'], why: 'A sealed wound can trap air and cause tension. Lifting the dressing briefly releases it.' },
  { id: 'sc-tamponade', group: 'chest', case: 'A man was stabbed just left of the sternum. He has tachycardia, a narrow pulse pressure, JVD, and equal, clear breath sounds.', a: 'Suspect pericardial tamponade and transport rapidly', wrong: ['Needle decompress the left chest', 'Treat as simple hemorrhagic shock', 'Suspect neurogenic shock'], why: 'JVD is the best way to tell tamponade from hemorrhagic shock; clear equal breath sounds point away from tension pneumothorax.' },
  { id: 'sc-asphyxia', group: 'chest', case: 'A mechanic was pinned under a car for a few minutes. His face and neck are purple-red, his chest is pink below that, and his eyes are bloodshot.', a: 'Traumatic asphyxia', wrong: ['Carbon monoxide poisoning', 'Anaphylaxis', 'Cyanide poisoning'], why: 'Severe crushing of the chest and abdomen raises intrathoracic pressure and backs blood into the head and neck.' },
  // abdomen
  { id: 'sc-kehr', group: 'abdomen', case: 'A snowboarder hit a tree with her left side. She has left upper quadrant pain and pain in her left shoulder. HR 118.', a: 'Suspect a spleen injury with internal bleeding; treat for shock', wrong: ['Suspect a shoulder dislocation', 'Suspect a muscle strain', 'Suspect appendicitis'], why: 'Referred left shoulder pain (Kehr\'s sign) plus tachycardia after a left-sided hit suggests splenic bleeding irritating the diaphragm.' },
  { id: 'sc-blunt-abd', group: 'abdomen', case: 'After a crash, a restrained driver has a seat belt mark across the abdomen, BP 78/50, and no other obvious source of bleeding.', a: 'Treat for internal bleeding: fluids to SBP 80–90 and rapid transport', wrong: ['Wait for abdominal distension to confirm', 'Listen for bowel sounds on scene before moving', 'Fluids wide open to an SBP of 120'], why: 'Unexplained shock is the most significant sign of abdominal injury. Blunt trauma with hypotension: SBP 80–90.' },
  { id: 'sc-urethra', group: 'abdomen', case: 'A patient with a pelvic fracture has blood at the urinary meatus and cannot urinate.', a: 'Suspect urethral injury; do not place a urinary catheter', wrong: ['Place a catheter to drain the bladder', 'Ignore it: it is common', 'Have the patient try to stand and urinate'], why: 'Blood at the meatus is highly suggestive of urethral injury, and catheterization is contraindicated.' },
  // msk
  { id: 'sc-femur', group: 'msk', case: 'A patient has an isolated, closed mid-shaft femur fracture: the leg is shortened and externally rotated with midthigh swelling.', a: 'Apply a traction splint and check pulse, motor and sensation before and after', wrong: ['Rigid splint from the hip to the knee only', 'Realign the leg forcefully', 'No splint, just ice'], why: 'Traction splints are used for femur fractures; they align, tamponade bleeding and reduce pain.' },
  { id: 'sc-knee', group: 'msk', case: 'A patient has a deformed, painful knee after a fall on a flexed knee. The foot is warm with a good pulse.', a: 'Splint the knee in the position found, immobilizing thigh and ankle', wrong: ['Apply a traction splint', 'Straighten the leg fully and splint', 'Leave it unsplinted'], why: 'Knee injuries are splinted as found, not fully extended, and never with a traction splint.' },
  { id: 'sc-pulseless', group: 'msk', case: 'A patient has a badly angulated lower leg fracture. The foot is cold and pale with no pulse, and transport will be delayed by extrication.', a: 'With medical direction, one gentle attempt at realignment along the long axis, then splint', wrong: ['Splint in place and never touch it', 'Pull hard until it is straight', 'Apply a tourniquet'], why: 'If transport is delayed and circulation is compromised, medical direction may authorize a single attempt; stop if you meet resistance.' },
  { id: 'sc-open-fx', group: 'msk', case: 'A patient has an open tibia fracture with the bone end visible.', a: 'Cover the bone with saline-moistened gauze and the wound with a sterile dressing; splint', wrong: ['Irrigate the wound with antiseptic', 'Push the bone back under the skin', 'Leave it uncovered so it can drain'], why: 'Open fractures are not irrigated or soaked in the field. Exposed bone gets saline-moist gauze.' },
  // special
  { id: 'sc-pregnant', group: 'special', case: 'A woman 32 weeks pregnant is secured flat on a backboard after a crash. She becomes dizzy and hypotensive.', a: 'Tilt the board to the left (or displace the uterus to the left)', wrong: ['Trendelenburg position', 'Tilt the board to the right', 'Give a pressor first'], why: 'Supine hypotensive syndrome: the uterus compresses the vena cava. Left tilt restores venous return.' },
  { id: 'sc-geri', group: 'special', case: 'A 78-year-old on metoprolol fell down 4 stairs. HR 72, BP 108/70; his usual BP is 160/90. He is pale and diaphoretic.', a: 'Treat as possible shock and transport to a trauma center', wrong: ['Reassure him: his vital signs are normal', 'Release him to his family', 'Treat for a simple fall only'], why: 'SBP below 110 at 65+ is a red criterion. Beta blockers blunt tachycardia, and his skin signs point to shock.' }
];
