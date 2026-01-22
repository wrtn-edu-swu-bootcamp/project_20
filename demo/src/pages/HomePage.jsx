import { Upload } from 'lucide-react';
import { useRef } from 'react';

export default function HomePage({ onStartAnalysis }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      onStartAnalysis(file);
    } else {
      alert('이미지 파일을 선택해주세요');
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#EAEAEA]">
        <div className="w-full px-8 py-8">
          <h1 className="text-xl font-bold text-slate-900 text-center">RE:OUT</h1>
        </div>
      </header>

      {/* Main Content - Flex Column with Large Gaps */}
      <main className="flex-1 flex flex-col items-center px-8 gap-y-32" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        
        {/* Hero Section */}
        <section className="w-full max-w-6xl text-center">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              버릴까, 팔까?<br />
              고민은 AI가, 결정은 3초 만에.
            </h2>
            
            <p className="text-2xl font-extrabold text-slate-600 leading-loose">
              AI가 의류 상태를 분석하고 재판매, 기부, 수거, 재활용 중<br />
              가장 적합한 처리 방법을 추천합니다
            </p>
          </div>
        </section>

        {/* Upload Section */}
        <section className="w-full max-w-4xl flex justify-center">
          <div className="w-full bg-white border-dashed border-2 border-[#2DD4BF] rounded-2xl p-20 hover:bg-[#2DD4BF]/5 transition-all duration-300 shadow-xl">
            <div className="space-y-12">
              <div className="text-center space-y-8">
                <h3 className="text-3xl font-extrabold text-slate-900">
                  의류 사진 업로드
                </h3>
                <p className="text-xl font-bold text-slate-600 leading-loose">
                  사진 한 장으로 최적의 처리 경로를 확인하세요
                </p>
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border border-dashed border-slate-300 hover:border-[#2DD4BF] transition-colors duration-200 py-24 flex flex-col items-center justify-center gap-8 bg-slate-50 hover:bg-white rounded-xl"
              >
                <Upload className="w-14 h-14 text-[#2DD4BF]" strokeWidth={2} />
                <div className="space-y-3 text-center">
                  <p className="text-xl font-bold text-slate-900">클릭하여 파일 선택</p>
                  <p className="text-base font-semibold text-slate-500">JPG, PNG, WEBP • 최대 10MB</p>
                </div>
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </section>

        {/* Process Cards Section */}
        <section className="w-full max-w-6xl flex justify-center">
          <div className="w-full grid grid-cols-3 gap-12">
            <ProcessCard
              number="01"
              title="사진 분석"
              description="AI가 의류 상태와 손상 정도를 자동으로 판별합니다"
            />
            <ProcessCard
              number="02"
              title="경로 추천"
              description="재판매부터 폐기까지 최적의 처리 방법을 제안합니다"
            />
            <ProcessCard
              number="03"
              title="의사결정"
              description="예상 가치와 소요 시간을 비교하여 선택합니다"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full max-w-5xl flex justify-center">
          <div className="w-full grid grid-cols-3 gap-12">
            <StatCard value="8만톤" label="연간 의류 폐기량" />
            <StatCard value="11%" label="현재 재활용률" />
            <StatCard value="89%" label="매립 또는 소각" />
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#EAEAEA] bg-white mt-40">
        <div className="w-full px-8 py-12 pb-20">
          <p className="text-sm font-medium text-slate-500 text-center">
            © 2026 RE:OUT
          </p>
        </div>
      </footer>
    </div>
  );
}

function ProcessCard({ number, title, description }) {
  return (
    <div className="border border-black rounded-xl bg-white hover:shadow-xl transition-shadow duration-300 text-center shadow-xl" style={{ padding: '40px' }}>
      <div className="space-y-8">
        <p className="text-3xl font-extrabold text-[#2DD4BF]">{number}</p>
        <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
        <p className="text-base font-semibold text-slate-600 leading-loose">{description}</p>
      </div>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl text-center hover:shadow-xl transition-shadow duration-300 shadow-xl" style={{ padding: '56px' }}>
      <div className="space-y-6">
        <div className="text-5xl font-extrabold text-slate-900">{value}</div>
        <div className="text-base font-bold text-slate-600">{label}</div>
      </div>
    </div>
  );
}
