#!/usr/bin/env python3
"""Rename About RIXIN nav labels site-wide."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP_DIRS = {"scripts", "node_modules", ".git"}

REPLACEMENTS = [
    ("About RIXIN ›", "About Us ›"),
    ("About RIXIN", "About Us"),
    ("关于日信 ›", "关于我们 ›"),
    ("关于日信", "关于我们"),
    ("RIXINについて", "私たちについて"),
]


def process_file(path: Path) -> bool:
    if path.suffix not in {".html", ".js"}:
        return False
    rel = path.relative_to(ROOT)
    if any(part in SKIP_DIRS for part in rel.parts):
        return False
    if rel.name == "rename_about_nav.py":
        return False

    text = path.read_text(encoding="utf-8")
    original = text
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)
    if text == original:
        return False
    path.write_text(text, encoding="utf-8")
    return True


def main() -> None:
    updated = 0
    for path in sorted(ROOT.rglob("*")):
        if path.is_file() and process_file(path):
            print(f"OK: {path.relative_to(ROOT)}")
            updated += 1
    print(f"\nUpdated {updated} files.")


if __name__ == "__main__":
    main()
