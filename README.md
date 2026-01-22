# RE:OUT (루트) - AI 기반 의류 재사용 경로 추천 서비스

> **버릴까, 팔까? 고민은 AI가, 결정은 3초 만에.**

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://github.com/wrtn-edu-swu-bootcamp/project_20)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 📖 프로젝트 소개

RE:OUT은 **AI 이미지 분석**을 통해 의류의 상태를 자동으로 평가하고, 가장 적합한 재사용 경로(재판매/기부/업사이클/재활용/렌탈)를 3초 만에 추천하는 웹 서비스입니다.

사진 한 장으로 의류 폐기 결정의 고민을 제거하고, 환경적 가치와 경제적 이익을 동시에 제공합니다.

---

## 🎯 주요 기능

### 1. **AI 이미지 분석**
- Google Vision API를 활용한 의류 이미지 인식
- 자동 카테고리 분류 (상의/하의/아우터/원피스 등)
- 상태 등급 평가 (S/A/B/C/D 등급)
- 손상 여부 감지 (얼룩, 구멍, 색바램, 보풀 등)
- **100+ 글로벌/국내 브랜드 자동 인식** (OCR)
- **브랜드 수동 입력/수정 기능** (자동완성 지원)

### 2. **브랜드 기반 스마트 추천** ⭐ 핵심 기능
실제 중고거래 시장 데이터를 반영한 **브랜드 Tier 시스템**:

**Premium Tier** (명품/한정판)
- 브랜드: GUCCI, CHANEL, Supreme, BAPE, Vivienne Westwood 등
- 추천 플랫폼: 후루츠 패밀리, 크림, 발란, 머스트잇
- 예상 가격: S등급 100,000~500,000원

**Popular Tier** (대중적 인기)
- 브랜드: ARCTERYX, 아더에러, 무신사, Stussy, Carhartt 등
- 추천 플랫폼: 번개장터, 당근마켓, 중고나라
- 예상 가격: S등급 50,000~150,000원

**Sports Tier** (스포츠/캐주얼)
- 브랜드: NIKE, ADIDAS, New Balance, PUMA 등
- 추천 플랫폼: 번개장터, 당근마켓, 크림, 솔드아웃
- 예상 가격: S등급 30,000~100,000원

**Basic Tier** (기본 브랜드)
- 브랜드: ZARA, H&M, UNIQLO, SPAO 등
- 추천 플랫폼: 당근마켓, 번개장터
- 예상 가격: S등급 15,000~35,000원

### 3. **5가지 처리 경로**
- **재판매**: 브랜드별 최적 플랫폼 (번개장터, 당근마켓, 후루츠 패밀리, 크림 등)
- **기부**: 아름다운가게, 굿윌스토어, 옷캔 등
- **업사이클**: 컨티뉴, 래;코드, 플리츠마마 등
- **재활용**: 의류수거함, 주민센터 등
- **렌탈**: 의류 렌탈 업체

### 4. **동적 환경 임팩트 계산**
처리 방법에 따라 실시간 계산:
- **재판매/렌탈**: CO2 3.0~3.5kg, 물 2,700L
- **업사이클**: CO2 4.0kg, 물 2,700L (최고 친환경!)
- **기부**: CO2 2.5kg, 물 2,700L
- **재활용**: CO2 1.5kg, 물 1,350L
- 브랜드 변경 시 자동 재계산

---

## 🛠️ 기술 스택

### **Frontend**
- **React** 18.3.1 - UI 프레임워크
- **Vite** 6.0.5 - 빌드 도구
- **Tailwind CSS** 4.0.15 - 스타일링
- **Lucide React** - 아이콘 라이브러리

### **AI & API**
- **Google Cloud Vision API** - 이미지 분석
  - Label Detection (객체 인식)
  - Text Detection (OCR, 브랜드 인식)
  - Image Properties (색상 분석)
- **Axios** - HTTP 클라이언트

### **Deployment**
- **Vercel** - 호스팅 및 배포
- **GitHub** - 버전 관리

---

## 🚀 시작하기

### 1. **필수 요구사항**
- Node.js 18 이상
- npm 또는 yarn
- Google Cloud Platform 계정 (Vision API 사용)

### 2. **설치**

```bash
# 저장소 클론
git clone https://github.com/wrtn-edu-swu-bootcamp/project_20.git
cd project_20

# 의존성 설치
cd demo
npm install
```

### 3. **환경 변수 설정**

`demo/.env` 파일을 생성하고 Google Vision API 키를 입력하세요:

```env
VITE_GOOGLE_VISION_KEY=your_api_key_here
```

**API 키 발급 방법:**
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 생성 또는 선택
3. "API 및 서비스" > "라이브러리" > "Cloud Vision API" 활성화
4. "사용자 인증 정보" > "API 키 만들기"
5. 생성된 키를 복사하여 `.env` 파일에 붙여넣기

