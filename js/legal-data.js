/*
 * Medical-legal and ethics content for paramedic school: the legal system,
 * scope of practice, consent and refusal, negligence, confidentiality,
 * mandatory reporting, end-of-life decisions, documentation and ethics.
 *
 * No class slides for this chapter have been added yet, so the wording here
 * follows the standard paramedic curriculum (National EMS Education
 * Standards, medical-legal and ethics). Items marked tn: true are Tennessee
 * specifics; laws vary by state, so check them against your instructor and
 * your agency's protocols.
 *
 * Topic fields: about (what it is), points (key points), scene (what to do
 * in the field). Terms: term, def. Facts: q, a, wrong. Scenarios: case, a,
 * wrong, why.
 */
window.LEGAL_GROUPS = [
  { id: 'system', name: 'Legal system & duty' },
  { id: 'scope', name: 'Scope of practice & medical direction' },
  { id: 'consent', name: 'Consent, capacity & refusal' },
  { id: 'liability', name: 'Negligence & other torts' },
  { id: 'privacy', name: 'Confidentiality & HIPAA' },
  { id: 'reporting', name: 'Reporting & crime scenes' },
  { id: 'death', name: 'End of life & advance directives' },
  { id: 'records', name: 'Documentation' },
  { id: 'ethics', name: 'Ethics' }
];

