function changeLanguage(language) {

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

    business.innerHTML = '业务'
    paragraph.innerHTML = '我们公司在精密模具制造领域提供全面的服务。我们的业务范围包括以下几个方面：'
    business1.innerHTML = '原型设计'
    business2.innerHTML = '注塑模具'
    business3.innerHTML = '数控加工'
    business4.innerHTML = '模具零部件'
    business5.innerHTML = '冲压模具'
    business6.innerHTML = '压铸模具'

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

    business.innerHTML = 'Business'
    paragraph.innerHTML = 'Our company offers a comprehensive range of services in the field of precision mold manufacturing. Our business scope encompasses the following areas:'
    business1.innerHTML = 'Prototyping'
    business2.innerHTML = 'Injection Molding'
    business3.innerHTML = 'CNC Machining'
    business4.innerHTML = 'Mould Parts'
    business5.innerHTML = 'Stamping Die'
    business6.innerHTML = 'Die Casting'

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

    business.innerHTML = 'ビジネス';
    paragraph.innerHTML = '当社は精密金型製造の分野で包括的なサービスを提供しています。以下の分野を事業範囲としています:';
    business1.innerHTML = 'プロトタイピング';
    business2.innerHTML = 'インジェクション成形';
    business3.innerHTML = 'CNC加工';
    business4.innerHTML = '金型パーツ';
    business5.innerHTML = 'スタンピングダイ';
    business6.innerHTML = 'ダイカスト';

    companyName.innerHTML = 'RIXIN PRECISION MOLDING日新精密成形'
    address.innerHTML = 'オフェンス：中国　遼寧省大連市　開発区　東北 7 番街　華盛達モールド パーク10-2-8<br>電話番号: 0411-39014829 / 0411-39014821<br>メールアドレス: info@rixin-dl.com<br>ネットウェーブ: www.rixin-dl.com'

  }
}

document.addEventListener('DOMContentLoaded', function() {
  var userLanguage = window.RIXIN_DEFAULT_LANG || 'en';
  changeLanguage(userLanguage);
});



