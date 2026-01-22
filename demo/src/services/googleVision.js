import axios from 'axios';

/**
 * Google Vision API로 이미지 분석
 * 무료: 월 1,000건
 */
export async function analyzeImageWithVision(imageBase64) {
  const apiKey = import.meta.env.VITE_GOOGLE_VISION_KEY;
  
  if (!apiKey) {
    console.warn('Google Vision API 키가 없습니다. 데모 모드로 실행합니다.');
    return getDemoVisionResult();
  }

  try {
    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        requests: [{
          image: { content: imageBase64 },
          features: [
            { type: 'LABEL_DETECTION', maxResults: 10 },
            { type: 'TEXT_DETECTION' },
            { type: 'IMAGE_PROPERTIES' },
            { type: 'SAFE_SEARCH_DETECTION' }
          ]
        }]
      }
    );
    
    return response.data.responses[0];
  } catch (error) {
    console.error('Google Vision API 에러:', error);
    // API 실패 시 데모 결과 반환
    return getDemoVisionResult();
  }
}

/**
 * 데모용 Vision 결과 (API 키 없을 때)
 * 랜덤 결과로 다양성 제공
 */
function getDemoVisionResult() {
  const demos = [
    {
      labelAnnotations: [
        { description: 'Clothing', score: 0.98 },
        { description: 'Blue', score: 0.95 },
        { description: 'Sleeve', score: 0.92 },
        { description: 'Shirt', score: 0.89 },
        { description: 'Clean', score: 0.85 }
      ],
      textAnnotations: [{ description: 'ZARA\nMade in China\n100% Cotton' }],
      imagePropertiesAnnotation: {
        dominantColors: {
          colors: [
            { color: { red: 68, green: 120, blue: 166 }, score: 0.42, pixelFraction: 0.35 },
            { color: { red: 200, green: 210, blue: 220 }, score: 0.28, pixelFraction: 0.25 }
          ]
        }
      }
    },
    {
      labelAnnotations: [
        { description: 'Jacket', score: 0.96 },
        { description: 'Black', score: 0.93 },
        { description: 'Coat', score: 0.90 },
        { description: 'Outerwear', score: 0.88 },
        { description: 'New', score: 0.82 }
      ],
      textAnnotations: [{ description: 'The North Face\nSize L' }],
      imagePropertiesAnnotation: {
        dominantColors: {
          colors: [
            { color: { red: 20, green: 20, blue: 20 }, score: 0.60, pixelFraction: 0.50 }
          ]
        }
      }
    },
    {
      labelAnnotations: [
        { description: 'Jeans', score: 0.95 },
        { description: 'Pants', score: 0.92 },
        { description: 'Denim', score: 0.90 },
        { description: 'Blue', score: 0.87 },
        { description: 'Worn', score: 0.75 }
      ],
      textAnnotations: [{ description: "Levi's\n501 Original" }],
      imagePropertiesAnnotation: {
        dominantColors: {
          colors: [
            { color: { red: 50, green: 80, blue: 120 }, score: 0.50, pixelFraction: 0.40 }
          ]
        }
      }
    }
  ];
  
  // 랜덤 결과 반환
  return demos[Math.floor(Math.random() * demos.length)];
}
