#!/usr/bin/env python3
"""Add Blog item to About mega menu after Certifications."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MARKER = 'id="megaAboutBlog"'

INSERTS = [
    (
        '<a href="about-rixin.html#certifications">Certifications</a>\n'
        '\t\t\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">See the quality and environmental certifications that underpin our industrial production standards.</p>\n'
        '\t\t\t\t\t\t\t\t\t\t\t</li>\n'
        '\t\t\t\t\t\t\t\t\t\t</ul>',
        '<a href="about-rixin.html#certifications">Certifications</a>\n'
        '\t\t\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">See the quality and environmental certifications that underpin our industrial production standards.</p>\n'
        '\t\t\t\t\t\t\t\t\t\t\t</li>\n'
        '\t\t\t\t\t\t\t\t\t\t\t<li class="rixin-mega-item">\n'
        '\t\t\t\t\t\t\t\t\t\t\t\t<a href="about-rixin.html#about-blog" id="megaAboutBlog">Blog</a>\n'
        '\t\t\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc" id="megaAboutBlogDesc">Read technical articles on machining, mold quality, and supplier selection.</p>\n'
        '\t\t\t\t\t\t\t\t\t\t\t</li>\n'
        '\t\t\t\t\t\t\t\t\t\t</ul>',
    ),
    (
        '<li class="rixin-mega-item"><a href="about-rixin.html#certifications">资质认证</a><p class="rixin-mega-desc">查看支撑工业量产与外贸交付的质量与环境管理认证。</p></li></ul>',
        '<li class="rixin-mega-item"><a href="about-rixin.html#certifications">资质认证</a><p class="rixin-mega-desc">查看支撑工业量产与外贸交付的质量与环境管理认证。</p></li>'
        '<li class="rixin-mega-item"><a href="about-rixin.html#about-blog" id="megaAboutBlog">博客</a><p class="rixin-mega-desc" id="megaAboutBlogDesc">阅读加工技术、模具质量与供应商选择相关文章。</p></li></ul>',
    ),
    (
        '<li class="rixin-mega-item"><a href="about-rixin.html#certifications">認証・品質体制</a><p class="rixin-mega-desc">量産品質と輸出案件を支える認証・品質マネジメント体制をご覧ください。</p></li></ul>',
        '<li class="rixin-mega-item"><a href="about-rixin.html#certifications">認証・品質体制</a><p class="rixin-mega-desc">量産品質と輸出案件を支える認証・品質マネジメント体制をご覧ください。</p></li>'
        '<li class="rixin-mega-item"><a href="about-rixin.html#about-blog" id="megaAboutBlog">ブログ</a><p class="rixin-mega-desc" id="megaAboutBlogDesc">加工技術、金型品質、サプライヤー選定に関する記事をご覧ください。</p></li></ul>',
    ),
    (
        '<li class="rixin-mega-item"><a href="../about-rixin.html#certifications">Certifications</a><p class="rixin-mega-desc">See the quality and environmental certifications that underpin our industrial production standards.</p></li></ul>',
        '<li class="rixin-mega-item"><a href="../about-rixin.html#certifications">Certifications</a><p class="rixin-mega-desc">See the quality and environmental certifications that underpin our industrial production standards.</p></li>'
        '<li class="rixin-mega-item"><a href="../about-rixin.html#about-blog" id="megaAboutBlog">Blog</a><p class="rixin-mega-desc" id="megaAboutBlogDesc">Read technical articles on machining, mold quality, and supplier selection.</p></li></ul>',
    ),
    (
        '<li class="rixin-mega-item"><a href="../about-rixin.html#certifications">资质认证</a><p class="rixin-mega-desc">查看支撑工业量产与外贸交付的质量与环境管理认证。</p></li></ul>',
        '<li class="rixin-mega-item"><a href="../about-rixin.html#certifications">资质认证</a><p class="rixin-mega-desc">查看支撑工业量产与外贸交付的质量与环境管理认证。</p></li>'
        '<li class="rixin-mega-item"><a href="../about-rixin.html#about-blog" id="megaAboutBlog">博客</a><p class="rixin-mega-desc" id="megaAboutBlogDesc">阅读加工技术、模具质量与供应商选择相关文章。</p></li></ul>',
    ),
    (
        '<li class="rixin-mega-item"><a href="../about-rixin.html#certifications">認証・品質体制</a><p class="rixin-mega-desc">量産品質と輸出案件を支える認証・品質マネジメント体制をご覧ください。</p></li></ul>',
        '<li class="rixin-mega-item"><a href="../about-rixin.html#certifications">認証・品質体制</a><p class="rixin-mega-desc">量産品質と輸出案件を支える認証・品質マネジメント体制をご覧ください。</p></li>'
        '<li class="rixin-mega-item"><a href="../about-rixin.html#about-blog" id="megaAboutBlog">ブログ</a><p class="rixin-mega-desc" id="megaAboutBlogDesc">加工技術、金型品質、サプライヤー選定に関する記事をご覧ください。</p></li></ul>',
    ),
]


def main() -> None:
    updated = 0
    for path in sorted(ROOT.rglob("*.html")):
        if "scripts" in path.parts or MARKER in path.read_text(encoding="utf-8"):
            continue
        text = path.read_text(encoding="utf-8")
        original = text
        for old, new in INSERTS:
            text = text.replace(old, new)
        if text != original:
            path.write_text(text, encoding="utf-8")
            print(f"OK: {path.relative_to(ROOT)}")
            updated += 1
    print(f"\nUpdated {updated} files.")


if __name__ == "__main__":
    main()
