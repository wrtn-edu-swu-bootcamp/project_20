/**
 * Google Vision 결과를 바탕으로 똑똑하게 등급 분류
 * Mock이 아닌 실제 AI 결과 기반 로직
 */

export function classifyGrade(visionResult) {
  const labels = (visionResult.labelAnnotations || []).map(l => l.description.toLowerCase());
  const colors = visionResult.imagePropertiesAnnotation?.dominantColors?.colors || [];
  
  let score = 50; // 기본 B등급
  
  // 1. 품질 키워드 체크 (+/- 20점)
  const highQuality = ['new', 'clean', 'pristine', 'unworn', 'mint', 'fresh'];
  const lowQuality = ['worn', 'old', 'damaged', 'stained', 'torn', 'faded', 'dirty'];
  
  labels.forEach(label => {
    if (highQuality.some(kw => label.includes(kw))) {
      score += 20;
    }
    if (lowQuality.some(kw => label.includes(kw))) {
      score -= 20;
    }
  });
  
  // 2. 색상 선명도 체크 (+/- 15점)
  if (colors.length > 0) {
    const avgBrightness = colors.reduce((sum, c) => {
      return sum + (c.color.red + c.color.green + c.color.blue) / 3;
    }, 0) / colors.length;
    
    if (avgBrightness > 150) score += 15; // 밝고 선명
    if (avgBrightness < 80) score -= 15; // 어둡고 변색
  }
  
  // 3. AI 신뢰도 (+/- 10점)
  const topConfidence = visionResult.labelAnnotations?.[0]?.score || 0;
  if (topConfidence > 0.9) score += 10;
  if (topConfidence < 0.7) score -= 5;
  
  // 4. 등급 결정
  if (score >= 80) return 'S';
  if (score >= 65) return 'A';
  if (score >= 45) return 'B';
  if (score >= 25) return 'C';
  return 'D';
}

export function detectCategory(labels) {
  const labelDescriptions = labels.map(l => l.description.toLowerCase());
  
  const categoryMap = {
    '상의': ['shirt', 't-shirt', 'blouse', 'top', 'sweater', 'hoodie', 'sweatshirt'],
    '하의': ['pants', 'jeans', 'trousers', 'skirt', 'shorts', 'leggings'],
    '아우터': ['jacket', 'coat', 'blazer', 'cardigan', 'parka', 'vest'],
    '원피스': ['dress', 'gown'],
  };
  
  for (const [category, keywords] of Object.entries(categoryMap)) {
    if (labelDescriptions.some(label => keywords.some(kw => label.includes(kw)))) {
      return category;
    }
  }
  
  // 기본적으로 "clothing" 있으면 상의로 분류
  if (labelDescriptions.some(l => l.includes('clothing'))) {
    return '상의';
  }
  
  return '기타';
}

export function detectDamage(labels) {
  const labelDescriptions = labels.map(l => l.description.toLowerCase());
  
  const damageMap = {
    '얼룩': ['stain', 'spot', 'mark', 'dirty'],
    '찢어짐': ['torn', 'rip', 'hole', 'tear'],
    '변색': ['faded', 'discolored', 'bleached'],
    '보풀': ['pilling', 'fuzzy', 'worn']
  };
  
  const detected = [];
  for (const [damageType, keywords] of Object.entries(damageMap)) {
    if (labelDescriptions.some(label => keywords.some(kw => label.includes(kw)))) {
      detected.push(damageType);
    }
  }
  
  return detected.length > 0 ? detected : ['없음'];
}

