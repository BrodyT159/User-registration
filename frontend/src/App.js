import React,  { useState, useEffect } from 'react';
// Make sure useNavigate is imported
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ThemeToggleButton from './ThemeToggleButton';

// This component is a wrapper to handle the useNavigate hook
const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwt_token'));
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`${theme}-mode`);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setIsLoggedIn(false);
    navigate('/login'); // Explicitly navigate to login on logout
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/'); // Explicitly navigate to dashboard on login
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-brand">
          <Link to="/">SecureFile</Link>
        </div>
        <nav className="header-nav">
          <ThemeToggleButton theme={theme} setTheme={setTheme} />
          {isLoggedIn ? (
            <button onClick={handleLogout} className="nav-button">Logout</button>
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
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route path="/" element={<DashboardPage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

// Main App component now just wraps the content in the Router
function App() {
  return (
    <Router basename="/User-registration">
      <AppContent />
    </Router>
  )
}

const ProtectedRoute = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default App;