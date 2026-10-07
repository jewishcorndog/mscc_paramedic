/*
 * Medical-legal content, from Chapter 6 (Medical and Legal Issues) of
 * Sanders' Paramedic Textbook, 6th ed.: the lecture slides. Wording follows
 * the slides where they say it; examples and explanations are added to make
 * them usable as study cards.
 *
 * Items with std: true go beyond the slides (standard paramedic curriculum),
 * and the app marks them with *. Items with tn: true are Tennessee specifics;
 * laws vary by state, so check them against your instructor and protocols.
 *
 * Topic fields: about, points (key points), scene (what to do in the field).
 * Terms: term, def. Facts: q, a, wrong. Scenarios: case, a, wrong, why.
 */
window.LEGAL_GROUPS = [
  { id: 'negligence', name: 'Negligence' },
  { id: 'defenses', name: 'Defenses & liability' },
  { id: 'system', name: 'Duties & the legal system' },
  { id: 'laws', name: 'How laws affect the paramedic' },
  { id: 'privacy', name: 'Confidentiality' },
  { id: 'consent', name: 'Consent, refusal & force' },
  { id: 'transport', name: 'Transport' },
  { id: 'death', name: 'Resuscitation & advance directives' },
  { id: 'scene', name: 'Crime scenes' },
  { id: 'records', name: 'Documentation' },
  { id: 'ethics', name: 'Ethics' }
];

// The Negligence page: the four elements, the breach types, damages,
// ordinary vs gross negligence, and the defenses.
window.LEGAL_NEGLIGENCE = {
  summary: 'Negligence is failing to give the care a similarly trained paramedic would give in similar circumstances. It is the claim behind most malpractice lawsuits against paramedics. To win, the plaintiff must prove all four elements. If any one is missing, the claim fails.',
  elements: [
    {
      n: 1, name: 'Duty to act', short: 'You owed the patient care',
      text: 'A duty to act existed. For an on-duty paramedic, the duty starts when you are dispatched or a patient asks for help, and it lasts until care is properly handed off or the patient competently refuses.',
      example: 'You are on duty and dispatched to a fall. You now have a duty to that patient.',
      missing: 'Off duty, driving past a crash you did not stop at: in most states there is no legal duty, so no negligence claim.',
      std: true
    },
    {
      n: 2, name: 'Breach of duty', short: 'You fell below the standard of care',
      text: 'The actions performed deviated from the standard of care: the degree of care, skill, and judgment any other similarly trained paramedic would provide under similar circumstances. A breach can be malfeasance, misfeasance, or nonfeasance.',
      example: 'You fail to secure the patient to the stretcher before moving it.',
      missing: 'You followed protocol and did what any reasonable paramedic would do, but the patient still had a bad outcome. No breach, no negligence.'
    },
    {
      n: 3, name: 'Damages', short: 'The patient (or someone else) was actually harmed',
      text: 'Damage to the patient or other person (the plaintiff) occurred. Damages can be compensable (to pay for the harm) or punitive (to punish).',
      example: 'The patient falls from the stretcher and breaks a hip.',
      missing: 'You gave aspirin late, but the patient suffered no harm from the delay. No damages, no negligence (still document it honestly).'
    },
    {
      n: 4, name: 'Proximate cause', short: 'Your breach caused the harm',
      text: 'The negligent act or lack of action caused the injury or made an existing injury worse. The plaintiff must prove the injury or further harm was foreseeable by the paramedic.',
      example: 'The hip fracture happened because of the fall from the unsecured stretcher.',
      missing: 'You were late securing the stretcher, but the patient\'s injury came from the original car crash, not from anything you did. No proximate cause.'
    }
  ],
  breach: [
    { name: 'Malfeasance', def: 'Performing a wrongful or unlawful act', example: 'Giving a medication that is outside your scope of practice, or assaulting a patient.' },
    { name: 'Misfeasance', def: 'Performing a legal act in a manner that is harmful or injurious', example: 'Starting an IV (allowed) but infiltrating it by poor technique, or intubating the esophagus and not recognizing it.' },
    { name: 'Nonfeasance', def: 'Failure to perform a required act or duty', example: 'Not giving oxygen to a hypoxic patient, or not checking a glucose on an altered patient.' }
  ],
  damages: [
    { name: 'Compensable damages', def: 'Money to make up for the harm: medical bills, lost wages, pain and suffering, disability', std: true },
    { name: 'Punitive damages', def: 'Money to punish the defendant and discourage the conduct. Usually only for gross negligence or willful, wanton, or reckless conduct', std: true }
  ],
  // Ordinary vs gross negligence, row by row.
  compare: [
    ['What it is', 'Failing to meet the standard of care: carelessness or an honest mistake', 'Reckless disregard for the patient\'s safety, or willful or wanton misconduct'],
    ['State of mind', 'Did not mean any harm; should have known better', 'Knew (or should have known) the risk and ignored it'],
    ['Example', 'Forgetting to re-check vitals after giving a drug that lowers blood pressure', 'Responding while intoxicated, or leaving an unresponsive patient alone to finish a meal'],
    ['Good Samaritan law', 'Usually protects you (if off duty, unpaid, in good faith, within training)', 'Does not protect you'],
    ['Punitive damages', 'Not usually', 'Possible'],
    ['Criminal charges', 'Not usually', 'Possible (for example, reckless endangerment)']
  ],
  compareStd: true,
  defenses: [
    { name: 'Good Samaritan laws', def: 'Encourage people to help others without fear of a lawsuit. Generally do not protect EMS personnel from gross negligence, reckless disregard, or willful or wanton misconduct.' },
    { name: 'Government immunity', def: 'Can limit lawsuits against government agencies and their employees (varies by state).' },
    { name: 'Statute of limitations', def: 'The time limit for filing a suit. A claim filed after it runs out is barred.' },
    { name: 'Contributory negligence', def: 'The plaintiff\'s own negligence helped cause the injury (for example, refusing to stay on the stretcher). Depending on the state, it can reduce or bar recovery.' }
  ],
  protection: ['Education, training, continuing education, and skills retention', 'Appropriate quality improvement', 'Appropriate medical direction',
    'Accurate, thorough documentation', 'Professional attitude and demeanor', 'Adequate liability insurance'],
  // "Which element is missing?" drills for the Negligence page and quiz.
  drills: [
    { case: 'Off duty at a restaurant, you see a man choking and decide not to get involved. He dies.', a: 'Duty to act', why: 'In most states an off-duty paramedic has no legal duty to act, so choosing not to help is not negligence (whatever you think of it ethically).' },
    { case: 'You follow your protocol exactly for a cardiac arrest and do high-quality CPR, but the patient dies.', a: 'Breach of duty', why: 'You met the standard of care. A bad outcome by itself is not negligence.' },
    { case: 'You forget to put the side rails up. The patient stays put and arrives at the hospital unharmed.', a: 'Damages', why: 'There was a breach, but no harm. Without damages, the claim fails.' },
    { case: 'You give a dose of naloxone 5 minutes late. The patient later sues over a broken wrist from the fall that caused the call.', a: 'Proximate cause', why: 'The wrist broke before you arrived. Your delay did not cause or worsen it.' },
    { case: 'You skip the glucose check on a confused diabetic; your partner checks it 2 minutes later and treats it. The patient is fine.', a: 'Damages', why: 'The missed check was caught in time and caused no harm.' },
    { case: 'On duty, you leave a stroke patient on scene because the family "will drive her." She is not given stroke care in time and is left disabled.', a: 'None: all four are present', why: 'Duty (on-duty call), breach (abandonment/below standard), damages (disability), proximate cause (the delay caused worse harm).' }
  ]
};

