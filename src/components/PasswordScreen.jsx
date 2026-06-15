import React, { useState } from 'react';

const PasswordScreen = ({ onUnlock, bgImage }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage("Please enter the secret key.");
      setError(true);
      setTimeout(() => { setError(false); setErrorMessage(''); }, 2000);
      return;
    }

    if (password.toLowerCase() === 'bestie') {
      setUnlocked(true);
      setErrorMessage('');
      setTimeout(() => {
        onUnlock();
      }, 1500);
    } else {
      setErrorMessage("Incorrect secret key. Please try again.");
      setError(true);
      setTimeout(() => { setError(false); setErrorMessage(''); }, 2000);
    }
  };

  return (
    <div className={`password-container ${unlocked ? 'fade-out-late' : ''}`} style={{
      backgroundImage: bgImage ? `url(${bgImage})` : 'none',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center top',
      backgroundColor: '#0a0a0c'
    }}>
      <div className="password-card" style={{ 
        zIndex: 1, position: 'relative', width: '90%', maxWidth: '400px',
        background: 'transparent', backdropFilter: 'none', border: 'none', boxShadow: 'none'
      }}>
        <h2 className="password-title" style={{ fontSize: '2.2rem', textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}>Juhi's Birthday Surprise 🎂</h2>
        <p className="password-subtitle" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.9)', color: '#eee' }}>Enter the secret key to unlock our beautiful memories</p>
        
        <form onSubmit={handleSubmit} className="password-form">
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
            style={{ 
              borderBottomColor: error ? 'var(--accent-rose)' : '',
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: '4px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
            }}
            placeholder="Secret Key..."
            autoFocus
          />
          {errorMessage && (
            <div style={{ color: 'var(--accent-rose)', marginBottom: '15px', fontSize: '0.9rem', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              {errorMessage}
            </div>
          )}
          <br/>
          <button type="submit" className="password-btn">
            Unlock Memories
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordScreen;
