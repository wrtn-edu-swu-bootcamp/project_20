# 🚀 RE:OUT 배포 가이드

## 📋 사전 준비

### 1. Google Vision API 키 발급 (5분)

1. https://console.cloud.google.com 접속
2. 프로젝트 생성
3. **"API 및 서비스" > "라이브러리"**
4. "Vision API" 검색 → **활성화**
5. **"API 및 서비스" > "사용자 인증 정보"**
6. **"사용자 인증 정보 만들기" > "API 키"**
7. 생성된 API 키 복사

### 2. 로컬 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:
```env
VITE_GOOGLE_VISION_KEY=AIzaSy...여기에_API키_붙여넣기
```

## 🖥️ 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 http://localhost:5173 접속

### 테스트 시나리오
1. 의류 사진 준비 (코트, 티셔츠, 청바지 등)
2. 업로드 버튼 클릭
3. 사진 선택
4. 3-5초 대기 (AI 분석)
5. 결과 확인:
   - 카테고리, 등급, 브랜드
   - 5가지 경로 추천
   - 환경 임팩트

## 🌐 Vercel 배포 (무료!)

### 방법 1: Vercel CLI (추천)

```bash
# 1. Vercel CLI 설치
npm i -g vercel

# 2. 로그인
vercel login

# 3. 배포
vercel

# 4. Vercel 대시보드에서 환경 변수 설정
# Settings > Environment Variables
# VITE_GOOGLE_VISION_KEY = your_api_key

# 5. 프로덕션 배포
vercel --prod
```

### 방법 2: GitHub 연동 (더 쉬움!)

1. **GitHub에 푸시**
```bash
git init
git add .
git commit -m "Initial commit - RE:OUT demo"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/reout-demo.git
git push -u origin main
```

2. **Vercel 연동**
   - https://vercel.com 접속
   - "Import Project"
   - GitHub 저장소 선택
   - 환경 변수 입력:
     - `VITE_GOOGLE_VISION_KEY` = your_api_key
   - "Deploy" 클릭

3. **배포 완료!**
   - 자동 생성된 URL: `https://reout-demo.vercel.app`
   - 매번 푸시 시 자동 재배포

## 📱 모바일 테스트

배포 후 반드시 테스트:
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] 이미지 업로드 작동
- [ ] 카메라 촬영 작동 (모바일)
- [ ] 터치 인터랙션
- [ ] 반응형 레이아웃

## 🎯 발표용 준비

### QR 코드 생성
1. 배포된 URL 복사
2. https://www.qr-code-generator.com 접속
3. URL 입력
4. QR 코드 다운로드
5. 발표 자료에 삽입

### 데모 시나리오
```
1. QR 코드 보여주기
   "여러분도 지금 바로 접속하실 수 있습니다"

2. 모바일로 접속 시연
   - 사진 업로드
   - AI 분석 (3초)
   - 결과 확인

3. 핵심 기능 설명
   - Google Vision AI 사용
   - 5가지 경로 추천
   - 환경 임팩트
```

## 🐛 트러블슈팅

### API 키 오류
```
Error: API key not valid
```
→ `.env` 파일 확인, Vercel 환경 변수 확인

### CORS 에러
```
Access to fetch blocked by CORS policy
```
→ Google Vision API는 브라우저에서 직접 호출 가능 (CORS 문제 없음)

### 빌드 실패
```
npm run build
```
→ 에러 메시지 확인, 의존성 재설치

### Vercel 배포 느림
→ 첫 배포는 5-10분 소요 (정상)
→ 이후 배포는 1-2분

## ✅ 최종 체크리스트

### 배포 전
- [ ] `.env` 파일에 API 키 입력
- [ ] 로컬에서 정상 작동 확인
- [ ] `npm run build` 성공 확인
- [ ] `.gitignore`에 `.env` 포함 확인

### 배포 후
- [ ] 배포 URL 접속 확인
- [ ] 모바일 접속 확인
- [ ] API 작동 확인 (실제 사진 업로드)
- [ ] QR 코드 생성
- [ ] 발표 자료에 URL 추가

## 🎤 발표 팁

### 시연 시 주의사항
1. **인터넷 연결 확인**: 와이파이 미리 연결
2. **사진 준비**: 깨끗한 의류 사진 2-3장 미리 준비
3. **백업 플랜**: 스크린샷 또는 녹화 영상 준비
4. **QR 코드 크게**: 관객이 쉽게 스캔 가능하도록

### 강조할 포인트
- ✅ "실제 Google AI 사용" (Mock 아님!)
- ✅ "완전 무료 구현" (월 1,000건)
- ✅ "3-5초 실시간 분석"
- ✅ "모바일 최적화"
- ✅ "환경 임팩트 가시화"

## 🏆 90점 획득 전략

```
기획 적합성 (30점): ✅ 완벽한 기획안
기능 구현 (25점):   ✅ 실제 AI 작동
배포 여부 (20점):   ✅ Vercel 배포 완료
AI 활용 (18점):     ✅ Google Vision 사용
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
총점: 93점 예상! 🎯
```

## 📞 긴급 지원

배포 중 문제 발생 시:
1. 에러 메시지 캡처
2. Vercel 로그 확인
3. Google Cloud Console에서 API 사용량 확인

---

**준비 완료! 90점 받으러 가시죠!** 🚀
