import React, { useState, useRef, useEffect } from 'react';
import { Gift, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const BirthdaySurpriseModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);

  const videoSrc = '/juhi_media/InShot_20250813_003150820.mp4';
  const caption = "Pure joy captured! 🎬";

  const handleOpen = () => {
    setIsOpen(true);
    
    // Massive confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff3366', '#ffffff', '#ffcc00', '#7a00ff']
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff3366', '#ffffff', '#ffcc00', '#7a00ff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay blocked', e));
    }
  }, [isOpen]);

  return (
    <>
      <button 
        className="surprise-floating-btn heartbeat-anim"
        onClick={handleOpen}
      >
        <Gift size={24} color="white" style={{ marginRight: '8px' }} />
        <span>Tap for Surprise!</span>
      </button>

      {isOpen && (
        <div className="surprise-modal-overlay">
          <button className="close-modal-btn" onClick={() => setIsOpen(false)}>
            <X size={36} color="white" />
          </button>
          
          <div className="surprise-modal-content" style={{ width: '100%', height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="neon-birthday-text" style={{ marginBottom: '20px' }}>HAPPY BIRTHDAY<br/>JUHI! 🎉</h1>
            
            <div style={{ width: '100%', maxWidth: '350px', flex: 1, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(255, 51, 102, 0.3)', backgroundColor: '#000' }}>
              <video 
                ref={videoRef}
                src={videoSrc} 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                autoPlay 
                playsInline 
                controls
              />
            </div>
            <p className="surprise-slide-text fade-in" style={{ marginTop: '20px' }}>
              {caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BirthdaySurpriseModal;
