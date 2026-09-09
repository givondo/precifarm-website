"""Check that every figure SVG is well-formed XML."""
import glob
import os
import sys
import xml.etree.ElementTree as ET

pattern = sys.argv[1] if len(sys.argv) > 1 else "../docs/product/figures/*.svg"
bad = 0
for path in sorted(glob.glob(pattern)):
    try:
        ET.parse(path)
    except ET.ParseError as exc:
        bad += 1
        print(f"FAIL {os.path.basename(path)}: {exc}")
print(f"{'FAILURES: ' + str(bad) if bad else 'All SVGs are well-formed XML.'}")
