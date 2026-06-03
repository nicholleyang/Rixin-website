#!/usr/bin/env python3
"""Update About mega menu: Company Overview -> Our Story."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

REPLACEMENTS = [
    (
        '<a href="about-rixin.html#about-us">Company Overview</a>\n'
        '\t\t\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">Learn about RIXIN\'s manufacturing base in Dalian and how we support export-focused industrial programs.</p>',
        '<a href="about-rixin.html#our-story" id="megaOurStory">Our Story</a>\n'
        '\t\t\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc" id="megaOurStoryDesc">Our founding journey from Dalian precision molds to integrated export manufacturing.</p>',
    ),
    (
        '<li class="rixin-mega-item"><a href="about-rixin.html#about-us">公司概况</a><p class="rixin-mega-desc">了解日信大连工厂、制造基础以及服务出口项目的整体能力。</p></li>',
        '<li class="rixin-mega-item"><a href="about-rixin.html#our-story" id="megaOurStory">我们的故事</a><p class="rixin-mega-desc" id="megaOurStoryDesc">从大连精密模具起步，到服务全球出口制造的发展历程。</p></li>',
    ),
    (
        '<li class="rixin-mega-item"><a href="about-rixin.html#about-us">会社概要</a><p class="rixin-mega-desc">大連工場の拠点概要と、輸出案件を支えるものづくり体制をご紹介します。</p></li>',
        '<li class="rixin-mega-item"><a href="about-rixin.html#our-story" id="megaOurStory">私たちの歩み</a><p class="rixin-mega-desc" id="megaOurStoryDesc">大連での精密金型から、輸出向け一体型製造へと歩んできた沿革をご紹介します。</p></li>',
    ),
    (
        '<a href="../about-rixin.html#about-us">Company Overview</a>\n'
        '\t\t\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">Learn about RIXIN\'s manufacturing base in Dalian and how we support export-focused industrial programs.</p>',
        '<a href="../about-rixin.html#our-story" id="megaOurStory">Our Story</a>\n'
        '\t\t\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc" id="megaOurStoryDesc">Our founding journey from Dalian precision molds to integrated export manufacturing.</p>',
    ),
    (
        '<li class="rixin-mega-item"><a href="../about-rixin.html#about-us">公司概况</a><p class="rixin-mega-desc">了解日信大连工厂、制造基础以及服务出口项目的整体能力。</p></li>',
        '<li class="rixin-mega-item"><a href="../about-rixin.html#our-story" id="megaOurStory">我们的故事</a><p class="rixin-mega-desc" id="megaOurStoryDesc">从大连精密模具起步，到服务全球出口制造的发展历程。</p></li>',
    ),
    (
        '<li class="rixin-mega-item"><a href="../about-rixin.html#about-us">会社概要</a><p class="rixin-mega-desc">大連工場の拠点概要と、輸出案件を支えるものづくり体制をご紹介します。</p></li>',
        '<li class="rixin-mega-item"><a href="../about-rixin.html#our-story" id="megaOurStory">私たちの歩み</a><p class="rixin-mega-desc" id="megaOurStoryDesc">大連での精密金型から、輸出向け一体型製造へと歩んできた沿革をご紹介します。</p></li>',
    ),
]


def main() -> None:
    updated = 0
    for path in sorted(ROOT.rglob("*.html")):
        if "scripts" in path.parts:
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