window.LEGAL_TOPICS = [
  // ---------------- Legal system & duty ----------------
  {
    id: 'sources', name: 'Sources of law', group: 'system', aliases: ['types of law', 'constitutional', 'common law', 'statutory', 'administrative'],
    about: ['Four sources of law in the United States: constitutional, common (case), statutory (legislative), and administrative (regulatory).'],
    points: ['Constitutional law comes from the U.S. and state constitutions and protects individual rights',
      'Common law (case law) comes from court decisions and precedent',
      'Statutory law is passed by Congress or a state legislature (for example, a state EMS act)',
      'Administrative law is the rules agencies write under a statute (for example, the state EMS office rules); it has the force of law'],
    scene: ['Your scope of practice comes from state statute and EMS rules, plus your medical director']
  },
  {
    id: 'civil-criminal', name: 'Civil vs criminal law', group: 'system', aliases: ['civil', 'criminal', 'tort', 'lawsuit'],
    about: ['Criminal law deals with wrongs against society, prosecuted by the government. Civil law deals with disputes between private parties, usually for money damages.'],
    points: ['Criminal cases can bring fines, probation or jail; the burden is "beyond a reasonable doubt"',
      'Most cases against paramedics are civil (tort) cases, usually negligence; the burden is a "preponderance of the evidence"',
      'The plaintiff brings the suit; the defendant is the one sued',
      'Steps of a civil suit: complaint, discovery (including depositions), trial, decision, appeal or settlement',
      'The statute of limitations sets how long a patient has to file suit'],
    scene: ['A complete, accurate PCR is your best evidence if a case comes years later']
  },
  {
    id: 'duty-act', name: 'Duty to act', group: 'system', aliases: ['duty', 'off duty', 'good samaritan'],
    about: ['A legal obligation to give care. For an on-duty paramedic, it starts when you are dispatched or a patient asks for help.'],
    points: ['On duty, you have a duty to act within your service area and protocols',
      'Off duty, most states impose no legal duty to stop, but many argue an ethical one; check your state',
      'Once you start care off duty, you have taken on a duty and cannot abandon the patient',
      'Good Samaritan laws protect people who help in good faith, without pay, within their training',
      'Good Samaritan laws do not cover gross negligence or care outside your training',
      'Governmental (sovereign) immunity can limit suits against public agencies and their employees; it varies by state'],
    scene: ['If you stop off duty: identify yourself, get consent, stay within your training, hand off to responding EMS, and stay until they take over']
  },
  {
    id: 'emtala', name: 'EMTALA', group: 'system', aliases: ['cobra', 'anti-dumping', 'transfer'],
    about: ['The Emergency Medical Treatment and Active Labor Act: a federal law that hospitals with emergency departments must give a medical screening exam and stabilizing care to anyone with an emergency condition, regardless of ability to pay.'],
    points: ['Passed in 1986 as part of COBRA; often called the anti-dumping law',
      'A hospital cannot refuse or transfer an unstable patient because of insurance or ability to pay',
      'An unstable patient may be transferred only with appropriate care en route and a receiving facility that has accepted the patient',
      'Once an ambulance arrives on hospital property, the patient falls under the hospital\'s EMTALA obligation'],
    scene: ['On an interfacility transfer, the sending physician is responsible for the transfer order; make sure the care you can provide matches what the patient needs']
  },

  // ---------------- Scope of practice ----------------
  {
    id: 'scope', name: 'Scope of practice', group: 'scope', aliases: ['scope', 'standard of care'],
    about: ['The range of skills and duties a paramedic is legally allowed to perform. It is set by state law and rules and further limited by your medical director and protocols.'],
    points: ['Scope of practice is what you may do; the standard of care is how well you must do it',
      'The standard of care is what a reasonable, prudent paramedic with similar training would do in similar circumstances',
      'Performing a skill outside your scope can be negligence per se, even if the patient is not harmed',
      'The National EMS Scope of Practice Model sets the national floor; each state decides its own scope'],
    scene: ['If an order (even from a physician) is outside your scope, you may not follow it; explain and offer what you can do']
  },
  {
    id: 'med-direction', name: 'Medical direction', group: 'scope', aliases: ['medical control', 'online', 'offline', 'protocols', 'standing orders'],
    about: ['Physician oversight of patient care. Paramedics practice as designated agents of the medical director, using the physician\'s license.'],
    points: ['Online (direct) medical direction: real-time orders by radio or phone',
      'Offline (indirect) medical direction: protocols, standing orders, training, and quality review set up in advance',
      'Standing orders let you give care before contacting medical control',
      'Repeat an online order back (echo it) to confirm it, and question any order that seems wrong',
      'A physician on scene who wants to direct care must identify themselves, accept responsibility, usually go with the patient, and document; follow your protocol for intervener physicians'],
    scene: ['Document who gave an online order, what it was, and when']
  },
  {
    id: 'licensure', name: 'Licensure, certification & credentialing', group: 'scope', aliases: ['license', 'nremt', 'reciprocity', 'credential'],
    about: ['Licensure is permission from the state to practice. Certification is recognition that you met a standard (such as the NREMT exam). Credentialing is your medical director authorizing you to practice in that agency.'],
    points: ['You must hold a state license to practice as a paramedic in that state',
      'National Registry certification shows you passed the national exam; most states use it toward licensure',
      'Reciprocity is getting licensed in a new state based on credentials from another',
      'A license can be suspended or revoked for things like practicing outside scope, impairment, or falsifying records',
      'In Tennessee, paramedics are licensed through the state EMS Board in the Department of Health'],
    tn: true,
    scene: ['Keep your license, continuing education, and CPR cards current; practicing on an expired license is practicing without one']
  },

  // ---------------- Consent ----------------
  {
    id: 'consent', name: 'Consent', group: 'consent', aliases: ['expressed', 'informed', 'implied', 'involuntary'],
    about: ['Permission to treat. Treating without valid consent can be battery.'],
    points: ['Expressed (informed) consent: a competent adult agrees after being told the care, its risks and benefits, the alternatives, and the risk of refusing',
      'Consent can be verbal, written, or shown by actions (holding out an arm for a BP cuff)',
      'Implied consent (emergency doctrine): an unresponsive or incapacitated patient with a life-threatening problem is assumed to want care',
      'Involuntary consent: care authorized by law, such as a court order, or a patient in police custody or under an emergency mental health hold',
      'A patient can withdraw consent at any time, even after care has started',
      'Consent is needed for each major procedure, not just once for the whole call'],
    scene: ['Explain each step before you do it', 'Implied consent ends when the patient regains capacity and refuses']
  },
  {
    id: 'capacity', name: 'Decision-making capacity', group: 'consent', aliases: ['competence', 'competency', 'capacity'],
    about: ['The patient\'s ability to understand the situation, appreciate the consequences, weigh choices, and communicate a decision. Paramedics assess capacity; competence is a legal finding by a court.'],
    points: ['Capacity requires being alert and oriented and able to understand and repeat back the risks',
      'Things that can remove capacity: altered mental status, head injury, hypoxia, hypoglycemia, intoxication, shock, severe pain, some psychiatric emergencies',
      'A patient can have capacity and still make a choice you disagree with',
      'Capacity can change during a call; reassess it'],
    scene: ['Check a glucose and SpO₂ and look for head injury before accepting a refusal', 'Document how you judged capacity (orientation, the patient\'s own words)']
  },
  {
    id: 'minors', name: 'Minors and consent', group: 'consent', aliases: ['child', 'parent', 'emancipated', 'in loco parentis'],
    about: ['Minors generally cannot give legal consent; a parent or legal guardian consents for them. In an emergency with no parent available, implied consent applies.'],
    points: ['The age of majority is 18 in most states, including Tennessee',
      'Emancipated minors can consent for themselves: typically married, in the military, or emancipated by a court (rules vary by state)',
      'Many states let minors consent to some care on their own (such as pregnancy or STI care)',
      'In loco parentis: an adult such as a teacher or babysitter is temporarily in charge of the child; check your protocol for what they can consent to',
      'Do not delay emergency care for a child while trying to reach a parent'],
    scene: ['Keep trying to reach the parent and document your attempts', 'If a parent refuses care that the child urgently needs, contact medical control; law enforcement or child protective services may be needed']
  },
  {
    id: 'refusal', name: 'Refusal of care (AMA)', group: 'consent', aliases: ['ama', 'against medical advice', 'refusal', 'rma'],
    about: ['A competent adult has the right to refuse any or all care, even if refusing could cause death.'],
    points: ['Make sure the patient has capacity and is an adult (or emancipated)',
      'Explain the risks of refusing in plain language, including the possibility of death, and make sure they understand',
      'Try to persuade the patient; involve family, a friend, or medical control',
      'Offer alternatives (see their doctor, have someone stay with them) and tell them to call 911 again any time',
      'Have the patient sign the refusal form and get a witness (ideally not your partner; family or police)',
      'If the patient will not sign, document that they refused to sign, with a witness',
      'Document the assessment, vital signs, what you told them, and their response, using their own words'],
    scene: ['When in doubt, err on the side of treatment and transport', 'Do not leave until the refusal is complete; leaving early can be abandonment']
  },
  {
    id: 'restraint', name: 'Restraint and reasonable force', group: 'consent', aliases: ['restrain', 'force', 'combative', 'false imprisonment'],
    about: ['Restraining or transporting a patient without legal authority can be assault, battery, or false imprisonment. Restraint is allowed when a patient without capacity is a danger to self or others, following protocol.'],
    points: ['Use only reasonable force: the minimum needed to prevent harm',
      'Get law enforcement involved for violent patients; scene safety comes first',
      'Follow protocol and get medical control orders when required',
      'Never restrain prone or hog-tie; monitor airway, breathing, and circulation in restraints',
      'Check and document distal pulses, motor, and sensation in restrained limbs'],
    scene: ['Document why restraint was needed, the type used, who helped, and repeat checks of the patient']
  },

  // ---------------- Negligence & torts ----------------
  {
    id: 'negligence', name: 'Negligence', group: 'liability', aliases: ['malpractice', 'four elements', 'duty breach damages causation'],
    about: ['Failure to act as a reasonable, prudent paramedic would in similar circumstances. The most common legal claim against paramedics.'],
    points: ['The plaintiff must prove all four elements: duty, breach of duty, damages, and proximate cause',
      'Duty: you had an obligation to the patient',
      'Breach of duty: you failed to meet the standard of care (malfeasance, misfeasance, or nonfeasance)',
      'Damages: the patient suffered real harm (physical, emotional, or financial)',
      'Proximate cause: your breach caused or worsened that harm',
      'Res ipsa loquitur ("the thing speaks for itself"): harm that could only come from negligence',
      'Negligence per se: violating a law or rule (for example, practicing outside scope) is treated as negligence',
      'Gross negligence is a willful or reckless disregard for safety and is not protected by Good Samaritan laws'],
    scene: ['Follow protocol, stay in your scope, and document thoroughly; these are your best defenses']
  },
  {
    id: 'abandonment', name: 'Abandonment', group: 'liability', aliases: ['abandon', 'transfer of care', 'handoff'],
    about: ['Ending care of a patient who still needs it, without the patient\'s consent and without handing off to someone with equal or higher training.'],
    points: ['Once care starts, you must continue until care is transferred to an equal or higher level, or the patient competently refuses',
      'Handing an ALS patient off to an EMT (lower level) can be abandonment',
      'Leaving a patient at the hospital without giving a report to a nurse or physician is abandonment',
      'Leaving before a refusal is properly completed can be abandonment'],
    scene: ['Give a verbal report at handoff and get a signature or name for the person taking over']
  },
  {
    id: 'intentional-torts', name: 'Assault, battery & false imprisonment', group: 'liability', aliases: ['assault', 'battery', 'false imprisonment', 'kidnapping'],
    about: ['Intentional torts: wrongs done on purpose, as opposed to negligence.'],
    points: ['Assault: making someone fear immediate bodily harm without consent (threatening to start an IV on a refusing patient)',
      'Battery: touching someone without consent (actually starting the IV)',
      'False imprisonment: confining or transporting someone without consent or legal authority',
      'Valid consent, or legal authority such as implied consent or a mental health hold, is the defense'],
    scene: ['Never threaten a patient into care', 'Document the authority you acted under when you treat or transport without consent']
  },
  {
    id: 'defamation', name: 'Defamation (libel & slander)', group: 'liability', aliases: ['libel', 'slander', 'defamation'],
    about: ['Communicating false information that damages a person\'s reputation.'],
    points: ['Libel is written (in a PCR, a text, or social media)',
      'Slander is spoken',
      'Avoid opinions and labels in the PCR ("drunk", "frequent flyer"); describe what you observed ("odor of alcoholic beverage on breath, slurred speech")',
      'Never discuss patients on social media'],
    scene: ['Put quotes from the patient in quotation marks instead of interpreting them']
  },
  {
    id: 'liability-other', name: 'Who is liable', group: 'liability', aliases: ['vicarious', 'respondeat superior', 'medical director liability', 'insurance'],
    about: ['More than one person can be held responsible for a bad outcome.'],
    points: ['Vicarious liability (respondeat superior): an employer is responsible for an employee\'s actions on the job',
      'Medical directors can be liable for the protocols they write and for orders they give',
      'Borrowed servant: you can be responsible for the actions of a less trained provider you are directing',
      'Paramedics should carry or be covered by liability (malpractice) insurance'],
    scene: ['If you see a partner do something unsafe, speak up; you may share liability']
  },

  // ---------------- Privacy ----------------
  {
    id: 'hipaa', name: 'HIPAA and confidentiality', group: 'privacy', aliases: ['hipaa', 'phi', 'privacy', 'confidentiality'],
    about: ['The Health Insurance Portability and Accountability Act (1996) is a federal law that protects the privacy of patients\' health information.'],
    points: ['Protected health information (PHI) is anything that identifies a patient and relates to their health, care, or payment',
      'You may share PHI for treatment (report to the hospital), payment (billing), and health care operations (QA, training)',
      'Share only the minimum necessary information',
      'Release is also allowed when required by law: mandatory reports, a subpoena or court order, and certain law enforcement requests',
      'Otherwise, PHI is released only with the patient\'s written authorization',
      'Breaking confidentiality can bring fines, lawsuits, and loss of your job or license'],
    scene: ['Don\'t discuss patients where others can hear, including in the hospital hallway', 'Never post photos or details of calls online, even without names']
  },

  // ---------------- Reporting ----------------
  {
    id: 'mandatory-reporting', name: 'Mandatory reporting', group: 'reporting', aliases: ['report', 'child abuse', 'elder abuse', 'cps', 'aps'],
    about: ['Laws that require paramedics to report certain situations to the proper authorities, even without the patient\'s consent.'],
    points: ['Commonly required: suspected child abuse or neglect, suspected abuse of elders or vulnerable adults, and in many states domestic violence',
      'Often required: gunshot and stab wounds, sexual assault, animal bites, and some communicable diseases',
      'You only need a reasonable suspicion, not proof',
      'Reporting laws protect people who report in good faith from liability',
      'Telling the hospital staff does not always meet your own duty to report; follow your protocol',
      'In Tennessee, every person (not only health care workers) must report suspected child abuse or neglect',
      'In Tennessee, suspected abuse, neglect, or exploitation of a vulnerable adult is reported to Adult Protective Services'],
    tn: true,
    scene: ['Document objective findings and statements in the patient\'s and caregivers\' own words', 'Do not confront or accuse the suspected abuser on scene']
  },
  {
    id: 'crime-scene', name: 'Crime scenes and evidence', group: 'reporting', aliases: ['crime scene', 'evidence', 'police', 'chain of custody'],
    about: ['Your first priority at a crime scene is your safety, then patient care. Preserving evidence comes second to care, but you should disturb as little as possible.'],
    points: ['Don\'t enter until law enforcement says the scene is safe',
      'Use one path in and out and touch only what you need to',
      'Do not cut through bullet or knife holes in clothing',
      'Place clothing in paper bags, not plastic',
      'For sexual assault: discourage bathing, changing, or using the bathroom, and keep the patient\'s privacy',
      'Chain of custody: documented control of evidence from collection to court',
      'Note anything you moved and tell law enforcement'],
    scene: ['Document the position the patient was found in and anything the patient or bystanders said']
  },
  {
    id: 'exposure', name: 'Infectious exposure notification', group: 'reporting', aliases: ['ryan white', 'exposure', 'bloodborne', 'needlestick'],
    about: ['The Ryan White CARE Act (its emergency response employee notification part) lets EMS providers learn if they were exposed to certain infectious diseases from a patient they transported.'],
    points: ['Report exposures (needlestick, splash to mucous membranes) right away to your designated infection control officer',
      'The receiving hospital must notify the agency when a transported patient is diagnosed with certain airborne diseases, and on request for bloodborne exposures',
      'Wash the area right away and follow your agency\'s exposure plan'],
    scene: ['Fill out the exposure report the same shift']
  },

  // ---------------- End of life ----------------
  {
    id: 'advance-directives', name: 'Advance directives', group: 'death', aliases: ['living will', 'power of attorney', 'health care proxy', 'polst', 'post'],
    about: ['Written instructions made by a competent person about the care they want, used when they can no longer decide for themselves.'],
    points: ['Living will: states which life-sustaining treatments the patient does or does not want',
      'Durable power of attorney for health care (health care proxy): names a person to make health care decisions when the patient cannot',
      'POLST-type forms are portable physician orders that travel with the patient and EMS can follow',
      'Tennessee uses the POST form (Physician Orders for Scope of Treatment) and a universal DNR order form',
      'A living will alone often cannot be followed in the field; most protocols require a physician order such as a DNR or POST',
      'A competent patient can revoke an advance directive at any time'],
    tn: true,
    scene: ['Ask for the form; if you cannot find a valid order, start resuscitation and contact medical control', 'Bring the original or a copy with the patient to the hospital']
  },
  {
    id: 'dnr', name: 'DNR orders', group: 'death', aliases: ['dnr', 'do not resuscitate', 'no code', 'withholding'],
    about: ['A physician\'s order not to start CPR if the patient\'s heart or breathing stops.'],
    points: ['DNR does not mean "do not treat": give oxygen, pain relief, and comfort care',
      'Check that the form is valid under your protocol (signed by a physician, the right patient)',
      'If there is doubt about the order, or family demands resuscitation, start care and contact medical control',
      'Verbal wishes from family are not a valid DNR in most protocols'],
    scene: ['Confirm the patient\'s identity against the form or a DNR bracelet']
  },
  {
    id: 'death-field', name: 'Death in the field', group: 'death', aliases: ['obvious death', 'rigor', 'lividity', 'termination', 'organ donation'],
    about: ['Paramedics may withhold resuscitation for obvious death and may stop resuscitation under protocol and medical control.'],
    points: ['Signs of obvious death: decapitation, decomposition, rigor mortis, dependent lividity, and injuries not compatible with life (such as incineration)',
      'Rigor mortis: stiffening of the muscles after death',
      'Dependent lividity: blood pooling in the lowest parts of the body after death',
      'Termination of resuscitation follows protocol and usually medical control',
      'Notify law enforcement and the medical examiner or coroner as your protocol requires',
      'Organ donor status may be on the driver\'s license; potential donors still get full care'],
    scene: ['Leave lines and tubes in place on a death that may go to the medical examiner', 'Care for the family: plain words ("died"), time to grieve, and support resources']
  },

  // ---------------- Documentation ----------------
  {
    id: 'pcr', name: 'Patient care report (PCR)', group: 'records', aliases: ['pcr', 'epcr', 'documentation', 'charting', 'run report'],
    about: ['The PCR is a legal document and part of the patient\'s medical record. It is often your only memory of the call when a case comes to court years later.'],
    points: ['"If it isn\'t written down, it wasn\'t done"',
      'Complete it promptly, while details are fresh',
      'Be accurate, complete, objective, and legible; record times precisely',
      'Use only standard, approved abbreviations',
      'Quote the patient\'s own words for important statements',
      'Document pertinent negatives (no chest pain, no loss of consciousness)',
      'Document refusals, consent, and why you did anything outside the usual'],
    scene: ['Leave a copy at the receiving facility as your agency requires']
  },
  {
    id: 'corrections', name: 'Correcting a PCR', group: 'records', aliases: ['correction', 'addendum', 'late entry', 'falsification', 'error'],
    about: ['Errors are fixed openly, never hidden. Altering or falsifying a record can be a crime and can cost you your license.'],
    points: ['On paper: draw a single line through the error, write the correct information, and initial and date it',
      'Never erase, white out, or scribble over an entry',
      'After the report is submitted, add a dated and signed addendum (late entry) instead of changing the original',
      'Falsification includes recording vitals you did not take or care you did not give',
      'If you made a care error, document what happened and notify your supervisor; don\'t cover it up'],
    scene: ['In an ePCR, use the addendum or amend function; the system keeps the original']
  },

  // ---------------- Ethics ----------------
  {
    id: 'principles', name: 'Ethical principles', group: 'ethics', aliases: ['autonomy', 'beneficence', 'nonmaleficence', 'justice', 'principles'],
    about: ['Ethics are principles of right and wrong conduct. Morals are a person\'s own standards. The law sets the minimum; ethics often asks for more.'],
    points: ['Autonomy: the patient\'s right to make their own decisions',
      'Beneficence: act in the patient\'s best interest (do good)',
      'Nonmaleficence: do no harm',
      'Justice: treat all patients fairly, regardless of race, money, gender, or other status',
      'Patient advocacy: speak up for what your patient needs',
      'The EMT Oath and the Code of Ethics for EMS Practitioners describe expected professional conduct'],
    scene: ['When principles conflict (autonomy vs beneficence in a refusal), lean toward the patient\'s wishes if they have capacity']
  },
  {
    id: 'ethical-tests', name: 'Solving ethical problems', group: 'ethics', aliases: ['impartiality', 'universalizability', 'interpersonal justifiability', 'ethical tests'],
    about: ['Quick tests to check a decision when there is no time to think it through.'],
    points: ['Impartiality test: would you accept this action if you were in the patient\'s place?',
      'Universalizability test: would you want this action done in all similar situations?',
      'Interpersonal justifiability test: can you defend the action to others, and would they think it reasonable?',
      'Ahead of time, think through hard situations (DNR disputes, refusals, futile resuscitation) so you are not deciding from scratch on scene',
      'Common dilemmas: resource allocation in an MCI, confidentiality vs duty to warn, obligation to give care when off duty, and care in futile situations'],
    scene: ['When you have time, consult medical control or a colleague']
  }
];

