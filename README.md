# Drug Box: paramedic study app

Study app for the Motlow State Community College paramedic program. It has four
subjects, switched at the top of the page:

- **Pharmacology** (Drug Box), built from the class deck *Paramedic Pharmacology – TN
  Protocols* (rev. 08/15/2025). It covers all 32 drugs in the deck. The focus is what
  the written tests ask for: drug names, indications, contraindications, and adult and
  pediatric doses.
- **Cardiology** (Rhythm Box), built from Chapter 21 of *Sanders' Paramedic Textbook*
  (6th ed.): the lecture slides and the chapter outline. It covers ECG basics, 25
  rhythms and dysrhythmias, cardiac conditions, and treatments and devices.
- **Pathophysiology** (Patho Box), built from Chapter 11 of *Sanders' Paramedic Textbook*
  (6th ed.), *General Principles of Pathophysiology*: the lecture slides, including the
  tables and flowcharts that are pictures on the slides. It covers the whole chapter, with
  pH and acid-base balance in the most depth.
- **Legal** (Law Box), built from Chapter 6 (*Medical and Legal Issues*) of *Sanders'
  Paramedic Textbook* (6th ed.), the lecture slides, with a focus on negligence: the four
  elements, breach types, damages, ordinary vs gross negligence, and the defenses. It also
  covers the legal system, scope of practice, consent and refusal, confidentiality,
  transport, resuscitation and advance directives, crime scenes and documentation.
  Anything beyond the slides is marked * and Tennessee specifics are tagged **TN**.

Always check against your current protocols and your instructor. This app is a
study aid, not a clinical reference.

## Study modes

| Tab | What it does |
| --- | --- |
| **Cards** | Flashcards. The front can show the drug (you recall the info) or the info (you name the drug), or mix both. Cards you miss come back later in the same round. |
| **Quiz** | Mixed questions: multiple choice ("Which drug is indicated for…", "Which of these is the adult dose of…", with realistic wrong doses), fill in the missing dose number, name the drug from its indications and dose, and name one indication or contraindication. |
| **Write** | Practice for the written test. Pick exactly which drugs to write out (tap them, add a whole group, or take your weakest 5), then for each drug you type out indications, contraindications, adult dose and pediatric dose. The app checks each item from the deck and marks it ✓ or ✗. Tap a line to flip it if the checker got it wrong. There is also a warm-up: list every drug on the list from memory. |
| **Drugs** | Searchable reference with everything from the deck, including the secondary info (trade names, class, mechanism, adverse reactions, TN/NASEMSO protocols, memory tricks). |
| **Stats** | Accuracy per drug and topic, weakest first, with a button to study your weakest 8. |
| **Learn** | Chapters 13 and 14 of *Sanders' Paramedic Textbook*: routes and their rates of absorption (Table 13-2), pharmacokinetics and pharmacodynamics (with a drug-level curve), receptors and the autonomic nervous system (and what each Drug Box drug does at its receptor), drug classes, and how to give meds (six rights, injection angles, IV complications, med errors). Read it, or drill it with its own flashcards and quiz. Items marked * go beyond the slides. |
| **Math** | Med math practice with fresh numbers every time: desire over have (D/H × Q), weight-based doses, IV flow rates, drug drips, concentrations, lb ↔ kg, metric, temperature and ET doses. Type the answer and see every step worked out. A **Formulas** page has D/H × Q, ratio and proportion, dimensional analysis, the drip formulas and the equivalents. |

**Change** (on the Cards and Quiz tabs) picks which drugs to study (all of them, a
group such as Cardiac or RSI, your weakest, or hand-picked) and which topics to include.
Secondary info such as trade names or mechanism of action can be switched on there too.

Progress is saved in the browser you use (localStorage), so it stays on that device.

## Cardiology modes

| Tab | What it does |
| --- | --- |
| **Strips** | Name the rhythm on a 6-second lead II strip. Pick which rhythms to drill (by group or one at a time, or your weakest 6) and answer by multiple choice, from the full list, or by typing the name. Choose drawn strips, real recorded strips, or a mix. After each strip you see the rules for interpretation and what the rhythm you picked would have looked like. |
| **Cards** | Flashcard decks: strips, rhythm rules (rate, rhythm, QRS, P waves, PR), rhythm causes and care, conditions, treatments and devices, ECG basics, the sodium-potassium pump and cardiac cell, and the conduction pathway. |
| **Quiz** | Multiple-choice questions mixed from the same topics. |
| **Learn** | Reference for every rhythm (with a sample strip you can redraw, or a real one), condition, treatment and ECG fact. The **Na-K pump** page starts with where the heart's electricity comes from and walks one beat through a membrane diagram (channels opening, ions moving, inside voltage on a meter: rest, threshold, depolarization, plateau, repolarization, reset), then steps through the pump cycle (3 Na⁺ out, 2 K⁺ in), shows calcium's electrical and contractile jobs (trigger calcium, release from the sarcoplasmic reticulum, troponin, relaxation) with calcium channel blockers, calcium for hyperkalemia, digoxin and calcium levels at the bedside, shows the action potential phases 0 to 4 for muscle and pacemaker cells with the refractory periods, and ties electrolytes, digoxin and channel blockers to the rhythms they cause. The **Conduction** page walks a beat from the SA node through the atria, AV node, bundle of His, bundle branches and Purkinje fibers on a heart diagram, lights up the matching part of the ECG, and lists each pacemaker's intrinsic rate, where each block happens and how ectopic beats start. |
| **Stats** | Accuracy per rhythm (strips, rules, care) and per condition, with a button to drill your weakest strips. |

