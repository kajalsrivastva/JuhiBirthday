import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CinematicWelcome = ({ onFinish, onStartMusic }) => {
  const [showText, setShowText] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Kuch yaadein sirf dekhi nahi jaati… mehsoos ki jaati hain. ❤️";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
      onStartMusic();
      
      // Floating hearts effect
      const duration = 15 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#ff69b4', '#9d4edd']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#ff69b4', '#9d4edd']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

    }, 2000);

    return () => clearTimeout(timer);
  }, [onStartMusic]);

  useEffect(() => {
    if (showText) {
      let i = 0;
      const typeInterval = setInterval(() => {
        setTypedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(typeInterval);
        }
      }, 100);
      return () => clearInterval(typeInterval);
    }
  }, [showText]);

  return (
    <div className="cinematic-wrapper">
      <div className="cinematic-content">
        {showText && (
          <>
            <h1 className="cinematic-text">{typedText}</h1>
            {typedText.length === fullText.length && (
              <button 
                className="hero-button" 
                style={{ marginTop: '50px', animation: 'fade-in 2s ease-in-out' }}
                onClick={onFinish}
              >
                Begin Journey ✨
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CinematicWelcome;