window.LEGAL_TERMS = [
  // system
  { term: 'Constitutional law', def: 'Law based on the U.S. and state constitutions; protects individual rights', group: 'system' },
  { term: 'Common law (case law)', def: 'Law that comes from court decisions and precedent', group: 'system' },
  { term: 'Statutory law', def: 'Law passed by Congress or a state legislature', group: 'system' },
  { term: 'Administrative law', def: 'Rules written by government agencies under a statute, with the force of law', group: 'system' },
  { term: 'Criminal law', def: 'Law dealing with wrongs against society, prosecuted by the government', group: 'system' },
  { term: 'Civil law', def: 'Law dealing with disputes between private parties, usually for money damages', group: 'system' },
  { term: 'Tort', def: 'A civil wrong against a person or property, other than breach of contract', group: 'system' },
  { term: 'Plaintiff', def: 'The person who files a lawsuit', group: 'system' },
  { term: 'Defendant', def: 'The person who is sued or charged', group: 'system' },
  { term: 'Statute of limitations', def: 'The time limit for filing a lawsuit', group: 'system' },
  { term: 'Discovery', def: 'The pretrial phase where both sides exchange records and information', group: 'system' },
  { term: 'Deposition', def: 'Sworn testimony given out of court before a trial', group: 'system' },
  { term: 'Duty to act', def: 'A legal obligation to provide care, such as when an on-duty paramedic is dispatched', group: 'system' },
  { term: 'Good Samaritan law', def: 'Protects people who give emergency care in good faith, without pay, within their training', group: 'system' },
  { term: 'Governmental immunity', def: 'Legal protection that limits lawsuits against government agencies and their employees', group: 'system', aliases: ['sovereign immunity'] },
  { term: 'EMTALA', def: 'Federal law requiring hospitals to screen and stabilize emergency patients regardless of ability to pay', group: 'system' },
  // scope
  { term: 'Scope of practice', def: 'The skills and duties a paramedic is legally allowed to perform', group: 'scope' },
  { term: 'Standard of care', def: 'What a reasonable, prudent paramedic with similar training would do in similar circumstances', group: 'scope' },
  { term: 'Medical direction', def: 'Physician oversight of patient care in an EMS system', group: 'scope', aliases: ['medical control'] },
  { term: 'Online medical direction', def: 'Real-time orders from a physician by radio or phone', group: 'scope', aliases: ['direct medical direction'] },
  { term: 'Offline medical direction', def: 'Protocols, standing orders, training, and quality review set up in advance', group: 'scope', aliases: ['indirect medical direction'] },
  { term: 'Standing orders', def: 'Written orders that allow care before contacting medical control', group: 'scope' },
  { term: 'Protocols', def: 'Written patient care guidelines approved by the medical director', group: 'scope' },
  { term: 'Licensure', def: 'Permission from a state to practice a profession', group: 'scope' },
  { term: 'Certification', def: 'Recognition by an agency that a person has met set standards, such as passing the NREMT exam', group: 'scope' },
  { term: 'Credentialing', def: 'Local process where the medical director authorizes a provider to practice within the agency', group: 'scope' },
  { term: 'Reciprocity', def: 'Granting a license to a provider based on credentials from another state', group: 'scope' },
  // consent
  { term: 'Expressed consent', def: 'Consent given by a competent adult after being told the care, its risks, benefits, and alternatives', group: 'consent', aliases: ['informed consent', 'express consent'] },
  { term: 'Implied consent', def: 'Assumed consent to emergency care for an unresponsive or incapacitated patient', group: 'consent', aliases: ['emergency doctrine'] },
  { term: 'Involuntary consent', def: 'Treatment authorized by law without the patient\'s agreement, such as a court order or police custody', group: 'consent' },
  { term: 'Decision-making capacity', def: 'The ability to understand the situation, appreciate the consequences, and make and communicate a choice', group: 'consent', aliases: ['capacity'] },
  { term: 'Competence', def: 'A legal finding by a court that a person can make their own decisions', group: 'consent', aliases: ['competency'] },
  { term: 'Emancipated minor', def: 'A person under 18 who is legally treated as an adult and can consent to care', group: 'consent' },
  { term: 'In loco parentis', def: '"In place of the parent": an adult temporarily responsible for a child', group: 'consent' },
  { term: 'Against medical advice (AMA)', def: 'A patient\'s refusal of recommended care or transport', group: 'consent', aliases: ['ama', 'refusal'] },
  { term: 'Reasonable force', def: 'The minimum force needed to restrain a patient and prevent harm', group: 'consent' },
  // liability
  { term: 'Negligence', def: 'Failure to act as a reasonable, prudent paramedic would in similar circumstances', group: 'liability' },
  { term: 'Gross negligence', def: 'Willful or reckless disregard for a patient\'s safety', group: 'liability' },
  { term: 'Breach of duty', def: 'Failing to meet the standard of care', group: 'liability' },
  { term: 'Damages', def: 'Real harm to the patient: physical, emotional, or financial', group: 'liability' },
  { term: 'Proximate cause', def: 'The breach of duty directly caused or worsened the patient\'s harm', group: 'liability' },
  { term: 'Malfeasance', def: 'Doing a wrongful or unlawful act', group: 'liability' },
  { term: 'Misfeasance', def: 'Doing a legal act in a harmful or improper way', group: 'liability' },
  { term: 'Nonfeasance', def: 'Failing to do a required act', group: 'liability' },
  { term: 'Res ipsa loquitur', def: '"The thing speaks for itself": harm that could only have happened through negligence', group: 'liability' },
  { term: 'Negligence per se', def: 'Negligence assumed because a law or rule was broken, such as practicing outside scope', group: 'liability' },
  { term: 'Abandonment', def: 'Ending care without the patient\'s consent or without handing off to equal or higher training', group: 'liability' },
  { term: 'Assault', def: 'Making someone fear immediate bodily harm without consent', group: 'liability' },
  { term: 'Battery', def: 'Touching someone without their consent', group: 'liability' },
  { term: 'False imprisonment', def: 'Confining or transporting someone without consent or legal authority', group: 'liability' },
  { term: 'Libel', def: 'A false written statement that damages someone\'s reputation', group: 'liability' },
  { term: 'Slander', def: 'A false spoken statement that damages someone\'s reputation', group: 'liability' },
  { term: 'Vicarious liability', def: 'An employer is responsible for employees\' actions on the job', group: 'liability', aliases: ['respondeat superior'] },
  // privacy
  { term: 'HIPAA', def: 'Federal law (1996) that protects the privacy of patients\' health information', group: 'privacy' },
  { term: 'Protected health information (PHI)', def: 'Information that identifies a patient and relates to their health, care, or payment', group: 'privacy', aliases: ['phi'] },
  { term: 'Confidentiality', def: 'The duty to keep patient information private', group: 'privacy' },
  { term: 'Minimum necessary', def: 'Share only the patient information needed for the purpose', group: 'privacy' },
  { term: 'Subpoena', def: 'A court order to appear in court or to produce records', group: 'privacy' },
  // reporting
  { term: 'Mandatory reporting', def: 'A legal duty to report situations such as suspected child or elder abuse', group: 'reporting' },
  { term: 'Chain of custody', def: 'Documented control of evidence from when it is collected to when it reaches court', group: 'reporting' },
  { term: 'Ryan White CARE Act', def: 'Federal law that provides for notifying EMS providers of exposure to certain infectious diseases', group: 'reporting' },
  // death
  { term: 'Advance directive', def: 'Written instructions about care, made while competent, for when the patient cannot decide', group: 'death' },
  { term: 'Living will', def: 'An advance directive stating which life-sustaining treatments the patient does or does not want', group: 'death' },
  { term: 'Durable power of attorney for health care', def: 'A document naming a person to make health care decisions when the patient cannot', group: 'death', aliases: ['health care proxy', 'healthcare poa'] },
  { term: 'DNR order', def: 'A physician\'s order not to start CPR if the heart or breathing stops', group: 'death', aliases: ['do not resuscitate'] },
  { term: 'POST form', def: 'Tennessee\'s portable physician order for scope of treatment (the POLST form), which EMS can follow', group: 'death', aliases: ['polst'], tn: true },
  { term: 'Rigor mortis', def: 'Stiffening of the muscles after death', group: 'death' },
  { term: 'Dependent lividity', def: 'Pooling of blood in the lowest parts of the body after death', group: 'death', aliases: ['livor mortis'] },
  // records
  { term: 'Patient care report (PCR)', def: 'The legal record of the call and part of the patient\'s medical record', group: 'records', aliases: ['pcr'] },
  { term: 'Addendum (late entry)', def: 'A dated, signed addition to a report after it was submitted', group: 'records', aliases: ['late entry'] },
  { term: 'Falsification', def: 'Knowingly writing false information in a record', group: 'records' },
  { term: 'Pertinent negative', def: 'A sign or symptom that is absent and worth noting, such as no chest pain', group: 'records' },
  // ethics
  { term: 'Ethics', def: 'Principles of right and wrong conduct for a group or profession', group: 'ethics' },
  { term: 'Morals', def: 'A person\'s own standards of right and wrong', group: 'ethics' },
  { term: 'Autonomy', def: 'The patient\'s right to make their own decisions', group: 'ethics' },
  { term: 'Beneficence', def: 'Acting in the patient\'s best interest; doing good', group: 'ethics' },
  { term: 'Nonmaleficence', def: 'Doing no harm', group: 'ethics' },
  { term: 'Justice', def: 'Treating all patients fairly and equally', group: 'ethics' },
  { term: 'Impartiality test', def: 'Would you accept this action if you were in the patient\'s place?', group: 'ethics' },
  { term: 'Universalizability test', def: 'Would you want this action done in all similar situations?', group: 'ethics' },
  { term: 'Interpersonal justifiability test', def: 'Can you defend this action to others, and would they find it reasonable?', group: 'ethics' },
  { term: 'Patient advocacy', def: 'Speaking up for what the patient needs', group: 'ethics' }
];

