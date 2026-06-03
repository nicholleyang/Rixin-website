function setHtml(id, value) {
  var el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

function changeLanguage(language) {

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

    business.innerHTML = '业务'
    paragraph.innerHTML = '我们公司在精密模具制造领域提供全面的服务。我们的业务范围包括以下几个方面：'
    business1.innerHTML = '原型设计'
    business2.innerHTML = '注塑模具'
    business3.innerHTML = '数控加工'
    business4.innerHTML = '模具零部件'
    business5.innerHTML = '冲压模具'
    business6.innerHTML = '压铸模具'

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

    business.innerHTML = 'Business'
    paragraph.innerHTML = 'Our company offers a comprehensive range of services in the field of precision mold manufacturing. Our business scope encompasses the following areas:'
    business1.innerHTML = 'Prototyping'
    business2.innerHTML = 'Injection Molding'
    business3.innerHTML = 'CNC Machining'
    business4.innerHTML = 'Mould Parts'
    business5.innerHTML = 'Stamping Die'
    business6.innerHTML = 'Die Casting'

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

    business.innerHTML = 'ビジネス';
    paragraph.innerHTML = '当社は精密金型製造の分野で包括的なサービスを提供しています。以下の分野を事業範囲としています:';
    business1.innerHTML = 'プロトタイピング';
    business2.innerHTML = 'インジェクション成形';
    business3.innerHTML = 'CNC加工';
    business4.innerHTML = '金型パーツ';
    business5.innerHTML = 'スタンピングダイ';
    business6.innerHTML = 'ダイカスト';

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



