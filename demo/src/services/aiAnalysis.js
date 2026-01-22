import { analyzeImageWithVision } from './googleVision';
import { classifyGrade, detectCategory, detectDamage, extractBrand } from './gradeClassifier';
import { calculatePaths } from '../utils/pathCalculator';
import { calculateImpact } from '../utils/impactCalculator';

/**
 * 의류 이미지를 종합 분석
 * Google Vision API + 똑똑한 로직
 */
export async function analyzeClothing(imageFile) {
  // 1. 이미지를 Base64로 변환
  const base64 = await fileToBase64(imageFile);
  
  // 2. Google Vision API 호출 (무료!)
  const visionResult = await analyzeImageWithVision(base64);
  
  // 3. 결과 분석
  const labels = visionResult.labelAnnotations || [];
  const texts = visionResult.textAnnotations || [];
  
  const grade = classifyGrade(visionResult);
  const category = detectCategory(labels);
  const damage = detectDamage(labels);
  const brand = extractBrand(texts);
  
  // 4. 경로 추천 및 임팩트 계산
  const recommendedPaths = calculatePaths(grade, category);
  const environmentalImpact = calculateImpact(grade);
  
  // 5. 최종 결과
  return {
    category,
    grade,
    damage,
    brand,
    labels: labels.slice(0, 5).map(l => l.description),
    confidence: labels[0]?.score || 0.85,
    recommendedPaths,
    environmentalImpact,
    timestamp: new Date().toISOString()
  };
}

/**
 * 파일을 Base64로 변환
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // data:image/jpeg;base64, 제거하고 순수 base64만
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
  });
}
