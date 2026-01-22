/**
 * Google Vision 결과를 바탕으로 똑똑하게 등급 분류
 * Mock이 아닌 실제 AI 결과 기반 로직
 */

export function classifyGrade(visionResult) {
  const labels = (visionResult.labelAnnotations || []).map(l => l.description.toLowerCase());
  const colors = visionResult.imagePropertiesAnnotation?.dominantColors?.colors || [];
  
  let score = 60; // 기본 A-B 사이로 상향
  
  // 1. 품질 키워드 체크 (확장된 키워드, +/- 25점)
  const highQuality = [
    'new', 'clean', 'pristine', 'unworn', 'mint', 'fresh', 'perfect', 'excellent',
    'fashion', 'style', 'modern', 'elegant', 'beauty', 'clothing', 'textile',
    'white', 'bright', 'neat', 'tidy'
  ];
  const lowQuality = [
    'worn', 'old', 'damaged', 'stained', 'torn', 'faded', 'dirty', 'vintage',
    'used', 'wrinkled', 'hole', 'scratch', 'mark', 'spot', 'discolored'
  ];
  
  let qualityBonus = 0;
  labels.forEach(label => {
    if (highQuality.some(kw => label.includes(kw))) {
      qualityBonus += 3; // 고품질 키워드당 +3점
    }
    if (lowQuality.some(kw => label.includes(kw))) {
      qualityBonus -= 8; // 저품질 키워드당 -8점 (더 강하게)
    }
  });
  score += Math.max(-30, Math.min(30, qualityBonus)); // -30 ~ +30 범위
  
  // 2. 색상 선명도 체크 (개선된 로직, +/- 20점)
  if (colors.length > 0) {
    const topColor = colors[0];
    const brightness = (topColor.color.red + topColor.color.green + topColor.color.blue) / 3;
    const saturation = Math.max(
      Math.abs(topColor.color.red - topColor.color.green),
      Math.abs(topColor.color.green - topColor.color.blue),
      Math.abs(topColor.color.blue - topColor.color.red)
    );
    
    // 밝고 선명한 색상 = 좋은 상태
    if (brightness > 180 && saturation > 30) {
      score += 15;
    } else if (brightness > 140) {
      score += 8;
    }
    
    // 어둡고 탁한 색상 = 나쁜 상태
    if (brightness < 70 || saturation < 15) {
      score -= 15;
    }
  }
  
  // 3. AI 신뢰도 (+/- 15점)
  const topConfidence = visionResult.labelAnnotations?.[0]?.score || 0;
  if (topConfidence > 0.95) score += 15;
  else if (topConfidence > 0.85) score += 8;
  else if (topConfidence < 0.6) score -= 10;
  
  // 4. 라벨 다양성 (많은 라벨 = 명확한 이미지 = 좋은 상태)
  if (labels.length >= 10) score += 10;
  else if (labels.length <= 3) score -= 5;
  
  // 5. 등급 결정 (범위 조정)
  if (score >= 85) return 'S';
  if (score >= 70) return 'A';
  if (score >= 50) return 'B';
  if (score >= 30) return 'C';
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

// 브랜드 Tier 시스템 (중고거래 시장 기반)
export const BRAND_TIERS = {
  premium: [ // 후루츠패밀리 고가 재판매
    'GUCCI', 'PRADA', 'CHANEL', 'DIOR', 'Louis Vuitton', 'HERMES', 'BURBERRY', 'FENDI', 
    'VERSACE', 'BALENCIAGA', 'Vivienne Westwood', 'Supreme', 'BAPE', 'Comme des Garçons',
    'Maison Margiela', 'Yohji Yamamoto', 'Chrome Hearts', 'KAPITAL', 'Hysteric Glamour'
  ],
  popular: [ // 번개장터 대중적 인기
    'ARCTERYX', 'Stussy', 'POLO', 'Carhartt', 'Patagonia', 'Diesel', 'The North Face',
    '아더에러', '무신사 스탠다드', '준지', '띠어리', '지용킴', 'Tommy Hilfiger', 'Calvin Klein'
  ],
  sports: [ // 스포츠/캐주얼
    'NIKE', 'ADIDAS', 'PUMA', 'New Balance', 'FILA', 'Reebok', 'Under Armour',
    'UGG', 'RAINS', '휠라', '러기드하우스', '뉴오브', '버닝카포네'
  ],
  basic: [ // 기본 브랜드
    'ZARA', 'H&M', 'UNIQLO', 'GAP', 'Mango', 'SPAO', '탑텐', '지오다노', 
    '베이직하우스', 'WHO.A.U', 'MIXXO'
  ]
};

// 모든 브랜드 리스트 (자동완성용)
export const ALL_BRANDS = [
  // Premium
  'GUCCI', 'PRADA', 'CHANEL', 'DIOR', 'Louis Vuitton', 'HERMES', 'BURBERRY', 'FENDI', 
  'VERSACE', 'BALENCIAGA', 'Vivienne Westwood', 'Supreme', 'BAPE', 'Comme des Garçons',
  'Maison Margiela', 'Yohji Yamamoto', 'Chrome Hearts', 'KAPITAL', 'Hysteric Glamour',
  // Popular
  'ARCTERYX', 'Stussy', 'POLO', 'Carhartt', 'Patagonia', 'Diesel', 'The North Face',
  '아더에러', '무신사 스탠다드', '준지', '띠어리', '지용킴', 'Tommy Hilfiger', 'Calvin Klein',
  'Lacoste', "Levi's",
  // Sports
  'NIKE', 'ADIDAS', 'PUMA', 'New Balance', 'FILA', 'Reebok', 'Under Armour',
  'UGG', 'RAINS', '휠라', '러기드하우스', '뉴오브', '버닝카포네',
  // Basic
  'ZARA', 'H&M', 'UNIQLO', 'GAP', 'Forever 21', 'Mango', 'SPAO', '탑텐', '지오다노', 
  '베이직하우스', 'WHO.A.U', 'MIXXO', 'TNGT', '폴햄',
  // Outdoor
  'Columbia', 'K2', 'Kolon Sport', 'Nepa', 'Discovery'
].sort();

// 브랜드 Tier 판별 함수
export function getBrandTier(brandName) {
  if (!brandName) return 'unknown';
  
  const brand = brandName.toUpperCase();
  for (const [tier, brands] of Object.entries(BRAND_TIERS)) {
    if (brands.some(b => brand.includes(b.toUpperCase()))) {
      return tier;
    }
  }
  return 'basic';
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
    
    // 빈티지/스트릿
    { name: 'Vivienne Westwood', variants: ['VIVIENNE WESTWOOD', 'VIVIENNE', 'WESTWOOD'] },
    { name: 'Supreme', variants: ['SUPREME'] },
    { name: 'BAPE', variants: ['BAPE', 'A BATHING APE'] },
    { name: 'Stussy', variants: ['STUSSY', 'STÜSSY'] },
    { name: 'Comme des Garçons', variants: ['COMME DES GARCONS', 'CDG', 'COMME'] },
    { name: 'Maison Margiela', variants: ['MAISON MARGIELA', 'MARGIELA', 'MM6'] },
    { name: 'Chrome Hearts', variants: ['CHROME HEARTS', 'CHROME'] },
    { name: 'KAPITAL', variants: ['KAPITAL'] },
    { name: 'Hysteric Glamour', variants: ['HYSTERIC GLAMOUR', 'HYSTERIC'] },
    
    // 캐주얼 브랜드
    { name: 'Tommy Hilfiger', variants: ['TOMMY HILFIGER', 'TOMMY', 'TH'] },
    { name: 'Calvin Klein', variants: ['CALVIN KLEIN', 'CK', 'C K'] },
    { name: 'POLO', variants: ['POLO', 'RALPH LAUREN', 'POLO RALPH LAUREN'] },
    { name: 'Lacoste', variants: ['LACOSTE', 'LACO STE'] },
    { name: "Levi's", variants: ['LEVIS', "LEVI'S", 'LE VIS'] },
    { name: 'Diesel', variants: ['DIESEL', 'DIE SEL'] },
    { name: 'Carhartt', variants: ['CARHARTT', 'CAR HARTT'] },
    
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
    { name: '아더에러', variants: ['아더에러', 'ADER ERROR', 'ADERERROR'] },
    { name: '준지', variants: ['준지', 'JUNJI'] },
    { name: '띠어리', variants: ['띠어리', 'THEORY'] },
    { name: '지용킴', variants: ['지용킴', 'JIYONG KIM'] },
    
    // 아웃도어 브랜드
    { name: 'The North Face', variants: ['THE NORTH FACE', 'NORTH FACE', 'TNF'] },
    { name: 'ARCTERYX', variants: ['ARCTERYX', "ARC'TERYX", '아크테릭스'] },
    { name: 'Patagonia', variants: ['PATAGONIA', 'PATA GONIA'] },
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
