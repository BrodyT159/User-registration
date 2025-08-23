import React,  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ThemeToggleButton from './ThemeToggleButton';

const ProtectedRoute = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwt_token'));
  const [theme, setTheme] = useState('dark'); // 'light' or 'dark'

  // This effect adds the correct theme class to the body
  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`${theme}-mode`);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-brand">
            <Link to="/">SecureFile</Link>
          </div>
          <nav className="header-nav">
            <ThemeToggleButton theme={theme} setTheme={setTheme} />
            {isLoggedIn ? (
              <Link to="/login" onClick={handleLogout} className="nav-button">Logout</Link>
            ) : (
              <>
                <Link to="/login" className="nav-button-secondary">Login</Link>
                <Link to="/register" className="nav-button">Register</Link>
              </>
            )}
          </nav>
        </header>

        <main className="App-main">
          <Routes>
            <Route path="/login" element={<LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
              <Route path="/" element={<DashboardPage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;