window.LEGAL_TOPICS = [
  // ---------------- Negligence ----------------
  {
    id: 'negligence', name: 'Components of negligence', group: 'negligence', aliases: ['negligence', 'four elements', 'malpractice'],
    about: ['Four elements must be present to prove negligence: a duty to act, a breach of that duty, damages, and proximate cause.'],
    points: ['A duty to act existed',
      'Breach of duty: actions deviated from the standard of care',
      'Damage to the patient or other person (the plaintiff) occurred',
      'The breach was the proximate cause of the damage',
      'Standard of care: the care, skill, and judgment any other similarly trained paramedic would provide under similar circumstances',
      'Proximate cause requires that the injury or further harm was foreseeable by the paramedic'],
    scene: ['Give care consistent with your education, training, and local protocol']
  },
  {
    id: 'breach', name: 'Breach of duty', group: 'negligence', aliases: ['malfeasance', 'misfeasance', 'nonfeasance', 'standard of care'],
    about: ['A breach is care below the standard of care. It can happen three ways.'],
    points: ['Malfeasance: performing a wrongful or unlawful act',
      'Misfeasance: performing a legal act in a manner that is harmful or injurious',
      'Nonfeasance: failure to perform a required act or duty'],
    scene: ['Stay within your scope and protocols; know your skills well enough to do them right']
  },
  {
    id: 'gross', name: 'Gross negligence', group: 'negligence', aliases: ['gross', 'reckless', 'willful', 'wanton', 'punitive'],
    about: ['Gross negligence is a reckless disregard for patient safety: far worse than an honest mistake. Good Samaritan laws generally do not protect EMS personnel from gross negligence, reckless disregard, or willful or wanton misconduct.'],
    points: ['Ordinary negligence: carelessness, or failing to do what a reasonable paramedic would do',
      'Gross negligence: knowing about a serious risk and ignoring it',
      'Willful or wanton misconduct: acting on purpose, or with conscious indifference to the harm it could cause',
      'Gross negligence can bring punitive damages and sometimes criminal charges',
      'Good Samaritan protection does not cover it'],
    std: true,
    scene: ['Never respond impaired, never leave a patient who needs care, and never ignore an obvious life threat']
  },
  {
    id: 'damages', name: 'Damages', group: 'negligence', aliases: ['compensable', 'punitive', 'harm'],
    about: ['Damage to the patient or another person must have occurred. Two kinds: compensable and punitive.'],
    points: ['Compensable damages pay for the harm: medical bills, lost wages, pain and suffering',
      'Punitive damages punish especially bad conduct, such as gross negligence',
      'No harm means no negligence claim, even if care was below standard'],
    std: true,
    scene: ['Report and document any error honestly; hiding it makes things worse']
  },

  // ---------------- Defenses & liability ----------------
  {
    id: 'defenses', name: 'Defenses to negligence claims', group: 'defenses', aliases: ['good samaritan', 'immunity', 'statute of limitations', 'contributory negligence', 'insurance'],
    about: ['Legal defenses a paramedic may raise against a negligence claim.'],
    points: ['Good Samaritan laws: generally do not protect EMS personnel from gross negligence, reckless disregard, or willful or wanton misconduct',
      'Government immunity',
      'Statute of limitations',
      'Contributory negligence: the patient\'s own actions helped cause the harm',
      'All practicing health care professionals should have adequate liability insurance'],
    scene: ['A complete PCR is the evidence every one of these defenses relies on']
  },
  {
    id: 'prehospital-liability', name: 'Liability unique to prehospital care', group: 'defenses', aliases: ['medical director', 'borrowed servant', 'civil rights'],
    about: ['Three liability concerns are unique to prehospital care: liability of the medical director, liability for "borrowed servants," and civil rights.'],
    points: ['The medical director is responsible for supervision and oversight, properly credentialing practitioners, setting standards and protocols consistent with current standards of care, and training and remedial education',
      'Borrowed servant doctrine: when a person has control over someone else\'s employee, they are responsible for that person\'s acts even though no employer-employee relationship exists',
      'Civil rights law: illegal to discriminate by race, color, sex, religion, national origin, and, in health care, ability to pay'],
    scene: ['If you direct a firefighter or another agency\'s EMT on scene, you may be responsible for what they do']
  },
  {
    id: 'protection', name: 'Protection against negligence claims', group: 'defenses', aliases: ['protection', 'prevent lawsuit', 'quality improvement'],
    about: ['The best protections against litigation are those that come with excellence in the paramedic role.'],
    points: ['Education, training, continuing education, and skills retention',
      'Appropriate quality improvement',
      'Appropriate medical direction',
      'Accurate, thorough documentation',
      'Professional attitude and demeanor'],
    scene: ['Treat every patient as if the call will be reviewed in court']
  },

  // ---------------- Duties & legal system ----------------
  {
    id: 'duties', name: 'Legal duties and responsibilities', group: 'system', aliases: ['duties', 'responsibilities', 'liability'],
    about: ['The paramedic\'s legal duties are to the patient, the employer, the medical director, and the public.'],
    points: ['Ethical responsibilities: respond with respect to patients\' physical and emotional needs, maintain mastery of skills, critically review your own performance, and respect confidentiality',
      'Failure to perform EMS duties properly can result in civil or criminal liability',
      'Give care and transport consistent with your education, training, and local protocol'],
    scene: ['Review your own calls and fix weak skills before they become a problem']
  },
  {
    id: 'legal-system', name: 'The U.S. legal system', group: 'system', aliases: ['types of law', 'legislation', 'administrative', 'common law', 'criminal', 'civil'],
    about: ['The U.S. legal system is made up of five types of law: legislation, administrative law, common law, criminal law, and civil law.'],
    points: ['Legislation (statutory law): laws passed by Congress or a state legislature',
      'Administrative law: rules made by government agencies, such as the state EMS office',
      'Common law (case law): law from court decisions and precedent',
      'Criminal law: wrongs against society, prosecuted by the government',
      'Civil law: disputes between private parties, such as a malpractice suit'],
    scene: ['Most suits against paramedics are civil negligence (malpractice) cases']
  },
  {
    id: 'legal-process', name: 'The legal process', group: 'system', aliases: ['lawsuit', 'malpractice', 'discovery', 'deposition', 'plaintiff'],
    about: ['A malpractice lawsuit begins with an incident in which the plaintiff believes they were injured by negligent patient care.'],
    points: ['The plaintiff hires an attorney, who investigates to determine the merit of the complaint',
      'Discovery: the exchange of documents and the taking of depositions and interrogatories',
      'After discovery, the case is settled out of court, dismissed, adjudicated, or goes to trial',
      'The plaintiff brings the suit; the paramedic being sued is the defendant'],
    scene: ['Your PCR is one of the first things reviewed in a negligence lawsuit']
  },

  // ---------------- How laws affect the paramedic ----------------
  {
    id: 'scope', name: 'Scope of practice and medical direction', group: 'laws', aliases: ['scope', 'medical direction', 'medical control', 'medical practice act'],
    about: ['Scope of practice is the range of duties and skills paramedics are allowed and expected to perform when necessary. The physician medical director is legally responsible for supervising the paramedic\'s medical practice.'],
    points: ['The medical practice act (varies by state) designates restricted acts and prohibits certain tasks from being performed by nonphysicians',
      'It authorizes physicians to oversee and supervise certain tasks performed by nonlicensed personnel',
      'It provides for the authorization and withdrawal of dependent practice',
      'Online medical direction is real-time orders by radio or phone; offline is protocols and standing orders'],
    scene: ['An order outside your scope may not be followed, even from a physician']
  },
  {
    id: 'licensure', name: 'Licensure and certification', group: 'laws', aliases: ['license', 'certification', 'nremt'],
    about: ['Licensure is the legal process in which a government agency grants permission for a person who meets set qualifications to practice a profession. Certification is granted by a training entity, a governmental body, or a nongovernmental certifying agency or professional association.'],
    points: ['You need a state license to practice in that state',
      'NREMT certification is a nongovernmental certification most states use toward licensure',
      'In Tennessee, paramedics are licensed through the EMS Board in the Department of Health'],
    tn: true,
    scene: ['Keep your license and continuing education current']
  },
  {
    id: 'mvl', name: 'Motor vehicle laws', group: 'laws', aliases: ['driving', 'emergency vehicle', 'lights and sirens'],
    about: ['Motor vehicle laws usually define the standards for equipping and operating emergency vehicles.'],
    points: ['Right-of-way privileges are covered under Transport',
      'Privileges never excuse driving without due regard for the safety of others'],
    scene: ['Know your state\'s rules for emergency vehicle operation']
  },
  {
    id: 'reporting', name: 'Mandatory reporting', group: 'laws', aliases: ['report', 'child abuse', 'elder abuse', 'gunshot'],
    about: ['Paramedics may be required by law to report certain cases.'],
    points: ['Abuse or neglect of children or older adults',
      'Gunshot wounds and stab wounds',
      'Animal bites',
      'Some communicable diseases',
      'You need reasonable suspicion, not proof',
      'In Tennessee, every person must report suspected child abuse; suspected abuse of a vulnerable adult goes to Adult Protective Services'],
    tn: true,
    scene: ['Document what you saw and what was said, objectively, and report through the proper channel']
  },
  {
    id: 'protections', name: 'Laws that protect the paramedic', group: 'laws', aliases: ['ryan white', 'good samaritan', 'exposure', 'assault on ems'],
    about: ['Some state and federal laws give the paramedic legal protection.'],
    points: ['Part G of the Ryan White CARE Act requires that emergency responders be told if they were exposed to certain infectious diseases, within 48 hours of the determination of exposure',
      'Good Samaritan laws encourage people to help others without fear of a lawsuit',
      'Some localities have ordinances that make it illegal to harm or threaten to harm EMS crews or to obstruct patient care'],
    scene: ['Report any exposure right away to your designated officer']
  },

  // ---------------- Confidentiality ----------------
  {
    id: 'confidentiality', name: 'Confidentiality', group: 'privacy', aliases: ['hipaa', 'phi', 'privacy', 'social media'],
    about: ['Paramedics have a legal and ethical duty to protect a patient\'s privacy.'],
    points: ['Confidential information: the patient\'s history, assessment findings, and any treatment given',
      'It can be electronic, written, or verbal, and includes social media posts or photos of the patient, their vehicle, or anything individually identifiable',
      'Liability exists when protected health information (PHI) is released to people not legally entitled to it',
      'Claims may arise when information is released with malicious intent or reckless disregard',
      'Improper release, or release of inaccurate information, can result in civil liability',
      'HIPAA allows sharing for treatment, payment, and operations, and when required by law (mandatory reports, court orders)'],
    scene: ['Never post about calls, even without names']
  },

  // ---------------- Consent ----------------
  {
    id: 'consent', name: 'Consent', group: 'consent', aliases: ['informed', 'expressed', 'implied', 'involuntary'],
    about: ['To give consent, the patient must be of legal age and able to make a reasoned decision about the nature of the illness or injury, the treatment recommended, its risks and dangers, the alternatives and their risks, and the dangers of refusing treatment (including transport).'],
    points: ['Informed consent: the patient understands the five items above',
      'Expressed consent: the patient agrees, in words or by actions',
      'Implied consent (emergency doctrine): an unresponsive or incapacitated patient is assumed to want emergency care',
      'Involuntary consent: treatment authorized by a court or law enforcement, such as for a patient in custody',
      'A patient can withdraw consent at any time'],
    scene: ['Explain what you are going to do before you do it']
  },
  {
    id: 'special-consent', name: 'Difficult consent situations', group: 'consent', aliases: ['minors', 'prisoner', 'mature minor', 'emancipated', 'institution'],
    about: ['Consent is harder for minors, adults who lack competence, patients in an institution, and prisoners. Consent may need to come from a parent, legal guardian, or a representative of a state agency.'],
    points: ['Minors may seek care without parental consent in cases of emancipation, the mature minor exception, and specific medical conditions',
      'Adults without decision-making capacity (disease, injury, or mental illness) may not legally be able to give or refuse consent; apply the emergency doctrine and treat and transport',
      'For a patient in custody, the court or law enforcement agency holding the patient may authorize treatment',
      'Do not delay emergency care for a minor while trying to reach a parent'],
    scene: ['Document who gave consent, or why you acted under the emergency doctrine']
  },
  {
    id: 'refusal', name: 'Refusal of care', group: 'consent', aliases: ['ama', 'refusal', 'release of liability'],
    about: ['An adult with decision-making capacity has the right to refuse medical care, even if the choice could result in death or permanent disability.'],
    points: ['Confirm capacity: check for head injury, hypoxia, hypoglycemia, and intoxication',
      'Explain the risks of refusing, including death, and make sure they understand',
      'Try to persuade them; involve family and medical direction',
      'You may need a "release of liability" signed by the patient and a disinterested witness',
      'Tell them to call back any time, and document everything'],
    scene: ['When in doubt, err on the side of treatment and transport']
  },
  {
    id: 'consent-torts', name: 'Abandonment, false imprisonment, assault & battery', group: 'consent', aliases: ['abandonment', 'false imprisonment', 'assault', 'battery'],
    about: ['Other key legal complications related to consent.'],
    points: ['Abandonment: ending care without the patient\'s consent or without handing off to someone with equal or higher training',
      'False imprisonment: confining or transporting a patient without consent or legal authority',
      'Assault: making a patient fear immediate bodily harm without consent',
      'Battery: touching a patient without consent'],
    scene: ['Give a verbal report at every handoff', 'Never threaten a patient into care']
  },
  {
    id: 'force', name: 'Use of force', group: 'consent', aliases: ['restraint', 'protective custody', 'combative'],
    about: ['Most law enforcement agencies can place a patient in protective custody, which allows some patients to be treated.'],
    points: ['EMS should restrain patients only when it can be done safely',
      'and there is reason to suspect the patient is a threat to themself or others',
      'Use only reasonable force: the minimum needed to prevent harm',
      'Never restrain prone; monitor breathing and circulation'],
    scene: ['Document why restraint was needed, how it was done, and repeat checks']
  },

  // ---------------- Transport ----------------
  {
    id: 'transport', name: 'Transport', group: 'transport', aliases: ['right of way', 'hospital choice', 'destination', 'payer'],
    about: ['In most states, emergency vehicle operators have right-of-way privileges.'],
    points: ['Travel slightly faster than the posted speed',
      'Drive the wrong way in opposing traffic or on one-way streets',
      'Safely enter and pass through intersections on a red light',
      'Park in unauthorized areas',
      'Choose the hospital by the patient\'s needs, the hospital\'s capabilities, and the patient\'s preference (if possible)',
      'With a threat to life or limb, payer protocols should not affect care or transport to the closest appropriate facility'],
    scene: ['Privileges never excuse unsafe driving']
  },

  // ---------------- Resuscitation ----------------
  {
    id: 'resus', name: 'Resuscitation', group: 'death', aliases: ['cpr', 'termination', 'withholding', 'obvious death'],
    about: ['Informed adults with decision-making capacity have the right to refuse care, including CPR. Pulseless patients should be resuscitated, unless a physician directs otherwise, until one of four things happens.'],
    points: ['Restoration of effective spontaneous circulation and ventilation',
      'Transfer of care to a senior emergency medical professional',
      'Reliable criteria indicating irreversible death are present',
      'Medical direction, or prior protocol, authorizes termination',
      'Withhold CPR when it would put the rescuer at risk of harm or death, when obvious signs of death exist (rigor mortis, dependent lividity), or when a valid advance directive or DNR order is present',
      'Termination of resuscitation is based on predetermined criteria set by EMS authorities and medical directors'],
    scene: ['At an apparent death: contact medical direction and follow protocol, document observations, notify authorities, and disturb the scene as little as possible']
  },
  {
    id: 'directives', name: 'Advance directives', group: 'death', aliases: ['dnr', 'living will', 'power of attorney', 'polst', 'post'],
    about: ['Advance directives tell health care workers a patient\'s wishes if the patient becomes unable to state them.'],
    points: ['Durable power of attorney for health care',
      'DNR order',
      'Some states allow living wills, the right to die with dignity, and physician orders for life-sustaining treatment (POLST)',
      'Tennessee\'s version of the POLST is the POST form (Physician Orders for Scope of Treatment)',
      'When dispatched to a dying patient who asked not to be resuscitated, contact medical direction immediately',
      'DNR does not mean "do not treat"; give comfort care'],
    tn: true,
    scene: ['If you can\'t confirm a valid order, start resuscitation and contact medical direction']
  },
  {
    id: 'organ', name: 'Potential organ donation', group: 'death', aliases: ['organ donor', 'donation'],
    about: ['Paramedics can play a key role in evaluating potential organ donors.'],
    points: ['Identify appropriate patients',
      'Establish communication with medical direction',
      'Give emergency care to help keep organs viable'],
    scene: ['Potential donors still get full resuscitative care']
  },

  // ---------------- Crime scenes ----------------
  {
    id: 'crime-scene', name: 'Crime scene responsibilities', group: 'scene', aliases: ['crime scene', 'evidence', 'police'],
    about: ['Paramedics have two roles at a crime scene: provide patient care, and help preserve evidence when possible.'],
    points: ['Personal safety is the first priority, especially at crime scenes',
      'Observe and document the overall scene',
      'Make an effort to protect potential evidence',
      'Don\'t cut through bullet or stab holes; put clothing in paper bags'],
    scene: ['Stage until law enforcement says the scene is safe']
  },

  // ---------------- Documentation ----------------
  {
    id: 'pcr', name: 'Documentation', group: 'records', aliases: ['pcr', 'epcr', 'charting', 'report'],
    about: ['An important job of the PCR is to be the legal record of the care given in the field. It is one of the first items reviewed in a lawsuit for negligence or malpractice.'],
    points: ['Promptly completed',
      'Thoroughly completed',
      'Objectively completed',
      'Accurately completed',
      'Protected to maintain confidentiality',
      'Correct errors with a single line, initial, and date; after submitting, add a dated addendum. Never alter the original'],
    scene: ['"If it isn\'t written down, it wasn\'t done"']
  },

  // ---------------- Ethics ----------------
  {
    id: 'ethics', name: 'Ethical principles', group: 'ethics', aliases: ['autonomy', 'beneficence', 'nonmaleficence', 'justice'],
    about: ['Ethics are principles of right and wrong conduct. The law sets the minimum; ethics often asks for more.'],
    points: ['Autonomy: the patient\'s right to decide',
      'Beneficence: do good',
      'Nonmaleficence: do no harm',
      'Justice: treat all patients fairly',
      'Quick tests: impartiality (would I accept this in the patient\'s place?), universalizability (would I want this done in all similar cases?), interpersonal justifiability (can I defend it to others?)'],
    std: true,
    scene: ['When autonomy and beneficence conflict in a refusal, respect a patient who has capacity']
  }
];

