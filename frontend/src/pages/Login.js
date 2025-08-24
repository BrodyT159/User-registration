import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Add this useEffect to check for an existing token
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // If token exists, user is already logged in, so redirect to dashboard
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This part is critical. The headers object should ONLY contain Content-Type.
      const response = await fetch('https://user-registration-1-vx30.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('jwt_token', data.token);
        onLoginSuccess();
        navigate('/');
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      alert('An error occurred during login.');
    }
  };

  return (
    // Your form JSX is the same
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;