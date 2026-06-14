import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import mediaData from '../mediaList.json';

const EnvelopeSlide = ({ onFinish }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState('');
  
  const fullMessage = `Dear Juhi, ❤️\n\nTumhare saath bitaya hua har pal meri sabse keemti daulat hai...\n\nAgar koi mujhse pooche ki meri favourite memory kaunsi hai, to mera jawab hamesha ek hi hoga:\n\n"Jis pal mein tum mere saath thi." ❤️\n\n– Always Yours`;

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ffffff']
    });

    setTimeout(() => {
      setShowText(true);
    }, 1500); 
  };

  useEffect(() => {
    if (showText) {
      let i = 0;
      const typeInterval = setInterval(() => {
        setTypedText(fullMessage.slice(0, i));
        i++;
        if (i > fullMessage.length) {
          clearInterval(typeInterval);
        }
      }, 30);
      return () => clearInterval(typeInterval);
    }
  }, [showText]);

  const bgImage = mediaData.find(m => !m.isVideo && !m.video)?.src;
  const isTypingDone = typedText.length === fullMessage.length;

  return (
    <div className="envelope-slide-container" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', width: '100vw' }}>
      {bgImage && (
        <div 
          style={{
            position: 'absolute', inset: 0, 
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.15, zIndex: 0
          }}
        />
      )}
      
      <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '100%', height: '100%', paddingTop: '10vh' }}>
        <h1 className="envelope-slide-title" style={{ animation: 'fade-in 2s', zIndex: 10, color: 'white', fontFamily: 'Playfair Display, serif' }}>
          Ek aakhri paigam...
        </h1>
        
        <div className="envelope-container scaled" onClick={handleOpen} style={{ transform: 'scale(0.9)', marginTop: '20vh' }}>
          <div className={`envelope ${isOpen ? 'open' : ''}`}>
            <div className="envelope-flap"></div>
            <div className="envelope-body">
              {!isOpen && (
                <div className="envelope-seal pulse">
                  <Heart fill="var(--accent-color)" color="var(--accent-color)" size={30} />
                </div>
              )}
            </div>
            
            <div className={`letter ${isOpen ? 'pull-out' : ''}`} style={ isOpen ? { transform: 'translateX(-50%) translateY(-180px) scale(0.95)', zIndex: 5, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '60vh', overflowY: 'auto' } : {} }>
              <p className="letter-text" style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555', textAlign: 'center', whiteSpace: 'pre-wrap', padding: '10px' }}>
                {typedText}
              </p>
              
              {showText && isTypingDone && (
                <button 
                  className="continue-btn fade-in" 
                  onClick={(e) => { e.stopPropagation(); onFinish(); }} 
                  style={{ marginTop: '20px', background: 'linear-gradient(135deg, #ff3366, #ff0099)', color: 'white', padding: '10px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Play Special Video ✨
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeSlide;