### 4. **실행**

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 열기
# http://localhost:5173
```

### 5. **빌드**

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 📂 프로젝트 구조

```
project/
├── demo/                          # 웹 애플리케이션
│   ├── src/
│   │   ├── pages/                 # 페이지 컴포넌트
│   │   │   ├── HomePage.jsx      # 메인 페이지
│   │   │   ├── AnalysisPage.jsx  # 분석 중 페이지
│   │   │   └── ResultPage.jsx    # 결과 페이지
│   │   ├── services/              # API 및 비즈니스 로직
│   │   │   ├── googleVision.js   # Google Vision API 연동
│   │   │   ├── aiAnalysis.js     # AI 분석 통합
│   │   │   └── gradeClassifier.js # 등급 분류 로직
│   │   └── utils/                 # 유틸리티 함수
│   │       ├── pathCalculator.js # 경로 추천 로직
│   │       └── impactCalculator.js # 환경 임팩트 계산
│   ├── index.html
│   ├── package.json
│   └── .env                       # 환경 변수 (gitignore)
├── docs/                          # 기획 문서
│   ├── service-proposal.md        # 서비스 기획안
│   └── user-scenarios.md          # 사용자 시나리오
└── README.md                      # 현재 문서
```

---

## 🔍 작동 원리

### **1. 이미지 업로드**
사용자가 의류 사진을 업로드하면 파일이 Base64로 인코딩되어 Google Vision API로 전송됩니다.

### **2. AI 분석**
```javascript
// Google Vision API 호출
const visionResult = await analyzeImageWithVision(base64Image);

// 3가지 기능 활용
- labelAnnotations: 객체 인식 (카테고리 분류, 손상 감지)
- textAnnotations: OCR (브랜드명 추출)
- imagePropertiesAnnotation: 색상 분석
```

### **3. 등급 분류**
```javascript
// 규칙 기반 분류 로직
const grade = classifyGrade(visionResult);

// S등급: 신품급 (라벨 포함)
// A등급: 매우 좋음 (미세한 사용감)
// B등급: 좋음 (경미한 손상)
// C등급: 보통 (눈에 띄는 손상)
// D등급: 나쁨 (심각한 손상)
```

### **4. 경로 추천**
```javascript
// 등급별 최적 경로 매칭
const paths = calculatePaths(grade, category, brand);

// S/A등급 → 재판매 우선
// B등급 → 기부/업사이클 우선
// C/D등급 → 재활용 우선
```

### **5. 환경 임팩트 계산**
```javascript
// 의류 재사용 시 환경 효과 산출
const impact = {
  co2Saved: 3.5,      // kg
  treesPlanted: 0.16, // 그루
  waterSaved: 2700    // L
};
```

---

## 💡 기대 효과

### **개인 사용자**
- ⏱️ **시간 절약**: 의류 1벌당 고민 시간 3분 → 3초
- 💰 **부수익 창출**: 예상 판매가 자동 산출로 중고거래 활성화
- 🌱 **환경 기여**: 1인당 연평균 의류 폐기량 8.3kg 감소

### **기업/단체**
- 💵 **비용 절감**: 의류 분류/재고 처리 비용 50% 이상 절감
- 📊 **ESG 성과**: 구체적 수치(CO2, 물 절약)로 보고서 작성 가능
- 🏢 **브랜드 가치**: 친환경 이미지 제고 및 순환경제 참여

### **사회 전체**
- 🌍 **폐기물 감소**: 연간 의류 폐기량 8만톤 → 목표 20% 감소
- ♻️ **재활용률 증가**: 현재 11% → 목표 30%
- 🌿 **탄소 절감**: 연간 약 3,000톤 CO2 절감 (12개월 기준)

---

## 📊 핵심 성과 지표 (KPI)

| 지표 | 현재 (국내) | 목표 (12개월) |
|------|-------------|---------------|
| 분석된 의류 | - | 100만 벌 |
| 재사용된 의류 | - | 80만 벌 |
| CO2 절감량 | - | 3,000톤 |
| 의류 폐기 비용 절감 | - | 50억원 |
| 사용자 수 | - | 10만명 |

---

## 🎨 UI/UX 특징

### **디자인 컨셉**
- **Minimalist Sustainable Tech**: MUJI/COS/Apple/Naver 스타일
- 무채색 기반 (#000 ~ #EAEAEA)
- 포인트 컬러: 민트 (#2DD4BF)
- 얇은 sans-serif 폰트 (Inter, Noto Sans KR)

### **사용자 경험**
- 3초 분석 완료 및 실시간 진행 표시
- 직관적인 업로드 인터페이스 (드래그 앤 드롭)
- AI 신뢰도 게이지 바로 신뢰성 강조
- 모바일 반응형 디자인

---

## 🌐 배포

### **Vercel 배포**

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
cd demo
vercel

# 프로덕션 배포
vercel --prod
```

### **환경 변수 설정**
Vercel 대시보드에서 `VITE_GOOGLE_VISION_KEY` 환경 변수를 설정하세요.

---

## 💰 비용 구조

### **Google Vision API**
- **무료 티어**: 월 1,000건
- **추가 비용**: 1,000건당 $1.50
- **예상 비용**: 월 10만건 기준 약 $150 (약 20만원)

### **Vercel 호스팅**
- **무료 티어**: Hobby 플랜 (개인 프로젝트)
- **Pro 플랜**: 월 $20 (팀 협업)

### **총 운영 비용**
- **MVP 단계**: 무료 (월 1,000건 이하)
- **초기 운영**: 월 약 20만원 (월 10만건)
- **확장 시**: 월 약 200만원 (월 100만건)

---

## 🤝 기여하기

이 프로젝트는 오픈소스이며, 기여를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 📞 문의

**RE:OUT 프로젝트 팀**

- GitHub: [wrtn-edu-swu-bootcamp/project_20](https://github.com/wrtn-edu-swu-bootcamp/project_20)
- 이슈 제보: [GitHub Issues](https://github.com/wrtn-edu-swu-bootcamp/project_20/issues)

---

## 🙏 참고 자료

- [Google Cloud Vision API Documentation](https://cloud.google.com/vision/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

**RE:OUT은 단순한 앱이 아닙니다.**  
**버려지는 옷에 새로운 길을 열어주는, 의류 순환 생태계의 시작입니다.** 🌱♻️
