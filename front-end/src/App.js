import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { NoNavbarLayout } from './layouts/NoNavbarLayout';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { HomePage } from './pages/HomePage';
import { Challenge } from './components/Challenge/Challenge';
import { CompleteQuestionPage } from './pages/CompleteQuestionPage';
import { LogInPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { RequireAuth } from './components/RequireAuth';
import { MissionPage } from './pages/MissionPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="root-container">
          <Routes>
              {/* Public route */}
              <Route path="/login" element={<LogInPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected routes */}
              <Route element={<RequireAuth />}>
                <Route element={<NoNavbarLayout />}>
                  <Route path="/landmark/:landmark_id" element={<Challenge />} />
                  <Route path="/landmark/:landmark_id/completed" element={<CompleteQuestionPage />} />
                  <Route path="/mission" element={<MissionPage />} />
                </Route>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                </Route>
              </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;