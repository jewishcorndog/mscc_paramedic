/*
 * Cardiology content, from Chapter 21 (Cardiology) of Sanders' Paramedic
 * Textbook, 6th ed.: the lecture slides and the chapter outline. Wording
 * follows those sources; only spacing, capitalization and obvious typos were
 * cleaned up.
 *
 * The slides leave the "Rules for interpretation" blank for most rhythms
 * after the sinus and atrial ones (they were tables in the book). For those,
 * rules come from standard ECG criteria and the rhythm has std: true, which
 * the app shows as a note.
 *
 * Rhythm fields: rules (rate, rhythm, qrs, p, pr), look (the one thing to
 * spot), causes, significance, management.
 * Condition fields: about, signs, ecg, management.
 */
window.CARDIO_RHYTHMS = [
  // ---------------- SA node ----------------
  {
    id: 'nsr', name: 'Normal sinus rhythm', aliases: ['nsr', 'sinus rhythm', 'normal sinus'], group: 'sinus', std: true,
    rules: {
      rate: '60 to 99 beats/min',
      rhythm: 'Regular',
      qrs: '< 0.12 second',
      p: 'Normal and upright in lead II; one P wave before each QRS complex',
      pr: '0.12 to 0.20 second, consistent'
    },
    look: 'Every P wave is followed by a normal QRS and T wave, the PR interval is normal, and the R-R interval is regular.',
    causes: [],
    significance: ['The normal sequence of atrial and ventricular activation'],
    management: ['None needed; treat the patient, not the monitor']
  },
  {
    id: 'sinus-brady', name: 'Sinus bradycardia', aliases: ['sinus brady', 'sb', 'brady'], group: 'sinus',
    rules: {
      rate: '< 60 beats/min',
      rhythm: 'Regular',
      qrs: '< 0.12 second',
      p: 'Normal and upright; one P wave before each QRS complex',
      pr: 'Consistent duration'
    },
    look: 'Looks like normal sinus rhythm, only slower than 60.',
    causes: ['Intrinsic sinus node disease', 'Increased parasympathetic (vagal) tone', 'Hypothermia', 'Hypoxia', 'Hypothyroidism',
      'Drug effects (digitalis, beta blockers, calcium channel blockers)', 'MI'],
    significance: ['May be normal, pathologic, or iatrogenic (induced by medications)',
      'Athletes may have sinus bradycardia (large stroke volume keeps cardiac output up at a lower rate)'],
    management: ['Prehospital intervention is usually unnecessary unless hypotension, altered mental status, acute heart failure, or ventricular irritability is present (more common below 50 beats/min)',
      'Symptomatic bradycardia: treat the underlying cause',
      'Symptomatic bradycardia: increase the heart rate to improve cardiac output (atropine, TCP)']
  },
  {
    id: 'sinus-tach', name: 'Sinus tachycardia', aliases: ['sinus tach', 'st'], group: 'sinus',
    rules: {
      rate: '≥ 100 beats/min',
      rhythm: 'Regular',
      qrs: '< 0.12 second, provided no ventricular conduction disturbance',
      p: 'Normal; one before each QRS complex',
      pr: 'Consistent duration'
    },
    look: 'Normal-looking beats at 100 or more; P waves may run into the T waves at fast rates.',
    causes: ['Exercise', 'Fever', 'Infection/sepsis', 'Pain', 'Caffeine or alcohol', 'Hypovolemia', 'Hyperthyroidism', 'Anemia', 'Heart failure',
      'Atropine or any sympathomimetic drug (cocaine, PCP, epinephrine)', 'Pulmonary embolism'],
    significance: ['Often a compensatory response to keep up cardiac output and end-organ perfusion',
      'Seen with sympathetic stimulation: pain, anxiety, toxins'],
    management: ['Treat the underlying cause (poor perfusion, oxygenation, pain)',
      'Tachycardia usually resolves once the cause is treated',
      'Treating the rate instead of the cause can be disastrous (cardiovascular collapse)']
  },
  {
    id: 'sinus-arrhythmia', name: 'Sinus arrhythmia', aliases: ['sinus dysrhythmia', 'sa'], group: 'sinus',
    rules: {
      rate: '60 to 99 beats/min (varies with respiration)',
      rhythm: 'Irregular',
      qrs: '< 0.12 second, provided no ventricular conduction disturbance',
      p: 'Normal; one P wave before each QRS complex',
      pr: 'Consistent duration'
    },
    look: 'Normal sinus beats whose R-R interval speeds up and slows down in a smooth, repeating cycle.',
    causes: ['Normal variant: changes in intrathoracic pressure during breathing', 'Less often: heart disease or drugs such as digoxin (older adults)'],
    significance: ['Common, especially in young, healthy patients', 'Nonrespiratory causes are far less common'],
    management: ['No prehospital intervention required']
  },
  {
    id: 'sinus-arrest', name: 'Sinus arrest', aliases: ['sinus pause', 'sinus block'], group: 'sinus',
    rules: {
      rate: 'Normal to slow',
      rhythm: 'Irregular when sinus arrest is present',
      qrs: '< 0.12 second, provided no bundle branch conduction disturbance',
      p: 'Normal',
      pr: 'Normal in the absence of AV block'
    },
    look: 'A sinus rhythm with a sudden pause where a whole P-QRS-T is missing, and the pause is not a multiple of the normal R-R.',
    causes: ['Increased parasympathetic tone on the SA node', 'Hypoxia or ischemia', 'Excess digitalis, calcium channel blockers or beta blockers',
      'Hyperkalemia', 'Damage to the SA node (AMI, degenerative fibrotic disease)'],
    significance: ['Frequent or prolonged episodes may reduce cardiac output', 'Light-headedness followed by syncope',
      'Sinus node activity may stop completely', 'Escape pacemaker may not take over, leading to asystole'],
    management: ['Asymptomatic: close observation only', 'Symptomatic bradycardia: atropine or transcutaneous pacing (TCP)']
  },
  // ---------------- Atria ----------------
  {
    id: 'pac', name: 'Premature atrial complex', aliases: ['pac', 'pacs', 'premature atrial contraction'], group: 'atrial',
    rules: {
      rate: 'Depends on the underlying rhythm',
      rhythm: 'Sinus and regular with irregular premature beats',
      qrs: '< 0.12 second',
      p: 'Differs in shape from a sinus P; comes earlier than the next expected sinus P; may be hidden in the preceding T wave',
      pr: 'Usually normal, but differs from the underlying rhythm'
    },
    look: 'An early, normal-width beat with a different-looking P wave, followed by a pause that resets the rhythm.',
    causes: ['Increased catecholamines and sympathetic tone', 'Caffeine, tobacco, or alcohol', 'Sympathomimetic drugs (epinephrine, albuterol, cocaine, amphetamines)',
      'Electrolyte imbalance', 'Hypoxia', 'Digitalis toxicity', 'Cardiovascular disease'],
    significance: ['Isolated PACs in healthy patients are not significant', 'Frequent PACs may lead to supraventricular dysrhythmias (MAT, atrial flutter, AF, PSVT)'],
    management: ['Usually observation only', 'Symptomatic bradycardia from frequent or nonconducted PACs: TCP or atropine']
  },
  {
    id: 'wap', name: 'Wandering atrial pacemaker', aliases: ['wandering pacemaker', 'wap'], group: 'atrial',
    rules: {
      rate: '60 to 99 beats/min',
      rhythm: 'Regular with minor variability when the pacemaker site shifts',
      qrs: '< 0.12 second, provided no conduction block',
      p: 'P-wave shape changes from beat to beat',
      pr: 'Varies'
    },
    look: 'Normal rate, but the P waves change shape (tall, flat, inverted) and the PR interval changes as the pacemaker moves.',
    causes: ['May be normal in the very young, older adults, and athletes', 'Inhibitory vagal effect on the SA node and AV junction (often with respiration)',
      'Underlying heart disease', 'Digoxin'],
    significance: ['Usually no serious signs and symptoms', 'Occasionally associated with other atrial dysrhythmias (AF)'],
    management: ['Often benign; no treatment needed', 'MAT may be triggered by worsening COPD, heart failure, or mitral regurgitation: treat the underlying cause']
  },
  {
    id: 'svt', name: 'Supraventricular tachycardia', aliases: ['svt', 'psvt', 'paroxysmal supraventricular tachycardia', 'avnrt'], group: 'atrial',
    rules: {
      rate: '150 to 250 beats/min',
      rhythm: 'Very regular except at onset and termination',
      qrs: '< 0.12 second, provided no ventricular conduction disturbance',
      p: 'May vary based on the SVT (often not seen)',
      pr: 'Often shortened, but may be normal or, rarely, prolonged'
    },
    look: 'Fast (150+), narrow and very regular, with no clear P waves.',
    causes: ['AVNRT, the most common reentry SVT, usually started by a PAC', 'Stress, overexertion, tobacco, caffeine, illicit drugs (cocaine)',
      'Common in young adults and women; not usually linked to heart disease'],
    significance: ['Tolerated well for short periods', 'Palpitations, nervousness, anxiety; "racing heart"',
      'Rapid rate may prevent full ventricular filling and reduce cardiac output in patients with heart disease'],
    management: ['Stable: vagal maneuvers (Valsalva; ice pack in children)', 'If vagal maneuvers fail: adenosine',
      'Still unchanged after the second adenosine dose: calcium channel blocker (diltiazem), beta blocker, or other antidysrhythmic',
      'Hemodynamically unstable: synchronized cardioversion', 'Use only one antidysrhythmic agent']
  },
  {
    id: 'flutter', name: 'Atrial flutter', aliases: ['a flutter', 'aflutter', 'flutter'], group: 'atrial',
    rules: {
      rate: 'Atrial 250 to 300 beats/min; ventricular about 150 beats/min (depends on conduction ratio)',
      rhythm: 'Regular (irregular if the conduction ratio varies)',
      qrs: '< 0.12 second, unless ventricular conduction disturbance',
      p: 'Flutter waves (F waves) in a sawtooth or picket-fence pattern',
      pr: 'Usually constant but may vary'
    },
    look: 'A sawtooth baseline of F waves with a QRS after every 2nd, 3rd or 4th one.',
    causes: ['Coronary artery disease', 'Hypertensive heart disease', 'Cardiomyopathy', 'Digitalis toxicity (rare)', 'Hypoxia', 'Heart failure', 'Pericarditis', 'Myocarditis'],
    significance: ['Normal ventricular rate: usually well tolerated', 'Rapid ventricular rate: same signs of decreased cardiac output as SVT',
      'With 2:1 conduction it may look like SVT'],
    management: ['Same as AF', 'Stable: treat the underlying cause, then rate control with diltiazem or beta blockers',
      'Do not convert without first giving drugs that prevent blood clotting', 'Unstable from the rhythm itself: cardioversion']
  },
  {
    id: 'afib', name: 'Atrial fibrillation', aliases: ['af', 'afib', 'a fib', 'a-fib'], group: 'atrial',
    rules: {
      rate: 'Atrial 350 to 700 beats/min; ventricular varies greatly',
      rhythm: 'Irregularly irregular',
      qrs: '< 0.12 second, provided no ventricular conduction disturbance',
      p: 'Absent (fibrillatory baseline)',
      pr: 'None'
    },
    look: 'Irregularly irregular narrow QRS complexes with a wavy baseline and no P waves.',
    causes: ['Multiple areas of reentry in the atria, or ectopic atrial pacemakers', 'Paroxysmal AF in young adults after heavy alcohol ("holiday heart") or acute stress'],
    significance: ['The atrial kick is lost, which can reduce cardiac output by as much as 15%',
      'With a rapid ventricular response, may cause decompensation (angina, MI, heart failure, cardiogenic shock)'],
    management: ['Stable: identify and treat the underlying cause, then rate control with diltiazem or beta blockers',
      'Do not convert AF without first giving drugs that prevent blood clotting',
      'Unstable: decide whether the rhythm or another cause is responsible', 'Instability from the rhythm itself: cardioversion']
  },
  // ---------------- AV junction ----------------
  {
    id: 'pjc', name: 'Premature junctional complex', aliases: ['pjc', 'pjcs', 'premature junctional contraction'], group: 'junctional', std: true,
    rules: {
      rate: 'Depends on the underlying rhythm',
      rhythm: 'Irregular because of the premature beat',
      qrs: '< 0.12 second',
      p: 'Inverted in lead II; may come before, during (hidden), or after the QRS',
      pr: '< 0.12 second if the P wave comes before the QRS'
    },
    look: 'An early narrow beat with an inverted P wave just before it, or no P wave at all.',
    causes: ['Digitalis toxicity', 'Other cardiac medications (quinidine, procainamide)', 'Increased vagal tone on the SA node',
      'Sympathomimetic drugs (cocaine, methamphetamines)', 'Hypoxia', 'Heart failure', 'Damage to the AV junction'],
    significance: ['Occasional PJCs usually are not significant'],
    management: ['Stable: no treatment needed']
  },
  {
    id: 'junctional-escape', name: 'Junctional escape rhythm', aliases: ['junctional rhythm', 'junctional', 'junctional escape'], group: 'junctional', std: true,
    rules: {
      rate: '40 to 60 beats/min',
      rhythm: 'Regular',
      qrs: '< 0.12 second',
      p: 'Inverted in lead II; before, during (hidden), or after the QRS',
      pr: '< 0.12 second if the P wave comes before the QRS'
    },
    look: 'Slow (40 to 60), regular, narrow QRS with inverted, hidden, or retrograde P waves.',
    causes: ['SA node and atria fail to fire (hypoxia, ischemia, MI, drug toxicity)', 'Digitalis toxicity', 'Increased vagal tone', 'Damage to the AV junction'],
    significance: ['Junctional bradycardia can decrease cardiac output', 'Signs similar to other bradycardias (light-headedness, hypotension, syncope)',
      'Rates of 50 beats/min or more are usually tolerated'],
    management: ['Stable: no treatment needed', 'Symptomatic or ventricular irritability: atropine first',
      'Severe or unresponsive to atropine: external pacing', 'Diseased or damaged SA node: may need a permanent pacemaker']
  },
  {
    id: 'accel-junctional', name: 'Accelerated junctional rhythm', aliases: ['accelerated junctional', 'ajr'], group: 'junctional', std: true,
    rules: {
      rate: '61 to 100 beats/min (faster than the junction\'s intrinsic 40 to 60)',
      rhythm: 'Regular',
      qrs: '< 0.12 second',
      p: 'Inverted in lead II; before, during (hidden), or after the QRS',
      pr: '< 0.12 second if the P wave comes before the QRS'
    },
    look: 'Like a junctional rhythm (inverted or missing P waves), but at a normal rate.',
    causes: ['Digitalis toxicity (most common)', 'Excess catecholamines', 'Myocarditis', 'Damage to the AV junction', 'Inferior wall MI', 'Rheumatic fever'],
    significance: ['Usually well tolerated', 'Heart disease and hypoxia of the heart muscle may lead to more serious dysrhythmias'],
    management: ['Generally requires no immediate treatment']
  },
  // ---------------- Ventricles ----------------
  {
    id: 'idioventricular', name: 'Idioventricular rhythm', aliases: ['ventricular escape rhythm', 'ventricular escape', 'ivr', 'idioventricular'], group: 'ventricular', std: true,
    rules: {
      rate: '20 to 40 beats/min',
      rhythm: 'Usually regular',
      qrs: '≥ 0.12 second; wide and bizarre, T wave opposite the QRS',
      p: 'Absent',
      pr: 'None'
    },
    look: 'Very slow (20 to 40), wide, bizarre QRS complexes with no P waves.',
    causes: ['Higher pacemakers (SA node, AV junction) fail or fall below the ventricles\' rate', 'A compensatory mechanism to prevent cardiac standstill'],
    significance: ['Generally produces symptoms: hypotension, decreased cardiac output and brain perfusion, syncope, shock',
      'May have a pulse or (commonly) be nonperfusing (PEA)'],
    management: ['Perfusing: raise the heart rate with oxygen (if hypoxic), TCP, and/or dopamine or epinephrine',
      'Lidocaine is contraindicated (likely lethal)', 'Nonperfusing: start BLS and follow the pulseless arrest protocol']
  },
  {
    id: 'pvc', name: 'Premature ventricular complex', aliases: ['pvc', 'pvcs', 'premature ventricular contraction', 'bigeminy', 'trigeminy'], group: 'ventricular', std: true,
    rules: {
      rate: 'Depends on the underlying rhythm',
      rhythm: 'Irregular because of the premature beat; usually a full compensatory pause',
      qrs: '≥ 0.12 second; wide and bizarre, T wave opposite the QRS',
      p: 'None before the PVC',
      pr: 'None for the PVC'
    },
    look: 'An early, wide, bizarre beat with no P wave, followed by a full compensatory pause. Every other beat = bigeminy; every third = trigeminy.',
    causes: ['Myocardial ischemia', 'Hypoxia', 'Acid–base and electrolyte imbalance (hypokalemia)', 'Heart failure', 'Increased catecholamines (emotional stress)',
      'Stimulants (alcohol, caffeine, tobacco)', 'Drug toxicity', 'Sympathomimetic drugs (cocaine, PCP, epinephrine, methamphetamine)'],
    significance: ['Without heart disease, usually no serious signs ("skipped beats")', 'Unifocal PVCs look alike; multifocal PVCs vary in shape'],
    management: ['No symptoms and no known heart disease: seldom need treatment', 'Myocardial ischemia with frequent PVCs: oxygen and beta blockers promptly',
      'At the hospital: check serum potassium; treat hypokalemia']
  },
  {
    id: 'vt', name: 'Ventricular tachycardia', aliases: ['vt', 'v tach', 'vtach', 'v-tach', 'monomorphic vt', 'wide complex tachycardia'], group: 'ventricular', std: true,
    rules: {
      rate: '> 100 beats/min (usually 150 to 250)',
      rhythm: 'Usually regular',
      qrs: '≥ 0.12 second; wide and bizarre',
      p: 'Usually not seen (if present, not related to the QRS)',
      pr: 'None'
    },
    look: 'Three or more wide, bizarre ventricular complexes in a row at more than 100 beats/min.',
    causes: ['Acid–base and electrolyte imbalance (hypokalemia)', 'Heart failure', 'Increased catecholamines', 'Stimulants (alcohol, caffeine, tobacco)',
      'Drug toxicity (digitalis, tricyclic antidepressants)', 'Sympathomimetic drugs (cocaine, methamphetamines)', 'Prolonged QT interval'],
    significance: ['Usually indicates significant heart disease', 'Rapid rate and loss of atrial kick drop cardiac output, coronary and cerebral perfusion',
      'May be perfusing or nonperfusing (pulse or no pulse)', 'May degenerate to VF'],
    management: ['Treatment depends on signs and symptoms and whether the QRS is monomorphic or polymorphic', 'Stable: obtain a 12-lead ECG',
      'WCT with serious signs and symptoms: immediate (synchronized) cardioversion', 'Pulseless VT: defibrillate (same as VF)',
      'Witnessed unstable or pulseless VT on a monitor: a single precordial thump may be tried while the defibrillator is readied']
  },
  {
    id: 'torsades', name: 'Torsades de pointes', aliases: ['torsades', 'polymorphic vt', 'torsade'], group: 'ventricular', std: true,
    rules: {
      rate: '> 200 beats/min (usually)',
      rhythm: 'Irregular',
      qrs: 'Wide; amplitude and shape twist around the baseline, growing and shrinking',
      p: 'Not seen',
      pr: 'None'
    },
    look: 'Wide complexes that "twist" around the baseline, getting taller then shorter in a spindle pattern.',
    causes: ['A type of polymorphic VT', 'Prolonged QT interval (drugs, metabolic problems, congenital long QT)'],
    significance: ['Can lead to syncope and sudden death; may degenerate to VF'],
    management: ['Treated by signs and symptoms like other VT; pulseless: defibrillate', 'Magnesium sulfate (indicated for torsades in the drug deck)']
  },
  {
    id: 'vf', name: 'Ventricular fibrillation', aliases: ['vf', 'v fib', 'vfib', 'v-fib', 'coarse vf', 'fine vf'], group: 'ventricular', std: true,
    rules: {
      rate: 'Cannot be determined',
      rhythm: 'Chaotic, irregular',
      qrs: 'Absent; only fibrillatory waves (coarse or fine)',
      p: 'Absent',
      pr: 'None'
    },
    look: 'Chaotic, irregular waves with no recognizable P, QRS or T. Coarse VF has big waves; fine VF is low and close to flat.',
    causes: ['PVCs', 'R-on-T phenomenon (rare)', 'Sustained VT', 'Myocardial ischemia or infarct', 'Third-degree AV block with a slow ventricular escape rhythm',
      'Cardiomyopathy', 'Congenital conduction abnormalities', 'Hypoxia', 'Acidosis', 'Electrolyte imbalance (hypokalemia, hyperkalemia, submersion)',
      'Electrical injury', 'Drug overdose (cocaine, digoxin, tricyclic antidepressants)'],
    significance: ['No circulating blood flow (pulseless)', 'Light-headedness, then within seconds loss of consciousness, apnea, and death if untreated',
      'Most adult cardiac arrests come from VF or pulseless VT'],
    management: ['High-quality CPR with minimal interruptions', 'Early defibrillation (most effective treatment for VF)', 'Follow the VF/pulseless VT arrest algorithm']
  },
  {
    id: 'asystole', name: 'Asystole', aliases: ['flatline', 'cardiac standstill', 'ventricular standstill', 'p wave asystole'], group: 'arrest', std: true,
    rules: {
      rate: 'None',
      rhythm: 'None',
      qrs: 'Absent',
      p: 'Usually absent (P-wave asystole may show P waves alone)',
      pr: 'None'
    },
    look: 'A flat (or nearly flat) line. Confirm in more than one lead.',
    causes: ['Final common pathway of cardiac arrest', 'Untreated VF and PEA become asystole without ROSC'],
    significance: ['Poor prognostic sign in cardiac arrest', 'In a prolonged resuscitation, it often confirms death'],
    management: ['BLS with effective CPR and epinephrine', 'Effective ventilation with a bag-mask device or advanced airway',
      'Consider reversible causes before stopping resuscitation', 'Pacing is not recommended for asystole']
  },
  {
    id: 'paced', name: 'Artificial pacemaker rhythm', aliases: ['paced rhythm', 'paced', 'pacemaker', 'ventricular paced'], group: 'other', std: true,
    rules: {
      rate: 'The pacemaker\'s set rate (usually 60 to 80 beats/min)',
      rhythm: 'Regular',
      qrs: 'Wide (≥ 0.12 second) after each ventricular pacer spike',
      p: 'May be absent, native, or paced (atrial spike)',
      pr: 'Depends on the type of pacemaker'
    },
    look: 'A sharp, narrow pacer spike in front of each wide QRS.',
    causes: ['Implanted pacemaker stimulates the heart through an electrode', 'Fires only when the patient\'s own rate falls below the set rate (acts as an escape rhythm)'],
    significance: ['Spikes followed by QRS complexes = electrical capture', 'Spikes without a QRS = failure to capture: no ventricular contraction',
      'Many pacemaker failures occur within the first month after implantation'],
    management: ['Pacemaker failure is a true emergency: recognize it and transport rapidly', 'Do not delay transport to try to stabilize']
  },
  // ---------------- Conduction blocks ----------------
  {
    id: 'avb-1', name: 'First-degree AV block', aliases: ['1st degree av block', 'first degree heart block', '1st degree block', '1st degree'], group: 'blocks', std: true,
    rules: {
      rate: 'Depends on the underlying rhythm',
      rhythm: 'Regular',
      qrs: 'Usually < 0.12 second',
      p: 'Normal; one before every QRS',
      pr: '> 0.20 second and constant'
    },
    look: 'Every P is followed by a QRS, but the PR interval is long (more than one big box) and the same every beat.',
    causes: ['May occur for no apparent reason', 'Myocardial ischemia or AMI', 'Increased vagal (parasympathetic) tone', 'Digitalis toxicity'],
    significance: ['A delay in conduction (usually at the AV node), not a true block', 'Not a rhythm by itself: name the underlying rhythm too (eg, sinus brady with first-degree AV block)',
      'Little or no clinical significance; rarely progresses', 'With RBBB and a hemiblock = trifascicular block: risk of complete heart block'],
    management: ['Usually no treatment required']
  },
  {
    id: 'avb-2-1', name: 'Second-degree AV block type I (Wenckebach)', aliases: ['wenckebach', 'mobitz i', 'mobitz 1', 'mobitz type i', '2nd degree type i', 'second degree type 1', '2nd degree type 1'], group: 'blocks', std: true,
    rules: {
      rate: 'Atrial normal; ventricular slightly slower',
      rhythm: 'Atrial regular; ventricular irregular (grouped beating)',
      qrs: 'Usually < 0.12 second',
      p: 'Normal; some P waves are not followed by a QRS',
      pr: 'Gets progressively longer until a QRS is dropped; the cycle repeats'
    },
    look: 'Longer, longer, longer, drop: the PR interval grows until a P wave has no QRS.',
    causes: ['AMI or acute myocarditis', 'Increased vagal tone', 'Ischemia', 'Drug toxicity (digitalis, propranolol, verapamil)', 'Head injury', 'Electrolyte imbalance'],
    significance: ['Usually benign and does not cause hemodynamic compromise', 'Rarely progresses to a more serious AV block', 'Usually at the level of the AV node'],
    management: ['Asymptomatic: no management required', 'Dropped beats compromise rate and cardiac output: atropine, TCP, or both']
  },
  {
    id: 'avb-2-2', name: 'Second-degree AV block type II', aliases: ['mobitz ii', 'mobitz 2', 'mobitz type ii', '2nd degree type ii', 'second degree type 2', '2nd degree type 2'], group: 'blocks', std: true,
    rules: {
      rate: 'Atrial normal; ventricular slower, often bradycardic',
      rhythm: 'Atrial regular; ventricular regular or irregular depending on the conduction ratio',
      qrs: 'Often ≥ 0.12 second (block is below the bundle of His), but may be narrow',
      p: 'Normal; more P waves than QRS complexes (2:1, 3:2, 4:3)',
      pr: 'Constant for the conducted beats'
    },
    look: 'The PR interval stays the same, then a P wave suddenly is not followed by a QRS.',
    causes: ['MI involving the septum', 'Normally not from increased parasympathetic tone or drug toxicity alone'],
    significance: ['Serious; considered malignant in the emergency setting', 'Slow ventricular rates may cause hypoperfusion',
      'May progress to third-degree block or asystole', 'Two or more P waves in a row not conducted = high-grade AV block'],
    management: ['Definitive treatment: pacemaker insertion', 'Symptomatic: atropine (may not be effective)', 'Prepare for TCP and possibly beta-adrenergic drugs']
  },
  {
    id: 'avb-3', name: 'Third-degree AV block (complete heart block)', aliases: ['complete heart block', 'chb', '3rd degree', '3rd degree heart block', 'third degree heart block', 'third degree'], group: 'blocks', std: true,
    rules: {
      rate: 'Atrial 60 to 100; ventricular 40 to 60 (junctional escape) or 20 to 40 (ventricular escape)',
      rhythm: 'Atrial regular and ventricular regular, but independent of each other',
      qrs: 'Narrow if a junctional escape; wide (≥ 0.12 second) if a ventricular escape',
      p: 'Normal; they march through at their own rate with no relationship to the QRS',
      pr: 'None (varies completely: AV dissociation)'
    },
    look: 'P waves march through at their own rate and the slow QRS complexes march at theirs; the two are unrelated.',
    causes: ['Inferior MI', 'Drugs that block the AV node (digitalis, beta blockers, calcium channel blockers)', 'Chronic degeneration of the conduction system', 'Electrolyte imbalance'],
    significance: ['Severe bradycardia and decreased cardiac output; often unstable', 'Wide QRS complexes are an ominous sign', 'Potentially lethal'],
    management: ['Definitive treatment: pacemaker insertion', 'Atropine (often not effective)', 'Prepare for immediate TCP, or a dopamine or epinephrine infusion to raise the ventricular rate']
  },
  {
    id: 'wpw', name: 'Wolff-Parkinson-White (WPW)', aliases: ['wpw', 'wolff parkinson white', 'preexcitation', 'delta wave'], group: 'other', std: true,
    rules: {
      rate: 'Usually normal (60 to 100)',
      rhythm: 'Regular',
      qrs: 'Slightly wide with a delta wave (slurred upstroke)',
      p: 'Normal',
      pr: 'Short (< 0.12 second)'
    },
    look: 'Short PR interval that runs straight into a slurred upstroke (delta wave) on the QRS.',
    causes: ['Accessory pathway (bundle of Kent) bypasses the AV node and pre-excites the ventricles', 'Young, healthy people (mainly men) without apparent cause', 'Runs in families'],
    significance: ['Minor significance unless a tachycardia is present', 'Ready-made reentry circuit: AVRT', 'Life threatening with AF: impulses can bypass the AV node completely'],
    management: ['AV nodal blockers (adenosine, beta blockers, calcium channel blockers) are contraindicated with AF and WPW',
      'Manage a wide-complex tachycardia as if it is VT', 'Unstable: synchronized cardioversion']
  }
];