The strips are drawn by `js/ecg.js`, not copied from the textbook. Each one is generated
fresh on standard ECG paper (25 mm/s, 10 mm/mV; small box 0.04 s, large box 0.20 s)
with a random rate, PR interval and beat placement inside the rhythm's textbook range,
so no two are the same.

Real strips come from the [MIT-BIH Arrhythmia Database](https://physionet.org/content/mitdb/1.0.0/)
(Moody GB, Mark RG. The impact of the MIT-BIH Arrhythmia Database. IEEE Eng in Med and Biol
20(3):45-50, 2001; Goldberger AL et al., PhysioBank, PhysioToolkit, and PhysioNet, Circulation
101(23):e215-e220, 2000), used under the Open Data Commons Attribution License v1.0. Each strip
shows its record number and time. `tools/extract_mitdb_strips.py` cuts 6-second lead II (MLII)
windows from the database's rhythm and beat annotations, removes baseline wander, downsamples
to 180 Hz and writes `js/real-strips.js` (needs `pip install wfdb numpy`):

    python3 tools/extract_mitdb_strips.py path/to/mit-bih-arrhythmia-database-1.0.0 > js/real-strips.js

The database has real examples of 15 of the rhythms. Sinus bradycardia, PJCs, VF, torsades,
asystole, first-degree, Wenckebach and complete heart block, wandering pacemaker and sinus
arrhythmia stay drawn.

Cardiology content lives in `js/cardio-data.js`. The slides leave the "rules for
interpretation" blank for most rhythms after the atrial ones (they are tables in the
book), so those rules use standard ECG criteria and the app labels them that way. The
same goes for a few ECG basics (box times, rate methods, 12-lead wall/lead groups).

## Pathophysiology modes

| Tab | What it does |
| --- | --- |
| **Learn** | **pH**: the acid-base balance (carbonic acid and the lungs against bicarbonate and the kidneys) as a seesaw with a pH gauge from 6.9 to 8.0. Pick one of 22 patients (opioid overdose, DKA, vomiting, cardiac arrest…) to see what tips the balance, then step to the body's compensation and watch the pH move back. **pH flowcharts**: the chapter's cause and compensation flowcharts for each disturbance. **Topics**: 31 topics in six groups (pH and acid-base, the cell, fluids and electrolytes, hypoperfusion and shock, inflammation and immunity, stress and disease). **Shock**: the shock types side by side. **ABG**: practice blood gases with a step-by-step interpretation, or type in your own. **Facts**: 94 key facts and normal values, searchable. |
| **Cards** | pH scenario cards (name the disturbance and its compensation), topic cards, key facts and practice ABGs. The pH page has a button for a pH-only deck. |
| **Quiz** | Multiple choice from pH scenarios, the topic groups, key facts and ABG interpretation. The pH page has a button for a pH-only quiz. |
| **Stats** | Accuracy overall, on pH scenarios and on ABGs, and per topic, weakest first. |

Content lives in `js/patho-data.js`. Material the slides don't spell out (reading an ABG,
IV fluid tonicity, specific electrolyte disorders, the shock comparison) is marked with *.
Table 11-2 gives serum bicarbonate as 22–30 mEq/L; blood gas interpretation uses the usual
arterial range of 22–26. `js/abg.js` interprets blood gases and makes practice gases whose
pH is computed from the PaCO₂ and HCO₃⁻ (Henderson-Hasselbalch), so every gas is
internally consistent.

## Legal modes

| Tab | What it does |
| --- | --- |
| **Learn** | The **Negligence** page: the four elements (each with an example and what happens if it is missing), ordinary vs gross negligence side by side, malfeasance/misfeasance/nonfeasance, damages, defenses, and a "which element is missing?" drill. Also every topic, a searchable glossary, and every scenario with its answer. |
| **Cards** | Flashcard decks: terms (term to meaning, meaning to term, or mixed), key facts, scenarios ("what do you do?"), and the key points of each topic. Pick which areas to include. |
| **Quiz** | Multiple-choice questions on terms, key facts, scenarios and missing negligence elements, with the reason after each scenario. |
| **Stats** | Accuracy per area for terms, facts and scenarios, with a button to study your weakest area. |

Legal content lives in `js/legal-data.js`.

## Running it

It's a static site with no build step:

- Open `index.html` in a browser, or
- Turn on GitHub Pages (Settings → Pages → deploy from this branch, root folder) to get a
  link you can add to your phone's home screen.

## How answers are checked

`js/grading.js` does the checking:

- **Drug names** allow small typos and accept trade names and common shorthand
  (Zofran, Versed, amio, bicarb, D50…).
- **Lists** (indications, contraindications) match on keywords and know common EMS
  abbreviations (2nd/3rd degree HB, VF/VT, ALOC, CCB OD…).
- **Doses** count only when every number in the deck's dose is in your answer.

Run the tests with `node tests/grading.test.js`, `node tests/cardio.test.js`,
`node tests/patho.test.js` and `node tests/legal.test.js`.

## Updating the drug list

All drug content lives in `js/drugs.js`, one object per drug. To pull text from a new
version of the deck:

```sh
python3 tools/extract_pptx_text.py "Paramedic Pharmacology.pptx" > slides.txt
```

Slides that are only pictures (the Ketamine protocol screenshots, for example) come
out empty and have to be typed in by hand.

### Notes on the transcription

- The Adenosine slide lists trade and generic names swapped. The app uses generic
  *adenosine* and trade *Adenocard*.
- Epinephrine is split into **1:10,000** (cardiac arrest, push-dose pressor) and
  **1:1,000** (anaphylaxis, croup), matching the deck.
- Ketamine's adult doses come from the protocol screenshots in the deck. The deck
  gives no pediatric Ketamine dose.
- The deck gives no separate contraindications for Calcium Gluconate, so that topic is
  left out of quizzes for it.
