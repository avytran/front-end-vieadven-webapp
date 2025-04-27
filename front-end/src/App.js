import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Leaderboard } from './components/Leaderboard';
import { HomePage } from './pages/HomePage';
import { MissionPage } from './pages/MissionPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="root-container">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/mission" element={<MissionPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;