window.LEGAL_TERMS = [
  // negligence
  { term: 'Negligence', def: 'Failing to give the care a similarly trained paramedic would give in similar circumstances', group: 'negligence' },
  { term: 'Gross negligence', def: 'Reckless disregard for a patient\'s safety; not protected by Good Samaritan laws', group: 'negligence', std: true },
  { term: 'Willful or wanton misconduct', def: 'Acting on purpose, or with conscious indifference to the harm it could cause', group: 'negligence', std: true },
  { term: 'Duty to act', def: 'A legal obligation to give care, such as when an on-duty paramedic is dispatched', group: 'negligence' },
  { term: 'Breach of duty', def: 'Actions that deviated from the standard of care', group: 'negligence' },
  { term: 'Standard of care', def: 'The care, skill, and judgment any similarly trained paramedic would provide under similar circumstances', group: 'negligence' },
  { term: 'Damages', def: 'Harm to the patient or another person (the plaintiff)', group: 'negligence' },
  { term: 'Compensable damages', def: 'Money to make up for harm, such as medical bills, lost wages, and pain and suffering', group: 'negligence' },
  { term: 'Punitive damages', def: 'Money meant to punish especially bad conduct, such as gross negligence', group: 'negligence' },
  { term: 'Proximate cause', def: 'The negligent act or lack of action caused the injury or made an existing injury worse', group: 'negligence' },
  { term: 'Foreseeability', def: 'The paramedic could have expected the injury or further harm; required to prove proximate cause', group: 'negligence' },
  { term: 'Malfeasance', def: 'Performing a wrongful or unlawful act', group: 'negligence' },
  { term: 'Misfeasance', def: 'Performing a legal act in a manner that is harmful or injurious', group: 'negligence' },
  { term: 'Nonfeasance', def: 'Failure to perform a required act or duty', group: 'negligence' },
  // defenses
  { term: 'Good Samaritan law', def: 'Encourages people to help others without fear of a lawsuit; does not cover gross negligence', group: 'defenses' },
  { term: 'Government immunity', def: 'A defense that limits lawsuits against government agencies and their employees', group: 'defenses' },
  { term: 'Statute of limitations', def: 'The time limit for filing a lawsuit', group: 'defenses' },
  { term: 'Contributory negligence', def: 'A defense that the plaintiff\'s own negligence helped cause the injury', group: 'defenses' },
  { term: 'Borrowed servant doctrine', def: 'A person who controls someone else\'s employee is responsible for that person\'s acts', group: 'defenses' },
  { term: 'Civil rights law', def: 'Makes it illegal to discriminate by race, color, sex, religion, national origin, or ability to pay', group: 'defenses' },
  { term: 'Liability insurance', def: 'Insurance every practicing health care professional should carry against negligence claims', group: 'defenses' },
  // system
  { term: 'Legislation', def: 'Laws passed by Congress or a state legislature (statutory law)', group: 'system', aliases: ['statutory law'] },
  { term: 'Administrative law', def: 'Rules made by government agencies, such as the state EMS office', group: 'system' },
  { term: 'Common law', def: 'Law that comes from court decisions and precedent (case law)', group: 'system', aliases: ['case law'] },
  { term: 'Criminal law', def: 'Law dealing with wrongs against society, prosecuted by the government', group: 'system' },
  { term: 'Civil law', def: 'Law dealing with disputes between private parties, such as a malpractice suit', group: 'system' },
  { term: 'Plaintiff', def: 'The person who brings a lawsuit', group: 'system' },
  { term: 'Defendant', def: 'The person being sued or charged', group: 'system' },
  { term: 'Malpractice lawsuit', def: 'A suit claiming the plaintiff was injured by negligent patient care', group: 'system' },
  { term: 'Discovery', def: 'The exchange of documents and the taking of depositions and interrogatories before trial', group: 'system' },
  { term: 'Deposition', def: 'Sworn testimony taken out of court during discovery', group: 'system' },
  { term: 'Interrogatories', def: 'Written questions one side must answer under oath during discovery', group: 'system' },
  // laws
  { term: 'Scope of practice', def: 'The range of duties and skills paramedics are allowed and expected to perform when necessary', group: 'laws' },
  { term: 'Medical direction', def: 'Physician supervision of the paramedic\'s medical practice', group: 'laws' },
  { term: 'Medical practice act', def: 'State law that designates restricted acts and lets physicians supervise tasks done by nonphysicians', group: 'laws' },
  { term: 'Licensure', def: 'A government agency grants a qualified person permission to practice a profession', group: 'laws' },
  { term: 'Certification', def: 'Recognition granted by a training entity, government body, or nongovernmental certifying agency', group: 'laws' },
  { term: 'Mandatory reporting', def: 'A legal duty to report cases such as abuse, gunshot wounds, and animal bites', group: 'laws' },
  { term: 'Ryan White CARE Act (Part G)', def: 'Requires that emergency responders be told of exposure to certain infectious diseases within 48 hours', group: 'laws', aliases: ['ryan white'] },
  // privacy
  { term: 'Confidential information', def: 'A patient\'s history, assessment findings, and any treatment given', group: 'privacy' },
  { term: 'Protected health information (PHI)', def: 'Health information that identifies a patient', group: 'privacy', aliases: ['phi'] },
  { term: 'HIPAA', def: 'Federal law that protects the privacy of patients\' health information', group: 'privacy', std: true },
  // consent
  { term: 'Informed consent', def: 'Consent from a patient who understands the problem, treatment, risks, alternatives, and dangers of refusing', group: 'consent' },
  { term: 'Expressed consent', def: 'A patient agrees to care, in words or by actions', group: 'consent', aliases: ['express consent'] },
  { term: 'Implied consent', def: 'Assumed consent to emergency care for a patient who cannot give it (emergency doctrine)', group: 'consent', aliases: ['emergency doctrine'] },
  { term: 'Involuntary consent', def: 'Treatment authorized by a court or law enforcement, such as for a patient in custody', group: 'consent' },
  { term: 'Emancipated minor', def: 'A person under the age of majority who is legally treated as an adult', group: 'consent' },
  { term: 'Mature minor exception', def: 'Lets some minors consent to their own care based on their maturity', group: 'consent' },
  { term: 'Decision-making capacity', def: 'The ability to understand the situation and the consequences and make a reasoned choice', group: 'consent', aliases: ['capacity'] },
  { term: 'Release of liability', def: 'Refusal form signed by the patient and a disinterested witness', group: 'consent' },
  { term: 'Abandonment', def: 'Ending care without consent or without handing off to equal or higher training', group: 'consent' },
  { term: 'False imprisonment', def: 'Confining or transporting a patient without consent or legal authority', group: 'consent' },
  { term: 'Assault', def: 'Making someone fear immediate bodily harm without consent', group: 'consent' },
  { term: 'Battery', def: 'Touching someone without consent', group: 'consent' },
  { term: 'Protective custody', def: 'Law enforcement authority to hold a patient so they can be treated', group: 'consent' },
  // transport
  { term: 'Right-of-way privileges', def: 'Emergency vehicle exceptions such as passing through red lights after stopping safely', group: 'transport' },
  // death
  { term: 'Advance directive', def: 'A document stating the patient\'s wishes if they become unable to state them', group: 'death' },
  { term: 'Durable power of attorney for health care', def: 'Names a person to make health care decisions when the patient cannot', group: 'death' },
  { term: 'DNR order', def: 'A physician order not to start CPR', group: 'death', aliases: ['do not resuscitate'] },
  { term: 'Living will', def: 'A document stating which life-sustaining treatments the patient does or does not want', group: 'death' },
  { term: 'POLST', def: 'Physician orders for life-sustaining treatment; Tennessee\'s version is the POST form', group: 'death', aliases: ['post'], tn: true },
  { term: 'Rigor mortis', def: 'Stiffening of the muscles after death', group: 'death' },
  { term: 'Dependent lividity', def: 'Pooling of blood in the lowest parts of the body after death', group: 'death' },
  // records
  { term: 'Patient care report (PCR)', def: 'The legal record of the care given in the field', group: 'records', aliases: ['pcr'] },
  { term: 'Addendum', def: 'A dated, signed addition to a PCR after it was submitted', group: 'records', std: true },
  // ethics
  { term: 'Autonomy', def: 'The patient\'s right to make their own decisions', group: 'ethics', std: true },
  { term: 'Beneficence', def: 'Doing good; acting in the patient\'s best interest', group: 'ethics', std: true },
  { term: 'Nonmaleficence', def: 'Doing no harm', group: 'ethics', std: true },
  { term: 'Justice', def: 'Treating all patients fairly', group: 'ethics', std: true }
];

