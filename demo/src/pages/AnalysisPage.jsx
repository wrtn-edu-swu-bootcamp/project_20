import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { analyzeClothing } from '../services/aiAnalysis';

const loadingMessages = [
  "이미지를 분석하고 있습니다",
  "의류 상태를 평가하고 있습니다",
  "손상 정도를 확인하고 있습니다",
  "최적 경로를 계산하고 있습니다",
];

export default function AnalysisPage({ imageFile, onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 300);

    const analyze = async () => {
      try {
        const result = await analyzeClothing(imageFile);
        setProgress(100);
        
        setTimeout(() => {
          onComplete(result);
        }, 500);
      } catch (error) {
        console.error('분석 실패:', error);
        alert('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
        window.location.reload();
      }
    };

    analyze();

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [imageFile, onComplete]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#EAEAEA]">
        <div className="w-full px-8 py-8">
          <h1 className="text-xl font-bold text-slate-900 text-center">RE:OUT</h1>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center px-8" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
        <div className="w-full max-w-3xl">
          <div className="bg-white border border-slate-200 rounded-2xl p-24 text-center space-y-20 shadow-xl">
            
            {/* Animated Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-[#2DD4BF]/10 rounded-full flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-[#2DD4BF] animate-spin" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-6">
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#2DD4BF] h-full transition-all duration-300 ease-linear rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-lg font-bold text-[#2DD4BF]">{progress}%</p>
            </div>

            {/* Message */}
            <div className="space-y-10">
              <h2 className="text-5xl font-extrabold text-slate-900">
                분석 중
              </h2>
              <p className="text-2xl font-bold text-slate-600 min-h-[40px] leading-loose">
                {loadingMessages[messageIndex]}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