window.LEGAL_FACTS = [
  { q: 'Four elements a plaintiff must prove for negligence?', a: 'Duty, breach of duty, damages, proximate cause', wrong: ['Duty, consent, abandonment, damages', 'Intent, breach, damages, malice', 'Scope, standard of care, consent, causation'], group: 'liability' },
  { q: 'Most common type of lawsuit against paramedics?', a: 'Negligence (a civil tort)', wrong: ['Criminal assault', 'Libel', 'Breach of contract'], group: 'liability' },
  { q: 'Which is NOT protected by Good Samaritan laws?', a: 'Gross negligence', wrong: ['Care given in good faith', 'Care given without pay', 'Care within your training'], group: 'system' },
  { q: 'For an on-duty paramedic, the duty to act usually begins…', a: 'When you are dispatched or a patient asks for help', wrong: ['When you touch the patient', 'When the patient signs a consent form', 'When you arrive at the hospital'], group: 'system' },
  { q: 'Scope of practice is defined mainly by…', a: 'State law and rules, limited further by the medical director', wrong: ['The NREMT', 'Your field training officer', 'Whatever the hospital physician orders'], group: 'scope' },
  { q: 'The standard of care is judged against…', a: 'A reasonable, prudent paramedic with similar training in similar circumstances', wrong: ['The best paramedic in the state', 'An emergency physician', 'The patient\'s expectations'], group: 'scope' },
  { q: 'An online medical direction order should be…', a: 'Repeated back to confirm it, then documented', wrong: ['Followed without question', 'Written down only if it goes wrong', 'Confirmed by your partner instead'], group: 'scope' },
  { q: 'Protocols and standing orders are examples of…', a: 'Offline (indirect) medical direction', wrong: ['Online (direct) medical direction', 'Administrative law', 'Credentialing'], group: 'scope' },
  { q: 'Which allows you to practice in a given state?', a: 'A state license', wrong: ['NREMT certification alone', 'A CPR card', 'Your course completion certificate'], group: 'scope' },
  { q: 'An unresponsive patient with a life threat is treated under…', a: 'Implied consent', wrong: ['Expressed consent', 'Involuntary consent', 'In loco parentis'], group: 'consent' },
  { q: 'For consent to be informed, the patient must be told…', a: 'The care, its risks and benefits, the alternatives, and the risk of refusing', wrong: ['Only what you are about to do', 'The cost of the transport', 'Your certification level'], group: 'consent' },
  { q: 'A patient can withdraw consent…', a: 'At any time, even after care has started', wrong: ['Only before you touch them', 'Only in writing', 'Never once transport begins'], group: 'consent' },
  { q: 'Who determines legal competence?', a: 'A court', wrong: ['The paramedic', 'The family', 'The medical director'], group: 'consent' },
  { q: 'Which can remove a patient\'s decision-making capacity?', a: 'Hypoglycemia, head injury, hypoxia, or intoxication', wrong: ['Disagreeing with your plan', 'Being over 65', 'Having a chronic illness'], group: 'consent' },
  { q: 'Who usually gives consent for a 15-year-old?', a: 'A parent or legal guardian', wrong: ['The 15-year-old', 'Any adult on scene', 'The paramedic'], group: 'consent' },
  { q: 'Who can usually consent like an adult despite being under 18?', a: 'An emancipated minor (such as married or in the military)', wrong: ['Any minor over 16', 'Any minor with a driver\'s license', 'A minor whose parent is not home'], group: 'consent' },
  { q: 'Best witness for a refusal signature?', a: 'Someone other than your partner, such as family or police', wrong: ['Your partner only', 'The patient\'s signature alone is enough', 'Dispatch, by radio'], group: 'consent' },
  { q: 'If a patient refuses care but will not sign the refusal form…', a: 'Document that they refused to sign, with a witness', wrong: ['Sign it for them', 'Transport them anyway', 'Leave without documenting'], group: 'consent' },
  { q: 'When a refusal is unclear, you should…', a: 'Err on the side of treatment and transport, and contact medical control', wrong: ['Accept the refusal and leave', 'Restrain the patient right away', 'Have the family decide'], group: 'consent' },
  { q: 'How much force may you use to restrain a patient?', a: 'Only the minimum needed to prevent harm', wrong: ['Whatever it takes to finish the call quickly', 'None; only police may restrain', 'Equal to the force the patient uses'], group: 'consent' },
  { q: 'Threatening to start an IV on a patient who refuses is…', a: 'Assault', wrong: ['Battery', 'Abandonment', 'Slander'], group: 'liability' },
  { q: 'Starting the IV on that refusing patient is…', a: 'Battery', wrong: ['Assault only', 'False imprisonment', 'Libel'], group: 'liability' },
  { q: 'Transporting a competent adult against their will is…', a: 'False imprisonment', wrong: ['Abandonment', 'Defamation', 'Implied consent'], group: 'liability' },
  { q: 'Writing "drunk and abusive" in a PCR risks…', a: 'Libel', wrong: ['Slander', 'Battery', 'Abandonment'], group: 'liability' },
  { q: 'Leaving a patient at the ED without giving report to staff is…', a: 'Abandonment', wrong: ['Acceptable if the ED is busy', 'False imprisonment', 'Implied consent'], group: 'liability' },
  { q: 'Who can you transfer an ALS patient to without abandonment?', a: 'Someone with equal or higher training', wrong: ['Any EMS provider', 'A family member', 'A first responder who arrives first'], group: 'liability' },
  { q: 'Performing a skill outside your scope of practice can be…', a: 'Negligence per se', wrong: ['Res ipsa loquitur', 'Protected by Good Samaritan laws', 'Implied consent'], group: 'liability' },
  { q: 'Failing to give a needed medication is…', a: 'Nonfeasance', wrong: ['Malfeasance', 'Misfeasance', 'Battery'], group: 'liability' },
  { q: 'Giving the right drug by the wrong technique, causing harm, is…', a: 'Misfeasance', wrong: ['Nonfeasance', 'Malfeasance', 'Assault'], group: 'liability' },
  { q: 'An employer being responsible for an employee\'s on-duty actions is…', a: 'Vicarious liability (respondeat superior)', wrong: ['Negligence per se', 'Res ipsa loquitur', 'Governmental immunity'], group: 'liability' },
  { q: 'HIPAA allows sharing PHI without written authorization for…', a: 'Treatment, payment, and health care operations', wrong: ['A reporter who asks', 'The patient\'s employer', 'A neighbor who called 911'], group: 'privacy' },
  { q: 'When sharing PHI, share…', a: 'Only the minimum necessary', wrong: ['Everything in the PCR', 'Only with written consent, always', 'Only verbally'], group: 'privacy' },
  { q: 'Which is a legal release of PHI without consent?', a: 'A mandatory abuse report or a court order', wrong: ['A social media post without names', 'A friend who asks how the patient is', 'The patient\'s landlord'], group: 'privacy' },
  { q: 'To make a mandatory abuse report, you need…', a: 'A reasonable suspicion', wrong: ['Proof of abuse', 'The patient\'s permission', 'A police officer\'s agreement'], group: 'reporting' },
  { q: 'In Tennessee, who must report suspected child abuse?', a: 'Every person', wrong: ['Only physicians and nurses', 'Only law enforcement', 'Only the child\'s teacher'], group: 'reporting', tn: true },
  { q: 'Clothing collected as evidence goes in…', a: 'Paper bags', wrong: ['Plastic bags', 'Biohazard bags', 'The trash'], group: 'reporting' },
  { q: 'When cutting clothes off a stab victim…', a: 'Don\'t cut through the stab holes', wrong: ['Cut straight through the holes', 'Never remove clothing', 'Hand the clothes to bystanders'], group: 'reporting' },
  { q: 'At a crime scene, your first priority is…', a: 'Your own safety', wrong: ['Preserving evidence', 'Getting a statement', 'Calling the coroner'], group: 'reporting' },
  { q: 'Which law covers EMS notification of infectious disease exposure?', a: 'The Ryan White CARE Act', wrong: ['EMTALA', 'HIPAA', 'The Good Samaritan law'], group: 'reporting' },
  { q: 'A DNR order means…', a: 'Do not start CPR; still give comfort care', wrong: ['Do not treat the patient at all', 'Do not transport', 'Do not give oxygen'], group: 'death' },
  { q: 'If you cannot confirm a DNR is valid, you should…', a: 'Start resuscitation and contact medical control', wrong: ['Withhold CPR', 'Let the family decide', 'Wait for the form to be found'], group: 'death' },
  { q: 'A document naming someone to make health decisions for the patient is…', a: 'A durable power of attorney for health care', wrong: ['A living will', 'A DNR order', 'A refusal form'], group: 'death' },
  { q: 'Tennessee\'s portable physician order for end-of-life care is the…', a: 'POST form', wrong: ['MOLST form', 'Living will', 'HIPAA form'], group: 'death', tn: true },
  { q: 'Which is a sign of obvious death?', a: 'Dependent lividity', wrong: ['Fixed, dilated pupils', 'No pulse for 1 minute', 'Cool skin'], group: 'death' },
  { q: 'Which is a sign of obvious death?', a: 'Rigor mortis', wrong: ['Agonal breathing', 'Asystole for 30 seconds', 'Cyanosis'], group: 'death' },
  { q: 'How do you correct an error on a paper PCR?', a: 'Single line through it, write the correction, initial and date', wrong: ['White it out and rewrite', 'Scribble it out', 'Start a new report and throw away the old one'], group: 'records' },
  { q: 'To add information after a PCR is submitted, write…', a: 'A dated, signed addendum (late entry)', wrong: ['Over the original entry', 'Nothing; it can never be changed', 'A new PCR with the old date'], group: 'records' },
  { q: '"If it isn\'t written down…"', a: '"…it wasn\'t done"', wrong: ['"…it doesn\'t matter"', '"…your partner will remember"', '"…the hospital will document it"'], group: 'records' },
  { q: 'Important statements by the patient should be documented…', a: 'In their own words, in quotation marks', wrong: ['As your interpretation', 'Only if they are positive', 'Only verbally to the nurse'], group: 'records' },
  { q: '"Do no harm" is the principle of…', a: 'Nonmaleficence', wrong: ['Beneficence', 'Autonomy', 'Justice'], group: 'ethics' },
  { q: 'Respecting a competent patient\'s refusal reflects…', a: 'Autonomy', wrong: ['Beneficence', 'Nonmaleficence', 'Justice'], group: 'ethics' },
  { q: 'Treating every patient the same regardless of insurance reflects…', a: 'Justice', wrong: ['Autonomy', 'Nonmaleficence', 'Beneficence'], group: 'ethics' },
  { q: '"Would I accept this if I were the patient?" is the…', a: 'Impartiality test', wrong: ['Universalizability test', 'Interpersonal justifiability test', 'Reasonable person test'], group: 'ethics' },
  { q: 'The law, compared with ethics, generally sets…', a: 'The minimum standard', wrong: ['A higher standard', 'The same standard', 'No standard for EMS'], group: 'ethics' },
  { q: 'Hospitals must screen and stabilize emergency patients regardless of ability to pay under…', a: 'EMTALA', wrong: ['HIPAA', 'The Ryan White CARE Act', 'The Good Samaritan law'], group: 'system' },
  { q: 'Who brings a civil lawsuit?', a: 'The plaintiff', wrong: ['The defendant', 'The prosecutor', 'The judge'], group: 'system' },
  { q: 'Sworn out-of-court testimony before a trial is a…', a: 'Deposition', wrong: ['Subpoena', 'Verdict', 'Interrogatory answer'], group: 'system' }
];

