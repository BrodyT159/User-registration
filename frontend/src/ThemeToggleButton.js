import React from 'react';

function ThemeToggleButton({ theme, setTheme }) {
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Using emojis for the sun and moon icons
  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggleButton;