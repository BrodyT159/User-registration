import React, { useState } from 'react';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://user-registration-1-vx30.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        alert('Registration successful! Please log in.');
      } else {
        alert('Registration failed!');
      }
    } catch (error) {
      alert('An error occurred during registration.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register New Account</h1>
      <div><label>Email:</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <div><label>Username:</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
      <div><label>Password:</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
      <button type="submit">Register</button>
    </form>
  );
}
export default RegisterPage;