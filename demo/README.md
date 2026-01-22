# RE:OUT Demo - AI 의류 분석 서비스

> **버리기 전 3초, 당신의 옷이 갈 가장 가치 있는 길을 찾으세요**

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 Google Vision API 키를 입력:
```env
VITE_GOOGLE_VISION_KEY=your_api_key_here
```

**Google Vision API 키 발급 방법:**
1. https://console.cloud.google.com 접속
2. 프로젝트 생성
3. Vision API 활성화
4. API 키 발급

💡 **무료**: 월 1,000건까지 완전 무료!

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:5173 접속

### 4. 빌드
```bash
npm run build
```

## 📱 사용 방법

1. **사진 업로드**: 메인 화면에서 의류 사진 업로드
2. **AI 분석**: Google Vision API가 3초 내 분석
3. **결과 확인**: 
   - 의류 카테고리, 상태 등급, 손상 정보
   - 5가지 재사용 경로 추천 (우선순위순)
   - 환경 기여도 (CO2 절감량 등)

## 🛠️ 기술 스택

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **AI**: Google Cloud Vision API (무료 1,000건/월)
- **Icons**: Lucide React
- **Deployment**: Vercel (무료)

## 🎯 주요 기능

### ✅ 구현된 기능
- [x] 이미지 업로드
- [x] Google Vision API 연동
- [x] 의류 카테고리 자동 인식
- [x] 상태 등급 평가 (S/A/B/C/D)
- [x] 손상 유형 감지
- [x] 브랜드 자동 인식 (OCR)
- [x] 5가지 재사용 경로 추천
- [x] 환경 임팩트 계산
- [x] 모바일 반응형 디자인

### 🔄 향후 추가 예정
- [ ] 사용자 히스토리 저장
- [ ] 통계 대시보드
- [ ] 파트너 플랫폼 연동
- [ ] 가격 예측 고도화

## 🚀 배포

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 환경 변수 설정 (Vercel 대시보드에서)
VITE_GOOGLE_VISION_KEY=your_api_key_here

# 프로덕션 배포
vercel --prod
```

## 💰 비용

- **Google Vision API**: 무료 (월 1,000건)
- **Vercel 호스팅**: 무료
- **총 비용**: 0원 🎉

## 📊 AI 분석 프로세스

```
이미지 업로드
    ↓
Google Vision API
  - Label Detection (카테고리, 상태 키워드)
  - Text Detection (브랜드 OCR)
  - Image Properties (색상 분석)
    ↓
똑똑한 로직
  - 등급 분류 (라벨 + 색상 + 신뢰도)
  - 카테고리 매칭
  - 손상 감지
    ↓
경로 추천
  - 등급별 우선순위 계산
  - 예상 가치 산정
  - 환경 임팩트 계산
    ↓
결과 표시
```

## 🎨 스크린샷

### 홈 화면
- 깔끔한 그라데이션 배경
- 큰 업로드 버튼
- 3가지 특징 카드

### 분석 화면
- 로딩 애니메이션
- 프로그레스 바
- 환경 팁 메시지

### 결과 화면
- 의류 이미지 + 분석 결과
- 환경 임팩트 시각화
- 5가지 경로 카드 (우선순위순)

## 📞 문의

RE:OUT 프로젝트에 대한 문의사항이나 협업 제안은 언제든 환영합니다.

---

**RE:OUT은 단순한 앱이 아닙니다.**  
**버려지는 옷에 새로운 길을 열어주는, 의류 순환 생태계의 시작입니다.**
