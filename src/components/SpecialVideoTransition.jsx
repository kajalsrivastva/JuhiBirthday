import React, { useRef, useEffect, useState } from 'react';

const SpecialVideoTransition = ({ onFinish }) => {
  const videoRef = useRef(null);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after 3 seconds just in case
    const t = setTimeout(() => setShowSkip(true), 3000);
    
    // Explicitly try to play
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay blocked', e));
    }
    
    return () => clearTimeout(t);
  }, []);

  const flowers = Array.from({ length: 30 });

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'black', zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* Falling Flowers Animation */}
      <div className="flower-container">
        {flowers.map((_, i) => (
          <div 
            key={i} 
            className="falling-flower"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 3}s`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 1.5 + 1}rem`
            }}
          >
            {['🌸', '🌺', '🌼', '✨'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <video 
        ref={videoRef}
        src="/juhi_media/VID_20260610_100120_947.mp4" 
        style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }}
        onEnded={onFinish}
        autoPlay
        playsInline
        controls={true} // Add controls just in case
      />
      
      <div style={{ position: 'absolute', bottom: '10%', zIndex: 2 }}>
        <p className="neon-birthday-text" style={{ fontSize: '2.5rem', margin: 0, textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>
          Smile please! 😊
        </p>
      </div>

      {showSkip && (
        <button 
          onClick={onFinish} 
          style={{ position: 'absolute', top: '30px', right: '30px', background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', zIndex: 3, backdropFilter: 'blur(5px)' }}
        >
          Skip Video
        </button>
      )}
      
      <style>{`
        .flower-container {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }
        .falling-flower {
          position: absolute;
          top: -10%;
          animation: fall linear infinite;
        }
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default SpecialVideoTransition;
