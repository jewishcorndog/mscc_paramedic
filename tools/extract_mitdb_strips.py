#!/usr/bin/env python3
"""Cut real 6-second lead II strips out of the MIT-BIH Arrhythmia Database.

Usage:
  pip install wfdb numpy
  python3 tools/extract_mitdb_strips.py path/to/mit-bih-arrhythmia-database-1.0.0 > js/real-strips.js

The database (https://physionet.org/content/mitdb/1.0.0/) is free to reuse
under the Open Data Commons Attribution License; the app credits it on every
real strip. Strips come from the MLII (modified lead II) channel. Each window
lies inside one cardiologist-annotated rhythm episode, has no noise or
unreadable-signal annotations, and keeps the beat labels so the app can mark
PVCs, PACs and so on after the student answers.
"""
import json
import sys

import numpy as np
import wfdb

FS = 360          # database sampling rate
OUT_HZ = 180      # stored rate (every 2nd sample)
WIN = 6 * FS      # 6-second strip
PER_RHYTHM = 8    # strips kept per app rhythm
BEATS = set('NLRBAaJSVrFejnE/fQ?')

def rhythm_segments(ann, sig_len):
    segs, cur, start = [], None, 0
    for s, sym, aux in zip(ann.sample, ann.symbol, ann.aux_note):
        if sym == '+':
            if cur:
                segs.append((cur, start, s))
            cur, start = aux.strip('\x00').strip(), s
    if cur:
        segs.append((cur, start, sig_len))
    return segs

