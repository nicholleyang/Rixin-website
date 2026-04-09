#!/usr/bin/env python3
"""Generate zh/ and ja/ HTML copies with asset path fixes, hreflang URLs, and locale defaults."""
from __future__ import annotations

import os
import re
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://www.rixin-dl.com"

FILES = [
    "index.html",
    "capabilities.html",
    "industries.html",
    "about-rixin.html",
    "contact.html",
    "b-prototyping.html",
    "b-die-casting.html",
    "b-cnc-machining.html",
    "b-mould-parts.html",
    "b-stamping-die.html",
    "b-injection.html",
]

# Per-file: (html_lang, default_lang_js, title, meta_description, og_title, og_desc)
ZH = {
    "index.html": (
        "zh-CN",
        "zh",
        "日信精密模塑 | 大连注塑代加工与精密零件出口",
        "日信精密模塑（大连）自2004年专注注塑代加工与精密零件出口，兼营冲压、压铸、精密模具零部件与产品开发，服务全球汽车、医疗及工业客户。",
        "日信 | 注塑代加工与精密零件出口 | 大连",
        "大连注塑代加工、精密成型与精密零件出口一站服务。",
    ),
    "capabilities.html": (
        "zh-CN",
        "zh",
        "日信 | 注塑代加工与精密零件出口 — 业务范围",
        "日信大连业务范围涵盖注塑代加工、模具与产品设计、模具零部件、冲压、压铸与CNC，为精密零件出口与外贸项目提供从设计到交付的一站式代工制造。",
        "日信 | 注塑代加工与出口制造范围",
        "注塑代加工、精密加工与精密零件出口项目全流程支持。",
    ),
    "industries.html": (
        "zh-CN",
        "zh",
        "日信 | 精密零件出口与注塑代加工件供应",
        "日信精密零件出口与外贸供货：汽车、医疗、家电、模具零件及注塑代加工件，大连工厂稳定供应国际OEM与出口订单。",
        "日信 | 精密零件出口与注塑压铸件",
        "精密零部件出口、注塑代加工件全球交付。",
    ),
    "about-rixin.html": (
        "zh-CN",
        "zh",
        "日信 | 关于我们 — 注塑代加工与出口制造能力",
        "了解日信大连工厂、主要设备及精密成型与注塑代加工产能，服务精密零件出口与外贸客户的量产需求。",
        "日信 | 关于我们 — 注塑代工与出口产能",
        "设备与能力支撑注塑代加工及精密零件出口。",
    ),
    "contact.html": (
        "zh-CN",
        "zh",
        "日信 | 联系我们 — 注塑代加工与精密零件出口 | 大连",
        "注塑代加工、精密零件出口与模具项目询盘请联系日信：大连开发区，电话0411-39014829，邮箱info@rixin-dl.com。",
        "日信 | 联系我们 — 注塑代加工与出口询盘",
        "大连日信：注塑代加工与精密零件出口报价与技术支持。",
    ),
    "b-prototyping.html": (
        "zh-CN",
        None,
        "日信 | 快速原型 — 注塑代加工前验证",
        "日信快速原型：在注塑代加工与精密零件出口量产前验证设计，缩短外贸项目开发周期、降低开模风险。",
        "日信 | 快速原型与注塑代加工前验证",
        "原型验证服务，衔接出口级注塑量产。",
    ),
    "b-die-casting.html": (
        "zh-CN",
        None,
        "日信 | 压铸模具与精密压铸件出口",
        "日信压铸模具与压铸件代工：从图纸或样品到试模交付，服务汽车、家电等精密零件出口与外贸订单。",
        "日信 | 压铸模具与出口压铸件",
        "压铸代工支持全球供应链与出口项目。",
    ),
    "b-cnc-machining.html": (
        "zh-CN",
        None,
        "日信 | 精密CNC加工 — 精密零件出口配套",
        "日信精密CNC加工：模具镶件、工装与工业件按图加工，为精密零件出口与注塑/压铸配套提供稳定供货。",
        "日信 | 精密CNC加工与零件出口配套",
        "高精度加工件服务出口制造与模具项目。",
    ),
    "b-mould-parts.html": (
        "zh-CN",
        None,
        "日信 | 精密模具零件出口与镶件供应",
        "日信精密模具零件出口供应：注塑、冲压、压铸模镶件与配套件，服务国际OEM与外贸模具项目。",
        "日信 | 精密模具零件出口",
        "模具级精密零部件全球交付。",
    ),
    "b-stamping-die.html": (
        "zh-CN",
        None,
        "日信 | 冲压模具代工与出口钣金件",
        "日信冲压模具代工：汽车、家电及工业钣金件用连续模、多工位模，配套精密零件出口与外贸冲压件项目。",
        "日信 | 冲压模具与出口钣金件配套",
        "冲压模具设计制造服务出口供应链。",
    ),
    "b-injection.html": (
        "zh-CN",
        None,
        "日信 | 注塑代加工与注塑模具一站式",
        "日信大连注塑代加工：注塑模具设计、制造、试模至量产，面向精密零件出口与外贸客户的OEM塑料件一站式代工。",
        "日信 | 注塑代加工与注塑模具",
        "注塑代加工与模具全流程，服务出口订单。",
    ),
}

