"""Rasterise selected PDF pages to PNG for visual QA of the generated document."""
import sys
import pymupdf

pdf_path = sys.argv[1]
out_dir = sys.argv[2]
pages = [int(p) for p in sys.argv[3].split(",")]

doc = pymupdf.open(pdf_path)
print("page_count", doc.page_count)
for n in pages:
    if n < 1 or n > doc.page_count:
        continue
    page = doc[n - 1]
    pix = page.get_pixmap(dpi=110)
    out = f"{out_dir}/page-{n:03d}.png"
    pix.save(out)
    print("wrote", out)