def baseline_removed(x):
    # Subtract a 1.2 s moving median, like a monitor's baseline filter.
    k = int(1.2 * FS) | 1
    pad = np.pad(x, k // 2, mode='edge')
    from numpy.lib.stride_tricks import sliding_window_view
    med = np.median(sliding_window_view(pad, k)[::6], axis=1)
    med = np.interp(np.arange(len(x)), np.arange(0, len(x), 6)[:len(med)], med)
    return x - med

def hms(sample):
    s = int(sample / FS)
    return '%d:%02d' % (s // 60, s % 60)

def classify(rec, rhythm, beats, rr, w0):
    """Return (app rhythm id, note, also-correct ids) or None."""
    syms = [b[1] for b in beats]
    n = len(syms)
    if n < 2:
        return None
    hr = 60 / np.mean(rr) if len(rr) else 0
    others = [s for s in syms if s != 'N']
    # Premature beats must sit fully inside the strip, not clipped at either edge.
    inner = all(0.4 * FS <= b[0] - w0 <= WIN - 0.6 * FS for b in beats if b[1] != 'N')
    if rhythm == '(N':
        if not others:
            if np.max(rr) - np.min(rr) > 0.16 * np.mean(rr):
                return None
            if 60 <= hr < 100:
                return ('nsr', '', [])
            if hr >= 100:
                return ('sinus-tach', '', [])
            return None
        if not inner:
            return None
        if set(others) == {'A'} and len(others) <= 2:
            return ('pac', '', [])
        if set(others) == {'J'} and len(others) <= 2:
            return ('pjc', '', [])
        if set(others) == {'V'} and len(others) <= 2:
            return ('pvc', '', [])
        return None
    if rhythm == '(SBR':
        if max(rr) > 2.4:
            return ('sinus-arrest', 'Pause in sick sinus syndrome', [])
        if others or hr >= 60:
            return None
        return ('sinus-brady', 'With first-degree AV block (per the record notes)', ['avb-1'])
    simple = {'(AFIB': 'afib', '(AFL': 'flutter', '(SVTA': 'svt', '(IVR': 'idioventricular',
              '(P': 'paced', '(PREX': 'wpw', '(VT': 'vt'}
    if rhythm in simple:
        rid = simple[rhythm]
        if rid == 'paced' and syms.count('/') < n - 1:
            return None
        if rid == 'idioventricular' and hr > 45:
            return None
        if rid == 'svt' and rec == '207':
            return None  # bundle branch block makes these wide; they read as VT
        if rid == 'vt' and syms.count('V') < 4:
            return None
        return (rid, '', [])
    if rhythm in ('(B', '(T'):
        if not inner:
            return None
        return ('pvc', 'Ventricular bigeminy' if rhythm == '(B' else 'Ventricular trigeminy', [])
    if rhythm == '(AB':
        return ('pac', 'Atrial bigeminy', [])
    if rhythm == '(NOD':
        if 'A' in syms:
            return None
        if hr < 60:
            return ('junctional-escape', '', [])
        if hr <= 100:
            return ('accel-junctional', '', [])
        return None
    if rhythm == '(BII':
        return ('avb-2-2', '2:1 and Mobitz II block (per the record notes)', [])
    return None

def main(db):
    recs = [l.strip() for l in open(db + '/RECORDS')]
    found = {}
    for rec in recs:
        hdr = wfdb.rdheader(db + '/' + rec)
        if 'MLII' not in hdr.sig_name:
            continue
        ch = hdr.sig_name.index('MLII')
        sig = wfdb.rdrecord(db + '/' + rec, channels=[ch]).p_signal[:, 0]
        ann = wfdb.rdann(db + '/' + rec, 'atr')
        samples = np.array(ann.sample)
        syms = np.array(ann.symbol)
        noisy = samples[np.isin(syms, ['~', '|', 'x', '!', '[', ']', 'Q', '?'])]
        for rhythm, s0, s1 in rhythm_segments(ann, hdr.sig_len):
            step = WIN if rhythm in ('(N', '(AFIB', '(P', '(B', '(T', '(PREX', '(SBR') else FS
            for w0 in range(max(s0 + FS // 2, FS), min(s1, len(sig) - FS) - WIN, step):
                w1 = w0 + WIN
                if np.any((noisy >= w0 - FS) & (noisy < w1 + FS)):
                    continue
                m = (samples >= w0) & (samples < w1) & np.isin(syms, list(BEATS))
                beats = list(zip(samples[m], syms[m]))
                rr = np.diff([b[0] for b in beats]) / FS
                c = classify(rec, rhythm, beats, rr, w0)
                if not c:
                    continue
                x = baseline_removed(sig[w0 - FS:w1 + FS])[FS:FS + WIN]
                if np.max(np.abs(x)) > 3.5 or np.ptp(x) < 0.4:
                    continue
                found.setdefault(c[0], []).append((rec, w0, x, beats, c[1], c[2]))
    out = []
    for rid, cands in sorted(found.items()):
        # Spread picks across records and notes (bigeminy, trigeminy...), then across time.
        by_rec = {}
        for cnd in cands:
            by_rec.setdefault((cnd[0], cnd[4]), []).append(cnd)
        picks, i = [], 0
        while len(picks) < PER_RHYTHM and any(by_rec.values()):
            for rec in sorted(by_rec):
                lst = by_rec[rec]
                if lst and len(picks) < PER_RHYTHM:
                    picks.append(lst.pop(len(lst) * (i % 3 + 1) // 4 if len(lst) > 3 else 0))
            i += 1
        for rec, w0, x, beats, note, also in picks:
            if rid == 'sinus-arrest':
                # Record 232 tags its sinus beats as atrial; unlabeled reads truer on a pause strip.
                beats = [(b[0], 'N') for b in beats]
            d = x[::FS // OUT_HZ]
            out.append({
                'id': rid, 'rec': rec, 'at': hms(w0), 'note': note, 'also': also,
                'mv': [int(round(v * 100)) for v in d],
                'beats': [[int(round((b[0] - w0) / (FS / OUT_HZ))), b[1]] for b in beats]
            })
        print('%-18s %d strips from %d candidates' % (rid, len(picks), len(cands)), file=sys.stderr)
    print('/* Real ECG strips from the MIT-BIH Arrhythmia Database (Moody & Mark, PhysioNet),')
    print('   Open Data Commons Attribution License v1.0. Generated by tools/extract_mitdb_strips.py.')
    print('   mv = lead II (MLII) in hundredths of a millivolt at hz samples/s; beats = [sample, label]. */')
    print('window.REAL_STRIPS = ' + json.dumps({'hz': OUT_HZ, 'strips': out}, separators=(',', ':')) + ';')

if __name__ == '__main__':
    main(sys.argv[1])
