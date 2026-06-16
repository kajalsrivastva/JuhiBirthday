import React, { useState, useEffect, useRef } from 'react';
import FadeInSection from './FadeInSection';
import { Play, Lock, Unlock, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

const InteractiveVideoShowcase = ({ videos, onBack }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentClue, setCurrentClue] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const scrollRef = useRef(null);

  const clues = [
    { 
      q: "Let's see if you can unlock this Vault! What is the true foundation of our bond? 🕵️‍♀️", 
      opts: ["Late night gossip 🤫", "Crazy food cravings 🍕", "Endless fights & love ❤️"],
      msg: "Haha, totally true! Next clue..."
    },
    { 
      q: "Who takes way too much time to get ready? 👗", 
      opts: ["Definitely Me! 🙋‍♀️", "You, obviously! 🙄", "Hum dono hi aalsi hain 😴"],
      msg: "We both know the truth! 😉 One more clue to go..."
    },
    { 
      q: "The ultimate question: Is this the best birthday surprise ever? 🎁", 
      opts: ["YES! 😍", "100% YES! 💯", "Obviously! 😎"],
      msg: "Yayyy! Unlocking your final gift... 🎉"
    }
  ];

  const handleAnswerClick = () => {
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      if (currentClue < clues.length - 1) {
        setCurrentClue(c => c + 1);
      } else {
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

        setIsUnlocked(true);
      }
    }, 1500);
  };
  
  useEffect(() => {
    let animationFrameId;
    let isHovered = false;

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };
    const handleTouchStart = () => { isHovered = true; };
    const handleTouchEnd = () => { isHovered = false; };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd);
      container.addEventListener('touchcancel', handleTouchEnd);
    }

    const autoScroll = () => {
      if (scrollRef.current && !isHovered) {
        scrollRef.current.scrollLeft += 2;
        if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth - 1) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
        container.removeEventListener('touchcancel', handleTouchEnd);
      }
    };
  }, []);

  if (!videos || videos.length === 0) return null;

  const activeVideo = videos[activeIndex];

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--bg-tertiary)', padding: '20px 0' }}>
      {onBack && (
        <button 
          onClick={onBack}
          style={{
            position: 'absolute', top: '20px', left: '20px', zIndex: 1000,
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          <ArrowLeft size={20} /> Back to Website
        </button>
      )}
      <section className="premium-video-showcase">
        <FadeInSection>
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <h2 className="section-title">Masti Unplugged 🎬</h2>
          <div className="text-divider"></div>
          <p className="elegant-subtext" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.6' }}>
            {isUnlocked 
              ? "Dosti mein jab tak thodi pagalpan aur masti na ho, tab tak maza kahan? Ye videos proof hain ki hum jab bhi saath hote hain, toh masti apne aap shuru ho jati hai. Scroll karo aur dekho hamari sabse funny aur best memories!" 
              : "Is treasure vault tak pahunchne ke liye tumhe mere kuch sawaalon ke jawab dene honge! Sahi jawab do aur aakhiri tohfa unlock karo!"}
          </p>
        </div>

        {/* Main Player Container */}
        <div 
          className="main-player-container"
          style={!isUnlocked ? { aspectRatio: 'auto', minHeight: '450px' } : {}}
        >
          {!isUnlocked ? (
            <div style={{
              width: '100%', minHeight: '100%', background: 'linear-gradient(135deg, #2a1122 0%, #1a0b16 100%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '60px 20px', textAlign: 'center', position: 'relative'
            }}>
              <div style={{ position: 'absolute', top: '30px', opacity: 0.5 }}>
                <Lock size={60} color="var(--accent-gold)" />
              </div>
              
              {!showFeedback ? (
                <div style={{ animation: 'fadeIn 0.5s ease', zIndex: 1, width: '100%', maxWidth: '500px' }}>
                  <h3 style={{ color: 'var(--accent-rose)', fontSize: '1.8rem', marginBottom: '30px', lineHeight: '1.4' }}>
                    Clue #{currentClue + 1}: <br/> {clues[currentClue].q}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {clues[currentClue].opts.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={handleAnswerClick}
                        style={{
                          background: 'rgba(255,105,180,0.1)',
                          border: '2px solid var(--accent-gold)',
                          color: '#fff',
                          padding: '15px 20px',
                          borderRadius: '30px',
                          fontSize: '1.1rem',
                          cursor: 'pointer',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-gold)'; e.currentTarget.style.color = '#000'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,105,180,0.1)'; e.currentTarget.style.color = '#fff'; }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ animation: 'fadeIn 0.5s ease', zIndex: 1 }}>
                  <Unlock size={80} color="var(--accent-gold)" style={{ margin: '0 auto 20px' }} />
                  <h3 style={{ color: 'var(--accent-gold)', fontSize: '2rem' }}>{clues[currentClue].msg}</h3>
                </div>
              )}
            </div>
          ) : (
            <>
              <video 
                src={activeVideo.src} 
                autoPlay muted loop playsInline
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  objectFit: 'cover', filter: 'blur(30px) brightness(0.6)', transform: 'scale(1.2)', zIndex: 0
                }} 
              />
              {!isPlaying ? (
                <div 
                  className="video-poster" 
                  onClick={() => setIsPlaying(true)}
                  style={{ zIndex: 1 }}
                >
                  <video 
                    src={activeVideo.src} 
                    muted loop autoPlay playsInline
                    className="poster-bg-video"
                  />
                  <div className="poster-overlay">
                    <div className="giant-play-btn">
                      <Play size={40} color="var(--accent-gold)" fill="var(--accent-gold)" />
                    </div>
                    <h3 className="video-title">Memory #{activeIndex + 1}</h3>
                  </div>
                </div>
              ) : (
                <video 
                  src={activeVideo.src} 
                  controls 
                  autoPlay 
                  className="active-video-player"
                  style={{ position: 'relative', zIndex: 1 }}
                  onEnded={() => setIsPlaying(false)}
                />
              )}
            </>
          )}
        </div>

        {/* Horizontal Playlist */}
        {isUnlocked && (
          <div 
            className="playlist-container" 
            ref={scrollRef}
          style={{ 
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none', 
            overflowX: 'auto' 
          }}
        >
          <style>{`.playlist-container::-webkit-scrollbar { display: none; }`}</style>
          <div className="playlist-track">
            {videos.map((vid, idx) => (
              <div 
                key={idx} 
                className={`playlist-item ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsPlaying(false);
                }}
              >
                <video src={vid.src} className="playlist-thumbnail" />
                <div className="playlist-item-overlay">
                  {idx === activeIndex ? 'Playing' : `Vid ${idx + 1}`}
                </div>
              </div>
            ))}
          </div>
          </div>
        )}
      </FadeInSection>
    </section>
    </div>
  );
};

export default InteractiveVideoShowcase;
