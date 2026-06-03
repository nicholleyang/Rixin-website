#!/usr/bin/env python3
"""Deprecated: article pages are now maintained as fixed HTML files.

Do not run this script for production updates. It is kept only as historical
reference for the first article-page generation pass.
"""
import json
import sys
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = Path(__file__).resolve().parent / "blog-article-data.json"
BASE_URL = "https://rixin-dl.com"

LOCALES = {
    "en": {
        "lang": "en",
        "dir": ROOT / "blog",
        "url_prefix": "/blog",
        "root": "..",
        "home": "/",
        "about_path": "../about-rixin.html",
        "about_insights": "../about-rixin.html#technical-insights",
        "insights_label": "Technical Insights",
        "nav_home": "Home",
        "nav_capabilities": "Capabilities",
        "nav_industries": "Industries",
        "nav_about": "About Us",
        "nav_contact": "Contact",
        "footer_company": "Company",
        "quote": "Get Quote",
        "hreflang": {
            "en": lambda slug: f"/blog/{slug}.html",
            "zh": lambda slug: f"/zh/blog/{slug}.html",
            "ja": lambda slug: f"/ja/blog/{slug}.html",
        },
        "lang_links": lambda slug: (
            f'../zh/blog/{slug}.html',
            f"{slug}.html",
            f'../ja/blog/{slug}.html',
        ),
    },
    "zh": {
        "lang": "zh-CN",
        "dir": ROOT / "zh" / "blog",
        "url_prefix": "/zh/blog",
        "root": "../..",
        "home": "/zh/",
        "about_path": "../about-rixin.html",
        "about_insights": "../about-rixin.html#technical-insights",
        "insights_label": "技术洞察",
        "nav_home": "主页",
        "nav_capabilities": "制造能力",
        "nav_industries": "行业应用",
        "nav_about": "关于我们",
        "nav_contact": "联系我们",
        "footer_company": "公司",
        "quote": "获取报价",
        "hreflang": {
            "en": lambda slug: f"/blog/{slug}.html",
            "zh": lambda slug: f"/zh/blog/{slug}.html",
            "ja": lambda slug: f"/ja/blog/{slug}.html",
        },
        "lang_links": lambda slug: (
            f"{slug}.html",
            f"../../blog/{slug}.html",
            f"../ja/blog/{slug}.html",
        ),
    },
    "ja": {
        "lang": "ja",
        "dir": ROOT / "ja" / "blog",
        "url_prefix": "/ja/blog",
        "root": "../..",
        "home": "/ja/",
        "about_path": "../about-rixin.html",
        "about_insights": "../about-rixin.html#technical-insights",
        "insights_label": "技術インサイト",
        "nav_home": "ホーム",
        "nav_capabilities": "キャパビリティ",
        "nav_industries": "業界・市場",
        "nav_about": "私たちについて",
        "nav_contact": "お問い合わせ",
        "footer_company": "会社情報",
        "quote": "見積依頼",
        "hreflang": {
            "en": lambda slug: f"/blog/{slug}.html",
            "zh": lambda slug: f"/zh/blog/{slug}.html",
            "ja": lambda slug: f"/ja/blog/{slug}.html",
        },
        "lang_links": lambda slug: (
            f"../../zh/blog/{slug}.html",
            f"../../blog/{slug}.html",
            f"{slug}.html",
        ),
    },
}


def paragraphs_html(paragraphs):
    return "\n".join(f"\t\t\t\t\t\t<p>{escape(p)}</p>" for p in paragraphs)


