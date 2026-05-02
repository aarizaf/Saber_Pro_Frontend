import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './features/home/HomePage';
import { QuizPage } from './features/quiz/QuizPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/:subjectId" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
