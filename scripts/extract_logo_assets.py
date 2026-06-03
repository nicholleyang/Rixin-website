#!/usr/bin/env python3
"""Extract RIXIN logo icon and wordmark from Rixin-logo.png."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images" / "Rixin-logo.png"
ICON_OUT = ROOT / "images" / "rixin-icon.png"
WORDMARK_OUT = ROOT / "images" / "rixin-wordmark-white.png"

ICON_BOX = (12, 12, 106, 99)  # left, top, right, bottom (exclusive)
TEXT_BOX = (114, 30, 268, 81)


def is_near_white(rgba: tuple[int, int, int, int], thresh: int = 245) -> bool:
    r, g, b, _a = rgba
    return r >= thresh and g >= thresh and b >= thresh


def remove_white_bg(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    out = Image.new("RGBA", img.size, (0, 0, 0, 0))
    src = img.load()
    dst = out.load()
    for y in range(img.height):
        for x in range(img.width):
            px = src[x, y]
            if is_near_white(px):
                dst[x, y] = (0, 0, 0, 0)
            else:
                dst[x, y] = px
    return out


def black_to_white_transparent(img: Image.Image) -> Image.Image:
    """Turn dark text into white with smooth alpha on anti-aliased edges."""
    img = img.convert("RGBA")
    out = Image.new("RGBA", img.size, (0, 0, 0, 0))
    src = img.load()
    dst = out.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = src[x, y]
            if is_near_white((r, g, b, a)):
                dst[x, y] = (0, 0, 0, 0)
                continue
            # Darkness drives opacity (black text -> full white)
            darkness = 255 - max(r, g, b)
            alpha = min(255, int(darkness * 1.15))
            if alpha < 8:
                dst[x, y] = (0, 0, 0, 0)
            else:
                dst[x, y] = (255, 255, 255, alpha)
    return out


def main() -> None:
    src = Image.open(SRC)
    icon = remove_white_bg(src.crop(ICON_BOX))
    wordmark = black_to_white_transparent(src.crop(TEXT_BOX))

    icon.save(ICON_OUT, "PNG")
    wordmark.save(WORDMARK_OUT, "PNG")
    print(f"Saved {ICON_OUT} ({icon.size[0]}x{icon.size[1]})")
    print(f"Saved {WORDMARK_OUT} ({wordmark.size[0]}x{wordmark.size[1]})")


if __name__ == "__main__":
    main()
