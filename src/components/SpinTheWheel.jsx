import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift } from 'lucide-react';

const segments = [
  { label: 'Funny Memory', color: '#ff6b6b', msg: "Yaad hai wo din jab hum bina baat ke itna hase the ki pet dard ho gaya tha? Good times! 😂", btnText: "Play Memory Game 🧩", target: ".memory-puzzle-section" },
  { label: 'Virtual Hug', color: '#feca57', msg: "A tightly squeezed virtual hug just for you! 🤗 You are the best!", btnText: "Open Surprise Box 🎁", target: ".surprise-box-container" },
  { label: 'Secret Video', color: '#48dbfb', msg: "Go to the 'Masti Unplugged' section and watch Memory #1 again, carefully! 😉", btnText: "Take Me There 🔓", target: "masti" },
  { label: 'Truth or Dare', color: '#1dd1a1', msg: "Truth: What is your most embarrassing memory with me? (Batao batao!) 😈", btnText: "Scratch A Dare 🎟️", target: ".scratch-section" },
  { label: 'Bestie Quote', color: '#ff9ff3', msg: "'A good friend knows all your stories. A best friend helped you write them.' ❤️", btnText: "Read Our Magazine 📖", target: ".magazine-section" },
  { label: 'Nostalgic Photo', color: '#54a0ff', msg: "Check out the photo gallery! Every picture has a story that only we know. 📸", btnText: "Open BFF Scrapbook 📸", target: ".vault-container" },
];

const SpinTheWheel = ({ onGoToMasti }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    // Calculate a random degree to spin to
    const randomExtraDegrees = Math.floor(Math.random() * 360);
    // Add 5 full spins (1800 degrees) + random degree
    const newRotation = rotation + 1800 + randomExtraDegrees;
    
    setRotation(newRotation);

    // Calculate which segment won
    setTimeout(() => {
      setIsSpinning(false);
      // The wheel rotates clockwise. The top pointer is at 0 degrees.
      // So the segment at the top is (360 - (newRotation % 360)).
      // Each segment is 60 degrees. Segment 0 is shifted by -30 to 30.
      const normalizedRot = (360 - (newRotation % 360)) % 360;
      const winningIndex = Math.floor(((normalizedRot + 30) % 360) / 60);
      
      setResult(segments[winningIndex]);

      // Fire confetti
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };
      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

    }, 4000); // 4 seconds animation
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'rgba(20, 10, 15, 0.8)',
      padding: '40px 20px',
      borderRadius: '20px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      border: '1px solid rgba(255,105,180,0.2)',
      backdropFilter: 'blur(10px)',
      width: '100%',
      maxWidth: '450px',
      margin: '0 auto'
    }}>
      <h3 style={{ color: 'var(--accent-gold)', marginBottom: '10px', fontSize: '1.8rem', textAlign: 'center' }}>Spin the Wheel! 🎡</h3>
      <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '30px', textAlign: 'center' }}>Wheel ghumao aur dekho aaj tumhara surprise kya hai!</p>
      
      <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto' }}>
        {/* Pointer */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderTop: '30px solid var(--accent-gold)',
          zIndex: 10,
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))'
        }}></div>

        {/* The Wheel */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '5px solid var(--accent-gold)',
          boxShadow: '0 0 20px rgba(212,175,55,0.4)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'transform 4s cubic-bezier(0.33, 1, 0.68, 1)',
          transform: `rotate(${rotation}deg)`
        }}>
          {segments.map((seg, i) => {
            const startAngle = (i * 60) - 30;
            return (
              <div key={i} style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)', // This is tricky. Better to use conic-gradient on parent.
                display: 'none'
              }}></div>
            )
          })}
          
          {/* Conic Gradient for slices */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            background: `conic-gradient(
              ${segments[0].color} 0deg 60deg,
              ${segments[1].color} 60deg 120deg,
              ${segments[2].color} 120deg 180deg,
              ${segments[3].color} 180deg 240deg,
              ${segments[4].color} 240deg 300deg,
              ${segments[5].color} 300deg 360deg
            )`,
            transform: 'rotate(-30deg)' // Shift so 0deg is the middle of the first segment
          }}></div>

          {/* Text Labels inside slices */}
          {segments.map((seg, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '140px',
              height: '30px',
              transformOrigin: '0 50%',
              transform: `translateY(-50%) rotate(${i * 60}deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '20px',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              textShadow: '0 1px 2px rgba(255,255,255,0.5)'
            }}>
              {seg.label}
            </div>
          ))}

          {/* Center Hub */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px', height: '60px',
            background: 'var(--bg-primary)',
            borderRadius: '50%',
            border: '4px solid var(--accent-gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 5
          }}>
            <Gift size={24} color="var(--accent-gold)" />
          </div>
        </div>
      </div>

      <button 
        onClick={spinWheel}
        disabled={isSpinning}
        style={{
          marginTop: '40px',
          background: isSpinning ? 'grey' : 'linear-gradient(45deg, var(--accent-gold), var(--accent-rose))',
          color: '#fff',
          border: 'none',
          padding: '15px 40px',
          fontSize: '1.2rem',
          borderRadius: '30px',
          fontWeight: 'bold',
          cursor: isSpinning ? 'not-allowed' : 'pointer',
          boxShadow: isSpinning ? 'none' : '0 10px 20px rgba(255,105,180,0.3)',
          transition: 'all 0.3s'
        }}
        onMouseEnter={e => !isSpinning && (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => !isSpinning && (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isSpinning ? 'Spinning...' : 'SPIN NOW!'}
      </button>

      {/* Result Modal */}
      {result && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)',
          zIndex: 99999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #2a1122 0%, #1a0b16 100%)',
            padding: '40px',
            borderRadius: '20px',
            border: `2px solid ${result.color}`,
            boxShadow: `0 0 30px ${result.color}66`,
            textAlign: 'center',
            maxWidth: '400px',
            width: '90%',
            animation: 'fadeIn 0.5s ease, bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <div style={{
              background: result.color,
              color: '#000',
              padding: '5px 15px',
              borderRadius: '20px',
              display: 'inline-block',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              {result.label}
            </div>
            <h2 style={{ color: 'var(--accent-gold)', marginBottom: '20px', fontSize: '1.8rem' }}>Congratulations! 🎉</h2>
            <p style={{ color: '#fff', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px' }}>
              {result.msg}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
              {result.btnText && (
                <button 
                  onClick={() => {
                    setResult(null);
                    if (result.target === 'masti' && onGoToMasti) {
                      onGoToMasti();
                    } else if (result.target) {
                      const el = document.querySelector(result.target);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  style={{
                    background: 'linear-gradient(45deg, var(--accent-gold), var(--accent-rose))',
                    color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '30px', cursor: 'pointer',
                    fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 5px 15px rgba(255,105,180,0.3)'
                  }}
                >
                  {result.btnText}
                </button>
              )}
              <button 
                onClick={() => setResult(null)}
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '10px 30px',
                  borderRadius: '30px',
                  cursor: 'pointer'
                }}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default SpinTheWheel;
