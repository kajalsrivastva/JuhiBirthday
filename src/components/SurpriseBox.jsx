import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Play } from 'lucide-react';

const SurpriseBox = ({ introMedia, onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [typedText, setTypedText] = useState('');
  
  const fullText = "Is box mein sirf tasveerein nahi… meri sabse khoobsurat yaadein chhupi hain.";

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff3366', '#9d4edd', '#ffffff', '#ffd700']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff3366', '#9d4edd', '#ffffff', '#ffd700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      setShowMedia(true);
    }, 1000); 
  };

  useEffect(() => {
    if (showMedia) {
      let i = 0;
      const typeInterval = setInterval(() => {
        setTypedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            onOpen();
          }, 4000);
        }
      }, 70);
      return () => clearInterval(typeInterval);
    }
  }, [showMedia, onOpen]);

  const allIntroMedia = introMedia ? [...introMedia.photos, introMedia.video].filter(Boolean) : [];

  return (
    <div className={`surprise-container ${isOpening && typedText.length === fullText.length ? 'fade-out-late' : ''}`}>
      {/* Subtle Faded Background for Surprise Box */}
      {allIntroMedia[0] && (
        <div 
          style={{
            position: 'absolute', inset: 0, 
            backgroundImage: `url(${allIntroMedia[0].src})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: 0.1, zIndex: 0
          }}
        />
      )}
      
      <div className="surprise-content" style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        
        <h1 className="surprise-text" style={{ minHeight: '120px', zIndex: 10, padding: '0 20px', fontSize: '2.5rem' }}>
          {!isOpening ? "Click to Open the Magic Box 🎁" : typedText}
        </h1>
        
        <div 
          className={`gift-box-wrapper ${isOpening ? 'opening' : 'bouncing'}`}
          onClick={handleOpen}
          style={{ zIndex: 5, marginTop: '20px' }}
        >
          <div className="gift-box" style={{ filter: isOpening ? 'drop-shadow(0 0 50px rgba(255,215,0,0.8))' : 'none', transition: 'all 0.5s' }}>
            <div className="gift-lid"></div>
            <div className="gift-body">
              <Gift size={60} color="white" />
            </div>
          </div>
        </div>

        {showMedia && allIntroMedia.map((media, idx) => {
          const angles = [-30, -10, 10, 30]; 
          const xTransform = `calc(${angles[idx]}vw)`;
          const yTransform = `-25vh`; // Fixed: don't fly off the top of the screen
          const rotate = `${(idx % 2 === 0 ? -1 : 1) * (10 + idx * 5)}deg`;

          return (
            <div 
              key={idx}
              className="floating-intro-media"
              style={{
                position: 'absolute',
                bottom: '30%',
                left: '50%',
                width: '150px',
                height: '180px',
                backgroundColor: 'white',
                padding: '8px 8px 25px 8px',
                borderRadius: '5px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                animation: `flyOut 3.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`,
                animationDelay: `${idx * 0.3}s`,
                '--x-dest': xTransform,
                '--y-dest': yTransform,
                '--rot-dest': rotate,
                opacity: 0,
                transform: 'translate(-50%, 0) scale(0.1)',
                zIndex: 1
              }}
            >
              {media.isVideo || media.video ? (
                <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play color="white" />
                </div>
              ) : (
                <img src={media.src} alt="memory" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SurpriseBox;
