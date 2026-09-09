"""Quick structural audit of the modular energy v2 PDF."""
import pymupdf
import sys

sys.stdout.reconfigure(encoding="utf-8")

path = r"C:\Users\DAVID\Desktop\kenya-ebus-ecosystem\website\public\downloads\precifarm-modular-energy-platform-v2.pdf"
d = pymupdf.open(path)
print(f"pages={d.page_count}\n")

for i, page in enumerate(d, 1):
    t = page.get_text().strip()
    imgs = page.get_images()
    lines = [ln.strip() for ln in t.splitlines() if ln.strip()]
    head = lines[0] if lines else "(empty)"
    print(f"p{i:02d} text={len(t):5d} imgs={len(imgs):2d} head={head[:60]}")
