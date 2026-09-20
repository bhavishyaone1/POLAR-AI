import fitz
import os

pdf_path = r"C:\Users\bhavishya\.gemini\antigravity\brain\f6e9359d-a8c3-43b4-9913-3af0a6fa598b\.user_uploaded\media_1789913747384.pdf"
out_dir = r"assets/presentation/extracted"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")
for pno in range(len(doc)):
    page = doc[pno]
    ilist = page.get_images(full=True)
    print(f"Page {pno+1}: {len(ilist)} images")
    for img_idx, img in enumerate(ilist):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        w = base_image["width"]
        h = base_image["height"]
        fname = os.path.join(out_dir, f"p{pno+1}_img{img_idx}_{xref}_{w}x{h}.{image_ext}")
        with open(fname, "wb") as f:
            f.write(image_bytes)
        print(f"  Saved: {fname} ({w}x{h})")
