import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { Challenge } from './components/Challenge/Challenge';
import { CompleteQuestionPage } from './pages/CompleteQuestionPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="root-container">
          <Routes>
            <Route path="/landmark/:landmark_id" element={<Challenge />} />
            <Route path="/landmark/:landmark_id/completed" element={<CompleteQuestionPage />} />
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;