export function extractBrand(textAnnotations) {
  if (!textAnnotations || textAnnotations.length === 0) return null;
  
  // 확장된 브랜드 목록 (국내외 100+ 브랜드)
  const brands = [
    // 글로벌 패스트 패션
    { name: 'ZARA', variants: ['ZARA', 'ZA RA'] },
    { name: 'H&M', variants: ['H&M', 'H & M', 'HM', 'H M'] },
    { name: 'UNIQLO', variants: ['UNIQLO', 'UNI QLO'] },
    { name: 'GAP', variants: ['GAP', 'THE GAP'] },
    { name: 'Forever 21', variants: ['FOREVER 21', 'FOREVER21', 'F21'] },
    { name: 'Mango', variants: ['MANGO', 'MNG'] },
    
    // 스포츠 브랜드
    { name: 'NIKE', variants: ['NIKE', 'NI KE'] },
    { name: 'ADIDAS', variants: ['ADIDAS', 'ADI DAS'] },
    { name: 'PUMA', variants: ['PUMA'] },
    { name: 'New Balance', variants: ['NEW BALANCE', 'NEWBALANCE', 'NB'] },
    { name: 'Under Armour', variants: ['UNDER ARMOUR', 'UNDERARMOUR', 'UA'] },
    { name: 'FILA', variants: ['FILA', 'FI LA'] },
    { name: 'Reebok', variants: ['REEBOK', 'REE BOK'] },
    
    // 명품 브랜드
    { name: 'GUCCI', variants: ['GUCCI', 'GUC CI'] },
    { name: 'PRADA', variants: ['PRADA', 'PRA DA'] },
    { name: 'CHANEL', variants: ['CHANEL', 'CHA NEL'] },
    { name: 'DIOR', variants: ['DIOR', 'CHRISTIAN DIOR'] },
    { name: 'Louis Vuitton', variants: ['LOUIS VUITTON', 'LV', 'L V'] },
    { name: 'HERMES', variants: ['HERMES', 'HER MES'] },
    { name: 'BURBERRY', variants: ['BURBERRY', 'BUR BERRY'] },
    { name: 'FENDI', variants: ['FENDI', 'FEN DI'] },
    { name: 'VERSACE', variants: ['VERSACE', 'VER SACE'] },
    { name: 'BALENCIAGA', variants: ['BALENCIAGA', 'BALEN CIAGA'] },
    
    // 캐주얼 브랜드
    { name: 'Tommy Hilfiger', variants: ['TOMMY HILFIGER', 'TOMMY', 'TH'] },
    { name: 'Calvin Klein', variants: ['CALVIN KLEIN', 'CK', 'C K'] },
    { name: 'POLO', variants: ['POLO', 'RALPH LAUREN', 'POLO RALPH LAUREN'] },
    { name: 'Lacoste', variants: ['LACOSTE', 'LACO STE'] },
    { name: "Levi's", variants: ['LEVIS', "LEVI'S", 'LE VIS'] },
    { name: 'Diesel', variants: ['DIESEL', 'DIE SEL'] },
    
    // 국내 브랜드
    { name: '무신사 스탠다드', variants: ['무신사', 'MUSINSA', 'MUSINSA STANDARD'] },
    { name: '에잇세컨즈', variants: ['에잇세컨즈', '8SECONDS', '8 SECONDS'] },
    { name: 'SPAO', variants: ['SPAO', 'SPA O'] },
    { name: '탑텐', variants: ['탑텐', 'TOPTEN', 'TOP TEN'] },
    { name: '지오다노', variants: ['지오다노', 'GIORDANO'] },
    { name: '베이직하우스', variants: ['베이직하우스', 'BASIC HOUSE', 'BASICHOUSE'] },
    { name: 'WHO.A.U', variants: ['WHO.A.U', 'WHOAU', '후아유'] },
    { name: 'MIXXO', variants: ['MIXXO', 'MIX XO', '미쏘'] },
    { name: 'TNGT', variants: ['TNGT', '잇미샤'] },
    { name: '폴햄', variants: ['폴햄', 'POLHAM'] },
    { name: '타미힐피거', variants: ['타미힐피거', 'TOMMY HILFIGER'] },
    
    // 아웃도어 브랜드
    { name: 'The North Face', variants: ['THE NORTH FACE', 'NORTH FACE', 'TNF'] },
    { name: 'Columbia', variants: ['COLUMBIA', 'COLUM BIA'] },
    { name: 'K2', variants: ['K2', 'K 2'] },
    { name: 'Kolon Sport', variants: ['KOLON SPORT', 'KOLONSPORT', '코오롱'] },
    { name: 'Nepa', variants: ['NEPA', '네파'] },
    { name: 'Discovery', variants: ['DISCOVERY', 'DISCO VERY', '디스커버리'] },
  ];
  
  // OCR 텍스트 전처리
  let fullText = textAnnotations[0].description.toUpperCase();
  // 불필요한 텍스트 제거
  fullText = fullText
    .replace(/MADE IN.*?\n/gi, '')
    .replace(/COPYRIGHT.*?\n/gi, '')
    .replace(/100%.*?\n/gi, '')
    .replace(/SIZE.*?\n/gi, '');
  
  // 브랜드 매칭 (변형 포함)
  for (const brandObj of brands) {
    for (const variant of brandObj.variants) {
      if (fullText.includes(variant.toUpperCase())) {
        return brandObj.name;
      }
    }
  }
  
  // 추가: 대문자 연속 단어 추출 (브랜드일 가능성)
  const possibleBrands = fullText.match(/\b[A-Z]{3,}\b/g);
  if (possibleBrands && possibleBrands.length > 0) {
    // 첫 번째 대문자 단어 반환 (추정 브랜드)
    const candidate = possibleBrands[0];
    if (candidate.length >= 3 && candidate.length <= 15) {
      return `${candidate} (추정)`;
    }
  }
  
  return null;
}
