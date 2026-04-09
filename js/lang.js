function changeLanguage(language) {
//  // 获取需要切换语言的元素
//  var heading = document.getElementById('heading');
//  var paragraph1 = document.getElementById('paragraph1');
//  var paragraph2 = document.getElementById('paragraph2');

  // 根据选择的语言切换内容
  if (language === 'zh') {
    tab1.innerHTML = '主页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    tab2.innerHTML = '关于我们'
    tab3.innerHTML = '业务范围&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    tab4.innerHTML = '证书'
    tab5.innerHTML = '制造能力'
    tab6.innerHTML = '设计'
    tab7.innerHTML = '模具零部件'
    tab8.innerHTML = '注塑模具'
    tab9.innerHTML = '冲压模具'
    tab10.innerHTML = '压铸模具'
    tab11.innerHTML = '行业应用'
    tab12.innerHTML = '汽车零部件'
    tab13.innerHTML = '模具零部件'
    tab14.innerHTML = '医疗零部件'
    tab15.innerHTML = '电器'
    tab16.innerHTML = '注塑成型'
    tab17.innerHTML = '关于日信&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    tab18.innerHTML = '主要设备'
    tab19.innerHTML = '联系我们&nbsp;&nbsp;&nbsp;'

    title1.innerHTML = '日信精密模塑'
    title2.innerHTML = '为您的项目提供最好的解决方案'

    indexHeading1.innerHTML = '介绍'
    indexTitle1.innerHTML = '值得信赖的制造合作伙伴'
    indexParagraph1.innerHTML = '日信成立于2004年，拥有近20年的经验。我们为各行各业生产高质量的精密成型件，包括：医疗、汽车、生活和工业设备。基于我们广泛的制造技术和服务，我们可以为客户提供快速、优质和经济的产品。'

    indexHeading2.innerHTML = '业务范围'
    indexParagraph2.innerHTML = '主要经营范围：注塑、冲压、压铸设计加工，精密零部件加工，注塑产品设计开发。产品现已覆盖家居用品、电子工业、机械设备、医疗产品、汽车工业等领域。'

    indexHeading3.innerHTML = '中国模具零件供应商'
    indexParagraph3.innerHTML = '自成立以来，为全球客户创造高品质的精密注塑产品一直是日信的核心业务。与我们公司合作的客户可以选择不参与每个流程步骤的管理和控制，而是交由RIXIN负责。'

    indexHeading4.innerHTML = '为您提供创造独特产品所需的制造工艺'

    indexSubtitle1.innerHTML = '品质卓越'
    indexSub1.innerHTML = '我们公司擅长提供符合严格行业标准的高品质精密模具。我们在制造过程的每个阶段都将质量控制放在首位，以确保精确的规格和最佳的功能。'
    indexSubtitle2.innerHTML = '专业技术'
    indexSub2.innerHTML = '我们拥有一支技术精湛、经验丰富的工程师团队，在设计和制造精密模具方面拥有广泛的专业技术知识。我们的工程师随时掌握模具制造技术的最新进展，使我们能够为复杂的成型要求提供创新的解决方案。'
    indexSubtitle3.innerHTML = '定制功能'
    indexSub3.innerHTML = '我们了解每个客户都有独特的要求。我们公司擅长根据客户的具体需求定制模具，提供量身定制的解决方案，以优化生产效率，最大限度地降低生产成本。'
    indexSubtitle4.innerHTML = '快速原型设计'
    indexSub4.innerHTML = '我们提供快速高效的原型设计服务，使客户能够在全面投产前快速验证其产品设计。我们先进的原型设计能力缩短了开发时间，为产品测试和改进提供了经济高效的方法。'
    indexSubtitle5.innerHTML = '及时交付'
    indexSub5.innerHTML = '我们优先考虑高效交付模具，以满足客户的生产计划。我们精简的生产流程加上有效的项目管理，可确保在不影响质量的前提下按时交货。'
    indexSubtitle6.innerHTML = '覆盖全球'
    indexSub6.innerHTML = '我们的业务遍布 10 多个国家的 40 多个城市，为各大洲不同行业的客户提供服务。我们的跨国业务能力使我们能够为客户提供国际化的专业服务。无论您身处世界何处，请相信我们是您值得信赖的合作伙伴。'

    contactUs.innerHTML = '联系我们'
    contactUs1.innerHTML = '无论您只是想打个招呼，还是想让我们看看您的项目，只需给我们留言，我们会在<strong>24 小时内</strong>回复您。'

    companyName.innerHTML = '日信精密模塑有限公司'
    address.innerHTML = '办公地址: 中国 辽宁大连开发区东北七街华盛达模具园 10-2-8<br>电话: 0411-39014829 / 0411-39014821<br>邮箱: info@rixin-dl.com<br>网站: www.rixin-dl.com'

  } else if (language === 'en') {
    tab1.innerHTML = 'Home'
    tab2.innerHTML = 'About Us'
    tab3.innerHTML = 'Our Capabilities'
    tab4.innerHTML = 'Certifications'
    tab5.innerHTML = 'Capabilities'
    tab6.innerHTML = 'Design'
    tab7.innerHTML = 'Mould Parts'
    tab8.innerHTML = 'Injection Molding'
    tab9.innerHTML = 'Stamping Die'
    tab10.innerHTML = 'Die Casting'
    tab11.innerHTML = 'Industries'
    tab12.innerHTML = 'Automotive Parts'
    tab13.innerHTML = 'Mould Parts'
    tab14.innerHTML = 'Medical Parts'
    tab15.innerHTML = 'Appliances'
    tab16.innerHTML = 'Injection Moulding'
    tab17.innerHTML = 'About RIXIN'
    tab18.innerHTML = 'Main Equipment'
    tab19.innerHTML = 'Contact'

    title1.innerHTML = 'Rixin Precision Molding'
    title2.innerHTML = 'Provides the best solving solutions for your project'

    indexHeading1.innerHTML = 'Introduction'
    indexTitle1.innerHTML = 'A Manufacturing Partner You Can Trust'
    indexParagraph1.innerHTML = 'Rixin Established in 2004, has nearly 20 years of experience. We produce high quality precision moulded parts for a wide range of industries. These include: medical, automotive, lifestyle and industrial equipment. We can provide our customers with fast, high quality and economical products. Based on our wide range of manufacturing technologies and services.'

    indexHeading2.innerHTML = 'Our Capabilities'
    indexParagraph2.innerHTML = 'Main business scope: design and processing of injection moulding, stamping and die-casting, processing of precision parts, design and development of injection moulded products. Products now cover household goods, electronic industry, machinery and equipment, medical products, automotive industry and so on.'

    indexHeading3.innerHTML = 'Moulded parts suppliers in China'
    indexParagraph3.innerHTML = 'Since its inception, creating high quality precision injection moulded products for customers around the world has been RIXIN\'s core business. Customers who work with our company are no longer involved in the management and control of each step of the process, but leave this to RIXIN. '

    indexHeading4.innerHTML = 'Providing you with the manufacturing you need to create unique products'

    indexSubtitle1.innerHTML = 'Quality Excellence'
    indexSub1.innerHTML = 'Our company excels in delivering high-quality precision molds that meet stringent industry standards. We prioritize quality control at every stage of the manufacturing process, ensuring precise specifications and optimal functionality.'
    indexSubtitle2.innerHTML = 'Technical Expertise'
    indexSub2.innerHTML = 'With a team of highly skilled and experienced engineers, we possess extensive technical expertise in designing and manufacturing precision molds. Our engineers stay updated with the latest advancements in mold-making technologies, enabling us to provide innovative solutions to complex molding requirements.'
    indexSubtitle3.innerHTML = 'Customization Capability'
    indexSub3.innerHTML = 'We understand that every customer has unique requirements. Our company specializes in customizing molds according to specific client needs, offering tailored solutions that optimize productivity and minimize production costs.'
    indexSubtitle4.innerHTML = 'Rapid Prototyping'
    indexSub4.innerHTML = 'We offer fast and efficient prototyping services, enabling our clients to quickly validate their product designs before full-scale production. Our advanced prototyping capabilities reduce development time and provide a cost-effective approach to product testing and refinement.'
    indexSubtitle5.innerHTML = 'Timely Delivery'
    indexSub5.innerHTML = 'We prioritize prompt delivery of molds to meet our clients\' production schedules. Our streamlined manufacturing processes, coupled with effective project management, ensure on-time delivery without compromising quality.'
    indexSubtitle6.innerHTML = 'Global reach'
    indexSub6.innerHTML = 'With a presence in over 80 cities in more than 10 countries, our company serves clients in a variety of industries across all continents. Our ability to operate seamlessly across borders allows us to provide our clients with international expertise. Trust us to be your trusted partner, wherever you are in the world.'

    contactUs.innerHTML = 'Contact Us'
    contactUs1.innerHTML = 'Whether you just want to say hello or have us take a look at your project, just drop us a line and we\'ll get back to you <strong>within 24hrs</strong>.'

    companyName.innerHTML = 'RIXIN Precision Molding'
    address.innerHTML = 'Office: No. 10-2-8, Huashengda Mould Park, Northeast 7th Street, Dalian Development Zone, Liaoning, China<br>China Tel : 0411-39014829 / 0411-39014821<br>Email: info@rixin-dl.com<br>Web : www.rixin-dl.com'

  } else if (language === 'ja') {
    tab1.innerHTML = 'ホーム';
    tab2.innerHTML = '会社概要';
    tab3.innerHTML = '私たちの能力';
    tab4.innerHTML = '認定資格';
    tab5.innerHTML = 'キャパビリティ';
    tab6.innerHTML = 'デザイン';
    tab7.innerHTML = '金型パーツ';
    tab8.innerHTML = '射出成形';
    tab9.innerHTML = 'スタンピングダイ';
    tab10.innerHTML = 'ダイキャスティング';
    tab11.innerHTML = '業界・市場';
    tab12.innerHTML = '自動車部品';
    tab13.innerHTML = '金型パーツ';
    tab14.innerHTML = '医療部品';
    tab15.innerHTML = '家電製品';
    tab16.innerHTML = '射出成形';
    tab17.innerHTML = 'RIXINについて';
    tab18.innerHTML = '主要設備';
    tab19.innerHTML = 'お問い合わせ';

    title1.innerHTML = '日新精密成形'
    title2.innerHTML = 'プロジェクトに最適な解決ソリューションを提供する'

    indexHeading1.innerHTML = '紹介'
    indexTitle1.innerHTML = '信頼できる製造パートナー'
    indexParagraph1.innerHTML = '日新は2004年に設立され、20年近くの経験が持っています。幅広い業界向けの高品質の精密成形部品を生産しています。その中には、医療、自動車、ライフスタイル、工業設備が含まれています。迅速、高品質、経済的な製品をお客様にご提供いたします。これは私たちの幅広い製造技術とサービスに基づいています。'

    indexHeading2.innerHTML = '私たちの能力'
    indexParagraph2.innerHTML = '主な経営範囲：射出成形の設計と加工インジェクション　モールディングのデザイン（設計）とプロセシング（処理）、プレス成形、ダイカストの設計と加工、精密部品の加工、射出成形製品の設計と開発。現在、製品は家庭用品、電子産業、機械設備、医療製品、自動車業界などをカバーしています。'

    indexHeading3.innerHTML = '中国の成形部品サプライヤー'
    indexParagraph3.innerHTML = '設立以来、世界中のお客様に高品質の精密射出成形製品を創造することは日新の中核業務であり続けています。当社と協力しているお客様は、プロセスのすべてのステップの管理と制御に参加するのではなく、日新にお任せします。'

    indexHeading4.innerHTML = '为您提供创造独特产品所需的制造工艺'

    indexSubtitle1.innerHTML = '優れた品質'
    indexSub1.innerHTML = '当社は厳格な業界基準に適合した高品質の精密金型を提供するのが得意です。私たちは製造プロセスの各段階で品質管理を優先し、正確な規格と最適な機能を確保しています。'
    indexSubtitle2.innerHTML = '技術的な専門知識'
    indexSub2.innerHTML = '私たちは技術的に優れ、経験豊富なエンジニアチームを持ち、精密金型の設計と製造に豊富な技術的特技を持っています。当社のエンジニアは、金型製造技術の最新の進歩を常に把握しており、複雑な成形要件に対する革新的なソリューションを提供できます。'
    indexSubtitle3.innerHTML = 'カスタマイズ機能'
    indexSub3.innerHTML = '私たちは、お客様ごとに独自の要件があることを理解しています。 当社は、特定の顧客のニーズに応じた金型のカスタマイズを専門とし、生産性を最適化し、生産コストを最大限に削減するためのカスタマイズソリューションを提供しています。'
    indexSubtitle4.innerHTML = '快速プロトタイピング'
    indexSub4.innerHTML = '当社はお客様が完全に生産される前に製品設計を迅速に検証できるように、迅速で効率的なプロトタイプ設計サービスを提供しています。 私たちの先進的なプロトタイピング機能により、開発時間が短縮され、製品のテストと改良に費用対効果の高いアプローチが提供されます。'
    indexSubtitle5.innerHTML = 'タイムリーな配達'
    indexSub5.innerHTML = '当社では、お客様の生産スケジュールに合わせて金型を迅速に納品することを優先しています。私たちは製造プロセスを簡素化し、有効なプロジェクト管理を加えて、品質を損なうことなく予定通りの納品が保証されます。'
    indexSubtitle6.innerHTML = 'グローバルな展開'
    indexSub6.innerHTML = '当社の業務は10カ国以上の40以上の都市に及んでおり、各大陸のさまざまな業界のお客様にサービスを提供いたします。私たちは国境を越えたシームレスな運営能力により、お客様に国際的な専門知識を提供することができます。世界中どこにいても、信頼できるパートナーとして当社を信頼してください。'

    contactUs.innerHTML = 'お問い合わせ'
    contactUs1.innerHTML = 'ご挨拶したいだけでも、プロジェクトを見てもらいたい場合でも、ご連絡ください。<strong>24 時間以内</strong>にご連絡いたします。'

    companyName.innerHTML = 'RIXIN PRECISION MOLDING日新精密成形'
    address.innerHTML = 'オフェンス：中国　遼寧省大連市　開発区　東北 7 番街　華盛達モールド パーク10-2-8<br>電話番号: 0411-39014829 / 0411-39014821<br>メールアドレス: info@rixin-dl.com<br>ネットウェーブ: www.rixin-dl.com'

  }
}

document.addEventListener('DOMContentLoaded', function() {
  var userLanguage = window.RIXIN_DEFAULT_LANG || 'en';
  changeLanguage(userLanguage);
});