window.LEGAL_SCENARIOS = [
  {
    id: 'sc-refusal-hypo', group: 'consent',
    case: 'A diabetic man is confused after a seizure and wants you to leave. His glucose is 38 mg/dL.',
    a: 'Treat him under implied consent; low glucose means he lacks capacity to refuse',
    wrong: ['Have him sign a refusal and leave', 'Leave because he is an adult', 'Wait for him to calm down, then leave'],
    why: 'Hypoglycemia removes decision-making capacity. He cannot make an informed refusal until he is treated and reassessed.'
  },
  {
    id: 'sc-refusal-competent', group: 'consent',
    case: 'An alert, oriented woman with chest pain understands she could die, but refuses transport. Her vitals are stable and she repeats the risks back to you.',
    a: 'Respect the refusal after trying to persuade her, and document fully with a witness',
    wrong: ['Transport her anyway for her own good', 'Restrain her because chest pain is serious', 'Leave without documenting since she refused'],
    why: 'A competent adult can refuse care even if it may cause death. Try to persuade, contact medical control if needed, offer to come back, and document.'
  },
  {
    id: 'sc-minor', group: 'consent',
    case: 'A 12-year-old at soccer practice has a deformed forearm and a weak radial pulse. The coach cannot reach the parents.',
    a: 'Treat and transport under implied consent while someone keeps trying the parents',
    wrong: ['Wait until a parent gives consent', 'Have the 12-year-old sign the consent', 'Refuse to treat without a guardian present'],
    why: 'Emergency care for a minor is not delayed to reach a parent. Implied consent applies; document attempts to reach them.'
  },
  {
    id: 'sc-emancipated', group: 'consent',
    case: 'A 17-year-old married woman with abdominal pain wants care and transport. Her parents live out of state.',
    a: 'She can consent for herself as an emancipated minor',
    wrong: ['Call her parents for consent first', 'Treat her only under implied consent', 'Refuse transport until she turns 18'],
    why: 'Marriage is a common basis for emancipation, so she can give expressed consent like an adult. Check your state\'s rules.'
  },
  {
    id: 'sc-parent-refuses', group: 'consent',
    case: 'A mother refuses transport for her 2-year-old, who is lethargic with labored breathing.',
    a: 'Try to persuade her, contact medical control, and involve law enforcement if needed',
    wrong: ['Accept the refusal and leave', 'Grab the child and leave', 'Let the 2-year-old decide'],
    why: 'A parent can usually refuse for a child, but not when the child faces a serious threat. Medical control and police, or child protective services, can step in.'
  },
  {
    id: 'sc-withdraw', group: 'consent',
    case: 'A patient agreed to transport, but halfway through your assessment says, clearly and calmly, that he has changed his mind.',
    a: 'Stop, reassess capacity, explain the risks, and complete a refusal if he still declines',
    wrong: ['Keep going since he already consented', 'Tell him consent cannot be withdrawn', 'Leave right away'],
    why: 'Consent can be withdrawn at any time. Treat it like any other refusal.'
  },
  {
    id: 'sc-threat-iv', group: 'liability',
    case: 'Your partner tells a refusing patient, "If you don\'t hold still, I\'m going to stick this needle in you anyway."',
    a: 'That is assault; doing it would be battery',
    wrong: ['That is battery', 'That is acceptable under implied consent', 'That is false imprisonment'],
    why: 'Assault is creating fear of imminent harm without consent. Battery is the actual touching.'
  },
  {
    id: 'sc-handoff-emt', group: 'liability',
    case: 'Your cardiac patient is on a nitro drip. A BLS crew arrives and offers to take the patient so your ALS unit can clear.',
    a: 'Refuse; handing this patient to a lower level of care would be abandonment',
    wrong: ['Accept, since they are licensed EMS providers', 'Accept if the patient agrees', 'Accept and stop the drip first'],
    why: 'Care must be transferred to someone with equal or higher training when the patient needs that level of care.'
  },
  {
    id: 'sc-ed-drop', group: 'liability',
    case: 'The ED is packed. A nurse points you to a hallway bed and walks away before you can give report.',
    a: 'Stay with the patient until you give report to a nurse or physician and they accept care',
    wrong: ['Move the patient to the bed and leave', 'Leave the PCR on the bed and clear', 'Tell the registration clerk and leave'],
    why: 'Leaving without a proper handoff to qualified staff is abandonment.'
  },
  {
    id: 'sc-negligence', group: 'liability',
    case: 'You forget to secure a patient on the stretcher. The patient falls and breaks a hip.',
    a: 'All four elements of negligence are present',
    wrong: ['Only an ethical problem, not legal', 'This is battery', 'There is no duty, so no negligence'],
    why: 'Duty (your patient), breach (failure to secure), damages (fracture), proximate cause (the fall from the unsecured stretcher).'
  },
  {
    id: 'sc-no-harm', group: 'liability',
    case: 'You give an aspirin a few minutes late, but the patient has no harm from the delay.',
    a: 'A negligence suit would likely fail because there are no damages',
    wrong: ['It is automatically negligence per se', 'It is battery', 'It is abandonment'],
    why: 'All four elements must be proven. Without damages caused by the breach, there is no negligence claim. Still document honestly.'
  },
  {
    id: 'sc-scope-order', group: 'scope',
    case: 'An on-line physician orders a procedure that is not in your state\'s paramedic scope of practice.',
    a: 'Respectfully decline, explain it is outside your scope, and document',
    wrong: ['Do it, since a physician ordered it', 'Have your partner do it', 'Do it but leave it out of the PCR'],
    why: 'No order can expand your legal scope. Doing it can be negligence per se.'
  },
  {
    id: 'sc-good-sam', group: 'system',
    case: 'Off duty, you stop at a crash and hold c-spine. When the ambulance arrives, you feel like you have done enough and leave.',
    a: 'Wrong: once you start care, stay until you hand off to the arriving crew',
    wrong: ['Fine, because you had no duty to act off duty', 'Fine, because Good Samaritan laws cover you', 'Fine, as long as you didn\'t give medication'],
    why: 'You may not have had a duty to stop, but once you began care you must hand it off properly or it can be abandonment.'
  },
  {
    id: 'sc-hipaa-reporter', group: 'privacy',
    case: 'A news reporter at a crash scene asks for the driver\'s name and injuries.',
    a: 'Do not share it; refer them to your agency\'s public information officer',
    wrong: ['Give the name only, not the injuries', 'Share it, since the crash is public', 'Share it if the patient is an adult'],
    why: 'That is PHI, and the press is not covered by treatment, payment, or operations. Follow your agency\'s media policy.'
  },
  {
    id: 'sc-hipaa-hospital', group: 'privacy',
    case: 'At the hospital, the receiving nurse asks for the patient\'s history and medications.',
    a: 'Share it; giving report for treatment is allowed under HIPAA',
    wrong: ['Refuse until the patient signs a release', 'Give only the vital signs', 'Have the patient tell them instead'],
    why: 'Sharing PHI for treatment is allowed without written authorization.'
  },
  {
    id: 'sc-social', group: 'privacy',
    case: 'After a bad call, a classmate posts a photo of the wrecked car with "rough night" and the town name, but no patient names.',
    a: 'It can still identify the patient and breach confidentiality',
    wrong: ['It is fine without names', 'It is fine if posted after the shift', 'It is fine because the crash was on a public road'],
    why: 'A vehicle, location, and date can identify a patient. Never post about calls.'
  },
  {
    id: 'sc-child-abuse', group: 'reporting',
    case: 'A toddler has bruises of different colors on the back and buttocks. The parent says the child fell off the couch.',
    a: 'Treat, transport, document objectively, and report your suspicion as required',
    wrong: ['Confront the parent on scene', 'Report only if you can prove abuse', 'Do nothing; the parent explained it'],
    why: 'You need only reasonable suspicion. The injury pattern doesn\'t fit the story. Report through the proper channel and don\'t accuse anyone on scene.'
  },
  {
    id: 'sc-elder', group: 'reporting',
    case: 'An 82-year-old woman living with her son has pressure ulcers, soiled bedding, and no food in the house.',
    a: 'Report suspected neglect to Adult Protective Services, as required',
    wrong: ['Tell the son to clean up and leave', 'Report only if she asks you to', 'It is a family matter, so stay out of it'],
    why: 'Neglect of a vulnerable adult is a mandatory report. In Tennessee it goes to Adult Protective Services.'
  },
  {
    id: 'sc-gsw', group: 'reporting',
    case: 'You arrive at a shooting. The patient is down in the living room. Police are still clearing the house.',
    a: 'Stage until police say the scene is safe',
    wrong: ['Go straight in to the patient', 'Go in, but only one of you', 'Go in through the back door'],
    why: 'Your own safety comes first. Once in, take one path, disturb little, and don\'t cut through bullet holes.'
  },
  {
    id: 'sc-dnr-family', group: 'death',
    case: 'A hospice patient is in cardiac arrest. The wife has a valid, signed DNR, but the daughter screams at you to do CPR.',
    a: 'Honor the valid DNR, give comfort and family support, and contact medical control if needed',
    wrong: ['Start CPR because a family member asked', 'Start CPR and stop when the daughter calms down', 'Leave the scene'],
    why: 'A valid DNR reflects the patient\'s own wishes. When there is real doubt about validity, start care and contact medical control.'
  },
  {
    id: 'sc-no-form', group: 'death',
    case: 'Family says their father "never wanted to be on machines," but no one can find a DNR or POST form. He is in cardiac arrest.',
    a: 'Start resuscitation and contact medical control',
    wrong: ['Withhold CPR based on the family\'s word', 'Wait while they search the house', 'Do only rescue breaths'],
    why: 'Without a valid written order, most protocols require you to start resuscitation.'
  },
  {
    id: 'sc-lividity', group: 'death',
    case: 'A man is found in bed, cold, with rigor mortis in the jaw and dark purple pooling along his back.',
    a: 'Withhold resuscitation for obvious death and notify law enforcement and the coroner or medical examiner',
    wrong: ['Start CPR and transport', 'Start CPR for 20 minutes, then stop', 'Move the body to the ambulance'],
    why: 'Rigor mortis and dependent lividity are signs of obvious death.'
  },
  {
    id: 'sc-pcr-error', group: 'records',
    case: 'After submitting your PCR, you realize you charted the wrong time for a medication.',
    a: 'Write a dated, signed addendum with the correct time',
    wrong: ['Delete the old report and write a new one', 'Leave it, since it was submitted', 'Ask your partner to change it'],
    why: 'Corrections after submission go in an addendum. Never alter or destroy the original.'
  },
  {
    id: 'sc-pcr-opinion', group: 'records',
    case: 'A patient smells of alcohol, slurs words, and keeps yelling at you. You start to write "drunk and belligerent."',
    a: 'Write what you observed: odor of alcohol, slurred speech, quotes of what he said',
    wrong: ['Write "drunk and belligerent"', 'Leave his behavior out completely', 'Write "known alcoholic"'],
    why: 'Objective findings protect you. Labels and opinions can be libel and can hide other causes, like head injury or hypoglycemia.'
  },
  {
    id: 'sc-ethics-mci', group: 'ethics',
    case: 'At a mass-casualty incident, you skip a patient in cardiac arrest to treat several others who can be saved.',
    a: 'It is an accepted, ethical way to share scarce resources: the most good for the most people',
    wrong: ['It is abandonment', 'It violates nonmaleficence', 'It is negligence per se'],
    why: 'Triage is an accepted way to allocate scarce resources fairly.'
  },
  {
    id: 'sc-ethics-test', group: 'ethics',
    case: 'You\'re unsure whether to honor a refusal and ask yourself, "Would I want this done in every case like this?"',
    a: 'That is the universalizability test',
    wrong: ['That is the impartiality test', 'That is the interpersonal justifiability test', 'That is the reasonable person test'],
    why: 'Universalizability asks whether you\'d want the action done in all similar situations.'
  }
];
