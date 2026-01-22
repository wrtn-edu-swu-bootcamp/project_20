/**
 * 환경 임팩트 계산
 */

export function calculateImpact(grade) {
  // 등급별 평균 CO2 절감량 (kg)
  const co2ByGrade = {
    S: 3.5,
    A: 3.0,
    B: 2.5,
    C: 2.0,
    D: 1.5
  };

  const co2Reduction = co2ByGrade[grade] || 2.5;
  
  // 나무 환산: 1그루당 연간 약 22kg CO2 흡수
  const treesEquivalent = (co2Reduction / 22).toFixed(2);
  
  // 물 절약: 의류 1벌 생산에 약 2,700L 물 사용
  const waterSaved = 2700;
  
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