window.CARDIO_RHYTHM_GROUPS = [
  { id: 'sinus', name: 'SA node' },
  { id: 'atrial', name: 'Atrial' },
  { id: 'junctional', name: 'Junctional' },
  { id: 'ventricular', name: 'Ventricular' },
  { id: 'blocks', name: 'AV blocks' },
  { id: 'arrest', name: 'Arrest' },
  { id: 'other', name: 'Paced & WPW' }
];

// Conditions and treatments. kind: 'condition' or 'treatment'.
window.CARDIO_TOPICS = [
  // ---------------- Coronary ----------------
  {
    id: 'acs', name: 'Acute coronary syndrome (ACS)', aliases: ['acs'], group: 'coronary', kind: 'condition',
    about: ['AMI and unstable angina are a spectrum of disease called ACS', 'Most common cause of sudden cardiac death',
      'Three ischemic syndromes: unstable angina, NSTEMI, STEMI'],
    signs: ['Chest pain or discomfort', 'Diaphoresis', 'Shortness of breath', 'Left arm or shoulder pain', 'Nausea or vomiting'],
    ecg: ['STEMI: ST-segment elevation', 'NSTE-ACS (unstable angina, NSTEMI): ischemic ST depression or T-wave changes, or nondiagnostic'],
    management: ['Prompt recognition of STEMI and triage to the appropriate hospital', 'Reduce myocardial necrosis, preserve LV function, prevent heart failure',
      'Prevent major adverse cardiac events', 'Treat life-threatening complications']
  },
  {
    id: 'atherosclerosis', name: 'Atherosclerosis', aliases: [], group: 'coronary', kind: 'condition',
    about: ['Progressive narrowing of the lumen of medium and large arteries', 'Disrupts the vessel lining: loss of elasticity and more clot formation',
      'The atheroma narrows the lumen and reduces blood supply'],
    signs: ['Risk factors: age, family history, diabetes', 'Modifiable: smoking, obesity, hypertension, inactivity, high cholesterol'],
    ecg: [],
    management: ['Lifestyle changes: stop smoking, exercise, weight loss, diet', 'Control blood pressure, diabetes and cholesterol', 'Statins, aspirin, beta blockers']
  },
  {
    id: 'angina', name: 'Angina pectoris', aliases: ['angina', 'stable angina', 'unstable angina'], group: 'coronary', kind: 'condition',
    about: ['Symptom of myocardial ischemia ("choking pain in the chest")', 'Imbalance between myocardial oxygen supply and demand',
      'Lactic acid and CO2 build up in ischemic tissue'],
    signs: ['Stable angina: brought on by exertion (increased demand)', 'Unstable angina: occurs with light exercise or at rest; lasts longer'],
    ecg: ['May show ischemic ST depression or T-wave changes, or be normal'],
    management: ['Treat chest pain with signs of ischemia as an evolving AMI']
  },
  {
    id: 'ami', name: 'Acute myocardial infarction (AMI)', aliases: ['ami', 'mi', 'heart attack', 'stemi'], group: 'coronary', kind: 'condition',
    about: ['Usually begins with an atherosclerotic plaque that ruptures and forms a clot', 'Cells beyond the blockage switch to anaerobic metabolism, then die',
      'Infarct size depends on the tissue\'s needs, collateral circulation, and time to restore flow', 'Scar replaces the infarct in about 8 weeks',
      'Early death: lethal dysrhythmias, pump failure, or rupture of the ventricle, septum or papillary muscle'],
    signs: ['Chest pain or discomfort, often constant and not relieved by nitroglycerin or rest', 'Diaphoresis', 'Shortness of breath', 'Left arm or shoulder pain',
      'Nausea or vomiting', 'Agitation, anxiety, sense of impending doom, weakness', 'Silent MI: no pain'],
    ecg: ['ST elevation in leads facing the infarct', 'Inferior: II, III, aVF', 'Right ventricle: ST elevation in II, III, aVF (greatest in III) and V1; check V4R',
      'Posterior: ST depression, tall R and upright T in V1–V3; check V7–V9'],
    management: ['Assume anginal chest pain is an AMI until proven otherwise', 'Transport every chest pain patient for physician evaluation',
      '12-lead ECG acquisition, transmission and interpretation', 'Fibrinolytics only with protocols, checklists and medical direction']
  },
  // ---------------- Heart failure & shock ----------------
  {
    id: 'heart-failure', name: 'Heart failure', aliases: ['chf', 'hf', 'left heart failure', 'right heart failure'], group: 'pump', kind: 'condition',
    about: ['Heart cannot pump enough blood to meet the tissues\' needs', 'Left-side: LV fails as a forward pump (reduced or preserved ejection fraction)',
      'Right-side: usually the result of left-side failure', 'Acute decompensated HF: new or worse symptoms, often fluid overload'],
    signs: ['Dyspnea, orthopnea', 'Pulmonary edema: crackles, foamy blood-tinged sputum (left)', 'JVD, peripheral and presacral edema (right)'],
    ecg: [],
    management: ['Sit the patient up with legs dependent', 'Oxygen by CPAP or BPAP', 'Nitroglycerin to reduce venous return and dyspnea']
  },
  {
    id: 'pulmonary-edema', name: 'Pulmonary edema', aliases: ['scape', 'flash pulmonary edema', 'acute pulmonary edema'], group: 'pump', kind: 'condition',
    about: ['Excess fluid in the lungs', 'Causes: heart failure, pneumonia, toxins and drugs, high altitude',
      'Sympathetic crashing acute pulmonary edema (SCAPE, "flash"): develops in minutes to hours; the extreme end'],
    signs: ['Severe dyspnea', 'Crackles', 'Foamy, blood-tinged sputum'],
    ecg: [],
    management: ['Acute, critical emergency', 'Sitting position with legs dependent', 'Oxygen by NIPPV (CPAP or BPAP); ventilator support as needed',
      'Nitroglycerin: reduces venous return, improves contractility, reduces dyspnea']
  },
  {
    id: 'cardiogenic-shock', name: 'Cardiogenic shock', aliases: ['cardiogenic'], group: 'pump', kind: 'condition',
    about: ['Most extreme form of pump failure', 'LV so compromised the heart cannot meet the body\'s metabolic needs',
      'Big drop in stroke volume, cardiac output and blood pressure'],
    signs: ['Hypotension', 'Signs of poor perfusion', 'ETCO2 < 25 mm Hg may indicate poor perfusion'],
    ecg: [],
    management: ['Airway and ventilatory support; SpO2 > 94%', 'Supine (semi-Fowler if dyspneic)', 'IV NS or LR: 30 mL/kg up to 1 L (TKO if crackles develop)',
      'Monitor ETCO2 and ECG; correct dysrhythmias', 'Correct blood glucose < 60 mg/dL', 'Vasopressors', 'Target MAP ≥ 65 mm Hg']
  },
  {
    id: 'tamponade', name: 'Cardiac tamponade', aliases: ['tamponade', 'pericardial tamponade'], group: 'pump', kind: 'condition',
    about: ['Impaired diastolic filling from increased pressure and fluid in the pericardium', 'May be gradual; may come from cancer or infection'],
    signs: ['Chest pain that worsens with deep breathing or coughing', 'JVD and elevated venous pressure (early sign)', 'Decreased systolic pressure (late sign)',
      'Faint or muffled heart sounds', 'Pulsus paradoxus', 'Tachycardia', 'Palpitations', 'Shortness of breath'],
    ecg: ['Low-voltage QRS complexes and T waves', 'Electrical alternans (alternating amplitude of P, QRS and T)'],
    management: ['Thorough history to find the cause', 'Airway; oxygen to SpO2 > 94%; ventilatory support', 'Transport; possibly drain the pericardial sac']
  },
  // ---------------- Vascular ----------------
  {
    id: 'aaa', name: 'Abdominal aortic aneurysm (AAA)', aliases: ['aaa', 'aortic aneurysm', 'aneurysm'], group: 'vascular', kind: 'condition',
    about: ['Aneurysm = dilation of a vessel', 'Causes: atherosclerosis (most common), infection (syphilis), trauma, genetic disorders',
      'Rupture may start as a small tear in the intima that lets blood into the aortic wall'],
    signs: ['Abdominal or back pain', 'Signs of shock if ruptured'],
    ecg: [],
    management: ['Gentle handling', 'Oxygen if hypoxemic', 'Cardiac monitoring (12-lead)', 'Two large-bore IV lines (18 g or larger) en route', 'Alert the hospital for surgery']
  },
  {
    id: 'dissection', name: 'Acute aortic dissection', aliases: ['aortic dissection', 'dissection', 'dissecting aneurysm'], group: 'vascular', kind: 'condition',
    about: ['Separation of the aortic wall; the most common aortic catastrophe',
      'Can cause syncope, stroke, absent pulses, unequal BPs, aortic regurgitation, tamponade, AMI'],
    signs: ['Sudden, severe tearing or ripping chest or upper back pain', 'Sudden severe abdominal pain', 'Unequal blood pressures right vs left',
      'Weak pulse in one arm or thigh', 'Loss of consciousness', 'Stroke-like weakness; difficulty speaking, loss of vision', 'Leg pain, difficulty walking'],
    ecg: [],
    management: ['Relieve pain and transport promptly', 'Handle gently and reduce anxiety', 'Antiemetics for nausea and vomiting', 'High-concentration oxygen',
      'Large-bore IV of crystalloid', 'Beta blocker to keep the heart rate 60 to 80 beats/min', 'Pain management per guidelines']
  },
  {
    id: 'arterial-occlusion', name: 'Acute arterial occlusion', aliases: ['arterial occlusion', 'limb ischemia'], group: 'vascular', kind: 'condition',
    about: ['Sudden blockage of an artery (aorta, iliac, femoral, mesenteric)', 'Limb-threatening if flow is not restored in 4 to 8 hours'],
    signs: ['Sudden severe pain (or none, from paresthesia)', 'Pallor, mottling or cyanosis', 'Cool skin distal to the occlusion', 'Sensory and motor changes',
      'Diminished or absent distal pulse', 'Bruit over the vessel', 'Slow capillary refill', 'Sometimes shock (mesenteric)'],
    ecg: [],
    management: ['Immobilize and protect the limb', 'Oxygen, IV fluids, analgesics', 'Transport for definitive care']
  },
  {
    id: 'dvt', name: 'Deep vein thrombosis (DVT)', aliases: ['dvt', 'venous thrombosis'], group: 'vascular', kind: 'condition',
    about: ['Clot in a deep vein; risk of pulmonary embolism',
      'Risk factors: paralysis, fractures of hip/pelvis/long bones, coagulopathy, trauma, cancer, major surgery, pregnancy, birth control or estrogen, age > 50, obesity, immobility'],
    signs: ['Pain', 'Edema', 'Warmth', 'Erythema or blue discoloration', 'Tenderness'],
    ecg: [],
    management: ['Immobilize and elevate the extremity', 'Transport for physician evaluation', 'Low PE risk may be treated at home']
  },
  {
    id: 'hypertensive-crisis', name: 'Hypertensive crisis', aliases: ['hypertensive emergency', 'hypertensive encephalopathy', 'hypertension'], group: 'vascular', kind: 'condition',
    about: ['BP usually > 180/120 mm Hg causing irreversible organ damage', 'Chronic hypertension increases afterload, LV hypertrophy and atherosclerosis',
      'Hypertensive encephalopathy: raised ICP from high BP alone'],
    signs: ['Severe headache, nausea, vomiting', 'Aphasia, transient blindness', 'Seizures, stupor, coma', 'May cause ischemia, dissection, pulmonary edema, ICH, renal failure'],
    ecg: [],
    management: ['Supportive care', 'Calm the patient', 'Oxygen if indicated', 'IV access', 'ECG monitoring', 'Rapid transport']
  },
  // ---------------- Heart disease ----------------
  {
    id: 'endocarditis', name: 'Endocarditis', aliases: ['infective endocarditis', 'bacterial endocarditis'], group: 'disease', kind: 'condition',
    about: ['Infection of the endocardium (inner lining), usually bacteria in the bloodstream', 'Can damage heart muscle and valves'],
    signs: ['Fever, chills, sweating, night sweats', 'Fatigue, weakness, weight loss', 'Splinter hemorrhages under the nails',
      'Janeway lesions: red, painless spots on palms and soles', 'Osler nodes: red, painful nodes on finger and toe pads', 'Joint and muscle pain', 'Shortness of breath with activity'],
    ecg: [],
    management: ['Supportive care and transport']
  },
  {
    id: 'pericarditis', name: 'Pericarditis', aliases: [], group: 'disease', kind: 'condition',
    about: ['Inflammation of the pericardium, usually after a viral infection'],
    signs: ['Sharp chest pain that worsens lying flat and with deep breathing; relieved by sitting up and leaning forward', 'Pericardial friction rub',
      'Fever, dry cough, fatigue', 'Dyspnea lying down'],
    ecg: ['Diffuse ST elevation', 'PR-segment depression', 'Notched J point'],
    management: ['Supportive care and transport']
  },
  {
    id: 'myocarditis', name: 'Myocarditis', aliases: [], group: 'disease', kind: 'condition',
    about: ['Inflammation of the heart muscle from viral, bacterial or fungal infection', 'May damage the heart and cause heart failure', 'Associated with COVID-19'],
    signs: ['Abnormal heartbeat, sometimes syncope', 'Chest pain', 'Fever and signs of infection', 'Shortness of breath', 'Leg swelling'],
    ecg: ['Dysrhythmias'],
    management: ['Supportive care; treat heart failure if present']
  },
  {
    id: 'cardiomyopathy', name: 'Cardiomyopathy', aliases: [], group: 'disease', kind: 'condition',
    about: ['Weakening or structural change of the heart muscle', 'Three types: dilated, restrictive, hypertrophic',
      'Causes: alcohol, cocaine, chemotherapy, pregnancy, genetics, amyloidosis, kidney disease, viral infection, hypertension, lupus'],
    signs: ['Breathlessness with exertion or at rest', 'Swelling of legs, ankles, feet', 'Abdominal distention with fluid', 'Fatigue',
      'Rapid, pounding or fluttering heartbeat', 'Dizziness and fainting'],
    ecg: [],
    management: ['Treat the presenting signs and symptoms', 'Long term: drugs to improve heart function and prevent clots and fluid retention']
  },
  // ---------------- "Five can't miss" ----------------
  {
    id: 'brugada', name: 'Brugada syndrome', aliases: ['brugada'], group: 'cantmiss', kind: 'condition',
    about: ['Genetic sodium-channel mutation; risk of VT/VF and sudden death', 'Mainly middle-aged; eight times more common in men',
      'Triggers: fever, ischemia, many drugs, cocaine, alcohol, hypokalemia, hypothermia'],
    signs: ['Syncope or palpitations', 'Sudden cardiac arrest'],
    ecg: ['Coved ST elevation > 2 mm in V1 and V2'],
    management: ['Recognize the tracing and monitor closely', 'Treat dysrhythmias', 'Long term: ICD']
  },
  {
    id: 'long-qt', name: 'Long QT syndrome', aliases: ['long qt', 'lqts', 'prolonged qt'], group: 'cantmiss', kind: 'condition',
    about: ['Inherited conduction abnormality, often present from birth and asymptomatic', 'Normal QT is usually < 440 ms'],
    signs: ['Syncope', 'Seizure', 'Torsades de pointes', 'Sudden cardiac death'],
    ecg: ['QTc > 450 ms in males', 'QTc > 460 ms in females'],
    management: ['Treat the cause', 'Beta blockers', 'Pacemaker or ICD']
  },
  {
    id: 'hocm', name: 'Hypertrophic obstructive cardiomyopathy (HOCM)', aliases: ['hocm', 'hypertrophic cardiomyopathy', 'hcm'], group: 'cantmiss', kind: 'condition',
    about: ['Thickened myocardium blocks the outflow tract; stiff septum and LV cannot relax in diastole', 'About 1 in 500 people; autosomal dominant',
      'Leading cause of sudden cardiac death in young athletes'],
    signs: ['Syncope with exertion or sports in someone under 40', 'Sudden cardiac arrest is often the first sign'],
    ecg: ['LV hypertrophy'],
    management: ['Treat presenting signs and symptoms', 'Long term: lifestyle, medication, or surgery (remove part of the septum)']
  },
  {
    id: 'arvd', name: 'Arrhythmogenic right ventricular dysplasia (ARVD)', aliases: ['arvd', 'arvc'], group: 'cantmiss', kind: 'condition',
    about: ['Fatty tissue replaces the RV free wall', 'About 1 in 5,000; three times more common in males',
      'Second most common cause of sudden cardiac death in the young (after HOCM)'],
    signs: ['Syncope in a young patient, especially with exercise'],
    ecg: ['Ventricular dysrhythmias'],
    management: ['High index of suspicion; treat presenting signs and symptoms', 'Long term: antiarrhythmics, anticoagulation, ICD, transplant']
  },
  {
    id: 'bbb', name: 'Bundle branch block', aliases: ['bbb', 'rbbb', 'lbbb', 'right bundle branch block', 'left bundle branch block'], group: 'cantmiss', kind: 'condition',
    about: ['Delay or block below the bifurcation of the bundle of His', 'Causes: dilated cardiomyopathy, hypertrophy, anterior MI, aortic stenosis, hyperkalemia, digoxin, myocarditis, sodium channel blockers',
      'Higher risk of severe bradycardia and third-degree block'],
    signs: ['Often none from the block itself'],
    ecg: ['QRS ≥ 0.12 second from a supraventricular beat', 'RBBB: RSR\' ("rabbit ears") in V1', 'LBBB: deep, wide QS (or S) in V1',
      'Turn signal: QRS in V1 points up = right, down = left'],
    management: ['No specific treatment', 'New LBBB with chest pain may be ACS', 'LBBB meeting Sgarbossa criteria: treated as a STEMI equivalent in many systems']
  },
  {
    id: 'pea', name: 'Pulseless electrical activity (PEA)', aliases: ['pea', 'emd', 'electromechanical dissociation'], group: 'arrest', kind: 'condition',
    about: ['No detectable pulse with electrical activity other than VT or VF', 'Pseudo-PEA: some mechanical activity remains; more likely to respond'],
    signs: ['Pulseless, apneic patient with an organized rhythm on the monitor'],
    ecg: ['Any organized rhythm without a pulse (often slow and wide)'],
    management: ['BLS and ALS to maintain circulation', 'Search for and fix a correctable cause', 'Tension pneumothorax: needle decompression']
  },
  // ---------------- Treatments & devices ----------------
  {
    id: 'cpr', name: 'High-quality CPR', aliases: ['cpr', 'compressions'], group: 'resus', kind: 'treatment',
    about: ['Early CPR can double or triple survival', 'Blood flow from direct heart compression and from the thoracic pump'],
    signs: [],
    ecg: [],
    management: ['Start with chest compressions', 'Rate 100 to 120 compressions/min', 'Depth at least 2 inches (5 cm)', 'Full chest recoil',
      'Minimize interruptions (high chest compression fraction); pauses ≤ 10 seconds', 'Avoid excessive ventilation', 'Use a CPR feedback device'],
    numbers: ['100 to 120 compressions/min', 'At least 2 inches (5 cm)', 'Pauses 10 seconds or less']
  },
  {
    id: 'defib', name: 'Defibrillation', aliases: ['defib', 'shock'], group: 'resus', kind: 'treatment',
    about: ['Most frequent initial rhythm in sudden cardiac arrest is VF', 'Most effective treatment for VF; success drops quickly over time',
      'For VF and pulseless VT; shock is delivered with no regard to the cardiac cycle'],
    signs: [],
    ecg: [],
    management: ['Adult: 120 to 200 J biphasic (follow manufacturer) or 360 J monophasic; later shocks same or higher',
      'Pediatric: 2 J/kg first (2 to 4 J/kg), then 4 J/kg or higher, max 10 J/kg (not more than the adult dose)',
      'Compress until right before the shock and resume right after', 'Clear everyone from the patient, bed and defibrillator',
      'Do not shock over a pacemaker/ICD generator or nitroglycerin paste; remove NTG patches', 'Wet environment is OK: keep the chest dry between pads',
      'Adult patches 8 to 12 cm, placed so the heart is in the current path'],
    numbers: ['120 to 200 J biphasic', '360 J monophasic', 'Peds 2 J/kg, then 4 J/kg, max 10 J/kg']
  },
  {
    id: 'cardioversion', name: 'Synchronized cardioversion', aliases: ['cardioversion', 'sync', 'synchronized'], group: 'resus', kind: 'treatment',
    about: ['Terminates dysrhythmias other than VF and pulseless VT', 'Shock is timed about 10 milliseconds after the peak of the R wave'],
    signs: [],
    ecg: [],
    management: ['Unstable SVT', 'Unstable AF or atrial flutter (instability caused by the rhythm)', 'VT with a pulse and serious signs and symptoms (WCT)', 'Unstable WPW tachycardia'],
    numbers: ['About 10 ms after the peak of the R wave']
  },
  {
    id: 'tcp', name: 'Transcutaneous pacing (TCP)', aliases: ['tcp', 'pacing', 'external pacing'], group: 'resus', kind: 'treatment',
    about: ['Repetitive electrical current substitutes for a blocked or failing natural pacemaker',
      'Demand mode senses the QRS and fires only when needed (safer); asynchronous fires at a set rate regardless'],
    signs: [],
    ecg: ['Capture: each spike is followed by a wide QRS and broad T wave', 'No capture: increase the current gradually until consistent capture'],
    management: ['Indicated: unstable bradycardia (< 50) unresponsive to atropine; pacemaker failure',
      'Contraindicated: hypothermia; not for asystole or cardiac arrest', 'Not advised with open wounds or burns on the chest or in a wet environment',
      'Painful: give analgesia or sedation to a conscious patient'],
    numbers: ['Unstable bradycardia < 50 beats/min']
  },
  {
    id: 'vagal', name: 'Vagal maneuvers', aliases: ['valsalva', 'vagal'], group: 'resus', kind: 'treatment',
    about: ['Stimulate parasympathetic fibers to slow the heart and reduce atrial contraction', 'Can stop some SVTs'],
    signs: [],
    ecg: [],
    management: ['Patient must be relatively stable and cooperative', 'Valsalva maneuver', 'Ice pack maneuver (children)', 'If they fail: adenosine'],
    numbers: []
  },
  {
    id: 'icd', name: 'Implantable cardioverter-defibrillator (ICD)', aliases: ['icd', 'aicd'], group: 'devices', kind: 'treatment',
    about: ['For patients at risk of recurrent sustained VT or VF', 'Battery device that monitors rhythm, rate and QRS shape and shocks when needed'],
    signs: [],
    ecg: [],
    management: ['Manage the patient as if the device were not there', 'Follow standard ACLS if in arrest or unstable',
      'A shock felt while touching the patient is not dangerous', 'A magnet can deactivate the ICD: keep patients away from strong magnets'],
    numbers: []
  },
  {
    id: 'wcd', name: 'Wearable cardioverter-defibrillator (WCD)', aliases: ['wcd', 'lifevest', 'life vest'], group: 'devices', kind: 'treatment',
    about: ['Vest worn next to the skin when an ICD is not yet clear or is contraindicated', 'Alarms before shocking; a conscious patient can press two buttons to delay it',
      'Shocks 75 to 150 J biphasic within 25 to 60 seconds; up to five shocks', 'Does not detect or treat bradycardia'],
    signs: [],
    ecg: [],
    management: ['"Do not touch the patient" means a shock is imminent: stand clear', 'Blue gel on the chest means the patient was shocked',
      'Leave the vest on if it does not interfere with care', 'Before shocking with the EMS monitor, pull the battery pack out of the monitor',
      'Bring the device, battery and charger to the hospital'],
    numbers: ['75 to 150 J biphasic', 'Up to 5 shocks']
  },
  {
    id: 'lvad', name: 'Left ventricular assist device (LVAD)', aliases: ['lvad', 'vad'], group: 'devices', kind: 'treatment',
    about: ['Implanted pump that enhances LV output: bridge to transplant, recovery, or destination therapy',
      'Continuous flow: often no palpable pulse or measurable BP', 'Some patients stay conscious in VF or VT',
      'Common failures: power disconnection and driveline failure (both stop the pump)'],
    signs: [],
    ecg: [],
    management: ['Check the power source; assess LOC, airway and breathing', 'Listen for a whirring sound over the heart', 'Monitor the ECG; check for device alarms',
      'Use the controller tag and resource number', 'Large-bore IV; try a noninvasive MAP', 'Transport to the closest LVAD center with the equipment and caregiver'],
    numbers: []
  },
  {
    id: 'rosc', name: 'Post-ROSC care', aliases: ['rosc', 'post arrest care', 'post-cardiac arrest care'], group: 'resus', kind: 'treatment',
    about: ['Goal: restore organ perfusion and optimize hemodynamics and ventilation'],
    signs: [],
    ecg: ['12-lead ECG as soon as possible'],
    management: ['Highest available oxygen until SpO2 or PaO2 can be measured', 'IV fluids; norepinephrine, epinephrine or dopamine if fluids do not work',
      'Immediate coronary reperfusion (PCI) when indicated', 'Targeted temperature management 32 to 36°C for patients who cannot follow commands'],
    numbers: ['32 to 36°C (89.6 to 96.8°F)']
  },
  {
    id: 'tor', name: 'Termination of resuscitation', aliases: ['tor', 'termination', 'field termination'], group: 'resus', kind: 'treatment',
    about: ['Exceptions to starting CPR: obvious signs of irreversible death, danger to the rescuer, or a valid do-not-resuscitate wish',
      'Traumatic arrest: treat HOT (Hypovolemia, Oxygenation, Tension pneumothorax); consider TOR if no ROSC'],
    signs: [],
    ecg: [],
    management: ['Consider TOR when ALL apply: arrest not witnessed by EMS', 'No bystander CPR', 'No shocks delivered', 'No ROSC after ALS care',
      'Tell medical direction: condition, collapse-to-CPR and collapse-to-shock times, initial rhythm, causes, response, ETCO2 < 10 mm Hg after 20 minutes, family\'s view',
      'Keep documenting (continuous ECG) and support the family'],
    numbers: ['ETCO2 < 10 mm Hg after 20 minutes of CPR']
  }
];

window.CARDIO_TOPIC_GROUPS = [
  { id: 'coronary', name: 'Coronary' },
  { id: 'pump', name: 'Heart failure & shock' },
  { id: 'vascular', name: 'Vascular' },
  { id: 'disease', name: 'Heart disease' },
  { id: 'cantmiss', name: 'Can\'t miss ECGs' },
  { id: 'arrest', name: 'Arrest' },
  { id: 'resus', name: 'Resuscitation' },
  { id: 'devices', name: 'Devices' }
];

// ECG basics: question, answer, and plausible wrong answers.
// std: true marks numbers that are standard ECG facts not spelled out on the slides.
window.CARDIO_BASICS = [
  { q: 'What does the P wave represent?', a: 'Atrial depolarization', wrong: ['Ventricular depolarization', 'Ventricular repolarization', 'Atrial repolarization'] },
  { q: 'What does the QRS complex represent?', a: 'Ventricular depolarization', wrong: ['Atrial depolarization', 'Ventricular repolarization', 'Conduction through the AV node'] },
  { q: 'What does the T wave represent?', a: 'Ventricular repolarization', wrong: ['Ventricular depolarization', 'Atrial depolarization', 'Atrial repolarization'] },
  { q: 'What does the ST segment represent?', a: 'Early ventricular repolarization', wrong: ['Atrial depolarization', 'AV node delay', 'Ventricular depolarization'] },
  { q: 'The PR interval is measured from…', a: 'The start of the P wave to the start of the QRS', wrong: ['The end of the P wave to the start of the QRS', 'The start of the P wave to the R peak', 'The start of the QRS to the end of the T wave'] },
  { q: 'The QT interval is measured from…', a: 'The start of the QRS to the end of the T wave', wrong: ['The start of the P wave to the end of the T wave', 'The end of the QRS to the start of the T wave', 'The R peak to the T peak'] },
  { q: 'Where does the ST segment start?', a: 'The J point', wrong: ['The R peak', 'The end of the T wave', 'The start of the P wave'] },
  { q: 'Normal PR interval?', a: '0.12 to 0.20 second', wrong: ['0.04 to 0.10 second', '0.20 to 0.30 second', '0.36 to 0.44 second'], std: true },
  { q: 'Normal QRS duration?', a: 'Less than 0.12 second', wrong: ['0.12 to 0.20 second', 'Less than 0.20 second', 'More than 0.12 second'] },
  { q: 'Normal QT interval (deck)?', a: 'Usually less than 440 ms', wrong: ['Usually less than 200 ms', 'Usually more than 500 ms', 'Usually less than 120 ms'] },
  { q: 'Long QT: QTc greater than…', a: '450 ms in males, 460 ms in females', wrong: ['400 ms in males, 420 ms in females', '500 ms in everyone', '350 ms in males, 360 ms in females'] },
  { q: 'One small box on ECG paper (1 mm) equals…', a: '0.04 second', wrong: ['0.20 second', '0.10 second', '0.02 second'], std: true },
  { q: 'One large box on ECG paper (5 mm) equals…', a: '0.20 second', wrong: ['0.04 second', '1 second', '0.12 second'], std: true },
  { q: 'How many large boxes make 1 second?', a: '5', wrong: ['10', '3', '25'], std: true },
  { q: 'Standard ECG paper speed?', a: '25 mm/second', wrong: ['50 mm/second', '10 mm/second', '12.5 mm/second'], std: true },
  { q: 'Six-second count method: heart rate equals…', a: 'Number of QRS complexes in 6 seconds × 10', wrong: ['QRS complexes in 6 seconds × 6', 'QRS complexes in 3 seconds × 10', '1500 ÷ QRS complexes'], std: true },
  { q: 'Triplicate method: large boxes between R waves read as…', a: '300, 150, 100, 75, 60, 50', wrong: ['300, 200, 150, 100, 75, 60', '150, 100, 75, 60, 50, 40', '300, 250, 200, 150, 100, 50'], std: true },
  { q: 'R-R method: heart rate equals…', a: '1500 ÷ small boxes between R waves (or 300 ÷ large boxes)', wrong: ['300 ÷ small boxes between R waves', '1500 ÷ large boxes between R waves', '60 ÷ small boxes between R waves'], std: true },
  { q: 'Routine cardiac monitoring is usually done in…', a: 'Lead II or V1', wrong: ['aVR', 'Lead I only', 'V6'] },
  { q: 'The 12-lead ECG uses how many limb and chest leads?', a: '3 standard limb, 3 augmented limb, 6 precordial', wrong: ['6 limb, 6 augmented', '4 limb, 4 augmented, 4 precordial', '3 limb, 9 precordial'] },
  { q: 'Five questions to ask about any rhythm, in order?', a: 'Is the patient sick? Rate? Normal QRS? Normal P waves? P to QRS relationship?', wrong: ['Rate? Axis? ST changes? QT? Bundle branch block?', 'P waves? PR? QRS? T waves? U waves?', 'Pulse? BP? SpO2? Rhythm? 12-lead?'] },
  { q: 'Two criteria to call a rhythm sinus?', a: 'A P wave before every QRS (1:1) and P waves shaped like they come from the SA node', wrong: ['Rate 60 to 100 and narrow QRS', 'Regular R-R and normal PR', 'Upright T waves and narrow QRS'] },
  { q: 'Chief pacemaker of the heart?', a: 'SA node', wrong: ['AV node', 'Bundle of His', 'Purkinje fibers'] },
  { q: 'Intrinsic rate of the SA node?', a: '60 to 100 beats/min', wrong: ['40 to 60 beats/min', '20 to 40 beats/min', '100 to 150 beats/min'], std: true },
  { q: 'Intrinsic rate of the AV junction?', a: '40 to 60 beats/min', wrong: ['60 to 100 beats/min', '20 to 40 beats/min', '100 to 150 beats/min'] },
  { q: 'Intrinsic rate of the ventricles?', a: '20 to 40 beats/min', wrong: ['40 to 60 beats/min', '60 to 100 beats/min', '10 to 20 beats/min'], std: true },
  { q: 'Cardiac output equals…', a: 'Stroke volume × heart rate', wrong: ['Stroke volume ÷ heart rate', 'Preload × afterload', 'Blood pressure × heart rate'] },
  { q: 'Starling law: myocardial fibers contract more forcefully when…', a: 'They are stretched (more preload)', wrong: ['Afterload rises', 'The heart rate slows', 'They are hypoxic'] },
  { q: 'Afterload is…', a: 'The pressure in the aorta the LV must pump against', wrong: ['The blood volume returning to the heart', 'The blood ejected each beat', 'The pressure in the right atrium'] },
  { q: 'Resting membrane potential of a cardiac cell?', a: 'About –70 to –90 mV', wrong: ['About +20 to +30 mV', 'About 0 mV', 'About –10 to –20 mV'] },
  { q: 'The sodium-potassium pump moves…', a: '3 sodium out for every 2 potassium in', wrong: ['2 sodium out for every 3 potassium in', '3 potassium out for every 2 sodium in', '1 sodium out for every 1 potassium in'] },
  { q: 'Normal QRS axis?', a: '0° to +90°', wrong: ['0° to –90°', '+90° to ±180°', '–90° to ±180°'] },
  { q: 'Left axis deviation lies between…', a: '0° and –90°', wrong: ['+90° and ±180°', '0° and +90°', '–90° and ±180°'] },
  { q: 'Right axis deviation lies between…', a: '+90° and ±180°', wrong: ['0° and –90°', '0° and +90°', '–90° and ±180°'] },
  { q: 'Two leads used to estimate axis by quadrant?', a: 'Lead I and aVF', wrong: ['Lead II and V1', 'aVR and aVL', 'V1 and V6'] },
  { q: 'Leads that look at the inferior wall?', a: 'II, III, aVF', wrong: ['I, aVL, V5, V6', 'V1, V2', 'V3, V4'], std: true },
  { q: 'Leads that look at the lateral wall?', a: 'I, aVL, V5, V6', wrong: ['II, III, aVF', 'V1, V2', 'V3, V4'], std: true },
  { q: 'Leads that look at the septum?', a: 'V1, V2', wrong: ['V5, V6', 'II, III, aVF', 'I, aVL'], std: true },
  { q: 'Leads that look at the anterior wall?', a: 'V3, V4', wrong: ['V1, V2', 'II, III, aVF', 'I, aVL, V5, V6'], std: true },
  { q: 'Inferior STEMI: which extra leads look for right ventricle involvement?', a: 'Right-sided leads V3R to V6R (V4R)', wrong: ['Posterior leads V7 to V9', 'aVR and aVL', 'Leads V1 and V2 moved up a space'] },
  { q: 'How are posterior leads V7 to V9 placed?', a: 'Move V4 to V6 to the patient\'s back', wrong: ['Mirror V3 to V6 on the right chest', 'Move V1 to V3 up one space', 'Place them on the arms'] },
  { q: 'Bundle branch block: the QRS must be at least…', a: '0.12 second, from a supraventricular rhythm', wrong: ['0.10 second, from any rhythm', '0.20 second, from a ventricular rhythm', '0.08 second, from a sinus rhythm'] },
  { q: 'RSR\' ("rabbit ears") in V1 suggests…', a: 'Right bundle branch block', wrong: ['Left bundle branch block', 'Anterior hemiblock', 'WPW'] },
  { q: 'Deep, wide QS in V1 with a wide QRS suggests…', a: 'Left bundle branch block', wrong: ['Right bundle branch block', 'Posterior MI', 'Brugada syndrome'] },
  { q: 'Anterior hemiblock shows…', a: 'Left axis deviation with a supraventricular rhythm', wrong: ['Right axis deviation', 'A short PR and delta wave', 'Diffuse ST elevation'] },
  { q: 'Common causes of ECG artifact?', a: 'Patient movement, shivering, loose electrodes, poor grounding, 60-cycle (AC) interference', wrong: ['Hyperkalemia and digoxin', 'Bundle branch block', 'Posterior MI'] },
  { q: 'Before placing electrodes, the skin should be…', a: 'Cleaned with alcohol to remove dirt and oil', wrong: ['Shaved and coated with gel', 'Left alone', 'Dried with a towel only'] },
  { q: 'Wide (> 0.12 s) and fast (> 150) in an unstable patient calls for…', a: 'Immediate cardioversion', wrong: ['Adenosine', 'Vagal maneuvers', 'A 12-lead and observation'] },
  { q: 'Five-step infarct recognition, in order?', a: 'Rate and rhythm, area of infarct, other conditions, clinical presentation, recognize and treat', wrong: ['Axis, rate, QRS, ST, T', 'History, vitals, 12-lead, drugs, transport', 'P, PR, QRS, ST, QT'] }
];

// Sodium-potassium pump and cardiac cell electrophysiology (slides 16–24, 27, 175; outline II.G–III),
// plus the calcium points from Chapter 13 (cardiac glycosides) and the drug deck.
// std: true marks standard physiology the slides use but don't spell out.
window.CARDIO_PUMP = {
  // Where the electricity comes from (slide 17).
  spark: 'Charged particles act like small magnets. Pulling opposite charges apart takes energy, and once they are apart they want to rush back together, so the separation stores potential energy, like a charged battery. The Na-K pump spends ATP to keep that separation: lots of Na⁺ outside, lots of K⁺ inside, and the inside more negative than the outside. A heartbeat is the moment channels open and those ions are allowed to rush down their gradients. That flow of charge is the electrical current the ECG picks up.',
  // One beat in a ventricular muscle cell, from rest and back. open: channels open in the diagram;
  // flows: ion movements drawn; mv: inside voltage; inside: the charge drawn along the inner membrane.
  story: [
    { title: 'Charged up at rest', phase: 'Phase 4', mv: -90, inside: 'neg', open: ['k', 'pump'], flows: ['kLeak', 'pump'], ecg: 'Flat baseline (TP segment)', std: true,
      text: 'The pump has stacked Na⁺ outside and K⁺ inside. At rest the membrane lets potassium through easily and sodium barely at all, so a little K⁺ drifts out and leaves negative proteins behind. The inside sits at about –90 mV: the resting membrane potential, recorded from inside the cell.' },
    { title: 'A nudge to threshold', phase: 'Phase 4 → 0', mv: -70, inside: 'neg', open: ['k', 'pump'], flows: ['nbr'], ecg: 'Still baseline', std: true,
      text: 'Positive current spreading from the neighboring cell (through the intercalated discs that join heart cells) makes the inside a little less negative. Once it drifts up to threshold, the fast sodium channels are triggered. It is all or none: below threshold nothing happens, at threshold the cell fires fully.' },
    { title: 'Depolarization: sodium rushes in', phase: 'Phase 0', mv: 20, inside: 'pos', open: ['na', 'pump'], flows: ['naIn'], ecg: 'QRS complex',
      text: 'The fast sodium channels open and Na⁺ floods in down both its concentration gradient and the pull of the negative inside. In about a millisecond the inside swings from negative to positive. That is depolarization: the cell loses its resting charge. It is an electrical event, not the squeeze itself.' },
    { title: 'Plateau: calcium comes in', phase: 'Phase 2', mv: 0, inside: 'pos', open: ['ca', 'k', 'pump'], flows: ['caIn', 'kOut'], ecg: 'ST segment',
      text: 'The sodium channels slam shut (phase 1). The slow channels open and Ca²⁺ trickles in while K⁺ leaks out, so the voltage holds near 0. That calcium is the link between the electrical signal and the muscle: it sets off the release of stored calcium and the cell contracts (see Calcium below).' },
    { title: 'Repolarization: potassium rushes out', phase: 'Phase 3', mv: -85, inside: 'neg', open: ['k', 'pump'], flows: ['kOut'], ecg: 'T wave',
      text: 'The calcium channels close and the potassium channels open wide. K⁺ pours out, carrying positive charge with it, so the inside turns negative again. That is repolarization. Until it is mostly done, the cell is refractory and cannot fire again.' },
    { title: 'Reset: the pump restores the gradients', phase: 'Phase 4', mv: -90, inside: 'neg', open: ['k', 'pump'], flows: ['pump'], ecg: 'Baseline before the next P wave', std: true,
      text: 'The voltage is back, but the ions are in the wrong places: extra Na⁺ inside, K⁺ outside. The Na-K pump moves 3 Na⁺ out for every 2 K⁺ in and returns the cell to its resting state, while calcium is pumped away so the muscle relaxes. The cell is charged up for the next beat.' }
  ],
  // Excitation-contraction coupling, one step per frame of the calcium diagram.
  calcium: [
    { title: 'Trigger calcium enters', text: 'During the plateau (phase 2), the slow channels let a small amount of Ca²⁺ into the cell. On its own it is not enough to squeeze the muscle.', show: ['caIn'], std: true },
    { title: 'Stored calcium floods out', text: 'That trigger calcium opens release channels on the sarcoplasmic reticulum, the cell\'s calcium store, and a much larger burst of Ca²⁺ pours into the cell (calcium-induced calcium release).', show: ['srOut', 'cloud'], std: true },
    { title: 'Calcium switches on the squeeze', text: 'Ca²⁺ binds troponin on the thin actin filaments. That uncovers the binding sites, the myosin heads grab the actin and pull, and the sarcomere shortens. More calcium inside means a stronger contraction.', show: ['cloud', 'bound', 'contract'], std: true },
    { title: 'Calcium removed, muscle relaxes', text: 'Pumps spend ATP to pull Ca²⁺ back into the sarcoplasmic reticulum, and the sodium-calcium exchanger pushes it out of the cell using the sodium gradient the Na-K pump built. Troponin lets go and the muscle relaxes, ready for the next beat.', show: ['srIn', 'ncx'], std: true }
  ],
  // Calcium's two jobs, and where they show up in patients.
  calciumJobs: [
    { name: 'Electrical job', text: 'In the SA and AV nodes there are few fast sodium channels, so the upstroke (phase 0) is carried mostly by Ca²⁺ through the slow channels. In muscle cells, calcium holds up the plateau, which makes the refractory period long enough that the heart can\'t be driven into a sustained cramp.', std: true },
    { name: 'Contractile job', text: 'Calcium turns the electrical signal into a squeeze. Without enough of it you can have electrical activity on the monitor and a weak or absent pulse.', std: true }
  ],
  calciumClinical: [
    { name: 'Calcium channel blockers', text: 'Slow the slow channels, so the SA node fires slower, the AV node conducts slower, and the heart squeezes less hard. That is why diltiazem treats SVT and why an overdose looks like bradycardia, heart block and hypotension.' },
    { name: 'CCB overdose', text: 'Treated with calcium chloride or gluconate, glucagon and atropine in the drug deck. Extra calcium outside pushes more through the channels that are still working.' },
    { name: 'Calcium for hyperkalemia', text: 'Calcium competes with potassium at the cardiac cell membrane and restores conduction (drug deck). It protects the heart from the high potassium for a while but does not lower the potassium. It is also given for hypocalcemia and hypermagnesemia.' },
    { name: 'Digoxin', text: 'Cardiac glycosides block ionic pumps in the membrane, which indirectly increases the calcium reaching the contractile proteins: a stronger squeeze and a slower heart. Because digoxin already loads the cell with calcium, digitalis toxicity is listed as a contraindication to calcium chloride.' },
    { name: 'Low calcium', text: 'Hyperventilation and alkalosis lower ionized calcium. Expect tingling and carpopedal spasm, a long QT (a longer plateau), and weaker contractions.', std: true },
    { name: 'High calcium', text: 'Shortens the plateau, so the QT is short. Calcium chloride is contraindicated in hypercalcemia.', std: true }
  ],
  // The pump cycle, one step per frame of the Learn diagram.
  steps: [
    { title: '3 Na⁺ bind inside', text: 'The pump opens toward the inside of the cell, where sodium is low. Three sodium ions lock onto it.', std: true },
    { title: 'ATP powers the flip', text: 'The pump splits one ATP. The energy flips it to face outside, and the 3 Na⁺ are released into the fluid around the cell, where sodium is already high.', std: true },
    { title: '2 K⁺ bind outside', text: 'Facing out, the pump now grabs two potassium ions from outside the cell, where potassium is low.', std: true },
    { title: '2 K⁺ released inside', text: 'The phosphate drops off, the pump flips back, and the 2 K⁺ are released inside. Net result: 3 positive charges out, 2 in, so the inside stays negative and the cell is reset for the next beat.' }
  ],
  // Fast-response (ventricular muscle) action potential phases.
  phases: [
    { n: 4, name: 'Phase 4: resting', ions: 'Membrane at rest, about –90 mV in a muscle cell. The Na-K pump keeps Na⁺ out and K⁺ in. Pacemaker cells are different: Na⁺ leaks in so they drift up toward threshold on their own (automaticity).', ecg: 'Flat baseline between the T wave and the next P wave', std: false },
    { n: 0, name: 'Phase 0: rapid depolarization', ions: 'Threshold is reached, the fast sodium channels open, and Na⁺ rushes in. The inside swings positive.', ecg: 'QRS complex (in the ventricles)', std: false },
    { n: 1, name: 'Phase 1: early rapid repolarization', ions: 'Fast sodium channels close, sodium stops flowing in, and potassium keeps leaving the cell.', ecg: 'J point, the end of the QRS', std: false },
    { n: 2, name: 'Phase 2: plateau', ions: 'Slow channels let Ca²⁺ in (and some Na⁺) while K⁺ leaves, so the voltage holds steady. That calcium triggers release of stored calcium and the muscle contracts.', ecg: 'ST segment', std: false },
    { n: 3, name: 'Phase 3: rapid repolarization', ions: 'Calcium channels close and K⁺ pours out, so the inside turns negative again. The Na-K pump then restores the original ion balance.', ecg: 'T wave', std: false }
  ],
  refractory: [
    { name: 'Absolute refractory period', text: 'Phase 0 to about the middle of phase 3. The cell cannot respond to any stimulus, however strong.', ecg: 'Start of the QRS to around the peak of the T wave' },
    { name: 'Relative refractory period', text: 'Late phase 3. The cell is harder than normal to excite but a strong enough stimulus can fire it. This is why a PVC landing on the T wave (R on T) can set off VT or VF.', ecg: 'Downslope of the T wave' }
  ],
  // Where each ion is higher; values are typical textbook figures.
  ions: [
    { ion: 'Sodium (Na⁺)', where: 'Outside the cell', role: 'Rushes in through fast channels to start depolarization (phase 0). Pumped back out 3 at a time.', std: true },
    { ion: 'Potassium (K⁺)', where: 'Inside the cell', role: 'Leaks out to repolarize (phases 1 and 3). The membrane is most permeable to it at rest. Pumped back in 2 at a time.', std: true },
    { ion: 'Calcium (Ca²⁺)', where: 'Outside the cell (and stored in the sarcoplasmic reticulum)', role: 'Enters through slow channels: the upstroke in pacemaker cells, the plateau in muscle cells. Then triggers the release of stored calcium, which makes the muscle contract.', std: true },
    { ion: 'Magnesium (Mg²⁺)', where: 'Inside the cell', role: 'Major intracellular cation; it also plays an important role in cardiac function.', std: false }
  ],
  // Bedside connections.
  clinical: [
    { name: 'Ischemia and MI', text: 'The pump runs on ATP. Without oxygen, cells switch to anaerobic metabolism, lose their electrochemical gradients, swell and depolarize. That irritable tissue is where dysrhythmias start.' },
    { name: 'Enhanced automaticity', text: 'Abnormally high leakage of sodium into cells speeds up phase 4, so an ectopic site can fire before the SA node (PACs, PVCs, accelerated rhythms).' },
    { name: 'Hyperkalemia', text: 'Too much potassium outside the cell. Listed in the slides as a cause of sinus arrest and bundle branch block. Classic ECG: tall peaked T waves, then a widening QRS.', std: true },
    { name: 'Hypokalemia', text: 'Too little potassium. Makes the ventricles irritable: listed as a cause of PVCs, VT, and VF and a trigger for Brugada. The slides say to check serum potassium for PVCs and treat hypokalemia promptly.' },
    { name: 'Digoxin (digitalis)', text: 'Slows the Na-K pump, which leaves more calcium in the cell for a stronger squeeze and slows AV conduction. Toxicity shows up in the slides as PACs, PJCs, accelerated junctional rhythm, AV blocks and VT. Low potassium makes toxicity worse.', std: true },
    { name: 'Sodium channel problems', text: 'Brugada syndrome is a genetic sodium channel defect. Sodium channel blocker toxins slow phase 0 and can cause bundle branch block (wide QRS).' },
    { name: 'Calcium channel blockers', text: 'Act on the slow channels. They slow the SA node and AV node, which is why they appear as causes of sinus arrest and heart block and as a treatment for SVT.' }
  ],
  qa: [
    { q: 'The sodium-potassium pump moves…', a: '3 Na⁺ out and 2 K⁺ in per cycle', wrong: ['2 Na⁺ out and 3 K⁺ in per cycle', '3 K⁺ out and 2 Na⁺ in per cycle', '1 Na⁺ out and 1 K⁺ in per cycle'] },
    { q: 'What powers the sodium-potassium pump?', a: 'ATP (active transport)', wrong: ['Diffusion down the concentration gradient', 'The fast sodium channels', 'Calcium released from storage'], std: true },
    { q: 'Why does the pump leave the inside of the cell negative?', a: 'It moves more positive charges out (3) than in (2)', wrong: ['It pumps chloride into the cell', 'It moves more positive charges in than out', 'It blocks all potassium channels'] },
    { q: 'What does the Na-K pump do for the cell after a beat?', a: 'Repolarizes it and returns it to its resting state', wrong: ['Starts phase 0 depolarization', 'Triggers contraction', 'Opens the slow calcium channels'] },
    { q: 'Where is sodium concentration higher at rest?', a: 'Outside the cell', wrong: ['Inside the cell', 'Equal on both sides', 'Inside the sarcoplasmic reticulum'], std: true },
    { q: 'Where is potassium concentration higher at rest?', a: 'Inside the cell', wrong: ['Outside the cell', 'Equal on both sides', 'In the plasma only'], std: true },
    { q: 'At rest, the cell membrane is most permeable to…', a: 'Potassium', wrong: ['Sodium', 'Calcium', 'Magnesium'] },
    { q: 'Resting membrane potential: the inside of the cell is…', a: 'Negative compared with the outside (about –70 to –90 mV)', wrong: ['Positive compared with the outside', 'Equal to the outside (0 mV)', 'About +20 mV'] },
    { q: 'Major intracellular cation that also affects cardiac function?', a: 'Magnesium', wrong: ['Sodium', 'Chloride', 'Calcium'] },
    { q: 'Three major electrolytes that affect cardiac function?', a: 'Calcium, potassium, and sodium', wrong: ['Chloride, bicarbonate, and sodium', 'Magnesium, phosphate, and chloride', 'Potassium, chloride, and glucose'] },
    { q: 'Phase 0 of the action potential is caused by…', a: 'Fast sodium channels opening and Na⁺ rushing in', wrong: ['K⁺ leaving the cell', 'Ca²⁺ entering through slow channels', 'The Na-K pump running'] },
    { q: 'Phase 1 of the action potential?', a: 'Early rapid repolarization: fast Na⁺ channels close, K⁺ keeps leaving', wrong: ['Plateau: Ca²⁺ enters', 'Rapid depolarization: Na⁺ rushes in', 'Resting: pump restores balance'] },
    { q: 'Phase 2 (plateau) of the action potential?', a: 'Ca²⁺ enters through slow channels and triggers contraction', wrong: ['Na⁺ rushes in through fast channels', 'K⁺ pours out and the cell turns negative', 'The cell is at rest'] },
    { q: 'Phase 3 of the action potential?', a: 'Rapid repolarization as K⁺ leaves; the inside turns negative', wrong: ['Rapid depolarization as Na⁺ enters', 'Plateau as Ca²⁺ enters', 'Slow pacemaker depolarization'] },
    { q: 'Phase 4 of the action potential?', a: 'Rest between action potentials (pacemaker cells slowly depolarize)', wrong: ['The rapid upstroke', 'The plateau', 'Early rapid repolarization'] },
    { q: 'What makes pacemaker cells fire on their own?', a: 'Slow phase 4 depolarization up to threshold', wrong: ['A fast phase 0 with no threshold', 'A longer plateau', 'A more negative resting potential'] },
    { q: 'Why is the SA node the chief pacemaker?', a: 'It reaches threshold faster than other pacemaker cells', wrong: ['It has the most cells', 'It is closest to the ventricles', 'It has no refractory period'] },
    { q: 'The slow channels are selective mostly for…', a: 'Calcium (and to a lesser extent sodium)', wrong: ['Potassium', 'Chloride', 'Magnesium'] },
    { q: 'Calcium plays which roles in cardiac cells?', a: 'Electrical and contractile', wrong: ['Only electrical', 'Only contractile', 'Neither; it is only a buffer'] },
    { q: 'Absolute refractory period means the cell…', a: 'Cannot respond to any stimulus', wrong: ['Responds only to a strong stimulus', 'Responds more easily than normal', 'Is at its resting potential'] },
    { q: 'Relative refractory period means the cell…', a: 'Can fire only with a stronger than normal stimulus', wrong: ['Cannot respond at all', 'Fires on its own', 'Is fully repolarized'] },
    { q: 'On the ECG, the relative refractory period falls on…', a: 'The downslope of the T wave', wrong: ['The P wave', 'The QRS complex', 'The PR segment'], std: true },
    { q: 'On the ECG, phase 0 in the ventricles lines up with…', a: 'The QRS complex', wrong: ['The T wave', 'The P wave', 'The ST segment'], std: true },
    { q: 'Enhanced automaticity is commonly caused by…', a: 'Abnormally high leakage of sodium into cells', wrong: ['Potassium leaking into cells', 'Too much ATP', 'A faster Na-K pump'] },
    { q: 'In early MI, cells that lose their electrochemical gradients…', a: 'Swell and depolarize (still reversible at first)', wrong: ['Shrink and hyperpolarize', 'Fire faster but stay normal', 'Immediately turn to scar'] },
    { q: 'Digoxin works by…', a: 'Slowing the Na-K pump so more calcium stays in the cell', wrong: ['Blocking fast sodium channels', 'Blocking beta receptors', 'Opening potassium channels'], std: true },
    { q: 'Which potassium problem makes digoxin toxicity worse?', a: 'Hypokalemia', wrong: ['Hyperkalemia', 'Neither', 'Only hypercalcemia matters'], std: true },
    { q: 'Classic first ECG sign of hyperkalemia?', a: 'Tall, peaked T waves', wrong: ['U waves', 'Delta waves', 'Short QT with J waves'], std: true },
    { q: 'Hypokalemia in the slides is a cause of…', a: 'PVCs, VT and VF', wrong: ['Sinus bradycardia only', 'Pericarditis', 'Wandering atrial pacemaker'] },
    { q: 'Brugada syndrome is a genetic defect in…', a: 'Sodium channels', wrong: ['Potassium channels', 'The Na-K pump', 'Calcium storage'] },
    { q: 'Calcium channel blockers act on which channels?', a: 'The slow channels', wrong: ['The fast sodium channels', 'Potassium leak channels', 'The Na-K pump'] },
    { q: 'Separated particles with opposite charges have…', a: 'A force of attraction, which gives them potential energy', wrong: ['A force that pushes them apart', 'No energy until they touch', 'Kinetic energy only'] },
    { q: 'The resting membrane potential is recorded from…', a: 'Inside the cell', wrong: ['Outside the cell', 'The skin surface', 'The sarcoplasmic reticulum'] },
    { q: 'Why is the inside of a resting cell negative?', a: 'K⁺ leaks out through open channels, leaving negative charges behind, and the pump moves more positive ions out than in', wrong: ['Na⁺ leaks in faster than it is pumped out', 'Calcium is stored inside', 'Chloride is pumped out'], std: true },
    { q: 'Depolarization means…', a: 'Positive ions rush in and the inside loses its negative charge', wrong: ['Potassium leaves and the inside turns more negative', 'The muscle relaxes', 'The pump stops running'] },
    { q: 'Repolarization means…', a: 'The inside returns to negative as K⁺ leaves', wrong: ['Na⁺ rushes in and the inside turns positive', 'Calcium is released from storage', 'The cell contracts'] },
    { q: 'A cardiac cell that reaches threshold…', a: 'Fires a full action potential (all or none)', wrong: ['Fires a small action potential sized to the stimulus', 'Contracts without depolarizing', 'Becomes refractory without firing'], std: true },
    { q: 'How does the impulse pass from one cardiac muscle cell to the next?', a: 'Through intercalated discs (gap junctions) that join the cells', wrong: ['Through nerves to every cell', 'Through the blood', 'Through the sarcoplasmic reticulum'], std: true },
    { q: 'Electrical activity on the monitor without a pulse is…', a: 'PEA: depolarization is happening but the muscle is not squeezing effectively', wrong: ['Asystole', 'Always VF', 'A sign the monitor is broken'], std: true },
    { q: 'The calcium that enters during phase 2 triggers…', a: 'Release of much more calcium from the sarcoplasmic reticulum', wrong: ['The fast sodium channels to open', 'The Na-K pump to stop', 'Potassium to re-enter the cell'], std: true },
    { q: 'Inside the muscle cell, calcium binds to…', a: 'Troponin, uncovering sites so myosin can pull actin', wrong: ['Myosin, which then releases actin', 'The Na-K pump', 'Potassium channels'], std: true },
    { q: 'How is calcium cleared so the heart can relax?', a: 'Pumped back into the sarcoplasmic reticulum and out of the cell (sodium-calcium exchanger)', wrong: ['It diffuses into the blood on its own', 'Potassium binds and neutralizes it', 'The fast sodium channels absorb it'], std: true },
    { q: 'In SA and AV node cells, phase 0 is carried mostly by…', a: 'Ca²⁺ through the slow channels', wrong: ['Na⁺ through fast channels', 'K⁺ leaving the cell', 'The Na-K pump'], std: true },
    { q: 'Why do calcium channel blockers slow the heart rate and AV conduction?', a: 'SA and AV node cells depend on calcium to depolarize', wrong: ['They block the fast sodium channels', 'They speed up the Na-K pump', 'They raise serum potassium'], std: true },
    { q: 'How does calcium help in hyperkalemia with ECG changes?', a: 'It competes with potassium at the cardiac membrane and restores conduction, but does not lower potassium', wrong: ['It drives potassium into the cells', 'It makes the kidneys excrete potassium', 'It binds potassium in the blood'] },
    { q: 'Calcium chloride is contraindicated in…', a: 'Digitalis toxicity', wrong: ['Hyperkalemia', 'Calcium channel blocker overdose', 'Hypermagnesemia'] },
    { q: 'Cardiac glycosides strengthen contraction by…', a: 'Blocking ionic pumps, which indirectly increases calcium to the contractile proteins', wrong: ['Opening fast sodium channels', 'Blocking calcium channels', 'Stimulating beta receptors'] },
    { q: 'Besides calcium, what else does the drug deck list for calcium channel blocker overdose?', a: 'Glucagon and atropine', wrong: ['Adenosine and diltiazem', 'Digoxin and magnesium', 'Amiodarone and lidocaine'] },
    { q: 'Hypocalcemia on the ECG?', a: 'Long QT interval', wrong: ['Short QT interval', 'Peaked T waves', 'Delta waves'], std: true },
    { q: 'What lowers ionized calcium in the field?', a: 'Hyperventilation and alkalosis', wrong: ['Acidosis and hypoventilation', 'Dehydration', 'High potassium'], std: true }
  ]
};

