import React, { useState, useEffect } from 'react';
import FadeInSection from './FadeInSection';
import confetti from 'canvas-confetti';

const MemoryPuzzle = ({ photos, videos }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [currentVideoSrc, setCurrentVideoSrc] = useState('/juhi_media/VID_20260225_205339_824.mp4');

  useEffect(() => {
    if (!photos || photos.length < 3) return;
    
    // Pick 3 random photos for pairs
    const selectedPhotos = [...photos].sort(() => 0.5 - Math.random()).slice(0, 3).map(p => p.src);
    const pairDeck = [...selectedPhotos, ...selectedPhotos];
    
    const shuffledCards = pairDeck
      .sort(() => 0.5 - Math.random())
      .map((src, index) => ({ id: index, src }));
      
    setCards(shuffledCards);

    // Pick video: first time use specific video, then random
    if (playCount === 0) {
      setCurrentVideoSrc('/juhi_media/VID_20260225_205339_824.mp4');
    } else if (videos && videos.length > 0) {
      const randomVid = videos[Math.floor(Math.random() * videos.length)].src;
      setCurrentVideoSrc(randomVid);
    }
  }, [photos, playCount, videos]);

  const handleCardClick = (index) => {
    if (disabled || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const firstIndex = newFlipped[0];
      const secondIndex = newFlipped[1];

      if (cards[firstIndex].src === cards[secondIndex].src) {
        setSolved([...solved, firstIndex, secondIndex]);
        setFlipped([]);
        setDisabled(false);
        
        // Check if won
        if (solved.length + 2 === cards.length) {
          handleWin();
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const handleWin = () => {
    setIsWon(true);
    
    // Fire confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    setTimeout(() => {
      setShowVideo(true);
    }, 2000);
  };

  const resetGame = () => {
    setIsWon(false);
    setSolved([]);
    setFlipped([]);
    setPlayCount(c => c + 1);
  };

  if (!cards.length) return null;

  return (
    <section className="memory-puzzle-section" style={{
      padding: '100px 20px',
      backgroundColor: '#1a0b16',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <FadeInSection>
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <h2 className="section-title" style={{ color: '#fff', textAlign: 'center' }}>Memory Puzzle 🧩</h2>
          <div className="text-divider" style={{ margin: '0 auto 20px auto' }}></div>
          <p className="elegant-subtext" style={{ textAlign: 'center', color: '#fff', maxWidth: '600px', margin: '0 auto' }}>
            In cards ke peeche hamari kuch pyari yaadein chhupi hain. Sahi jodi (pairs) dhoondo aur ek khaas video unlock karo!
          </p>
        </div>

        {!isWon ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            {cards.map((card, index) => {
              const isFlipped = flipped.includes(index) || solved.includes(index);
              return (
                <div 
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  style={{
                    aspectRatio: '1',
                    perspective: '1000px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}>
                    {/* Front of card (hidden state) */}
                    <div style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      backgroundColor: '#2a1122',
                      border: '2px solid var(--accent-gold)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
                    }}>
                      ❓
                    </div>
                    
                    {/* Back of card (revealed image) */}
                    <div style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '2px solid var(--accent-gold)'
                    }}>
                      <img src={card.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Memory" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', animation: 'fadeIn 1s ease forwards' }}>
            <h3 style={{ color: 'var(--accent-gold)', fontSize: '2rem', marginBottom: '20px' }}>You Did It! 🎉</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
              <button 
                onClick={() => setShowVideo(true)}
                style={{
                  background: 'var(--accent-gold)',
                  color: '#000',
                  border: 'none',
                  padding: '15px 30px',
                  fontSize: '1.2rem',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 5px 20px rgba(212, 175, 55, 0.4)'
                }}
              >
                Watch Surprise Video
              </button>
              
              <button 
                onClick={resetGame}
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '2px solid rgba(255,255,255,0.3)',
                  padding: '10px 20px',
                  fontSize: '1rem',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Play Again (New Photos) 🔄
              </button>
            </div>
          </div>
        )}
      </FadeInSection>

      {showVideo && (
        <div className="modal-overlay" onClick={() => setShowVideo(false)} style={{ zIndex: 100000 }}>
          <video 
            src={currentVideoSrc} 
            autoPlay muted loop playsInline
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', filter: 'blur(25px) brightness(0.6)', transform: 'scale(1.1)', zIndex: 0
            }} 
          />
          <button className="modal-close" onClick={() => setShowVideo(false)} style={{ zIndex: 2 }}>×</button>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: 'transparent', boxShadow: 'none', zIndex: 1 }}>
            <video 
              src={currentVideoSrc} 
              controls 
              autoPlay 
              style={{ width: '100%', maxHeight: '85vh', display: 'block', position: 'relative', zIndex: 1 }} 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default MemoryPuzzle;
