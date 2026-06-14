import React, { useState, useEffect, useRef } from 'react';
import FadeInSection from './FadeInSection';
import { Play } from 'lucide-react';

const InteractiveVideoShowcase = ({ videos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollRef = useRef(null);
  
  useEffect(() => {
    let animationFrameId;
    let isHovered = false;

    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    const autoScroll = () => {
      if (scrollRef.current && !isHovered) {
        scrollRef.current.scrollLeft += 1;
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
      }
    };
  }, []);

  if (!videos || videos.length === 0) return null;

  const activeVideo = videos[activeIndex];

  return (
    <section className="premium-video-showcase">
      <FadeInSection>
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <h2 className="section-title">Masti Unplugged 🎬</h2>
          <div className="text-divider"></div>
          <p className="elegant-subtext" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.6' }}>
            Dosti mein jab tak thodi pagalpan aur masti na ho, tab tak maza kahan? Ye videos proof hain ki hum jab bhi saath hote hain, toh masti apne aap shuru ho jati hai. Scroll karo aur dekho hamari sabse funny aur best memories!
          </p>
        </div>

        {/* Main Player */}
        <div className="main-player-container">
          {!isPlaying ? (
            <div 
              className="video-poster" 
              onClick={() => setIsPlaying(true)}
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
              onEnded={() => setIsPlaying(false)}
            />
          )}
        </div>

        {/* Horizontal Playlist */}
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
      </FadeInSection>
    </section>
  );
};

export default InteractiveVideoShowcase;
