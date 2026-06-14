import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

const PasswordScreen = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === 'bestie') {
      setUnlocked(true);
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className={`password-container ${unlocked ? 'fade-out-late' : ''}`}>
      <div className="password-card">
        <div className="lock-icon-container">
          {unlocked ? <Unlock size={50} color="#ff3366" /> : <Lock size={50} color="white" />}
        </div>
        <h2 className="password-title">Secret Entry</h2>
        <p className="password-subtitle">Enter the password to unlock your memories</p>
        
        <form onSubmit={handleSubmit} className="password-form">
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`password-input ${error ? 'shake-error' : ''}`}
            placeholder="Enter password..."
            autoFocus
          />
          <button type="submit" className="hero-button password-btn">
            Unlock Magic ✨
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordScreen;
