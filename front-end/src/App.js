import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
// import { HomePage } from './pages/HomePage';
import { Leaderboard } from './components/Leaderboard';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="root-container">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;