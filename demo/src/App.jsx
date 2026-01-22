import { useState } from 'react';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import ResultPage from './pages/ResultPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleStartAnalysis = (imageFile) => {
    setUploadedImage(imageFile);
    setCurrentPage('analysis');
  };

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    setCurrentPage('result');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setAnalysisResult(null);
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'home' && (
        <HomePage onStartAnalysis={handleStartAnalysis} />
      )}
      {currentPage === 'analysis' && (
        <AnalysisPage 
          imageFile={uploadedImage} 
          onComplete={handleAnalysisComplete}
        />
      )}
      {currentPage === 'result' && (
        <ResultPage 
          result={analysisResult}
          imageUrl={uploadedImage ? URL.createObjectURL(uploadedImage) : null}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;
