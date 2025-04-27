import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { LogInPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { RequireAuth } from './components/RequireAuth';

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
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;