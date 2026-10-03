# Drug Box: paramedic study app

Study app for the Motlow State Community College paramedic program. It has two
subjects, switched at the top of the page:

- **Pharmacology** (Drug Box), built from the class deck *Paramedic Pharmacology – TN
  Protocols* (rev. 08/15/2025). It covers all 32 drugs in the deck. The focus is what
  the written tests ask for: drug names, indications, contraindications, and adult and
  pediatric doses.
- **Cardiology** (Rhythm Box), built from Chapter 21 of *Sanders' Paramedic Textbook*
  (6th ed.): the lecture slides and the chapter outline. It covers ECG basics, 25
  rhythms and dysrhythmias, cardiac conditions, and treatments and devices.

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

**Change** (on the Cards and Quiz tabs) picks which drugs to study (all of them, a
group such as Cardiac or RSI, your weakest, or hand-picked) and which topics to include.
Secondary info such as trade names or mechanism of action can be switched on there too.

Progress is saved in the browser you use (localStorage), so it stays on that device.

## Cardiology modes

| Tab | What it does |
| --- | --- |
| **Strips** | Name the rhythm on a 6-second lead II strip. Pick which rhythms to drill (by group or one at a time, or your weakest 6) and answer by multiple choice, from the full list, or by typing the name. Choose drawn strips, real recorded strips, or a mix. After each strip you see the rules for interpretation and what the rhythm you picked would have looked like. |
| **Cards** | Flashcard decks: strips, rhythm rules (rate, rhythm, QRS, P waves, PR), rhythm causes and care, conditions, treatments and devices, ECG basics, and the sodium-potassium pump and cardiac cell. |
| **Quiz** | Multiple-choice questions mixed from the same topics. |
| **Learn** | Reference for every rhythm (with a sample strip you can redraw, or a real one), condition, treatment and ECG fact. The **Na-K pump** page steps through the pump cycle (3 Na⁺ out, 2 K⁺ in), shows the action potential phases 0 to 4 for muscle and pacemaker cells with the refractory periods, and ties electrolytes, digoxin and channel blockers to the rhythms they cause. |
| **Stats** | Accuracy per rhythm (strips, rules, care) and per condition, with a button to drill your weakest strips. |

The strips are drawn by `js/ecg.js`, not copied from the textbook. Each one is generated
fresh on standard ECG paper (25 mm/s, 10 mm/mV; small box 0.04 s, large box 0.20 s)
with a random rate, PR interval and beat placement inside the rhythm's textbook range,
so no two are the same. On a phone the 6 seconds are split into two 3-second rows.

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

Run the tests with `node tests/grading.test.js` and `node tests/cardio.test.js`.

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