// Electrical conduction system (slides 25–28, 34–40; outline IV.C and VI).
// std: true marks standard anatomy the slides use but don't spell out.
window.CARDIO_CONDUCTION = {
  // One step per stop on the pathway, in firing order. wave: which part of the ECG it makes.
  steps: [
    { id: 'sa', name: 'SA node', where: 'Wall of the right atrium, medial to the opening of the superior vena cava', does: 'The chief pacemaker. It reaches threshold faster than any other pacemaker cells, so its rapid rate keeps the slower pacemakers from taking over.', rate: '60–100/min', ecg: 'Start of the P wave', wave: 'p0', problems: ['sinus-brady', 'sinus-tach', 'sinus-arrhythmia', 'sinus-arrest'] },
    { id: 'atria', name: 'Internodal pathways and atria', where: 'Three internodal pathways run through the right atrium to the AV node; Bachmann\'s bundle carries the impulse across to the left atrium', does: 'Spread the impulse through both atria so they depolarize and contract together.', rate: 'Atrial ectopic sites can fire, but the atria are not a normal backup pacemaker', ecg: 'P wave (atrial depolarization)', wave: 'p', problems: ['pac', 'wap', 'flutter', 'afib'], std: true },
    { id: 'av', name: 'AV node', where: 'Floor of the right atrium, medial to the right AV (tricuspid) valve', does: 'Holds the impulse back briefly so the atria can finish emptying into the ventricles before they contract. With the bundle of His it forms the AV junction, normally the only electrical link between atria and ventricles.', rate: 'AV junction: 40–60/min', ecg: 'Flat PR segment after the P wave (part of the PR interval)', wave: 'pr', problems: ['avb-1', 'avb-2-1', 'svt', 'pjc', 'junctional-escape', 'accel-junctional', 'wpw'] },
    { id: 'his', name: 'Bundle of His', where: 'Passes through a small opening in the heart\'s fibrous skeleton to the top of the interventricular septum', does: 'Carries the impulse from the AV node into the ventricles, then divides into the right and left bundle branches.', rate: 'AV junction: 40–60/min', ecg: 'End of the PR interval', wave: 'pr2', problems: ['avb-2-2', 'avb-3'] },
    { id: 'bb', name: 'Right and left bundle branches', where: 'Down each side of the interventricular septum. The left branch splits into anterior and posterior fascicles', does: 'Carry the impulse to the right and left ventricles at the same time, so both depolarize together.', rate: 'Ventricles: 20–40/min', ecg: 'Start of the QRS complex (septal depolarization)', wave: 'q', problems: ['avb-2-2', 'avb-3'], extra: 'Bundle branch block: a delay in one branch makes the QRS 0.12 s or wider.' },
    { id: 'purkinje', name: 'Purkinje fibers', where: 'A network spreading through the inner walls of both ventricles', does: 'Deliver the impulse to the ventricular muscle cells, which depolarize from the inside out and contract.', rate: 'Ventricles: 20–40/min', ecg: 'QRS complex (ventricular depolarization)', wave: 'qrs', problems: ['pvc', 'vt', 'vf', 'idioventricular'] },
    { id: 'repol', name: 'Ventricles recover', where: 'Ventricular muscle', does: 'The ventricles repolarize so they can fire again. No impulse travels the pathway in this step.', rate: '', ecg: 'ST segment and T wave (ventricular repolarization)', wave: 't', problems: [] }
  ],
  // Where each block happens along the pathway.
  blocks: [
    { name: 'First-degree AV block', where: 'A delay, not a true block, usually at the AV node', id: 'avb-1' },
    { name: 'Second-degree type I (Wenckebach)', where: 'Usually at the AV node', id: 'avb-2-1' },
    { name: 'Second-degree type II', where: 'Usually below the bundle of His', id: 'avb-2-2' },
    { name: 'Third-degree (complete heart block)', where: 'At or below the AV node; no atrial impulses reach the ventricles', id: 'avb-3' },
    { name: 'Bundle branch block', where: 'In the right or left bundle branch, below the bundle of His', id: null }
  ],
  ectopic: [
    { name: 'Ectopic beat', text: 'A contraction started by cells other than the SA node. The new pacemaker is called an ectopic focus.' },
    { name: 'Enhanced automaticity', text: 'An ectopic site depolarizes faster than normal, usually from abnormally high sodium leakage into the cells, and fires before the SA node.' },
    { name: 'Reentry', text: 'The same impulse reactivates tissue a second time because conduction is delayed or blocked in part of the pathway. It is behind most SVTs (AVNRT, and AVRT through an accessory pathway as in WPW).' },
    { name: 'Autonomic control', text: 'Acetylcholine (parasympathetic, vagus nerve) slows the SA and AV nodes; norepinephrine (sympathetic) speeds them. Vagal maneuvers work by boosting the parasympathetic side.' }
  ],
  qa: [
    { q: 'Correct order of the conduction pathway?', a: 'SA node, internodal pathways, AV node, bundle of His, bundle branches, Purkinje fibers', wrong: ['AV node, SA node, bundle of His, Purkinje fibers, bundle branches', 'SA node, bundle of His, AV node, Purkinje fibers, bundle branches', 'SA node, AV node, Purkinje fibers, bundle branches, bundle of His'] },
    { q: 'Where is the SA node?', a: 'Right atrium, medial to the opening of the superior vena cava', wrong: ['Left atrium, near the pulmonary veins', 'Interventricular septum', 'Medial to the mitral valve'] },
    { q: 'Where is the AV node?', a: 'Medial to the right AV (tricuspid) valve', wrong: ['Medial to the superior vena cava', 'At the apex of the left ventricle', 'In the left atrium'] },
    { q: 'The AV junction is made of…', a: 'The AV node and the bundle of His', wrong: ['The SA node and the AV node', 'The bundle branches and Purkinje fibers', 'The internodal pathways and the AV node'] },
    { q: 'In a normal heart, the only electrical link between atria and ventricles is…', a: 'The AV junction', wrong: ['The interatrial septum', 'Bachmann\'s bundle', 'The Purkinje fibers'] },
    { q: 'Why does the AV node delay the impulse?', a: 'So the atria finish emptying into the ventricles before they contract', wrong: ['To let the SA node recharge', 'To speed up ventricular contraction', 'To protect the Purkinje fibers from calcium'], std: true },
    { q: 'Where does the bundle of His divide into the bundle branches?', a: 'At the interventricular septum', wrong: ['In the right atrium', 'At the apex', 'Inside the AV node'] },
    { q: 'The left bundle branch divides into…', a: 'Anterior and posterior fascicles', wrong: ['Right and left fascicles', 'Three internodal pathways', 'Bachmann\'s bundle and the His bundle'], std: true },
    { q: 'What carries the impulse from the right atrium to the left atrium?', a: 'Bachmann\'s bundle', wrong: ['The bundle of His', 'The right bundle branch', 'The Purkinje fibers'], std: true },
    { q: 'Intrinsic rate of the SA node?', a: '60 to 100/min', wrong: ['40 to 60/min', '20 to 40/min', '100 to 150/min'] },
    { q: 'Intrinsic rate of the AV junction?', a: '40 to 60/min', wrong: ['60 to 100/min', '20 to 40/min', '10 to 20/min'] },
    { q: 'Intrinsic rate of the bundle branches and Purkinje fibers?', a: '20 to 40/min', wrong: ['40 to 60/min', '60 to 100/min', '100 to 150/min'] },
    { q: 'Why is the SA node normally in charge?', a: 'It reaches threshold first, so its faster rate overrides slower pacemakers', wrong: ['It is the largest node', 'It is closest to the ventricles', 'It is the only tissue with automaticity'] },
    { q: 'Which part of the pathway makes the P wave?', a: 'SA node firing and atrial depolarization', wrong: ['AV node delay', 'Bundle branches', 'Ventricular repolarization'] },
    { q: 'The PR interval covers conduction through…', a: 'The atria and the AV node up to ventricular depolarization', wrong: ['The ventricles only', 'The SA node only', 'Ventricular repolarization'] },
    { q: 'Which part of the pathway makes the QRS complex?', a: 'Bundle branches and Purkinje fibers depolarizing the ventricles', wrong: ['The SA node', 'The AV node delay', 'Atrial repolarization'] },
    { q: 'First-degree AV block is a delay usually at…', a: 'The AV node', wrong: ['The SA node', 'The bundle branches', 'The Purkinje fibers'] },
    { q: 'Second-degree AV block type II usually occurs…', a: 'Below the bundle of His', wrong: ['At the SA node', 'In the atria', 'In the AV node only'] },
    { q: 'Third-degree AV block is a complete block…', a: 'At or below the AV node', wrong: ['At the SA node', 'In Bachmann\'s bundle', 'Only in the Purkinje fibers'] },
    { q: 'A contraction started by cells other than the SA node is…', a: 'An ectopic beat', wrong: ['A sinus beat', 'A fusion beat only', 'A refractory beat'] },
    { q: 'Reentry happens when…', a: 'An impulse is delayed or blocked and reactivates tissue a second time', wrong: ['The SA node fires twice as fast', 'Sodium leaks into cells', 'The AV node is removed'] },
    { q: 'Which chemical slows the SA and AV nodes?', a: 'Acetylcholine (parasympathetic)', wrong: ['Norepinephrine', 'Epinephrine', 'Dopamine'] },
    { q: 'WPW conducts around the AV node through…', a: 'An accessory pathway (bypass tract)', wrong: ['The bundle of His', 'Bachmann\'s bundle', 'The left posterior fascicle'] }
  ]
};

