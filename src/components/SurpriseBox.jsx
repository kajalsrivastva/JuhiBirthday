import React, { useState } from 'react';
import FadeInSection from './FadeInSection';
import { Gift, Heart, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const SurpriseBox = ({ videoSrc, bgImage, title, message, iconType = 'gift' }) => {
  const [opened, setOpened] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    
    // Confetti blast
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#d4af37', '#e8b4b8', '#ffffff'],
        zIndex: 100000
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#d4af37', '#e8b4b8', '#ffffff'],
        zIndex: 100000
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      setShowVideo(true);
    }, 1500); 
  };

  return (
    <section className="surprise-box-section" style={{
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
            <h2 className="section-title" style={{ color: '#fff', textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}>{title || "A Special Gift"}</h2>
            <div className="text-divider" style={{ boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}></div>
            <p className="elegant-subtext" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.6', color: '#fff', textShadow: '1px 1px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.5)' }}>
              {message || "Ek chhota sa gift, us dost ke liye jo khud kisi gift se kam nahi. Dosti ka ye safar aise hi khubsoorat bana rahe. Tap the box to open your surprise!"}
            </p>
          </div>

        <div className="box-container" onClick={!opened ? handleOpen : undefined}>
          <div className={`gift-box ${opened ? 'gift-opened' : 'gift-idle'}`}>
            {iconType === 'heart' ? (
              <Heart size={100} fill="var(--accent-gold)" color="var(--accent-gold)" strokeWidth={1.5} />
            ) : iconType === 'star' ? (
              <Star size={100} fill="var(--accent-gold)" color="var(--accent-gold)" strokeWidth={1.5} />
            ) : (
              <Gift size={100} color="var(--accent-gold)" strokeWidth={1.5} />
            )}
            <div className="gift-glow"></div>
          </div>
        </div>
        </FadeInSection>
      </div>

      {showVideo && videoSrc && (
        <div className="modal-overlay" onClick={() => { setShowVideo(false); setOpened(false); }} style={{ zIndex: 100000 }}>
          <video 
            src={videoSrc} 
            autoPlay muted loop playsInline
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', filter: 'blur(30px) brightness(0.6)', transform: 'scale(1.2)', zIndex: 0
            }} 
          />
          <button className="modal-close" onClick={() => { setShowVideo(false); setOpened(false); }} style={{ zIndex: 2 }}>×</button>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ zIndex: 1 }}>
            <video 
              src={videoSrc} 
              controls 
              autoPlay 
              style={{ width: '100%', maxHeight: '85vh', display: 'block', position: 'relative' }} 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default SurpriseBox;
