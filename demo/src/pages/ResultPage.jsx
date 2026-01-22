import { ArrowLeft, Package, CheckCircle2, AlertCircle, Tag, TrendingUp, PieChart, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ResultPage({ result, imageUrl, onBackToHome }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // 스켈레톤 로딩 효과
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowResults(true), 100);
    }, 800);
  }, []);

  const gradeLabels = {
    S: '신품급',
    A: '사용감 거의 없음',
    B: '보통',
    C: '사용감 많음',
    D: '심각한 손상'
  };

  const gradeColors = {
    S: 'bg-amber-100 text-amber-700 border-amber-200',
    A: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    B: 'bg-blue-100 text-blue-700 border-blue-200',
    C: 'bg-purple-100 text-purple-700 border-purple-200',
    D: 'bg-gray-100 text-gray-700 border-gray-200'
  };

  const confidenceLevel = result.confidence * 100;
  const getConfidenceText = (confidence) => {
    if (confidence >= 90) return "매우 높은 정확도로 분석되었습니다";
    if (confidence >= 80) return "높은 정확도로 분석되었습니다";
    if (confidence >= 70) return "양호한 정확도로 분석되었습니다";
    return "분석이 완료되었습니다";
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#EAEAEA]">
        <div className="w-full px-8 py-8 relative">
          <h1 className="text-xl font-bold text-slate-900 text-center">RE:OUT</h1>
          <button
            onClick={onBackToHome}
            className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2} />
            <span>처음으로</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-8" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="w-full max-w-5xl">
        
          {/* Analysis Result - Bento Grid */}
          <section className="w-full text-center" style={{ marginBottom: '120px' }}>
            <h2 className="text-5xl font-extrabold text-slate-900" style={{ marginBottom: '60px' }}>AI 분석 리포트</h2>
            
            {/* Main Result Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              {isLoading ? (
                // Skeleton Loading
                <div className="grid md:grid-cols-2 gap-8 p-12 animate-pulse">
                  <div className="bg-slate-200 h-96 rounded-2xl"></div>
                  <div className="space-y-6">
                    <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-8 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-8 bg-slate-200 rounded w-2/3"></div>
                    <div className="h-8 bg-slate-200 rounded w-full"></div>
                  </div>
                </div>
              ) : (
                <div className={`grid md:grid-cols-2 gap-16 p-12 transition-opacity duration-500 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Left: Image */}
                  <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8">
                    <img
                      src={imageUrl}
                      alt="분석된 의류"
                      className="w-full h-96 object-cover rounded-xl shadow-md"
                    />
                  </div>

                  {/* Right: Analysis Data */}
                  <div className="flex flex-col justify-center space-y-6 text-left pr-16 pl-0 max-w-[85%]">
                    
                    {/* Category */}
                    <DataRow
                      icon={<Package className="w-5 h-5 text-[#2DD4BF]" />}
                      label="카테고리"
                      value={result.category}
                    />

                    {/* Grade Badge */}
                    <div className="flex items-center justify-between py-4 border-b border-dashed border-slate-200 gap-8">
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-[#2DD4BF]" />
                        <span className="text-sm font-semibold text-slate-500">상태 등급</span>
                      </div>
                      <span className={`px-5 py-2 rounded-full font-bold border ${gradeColors[result.grade]}`}>
                        {result.grade}등급 · {gradeLabels[result.grade]}
                      </span>
                    </div>

                    {/* Damage */}
                    <DataRow
                      icon={<AlertCircle className="w-5 h-5 text-[#2DD4BF]" />}
                      label="손상"
                      value={result.damage.join(', ')}
                    />

                    {/* Brand */}
                    {result.brand && (
                      <DataRow
                        icon={<Tag className="w-5 h-5 text-[#2DD4BF]" />}
                        label="브랜드"
                        value={result.brand}
                      />
                    )}

                    {/* Confidence with Progress Bar */}
                    <div className="py-4 space-y-3">
                      <div className="flex items-center justify-between gap-8">
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <PieChart className="w-5 h-5 text-[#2DD4BF]" />
                          <span className="text-sm font-semibold text-slate-500">AI 신뢰도</span>
                        </div>
                        <span className="text-lg font-extrabold text-slate-900">{confidenceLevel.toFixed(0)}%</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${confidenceLevel}%` }}
                        />
                      </div>
                    </div>

                    {/* AI Keywords */}
                    <div className="py-4 border-t border-slate-200">
                      <p className="text-xs font-semibold text-slate-500 mb-3">AI 인식 키워드</p>
                      <div className="flex flex-wrap gap-2">
                        {result.labels.map((label, i) => (
                          <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {!isLoading && (
                <div className="px-12 pb-12 flex justify-center">
                  <a href="#recommendations" className="w-[95%] bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] hover:from-[#14B8A6] hover:to-[#0D9488] text-white font-bold py-5 rounded-xl transition-all duration-300 text-lg shadow-lg flex items-center justify-center gap-3">
                    <TrendingUp className="w-6 h-6" />
                    <span>최적 처리 경로 확인하기</span>
                    <ChevronRight className="w-6 h-6" />
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Recommended Paths - MAIN */}
          <section id="recommendations" className="w-full text-center" style={{ marginTop: '100px', marginBottom: '150px' }}>
            <div className="space-y-6" style={{ marginBottom: '80px' }}>
              <h2 className="text-5xl font-extrabold text-slate-900">추천 처리 방법</h2>
              <p className="text-2xl font-bold text-slate-600 leading-loose">우선순위 순으로 정렬되었습니다</p>
            </div>
            
            <div className="space-y-16">
              {result.recommendedPaths.map((path, index) => (
                <PathCard key={path.id} path={path} rank={index + 1} />
              ))}
            </div>
          </section>

          {/* Environmental Impact - SECONDARY */}
          <section className="w-full text-center" style={{ marginTop: '150px' }}>
            <h3 className="text-4xl font-extrabold text-slate-600" style={{ marginBottom: '60px' }}>환경 영향</h3>
            
            <div className="bg-white border border-slate-200 rounded-2xl p-20 shadow-2xl">
              <div className="grid grid-cols-3 gap-12">
                <ImpactItem
                  emoji="🌍"
                  value={result.environmentalImpact.co2ReductionFormatted}
                  label="CO2 절감량"
                />
                <ImpactItem
                  emoji="🌳"
                  value={`${result.environmentalImpact.treesEquivalent}그루`}
                  label="나무 심기 효과"
                />
                <ImpactItem
                  emoji="💧"
                  value={result.environmentalImpact.waterSavedFormatted}
                  label="물 절약량"
                />
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="w-full" style={{ marginTop: '100px' }}>
            <button
              onClick={onBackToHome}
              className="w-full bg-white hover:bg-slate-900 hover:text-white text-slate-900 border-2 border-slate-900 font-bold py-6 rounded-2xl transition-all duration-300 text-lg"
            >
              다른 의류 분석하기
            </button>
          </section>
          
        </div>
      </main>
    </div>
  );
}

function DataRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-dashed border-slate-200 gap-8">
      <div className="flex items-center gap-3 flex-shrink-0">
        {icon}
        <span className="text-sm font-semibold text-slate-500">{label}</span>
      </div>
      <span className="text-base font-bold text-slate-900 text-right">{value}</span>
    </div>
  );
}

function PathCard({ path, rank }) {
  const isTopChoice = rank === 1;

  return (
    <div className={`bg-white border-2 rounded-2xl hover:shadow-xl transition-shadow duration-300 shadow-lg ${
      isTopChoice ? 'border-[#2DD4BF]' : 'border-slate-200'
    }`} style={{ padding: '56px' }}>
      
      <div className="space-y-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-6">
            <span className="text-5xl">{path.icon}</span>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold text-slate-900">{path.name}</h3>
                {isTopChoice && (
                  <span className="text-xs font-bold px-4 py-1.5 bg-[#2DD4BF] text-white rounded-full">
                    최고 추천
                  </span>
                )}
              </div>
              <p className="text-lg font-semibold text-slate-600 leading-loose">{path.description}</p>
            </div>
          </div>
          <span className="text-sm font-bold text-slate-400">#{rank}</span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 gap-8 pt-6 border-t border-slate-200">
          <DetailItem label="예상 가치" value={path.estimatedValue} />
          <DetailItem label="소요 시간" value={path.timeRequired} />
          <DetailItem label="CO2 절감" value={`약 ${path.co2Reduction}kg`} />
        </div>

        {/* Platforms */}
        {path.platforms.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm font-bold text-slate-600">추천 플랫폼</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {path.platforms.map((platform, i) => (
                <button
                  key={i}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-[#2DD4BF] hover:text-white border border-slate-200 hover:border-[#2DD4BF] rounded-lg text-sm font-bold text-slate-900 transition-all duration-300"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ImpactItem({ emoji, value, label }) {
  return (
    <div className="text-center space-y-4">
      <div className="text-3xl mb-4">{emoji}</div>
      <p className="text-2xl font-extrabold text-slate-900">{value}</p>
      <p className="text-base font-bold text-slate-600">{label}</p>
    </div>
  );
}
