import fitz
import os

pdf_path = os.path.abspath("POLAR_AI_SIH_2026_IDEA_PRESENTATION_FINAL.pdf")
out_dir = os.path.abspath("assets/presentation/final_slides")
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total PDF pages: {len(doc)}")

# Render at 2.0 zoom (approx 2880x1620)
zoom = 2.0
mat = fitz.Matrix(zoom, zoom)

for i in range(len(doc)):
    page = doc[i]
    pix = page.get_pixmap(matrix=mat, alpha=False)
    out_file = os.path.join(out_dir, f"slide_{i+1}.png")
    pix.save(out_file)
    print(f"Rendered: {out_file} ({pix.width}x{pix.height})")
