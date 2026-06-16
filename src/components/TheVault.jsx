import React, { useState, useEffect, useRef } from 'react';
import FadeInSection from './FadeInSection';
import Tilt from 'react-parallax-tilt';

const TheVault = ({ allPhotos, bgImage }) => {
  const [opened, setOpened] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const scrollRef = useRef(null);

  const magazineQuotes = [
    { title: "SOUL BESTIE", text: "A friend is someone who knows all about you and still loves you." },
    { title: "MEMORIES", text: "We didn't realize we were making memories, we just knew we were having fun." },
    { title: "CHAPTER 29", text: "Cheers to another year of unstoppable laughter and endless gossip." },
    { title: "FOREVER", text: "True friendship isn't about being inseparable, it's about being separated and nothing changes." }
  ];

  // Auto-scroll logic
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
      if (scrollRef.current && opened && !selectedMedia && !isHovered) {
        scrollRef.current.scrollLeft += 2.5; // adjust speed here (thoda fast)
        // Reset to left if reached end
        if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth - 1) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    if (opened) {
      animationFrameId = requestAnimationFrame(autoScroll);
    }

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
  }, [opened, selectedMedia]);

  if (!allPhotos || allPhotos.length === 0) return null;

  const getAnimationClass = (index) => {
    const directions = ['fade-from-top', 'fade-from-bottom', 'fade-from-left', 'fade-from-right'];
    return directions[index % directions.length];
  };

  const hoverMessages = [
    "Best friend forever 💖",
    "Click to play this memory! 🎬",
    "Always plotting something 😂",
    "My partner in crime 👯‍♀️",
    "Pagalpan loaded! 🤪",
    "Smile dekho zara! ✨",
    "Best times with you ❤️",
    "Gossip session! 🤫",
    "Forever my favorite 🫶",
    "Unstoppable duo 🚀"
  ];

  return (
    <section className="vault-section" style={{
      position: 'relative',
      backgroundColor: '#0a0a0c',
      minHeight: '80vh',
      padding: '100px 20px 10vh 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {bgImage && (
        <>
          <div style={{ position: 'absolute', inset: '-20px', backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px)', opacity: 0.5, zIndex: 0 }}></div>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', zIndex: 1 }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,12,0.7)', zIndex: 2 }}></div>
        </>
      )}
      
      <div className="vault-container" style={{ position: 'relative', zIndex: 3, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {!opened ? (
          <FadeInSection>
            <div className="vault-door" onClick={() => setOpened(true)} style={{ margin: '0 auto' }}>
              <div className="vault-keyhole"></div>
              <h2 className="vault-title" style={{ color: '#fff', textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}>The Archives</h2>
              <p className="elegant-subtext" style={{ fontSize: '0.9rem', color: '#fff', textShadow: '1px 1px 4px rgba(0,0,0,0.9)' }}>Unlock the Magazine</p>
            </div>
            
            <p className="elegant-subtext" style={{ textAlign: 'center', maxWidth: '600px', margin: '40px auto 0 auto', fontSize: '1.2rem', lineHeight: '1.6', color: '#fff', textShadow: '1px 1px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.5)' }}>
              Some memories are meant to be kept forever. Open the archives to relive the best moments of our friendship!
            </p>
          </FadeInSection>
        ) : (
          <div className="vault-overlay" style={{ background: 'rgba(26,11,22,0.95)', backdropFilter: 'blur(15px)', backgroundImage: 'url(/juhi_media/birthday_theme_bg.png)', backgroundBlendMode: 'overlay', backgroundSize: 'cover' }}>
            <div className="vault-header" style={{ borderBottom: '2px dashed var(--accent-gold)', paddingBottom: '20px', marginBottom: '30px', textAlign: 'center', width: '100%' }}>
              <h2 style={{ fontSize: '3.5rem', color: 'var(--accent-gold)', textShadow: '0 0 20px rgba(255,105,180,0.8)' }}>💕 BFF Scrapbook 💕</h2>
              <p style={{ color: '#fff', fontSize: '1.2rem', marginTop: '10px' }}>Our craziest, happiest, and most beautiful memories!</p>
            <button className="vault-close" onClick={() => setOpened(false)} style={{ background: 'var(--accent-gold)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '30px', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer', boxShadow: '0 5px 15px rgba(255,105,180,0.4)' }}>Close Scrapbook</button>
          </div>
          
          <div className="magazine-grid" ref={scrollRef}>
            {allPhotos.map((photo, index) => {
              // Interleave quotes every 6 photos
              const showQuote = index % 6 === 0 && index !== 0;
              const quoteIndex = (Math.floor(index / 6) - 1) % magazineQuotes.length;
              const animClass = getAnimationClass(index);
              
              return (
                <React.Fragment key={index}>
                  {showQuote && (
                    <div className={`magazine-text-block ${getAnimationClass(index + 1)}`}>
                      <h3 className="magazine-heading">{magazineQuotes[quoteIndex].title}</h3>
                      <p className="magazine-body">{magazineQuotes[quoteIndex].text}</p>
                    </div>
                  )}
                  
                  <Tilt
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    scale={1.05}
                    transitionSpeed={1000}
                    className={`magazine-photo-block ${index % 4 === 0 ? 'large-photo' : 'standard-photo'} ${animClass}`}
                    style={{ animationDelay: `${(index % 10) * 0.1}s`, padding: '10px', background: 'transparent', border: 'none' }}
                  >
                    <div 
                      onClick={() => setSelectedMedia({ type: 'photo', src: photo.src })}
                      style={{ 
                        width: '100%', height: '100%', cursor: 'pointer',
                        backgroundColor: '#fff',
                        padding: '15px 15px 80px 15px',
                        borderRadius: '4px',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.5), 0 0 20px rgba(255,105,180,0.3)',
                        transform: `rotate(${index % 2 === 0 ? (index % 3 === 0 ? '4deg' : '-2deg') : '-4deg'})`,
                        position: 'relative'
                      }}
                    >
                      <img src={photo.src} alt={`Archive ${index}`} loading="lazy" style={{ opacity: 1, width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#111', borderRadius: '2px' }} />

                      <div className="magazine-caption" style={{ 
                        fontSize: '1.4rem', 
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--accent-rose)',
                        position: 'absolute',
                        bottom: '20px',
                        left: '0',
                        width: '100%',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        background: 'none',
                        padding: '0'
                      }}>
                        {hoverMessages[index % hoverMessages.length]}
                      </div>
                    </div>
                  </Tilt>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {selectedMedia && (
        <div className="modal-overlay" onClick={() => setSelectedMedia(null)} style={{ zIndex: 100000 }}>
          <button className="modal-close" onClick={() => setSelectedMedia(null)}>×</button>
          <div className="modal-content" style={{ background: 'transparent', boxShadow: 'none' }} onClick={e => e.stopPropagation()}>
            {selectedMedia.type === 'video' ? (
              <video 
                src={selectedMedia.src} 
                autoPlay 
                controls 
                style={{ width: '100%', maxHeight: '90vh', display: 'block', borderRadius: '8px' }} 
              />
            ) : (
              <img 
                src={selectedMedia.src} 
                alt="Selected" 
                style={{ width: '100%', maxHeight: '90vh', objectFit: 'contain' }} 
              />
            )}
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default TheVault;
