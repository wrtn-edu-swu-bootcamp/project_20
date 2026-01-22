/**
 * 등급과 브랜드에 따라 5가지 재사용 경로 추천
 */
import { getBrandTier } from '../services/gradeClassifier.js';

export function calculatePaths(grade, category, brand = null) {
  const brandTier = getBrandTier(brand);
  const paths = [
    {
      id: 'resale',
      name: '재판매',
      icon: '💰',
      color: 'emerald',
      priority: 0,
      estimatedValue: '',
      description: '',
      platforms: [],
      timeRequired: '등록 5분, 판매 1주~1개월',
      co2Reduction: 3.0
    },
    {
      id: 'donation',
      name: '기부',
      icon: '❤️',
      color: 'rose',
      priority: 0,
      estimatedValue: '',
      description: '',
      platforms: [],
      timeRequired: '수거함 방문 10분 또는 택배 발송',
      co2Reduction: 2.5
    },
    {
      id: 'upcycle',
      name: '업사이클링',
      icon: '♻️',
      color: 'purple',
      priority: 0,
      estimatedValue: '',
      description: '',
      platforms: [],
      timeRequired: '상담 후 결정',
      co2Reduction: 4.0
    },
    {
      id: 'recycle',
      name: '재활용',
      icon: '🔄',
      color: 'blue',
      priority: 0,
      estimatedValue: '',
      description: '',
      platforms: [],
      timeRequired: '수거함 방문 10분',
      co2Reduction: 1.5
    },
    {
      id: 'rental',
      name: '렌탈 서비스',
      icon: '🏪',
      color: 'amber',
      priority: 0,
      estimatedValue: '',
      description: '',
      platforms: [],
      timeRequired: '택배 발송',
      co2Reduction: 3.5
    }
  ];

  // 등급별 우선순위 및 가치 계산 (브랜드 Tier 반영)
  paths.forEach(path => {
    const config = getPathConfig(path.id, grade, category, brandTier, brand);
    Object.assign(path, config);
  });

  // 우선순위로 정렬
  return paths.sort((a, b) => b.priority - a.priority);
}

