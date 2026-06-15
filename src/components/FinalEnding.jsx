import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const FinalEnding = ({ onRestart }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    const el = document.getElementById('final-ending');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleEnding = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ff69b4']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ff69b4']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      onRestart();
    }, 4000);
  };

  return (
    <div id="final-ending" className="final-ending-container">
      <div className={`final-content ${isVisible ? 'visible' : ''}`}>
        <p className="final-quote">
          "Agar zindagi ek kitaab hai, to uske sabse khoobsurat panne tumhare saath bitaye hue pal hain."
        </p>
        <p className="final-quote-sub">
          "Yeh sirf photos aur videos nahi… meri zindagi ke woh lamhe hain jinhe main hamesha sambhal kar rakhna chahta hoon."
        </p>
        
        <button className="hero-button final-btn" onClick={handleEnding}>
          ❤️ Create More Beautiful Memories
        </button>
      </div>
    </div>
  );
};

export default FinalEnding;