// 12-lead ECG (slides 30–31, 131–161, 170–177, 231; outline on 12-lead monitoring).
// Pattern ids match js/twelve.js. std: true marks standard ECG criteria the slides use but
// don't spell out (wall and artery maps, most voltage and morphology numbers).
window.CARDIO_TWELVE = {
  groups: [
    { id: 'normal', name: 'Normal' },
    { id: 'stemi', name: 'STEMI by wall' },
    { id: 'acs', name: 'NSTE-ACS, old MI & STEMI equivalent' },
    { id: 'mimic', name: 'STEMI mimic' },
    { id: 'conduction', name: 'Bundle branch blocks & hemiblocks' },
    { id: 'cantmiss', name: 'Five can\'t miss' }
  ],
  // What each lead looks at. type: how it is recorded.
  leads: [
    { id: 'I', type: 'Standard limb (bipolar)', view: 'Lateral', wall: 'lateral' },
    { id: 'II', type: 'Standard limb (bipolar)', view: 'Inferior', wall: 'inferior' },
    { id: 'III', type: 'Standard limb (bipolar)', view: 'Inferior', wall: 'inferior' },
    { id: 'aVR', type: 'Augmented limb (unipolar)', view: 'Right upper side, looks into the cavity; not assigned to a wall', wall: null },
    { id: 'aVL', type: 'Augmented limb (unipolar)', view: 'High lateral', wall: 'lateral' },
    { id: 'aVF', type: 'Augmented limb (unipolar)', view: 'Inferior', wall: 'inferior' },
    { id: 'V1', type: 'Precordial (unipolar)', view: 'Septum; the only standard lead facing the right ventricle', wall: 'septal' },
    { id: 'V2', type: 'Precordial (unipolar)', view: 'Septum', wall: 'septal' },
    { id: 'V3', type: 'Precordial (unipolar)', view: 'Anterior', wall: 'anterior' },
    { id: 'V4', type: 'Precordial (unipolar)', view: 'Anterior', wall: 'anterior' },
    { id: 'V5', type: 'Precordial (unipolar)', view: 'Low lateral', wall: 'lateral' },
    { id: 'V6', type: 'Precordial (unipolar)', view: 'Low lateral', wall: 'lateral' },
    { id: 'V4R', type: 'Right-sided chest lead', view: 'Right ventricle', wall: 'rv' },
    { id: 'V7', type: 'Posterior chest lead', view: 'Posterior wall', wall: 'posterior' },
    { id: 'V8', type: 'Posterior chest lead', view: 'Posterior wall', wall: 'posterior' },
    { id: 'V9', type: 'Posterior chest lead', view: 'Posterior wall', wall: 'posterior' }
  ],
  // Which leads face each wall, the usual culprit artery, and where the mirror image shows.
  walls: [
    { id: 'inferior', name: 'Inferior', leads: ['II', 'III', 'aVF'], recip: ['I', 'aVL'], artery: 'Right coronary artery (most often)', std: true },
    { id: 'septal', name: 'Septal', leads: ['V1', 'V2'], recip: [], artery: 'Left anterior descending (septal branches)', std: true },
    { id: 'anterior', name: 'Anterior', leads: ['V3', 'V4'], recip: ['II', 'III', 'aVF'], artery: 'Left anterior descending', std: true },
    { id: 'lateral', name: 'Lateral', leads: ['I', 'aVL', 'V5', 'V6'], recip: ['II', 'III', 'aVF'], artery: 'Circumflex (or a diagonal branch of the LAD)', std: true },
    { id: 'posterior', name: 'Posterior', leads: ['V7', 'V8', 'V9'], recip: ['V1', 'V2', 'V3'], artery: 'Circumflex or right coronary artery', std: true },
    { id: 'rv', name: 'Right ventricle', leads: ['V4R', 'V1'], recip: [], artery: 'Right coronary artery (proximal)', std: true }
  ],
  // Patterns you can draw. leads: where the finding is (highlighted after you answer); recip: mirror-image leads.
  patterns: [
    { id: 'normal', name: 'Normal 12-lead', group: 'normal', leads: [], recip: [],
      find: ['Sinus rhythm, PR 0.12–0.20 s, QRS under 0.12 s', 'Axis 0° to +90°: QRS upright in I and aVF', 'R waves grow from V1 to V6 (small r in V1, tall R in V5 and V6)', 'No ST elevation or depression; T waves upright except aVR (and sometimes V1, III)'],
      std: true },
    { id: 'inferior', name: 'Inferior STEMI', group: 'stemi', wall: 'inferior', leads: ['II', 'III', 'aVF'], recip: ['I', 'aVL'], topic: 'ami',
      find: ['ST elevation in II, III and aVF', 'Reciprocal ST depression in aVL (and I)', 'Usually the right coronary artery', 'Get right-sided leads (V4R) to check the right ventricle'] },
    { id: 'inferior-rv', name: 'Inferior STEMI with RV involvement', group: 'stemi', wall: 'rv', leads: ['II', 'III', 'aVF', 'V1', 'V4R'], recip: ['I', 'aVL'], extra: true, topic: 'ami',
      find: ['ST elevation in II, III and aVF, greatest in III', 'ST elevation in V1, the only standard lead facing the right ventricle', 'ST elevation in V4R on the right-sided ECG', 'Preload-dependent: be careful with nitrates; fluids may be needed for hypotension'],
      std: true },
    { id: 'anterior', name: 'Anterior STEMI', group: 'stemi', wall: 'anterior', leads: ['V3', 'V4'], recip: ['III', 'aVF'], topic: 'ami',
      find: ['ST elevation in V3 and V4 (often spreading to V2 and V5)', 'Tall, broad (hyperacute) T waves', 'Left anterior descending artery', 'Large infarct: watch for pump failure, new BBB and AV block'],
      std: true },
    { id: 'septal', name: 'Septal STEMI', group: 'stemi', wall: 'septal', leads: ['V1', 'V2'], recip: [], topic: 'ami',
      find: ['ST elevation in V1 and V2', 'Septal branches of the LAD', 'The septum carries the bundle branches: watch for new BBB and type II or third-degree block'],
      std: true },
    { id: 'lateral', name: 'Lateral STEMI', group: 'stemi', wall: 'lateral', leads: ['I', 'aVL', 'V5', 'V6'], recip: ['III', 'aVF'], topic: 'ami',
      find: ['ST elevation in I, aVL, V5 and V6', 'Reciprocal ST depression in III and aVF', 'Circumflex artery (or a diagonal of the LAD)'],
      std: true },
    { id: 'posterior', name: 'Posterior STEMI', group: 'stemi', wall: 'posterior', leads: ['V1', 'V2', 'V3', 'V7', 'V8', 'V9'], recip: [], extra: true, topic: 'ami',
      find: ['Horizontal ST depression in V1–V3', 'Tall, upright T waves in V1–V3', 'Tall, wide R wave; R:S ratio greater than 1 in V1–V2', 'ST elevation in posterior leads V7–V9 (move V4–V6 to the back)', 'Often with an inferior or lateral MI'] },
    { id: 'anterolateral', name: 'Anterolateral STEMI', group: 'stemi', wall: 'anterolateral', leads: ['V3', 'V4', 'V5', 'V6', 'I', 'aVL'], recip: ['III', 'aVF'], topic: 'ami',
      find: ['ST elevation in V3–V6 plus I and aVL', 'Reciprocal ST depression in III and aVF', 'Proximal left anterior descending artery: a big territory', 'High risk of pump failure and cardiogenic shock'],
      std: true },
    { id: 'inferolateral', name: 'Inferolateral STEMI', group: 'stemi', wall: 'inferolateral', leads: ['II', 'III', 'aVF', 'V5', 'V6'], recip: ['aVL'], topic: 'ami',
      find: ['ST elevation in II, III and aVF plus V5 and V6', 'Reciprocal ST depression in aVL', 'Right coronary artery or circumflex', 'Get V4R and V7–V9: the RV and posterior wall are often involved'],
      std: true },
    { id: 'inferoposterior', name: 'Inferoposterior STEMI', group: 'stemi', wall: 'inferoposterior', leads: ['II', 'III', 'aVF', 'V1', 'V2', 'V3', 'V7', 'V8', 'V9'], recip: ['aVL'], extra: true, topic: 'ami',
      find: ['ST elevation in II, III and aVF', 'ST depression with tall R and upright T in V1–V3: the posterior wall seen backward', 'ST elevation in V7–V9 confirms the posterior wall', 'Right coronary artery or circumflex'] },
    { id: 'ischemia', name: 'Ischemic ST depression (NSTE-ACS)', group: 'acs', leads: ['II', 'aVF', 'V4', 'V5', 'V6', 'I'], recip: ['aVR'], topic: 'acs',
      find: ['Horizontal or downsloping ST depression in several leads', 'No ST elevation except possibly aVR', 'Unstable angina or NSTEMI: still ACS, treat as an evolving AMI', 'Depression that is greatest in V1–V3 may be a posterior STEMI: get V7–V9'] },
    { id: 'wellens', name: 'Deep T-wave inversion V2–V3 (Wellens pattern)', group: 'acs', leads: ['V2', 'V3', 'V4'], recip: [], topic: 'acs',
      find: ['Deep, symmetric T-wave inversion in V2–V3 (often V4)', 'Little or no ST elevation, no Q waves, R waves kept', 'Often seen when the pain has eased', 'Warns of a critical narrowing of the LAD: high risk of a large anterior MI'],
      std: true },
    { id: 'old-inferior', name: 'Old inferior MI (Q waves)', group: 'acs', leads: ['II', 'III', 'aVF'], recip: [], topic: 'ami',
      find: ['Pathologic Q waves in II, III and aVF: 0.04 s wide or a third of the R height', 'ST segments back at baseline', 'The infarct has scarred (about 8 weeks); compare with an old ECG', 'Q waves alone do not mean an acute MI'],
      std: true },
    { id: 'sgarbossa', name: 'LBBB meeting Sgarbossa criteria', group: 'acs', leads: ['I', 'aVL', 'V5', 'V6', 'V1', 'V2', 'V3'], recip: [], topic: 'bbb',
      find: ['LBBB: wide QRS, QS in V1, broad R in I, aVL, V6', 'Concordant ST elevation ≥ 1 mm where the QRS is upright (I, aVL, V5, V6)', 'Concordant ST depression ≥ 1 mm in V1–V3', 'Meets Sgarbossa: treated as a STEMI equivalent in many systems'],
      std: true },
    { id: 'pericarditis', name: 'Pericarditis', group: 'mimic', leads: ['I', 'II', 'aVF', 'V2', 'V3', 'V4', 'V5', 'V6'], recip: ['aVR'], topic: 'pericarditis',
      find: ['Diffuse ST elevation across many walls, not one territory', 'PR-segment depression', 'aVR shows the opposite: ST depression and PR elevation', 'No reciprocal ST depression in the other leads', 'Sharp pain, worse lying flat, better sitting up and leaning forward'] },
    { id: 'rbbb', name: 'Right bundle branch block', group: 'conduction', leads: ['V1', 'V2', 'I', 'V6'], recip: [], topic: 'bbb',
      find: ['QRS 0.12 s or wider from a supraventricular rhythm', 'RSR\' ("rabbit ears") in V1 and V2', 'Wide, slurred S wave in I and V6', 'T waves opposite the R\' in V1–V3', 'Turn signal: QRS in V1 points up = right'] },
    { id: 'lbbb', name: 'Left bundle branch block', group: 'conduction', leads: ['V1', 'V2', 'I', 'aVL', 'V6'], recip: [], topic: 'bbb',
      find: ['QRS 0.12 s or wider from a supraventricular rhythm', 'Deep, wide QS (or rS) in V1', 'Broad, notched or slurred R in I, aVL and V6, with no septal q', 'ST and T go opposite the QRS (discordant)', 'Turn signal: QRS in V1 points down = left', 'New LBBB with chest pain may be ACS; Sgarbossa criteria = STEMI equivalent in many systems'] },
    { id: 'lah', name: 'Left anterior hemiblock', group: 'conduction', leads: ['I', 'II', 'aVF'], recip: [], topic: 'bbb',
      find: ['Left axis deviation (pathologic, beyond –30°) with a supraventricular rhythm', 'QRS up in I, down in II, III and aVF', 'QRS is not wide', 'More common than posterior hemiblock: the anterior fascicle is long and thin, supplied by the LAD'] },
    { id: 'lph', name: 'Left posterior hemiblock', group: 'conduction', leads: ['I', 'aVF'], recip: [], topic: 'bbb',
      find: ['Right axis deviation (+90° to ±180°): QRS down in I, up in aVF', 'QRS is not wide', 'Rare: the posterior fascicle is thick with a double blood supply', 'Call it only after ruling out other causes of right axis (RV strain, lateral MI)'],
      std: true },
    { id: 'bifasc', name: 'Bifascicular block (RBBB + anterior hemiblock)', group: 'conduction', leads: ['V1', 'I', 'II', 'aVF'], recip: [], topic: 'bbb',
      find: ['RBBB pattern: wide QRS, RSR\' in V1', 'Plus left axis deviation (anterior hemiblock)', 'Two of the three fascicles blocked: only the posterior fascicle is left', 'Higher risk of complete heart block; have pacing ready'] },
    { id: 'wpw', name: 'Wolff-Parkinson-White (WPW)', group: 'cantmiss', leads: ['I', 'II', 'aVL', 'V4', 'V5', 'V6'], recip: [], rhythm: 'wpw',
      find: ['Short PR interval (under 0.12 s)', 'Delta wave: slurred upstroke at the start of the QRS', 'Slightly wide QRS', 'Avoid AV nodal blockers (adenosine, beta blockers, calcium channel blockers) in WPW tachycardia; treat wide-complex tachycardia as VT'] },
    { id: 'brugada', name: 'Brugada syndrome', group: 'cantmiss', leads: ['V1', 'V2'], recip: [], topic: 'brugada',
      find: ['Coved ST elevation over 2 mm in V1 and V2', 'ST slopes down into an inverted T wave', 'Sodium channel defect; may only show with fever, drugs or ischemia', 'Risk of VT/VF and sudden death; treated with an ICD'] },
    { id: 'long-qt', name: 'Long QT syndrome', group: 'cantmiss', leads: ['II', 'V2', 'V3', 'V5'], recip: [], topic: 'long-qt',
      find: ['QTc over 450 ms (males) or 460 ms (females)', 'T wave ends far from the QRS: more than half the R-R interval is a quick warning sign', 'Risk of torsades de pointes and sudden death', 'Look for causes: drugs, low potassium or magnesium'] },
    { id: 'hocm', name: 'Hypertrophic obstructive cardiomyopathy (HOCM)', group: 'cantmiss', leads: ['I', 'aVL', 'V5', 'V6', 'II', 'III', 'aVF', 'V2'], recip: [], topic: 'hocm',
      find: ['Very tall QRS voltage (left ventricular hypertrophy)', 'Deep, narrow "dagger" Q waves in the lateral (I, aVL, V5, V6) and inferior leads', 'Lateral T-wave inversion (strain)', 'Think of it in a young patient with syncope during exertion'],
      std: true },
    { id: 'arvd', name: 'Arrhythmogenic RV dysplasia (ARVD)', group: 'cantmiss', leads: ['V1', 'V2', 'V3'], recip: [], topic: 'arvd',
      find: ['T-wave inversion in V1–V3', 'Epsilon wave: a small notch just after the QRS in V1–V2', 'Fatty tissue replaces the RV wall; risk of VT from the right ventricle'],
      std: true }
  ],
  // Axis by leads I and aVF, with II to split physiologic from pathologic left axis (slides 138–141).
  axis: [
    { id: 'normal', name: 'Normal', range: '0° to +90°', I: 'up', aVF: 'up', II: 'up', range2: [0, 90] },
    { id: 'phys-left', name: 'Physiologic left', range: '0° to –30°', I: 'up', aVF: 'down', II: 'up', note: 'May be normal in some patients', range2: [-30, 0] },
    { id: 'path-left', name: 'Pathologic left', range: '–30° to –90°', I: 'up', aVF: 'down', II: 'down', note: 'Anterior hemiblock is the classic cause', range2: [-90, -30] },
    { id: 'right', name: 'Right', range: '+90° to ±180°', I: 'down', aVF: 'up', II: 'either', note: 'Posterior hemiblock, RV strain, lateral MI', range2: [90, 180] },
    { id: 'extreme', name: 'Indeterminate ("no man\'s land")', range: '–90° to ±180°', I: 'down', aVF: 'down', II: 'down', note: 'Think ventricular rhythm or lead reversal', range2: [-180, -90] }
  ],
  // Five-step analysis for infarct recognition (slide 147).
  steps: [
    { name: 'Identify rate and rhythm', text: 'Is the rhythm stable? Treat dangerous dysrhythmias first.' },
    { name: 'Identify area of infarct', text: 'Look for ST elevation in two or more leads that face the same wall, and reciprocal depression across from it.' },
    { name: 'Consider other conditions', text: 'Bundle branch blocks, pericarditis, ventricular hypertrophy, WPW, paced rhythms and early repolarization can mimic or hide an infarct.' },
    { name: 'Assess the clinical presentation', text: 'Chest pain, diaphoresis, shortness of breath, nausea; silent MI in older, diabetic and female patients.' },
    { name: 'Recognize infarction and initiate care', text: 'Transmit the 12-lead, alert a PCI-capable hospital, and treat per protocol.' }
  ],
  // ECG classes of ACS (slide 146).
  classes: [
    { name: 'STEMI', text: 'ST elevation in two or more contiguous leads (standard threshold: 1 mm in most leads, more in V2–V3), or new LBBB meeting Sgarbossa criteria' },
    { name: 'NSTE-ACS', text: 'Unstable angina and NSTEMI: ischemic ST depression or T-wave inversion' },
    { name: 'Stable angina', text: 'Pain with exertion that goes away with rest; ECG may be normal between episodes' },
    { name: 'Nondiagnostic or normal', text: 'A normal 12-lead does not rule out ACS: repeat it, especially if symptoms change' }
  ],
  // Getting a good 12-lead (slides 31–32, 150; standard placement).
  placement: [
    { lead: 'V1', where: '4th intercostal space, right sternal border', std: true },
    { lead: 'V2', where: '4th intercostal space, left sternal border', std: true },
    { lead: 'V3', where: 'Halfway between V2 and V4', std: true },
    { lead: 'V4', where: '5th intercostal space, left midclavicular line', std: true },
    { lead: 'V5', where: 'Anterior axillary line, level with V4', std: true },
    { lead: 'V6', where: 'Midaxillary line, level with V4', std: true },
    { lead: 'V3R–V6R', where: 'Mirror image of V3–V6 on the right chest' },
    { lead: 'V7–V9', where: 'Move V4–V6 to the back: posterior axillary line (V7), below the scapula tip (V8), beside the spine (V9)' }
  ],
  qa: [
    { q: 'How is the 12-lead printed?', a: 'In four columns: I–III, aVR–aVF, V1–V3, V4–V6, plus a rhythm strip', wrong: ['One lead per page', 'Two columns of six leads', 'Three columns of four chest leads'] },
    { q: 'Why do paramedics acquire 12-leads?', a: 'It changes transport decisions, treatment and predicts who will become unstable', wrong: ['To replace the cardiac monitor', 'Only to measure the heart rate', 'Only for patients in cardiac arrest'] },
    { q: 'The 12-lead is the standard in most ALS systems for…', a: 'Chest pain of suspected cardiac origin', wrong: ['Every patient transported', 'Trauma patients only', 'Patients in VF'] },
    { q: 'The precordial leads record the heart in which plane?', a: 'The horizontal plane', wrong: ['The frontal plane', 'The sagittal plane', 'No plane: they are bipolar'] },
    { q: 'Which leads are bipolar?', a: 'The three standard limb leads (I, II, III)', wrong: ['aVR, aVL and aVF', 'V1 to V6', 'All 12 leads'] },
    { q: 'ST elevation in II, III and aVF points to which wall?', a: 'Inferior', wrong: ['Lateral', 'Anterior', 'Septal'] },
    { q: 'ST elevation in I, aVL, V5 and V6 points to which wall?', a: 'Lateral', wrong: ['Inferior', 'Septal', 'Posterior'] },
    { q: 'ST elevation in V3 and V4 points to which wall?', a: 'Anterior', wrong: ['Inferior', 'Lateral', 'Right ventricle'] },
    { q: 'ST elevation in V1 and V2 points to which wall?', a: 'Septal', wrong: ['Lateral', 'Inferior', 'High lateral'] },
    { q: 'Inferior STEMI: where do you look for reciprocal depression?', a: 'aVL (and I)', wrong: ['V1 and V2', 'V5 and V6', 'aVR only'], std: true },
    { q: 'Inferior MI is usually caused by a blockage in the…', a: 'Right coronary artery', wrong: ['Left anterior descending', 'Circumflex', 'Left main'], std: true },
    { q: 'Anterior and septal MIs come from the…', a: 'Left anterior descending artery', wrong: ['Right coronary artery', 'Circumflex', 'Posterior descending artery'], std: true },
    { q: 'RV infarct: ST elevation in the inferior leads is greatest in…', a: 'Lead III', wrong: ['Lead II', 'aVF', 'aVL'] },
    { q: 'The only standard 12-lead lead that faces the right ventricle?', a: 'V1', wrong: ['V6', 'aVL', 'Lead I'] },
    { q: 'Posterior MI on a standard 12-lead shows in V1–V3 as…', a: 'Horizontal ST depression, tall upright T, tall wide R', wrong: ['ST elevation and Q waves', 'RSR\' with inverted T', 'Delta waves'] },
    { q: 'Right-sided leads V3R–V6R are placed…', a: 'Mirror image of the standard precordial leads on the right chest', wrong: ['On the back below the scapula', 'On both arms', 'One space above the standard leads'] },
    { q: 'Four ECG classes of chest pain patients?', a: 'STEMI, NSTE-ACS, stable angina, nondiagnostic or normal', wrong: ['Inferior, anterior, lateral, posterior', 'RBBB, LBBB, LAH, LPH', 'Sinus, atrial, junctional, ventricular'] },
    { q: 'NSTE-ACS includes…', a: 'Unstable angina and NSTEMI', wrong: ['STEMI and stable angina', 'Pericarditis and myocarditis', 'Only STEMI'] },
    { q: 'Injured heart muscle stays depolarized and produces…', a: 'ST-segment elevation', wrong: ['A short PR interval', 'A delta wave', 'U waves'] },
    { q: 'ST elevation in nearly every lead with PR depression suggests…', a: 'Pericarditis', wrong: ['Inferior STEMI', 'Left bundle branch block', 'Long QT'] },
    { q: 'Bundle branch blocks happen…', a: 'Below the bifurcation of the bundle of His', wrong: ['In the SA node', 'In the AV node', 'In the internodal pathways'] },
    { q: 'Why does detecting a bundle branch block matter?', a: 'Higher risk of severe bradycardia and third-degree block', wrong: ['It always needs cardioversion', 'It rules out an MI', 'It means the patient is in VT'] },
    { q: 'Common causes of bundle branch block?', a: 'Cardiomyopathy, hypertrophy, anterior MI, aortic stenosis, hyperkalemia, digoxin', wrong: ['Hypoglycemia and stroke', 'Asthma and COPD', 'Dehydration only'] },
    { q: 'Treatment for a long-standing bundle branch block?', a: 'None specific', wrong: ['Amiodarone', 'Synchronized cardioversion', 'Transcutaneous pacing'] },
    { q: 'New LBBB with chest pain meeting Sgarbossa criteria is treated as…', a: 'A STEMI equivalent', wrong: ['Stable angina', 'Normal', 'Pericarditis'] },
    { q: 'Bifascicular block usually means…', a: 'RBBB plus an anterior or posterior hemiblock', wrong: ['LBBB plus first-degree block', 'Two separate MIs', 'Both atria blocked'] },
    { q: 'Which hemiblock is more common, and why?', a: 'Anterior: its fascicle is long and thin with one blood supply (LAD)', wrong: ['Posterior: it is thinner', 'Posterior: it has no blood supply', 'They are equally common'] },
    { q: 'QRS up in I and down in aVF: axis is…', a: 'Left (0° to –90°)', wrong: ['Normal', 'Right', 'Indeterminate'] },
    { q: 'QRS down in I and up in aVF: axis is…', a: 'Right (+90° to ±180°)', wrong: ['Normal', 'Left', 'Indeterminate'] },
    { q: 'QRS down in both I and aVF: axis is…', a: 'Indeterminate ("no man\'s land")', wrong: ['Normal', 'Left', 'Right'] },
    { q: 'Left axis with QRS still upright in II is…', a: 'Physiologic left axis (0° to –30°)', wrong: ['Pathologic left axis', 'Right axis', 'Indeterminate axis'] },
    { q: 'Why use leads I and aVF for axis?', a: 'They are perpendicular to each other', wrong: ['They are the tallest leads', 'They face the septum', 'They are both bipolar'] },
    { q: 'Stable wide-complex tachycardia: what helps sort VT from other rhythms?', a: 'A 12-lead ECG', wrong: ['A single lead II strip', 'Blood pressure alone', 'Pulse oximetry'] },
    { q: '"Five can\'t miss" ECG findings in palpitations or syncope?', a: 'WPW, Brugada, long QT, HOCM, ARVD', wrong: ['RBBB, LBBB, LAH, LPH, bifascicular', 'Inferior, anterior, lateral, posterior, septal', 'AF, flutter, SVT, VT, VF'] },
    { q: 'Coved ST elevation over 2 mm in V1–V2 is…', a: 'Brugada syndrome', wrong: ['Septal STEMI only', 'RBBB', 'WPW'] },
    { q: 'Short PR with a delta wave is…', a: 'WPW', wrong: ['First-degree AV block', 'Long QT', 'Brugada syndrome'] },
    { q: 'Deep, narrow "dagger" Q waves in the lateral leads of a young athlete suggest…', a: 'HOCM', wrong: ['Old inferior MI', 'Pericarditis', 'Long QT'], std: true },
    { q: 'T inversion in V1–V3 with an epsilon wave suggests…', a: 'ARVD', wrong: ['WPW', 'Anterior STEMI', 'Hyperkalemia'], std: true },
    { q: 'After ROSC, the 12-lead should be done…', a: 'As soon as possible, to look for STEMI and need for PCI', wrong: ['Only at the hospital', 'Only if the patient wakes up', 'After 24 hours'] }
  ]
};

