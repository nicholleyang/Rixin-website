#!/usr/bin/env python3
"""Replace site footers with RIXIN DMG-style footer templates."""
from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMPLATES = Path(__file__).resolve().parent / "footer-templates"

SKIP = {"thank-you.html"}
B_STATIC = re.compile(r"^b-.*\.html$")

FOOTER_RE = re.compile(
    r"<!-- Footer -->.*?</footer>\s*(?:<!-- Footer End -->\s*)?",
    re.DOTALL,
)
FOOTER_RE_ALT = re.compile(
    r"<footer class=\"footer[^\"]*\">.*?</footer>\s*",
    re.DOTALL,
)


def pick_template(rel: str) -> str:
    parts = Path(rel).parts
    name = Path(rel).name
    if len(parts) >= 2 and parts[0] == "zh":
        if B_STATIC.match(name):
            return (TEMPLATES / "footer-zh-static.html").read_text(encoding="utf-8")
        return (TEMPLATES / "footer-zh.html").read_text(encoding="utf-8")
    if len(parts) >= 2 and parts[0] == "ja":
        if B_STATIC.match(name):
            return (TEMPLATES / "footer-ja-static.html").read_text(encoding="utf-8")
        return (TEMPLATES / "footer-ja.html").read_text(encoding="utf-8")
    return (TEMPLATES / "footer-en.html").read_text(encoding="utf-8")


def replace_in_file(path: Path, force: bool = False) -> bool:
    rel = str(path.relative_to(ROOT))
    if rel in SKIP or rel.startswith("scripts/"):
        return False

    text = path.read_text(encoding="utf-8")
    if not force and "rixin-wordmark-white.png" in text and "rixin-footer-legal" not in text:
        return False

    new_footer = pick_template(rel)
    new_text, n = FOOTER_RE.subn(new_footer, text, count=1)
    if n == 0:
        new_text, n = FOOTER_RE_ALT.subn(new_footer, text, count=1)
    if n == 0:
        print(f"SKIP (no match): {rel}")
        return False

    path.write_text(new_text, encoding="utf-8")
    print(f"OK: {rel}")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description="Replace site footers from templates.")
    parser.add_argument(
        "--force",
        action="store_true",
        help="Replace even if footer was already updated",
    )
    args = parser.parse_args()

    updated = 0
    for html in sorted(ROOT.rglob("*.html")):
        if replace_in_file(html, force=args.force):
            updated += 1
    print(f"\nUpdated {updated} files.")


if __name__ == "__main__":
    main()
