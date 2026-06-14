import React, { useState } from 'react';
import { Play, LogOut } from 'lucide-react';

const PremiumHero = ({ bgImage, onLogout }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="hero-section">
      {bgImage && <img src={bgImage} alt="Background" className="hero-bg" />}
      <div className="hero-overlay"></div>
      
      {onLogout && (
        <button 
          onClick={onLogout}
          style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100, display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-main)' }}
        >
          <LogOut size={16} /> Logout
        </button>
      )}

      <div className="hero-content" onClick={() => setShowVideo(true)} style={{ cursor: 'pointer', position: 'relative' }}>
        <div className="hero-pretitle">A Celebration of Life</div>
        <h1 className="hero-title">Happy Birthday, Juhi</h1>
        <div className="hero-date">Unveiling The Memories</div>
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
           <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid var(--accent-gold)', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(212, 175, 55, 0.2)', animation: 'slowPulse 2s infinite' }}>
             <Play fill="var(--accent-gold)" color="var(--accent-gold)" />
           </div>
        </div>
      </div>

      {showVideo && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 10000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <video 
            src="/juhi_media/VID_20260226_113337_522.mp4" 
            autoPlay 
            controls
            style={{ width: '100%', maxHeight: '100vh', objectFit: 'contain' }}
            onEnded={() => setShowVideo(false)}
          />
          <button 
            onClick={(e) => { e.stopPropagation(); setShowVideo(false); }} 
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', zIndex: 10001 }}
          >
            Close X
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
