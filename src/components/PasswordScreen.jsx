import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordScreen = ({ onUnlock, bgImage, avatarImage }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  
  // Change password state
  const [mode, setMode] = useState('unlock'); // 'unlock' or 'change'
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Show/Hide password states
  const [showUnlockPwd, setShowUnlockPwd] = useState(false);
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);

  const getActualPassword = () => {
    return localStorage.getItem('juhi_secret_key') || 'bestie';
  };

  const handleUnlockSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage("Please enter the secret key.");
      setError(true);
      setTimeout(() => { setError(false); setErrorMessage(''); }, 2000);
      return;
    }

    if (password.toLowerCase() === getActualPassword().toLowerCase()) {
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

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (!currentPassword.trim() || !newPassword.trim()) {
      setErrorMessage("Please fill all fields.");
      setError(true);
      setTimeout(() => { setError(false); setErrorMessage(''); }, 2000);
      return;
    }

    if (currentPassword.toLowerCase() === getActualPassword().toLowerCase()) {
      localStorage.setItem('juhi_secret_key', newPassword.toLowerCase());
      setSuccessMessage("Password changed successfully!");
      setMode('unlock');
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => { setSuccessMessage(''); }, 3000);
    } else {
      setErrorMessage("Incorrect current password.");
      setError(true);
      setTimeout(() => { setError(false); setErrorMessage(''); }, 2000);
    }
  };

  return (
    <div className={`password-container ${unlocked ? 'fade-out-late' : ''}`} style={{
      backgroundImage: bgImage ? `linear-gradient(to bottom, rgba(26, 11, 22, 0.7), rgba(26, 11, 22, 0.85)), url(${bgImage})` : 'none',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundColor: '#0a0a0c'
    }}>
      <div className="password-card" style={{ 
        zIndex: 1, position: 'relative', width: '90%', maxWidth: '400px',
        background: 'transparent', backdropFilter: 'none', border: 'none', boxShadow: 'none'
      }}>
        {avatarImage && (
          <div style={{ width: '200px', height: '200px', borderRadius: '50%', margin: '0 auto 30px', border: '4px solid var(--accent-gold)', overflow: 'hidden', boxShadow: '0 0 30px rgba(255,105,180,0.6)' }}>
            <img src={avatarImage} alt="Juhi" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
          </div>
        )}
        <h2 className="password-title" style={{ fontSize: '2.2rem', textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}>Juhi's Birthday Surprise 🎂</h2>
        <p className="password-subtitle" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.9)', color: '#eee' }}>
          {mode === 'unlock' ? "Enter the secret key to unlock our beautiful memories" : "Set a new secret key for the vault"}
        </p>
        
        {successMessage && (
          <div style={{ color: '#1dd1a1', marginBottom: '15px', fontSize: '1rem', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            {successMessage}
          </div>
        )}

        {mode === 'unlock' ? (
          <form onSubmit={handleUnlockSubmit} className="password-form">
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type={showUnlockPwd ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
                style={{ 
                  borderBottomColor: error ? 'var(--accent-rose)' : '',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  borderRadius: '4px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                  paddingRight: '40px',
                  width: '100%'
                }}
                placeholder="Secret Key..."
                autoFocus
              />
              <button 
                type="button"
                onClick={() => setShowUnlockPwd(!showUnlockPwd)}
                style={{
                  position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                {showUnlockPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errorMessage && (
              <div style={{ color: 'var(--accent-rose)', marginBottom: '15px', fontSize: '0.9rem', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                {errorMessage}
              </div>
            )}
            <br/>
            <button type="submit" className="password-btn">
              Unlock Memories
            </button>
            <button 
              type="button" 
              onClick={() => { setMode('change'); setErrorMessage(''); }}
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', marginTop: '20px', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
            >
              Change Secret Key
            </button>
          </form>
        ) : (
          <form onSubmit={handleChangePasswordSubmit} className="password-form">
            <div style={{ position: 'relative', width: '100%', marginBottom: '15px' }}>
              <input 
                type={showCurrentPwd ? "text" : "password"} 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="password-input"
                style={{ borderBottomColor: error ? 'var(--accent-rose)' : '', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '4px', paddingRight: '40px', width: '100%', marginBottom: 0 }}
                placeholder="Current Key..."
                autoFocus
              />
              <button 
                type="button"
                onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                style={{
                  position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                {showCurrentPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type={showNewPwd ? "text" : "password"} 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="password-input"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '4px', paddingRight: '40px', width: '100%' }}
                placeholder="New Key..."
              />
              <button 
                type="button"
                onClick={() => setShowNewPwd(!showNewPwd)}
                style={{
                  position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                {showNewPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errorMessage && (
              <div style={{ color: 'var(--accent-rose)', margin: '15px 0', fontSize: '0.9rem', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                {errorMessage}
              </div>
            )}
            <br/>
            <button type="submit" className="password-btn" style={{ marginBottom: '15px' }}>
              Save New Key
            </button>
            <button 
              type="button" 
              onClick={() => { setMode('unlock'); setErrorMessage(''); }}
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordScreen;
