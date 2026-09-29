#!/usr/bin/env python3
"""Dump the text of every slide in a .pptx, one line per slide.

Usage: python3 tools/extract_pptx_text.py path/to/deck.pptx > slides.txt

Used to build js/drugs.js from the class PowerPoint. Slides that only contain
pictures (for example screenshots of protocol pages) print empty and have to
be read by hand.
"""
import re
import sys
import zipfile
from xml.etree import ElementTree as ET

A = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
FOOTER = re.compile(r'^(David Weaver 2025|\d{2}/\d{2}/\d{4,5}|\d+)$')


def slide_lines(xml):
    root = ET.fromstring(xml)
    for p in root.iter(A + 'p'):
        text = ''
        for el in p.iter():
            if el.tag == A + 't':
                text += el.text or ''
            elif el.tag == A + 'br':
                text += '\n'
        for line in text.split('\n'):
            line = line.strip()
            if line and not FOOTER.match(line):
                yield line


def main(path):
    deck = zipfile.ZipFile(path)
    slides = [n for n in deck.namelist() if re.match(r'ppt/slides/slide\d+\.xml$', n)]
    slides.sort(key=lambda n: int(re.findall(r'\d+', n)[0]))
    for name in slides:
        num = re.findall(r'\d+', name)[0]
        print('=== ' + num + ': ' + ' | '.join(slide_lines(deck.read(name))))


if __name__ == '__main__':
    main(sys.argv[1])
