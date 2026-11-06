# Usage: python3 scripts/qa/home-compare.py <before-dir> <after-dir> [skip-substring,...]. Pixel diff per homepage block, allowing a one-row sub-pixel shift.
import json, sys
from PIL import Image, ImageChops
a, b, skip = sys.argv[1], sys.argv[2], sys.argv[3].split(",") if len(sys.argv) > 3 else []
ma, mb = json.load(open(f"{a}/meta.json")), json.load(open(f"{b}/meta.json"))
ok = True
for w in ma:
    if ma[w] != mb[w]:
        print(f"{w}: block list differs\n  before {ma[w]}\n  after  {mb[w]}"); ok = False
    for i, name in enumerate(ma[w]):
        if any(s in name for s in skip):
            print(f"{w} {i:02d} {name}: skipped (intentional change)"); continue
        try:
            x = Image.open(f"{a}/{w}-{i:02d}.png").convert("RGB"); y = Image.open(f"{b}/{w}-{i:02d}.png").convert("RGB")
        except FileNotFoundError:
            print(f"{w} {i:02d} {name}: missing"); ok = False; continue
        if abs(x.size[1] - y.size[1]) > 1 or x.size[0] != y.size[0]:
            print(f"{w} {i:02d} {name}: SIZE {x.size} -> {y.size}"); ok = False; continue
        # Allow a one-row shift: a taller section above moves later blocks by a sub-pixel amount.
        best = None
        for dy in (0, -1, 1):
            h = min(x.size[1], y.size[1]) - 1
            xa = x.crop((0, max(0, dy), x.size[0], max(0, dy) + h)); ya = y.crop((0, max(0, -dy), y.size[0], max(0, -dy) + h))
            dd = ImageChops.difference(xa, ya)
            n = sum(1 for p in dd.get_flattened_data() if max(p) > 8) if hasattr(dd, 'get_flattened_data') else sum(1 for p in dd.getdata() if max(p) > 8)
            if best is None or n < best[0]: best = (n, dy, dd)
        d = best[2]; bbox = d.getbbox() if best[0] else None
        if bbox is None: print(f"{w} {i:02d} {name}: identical")
        else:
            px = best[0]
            pct = 100 * px / (x.size[0] * x.size[1])
            print(f"{w} {i:02d} {name}: {pct:.3f}% pixels differ, bbox {bbox}"); ok = ok and pct < 0.01
print("PASS" if ok else "FAIL")
