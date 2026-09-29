# Drug Box: paramedic pharmacology trainer

Study app for the Motlow State Community College paramedic program, built from the
class deck *Paramedic Pharmacology – TN Protocols* (rev. 08/15/2025). It covers all
32 drugs in the deck. The focus is what the written tests ask for: drug names,
indications, contraindications, and adult and pediatric doses.

Always check against your current protocols and your instructor. This app is a
study aid, not a clinical reference.

## Study modes

| Tab | What it does |
| --- | --- |
| **Cards** | Flashcards. The front can show the drug (you recall the info) or the info (you name the drug), or mix both. Cards you miss come back later in the same round. |
| **Quiz** | Mixed questions: multiple choice ("Which drug is indicated for…", "Which of these is the adult dose of…", with realistic wrong doses), fill in the missing dose number, name the drug from its indications and dose, and name one indication or contraindication. |
| **Write** | Practice for the written test. For each drug you type out indications, contraindications, adult dose and pediatric dose. The app checks each item from the deck and marks it ✓ or ✗. Tap a line to flip it if the checker got it wrong. There is also a warm-up: list every drug on the list from memory. |
| **Drugs** | Searchable reference with everything from the deck, including the secondary info (trade names, class, mechanism, adverse reactions, TN/NASEMSO protocols, memory tricks). |
| **Stats** | Accuracy per drug and topic, weakest first, with a button to study your weakest 8. |

**Change** (on the Cards, Quiz and Write tabs) picks which drugs to study (all of them, a
group such as Cardiac or RSI, your weakest, or hand-picked) and which topics to include.
Secondary info such as trade names or mechanism of action can be switched on there too.

Progress is saved in the browser you use (localStorage), so it stays on that device.

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

Run the tests with `node tests/grading.test.js`.

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
