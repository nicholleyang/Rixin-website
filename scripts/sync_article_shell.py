#!/usr/bin/env python3
"""Sync fixed article pages with the homepage header and footer."""
import posixpath
import re
from pathlib import Path
from typing import Tuple

ROOT = Path(__file__).resolve().parent.parent

LOCALES = {
    "en": {
        "home": ROOT / "index.html",
        "source_dir": "",
        "article_dir": ROOT / "blog",
        "site_dir": "blog",
        "label": "EN",
        "aria": "Language",
        "flag": "Usa.png",
        "flag_alt": "English",
    },
    "zh": {
        "home": ROOT / "zh" / "index.html",
        "source_dir": "zh",
        "article_dir": ROOT / "zh" / "blog",
        "site_dir": "zh/blog",
        "label": "中文",
        "aria": "语言",
        "flag": "China.png",
        "flag_alt": "中文",
    },
    "ja": {
        "home": ROOT / "ja" / "index.html",
        "source_dir": "ja",
        "article_dir": ROOT / "ja" / "blog",
        "site_dir": "ja/blog",
        "label": "日本語",
        "aria": "言語",
        "flag": "Japan.png",
        "flag_alt": "日本語",
    },
}


def extract_block(text: str, tag: str) -> str:
    match = re.search(rf"<{tag}\b.*?</{tag}>", text, re.DOTALL)
    if not match:
        raise ValueError(f"Could not find <{tag}> block")
    return match.group(0)


def root_path(source_dir: str, value: str) -> str:
    if source_dir:
        return posixpath.normpath(posixpath.join(source_dir, value))
    return posixpath.normpath(value)


def to_relative(site_dir: str, root_value: str) -> str:
    rel = posixpath.relpath(root_value, site_dir)
    return rel if rel != "." else ""


def rewrite_paths(block: str, source_dir: str, site_dir: str) -> str:
    def repl(match: re.Match) -> str:
        attr, quote, value = match.groups()
        if (
            value.startswith(("http://", "https://", "mailto:", "tel:", "#", "/"))
            or value.startswith("data:")
            or not value
        ):
            return match.group(0)
        root_value = root_path(source_dir, value)
        return f"{attr}={quote}{to_relative(site_dir, root_value)}{quote}"

    return re.sub(r'\b(href|src|action)=(["\'])([^"\']+)\2', repl, block)


def language_nav(locale: str, slug: str) -> str:
    loc = LOCALES[locale]
    img_prefix = to_relative(loc["site_dir"], "images")
    current_href = f"/{loc['site_dir']}/{slug}.html"
    links = {
        "zh": f"/zh/blog/{slug}.html",
        "en": f"/blog/{slug}.html",
        "ja": f"/ja/blog/{slug}.html",
    }
    return (
        f'<li class="contains-mega-sub-menu rixin-language-nav">\n'
        f'\t\t\t\t\t\t\t\t\t\t<a href="{current_href}" class="rixin-language-toggle" aria-label="{loc["aria"]}">'
        f'<img src="{img_prefix}/{loc["flag"]}" alt="{loc["flag_alt"]}" class="rixin-language-flag rixin-language-trigger-flag">'
        f'<span class="rixin-language-label">{loc["label"]}</span></a>\n'
        f'\t\t\t\t\t\t\t\t\t\t<ul class="sub-menu">\n'
        f'\t\t\t\t\t\t\t\t\t\t\t<li><a href="{links["zh"]}" hreflang="zh-CN"><img src="{img_prefix}/China.png" alt="中文" class="rixin-language-flag">中文</a></li>\n'
        f'\t\t\t\t\t\t\t\t\t\t\t<li><a href="{links["en"]}" hreflang="en"><img src="{img_prefix}/Usa.png" alt="English" class="rixin-language-flag">English</a></li>\n'
        f'\t\t\t\t\t\t\t\t\t\t\t<li><a href="{links["ja"]}" hreflang="ja"><img src="{img_prefix}/Japan.png" alt="日本語" class="rixin-language-flag">日本語</a></li>\n'
        f'\t\t\t\t\t\t\t\t\t\t</ul>\n'
        f'\t\t\t\t\t\t\t\t\t</li>'
    )


def replace_language_nav(header: str, locale: str, slug: str) -> str:
    start = header.find('<li class="contains-mega-sub-menu rixin-language-nav"')
    quote = header.find('<li class="rixin-quote-item"', start)
    if start == -1 or quote == -1:
        raise ValueError("Could not locate language nav block")
    return header[:start] + language_nav(locale, slug) + "\n\t\t\t\t\t\t\t\t\t" + header[quote:]


def shell_for(locale: str, slug: str) -> Tuple[str, str]:
    loc = LOCALES[locale]
    home_text = loc["home"].read_text(encoding="utf-8")
    header = rewrite_paths(extract_block(home_text, "header"), loc["source_dir"], loc["site_dir"])
    footer = rewrite_paths(extract_block(home_text, "footer"), loc["source_dir"], loc["site_dir"])
    return replace_language_nav(header, locale, slug), footer


def replace_block(text: str, tag: str, replacement: str) -> str:
    return re.sub(rf"<{tag}\b.*?</{tag}>", replacement, text, count=1, flags=re.DOTALL)


def main() -> None:
    updated = 0
    for locale, loc in LOCALES.items():
        for path in sorted(loc["article_dir"].glob("*.html")):
            slug = path.stem
            text = path.read_text(encoding="utf-8")
            article_match = re.search(
                r'<article class="section-block rixin-blog-article">.*?</article>',
                text,
                re.DOTALL,
            )
            if not article_match:
                raise ValueError(f"Missing article block: {path}")
            original_article = article_match.group(0)
            header, footer = shell_for(locale, slug)
            new_text = replace_block(text, "header", header)
            new_text = replace_block(new_text, "footer", footer)
            new_article = re.search(
                r'<article class="section-block rixin-blog-article">.*?</article>',
                new_text,
                re.DOTALL,
            ).group(0)
            if new_article != original_article:
                raise ValueError(f"Article content changed unexpectedly: {path}")
            if new_text != text:
                path.write_text(new_text, encoding="utf-8")
                print(f"OK: {path.relative_to(ROOT)}")
                updated += 1
    print(f"\nUpdated {updated} article pages.")


if __name__ == "__main__":
    main()
