#!/usr/bin/env python3
"""Normalize homepage URLs to https://rixin-dl.com/ (no www, no index.html)."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

URL_REPLACEMENTS = [
    ("https://www.rixin-dl.com", "https://rixin-dl.com"),
    ("https://rixin-dl.com/index.html", "https://rixin-dl.com/"),
    ("https://rixin-dl.com/zh/index.html", "https://rixin-dl.com/zh/"),
    ("https://rixin-dl.com/ja/index.html", "https://rixin-dl.com/ja/"),
]


def locale_home(path: Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    if rel.startswith("ja/"):
        return "/ja/"
    if rel.startswith("zh/"):
        return "/zh/"
    return "/"


def process_html(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text
    for old, new in URL_REPLACEMENTS:
        text = text.replace(old, new)

    home = locale_home(path)
    text = re.sub(r'href="index\.html"', f'href="{home}"', text)
    text = text.replace('href="../index.html"', 'href="/"')
    text = text.replace('href="../../index.html"', f'href="{home}"' if "blog" in path.parts else 'href="/"')
    if path.parent == ROOT:
        text = text.replace('href="zh/index.html"', 'href="/zh/"')
        text = text.replace('href="ja/index.html"', 'href="/ja/"')
    if path.parent == ROOT / "zh" or (len(path.parts) > 1 and path.parts[-3:-1] == ("zh", "blog")):
        pass
    if "zh" in path.relative_to(ROOT).parts and path.parent.name == "zh":
        text = text.replace('href="../ja/index.html"', 'href="/ja/"')
    if "ja" in path.relative_to(ROOT).parts and path.parent.name == "ja":
        text = text.replace('href="../zh/index.html"', 'href="/zh/"')
    if path.parent == ROOT / "blog":
        text = text.replace('href="../zh/index.html"', 'href="/zh/"')
        text = text.replace('href="../ja/index.html"', 'href="/ja/"')

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    count = 0
    for path in sorted(ROOT.rglob("*.html")):
        if "scripts" in path.parts:
            continue
        if process_html(path):
            print(f"OK: {path.relative_to(ROOT)}")
            count += 1
    for name in ("sitemap.xml", "robots.txt"):
        p = ROOT / name
        if p.exists():
            text = p.read_text(encoding="utf-8")
            new = text
            for old, rep in URL_REPLACEMENTS:
                new = new.replace(old, rep)
            if new != text:
                p.write_text(new, encoding="utf-8")
                print(f"OK: {name}")
                count += 1
    print(f"\nDone. {count} updates.")


if __name__ == "__main__":
    main()
