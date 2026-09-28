"""
Builds the self-hosted fonts in src/app/fonts from the Google Fonts sources.

    python -m venv .venv && .venv/bin/pip install fonttools brotli
    curl -L -o fraunces.ttf "https://github.com/google/fonts/raw/main/ofl/fraunces/Fraunces%5BSOFT,WONK,opsz,wght%5D.ttf"
    curl -L -o figtree.ttf "https://github.com/google/fonts/raw/main/ofl/figtree/Figtree%5Bwght%5D.ttf"
    .venv/bin/python scripts/subset-fonts.py

Fraunces is pinned to SOFT=100, WONK=0, opsz=48 and limited to weights 400-600;
Figtree to weights 400-700. Both are subset to Latin-1 plus the punctuation the copy uses.
Both fonts are licensed under the SIL Open Font License 1.1 (see src/app/fonts/OFL-*.txt).
"""
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

UNICODES = (
    list(range(0x20, 0x7F)) + list(range(0xA0, 0x100)) +
    [0x131, 0x152, 0x153, 0x2C6, 0x2DA, 0x2DC, 0x2013, 0x2014, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D,
     0x201E, 0x2022, 0x2026, 0x2032, 0x2033, 0x2039, 0x203A, 0x20AC, 0x2122, 0x2190, 0x2191, 0x2192,
     0x2193, 0x2212, 0x270E]
)

def build(src, out, limits):
    font = TTFont(src)
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk", "tnum", "lnum", "pnum"]
    options.name_IDs = ["*"]
    options.notdef_outline = True
    options.hinting = False
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=UNICODES)
    subsetter.subset(font)
    font = instancer.instantiateVariableFont(font, limits)
    font.flavor = "woff2"
    font.save(out)
    import os
    print(out, os.path.getsize(out), "bytes")

build("fraunces.ttf", "src/app/fonts/fraunces-soft.woff2", {"SOFT": 100, "WONK": 0, "opsz": 48, "wght": (400, 600)})
build("figtree.ttf", "src/app/fonts/figtree.woff2", {"wght": (400, 700)})
