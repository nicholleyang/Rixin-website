#!/usr/bin/env python3
"""Insert Our Culture item into About mega menu site-wide."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MARKER = 'id="megaOurCulture"'
SKIP = {"scripts"}

CULTURE_ITEMS = {
    "en": (
        '<li class="rixin-mega-item"><a href="{prefix}about-rixin.html#our-culture" id="megaOurCulture">Our Culture</a>'
        '<p class="rixin-mega-desc" id="megaOurCultureDesc">The values that guide how we work with customers, suppliers, and teams.</p></li>'
    ),
    "zh": (
        '<li class="rixin-mega-item"><a href="{prefix}about-rixin.html#our-culture" id="megaOurCulture">我们的文化</a>'
        '<p class="rixin-mega-desc" id="megaOurCultureDesc">诚信、适应力、协作与担当——指引我们与客户和团队共事的方式。</p></li>'
    ),
    "ja": (
        '<li class="rixin-mega-item"><a href="{prefix}about-rixin.html#our-culture" id="megaOurCulture">私たちの文化</a>'
        '<p class="rixin-mega-desc" id="megaOurCultureDesc">誠実、適応力、協働、責任——顧客とチームとの関わり方を支える価値観です。</p></li>'
    ),
}

ANCHORS = {
    "en": "Our founding journey from Dalian precision molds to integrated export manufacturing.",
    "zh": "从大连精密模具起步，到服务全球出口制造的发展历程。",
    "ja": "大連での精密金型から、輸出向け一体型製造へと歩んできた沿革をご紹介します。",
}


def insert_culture(text: str, lang: str, prefix: str = "") -> str:
    anchor = ANCHORS[lang]
    item = CULTURE_ITEMS[lang].format(prefix=prefix)
    needle = f'id="megaOurStoryDesc">{anchor}</p></li>'
    if needle not in text or MARKER in text:
        return text
    return text.replace(needle, f'{needle}{item}', 1)


def main() -> None:
    updated = 0
    for path in sorted(ROOT.rglob("*.html")):
        if any(part in SKIP for part in path.parts):
            continue
        text = path.read_text(encoding="utf-8")
        if MARKER in text or 'id="megaOurStoryDesc"' not in text:
            continue
        original = text
        if "/zh/" in str(path) or path.parent.name == "zh":
            text = insert_culture(text, "zh")
        elif "/ja/" in str(path) or path.parent.name == "ja":
            text = insert_culture(text, "ja")
        else:
            text = insert_culture(text, "en")
            text = insert_culture(text, "en", prefix="../")
        if text != original:
            path.write_text(text, encoding="utf-8")
            print(f"OK: {path.relative_to(ROOT)}")
            updated += 1
    print(f"\nUpdated {updated} files.")


if __name__ == "__main__":
    main()