window.LEGAL_FACTS = [
  // negligence
  { q: 'Four elements needed to prove negligence?', a: 'Duty to act, breach of duty, damages, proximate cause', wrong: ['Duty, consent, abandonment, damages', 'Intent, breach, damages, malice', 'Scope, standard of care, consent, causation'], group: 'negligence' },
  { q: 'If one of the four elements is missing…', a: 'The negligence claim fails', wrong: ['The paramedic is still liable', 'It becomes gross negligence', 'The claim goes to criminal court'], group: 'negligence' },
  { q: 'The standard of care compares you to…', a: 'Any similarly trained paramedic under similar circumstances', wrong: ['The best paramedic in the state', 'An emergency physician', 'What the patient expected'], group: 'negligence' },
  { q: 'Proximate cause means…', a: 'Your act or failure to act caused the injury or made it worse', wrong: ['You were the closest provider', 'You had a duty to act', 'The patient was harmed by anyone'], group: 'negligence' },
  { q: 'To prove proximate cause, the injury must have been…', a: 'Foreseeable by the paramedic', wrong: ['Permanent', 'Witnessed by police', 'Caused on purpose'], group: 'negligence' },
  { q: 'Giving a drug outside your scope of practice is…', a: 'Malfeasance', wrong: ['Misfeasance', 'Nonfeasance', 'Contributory negligence'], group: 'negligence' },
  { q: 'Doing an allowed skill poorly, so it hurts the patient, is…', a: 'Misfeasance', wrong: ['Malfeasance', 'Nonfeasance', 'Gross negligence'], group: 'negligence' },
  { q: 'Not giving oxygen to a hypoxic patient is…', a: 'Nonfeasance', wrong: ['Malfeasance', 'Misfeasance', 'Battery'], group: 'negligence' },
  { q: 'Two kinds of damages?', a: 'Compensable and punitive', wrong: ['Civil and criminal', 'Direct and proximate', 'Actual and implied'], group: 'negligence' },
  { q: 'Punitive damages are meant to…', a: 'Punish especially bad conduct', wrong: ['Pay the patient\'s medical bills', 'Pay the paramedic\'s legal fees', 'Replace lost wages'], group: 'negligence' },
  { q: 'Main difference between ordinary and gross negligence?', a: 'Gross negligence is reckless disregard for safety, not just a mistake', wrong: ['Gross negligence causes no harm', 'Ordinary negligence is always criminal', 'There is no difference'], group: 'negligence', std: true },
  { q: 'Good Samaritan laws generally do NOT protect against…', a: 'Gross negligence, reckless disregard, or willful or wanton misconduct', wrong: ['Honest mistakes made in good faith', 'Care within your training', 'Care given without pay'], group: 'negligence' },
  { q: 'Which is an example of gross negligence?', a: 'Responding to calls while intoxicated', wrong: ['Misreading a blood pressure once', 'Forgetting to chart a pertinent negative', 'Following protocol with a bad outcome'], group: 'negligence', std: true },
  // defenses
  { q: 'Four defenses to negligence claims on the slides?', a: 'Good Samaritan laws, government immunity, statute of limitations, contributory negligence', wrong: ['Consent, refusal, abandonment, battery', 'Duty, breach, damages, cause', 'HIPAA, EMTALA, Ryan White, OSHA'], group: 'defenses' },
  { q: 'Contributory negligence means…', a: 'The patient\'s own negligence helped cause the injury', wrong: ['Two paramedics were negligent', 'The medical director was negligent', 'The negligence was on purpose'], group: 'defenses' },
  { q: 'Under the borrowed servant doctrine, you can be liable for…', a: 'Someone else\'s employee you were directing', wrong: ['Your own employer\'s debts', 'Any bystander on scene', 'Only your own actions'], group: 'defenses' },
  { q: 'Which is a medical director responsibility?', a: 'Setting protocols consistent with current standards of care', wrong: ['Driving the ambulance', 'Billing patients', 'Signing every PCR'], group: 'defenses' },
  { q: 'In health care, civil rights law also bans discrimination by…', a: 'Ability to pay', wrong: ['Distance from the hospital', 'Time of day', 'Type of call'], group: 'defenses' },
  { q: 'Best protection against a negligence claim?', a: 'Excellence: training, QI, medical direction, documentation, professionalism', wrong: ['Avoiding difficult calls', 'Keeping PCRs short', 'Never touching patients'], group: 'defenses' },
  // system
  { q: 'The paramedic\'s legal duties are to…', a: 'The patient, the employer, the medical director, and the public', wrong: ['Only the patient', 'The patient and the hospital', 'The employer and the insurance company'], group: 'system' },
  { q: 'Five types of law in the U.S. legal system?', a: 'Legislation, administrative, common, criminal, civil', wrong: ['Federal, state, county, city, tribal', 'Statutory, moral, ethical, civil, criminal', 'Constitutional, HIPAA, EMTALA, civil, criminal'], group: 'system' },
  { q: 'Failure to perform EMS duties properly can result in…', a: 'Civil or criminal liability', wrong: ['Only civil liability', 'Only loss of license', 'Nothing if you meant well'], group: 'system' },
  { q: 'Discovery includes…', a: 'Exchanging documents, depositions, and interrogatories', wrong: ['The jury\'s verdict', 'The appeal', 'The first 911 call'], group: 'system' },
  { q: 'After discovery, a case can be…', a: 'Settled, dismissed, adjudicated, or go to trial', wrong: ['Only go to trial', 'Only dismissed', 'Sent back to the patient'], group: 'system' },
  // laws
  { q: 'Who is legally responsible for supervising the paramedic\'s medical practice?', a: 'The physician medical director', wrong: ['The EMS supervisor', 'The state EMS office', 'The receiving nurse'], group: 'laws' },
  { q: 'Which law designates restricted acts nonphysicians may not perform?', a: 'The medical practice act', wrong: ['HIPAA', 'The Good Samaritan law', 'Motor vehicle law'], group: 'laws' },
  { q: 'Licensure is granted by…', a: 'A government agency', wrong: ['A professional association only', 'Your training program', 'The NREMT'], group: 'laws' },
  { q: 'Which is a mandatory report on the slides?', a: 'Animal bites', wrong: ['A minor car crash with no injuries', 'A patient refusing transport', 'A psychiatric history'], group: 'laws' },
  { q: 'Ryan White Part G requires exposure notification within…', a: '48 hours of the determination', wrong: ['24 hours of the call', '7 days', '30 days'], group: 'laws' },
  { q: 'In Tennessee, who must report suspected child abuse?', a: 'Every person', wrong: ['Only physicians and nurses', 'Only law enforcement', 'Only teachers'], group: 'laws', tn: true },
  // privacy
  { q: 'Confidential information includes…', a: 'History, assessment findings, and treatment given', wrong: ['Only the patient\'s name', 'Only the diagnosis', 'Only written records'], group: 'privacy' },
  { q: 'A photo of the patient\'s wrecked car on social media is…', a: 'Potentially a breach of confidentiality', wrong: ['Fine without the patient\'s name', 'Fine after the shift', 'Fine if the crash was on a public road'], group: 'privacy' },
  { q: 'Releasing inaccurate patient information can result in…', a: 'Civil liability', wrong: ['Nothing, if it was a mistake', 'Only a written warning', 'Protection under Good Samaritan law'], group: 'privacy' },
  // consent
  { q: 'Types of consent on the slides?', a: 'Informed, expressed, implied, involuntary', wrong: ['Verbal, written, signed, witnessed', 'Full, partial, temporary, permanent', 'Adult, minor, guardian, court'], group: 'consent' },
  { q: 'An unresponsive patient with a life threat is treated under…', a: 'Implied consent (emergency doctrine)', wrong: ['Expressed consent', 'Involuntary consent', 'The mature minor exception'], group: 'consent' },
  { q: 'A patient in police custody can be treated under…', a: 'Consent authorized by the court or law enforcement agency', wrong: ['No consent; prisoners have no rights', 'Only the prisoner\'s own consent', 'Their family\'s consent'], group: 'consent' },
  { q: 'Minors may seek care without a parent through…', a: 'Emancipation, the mature minor exception, or specific conditions', wrong: ['Any minor over 14', 'Having a driver\'s license', 'Calling 911 themselves'], group: 'consent' },
  { q: 'Who should witness a release of liability?', a: 'A disinterested witness', wrong: ['Your partner', 'The patient\'s spouse only', 'No witness is needed'], group: 'consent' },
  { q: 'EMS should restrain a patient only when…', a: 'It can be done safely and the patient may be a threat to self or others', wrong: ['The patient refuses transport', 'The patient is rude', 'The family asks you to'], group: 'consent' },
  { q: 'Threatening to start an IV on a refusing patient is…', a: 'Assault', wrong: ['Battery', 'Abandonment', 'False imprisonment'], group: 'consent' },
  { q: 'Starting the IV on that refusing patient is…', a: 'Battery', wrong: ['Assault only', 'False imprisonment', 'Nonfeasance'], group: 'consent' },
  // transport
  { q: 'Which is a typical right-of-way privilege?', a: 'Passing through a red light after safely entering the intersection', wrong: ['Ignoring all traffic signals', 'Driving any speed you like', 'Never yielding to pedestrians'], group: 'transport' },
  { q: 'Hospital choice should be based on…', a: 'Patient needs, hospital capabilities, and patient preference', wrong: ['The patient\'s insurance', 'The shortest drive back to base', 'Which ED is least busy for the crew'], group: 'transport' },
  // death
  { q: 'Resuscitate a pulseless patient until…', a: 'ROSC, transfer to a senior provider, signs of irreversible death, or authorized termination', wrong: ['20 minutes have passed, always', 'The family asks you to stop', 'You arrive at the ambulance'], group: 'death' },
  { q: 'When should CPR be withheld?', a: 'Risk to the rescuer, obvious signs of death, or a valid DNR', wrong: ['The patient is over 80', 'The arrest was unwitnessed', 'The family is upset'], group: 'death' },
  { q: 'Which is an obvious sign of death?', a: 'Dependent lividity', wrong: ['Fixed, dilated pupils', 'No pulse for 1 minute', 'Cool skin'], group: 'death' },
  { q: 'Dispatched to a dying patient who asked not to be resuscitated, you should…', a: 'Contact medical direction immediately', wrong: ['Start CPR no matter what', 'Leave the scene', 'Let the family decide'], group: 'death' },
  { q: 'Tennessee\'s POLST form is called the…', a: 'POST form', wrong: ['MOLST form', 'Living will', 'HIPAA form'], group: 'death', tn: true },
  { q: 'Paramedics help potential organ donors by…', a: 'Identifying them, contacting medical direction, and keeping organs viable', wrong: ['Stopping care early', 'Asking the family for consent', 'Taking them to the closest hospital only'], group: 'death' },
  // scene
  { q: 'Two roles of the paramedic at a crime scene?', a: 'Provide patient care and help preserve evidence', wrong: ['Arrest suspects and collect evidence', 'Interview witnesses and give care', 'Secure the scene and call the coroner'], group: 'scene' },
  { q: 'First priority at a crime scene?', a: 'Personal safety', wrong: ['Preserving evidence', 'Patient care', 'Getting statements'], group: 'scene' },
  // records
  { q: 'Five characteristics of an effective PCR?', a: 'Prompt, thorough, objective, accurate, confidential', wrong: ['Short, neat, typed, signed, dated', 'Prompt, brief, subjective, legible, shared', 'Complete, opinionated, fast, coded, sealed'], group: 'records' },
  { q: 'In a negligence lawsuit, the PCR is…', a: 'One of the first items reviewed', wrong: ['Rarely looked at', 'Not admissible', 'Only used for billing'], group: 'records' },
  { q: 'How do you correct an error on a paper PCR?', a: 'Single line through it, write the correction, initial and date', wrong: ['White it out', 'Scribble it out', 'Start over and throw the old one away'], group: 'records', std: true },
  // ethics
  { q: '"Do no harm" is the principle of…', a: 'Nonmaleficence', wrong: ['Beneficence', 'Autonomy', 'Justice'], group: 'ethics', std: true },
  { q: 'Respecting a competent patient\'s refusal reflects…', a: 'Autonomy', wrong: ['Beneficence', 'Nonmaleficence', 'Justice'], group: 'ethics', std: true }
];