function getPathConfig(pathId, grade, category, brandTier, brandName) {
  // 브랜드 Tier별 플랫폼 우선순위
  const getPlatformsByTier = (tier) => {
    switch(tier) {
      case 'premium':
        return ['후루츠 패밀리', '크림', '발란', '머스트잇'];
      case 'popular':
        return ['번개장터', '당근마켓', '중고나라', '후루츠 패밀리'];
      case 'sports':
        return ['번개장터', '당근마켓', '크림', '솔드아웃'];
      case 'basic':
      default:
        return ['당근마켓', '번개장터', '중고나라'];
    }
  };

  const configs = {
    resale: {
      S: { 
        priority: 100, 
        value: brandTier === 'premium' ? '100,000~500,000원' : '50,000~80,000원', 
        desc: brandTier === 'premium' ? '명품/한정판! 프리미엄 플랫폼 추천' : '신품급! 중고 플랫폼에서 높은 가격 책정 가능', 
        platforms: getPlatformsByTier(brandTier) 
      },
      A: { 
        priority: 95, 
        value: brandTier === 'premium' ? '70,000~300,000원' : '30,000~60,000원', 
        desc: '사용감 적어 재판매에 최적', 
        platforms: getPlatformsByTier(brandTier) 
      },
      B: { 
        priority: 80, 
        value: brandTier === 'premium' ? '50,000~150,000원' : '15,000~35,000원', 
        desc: '적정 가격으로 판매 가능', 
        platforms: getPlatformsByTier(brandTier) 
      },
      C: { 
        priority: brandTier === 'premium' ? 60 : 40, 
        value: brandTier === 'premium' ? '30,000~80,000원' : '5,000~15,000원', 
        desc: brandTier === 'premium' ? '명품은 상태 관계없이 수요 있음' : '저가 판매 가능', 
        platforms: brandTier === 'premium' ? ['후루츠 패밀리', '당근마켓'] : ['당근마켓', '후루츠 패밀리'] 
      },
      D: { 
        priority: brandTier === 'premium' ? 40 : 10, 
        value: brandTier === 'premium' ? '20,000~50,000원' : '판매 어려움', 
        desc: brandTier === 'premium' ? '명품은 부품/수리용으로도 가치 있음' : '재판매는 비추천', 
        platforms: brandTier === 'premium' ? ['후루츠 패밀리'] : [] 
      }
    },
    donation: {
      S: { priority: 60, value: '세액공제 가능', desc: '신품급 의류는 높은 기부 가치', platforms: ['아름다운가게', '굿윌스토어'] },
      A: { priority: 70, value: '세액공제 가능', desc: '기부처에서 선호하는 상태', platforms: ['아름다운가게', '굿윌스토어', '옷캔'] },
      B: { priority: 85, value: '세액공제 가능', desc: '기부에 적합한 상태', platforms: ['아름다운가게', '굿윌스토어', '옷캔'] },
      C: { priority: 70, value: '일부 기부처 가능', desc: '착용 가능하면 기부 가능', platforms: ['옷캔', '주민센터'] },
      D: { priority: 30, value: '기부 어려움', desc: '기부는 비추천', platforms: [] }
    },
    upcycle: {
      S: { priority: 30, value: '리메이크 원료', desc: '신품급은 업사이클보다 재판매 추천', platforms: [] },
      A: { priority: 40, value: '리메이크 원료', desc: '독특한 디자인이면 업사이클 가능', platforms: ['컨티뉴', '래;코드'] },
      B: { priority: 60, value: '리메이크 원료', desc: '업사이클에 적합한 상태', platforms: ['컨티뉴', '래;코드', '플리츠마마'] },
      C: { priority: 90, value: '벌당 3,000~10,000원', desc: '업사이클에 최적! 새 가치 창출', platforms: ['컨티뉴', '래;코드', '로컬 리폼샵'] },
      D: { priority: 50, value: '부분 활용 가능', desc: '일부 소재만 활용 가능', platforms: ['로컬 리폼샵'] }
    },
    recycle: {
      S: { priority: 10, value: '비추천', desc: '재활용보다 재판매/기부 추천', platforms: [] },
      A: { priority: 20, value: '비추천', desc: '재활용보다 다른 경로 추천', platforms: [] },
      B: { priority: 30, value: '재활용 가능', desc: '재활용도 가능하지만 다른 경로 우선', platforms: ['의류수거함'] },
      C: { priority: 70, value: '재활용 가능', desc: '섬유 재생으로 새 가치 창출', platforms: ['의류수거함', '주민센터'] },
      D: { priority: 100, value: '재활용 적합', desc: '섬유 재활용이 최선', platforms: ['의류수거함', '주민센터', '구청'] }
    },
    rental: {
      S: { priority: 50, value: '벌당 5,000~15,000원', desc: '렌탈 서비스 원료로 적합', platforms: ['의류 렌탈 업체'] },
      A: { priority: 65, value: '벌당 3,000~10,000원', desc: '베이직 아이템이면 렌탈 가능', platforms: ['의류 렌탈 업체'] },
      B: { priority: 55, value: '벌당 2,000~7,000원', desc: '유행 타지 않는 아이템 적합', platforms: ['의류 렌탈 업체'] },
      C: { priority: 30, value: '벌당 1,000~3,000원', desc: '렌탈은 제한적', platforms: [] },
      D: { priority: 10, value: '렌탈 부적합', desc: '렌탈 비추천', platforms: [] }
    }
  };

  const config = configs[pathId]?.[grade] || configs[pathId]['B'];
  
  // 브랜드 Tier가 premium이면 재판매 우선순위 상승
  let priority = config.priority;
  if (pathId === 'resale' && brandTier === 'premium') {
    priority += 5;
  }
  
  return {
    priority: priority,
    estimatedValue: config.value,
    description: config.desc,
    platforms: config.platforms
  };
}
