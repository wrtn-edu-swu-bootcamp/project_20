/**
 * 환경 임팩트 계산 (처리 방법 기반)
 */

export function calculateImpact(recommendedPath) {
  // 최상위 추천 경로의 CO2 절감량 사용
  const co2Reduction = recommendedPath?.co2Reduction || 2.5;
  
  // 나무 환산: 1그루당 연간 약 22kg CO2 흡수
  const treesEquivalent = (co2Reduction / 22).toFixed(2);
  
  // 물 절약: 의류 1벌 생산에 약 2,700L 물 사용
  // 재판매/렌탈/업사이클은 전체 절약, 재활용은 50%만 절약
  const waterSaved = recommendedPath?.id === 'recycle' ? 1350 : 2700;
  
  return {
    co2Reduction,
    co2ReductionFormatted: `${co2Reduction}kg`,
    treesEquivalent,
    waterSaved,
    waterSavedFormatted: `${waterSaved.toLocaleString()}L`
  };
}

/**
 * 누적 통계 계산
 */
export function calculateCumulativeImpact(analyzedCount) {
  const avgCO2 = 2.5; // 평균 CO2 절감량
  
  return {
    totalClothes: analyzedCount,
    totalCO2: (analyzedCount * avgCO2).toFixed(1),
    totalTrees: ((analyzedCount * avgCO2) / 22).toFixed(1),
    totalWater: (analyzedCount * 2700).toLocaleString()
  };
}