window.LEGAL_SCENARIOS = [
  // system
  {
    id: 'sc-lawsuit', group: 'system',
    case: 'Two years after a call, you get papers saying a patient\'s attorney wants to take your sworn testimony about the care you gave.',
    a: 'The case is in discovery and you are being deposed',
    wrong: ['The case is already at trial', 'You are being charged with a crime', 'The case has been dismissed'],
    why: 'Discovery is the exchange of documents and the taking of depositions and interrogatories. Your PCR will be one of the first things reviewed.'
  },
  {
    id: 'sc-duties', group: 'system',
    case: 'Your partner keeps skipping skill practice and says, "My duty is only to the patient in front of me."',
    a: 'Wrong: legal duties are to the patient, employer, medical director, and public, and keeping skills sharp is a responsibility',
    wrong: ['Right: duty is only to the patient', 'Right: skills are the employer\'s problem', 'Right: only the medical director has duties'],
    why: 'The slides list maintaining mastery of skills and critically reviewing your own performance as responsibilities.'
  },
  // negligence
  {
    id: 'sc-stretcher', group: 'negligence',
    case: 'You forget to secure a patient on the stretcher. The patient falls and breaks a hip.',
    a: 'All four elements of negligence are present',
    wrong: ['This is battery', 'There is no duty, so no negligence', 'Only an ethical problem, not legal'],
    why: 'Duty (your patient), breach (failure to secure), damages (fracture), proximate cause (the fall from the unsecured stretcher).'
  },
  {
    id: 'sc-no-harm', group: 'negligence',
    case: 'You give aspirin a few minutes late, but the patient has no harm from the delay.',
    a: 'A negligence claim would likely fail: there are no damages',
    wrong: ['It is automatically gross negligence', 'It is battery', 'It is abandonment'],
    why: 'All four elements must be proven. With no harm from the breach, there is no negligence claim. Still document honestly.'
  },
  {
    id: 'sc-drunk', group: 'negligence',
    case: 'A paramedic drinks on shift and runs a call. He drops an IV bag, then leaves an unresponsive patient alone in the ambulance while he finishes his meal.',
    a: 'Gross negligence: reckless disregard for the patient\'s safety',
    wrong: ['Ordinary negligence, covered by Good Samaritan law', 'Not negligence, because he had no duty', 'Contributory negligence'],
    why: 'He knew the risk and ignored it. Good Samaritan laws don\'t cover it, and punitive damages and criminal charges are possible.'
  },
  {
    id: 'sc-misfeasance', group: 'negligence',
    case: 'You intubate a patient, never confirm placement, and the tube is in the esophagus.',
    a: 'Misfeasance: an allowed skill done in a harmful way',
    wrong: ['Malfeasance', 'Nonfeasance', 'Not a breach because intubation is in your scope'],
    why: 'Intubation is legal for you, but doing it without confirming placement falls below the standard of care.'
  },
  {
    id: 'sc-nonfeasance', group: 'negligence',
    case: 'An altered diabetic patient never gets a glucose check. He seizes in the ED from hypoglycemia.',
    a: 'Nonfeasance: failure to perform a required act',
    wrong: ['Malfeasance', 'Misfeasance', 'No breach since you didn\'t do anything'],
    why: 'Not doing something the standard of care requires is a breach too.'
  },
  {
    id: 'sc-malfeasance', group: 'negligence',
    case: 'A paramedic gives a paralytic drug his protocols don\'t allow, to "calm down" a combative patient.',
    a: 'Malfeasance: a wrongful or unlawful act',
    wrong: ['Misfeasance', 'Nonfeasance', 'Protected because it was an emergency'],
    why: 'Giving a drug outside your scope and protocol is an act you had no right to do.'
  },
  {
    id: 'sc-good-outcome', group: 'negligence',
    case: 'You follow protocol perfectly for a cardiac arrest, but the patient dies. The family sues.',
    a: 'The claim should fail: there was no breach of duty',
    wrong: ['You are liable because the patient died', 'You are liable for punitive damages', 'The death proves proximate cause'],
    why: 'A bad outcome is not negligence if care met the standard. Your thorough PCR is how you prove it.'
  },
  // defenses
  {
    id: 'sc-good-sam', group: 'defenses',
    case: 'Off duty, you stop at a crash and hold c-spine until the ambulance arrives, then hand off. The patient later sues you.',
    a: 'Good Samaritan law likely protects you: good faith, unpaid, within your training',
    wrong: ['You are liable because you stopped', 'You are liable because you were off duty', 'Only government immunity can protect you'],
    why: 'Good Samaritan laws encourage helping without fear of a lawsuit. They would not protect gross negligence.'
  },
  {
    id: 'sc-contrib', group: 'defenses',
    case: 'A patient keeps unbuckling his stretcher straps despite your warnings, stands up while the ambulance is moving, and falls.',
    a: 'Contributory negligence may be a defense',
    wrong: ['Statute of limitations', 'Government immunity', 'Borrowed servant doctrine'],
    why: 'The patient\'s own negligence helped cause the injury. Document your warnings.'
  },
  {
    id: 'sc-borrowed', group: 'defenses',
    case: 'You tell a firefighter from another agency to do chest compressions, and he breaks the patient\'s ribs by using poor technique.',
    a: 'You may be liable under the borrowed servant doctrine',
    wrong: ['Only the fire department is liable', 'No one is liable during CPR', 'Only the medical director is liable'],
    why: 'When you control someone else\'s employee, you can be responsible for their acts.'
  },
  // consent
  {
    id: 'sc-refusal-hypo', group: 'consent',
    case: 'A confused diabetic man with a glucose of 38 mg/dL wants you to leave.',
    a: 'Treat under the emergency doctrine; he lacks decision-making capacity',
    wrong: ['Have him sign a refusal and leave', 'Leave because he is an adult', 'Call his family for permission first'],
    why: 'Hypoglycemia removes capacity. He can\'t make an informed refusal until treated and reassessed.'
  },
  {
    id: 'sc-refusal-ok', group: 'consent',
    case: 'An alert, oriented woman with chest pain understands she could die, repeats the risks back to you, and refuses transport.',
    a: 'Respect the refusal after trying to persuade her; get a release signed with a disinterested witness',
    wrong: ['Transport her anyway for her own good', 'Restrain her because chest pain is serious', 'Leave without documenting since she refused'],
    why: 'An adult with capacity can refuse, even if it could mean death.'
  },
  {
    id: 'sc-minor', group: 'consent',
    case: 'A 12-year-old at soccer practice has a deformed forearm and a weak radial pulse. No one can reach the parents.',
    a: 'Treat and transport under the emergency doctrine while someone keeps trying the parents',
    wrong: ['Wait until a parent gives consent', 'Have the 12-year-old sign consent', 'Refuse to treat without a guardian'],
    why: 'Emergency care for a minor is not delayed to reach a parent.'
  },
  {
    id: 'sc-prisoner', group: 'consent',
    case: 'An inmate at the county jail has chest pain. Officers want him evaluated and transported.',
    a: 'The agency that has him in custody can authorize treatment',
    wrong: ['You need the inmate\'s written consent first', 'Prisoners cannot receive EMS care', 'Only a judge can authorize it, in person'],
    why: 'The court or law enforcement agency holding a patient may authorize treatment.'
  },
  {
    id: 'sc-handoff', group: 'consent',
    case: 'The ED is packed. A nurse points you to a hallway bed and walks away before you can give report.',
    a: 'Stay until you give report to a nurse or physician who accepts care',
    wrong: ['Move the patient to the bed and leave', 'Leave the PCR on the bed and clear', 'Tell the registration clerk and leave'],
    why: 'Leaving without a proper handoff to equal or higher training is abandonment.'
  },
  {
    id: 'sc-threat', group: 'consent',
    case: 'Your partner tells a refusing patient, "If you don\'t hold still, I\'m sticking this needle in you anyway."',
    a: 'That is assault; doing it would be battery',
    wrong: ['That is battery', 'That is acceptable under implied consent', 'That is abandonment'],
    why: 'Assault is creating fear of harm without consent. Battery is the touching.'
  },
  // privacy
  {
    id: 'sc-reporter', group: 'privacy',
    case: 'A news reporter at a crash asks for the driver\'s name and injuries.',
    a: 'Don\'t share it; refer them to your agency\'s spokesperson',
    wrong: ['Give the name only, not the injuries', 'Share it, since the crash is public', 'Share it if the patient is an adult'],
    why: 'The reporter isn\'t legally entitled to PHI. Releasing it can bring civil liability.'
  },
  {
    id: 'sc-social', group: 'privacy',
    case: 'After a bad crash, a classmate posts a photo of the wrecked car with the town name, but no patient name.',
    a: 'It can still identify the patient and breach confidentiality',
    wrong: ['It is fine without names', 'It is fine if posted after the shift', 'It is fine because the road is public'],
    why: 'The slides list photos of the patient\'s vehicle as confidential information.'
  },
  // laws
  {
    id: 'sc-child', group: 'laws',
    case: 'A toddler has bruises of different ages on the back and buttocks. The parent says the child fell off the couch.',
    a: 'Treat, document objectively, and report your suspicion as required',
    wrong: ['Confront the parent on scene', 'Report only if you can prove abuse', 'Do nothing; the parent explained it'],
    why: 'Child abuse is a mandatory report, and you need only reasonable suspicion. In Tennessee, every person must report.'
  },
  {
    id: 'sc-scope-order', group: 'laws',
    case: 'An online physician orders a procedure that isn\'t in your state paramedic scope of practice.',
    a: 'Respectfully decline, explain it is outside your scope, and document',
    wrong: ['Do it, since a physician ordered it', 'Have your partner do it', 'Do it but leave it out of the PCR'],
    why: 'No order can expand your legal scope. Doing it would be malfeasance.'
  },
  // transport
  {
    id: 'sc-payer', group: 'transport',
    case: 'A patient with a STEMI has insurance that prefers a hospital 40 minutes away. A cath-lab hospital is 10 minutes away.',
    a: 'Go to the closest appropriate facility, the cath lab 10 minutes away',
    wrong: ['Go to the insurance-preferred hospital', 'Let dispatch decide by insurance', 'Ask the patient to pay first'],
    why: 'With a threat to life or limb, payer protocols should not affect the destination.'
  },
  // death
  {
    id: 'sc-dnr-family', group: 'death',
    case: 'A hospice patient is in cardiac arrest. There is a valid DNR, but a daughter screams at you to do CPR.',
    a: 'Honor the valid DNR, support the family, and contact medical direction if needed',
    wrong: ['Start CPR because family asked', 'Start CPR, then stop when she calms down', 'Leave the scene'],
    why: 'A valid DNR or advance directive is a reason to withhold CPR.'
  },
  {
    id: 'sc-no-form', group: 'death',
    case: 'Family says their father "never wanted machines," but no one can find a DNR or POST form. He is in cardiac arrest.',
    a: 'Start resuscitation and contact medical direction',
    wrong: ['Withhold CPR based on the family\'s word', 'Wait while they search the house', 'Do only rescue breaths'],
    why: 'Without a valid order, pulseless patients are resuscitated unless a physician directs otherwise.'
  },
  {
    id: 'sc-lividity', group: 'death',
    case: 'A man is found cold in bed with rigor mortis in the jaw and dark purple pooling along his back.',
    a: 'Withhold CPR, contact medical direction, notify authorities, and disturb the scene little',
    wrong: ['Start CPR and transport', 'Do CPR for 20 minutes, then stop', 'Move the body to the ambulance'],
    why: 'Rigor mortis and dependent lividity are obvious signs of death.'
  },
  // scene
  {
    id: 'sc-gsw', group: 'scene',
    case: 'You arrive at a shooting. The patient is down in the living room and police are still clearing the house.',
    a: 'Stage until police say the scene is safe',
    wrong: ['Go straight in to the patient', 'Send one person in', 'Go in through the back door'],
    why: 'Personal safety is the first priority, especially at crime scenes.'
  },
  // records
  {
    id: 'sc-pcr-opinion', group: 'records',
    case: 'A patient smells of alcohol, slurs words, and yells at you. You start to write "drunk and belligerent."',
    a: 'Write what you observed: odor of alcohol, slurred speech, and his words in quotes',
    wrong: ['Write "drunk and belligerent"', 'Leave his behavior out', 'Write "known alcoholic"'],
    why: 'A PCR must be objective. Labels can bring liability and can hide a head injury or hypoglycemia.'
  },
  {
    id: 'sc-ethics', group: 'ethics',
    case: 'A competent patient refuses transport. You want to help her, but she has the right to decide. You respect the refusal.',
    a: 'Autonomy outweighed beneficence',
    wrong: ['Justice outweighed autonomy', 'Nonmaleficence required transport', 'Beneficence outweighed autonomy'],
    why: 'Autonomy is the patient\'s right to decide. Beneficence (doing good) yields to a patient who has capacity.',
    std: true
  },
  {
    id: 'sc-pcr-error', group: 'records',
    case: 'After submitting your PCR, you realize you charted the wrong time for a medication.',
    a: 'Write a dated, signed addendum with the correct time',
    wrong: ['Delete the report and write a new one', 'Leave it, since it was submitted', 'Ask your partner to change it'],
    why: 'Never alter the original. An accurate record protects you in a lawsuit.'
  }
];
