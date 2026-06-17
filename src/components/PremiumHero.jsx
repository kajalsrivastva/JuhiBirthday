import React, { useState } from 'react';
import { Play, LogOut, X } from 'lucide-react';
import AudioButton from './AudioButton';

const PremiumHero = ({ bgImage, onLogout, subtitle }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="hero-section" style={{ background: 'transparent' }}>
      {bgImage && <img src={bgImage} alt="Background" className="hero-bg" />}
      <div className="hero-overlay" style={{ background: 'linear-gradient(to bottom, rgba(26,11,22,0.1) 0%, rgba(26,11,22,0.85) 100%)' }}></div>
      
      {/* Logout button moved to Navbar */}

      <div className="hero-content" onClick={() => setShowVideo(true)} style={{ cursor: 'pointer', position: 'relative', background: 'rgba(26,11,22,0.6)', padding: 'clamp(20px, 5vw, 50px) clamp(20px, 8vw, 80px)', borderRadius: '20px', border: '2px solid var(--accent-gold)', backdropFilter: 'blur(10px)', boxShadow: '0 0 50px rgba(255, 105, 180, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <h1 className="hero-title" style={{ color: 'var(--accent-gold)', fontSize: '5.5rem', fontWeight: 'bold', margin: 0 }}>Happy Birthday Juhi!</h1>
          <AudioButton text="Happy Birthday Juhi! The Most Special Day of the Year." size={32} />
        </div>
        <div className="hero-date" style={{ fontSize: '1.5rem', color: '#fff', marginTop: '10px' }}>The Most Special Day of the Year 💖</div>
        {subtitle && <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '15px', maxWidth: '600px', textAlign: 'center', lineHeight: '1.5' }}>{subtitle}</div>}
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
           <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid var(--accent-gold)', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 105, 180, 0.2)', animation: 'slowPulse 2s infinite' }}>
             <Play fill="var(--accent-gold)" color="var(--accent-gold)" />
           </div>
        </div>
      </div>

      {showVideo && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <video 
            src="/juhi_media/VID_20260226_113337_522.mp4" 
            autoPlay muted loop playsInline
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', filter: 'blur(30px) brightness(0.6)', transform: 'scale(1.2)', zIndex: 0
            }} 
          />
          <video 
            src="/juhi_media/VID_20260226_113337_522.mp4" 
            autoPlay 
            controls
            style={{ width: '100%', maxHeight: '100vh', objectFit: 'contain', position: 'relative', zIndex: 1 }}
            onEnded={() => setShowVideo(false)}
          />
          <button 
            onClick={(e) => { e.stopPropagation(); setShowVideo(false); }} 
            style={{ position: 'absolute', top: '20px', right: '20px', background: '#ff1493', color: 'white', border: 'none', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', zIndex: 10001, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}
          >
            <X size={24} />
          </button>
        </div>
      )}

      <div className="scroll-indicator">
        <span>Scroll to Explore</span>
        <div className="scroll-line"></div>
      </div>
    </div>
  );
};

export default PremiumHero;
