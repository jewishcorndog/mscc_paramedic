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
