#!/usr/bin/env python3
"""Batch updates for About Technical Insights refactor."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Remove Main Equipment mega items (multiline and compact)
MAIN_EQUIP_PATTERNS = [
    re.compile(
        r'\s*<li class="rixin-mega-item">\s*'
        r'<a href="(?:\.\./)?about-rixin\.html#part1" id="tab18">[^<]+</a>\s*'
        r'<p class="rixin-mega-desc">[^<]*</p>\s*'
        r'</li>',
        re.DOTALL,
    ),
    re.compile(
        r'<li class="rixin-mega-item"><a href="(?:\.\./)?about-rixin\.html#part1" id="tab18">[^<]+</a>'
        r'<p class="rixin-mega-desc">[^<]*</p></li>',
    ),
]

ANCHOR_REPLACEMENTS = [
    ("about-rixin.html#about-blog", "about-rixin.html#technical-insights"),
    ("../about-rixin.html#about-blog", "../about-rixin.html#technical-insights"),
]

MEGA_LABEL_REPLACEMENTS = [
    ('id="megaAboutBlog">Blog</a>', 'id="megaAboutBlog">Technical Insights</a>'),
    ('id="megaAboutBlog">博客</a>', 'id="megaAboutBlog">技术洞察</a>'),
    ('id="megaAboutBlog">ブログ</a>', 'id="megaAboutBlog">技術インサイト</a>'),
    (
        'id="megaAboutBlogDesc">Read technical articles on machining, mold quality, and supplier selection.</p>',
        'id="megaAboutBlogDesc">Technical insights on machining, mold quality, and export manufacturing.</p>',
    ),
    (
        'id="megaAboutBlogDesc">阅读加工技术、模具质量与供应商选择相关文章。</p>',
        'id="megaAboutBlogDesc">精密加工、模具零部件与出口制造相关的技术解读。</p>',
    ),
    (
        'id="megaAboutBlogDesc">加工技術、金型品質、サプライヤー選定に関する記事をご覧ください。</p>',
        'id="megaAboutBlogDesc">精密加工、金型部品、輸出製造に関する技術インサイト。</p>',
    ),
]

FOOTER_BLOG_REPLACEMENTS = [
    ('<li><a href="blog.html">Blog</a></li>', '<li><a href="about-rixin.html#technical-insights">Technical Insights</a></li>'),
    ('<li><a href="blog.html">新闻博客</a></li>', '<li><a href="about-rixin.html#technical-insights">技术洞察</a></li>'),
    ('<li><a href="blog.html">ブログ</a></li>', '<li><a href="about-rixin.html#technical-insights">技術インサイト</a></li>'),
]

MAIN_EQUIPMENT_SECTION = re.compile(
    r'\s*<!-- Feature Section 2 -->\s*'
    r'<section id="main-equipment" class="section-block feature-2">.*?</section>\s*'
    r'<!-- Feature Section 2 End -->\s*',
    re.DOTALL,
)

VIEW_ALL_BLOCK = re.compile(
    r'\s*<p class="rixin-about-blog-all-wrap"><a href="blog\.html"[^>]*>[^<]*</a></p>\s*',
)


def process_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text

    if path.name == "about-rixin.html":
        text = MAIN_EQUIPMENT_SECTION.sub("\n\n", text)
        text = text.replace('id="about-blog"', 'id="technical-insights"')
        text = text.replace('<h2 id="blogSectionTitle">Blog</h2>', '<h2 id="blogSectionTitle">Technical Insights</h2>')
        text = text.replace('<h2 id="blogSectionTitle">博客</h2>', '<h2 id="blogSectionTitle">技术洞察</h2>')
        text = text.replace('<h2 id="blogSectionTitle">ブログ</h2>', '<h2 id="blogSectionTitle">技術インサイト</h2>')
        text = VIEW_ALL_BLOCK.sub("\n", text)

    for pat in MAIN_EQUIP_PATTERNS:
        text = pat.sub("", text)

    for old, new in ANCHOR_REPLACEMENTS:
        text = text.replace(old, new)

    for old, new in MEGA_LABEL_REPLACEMENTS:
        text = text.replace(old, new)

    for old, new in FOOTER_BLOG_REPLACEMENTS:
        text = text.replace(old, new)

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    updated = 0
    for path in sorted(ROOT.rglob("*.html")):
        if "scripts" in path.parts:
            continue
        if process_file(path):
            print(f"OK: {path.relative_to(ROOT)}")
            updated += 1
    print(f"\nUpdated {updated} files.")


if __name__ == "__main__":
    main()