// MI on the 12-lead (slides 146–151, 170–177; outline XIX–XXI and the MI section).
// std: true marks standard ECG teaching the slides use but don't spell out.
window.CARDIO_MI = {
  // Where the MI is: answers for "Where is this MI?". pids: drawn patterns that show it.
  territories: [
    { id: 'inferior', name: 'Inferior', pids: ['inferior'], leads: 'II, III, aVF', recip: 'aVL, I', artery: 'Right coronary artery (most often)', watch: 'Bradycardia and AV blocks; check V4R for RV involvement', std: true },
    { id: 'rv', name: 'Inferior with right ventricle', pids: ['inferior-rv'], leads: 'II, III, aVF (greatest in III), V1, V4R', recip: 'aVL, I', artery: 'Proximal right coronary artery', watch: 'Hypotension with clear lung fields; RBBB and second- or third-degree AV block; preload-dependent' },
    { id: 'septal', name: 'Septal', pids: ['septal'], leads: 'V1, V2', recip: '–', artery: 'Left anterior descending (septal branches)', watch: 'New bundle branch block, type II and third-degree block', std: true },
    { id: 'anterior', name: 'Anterior', pids: ['anterior'], leads: 'V3, V4', recip: 'II, III, aVF', artery: 'Left anterior descending', watch: 'Pump failure, heart failure, cardiogenic shock', std: true },
    { id: 'lateral', name: 'Lateral', pids: ['lateral'], leads: 'I, aVL, V5, V6', recip: 'II, III, aVF', artery: 'Circumflex (or a diagonal of the LAD)', watch: 'Often part of a larger anterior or inferior MI', std: true },
    { id: 'anterolateral', name: 'Anterolateral', pids: ['anterolateral'], leads: 'V3–V6, I, aVL', recip: 'III, aVF', artery: 'Proximal LAD', watch: 'Large infarct: shock, VF, heart failure', std: true },
    { id: 'inferolateral', name: 'Inferolateral', pids: ['inferolateral'], leads: 'II, III, aVF, V5, V6', recip: 'aVL', artery: 'Right coronary or circumflex', watch: 'Check V4R and V7–V9', std: true },
    { id: 'posterior', name: 'Posterior', pids: ['posterior'], leads: 'V7–V9 (ST depression, tall R, upright T in V1–V3)', recip: 'V1–V3', artery: 'Circumflex or right coronary', watch: 'Easy to miss: ST depression in V1–V3 is the clue' },
    { id: 'inferoposterior', name: 'Inferoposterior', pids: ['inferoposterior'], leads: 'II, III, aVF, V7–V9', recip: 'aVL, V1–V3', artery: 'Right coronary or circumflex', watch: 'Larger infarct than inferior alone', std: true }
  ],
  // How a STEMI changes over time. id matches the generator's stage.
  stages: [
    { id: 'hyperacute', name: 'Hyperacute T waves', when: 'First minutes', ecg: 'Tall, broad T waves in the leads facing the blocked artery; the ST is just starting to lift', std: true },
    { id: 'acute', name: 'ST elevation', when: 'Minutes to hours', ecg: 'ST elevation in the facing leads, reciprocal depression across from them. Injured muscle stays depolarized (slide 146). Still salvageable: time is muscle' },
    { id: 'evolving', name: 'Q waves form', when: 'Hours', ecg: 'Pathologic Q waves appear and R waves shrink as muscle dies; ST still elevated', std: true },
    { id: 'inverted', name: 'T waves invert', when: 'Hours to days', ecg: 'ST returns toward baseline, T waves turn over; Q waves stay', std: true },
    { id: 'old', name: 'Old (healed) MI', when: 'Weeks on', ecg: 'Q waves remain as the scar\'s signature; ST and T back near normal. Scar replaces the infarct in about 8 weeks (slides)' }
  ],
  // Ischemia, injury, infarction.
  zones: [
    { name: 'Ischemia', ecg: 'ST depression or T-wave inversion', meaning: 'Not enough oxygen; cells switch to anaerobic metabolism (lactic acid, CO2): the cause of angina. Reversible.', std: true },
    { name: 'Injury', ecg: 'ST elevation', meaning: 'Cells swell and stay depolarized. Can still be saved if flow is restored quickly.' },
    { name: 'Infarction', ecg: 'Pathologic Q waves', meaning: 'Muscle has died; scar replaces it. Surviving tissue at the edge can start dysrhythmias.', std: true }
  ],
  // STEMI criteria (standard; the slides say "ST elevation" without numbers).
  criteria: [
    { name: 'Where', text: 'ST elevation in two or more contiguous leads (leads that look at the same wall)', std: true },
    { name: 'How much', text: '1 mm or more in most leads; in V2–V3 at least 2 mm in men 40 and over, 2.5 mm in men under 40, 1.5 mm in women', std: true },
    { name: 'Measured', text: 'At the J point, against the baseline (the TP or PR segment)', std: true },
    { name: 'Reciprocal changes', text: 'ST depression in leads facing the opposite wall makes a true STEMI more likely; diffuse elevation with no reciprocal change points to a mimic like pericarditis', std: true }
  ],
  // Sort the tracing. Answers for "How would you classify this 12-lead?".
  classes: [
    { id: 'stemi', name: 'STEMI', pids: ['inferior', 'anterior', 'lateral', 'septal', 'anterolateral', 'inferolateral'] },
    { id: 'equiv', name: 'STEMI equivalent', pids: ['sgarbossa', 'posterior'] },
    { id: 'nste', name: 'NSTE-ACS (ischemia)', pids: ['ischemia', 'wellens'] },
    { id: 'old', name: 'Old MI', pids: ['old-inferior'] },
    { id: 'normal', name: 'Normal or nondiagnostic', pids: ['normal'] },
    { id: 'mimic', name: 'STEMI mimic', pids: ['pericarditis'] }
  ],
  // STEMI equivalents and mimics.
  equivalents: [
    { name: 'Posterior STEMI', text: 'ST depression, tall R and upright T in V1–V3; confirm with ST elevation in V7–V9' },
    { name: 'LBBB with Sgarbossa criteria', text: 'LBBB alone is no longer called a STEMI equivalent because in the field you can\'t tell new from old. It is treated as one when it meets Sgarbossa: concordant ST elevation ≥ 1 mm, concordant ST depression ≥ 1 mm in V1–V3, or discordant ST elevation ≥ 5 mm (criteria std)' },
    { name: 'Right ventricular infarct', text: 'Inferior STEMI with ST elevation in V1 and V4R; outline adds RBBB, second- or third-degree block, and hypotension with clear lungs' }
  ],
  mimics: [
    { name: 'Pericarditis', text: 'Diffuse ST elevation, PR depression, no reciprocal depression (aVR aside)' },
    { name: 'LBBB and paced rhythms', text: 'ST is normally opposite the QRS; use Sgarbossa', std: true },
    { name: 'Left ventricular hypertrophy', text: 'Tall voltage with ST changes opposite the QRS (strain)', std: true },
    { name: 'Early repolarization', text: 'Young, healthy patients: mild concave ST elevation with a notched J point, stable over time', std: true },
    { name: 'Brugada', text: 'Coved ST elevation only in V1–V2' },
    { name: 'WPW', text: 'Delta waves can mimic Q waves and ST changes' }
  ],
  // Field care from the slides and outline.
  care: [
    'Assume anginal chest pain is an AMI until proven otherwise',
    'Get a 12-lead early, transmit it, and interpret it; repeat it if symptoms change',
    'Recognize STEMI promptly and triage to the right (PCI-capable) hospital',
    'Goals: limit how much muscle dies, preserve LV function, prevent heart failure and major cardiac events, treat life-threatening complications',
    'Death in the first week or two: lethal dysrhythmias, pump failure, or rupture of the ventricle, septum or papillary muscle',
    'Fibrinolytics in the field only with checklists, 12-lead transmission, medical direction and quality review',
    'Inferior MI: get V4R; RV infarct with hypotension and clear lungs is preload-dependent (careful with nitrates)'
  ],
  qa: [
    { q: 'ST elevation means the heart muscle is…', a: 'Injured but still salvageable', wrong: ['Dead and scarred', 'Normal', 'Only ischemic, never infarcting'] },
    { q: 'ST depression or T-wave inversion usually means…', a: 'Ischemia', wrong: ['Infarction', 'Injury', 'A normal variant'], std: true },
    { q: 'Pathologic Q waves mean…', a: 'Infarction: dead muscle', wrong: ['Ischemia only', 'Early injury', 'Hyperkalemia'], std: true },
    { q: 'A pathologic Q wave is at least…', a: '0.04 s wide or a third of the R wave\'s height', wrong: ['0.02 s wide', '0.12 s wide', '1 mm deep in any lead'], std: true },
    { q: 'Earliest ECG sign of a STEMI?', a: 'Hyperacute (tall, broad) T waves', wrong: ['Q waves', 'T-wave inversion', 'Short PR'], std: true },
    { q: 'Order of changes in an evolving STEMI?', a: 'Hyperacute T, ST elevation, Q waves, T inversion, Q wave remains', wrong: ['Q waves, ST elevation, hyperacute T, T inversion', 'T inversion, ST elevation, Q waves, hyperacute T', 'ST depression, Q waves, ST elevation, normal'], std: true },
    { q: 'About how long does scar take to replace an infarct?', a: '8 weeks', wrong: ['8 hours', '8 days', '8 months'] },
    { q: 'STEMI: ST elevation must be in at least…', a: 'Two contiguous leads', wrong: ['One lead', 'All 12 leads', 'Three limb leads'], std: true },
    { q: 'Contiguous leads are leads that…', a: 'Look at the same wall of the heart', wrong: ['Sit next to each other on the printout', 'Are all bipolar', 'Are recorded at the same time'], std: true },
    { q: 'Usual STEMI threshold in most leads?', a: '1 mm of ST elevation', wrong: ['0.5 mm', '3 mm', '5 mm'], std: true },
    { q: 'Where is the ST elevation measured?', a: 'At the J point', wrong: ['At the peak of the T wave', 'At the top of the R wave', 'At the end of the P wave'], std: true },
    { q: 'Reciprocal ST depression makes a STEMI…', a: 'More likely', wrong: ['Less likely', 'Impossible', 'A pericarditis'], std: true },
    { q: 'Inferior STEMI: which complication do you watch for most?', a: 'Bradycardia and AV block', wrong: ['WPW', 'Long QT', 'Atrial flutter'], std: true },
    { q: 'Hypotension with clear lungs in an inferior STEMI suggests…', a: 'Right ventricular infarct', wrong: ['Left heart failure', 'Pericarditis', 'Posterior MI'] },
    { q: 'Other findings with an RV infarct (outline)?', a: 'RBBB, second- or third-degree AV block, hypotension with clear lungs', wrong: ['Delta waves and short PR', 'Diffuse ST elevation and PR depression', 'Prolonged QT and torsades'] },
    { q: 'Anterior and anterolateral STEMI put the patient at high risk of…', a: 'Pump failure and cardiogenic shock', wrong: ['Hypertensive crisis', 'Hypokalemia', 'Pericarditis'], std: true },
    { q: 'ST elevation in V3–V6, I and aVL is…', a: 'Anterolateral STEMI', wrong: ['Inferior STEMI', 'Septal STEMI only', 'Posterior STEMI'], std: true },
    { q: 'ST elevation in II, III, aVF plus V5 and V6 is…', a: 'Inferolateral STEMI', wrong: ['Anterior STEMI', 'Septal STEMI', 'High lateral STEMI'], std: true },
    { q: 'Inferior STEMI with ST depression in V1–V3 suggests the MI also involves the…', a: 'Posterior wall', wrong: ['Septum', 'Anterior wall', 'Right atrium'] },
    { q: 'NSTE-ACS includes…', a: 'Unstable angina and NSTEMI', wrong: ['STEMI and pericarditis', 'Stable angina and STEMI', 'Old MI only'] },
    { q: 'Deep symmetric T inversion in V2–V3 in a patient whose pain has eased warns of…', a: 'A critical LAD narrowing (Wellens)', wrong: ['Right ventricular infarct', 'Hyperkalemia', 'Normal variant'], std: true },
    { q: 'Q waves in II, III and aVF with a flat ST segment suggest…', a: 'An old inferior MI', wrong: ['An acute inferior STEMI', 'Pericarditis', 'A posterior MI'], std: true },
    { q: 'Why is LBBB no longer called a STEMI equivalent by itself?', a: 'In the field you often can\'t tell if it is new or old', wrong: ['It never occurs with MI', 'It always means pericarditis', 'Its QRS is too narrow'] },
    { q: 'LBBB is treated as a STEMI equivalent when it meets…', a: 'Sgarbossa criteria', wrong: ['Wellens criteria', 'Brugada criteria', 'The turn signal rule'] },
    { q: 'Sgarbossa: concordant ST depression of 1 mm or more counts in which leads?', a: 'V1–V3', wrong: ['V5–V6', 'II, III, aVF', 'I and aVL'], std: true },
    { q: 'Diffuse ST elevation with PR depression and no reciprocal changes suggests…', a: 'Pericarditis, a STEMI mimic', wrong: ['Anterolateral STEMI', 'Posterior STEMI', 'Old MI'] },
    { q: 'Primary goal for a STEMI patient in the field?', a: 'Prompt recognition and triage to the appropriate hospital', wrong: ['Waiting for a second 12-lead at the scene', 'Giving fibrinolytics without a checklist', 'Treating only the pain'] },
    { q: 'Infarct size depends on…', a: 'The tissue\'s needs, collateral circulation, and time to restore flow', wrong: ['Only the patient\'s age', 'The paper speed', 'Which lead shows it first'] },
    { q: 'Early deaths after MI are usually from…', a: 'Lethal dysrhythmias, pump failure, or tissue rupture', wrong: ['Pericarditis', 'Hypertension', 'Stroke only'] }
  ]
};