def build_page(post: dict, locale_key: str) -> str:
    loc = LOCALES[locale_key]
    slug = post["slug"]
    content = post[locale_key]
    root = loc["root"]
    image = f"{root}/{post['image']}"
    related = f"{root}/{post['related']}"
    canonical = f"{BASE_URL}{loc['url_prefix']}/{slug}.html"
    href_en = f"{BASE_URL}{loc['hreflang']['en'](slug)}"
    href_zh = f"{BASE_URL}{loc['hreflang']['zh'](slug)}"
    href_ja = f"{BASE_URL}{loc['hreflang']['ja'](slug)}"
    link_zh, link_en, link_ja = loc["lang_links"](slug)

    title = content["title"]
    meta = content["meta"]
    body = paragraphs_html(content["paragraphs"])
    insights_label = loc["insights_label"]

    return f"""<!DOCTYPE html>
<html lang="{loc['lang']}">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<link rel="canonical" href="{canonical}" />
	<link rel="alternate" hreflang="en" href="{href_en}" />
	<link rel="alternate" hreflang="zh-CN" href="{href_zh}" />
	<link rel="alternate" hreflang="ja" href="{href_ja}" />
	<link rel="alternate" hreflang="x-default" href="{href_en}" />
	<meta name="description" content="{escape(meta)}" />
	<title>RIXIN | {escape(title)}</title>
	<link rel="icon" href="{root}/images/rixin.ico" type="image/x-icon">
	<link rel="stylesheet" href="{root}/css/core.min.css" />
	<link rel="stylesheet" href="{root}/css/skin.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
</head>
<body class="RIXIN Blog">

	<div class="wrapper">
		<div class="wrapper-inner">

			<header class="header header-fixed header-fixed-on-mobile header-transparent" data-bkg-threshold="100" data-compact-threshold="100">
				<div class="header-inner">
					<div class="row nav-bar">
						<div class="column width-12 nav-bar-inner">
							<div class="logo">
								<div class="logo-inner">
									<a href="{loc['home']}"><img src="{root}/images/Rixin-logo.png" alt="RIXIN" /></a>
									<a href="{loc['home']}"><img src="{root}/images/dark-logo.png" alt="RIXIN" /></a>
								</div>
							</div>
							<nav class="navigation nav-block primary-navigation nav-right">
								<ul>
									<li><a href="{loc['home']}">{loc['nav_home']}</a></li>
									<li><a href="{root}/capabilities.html">{loc['nav_capabilities']}</a></li>
									<li><a href="{root}/industries.html">{loc['nav_industries']}</a></li>
									<li><a href="{loc['about_path']}">{loc['nav_about']}</a></li>
									<li><a href="{root}/contact.html">{loc['nav_contact']}</a></li>
									<li class="contains-mega-sub-menu rixin-language-nav">
										<a href="{link_en}" class="rixin-language-toggle" aria-label="Language"><img src="{root}/images/Usa.png" alt="English" class="rixin-language-flag"><span class="rixin-language-label">EN</span></a>
										<ul class="sub-menu">
											<li><a href="{link_zh}" hreflang="zh-CN"><img src="{root}/images/China.png" alt="中文" class="rixin-language-flag">中文</a></li>
											<li><a href="{link_en}" hreflang="en"><img src="{root}/images/Usa.png" alt="English" class="rixin-language-flag">English</a></li>
											<li><a href="{link_ja}" hreflang="ja"><img src="{root}/images/Japan.png" alt="日本語" class="rixin-language-flag">日本語</a></li>
										</ul>
									</li>
									<li class="rixin-quote-item"><a href="{root}/contact.html" class="button rixin-quote-button">{loc['quote']}</a></li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</header>

			<article class="section-block rixin-blog-article">
				<div class="rixin-blog-article-inner">
					<p class="rixin-blog-article-breadcrumb"><a href="{loc['about_insights']}">{escape(insights_label)}</a> <span aria-hidden="true">/</span> <span>{escape(title)}</span></p>
					<div class="rixin-blog-article-hero">
						<img src="{image}" alt="{escape(title)}">
					</div>
					<h1>{escape(title)}</h1>
					<div class="rixin-blog-article-body">
{body}
					</div>
					<div class="rixin-blog-article-actions">
						<a href="{related}" class="button rixin-blog-article-related">{escape(content['related_label'])}</a>
						<a href="{loc['about_insights']}" class="rixin-blog-article-back">{escape(content['back_label'])} <span aria-hidden="true">&rarr;</span></a>
					</div>
				</div>
			</article>

			<footer class="footer rixin-footer">
				<div class="footer-top">
					<div class="rixin-footer-inner">
						<div class="rixin-footer-columns">
							<div class="rixin-footer-col rixin-footer-brand">
								<a href="{loc['home']}" class="rixin-footer-logo-link">
									<img src="{root}/images/rixin-wordmark-white.png" alt="RIXIN" class="rixin-footer-wordmark" width="180" height="60">
								</a>
							</div>
							<div class="rixin-footer-col">
								<h4 class="rixin-footer-col-title">{loc['footer_company']}</h4>
								<ul class="rixin-footer-links">
									<li><a href="{loc['about_path']}">{loc['nav_about']}</a></li>
									<li><a href="{loc['about_insights']}">{insights_label}</a></li>
									<li><a href="{root}/contact.html">{loc['nav_contact']}</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="footer-bottom">
					<div class="rixin-footer-inner">
						<div class="rixin-footer-bottom-bar">
							<p class="copyright rixin-footer-copyright">&copy; 日信精密模塑有限公司. All Rights Reserved.</p>
						</div>
					</div>
				</div>
			</footer>

		</div>
	</div>

	<script src="{root}/js/timber.master.min.js"></script>
	<script src="{root}/js/header-scroll.js"></script>
</body>
</html>
"""


def main() -> None:
    print(
        "generate_blog_articles.py is deprecated. "
        "Article HTML is now edited directly so content is not regenerated.",
        file=sys.stderr,
    )
    raise SystemExit(1)

    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    count = 0
    for post in data["posts"]:
        for locale_key in ("en", "zh", "ja"):
            out_dir = LOCALES[locale_key]["dir"]
            out_dir.mkdir(parents=True, exist_ok=True)
            path = out_dir / f"{post['slug']}.html"
            path.write_text(build_page(post, locale_key), encoding="utf-8")
            print(f"Wrote {path.relative_to(ROOT)}")
            count += 1
    print(f"\nGenerated {count} article pages.")


if __name__ == "__main__":
    main()
