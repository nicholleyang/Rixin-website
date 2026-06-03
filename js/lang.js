function setHtml(id, value) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

function changeLanguage(language) {
//  // 获取需要切换语言的元素
//  var heading = document.getElementById('heading');
//  var paragraph1 = document.getElementById('paragraph1');
//  var paragraph2 = document.getElementById('paragraph2');

  // 根据选择的语言切换内容
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

    title1.innerHTML = '日信精密模塑'
    title2.innerHTML = '为您的项目提供最好的解决方案'

    setHtml('indexHeading1', '介绍')
    indexTitle1.innerHTML = '值得信赖的制造合作伙伴'
    setHtml('indexSubheading1', '面向全球行业的精密模具零部件与注塑成型解决方案')
    indexParagraph1.innerHTML = '自 2004 年成立以来，日信持续为全球客户提供精密模具零部件、注塑成型与可靠制造支持，以稳定品质、快速响应和工程能力助力项目落地。'
    setHtml('indexCta1', '了解制造能力')

    indexHeading2.innerHTML = '我们的制造能力'
    indexParagraph2.innerHTML = '从精密加工到完整模具方案，日信以稳定设备、资深工程团队和面向出口的质量控制，支持复杂制造项目高效落地。'

    indexHeading3.innerHTML = '中国模具零件供应商'
    indexParagraph3.innerHTML = '自成立以来，为全球客户创造高品质的精密注塑产品一直是日信的核心业务。与我们公司合作的客户可以选择不参与每个流程步骤的管理和控制，而是交由RIXIN负责。'

    indexHeading4.innerHTML = '我们的优势'

    indexSubtitle1.innerHTML = '品质'
    indexSub1.innerHTML = '高精度模具符合国际标准，并执行严格质量控制。'
    indexSubtitle2.innerHTML = '专业'
    indexSub2.innerHTML = '专业工程团队专注 DFM 与先进制造技术。'
    indexSubtitle3.innerHTML = '定制'
    indexSub3.innerHTML = '为医疗、汽车与电子行业提供定制化解决方案。'
    indexSubtitle4.innerHTML = '快速原型'
    indexSub4.innerHTML = '依托 CNC 与慢走丝能力，高效完成设计验证。'
    indexSubtitle5.innerHTML = '准时交付'
    indexSub5.innerHTML = '数字化流程确保项目透明推进并按期交付。'
    indexSubtitle6.innerHTML = '全球服务'
    indexSub6.innerHTML = '拥有服务全球客户的丰富国际项目经验。'

    contactUs.innerHTML = '联系我们'
    contactUs1.innerHTML = '无论您只是想打个招呼，还是想让我们看看您的项目，只需给我们留言，我们会在<strong>24 小时内</strong>回复您。'

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

    title1.innerHTML = 'Rixin Precision Molding'
    title2.innerHTML = 'Provides the best solving solutions for your project'

    setHtml('indexHeading1', 'Introduction')
    indexTitle1.innerHTML = 'A Manufacturing Partner You Can Trust'
    setHtml('indexSubheading1', 'Precision Mold Components & Injection Molding Solutions for Global Industries')
    indexParagraph1.innerHTML = 'Since 2004, RIXIN has supported global customers with precision mold components, injection molding, and dependable manufacturing execution built around quality, speed, and engineering depth.'
    setHtml('indexCta1', 'Explore Our Capabilities')

    indexHeading2.innerHTML = 'Our Manufacturing Capabilities'
    indexParagraph2.innerHTML = 'From precision machining to complete tooling programs, RIXIN supports complex manufacturing projects with reliable equipment, experienced engineers, and export-ready quality control.'

    indexHeading3.innerHTML = 'Moulded parts suppliers in China'
    indexParagraph3.innerHTML = 'Since its inception, creating high quality precision injection moulded products for customers around the world has been RIXIN\'s core business. Customers who work with our company are no longer involved in the management and control of each step of the process, but leave this to RIXIN. '

    indexHeading4.innerHTML = 'Our Advantages'

    indexSubtitle1.innerHTML = 'Quality'
    indexSub1.innerHTML = 'High-precision molds meeting global standards with strict QC.'
    indexSubtitle2.innerHTML = 'Expertise'
    indexSub2.innerHTML = 'Professional engineering team focusing on DFM and advanced tech.'
    indexSubtitle3.innerHTML = 'Customized'
    indexSub3.innerHTML = 'Tailored solutions for Medical, Automotive, and Electronics.'
    indexSubtitle4.innerHTML = 'Fast Prototyping'
    indexSub4.innerHTML = 'Efficient verification with CNC and Wire-EDM capabilities.'
    indexSubtitle5.innerHTML = 'On-time Delivery'
    indexSub5.innerHTML = 'Digital workflow ensures transparent and prompt delivery.'
    indexSubtitle6.innerHTML = 'Global Service'
    indexSub6.innerHTML = 'Extensive experience serving international clients worldwide.'

    contactUs.innerHTML = 'Contact Us'
    contactUs1.innerHTML = 'Whether you just want to say hello or have us take a look at your project, just drop us a line and we\'ll get back to you <strong>within 24hrs</strong>.'

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

    title1.innerHTML = '日新精密成形'
    title2.innerHTML = 'プロジェクトに最適な解決ソリューションを提供する'

    setHtml('indexHeading1', '紹介')
    indexTitle1.innerHTML = '信頼できる製造パートナー'
    setHtml('indexSubheading1', 'グローバル産業向けの精密金型部品と射出成形ソリューション')
    indexParagraph1.innerHTML = '2004 年の設立以来、日信は精密金型部品、射出成形、そして信頼性の高い製造対応を通じて、品質、スピード、技術力を重視するグローバル顧客を支えてきました。'
    setHtml('indexCta1', 'キャパビリティを見る')

    indexHeading2.innerHTML = '製造キャパビリティ'
    indexParagraph2.innerHTML = '精密加工から総合的な金型プログラムまで、RIXIN は信頼性の高い設備、経験豊富なエンジニア、輸出品質の管理体制で複雑な製造案件を支援します。'

    indexHeading3.innerHTML = '中国の成形部品サプライヤー'
    indexParagraph3.innerHTML = '設立以来、世界中のお客様に高品質の精密射出成形製品を創造することは日新の中核業務であり続けています。当社と協力しているお客様は、プロセスのすべてのステップの管理と制御に参加するのではなく、日新にお任せします。'

    indexHeading4.innerHTML = '私たちの強み'

    indexSubtitle1.innerHTML = '品質'
    indexSub1.innerHTML = '厳格な品質管理で国際基準に適合する高精度金型を提供します。'
    indexSubtitle2.innerHTML = '専門性'
    indexSub2.innerHTML = 'DFM と先進技術に注力する専門エンジニアチーム。'
    indexSubtitle3.innerHTML = 'カスタム対応'
    indexSub3.innerHTML = '医療、自動車、電子分野に合わせたソリューション。'
    indexSubtitle4.innerHTML = '迅速な試作'
    indexSub4.innerHTML = 'CNC とワイヤー EDM による効率的な設計検証。'
    indexSubtitle5.innerHTML = '納期遵守'
    indexSub5.innerHTML = 'デジタル工程管理で透明性の高い迅速な納品を実現します。'
    indexSubtitle6.innerHTML = 'グローバル対応'
    indexSub6.innerHTML = '世界中の国際顧客を支えてきた豊富な実績があります。'

    contactUs.innerHTML = 'お問い合わせ'
    contactUs1.innerHTML = 'ご挨拶したいだけでも、プロジェクトを見てもらいたい場合でも、ご連絡ください。<strong>24 時間以内</strong>にご連絡いたします。'

    setHtml('companyName', 'RIXIN PRECISION MOLDING日新精密成形')
    setHtml('footerPhone', '電話: 0411-39014829 / 0411-39014821')
    setHtml('footerEmail', 'メール: <a href="mailto:info@rixin-dl.com">info@rixin-dl.com</a>')
    setHtml('address', 'オフィス: 中国 遼寧省大連市 開発区 東北七街 華盛達模具園 10-2-8')

  }
}

document.addEventListener('DOMContentLoaded', function() {
  var userLanguage = window.RIXIN_DEFAULT_LANG || 'en';
  changeLanguage(userLanguage);
});



