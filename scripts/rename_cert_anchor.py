#!/usr/bin/env python3
"""Replace about-rixin#homepage-demos links with #certifications."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP = {"scripts"}

REPLACEMENTS = [
    ("about-rixin.html#homepage-demos", "about-rixin.html#certifications"),
    ("../about-rixin.html#homepage-demos", "../about-rixin.html#certifications"),
]


def main() -> None:
    updated = 0
    for path in sorted(ROOT.rglob("*.html")):
        if any(part in SKIP for part in path.parts):
            continue
        text = path.read_text(encoding="utf-8")
        original = text
        for old, new in REPLACEMENTS:
            text = text.replace(old, new)
        if text != original:
            path.write_text(text, encoding="utf-8")
            print(f"OK: {path.relative_to(ROOT)}")
            updated += 1
    print(f"\nUpdated {updated} files.")


if __name__ == "__main__":
    main()