JA = {
    "index.html": (
        "ja",
        "ja",
        "RIXIN | 大連 射出成形受託・精密部品輸出",
        "2004年設立、大連のRIXIN（日新精密成形）。射出成形受託、プレス、ダイキャスト、精密金型部品と海外向け精密部品輸出を医療・自動車・産業向けに提供。",
        "RIXIN | 射出成形受託・精密部品輸出 | 大連",
        "中国大連からの受託製造と精密部品輸出パートナー。",
    ),
    "capabilities.html": (
        "ja",
        "ja",
        "RIXIN | 射出成形受託・精密部品輸出の事業範囲",
        "大連RIXINの受託製造：金型・製品設計、射出成形受託、プレス、ダイキャスト、CNCまで一貫対応。海外向け精密部品輸出プログラムを設計から納品まで支援。",
        "RIXIN | 受託製造・輸出対応の事業範囲",
        "射出成形受託と精密部品輸出のトータルサポート。",
    ),
    "industries.html": (
        "ja",
        "ja",
        "RIXIN | 精密部品輸出・射出成形製品",
        "精密部品輸出向け製品：自動車、医療、家電、金型部品、射出成形品を大連工場からグローバルOEM供給。海外輸出に対応した品質管理。",
        "RIXIN | 精密部品輸出・成形製品",
        "輸出対応の精密成形・加工製品ラインアップ。",
    ),
    "about-rixin.html": (
        "ja",
        "ja",
        "RIXIN | 射出成形受託・輸出向け製造能力",
        "大連工場の設備と射出成形受託・精密部品輸出を支えるRIXINの製造能力をご紹介。",
        "RIXIN | 会社・設備と輸出製造能力",
        "受託成形と輸出向け量産を支える拠点紹介。",
    ),
    "contact.html": (
        "ja",
        "ja",
        "RIXIN | お問い合わせ — 射出成形受託・精密部品輸出",
        "射出成形受託・精密部品輸出のお見積りはRIXIN大連へ。0411-39014829、info@rixin-dl.com。開発区拠点。",
        "RIXIN | お問い合わせ — 受託・輸出",
        "大連オフィス：受託成形と輸出案件のご相談。",
    ),
    "b-prototyping.html": (
        "ja",
        None,
        "RIXIN | プロトタイピング — 射出成形受託前検証",
        "射出成形受託・精密部品輸出の量産前に、大連RIXINで迅速プロトタイプ。設計検証とNPI短縮を支援。",
        "RIXIN | プロトタイプと受託成形前検証",
        "輸出向け量産に繋ぐ早期検証サービス。",
    ),
    "b-die-casting.html": (
        "ja",
        None,
        "RIXIN | ダイキャスト金型と精密部品輸出",
        "大連RIXINのダイキャスト金型とダイカスト部品：設計から試作・納品まで。自動車・家電向け精密ダイカスト部品の海外輸出に対応。",
        "RIXIN | ダイキャスト金型・輸出部品",
        "輸出向けダイキャストの一貫サービス。",
    ),
    "b-cnc-machining.html": (
        "ja",
        None,
        "RIXIN | 精密CNC加工と部品輸出",
        "精密部品輸出向けCNC加工：大連RIXINが金型インサート、治具、産業部品を図面通りに高精度加工。受託成形プログラムの部品供給も。",
        "RIXIN | 精密CNC加工・輸出部品",
        "輸出製造向け高精度加工サービス。",
    ),
    "b-mould-parts.html": (
        "ja",
        None,
        "RIXIN | 精密金型部品の輸出供給",
        "精密金型部品の輸出供給：射出・プレス・ダイキャスト向けインサート、スライド等を大連RIXINからグローバルOEMへ。",
        "RIXIN | 精密金型部品輸出",
        "輸出向け金型コンポーネント。",
    ),
    "b-stamping-die.html": (
        "ja",
        None,
        "RIXIN | プレス金型受託・輸出板金部品",
        "輸出向け板金部品向けプレス金型の設計・製造。自動車・家電・産業用スタンピングダイを大連RIXINが受託。",
        "RIXIN | プレス金型・輸出板金",
        "海外供給向けスタンピングダイ。",
    ),
    "b-injection.html": (
        "ja",
        None,
        "RIXIN | 射出成形受託・精密樹脂部品輸出",
        "大連RIXINの射出成形受託：金型設計・製作・試作から量産まで。海外向け精密樹脂部品輸出に対応したOEM一貫サービス。",
        "RIXIN | 射出成形受託・OEM",
        "精密部品輸出向け射出成形のトータルサポート。",
    ),
}


def prefix_assets(html: str) -> str:
    html = html.replace('href="css/', 'href="../css/')
    html = html.replace('href="images/', 'href="../images/')
    html = html.replace('src="js/', 'src="../js/')
    html = html.replace('src="images/', 'src="../images/')
    html = html.replace('url(images/', 'url(../images/')
    html = html.replace('action="php/', 'action="../php/')
    return html


