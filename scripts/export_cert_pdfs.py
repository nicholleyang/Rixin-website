#!/usr/bin/env python3
"""Split certification.png and export per-certificate PNG + PDF files."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "images" / "certification.png"
IMG_OUT = ROOT / "images" / "certificates"
PDF_OUT = ROOT / "documents" / "certificates"

# Left half: ISO 14001, right half: ISO 9001 (per certification.png layout)
CERTS = [
    ("iso-14001", "left"),
    ("iso-9001", "right"),
]


def crop_half(img: Image.Image, side: str) -> Image.Image:
    w, h = img.size
    mid = w // 2
    if side == "left":
        return img.crop((0, 0, mid, h))
    return img.crop((mid, 0, w, h))


def save_pdf(img: Image.Image, path: Path) -> None:
    rgb = img.convert("RGB")
    rgb.save(path, "PDF", resolution=150.0)


def main() -> None:
    IMG_OUT.mkdir(parents=True, exist_ok=True)
    PDF_OUT.mkdir(parents=True, exist_ok=True)

    img = Image.open(SOURCE)
    for slug, side in CERTS:
        crop = crop_half(img, side)
        png_path = IMG_OUT / f"{slug}.png"
        pdf_path = PDF_OUT / f"{slug}-rixin-dalian.pdf"
        crop.save(png_path, "PNG")
        save_pdf(crop, pdf_path)
        print(f"Wrote {png_path.relative_to(ROOT)}")
        print(f"Wrote {pdf_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
