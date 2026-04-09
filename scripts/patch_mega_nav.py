#!/usr/bin/env python3
"""One-off: replace Capabilities / Industries sub-menu blocks with mega menus (en/zh/ja)."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

CAP_EN = """\t\t\t\t\t\t\t<li class="contains-mega-sub-menu{current}">
\t\t\t\t\t\t\t\t<a href="capabilities.html" id="tab5">Capabilities</a>
\t\t\t\t\t\t\t\t<ul class="mega-sub-menu row rixin-mega" data-mega-label="Capabilities ›">
\t\t\t\t\t\t\t\t\t<li class="rixin-mega-item">
\t\t\t\t\t\t\t\t\t\t<a href="capabilities.html" id="tab6">Design</a>
\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">From concept to manufacturable drawings: product design, mold engineering, and DFM for stable production.</p>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t\t<li class="rixin-mega-item">
\t\t\t\t\t\t\t\t\t\t<a href="capabilities.html" id="tab7">Mould Parts</a>
\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">Precision cavities, cores, inserts, and mold components built for long-run repeatability.</p>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t\t<li class="rixin-mega-item">
\t\t\t\t\t\t\t\t\t\t<a href="capabilities.html" id="tab8">Injection Molding</a>
\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">High-volume OEM plastic injection molding for tight-tolerance industrial and consumer parts.</p>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t\t<li class="rixin-mega-item">
\t\t\t\t\t\t\t\t\t\t<a href="capabilities.html" id="tab9">Stamping Die</a>
\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">Progressive and metal stamping tooling for brackets, shells, and sheet-metal assemblies.</p>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t\t<li class="rixin-mega-item">
\t\t\t\t\t\t\t\t\t\t<a href="capabilities.html" id="tab10">Die Casting</a>
\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">Aluminum and zinc die casting for structural, thermal, and functional metal components.</p>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t</ul>
\t\t\t\t\t\t\t</li>"""

IND_EN = """\t\t\t\t\t\t\t<li class="contains-mega-sub-menu{current}">
\t\t\t\t\t\t\t\t<a href="industries.html" id="tab11">Industries</a>
\t\t\t\t\t\t\t\t<ul class="mega-sub-menu row rixin-mega" data-mega-label="Industries ›">
\t\t\t\t\t\t\t\t\t<li class="rixin-mega-item">
\t\t\t\t\t\t\t\t\t\t<a href="industries.html" id="tab12">Automotive Parts</a>
\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">Tier-style supply for powertrain, interior, and under-hood precision components.</p>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t\t<li class="rixin-mega-item">
\t\t\t\t\t\t\t\t\t\t<a href="industries.html" id="tab13">Mould Parts</a>
\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">Mold bases, cores, and cavity tooling supporting plastics and die casting programs.</p>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t\t<li class="rixin-mega-item">
\t\t\t\t\t\t\t\t\t\t<a href="industries.html" id="tab14">Medical Parts</a>
\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">Process discipline for devices and instruments with traceable quality expectations.</p>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t\t<li class="rixin-mega-item">
\t\t\t\t\t\t\t\t\t\t<a href="industries.html" id="tab15">Appliances</a>
\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">Housings, brackets, and functional assemblies for home appliance OEMs.</p>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t\t<li class="rixin-mega-item">
\t\t\t\t\t\t\t\t\t\t<a href="industries.html" id="tab16">Injection Moulding</a>
\t\t\t\t\t\t\t\t\t\t<p class="rixin-mega-desc">Turnkey injection molding programs from tooling validation through serial production.</p>
\t\t\t\t\t\t\t\t\t</li>
\t\t\t\t\t\t\t\t</ul>
\t\t\t\t\t\t\t</li>"""

CAP_ZH = CAP_EN.replace("Capabilities ›", "制造能力 ›").replace(
    "Capabilities</a>", "能力</a>"
).replace(
    """<p class="rixin-mega-desc">From concept to manufacturable drawings: product design, mold engineering, and DFM for stable production.</p>""",
    """<p class="rixin-mega-desc">从概念到可制造图纸：产品设计、模具工程与面向量产的 DFM/工艺优化。</p>""",
).replace(
    """<p class="rixin-mega-desc">Precision cavities, cores, inserts, and mold components built for long-run repeatability.</p>""",
    """<p class="rixin-mega-desc">精密型腔、型芯、镶件及模具零件，满足长期稳定量产。</p>""",
).replace(
    """<p class="rixin-mega-desc">High-volume OEM plastic injection molding for tight-tolerance industrial and consumer parts.</p>""",
    """<p class="rixin-mega-desc">大批量 OEM 注塑成型，适用于工业与消费类精密件。</p>""",
).replace(
    """<p class="rixin-mega-desc">Progressive and metal stamping tooling for brackets, shells, and sheet-metal assemblies.</p>""",
    """<p class="rixin-mega-desc">级进模与冲压模具，用于支架、外壳及钣金总成。</p>""",
).replace(
    """<p class="rixin-mega-desc">Aluminum and zinc die casting for structural, thermal, and functional metal components.</p>""",
    """<p class="rixin-mega-desc">铝、锌合金压铸，用于结构件、散热与功能金属件。</p>""",
)

IND_ZH = IND_EN.replace("Industries ›", "行业应用 ›").replace(
    "Industries</a>", "行业</a>"
).replace(
    """<p class="rixin-mega-desc">Tier-style supply for powertrain, interior, and under-hood precision components.</p>""",
    """<p class="rixin-mega-desc">面向动力总成、内饰与发动机舱等精密零部件的配套供应经验。</p>""",
).replace(
    """<p class="rixin-mega-desc">Mold bases, cores, and cavity tooling supporting plastics and die casting programs.</p>""",
    """<p class="rixin-mega-desc">模架、型芯与型腔等模具配套，支撑注塑与压铸项目。</p>""",
).replace(
    """<p class="rixin-mega-desc">Process discipline for devices and instruments with traceable quality expectations.</p>""",
    """<p class="rixin-mega-desc">面向医疗器械与仪器类零件，强调过程控制与可追溯质量。</p>""",
).replace(
    """<p class="rixin-mega-desc">Housings, brackets, and functional assemblies for home appliance OEMs.</p>""",
    """<p class="rixin-mega-desc">家电 OEM 外壳、支架及功能组件的一体化制造支持。</p>""",
).replace(
    """<p class="rixin-mega-desc">Turnkey injection molding programs from tooling validation through serial production.</p>""",
    """<p class="rixin-mega-desc">从模具验证到批量生产的注塑项目一站式交付。</p>""",
)

CAP_JA = CAP_EN.replace("Capabilities ›", "キャパビリティ ›").replace(
    "Capabilities</a>", "能力</a>"
).replace(
    """<p class="rixin-mega-desc">From concept to manufacturable drawings: product design, mold engineering, and DFM for stable production.</p>""",
    """<p class="rixin-mega-desc">コンセプトから量産図面まで。製品設計、金型設計、量産性を見据えた DFM を支援します。</p>""",
).replace(
    """<p class="rixin-mega-desc">Precision cavities, cores, inserts, and mold components built for long-run repeatability.</p>""",
    """<p class="rixin-mega-desc">長期量産に耐える精密キャビティ・コア・インサートおよび金型部品。</p>""",
).replace(
    """<p class="rixin-mega-desc">High-volume OEM plastic injection molding for tight-tolerance industrial and consumer parts.</p>""",
    """<p class="rixin-mega-desc">産業・民生向けの高精度 OEM プラスチック射出成形。</p>""",
).replace(
    """<p class="rixin-mega-desc">Progressive and metal stamping tooling for brackets, shells, and sheet-metal assemblies.</p>""",
    """<p class="rixin-mega-desc">ブラケットや筐体などの板金組立に対応する順送・プレス金型。</p>""",
).replace(
    """<p class="rixin-mega-desc">Aluminum and zinc die casting for structural, thermal, and functional metal components.</p>""",
    """<p class="rixin-mega-desc">構造・放熱・機能を担うアルミ・亜鉛ダイカスト部品。</p>""",
)

IND_JA = IND_EN.replace("Industries ›", "業界・市場 ›").replace(
    "Industries</a>", "業界</a>"
).replace(
    """<p class="rixin-mega-desc">Tier-style supply for powertrain, interior, and under-hood precision components.</p>""",
    """<p class="rixin-mega-desc">パワートレイン、インテリア、エンジンルーム向け精密部品のサプライ実績。</p>""",
).replace(
    """<p class="rixin-mega-desc">Mold bases, cores, and cavity tooling supporting plastics and die casting programs.</p>""",
    """<p class="rixin-mega-desc">樹脂・ダイカスト向けのモールドベース、コア、キャビティなど金型周辺部品。</p>""",
).replace(
    """<p class="rixin-mega-desc">Process discipline for devices and instruments with traceable quality expectations.</p>""",
    """<p class="rixin-mega-desc">医療機器・計測機器向けに、トレーサビリティを意識した工程管理。</p>""",
).replace(
    """<p class="rixin-mega-desc">Housings, brackets, and functional assemblies for home appliance OEMs.</p>""",
    """<p class="rixin-mega-desc">家電 OEM の筐体、ブラケット、機能アセンブリの製造支援。</p>""",
).replace(
    """<p class="rixin-mega-desc">Turnkey injection molding programs from tooling validation through serial production.</p>""",
    """<p class="rixin-mega-desc">金型立ち上げから量産まで一気通貫の射出成形プログラム。</p>""",
)

CAP_PAT = re.compile(
    r"<li(?P<attrs>(?:\s+[^>]+)?)>\s*"
    r'<a href="business\.html" id="tab5">.*?</a>\s*'
    r'<ul class="sub-menu">.*?</ul>\s*'
    r"</li>",
    re.DOTALL,
)

IND_PAT = re.compile(
    r"<li(?P<attrs>(?:\s+[^>]+)?)>\s*"
    r'<a href="products\.html" id="tab11">.*?</a>\s*'
    r'<ul class="sub-menu">.*?</ul>\s*'
    r"</li>",
    re.DOTALL,
)


def cap_block_for(attrs: str, lang: str) -> str:
    cur = ""
    if attrs and "current" in attrs:
        cur = " current"
    if lang == "zh":
        raw = CAP_ZH
    elif lang == "ja":
        raw = CAP_JA
    else:
        raw = CAP_EN
    return raw.format(current=cur)


def ind_block_for(lang: str, attrs: str) -> str:
    cur = ""
    if attrs and "current" in attrs:
        cur = " current"
    if lang == "zh":
        raw = IND_ZH
    elif lang == "ja":
        raw = IND_JA
    else:
        raw = IND_EN
    return raw.format(current=cur)


def patch_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    if 'id="tab5"' not in text:
        return False
    rel = path.relative_to(ROOT)
    if str(rel).startswith("zh/"):
        lang = "zh"
    elif str(rel).startswith("ja/"):
        lang = "ja"
    else:
        lang = "en"

    def cap_sub(m: re.Match) -> str:
        return cap_block_for(m.group("attrs") or "", lang)

    new_text, n_cap = CAP_PAT.subn(cap_sub, text, count=1)
    new_text, n_ind = IND_PAT.subn(lambda m: ind_block_for(lang, m.group("attrs") or ""), new_text, count=1)
    if n_cap != 1 or n_ind != 1:
        raise RuntimeError(f"{path}: expected 1 cap + 1 ind match, got {n_cap}, {n_ind}")
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        return True
    return False


def main() -> None:
    html_files = list(ROOT.glob("*.html")) + list((ROOT / "zh").glob("*.html")) + list((ROOT / "ja").glob("*.html"))
    changed = []
    for f in sorted(html_files):
        if f.name == "thank-you.html":
            continue
        if patch_file(f):
            changed.append(f)
    print(f"Patched {len(changed)} files")


if __name__ == "__main__":
    main()