def replace_language_block(html: str, fname: str, locale: str) -> str:
    if locale == "zh":
        zh_href, en_href, ja_href = fname, "../" + fname, "../ja/" + fname
    else:
        zh_href, en_href, ja_href = "../zh/" + fname, "../" + fname, fname

    block = f'''\t\t\t\t\t\t\t<div class="language-icon">
								<a href="{zh_href}" hreflang="zh-CN" title="中文"><img src="../images/China.png" alt="中文" class="language-icon"></a>
								<a href="{en_href}" hreflang="en" title="English"><img src="../images/Usa.png" alt="English" class="language-icon"></a>
								<a href="{ja_href}" hreflang="ja" title="日本語"><img src="../images/Japan.png" alt="日本語" class="language-icon"></a>
							</div>'''

    return re.sub(
        r'\s*<div class="language-icon">.*?</div>',
        "\n" + block,
        html,
        count=1,
        flags=re.DOTALL,
    )


def apply_seo(html: str, fname: str, spec: tuple, locale: str) -> str:
    lang, _, title, desc, og_title, og_desc = spec
    zh_url = f"{BASE}/zh/{fname}"
    ja_url = f"{BASE}/ja/{fname}"
    en_url = f"{BASE}/{fname}"
    if locale == "zh":
        canonical = zh_url
        og_locale = "zh_CN"
    else:
        canonical = ja_url
        og_locale = "ja_JP"

    html = re.sub(r"<html lang=\"[^\"]+\"", f'<html lang="{lang}"', html, count=1)
    html = re.sub(
        r'<link rel="canonical" href="[^"]+"\s*/>',
        f'<link rel="canonical" href="{canonical}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<link rel="alternate" hreflang="en" href="[^"]+"\s*/>',
        f'<link rel="alternate" hreflang="en" href="{en_url}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<link rel="alternate" hreflang="zh-CN" href="[^"]+"\s*/>',
        f'<link rel="alternate" hreflang="zh-CN" href="{zh_url}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<link rel="alternate" hreflang="ja" href="[^"]+"\s*/>',
        f'<link rel="alternate" hreflang="ja" href="{ja_url}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta name="description" content="[^"]*"\s*/>',
        f'<meta name="description" content="{desc}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:locale" content="[^"]+"\s*/>',
        f'<meta property="og:locale" content="{og_locale}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:title" content="[^"]*"\s*/>',
        f'<meta property="og:title" content="{og_title}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:url" content="[^"]+"\s*/>',
        f'<meta property="og:url" content="{canonical}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:image" content="[^"]+"\s*/>',
        f'<meta property="og:image" content="{BASE}/images/Rixin-logo.png" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta property="og:description" content="[^"]*"\s*/>',
        f'<meta property="og:description" content="{og_desc}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta name="twitter:title" content="[^"]*"\s*/>',
        f'<meta name="twitter:title" content="{og_title}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta name="twitter:description" content="[^"]*"\s*/>',
        f'<meta name="twitter:description" content="{og_desc}" />',
        html,
        count=1,
    )
    html = re.sub(
        r'<meta name="twitter:image" content="[^"]+"\s*/>',
        f'<meta name="twitter:image" content="{BASE}/images/Rixin-logo.png" />',
        html,
        count=1,
    )
    html = re.sub(r"<title>[^<]+</title>", f"<title>{title}</title>", html, count=1)
    return html


def inject_lang_default(html: str, lang_code: str | None) -> str:
    if not lang_code:
        return html
    # Insert before first ../js/lang*.js or js/lang*.js
    m = re.search(r'(<script src="\.\./js/lang[a-z]*\.js"></script>)', html)
    if m:
        ins = f'\t<script>window.RIXIN_DEFAULT_LANG="{lang_code}";</script>\n\t'
        return html.replace(m.group(1), ins + m.group(1), 1)
    return html


def build_locale(locale: str, spec_map: dict) -> None:
    out_dir = os.path.join(ROOT, locale)
    os.makedirs(out_dir, exist_ok=True)
    for fname in FILES:
        src = os.path.join(ROOT, fname)
        dst = os.path.join(out_dir, fname)
        shutil.copy2(src, dst)
        with open(dst, "r", encoding="utf-8") as f:
            html = f.read()
        html = prefix_assets(html)
        html = replace_language_block(html, fname, locale)
        html = apply_seo(html, fname, spec_map[fname], locale)
        html = inject_lang_default(html, spec_map[fname][1])
        with open(dst, "w", encoding="utf-8") as f:
            f.write(html)


def main() -> None:
    for d in ("zh", "ja"):
        p = os.path.join(ROOT, d)
        if os.path.isdir(p):
            shutil.rmtree(p)
    build_locale("zh", ZH)
    build_locale("ja", JA)
    print("Wrote zh/ and ja/ locale trees.")


if __name__ == "__main__":
    main()
