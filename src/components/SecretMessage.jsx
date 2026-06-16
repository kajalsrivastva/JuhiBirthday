import React, { useState } from 'react';
import FadeInSection from './FadeInSection';
import confetti from 'canvas-confetti';
import AudioButton from './AudioButton';

const SecretMessage = ({ hiddenVideoSrc, bgImage }) => {
  const [opened, setOpened] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    
    // Confetti blast
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#d4af37', '#e8b4b8', '#ffffff'],
        zIndex: 10001
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#d4af37', '#e8b4b8', '#ffffff'],
        zIndex: 10001
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      setShowVideo(true);
    }, 2000); // Wait for envelope animation to feel complete
  };

  return (
    <section className="secret-section" style={{
      position: 'relative',
      backgroundColor: '#0a0a0c',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '100px 20px 10vh 20px',
      overflow: 'hidden'
    }}>
      {bgImage && (
        <>
          <div style={{ position: 'absolute', inset: '-20px', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px)', opacity: 0.5, zIndex: 0 }}></div>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,12,0.6)', zIndex: 2 }}></div>
        </>
      )}
      
      <div style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        <FadeInSection>
          <div className="section-header" style={{ marginBottom: '40px' }}>
            <h2 className="section-title" style={{ color: '#fff', textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}>A Final Surprise</h2>
            <div className="text-divider" style={{ boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}></div>
            <p className="elegant-subtext" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.6', color: '#fff', textShadow: '1px 1px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.5)' }}>
              Har kahani ka ek sweet end hota hai, par hamari dosti ki kahani ka koi end nahi. You are simply irreplaceable. Tap to break the seal and unveil the final memory!
            </p>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <AudioButton text="A Final Surprise. Har kahani ka ek sweet end hota hai, par hamari dosti ki kahani ka koi end nahi. You are simply irreplaceable. Tap to break the seal and unveil the final memory!" size={20} />
            </div>
          </div>

        {!opened ? (
          <div className="envelope-wrapper" onClick={handleOpen}>
            <div className="wax-seal">J</div>
            <div className="envelope-text">Tap to Break Seal</div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p className="elegant-text" style={{ fontSize: '1.5rem', color: 'var(--accent-gold)' }}>
              Unveiling the best moment...
            </p>
          </div>
        )}
        </FadeInSection>
      </div>

      {showVideo && hiddenVideoSrc && (
        <div className="modal-overlay" onClick={() => { setShowVideo(false); setOpened(false); }}>
          <button className="modal-close" onClick={() => { setShowVideo(false); setOpened(false); }}>×</button>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <video 
              src={hiddenVideoSrc} 
              controls 
              autoPlay 
              style={{ width: '100%', maxHeight: '85vh', display: 'block' }} 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SecretMessage;
