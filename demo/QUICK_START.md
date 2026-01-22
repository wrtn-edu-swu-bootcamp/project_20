# ⚡ RE:OUT 빠른 시작 가이드

> **30분 안에 실행부터 배포까지!**

---

## 🚀 1단계: 즉시 실행 (5분)

### 현재 상태
✅ 프로젝트 생성 완료  
✅ 모든 파일 준비 완료  
✅ 개발 서버 실행 중  

### 지금 바로 확인하기
```
브라우저에서 열기:
http://localhost:5173
```

**보이는 것:**
- 보라색 그라데이션 배경
- "RE:OUT" 큰 제목
- "사진 업로드하기" 버튼
- 3개 특징 카드

---

## 🔑 2단계: API 키 설정 (5분)

### 지금 당장 필요하지 않음!
API 키 없어도 **데모 모드**로 작동합니다!

### API 키 있으면 더 좋음
실제 Google AI 사용하려면:

1. **빠른 발급** (5분)
   - https://console.cloud.google.com
   - 프로젝트 생성
   - Vision API 활성화
   - API 키 복사

2. **`.env` 파일 생성**
   ```bash
   # demo 폴더에 .env 파일 생성
   VITE_GOOGLE_VISION_KEY=여기에_API키_붙여넣기
   ```

3. **개발 서버 재시작**
   ```bash
   # Ctrl+C로 중단 후
   npm run dev
   ```

---

## 🎨 3단계: 테스트 (5분)

### 시험해보기
1. http://localhost:5173 접속
2. "사진 업로드하기" 클릭
3. 의류 사진 선택 (아무거나!)
4. 3초 대기
5. 결과 확인

### API 키 없으면?
→ 데모 데이터로 작동 (ZARA 코트 시나리오)

### API 키 있으면?
→ 실제 Google AI가 분석!

---

## 🚀 4단계: 배포 (15분)

### GitHub에 푸시
```bash
cd c:\Users\신서은\Desktop\project\demo

git init
git add .
git commit -m "RE:OUT demo initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/reout-demo.git
git push -u origin main
```

### Vercel 배포 (가장 쉬움!)
1. https://vercel.com 접속
2. "Import Project" 클릭
3. GitHub 저장소 선택 (`reout-demo`)
4. 환경 변수 추가:
   - Key: `VITE_GOOGLE_VISION_KEY`
   - Value: 발급받은 API 키
5. "Deploy" 클릭
6. 2-3분 대기
7. 완료! URL 확인 (예: https://reout-demo.vercel.app)

---

## 📱 5단계: 모바일 테스트 (5분)

배포된 URL을 폰에서 열기:
- [ ] 홈 화면 잘 보이는지
- [ ] 업로드 버튼 클릭 작동
- [ ] 이미지 선택 가능
- [ ] 분석 결과 잘 표시

---

## 🎯 6단계: 발표 준비 (10분 - 내일 아침)

### QR 코드 생성
1. https://www.qr-code-generator.com
2. 배포된 URL 입력
3. 다운로드
4. 발표 자료에 삽입

### 데모용 사진 준비
- 의류 사진 2-3장 (깨끗한 것, 보통, 낡은 것)
- 폰 갤러리에 저장

### 발표 슬라이드 확인
- `presentation/PITCH_DECK.md` 참고
- PPT 10장 제작
- 5분 타이밍 확인

---

## ✅ 최종 체크리스트

### 기능 체크
- [x] 이미지 업로드 ✅
- [x] AI 분석 (데모 모드) ✅
- [x] 결과 화면 ✅
- [x] 5가지 경로 추천 ✅
- [x] 환경 임팩트 ✅
- [ ] Google Vision API 연동 (API 키 있으면 ✅)

### 배포 체크
- [ ] GitHub 푸시
- [ ] Vercel 배포
- [ ] 배포 URL 접속 확인
- [ ] 모바일 테스트
- [ ] QR 코드 생성

### 발표 체크
- [ ] 피칭 덱 10장
- [ ] 데모 시나리오 숙지
- [ ] 5분 리허설

---

## 🔥 현재 진행 상황

```
✅ 프로젝트 생성
✅ 모든 코드 작성
✅ 개발 서버 실행
✅ 기획안 완성
✅ 개발 가이드 완성
✅ 발표 자료 가이드 완성

🟡 API 키 발급 (선택)
🟡 배포 (내일 아침 15분)
🟡 발표 자료 제작 (내일 1시간)
```

---

## 🎊 축하합니다!

**하루 만에 90점 받을 준비가 90% 완료되었습니다!**

### 남은 작업 (내일 아침 2시간)
1. Google Vision API 키 발급 (5분) ← 선택사항
2. Vercel 배포 (15분)
3. 모바일 테스트 (10분)
4. QR 코드 생성 (5분)
5. 발표 슬라이드 제작 (1시간)
6. 리허설 (20분)

---

## 💡 내일 아침 TODO

```
[ ] 07:00-07:30  API 키 발급 (선택) + 배포
[ ] 07:30-08:30  발표 슬라이드 10장 제작
[ ] 08:30-09:00  리허설 3회
[ ] 09:00-      완벽한 발표! 🎯
```

---

**오늘은 푹 쉬세요! 내일 90점 받으러 갑니다!** 💪🏆
