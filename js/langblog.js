function setHtml(id, value) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

function changeLanguage(language) {

  if (language === 'zh') {
    setHtml('tab1', '主页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
    setHtml('tab2', '关于我们')
    setHtml('tab3', '业务范围&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
    setHtml('tab4', '证书')
    setHtml('tab5', '制造能力')
    setHtml('tab6', '设计')
    setHtml('tab7', '模具零部件')
    setHtml('tab8', '注塑模具')
    setHtml('tab9', '冲压模具')
    setHtml('tab10', '压铸模具')
    setHtml('tab11', '行业应用')
    setHtml('tab12', '汽车零部件')
    setHtml('tab13', '模具零部件')
    setHtml('tab14', '医疗零部件')
    setHtml('tab15', '电器')
    setHtml('tab16', '注塑成型')
    setHtml('tab17', '关于我们&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
    setHtml('tab19', '联系我们&nbsp;&nbsp;&nbsp;')

    setHtml('page4', '关于我们')
    setHtml('part2', '资质认证')

    setHtml('megaOurStory', '我们的故事')
    setHtml('megaOurStoryDesc', '从大连精密模具起步，到服务全球出口制造的发展历程。')
    setHtml('storyTitle', '我们的故事')
    setHtml('storyP1', '自 2004 年在大连创立以来，日信从精密模具加工起步，逐步成长为服务汽车、医疗与工业 OEM 的全球制造合作伙伴。')
    setHtml('storyP2', '我们将 <span class="color-theme">注塑成型</span>、压铸、冲压模具与 <span class="color-theme">精密模具零部件</span> 相结合，并配备线切割、CNC 加工与一体化工装流程。')
    setHtml('storyP3', '从样件验证到批量生产，我们专注 DFM、稳定质量体系与快速响应的出口项目支持，帮助客户按期上市。')
    setHtml('storyP4', '准备讨论您的下一个项目？<a href="contact.html" id="storyCta" class="color-theme">立即开始。</a>')

    setHtml('timeline1Year', '2004')
    setHtml('timeline1Desc', '日信在大连成立，开启精密模具与成型制造业务。')
    setHtml('timeline2Year', '2010')
    setHtml('timeline2Desc', '扩充线切割、CNC 加工与模具零部件产能。')
    setHtml('timeline3Year', '2015')
    setHtml('timeline3Desc', '强化面向汽车、医疗与工业 OEM 的出口项目能力。')
    setHtml('timeline4Year', '2018')
    setHtml('timeline4Desc', '整合模具设计、工装与注塑成型的一体化工作流。')
    setHtml('timeline5Year', '2022')
    setHtml('timeline5Desc', '建立支撑批量生产的质量与环境管理体系。')

    setHtml('megaOurCulture', '我们的文化')
    setHtml('megaOurCultureDesc', '诚信、适应力、协作与担当——指引我们与客户和团队共事的方式。')
    setHtml('cultureEyebrow', '核心价值观')
    setHtml('cultureTitle', '文化基石：<span class="color-theme">我们的文化</span>')
    setHtml('culture1Title', '诚信')
    setHtml('culture1Desc', '我们坚持诚信原则，在与客户、供应商和员工的每一次互动中保持透明，以合乎道德的方式开展业务。')
    setHtml('culture2Title', '适应力')
    setHtml('culture2Desc', '在快速变化的市场环境中，我们保持灵活与敏捷，主动响应行业动态和客户需求，持续保持竞争优势。')
    setHtml('culture3Title', '协作')
    setHtml('culture3Desc', '我们相信内外协作的力量，汇聚多元视角、共享专业知识，在关键处交付精密，实现共同成功。')
    setHtml('culture4Title', '担当')
    setHtml('culture4Desc', '我们对行动与结果负责，以强烈的主人翁意识兑现承诺，推动项目取得切实成果。')

    setHtml('certExpandLabel', '展开下载')
    setHtml('certCloseLabel', '收起')
    setHtml('certAvailableLabel', '可提供版本：')
    setHtml('certAvailableLabel2', '可提供版本：')
    setHtml('cert1Title', 'ISO 9001:2015')
    setHtml('cert1Desc', '日信质量管理体系通过 ISO 9001:2015 认证，覆盖模具设计制造、标准模件生产及注塑产品开发等相关活动。')
    setHtml('cert1List', '<ul><li>证书编号：08921Q52943R0S</li><li>认证范围包括汽车/摩托车冲压模、注塑模、压缩模及塑料制品的设计与制造</li><li>支撑出口及批量生产项目的稳定过程控制</li></ul>')
    setHtml('cert2Title', 'ISO 14001:2015')
    setHtml('cert2Desc', '日信环境管理体系通过 ISO 14001:2015 认证，在大连工厂推行与环境责任一致的制造与管理实践。')
    setHtml('cert2List', '<ul><li>证书编号：00220E31659R1S</li><li>认证范围涵盖模具制造及相关管理活动，服务汽车、摩托车及工业项目</li><li>推动设计、生产与设施运营中的可持续发展</li></ul>')
    setHtml('cert1DownloadSite', '大连日信，中国')
    setHtml('cert2DownloadSite', '大连日信，中国')

    setHtml('blogSectionTitle', '技术洞察')
    setHtml('blogSectionLead', '精密加工、模具零部件与出口制造相关的技术解读。')
    setHtml('blogPost1Title', '什么是慢走丝线切割加工？')
    setHtml('blogPost2Title', 'CNC 铣削与慢走丝线切割对比')
    setHtml('blogPost3Title', '精密模具零部件如何影响模具质量')
    setHtml('blogPost4Title', '什么是精密公差加工？')
    setHtml('blogPost5Title', '如何选择精密模具制造商')
    setHtml('megaAboutBlog', '技术洞察')
    setHtml('megaAboutBlogDesc', '精密加工、模具零部件与出口制造相关的技术解读。')

    setHtml('companyName', '日信精密模塑有限公司')
    setHtml('footerPhone', '电话: 0411-39014829 / 0411-39014821')
    setHtml('footerEmail', '邮箱: <a href="mailto:info@rixin-dl.com">info@rixin-dl.com</a>')
    setHtml('address', '办公地址: 中国 辽宁大连开发区东北七街华盛达模具园 10-2-8')

  } else if (language === 'en') {
    setHtml('tab1', 'Home')
    setHtml('tab2', 'About Us')
    setHtml('tab3', 'Our Capabilities')
    setHtml('tab4', 'Certifications')
    setHtml('tab5', 'Capabilities')
    setHtml('tab6', 'Design')
    setHtml('tab7', 'Mould Parts')
    setHtml('tab8', 'Injection Molding')
    setHtml('tab9', 'Stamping Die')
    setHtml('tab10', 'Die Casting')
    setHtml('tab11', 'Industries')
    setHtml('tab12', 'Automotive Parts')
    setHtml('tab13', 'Mould Parts')
    setHtml('tab14', 'Medical Parts')
    setHtml('tab15', 'Appliances')
    setHtml('tab16', 'Injection Moulding')
    setHtml('tab17', 'About Us')
    setHtml('tab19', 'Contact')

    setHtml('page4', 'About Us')
    setHtml('part2', 'Certifications')

    setHtml('megaOurStory', 'Our Story')
    setHtml('megaOurStoryDesc', 'Our founding journey from Dalian precision molds to integrated export manufacturing.')
    setHtml('storyTitle', 'Our Story')
    setHtml('storyP1', 'Since 2004, RIXIN has grown from a precision mold shop in Dalian into a contract manufacturing partner serving automotive, medical, and industrial OEMs worldwide.')
    setHtml('storyP2', 'Our teams combine <span class="color-theme">injection molding</span>, die casting, stamping dies, and <span class="color-theme">precision mold components</span> with wire EDM, CNC machining, and integrated tooling workflows.')
    setHtml('storyP3', 'From prototype through volume production, we focus on DFM, stable quality systems, and responsive export programs that help global customers launch products on schedule.')
    setHtml('storyP4', 'Ready to discuss your next program? <a href="contact.html" id="storyCta" class="color-theme">Let\'s get started.</a>')

    setHtml('timeline1Year', '2004')
    setHtml('timeline1Desc', 'RIXIN established in Dalian; precision mold and molding operations begin.')
    setHtml('timeline2Year', '2010')
    setHtml('timeline2Desc', 'Expanded wire EDM, CNC machining, and mold component capacity.')
    setHtml('timeline3Year', '2015')
    setHtml('timeline3Desc', 'Strengthened export programs for automotive, medical, and industrial OEMs.')
    setHtml('timeline4Year', '2018')
    setHtml('timeline4Desc', 'Integrated mold design, tooling, and injection molding under one workflow.')
    setHtml('timeline5Year', '2022')
    setHtml('timeline5Desc', 'Quality and environmental management systems supporting volume production.')

    setHtml('megaOurCulture', 'Our Culture')
    setHtml('megaOurCultureDesc', 'The values that guide how we work with customers, suppliers, and teams.')
    setHtml('cultureEyebrow', 'THE VALUES')
    setHtml('cultureTitle', 'The Foundation Of <span class="color-theme">Our Culture</span>')
    setHtml('culture1Title', 'Integrity')
    setHtml('culture1Desc', 'We conduct ourselves with integrity, upholding ethical principles, and maintaining transparency in all our interactions with customers, suppliers, and employees.')
    setHtml('culture2Title', 'Adaptability')
    setHtml('culture2Desc', 'We thrive in a rapidly changing environment by being adaptable and flexible, proactively responding to market dynamics and customer needs to stay ahead of the competition.')
    setHtml('culture3Title', 'Collaboration')
    setHtml('culture3Desc', 'We believe in the power of collaboration, internally and externally, to leverage diverse perspectives, share knowledge, and achieve collective success in delivering precision where it matters most.')
    setHtml('culture4Title', 'Accountability')
    setHtml('culture4Desc', 'We take responsibility for our actions and outcomes, holding ourselves accountable to deliver on our commitments and drive results with a strong sense of ownership.')

    setHtml('certExpandLabel', 'Expand to Download')
    setHtml('certCloseLabel', 'Close')
    setHtml('certAvailableLabel', 'Available in:')
    setHtml('certAvailableLabel2', 'Available in:')
    setHtml('cert1Title', 'ISO 9001:2015')
    setHtml('cert1Desc', 'RIXIN operates a quality management system certified to ISO 9001:2015 for mold design and manufacturing, standard mold parts production, and plastic part development.')
    setHtml('cert1List', '<ul><li>Certificate No. 08921Q52943R0S</li><li>Scope covers automotive and motorcycle stamping molds, injection molds, compression molds, and related plastic products</li><li>Supports consistent process control for export and volume production programs</li></ul>')
    setHtml('cert2Title', 'ISO 14001:2015')
    setHtml('cert2Desc', 'RIXIN maintains an environmental management system certified to ISO 14001:2015, aligning manufacturing activities with environmental responsibility across our Dalian operations.')
    setHtml('cert2List', '<ul><li>Certificate No. 00220E31659R1S</li><li>Scope includes mold manufacturing and related management activities for automotive, motorcycle, and industrial programs</li><li>Supports sustainable practices across design, production, and facility operations</li></ul>')
    setHtml('cert1DownloadSite', 'RIXIN Dalian, China')
    setHtml('cert2DownloadSite', 'RIXIN Dalian, China')

    setHtml('blogSectionTitle', 'Technical Insights')
    setHtml('blogSectionLead', 'Technical insights on precision machining, mold components, and export manufacturing.')
    setHtml('blogPost1Title', 'What Is Wire EDM Machining?')
    setHtml('blogPost2Title', 'CNC Milling vs Wire EDM')
    setHtml('blogPost3Title', 'How Precision Mold Components Affect Mold Quality')
    setHtml('blogPost4Title', 'What Is Tight Tolerance Machining?')
    setHtml('blogPost5Title', 'How to Choose a Precision Mold Manufacturer')
    setHtml('megaAboutBlog', 'Technical Insights')
    setHtml('megaAboutBlogDesc', 'Technical insights on machining, mold quality, and export manufacturing.')

    setHtml('companyName', 'RIXIN Precision Molding')
    setHtml('footerPhone', 'Tel: 0411-39014829 / 0411-39014821')
    setHtml('footerEmail', 'Email: <a href="mailto:info@rixin-dl.com">info@rixin-dl.com</a>')
    setHtml('address', 'Office: No. 10-2-8, Huashengda Mould Park, Northeast 7th Street, Dalian Development Zone, Liaoning, China')

  } else if (language === 'ja') {
    setHtml('tab1', 'ホーム');
    setHtml('tab2', '会社概要');
    setHtml('tab3', '私たちの能力');
    setHtml('tab4', '認定資格');
    setHtml('tab5', 'キャパビリティ');
    setHtml('tab6', 'デザイン');
    setHtml('tab7', '金型パーツ');
    setHtml('tab8', '射出成形');
    setHtml('tab9', 'スタンピングダイ');
    setHtml('tab10', 'ダイキャスティング');
    setHtml('tab11', '業界・市場');
    setHtml('tab12', '自動車部品');
    setHtml('tab13', '金型パーツ');
    setHtml('tab14', '医療部品');
    setHtml('tab15', '家電製品');
    setHtml('tab16', '射出成形');
    setHtml('tab17', '私たちについて');
    setHtml('tab19', 'お問い合わせ');

    setHtml('page4', '私たちについて')
    setHtml('part2', '認証')

    setHtml('megaOurStory', '私たちの歩み')
    setHtml('megaOurStoryDesc', '大連での精密金型から、輸出向け一体型製造へと歩んできた沿革をご紹介します。')
    setHtml('storyTitle', '私たちの歩み')
    setHtml('storyP1', '2004年に大連で創業以来、リシンは精密金型工場から、自動車・医療・産業向けOEMを支える受託製造パートナーへと成長してきました。')
    setHtml('storyP2', '<span class="color-theme">射出成形</span>、ダイカスト、プレス金型、<span class="color-theme">精密金型部品</span>に加え、ワイヤーEDM、CNC加工、一体型ツーリング体制を組み合わせています。')
    setHtml('storyP3', '試作から量産まで、DFM、安定した品質体制、迅速な輸出プログラムに注力し、グローバル顧客の上市スケジュールを支援します。')
    setHtml('storyP4', '次のプログラムについてご相談ください。<a href="contact.html" id="storyCta" class="color-theme">お問い合わせはこちら。</a>')

    setHtml('timeline1Year', '2004')
    setHtml('timeline1Desc', '大連でリシン設立。精密金型・成形事業を開始。')
    setHtml('timeline2Year', '2010')
    setHtml('timeline2Desc', 'ワイヤーEDM、CNC加工、金型部品の生産能力を拡充。')
    setHtml('timeline3Year', '2015')
    setHtml('timeline3Desc', '自動車・医療・産業向けOEMの輸出プログラムを強化。')
    setHtml('timeline4Year', '2018')
    setHtml('timeline4Desc', '金型設計、ツーリング、射出成形を一体型ワークフローに統合。')
    setHtml('timeline5Year', '2022')
    setHtml('timeline5Desc', '量産を支える品質・環境マネジメント体制を整備。')

    setHtml('megaOurCulture', '私たちの文化')
    setHtml('megaOurCultureDesc', '誠実、適応力、協働、責任——顧客とチームとの関わり方を支える価値観です。')
    setHtml('cultureEyebrow', '私たちの価値観')
    setHtml('cultureTitle', '文化の基盤：<span class="color-theme">私たちの文化</span>')
    setHtml('culture1Title', '誠実')
    setHtml('culture1Desc', '私たちは誠実さを大切にし、倫理原則を守り、顧客・サプライヤー・従業員とのすべてのやり取りにおいて透明性を保ちます。')
    setHtml('culture2Title', '適応力')
    setHtml('culture2Desc', '急速に変化する環境の中で、柔軟かつ機敏に対応し、市場動向と顧客ニーズに先回りして競争力を維持します。')
    setHtml('culture3Title', '協働')
    setHtml('culture3Desc', '社内外の協働を重視し、多様な視点と知識を活かして、精度が最も求められる場面で成果を共創します。')
    setHtml('culture4Title', '責任')
    setHtml('culture4Desc', '行動と結果に責任を持ち、約束を確実に履行し、強い当事者意識で成果を推進します。')

    setHtml('certExpandLabel', '展開してダウンロード')
    setHtml('certCloseLabel', '閉じる')
    setHtml('certAvailableLabel', 'ダウンロード：')
    setHtml('certAvailableLabel2', 'ダウンロード：')
    setHtml('cert1Title', 'ISO 9001:2015')
    setHtml('cert1Desc', 'リシンの品質マネジメントシステムは ISO 9001:2015 に認証されており、金型設計・製造、標準金型部品、プラスチック製品開発などを対象としています。')
    setHtml('cert1List', '<ul><li>認証番号：08921Q52943R0S</li><li>自動車・バイク向けプレス金型、射出金型、コンプレッション金型および関連樹脂製品が認証範囲です</li><li>輸出・量産案件における安定したプロセス管理を支援します</li></ul>')
    setHtml('cert2Title', 'ISO 14001:2015')
    setHtml('cert2Desc', 'リシンの環境マネジメントシステムは ISO 14001:2015 に認証され、大連拠点での製造活動を環境責任と整合させています。')
    setHtml('cert2List', '<ul><li>認証番号：00220E31659R1S</li><li>金型製造および関連管理活動が認証範囲に含まれます</li><li>設計・生産・施設運営における持続可能な取り組みを支援します</li></ul>')
    setHtml('cert1DownloadSite', '大連リシン（中国）')
    setHtml('cert2DownloadSite', '大連リシン（中国）')

    setHtml('blogSectionTitle', '技術インサイト')
    setHtml('blogSectionLead', '精密加工、金型部品、輸出製造に関する技術インサイト。')
    setHtml('blogPost1Title', 'ワイヤーEDM加工とは？')
    setHtml('blogPost2Title', 'CNCフライス加工とワイヤーEDMの比較')
    setHtml('blogPost3Title', '精密金型部品が金型品質に与える影響')
    setHtml('blogPost4Title', '厳密公差加工とは？')
    setHtml('blogPost5Title', '精密金型メーカーの選び方')
    setHtml('megaAboutBlog', '技術インサイト')
    setHtml('megaAboutBlogDesc', '精密加工、金型部品、輸出製造に関する技術インサイト。')

    setHtml('companyName', 'RIXIN PRECISION MOLDING日新精密成形')
    setHtml('footerPhone', '電話: 0411-39014829 / 0411-39014821')
    setHtml('footerEmail', 'メール: <a href="mailto:info@rixin-dl.com">info@rixin-dl.com</a>')
    setHtml('address', 'オフィス: 中国 遼寧省大連市 開発区 東北七街 華盛達模具園 10-2-8')
  }

  var expandEl = document.getElementById('certExpandLabel')
  var closeEl = document.getElementById('certCloseLabel')
  if (expandEl && closeEl) {
    document.querySelectorAll('.rixin-cert-item .rixin-cert-toggle-label').forEach(function (labelEl) {
      var item = labelEl.closest('.rixin-cert-item')
      if (!item) return
      labelEl.textContent = item.classList.contains('is-open') ? closeEl.textContent : expandEl.textContent
    })
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var userLanguage = window.RIXIN_DEFAULT_LANG || 'en';
  changeLanguage(userLanguage);
});
